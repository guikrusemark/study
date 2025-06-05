import { auth } from "@/auth";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default async function Home() {
	const session = await auth();

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<Card>
					<CardTitle className="text-center">PROTEGIDO</CardTitle>
					{session ? (
						<CardContent>Você é o usuário {session.user.email}</CardContent>
					) : (
						<CardContent>Você não está autenticado</CardContent>
					)}
				</Card>
			</main>
		</div>
	);
}
