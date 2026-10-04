"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, CreditCard, ArrowRight, User, Mail, RefreshCw, ChevronDown } from "lucide-react";
import { Hotel, RoomType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { DatePicker } from "@/components/ui/date-picker";
import { addDaysToDateInput, formatCurrency, calculateNights, getDateInputValue } from "@/lib/utils";
import { useAuth } from "@/components/auth/auth-provider";

interface BookingWidgetProps {
  hotel: Hotel;
  roomTypes: RoomType[];
}

type Step = 1 | 2 | 3;

export default function BookingWidget({ hotel, roomTypes }: BookingWidgetProps) {
  const { user } = useAuth();
  const router = useRouter();
  const today = getDateInputValue();
  
  // State variables
  const [step, setStep] = React.useState<Step>(1);
  const [checkIn, setCheckIn] = React.useState("");
  const [checkOut, setCheckOut] = React.useState("");
  const [guests, setGuests] = React.useState(1);
  
  // Selected Room
  const [selectedRoomId, setSelectedRoomId] = React.useState<string>(roomTypes[0]?.id || "");

  // Guest Details Form State
  const [guestName, setGuestName] = React.useState(user?.user_metadata?.full_name || "");
  const [guestEmail, setGuestEmail] = React.useState(user?.email || "");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardExpiry, setCardExpiry] = React.useState("");
  const [cardCvv, setCardCvv] = React.useState("");
  
  // Validation / Error / Loading States
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submissionError, setSubmissionError] = React.useState("");
  const [confCode, setConfCode] = React.useState("");
  const [shakeKey, setShakeKey] = React.useState(0);

  const selectedRoom = roomTypes.find(r => r.id === selectedRoomId);
  const pricePerNight = selectedRoom?.base_rate || 0;
  const maxGuests = selectedRoom?.capacity || 2;

  const nights = calculateNights(checkIn, checkOut);
  const checkoutMin = checkIn ? addDaysToDateInput(checkIn, 1) : today;
  const baseCost = nights * pricePerNight;
  const resortTax = Math.round(baseCost * 0.1);
  const totalAmount = baseCost + resortTax;

  // Capacity check
  const isOverCapacity = guests > maxGuests;

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!guestName.trim()) errs.guestName = "Name is required.";
    if (!guestEmail.trim()) {
      errs.guestEmail = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(guestEmail)) {
      errs.guestEmail = "Please enter a valid email.";
    }
    const rawCardNumber = cardNumber.replace(/\D/g, "");
    if (!rawCardNumber || rawCardNumber.length < 16) {
      errs.cardNumber = "Enter a valid 16-digit card number.";
    }
    if (!cardExpiry.trim() || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
      errs.cardExpiry = "Format must be MM/YY.";
    }
    if (!cardCvv.trim() || cardCvv.length < 3) {
      errs.cardCvv = "CVV must be 3-4 digits.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (checkIn && checkOut && nights > 0 && !isOverCapacity && selectedRoom) {
        setStep(2);
      }
    }
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError("");

    if (!validateStep2()) {
      setShakeKey((prev) => prev + 1);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomTypeId: selectedRoomId,
          hotelPlaceId: hotel.placeId,
          guestName,
          guestEmail,
          checkIn,
          checkOut,
          guests,
          totalAmount,
          userId: user?.id || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create booking");
      }

      setConfCode(data.confirmation_code);
      setStep(3);
    } catch (err) {
      setSubmissionError(err instanceof Error ? err.message : "Something went wrong.");
      setShakeKey((prev) => prev + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white border border-zinc-150 rounded-[2.5rem] shadow-xl overflow-hidden self-start">
      {/* Dynamic step transitions wrapper */}
      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-serif text-xl font-bold text-zinc-950">Book Sanctuary</h3>
                {selectedRoom ? (
                  <p className="text-xs text-text-secondary mt-1">Rates starting from {formatCurrency(selectedRoom.base_rate)} / night</p>
                ) : (
                  <p className="text-xs text-text-secondary mt-1 text-amber-600">No rooms available currently.</p>
                )}
              </div>

              <form onSubmit={handleNextStep} className="space-y-4">
                
                {/* Room Selection */}
                {roomTypes.length > 0 && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="suite-select" className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Select Suite</label>
                    <div className="relative">
                      <select
                        id="suite-select"
                        aria-label="Select room type"
                        value={selectedRoomId}
                        onChange={(e) => setSelectedRoomId(e.target.value)}
                        className="w-full appearance-none bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-all pr-10"
                      >
                        {roomTypes.map((rt) => (
                          <option key={rt.id} value={rt.id}>
                            {rt.name} - {formatCurrency(rt.base_rate)}/night
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* Check In / Out */}
                <div className="grid grid-cols-2 gap-3">
                  <DatePicker
                    id="booking-check-in"
                    name="checkin"
                    label="Check-In"
                    value={checkIn}
                    onChange={(val) => {
                      setCheckIn(val);
                      if (checkOut && val >= checkOut) {
                        setCheckOut("");
                      }
                    }}
                    min={today}
                  />
                  <DatePicker
                    id="booking-check-out"
                    name="checkout"
                    label="Check-Out"
                    value={checkOut}
                    onChange={setCheckOut}
                    min={checkoutMin}
                  />
                </div>

                {/* Guest counter */}
                <div className="border border-zinc-200 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-0.5">
                        Occupancy
                      </span>
                      <span className="text-xs font-semibold text-zinc-900">
                        {guests} Guest{guests > 1 ? "s" : ""}
                      </span>
                    </div>
                    <Counter
                      value={guests}
                      onChange={(val) => setGuests(val)}
                      min={1}
                      max={8}
                    />
                  </div>

                  {isOverCapacity && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex items-center gap-2 p-2 bg-rose-50 text-rose-700 rounded-xl text-[10px] font-bold border border-rose-100"
                    >
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>Exceeds capacity of {maxGuests} max guests for this room.</span>
                    </motion.div>
                  )}
                </div>

                {/* Price Breakdown */}
                {nights > 0 && !isOverCapacity && selectedRoom && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-3 pt-3 border-t border-zinc-100 text-sm"
                  >
                    <div className="flex justify-between text-zinc-600">
                      <span>
                        ${pricePerNight} x {nights} night{nights > 1 ? "s" : ""}
                      </span>
                      <span>{formatCurrency(baseCost)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                      <span>Spa & Resort Levy (10%)</span>
                      <span>{formatCurrency(resortTax)}</span>
                    </div>
                    <hr className="border-zinc-150" />
                    <div className="flex justify-between font-bold text-zinc-950 text-base">
                      <span>Total</span>
                      <span>{formatCurrency(totalAmount)}</span>
                    </div>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  disabled={!checkIn || !checkOut || nights <= 0 || isOverCapacity || !selectedRoom}
                  variant="primary"
                  className="w-full rounded-full flex items-center justify-center gap-2 h-[46px]"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                {/* Trust signals */}
                <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-500 mt-2">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    Free cancellation within 24h
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Secure booking
                  </span>
                </div>

              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl font-bold text-zinc-950">Payment & Details</h3>
                  <p className="text-xs text-text-secondary mt-1">Verify details below to confirm stay.</p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-terracotta hover:underline cursor-pointer"
                >
                  Edit Dates
                </button>
              </div>

              {submissionError && (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{submissionError}</span>
                </div>
              )}

              {/* Shaking container for validation errors */}
              <motion.form
                key={shakeKey}
                animate={shakeKey > 0 ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
                transition={{ duration: 0.4 }}
                onSubmit={handleConfirmBooking}
                className="space-y-4 text-xs"
              >
                {/* Guest Name */}
                <div className="flex flex-col border border-zinc-200 rounded-2xl p-3 focus-within:ring-2 focus-within:ring-terracotta transition-all">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-zinc-400" /> Full Name
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => {
                      setGuestName(e.target.value);
                      if (errors.guestName) setErrors((prev) => ({ ...prev, guestName: "" }));
                    }}
                    placeholder="E.g. Clara Dupont"
                    className="font-semibold bg-transparent text-zinc-950 border-none outline-none focus:ring-0 p-0 text-sm"
                  />
                  {errors.guestName && (
                    <span className="text-[10px] text-rose-600 font-medium mt-1">{errors.guestName}</span>
                  )}
                </div>

                {/* Email Address */}
                <div className="flex flex-col border border-zinc-200 rounded-2xl p-3 focus-within:ring-2 focus-within:ring-terracotta transition-all">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-1 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-zinc-400" /> Email Address
                  </label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => {
                      setGuestEmail(e.target.value);
                      if (errors.guestEmail) setErrors((prev) => ({ ...prev, guestEmail: "" }));
                    }}
                    placeholder="clara.dupont@domain.com"
                    className="font-semibold bg-transparent text-zinc-950 border-none outline-none focus:ring-0 p-0 text-sm"
                  />
                  {errors.guestEmail && (
                    <span className="text-[10px] text-rose-600 font-medium mt-1">{errors.guestEmail}</span>
                  )}
                </div>

                {/* Payment Fields */}
                <div className="border border-zinc-200 rounded-2xl p-4 space-y-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-1">
                    Card details
                  </span>

                  <div className="flex flex-col border border-zinc-150 rounded-xl p-2.5 focus-within:ring-1 focus-within:ring-terracotta bg-zinc-50">
                    <label className="text-[8px] uppercase font-bold tracking-wider text-zinc-400 mb-0.5 flex items-center gap-1">
                      <CreditCard className="w-3 h-3" /> Card Number
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
                        const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
                        setCardNumber(formatted);
                        if (errors.cardNumber) setErrors((prev) => ({ ...prev, cardNumber: "" }));
                      }}
                      placeholder="4000 1234 5678 9010"
                      className="font-semibold bg-transparent text-zinc-950 border-none outline-none focus:ring-0 p-0 text-xs"
                    />
                    {errors.cardNumber && (
                      <span className="text-[9px] text-rose-600 font-medium mt-1">{errors.cardNumber}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col border border-zinc-150 rounded-xl p-2.5 focus-within:ring-1 focus-within:ring-terracotta bg-zinc-50">
                      <label className="text-[8px] uppercase font-bold tracking-wider text-zinc-400 mb-0.5">
                        Expiration
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, "");
                          if (val.length > 2) {
                            val = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
                          }
                          setCardExpiry(val);
                          if (errors.cardExpiry) setErrors((prev) => ({ ...prev, cardExpiry: "" }));
                        }}
                        className="font-semibold bg-transparent text-zinc-950 border-none outline-none focus:ring-0 p-0 text-xs"
                      />
                      {errors.cardExpiry && (
                        <span className="text-[9px] text-rose-600 font-medium mt-1">{errors.cardExpiry}</span>
                      )}
                    </div>
                    <div className="flex flex-col border border-zinc-150 rounded-xl p-2.5 focus-within:ring-1 focus-within:ring-terracotta bg-zinc-50">
                      <label className="text-[8px] uppercase font-bold tracking-wider text-zinc-400 mb-0.5">
                        CVV
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        value={cardCvv}
                        onChange={(e) => {
                          setCardCvv(e.target.value.replace(/\D/g, ""));
                          if (errors.cardCvv) setErrors((prev) => ({ ...prev, cardCvv: "" }));
                        }}
                        className="font-semibold bg-transparent text-zinc-950 border-none outline-none focus:ring-0 p-0 text-xs"
                      />
                      {errors.cardCvv && (
                        <span className="text-[9px] text-rose-600 font-medium mt-1">{errors.cardCvv}</span>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  className="w-full rounded-full flex items-center justify-center gap-2 cursor-pointer h-[46px]"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Confirming Stay...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Stay of {formatCurrency(totalAmount)}</span>
                    </>
                  )}
                </Button>
              </motion.form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 20 }}
              className="text-center space-y-6 py-8"
            >
              {/* Drawing dynamic checkmark svg */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-600"
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                </motion.div>
              </div>

              <div className="space-y-2">
                <span className="inline-flex px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold tracking-wider uppercase rounded-full">
                  Sanctuary Reserved
                </span>
                <h3 className="font-serif text-2xl font-bold text-zinc-950">Stay Confirmed</h3>
                <p className="text-xs text-text-secondary max-w-sm mx-auto leading-relaxed">
                  Thank you, {guestName}. We have initialized details for your luxury stay in {selectedRoom?.name}. A confirmation receipt has been sent to {guestEmail}.
                </p>
              </div>

              {/* Confirmation Details Card */}
              <div className="bg-zinc-50 border border-zinc-150 p-4 rounded-2xl max-w-xs mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Reservation Code:</span>
                  <span className="font-bold text-zinc-900">{confCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Nights:</span>
                  <span className="font-semibold text-zinc-800">{nights} Nights</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Check In:</span>
                  <span className="font-semibold text-zinc-800">{checkIn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Total:</span>
                  <span className="font-bold text-terracotta">{formatCurrency(totalAmount)}</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  onClick={() => router.push("/my-bookings")}
                  className="rounded-full px-6"
                >
                  View My Bookings
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
