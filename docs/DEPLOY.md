# Deploy Eyethu digital card (Vercel)

## Before you deploy

1. Add agent images under `public/images/agents/{slug}/` (see `public/images/README.md`).
2. Edit agent content in `content/agents/` (see `docs/AGENTS.md`).
3. Run locally:

```bash
npm run images:check
npm run build
```

## Vercel steps

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Environment variable:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SITE_URL` | Your live URL, e.g. `https://eyethu-card.vercel.app` |

5. Deploy. After the first deploy, update `NEXT_PUBLIC_SITE_URL` if the URL changed, then redeploy.

## Custom domain (optional)

Vercel project → **Settings** → **Domains** → add e.g. `card.eyethu.co.za` and follow DNS instructions.

## Updating the live site

Change files → commit → push. Vercel rebuilds automatically if connected to GitHub.
