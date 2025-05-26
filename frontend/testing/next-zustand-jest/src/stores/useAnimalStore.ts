import { create } from "zustand";

import type { Animal } from "@/types/animal";

export { type AnimalStore, useAnimalStore };

type AnimalStore = {
	animals: Animal[];
	addAnimal: (animal: Animal) => void;
	updateAnimal: (id: string, updates: Partial<Animal>) => void;
	removeAnimal: (id: string) => void;
};

const useAnimalStore = create<AnimalStore>((set) => ({
	animals: [],

	addAnimal: (animal) =>
		set((state) => ({ animals: [...state.animals, animal] })),

	updateAnimal: (id, updates) =>
		set((state) => ({
			animals: state.animals.map((a) =>
				a._id === id ? { ...a, ...updates } : a,
			),
		})),

	removeAnimal: (id) =>
		set((state) => ({
			animals: state.animals.filter((a) => a._id !== id),
		})),
}));
