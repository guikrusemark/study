// schemas/user.ts
import { z } from "zod";

export const UserSchema = z.object({
	email: z.string().email(),
	name: z.string().min(1),
	password: z.string().min(8),
});

export type UserInput = z.infer<typeof UserSchema>;
