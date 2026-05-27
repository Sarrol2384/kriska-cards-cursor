import { createClient } from "@supabase/supabase-js";
import { getServiceRoleKey, getSupabaseUrl } from "@/lib/supabase/config";

/** Server-only client that bypasses RLS for admin API routes. */
export function createSupabaseAdminClient() {
  return createClient(getSupabaseUrl(), getServiceRoleKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
