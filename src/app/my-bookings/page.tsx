"use client";

import * as React from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { redirect } from "next/navigation";
import { useBookings } from "@/lib/hooks/use-bookings";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Home, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function MyBookingsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { bookings, isLoading: bookingsLoading, error } = useBookings();

  if (authLoading) return null;

  if (!user) {
    redirect("/login?redirect=/my-bookings");
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 md:py-16 mt-16 min-h-[70vh]">
      <div className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-zinc-950 mb-2">
          My Journeys
        </h1>
        <p className="text-sm text-text-secondary">
          View and manage your upcoming and past luxury stays.
        </p>
      </div>

      {bookingsLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta"></div>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-rose-600">
          Failed to load bookings: {error.message}
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 bg-zinc-50 rounded-3xl border border-zinc-150">
          <h2 className="font-serif text-2xl font-bold mb-4">No Stays Found</h2>
          <p className="text-zinc-500 mb-8">You haven't reserved any sanctuaries yet.</p>
          <Link href="/hotels">
            <Button variant="primary">Discover Properties</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking, idx) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-zinc-200 rounded-3xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1">
                    Confirmation Code
                  </p>
                  <p className="font-mono font-bold text-zinc-900">
                    {booking.confirmation_code}
                  </p>
                </div>
                <Badge variant={booking.status.toLowerCase() as any}>
                  {booking.status}
                </Badge>
              </div>

              <hr className="border-zinc-100 my-4" />

              <div className="space-y-3 mb-6">
                <div className="flex gap-3 items-start">
                  <Home className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-zinc-900">{booking.room_type?.name}</p>
                    <p className="text-xs text-zinc-500">{booking.hotel?.displayName || booking.hotel?.display_name || "Unknown Property"}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <Calendar className="w-4 h-4 text-zinc-400 shrink-0" />
                  <p className="text-sm text-zinc-700">
                    {formatDate(booking.check_in)} — {formatDate(booking.check_out)}
                  </p>
                </div>

                <div className="flex gap-3 items-center">
                  <Users className="w-4 h-4 text-zinc-400 shrink-0" />
                  <p className="text-sm text-zinc-700">
                    {booking.guests} Guest{booking.guests > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                <span className="text-xs font-semibold text-zinc-600">Total</span>
                <span className="font-bold text-terracotta">{formatCurrency(booking.total_amount)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
