"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function Counter({
  value,
  onChange,
  min = 1,
  max = 10,
  className,
}: CounterProps) {
  const decrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (value > min) onChange(value - 1);
  };

  const increment = (e: React.MouseEvent) => {
    e.preventDefault();
    if (value < max) onChange(value + 1);
  };

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <button
        onClick={decrement}
        disabled={value <= min}
        aria-label="Decrease value"
        className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-200 text-zinc-600 hover:bg-zinc-50 active:scale-95 disabled:opacity-40 disabled:hover:bg-transparent transition-all focus-ring"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="font-sans font-medium text-zinc-900 w-6 text-center select-none">
        {value}
      </span>
      <button
        onClick={increment}
        disabled={value >= max}
        aria-label="Increase value"
        className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-200 text-zinc-600 hover:bg-zinc-50 active:scale-95 disabled:opacity-40 disabled:hover:bg-transparent transition-all focus-ring"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
