import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function Home() {
	return (
		<>
			<Card className="w-40 sm:w-80">
				<CardTitle className="text-center">Escolha a ação</CardTitle>
				<CardContent className="flex flex-col gap-4 ">
					<Link href="/listar">
						<Button className="cursor-pointer w-full">Listar</Button>
					</Link>
					<Link href="/adicionar">
						<Button className="cursor-pointer w-full">Adicionar</Button>
					</Link>
					<Link href="/cache">
						<Button className="cursor-pointer w-full">Cache</Button>
					</Link>
				</CardContent>
			</Card>
		</>
	);
}
