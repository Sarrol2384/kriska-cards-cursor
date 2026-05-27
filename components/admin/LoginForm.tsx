"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "config"
      ? "Supabase is not configured. Add env vars from .env.example"
      : null,
  );
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (authError) {
      setError(authError.message);
      return;
    }

    router.push(searchParams.get("next") ?? "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-sm space-y-4">
      <div>
        <label className="mb-1 block text-sm text-muted-foreground">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-primary/30 bg-[#111] px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-muted-foreground">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-primary/30 bg-[#111] px-3 py-2 text-sm"
        />
      </div>
      {error && <p className="text-sm text-accent">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="btn-gold w-full rounded-full py-2.5 text-sm font-semibold disabled:opacity-50"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
