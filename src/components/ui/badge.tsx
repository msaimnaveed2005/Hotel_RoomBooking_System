"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "confirmed" | "pending" | "cancelled" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  pending: "bg-amber-50 text-amber-700 border-amber-100",
  cancelled: "bg-rose-50 text-rose-700 border-rose-100",
  default: "bg-zinc-50 text-zinc-700 border-zinc-200",
};

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
