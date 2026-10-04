import * as React from "react";
import { createClient } from "@/lib/supabase/server";
import { MetricCard } from "@/components/admin/metric-card";
import { AnalyticsChart } from "@/components/admin/analytics-chart";
import { BookingsTable } from "@/components/admin/bookings-table";
import { DollarSign, Users, Calendar, TrendingUp } from "lucide-react";
import { redirect } from "next/navigation";
import { BookingWithDetails } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If we really wanted to restrict to just admins, we'd check a role here.
  // For demo purposes, any logged in user can see it, but we could restrict it.
  if (!user) {
    redirect("/login?redirect=/admin");
  }

  // Fetch real data
  const { data: rawBookings, error } = await supabase
    .from("bookings")
    .select(`
      *,
      room_type:room_types(*),
      hotel:hotels(*)
    `)
    .order("created_at", { ascending: false });

  const bookings: BookingWithDetails[] = rawBookings || [];

  // Calculate metrics
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.status !== "Cancelled" ? b.total_amount : 0), 0);
  const activeBookings = bookings.filter(b => b.status === "Confirmed" || b.status === "Pending").length;
  
  // Dummy chart data based on recent bookings
  const chartData = [
    { day: "Mon", revenue: totalRevenue * 0.1 },
    { day: "Tue", revenue: totalRevenue * 0.15 },
    { day: "Wed", revenue: totalRevenue * 0.12 },
    { day: "Thu", revenue: totalRevenue * 0.2 },
    { day: "Fri", revenue: totalRevenue * 0.25 },
    { day: "Sat", revenue: totalRevenue * 0.18 },
    { day: "Sun", revenue: totalRevenue * 0.1 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 mt-16">
      {/* Mobile Notice */}
      <div className="md:hidden mb-6 p-4 bg-terracotta/10 border border-terracotta/20 rounded-2xl text-terracotta text-sm">
        For the best administrative experience, please view this dashboard on a larger screen.
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-zinc-950 mb-2">
            Sanctuary Command
          </h1>
          <p className="text-sm text-text-secondary">
            Oversee reservations and revenue across all partner properties.
          </p>
        </div>
      </div>

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          icon={DollarSign}
          label="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          trend="+12.5%"
          trendUp={true}
          isLoading={false}
        />
        <MetricCard
          icon={Calendar}
          label="Active Stays"
          value={activeBookings}
          trend="+4.2%"
          trendUp={true}
          isLoading={false}
        />
        <MetricCard
          icon={Users}
          label="Total Guests"
          value={bookings.reduce((sum, b) => sum + (b.status !== "Cancelled" ? b.guests : 0), 0)}
          trend="+8.1%"
          trendUp={true}
          isLoading={false}
        />
        <MetricCard
          icon={TrendingUp}
          label="Occupancy Rate"
          value="78%"
          trend="-2.4%"
          trendUp={false}
          isLoading={false}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Chart Section */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-xl font-bold text-zinc-950">Revenue Overview</h2>
              <select className="text-xs border border-zinc-200 rounded-lg px-2 py-1 bg-zinc-50 focus-ring" aria-label="Chart time range">
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="flex-grow w-full relative">
              <AnalyticsChart data={chartData} isLoading={false} />
            </div>
          </div>
        </div>

        {/* Recent Bookings List / Data Table */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-xl font-bold text-zinc-950">Recent Activity</h2>
              <button className="text-xs font-semibold text-terracotta hover:underline">View All</button>
            </div>
            <div className="flex-grow overflow-hidden">
              <BookingsTable bookings={bookings} isLoading={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
