/**
 * Vite dev plugin: auto-archive the daily briefing.
 *
 * Whenever src/components/WorldConflictDebrief.jsx changes (i.e. a new build is
 * uploaded), this runs scripts/archive-briefing.mjs, which reads REPORT_NOW +
 * BRIEFING out of the dashboard, prepends a dated entry to src/data/briefings.ts
 * and bumps LAST_UPDATED in the sitemap.
 *
 * It never passes --force, so an already-archived date is left alone: the
 * archive is written once per REPORT_NOW date, on the first build of that day.
 * Titles are auto-derived from the lede; to use a curated headline, run
 *   node scripts/archive-briefing.mjs --title "..." --force
 */
import { execFile } from "node:child_process";
import path from "node:path";

const DASHBOARD = "src/components/WorldConflictDebrief.jsx";

export function autoArchivePlugin() {
  let timer = null;
  let running = false;

  const run = (reason) => {
    if (running) return;
    running = true;
    execFile(
      process.execPath,
      [path.join(process.cwd(), "scripts/archive-briefing.mjs")],
      { cwd: process.cwd() },
      (err, stdout, stderr) => {
        running = false;
        const out = String(stdout || "").trim();
        if (err) {
          console.warn(`[auto-archive] failed (${reason}):`, String(stderr || err.message).trim());
        } else if (out) {
          console.log(`[auto-archive] ${out.split("\n")[0]}`);
        }
      },
    );
  };

  const schedule = (reason) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => run(reason), 1500);
  };

  return {
    name: "auto-archive-briefing",
    apply: "serve",
    configureServer(server) {
      schedule("startup");
      server.watcher.on("change", (file) => {
        if (path.resolve(file) === path.resolve(process.cwd(), DASHBOARD)) {
          schedule("dashboard change");
        }
      });
    },
  };
}
