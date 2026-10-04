"use client";

import { Sparkles, Utensils, Waves, Milestone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  {
    icon: Sparkles,
    title: "Thermal Wellness Spa",
    desc: "Indulge in volcanic clay treatments, cedar wood saunas, and cliffside cold plunges.",
  },
  {
    icon: Utensils,
    title: "Gastronomy & Dining",
    desc: "A sensory organic journey utilizing ingredients harvested straight from local shores.",
  },
  {
    icon: Waves,
    title: "Infinity Horizon Pool",
    desc: "Submerge into our heated salt-water pool blending seamlessly with the ocean sky.",
  },
  {
    icon: Milestone,
    title: "24/7 Bespoke Butler",
    desc: "Tailored check-in, unpacking, boat charter arrangements, and private itinerary crafting.",
  },
];

export default function AmenitiesStrip() {
  return (
    <section id="amenities" className="py-24 bg-bg-main">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-terracotta block">
            Experiences
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-zinc-950">
            Unrivaled Guest Services
          </h2>
          <p className="text-sm text-text-secondary">
            Every element is carefully curated to elevate your presence, restore clarity, and create memories that transcend.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="bg-white rounded-3xl p-8 border border-zinc-150 shadow-sm hover:shadow-md transition-premium hover:-translate-y-1"
            >
              <span className="inline-flex p-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-terracotta mb-6">
                <item.icon className="w-6 h-6 stroke-[1.5]" />
              </span>
              <h3 className="font-serif text-lg font-bold text-zinc-900 mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
