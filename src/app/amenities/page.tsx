import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bath,
  ChefHat,
  Clock3,
  Dumbbell,
  Leaf,
  Palmtree,
  Sparkles,
  Waves,
} from "lucide-react";
import AmenitiesStrip from "@/components/sections/amenities-strip";

export const metadata: Metadata = {
  title: "Amenities | Aetheria",
  description:
    "Explore Aetheria's wellness, dining, pool, butler, and private guest amenities.",
};

const highlights = [
  {
    icon: Bath,
    title: "Thermal Spa Rituals",
    copy: "Cedar saunas, volcanic clay rooms, steam circuits, and cliffside cold plunges designed for deep restoration.",
  },
  {
    icon: ChefHat,
    title: "Organic Dining",
    copy: "Seasonal tasting menus, private terrace breakfasts, and in-suite dining led by coastal produce and local growers.",
  },
  {
    icon: Waves,
    title: "Horizon Pool",
    copy: "A heated salt-water infinity pool with shaded loungers, sunset service, and quiet adults-only morning hours.",
  },
  {
    icon: Clock3,
    title: "Bespoke Butler Care",
    copy: "Round-the-clock assistance for check-in, unpacking, reservations, wellness bookings, and custom itineraries.",
  },
  {
    icon: Dumbbell,
    title: "Movement Studio",
    copy: "Personal training, reformer sessions, sunrise yoga, and guided breathwork in an airy garden studio.",
  },
  {
    icon: Palmtree,
    title: "Private Shore Access",
    copy: "Reserved beach paths, picnic setups, paddle boards, and evening fire lounges steps from the villas.",
  },
];

const serviceNotes = [
  "Arrival tea ceremony and express private check-in",
  "Daily housekeeping with evening turndown service",
  "Complimentary wellness consultation for multi-night stays",
  "Curated local excursions arranged by the concierge team",
];

export default function AmenitiesPage() {
  return (
    <div className="min-h-screen bg-bg-main">
      <section className="border-b border-zinc-150 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-terracotta">
                <Sparkles className="w-4 h-4" />
                Guest Amenities
              </span>
              <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight text-zinc-950">
                Everything in reach, nothing in the way.
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-text-secondary max-w-2xl">
                Aetheria pairs quiet luxury with deeply practical service: wellness, dining, movement, shoreline access, and tailored care shaped around the rhythm of your stay.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/hotels"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#B9442D] focus-ring"
              >
                Reserve a sanctuary
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/testimonials"
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50 focus-ring"
              >
                Read guest stories
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[2rem] bg-forest p-6 text-white min-h-56 flex flex-col justify-between">
              <Leaf className="w-9 h-9 stroke-[1.25]" />
              <div>
                <p className="font-serif text-3xl font-bold">24/7</p>
                <p className="text-sm text-white/75">Butler and concierge support</p>
              </div>
            </div>
            <div className="rounded-[2rem] bg-zinc-100 p-6 min-h-56 flex flex-col justify-between mt-8">
              <Waves className="w-9 h-9 text-terracotta stroke-[1.25]" />
              <div>
                <p className="font-serif text-3xl font-bold text-zinc-950">4</p>
                <p className="text-sm text-text-secondary">Wellness circuits across the spa</p>
              </div>
            </div>
            <div className="col-span-2 rounded-[2rem] border border-zinc-150 bg-bg-main p-6">
              <p className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-4">
                Included With Every Stay
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceNotes.map((note) => (
                  <div key={note} className="flex items-start gap-3 text-sm text-zinc-700">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-terracotta shrink-0" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-terracotta mb-2 block">
              Service Menu
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-zinc-950">
              Designed for long, unhurried days
            </h2>
          </div>
          <p className="text-sm text-text-secondary max-w-md md:text-right">
            Each amenity is available through the guest concierge, with private appointments and in-suite options when the moment calls for more quiet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="bg-white border border-zinc-150 rounded-3xl p-7 shadow-sm"
            >
              <span className="inline-flex p-3 rounded-2xl bg-zinc-50 border border-zinc-100 text-terracotta mb-6">
                <item.icon className="w-6 h-6 stroke-[1.5]" />
              </span>
              <h3 className="font-serif text-xl font-bold text-zinc-950 mb-3">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {item.copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <AmenitiesStrip />
    </div>
  );
}
