import { NextRequest, NextResponse } from "next/server";

const FALLBACK_PHOTO_MAP: Record<string, string> = {
  fallback_serena: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
  fallback_marriott: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  fallback_pc: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
  fallback_bestwestern: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80",
  fallback_ramada: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
  fallback_hotelone: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
  fallback_envoy: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?auto=format&fit=crop&w=800&q=80",
  fallback_margala: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ placeId: string; photoRef: string[] }> }
) {
  const { photoRef: photoRefArr } = await params;
  const photoRef = photoRefArr.join("/");
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  // Check if this is a known fallback photo reference
  if (FALLBACK_PHOTO_MAP[photoRef]) {
    return NextResponse.redirect(FALLBACK_PHOTO_MAP[photoRef]);
  }

  if (!apiKey || photoRef.startsWith("fallback_")) {
    // Fallback to picsum for any unknown fallback
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
