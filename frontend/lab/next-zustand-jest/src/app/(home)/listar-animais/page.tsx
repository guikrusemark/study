import Link from "next/link";

import { AnimalList } from "@/components/AnimalList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function Page() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<Card className="w-full max-w-md mx-auto">
				<CardTitle className="text-center">Lista de Animais</CardTitle>
				<CardContent className="p-6">
					<AnimalList />
				</CardContent>
			</Card>
			<Link className="w-full max-w-md mx-auto" href={"/"}>
				<Button className="cursor-pointer w-full">Voltar</Button>
			</Link>
		</div>
	);
}
