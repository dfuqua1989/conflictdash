import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { BRIEFINGS } from "@/data/briefings";

const BASE_URL = "https://conflictdash.lovable.app";

// Update this date whenever you publish a meaningful dashboard or backgrounder refresh.
// It drives <lastmod> for entries that don't have their own explicit date below.
const LAST_UPDATED = "2026-08-23";

interface SitemapEntry {
  path: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: string;
  // Set lastmod only when this specific page was meaningfully updated.
  // Omit it for evergreen pages you don't touch.
  lastmod?: string;
}

const ENTRIES: SitemapEntry[] = [
  // Homepage — main dashboard
  { path: "/", changefreq: "daily", priority: "1.0", lastmod: LAST_UPDATED },

  // All-conflicts hub
  { path: "/conflicts", changefreq: "weekly", priority: "0.9", lastmod: LAST_UPDATED },

  // Theater reference pages
  { path: "/ukraine-war-map", changefreq: "daily", priority: "0.9", lastmod: LAST_UPDATED },

  // Background primers — evergreen explainers
  { path: "/background/strait-of-hormuz", changefreq: "monthly", priority: "0.7" },
  { path: "/background/hezbollah-capabilities", changefreq: "monthly", priority: "0.7" },
  { path: "/background/world-war-3-risk", changefreq: "weekly", priority: "0.8", lastmod: LAST_UPDATED },
  { path: "/background/russian-casualties-ukraine", changefreq: "weekly", priority: "0.8", lastmod: LAST_UPDATED },
  { path: "/background/will-china-invade-taiwan", changefreq: "weekly", priority: "0.8", lastmod: LAST_UPDATED },
  { path: "/background/nuclear-weapons-by-country", changefreq: "monthly", priority: "0.7", lastmod: LAST_UPDATED },
  { path: "/background/why-sudan-is-at-war", changefreq: "weekly", priority: "0.8", lastmod: LAST_UPDATED },
  { path: "/background/pakistan-afghanistan-war-explained", changefreq: "weekly", priority: "0.8", lastmod: LAST_UPDATED },
  { path: "/background/will-india-pakistan-go-to-war-again", changefreq: "weekly", priority: "0.8", lastmod: LAST_UPDATED },
  { path: "/background/is-the-us-at-war", changefreq: "weekly", priority: "0.8", lastmod: LAST_UPDATED },
  { path: "/background/venezuela-cuba-crisis-explained", changefreq: "weekly", priority: "0.8", lastmod: LAST_UPDATED },
  { path: "/background/is-the-gaza-ceasefire-holding", changefreq: "weekly", priority: "0.8", lastmod: LAST_UPDATED },
  { path: "/background/us-china-great-power-rivalry-explained", changefreq: "weekly", priority: "0.8", lastmod: LAST_UPDATED },
  { path: "/background/drc-m23-conflict-explained", changefreq: "weekly", priority: "0.8", lastmod: LAST_UPDATED },

  // Daily briefing archive
  { path: "/briefing", changefreq: "daily", priority: "0.9", lastmod: LAST_UPDATED },
  ...BRIEFINGS.map((b) => ({
    path: `/briefing/${b.date}`,
    changefreq: "never" as const,
    priority: "0.6",
    lastmod: b.date,
  })),

  // Deep-dive live sections — refreshed with the dashboard
  { path: "/deep-dive/ukraine", changefreq: "daily", priority: "0.9", lastmod: LAST_UPDATED },
  { path: "/deep-dive/usmil", changefreq: "daily", priority: "0.8", lastmod: LAST_UPDATED },
  { path: "/deep-dive/iran", changefreq: "daily", priority: "0.9", lastmod: LAST_UPDATED },
  { path: "/deep-dive/gaza", changefreq: "daily", priority: "0.9", lastmod: LAST_UPDATED },
  { path: "/deep-dive/scs", changefreq: "daily", priority: "0.8", lastmod: LAST_UPDATED },
  { path: "/deep-dive/venezuela", changefreq: "daily", priority: "0.8", lastmod: LAST_UPDATED },
  { path: "/deep-dive/africa", changefreq: "daily", priority: "0.8", lastmod: LAST_UPDATED },
  { path: "/deep-dive/southasia", changefreq: "daily", priority: "0.8", lastmod: LAST_UPDATED },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = ENTRIES.map((e) => {
          const lines = [`  <url>`, `    <loc>${BASE_URL}${e.path}</loc>`];
          if (e.lastmod) lines.push(`    <lastmod>${e.lastmod}</lastmod>`);
          lines.push(`    <changefreq>${e.changefreq}</changefreq>`);
          lines.push(`    <priority>${e.priority}</priority>`);
          lines.push(`  </url>`);
          return lines.join("\n");
        });

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
