# Simple setup guide (not technical)

Two ways to get **Nomonde** (and other agents) into the admin dashboard.

---

## Option A — SQL only (no terminal commands)

Good if you only want names, phone, bio, and listing titles first. You add photos in the dashboard.

### Step 1 — Tables (once)

1. Go to [supabase.com](https://supabase.com) → your project.
2. Click **SQL Editor** (left menu).
3. Click **New query**.
4. Open the file `supabase/migrations/001_eyethu.sql` in this project (in Cursor or Notepad).
5. Copy **all** of it, paste into Supabase, click **Run**.

### Step 2 — Storage buckets (once)

1. Click **Storage** (left menu).
2. **New bucket** → name: `agent-photos` → turn **Public bucket** ON → Save.
3. **New bucket** again → name: `property-photos` → **Public** ON → Save.

### Step 3 — Your login (once)

1. **Authentication** → **Users** → **Add user**.
2. Enter your email + password → create (turn on **Auto confirm** if you see it).

### Step 4 — Add Nomonde with SQL

1. **SQL Editor** → **New query**.
2. Open `supabase/seed_nomonde.sql` in this project.
3. Copy all → paste in Supabase → **Run**.
4. Refresh **http://localhost:3000/admin** — you should see **Nomonde Blandile**.

### Step 5 — Photos (in the dashboard)

1. In admin, click **Edit** next to Nomonde.
2. Upload her **headshot** (choose a photo file).
3. For each sold property, click **Save listing**, then choose a photo for that row.
4. Click **Save profile** when done.

---

## Option B — One command (text + photos together)

Good if someone technical can run **one** command for you. It copies Nomonde’s photos from the project folder into Supabase.

### Before you run it

1. Steps 1–3 from Option A must be done (tables, buckets, admin user).
2. File `.env.local` in the project folder must have your Supabase keys (see `docs/ADMIN.md`).

### The command (Windows)

1. In Cursor: menu **Terminal** → **New Terminal** (bottom of the screen).
2. Make sure you see the project folder path (`eyethu-digital-cards-cursor`).
3. Copy and paste this line, press **Enter**:

```
node --env-file=.env.local scripts/seed-supabase.mjs
```

4. Wait until it says `Seed complete for nomonde-blandile`.
5. Refresh **http://localhost:3000/admin**.

---

## Daily work (after setup)

You do **not** need SQL or seed again for normal edits.

1. Open **http://localhost:3000/admin** (or your live website `/admin`).
2. Sign in.
3. Click **Edit** on an agent, or **Add agent** for someone new.
4. Change text, upload photos, add sold/available homes → **Save**.

---

## Which option should I use?

| You want… | Use |
|-----------|-----|
| Easiest, no terminal | **Option A** (SQL file + upload photos in admin) |
| Everything including photos in one go | **Option B** (one command) |

---

## Need help?

If `/admin` is still empty after Option A Step 4, check in Supabase: **Table Editor** → **agents** — you should see one row `nomonde-blandile`.
