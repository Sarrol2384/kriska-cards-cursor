import { notFound, redirect } from "next/navigation";
import { DigitalCard } from "@/components/card/DigitalCard";
import { getAgentCardPayload, listAgentSlugs } from "@/lib/agents-db";

export const revalidate = 60;

/** Legacy Eyethu slug → primary KrisKa card */
const SLUG_REDIRECTS: Record<string, string> = {
  "nomonde-blandile": "hans-kajiba-kuzanga",
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await listAgentSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function AgentCardPage({ params }: PageProps) {
  const { slug } = await params;

  const redirectTo = SLUG_REDIRECTS[slug];
  if (redirectTo) {
    redirect(`/${redirectTo}`);
  }

  const payload = await getAgentCardPayload(slug);

  if (!payload) {
    notFound();
  }

  return <DigitalCard payload={payload} />;
}
