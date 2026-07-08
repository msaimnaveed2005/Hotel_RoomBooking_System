import * as React from "react";
import RoomsClient from "./rooms-client";

export default function RoomsPage() {
  return (
    <React.Suspense fallback={
      <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen text-center flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta"></div>
        <p className="text-sm text-text-secondary mt-4">Loading your boutique listings...</p>
      </div>
    }>
      <RoomsClient />
    </React.Suspense>
  );
}
