import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Next.js Test",
  description: "A test for Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
      >
        {children}
      </body>
    </html>
  );
}
