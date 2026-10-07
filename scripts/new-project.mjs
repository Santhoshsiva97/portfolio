#!/usr/bin/env node
// Scaffold a new case study from content/projects/_template.mdx.
//
//   npm run new:project -- <slug> "<Title>"
//   npm run new:project -- clinic-booking-app "Clinic Booking App"
//
// Creates content/projects/<slug>.mdx (title, dates and image paths filled in) and
// public/images/projects/<slug>/ for its cover and screenshots.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [slug, ...titleParts] = process.argv.slice(2);
const title = titleParts.join(" ").trim();

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !title) {
  console.error(
    'Usage: npm run new:project -- <lowercase-slug> "<Project title>"',
  );
  console.error(
    'Example: npm run new:project -- clinic-booking-app "Clinic Booking App"',
  );
  process.exit(1);
}

const root = process.cwd();
const target = join(root, "content", "projects", `${slug}.mdx`);
if (existsSync(target)) {
  console.error(
    `content/projects/${slug}.mdx already exists. Pick another slug or edit that file.`,
  );
  process.exit(1);
}

// Local date (toISOString() is UTC, which is still "yesterday" in the Indian morning).
const today = new Date();
const pad = (n) => String(n).padStart(2, "0");
const ymd = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
const ym = ymd.slice(0, 7);

const template = readFileSync(
  join(root, "content", "projects", "_template.mdx"),
  "utf8",
);
const output = template
  .replace(/^# Copy this file.*\r?\n/m, "")
  .replace('title: "Project name"', `title: ${JSON.stringify(title)}`)
  .replace('startDate: "2026-01"', `startDate: "${ym}"`)
  .replace(/updated: "\d{4}-\d{2}-\d{2}"/, `updated: "${ymd}"`)
  .replace(
    /^draft: false( *)#.*$/m,
    "draft: true$1# new projects start hidden; set to false when it's ready to publish",
  )
  .replaceAll("<slug>", slug);

writeFileSync(target, output);
const imageDir = join(root, "public", "images", "projects", slug);
mkdirSync(imageDir, { recursive: true });
if (!existsSync(join(imageDir, ".gitkeep")))
  writeFileSync(join(imageDir, ".gitkeep"), "");

console.log(`Created content/projects/${slug}.mdx`);
console.log(
  `Created public/images/projects/${slug}/ (add cover.jpg and screenshots here)`,
);
console.log(
  "It starts as a draft (dev only). Fill it in, check /projects/" +
    slug +
    " in `npm run dev`,",
);
console.log("then set `draft: false` and push to publish.");
