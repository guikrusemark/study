import Link from "next/link";

import { CacheMonitor } from "@/components/CacheMonitor";
import { Button } from "@/components/ui/button";

export default function CachePage() {
	return (
		<div className="container mx-auto p-6">
			<CacheMonitor />
			<Link className="w-full" href={"/"}>
				<Button className="cursor-pointer w-full">Voltar</Button>
			</Link>
		</div>
	);
}
