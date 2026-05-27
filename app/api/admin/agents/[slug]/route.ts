import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { upsertAgent, type AgentUpsertInput } from "@/lib/agents-db";
import { revalidateAgentCard } from "@/lib/revalidate";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type RouteContext = { params: Promise<{ slug: string }> };

export async function POST(request: Request, context: RouteContext) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await context.params;
  const body = (await request.json()) as AgentUpsertInput;

  if (body.slug !== slug) {
    return NextResponse.json({ error: "Slug mismatch" }, { status: 400 });
  }

  try {
    await upsertAgent(body);
    revalidateAgentCard(slug);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Save failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
