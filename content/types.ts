/** Photo slot: file at public/images/agents/{slug}/sold/{image}.jpg */
export type SoldProperty = {
  title: string;
  suburb: string;
  image: number;
};

export type ListingType = "sold" | "available";

export type PropertyListing = {
  id: string;
  title: string;
  suburb: string;
  imageUrl: string;
  listingType: ListingType;
};

/** Full card payload for public pages (from DB or files). */
export type AgentCardPayload = {
  slug: string;
  card: CardConfig;
  agentPhotoSrc: string;
  soldListings: PropertyListing[];
  availableListings: PropertyListing[];
};

export type CardConfig = {
  agentName: string;
  role: string;
  tagline: string;
  bio: string;
  phone: string;
  /** WhatsApp number; falls back to phone if omitted */
  whatsappPhone?: string;
  email: string;
  whatsappMessage: string;
  websiteUrl: string;
  websiteLabel: string;
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  soldProperties: SoldProperty[];
  designer: {
    name: string;
    label: string;
    url?: string;
    phone?: string;
  };
};

/** Per-agent content file (designer merged from shared at runtime). */
export type AgentProfile = Omit<CardConfig, "designer">;
