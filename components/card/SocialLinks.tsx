"use client";

import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useAgentCard } from "@/components/card/AgentCardProvider";
import type { CardConfig } from "@/content/types";

type SocialItem = {
  key: keyof CardConfig["social"];
  href: string;
  label: string;
  Icon: typeof Facebook;
};

export function SocialLinks() {
  const { card } = useAgentCard();

  const items: SocialItem[] = [
    card.social.facebook
      ? { key: "facebook", href: card.social.facebook, label: "Facebook", Icon: Facebook }
      : null,
    card.social.instagram
      ? {
          key: "instagram",
          href: card.social.instagram,
          label: "Instagram",
          Icon: Instagram,
        }
      : null,
    card.social.linkedin
      ? { key: "linkedin", href: card.social.linkedin, label: "LinkedIn", Icon: Linkedin }
      : null,
  ].filter((item): item is SocialItem => item !== null);

  if (items.length === 0) return null;

  return (
    <section className="space-y-4 pb-2">
      <h2 className="text-center text-xs font-bold tracking-[0.18em] text-primary/90 uppercase">
        Follow us on social media
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {items.map(({ key, href, label, Icon }) => (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex size-12 items-center justify-center rounded-full border border-primary/40 bg-[#141414] text-primary shadow-[0_0_20px_-8px_rgba(201,162,39,0.5)] transition-all hover:border-accent hover:bg-accent/20 hover:text-accent-foreground"
          >
            <Icon className="size-5" aria-hidden />
          </a>
        ))}
      </div>
    </section>
  );
}
