"use client";

import * as React from "react";
import { CalendarDays } from "lucide-react";
import { cn, getDateInputValue } from "@/lib/utils";

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
  /** Optional name forwarded to the native input for form submission */
  name?: string;
  /** Marks the date as required. Defaults to true. */
  required?: boolean;
}

export function DatePicker({
  label,
  value,
  onChange,
  min,
  max,
  className,
  id,
  name,
  required = true,
}: DatePickerProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const minDate = min ?? getDateInputValue();

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col border border-zinc-200 rounded-2xl p-3 focus-within:ring-2 focus-within:ring-terracotta transition-all",
        className,
      )}
    >
      <label
        htmlFor={inputId}
        className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-1"
      >
        {label}
      </label>
      <div className="relative min-w-0">
        <input
          id={inputId}
          name={name}
          type="date"
          min={minDate}
          max={max}
          value={value}
          onInput={(e) => onChange(e.currentTarget.value)}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full min-w-0 bg-transparent p-0 pr-8 text-xs font-semibold text-zinc-950 border-none outline-none cursor-pointer focus:ring-0 [color-scheme:light] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
        />
        <CalendarDays
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500"
        />
      </div>
    </div>
  );
}

export default DatePicker;
