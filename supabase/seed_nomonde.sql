-- Eyethu PG: add Nomonde Blandile (text + listings)
-- Run in Supabase → SQL Editor → New query → Paste → Run
--
-- Run 001_eyethu.sql FIRST (creates tables).
-- Photos: upload in /admin after this, OR use the seed command in docs/SETUP-SIMPLE.md

delete from public.properties where agent_slug = 'nomonde-blandile';
delete from public.agents where slug = 'nomonde-blandile';

insert into public.agents (
  slug,
  agent_name,
  role,
  tagline,
  bio,
  phone,
  email,
  whatsapp_message,
  website_url,
  website_label,
  social,
  photo_path
) values (
  'nomonde-blandile',
  'Nomonde Blandile',
  'PROPERTY PRACTITIONER',
  'Eyethu Property Group',
  'Eyethu Property Group helps first-time buyers find affordable homes across the Western Cape, including secure gated communities around Cape Town. Our team offers a personal, client-first approach — clear guidance from enquiry to keys, with honest advice you can trust. Get in touch via WhatsApp for a friendly conversation about your next home.',
  '0652833820',
  'blandile@mjgrealestate.co.za',
  'Hi, I''d like to get in touch via your Eyethu Property Group digital card.',
  '#',
  'Browse homes',
  '{}'::jsonb,
  null
);

insert into public.properties (agent_slug, listing_type, title, suburb, sort_order) values
  ('nomonde-blandile', 'sold', 'Family home', 'Kuils River', 0),
  ('nomonde-blandile', 'sold', 'Townhouse', 'Brackenfell', 1),
  ('nomonde-blandile', 'sold', 'Apartment', 'Bellville', 2),
  ('nomonde-blandile', 'sold', 'Starter home', 'Durbanville', 3),
  ('nomonde-blandile', 'sold', 'Home sold', 'Western Cape', 4),
  ('nomonde-blandile', 'sold', 'Home sold', 'Western Cape', 5);
