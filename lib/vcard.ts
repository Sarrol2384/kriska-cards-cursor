import { card } from "@/content/card";
import { normalizeSAPhone } from "@/lib/format/phone";

function escapeVCard(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

export function buildVCard(): string {
  const phone = normalizeSAPhone(card.phone);
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVCard(card.agentName)}`,
    `ORG:${escapeVCard(card.tagline)}`,
    `TITLE:${escapeVCard(card.role)}`,
  ];
  if (phone) lines.push(`TEL;TYPE=CELL:${phone}`);
  if (card.email) lines.push(`EMAIL;TYPE=INTERNET:${card.email}`);
  if (card.websiteUrl && card.websiteUrl !== "#") {
    lines.push(`URL:${card.websiteUrl}`);
  }
  lines.push("END:VCARD");
  return lines.join("\r\n");
}

export function vCardDataUrl(): string {
  const body = buildVCard();
  return `data:text/vcard;charset=utf-8,${encodeURIComponent(body)}`;
}
