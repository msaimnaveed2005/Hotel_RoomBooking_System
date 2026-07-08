"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, SearchX, Compass, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { rooms, Room } from "@/lib/mock-data";
import RoomCard from "@/components/rooms/room-card";
import FiltersSidebar from "@/components/rooms/filters-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function RoomsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isLoading, setIsLoading] = React.useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState(false);
  const [filteredRooms, setFilteredRooms] = React.useState<Room[]>(rooms);

  // Sync rooms and mock loading effect on parameter change
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const price = searchParams.get("price");
      const amenities = searchParams.get("amenities")?.split(",") || [];
      const guests = searchParams.get("guests");

      let results = [...rooms];

      // Filter by price
      if (price) {
        results = results.filter((r) => r.pricePerNight <= Number(price));
      }

      // Filter by guests capacity
      if (guests) {
        results = results.filter((r) => r.maxGuests >= Number(guests));
      }

      // Filter by amenities
      if (amenities.length > 0 && amenities[0] !== "") {
        results = results.filter((r) =>
          amenities.every((amenity) => r.amenities.includes(amenity))
        );
      }

      setFilteredRooms(results);
      setIsLoading(false);
    }, 600); // simulated loading animation

    return () => clearTimeout(timer);
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-terracotta mb-2 block">
            Discover
          </span>
          <h1 className="font-serif text-4xl font-bold text-zinc-950">
            Our Sanctuaries
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-text-secondary">
            Showing <span className="font-bold text-zinc-900">{filteredRooms.length}</span> rooms
          </p>
          {/* Mobile filter toggle */}
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 text-xs font-semibold px-4 py-2 border border-zinc-200 bg-white rounded-full text-zinc-700 hover:bg-zinc-50 focus-ring cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-terracotta" /> Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar (visible on lg) */}
        <div className="hidden lg:block lg:col-span-1">
          <FiltersSidebar />
        </div>

        {/* Results grid */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="bg-white rounded-[2rem] border border-zinc-150 p-4 space-y-4">
                  <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
                  <Skeleton className="h-5 w-[70%]" />
                  <Skeleton className="h-4 w-[90%]" />
                  <div className="flex justify-between items-center pt-2">
                    <Skeleton className="h-8 w-24 rounded-full" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredRooms.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="py-20 text-center bg-white border border-zinc-150 rounded-[2.5rem] max-w-xl mx-auto"
                >
                  <SearchX className="w-16 h-16 mx-auto stroke-[1.25] text-zinc-350 mb-4" />
                  <h3 className="font-serif text-xl font-bold text-zinc-950 mb-2">
                    No Matching Sanctuaries
                  </h3>
                  <p className="text-sm text-text-secondary max-w-sm mx-auto mb-6">
                    We couldn't find any rooms fitting your specific configuration. Try relaxing your filters.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => router.push("/rooms")}
                    className="rounded-full px-6"
                  >
                    Clear All Filters
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredRooms.map((room) => (
                    <motion.div
                      key={room.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                    >
                      <RoomCard room={room} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer (Bottom Sheet) */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black z-50 lg:hidden"
            />
            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="fixed bottom-0 left-0 right-0 h-[80vh] bg-white rounded-t-[2.5rem] border-t border-zinc-150 z-50 p-6 flex flex-col justify-between overflow-hidden lg:hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-zinc-100 mb-6 shrink-0">
                <span className="font-serif text-lg font-bold text-zinc-950">
                  Filters
                </span>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 hover:bg-zinc-50 rounded-full text-zinc-400 hover:text-zinc-600 transition-colors focus-ring"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable filters content */}
              <div className="flex-grow overflow-y-auto pr-1">
                <FiltersSidebar />
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-zinc-100 mt-6 shrink-0">
                <Button
                  variant="primary"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full rounded-full"
                >
                  Show {filteredRooms.length} Sanctuaries
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
