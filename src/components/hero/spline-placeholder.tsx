"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

// Spline needs WebGL and only runs client side
const Spline = dynamic(
  () => import("@splinetool/react-spline").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <SplineFallback />,
  }
);

function SplineFallback() {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <Skeleton className="w-[85%] h-[85%] rounded-[3rem]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-terracotta/5 to-forest/10 rounded-[3.5rem] pointer-events-none" />
      <div className="absolute flex flex-col items-center gap-2 text-center pointer-events-none px-6">
        <span className="font-serif text-lg font-medium text-forest/70">Aetheria Sculptures</span>
        <span className="text-xs text-text-secondary/70">Loading 3D Visualizer...</span>
      </div>
    </div>
  );
}

export default function SplinePlaceholder() {
  const [hasError, setHasError] = React.useState(false);

  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative w-full h-[480px] xl:h-[540px] rounded-[3.5rem] bg-white border border-zinc-150/80 shadow-[0_20px_50px_rgba(45,66,99,0.05)] overflow-hidden flex items-center justify-center"
    >
      {hasError ? (
        <SplineFallback />
      ) : (
        <React.Suspense fallback={<SplineFallback />}>
          <div className="w-full h-full relative">
            {/* Embedded interactive canvas of organic luxury spline, or default visualizer */}
            <Spline 
              scene="https://prod.spline.design/iW5B-C178Ld73P3m/scene.splinecode" 
              onError={() => setHasError(true)}
            />
            {/* Elegant vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent pointer-events-none" />
          </div>
        </React.Suspense>
      )}
    </motion.div>
  );
}
