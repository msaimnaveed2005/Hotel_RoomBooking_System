"use client";

import { motion } from "framer-motion";
import { rooms } from "@/lib/mock-data";
import RoomCard from "@/components/rooms/room-card";

export default function FeaturedRooms() {
  const featured = rooms.filter((r) => r.isFeatured);

  return (
    <section className="py-24 bg-white border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-terracotta mb-2 block">
              Accommodations
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-bold text-zinc-950">
              Featured Sanctuaries
            </h2>
          </div>
          <p className="text-sm text-text-secondary max-w-md md:text-right">
            Hand-curated retreats crafted with raw local materials, custom furnishings, and panoramic vistas.
          </p>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((room, idx) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <RoomCard room={room} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
