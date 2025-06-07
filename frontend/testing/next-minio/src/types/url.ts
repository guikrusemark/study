// --- State Definition ---
export type PresignedUrlState = {
	status: "success" | "error" | "idle";
	message: string;
	url?: string;
	objectName?: string;
};
