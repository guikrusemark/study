"use server";

import { redirect } from "next/navigation";

import { signIn as authSignIn, signOut as authSignOut } from "@/auth";
import { apiDelete, apiPost } from "@/lib/fetch";

const BASE_URL = "http://localhost:3000/"; // TODO: Rename variable for global scope style BASE_URL
const AUTH_ENDPOINT = "/auth/";

const signIn = async (formData: FormData) => {
	await authSignIn("credentials", formData);
};

const signOut = async () => {
	try {
		const res = await apiDelete(AUTH_ENDPOINT);
		if (!res.ok) {
			throw new Error("Failed to sign out");
		}
		await authSignOut({ redirect: false });
	} catch (err) {
		console.error(err);
	}
	redirect(BASE_URL);
};

async function login({
	email,
	password,
}: {
	email: string;
	password: string;
}): Promise<Response | undefined> {
	try {
		const res = await apiPost(AUTH_ENDPOINT, {
			body: JSON.stringify({ email, password }),
		});
		return res;
	} catch (err) {
		console.error(err);
		return undefined;
	}
}

export { signIn, signOut, login };
