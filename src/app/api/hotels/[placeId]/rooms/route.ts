import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ placeId: string }> }
) {
  const { placeId } = await params;
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("room_types")
    .select("*")
    .eq("hotel_place_id", placeId)
    .eq("is_available", true);

  if (error) {
    console.error(`Error fetching room types for hotel ${placeId}:`, error);
    return NextResponse.json({ error: "Failed to fetch room types" }, { status: 500 });
  }

  return NextResponse.json(data);
}
