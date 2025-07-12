import CacheMonitor from "@/components/cache-monitor";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CachePage() {
	return (
		<>
			<CacheMonitor />
			<Link className="w-full" href={"/"}>
				<Button className="cursor-pointer w-full mt-4">Voltar</Button>
			</Link>
		</>
	);
}
