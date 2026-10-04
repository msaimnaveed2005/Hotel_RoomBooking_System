import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-bg-main to-zinc-100 flex flex-col items-center justify-center p-6">
      <div className="mb-8">
        <Link
          href="/"
          className="font-serif text-3xl font-bold tracking-widest text-zinc-900 flex items-center gap-2 focus-ring rounded-lg px-2 py-1"
        >
          A E T H E R I A
        </Link>
      </div>
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-zinc-200/50 p-8 border border-zinc-100">
        {children}
      </div>
    </div>
  );
}
