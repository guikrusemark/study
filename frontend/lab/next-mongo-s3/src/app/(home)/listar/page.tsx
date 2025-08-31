import Link from "next/link";
import AnimalCard from "@/components/AnimalCard";
import { UserCard } from "@/components/UserCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { listAnimals } from "@/lib/actions/animal";
import { listUsers } from "@/lib/actions/user";
import type { AnimalDb } from "@/lib/schemas/animal";
import type { UserDb } from "@/lib/schemas/user";

export default async function ListarPage() {
	const usersRes = await listUsers();
	const animalsRes = await listAnimals();

	// Handle error case
	if ("error" in usersRes || "error" in animalsRes) {
		return (
			<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
				<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
					<Card>
						<CardTitle className="text-center text-red-600">Erro</CardTitle>
						<CardContent>
							<p className="text-center">Erro ao listar!!</p>
						</CardContent>
					</Card>
					<Link className="w-full" href={"/"}>
						<Button className="cursor-pointer w-full">Voltar</Button>
					</Link>
				</main>
			</div>
		);
	}

	const users: UserDb[] = (Array.isArray(usersRes) ? usersRes : [])
		.map(
			(u) =>
				({
					...u,
					_id: u._id?.toString(),
				}) as Record<string, any>,
		)
		.filter(
			(u): u is UserDb =>
				typeof u.email === "string" && typeof u.name === "string",
		);
	const animals: AnimalDb[] = (Array.isArray(animalsRes) ? animalsRes : [])
		.map(
			(a) =>
				({
					...a,
					_id: a._id.toString(),
				}) as Record<string, any>,
		)
		.filter(
			(a): a is AnimalDb =>
				typeof a.name === "string" &&
				typeof a.species === "string" &&
				typeof a.age === "number",
		);

	return (
		<>
			<Link className="w-full" href={"/"}>
				<Button className="cursor-pointer w-full">Voltar</Button>
			</Link>
			<div className="flex flex-row items-start justify-center gap-8">
				<Card className="w-full">
					<CardTitle className="text-center">Lista de Usuários</CardTitle>
					<CardContent className="p-6">
						{users.length === 0 ? (
							<p className="text-center text-gray-500">
								Nenhum usuário encontrado
							</p>
						) : (
							<div className="grid gap-4">
								{users.map((user) => (
									<UserCard
										key={user._id?.toString()}
										user={user}
										className="w-full max-w-none"
									/>
								))}
							</div>
						)}
					</CardContent>
				</Card>
				<Card className="w-ful">
					<CardTitle className="text-center">Lista de Animais</CardTitle>
					<CardContent className="p-6">
						{animals.length === 0 ? (
							<p className="text-center text-gray-500">
								Nenhum animal encontrado
							</p>
						) : (
							<div className="grid gap-4">
								{animals.map((animal) => (
									<AnimalCard
										key={animal._id?.toString()}
										animal={animal}
										className="w-full max-w-none"
									/>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</>
	);
}
