"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Clara Templeton",
    location: "Paris, France",
    rating: 5,
    quote: "Aetheria exceeded every expectation. The architecture harmonizes perfectly with the seascape. Falling asleep to the ocean and waking up to fresh espresso brought by our private butler was pure magic.",
    initials: "CT",
  },
  {
    name: "Richard Harrison",
    location: "New York, USA",
    rating: 5,
    quote: "From the cliffside saunas to the design details of the loft, this is hands-down the most inspiring resort I've stayed at. The absolute silence and serenity was exactly what I needed to disconnect.",
    initials: "RH",
  },
  {
    name: "Suki Yamamoto",
    location: "Tokyo, Japan",
    rating: 5,
    quote: "Every corner of this sanctuary feels deliberate and artistic. The garden suite felt like a private botanical oasis. The gastromony is world-class. We will certainly return every season.",
    initials: "SY",
  },
];

export default function Testimonials() {
  return (
    <section id="offers" className="py-24 bg-white border-b border-zinc-150/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-terracotta block">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-zinc-950">
            Voices of Sanctuary
          </h2>
          <p className="text-sm text-text-secondary">
            Hear from our global guests who have experienced the unparalleled serenity of Aetheria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="bg-bg-main border border-zinc-150 p-8 rounded-3xl relative flex flex-col justify-between"
            >
              <Quote className="absolute right-8 top-8 w-10 h-10 text-zinc-200/50 stroke-[1]" />
              
              <div className="space-y-4">
                <div className="flex gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-terracotta text-terracotta" />
                  ))}
                </div>
                <p className="text-sm italic leading-relaxed text-zinc-700 font-serif">
                  "{rev.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8 pt-4 border-t border-zinc-200/60">
                <div className="w-10 h-10 rounded-full bg-forest text-white font-sans text-xs font-semibold flex items-center justify-center shadow-sm">
                  {rev.initials}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900">{rev.name}</h4>
                  <p className="text-[10px] text-text-secondary">{rev.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
