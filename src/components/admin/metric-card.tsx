"use client";

import * as React from "react";
import { type LucideIcon, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend: string;
  trendUp: boolean;
  isLoading: boolean;
  className?: string;
}

export function MetricCard({
  icon: Icon,
  label,
  value,
  trend,
  trendUp,
  isLoading,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-zinc-200/80 p-6 rounded-2xl flex flex-col justify-between shadow-sm",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          {label}
        </span>
        <span
          className={cn(
            "p-2 border rounded-lg",
            trendUp
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : "bg-zinc-50 text-zinc-600 border-zinc-150"
          )}
        >
          <Icon className="w-4 h-4" />
        </span>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <Skeleton className="h-8 w-28" />
        ) : (
          <h3 className="text-2xl font-bold text-zinc-950">{value}</h3>
        )}
        <span
          className={cn(
            "text-[10px] font-semibold flex items-center gap-1 mt-1",
            trendUp ? "text-emerald-600" : "text-zinc-500"
          )}
        >
          {trendUp && <TrendingUp className="w-3.5 h-3.5" />}
          {trend}
        </span>
      </div>
    </div>
  );
}
