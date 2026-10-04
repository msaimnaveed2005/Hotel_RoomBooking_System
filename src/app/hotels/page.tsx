import * as React from "react";
import type { Metadata } from "next";
import HotelsClient from "./hotels-client";

export const metadata: Metadata = {
  title: "Luxury Hotels in Islamabad | Aetheria Partner Properties",
  description: "Browse curated luxury hotels and resorts in Islamabad. Compare ratings, amenities, and book your perfect stay at Aetheria's exclusive partner properties.",
};

export default function HotelsPage() {
  return (
    <React.Suspense fallback={
      <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen text-center flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta"></div>
        <p className="text-sm text-text-secondary mt-4">Loading partner properties...</p>
      </div>
    }>
      <HotelsClient />
    </React.Suspense>
  );
}
