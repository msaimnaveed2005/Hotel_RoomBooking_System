import * as React from "react";
import HotelDetailClient from "./hotel-detail-client";

export default async function HotelDetailPage({
  params,
}: {
  params: Promise<{ placeId: string }>;
}) {
  const { placeId } = await params;

  return (
    <React.Suspense fallback={
      <div className="max-w-7xl mx-auto px-6 py-32 min-h-screen text-center flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta"></div>
        <p className="text-sm text-text-secondary mt-4">Preparing your sanctuary details...</p>
      </div>
    }>
      <HotelDetailClient placeId={placeId} />
    </React.Suspense>
  );
}
