import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="w-full flex flex-col gap-[32px] row-start-2 items-center">
				<Card className="w-full min-h-128 sm:w-128">
					<CardHeader className="text-center py-4">MinIO Testing</CardHeader>
					<CardContent>Testando o MinIO</CardContent>
				</Card>
			</main>
		</div>
	);
}
