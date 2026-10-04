"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import HotelMap from "@/components/map/hotel-map";
import HotelCard from "@/components/hotels/hotel-card";
import { useHotels } from "@/lib/hooks/use-hotels";

export default function HotelsClient() {
  const { hotels, isLoading, error } = useHotels();
  const router = useRouter();
  const searchParams = useSearchParams();
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const price = searchParams.get("price");
  const guests = searchParams.get("guests");
  const amenitiesParam = searchParams.get("amenities");

  const [activeHotelId, setActiveHotelId] = useState<string | undefined>();
  const [mapVisible, setMapVisible] = useState(true);
  const [sortBy, setSortBy] = useState("recommended");

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen text-center flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta"></div>
        <p className="text-sm text-text-secondary mt-4">Loading partner properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen text-center flex flex-col items-center justify-center text-red-500">
        Error loading properties: {error.message}
      </div>
    );
  }

  // Very basic filtering (in reality this would happen on the server or use more complex logic)
  let filteredHotels = hotels;
  if (price) {
    const maxPrice = parseInt(price, 10);
    // Since we don't have exact prices at the hotel level without fetching rooms, we'll just mock filter based on price level
    if (maxPrice < 100) filteredHotels = hotels.filter(h => h.priceLevel === "PRICE_LEVEL_INEXPENSIVE");
    else if (maxPrice < 300) filteredHotels = hotels.filter(h => h.priceLevel !== "PRICE_LEVEL_EXPENSIVE");
  }

  // Apply sorting
  if (sortBy === "rating") {
    filteredHotels = [...filteredHotels].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* Page Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-zinc-200 pb-6">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-text-primary mb-3">
              Partner Properties in Islamabad
            </h1>
            <p className="text-text-secondary text-base max-w-xl">
              Curated luxury sanctuaries tailored to your discerning taste.
            </p>
            {checkin && checkout && (
              <div className="inline-block mt-4 bg-terracotta/10 text-terracotta px-4 py-2 rounded-full text-sm font-medium border border-terracotta/20">
                Availability for {checkin} to {checkout}
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMapVisible(!mapVisible)}
              className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary px-4 py-2 rounded-full border border-zinc-200 hover:bg-zinc-50 transition-colors focus-ring"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              {mapVisible ? "Hide Map" : "Show Map"}
            </button>
          </div>
        </div>

        {/* Mobile Map Display (rendered when toggled on smaller screens) */}
        {mapVisible && (
          <div className="block lg:hidden w-full h-[340px] rounded-3xl overflow-hidden border border-zinc-200 shadow-md mb-6">
            <HotelMap 
              hotels={filteredHotels} 
              activeHotelId={activeHotelId}
              onHotelClick={(id) => {
                router.push(`/hotels/${id}`);
              }}
            />
          </div>
        )}

        {/* Main Content Layout */}
        <div className={`grid gap-8 ${mapVisible ? "lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_500px]" : "grid-cols-1"}`}>
          
          {/* Hotels Grid */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center text-sm text-text-secondary">
              <span>Showing {filteredHotels.length} properties</span>
              <div className="flex items-center gap-2">
                <span>Sort by:</span>
                <select 
                  className="bg-transparent font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-terracotta/20 rounded-md"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort hotels by"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Rating: High to Low</option>
                </select>
              </div>
            </div>

            <div className={`grid gap-6 ${mapVisible ? "sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3" : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}>
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel.placeId}
                  onMouseEnter={() => setActiveHotelId(hotel.placeId)}
                  onMouseLeave={() => setActiveHotelId(undefined)}
                >
                  <HotelCard hotel={hotel} />
                </div>
              ))}
            </div>

            {filteredHotels.length === 0 && (
              <div className="text-center py-20 bg-zinc-50 rounded-2xl border border-zinc-100">
                <p className="text-text-secondary mb-4">No properties match your exact criteria.</p>
                <button
                  onClick={() => router.push("/hotels")}
                  className="text-terracotta font-medium hover:underline focus-ring rounded-sm"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* Map Column */}
          {mapVisible && (
            <div className="hidden lg:block sticky top-24 h-[calc(100vh-8rem)]">
              <HotelMap 
                hotels={filteredHotels} 
                activeHotelId={activeHotelId}
                onHotelClick={(id) => {
                  router.push(`/hotels/${id}`);
                }}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
