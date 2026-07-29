import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://conflictdash.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split("T")[0];
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          `  <url>`,
          `    <loc>${BASE_URL}/</loc>`,
          `    <lastmod>${today}</lastmod>`,
          `    <changefreq>daily</changefreq>`,
          `    <priority>1.0</priority>`,
          `  </url>`,
          `  <url>`,
          `    <loc>${BASE_URL}/background/strait-of-hormuz</loc>`,
          `    <lastmod>${today}</lastmod>`,
          `    <changefreq>monthly</changefreq>`,
          `    <priority>0.7</priority>`,
          `  </url>`,
          `  <url>`,
          `    <loc>${BASE_URL}/background/hezbollah-capabilities</loc>`,
          `    <lastmod>${today}</lastmod>`,
          `    <changefreq>monthly</changefreq>`,
          `    <priority>0.7</priority>`,
          `  </url>`,
          `  <url>`,
          `    <loc>${BASE_URL}/background/world-war-3-risk</loc>`,
          `    <lastmod>${today}</lastmod>`,
          `    <changefreq>weekly</changefreq>`,
          `    <priority>0.8</priority>`,
          `  </url>`,
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
