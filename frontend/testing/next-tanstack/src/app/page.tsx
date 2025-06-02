"use client";

import Link from "next/link";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { User } from "@/types/user";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@components/ui/card";

export default function Home() {
	// const queryClient = useQueryClient();

	const qr = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			return fetch("/api/users").then((res) => res.json());
		},
	});

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<Card className="w-40 sm:w-80">
					<CardTitle className="text-center">Escolha a ação</CardTitle>
					<CardContent className="flex flex-col gap-2 items-center justify-center">
						{qr.isLoading ? (
							<div>Carregando</div>
						) : (
							qr.data.map((user: User) => (
								<div
									key={user._id}
									className="flex flex-col gap-2 items-center justify-center"
								>
									<span className="text-sm text-muted-foreground">
										{user.name}
									</span>
									<span className="text-xs text-muted-foreground">
										{user.email}
									</span>
								</div>
							))
						)}
					</CardContent>
					<CardContent className="flex flex-col gap-4 ">
						<Link href="/adicionar">
							<Button className="cursor-pointer w-full mb-8">
								Adicionar Usuários
							</Button>
						</Link>
						<Link href={"/listar"}>
							<Button className="cursor-pointer w-full">Listar Usuários</Button>
						</Link>
						<Link href={"/listar-animais"}>
							<Button className="cursor-pointer w-full mb-8">
								Listar Animais
							</Button>
						</Link>
						<Link href="/cache">
							<Button className="cursor-pointer w-full">Ver Cache</Button>
						</Link>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
