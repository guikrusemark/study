import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

import { userSchema } from "@/lib/schemas/user";
import clientPromise from "@/lib/services/mongo";

export async function GET(request: Request) {
	try {
		const client = await clientPromise;
		const db = client.db();
		const users = await db
			.collection("users")
			.find({}, { projection: { password: 0 } })
			.toArray();

		if (!users) {
			return NextResponse.json({ error: "No users found" }, { status: 404 });
		}

		return NextResponse.json(users, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const parsed = userSchema.safeParse(body);

		if (!parsed.success) {
			return NextResponse.json(
				{ errors: parsed.error.errors },
				{ status: 400 },
			);
		}

		const { email, name, password } = parsed.data;
		const hashedPassword = await bcryptjs.hash(password, 12);

		const client = await clientPromise;
		const db = client.db();

		const existingUser = await db.collection("users").findOne({ email });
		if (existingUser) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 409 },
			);
		}

		const result = await db.collection("users").insertOne({
			name,
			email,
			password: hashedPassword,
			createdAt: new Date(),
		});

		return NextResponse.json(
			{ message: "User created", userId: result.insertedId },
			{ status: 201 },
		);
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

export async function DELETE(request: Request) {
	try {
		const { id } = await request.json();

		if (!id) {
			return NextResponse.json(
				{ error: "User ID is required" },
				{ status: 400 },
			);
		}

		const client = await clientPromise;
		const db = client.db();
		const result = await db.collection("users").deleteOne({ _id: id });

		if (result.deletedCount === 0) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "User deleted" }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
