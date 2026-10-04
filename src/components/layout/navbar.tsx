"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ManageBookingDialog } from "@/components/booking/manage-booking-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/auth/auth-provider";


export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isManageOpen, setIsManageOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const { user, signOut } = useAuth();
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click (UX-4)
  React.useEffect(() => {
    if (!isDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

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
    { name: "Hotels", href: "/hotels" },
    { name: "Amenities", href: "/amenities" },
    { name: "Testimonials", href: "/testimonials" },
  ];

  const handleLinkClick = () => {
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
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
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
            {/* User Dropdown or Sign In */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-10 h-10 rounded-full bg-terracotta text-white font-serif flex items-center justify-center focus-ring hover:bg-terracotta/90 transition-colors shadow-sm"
                  aria-label="User account menu"
                >
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-zinc-150 overflow-hidden py-1.5 z-50"
                    >
                      <div className="px-4 py-2 border-b border-zinc-100">
                        <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Signed In As</p>
                        <p className="text-xs font-semibold text-zinc-900 truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/my-bookings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-terracotta transition-colors"
                      >
                        My Bookings
                      </Link>
                      <Link
                        href="/admin"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-xs text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800 transition-colors"
                      >
                        Admin Dashboard
                      </Link>
                      <hr className="my-1 border-zinc-100" />
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          signOut();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="primary" size="sm" className="rounded-full px-5">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-full text-zinc-800 hover:bg-zinc-100 transition-colors focus-ring"
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
              <div className="px-6 py-6 flex flex-col gap-5">
                <nav className="flex flex-col gap-3.5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={handleLinkClick}
                      className="font-serif text-xl font-medium text-zinc-900 hover:text-terracotta focus-ring py-1"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <hr className="border-zinc-150" />

                {/* Mobile Authentication & User Area */}
                {user ? (
                  <div className="flex flex-col gap-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-150">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-terracotta text-white font-serif flex items-center justify-center font-bold text-sm">
                        {user.email?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-semibold text-zinc-900 truncate">{user.email}</p>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Signed In Guest</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-200">
                      <Link
                        href="/my-bookings"
                        onClick={handleLinkClick}
                        className="text-center py-2 text-xs font-semibold text-zinc-800 bg-white rounded-xl border border-zinc-200 hover:text-terracotta shadow-sm"
                      >
                        My Bookings
                      </Link>
                      <button
                        onClick={() => {
                          handleLinkClick();
                          signOut();
                        }}
                        className="text-center py-2 text-xs font-semibold text-rose-600 bg-white rounded-xl border border-zinc-200 hover:bg-rose-50 shadow-sm"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link href="/login" onClick={handleLinkClick} className="w-full">
                      <Button variant="primary" className="w-full h-11 text-sm font-semibold rounded-xl">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={handleLinkClick} className="w-full text-center py-2 text-xs font-semibold text-zinc-600 hover:text-terracotta">
                      New guest? Create an account
                    </Link>
                  </div>
                )}

                {/* Secondary Actions */}
                <div className="flex flex-col gap-2 pt-2 border-t border-zinc-150">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsManageOpen(true);
                    }}
                    className="w-full text-left font-sans text-sm font-medium text-zinc-700 py-2 hover:text-terracotta flex items-center justify-between"
                  >
                    <span>Manage Existing Booking</span>
                    <span className="text-xs text-zinc-400 font-mono">Lookup →</span>
                  </button>
                  <Link
                    href="/admin"
                    onClick={handleLinkClick}
                    className="w-full text-left font-sans text-xs text-zinc-400 hover:text-zinc-600 py-1"
                  >
                    Staff Admin Command
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
        onClose={() => setIsManageOpen(false)}
      />
    </>
  );
}
