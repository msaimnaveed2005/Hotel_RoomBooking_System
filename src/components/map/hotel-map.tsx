"use client";

import dynamic from "next/dynamic";
import { Hotel } from "@/lib/types";

// Dynamically import the map to avoid SSR issues with Leaflet
const HotelMapInner = dynamic(() => import("./hotel-map-inner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] lg:h-full min-h-[400px] rounded-2xl bg-zinc-100 animate-pulse flex items-center justify-center border border-zinc-200">
      <div className="flex flex-col items-center gap-2 text-zinc-400">
        <svg className="w-8 h-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="font-sans text-sm">Loading map...</span>
      </div>
    </div>
  ),
});

interface HotelMapProps {
  hotels: Hotel[];
  activeHotelId?: string;
  onHotelClick?: (placeId: string) => void;
}

export default function HotelMap(props: HotelMapProps) {
  return <HotelMapInner {...props} />;
}
