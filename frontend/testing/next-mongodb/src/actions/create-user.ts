// // app/actions/createUser.ts
// "use server";

// import { getDb } from "@/lib/mongo";
// import { UserSchema } from "@/schemas/user";
// import bcrypt from "bcryptjs";

// export async function createUser(data: unknown) {
// 	const parsed = UserSchema.safeParse(data);
// 	if (!parsed.success) return { error: "Invalid input" };

// 	const db = await getDb();
// 	const { email, name, password } = parsed.data;

// 	const existing = await db.collection("users").findOne({ email });
// 	if (existing) return { error: "User already exists" };

// 	const hash = await bcrypt.hash(password, 12);

// 	await db.collection("users").insertOne({
// 		email,
// 		name,
// 		password: hash,
// 		createdAt: new Date(),
// 	});

// 	return { success: true };
// }
