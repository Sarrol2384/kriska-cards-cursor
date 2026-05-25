import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "public", "images");
const soldDir = path.join(imagesDir, "sold");

/** @type {{ logoFile: string; agentFile: string; soldFileExtension: string }} */
let config = {
  logoFile: "logo.svg",
  agentFile: "agent.svg",
  soldFileExtension: "svg",
};

const imagesTs = fs.readFileSync(
  path.join(root, "content", "images.ts"),
  "utf8",
);
const logoMatch = imagesTs.match(/logoFile\s*=\s*["']([^"']+)["']/);
const agentMatch = imagesTs.match(/agentFile\s*=\s*["']([^"']+)["']/);
const extMatch = imagesTs.match(/soldFileExtension\s*=\s*["']([^"']+)["']/);
if (logoMatch) config.logoFile = logoMatch[1];
if (agentMatch) config.agentFile = agentMatch[1];
if (extMatch) config.soldFileExtension = extMatch[1];

const cardTs = fs.readFileSync(path.join(root, "content", "card.ts"), "utf8");
const soldSlots = [...cardTs.matchAll(/image:\s*(\d+)/g)].map((m) => m[1]);

function exists(rel) {
  return fs.existsSync(path.join(root, "public", rel));
}

const missing = [];

if (!exists(`images/${config.logoFile}`)) {
  missing.push(`images/${config.logoFile} (logo)`);
}
if (!exists(`images/${config.agentFile}`)) {
  missing.push(`images/${config.agentFile} (agent photo)`);
}

const ext = config.soldFileExtension.replace(/^\./, "");
for (const slot of soldSlots) {
  const rel = `images/sold/${slot}.${ext}`;
  if (!exists(rel)) {
    missing.push(`${rel} (sold property slot ${slot})`);
  }
}

if (missing.length === 0) {
  console.log("All configured images found.");
  process.exit(0);
}

console.log("Missing image files:\n");
for (const m of missing) {
  console.log(`  - public/${m}`);
}
console.log("\nDrop files in public/images/ and update content/images.ts");
process.exit(1);
