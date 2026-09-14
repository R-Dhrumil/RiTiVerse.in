/**
 * fetch-stitch-screens.mjs
 * Downloads HTML code and screenshot images for all Nirmaan Softworks
 * Stitch screens into the ./stitch-export/ directory.
 *
 * Usage:  node backend/scripts/fetch-stitch-screens.mjs
 */

import { StitchToolClient } from "@google/stitch-sdk";
import { createWriteStream, mkdirSync } from "fs";
import { pipeline } from "stream/promises";
import path from "path";

// ── Config ────────────────────────────────────────────────────────────────────
const API_KEY     = process.env.STITCH_API_KEY || "AQ.Ab8RN6KP_cbMdQ-YVHHIfUYdlJ9FwWDr2ou2JLHx_UrwTII9gA";
const PROJECT_ID  = "12225389920928736179";
const OUT_DIR     = "./stitch-export";

const SCREENS = [
  { name: "shader",            id: "a813e940ecac4d389c1d308f38bdb02c" },
  { name: "threejs",           id: "7af887a5523e42d3b1a0c830588bc410" },
  { name: "design-system",     id: "asset-stub-assets_e36f3c28fb8d49c5ac426aeaf7985f34" },
  { name: "home-light",        id: "61283ac6dcf94551be52d8b9250d3a94" },
  { name: "portfolio-light",   id: "fbbed4002ad3450e958c6b845abe907e" },
  { name: "pricing-light",     id: "a5b820f1c54441779bb884e8219dd89a" },
  { name: "services-light",    id: "1537b3274de049e3b052076ce20966cd" },
];
// ─────────────────────────────────────────────────────────────────────────────

mkdirSync(OUT_DIR, { recursive: true });

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  await pipeline(res.body, createWriteStream(dest));
}

async function main() {
  console.log("🔌 Connecting to Stitch MCP…");
  const client = new StitchToolClient({ apiKey: API_KEY });

  for (const screen of SCREENS) {
    console.log(`\n📄 Fetching screen: ${screen.name}  (${screen.id})`);
    try {
      const result = await client.callTool("get_screen", {
        projectId: PROJECT_ID,
        screenId:  screen.id,
      });

      const data = result?.content?.[0];
      const parsed = typeof data?.text === "string" ? JSON.parse(data.text) : data;

      console.log("  Raw result keys:", Object.keys(parsed ?? {}));

      const htmlUrl  = parsed?.html  ?? parsed?.htmlUrl  ?? parsed?.htmlDownloadUrl;
      const imageUrl = parsed?.image ?? parsed?.imageUrl ?? parsed?.imageDownloadUrl;

      if (htmlUrl) {
        const htmlDest = path.join(OUT_DIR, `${screen.name}.html`);
        console.log(`  ⬇  HTML  → ${htmlDest}`);
        await download(htmlUrl, htmlDest);
      } else {
        console.warn("  ⚠  No HTML URL returned.");
      }

      if (imageUrl) {
        const imgDest = path.join(OUT_DIR, `${screen.name}.png`);
        console.log(`  ⬇  Image → ${imgDest}`);
        await download(imageUrl, imgDest);
      } else {
        console.warn("  ⚠  No image URL returned.");
      }
    } catch (err) {
      console.error(`  ✗ Error for ${screen.name}:`, err.message ?? err);
    }
  }

  await client.close();
  console.log(`\n✅ Done. Files saved to ${path.resolve(OUT_DIR)}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
