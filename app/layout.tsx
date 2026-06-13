import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HKAHKU — 養 · Eastern Wellness",
  description: "Premium Traditional Chinese Wellness. Crafted from 400-year-old formulas. Rooted in nature, refined by time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
