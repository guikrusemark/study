import { z } from "zod";

export const animalSchema = z.object({
	name: z.string().min(1),
	species: z.string().min(1),
	age: z.number().int().nonnegative(),
});

export type AnimalInput = z.infer<typeof animalSchema>;
