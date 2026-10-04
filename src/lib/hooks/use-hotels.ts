"use client";
import { useState, useEffect } from "react";
import { Hotel } from "@/lib/types";

export function useHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const response = await fetch("/api/hotels");
        if (!response.ok) {
          throw new Error("Failed to fetch hotels");
        }
        const data = await response.json();
        setHotels(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    }
    fetchHotels();
  }, []);

  return { hotels, isLoading, error };
}
