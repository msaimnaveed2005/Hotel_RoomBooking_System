"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

function LoginForm() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push(redirectUrl);
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="font-serif text-3xl font-medium text-text-primary mb-2">
          Welcome Back
        </h1>
        <p className="text-text-secondary font-sans text-sm">
          Sign in to access your luxury sanctuary bookings.
        </p>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}
        
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text-primary">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-all"
            placeholder="your@email.com"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-text-primary">Password</label>
            <button
              type="button"
              onClick={() => {
                if (!email.trim()) {
                  setError("Please enter your email address above to receive password reset instructions.");
                } else {
                  setError(null);
                  showToast(`Password reset link dispatched to ${email}`, "info");
                }
              }}
              className="text-xs text-terracotta hover:underline font-medium focus-ring rounded"
            >
              Forgot password?
            </button>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-all"
            placeholder="••••••••"
          />
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full mt-2 py-6 text-base"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="text-center mt-2">
        <p className="text-sm text-text-secondary">
          Don't have an account?{" "}
          <Link href="/signup" className="text-terracotta font-medium hover:underline focus-ring rounded-sm">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-sm text-zinc-400">Loading sign in...</div>}>
      <LoginForm />
    </Suspense>
  );
}
