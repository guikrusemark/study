import type { User, UserCredentials } from "@/types/user";

export async function getUserFromDb(
	credentials: UserCredentials,
): Promise<User> {
	const user: User = {
		_id: "default-id",
		email: credentials.email,
		name: credentials.name || "John Doe",
		passwordHash: credentials.password,
		createdAt: new Date(),
	};

	return user;
}
