import Link from "next/link";

import type { ObjectId } from "mongodb";

import { listUsers } from "@/actions/user";

import type { User } from "@/types/user";

import { UserCard } from "@/components/UserCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

type MongoUser = {
	_id?: ObjectId | string;
	email?: string;
	name?: string;
	password?: string;
	createdAt?: Date;
};

export default async function ListarPage() {
	let users: User[] = [];

	try {
		const result = await listUsers();

		users = (Array.isArray(result) ? result : [])
			.filter(
				(u: MongoUser): u is MongoUser & { email: string; name: string } =>
					typeof u.email === "string" && typeof u.name === "string",
			)
			.map((u) => ({
				...u,
				_id: u._id ? u._id.toString() : undefined,
			})) as User[];
	} catch (err) {
		return (
			<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
				<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
					<Card>
						<CardTitle className="text-center text-red-600">Erro</CardTitle>
						<CardContent>
							<p className="text-center">
								Não foi possível carregar os usuários.
							</p>
						</CardContent>
					</Card>
					<Link className="w-full" href={"/"}>
						<Button className="cursor-pointer w-full">Voltar</Button>
					</Link>
				</main>
			</div>
		);
	}

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
