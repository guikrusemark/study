import type { User as UserNextAuth } from "next-auth";

interface User {
	_id?: string;
	name: string;
	email: string;
	passwordHash?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

interface UserAuth extends UserNextAuth {}

interface UserCredentials {
	name?: string;
	email: string;
	password: string;
}

export type { User, UserAuth, UserCredentials };
