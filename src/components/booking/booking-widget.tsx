"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, ShieldAlert, CreditCard, ArrowRight, CheckCircle2, User, Mail, Sparkles, RefreshCw } from "lucide-react";
import { Room } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { DatePicker } from "@/components/ui/date-picker";
import { formatCurrency, calculateNights } from "@/lib/utils";

interface BookingWidgetProps {
  room: Room;
}

type Step = 1 | 2 | 3;

export default function BookingWidget({ room }: BookingWidgetProps) {
  const today = new Date().toISOString().split("T")[0];
  
  // State variables
  const [step, setStep] = React.useState<Step>(1);
  const [checkIn, setCheckIn] = React.useState("");
  const [checkOut, setCheckOut] = React.useState("");
  const [guests, setGuests] = React.useState(1);
  const [isGuestsOpen, setIsGuestsOpen] = React.useState(false);

  // Guest Details Form State
  const [guestName, setGuestName] = React.useState("");
  const [guestEmail, setGuestEmail] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardExpiry, setCardExpiry] = React.useState("");
  const [cardCvv, setCardCvv] = React.useState("");
  
  // Validation / Error / Loading States
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submissionError, setSubmissionError] = React.useState("");
  const [confCode, setConfCode] = React.useState("");
  const [shakeKey, setShakeKey] = React.useState(0);

  const nights = calculateNights(checkIn, checkOut);
  const baseCost = nights * room.pricePerNight;
  const resortTax = Math.round(baseCost * 0.1);
  const totalAmount = baseCost + resortTax;

  // Capacity check
  const isOverCapacity = guests > room.maxGuests;

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!guestName.trim()) errs.guestName = "Name is required.";
    if (!guestEmail.trim()) {
      errs.guestEmail = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(guestEmail)) {
      errs.guestEmail = "Please enter a valid email.";
    }
    if (!cardNumber.trim() || cardNumber.length < 16) {
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
      if (checkIn && checkOut && nights > 0 && !isOverCapacity) {
        setStep(2);
      }
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError("");

    if (!validateStep2()) {
      // Trigger shake animation by changing key
      setShakeKey((prev) => prev + 1);
      return;
    }

    setIsSubmitting(true);

    // Simulate Payment/Reservation Processing
    setTimeout(() => {
      // ~10% simulated failure
      if (Math.random() < 0.15) {
        setSubmissionError("Something went wrong — please try again.");
        setIsSubmitting(false);
        setShakeKey((prev) => prev + 1);
        return;
      }

      // Generate random confirmation code
      const code = `HTL-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfCode(code);
      setIsSubmitting(false);
      setStep(3);
    }, 1800);
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
                <p className="text-xs text-text-secondary mt-1">Rates starting from {formatCurrency(room.pricePerNight)} / night</p>
              </div>

              <form onSubmit={handleNextStep} className="space-y-4">
                {/* Check In / Out */}
                <div className="grid grid-cols-2 gap-3">
                  <DatePicker
                    label="Check-In"
                    value={checkIn}
                    onChange={setCheckIn}
                    min={today}
                  />
                  <DatePicker
                    label="Check-Out"
                    value={checkOut}
                    onChange={setCheckOut}
                    min={checkIn || today}
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
                      max={6}
                    />
                  </div>

                  {isOverCapacity && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex items-center gap-2 p-2 bg-rose-50 text-rose-700 rounded-xl text-[10px] font-bold border border-rose-100"
                    >
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>Exceeds capacity of {room.maxGuests} max guests for this room.</span>
                    </motion.div>
                  )}
                </div>

                {/* Price Breakdown */}
                {nights > 0 && !isOverCapacity && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-3 pt-3 border-t border-zinc-100 text-sm"
                  >
                    <div className="flex justify-between text-zinc-600">
                      <span>
                        ${room.pricePerNight} x {nights} night{nights > 1 ? "s" : ""}
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
                  disabled={!checkIn || !checkOut || nights <= 0 || isOverCapacity}
                  variant="primary"
                  className="w-full rounded-full flex items-center justify-center gap-2"
                >
                  <span>Continue Stay</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
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
                      maxLength={16}
                      value={cardNumber}
                      onChange={(e) => {
                        setCardNumber(e.target.value.replace(/\D/g, ""));
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
                  Thank you, {guestName}. We have initialized details for your luxury stay in the {room.name}. A confirmation receipt has been sent to {guestEmail}.
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
                  onClick={() => window.location.href = "/"}
                  className="rounded-full px-6"
                >
                  Return to Sanctuary Home
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
