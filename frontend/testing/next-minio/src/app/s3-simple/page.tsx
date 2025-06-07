"use client";

import { getPresignedUploadUrls } from "@/actions/s3-simple";
import { type FormData, clientSchema } from "@/schema/file.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function UploadDirect() {
	const [progressItems, setProgressItems] = useState<
		{ id: string; value: number }[]
	>([]);
	const [result, setResult] = useState<string | null>(null);
	const { register, handleSubmit, formState, reset } = useForm<FormData>({
		resolver: zodResolver(clientSchema),
	});

	async function onSubmit(data: FormData) {
		setResult(null);
		setProgressItems([]);

		// Prepare file metadata
		const files = Array.from(data.files);
		const filesMeta = files.map((file) => ({
			filename: file.name,
			contentType: file.type,
			size: file.size,
		}));

		// 1️⃣ Get presigned URLs from server action
		const fd = new window.FormData();
		fd.set("files", JSON.stringify(filesMeta));
		// @ts-ignore - server action typing
		const { files: presigned, error } = await getPresignedUploadUrls(fd);
		if (error || !presigned) {
			setResult(error ?? "Failed to get presigned URLs.");
			return;
		}

		// 2️⃣ Upload files directly
		const items = files.map((file) => ({ id: file.name, value: 0 }));
		setProgressItems(items);
		await Promise.all(
			files.map((file, i) => {
				return new Promise<void>((resolve, reject) => {
					const xhr = new XMLHttpRequest();
					xhr.open("PUT", presigned[i].url, true);
					xhr.setRequestHeader("Content-Type", file.type);
					xhr.upload.onprogress = (e) => {
						if (e.lengthComputable) {
							items[i].value = Math.round((e.loaded / e.total) * 100);
							setProgressItems([...items]);
						}
					};
					xhr.onload = () =>
						xhr.status < 400 ? resolve() : reject(xhr.statusText);
					xhr.onerror = reject;
					xhr.send(file);
				});
			}),
		);
		setResult("✅ All files uploaded!");
		reset();
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
			<input
				type="file"
				multiple
				{...register("files")}
				className="border p-2"
			/>
			{formState.errors.files && (
				<div className="text-red-500">{formState.errors.files.message}</div>
			)}
			<button
				type="submit"
				className="bg-blue-600 text-white px-4 py-2 rounded"
				disabled={formState.isSubmitting}
			>
				Upload
			</button>
			{progressItems.length > 0 && (
				<div className="space-y-2">
					{progressItems.map((item) => (
						<div key={item.id} className="w-full bg-gray-200 h-2 rounded">
							<div
								className="bg-green-500 h-2 rounded"
								style={{ width: `${item.value}%` }}
							/>
						</div>
					))}
				</div>
			)}
			{result && <div className="mt-2">{result}</div>}
		</form>
	);
}
