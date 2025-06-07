"use server";

import crypto from "crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { s3Client } from "@/lib/s3";
import { FileMetadataSchema } from "@/schema/file.zod";
import type { PresignedUrlState } from "@/types/url";

const generateFileName = (bytes = 32) =>
	crypto.randomBytes(bytes).toString("hex");

// --- The Server Action to Generate the Pre-signed URL ---
export async function generatePresignedUrlAction(
	prevState: PresignedUrlState,
	formData: FormData,
): Promise<PresignedUrlState> {
	// 1. Validate the file metadata with Zod
	const fileData = {
		name: formData.get("name") as string,
		type: formData.get("type") as string,
		size: Number.parseInt(formData.get("size") as string, 10),
	};

	const validationResult = FileMetadataSchema.safeParse(fileData);

	if (!validationResult.success) {
		return {
			status: "error",
			message: validationResult.error.errors.map((e) => e.message).join(", "),
		};
	}

	const { name, type, size } = validationResult.data;
	const fileExtension = name.split(".").pop();
	const objectName = `${generateFileName()}.${fileExtension}`;

	try {
		// 2. Create the PutObjectCommand
		const command = new PutObjectCommand({
			Bucket: process.env.MINIO_BUCKET_NAME || "my-bucket",
			Key: objectName,
			ContentType: type,
			ContentLength: size,
		});

		// 3. Generate the pre-signed URL
		const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 }); // URL expires in 60 seconds

		console.log("✅ Pre-signed URL generated successfully:", signedUrl);

		return {
			status: "success",
			message: "URL ready for upload.",
			url: signedUrl,
			objectName: objectName,
		};
	} catch (error) {
		console.error("❌ Error generating pre-signed URL:", error);
		return {
			status: "error",
			message: "Failed to generate upload URL.",
		};
	}
}
