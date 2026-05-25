import {
  agentFile,
  designerLogoFile,
  logoFile,
  soldFileExtension,
} from "@/content/images";

const IMAGES_BASE = "/images";

/** Logo URL for Next.js Image / Open Graph */
export function logoSrc(): string {
  return `${IMAGES_BASE}/${logoFile}`;
}

/** Agent photo URL */
export function agentSrc(): string {
  return `${IMAGES_BASE}/${agentFile}`;
}

/**
 * Sold listing photo by slot number (1, 2, 3…).
 * File must exist at public/images/sold/{n}.{soldFileExtension}
 */
export function designerLogoSrc(): string {
  return `${IMAGES_BASE}/${designerLogoFile}`;
}

export function soldSrc(slot: number | string): string {
  const id = String(slot);
  const ext = soldFileExtension.startsWith(".")
    ? soldFileExtension
    : `.${soldFileExtension}`;
  return `${IMAGES_BASE}/sold/${id}${ext}`;
}
