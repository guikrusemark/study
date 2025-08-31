"use server";

import { MongoServerError } from "mongodb";
import { getDb } from "@/lib/services/mongo";

export async function initAnimalsCollection(): Promise<{ ok: boolean }> {
	const db = await getDb();
	const coll = "animals";

	const validator = {
		$jsonSchema: {
			bsonType: "object",
			required: ["name", "species", "age", "createdAt"],
			additionalProperties: false,
			properties: {
				_id: { bsonType: "objectId" },
				name: { bsonType: "string", minLength: 1, maxLength: 120 },
				species: { bsonType: "string", minLength: 1, maxLength: 40 },
				age: { bsonType: ["int", "long", "double"], minimum: 0 },
				pics: {
					bsonType: "array",
					maxItems: 3, // <= 3 photos enforced at DB level
					items: { bsonType: "string", minLength: 1 },
				},
				createdAt: { bsonType: "date" },
				updatedAt: { bsonType: "date" },
			},
		},
	} as const;

	// If the collection exists, modify it; otherwise, create it.
	try {
		await db.command({
			collMod: coll,
			validator,
			validationLevel: "strict",
			validationAction: "error",
		});
	} catch (e: unknown) {
		// Narrow the unknown to the MongoDB error type before accessing properties
		if (e instanceof MongoServerError && e.codeName === "NamespaceNotFound") {
			await db.createCollection(coll, {
				validator,
				validationLevel: "strict",
				validationAction: "error",
			});
		} else {
			throw e;
		}
	}

	await db.collection(coll).createIndexes([
		{ key: { createdAt: -1 }, name: "created_desc" },
		{ key: { species: 1 }, name: "species" },
	]);

	return { ok: true };
}

/** Test helper: tries to insert an invalid doc with 4 pics */
export async function tryBadInsert() {
	const db = await getDb();
	try {
		await db.collection("animals").insertOne({
			name: "Broken Dog",
			species: "canis",
			age: 2,
			pics: ["a", "b", "c", "d"], // 4 -> should fail
			createdAt: new Date(),
		});
		return { ok: false, message: "Unexpected: insert succeeded" };
	} catch (e: unknown) {
		// Expect: Document failed validation
		return { ok: true, message: String(e) };
	}
}
