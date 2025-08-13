import { ObjectId } from "mongodb";
import { z } from "zod";

const BankAccountTypeEnum = z.enum(["CHECKING", "SAVINGS"]);

const BankAccountCreateSchema = z.object({
	agencyNumber: z.string().length(4),
	accountNumber: z.string().min(5),
	accountType: BankAccountTypeEnum,
	// This is the "foreign key" linking this account to a person
	personId: z.instanceof(ObjectId),
});
type BankAccountCreateType = z.infer<typeof BankAccountCreateSchema>;

const BankAccountDatabaseSchema = BankAccountCreateSchema.extend({
	_id: z.instanceof(ObjectId),
	// Balance should be controlled by the server, not set directly on creation
	balance: z.number().nonnegative(),
	createdAt: z.date(),
	updatedAt: z.date(),
});
type BankAccountDatabaseType = z.infer<typeof BankAccountDatabaseSchema>;

const BankAccountClientSafeSchema = z.object({
	id: z.string(),
	accountType: BankAccountTypeEnum,
	// We could expose a masked number for display purposes
	maskedAccountNumber: z.string(),
});
type BankAccountClientSafeType = z.infer<typeof BankAccountClientSafeSchema>;

export {
	BankAccountCreateSchema,
	type BankAccountCreateType,
	BankAccountDatabaseSchema,
	type BankAccountDatabaseType,
	BankAccountClientSafeSchema,
	type BankAccountClientSafeType,
};
