import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Bimbel Grismatik - Bimbingan Belajar Terpercaya di Batu Bara",
    template: "%s | Bimbel Grismatik",
  },
  description:
    "Bimbel Grismatik adalah lembaga bimbingan belajar resmi dan berizin di Kabupaten Batu Bara untuk siswa SD, SMP, dan SMA.",
  keywords: [
    "bimbel batu bara",
    "bimbingan belajar batu bara",
    "les privat sei suka",
    "bimbel grismatik",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
