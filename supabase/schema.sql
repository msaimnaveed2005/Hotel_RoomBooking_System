-- ============================================================
-- Aetheria Hotel Booking System — Supabase Schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- HOTELS — stores Google place_id as the permanent key
-- Name, address, rating are NOT stored (Google TOS — re-fetch at request time)
CREATE TABLE IF NOT EXISTS hotels (
  place_id    TEXT PRIMARY KEY,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ROOM TYPES — our seeded bookable layer per hotel
CREATE TABLE IF NOT EXISTS room_types (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hotel_place_id    TEXT NOT NULL REFERENCES hotels(place_id) ON DELETE CASCADE,
  name              TEXT NOT NULL,
  description       TEXT,
  full_description  TEXT,
  capacity          INT NOT NULL DEFAULT 2,
  base_rate         NUMERIC(10,2) NOT NULL,
  amenities         TEXT[] DEFAULT '{}',
  images            TEXT[] DEFAULT '{}',
  is_available      BOOLEAN DEFAULT true,
  created_at        TIMESTAMPTZ DEFAULT now()
);

-- BOOKINGS — real booking records tied to auth users
CREATE TABLE IF NOT EXISTS bookings (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  confirmation_code   TEXT UNIQUE NOT NULL,
  user_id             UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  room_type_id        UUID REFERENCES room_types(id) ON DELETE SET NULL,
  hotel_place_id      TEXT REFERENCES hotels(place_id),
  guest_name          TEXT NOT NULL,
  guest_email         TEXT NOT NULL,
  check_in            DATE NOT NULL,
  check_out           DATE NOT NULL,
  guests              INT DEFAULT 1,
  total_amount        NUMERIC(10,2) NOT NULL,
  status              TEXT CHECK (status IN ('Confirmed','Pending','Cancelled')) DEFAULT 'Pending',
  created_at          TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_room_types_hotel ON room_types(hotel_place_id);
CREATE INDEX IF NOT EXISTS idx_bookings_hotel ON bookings(hotel_place_id);
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_code ON bookings(confirmation_code);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Hotels & room types: anyone can read
CREATE POLICY "Public read hotels" ON hotels FOR SELECT USING (true);
CREATE POLICY "Public read room_types" ON room_types FOR SELECT USING (true);

-- Bookings: users can read their own
CREATE POLICY "Users read own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

-- Bookings: users can create their own
CREATE POLICY "Users create own bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Bookings: users can update their own (e.g., cancel)
CREATE POLICY "Users update own bookings" ON bookings
  FOR UPDATE USING (auth.uid() = user_id);
