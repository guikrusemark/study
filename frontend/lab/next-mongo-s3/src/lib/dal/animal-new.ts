// src/lib/dal/animals.ts
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/services/mongo";

type AnimalRow = {
	_id: ObjectId;
	name: string;
	species: string;
	age: number;
	createdAt: Date;
};

const COLL = "animals";

export async function listAnimalsDAL(limit = 10, cursorId?: string) {
	const db = (await clientPromise).db();

	const query: Record<string, unknown> = {};
	if (cursorId) query._id = { $lt: new ObjectId(cursorId) }; // backward pagination

	const docs = await db
		.collection<AnimalRow>(COLL)
		.find(query, { projection: { name: 1, species: 1, age: 1, createdAt: 1 } })
		.sort({ _id: -1 }) // latest first
		.limit(limit)
		.toArray();

	const nextCursor =
		docs.length === limit ? String(docs[docs.length - 1]._id) : null;

	return { docs, nextCursor };
}
