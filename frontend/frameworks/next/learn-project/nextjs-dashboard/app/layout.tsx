import "@/ui/global.css";
import { inter } from "@/ui/fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		template: "%s | Acme",
		default: "Dashboard",
	},
	description: "The official Next.js Course Dashboard, built with App Router.",
	metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>{children}</body>
		</html>
	);
}
