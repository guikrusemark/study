"use client";

import { useState } from "react";

import { createUser } from "@/actions/user";

import { type userInput, userSchema } from "@/schemas/user";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function UserForm() {
	const [formData, setFormData] = useState<userInput>({
		name: "Guilherme",
		email: "guilherme@gmail.com",
		password: "guilhermeguilherme",
	});
	const [errors, setErrors] = useState<
		Partial<Record<keyof userInput, string>>
	>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const parsed = userSchema.safeParse(formData);

		if (!parsed.success) {
			const fieldErrors = parsed.error.flatten().fieldErrors;
			setErrors(fieldErrors as Partial<Record<keyof userInput, string>>);
			return;
		}

		const res = await createUser(parsed.data);
		if (!res.success) {
			alert(res.error);
			return;
		}
		alert("User created successfully");

		setFormData({ name: "", email: "", password: "" });
		setErrors({});

		// const response = await fetch("/api/users", {
		// 	method: "POST",
		// 	headers: { "Content-Type": "application/json" },
		// 	body: JSON.stringify(parsed.data),
		// });
		// if (response.ok) {
		// 	}
		// } else {
		// }
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
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Email"
						/>
						{errors.email && (
							<span className="text-xs text-red-500">{errors.email}</span>
						)}
					</div>
					<div className="flex flex-col space-y-1">
						<Input
							name="password"
							type="password"
							value={formData.password}
							onChange={handleChange}
							placeholder="Senha"
						/>
						{errors.password && (
							<span className="text-xs text-red-500">{errors.password}</span>
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
