import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { BRIEFINGS } from "@/data/briefings";

const BASE_URL = "https://conflictdash.lovable.app";
const FEED_TITLE = "World Conflict Debrief — Daily Briefings";
const FEED_DESCRIPTION =
  "Live, open-source intelligence on the world's active conflicts: Ukraine, Gaza, Iran, Taiwan, the South China Sea and the Americas. Updated twice daily.";

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pubDate(isoDate: string) {
  return new Date(`${isoDate}T12:00:00Z`).toUTCString();
}

export const Route = createFileRoute("/feed.xml")({
  server: {
    handlers: {
      GET: async () => {
        const items = BRIEFINGS.map((b) => {
          const url = `${BASE_URL}/briefing/${b.date}`;
          const content = `<p>${esc(b.lede)}</p><p>${esc(b.body)}</p><p><strong>72-hour watch:</strong> ${esc(b.watch)}</p>`;
          return [
            `  <item>`,
            `    <title>${esc(b.title)}</title>`,
            `    <link>${url}</link>`,
            `    <guid isPermaLink="true">${url}</guid>`,
            `    <pubDate>${pubDate(b.date)}</pubDate>`,
            `    <description>${esc(b.lede)}</description>`,
            `    <content:encoded><![CDATA[${content}]]></content:encoded>`,
            ...b.theaters.map((t) => `    <category>${esc(t)}</category>`),
            `  </item>`,
          ].join("\n");
        });

        const latest = BRIEFINGS[0];

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">`,
          `<channel>`,
          `  <title>${esc(FEED_TITLE)}</title>`,
          `  <link>${BASE_URL}/briefing</link>`,
          `  <description>${esc(FEED_DESCRIPTION)}</description>`,
          `  <language>en-us</language>`,
          latest ? `  <lastBuildDate>${pubDate(latest.date)}</lastBuildDate>` : null,
          `  <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />`,
          `  <image>`,
          `    <url>${BASE_URL}/og-image.png</url>`,
          `    <title>${esc(FEED_TITLE)}</title>`,
          `    <link>${BASE_URL}/briefing</link>`,
          `  </image>`,
          ...items,
          `</channel>`,
          `</rss>`,
        ]
          .filter(Boolean)
          .join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
