/**
 * Seed Nomonde Blandile into Supabase. Requires .env.local with service role key.
 * Run: node --env-file=.env.local scripts/seed-supabase.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key);

const slug = "nomonde-blandile";
const agentDir = path.join(root, "public", "images", "agents", slug);

const agent = {
  slug,
  agent_name: "Nomonde Blandile",
  role: "PROPERTY PRACTITIONER",
  tagline: "Eyethu Property Group",
  bio:
    "Eyethu Property Group helps first-time buyers find affordable homes across the Western Cape, including secure gated communities around Cape Town. Our team offers a personal, client-first approach — clear guidance from enquiry to keys, with honest advice you can trust. Get in touch via WhatsApp for a friendly conversation about your next home.",
  phone: "0652833820",
  email: "blandile@mjgrealestate.co.za",
  whatsapp_message:
    "Hi, I'd like to get in touch via your Eyethu Property Group digital card.",
  website_url: "#",
  website_label: "Browse homes",
  social: {},
  photo_path: `${slug}/agent.jpeg`,
};

const soldListings = [
  { title: "Family home", suburb: "Kuils River", slot: 1 },
  { title: "Townhouse", suburb: "Brackenfell", slot: 2 },
  { title: "Apartment", suburb: "Bellville", slot: 3 },
  { title: "Starter home", suburb: "Durbanville", slot: 4 },
  { title: "Home sold", suburb: "Western Cape", slot: 5 },
  { title: "Home sold", suburb: "Western Cape", slot: 6 },
];

async function upload(bucket, storagePath, filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`Skip missing file: ${filePath}`);
    return;
  }
  const body = fs.readFileSync(filePath);
  const { error } = await supabase.storage.from(bucket).upload(storagePath, body, {
    upsert: true,
    contentType: "image/jpeg",
  });
  if (error) throw new Error(`${bucket}/${storagePath}: ${error.message}`);
  console.log(`Uploaded ${storagePath}`);
}

async function main() {
  const { error: agentError } = await supabase.from("agents").upsert(agent);
  if (agentError) throw agentError;

  const agentPhoto = path.join(agentDir, "agent.jpeg");
  await upload("agent-photos", agent.photo_path, agentPhoto);

  await supabase.from("properties").delete().eq("agent_slug", slug);

  for (let i = 0; i < soldListings.length; i++) {
    const s = soldListings[i];
    const { data: inserted, error: insErr } = await supabase
      .from("properties")
      .insert({
        agent_slug: slug,
        listing_type: "sold",
        title: s.title,
        suburb: s.suburb,
        sort_order: i,
      })
      .select()
      .single();
    if (insErr) throw insErr;
    const imgPath = `${slug}/properties/${inserted.id}.jpg`;
    await upload(
      "property-photos",
      imgPath,
      path.join(agentDir, "sold", `${s.slot}.jpg`),
    );
    await supabase
      .from("properties")
      .update({ image_path: imgPath })
      .eq("id", inserted.id);
  }

  console.log("Seed complete for", slug);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
