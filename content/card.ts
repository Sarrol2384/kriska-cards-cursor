/**
 * @deprecated Import from `@/content/types` and `@/content/agents` instead.
 * Kept for backwards compatibility during migration.
 */
export type { SoldProperty, CardConfig, AgentProfile } from "@/content/types";
export { getAgent, getAllAgentSlugs, isValidSlug } from "@/content/agents";

import { getAgent } from "@/content/agents";

/** @deprecated Use getAgent("nomonde-blandile") or the /[slug] route */
export const card = getAgent("nomonde-blandile")!;
