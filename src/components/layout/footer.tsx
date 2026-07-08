import Link from "next/link";
import { Shield } from "lucide-react";
import NewsletterForm from "@/components/layout/newsletter-form";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 font-sans border-t border-zinc-900">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-6">
          <Link href="/" className="inline-block">
            <span className="font-serif text-2xl font-bold tracking-widest text-white">
              A E T H E R I A
            </span>
          </Link>
          <p className="text-sm leading-relaxed max-w-sm text-zinc-400">
            A sanctuary designed for absolute serenity. Merging modernist architecture with natural elements to create an unparalleled hospitality experience.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-colors focus-ring"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-colors focus-ring"
              aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-colors focus-ring"
              aria-label="Twitter"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
          </div>
        </div>

        {/* Links Columns (3 Columns) */}
        <div>
          <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase mb-6">
            Reservations
          </h4>
          <ul className="space-y-4 text-sm">
            <li>
              <Link href="/rooms" className="hover:text-white transition-colors focus-ring rounded">
                Our Rooms
              </Link>
            </li>
            <li>
              <Link href="/#testimonials" className="hover:text-white transition-colors focus-ring rounded">
                Guest Testimonials
              </Link>
            </li>
            <li>
              <Link href="/#amenities" className="hover:text-white transition-colors focus-ring rounded">
                Wellness & Spa
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase mb-6">
            The Sanctuary
          </h4>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="#" className="hover:text-white transition-colors focus-ring rounded">
                Our Vision
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors focus-ring rounded">
                Art & Spaces
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors focus-ring rounded">
                Private Dining
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase mb-6">
            Newsletter
          </h4>
          <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
            Subscribe to receive curated invitations, culinary updates, and wellness insights.
          </p>
          <NewsletterForm />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-900 bg-zinc-950/80">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Aetheria Resorts. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-400 transition-colors focus-ring rounded">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-zinc-400 transition-colors focus-ring rounded">
              Terms of Use
            </a>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-zinc-650" /> Safe Stay Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
