import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LibraryProvider } from "@/context/LibraryContext";
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
  title: "Tommy",
  description: "A book recommender application",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LibraryProvider>{children}</LibraryProvider>
      </body>
    </html>
  );
}
