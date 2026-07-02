import { createHmac, timingSafeEqual } from "crypto";

// Stateless double opt-in: the confirmation link encodes the email + an
// expiry, signed with HMAC. No database needed - verifying the signature on
// confirm is enough, which keeps this workable on serverless without
// provisioning a database. Set NEWSLETTER_SECRET in production; this
// fallback is fine for local dev only.
const SECRET = process.env.NEWSLETTER_SECRET || "dev-only-insecure-secret-change-me";
const TOKEN_TTL_MS = 1000 * 60 * 60 * 48; // 48h to confirm

function sign(payload: string): string {
	return createHmac("sha256", SECRET).update(payload).digest("base64url");
}

// The payload itself is base64url-encoded JSON, so it can never contain a
// literal "." - that lets us safely split the final token on "." even
// though email addresses (e.g. "citoyen@example.com") contain dots.
export function createConfirmationToken(email: string): string {
	const expires = Date.now() + TOKEN_TTL_MS;
	const payload = Buffer.from(JSON.stringify({ email, expires })).toString("base64url");
	const signature = sign(payload);
	return `${payload}.${signature}`;
}

export function verifyConfirmationToken(token: string): { valid: boolean; email?: string; reason?: string } {
	const parts = token.split(".");
	if (parts.length !== 2) return { valid: false, reason: "malformed" };
	const [payload, signature] = parts;

	const expected = sign(payload);
	const sigBuf = Buffer.from(signature);
	const expectedBuf = Buffer.from(expected);
	if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) {
		return { valid: false, reason: "signature" };
	}

	let decoded: { email: string; expires: number };
	try {
		decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
	} catch {
		return { valid: false, reason: "malformed" };
	}

	if (Date.now() > decoded.expires) {
		return { valid: false, reason: "expired" };
	}

	return { valid: true, email: decoded.email };
}
