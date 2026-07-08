"use client";

import * as React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { bookings, rooms } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { TrendingUp, Users, DollarSign, CalendarRange, MonitorOff, LayoutDashboard, RefreshCcw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

// Mock revenue data over last 7 days
const chartData = [
  { day: "Mon", revenue: 4200 },
  { day: "Tue", revenue: 5800 },
  { day: "Wed", revenue: 8100 },
  { day: "Thu", revenue: 6400 },
  { day: "Fri", revenue: 9500 },
  { day: "Sat", revenue: 12500 },
  { day: "Sun", revenue: 11000 },
];

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentBookings, setCurrentBookings] = React.useState(bookings);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Compute metrics
  const totalRevenue = bookings
    .filter((b) => b.status === "Confirmed")
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const activeBookings = bookings.filter((b) => b.status === "Confirmed" || b.status === "Pending").length;
  
  // Occupancy rate calculation (mock/formula)
  const occupancyRate = "78%";

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 font-sans p-6 md:p-10">
      {/* Mobile Notice (dashboard only optimized for lg) */}
      <div className="lg:hidden flex flex-col items-center justify-center text-center py-20 px-6 max-w-sm mx-auto bg-white rounded-3xl border border-zinc-150 shadow-sm mt-12">
        <MonitorOff className="w-12 h-12 text-zinc-400 stroke-[1.25] mb-4" />
        <h3 className="font-serif text-lg font-bold text-zinc-950 mb-2">Larger Screen Recommended</h3>
        <p className="text-xs text-text-secondary leading-relaxed mb-6">
          The Aetheria Management console contains dense spreadsheets and live graphs optimized for desktop monitors. Please view on a screen wider than 1024px.
        </p>
        <Button variant="outline" size="sm" onClick={() => window.location.href = "/"}>
          Go to Homepage
        </Button>
      </div>

      {/* Desktop Dashboard view (visible on lg) */}
      <div className="hidden lg:block max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-zinc-200/60 pb-6">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-1">
              Operations
            </span>
            <h1 className="font-sans text-2xl font-bold tracking-tight text-zinc-950 flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6 text-forest" /> Administrative Console
            </h1>
          </div>
          <button
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 500);
            }}
            className="p-2 border border-zinc-200 bg-white rounded-lg hover:bg-zinc-50 hover:text-zinc-900 transition-colors focus-ring cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCcw className="w-4 h-4 text-zinc-650" />
          </button>
        </div>

        {/* Top Bento Metrics Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Card 1: Revenue */}
          <div className="bg-white border border-zinc-200/80 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Revenue</span>
              <span className="p-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg">
                <DollarSign className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-4">
              {isLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <h3 className="text-2xl font-bold text-zinc-950">{formatCurrency(totalRevenue)}</h3>
              )}
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" /> +12.4% vs last week
              </span>
            </div>
          </div>

          {/* Card 2: Occupancy */}
          <div className="bg-white border border-zinc-200/80 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Occupancy Rate</span>
              <span className="p-2 bg-zinc-50 text-zinc-600 border border-zinc-150 rounded-lg">
                <Users className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-4">
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <h3 className="text-2xl font-bold text-zinc-950">{occupancyRate}</h3>
              )}
              <span className="text-[10px] text-zinc-500 font-semibold flex items-center gap-1 mt-1">
                Current active season
              </span>
            </div>
          </div>

          {/* Card 3: Active Bookings */}
          <div className="bg-white border border-zinc-200/80 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Active Bookings</span>
              <span className="p-2 bg-zinc-50 text-zinc-650 border border-zinc-150 rounded-lg">
                <CalendarRange className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-4">
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <h3 className="text-2xl font-bold text-zinc-950">{activeBookings}</h3>
              )}
              <span className="text-[10px] text-zinc-500 font-semibold flex items-center gap-1 mt-1">
                Reservations checking in
              </span>
            </div>
          </div>
        </div>

        {/* Analytics Chart Row */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-zinc-950">Live Revenue Analytics</h3>
              <p className="text-[10px] text-text-secondary mt-0.5">Last 7 days of hotel transactions</p>
            </div>
          </div>

          <div className="h-80 w-full relative">
            {isLoading ? (
              <Skeleton className="w-full h-full rounded-xl" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C84B31" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#C84B31" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F1F4" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#71717A" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#71717A" }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ background: "#18181B", borderRadius: "8px", border: "none", color: "#FFF", fontSize: 11 }}
                    labelStyle={{ fontWeight: "bold" }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#C84B31" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Data Table Row */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-200/60 flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-zinc-950">Recent Reservations</h3>
              <p className="text-[10px] text-text-secondary mt-0.5">Historical and active listings</p>
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
                {isLoading ? (
                  [...Array(5)].map((_, idx) => (
                    <tr key={idx}>
                      <td className="p-4 pl-6"><Skeleton className="h-4 w-12" /></td>
                      <td className="p-4"><Skeleton className="h-4 w-28" /></td>
                      <td className="p-4"><Skeleton className="h-4 w-32" /></td>
                      <td className="p-4"><Skeleton className="h-4 w-20" /></td>
                      <td className="p-4"><Skeleton className="h-4 w-20" /></td>
                      <td className="p-4"><Skeleton className="h-4 w-16" /></td>
                      <td className="p-4 pr-6"><Skeleton className="h-6 w-20 rounded-full" /></td>
                    </tr>
                  ))
                ) : (
                  currentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="p-4 pl-6 font-bold text-zinc-500">{booking.id}</td>
                      <td className="p-4 font-semibold text-zinc-900">{booking.guestName}</td>
                      <td className="p-4 text-zinc-700">{booking.roomName}</td>
                      <td className="p-4 text-zinc-600">{formatDate(booking.checkIn)}</td>
                      <td className="p-4 text-zinc-600">{formatDate(booking.checkOut)}</td>
                      <td className="p-4 font-bold text-zinc-900">{formatCurrency(booking.totalAmount)}</td>
                      <td className="p-4 pr-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            booking.status === "Confirmed"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                              : booking.status === "Pending"
                              ? "bg-amber-50 text-amber-700 border-amber-100"
                              : "bg-rose-50 text-rose-700 border-rose-100"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
