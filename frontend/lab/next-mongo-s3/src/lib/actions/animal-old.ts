"use server";

import { revalidatePath } from "next/cache";
import {
	createAnimalDAL,
	deleteAnimalDAL,
	listAnimalsDAL,
	updateAnimalDAL,
} from "@/lib/dal/animal";
import { AnimalInputSchema } from "@/lib/schemas/animal";

export async function createAnimalAction(form: FormData) {
	const data = {
		name: String(form.get("name") ?? ""),
		species: String(form.get("species") ?? ""),
		age: Number(form.get("age") ?? 0),
		pics: (String(form.get("pics") ?? "") || "")
			.split(",")
			.map((s) => s.trim())
			.filter(Boolean),
	};

	// Early app-level validation (nice errors during dev)
	const parsed = AnimalInputSchema.safeParse(data);
	if (!parsed.success) {
		return { ok: false, error: parsed.error.flatten() };
	}

	const id = await createAnimalDAL(parsed.data);
	revalidatePath("/"); // or wherever your list lives
	return { ok: true, id };
}

export async function listAnimalsAction(limit = 20, cursor?: string) {
	return listAnimalsDAL(limit, cursor);
}

export async function updateAnimalAction(id: string, form: FormData) {
	const data = {
		name: String(form.get("name") ?? ""),
		species: String(form.get("species") ?? ""),
		age: Number(form.get("age") ?? 0),
		pics: (String(form.get("pics") ?? "") || "")
			.split(",")
			.map((s) => s.trim())
			.filter(Boolean),
	};
	const parsed = AnimalInputSchema.safeParse(data);
	if (!parsed.success) return { ok: false, error: parsed.error.flatten() };

	const ok = await updateAnimalDAL(id, parsed.data);
	revalidatePath("/");
	return { ok };
}

export async function deleteAnimalAction(id: string) {
	const ok = await deleteAnimalDAL(id);
	revalidatePath("/");
	return { ok };
}
