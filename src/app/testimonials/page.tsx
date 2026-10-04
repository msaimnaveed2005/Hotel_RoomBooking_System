import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Quote, ShieldCheck, Sparkles, Star } from "lucide-react";
import Testimonials from "@/components/sections/testimonials";

export const metadata: Metadata = {
  title: "Testimonials | Aetheria",
  description:
    "Read guest testimonials and stories from travelers who stayed at Aetheria.",
};

const featuredStories = [
  {
    name: "Helena Fournier",
    trip: "Five-night ocean loft retreat",
    quote:
      "The staff anticipated the little things without ever interrupting the quiet. Every meal, view, and spa appointment felt perfectly timed.",
  },
  {
    name: "Marcus Kaelen",
    trip: "Anniversary villa stay",
    quote:
      "The villa gave us complete privacy, and the butler dinner under the stars became the benchmark for every celebration after it.",
  },
  {
    name: "Priya Nair",
    trip: "Family sanctuary week",
    quote:
      "Our children had space to explore while the adults could genuinely rest. Aetheria made a family trip feel graceful.",
  },
];

const trustStats = [
  { value: "4.9/5", label: "Average guest rating" },
  { value: "92%", label: "Guests planning a return stay" },
  { value: "38", label: "Countries represented by guests" },
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-bg-main">
      <section className="bg-white border-b border-zinc-150">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-terracotta">
                <Star className="w-4 h-4 fill-terracotta" />
                Guest Testimonials
              </span>
              <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight text-zinc-950">
                Stays remembered by how they felt.
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-text-secondary max-w-2xl">
                Guests come to Aetheria for architecture, privacy, and the coast. They return for the rare feeling of being cared for without being crowded.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/hotels"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#B9442D] focus-ring"
              >
                Find your room
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/amenities"
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50 focus-ring"
              >
                Explore amenities
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] bg-forest p-6 md:p-8 text-white shadow-sm">
            <Quote className="w-10 h-10 text-white/45 stroke-[1.25] mb-8" />
            <p className="font-serif text-2xl md:text-3xl leading-snug">
              &ldquo;The silence, the service, and the ocean views made the whole stay feel beautifully composed.&rdquo;
            </p>
            <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold">Clara Templeton</p>
                <p className="text-xs text-white/65">Paris, France</p>
              </div>
              <div className="flex gap-1 text-terracotta">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {trustStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-zinc-150 rounded-3xl p-6"
            >
              <p className="font-serif text-3xl font-bold text-zinc-950">
                {stat.value}
              </p>
              <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-terracotta mb-2 block">
              Guest Stories
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-zinc-950">
              A few notes from recent stays
            </h2>
          </div>
          <p className="text-sm text-text-secondary max-w-md md:text-right">
            These reflections highlight the moments guests mention most often: privacy, pacing, thoughtful service, and room design that makes rest feel natural.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredStories.map((story) => (
            <article
              key={story.name}
              className="bg-white border border-zinc-150 rounded-3xl p-7 shadow-sm"
            >
              <Sparkles className="w-6 h-6 text-terracotta stroke-[1.5] mb-6" />
              <p className="font-serif text-lg leading-relaxed text-zinc-800">
                &ldquo;{story.quote}&rdquo;
              </p>
              <div className="mt-8 pt-5 border-t border-zinc-100">
                <p className="text-sm font-bold text-zinc-950">{story.name}</p>
                <p className="text-xs text-text-secondary mt-1">{story.trip}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-[2rem] bg-white border border-zinc-150 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <span className="inline-flex p-3 rounded-2xl bg-zinc-50 border border-zinc-100 text-forest">
              <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
            </span>
            <div>
              <h3 className="font-serif text-xl font-bold text-zinc-950">
                Verified stay feedback
              </h3>
              <p className="text-sm text-text-secondary mt-1 max-w-2xl">
                Guest notes are gathered after completed reservations and reviewed by the Aetheria hospitality team.
              </p>
            </div>
          </div>
          <Link
            href="/rooms"
            className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#253955] focus-ring"
          >
            View rooms
          </Link>
        </div>
      </section>

      <Testimonials />
    </div>
  );
}
