import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${profile.name} — ${profile.headline}`;
const description = `Portfolio of ${profile.name}, a Computer Science Engineering student and ${profile.headline} building toward Backend Engineering and AI.`;
const shortDescription = `Computer Science Engineering student and ${profile.headline} building toward Backend Engineering and AI.`;

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://dhanushrajp.dev"),
  openGraph: { title, description: shortDescription, type: "website" },
  twitter: { card: "summary_large_image", title, description: shortDescription },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-text-primary">
        {children}
      </body>
    </html>
  );
}
