import { BankAccountClientSafeSchema } from "@/lib/schemas/bank-account";
import { ObjectId } from "mongodb";
import { z } from "zod";

const PersonCreateSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().email(),
	// Sensitive information, required for creation but not for public view
	nationalId: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/), // Example for Brazil's CPF
	dateOfBirth: z.coerce.date(), // z.coerce attempts to convert a string to a Date
});
type PersonCreateType = z.infer<typeof PersonCreateSchema>;

const PersonDatabaseSchema = PersonCreateSchema.extend({
	_id: z.instanceof(ObjectId),
	createdAt: z.date(),
	updatedAt: z.date(),
});
type PersonDatabaseType = z.infer<typeof PersonDatabaseSchema>;

const PersonClientSafeSchema = PersonDatabaseSchema.omit({
	nationalId: true, // CRITICAL: Never expose national ID
	// We will transform the BSON ObjectId to a string for client convenience
})
	.extend({
		id: z.string(),
	})
	.omit({ _id: true });

type PersonClientSafeType = z.infer<typeof PersonClientSafeSchema>;

// A person with an array of their sanitized bank accounts
const PersonWithAccountsClientSafeSchema = PersonClientSafeSchema.extend({
	accounts: z.array(BankAccountClientSafeSchema),
});

type PersonWithAccountsClientSafeType = z.infer<
	typeof PersonWithAccountsClientSafeSchema
>;

/*
  A resulting object sent to the client would look like this:
  {
    id: "649c1b9a9b0d1e3e8f1b6b5c",
    firstName: "Maria",
    lastName: "Silva",
    email: "maria.silva@example.com",
    dateOfBirth: "1990-05-21T00:00:00.000Z",
    createdAt: "...",
    updatedAt: "...",
    accounts: [
      { id: "649c1ba29b0d1e3e8f1b6b5d", accountType: "CHECKING", maskedAccountNumber: "XXXX-12345" },
      { id: "649c1ba69b0d1e3e8f1b6b5e", accountType: "SAVINGS", maskedAccountNumber: "XXXX-67890" }
    ]
  }
*/

export {
	PersonCreateSchema,
	type PersonCreateType,
	PersonDatabaseSchema,
	type PersonDatabaseType,
	PersonClientSafeSchema,
	type PersonClientSafeType,
	PersonWithAccountsClientSafeSchema,
	type PersonWithAccountsClientSafeType,
};
