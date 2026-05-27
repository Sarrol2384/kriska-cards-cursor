-- Eyethu Property Group: agents + property listings

create table if not exists public.agents (
  slug text primary key,
  agent_name text not null,
  role text not null default 'PROPERTY PRACTITIONER',
  tagline text not null default 'Eyethu Property Group',
  bio text not null default '',
  phone text not null default '',
  email text not null default '',
  whatsapp_message text not null default '',
  website_url text not null default '#',
  website_label text not null default 'Browse homes',
  social jsonb not null default '{}'::jsonb,
  photo_path text,
  updated_at timestamptz not null default now()
);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  agent_slug text not null references public.agents (slug) on delete cascade,
  listing_type text not null check (listing_type in ('sold', 'available')),
  title text not null,
  suburb text not null,
  image_path text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists properties_agent_slug_idx on public.properties (agent_slug);
create index if not exists properties_listing_type_idx on public.properties (agent_slug, listing_type);

alter table public.agents enable row level security;
alter table public.properties enable row level security;

create policy "Public read agents"
  on public.agents for select
  to anon, authenticated
  using (true);

create policy "Public read properties"
  on public.properties for select
  to anon, authenticated
  using (true);

create policy "Authenticated manage agents"
  on public.agents for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated manage properties"
  on public.properties for all
  to authenticated
  using (true)
  with check (true);
