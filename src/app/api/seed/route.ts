import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { FALLBACK_HOTELS } from "../hotels/fallback";

export async function GET(request: NextRequest) {
  return POST(request);
}

export async function POST(request: NextRequest) {
  const supabase = createAdminClient();

  try {
    let placeIds: string[] = [];

    // Attempt to fetch real hotels from Google
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (apiKey) {
      const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "places.id",
        },
        body: JSON.stringify({
          textQuery: "luxury hotels in Islamabad, Pakistan",
          maxResultCount: 10,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        placeIds = (data.places || []).map((p: any) => p.id);
      }
    }

    if (placeIds.length === 0) {
      placeIds = FALLBACK_HOTELS.map((h) => h.placeId);
    }

    let hotelsSeeded = 0;
    let roomTypesSeeded = 0;
    let bookingsSeeded = 0;

    // 1. Seed Hotels
    for (const placeId of placeIds) {
      const { error } = await supabase
        .from("hotels")
        .upsert({ place_id: placeId, is_active: true }, { onConflict: "place_id" });
      if (!error) hotelsSeeded++;
    }

    // 2. Seed Room Types
    const roomTemplates = [
      {
        name: "Deluxe Room",
        description: "Elegant comfort with modern amenities.",
        full_description: "Experience unparalleled comfort in our Deluxe Room, featuring contemporary design, premium bedding, and a tranquil atmosphere perfect for both leisure and business travelers.",
        capacity: 2,
        base_rate: 200,
        amenities: ["Wifi", "Air Conditioning", "Mini Bar", "Room Service", "Smart TV"],
        images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80"],
      },
      {
        name: "Executive Suite",
        description: "Spacious luxury with exclusive lounge access.",
        full_description: "The Executive Suite offers an expansive living area separated from the bedroom, providing the ultimate privacy. Enjoy exclusive access to the Executive Lounge and personalized butler service.",
        capacity: 3,
        base_rate: 400,
        amenities: ["Wifi", "Spa Access", "Mini Bar", "Private Lounge", "Butler Service", "Rain Shower"],
        images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"],
      },
      {
        name: "Premium Terrace Suite",
        description: "Breathtaking views from your private outdoor sanctuary.",
        full_description: "Indulge in indoor-outdoor living with the Premium Terrace Suite. This suite features a sprawling private terrace overlooking the city, complete with outdoor seating and a jacuzzi.",
        capacity: 4,
        base_rate: 650,
        amenities: ["Wifi", "Spa Access", "Private Terrace", "Mini Bar", "Pool Access", "Butler Service", "Jacuzzi"],
        images: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"],
      },
      {
        name: "Royal Penthouse",
        description: "The pinnacle of opulence and bespoke service.",
        full_description: "Our signature Royal Penthouse spans the entire top floor, offering panoramic views, a private infinity pool, a dedicated chef, and unmatched luxury in every detail.",
        capacity: 6,
        base_rate: 1500,
        amenities: ["Wifi", "Private Pool", "Spa Access", "Personal Chef", "Butler Service", "Helipad Access", "Private Cinema"],
        images: ["https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80"],
      },
    ];

    for (const placeId of placeIds) {
      for (const tpl of roomTemplates) {
        // Vary rate slightly
        const variedRate = tpl.base_rate + Math.floor(Math.random() * 50) - 25;
        const { error } = await supabase.from("room_types").insert({
          hotel_place_id: placeId,
          name: tpl.name,
          description: tpl.description,
          full_description: tpl.full_description,
          capacity: tpl.capacity,
          base_rate: variedRate,
          amenities: tpl.amenities,
          images: tpl.images,
          is_available: true,
        });
        if (!error) roomTypesSeeded++;
      }
    }

    // 3. Seed Sample Bookings (optional, requires room_type_ids)
    // We'll skip complex booking seeding here and let the admin dashboard be empty initially or let users book.

    return NextResponse.json({ success: true, hotelsSeeded, roomTypesSeeded });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
