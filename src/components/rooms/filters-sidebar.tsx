"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, Check, RefreshCw } from "lucide-react";
import { Counter } from "@/components/ui/counter";
import { Button } from "@/components/ui/button";

const amenitiesList = ["Wifi", "Spa Access", "Balcony", "Ocean View", "Private Pool", "Private Terrace"];

export default function FiltersSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state initialized from URL params
  const [maxPrice, setMaxPrice] = React.useState(1600);
  const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>([]);
  const [minGuests, setMinGuests] = React.useState(1);

  // Sync state with URL params on mount/change
  React.useEffect(() => {
    const price = searchParams.get("price");
    if (price) setMaxPrice(Number(price));

    const amenities = searchParams.get("amenities")?.split(",") || [];
    setSelectedAmenities(amenities.filter(Boolean));

    const guests = searchParams.get("guests");
    if (guests) setMinGuests(Number(guests));
  }, [searchParams]);

  const applyFilters = (
    price: number,
    amenities: string[],
    guests: number
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("price", price.toString());
    
    if (amenities.length > 0) {
      params.set("amenities", amenities.join(","));
    } else {
      params.delete("amenities");
    }

    params.set("guests", guests.toString());
    router.push(`/rooms?${params.toString()}`);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMaxPrice(value);
    applyFilters(value, selectedAmenities, minGuests);
  };

  const handleAmenityToggle = (amenity: string) => {
    let updated: string[];
    if (selectedAmenities.includes(amenity)) {
      updated = selectedAmenities.filter((a) => a !== amenity);
    } else {
      updated = [...selectedAmenities, amenity];
    }
    setSelectedAmenities(updated);
    applyFilters(maxPrice, updated, minGuests);
  };

  const handleGuestsChange = (value: number) => {
    setMinGuests(value);
    applyFilters(maxPrice, selectedAmenities, value);
  };

  const resetFilters = () => {
    setMaxPrice(1600);
    setSelectedAmenities([]);
    setMinGuests(1);
    router.push("/rooms");
  };

  return (
    <aside className="w-full bg-white rounded-3xl border border-zinc-150 p-6 md:p-8 space-y-8 sticky top-28 self-start">
      {/* Title */}
      <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
        <h3 className="font-serif text-lg font-bold text-zinc-950 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-terracotta" /> Filters
        </h3>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-text-secondary hover:text-terracotta flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm font-semibold text-zinc-900">
          <span>Max Budget</span>
          <span className="text-terracotta">${maxPrice}</span>
        </div>
        <input
          type="range"
          min="250"
          max="1600"
          step="50"
          value={maxPrice}
          onChange={handlePriceChange}
          className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-terracotta outline-none"
        />
        <div className="flex justify-between text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
          <span>Min: $250</span>
          <span>Max: $1600</span>
        </div>
      </div>

      <hr className="border-zinc-100" />

      {/* Guest Capacity Filter */}
      <div className="space-y-4">
        <h4 className="text-xs uppercase font-bold tracking-wider text-text-secondary">
          Minimum Occupancy
        </h4>
        <div className="flex justify-between items-center">
          <span className="text-sm text-zinc-700">Guests</span>
          <Counter
            value={minGuests}
            onChange={handleGuestsChange}
            min={1}
            max={6}
          />
        </div>
      </div>

      <hr className="border-zinc-100" />

      {/* Amenities Filter */}
      <div className="space-y-4">
        <h4 className="text-xs uppercase font-bold tracking-wider text-text-secondary">
          Sanctuary Amenities
        </h4>
        <div className="space-y-2">
          {amenitiesList.map((amenity) => {
            const isChecked = selectedAmenities.includes(amenity);
            return (
              <button
                key={amenity}
                onClick={() => handleAmenityToggle(amenity)}
                className="w-full flex items-center justify-between py-2 text-left text-sm text-zinc-700 hover:text-zinc-950 transition-colors focus-ring rounded"
              >
                <span>{amenity}</span>
                <span
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-terracotta border-terracotta text-white"
                      : "border-zinc-300 bg-white"
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
