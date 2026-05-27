import { getSupabaseUrl, isSupabaseConfigured } from "@/lib/supabase/config";

const BUCKET_AGENT = "agent-photos";
const BUCKET_PROPERTY = "property-photos";

export function storagePublicUrl(
  bucket: "agent-photos" | "property-photos",
  path: string | null | undefined,
): string | null {
  if (!path || !isSupabaseConfigured()) return null;
  const base = getSupabaseUrl().replace(/\/$/, "");
  const clean = path.replace(/^\//, "");
  return `${base}/storage/v1/object/public/${bucket}/${clean}`;
}

export function agentPhotoUrl(photoPath: string | null | undefined): string | null {
  return storagePublicUrl(BUCKET_AGENT, photoPath);
}

export function propertyPhotoUrl(imagePath: string | null | undefined): string | null {
  return storagePublicUrl(BUCKET_PROPERTY, imagePath);
}

export { BUCKET_AGENT, BUCKET_PROPERTY };
