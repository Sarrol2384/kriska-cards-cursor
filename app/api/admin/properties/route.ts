import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  deleteProperty,
  upsertProperty,
  type PropertyInput,
} from "@/lib/agents-db";
import { revalidateAgentCard } from "@/lib/revalidate";
import { isSupabaseConfigured } from "@/lib/supabase/config";

async function requireAuth() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as PropertyInput;

  try {
    const property = await upsertProperty(body);
    revalidateAgentCard(body.agent_slug);
    return NextResponse.json(property);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Save failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const agentSlug = searchParams.get("agent_slug");

  if (!id || !agentSlug) {
    return NextResponse.json({ error: "Missing id or agent_slug" }, { status: 400 });
  }

  try {
    await deleteProperty(id);
    revalidateAgentCard(agentSlug);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
