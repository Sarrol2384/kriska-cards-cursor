"use client";

import { useAgentCard } from "@/components/card/AgentCardProvider";
import { PropertyMarquee } from "@/components/card/PropertyMarquee";

export function SoldProperties() {
  const { soldListings } = useAgentCard();

  return (
    <PropertyMarquee
      title="Properties sold by me"
      listings={soldListings}
      badgeLabel="Sold"
    />
  );
}
