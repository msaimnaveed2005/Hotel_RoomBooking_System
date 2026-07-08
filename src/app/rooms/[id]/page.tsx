"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Star, Heart, Share, ShieldCheck, Waves, Sparkles, Coffee, User } from "lucide-react";
import { rooms } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import RoomGallery from "@/components/rooms/room-gallery";
import BookingWidget from "@/components/booking/booking-widget";
import { motion } from "framer-motion";

export default function RoomDetailPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params?.id as string;

  // Retrieve room
  const room = rooms.find((r) => r.id === roomId);

  if (!room) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <h2 className="font-serif text-3xl font-bold mb-4">Sanctuary Not Found</h2>
        <p className="text-zinc-500 mb-8">We couldn't locate the room you are looking for.</p>
        <Link href="/rooms">
          <Button variant="primary">Return to Discover</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 md:py-16">
      {/* Top Header Actions */}
      <div className="flex justify-between items-center mb-8">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-terracotta transition-colors group focus-ring rounded px-2 py-1"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to discovery</span>
        </Link>
        <div className="flex gap-2">
          <button
            aria-label="Share Sanctuary"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }}
            className="p-2.5 rounded-full border border-zinc-200 bg-white text-zinc-650 hover:bg-zinc-50 hover:text-zinc-900 transition-colors focus-ring"
          >
            <Share className="w-4 h-4" />
          </button>
          <button
            aria-label="Wishlist Sanctuary"
            onClick={() => alert("Added to your wishlist!")}
            className="p-2.5 rounded-full border border-zinc-200 bg-white text-zinc-650 hover:bg-zinc-50 hover:text-rose-500 transition-colors focus-ring"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid title & rating details */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-bold text-zinc-950">
            {room.name}
          </h1>
          <div className="flex items-center gap-3 mt-2 text-sm">
            <span className="flex items-center gap-1 font-semibold text-zinc-900">
              <Star className="w-4 h-4 fill-terracotta text-terracotta" /> {room.rating.toFixed(1)}
            </span>
            <span className="text-zinc-300">•</span>
            <span className="text-text-secondary font-medium">Max Guests: {room.maxGuests}</span>
            <span className="text-zinc-300">•</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Best Rate Guaranteed
            </span>
          </div>
        </div>
      </div>

      {/* Masonry Image Gallery */}
      <div className="mb-12 md:mb-16">
        <RoomGallery roomId={room.id} roomName={room.name} />
      </div>

      {/* Page Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Left Column: Description, Bento Amenities, Reviews (Spans 2 on desktop) */}
        <div className="lg:col-span-2 space-y-12">
          {/* Narrative Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-serif text-2xl font-bold text-zinc-950">The Sanctuary Experience</h3>
            <p className="text-sm text-text-secondary leading-relaxed font-sans">
              {room.description}
            </p>
            <p className="text-sm text-text-secondary leading-relaxed font-sans">
              {room.fullDescription}
            </p>
          </motion.div>

          <hr className="border-zinc-150" />

          {/* Bento Amenities Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="font-serif text-2xl font-bold text-zinc-950">Bespoke Utilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {room.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-zinc-150 rounded-2xl flex items-center gap-4 hover:shadow-md transition-premium"
                >
                  <span className="p-2 bg-zinc-50 border border-zinc-100 rounded-xl text-terracotta">
                    {/* Render relevant luxury placeholder icons based on name */}
                    {amenity.includes("Spa") ? (
                      <Sparkles className="w-4 h-4" />
                    ) : amenity.includes("Pool") || amenity.includes("Access") ? (
                      <Waves className="w-4 h-4" />
                    ) : (
                      <Coffee className="w-4 h-4" />
                    )}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900">{amenity}</h4>
                    <p className="text-[10px] text-text-secondary mt-0.5">Premium Included</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

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
              {room.reviews?.map((review, idx) => (
                <div key={idx} className="p-6 bg-zinc-50 border border-zinc-150 rounded-3xl space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-forest text-white text-[10px] font-bold flex items-center justify-center">
                        {review.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900">{review.name}</h4>
                        <p className="text-[9px] text-text-secondary">{review.location}</p>
                      </div>
                    </div>
                    <span className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-terracotta text-terracotta" />
                      ))}
                    </span>
                  </div>
                  <p className="text-xs italic leading-relaxed text-zinc-700 font-serif">
                    "{review.text}"
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Sticky Booking Widget */}
        <div className="lg:col-span-1 lg:sticky lg:top-28">
          <BookingWidget room={room} />
        </div>
      </div>
    </div>
  );
}
