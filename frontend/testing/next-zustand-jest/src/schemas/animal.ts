import { z } from "zod";

export const animalSchema = z.object({
	name: z.string().refine((val) => val.trim().length > 0, {
		message: "Name cannot be empty or whitespace only",
	}),
	species: z.string().refine((val) => val.trim().length > 0, {
		message: "Species cannot be empty or whitespace only",
	}),
	age: z.number().int().nonnegative(),
});

export type AnimalInput = z.infer<typeof animalSchema>;
