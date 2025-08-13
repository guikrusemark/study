import { object, string } from "zod";

export const signInSchema = object({
	email: string().min(1).email(),
	password: string().min(1).min(6),
});
