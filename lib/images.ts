import {
  agentFile,
  designerLogoFile,
  logoFile,
  soldFileExtension,
} from "@/content/images";

const IMAGES_BASE = "/images";
const AGENTS_BASE = `${IMAGES_BASE}/agents`;

/** Logo URL for Next.js Image / Open Graph (shared) */
export function logoSrc(): string {
  return `${IMAGES_BASE}/${logoFile}`;
}

/** Agent photo URL for a given slug */
export function agentSrc(slug: string): string {
  return `${AGENTS_BASE}/${slug}/${agentFile}`;
}

/** Designer logo URL (shared) */
export function designerLogoSrc(): string {
  return `${IMAGES_BASE}/${designerLogoFile}`;
}

/**
 * Sold listing photo by slot number (1, 2, 3…).
 * File must exist at public/images/agents/{slug}/sold/{n}.{soldFileExtension}
 */
export function soldSrc(slug: string, slot: number | string): string {
  const id = String(slot);
  const ext = soldFileExtension.startsWith(".")
    ? soldFileExtension
    : `.${soldFileExtension}`;
  return `${AGENTS_BASE}/${slug}/sold/${id}${ext}`;
}
