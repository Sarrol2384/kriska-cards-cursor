import type { Metadata, Viewport } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { card } from "@/content/card";
import { agentSrc } from "@/lib/images";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${card.agentName} | Eyethu Property Group`,
  description: card.bio.slice(0, 160),
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Eyethu Property Group",
    title: `${card.agentName} — Digital card`,
    description: card.bio.slice(0, 160),
    images: [{ url: agentSrc(), width: 400, height: 400, alt: card.agentName }],
  },
  appleWebApp: { capable: true, title: "Eyethu PG" },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-ZA"
      className={`${geistSans.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
