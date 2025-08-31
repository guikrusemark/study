import { ObjectId, type WithId } from "mongodb";
import {
	type AnimalInput,
	AnimalInputSchema as AnimalZ,
} from "@/lib/schemas/animal";
import clientPromise from "@/lib/services/mongo";

const COLL = "animals";

export type AnimalDoc = WithId<{
	name: string;
	species: string;
	age: number;
	pics: string[];
	createdAt: Date;
	updatedAt: Date;
}>;

export async function createAnimalDAL(input: AnimalInput) {
	const parsed = AnimalZ.parse(input);
	const db = (await clientPromise).db();

	const now = new Date();
	const res = await db.collection<AnimalDoc>(COLL).insertOne({
		...parsed,
		createdAt: now,
		updatedAt: now,
	} as any);

	return String(res.insertedId);
}

export async function listAnimalsDAL(limit = 20, cursorId?: string) {
	const db = (await clientPromise).db();
	const query: Record<string, unknown> = {};
	if (cursorId) query._id = { $lt: new ObjectId(cursorId) };

	const docs = await db
		.collection<AnimalDoc>(COLL)
		.find(query)
		.project<Pick<AnimalDoc, "_id" | "name" | "species" | "age" | "createdAt">>(
			{
				name: 1,
				species: 1,
				age: 1,
				createdAt: 1,
			},
		)
		.sort({ _id: -1 }) // latest first
		.limit(limit)
		.toArray();

	const nextCursor =
		docs.length === limit ? String(docs[docs.length - 1]._id) : null;
	return { docs, nextCursor };
}

export async function updateAnimalDAL(id: string, input: AnimalInput) {
	const parsed = AnimalZ.parse(input);
	const db = (await clientPromise).db();
	const res = await db
		.collection<AnimalDoc>(COLL)
		.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: { ...parsed, updatedAt: new Date() } },
		);
	return res.matchedCount > 0 && res.modifiedCount > 0;
}

export async function deleteAnimalDAL(id: string) {
	const db = (await clientPromise).db();
	const res = await db.collection(COLL).deleteOne({ _id: new ObjectId(id) });
	return res.deletedCount > 0;
}
