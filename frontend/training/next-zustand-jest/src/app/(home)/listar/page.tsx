import Link from "next/link";

import { listUsers } from "@/actions/user";

import type { User } from "@/types/user";

import { UserCard } from "@/components/UserCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default async function ListarPage() {
	const result = await listUsers();

	// Handle error case
	if ("error" in result) {
		return (
			<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
				<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
					<Card>
						<CardTitle className="text-center text-red-600">Erro</CardTitle>
						<CardContent>
							<p className="text-center">ERRO</p>
						</CardContent>
					</Card>
					<Link className="w-full" href={"/"}>
						<Button className="cursor-pointer w-full">Voltar</Button>
					</Link>
				</main>
			</div>
		);
	}

	const users: User[] = (Array.isArray(result) ? result : [])
		.map(
			(u) =>
				({
					...u,
					_id: u._id?.toString(),
				}) as Record<string, any>,
		)
		.filter(
			(u): u is User =>
				typeof u.email === "string" && typeof u.name === "string",
		);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<Card className="w-full max-w-md mx-auto">
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
			<Link className="w-full max-w-md mx-auto" href={"/"}>
				<Button className="cursor-pointer w-full">Voltar</Button>
			</Link>
		</div>
	);
}
