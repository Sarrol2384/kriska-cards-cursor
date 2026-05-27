import { AdminShell } from "@/components/admin/AdminShell";
import { AgentEditForm } from "@/components/admin/AgentEditForm";
import type { DbAgent } from "@/lib/agents-db";
import { defaultRole, defaultTagline } from "@/content/shared";

function emptyAgent(): DbAgent {
  return {
    slug: "",
    agent_name: "",
    role: defaultRole,
    tagline: defaultTagline,
    bio: "",
    phone: "",
    email: "",
    whatsapp_message:
      "Hi, I'd like to get in touch via your Eyethu Property Group digital card.",
    website_url: "#",
    website_label: "Browse homes",
    social: {},
    photo_path: null,
  };
}

export default function AdminNewAgentPage() {
  return (
    <AdminShell title="New agent">
      <AgentEditForm agent={emptyAgent()} properties={[]} isNew />
    </AdminShell>
  );
}
