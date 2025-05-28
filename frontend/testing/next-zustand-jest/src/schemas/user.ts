// schemas/user.ts
import { z } from "zod";

export const userSchema = z.object({
	email: z.string().email(),
	name: z.string().refine((val) => val.trim().length > 0, {
		message: "Name cannot be empty or whitespace only",
	}),
	password: z.string().min(1),
});

export type userInput = z.infer<typeof userSchema>;
