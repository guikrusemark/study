"use client";

import { generatePresignedUrlAction } from "@/actions/s3-complete";
import { type FormEvent, useRef, useState } from "react";

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
import { useFormStatus } from "react-dom";

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
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [uploadStatus, setUploadStatus] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleUpload = async (event: FormEvent) => {
		event.preventDefault();
		if (!selectedFile) {
			setUploadStatus("❌ Please select a file first.");
			return;
		}

		setIsLoading(true);
		setUploadStatus("1/2: Requesting upload permission...");

		// 1. Create FormData with file metadata for the server action
		const formData = new FormData();
		formData.append("name", selectedFile.name);
		formData.append("type", selectedFile.type);
		formData.append("size", selectedFile.size.toString());

		// 2. Call the server action to get the pre-signed URL
		const presignedUrlState = await generatePresignedUrlAction(
			{ status: "idle", message: "" },
			formData,
		);

		if (presignedUrlState.status === "error" || !presignedUrlState.url) {
			setUploadStatus(`❌ Error: ${presignedUrlState.message}`);
			setIsLoading(false);
			return;
		}

		setUploadStatus("2/2: Uploading file directly to storage...");

		// 3. Use fetch to PUT the file directly to the pre-signed URL
		try {
			const response = await fetch(presignedUrlState.url, {
				method: "PUT",
				body: selectedFile,
				headers: {
					"Content-Type": selectedFile.type,
				},
			});

			if (response.ok) {
				const finalUrl = presignedUrlState.url.split("?")[0]; // Clean URL without query params
				setUploadStatus(`✅ Upload successful! File available at: ${finalUrl}`);
				// Clear the input
				if (fileInputRef.current) {
					fileInputRef.current.value = "";
				}
				setSelectedFile(null);
			} else {
				setUploadStatus(
					`❌ Upload failed. Status: ${response.status} ${response.statusText}`,
				);
			}
		} catch (error) {
			console.error("Direct upload error:", error);
			setUploadStatus("❌ An error occurred during the direct upload.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="w-full flex flex-col gap-[32px] row-start-2 items-center">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-2xl">
							Direct & Scalable File Upload
						</CardTitle>
						<CardDescription>
							Upload directly to MinIO/S3 using a Pre-signed URL.
						</CardDescription>
					</CardHeader>
					<form onSubmit={handleUpload}>
						<CardContent className="py-4">
							<div className="flex flex-col gap-4 w-full">
								<Label htmlFor="file">Document</Label>
								<Input
									id="file"
									name="file"
									type="file"
									ref={fileInputRef}
									onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
								/>
							</div>
							{uploadStatus && (
								<p
									className={`text-sm font-medium ${uploadStatus.includes("❌") ? "text-destructive" : "text-primary"}`}
								>
									{uploadStatus}
								</p>
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
