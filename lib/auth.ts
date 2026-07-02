import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "dev-only-insecure-secret-change-me";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12h
export const SESSION_COOKIE = "lavaur_admin_session";

function sign(payload: string): string {
	return createHmac("sha256", SESSION_SECRET).update(payload).digest("base64url");
}

export function checkPassword(candidate: string): boolean {
	const expected = process.env.ADMIN_PASSWORD || "";
	if (!expected) return false;
	const a = Buffer.from(candidate);
	const b = Buffer.from(expected);
	if (a.length !== b.length) return false;
	return timingSafeEqual(a, b);
}

export function createSessionToken(): string {
	const expires = Date.now() + SESSION_TTL_MS;
	const payload = Buffer.from(JSON.stringify({ role: "admin", expires })).toString("base64url");
	return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
	if (!token) return false;
	const parts = token.split(".");
	if (parts.length !== 2) return false;
	const [payload, signature] = parts;

	const expected = sign(payload);
	const sigBuf = Buffer.from(signature);
	const expBuf = Buffer.from(expected);
	if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) return false;

	try {
		const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
		return decoded.role === "admin" && Date.now() < decoded.expires;
	} catch {
		return false;
	}
}

export async function isAuthenticated(): Promise<boolean> {
	const store = await cookies();
	return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export async function requireAuth(): Promise<void> {
	if (!(await isAuthenticated())) {
		throw new Error("Unauthorized");
	}
}
