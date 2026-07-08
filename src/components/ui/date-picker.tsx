"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  /** Label text displayed above the input */
  label: string;
  /** Current value in YYYY-MM-DD format */
  value: string;
  /** Callback fired with the new YYYY-MM-DD string */
  onChange: (value: string) => void;
  /** Minimum selectable date (YYYY-MM-DD). Defaults to today. */
  min?: string;
  /** Maximum selectable date (YYYY-MM-DD) */
  max?: string;
  /** Additional class names merged onto the wrapper */
  className?: string;
  /** Optional id forwarded to the native input */
  id?: string;
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export function DatePicker({
  label,
  value,
  onChange,
  min,
  max,
  className,
  id,
}: DatePickerProps) {
  const minDate = min ?? getToday();

  return (
    <div
      className={cn(
        "flex flex-col border border-zinc-200 rounded-2xl p-3 focus-within:ring-2 focus-within:ring-terracotta transition-all",
        className,
      )}
    >
      <label
        htmlFor={id}
        className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type="date"
        min={minDate}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="text-xs font-semibold bg-transparent text-zinc-950 border-none outline-none focus:ring-0 p-0 cursor-pointer w-full"
      />
    </div>
  );
}

export default DatePicker;
