"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, Star, Heart, Share, ShieldCheck, Waves, Sparkles, Coffee, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingWidget from "@/components/booking/booking-widget";
import { motion } from "framer-motion";
import { useHotelDetail } from "@/lib/hooks/use-hotel-detail";
import { useToast } from "@/components/ui/toast";

export default function HotelDetailClient({ placeId }: { placeId: string }) {
  const { hotel, roomTypes, isLoading, error } = useHotelDetail(placeId);
  const { showToast } = useToast();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta mx-auto"></div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <h2 className="font-serif text-3xl font-bold mb-4">Sanctuary Not Found</h2>
        <p className="text-zinc-500 mb-8">We couldn't locate the property you are looking for.</p>
        <Link href="/hotels">
          <Button variant="primary">Return to Discover</Button>
        </Link>
      </div>
    );
  }

  const images = hotel.photos && hotel.photos.length > 0
    ? hotel.photos.map(p => `/api/hotels/${hotel.placeId}/photos/${p.name}`)
    : ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 md:py-16">
      {/* Top Header Actions */}
      <div className="flex justify-between items-center mb-8">
        <Link
          href="/hotels"
          className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-terracotta transition-colors group focus-ring rounded px-2 py-1"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to partner properties</span>
        </Link>
        <div className="flex gap-2">
          <button
            aria-label="Share Sanctuary"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              showToast("Sanctuary link copied to clipboard", "success");
            }}
            className="p-2.5 rounded-full border border-zinc-200 bg-white text-zinc-650 hover:bg-zinc-50 hover:text-zinc-900 transition-colors focus-ring cursor-pointer"
          >
            <Share className="w-4 h-4" />
          </button>
          <button
            aria-label="Wishlist Sanctuary"
            onClick={() => showToast("Added to your wishlist", "success")}
            className="p-2.5 rounded-full border border-zinc-200 bg-white text-zinc-650 hover:bg-zinc-50 hover:text-rose-500 transition-colors focus-ring cursor-pointer"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid title & rating details */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-bold text-zinc-950">
            {hotel.displayName}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
            {hotel.rating > 0 && (
              <>
                <span className="flex items-center gap-1 font-semibold text-zinc-900">
                  <Star className="w-4 h-4 fill-terracotta text-terracotta" /> {hotel.rating.toFixed(1)}
                </span>
                <span className="text-zinc-300">•</span>
                <span className="text-text-secondary font-medium">{hotel.userRatingCount} Reviews</span>
                <span className="text-zinc-300">•</span>
              </>
            )}
            <span className="text-text-secondary font-medium flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {hotel.formattedAddress}
            </span>
          </div>
        </div>
      </div>

      {/* Simple Gallery */}
      <div className="mb-12 md:mb-16 rounded-3xl overflow-hidden h-[400px] md:h-[500px] grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full h-full relative">
          <img src={images[0]} alt={hotel.displayName} className="w-full h-full object-cover" />
        </div>
        <div className="hidden md:grid grid-rows-2 gap-4 h-full">
          {images.slice(1, 3).map((img, i) => (
            <div key={i} className="w-full h-full relative">
              <img src={img} alt={`${hotel.displayName} interior`} className="w-full h-full object-cover" />
            </div>
          ))}
          {images.length < 2 && (
            <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-zinc-400">
              More images coming soon
            </div>
          )}
        </div>
      </div>

      {/* Page Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Left Column: Description, Reviews */}
        <div className="lg:col-span-2 space-y-12">
          {/* Narrative Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-serif text-2xl font-bold text-zinc-950">The Property Experience</h3>
            <p className="text-sm text-text-secondary leading-relaxed font-sans">
              {hotel.editorialSummary || "Experience the pinnacle of luxury at this exquisite partner property. Immerse yourself in bespoke service, unparalleled comfort, and breathtaking surroundings."}
            </p>
          </motion.div>

          {hotel.reviews && hotel.reviews.length > 0 && (
            <>
              <hr className="border-zinc-150" />
              {/* Reviews Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="font-serif text-2xl font-bold text-zinc-950">Guest Journals</h3>
                <div className="space-y-6">
                  {hotel.reviews.slice(0, 3).map((review: any, idx: number) => (
                    <div key={idx} className="p-6 bg-zinc-50 border border-zinc-150 rounded-3xl space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <img src={review.authorAttribution?.photoUri} alt={review.authorAttribution?.displayName} className="w-8 h-8 rounded-full bg-zinc-200" />
                          <div>
                            <h4 className="text-xs font-bold text-zinc-900">{review.authorAttribution?.displayName}</h4>
                            <p className="text-[9px] text-text-secondary">{review.relativePublishTimeDescription}</p>
                          </div>
                        </div>
                        <span className="flex gap-0.5">
                          {[...Array(review.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-terracotta text-terracotta" />
                          ))}
                        </span>
                      </div>
                      <p className="text-xs italic leading-relaxed text-zinc-700 font-serif">
                        "{review.text?.text || "An unforgettable experience."}"
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </div>

        {/* Right Column: Sticky Booking Widget */}
        <div className="lg:col-span-1 lg:sticky lg:top-28">
          <BookingWidget hotel={hotel} roomTypes={roomTypes} />
        </div>
      </div>
    </div>
  );
}
