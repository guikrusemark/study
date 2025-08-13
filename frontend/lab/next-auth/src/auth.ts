import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserFromDb } from "@/lib/db";
import { signInSchema } from "@/schemas/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: { email: {}, password: {} },
			authorize: async (credentials) => {
				const parsedCredentials = await signInSchema.parseAsync(credentials);

				// logic to verify if the user exists
				const user = await getUserFromDb(parsedCredentials);

				if (!user) {
					// This is the place you could do a user registration
					throw new Error("Invalid credentials.");
				}

				return { ...user, msg: "Welcome back!" };
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.msg = user.msg;
			}
			return token;
		},
		session({ session, token }) {
			if (token.msg) {
				session.user.msg = token.msg as string | undefined;
			}
			return session;
		},
	},
});
