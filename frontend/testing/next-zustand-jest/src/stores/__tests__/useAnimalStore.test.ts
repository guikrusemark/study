import { useAnimalStore } from "@/stores/useAnimalStore";
import type { Animal } from "@/types/animal";

describe("useAnimalStore", () => {
	beforeEach(() => {
		// Reset store state before each test
		useAnimalStore.setState({
			animals: [],
		});
	});

	it("should initialize with empty animals array", () => {
		const store = useAnimalStore.getState();
		expect(store.animals).toEqual([]);
	});

	it("should add an animal", () => {
		const newAnimal: Animal = {
			_id: "1",
			name: "Rex",
			species: "Dog",
			age: 24,
		};

		const store = useAnimalStore.getState();
		store.addAnimal(newAnimal);

		const updatedStore = useAnimalStore.getState();
		expect(updatedStore.animals).toHaveLength(1);
		expect(updatedStore.animals[0]).toEqual(newAnimal);
	});

	it("should add multiple animals", () => {
		const animal1: Animal = {
			_id: "1",
			name: "Rex",
			species: "Dog",
			age: 24,
		};

		const animal2: Animal = {
			_id: "2",
			name: "Whiskers",
			species: "Cat",
			age: 12,
		};

		const store = useAnimalStore.getState();
		store.addAnimal(animal1);
		store.addAnimal(animal2);

		const updatedStore = useAnimalStore.getState();
		expect(updatedStore.animals).toHaveLength(2);
		expect(updatedStore.animals).toContain(animal1);
		expect(updatedStore.animals).toContain(animal2);
	});

	it("should update an animal", () => {
		const animal: Animal = {
			_id: "1",
			name: "Rex",
			species: "Dog",
			age: 24,
		};

		const store = useAnimalStore.getState();
		store.addAnimal(animal);

		const updates = { name: "Max", age: 36 };

		store.updateAnimal("1", updates);

		const updatedStore = useAnimalStore.getState();
		expect(updatedStore.animals[0]).toEqual({
			_id: "1",
			name: "Max",
			species: "Dog",
			age: 36,
		});
	});

	it("should not update non-existent animal", () => {
		const animal: Animal = {
			_id: "1",
			name: "Rex",
			species: "Dog",
			age: 24,
		};

		const store = useAnimalStore.getState();
		store.addAnimal(animal);

		store.updateAnimal("2", { name: "Max" });

		const updatedStore = useAnimalStore.getState();
		expect(updatedStore.animals[0]).toEqual(animal);
	});

	it("should not remove non-existent animal", () => {
		const animal: Animal = {
			_id: "1",
			name: "Rex",
			species: "Dog",
			age: 24,
		};

		const store = useAnimalStore.getState();
		store.addAnimal(animal);

		store.removeAnimal("2");

		const updatedStore = useAnimalStore.getState();
		expect(updatedStore.animals).toHaveLength(1);
		expect(updatedStore.animals[0]).toEqual(animal);
	});

	it("should handle partial updates", () => {
		const animal: Animal = {
			_id: "1",
			name: "Rex",
			species: "Dog",
			age: 24,
		};

		const store = useAnimalStore.getState();
		store.addAnimal(animal);

		store.updateAnimal("1", { name: "Max" });

		const updatedStore = useAnimalStore.getState();
		expect(updatedStore.animals[0]).toEqual({
			_id: "1",
			name: "Max",
			species: "Dog",
			age: 24,
		});
	});
});
