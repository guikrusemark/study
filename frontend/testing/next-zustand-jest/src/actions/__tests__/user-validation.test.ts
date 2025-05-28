import { userSchema } from "@/schemas/user";

// Simple unit tests for user validation logic
describe("User Actions - Schema Validation", () => {
	describe("User input validation", () => {
		it("validates correct user data", () => {
			const userData = {
				name: "John Doe",
				email: "john@example.com",
				password: "password123",
			};

			const result = userSchema.safeParse(userData);
			expect(result.success).toBe(true);
		});

		it("rejects invalid email format", () => {
			const userData = {
				name: "John Doe",
				email: "invalid-email",
				password: "password123",
			};

			const result = userSchema.safeParse(userData);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.errors[0].path[0]).toBe("email");
			}
		});

		it("rejects empty name", () => {
			const userData = {
				name: "",
				email: "john@example.com",
				password: "password123",
			};

			const result = userSchema.safeParse(userData);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.errors[0].path[0]).toBe("name");
			}
		});

		it("rejects empty password", () => {
			const userData = {
				name: "John Doe",
				email: "john@example.com",
				password: "",
			};

			const result = userSchema.safeParse(userData);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.errors[0].path[0]).toBe("password");
			}
		});

		it("handles multiple validation errors", () => {
			const userData = {
				name: "",
				email: "invalid-email",
				password: "",
			};

			const result = userSchema.safeParse(userData);
			expect(result.success).toBe(false);
			if (!result.success) {
				// Should have errors for name, email, and password
				const errors = result.error.errors;
				const emailError = errors.find((e) => e.path[0] === "email");
				const nameError = errors.find((e) => e.path[0] === "name");
				const passwordError = errors.find((e) => e.path[0] === "password");
				expect(emailError).toBeDefined();
				expect(nameError).toBeDefined();
				expect(passwordError).toBeDefined();
			}
		});
	});

	describe("Edge cases", () => {
		it("handles missing fields", () => {
			const userData = {};

			const result = userSchema.safeParse(userData);
			expect(result.success).toBe(false);
			if (!result.success) {
				// Should have errors for name, email, and password
				const errors = result.error.errors;
				const emailError = errors.find((e) => e.path[0] === "email");
				const nameError = errors.find((e) => e.path[0] === "name");
				const passwordError = errors.find((e) => e.path[0] === "password");
				expect(emailError).toBeDefined();
				expect(nameError).toBeDefined();
				expect(passwordError).toBeDefined();
			}
		});

		it("handles null input", () => {
			const result = userSchema.safeParse(null);
			expect(result.success).toBe(false);
		});

		it("handles non-object input", () => {
			const result = userSchema.safeParse("not an object");
			expect(result.success).toBe(false);
		});
	});
});
