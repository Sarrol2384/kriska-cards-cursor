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
    <section className="space-y-2 px-4 pb-0 sm:px-5">
      <h2 className="text-left text-sm font-semibold text-[#374151]">
        Follow on social media
      </h2>
      <div className="flex flex-wrap items-center gap-3">
        {items.map(({ key, href, label, Icon }) => (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex size-11 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-primary shadow-sm transition-all hover:border-primary hover:bg-[#f0f7ff]"
          >
            <Icon className="size-5" aria-hidden />
          </a>
        ))}
      </div>
    </section>
  );
}
