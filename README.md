# KrisKa Solutions — Digital card

Mobile-first link-in-bio style digital business card for KrisKa Solutions team members.

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (often http://localhost:3000 or :3001).

## Edit text and links

**[`content/card.ts`](content/card.ts)** — name, phone, email, bio, social links, sold listing titles.

## Add or replace images (easy)

1. Put files in **`public/images/`** (see **[`public/images/README.md`](public/images/README.md)**).
2. Update **`content/images.ts`** with the file names only.

| What | Where to drop | What to set in `content/images.ts` |
|------|----------------|-------------------------------------|
| Logo | `public/images/logo.png` | `logoFile = "logo.png"` |
| Agent photo | `public/images/agent.jpg` | `agentFile = "agent.jpg"` |
| Sold photos | `public/images/sold/1.jpg`, `2.jpg`, … | `soldFileExtension = "jpg"` |

Sold listings in `card.ts` use a **number**, not a full path:

```ts
{ title: "Family home", suburb: "Kuils River", image: 1 },
```

That uses `public/images/sold/1.jpg` when `soldFileExtension` is `"jpg"`.

Check files before deploy:

```bash
npm run images:check
```

## Deploy (Vercel)

See **[docs/DEPLOY.md](docs/DEPLOY.md)** for step-by-step instructions.

1. Run `npm run images:check` and `npm run build` locally first.
2. Push to GitHub → import in Vercel.
3. Set `NEXT_PUBLIC_SITE_URL` to your production URL.

## Footer

**Digital card by VonWillingh Online** — optional URL/phone in `content/card.ts` under `designer`.
