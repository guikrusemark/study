import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserFromDb } from "@/lib/db";
import { saltAndHashPassword } from "@/lib/utils";
import { signInSchema } from "@/lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {
					type: "email",
					label: "Email",
					placeholder: "johndoe@gmail.com",
				},
				password: {
					type: "password",
					label: "Password",
					placeholder: "******",
				},
			},
			authorize: async (credentials) => {
				let user = null;

				const { email, password } = await signInSchema.parseAsync(credentials);

				// logic to salt and hash password
				const pwHash = saltAndHashPassword(credentials.password);

				// logic to verify if the user exists
				user = await getUserFromDb(credentials.email, pwHash);

				if (!user) {
					// No user found, so this is their first attempt to login
					// Optionally, this is also the place you could do a user registration
					throw new Error("Invalid credentials.");
				}

				// return user object with their profile data
				return user;
			},
		}),
	],
});
