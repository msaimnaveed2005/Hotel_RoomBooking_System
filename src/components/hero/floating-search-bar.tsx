"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Counter } from "@/components/ui/counter";
import { Search, MapPin } from "lucide-react";
import { addDaysToDateInput, getDateInputValue } from "@/lib/utils";
import { motion } from "framer-motion";

export default function FloatingSearchBar() {
  const router = useRouter();
  const today = getDateInputValue();
  const [location, setLocation] = useState("Islamabad, Pakistan");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const checkoutMin = checkIn ? addDaysToDateInput(checkIn, 1) : today;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.append("checkin", checkIn);
    if (checkOut) params.append("checkout", checkOut);
    if (guests > 1) params.append("guests", guests.toString());
    
    router.push(`/hotels?${params.toString()}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative w-full max-w-5xl mx-auto z-30"
    >
      <form 
        onSubmit={handleSearch}
        className="bg-white/95 backdrop-blur-xl border border-white/80 p-4 sm:p-5 md:p-6 rounded-3xl md:rounded-[2rem] shadow-xl md:shadow-2xl shadow-zinc-900/10 flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6"
      >
        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="flex flex-col px-3 sm:px-4 pb-3 sm:pb-0 border-b sm:border-b-0 sm:border-r border-zinc-200">
            <label htmlFor="search-location" className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-terracotta" /> Location
            </label>
            <input 
              id="search-location"
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent border-none outline-none font-semibold text-zinc-900 placeholder:text-zinc-300 p-0 text-sm focus:ring-0"
              placeholder="Where to?"
            />
          </div>

          <div className="flex flex-col px-3 sm:px-4 pb-3 sm:pb-0 border-b sm:border-b-0 md:border-r border-zinc-200">
            <DatePicker
              id="hero-checkin"
              label="Check-In"
              value={checkIn}
              onChange={(val) => {
                setCheckIn(val);
                if (checkOut && val >= checkOut) {
                  setCheckOut("");
                }
              }}
              min={today}
              className="bg-transparent border-none p-0 text-sm font-semibold"
            />
          </div>

          <div className="flex flex-col px-3 sm:px-4 pb-3 sm:pb-0 border-b sm:border-b-0 sm:border-r border-zinc-200">
            <DatePicker
              id="hero-checkout"
              label="Check-Out"
              value={checkOut}
              onChange={setCheckOut}
              min={checkoutMin}
              className="bg-transparent border-none p-0 text-sm font-semibold"
            />
          </div>

          <div className="flex flex-col px-3 sm:px-4 justify-center">
            <label htmlFor="search-guests" className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1">
              Guests
            </label>
            <Counter 
              value={guests} 
              onChange={setGuests} 
              min={1} 
              max={10} 
            />
          </div>

        </div>

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full md:w-auto h-[3.25rem] rounded-full px-8 shrink-0 flex items-center justify-center gap-2 shadow-lg shadow-terracotta/20 font-semibold"
        >
          <Search className="w-4 h-4" />
          <span>Search Sanctuaries</span>
        </Button>
      </form>
    </motion.div>
  );
}
