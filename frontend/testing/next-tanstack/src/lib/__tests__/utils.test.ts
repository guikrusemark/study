import { capitalize, cn } from "@/lib/utils";

describe("Utils Functions", () => {
	describe("cn (className merger)", () => {
		it("merges class names correctly", () => {
			expect(cn("px-4", "py-2", "bg-blue-500")).toBe("px-4 py-2 bg-blue-500");
		});

		it("handles conditional classes", () => {
			expect(
				cn("base-class", true && "conditional-class", false && "hidden-class"),
			).toBe("base-class conditional-class");
		});

		it("handles Tailwind conflicts correctly", () => {
			expect(cn("px-4", "px-6")).toBe("px-6");
			expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
		});

		it("handles undefined and null values", () => {
			expect(cn("base", undefined, null, "final")).toBe("base final");
		});

		it("handles empty strings", () => {
			expect(cn("", "class1", "", "class2")).toBe("class1 class2");
		});

		it("handles arrays of classes", () => {
			expect(cn(["class1", "class2"], "class3")).toBe("class1 class2 class3");
		});

		it("handles objects with boolean values", () => {
			expect(
				cn({
					class1: true,
					class2: false,
					class3: true,
				}),
			).toBe("class1 class3");
		});

		it("returns empty string for no arguments", () => {
			expect(cn()).toBe("");
		});
	});

	describe("capitalize", () => {
		it("capitalizes first letter of single word", () => {
			expect(capitalize("hello")).toBe("Hello");
		});

		it("capitalizes first letter of each word", () => {
			expect(capitalize("hello world")).toBe("Hello World");
		});

		it("handles mixed case input", () => {
			expect(capitalize("hELLo WoRLD")).toBe("Hello World");
		});

		it("handles single character", () => {
			expect(capitalize("a")).toBe("A");
		});

		it("handles empty string", () => {
			expect(capitalize("")).toBe("");
		});

		it("handles strings with numbers", () => {
			expect(capitalize("hello 123 world")).toBe("Hello 123 World");
		});

		it("handles strings with special characters", () => {
			expect(capitalize("hello-world test_case")).toBe("Hello-World Test_Case");
		});

		it("handles multiple spaces", () => {
			expect(capitalize("hello  world   test")).toBe("Hello  World   Test");
		});

		it("preserves spacing and punctuation", () => {
			expect(capitalize("hello, world! how are you?")).toBe(
				"Hello, World! How Are You?",
			);
		});

		it("handles accented characters", () => {
			expect(capitalize("joão maria")).toBe("João Maria");
		});

		it("handles strings starting with non-letters", () => {
			expect(capitalize("123 hello world")).toBe("123 Hello World");
		});
	});
});
