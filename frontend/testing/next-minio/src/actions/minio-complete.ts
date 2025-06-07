"use server";

import { minioClient } from "@/lib/minio";
import { FileUploadSchema } from "@/schema/file.zod";

// --- State Definition for useFormState ---
// We define the shape of the state that our action will return.
export type FormState = {
	status: "success" | "error" | "idle";
	message: string;
	fileUrl?: string;
};

export async function uploadFileAction(
	prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	const bucketName = process.env.MINIO_BUCKET_NAME || "documents";

	try {
		// 1. Extract and validate the file from FormData
		const file = formData.get("file");
		const validationResult = FileUploadSchema.safeParse(file);

		if (!validationResult.success) {
			// Return error state if validation fails
			return {
				status: "error",
				message: validationResult.error.errors.map((e) => e.message).join(", "),
			};
		}

		const validatedFile = validationResult.data;

		// 2. Ensure the MinIO bucket exists
		const bucketExists = await minioClient.bucketExists(bucketName);
		if (!bucketExists) {
			await minioClient.makeBucket(bucketName, "us-east-1");
		}

		// 3. Prepare the file for upload
		const fileExtension = validatedFile.name.split(".").pop() || "";
		const objectName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;

		// Convert the File to a Node.js Buffer
		// This is the step that loads the file into server memory.
		const fileBuffer = Buffer.from(await validatedFile.arrayBuffer());

		// 4. Upload the buffer to MinIO
		await minioClient.putObject(
			bucketName,
			objectName,
			fileBuffer,
			validatedFile.size,
			{ "Content-Type": validatedFile.type },
		);

		// 5. Return the success state
		const fileUrl = `http://localhost:9000/${bucketName}/${objectName}`;
		console.log("✅ Upload successful:", fileUrl);

		return {
			status: "success",
			message: "File uploaded successfully!",
			fileUrl: fileUrl,
		};
	} catch (error: unknown) {
		console.error("❌ Upload Action Error:", error);
		return {
			status: "error",
			message: "An internal error occurred. Please try again.",
		};
	}
}
