import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@components/ui/card";

export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<Card className="w-40 sm:w-80">
					<CardTitle className="text-center">Escolha a ação</CardTitle>
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
