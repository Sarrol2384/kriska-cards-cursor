import type { AgentProfile, CardConfig } from "@/content/types";
import { sharedDesigner } from "@/content/shared";
import { hansKajibaKuzanga } from "@/content/agents/hans-kajiba-kuzanga";
import { nomondeBlandile } from "@/content/agents/nomonde-blandile";

const agents: Record<string, AgentProfile> = {
  "hans-kajiba-kuzanga": hansKajibaKuzanga,
  "nomonde-blandile": nomondeBlandile,
};

export function getAllAgentSlugs(): string[] {
  return Object.keys(agents);
}

export function isValidSlug(slug: string): boolean {
  return slug in agents;
}

export function getAgent(slug: string): CardConfig | undefined {
  const profile = agents[slug];
  if (!profile) return undefined;
  return { ...profile, designer: sharedDesigner };
}

export function getAgentProfile(slug: string): AgentProfile | undefined {
  return agents[slug];
}
