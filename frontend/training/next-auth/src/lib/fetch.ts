import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/";

function mergeRequestOptions(
	defaultOptions: RequestInit,
	options: RequestInit,
): RequestInit {
	return {
		...defaultOptions,
		...options,
		headers: {
			...defaultOptions.headers,
			...options.headers,
		},
	};
}

function cleanEndpoint(endpoint: string): string {
	// Removed the last slash to work with the API when filtering
	const cleanedEndpoint = `${endpoint.trim().replace(/^\/|\/$/g, "")}`;

	return cleanedEndpoint;
}

async function apiRequest(
	endpoint: string,
	options: RequestInit = {},
): Promise<Response> {
	const session = await auth();
	const defaultOptions: RequestInit = {
		credentials: "include",
		// cache: "no-store",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			...(session?.user?.access_token && {
				Authorization: `Bearer ${session.user.access_token}`,
			}),
		},
	};

	const mergedOptions = mergeRequestOptions(defaultOptions, options);

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 seconds timeout
	try {
		const res = await fetch(`${BASE_URL}${cleanEndpoint(endpoint)}`, {
			...mergedOptions,
			signal: controller.signal,
		});
		clearTimeout(timeoutId);
		if (!res) {
			throw new Error("No response from server");
		}
		// if (!res.ok) {
		//   throw new Error(`HTTP error! status: ${res.status}`);
		// }

		return await res;
	} catch (error) {
		clearTimeout(timeoutId);
		throw error;
	}
}

// Generic function to create API methods
function createApiMethod(method: string) {
	return async (
		endpoint: string,
		options: RequestInit = {},
	): Promise<Response> => {
		return apiRequest(endpoint, {
			method,
			...options,
		});
	};
}

// Generate specific API methods
const apiGet = createApiMethod("GET");
const apiPost = createApiMethod("POST");
const apiDelete = createApiMethod("DELETE");
const apiPut = createApiMethod("PUT");

async function fetchListOf<T>(endpoint: string): Promise<T[]> {
	const res = await apiGet(endpoint);

	revalidatePath(endpoint);

	return res.json();
}

export {
	apiGet,
	apiPost,
	apiDelete,
	apiPut,
	fetchListOf,
	mergeRequestOptions,
	cleanEndpoint,
};
