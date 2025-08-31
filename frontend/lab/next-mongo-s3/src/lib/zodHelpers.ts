import type { ZodError } from "zod";

// Convert a ZodError into a flat map of top-level field -> first error message.
// This is intentionally conservative: it only extracts top-level fields (name, email, etc.).
export function zodErrorToFieldErrors<T extends Record<string, unknown>>(
	error: ZodError<T>,
): Partial<Record<keyof T, string>> {
	const result: Partial<Record<keyof T, string>> = {};

	// Try z.treeifyError if available at runtime
	try {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const zLib = require("zod");
		const treeify = (zLib && (zLib.z?.treeifyError ?? zLib.treeifyError)) as
			| ((err: unknown) => unknown)
			| undefined;

		const tree = treeify ? treeify(error) : undefined;
		if (tree && typeof tree === "object") {
			type TreeEntry = { _errors?: string[] };
			type Tree = Record<string, TreeEntry>;
			const treeObj = tree as Tree;
			for (const key of Object.keys(treeObj)) {
				const entry = treeObj[key];
				if (entry && Array.isArray(entry._errors) && entry._errors.length > 0) {
					(result as Record<string, string>)[key] = entry._errors[0];
				}
			}
			return result;
		}
	} catch {
		// fallthrough to fallback below
	}

	// Fallback: use flatten() if present (older zod versions)
	const anyErr = error as unknown as {
		flatten?: () => { fieldErrors?: Record<string, string[]> };
	};
	if (anyErr?.flatten) {
		const flat = anyErr.flatten();
		const fieldErrors = flat?.fieldErrors as
			| Record<string, string[]>
			| undefined;
		if (fieldErrors) {
			for (const key of Object.keys(fieldErrors)) {
				const arr = fieldErrors[key];
				if (Array.isArray(arr) && arr.length > 0) {
					(result as Record<string, string>)[key] = arr[0];
				}
			}
		}
	}

	return result;
}
