import type { HTMLAttributes } from "react";

import { capitalize, cn } from "@/lib/utils";
import type { User } from "@/types/user";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserCardProps extends HTMLAttributes<HTMLDivElement> {
	user: User;
}

export function UserCard({ user, className, ...props }: UserCardProps) {
	return (
		<Card className={cn("w-full max-w-md mx-auto", className)} {...props}>
			<CardHeader>
				<CardTitle className="text-lg font-semibold">
					{capitalize(user.name)}
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				<div className="flex flex-col space-y-1">
					<span className="text-sm font-medium text-gray-600">Email:</span>
					<span className="text-sm">{user.email}</span>
				</div>
				{user._id && (
					<div className="flex flex-col space-y-1">
						<span className="text-sm font-medium text-gray-600">ID:</span>
						<span className="text-sm font-mono text-gray-500">{user._id}</span>
					</div>
				)}
				{user.createdAt && (
					<div className="flex flex-col space-y-1">
						<span className="text-sm font-medium text-gray-600">Created:</span>
						<span className="text-sm text-gray-500">
							{new Date(user.createdAt).toLocaleDateString("pt-BR", {
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
