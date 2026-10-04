import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = createAdminClient();
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (code) {
    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        room_type:room_types(*),
        hotel:hotels(*)
      `)
      .eq("confirmation_code", code)
      .single();

    if (error) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  }

  // Get user from auth header or session (simplification for now using auth header)
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = authHeader.replace("Bearer ", "");
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      room_type:room_types(*),
      hotel:hotels(*)
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = createAdminClient();
  
  try {
    const body = await request.json();
    const { roomTypeId, hotelPlaceId, guestName, guestEmail, checkIn, checkOut, guests, totalAmount, userId } = body;

    if (!roomTypeId || !hotelPlaceId || !guestName || !guestEmail || !checkIn || !checkOut || !totalAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate random confirmation code
    const confirmationCode = "HTL-" + Math.random().toString(36).substring(2, 7).toUpperCase();

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          confirmation_code: confirmationCode,
          user_id: userId || null,
          room_type_id: roomTypeId,
          hotel_place_id: hotelPlaceId,
          guest_name: guestName,
          guest_email: guestEmail,
          check_in: checkIn,
          check_out: checkOut,
          guests: guests,
          total_amount: totalAmount,
          status: "Confirmed",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating booking:", error);
      return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("Error processing booking request:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
