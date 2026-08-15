#!/usr/bin/env node
/**
 * Extract today's briefing straight out of src/components/WorldConflictDebrief.jsx
 * and archive it into src/data/briefings.ts + bump the sitemap date.
 *
 * Usage:
 *   node scripts/archive-briefing.mjs                 # auto title
 *   node scripts/archive-briefing.mjs --title "..."   # explicit title
 *   node scripts/archive-briefing.mjs --force         # overwrite an existing date
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const DASH = path.join(root, "src/components/WorldConflictDebrief.jsx");
const DATA = path.join(root, "src/data/briefings.ts");
const SITEMAP = path.join(root, "src/routes/sitemap[.]xml.ts");

const argv = process.argv.slice(2);
const arg = (n) => {
  const i = argv.indexOf(n);
  return i >= 0 ? argv[i + 1] : undefined;
};
const force = argv.includes("--force");

const src = fs.readFileSync(DASH, "utf8");

// --- report date -----------------------------------------------------------
const dateM = src.match(/const REPORT_NOW\s*=\s*new Date\("(\d{4}-\d{2}-\d{2})/);
if (!dateM) throw new Error("REPORT_NOW not found in dashboard component");
const date = dateM[1];

// --- BRIEFING object -------------------------------------------------------
const bIdx = src.indexOf("const BRIEFING={");
if (bIdx < 0) throw new Error("const BRIEFING={...} not found");
const start = src.indexOf("{", bIdx);
let depth = 0, end = -1, inStr = null;
for (let i = start; i < src.length; i++) {
  const c = src[i];
  if (inStr) {
    if (c === "\\") i++;
    else if (c === inStr) inStr = null;
    continue;
  }
  if (c === '"' || c === "'" || c === "`") inStr = c;
  else if (c === "{") depth++;
  else if (c === "}") { depth--; if (depth === 0) { end = i + 1; break; } }
}
if (end < 0) throw new Error("Could not find end of BRIEFING object");
const briefing = vm.runInNewContext(`(${src.slice(start, end)})`, { Date });

const lede = String(briefing.summaryShort || "").trim();
const body = String(briefing.summary || "").trim();
const watch = String(briefing.watch || "").trim();
if (!lede || !body) throw new Error("BRIEFING is missing summaryShort/summary");

// --- theaters (keyword detection over the full briefing text) --------------
const hay = `${lede} ${body} ${watch}`.toLowerCase();
const THEATERS = [
  ["Ukraine", /\bukrain|russia|zelensky|moscow|kyiv/],
  ["Iran", /\biran|tehran|irgc|khamenei/],
  ["Strait of Hormuz", /hormuz/],
  ["Israel", /\bisrael|gaza|idf/],
  ["Lebanon", /hezbollah|lebanon/],
  ["Yemen", /houthi|yemen|bab el-mandeb/],
  ["Taiwan", /taiwan/],
  ["China", /\bchina|beijing|pla\b/],
  ["North Korea", /north korea|pyongyang|dprk/],
  ["India-Pakistan", /pakistan|\bindia\b/],
  ["Sudan", /\bsudan|\brsf\b/],
];
const theaters = THEATERS.filter(([, re]) => re.test(hay)).map(([n]) => n);

// --- title -----------------------------------------------------------------
function autoTitle(text) {
  const first = text.split(/(?<=[.;])\s/)[0] || text;
  let t = first.replace(/\s+/g, " ").replace(/[.;]\s*$/, "").trim();
  if (t.length > 95) t = t.slice(0, 92).replace(/\s+\S*$/, "") + "…";
  return t;
}
const title = arg("--title") || autoTitle(lede);

// --- write into briefings.ts ----------------------------------------------
let data = fs.readFileSync(DATA, "utf8");
const already = new RegExp(`date:\\s*"${date}"`).test(data);
if (already && !force) {
  console.log(`Briefing for ${date} already archived — nothing to do (use --force to replace).`);
  process.exit(0);
}
if (already && force) {
  // drop the existing entry for this date
  const re = new RegExp(`\\n  \\{\\n    date: "${date}"[\\s\\S]*?\\n  \\},`);
  if (!re.test(data)) throw new Error(`--force: could not locate existing ${date} entry`);
  data = data.replace(re, "");
}

const q = (s) => JSON.stringify(s);
const entry = `  {
    date: ${q(date)},
    title: ${q(title)},
    lede: ${q(lede)},
    body: ${q(body)},
    watch: ${q(watch)},
    theaters: ${JSON.stringify(theaters)},
  },`;

const anchor = "export const BRIEFINGS: Briefing[] = [";
if (!data.includes(anchor)) throw new Error("BRIEFINGS array not found in briefings.ts");
data = data.replace(anchor, `${anchor}\n${entry}`);
fs.writeFileSync(DATA, data);

// --- bump sitemap ----------------------------------------------------------
let sm = fs.readFileSync(SITEMAP, "utf8");
const smNew = sm.replace(/const LAST_UPDATED\s*=\s*"[^"]*"/, `const LAST_UPDATED = "${date}"`);
if (smNew !== sm) fs.writeFileSync(SITEMAP, smNew);

console.log(`Archived /briefing/${date}`);
console.log(`  title:    ${title}`);
console.log(`  theaters: ${theaters.join(", ") || "(none detected)"}`);
console.log(`  sitemap:  LAST_UPDATED = ${date}`);
