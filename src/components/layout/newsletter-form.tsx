"use client";

import * as React from "react";
import { ArrowRight, Check } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium py-2">
        <Check className="w-4 h-4" />
        <span>Thank you for subscribing!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          placeholder="Email address"
          className="w-full h-11 bg-zinc-900 border border-zinc-800 rounded-full pl-4 pr-12 text-sm text-white placeholder-zinc-500 focus-ring"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-terracotta text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all focus-ring cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      {error && (
        <p className="text-red-400 text-xs mt-2">{error}</p>
      )}
    </form>
  );
}
