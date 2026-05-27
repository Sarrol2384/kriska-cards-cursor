import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { listAgentsSummary } from "@/lib/agents-db";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function AdminHomePage() {
  if (!isSupabaseConfigured()) {
    return (
      <AdminShell title="Setup required">
        <p className="text-muted-foreground">
          Add Supabase env vars (see <code className="text-primary">.env.example</code> and{" "}
          <code className="text-primary">docs/ADMIN.md</code>), then run the SQL migration and
          seed script.
        </p>
      </AdminShell>
    );
  }

  let agents: Awaited<ReturnType<typeof listAgentsSummary>> = [];
  try {
    agents = await listAgentsSummary();
  } catch {
    agents = [];
  }

  return (
    <AdminShell title="Agents">
      <div className="mb-6 flex justify-end">
        <Link
          href="/admin/agents/new"
          className="btn-gold rounded-full px-4 py-2 text-sm font-semibold"
        >
          Add agent
        </Link>
      </div>

      {agents.length === 0 ? (
        <p className="text-muted-foreground">
          No agents in database yet. Run{" "}
          <code className="text-primary">node scripts/seed-supabase.mjs</code> or add one.
        </p>
      ) : (
        <ul className="divide-y divide-primary/20 rounded-xl border border-primary/25 bg-[#111]">
          {agents.map((a) => (
            <li key={a.slug} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div>
                <p className="font-medium">{a.agent_name}</p>
                <p className="text-sm text-muted-foreground">{a.email}</p>
              </div>
              <div className="flex gap-3 text-sm">
                <Link
                  href={`/${a.slug}`}
                  target="_blank"
                  className="text-muted-foreground hover:text-primary"
                >
                  View card
                </Link>
                <Link
                  href={`/admin/agents/${a.slug}`}
                  className="text-primary hover:underline"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AdminShell>
  );
}
