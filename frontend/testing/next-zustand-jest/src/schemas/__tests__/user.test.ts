import { userSchema } from "@/schemas/user";

describe("User Schema", () => {
	describe("valid inputs", () => {
		it("accepts valid user data", () => {
			const validUser = {
				email: "test@example.com",
				name: "John Doe",
				password: "password123",
			};

			const result = userSchema.safeParse(validUser);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toEqual(validUser);
			}
		});

		it("accepts minimal valid data", () => {
			const minimalUser = {
				email: "a@b.co",
				name: "A",
				password: "1",
			};

			const result = userSchema.safeParse(minimalUser);
			expect(result.success).toBe(true);
		});

		it("accepts long email addresses", () => {
			const user = {
				email: "very.long.email.address@subdomain.example.com",
				name: "Test User",
				password: "password",
			};

			const result = userSchema.safeParse(user);
			expect(result.success).toBe(true);
		});

		it("accepts names with spaces and special characters", () => {
			const user = {
				email: "test@example.com",
				name: "José María da Silva",
				password: "password",
			};

			const result = userSchema.safeParse(user);
			expect(result.success).toBe(true);
		});
	});

	describe("invalid email", () => {
		it("rejects missing email", () => {
			const user = {
				name: "John Doe",
				password: "password123",
			};

			const result = userSchema.safeParse(user);
			expect(result.success).toBe(false);
		});

		it("rejects invalid email format", () => {
			const invalidEmails = [
				"notanemail",
				"@example.com",
				"test@",
				"test..test@example.com",
				"test@example",
				"test @example.com",
				"",
			];

			for (const email of invalidEmails) {
				const user = {
					email,
					name: "John Doe",
					password: "password123",
				};

				const result = userSchema.safeParse(user);
				expect(result.success).toBe(false);
			}
		});
	});

	describe("invalid name", () => {
		it("rejects missing name", () => {
			const user = {
				email: "test@example.com",
				password: "password123",
			};

			const result = userSchema.safeParse(user);
			expect(result.success).toBe(false);
		});

		it("rejects empty name", () => {
			const user = {
				email: "test@example.com",
				name: "",
				password: "password123",
			};

			const result = userSchema.safeParse(user);
			expect(result.success).toBe(false);
		});

		it("rejects whitespace-only name", () => {
			const user = {
				email: "test@example.com",
				name: "   ",
				password: "password123",
			};

			const result = userSchema.safeParse(user);
			expect(result.success).toBe(false);
		});
	});

	describe("invalid password", () => {
		it("rejects missing password", () => {
			const user = {
				email: "test@example.com",
				name: "John Doe",
			};

			const result = userSchema.safeParse(user);
			expect(result.success).toBe(false);
		});

		it("rejects empty password", () => {
			const user = {
				email: "test@example.com",
				name: "John Doe",
				password: "",
			};

			const result = userSchema.safeParse(user);
			expect(result.success).toBe(false);
		});
	});

	describe("extra fields", () => {
		it("strips extra fields", () => {
			const userWithExtra = {
				email: "test@example.com",
				name: "John Doe",
				password: "password123",
				extraField: "should be removed",
			};

			const result = userSchema.safeParse(userWithExtra);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).not.toHaveProperty("extraField");
				expect(Object.keys(result.data)).toEqual(["email", "name", "password"]);
			}
		});
	});

	describe("type coercion", () => {
		it("does not coerce non-string values", () => {
			const user = {
				email: 123,
				name: true,
				password: null,
			};

			const result = userSchema.safeParse(user);
			expect(result.success).toBe(false);
		});
	});

	describe("error messages", () => {
		it("provides specific error messages for each field", () => {
			const invalidUser = {
				email: "invalid-email",
				name: "",
				password: "",
			};

			const result = userSchema.safeParse(invalidUser);
			expect(result.success).toBe(false);

			if (!result.success) {
				const errors = result.error.errors;
				const emailError = errors.find((e) => e.path[0] === "email");
				const nameError = errors.find((e) => e.path[0] === "name");
				const passwordError = errors.find((e) => e.path[0] === "password");
				expect(emailError?.message).toContain("email");
				// Accept either the custom or the min error for name
				expect(
					nameError?.message === "Name cannot be empty or whitespace only" ||
						nameError?.message.includes("1 character"),
				).toBe(true);
				expect(passwordError?.message).toContain("1 character");
			}
		});
	});
});
