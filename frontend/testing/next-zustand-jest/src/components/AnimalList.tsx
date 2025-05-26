"use client";

import { useState } from "react";

import { useAnimalStore } from "@/stores/useAnimalStore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AnimalList() {
	// 👇 Selector for performance: only re-render if animals change
	const animals = useAnimalStore((state) => state.animals);
	const addAnimal = useAnimalStore((state) => state.addAnimal);

	const [name, setName] = useState("");
	const [species, setSpecies] = useState("");
	const [age, setAge] = useState(1);

	function handleAdd() {
		if (!name.trim() || !species.trim()) return;
		addAnimal({
			_id: crypto.randomUUID(),
			name,
			species,
			age,
		});
		setName("");
		setSpecies("");
		setAge(1);
	}

	return (
		<div className="flex flex-col gap-6">
			<ul>
				{animals.length === 0 ? (
					<li>A lista de animais está vazia.</li>
				) : (
					animals.map((animal) => (
						<li key={animal._id} className="list-disc ml-6">
							{animal.name} ({animal.species}, {animal.age} meses)
						</li>
					))
				)}
			</ul>
			<Input
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Nome do Animal"
			/>
			<Input
				value={species}
				onChange={(e) => setSpecies(e.target.value)}
				placeholder="Espécie do Animal"
			/>
			<Input
				value={age}
				onChange={(e) => setAge(Number(e.target.value))}
				placeholder="Idade do Animal"
			/>
			<Button type="button" onClick={handleAdd}>
				Add Animal
			</Button>
		</div>
	);
}
