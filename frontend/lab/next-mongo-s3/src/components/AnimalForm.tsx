"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createAnimal } from "@/lib/actions/animal";
import { type AnimalInput, AnimalInputSchema } from "@/lib/schemas/animal";
import { zodErrorToFieldErrors } from "@/lib/zodHelpers";

export default function AnimalForm() {
	const [formData, setFormData] = useState<AnimalInput>({
		name: "Cherry",
		species: "Dog",
		age: 3,
		pics: ["https://example.com", "https://example.com/dog.jpg"],
	});
	const [errors, setErrors] = useState<
		Partial<Record<keyof AnimalInput, string>>
	>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const parsed = AnimalInputSchema.safeParse(formData);

		if (!parsed.success) {
			const fieldErrors = zodErrorToFieldErrors(parsed.error) as Partial<
				Record<keyof AnimalInput, string>
			>;
			setErrors(fieldErrors);
			return;
		}

		const res = await createAnimal(parsed.data);
		if (!res.success) {
			alert(res.error);
			return;
		}
		alert("Animal created successfully");

		setFormData({
			name: "",
			species: "",
			age: 0,
			pics: [],
		});
		setErrors({});
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle className="text-lg font-semibold text-center">
					Adicionar Usuário
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<div className="flex flex-col space-y-1">
						<Input
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder="Nome"
						/>
						{errors.name && (
							<span className="text-xs text-red-500">{errors.name}</span>
						)}
					</div>
					<div className="flex flex-col space-y-1">
						<Input
							name="species"
							value={formData.species}
							onChange={handleChange}
							placeholder="Espécie"
						/>
						{errors.species && (
							<span className="text-xs text-red-500">{errors.species}</span>
						)}
					</div>
					<div className="flex flex-col space-y-1">
						<Input
							name="age"
							type="number"
							value={Number.parseInt(formData.age.toString())}
							onChange={handleChange}
							placeholder="Idade em anos"
						/>
						{errors.age && (
							<span className="text-xs text-red-500">{errors.age}</span>
						)}
					</div>
					<div className="flex flex-col space-y-1">
						<Input
							name="pics"
							value={(formData.pics ?? []).join(", ")}
							onChange={(e) => {
								const raw = e.target.value;
								const pics = raw.trim()
									? raw
											.split(",")
											.map((url) => url.trim())
											.filter(Boolean)
									: [];
								setFormData({
									...formData,
									pics,
								});
							}}
							placeholder="URLs das fotos (separadas por vírgula)"
						/>
						{errors.pics && (
							<span className="text-xs text-red-500">{errors.pics}</span>
						)}
					</div>
					<Button className="cursor-pointer w-full" type="submit">
						Registrar
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
