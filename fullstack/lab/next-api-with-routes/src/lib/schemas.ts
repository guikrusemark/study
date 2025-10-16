// schemas/user.ts
import { z } from "zod";

export const userSchema = z.object({
	email: z.string().email(),
	name: z.string().min(1),
	password: z.string().min(1),
});

export type userInput = z.infer<typeof userSchema>;
