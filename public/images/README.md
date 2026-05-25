# Images folder

Drop your files here — then update **`content/images.ts`** with the matching file names.

## Logo and agent photo

| Drop this file here | Then set in `content/images.ts` |
|---------------------|----------------------------------|
| Any name, e.g. `eyethu-logo.png` | `logoFile = "eyethu-logo.png"` (must match exactly) |
| Any name, e.g. `agent.jpeg` | `agentFile = "agent.jpeg"` |

**Do not** open image files in the browser and “Save as” — that creates useless 1 KB HTML files. Copy the real `.png` / `.jpg` from Downloads.

## Sold properties

Put photos in the **`sold/`** subfolder:

| File | Used by |
|------|---------|
| `sold/1.jfif` (or `.jpg`, `.png`) | First row in `soldProperties` (`image: 1`) |
| `sold/2.jfif` | Second row (`image: 2`) |
| … | |

**Folder must be** `public/images/sold/` — not `public/sold/`.

Set `soldFileExtension` in `content/images.ts` to match your files (`"jfif"`, `"jpg"`, etc.).

In **`content/card.ts`**, each sold listing only needs a number:

```ts
{ title: "Family home", suburb: "Kuils River", image: 1 },
```

## Check everything is in place

```bash
npm run images:check
```

Lists missing files before you deploy.
