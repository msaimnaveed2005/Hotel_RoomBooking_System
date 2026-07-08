import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter-google",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair-google",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aetheria | Premium Luxury Hotel & Sanctuary",
  description: "Experience unmatched serenity and modern luxury at Aetheria. Book private villas, oceanfront lofts, and garden suites with bespoke butler service.",
  keywords: ["luxury hotel", "boutique resort", "sanctuary villas", "private beach resort", "Aetheria resort"],
  authors: [{ name: "Aetheria Hospitality" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-bg-main text-text-primary">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
