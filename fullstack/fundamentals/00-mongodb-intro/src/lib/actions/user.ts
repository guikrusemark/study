"use server";

import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

import clientPromise from "@/lib/services/mongo";
import { getCachedWithFallback, invalidateByTag } from "@/lib/services/redis";

import { userSchema } from "@/lib/schemas/user";
import type { User } from "@/lib/types/user";

export async function listUsers() {
	return await getCachedWithFallback(
		"users:all",
		async () => {
			const client = await clientPromise;
			const db = client.db();
			const users = await db
				.collection("users")
				.find({}, { projection: { password: 0 } })
				.toArray();

			if (!users) throw new Error("No users found");
			return users;
		},
		{ ttl: 300, tags: ["users"] }, // 5 minutes TTL with "users" tag
	);
}

export async function getUserById(userId: string) {
	return await getCachedWithFallback(
		`user:${userId}`,
		async () => {
			const client = await clientPromise;
			const db = client.db();
			const user = await db
				.collection("users")
				.findOne(
					{ _id: new ObjectId(userId) },
					{ projection: { password: 0 } },
				);

			if (!user) throw new Error("User not found");
			return user;
		},
		{ ttl: 600, tags: ["users", `user:${userId}`] }, // 10 minutes TTL
	);
}

export async function createUser(userData: User) {
	try {
		const parsedUser = userSchema.safeParse(userData);

		if (!parsedUser.success) return { error: "Invalid input" };

		const { email, name, password } = parsedUser.data;
		const hashedPassword = await bcrypt.hash(password, 12);

		const client = await clientPromise;
		const db = client.db();

		const existing = await db.collection("users").findOne({ email });
		if (existing) return { error: "User already exists" };

		const result = await db.collection("users").insertOne({
			email,
			name,
			password: hashedPassword,
			createdAt: new Date(),
		});

		// Invalidate users cache after creating a new user
		await invalidateByTag("users");

		return {
			success: true,
			userId: result.insertedId.toString(),
			message: "User created successfully",
		};
	} catch (error) {
		console.error("Error creating user:", error);
		return { error: "Internal server error" };
	}
}

export async function updateUser(userId: string, data: unknown) {
	try {
		const parsed = userSchema.safeParse(data);

		if (!parsed.success) return { error: "Invalid input" };

		const { email, name, password } = parsed.data;
		const hashedPassword = await bcrypt.hash(password, 12);

		const client = await clientPromise;
		const db = client.db();

		const result = await db.collection("users").updateOne(
			{ _id: new ObjectId(userId) },
			{
				$set: {
					email,
					name,
					password: hashedPassword,
					updatedAt: new Date(),
				},
			},
		);

		if (result.matchedCount === 0) return { error: "User not found" };

		// Invalidate caches after updating user
		await invalidateByTag("users");
		await invalidateByTag(`user:${userId}`);

		return {
			success: true,
			message: "User updated successfully",
		};
	} catch (error) {
		console.error("Error updating user:", error);
		return { error: "Internal server error" };
	}
}

export async function deleteUser(userId: string) {
	try {
		const client = await clientPromise;
		const db = client.db();
		const result = await db.collection("users").deleteOne({
			_id: new ObjectId(userId),
		});

		if (result.deletedCount === 0) return { error: "User not found" };

		// Invalidate caches after deleting user
		await invalidateByTag("users");
		await invalidateByTag(`user:${userId}`);

		return { success: true, message: "User deleted successfully" };
	} catch (error) {
		console.error("Error deleting user:", error);
		return { error: "Internal server error" };
	}
}
