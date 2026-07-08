"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export default function SplinePlaceholder() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // High-quality aesthetic Unsplash IDs for luxury interior vibes
  const images = [
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80", // Living room interior
    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80", // Hotel room bed
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80", // Resort view
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80"  // Bath/spa
  ];

  return (
    <div 
      className="relative w-full h-[480px] xl:h-[540px] perspective-[1500px] flex items-center justify-center cursor-crosshair overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-terracotta/10 to-forest/20 rounded-[3.5rem] blur-3xl opacity-60 pointer-events-none" />
      
      <motion.div
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        animate={{ y: [0, -15, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
      >
        {/* Base Glass Platform */}
        <div className="absolute w-[80%] h-[75%] rounded-[2.5rem] bg-white/20 border border-white/50 backdrop-blur-2xl shadow-[0_40px_80px_rgba(45,66,99,0.15)]" />

        {/* Top Left Floating Image */}
        <motion.div
          style={{ translateZ: "90px" }}
          className="absolute -top-4 -left-4 md:top-4 md:left-4 w-40 h-52 md:w-56 md:h-72 rounded-2xl overflow-hidden shadow-2xl border border-white/40 bg-zinc-100"
        >
          <img src={images[0]} alt="Luxury Interior" className="w-full h-full object-cover" />
        </motion.div>

        {/* Bottom Right Floating Image */}
        <motion.div
          style={{ translateZ: "140px" }}
          className="absolute -bottom-8 -right-4 md:bottom-2 md:right-8 w-48 h-40 md:w-64 md:h-52 rounded-2xl overflow-hidden shadow-2xl border border-white/40 bg-zinc-100"
        >
          <img src={images[1]} alt="Luxury Bed" className="w-full h-full object-cover" />
        </motion.div>

        {/* Center Accent Floating Element */}
        <motion.div
          style={{ translateZ: "180px" }}
          className="absolute flex items-center justify-center p-6 bg-white/90 backdrop-blur-xl rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white/50"
        >
          <div className="text-center">
            <h3 className="font-serif text-xl font-bold text-zinc-900 leading-tight">Aetheria</h3>
            <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-text-secondary mt-1">Virtual Tour</p>
          </div>
        </motion.div>

        {/* Top Right Floating Image (Small) */}
        <motion.div
          style={{ translateZ: "60px" }}
          className="absolute top-10 right-4 md:top-12 md:right-16 w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden shadow-xl border-4 border-white/80 bg-zinc-100"
        >
          <img src={images[2]} alt="Resort View" className="w-full h-full object-cover" />
        </motion.div>

        {/* Bottom Left Floating Image (Wide) */}
        <motion.div
          style={{ translateZ: "110px" }}
          className="absolute bottom-12 left-2 md:bottom-16 md:left-12 w-36 h-24 md:w-48 md:h-32 rounded-2xl overflow-hidden shadow-xl border border-white/40 bg-zinc-100"
        >
          <img src={images[3]} alt="Spa" className="w-full h-full object-cover" />
        </motion.div>
      </motion.div>
    </div>
  );
}
