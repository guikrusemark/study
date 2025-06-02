// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Set up Happy DOM window
const window = new Window();
Object.defineProperty(global, "window", { value: window, writable: true });
Object.defineProperty(global, "document", {
	value: window.document,
	writable: true,
});
Object.defineProperty(global, "navigator", {
	value: window.navigator,
	writable: true,
});

// Global test setup

// Mock Next.js router
jest.mock("next/navigation", () => ({
	useRouter() {
		return {
			push: jest.fn(),
			replace: jest.fn(),
			back: jest.fn(),
			forward: jest.fn(),
			refresh: jest.fn(),
			prefetch: jest.fn(),
		};
	},
	useSearchParams() {
		return new URLSearchParams();
	},
	usePathname() {
		return "";
	},
}));

// Mock crypto.randomUUID
Object.defineProperty(global, "crypto", {
	value: {
		randomUUID: jest.fn(() => "test-uuid-123"),
	},
});

// Polyfill TextEncoder/TextDecoder for Node.js
if (typeof global.TextEncoder === "undefined") {
	const { TextEncoder, TextDecoder } = require("node:util");
	global.TextEncoder = TextEncoder;
	global.TextDecoder = TextDecoder;
}
