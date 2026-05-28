"use client";

import { useAgentCard } from "@/components/card/AgentCardProvider";

export function CardBio() {
  const { card } = useAgentCard();

  return (
    <section className="px-4 pt-0 sm:px-5">
      <p className="whitespace-pre-line text-[0.875rem] leading-snug text-[#6b7280]">
        {card.bio}
      </p>
    </section>
  );
}
