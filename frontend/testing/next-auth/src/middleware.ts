import { type NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

export default async function middleware(
	req: NextRequest,
): Promise<NextResponse> {
	const res = NextResponse;

	if (req.nextUrl.pathname.startsWith("/home")) {
		try {
			const session = await auth();

			if (!session) {
				return res.redirect(new URL("/login", req.url));
			}

			return res.next();
		} catch (error) {
			console.error("Error in middleware:", error);
			return res.redirect(new URL("/login", req.url));
		}
	}

	return res.next();
}

export const config = {
	// matcher: "/home/:path*",
	matcher: "/:path*",
};
