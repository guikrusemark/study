import { z } from "zod";

// --- Zod Schema ---
// The schema now validates a 'File' object directly.
const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_MIME_TYPES = [
	"image/jpeg",
	"image/png",
	"application/pdf",
	"text/csv",
];

export const FileUploadSchema = z
	.instanceof(File, { message: "A file must be provided." })
	.refine((file) => file.size > 0, "File cannot be empty.")
	.refine(
		(file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024,
		`File size must be less than ${MAX_FILE_SIZE_MB}MB.`,
	)
	.refine(
		(file) => ACCEPTED_MIME_TYPES.includes(file.type),
		`Invalid file type. Only ${ACCEPTED_MIME_TYPES.join(", ")} are accepted.`,
	);

export type FileUpload = z.infer<typeof FileUploadSchema>;

export const FileMetadataSchema = z.object({
	name: z.string(),
	type: z
		.string()
		.refine(
			(type) => ACCEPTED_MIME_TYPES.includes(type),
			`Invalid file type. Only ${ACCEPTED_MIME_TYPES.join(", ")} are accepted.`,
		),
	size: z
		.number()
		.max(
			MAX_FILE_SIZE_MB * 1024 * 1024,
			`File size must be less than ${MAX_FILE_SIZE_MB}MB.`,
		),
});

export type FileMetadata = z.infer<typeof FileMetadataSchema>;

export const fileSchema = z.object({
	filename: z.string().min(1),
	contentType: z.string().min(1),
	size: z.number().int().max(20_000_000), // 20MB limit per file
});
export const schema = z.object({
	files: z.array(fileSchema).min(1).max(10),
});

export const downloadSchema = z.object({
	key: z.string().min(1),
});

export const fileClientSchema = z
	.custom<FileList>()
	.refine((files) => files && files.length > 0, "Select at least one file")
	.refine(
		(files) => Array.from(files || []).every((f) => f.size <= 20_000_000),
		"Each file must be ≤ 20 MB",
	);
export const clientSchema = z.object({
	files: fileClientSchema,
});
export type FormData = z.infer<typeof clientSchema>;
