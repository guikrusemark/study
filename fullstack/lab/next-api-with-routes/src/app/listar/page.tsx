import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { UserCard } from "@/components/user-card";
import { listUsers } from "@/lib/actions/user";
import type { User } from "@/lib/types";

export default async function ListarPage() {
	const result = await listUsers();

	// Handle error case
	if ("error" in result) {
		return (
			<>
				<Card>
					<CardTitle className="text-center text-red-600">Erro</CardTitle>
					<CardContent>
						<p className="text-center">{result.error}</p>
					</CardContent>
				</Card>
				<Link className="w-full" href={"/"}>
					<Button className="cursor-pointer w-full">Voltar</Button>
				</Link>
			</>
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
		<>
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
		</>
	);
}
