import Link from "next/link";

import AnimalForm from "@/components/AnimalForm";
import UserForm from "@/components/UserForm";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<>
			<Link className="w-full" href={"/"}>
				<Button className="cursor-pointer w-full">Voltar</Button>
			</Link>
			<div className="flex flex-row gap-4 w-full">
				<UserForm />
				<AnimalForm />
			</div>
		</>
	);
}
