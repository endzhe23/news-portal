import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/styles/globals.scss";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Новостной портал | 500NA700",
  description: "Креативное агентство 500NA700 - новостной портал",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
