// lib/minio.ts
import { Client } from "minio";

export const minioClient = new Client({
	endPoint: process.env.MINIO_ENDPOINT || "localhost",
	port: Number.parseInt(process.env.MINIO_PORT || "9000", 10),
	useSSL: false,
	accessKey: process.env.MINIO_ROOT_USER || "minioadmin",
	secretKey: process.env.MINIO_ROOT_PASSWORD || "minioadmin",
});
