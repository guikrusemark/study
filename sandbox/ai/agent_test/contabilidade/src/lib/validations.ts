import { z } from "zod";

export const userRegistrationSchema = z
  .object({
    name: z
      .string()
      .min(2, "Nome deve ter pelo menos 2 caracteres")
      .max(50, "Nome deve ter no máximo 50 caracteres"),
    email: z.string().email("Email inválido").toLowerCase(),
    password: z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres")
      .max(100, "Senha deve ter no máximo 100 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

export const userLoginSchema = z.object({
  email: z.string().email("Email inválido").toLowerCase(),
  password: z.string().min(1, "Senha é obrigatória"),
});

export const transactionSchema = z.object({
  description: z
    .string()
    .min(1, "Descrição é obrigatória")
    .max(200, "Descrição deve ter no máximo 200 caracteres"),
  amount: z
    .number()
    .positive("Valor deve ser positivo")
    .max(999999999, "Valor muito alto"),
  type: z.enum(["income", "expense"], {
    errorMap: () => ({ message: "Tipo deve ser receita ou despesa" }),
  }),
  category: z
    .string()
    .min(1, "Categoria é obrigatória")
    .max(50, "Categoria deve ter no máximo 50 caracteres"),
  date: z.date({
    errorMap: () => ({ message: "Data inválida" }),
  }),
});

export const updateTransactionSchema = transactionSchema.partial();

export type UserRegistration = z.infer<typeof userRegistrationSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;
export type TransactionInput = z.infer<typeof transactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
