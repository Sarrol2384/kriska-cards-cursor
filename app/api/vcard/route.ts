import { buildVCard } from "@/lib/vcard";
import { card } from "@/content/card";

export function GET() {
  const body = buildVCard();
  const filename = `${card.agentName.replace(/\s+/g, "-")}.vcf`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
