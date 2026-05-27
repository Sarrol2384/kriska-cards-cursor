import type { AgentProfile } from "@/content/types";
import { defaultRole, defaultTagline } from "@/content/shared";

export const nomondeBlandile: AgentProfile = {
  agentName: "Nomonde Blandile",
  role: defaultRole,
  tagline: defaultTagline,
  bio:
    "Eyethu Property Group helps first-time buyers find affordable homes across the Western Cape, including secure gated communities around Cape Town. Our team offers a personal, client-first approach — clear guidance from enquiry to keys, with honest advice you can trust. Get in touch via WhatsApp for a friendly conversation about your next home.",
  phone: "0652833820",
  email: "blandile@mjgrealestate.co.za",
  whatsappMessage:
    "Hi, I'd like to get in touch via your Eyethu Property Group digital card.",
  websiteUrl: "#",
  websiteLabel: "Browse homes",
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },
  soldProperties: [
    { title: "Family home", suburb: "Kuils River", image: 1 },
    { title: "Townhouse", suburb: "Brackenfell", image: 2 },
    { title: "Apartment", suburb: "Bellville", image: 3 },
    { title: "Starter home", suburb: "Durbanville", image: 4 },
    { title: "Home sold", suburb: "Western Cape", image: 5 },
    { title: "Home sold", suburb: "Western Cape", image: 6 },
  ],
};
