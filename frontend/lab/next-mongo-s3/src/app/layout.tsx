import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Menu",
};

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body
				className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] dark antialiased`}
			>
				<main className="flex flex-col justify-items-center items-center min-h-screen">
					<div className="flex flex-col justify-items-center items-center min-w-1/3 max-w-2/3 p-16 gap-16">
						{children}
					</div>
				</main>
			</body>
		</html>
	);
}
