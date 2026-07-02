import { NextRequest, NextResponse } from "next/server";
import { verifyConfirmationToken } from "@/lib/newsletter-token";

export async function GET(request: NextRequest) {
	const token = request.nextUrl.searchParams.get("token");
	const home = new URL("/", request.url);

	if (!token) {
		home.searchParams.set("newsletter", "invalid");
		return NextResponse.redirect(home);
	}

	const result = verifyConfirmationToken(token);
	if (!result.valid) {
		home.searchParams.set("newsletter", result.reason === "expired" ? "expired" : "invalid");
		return NextResponse.redirect(home);
	}

	// Signature valid: the subscription is confirmed. Without a database this
	// can't be persisted server-side yet - wire this up to a mailing list
	// provider (Brevo, Mailjet...) or a Vercel Marketplace database to
	// actually store confirmed subscribers.
	home.searchParams.set("newsletter", "confirmed");
	return NextResponse.redirect(home);
}
