// // types/next-auth.d.ts
// import NextAuth, { type DefaultSession } from "next-auth";

// declare module "next-auth" {
// 	interface Session {
// 		user: {
// 			msg?: string;
// 		} & DefaultSession["user"];
// 	}
// }

import type { DefaultSession, User } from "next-auth";

declare module "next-auth" {
	interface User {
		msg?: string;
	}

	interface Session {
		user: {
			msg?: string;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		msg?: string;
	}
}
