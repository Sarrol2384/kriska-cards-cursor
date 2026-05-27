import { NextResponse } from "next/server";
import { getAgentCardPayload } from "@/lib/agents-db";
import { buildVCard } from "@/lib/vcard";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const payload = await getAgentCardPayload(slug);

  if (!payload) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  const body = buildVCard(payload.card);
  const filename = `${payload.card.agentName.replace(/\s+/g, "-")}.vcf`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
