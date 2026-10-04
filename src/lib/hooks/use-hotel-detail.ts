"use client";
import { useState, useEffect } from "react";
import { Hotel, RoomType } from "@/lib/types";

export function useHotelDetail(placeId: string) {
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchDetail() {
      if (!placeId) return;
      setIsLoading(true);
      try {
        const [hotelRes, roomsRes] = await Promise.all([
          fetch(`/api/hotels/${placeId}`),
          fetch(`/api/hotels/${placeId}/rooms`)
        ]);

        if (!hotelRes.ok) throw new Error("Failed to fetch hotel");
        if (!roomsRes.ok) throw new Error("Failed to fetch rooms");

        const hotelData = await hotelRes.json();
        const roomsData = await roomsRes.json();

        setHotel(hotelData);
        setRoomTypes(roomsData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    }
    fetchDetail();
  }, [placeId]);

  return { hotel, roomTypes, isLoading, error };
}
