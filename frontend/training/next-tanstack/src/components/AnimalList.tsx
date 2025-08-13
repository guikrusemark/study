"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { capitalize } from "@/lib/utils";
import { type AnimalInput, animalSchema } from "@/schemas/animal";
import { useAnimalStore } from "@/stores/useAnimalStore";
import type { Animal } from "@/types/animal";
import { useCallback, useMemo, useState } from "react";

export function AnimalList() {
	// 👇 Selector for performance: only re-render if animals change
	const animals = useAnimalStore((state) => state.animals);
	const addAnimal = useAnimalStore((state) => state.addAnimal);
	const removeAnimal = useAnimalStore((state) => state.removeAnimal);
	const updateAnimal = useAnimalStore((state) => state.updateAnimal);

	const [name, setName] = useState("");
	const [species, setSpecies] = useState("");
	const [age, setAge] = useState("");
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [sortBy, setSortBy] = useState<"name" | "species" | "age">("name");
	const [filterSpecies, setFilterSpecies] = useState("");

	// Memoized sorted and filtered animals
	const filteredAndSortedAnimals = useMemo(() => {
		let filtered = animals;

		if (filterSpecies) {
			filtered = animals.filter((animal) =>
				animal.species.toLowerCase().includes(filterSpecies.toLowerCase()),
			);
		}

		return filtered.sort((a, b) => {
			switch (sortBy) {
				case "name":
					return a.name.localeCompare(b.name);
				case "species":
					return a.species.localeCompare(b.species);
				case "age":
					return (a.age || 0) - (b.age || 0);
				default:
					return 0;
			}
		});
	}, [animals, sortBy, filterSpecies]);

	// Get unique species for filtering
	const uniqueSpecies = useMemo(() => {
		const species = animals.map((animal) => animal.species);
		return Array.from(new Set(species)).sort();
	}, [animals]);

	const validateForm = useCallback((): boolean => {
		const formData: AnimalInput = {
			name: name.trim(),
			species: species.trim(),
			age: age ? Number(age) : 0,
		};

		const result = animalSchema.safeParse(formData);

		if (!result.success) {
			const fieldErrors: Record<string, string> = {};
			for (const error of result.error.errors) {
				if (error.path[0]) {
					fieldErrors[error.path[0] as string] = error.message;
				}
			}
			setErrors(fieldErrors);
			return false;
		}

		setErrors({});
		return true;
	}, [name, species, age]);

	const handleAdd = useCallback(async () => {
		if (isSubmitting) return;

		setIsSubmitting(true);

		try {
			if (!validateForm()) {
				return;
			}

			// Simulate async operation
			await new Promise((resolve) => setTimeout(resolve, 100));

			const newAnimal: Animal = {
				_id: crypto.randomUUID(),
				name: name.trim(),
				species: species.trim(),
				age: Number(age) || undefined,
			};

			if (editingId) {
				updateAnimal(editingId, {
					name: newAnimal.name,
					species: newAnimal.species,
					age: newAnimal.age,
				});
				setEditingId(null);
			} else {
				addAnimal(newAnimal);
			}

			// Reset form
			resetForm();
		} catch (error) {
			console.error("Error managing animal:", error);
		} finally {
			setIsSubmitting(false);
		}
	}, [
		isSubmitting,
		validateForm,
		name,
		species,
		age,
		editingId,
		addAnimal,
		updateAnimal,
	]);

	const handleEdit = useCallback((animal: Animal) => {
		setName(animal.name);
		setSpecies(animal.species);
		setAge(animal.age?.toString() || "");
		setEditingId(animal._id);
		setErrors({});
	}, []);

	const handleCancelEdit = useCallback(() => {
		setEditingId(null);
		resetForm();
	}, []);

	const handleRemove = useCallback(
		(id: string) => {
			removeAnimal(id);
		},
		[removeAnimal],
	);

	const resetForm = useCallback(() => {
		setName("");
		setSpecies("");
		setAge("");
		setErrors({});
	}, []);

	const handleKeyPress = useCallback(
		(event: React.KeyboardEvent) => {
			if (event.key === "Enter" && !isSubmitting) {
				handleAdd();
			}
		},
		[handleAdd, isSubmitting],
	);

	return (
		<div className="flex flex-col gap-6 max-w-4xl mx-auto p-4">
			<div className="flex flex-col sm:flex-row gap-4 items-center">
				<div className="flex-1">
					<Input
						value={filterSpecies}
						onChange={(e) => setFilterSpecies(e.target.value)}
						placeholder="Filtrar por espécie..."
						data-testid="filter-species-input"
						className="w-full"
					/>
				</div>
				<div className="flex gap-2">
					<select
						value={sortBy}
						onChange={(e) =>
							setSortBy(e.target.value as "name" | "species" | "age")
						}
						className="px-3 py-2 border rounded-md"
						data-testid="sort-select"
					>
						<option value="name">Ordenar por Nome</option>
						<option value="species">Ordenar por Espécie</option>
						<option value="age">Ordenar por Idade</option>
					</select>
				</div>
			</div>

			{/* Animals List */}
			<div className="space-y-4">
				{filteredAndSortedAnimals.length === 0 ? (
					<div className="text-gray-500 text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
						{filterSpecies
							? `Nenhum animal encontrado para a espécie "${filterSpecies}".`
							: "Nenhum animal cadastrado ainda."}
					</div>
				) : (
					<div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2">
						{filteredAndSortedAnimals.map((animal) => (
							<Card
								key={animal._id}
								className="p-4 hover:shadow-md transition-shadow"
								data-testid={`animal-item-${animal._id}`}
							>
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<h3 className="font-semibold text-lg text-gray-800">
											{capitalize(animal.name)}
										</h3>
										<p className="text-gray-600">
											<span className="font-medium">Espécie:</span>{" "}
											{capitalize(animal.species)}
										</p>
										{animal.age && (
											<p className="text-gray-600">
												<span className="font-medium">Idade:</span> {animal.age}{" "}
												meses
											</p>
										)}
									</div>
									<div className="flex gap-2 ml-4">
										<Button
											variant="outline"
											size="sm"
											onClick={() => handleEdit(animal)}
											data-testid={`edit-animal-${animal._id}`}
											disabled={isSubmitting}
										>
											Editar
										</Button>
										<Button
											variant="destructive"
											size="sm"
											onClick={() => handleRemove(animal._id)}
											data-testid={`remove-animal-${animal._id}`}
											disabled={isSubmitting}
										>
											Remover
										</Button>
									</div>
								</div>
							</Card>
						))}
					</div>
				)}
			</div>

			{/* Add/Edit Animal Form */}
			<Card className="border-t-4 border-t-blue-500">
				<CardHeader>
					<CardTitle className="text-lg">
						{editingId ? "Editar Animal" : "Adicionar Novo Animal"}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid gap-4 sm:grid-cols-2">
						<div>
							<label
								htmlFor="animal-name"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Nome do Animal *
							</label>
							<Input
								id="animal-name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								onKeyPress={handleKeyPress}
								placeholder="Digite o nome"
								aria-label="Nome do animal"
								data-testid="animal-name-input"
								className={errors.name ? "border-red-500" : ""}
							/>
							{errors.name && (
								<p
									className="text-red-500 text-sm mt-1"
									data-testid="name-error"
								>
									{errors.name}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="animal-species"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Espécie *
							</label>
							<Input
								id="animal-species"
								value={species}
								onChange={(e) => setSpecies(e.target.value)}
								onKeyPress={handleKeyPress}
								placeholder="Ex: Cão, Gato, Pássaro"
								aria-label="Espécie do animal"
								data-testid="animal-species-input"
								className={errors.species ? "border-red-500" : ""}
								list="species-suggestions"
							/>
							<datalist id="species-suggestions">
								{uniqueSpecies.map((sp) => (
									<option key={sp} value={sp} />
								))}
							</datalist>
							{errors.species && (
								<p
									className="text-red-500 text-sm mt-1"
									data-testid="species-error"
								>
									{errors.species}
								</p>
							)}
						</div>
					</div>

					<div className="max-w-xs">
						<label
							htmlFor="animal-age"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Idade em meses (opcional)
						</label>
						<Input
							id="animal-age"
							type="number"
							value={age}
							onChange={(e) => setAge(e.target.value)}
							onKeyPress={handleKeyPress}
							placeholder="0"
							aria-label="Idade do animal"
							data-testid="animal-age-input"
							min="0"
							max="500"
							className={errors.age ? "border-red-500" : ""}
						/>
						{errors.age && (
							<p className="text-red-500 text-sm mt-1" data-testid="age-error">
								{errors.age}
							</p>
						)}
					</div>

					<div className="flex gap-3 pt-4">
						<Button
							type="button"
							onClick={handleAdd}
							disabled={isSubmitting || !name.trim() || !species.trim()}
							data-testid="add-animal-button"
							className="flex-1 sm:flex-none"
						>
							{isSubmitting
								? "Processando..."
								: editingId
									? "Atualizar Animal"
									: "Adicionar Animal"}
						</Button>

						{editingId && (
							<Button
								type="button"
								variant="outline"
								onClick={handleCancelEdit}
								disabled={isSubmitting}
								data-testid="cancel-edit-button"
							>
								Cancelar
							</Button>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
