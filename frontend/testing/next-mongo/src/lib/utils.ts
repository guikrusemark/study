import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
	return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}
