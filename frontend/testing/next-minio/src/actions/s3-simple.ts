"use server";

import { s3Client } from "@/lib/s3";
import { downloadSchema, schema } from "@/schema/file.zod";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function getPresignedUploadUrls(formData: FormData) {
	// Extract file metadata from formData (as JSON)
	const filesRaw = formData.get("files");
	let files: unknown;
	try {
		files = JSON.parse(typeof filesRaw === "string" ? filesRaw : "");
	} catch {
		return { error: "Malformed files data" };
	}
	const parsed = schema.safeParse({ files });
	if (!parsed.success) {
		return { error: "Invalid payload", details: parsed.error.errors };
	}

	const bucket = process.env.MINIO_BUCKET_NAME || "my-bucket";
	const presignedFiles = await Promise.all(
		parsed.data.files.map(async (file) => {
			const key = `${Date.now()}_${file.filename}`;
			const command = new PutObjectCommand({
				Bucket: bucket,
				Key: key,
				ContentType: file.contentType,
			});
			console.log(command);
			const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });
			return { url, key };
		}),
	);
	return { files: presignedFiles };
}

export async function getPresignedDownloadUrl(formData: FormData) {
	const key = formData.get("key");
	const result = downloadSchema.safeParse({ key });
	if (!result.success)
		return { error: "Invalid payload", details: result.error.errors };

	const bucket = process.env.MINIO_BUCKET_NAME || "my-bucket";
	const command = new GetObjectCommand({
		Bucket: bucket,
		Key: result.data.key,
	});
	const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });
	return { url };
}
