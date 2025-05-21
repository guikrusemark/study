"use client";

import { useState } from "react";

import { type userInput, userSchema } from "@/schemas/user";

import { createUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
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
		<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
			<Input
				name="name"
				value={formData.name}
				onChange={handleChange}
				placeholder="Name"
			/>
			{errors.name && <p>{errors.name}</p>}

			<Input
				name="email"
				value={formData.email}
				onChange={handleChange}
				placeholder="Email"
			/>
			{errors.email && <p>{errors.email}</p>}

			<Input
				name="password"
				type="password"
				value={formData.password}
				onChange={handleChange}
				placeholder="Password"
			/>
			{errors.password && <p>{errors.password}</p>}

			<Button className="cursor-pointer" type="submit">
				Register
			</Button>
		</form>
	);
}
