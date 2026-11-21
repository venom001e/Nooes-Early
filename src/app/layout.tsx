/* eslint-disable @next/next/no-css-tags */
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
  metadataBase: new URL("https://nooes.ai"),
  title: "Nooes",
  description: "Nooes is an AI coding IDE with an agent that plans, edits and tests your code. Nooes is a desktop application.",
  openGraph: {
    title: "Nooes",
    description: "Nooes is an AI coding IDE with an agent that plans, edits and tests your code. Nooes is a desktop application.",
    siteName: "Nooes",
    type: "website",
    url: "https://nooes.ai",
  },
  twitter: {
    card: "summary",
    title: "Nooes",
    description: "Nooes is an AI coding IDE with an agent that plans, edits and tests your code. Nooes is a desktop application.",
  },
  robots: process.env.ALLOW_INDEXING === "true" ? { index: true, follow: true } : { index: false, follow: false },
  icons: {
    icon: [
      { url: "/logos/nooes-icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/logos/nooes-icon.png" },
    ],
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
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="stylesheet" href="/assets/root-DMQRLNXC.css" />
        <link rel="stylesheet" href="/assets/love-DK_E78op.css" />
        <link rel="stylesheet" href="/assets/desktop-page-_I461akd.css" />
        <link rel="preload" href="/fonts/geist-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-black text-foreground">{children}</body>
    </html>
  );
}

