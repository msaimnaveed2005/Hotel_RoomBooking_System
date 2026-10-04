"use client";

import * as React from "react";
import { type Booking, type BookingWithDetails } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface BookingsTableProps {
  bookings: (Booking | BookingWithDetails | any)[];
  isLoading: boolean;
}

function statusToVariant(status: Booking["status"]): BadgeVariant {
  const map: Record<Booking["status"], BadgeVariant> = {
    Confirmed: "confirmed",
    Pending: "pending",
    Cancelled: "cancelled",
  };
  return map[status];
}

export function BookingsTable({ bookings, isLoading }: BookingsTableProps) {
  return (
    <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-zinc-200/60 flex justify-between items-center">
        <div>
          <h3 className="text-base font-bold text-zinc-950">
            Recent Reservations
          </h3>
          <p className="text-[10px] text-text-secondary mt-0.5">
            Historical and active listings
          </p>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse text-xs font-medium">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200/60 text-zinc-400 font-bold uppercase tracking-wider">
              <th className="p-4 pl-6">ID</th>
              <th className="p-4">Guest</th>
              <th className="p-4">Room</th>
              <th className="p-4">Check-In</th>
              <th className="p-4">Check-Out</th>
              <th className="p-4">Amount</th>
              <th className="p-4 pr-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/50">
            {isLoading
              ? [...Array(5)].map((_, idx) => (
                  <tr key={idx}>
                    <td className="p-4 pl-6">
                      <Skeleton className="h-4 w-12" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-28" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-32" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-16" />
                    </td>
                    <td className="p-4 pr-6">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </td>
                  </tr>
                ))
              : bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-zinc-50/50 transition-colors"
                  >
                    <td className="p-4 pl-6 font-mono font-bold text-zinc-600 text-xs">
                      {booking.confirmation_code || booking.id?.slice(0, 8)}
                    </td>
                    <td className="p-4 font-semibold text-zinc-900">
                      {booking.guest_name || booking.guestName || "Guest"}
                    </td>
                    <td className="p-4 text-zinc-700">
                      {booking.room_type?.name || booking.roomName || "Sanctuary Suite"}
                    </td>
                    <td className="p-4 text-zinc-600">
                      {formatDate(booking.check_in || booking.checkIn)}
                    </td>
                    <td className="p-4 text-zinc-600">
                      {formatDate(booking.check_out || booking.checkOut)}
                    </td>
                    <td className="p-4 font-bold text-zinc-900">
                      {formatCurrency(booking.total_amount ?? booking.totalAmount ?? 0)}
                    </td>
                    <td className="p-4 pr-6">
                      <Badge
                        variant={statusToVariant(booking.status)}
                        className="text-[10px] font-bold"
                      >
                        {booking.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
