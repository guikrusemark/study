import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
	return str
		.toLowerCase()
		.replace(
			/(^|[\s\-_])([a-záàâãéèêíìîóòôõúùûç])/gi,
			(match, separator, char) => separator + char.toUpperCase(),
		);
}
