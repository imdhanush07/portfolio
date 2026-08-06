import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dhanush Raj P — Java Full Stack Developer",
  description:
    "Portfolio of Dhanush Raj P, a Computer Science Engineering student and Java Full Stack Developer building toward Backend Engineering and AI.",
  metadataBase: new URL("https://dhanushrajp.dev"),
  openGraph: {
    title: "Dhanush Raj P — Java Full Stack Developer",
    description:
      "Computer Science Engineering student and Java Full Stack Developer building toward Backend Engineering and AI.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhanush Raj P — Java Full Stack Developer",
    description:
      "Computer Science Engineering student and Java Full Stack Developer building toward Backend Engineering and AI.",
  },
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
