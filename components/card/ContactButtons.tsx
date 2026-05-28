"use client";

import {
  Download,
  ExternalLink,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useAgentCard } from "@/components/card/AgentCardProvider";
import {
  formatSAPhoneDisplay,
  telUrl,
  whatsappUrl,
} from "@/lib/format/phone";
import { SectionTitle } from "@/components/card/SectionTitle";

export function ContactButtons() {
  const { slug, card } = useAgentCard();
  const waNumber = card.whatsappPhone ?? card.phone;
  const waUrl = whatsappUrl(waNumber, card.whatsappMessage);
  const displayPhone = formatSAPhoneDisplay(card.phone);
  const vcardHref = `/api/vcard/${slug}`;
  const hasWebsite = card.websiteUrl && card.websiteUrl !== "#";

  return (
    <section className="space-y-2 px-4 sm:px-5">
      <SectionTitle>Contact me</SectionTitle>
      <div className="flex flex-col gap-2">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-whatsapp px-4 py-2.5 text-sm font-semibold text-whatsapp-foreground shadow-sm transition-all hover:brightness-105"
        >
          <MessageCircle className="size-5 shrink-0" aria-hidden />
          WhatsApp me
        </a>
        <a
          href={telUrl(card.phone)}
          className="btn-primary flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold"
        >
          <Phone className="size-4 shrink-0" aria-hidden />
          {displayPhone}
        </a>
        <a
          href={`mailto:${card.email}?subject=${encodeURIComponent("Enquiry via digital card")}`}
          className="btn-outline flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium"
        >
          <Mail className="size-4 shrink-0 text-primary" aria-hidden />
          Email
        </a>
        <a
          href={vcardHref}
          download={`${card.agentName.replace(/\s+/g, "-")}.vcf`}
          className="btn-outline flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium"
        >
          <Download className="size-4 shrink-0" aria-hidden />
          Save contact
        </a>
        {hasWebsite && (
          <a
            href={card.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex min-h-12 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium"
          >
            <ExternalLink className="size-4 shrink-0" aria-hidden />
            {card.websiteLabel}
          </a>
        )}
      </div>
    </section>
  );
}
