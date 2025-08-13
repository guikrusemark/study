"use server";

import { randomUUID } from "crypto";
import { minioClient } from "@/lib/minio";

export async function uploadToMinioAction(formData: FormData) {
	// Get file from FormData (browser File API)
	const file = formData.get("file") as File | null;
	if (!file) {
		return { error: "Missing file." };
	}

	// Prepare object name & bucket
	const objectName = `${randomUUID()}_${file.name}`;
	const bucket = process.env.MINIO_BUCKET_NAME || "documents";

	// Upload buffer to MinIO
	await minioClient.putObject(
		bucket,
		objectName,
		Buffer.from(await file.arrayBuffer()),
		undefined,
		{ "Content-Type": file.type },
	);

	// Presigned URL (24h)
	const presigned = await minioClient.presignedGetObject(
		bucket,
		objectName,
		24 * 60 * 60,
	);

	return { key: objectName, url: presigned };
}
