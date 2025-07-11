import CacheMonitor from "@/components/cache-monitor";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CachePage() {
	return (
		<div className="container mx-auto p-6">
			<CacheMonitor />
			<Link className="w-full" href={"/"}>
				<Button className="cursor-pointer w-full mt-4">Voltar</Button>
			</Link>
		</div>
	);
}
