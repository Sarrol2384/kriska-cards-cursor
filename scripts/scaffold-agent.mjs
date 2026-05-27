/**
 * Scaffold a new agent folder and remind you to add content files.
 * Usage: node scripts/scaffold-agent.mjs sipho-mthembu
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const slug = process.argv[2];
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("Usage: npm run agent:new -- <slug>");
  console.error("Example: npm run agent:new -- sipho-mthembu");
  process.exit(1);
}

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const agentDir = path.join(root, "public", "images", "agents", slug);
const soldDir = path.join(agentDir, "sold");

fs.mkdirSync(soldDir, { recursive: true });

const readme = `# ${slug}

Add:
- agent.jpeg (headshot)
- sold/1.jpg … sold/6.jpg (match image: slots in content/agents/${slug}.ts)
`;

fs.writeFileSync(path.join(agentDir, "README.md"), readme);

console.log(`Created public/images/agents/${slug}/`);
console.log("\nNext steps:");
console.log(`  1. Copy content/agents/_template.ts → content/agents/${slug}.ts`);
console.log(`  2. Register "${slug}" in content/agents/index.ts`);
console.log(`  3. Add agent.jpeg and sold/*.jpg in public/images/agents/${slug}/`);
console.log("  4. npm run images:check && npm run build");
