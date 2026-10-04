"use client";

import * as React from "react";
import { X, Search, Calendar, Users, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useBookingLookup } from "@/lib/hooks/use-bookings";
import { useToast } from "@/components/ui/toast";

export function ManageBookingDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { showToast } = useToast();
  const [searchInput, setSearchInput] = React.useState("");
  const [activeCode, setActiveCode] = React.useState("");
  
  // Use our custom hook to fetch booking details.
  // The hook will trigger a fetch whenever activeCode changes and isn't empty.
  const { booking: foundBooking, isLoading, error } = useBookingLookup(activeCode);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setActiveCode(searchInput.trim().toUpperCase());
  };

  // Reset state when modal is closed
  React.useEffect(() => {
    if (!isOpen) {
      setSearchInput("");
      setActiveCode("");
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Focus trap: keep focus within dialog
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const modal = document.getElementById("manage-booking-dialog");
      if (!modal) return;
      const focusable = modal.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-50"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
              id="manage-booking-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="manage-booking-title"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-zinc-100">
                <h2 id="manage-booking-title" className="font-serif text-2xl font-bold text-zinc-950">
                  Manage Booking
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition-colors focus-ring"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content body - scrollable */}
              <div className="p-6 overflow-y-auto no-scrollbar">
                <form onSubmit={handleSearch} className="mb-8">
                  <label className="text-xs font-semibold text-zinc-600 block mb-2">
                    Enter Confirmation Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-zinc-400" />
                      </div>
                      <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="e.g. HTL-12345"
                        className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-all uppercase"
                      />
                    </div>
                    <Button type="submit" variant="primary" disabled={isLoading} className="shrink-0 px-6">
                      {isLoading ? "Searching..." : "Find"}
                    </Button>
                  </div>
                  {error && (
                    <p className="text-xs text-rose-600 font-medium mt-2 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-rose-600 inline-block" />
                      {error.message || "Booking not found"}
                    </p>
                  )}
                </form>

                {/* Results Area */}
                <AnimatePresence mode="wait">
                  {foundBooking && !isLoading && !error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 space-y-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1">
                            Confirmation Code
                          </p>
                          <p className="font-mono font-bold text-zinc-900 text-lg">
                            {foundBooking.confirmation_code}
                          </p>
                        </div>
                        <Badge variant={foundBooking.status.toLowerCase() as any}>
                          {foundBooking.status}
                        </Badge>
                      </div>

                      <hr className="border-zinc-200" />

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-zinc-500 flex items-center gap-1.5 text-xs">
                            <Home className="w-3.5 h-3.5" /> Suite
                          </p>
                          <p className="font-semibold text-zinc-900">
                            {foundBooking.room_type?.name}
                          </p>
                          <p className="text-xs text-zinc-500 line-clamp-1">{foundBooking.hotel?.displayName || foundBooking.hotel?.display_name || "Sanctuary Property"}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-zinc-500 flex items-center gap-1.5 text-xs">
                            <Users className="w-3.5 h-3.5" /> Guest
                          </p>
                          <p className="font-semibold text-zinc-900">
                            {foundBooking.guest_name}
                          </p>
                        </div>
                        <div className="space-y-1 col-span-2">
                          <p className="text-zinc-500 flex items-center gap-1.5 text-xs">
                            <Calendar className="w-3.5 h-3.5" /> Dates
                          </p>
                          <p className="font-semibold text-zinc-900">
                            {formatDate(foundBooking.check_in)} — {formatDate(foundBooking.check_out)}
                          </p>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-3 flex justify-between items-center border border-zinc-100">
                        <span className="text-xs font-semibold text-zinc-600">Total Amount</span>
                        <span className="font-bold text-terracotta">{formatCurrency(foundBooking.total_amount)}</span>
                      </div>

                      <div className="pt-2 flex gap-2">
                        {foundBooking.status === "Confirmed" || foundBooking.status === "Pending" ? (
                          <>
                            <Button 
                              variant="outline" 
                              className="flex-1 text-xs py-2 h-auto" 
                              onClick={() => showToast("Date modification request submitted to concierge", "info")}
                            >
                              Modify Dates
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex-1 text-xs py-2 h-auto text-rose-600 border-rose-200 hover:bg-rose-50 hover:border-rose-300"
                              onClick={() => showToast("Cancellation request initiated. Check email for details.", "error")}
                            >
                              Cancel Stay
                            </Button>
                          </>
                        ) : (
                          <Button variant="outline" className="w-full text-xs py-2 h-auto" disabled>
                            Booking is {foundBooking.status}
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
