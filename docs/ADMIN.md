# Eyethu PG — Admin dashboard

Manage agents, sold/available listings, and photos at `/admin` (no Git required for content changes).

**Not technical?** Start with **[SETUP-SIMPLE.md](./SETUP-SIMPLE.md)** (SQL file + plain steps).

## 1. Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. **SQL Editor** → run [`supabase/migrations/001_eyethu.sql`](../supabase/migrations/001_eyethu.sql).
3. **Storage** → create public buckets:
   - `agent-photos`
   - `property-photos`
4. **Authentication** → add one user (your email + password) for admin login.
5. **Settings → API** → copy URL, anon key, and service role key.

## 2. Environment variables

Copy [`.env.example`](../.env.example) to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Add the same variables in **Vercel** → Project → Settings → Environment Variables, then redeploy.

## 3. Install & seed

```bash
npm install
node --env-file=.env.local scripts/seed-supabase.mjs
npm run dev
```

Open:

- Admin: http://localhost:3000/admin
- Card: http://localhost:3000/nomonde-blandile

## 4. Daily use

1. Sign in at `/admin`.
2. Click **Edit** on an agent (or **Add agent**).
3. Update profile, upload headshot, add sold/available listings with photos.
4. Click **Save profile** / **Save listing** — the live card updates within about a minute (or immediately after save when revalidation runs).

## 5. Storage policies (if uploads fail)

In Supabase Storage → each bucket → Policies:

- **Public read** for `anon`
- **Insert/update** for `authenticated` (or rely on service role via API routes)

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Redirect to login with `?error=config` | Add Supabase env vars and restart dev server |
| Upload fails | Check buckets exist and service role key is set |
| Card still shows old file data | Run seed script or ensure agent exists in `agents` table |
| Build fails on Supabase import | Run `npm install` |
