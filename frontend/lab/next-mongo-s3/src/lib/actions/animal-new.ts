// src/lib/actions/animals.ts
"use server";

import { listAnimalsDAL } from "@/lib/dal/animal-new";

export type AnimalDTO = {
	id: string;
	name: string;
	species: string;
	age: number;
	createdAt: string; // ISO for client
};

export async function listAnimalsAction(limit = 10, cursor?: string) {
	const { docs, nextCursor } = await listAnimalsDAL(limit, cursor);
	const items: AnimalDTO[] = docs.map((d) => ({
		id: String(d._id),
		name: d.name,
		species: d.species,
		age: d.age,
		createdAt: d.createdAt.toISOString(),
	}));
	return { items, nextCursor };
}

/** For “Load more” from client components */
export async function loadMoreAnimalsAction(cursor?: string) {
	return listAnimalsAction(10, cursor);
}
