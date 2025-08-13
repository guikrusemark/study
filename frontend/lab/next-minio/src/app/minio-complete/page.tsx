"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { type FormState, uploadFileAction } from "@/actions/minio-complete";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// It's a best practice to create a separate component for the submit button.
// This allows it to use the `useFormStatus` hook without the parent form re-rendering.
function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" className="w-full" disabled={pending}>
			{pending ? "Uploading..." : "Upload to MinIO"}
		</Button>
	);
}

export default function HomePage() {
	const initialState: FormState = { status: "idle", message: "" };
	const [state, formAction] = useActionState(uploadFileAction, initialState);

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="w-full flex flex-col gap-[32px] row-start-2 items-center">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-2xl">Secure File Upload</CardTitle>
						<CardDescription>
							Upload a document using a Next.js Server Action.
						</CardDescription>
					</CardHeader>
					<form action={formAction}>
						<CardContent className="py-4">
							<div className="flex flex-col gap-4 w-full">
								<Label htmlFor="file">Document</Label>
								<Input id="file" name="file" type="file" required />
							</div>
							{/* Display error messages from the server action state */}
							{state.status === "error" && (
								<p className="text-sm font-medium text-destructive">
									{state.message}
								</p>
							)}
							{/* Display success messages and the file URL */}
							{state.status === "success" && (
								<div className="text-sm font-medium text-emerald-600">
									<p>{state.message}</p>
									<a
										href={state.fileUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="underline"
									>
										View Uploaded File
									</a>
								</div>
							)}
						</CardContent>
						<CardFooter className="py-4">
							<SubmitButton />
						</CardFooter>
					</form>
				</Card>
			</main>
		</div>
	);
}
