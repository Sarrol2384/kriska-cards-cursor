import type { CardConfig } from "@/content/types";
import { normalizeSAPhone } from "@/lib/format/phone";

function escapeVCard(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

export function buildVCard(card: CardConfig): string {
  const phone = normalizeSAPhone(card.phone) ?? card.phone.replace(/\s/g, "");
  const wa = card.whatsappPhone
    ? (normalizeSAPhone(card.whatsappPhone) ?? card.whatsappPhone.replace(/\s/g, ""))
    : null;
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVCard(card.agentName)}`,
    `ORG:${escapeVCard(card.tagline)}`,
    `TITLE:${escapeVCard(card.role)}`,
  ];
  if (phone) lines.push(`TEL;TYPE=CELL:${phone}`);
  if (wa && wa !== phone) lines.push(`TEL;TYPE=CELL,VOICE:${wa}`);
  if (card.email) lines.push(`EMAIL;TYPE=INTERNET:${card.email}`);
  if (card.websiteUrl && card.websiteUrl !== "#") {
    lines.push(`URL:${card.websiteUrl}`);
  }
  lines.push("END:VCARD");
  return lines.join("\r\n");
}

export function vCardDataUrl(card: CardConfig): string {
  const body = buildVCard(card);
  return `data:text/vcard;charset=utf-8,${encodeURIComponent(body)}`;
}
