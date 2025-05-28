import { animalSchema } from "@/schemas/animal";

describe("Animal Schema", () => {
	describe("valid inputs", () => {
		it("accepts valid animal data", () => {
			const validAnimal = {
				name: "Fluffy",
				species: "Cat",
				age: 2,
			};

			const result = animalSchema.safeParse(validAnimal);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toEqual(validAnimal);
			}
		});

		it("accepts age of 0", () => {
			const animal = {
				name: "Newborn",
				species: "Dog",
				age: 0,
			};

			const result = animalSchema.safeParse(animal);
			expect(result.success).toBe(true);
		});

		it("accepts large age values", () => {
			const animal = {
				name: "Old Dog",
				species: "Dog",
				age: 200,
			};

			const result = animalSchema.safeParse(animal);
			expect(result.success).toBe(true);
		});

		it("accepts names with special characters", () => {
			const animal = {
				name: "Mía-José",
				species: "Gato",
				age: 3,
			};

			const result = animalSchema.safeParse(animal);
			expect(result.success).toBe(true);
		});

		it("accepts species with spaces", () => {
			const animal = {
				name: "Tweety",
				species: "Canary Bird",
				age: 1,
			};

			const result = animalSchema.safeParse(animal);
			expect(result.success).toBe(true);
		});
	});

	describe("invalid name", () => {
		it("rejects missing name", () => {
			const animal = {
				species: "Cat",
				age: 2,
			};

			const result = animalSchema.safeParse(animal);
			expect(result.success).toBe(false);
		});

		it("rejects empty name", () => {
			const animal = {
				name: "",
				species: "Cat",
				age: 2,
			};

			const result = animalSchema.safeParse(animal);
			expect(result.success).toBe(false);
		});

		it("rejects whitespace-only name", () => {
			const animal = {
				name: "   ",
				species: "Cat",
				age: 2,
			};

			const result = animalSchema.safeParse(animal);
			expect(result.success).toBe(false);
		});

		it("rejects non-string name", () => {
			const animal = {
				name: 123,
				species: "Cat",
				age: 2,
			};

			const result = animalSchema.safeParse(animal);
			expect(result.success).toBe(false);
		});
	});

	describe("invalid species", () => {
		it("rejects missing species", () => {
			const animal = {
				name: "Fluffy",
				age: 2,
			};

			const result = animalSchema.safeParse(animal);
			expect(result.success).toBe(false);
		});

		it("rejects empty species", () => {
			const animal = {
				name: "Fluffy",
				species: "",
				age: 2,
			};

			const result = animalSchema.safeParse(animal);
			expect(result.success).toBe(false);
		});

		it("rejects whitespace-only species", () => {
			const animal = {
				name: "Fluffy",
				species: "   ",
				age: 2,
			};

			const result = animalSchema.safeParse(animal);
			expect(result.success).toBe(false);
		});

		it("rejects non-string species", () => {
			const animal = {
				name: "Fluffy",
				species: true,
				age: 2,
			};

			const result = animalSchema.safeParse(animal);
			expect(result.success).toBe(false);
		});
	});

	describe("invalid age", () => {
		it("rejects missing age", () => {
			const animal = {
				name: "Fluffy",
				species: "Cat",
			};

			const result = animalSchema.safeParse(animal);
			expect(result.success).toBe(false);
		});

		it("rejects negative age", () => {
			const animal = {
				name: "Fluffy",
				species: "Cat",
				age: -1,
			};

			const result = animalSchema.safeParse(animal);
			expect(result.success).toBe(false);
		});

		it("rejects decimal age", () => {
			const animal = {
				name: "Fluffy",
				species: "Cat",
				age: 2.5,
			};

			const result = animalSchema.safeParse(animal);
			expect(result.success).toBe(false);
		});

		it("rejects string age", () => {
			const animal = {
				name: "Fluffy",
				species: "Cat",
				age: "2",
			};

			const result = animalSchema.safeParse(animal);
			expect(result.success).toBe(false);
		});

		it("rejects NaN age", () => {
			const animal = {
				name: "Fluffy",
				species: "Cat",
				age: Number.NaN,
			};

			const result = animalSchema.safeParse(animal);
			expect(result.success).toBe(false);
		});

		it("rejects Infinity age", () => {
			const animal = {
				name: "Fluffy",
				species: "Cat",
				age: Number.POSITIVE_INFINITY,
			};

			const result = animalSchema.safeParse(animal);
			expect(result.success).toBe(false);
		});
	});

	describe("extra fields", () => {
		it("strips extra fields", () => {
			const animalWithExtra = {
				name: "Fluffy",
				species: "Cat",
				age: 2,
				color: "orange",
				owner: "John Doe",
			};

			const result = animalSchema.safeParse(animalWithExtra);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).not.toHaveProperty("color");
				expect(result.data).not.toHaveProperty("owner");
				expect(Object.keys(result.data)).toEqual(["name", "species", "age"]);
			}
		});
	});

	describe("type coercion", () => {
		it("does not coerce string age to number", () => {
			const animal = {
				name: "Fluffy",
				species: "Cat",
				age: "2",
			};

			const result = animalSchema.safeParse(animal);
			expect(result.success).toBe(false);
		});

		it("does not coerce other types", () => {
			const animal = {
				name: 123,
				species: null,
				age: "two",
			};

			const result = animalSchema.safeParse(animal);
			expect(result.success).toBe(false);
		});
	});

	describe("error messages", () => {
		it("provides specific error messages for each field", () => {
			const invalidAnimal = {
				name: "",
				species: "",
				age: -1,
			};

			const result = animalSchema.safeParse(invalidAnimal);
			expect(result.success).toBe(false);

			if (!result.success) {
				const errors = result.error.errors;
				const nameError = errors.find((e) => e.path[0] === "name");
				const speciesError = errors.find((e) => e.path[0] === "species");
				const ageError = errors.find((e) => e.path[0] === "age");
				// Accept either the custom or the min error for name/species
				expect(
					nameError?.message === "Name cannot be empty or whitespace only" ||
						nameError?.message.includes("1 character"),
				).toBe(true);
				expect(
					speciesError?.message ===
						"Species cannot be empty or whitespace only" ||
						speciesError?.message.includes("1 character"),
				).toBe(true);
				expect(ageError?.message).toMatch(
					/greater than or equal to 0|nonnegative/,
				);
			}
		});

		it("handles completely invalid input", () => {
			const result = animalSchema.safeParse(null);
			expect(result.success).toBe(false);

			if (!result.success) {
				expect(result.error.errors.length).toBeGreaterThan(0);
			}
		});

		it("handles array input", () => {
			const result = animalSchema.safeParse([]);
			expect(result.success).toBe(false);
		});

		it("handles primitive input", () => {
			const result = animalSchema.safeParse("not an object");
			expect(result.success).toBe(false);
		});
	});
});
