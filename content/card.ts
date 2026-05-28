/**
 * @deprecated Import from `@/content/types` and `@/content/agents` instead.
 * Kept for backwards compatibility during migration.
 */
export type { SoldProperty, CardConfig, AgentProfile } from "@/content/types";
export { getAgent, getAllAgentSlugs, isValidSlug } from "@/content/agents";

import { getAgent } from "@/content/agents";

/** @deprecated Use getAgent("hans-kajiba-kuzanga") or the /[slug] route */
export const card = getAgent("hans-kajiba-kuzanga")!;
