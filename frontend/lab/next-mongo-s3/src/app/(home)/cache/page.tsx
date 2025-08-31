import Link from "next/link";
import CacheMonitor from "@/components/CacheMonitor";
import { Button } from "@/components/ui/button";

export default function CachePage() {
	return (
		<>
			<Link className="w-full" href={"/"}>
				<Button className="cursor-pointer w-full mb-4">Voltar</Button>
			</Link>
			<CacheMonitor />
		</>
	);
}
