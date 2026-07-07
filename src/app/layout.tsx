import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s · Prerit",
  },
  description: SITE.description,
  keywords: [
    "Prerit",
    "physics",
    "quantum computing",
    "neural quantum states",
    "UC Berkeley",
    "engineering",
    "lab notebook",
  ],
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.title,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: SITE.title,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
