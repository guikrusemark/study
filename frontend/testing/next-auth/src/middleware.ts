import { type NextRequest, NextResponse } from "next/server";

export { auth } from "@/auth";

export default async function middleware(
	req: NextRequest,
): Promise<NextResponse> {
	const res = NextResponse;

	try {
		const session = await auth();

		if (!session?.user) {
			return res.redirect(new URL("/login", req.url));
		}

		return res.next();
	} catch (error) {
		console.error("Error in middleware:", error);
		return res.redirect(new URL("/login", req.url));
	}
}

export const config = {
	matcher: "/home/:path*",
};
