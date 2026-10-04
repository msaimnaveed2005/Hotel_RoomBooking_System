import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { AuthProvider } from "@/components/auth/auth-provider";
import { ToastProvider } from "@/components/ui/toast";

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
        <AuthProvider>
          <ToastProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-terracotta focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-semibold focus:shadow-lg"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main-content" className="flex-grow">{children}</main>
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
