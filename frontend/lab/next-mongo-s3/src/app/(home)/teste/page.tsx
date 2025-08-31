import Link from "next/link";
import { Button } from "@/components/ui/button";
import { initAnimalsCollection, tryBadInsert } from "@/lib/actions/admin";

export default function AdminPage() {
	return (
		<>
			<Link className="w-full" href={"/"}>
				<Button className="cursor-pointer w-full">Voltar</Button>
			</Link>

			<div className="w-[420px] rounded-2xl border p-8 space-y-4 shadow-sm">
				<h1 className="text-center text-2xl font-semibold">Escolha a ação</h1>

				<form
					action={async () => {
						"use server";
						const res = await initAnimalsCollection();
						console.log("[initAnimalsCollection]", res);
					}}
				>
					<Button type="submit" className="w-full cursor-pointer">
						Inicializar/Atualizar coleção
					</Button>
				</form>

				<form
					action={async () => {
						"use server";
						const res = await tryBadInsert();
						console.log("[tryBadInsert]", res);
					}}
				>
					<Button type="submit" className="w-full cursor-pointer">
						Tentar inserção inválida (4 fotos)
					</Button>
				</form>
			</div>
		</>
	);
}
