"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, ArrowRight } from "lucide-react";
import { Counter } from "@/components/ui/counter";
import { Button } from "@/components/ui/button";

export default function FloatingSearchBar() {
  const router = useRouter();
  
  // Default values
  const today = new Date().toISOString().split("T")[0];
  const [checkIn, setCheckIn] = React.useState("");
  const [checkOut, setCheckOut] = React.useState("");
  const [guests, setGuests] = React.useState(1);
  const [isGuestsOpen, setIsGuestsOpen] = React.useState(false);
  
  const guestsRef = React.useRef<HTMLDivElement>(null);

  // Close guest dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (guestsRef.current && !guestsRef.current.contains(event.target as Node)) {
        setIsGuestsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (checkIn) query.append("checkin", checkIn);
    if (checkOut) query.append("checkout", checkOut);
    query.append("guests", guests.toString());

    router.push(`/rooms?${query.toString()}`);
  };

  return (
    <div className="w-full relative z-35">
      <form
        onSubmit={handleSearch}
        className="w-full bg-white rounded-3xl md:rounded-full border border-zinc-150 p-3 md:p-2 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 grid grid-cols-1 md:grid-cols-12 gap-2 items-center"
      >
        {/* Check-In */}
        <div className="md:col-span-3 px-4 py-2 border-b md:border-b-0 md:border-r border-zinc-100 flex flex-col justify-center">
          <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 flex items-center gap-1.5 mb-1.5">
            <Calendar className="w-3.5 h-3.5 text-terracotta" /> Check In
          </label>
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              // Auto-advance check-out date if it's before check-in
              if (checkOut && e.target.value >= checkOut) {
                setCheckOut("");
              }
            }}
            required
            className="text-sm font-semibold bg-transparent text-zinc-900 border-none outline-none focus:ring-0 focus-visible:outline-none p-0 cursor-pointer w-full"
          />
        </div>

        {/* Check-Out */}
        <div className="md:col-span-3 px-4 py-2 border-b md:border-b-0 md:border-r border-zinc-100 flex flex-col justify-center">
          <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 flex items-center gap-1.5 mb-1.5">
            <Calendar className="w-3.5 h-3.5 text-terracotta" /> Check Out
          </label>
          <input
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
            className="text-sm font-semibold bg-transparent text-zinc-900 border-none outline-none focus:ring-0 focus-visible:outline-none p-0 cursor-pointer w-full"
          />
        </div>

        {/* Guests Select */}
        <div
          ref={guestsRef}
          className="md:col-span-3 px-4 py-2 relative flex flex-col justify-center cursor-pointer border-b md:border-b-0 border-zinc-100 md:border-none"
          onClick={() => setIsGuestsOpen(!isGuestsOpen)}
        >
          <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 flex items-center gap-1.5 mb-1.5">
            <Users className="w-3.5 h-3.5 text-terracotta" /> Occupancy
          </label>
          <div className="text-sm font-semibold text-zinc-900 select-none flex justify-between items-center pr-2">
            <span>
              {guests} Guest{guests > 1 ? "s" : ""}
            </span>
          </div>

          {/* Guest Count Dropdown */}
          {isGuestsOpen && (
            <div
              className="absolute left-0 right-0 md:right-auto md:w-60 top-full mt-3 p-4 bg-white rounded-2xl border border-zinc-150 shadow-xl z-50 space-y-3 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-zinc-900">Total Guests</h4>
                  <p className="text-[10px] text-text-secondary">Including children</p>
                </div>
                <Counter
                  value={guests}
                  onChange={(val) => setGuests(val)}
                  min={1}
                  max={6}
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Search Button */}
        <div className="md:col-span-3 p-1 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            className="w-full md:w-auto h-12 md:h-11 rounded-full px-6 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Find Sanctuary</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </form>
    </div>
  );
}
