import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
	const isLoggedIn = !!req.auth;
	const userRole = req.auth?.user?.role;
	const isTargetingAdmin = req.nextUrl.pathname.startsWith("/admin");

	if (isTargetingAdmin) {
		if (!isLoggedIn) {
			return NextResponse.redirect(
				new URL("/?mode=login&message=session-expired", req.nextUrl),
			);
		}
		if (userRole !== "admin") {
			return NextResponse.redirect(new URL("/training", req.nextUrl));
		}
	}

	return NextResponse.next();
});

export const config = { mathcer: "/admin/:path*" };
