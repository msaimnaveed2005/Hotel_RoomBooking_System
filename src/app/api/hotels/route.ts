import { NextRequest, NextResponse } from "next/server";
import { Hotel } from "@/lib/types";
import { FALLBACK_HOTELS } from "./fallback";

export async function GET(request: NextRequest) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json(FALLBACK_HOTELS, {
      headers: {
        "Cache-Control": "s-maxage=300",
      },
    });
  }

  try {
    const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.photos,places.priceLevel",
      },
      body: JSON.stringify({
        textQuery: "luxury hotels in Islamabad, Pakistan",
        maxResultCount: 10,
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    const hotels: Hotel[] = (data.places || []).map((place: any) => ({
      placeId: place.id,
      displayName: place.displayName?.text || "Unknown Hotel",
      formattedAddress: place.formattedAddress || "",
      location: place.location || { latitude: 0, longitude: 0 },
      rating: place.rating || 0,
      userRatingCount: place.userRatingCount || 0,
      photos: place.photos || [],
      priceLevel: place.priceLevel,
    }));

    return NextResponse.json(hotels, {
      headers: {
        "Cache-Control": "s-maxage=300",
      },
    });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return NextResponse.json(FALLBACK_HOTELS, {
      headers: {
        "Cache-Control": "s-maxage=300",
      },
    });
  }
}
