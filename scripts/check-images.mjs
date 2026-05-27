import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "public", "images");
const agentsDir = path.join(imagesDir, "agents");

/** @type {{ logoFile: string; agentFile: string; soldFileExtension: string; designerLogoFile: string }} */
let config = {
  logoFile: "eyethu-logo.png",
  agentFile: "agent.jpeg",
  soldFileExtension: "jpg",
  designerLogoFile: "vonwillingh-logo.png",
};

const imagesTs = fs.readFileSync(
  path.join(root, "content", "images.ts"),
  "utf8",
);
const logoMatch = imagesTs.match(/logoFile\s*=\s*["']([^"']+)["']/);
const agentMatch = imagesTs.match(/agentFile\s*=\s*["']([^"']+)["']/);
const extMatch = imagesTs.match(/soldFileExtension\s*=\s*["']([^"']+)["']/);
const designerMatch = imagesTs.match(/designerLogoFile\s*=\s*["']([^"']+)["']/);
if (logoMatch) config.logoFile = logoMatch[1];
if (agentMatch) config.agentFile = agentMatch[1];
if (extMatch) config.soldFileExtension = extMatch[1];
if (designerMatch) config.designerLogoFile = designerMatch[1];

const indexTs = fs.readFileSync(
  path.join(root, "content", "agents", "index.ts"),
  "utf8",
);
const slugs = [...indexTs.matchAll(/"([a-z0-9-]+)":/g)].map((m) => m[1]);

function exists(rel) {
  return fs.existsSync(path.join(root, "public", rel));
}

function readAgentSoldSlots(slug) {
  const agentPath = path.join(
    root,
    "content",
    "agents",
    `${slug}.ts`,
  );
  if (!fs.existsSync(agentPath)) return [];
  const src = fs.readFileSync(agentPath, "utf8");
  return [...src.matchAll(/image:\s*(\d+)/g)].map((m) => m[1]);
}

const missing = [];

if (!exists(`images/${config.logoFile}`)) {
  missing.push(`images/${config.logoFile} (shared logo)`);
}
if (!exists(`images/${config.designerLogoFile}`)) {
  missing.push(`images/${config.designerLogoFile} (designer logo)`);
}

const ext = config.soldFileExtension.replace(/^\./, "");

for (const slug of slugs) {
  const agentPhoto = `images/agents/${slug}/${config.agentFile}`;
  if (!exists(agentPhoto)) {
    missing.push(`${agentPhoto} (agent photo for ${slug})`);
  }

  for (const slot of readAgentSoldSlots(slug)) {
    const rel = `images/agents/${slug}/sold/${slot}.${ext}`;
    if (!exists(rel)) {
      missing.push(`${rel} (sold slot ${slot} for ${slug})`);
    }
  }
}

if (slugs.length === 0) {
  console.warn("No agents registered in content/agents/index.ts");
}

if (missing.length === 0) {
  console.log(`All configured images found for ${slugs.length} agent(s).`);
  process.exit(0);
}

console.log("Missing image files:\n");
for (const m of missing) {
  console.log(`  - public/${m}`);
}
console.log(
  "\nAdd files under public/images/agents/{slug}/ and shared files in public/images/",
);
process.exit(1);
