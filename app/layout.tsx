import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "../components/providers";

export const metadata: Metadata = {
  title: "Fluid Superscript & Subscript Demo",
};

const geistSans = localFont({
  src: "./fonts/Geist[wght].woff2",
  variable: "--font-geist-sans",
  weight: "100 400 500 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMono[wght].woff2",
  variable: "--font-geist-mono",
  weight: "100 400 500 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${geistSans.variable} font-mono antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
