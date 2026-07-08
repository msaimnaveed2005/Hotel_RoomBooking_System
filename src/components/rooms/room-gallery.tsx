"use client";

import { motion } from "framer-motion";

interface RoomGalleryProps {
  roomId: string;
  roomName: string;
}

export default function RoomGallery({ roomId, roomName }: RoomGalleryProps) {
  // Generate 5 stable images based on roomId for the masonry layout
  const galleryImages = [
    `https://picsum.photos/seed/room-${roomId}-a/1000/700`,
    `https://picsum.photos/seed/room-${roomId}-b/600/600`,
    `https://picsum.photos/seed/room-${roomId}-c/600/600`,
    `https://picsum.photos/seed/room-${roomId}-d/600/600`,
    `https://picsum.photos/seed/room-${roomId}-e/600/600`,
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 rounded-3xl overflow-hidden shadow-sm">
      {/* Main Image (Large, spans 2 columns, 2 rows) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-square relative overflow-hidden group bg-zinc-100"
      >
        <img
          src={galleryImages[0]}
          alt={`${roomName} Primary View`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors" />
      </motion.div>

      {/* Grid of remaining 4 images */}
      {galleryImages.slice(1).map((img, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: (idx + 1) * 0.1 }}
          className="aspect-square relative overflow-hidden group bg-zinc-100 hidden md:block"
        >
          <img
            src={img}
            alt={`${roomName} Detail View ${idx + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors" />
        </motion.div>
      ))}

      {/* Mobile-only swipe warning/carousel helper can be added, or keep as standard vertical on mobile */}
      <div className="md:hidden grid grid-cols-2 gap-2 mt-2">
        {galleryImages.slice(1, 3).map((img, idx) => (
          <div key={idx} className="aspect-square relative overflow-hidden rounded-xl bg-zinc-100">
            <img src={img} alt="Detail" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
