import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<Card>
					<CardTitle className="text-center">PROTEGIDO</CardTitle>
					<CardContent>CONTEUDO PROTEGIDO</CardContent>
				</Card>
			</main>
			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
				TESTE DE AUTENTICAÇÃO
			</footer>
		</div>
	);
}
