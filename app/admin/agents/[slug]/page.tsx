import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { AgentEditForm } from "@/components/admin/AgentEditForm";
import { getAgentForAdmin } from "@/lib/agents-db";

type PageProps = { params: Promise<{ slug: string }> };

export default async function AdminEditAgentPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getAgentForAdmin(slug);

  if (!data) {
    notFound();
  }

  return (
    <AdminShell title={data.agent.agent_name}>
      <AgentEditForm agent={data.agent} properties={data.properties} />
    </AdminShell>
  );
}
