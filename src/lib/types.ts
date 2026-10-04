// ============================================================
// Google Places API types (fetched at request time, not persisted)
// ============================================================

export interface HotelPhotoAttribution {
  displayName: string;
  uri: string;
}

export interface HotelPhoto {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions: HotelPhotoAttribution[];
}

export interface Hotel {
  placeId: string;
  displayName: string;
  display_name?: string;
  formattedAddress: string;
  location: { latitude: number; longitude: number };
  rating: number;
  userRatingCount: number;
  photos: HotelPhoto[];
  priceLevel?: string;
  editorialSummary?: string;
  websiteUri?: string;
  reviews?: GooglePlaceReview[];
}

export interface GooglePlaceReview {
  authorAttribution: {
    displayName: string;
    uri: string;
    photoUri: string;
  };
  rating: number;
  relativePublishTimeDescription: string;
  text: { text: string; languageCode: string };
}

// ============================================================
// Supabase types (our bookable layer)
// ============================================================

export interface RoomType {
  id: string;
  hotel_place_id: string;
  name: string;
  description: string;
  full_description: string;
  capacity: number;
  base_rate: number;
  amenities: string[];
  images: string[];
  is_available: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  confirmation_code: string;
  user_id: string;
  room_type_id: string;
  hotel_place_id: string;
  guest_name: string;
  guest_email: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_amount: number;
  status: "Confirmed" | "Pending" | "Cancelled";
  created_at: string;
  // Joined fields (optional, populated by API)
  room_type?: RoomType;
  hotel?: Hotel;
}

// ============================================================
// Combined view types for UI convenience
// ============================================================

export interface HotelWithRooms extends Hotel {
  roomTypes: RoomType[];
}

export interface BookingWithDetails extends Booking {
  room_type: RoomType;
  hotel: Hotel;
}
