"use client";

import { useRef, useState } from "react";

import { uploadToMinioAction } from "@/actions/minio-simple";

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

export default function UploadPage() {
	const ref = useRef<HTMLFormElement>(null);
	const [result, setResult] = useState<string | null>(null);

	async function action(formData: FormData) {
		setResult(null);
		const res = await uploadToMinioAction(formData);
		if (res?.error) setResult(`❌ ERROR: ${res.error}`);
		else if (res?.url) setResult(`✅ SUCCESS: ${res.url}`);
	}

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
					<form ref={ref} action={action} autoComplete="off">
						<CardContent className="py-4">
							<div className="flex flex-col gap-4 w-full">
								<Label htmlFor="file">Document</Label>
								<Input id="file" name="file" type="file" required />
							</div>
							{result && <p className="text-sm font-medium">{result}</p>}
						</CardContent>
						<CardFooter className="py-4">
							<Button type="submit" className="w-full">
								Upload to MinIO
							</Button>
						</CardFooter>
					</form>
				</Card>
			</main>
		</div>
	);
}
