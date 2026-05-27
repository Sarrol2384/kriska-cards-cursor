import type { AgentCardPayload, CardConfig, ListingType, PropertyListing } from "@/content/types";
import { sharedDesigner } from "@/content/shared";
import { agentPhotoUrl, propertyPhotoUrl } from "@/lib/storage";
import {
  createSupabasePublicClient,
  createSupabaseServerClient,
} from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { agentSrc, soldSrc } from "@/lib/images";
import { getAgent as getFileAgent, getAllAgentSlugs as getFileSlugs, isValidSlug as isFileSlug } from "@/content/agents";

export type DbAgent = {
  slug: string;
  agent_name: string;
  role: string;
  tagline: string;
  bio: string;
  phone: string;
  email: string;
  whatsapp_message: string;
  website_url: string;
  website_label: string;
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  photo_path: string | null;
};

export type DbProperty = {
  id: string;
  agent_slug: string;
  listing_type: ListingType;
  title: string;
  suburb: string;
  image_path: string | null;
  sort_order: number;
};

function mapDbToCard(agent: DbAgent, properties: DbProperty[]): AgentCardPayload {
  const sold = properties.filter((p) => p.listing_type === "sold");
  const available = properties.filter((p) => p.listing_type === "available");

  const soldListings: PropertyListing[] = sold.map((p, i) => ({
    id: p.id,
    title: p.title,
    suburb: p.suburb,
    listingType: "sold",
    imageUrl:
      propertyPhotoUrl(p.image_path) ??
      soldSrc(agent.slug, i + 1),
  }));

  const availableListings: PropertyListing[] = available.map((p) => ({
    id: p.id,
    title: p.title,
    suburb: p.suburb,
    listingType: "available",
    imageUrl: propertyPhotoUrl(p.image_path) ?? "",
  }));

  const card: CardConfig = {
    agentName: agent.agent_name,
    role: agent.role,
    tagline: agent.tagline,
    bio: agent.bio,
    phone: agent.phone,
    email: agent.email,
    whatsappMessage: agent.whatsapp_message,
    websiteUrl: agent.website_url,
    websiteLabel: agent.website_label,
    social: agent.social ?? {},
    soldProperties: sold.map((p, i) => ({
      title: p.title,
      suburb: p.suburb,
      image: i + 1,
    })),
    designer: sharedDesigner,
  };

  const agentPhotoSrc =
    agentPhotoUrl(agent.photo_path) ?? agentSrc(agent.slug);

  return {
    slug: agent.slug,
    card,
    agentPhotoSrc,
    soldListings,
    availableListings,
  };
}

function filePayload(slug: string): AgentCardPayload | undefined {
  const card = getFileAgent(slug);
  if (!card) return undefined;

  const soldListings: PropertyListing[] = card.soldProperties.map((p) => ({
    id: `file-${p.image}`,
    title: p.title,
    suburb: p.suburb,
    listingType: "sold" as const,
    imageUrl: soldSrc(slug, p.image),
  }));

  return {
    slug,
    card,
    agentPhotoSrc: agentSrc(slug),
    soldListings,
    availableListings: [],
  };
}

export async function listAgentSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) return getFileSlugs();

  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase.from("agents").select("slug").order("agent_name");

  if (error || !data?.length) return getFileSlugs();
  return data.map((r) => r.slug);
}

export async function isValidAgentSlug(slug: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return isFileSlug(slug);

  const supabase = createSupabasePublicClient();
  const { data } = await supabase.from("agents").select("slug").eq("slug", slug).maybeSingle();

  if (data) return true;
  return isFileSlug(slug);
}

export async function getAgentCardPayload(slug: string): Promise<AgentCardPayload | undefined> {
  if (!isSupabaseConfigured()) return filePayload(slug);

  const supabase = createSupabasePublicClient();
  const { data: agent, error: agentError } = await supabase
    .from("agents")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (agentError || !agent) return filePayload(slug);

  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .eq("agent_slug", slug)
    .order("sort_order", { ascending: true });

  return mapDbToCard(agent as DbAgent, (properties ?? []) as DbProperty[]);
}

export async function listAgentsSummary(): Promise<
  { slug: string; agent_name: string; email: string; phone: string }[]
> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("agents")
    .select("slug, agent_name, email, phone")
    .order("agent_name");

  if (error) throw error;
  return data ?? [];
}

export async function getAgentForAdmin(slug: string): Promise<{
  agent: DbAgent;
  properties: DbProperty[];
} | null> {
  const supabase = await createSupabaseServerClient();
  const { data: agent } = await supabase.from("agents").select("*").eq("slug", slug).maybeSingle();
  if (!agent) return null;

  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .eq("agent_slug", slug)
    .order("sort_order", { ascending: true });

  return {
    agent: agent as DbAgent,
    properties: (properties ?? []) as DbProperty[],
  };
}

export type AgentUpsertInput = Omit<DbAgent, "updated_at">;

export async function upsertAgent(input: AgentUpsertInput): Promise<void> {
  const { createSupabaseAdminClient } = await import("@/lib/supabase/admin");
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("agents").upsert({
    ...input,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}

export type PropertyInput = {
  id?: string;
  agent_slug: string;
  listing_type: ListingType;
  title: string;
  suburb: string;
  image_path?: string | null;
  sort_order: number;
};

export async function upsertProperty(input: PropertyInput): Promise<DbProperty> {
  const { createSupabaseAdminClient } = await import("@/lib/supabase/admin");
  const supabase = createSupabaseAdminClient();

  if (input.id) {
    const { data, error } = await supabase
      .from("properties")
      .update({
        listing_type: input.listing_type,
        title: input.title,
        suburb: input.suburb,
        image_path: input.image_path ?? null,
        sort_order: input.sort_order,
      })
      .eq("id", input.id)
      .select()
      .single();
    if (error) throw error;
    return data as DbProperty;
  }

  const { data, error } = await supabase
    .from("properties")
    .insert({
      agent_slug: input.agent_slug,
      listing_type: input.listing_type,
      title: input.title,
      suburb: input.suburb,
      image_path: input.image_path ?? null,
      sort_order: input.sort_order,
    })
    .select()
    .single();
  if (error) throw error;
  return data as DbProperty;
}

export async function deleteProperty(id: string): Promise<void> {
  const { createSupabaseAdminClient } = await import("@/lib/supabase/admin");
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) throw error;
}

export async function deleteAgent(slug: string): Promise<void> {
  const { createSupabaseAdminClient } = await import("@/lib/supabase/admin");
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("agents").delete().eq("slug", slug);
  if (error) throw error;
}
