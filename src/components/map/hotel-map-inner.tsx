"use client";

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Hotel } from "@/lib/types";
import Link from "next/link";

// Custom Leaflet icon for our map pins
const createCustomIcon = (isActive: boolean) => {
  const bgColor = isActive ? "#2D4263" : "#C84B31";
  const scale = isActive ? "transform: scale(1.25); z-index: 10;" : "";
  return L.divIcon({
    className: "bg-transparent border-none",
    html: `
      <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; transform: translate(-50%, -50%);">
        <div style="position: absolute; inset: 0; background: ${bgColor}; border-radius: 9999px; box-shadow: 0 4px 6px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; transition: transform 0.3s; ${scale} transform-origin: bottom center;">
          <div style="width: 8px; height: 8px; background: white; border-radius: 9999px;"></div>
        </div>
        <div style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid ${bgColor};"></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

function MapUpdater({ activeHotelId, hotels }: { activeHotelId?: string; hotels: Hotel[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (activeHotelId) {
      const activeHotel = hotels.find((h) => h.placeId === activeHotelId);
      if (activeHotel?.location) {
        map.setView(
          [activeHotel.location.latitude, activeHotel.location.longitude],
          14,
          { animate: true, duration: 1 }
        );
      }
    }
  }, [activeHotelId, hotels, map]);

  return null;
}

interface HotelMapInnerProps {
  hotels: Hotel[];
  activeHotelId?: string;
  onHotelClick?: (placeId: string) => void;
}

export default function HotelMapInner({ hotels, activeHotelId, onHotelClick }: HotelMapInnerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fix leaflet default icon issue
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-[400px] lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-sm border border-zinc-200">
      <MapContainer
        center={[33.6995, 73.0363]}
        zoom={12}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hotels.map((hotel) => {
          if (!hotel.location) return null;
          const isActive = activeHotelId === hotel.placeId;
          
          return (
            <Marker
              key={hotel.placeId}
              position={[hotel.location.latitude, hotel.location.longitude]}
              icon={createCustomIcon(isActive)}
              eventHandlers={{
                click: () => {
                  if (onHotelClick) onHotelClick(hotel.placeId);
                },
              }}
              zIndexOffset={isActive ? 1000 : 0}
            >
              <Popup className="font-sans" closeButton={false}>
                <div className="flex flex-col gap-1 text-center p-1">
                  <h3 className="font-serif font-semibold text-base text-zinc-900 m-0">{hotel.displayName}</h3>
                  <div className="flex items-center justify-center gap-1 text-terracotta text-sm mb-2">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{hotel.rating.toFixed(1)}</span>
                  </div>
                  <Link 
                    href={`/hotels/${hotel.placeId}`}
                    className="text-xs bg-terracotta text-white px-3 py-1.5 rounded-full hover:bg-terracotta/90 transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
        <MapUpdater activeHotelId={activeHotelId} hotels={hotels} />
      </MapContainer>
    </div>
  );
}
