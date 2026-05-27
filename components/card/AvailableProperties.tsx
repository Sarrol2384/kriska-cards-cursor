"use client";

import { useAgentCard } from "@/components/card/AgentCardProvider";
import { PropertyMarquee } from "@/components/card/PropertyMarquee";

export function AvailableProperties() {
  const { availableListings } = useAgentCard();

  return (
    <PropertyMarquee
      title="Properties available"
      listings={availableListings}
      badgeLabel="Available"
    />
  );
}
