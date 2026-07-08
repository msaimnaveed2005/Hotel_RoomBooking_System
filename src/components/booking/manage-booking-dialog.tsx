"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Search, Calendar, CreditCard, User, Landmark, ShieldCheck } from "lucide-react";
import { bookings, Booking } from "@/lib/mock-data";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge, type BadgeVariant } from "@/components/ui/badge";

const statusVariantMap: Record<Booking["status"], BadgeVariant> = {
  Confirmed: "confirmed",
  Pending: "pending",
  Cancelled: "cancelled",
};

interface ManageBookingDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ManageBookingDialog({ isOpen, onOpenChange }: ManageBookingDialogProps) {
  const [code, setCode] = React.useState("");
  const [searchResult, setSearchResult] = React.useState<Booking | null | undefined>(undefined);
  const [hasSearched, setHasSearched] = React.useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    // Simulated lookup
    const found = bookings.find(
      (b) => b.id.toLowerCase() === code.trim().toLowerCase()
    );

    if (found) {
      setSearchResult(found);
    } else {
      // Mock: If it starts with HTL and not found in standard mock, make up one
      if (code.toUpperCase().startsWith("HTL")) {
        setSearchResult({
          id: code.toUpperCase(),
          roomId: "1",
          roomName: "Serene Garden Suite",
          guestName: "Valued Guest",
          checkIn: "2026-08-15",
          checkOut: "2026-08-18",
          status: "Confirmed",
          totalAmount: 1050,
        });
      } else {
        setSearchResult(null);
      }
    }
    setHasSearched(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after dialog closes (animation delay)
    setTimeout(() => {
      setCode("");
      setSearchResult(undefined);
      setHasSearched(false);
    }, 200);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => (open ? onOpenChange(true) : handleClose())}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            {/* Backdrop */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            {/* Content Container */}
            <Dialog.Content asChild>
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ type: "spring", damping: 25, stiffness: 350 }}
                  className="w-full max-w-lg overflow-hidden rounded-3xl bg-bg-card shadow-2xl border border-zinc-100 flex flex-col focus-visible:outline-none"
                >
                  {/* Header */}
                  <div className="relative p-6 md:p-8 border-b border-zinc-100">
                    <Dialog.Title className="font-serif text-2xl text-zinc-900 leading-none">
                      Manage Your Reservation
                    </Dialog.Title>
                    <Dialog.Description className="mt-2 text-sm text-text-secondary">
                      Retrieve detailed invoices, modify booking dates, or request cancellation support.
                    </Dialog.Description>
                    <Dialog.Close asChild>
                      <button
                        aria-label="Close"
                        className="absolute right-6 top-6 p-2 rounded-full text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors focus-ring"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </Dialog.Close>
                  </div>

                  {/* Body */}
                  <div className="p-6 md:p-8 overflow-y-auto max-h-[70vh]">
                    <form onSubmit={handleSearch} className="flex gap-2">
                      <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                          type="text"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder="Reservation Number (e.g. HTL-94021)"
                          className="w-full h-11 pl-11 pr-4 rounded-full border border-zinc-200 bg-zinc-50 text-sm focus-ring placeholder-zinc-400 transition-premium"
                        />
                      </div>
                      <Button type="submit" variant="primary" className="h-11 rounded-full px-5">
                        Lookup
                      </Button>
                    </form>

                    {/* Results Display */}
                    <div className="mt-6">
                      {searchResult === undefined && !hasSearched && (
                        <div className="py-8 text-center text-zinc-400">
                          <Landmark className="w-12 h-12 mx-auto stroke-[1.25] text-zinc-300 mb-3" />
                          <p className="text-sm">Enter your booking code starting with "HTL" to load details.</p>
                        </div>
                      )}

                      {searchResult === null && hasSearched && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="py-8 text-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50"
                        >
                          <p className="text-sm font-medium text-zinc-800">No Booking Found</p>
                          <p className="text-xs text-text-secondary mt-1 px-4">
                            We couldn't locate a reservation under "{code}". Please verify the code (must start with HTL) and try again.
                          </p>
                        </motion.div>
                      )}

                      {searchResult && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4"
                        >
                          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                  Confirmation
                                </span>
                                <h4 className="text-base font-bold text-zinc-900">{searchResult.id}</h4>
                              </div>
                              <Badge
                                variant={statusVariantMap[searchResult.status]}
                                className="px-3 py-1 text-xs font-semibold"
                              >
                                {searchResult.status}
                              </Badge>
                            </div>

                            <hr className="border-zinc-200/60" />

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="flex items-center gap-1.5 text-xs text-text-secondary mb-1">
                                  <User className="w-3.5 h-3.5" /> Guest
                                </span>
                                <p className="font-medium text-zinc-800">{searchResult.guestName}</p>
                              </div>
                              <div>
                                <span className="flex items-center gap-1.5 text-xs text-text-secondary mb-1">
                                  <ShieldCheck className="w-3.5 h-3.5" /> Accommodation
                                </span>
                                <p className="font-medium text-zinc-800 truncate">{searchResult.roomName}</p>
                              </div>
                              <div>
                                <span className="flex items-center gap-1.5 text-xs text-text-secondary mb-1">
                                  <Calendar className="w-3.5 h-3.5" /> Check-in
                                </span>
                                <p className="font-medium text-zinc-800">{formatDate(searchResult.checkIn)}</p>
                              </div>
                              <div>
                                <span className="flex items-center gap-1.5 text-xs text-text-secondary mb-1">
                                  <Calendar className="w-3.5 h-3.5" /> Check-out
                                </span>
                                <p className="font-medium text-zinc-800">{formatDate(searchResult.checkOut)}</p>
                              </div>
                            </div>

                            <hr className="border-zinc-200/60" />

                            <div className="flex justify-between items-center pt-1">
                              <span className="flex items-center gap-1.5 text-xs text-text-secondary">
                                <CreditCard className="w-3.5 h-3.5" /> Paid Amount
                              </span>
                              <span className="text-base font-bold text-zinc-950">
                                {formatCurrency(searchResult.totalAmount)}
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              onClick={() => alert("Modification request sent! Our staff will email you shortly.")}
                              className="flex-1 text-xs rounded-xl"
                            >
                              Modify Dates
                            </Button>
                            {searchResult.status !== "Cancelled" && (
                              <Button
                                variant="ghost"
                                onClick={() => {
                                  if (confirm("Are you sure you want to cancel this booking?")) {
                                    alert("Cancellation initiated. Check your email for status update.");
                                    handleClose();
                                  }
                                }}
                                className="flex-1 text-xs rounded-xl text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                              >
                                Cancel Stay
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
