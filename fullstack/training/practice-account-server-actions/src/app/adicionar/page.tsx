import Link from "next/link";

import { Button } from "@/components/ui/button";
import UserForm from "@/components/user-form";

export default function Home() {
	return (
		<>
			<UserForm />
			<Link className="w-full" href={"/"}>
				<Button className="cursor-pointer w-full">Voltar</Button>
			</Link>
		</>
	);
}
