import UserForm from "@/components/UserForm";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-row gap-[32px] row-start-2 items-center sm:items-start">
				<Card>
					<CardTitle className="text-center">Teste</CardTitle>
					<CardContent>
						<UserForm />
					</CardContent>
				</Card>
				<Card>
					<CardTitle className="text-center">Teste</CardTitle>
					<CardContent>
						<UserForm />
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
