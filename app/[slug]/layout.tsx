import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAgentCardPayload } from "@/lib/agents-db";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getAgentCardPayload(slug);

  if (!payload) {
    return { title: "Not found" };
  }

  const { card, agentPhotoSrc } = payload;
  const description = card.bio.slice(0, 160);

  return {
    metadataBase: new URL(siteUrl),
    title: `${card.agentName} | KrisKa Solutions`,
    description,
    openGraph: {
      type: "website",
      locale: "en_ZA",
      siteName: "KrisKa Solutions Ltd",
      title: `${card.agentName} — Digital card`,
      description,
      images: [
        { url: agentPhotoSrc, width: 400, height: 400, alt: card.agentName },
      ],
    },
    appleWebApp: { capable: true, title: "KrisKa" },
  };
}

export default async function AgentCardLayout({
  children,
  params,
}: LayoutProps) {
  const { slug } = await params;
  const payload = await getAgentCardPayload(slug);

  if (!payload) {
    notFound();
  }

  return children;
}
