"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Landmark, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ManageBookingDialog } from "@/components/booking/manage-booking-dialog";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isManageOpen, setIsManageOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Rooms", href: "/rooms" },
    { name: "Amenities", href: "/#amenities" },
    { name: "Offers", href: "/#offers" },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "border-b border-zinc-200/50 bg-white/75 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus-ring rounded-lg px-2 py-1"
          >
            <span className="font-serif text-2xl font-bold tracking-widest text-zinc-900 flex items-center gap-1.5">
              A E T H E R I A
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-sans text-sm font-medium transition-colors hover:text-terracotta focus-ring rounded-md px-2 py-1 ${
                    isActive ? "text-terracotta" : "text-zinc-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsManageOpen(true)}
              className="text-sm font-sans font-medium text-text-secondary hover:text-text-primary px-4 py-2 hover:bg-zinc-50 rounded-full transition-colors focus-ring cursor-pointer"
            >
              Manage Booking
            </button>
            <Link href="/rooms">
              <Button variant="primary" size="sm">
                Reserve Now
              </Button>
            </Link>
            {/* Quick Admin Navigation Link */}
            <Link href="/admin">
              <span className="text-xs border border-zinc-200 bg-zinc-50 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-full px-3 py-1.5 transition-colors focus-ring">
                Admin
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setIsManageOpen(true)}
              className="text-xs font-medium text-zinc-600 bg-zinc-50 border border-zinc-200/60 rounded-full px-3 py-1.5 hover:bg-zinc-100 focus-ring"
            >
              Manage
            </button>
            <Link href="/admin">
              <span className="text-[10px] uppercase font-bold text-zinc-500 border border-zinc-200 rounded px-1.5 py-0.5">
                Admin
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-zinc-700 hover:bg-zinc-100 transition-colors focus-ring"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-zinc-200 bg-white/95 backdrop-blur-md overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                <nav className="flex flex-col gap-5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => handleLinkClick(link.href)}
                      className="font-serif text-xl font-medium text-zinc-850 hover:text-terracotta focus-ring py-1"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <hr className="border-zinc-100" />
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsManageOpen(true);
                    }}
                    className="w-full text-left font-sans font-medium text-zinc-700 py-2 hover:text-terracotta"
                  >
                    Manage Reservation
                  </button>
                  <Link href="/rooms" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full">
                      Reserve Now
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Lookup Dialog */}
      <ManageBookingDialog
        isOpen={isManageOpen}
        onOpenChange={setIsManageOpen}
      />
    </>
  );
}
