import { z } from "zod";

const AnimalInputSchema = z.object({
	name: z.string().min(1),
	species: z.string().min(1),
	age: z.number().int().min(0).nonnegative(),
	pics: z.array(z.url()).default([]),
});

type AnimalInput = z.infer<typeof AnimalInputSchema>;

const AnimalDbSchema = z.object({
	_id: z.string().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
	name: z.string().min(1),
	species: z.string().min(1),
	age: z.number().int().min(0).nonnegative(),
	pics: z.array(z.url()).default([]),
});

type AnimalDb = z.infer<typeof AnimalDbSchema>;

export { AnimalInputSchema, AnimalDbSchema };
export type { AnimalInput, AnimalDb };
