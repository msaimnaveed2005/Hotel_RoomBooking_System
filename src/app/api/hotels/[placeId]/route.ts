import { NextRequest, NextResponse } from "next/server";
import { Hotel } from "@/lib/types";
import { FALLBACK_HOTELS } from "../fallback";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ placeId: string }> }
) {
  const { placeId } = await params;
  
  if (placeId.startsWith("fallback_")) {
    const fallbackHotel = FALLBACK_HOTELS.find((h) => h.placeId === placeId);
    if (fallbackHotel) {
      return NextResponse.json(fallbackHotel);
    }
    return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Google Places API key is missing" }, { status: 500 });
  }

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "id,displayName,formattedAddress,location,rating,userRatingCount,photos,priceLevel,reviews,editorialSummary,websiteUri",
      },
    });

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.statusText}`);
    }

    const place = await response.json();
    
    const hotel: Hotel = {
      placeId: place.id,
      displayName: place.displayName?.text || "Unknown Hotel",
      formattedAddress: place.formattedAddress || "",
      location: place.location || { latitude: 0, longitude: 0 },
      rating: place.rating || 0,
      userRatingCount: place.userRatingCount || 0,
      photos: place.photos || [],
      priceLevel: place.priceLevel,
      reviews: place.reviews,
      editorialSummary: place.editorialSummary?.text,
      websiteUri: place.websiteUri,
    };

    return NextResponse.json(hotel);
  } catch (error) {
    console.error(`Error fetching hotel ${placeId}:`, error);
    return NextResponse.json({ error: "Failed to fetch hotel details" }, { status: 500 });
  }
}
