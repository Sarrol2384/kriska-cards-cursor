"use client";

import { useAgentCard } from "@/components/card/AgentCardProvider";

export function CardBio() {
  const { card } = useAgentCard();

  return (
    <section className="px-1">
      <div className="relative rounded-xl border border-primary/20 bg-[#111111] px-5 py-4">
        <div
          className="pointer-events-none absolute top-3 bottom-3 left-0 w-[3px] rounded-full bg-gradient-to-b from-primary via-accent to-primary"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-3 bottom-3 right-0 w-[3px] rounded-full bg-gradient-to-b from-primary via-accent to-primary"
          aria-hidden
        />
        <p className="text-center font-sans text-[0.9375rem] leading-relaxed text-muted-foreground">
          {card.bio}
        </p>
      </div>
    </section>
  );
}
