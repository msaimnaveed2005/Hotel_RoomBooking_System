import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ placeId: string; photoRef: string }> }
) {
  const { photoRef } = await params;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey || photoRef.startsWith("fallback_")) {
    // If no API key or it's a fallback photo request, redirect to placeholder
    return NextResponse.redirect(`https://picsum.photos/seed/${photoRef}/800/600`);
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/${photoRef}/media?maxWidthPx=800&key=${apiKey}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.redirect(`https://picsum.photos/seed/${photoRef}/800/600`);
      }
      throw new Error(`Google Places API error: ${response.statusText}`);
    }

    // Proxy the image stream back to the client
    const headers = new Headers();
    headers.set("Content-Type", response.headers.get("Content-Type") || "image/jpeg");
    headers.set("Cache-Control", "public, max-age=86400"); // Cache for 24 hours

    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(`Error proxying photo ${photoRef}:`, error);
    return NextResponse.redirect(`https://picsum.photos/seed/${photoRef}/800/600`);
  }
}
