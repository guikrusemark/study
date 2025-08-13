import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "@/lib/globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Next with MongoDB",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body
				className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
			>
				<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
					<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}
