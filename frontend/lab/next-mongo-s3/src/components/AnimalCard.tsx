import Image from "next/image";
import type { HTMLAttributes } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AnimalDb } from "@/lib/schemas/animal";
import { capitalize, cn } from "@/lib/utils";

interface AnimalCardProps extends HTMLAttributes<HTMLDivElement> {
	animal: AnimalDb;
}

export function AnimalCard({ animal, className, ...props }: AnimalCardProps) {
	return (
		<Card className={cn("w-full max-w-md mx-auto", className)} {...props}>
			<CardHeader>
				<CardTitle className="text-lg font-semibold">
					{capitalize(animal.name)}
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				<div className="flex flex-col space-y-1">
					<span className="text-sm font-medium text-gray-600">Species:</span>
					<span className="text-sm">{animal.species}</span>
				</div>

				<div className="flex flex-col space-y-1">
					<span className="text-sm font-medium text-gray-600">Age:</span>
					<span className="text-sm">{animal.age}</span>
				</div>

				{animal.pics && animal.pics.length > 0 && (
					<div className="flex flex-col space-y-1">
						<span className="text-sm font-medium text-gray-600">Pictures:</span>
						<div className="flex gap-2">
							{animal.pics.map((p) => (
								<div key={p} className="h-20 w-20 overflow-hidden rounded">
									<Image
										src={p}
										alt={animal.name}
										width={80}
										height={80}
										className="object-cover"
										unoptimized
									/>
								</div>
							))}
						</div>
					</div>
				)}

				{animal._id && (
					<div className="flex flex-col space-y-1">
						<span className="text-sm font-medium text-gray-600">ID:</span>
						<span className="text-sm font-mono text-gray-500">
							{animal._id}
						</span>
					</div>
				)}

				{animal.createdAt && (
					<div className="flex flex-col space-y-1">
						<span className="text-sm font-medium text-gray-600">Created:</span>
						<span className="text-sm text-gray-500">
							{new Date(animal.createdAt).toLocaleDateString("pt-BR", {
								day: "2-digit",
								month: "long",
								year: "numeric",
							})}
						</span>
					</div>
				)}

				{animal.updatedAt && (
					<div className="flex flex-col space-y-1">
						<span className="text-sm font-medium text-gray-600">Updated:</span>
						<span className="text-sm text-gray-500">
							{new Date(animal.updatedAt).toLocaleDateString("pt-BR", {
								day: "2-digit",
								month: "long",
								year: "numeric",
							})}
						</span>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

export default AnimalCard;
