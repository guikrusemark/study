import { signIn } from "@/auth";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignInCard() {
	return (
		<Card>
			<CardTitle className="text-center">Autentique-se</CardTitle>
			<CardContent>
				<form
					action={async (formData) => {
						"use server";
						await signIn("credentials", formData);
					}}
					className="flex flex-col gap-4"
				>
					<label htmlFor="email">Email</label>
					<Input id="email" name="email" type="email" />

					<label htmlFor="password">Password</label>
					<Input id="password" name="password" type="password" />

					<Button className="cursor-pointer">Sign In</Button>
				</form>
			</CardContent>
		</Card>
	);
}
