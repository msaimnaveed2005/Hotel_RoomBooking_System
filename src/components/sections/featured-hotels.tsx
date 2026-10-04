"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useHotels } from "@/lib/hooks/use-hotels";
import HotelCard from "@/components/hotels/hotel-card";
import { Button } from "@/components/ui/button";

export default function FeaturedHotels() {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { hotels, isLoading } = useHotels();

  return (
    <section className="py-24 bg-zinc-50" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <span className="text-terracotta text-sm font-bold tracking-widest uppercase mb-4 block">
              Curated Partners
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-zinc-950 mb-6">
              Exclusive Sanctuaries
            </h2>
            <p className="text-text-secondary text-base leading-relaxed">
              Discover our handpicked selection of Islamabad's finest luxury properties, 
              each offering unparalleled service and distinctive character.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/hotels">
              <Button variant="outline" className="hidden md:inline-flex rounded-full">
                View All Properties
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-[2rem] border border-zinc-150 p-6 h-[400px] animate-pulse">
                <div className="w-full h-48 bg-zinc-100 rounded-2xl mb-6"></div>
                <div className="h-6 bg-zinc-100 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-zinc-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Properties Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.slice(0, 3).map((hotel, idx) => (
              <motion.div
                key={hotel.placeId}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
              >
                <HotelCard hotel={hotel} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <Link href="/hotels">
            <Button variant="outline" className="w-full rounded-full">
              View All Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
