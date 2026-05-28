# Adding agent digital cards

**Preferred:** use the admin dashboard at `/admin` after Supabase is set up (see [ADMIN.md](./ADMIN.md)).

**Fallback:** edit files in `content/agents/` and `public/images/agents/` as below.

One Vercel deployment serves every agent at their own URL:

`https://your-domain.com/{slug}`

Example: `https://your-domain.com/nomonde-blandile`

The site root (`/`) redirects to the primary card. Share **per-agent links** only.

## Checklist per agent

| Item | Where |
|------|--------|
| URL slug | lowercase, hyphens, e.g. `sipho-mthembu` |
| Contact & bio | `content/agents/{slug}.ts` |
| Register slug | `content/agents/index.ts` |
| Headshot | `public/images/agents/{slug}/agent.jpeg` |
| Sold photos | `public/images/agents/{slug}/sold/1.jpg` … |

Shared for all agents (do not duplicate):

- `public/images/eyethu-logo.png`
- `public/images/vonwillingh-logo.png`
- Theme music: `public/audio/kriska-theme.mp3`

## Steps (about 15 minutes per agent)

1. Copy [`content/agents/_template.ts`](../content/agents/_template.ts) to `content/agents/{slug}.ts`.
2. Fill in name, phone, email, bio, sold listings, and social URLs.
3. Import the profile in [`content/agents/index.ts`](../content/agents/index.ts):

   ```ts
   import { siphoMthembu } from "@/content/agents/sipho-mthembu";

   const agents: Record<string, AgentProfile> = {
     "nomonde-blandile": nomondeBlandile,
     "sipho-mthembu": siphoMthembu,
   };
   ```

4. Create `public/images/agents/{slug}/` with `agent.jpeg` and `sold/1.jpg` … (match `image:` numbers in the agent file).
5. Run:

   ```bash
   npm run images:check
   npm run build
   ```

6. Commit, push — Vercel redeploys once.

## Team rollout (12 agents)

| # | Slug (example) | Status |
|---|----------------|--------|
| 1 | `nomonde-blandile` | Live |
| 2 | _(choose slug)_ | Add using steps above |
| 3–12 | _(one slug each)_ | Add using steps above |

Collect from each person: full name, mobile, email, short bio, 4–6 sold listings (title + suburb + photo), optional social links, headshot (square JPEG).

## Verify locally

```bash
npm run dev
```

Open `http://localhost:3000/{slug}`
