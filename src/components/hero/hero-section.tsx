"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SplinePlaceholder from "@/components/hero/spline-placeholder";
import FloatingSearchBar from "@/components/hero/floating-search-bar";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="relative pt-12 pb-24 md:py-32 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-50 via-bg-main to-bg-main">
      {/* Absolute Decorative Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-gradient-to-tr from-forest/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-gradient-to-bl from-terracotta/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Staggered Text Reveal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left space-y-6 md:space-y-8"
          >
            {/* Rating Tag */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white border border-zinc-150 rounded-full px-4 py-1.5 shadow-sm"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-terracotta text-terracotta" />
                ))}
              </div>
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-text-primary">
                Top Rated Sanctuary 2026
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.1] text-zinc-950 font-bold tracking-tight"
            >
              Experience Unmatched <br />
              <span className="text-terracotta italic font-normal">Serenity</span>
            </motion.h1>

            {/* Subcopy */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-base md:text-lg text-text-secondary leading-relaxed max-w-xl"
            >
              Aetheria is an architecturally-led premium hospitality retreat where modernist clean lines meet natural raw textures, nestled beside pristine, crystal ocean waves.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 w-full sm:w-auto"
            >
              <Link href="/rooms" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 shadow-lg">
                  Explore Accommodations <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/#amenities" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Experiences
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Spline Placeholder */}
          <div className="w-full lg:col-span-5 relative mt-8 lg:mt-0">
            <SplinePlaceholder />
          </div>
        </div>

        {/* Floating Search Bar (overlap at bottom) */}
        <div className="mt-16 md:mt-24">
          <FloatingSearchBar />
        </div>
      </div>
    </section>
  );
}
