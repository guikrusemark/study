// lib/minio.ts
import { S3Client } from "@aws-sdk/client-s3";

// --- Configure the S3 Client for MinIO ---
// This same client will work for AWS S3 by changing the environment variables.
export const s3Client = new S3Client({
	region: "us-east-1", // A region is still required
	endpoint: "http://localhost:9000", // Your MinIO server: include protocol
	credentials: {
		accessKeyId: process.env.MINIO_ROOT_USER || "minioadmin",
		secretAccessKey: process.env.MINIO_ROOT_PASSWORD || "minioadmin",
	},
	forcePathStyle: true, // MUST be true for MinIO
});
