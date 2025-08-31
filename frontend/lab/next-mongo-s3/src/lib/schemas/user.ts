// schemas/user.ts
import { z } from "zod";

const UserInputSchema = z.object({
	email: z.email(),
	name: z.string().min(1),
	password: z.string().min(1),
});

type UserInput = z.infer<typeof UserInputSchema>;

// Full user entity as stored/returned (password may be hashed and optional in listings)
const UserDbSchema = z.object({
	_id: z.string().optional(),
	email: z.email(),
	name: z.string().min(1),
	password: z.string().min(1).optional(),
	createdAt: z.date().optional(),
});

type UserDb = z.infer<typeof UserDbSchema>;

export { UserInputSchema, UserDbSchema };
export type { UserInput, UserDb };
