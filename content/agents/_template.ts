import type { AgentProfile } from "@/content/types";
import { defaultRole, defaultTagline } from "@/content/shared";

/**
 * Copy this file to `{slug}.ts`, fill in details, and register the slug in index.ts.
 * URL: https://your-domain.com/{slug}
 */
export const agentTemplate: AgentProfile = {
  agentName: "Full Name",
  role: defaultRole,
  tagline: defaultTagline,
  bio: "Write 2–4 sentences about how you help clients.",
  phone: "0XXXXXXXXX",
  email: "name@mjgrealestate.co.za",
  whatsappMessage:
    "Hi, I'd like to get in touch via your KrisKa Solutions digital card.",
  websiteUrl: "#",
  websiteLabel: "Learn more",
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },
  soldProperties: [
    { title: "Property type", suburb: "Suburb", image: 1 },
    { title: "Property type", suburb: "Suburb", image: 2 },
    { title: "Property type", suburb: "Suburb", image: 3 },
    { title: "Property type", suburb: "Suburb", image: 4 },
    { title: "Property type", suburb: "Suburb", image: 5 },
    { title: "Property type", suburb: "Suburb", image: 6 },
  ],
};
