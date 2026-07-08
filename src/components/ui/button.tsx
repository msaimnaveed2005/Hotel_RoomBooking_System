"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center font-sans font-medium rounded-full cursor-pointer transition-all duration-300 focus-ring disabled:opacity-50 disabled:pointer-events-none active:scale-95",
          // Variants
          variant === "primary" && 
            "bg-terracotta text-white shadow-sm hover:bg-opacity-90 hover:shadow-md active:bg-opacity-100",
          variant === "secondary" && 
            "bg-forest text-white shadow-sm hover:bg-opacity-90 hover:shadow-md",
          variant === "outline" && 
            "border border-zinc-200 bg-transparent text-text-primary hover:bg-zinc-50",
          variant === "ghost" && 
            "bg-transparent text-text-secondary hover:bg-zinc-100 hover:text-text-primary",
          // Sizes
          size === "sm" && "px-4 py-2 text-xs h-[38px]",
          size === "md" && "px-6 py-3 text-sm h-[46px]",
          size === "lg" && "px-8 py-4 text-base h-[54px]",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
