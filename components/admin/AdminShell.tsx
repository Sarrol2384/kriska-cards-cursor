import Link from "next/link";

export function AdminShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-[#080808] text-foreground">
      <header className="border-b border-primary/25 bg-[#0c0c0c]">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <p className="text-xs font-bold tracking-widest text-primary uppercase">
              Eyethu PG Admin
            </p>
            <h1 className="font-heading text-xl font-semibold text-foreground">{title}</h1>
          </div>
          <nav className="flex flex-wrap items-center gap-3 text-sm">
            <Link href="/admin" className="text-primary hover:underline">
              Agents
            </Link>
            <Link href="/admin/agents/new" className="text-muted-foreground hover:text-primary">
              Add agent
            </Link>
            <form action="/api/admin/logout" method="post">
              <button type="submit" className="text-muted-foreground hover:text-accent">
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-4 py-8">{children}</div>
    </div>
  );
}
