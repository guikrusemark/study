"use server";

import { ObjectId } from "mongodb";
import { type AnimalDb, AnimalDbSchema } from "@/lib/schemas/animal";
import { getDb } from "@/lib/services/mongo";
import { getCachedWithFallback, invalidateByTag } from "@/lib/services/redis";

export async function listAnimals() {
	return await getCachedWithFallback(
		"animals:all",
		async () => {
			const db = await getDb();
			const animals = await db.collection("animals").find().toArray();

			if (animals.length === 0) throw new Error("No animals found");
			return animals;
		},
		{ ttl: 300, tags: ["animals"] }, // 5 minutes TTL with "animals" tag
	);
}
export async function getAnimalById(animalId: string) {
	return await getCachedWithFallback(
		`animal:${animalId}`,
		async () => {
			const db = await getDb();
			const animal = await db
				.collection("animals")
				.findOne({ _id: new ObjectId(animalId) });

			if (!animal) throw new Error("Animal not found");
			return animal;
		},
		{ ttl: 600, tags: ["animals", `animal:${animalId}`] }, // 10 minutes TTL
	);
}

export async function createAnimal(animalData: AnimalDb) {
	try {
		const parsedAnimal = AnimalDbSchema.safeParse(animalData);

		if (!parsedAnimal.success)
			return { error: "Invalid input", status: 400, success: false };

		const { name, species, age, pics } = parsedAnimal.data;

		const db = await getDb();
		const result = await db.collection("animals").insertOne({
			createdAt: new Date(),
			updatedAt: new Date(),
			name,
			species,
			age,
			pics,
		});

		await invalidateByTag("animals");

		return { _id: result.insertedId.toString(), status: 200, success: true };
	} catch (error) {
		console.error("Error creating animal:", error);
		return { error: "Failed to create animal", status: 500, success: false };
	}
}

export async function updateAnimal(animalId: string, animalData: AnimalDb) {
	try {
		const parsedAnimal = AnimalDbSchema.safeParse(animalData);

		if (!parsedAnimal.success) return { error: "Invalid input" };

		const { name, species, age, pics } = parsedAnimal.data;

		const db = await getDb();
		const result = await db
			.collection("animals")
			.updateOne(
				{ _id: new ObjectId(animalId) },
				{ $set: { name, species, age, pics } },
			);

		if (result.modifiedCount === 0)
			return { error: "Animal not found or no changes made" };

		await invalidateByTag("animals");
		await invalidateByTag(`animal:${animalId}`);

		return { success: true };
	} catch (error) {
		console.error("Error updating animal:", error);
		return { error: "Failed to update animal" };
	}
}

export async function deleteAnimal(animalId: string) {
	try {
		const db = await getDb();
		const result = await db
			.collection("animals")
			.deleteOne({ _id: new ObjectId(animalId) });

		if (result.deletedCount === 0) return { error: "Animal not found" };

		await invalidateByTag("animals");
		await invalidateByTag(`animal:${animalId}`);

		return { success: true };
	} catch (error) {
		console.error("Error deleting animal:", error);
		return { error: "Failed to delete animal" };
	}
}
