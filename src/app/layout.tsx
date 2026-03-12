import type { Metadata } from "next";
import { Gowun_Batang, Allura } from "next/font/google";
import "./globals.css";

const gowunBatang = Gowun_Batang({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-gowun-batang" });
const allura = Allura({ subsets: ["latin"], weight: ["400"], variable: "--font-allura" });

export const metadata: Metadata = {
    title: "Love Yourself by Anastasiya",
    description: "Güzellik ve bakım merkezi",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr">
            <body className={`${gowunBatang.variable} ${allura.variable} font-sans`}>{children}</body>
        </html>
    );
}
