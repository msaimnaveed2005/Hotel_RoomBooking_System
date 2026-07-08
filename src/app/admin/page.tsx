"use client";

import * as React from "react";
import { bookings } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Users, DollarSign, CalendarRange, MonitorOff, LayoutDashboard, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/admin/metric-card";
import { AnalyticsChart } from "@/components/admin/analytics-chart";
import { BookingsTable } from "@/components/admin/bookings-table";

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
          <MetricCard
            icon={DollarSign}
            label="Total Revenue"
            value={formatCurrency(totalRevenue)}
            trend="+12.4% vs last week"
            trendUp={true}
            isLoading={isLoading}
          />
          <MetricCard
            icon={Users}
            label="Occupancy Rate"
            value={occupancyRate}
            trend="Current active season"
            trendUp={false}
            isLoading={isLoading}
          />
          <MetricCard
            icon={CalendarRange}
            label="Active Bookings"
            value={activeBookings}
            trend="Reservations checking in"
            trendUp={false}
            isLoading={isLoading}
          />
        </div>

        {/* Analytics Chart Row */}
        <AnalyticsChart data={chartData} isLoading={isLoading} />

        {/* Data Table Row */}
        <BookingsTable bookings={currentBookings} isLoading={isLoading} />
      </div>
    </div>
  );
}
