// src/lib/schemas/user.ts
import { ObjectId } from "mongodb";
import { z } from "zod";

// Schema for validating user creation input from a form or API call
const UserCreateSchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	password: z.string().min(8),
});

type UserCreateType = z.infer<typeof UserCreateSchema>;

const UserDatabaseSchema = UserCreateSchema.extend({
	_id: z.instanceof(ObjectId),
	passwordHash: z.string(), // The password field is replaced by a hash
	createdAt: z.date(),
	updatedAt: z.date(),
}).omit({ password: true }); // Omit the original password field

type UserDatabaseType = z.infer<typeof UserDatabaseSchema>;

const UserClientSafeSchema = UserDatabaseSchema.omit({
	passwordHash: true, // OMIT the password hash
	_id: true, // Often we transform _id to a string `id` separately
}).extend({
	id: z.string(), // Add a string 'id' field for client-side convenience
});

// Infer the TypeScript type for the client-safe user object
type UserClientSafeType = z.infer<typeof UserClientSafeSchema>;

export {
	UserCreateSchema,
	type UserCreateType,
	UserDatabaseSchema,
	type UserDatabaseType,
	UserClientSafeSchema,
	type UserClientSafeType,
};
