"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Wifi, Tv, Wind, Coffee, Compass, Trees, Waves } from "lucide-react";
import { Room } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface RoomCardProps {
  room: Room;
}

// Map amenity string to Icon Component
const amenityIconMap: Record<string, React.ComponentType<any>> = {
  "Wifi": Wifi,
  "Spa Access": SparklesIcon,
  "Mini Bar": WineIcon,
  "Private Terrace": Compass,
  "Rain Shower": Waves,
  "Ocean View": Wind,
  "Balcony": Compass,
  "Espresso Machine": Coffee,
  "Private Pool": PoolIcon,
  "Beach Access": BeachIcon,
  "Butler Service": UserIcon,
  "Fireplace": FlameIcon,
  "Cedar Tub": BathIcon,
  "Sound System": MusicIcon,
  "Workplace": LaptopIcon,
  "Steam Shower": Waves,
  "Courtyard": Trees,
};

function SparklesIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
  );
}

function WineIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 22h8"/><path d="M12 11v11"/><path d="M19 12A7 7 0 0 0 5 12v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2Z"/><path d="M12 15v1"/></svg>
  );
}

function PoolIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 6c.6.5 1.2 1 2.5 1C5.8 7 7 5 9.5 5c2.5 0 3.7 2 5 2 1.3 0 2.5-1 2.5-1"/><path d="M2 12c.6.5 1.2 1 2.5 1 1.3 0 2.5-2 5-2 2.5 0 3.7 2 5 2 1.3 0 2.5-1 2.5-1"/><path d="M2 18c.6.5 1.2 1 2.5 1 1.3 0 2.5-2 5-2 2.5 0 3.7 2 5 2 1.3 0 2.5-1 2.5-1"/></svg>
  );
}

function BeachIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 10h-3.5L12 3H9v2L5.5 12h-2L2 20h20Z"/></svg>
  );
}

function UserIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  );
}

function FlameIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
  );
}

function BathIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 18h20v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2z"/><path d="M2 14h20V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8z"/></svg>
  );
}

function MusicIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
  );
}

function LaptopIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M2 21h20"/></svg>
  );
}

export default function RoomCard({ room }: RoomCardProps) {
  const [currentImgIndex, setCurrentImgIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setCurrentImgIndex((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
    } else if (e.key === "ArrowRight") {
      setCurrentImgIndex((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <motion.div
      layout
      className="group bg-bg-card rounded-[2rem] border border-zinc-150 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0} // focusable for keyboard controls
    >
      {/* 4:3 Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
        <Link href={`/rooms/${room.id}`} className="absolute inset-0 block focus:outline-none">
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={room.images[currentImgIndex]}
              alt={`Aetheria Room: ${room.name}`}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Elegant vignette */}
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/25 transition-colors duration-500" />
          </div>
        </Link>

        {/* Carousel controls */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button
            onClick={prevImage}
            aria-label="Previous Image"
            className="w-8 h-8 rounded-full bg-white/90 text-zinc-800 flex items-center justify-center pointer-events-auto hover:bg-white hover:text-terracotta active:scale-90 transition-all focus-ring shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextImage}
            aria-label="Next Image"
            className="w-8 h-8 rounded-full bg-white/90 text-zinc-800 flex items-center justify-center pointer-events-auto hover:bg-white hover:text-terracotta active:scale-90 transition-all focus-ring shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Swipe dots indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {room.images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentImgIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentImgIndex
                  ? "bg-white w-4"
                  : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Centered View Details button fade-in */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-550">
          <Link href={`/rooms/${room.id}`} className="pointer-events-auto">
            <Button
              variant="primary"
              size="sm"
              className="rounded-full shadow-lg border border-white/20 bg-terracotta text-white px-5 h-9"
            >
              View Sanctuary
            </Button>
          </Link>
        </div>
      </div>

      {/* Content details */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          {/* Header row */}
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-serif text-lg font-bold text-zinc-950 truncate">
              <Link href={`/rooms/${room.id}`} className="hover:text-terracotta transition-colors focus-ring rounded">
                {room.name}
              </Link>
            </h3>
            <span className="flex items-center gap-1 text-zinc-800 text-xs font-semibold shrink-0 pt-0.5">
              <Star className="w-3.5 h-3.5 fill-terracotta text-terracotta" /> {room.rating.toFixed(1)}
            </span>
          </div>

          <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-4">
            {room.description}
          </p>
        </div>

        <div>
          {/* Amenities & Price row */}
          <div className="flex justify-between items-center pt-3 border-t border-zinc-100">
            {/* Top 3 Amenity Icons */}
            <div className="flex gap-2">
              {room.amenities.slice(0, 3).map((amenity) => {
                const IconComponent = amenityIconMap[amenity] || Wifi;
                return (
                  <span
                    key={amenity}
                    title={amenity}
                    className="p-2 rounded-full bg-zinc-50 border border-zinc-100/60 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors"
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </span>
                );
              })}
              {room.amenities.length > 3 && (
                <span className="text-[10px] font-bold text-zinc-400 self-center pl-1">
                  +{room.amenities.length - 3}
                </span>
              )}
            </div>

            {/* Price tag */}
            <div className="text-right">
              <span className="text-base font-bold text-zinc-950">
                {formatCurrency(room.pricePerNight)}
              </span>
              <span className="text-[10px] text-text-secondary block font-medium uppercase tracking-wider">
                / night
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
