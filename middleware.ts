import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

// Uses Node's crypto (HMAC) for session verification, so this middleware
// needs the Node.js runtime rather than the default Edge runtime.
export const runtime = "nodejs";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (pathname === "/admin/login") {
		return NextResponse.next();
	}

	const token = request.cookies.get(SESSION_COOKIE)?.value;
	if (!verifySessionToken(token)) {
		const loginUrl = new URL("/admin/login", request.url);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*"],
};
