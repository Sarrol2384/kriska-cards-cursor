/** Text & links. Images: edit content/images.ts and drop files in public/images/ */
export type SoldProperty = {
  title: string;
  suburb: string;
  /** Photo slot: file at public/images/sold/{image}.* (extension in content/images.ts) */
  image: number;
};

export type CardConfig = {
  agentName: string;
  role: string;
  tagline: string;
  bio: string;
  phone: string;
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

export const card: CardConfig = {
  agentName: "Nomonde Blandile",
  role: "PROPERTY PRACTITIONER",
  tagline: "Eyethu Property Group",
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
  designer: {
    name: "VonWillingh Online",
    label: "Digital card by VonWillingh Online",
    url: "",
    phone: "",
  },
};
