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
  const waUrl = whatsappUrl(card.phone, card.whatsappMessage);
  const displayPhone = formatSAPhoneDisplay(card.phone);
  const vcardHref = `/api/vcard/${slug}`;
  const hasWebsite = card.websiteUrl && card.websiteUrl !== "#";

  return (
    <section className="space-y-3">
      <SectionTitle>Contact Me</SectionTitle>
      <div className="flex flex-col gap-2.5">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-semibold text-whatsapp-foreground shadow-[0_4px_24px_-4px_rgba(37,211,102,0.55)] ring-2 ring-primary/30 transition-all hover:scale-[1.02] hover:ring-primary/60"
        >
          <MessageCircle className="size-5 shrink-0" aria-hidden />
          WhatsApp me
        </a>
        <a
          href={telUrl(card.phone)}
          className="btn-gold flex min-h-12 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold"
        >
          <Phone className="size-4 shrink-0" aria-hidden />
          {displayPhone}
        </a>
        <a
          href={`mailto:${card.email}?subject=${encodeURIComponent("Enquiry via digital card")}`}
          className="btn-accent-outline flex min-h-12 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium"
        >
          <Mail className="size-4 shrink-0 text-accent" aria-hidden />
          Email
        </a>
        <a
          href={vcardHref}
          download={`${card.agentName.replace(/\s+/g, "-")}.vcf`}
          className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-sm font-medium text-primary transition-all hover:border-primary hover:bg-primary/10"
        >
          <Download className="size-4 shrink-0" aria-hidden />
          Save contact
        </a>
        {hasWebsite && (
          <a
            href={card.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold flex min-h-12 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium"
          >
            <ExternalLink className="size-4 shrink-0" aria-hidden />
            {card.websiteLabel}
          </a>
        )}
      </div>
    </section>
  );
}
