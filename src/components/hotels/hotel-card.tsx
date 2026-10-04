"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react";
import { Hotel } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const [currentImgIndex, setCurrentImgIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const images = hotel.photos && hotel.photos.length > 0
    ? hotel.photos.map(p => `/api/hotels/${hotel.placeId}/photos/${p.name}`)
    : ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"];

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else if (e.key === "ArrowRight") {
      setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  const getStartingPrice = (level?: string) => {
    switch (level) {
      case "PRICE_LEVEL_INEXPENSIVE":
        return "$180";
      case "PRICE_LEVEL_MODERATE":
        return "$280";
      case "PRICE_LEVEL_EXPENSIVE":
        return "$460";
      case "PRICE_LEVEL_VERY_EXPENSIVE":
        return "$690";
      default:
        return "$250";
    }
  };

  return (
    <motion.div
      layout
      className="group bg-bg-card rounded-[2rem] border border-zinc-150 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* 4:3 Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 shrink-0">
        <Link href={`/hotels/${hotel.placeId}`} className="absolute inset-0 block focus:outline-none">
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={images[currentImgIndex]}
              alt={`Aetheria Partner: ${hotel.displayName}`}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Elegant vignette */}
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/25 transition-colors duration-500" />
          </div>
        </Link>

        {/* Carousel controls */}
        {images.length > 1 && (
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
        )}

        {/* Swipe dots indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.slice(0, 5).map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentImgIndex(idx);
                }}
                aria-label={`Go to image ${idx + 1}`}
                aria-current={idx === currentImgIndex ? "true" : undefined}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentImgIndex
                    ? "bg-white w-4"
                    : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Centered View Details button fade-in */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Link href={`/hotels/${hotel.placeId}`} className="pointer-events-auto">
            <Button
              variant="primary"
              size="sm"
              className="rounded-full shadow-lg border border-white/20 bg-terracotta text-white px-5 h-9"
            >
              View Property
            </Button>
          </Link>
        </div>
      </div>

      {/* Content details */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          {/* Header row */}
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-serif text-lg font-bold text-zinc-950 line-clamp-1">
              <Link href={`/hotels/${hotel.placeId}`} className="hover:text-terracotta transition-colors focus-ring rounded">
                {hotel.displayName}
              </Link>
            </h3>
            {hotel.rating > 0 && (
              <span className="flex items-center gap-1 text-zinc-800 text-xs font-semibold shrink-0 pt-0.5">
                <Star className="w-3.5 h-3.5 fill-terracotta text-terracotta" /> {hotel.rating.toFixed(1)}
              </span>
            )}
          </div>

          <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-4 flex items-start gap-1">
            <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            {hotel.formattedAddress}
          </p>
        </div>

        <div>
          {/* Price Level row */}
          <div className="flex justify-between items-center pt-3 border-t border-zinc-100">
            <div className="text-[10px] text-text-secondary font-medium uppercase tracking-wider">
              {hotel.userRatingCount > 0 ? `${hotel.userRatingCount} reviews` : 'New Partner'}
            </div>
            
            <div className="text-right">
              <span className="text-base font-bold text-terracotta">
                from {getStartingPrice(hotel.priceLevel)}
              </span>
              <span className="text-[10px] text-text-secondary block font-medium uppercase tracking-wider">
                per night
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
