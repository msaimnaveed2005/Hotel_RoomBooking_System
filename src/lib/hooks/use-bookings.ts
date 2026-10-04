"use client";
import { useState, useEffect } from "react";
import { BookingWithDetails } from "@/lib/types";

export function useBookings() {
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch("/api/bookings");
        if (!response.ok) throw new Error("Failed to fetch bookings");
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    }
    fetchBookings();
  }, []);

  return { bookings, isLoading, error };
}

export function useBookingLookup(code: string) {
  const [booking, setBooking] = useState<BookingWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function lookup() {
      if (!code) return;
      setIsLoading(true);
      try {
        const response = await fetch(`/api/bookings?code=${code}`);
        if (!response.ok) throw new Error("Booking not found");
        const data = await response.json();
        setBooking(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    }
    lookup();
  }, [code]);

  return { booking, isLoading, error };
}
