"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface ChartDataPoint {
  day: string;
  revenue: number;
}

interface AnalyticsChartProps {
  data: ChartDataPoint[];
  isLoading: boolean;
}

export function AnalyticsChart({ data, isLoading }: AnalyticsChartProps) {
  return (
    <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-base font-bold text-zinc-950">
            Live Revenue Analytics
          </h3>
          <p className="text-[10px] text-text-secondary mt-0.5">
            Last 7 days of hotel transactions
          </p>
        </div>
      </div>

      <div className="h-80 w-full relative">
        {isLoading ? (
          <Skeleton className="w-full h-full rounded-xl" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C84B31" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#C84B31" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F1F4" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10, fill: "#71717A" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#71717A" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#18181B",
                  borderRadius: "8px",
                  border: "none",
                  color: "#FFF",
                  fontSize: 11,
                }}
                labelStyle={{ fontWeight: "bold" }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#C84B31"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
