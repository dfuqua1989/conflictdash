import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BRIEFINGS, formatBriefingDate, getBriefing } from "@/data/briefings";

const BASE = "https://conflictdash.lovable.app";
const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const T = {
  bg: "#0a1017",
  card: "#111a24",
  text: "#cdd8e3",
  sub: "#8496a8",
  border: "rgba(120,150,180,0.20)",
  accent: "#5b8ec8",
};

export const Route = createFileRoute("/briefing/$date")({
  loader: ({ params }) => {
    const briefing = getBriefing(params.date);
    if (!briefing) throw notFound();
    const i = BRIEFINGS.findIndex((b) => b.date === briefing.date);
    return {
      briefing,
      newer: i > 0 ? BRIEFINGS[i - 1] : null,
      older: i < BRIEFINGS.length - 1 ? BRIEFINGS[i + 1] : null,
    };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Briefing not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const b = loaderData.briefing;
    const url = `${BASE}/briefing/${params.date}`;
    const pretty = formatBriefingDate(b.date);
    const title = `${b.title} — Briefing, ${pretty.replace(/^\w+, /, "")}`;
    const short = title.length > 60 ? `${b.title} — ${b.date}` : title;
    return {
      meta: [
        { title: short },
        { name: "description", content: b.lede.slice(0, 155) },
        { property: "og:type", content: "article" },
        { property: "og:title", content: b.title },
        { property: "og:description", content: b.lede.slice(0, 155) },
        { property: "og:url", content: url },
        { property: "article:published_time", content: `${b.date}T21:00:00Z` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: b.title },
        { name: "twitter:description", content: b.lede.slice(0, 155) },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: b.title,
            description: b.lede,
            datePublished: `${b.date}T21:00:00Z`,
            dateModified: `${b.date}T21:00:00Z`,
            mainEntityOfPage: url,
            author: { "@type": "Organization", name: "World Conflict Debrief" },
            publisher: { "@type": "Organization", name: "World Conflict Debrief" },
            about: b.theaters.map((th) => ({ "@type": "Thing", name: th })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Dashboard", item: BASE },
              { "@type": "ListItem", position: 2, name: "Briefings", item: `${BASE}/briefing` },
              { "@type": "ListItem", position: 3, name: b.date, item: url },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: BriefingNotFound,
  component: BriefingDetail,
});

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main
      style={{
        background: T.bg,
        color: T.text,
        fontFamily: FONT,
        minHeight: "100vh",
        padding: "28px 16px 64px",
      }}
    >
      <div style={{ maxWidth: 780, margin: "0 auto" }}>{children}</div>
    </main>
  );
}

function BriefingNotFound() {
  return (
    <Shell>
      <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 10px" }}>Briefing not found</h1>
      <p style={{ fontSize: 13, color: T.sub, lineHeight: 1.7 }}>
        There's no archived briefing for that date.{" "}
        <Link to="/briefing" style={{ color: T.accent, fontWeight: 700 }}>
          Browse the archive
        </Link>{" "}
        or{" "}
        <Link to="/" style={{ color: T.accent, fontWeight: 700 }}>
          open the live dashboard
        </Link>
        .
      </p>
    </Shell>
  );
}

function BriefingDetail() {
  const { briefing: b, newer, older } = Route.useLoaderData();

  return (
    <Shell>
      <Link to="/briefing" style={{ fontSize: 11, color: T.accent, textDecoration: "none", fontWeight: 700 }}>
        ← All daily briefings
      </Link>

      <div
        style={{
          marginTop: 18,
          fontSize: 10,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          color: T.accent,
          fontWeight: 800,
        }}
      >
        Daily Briefing · {formatBriefingDate(b.date)}
      </div>
      <h1 style={{ fontSize: 26, lineHeight: 1.2, margin: "8px 0 12px", fontWeight: 800 }}>{b.title}</h1>

      <p style={{ fontSize: 14, lineHeight: 1.7, color: T.text, margin: "0 0 16px" }}>{b.lede}</p>

      <div
        style={{
          fontSize: 12.5,
          color: "#f97316",
          background: "rgba(249,115,22,0.08)",
          border: "1px solid rgba(249,115,22,0.2)",
          borderRadius: 10,
          padding: "10px 12px",
          lineHeight: 1.6,
          marginBottom: 18,
        }}
      >
        ⚠️ <strong>72-hour watch:</strong> {b.watch}
      </div>

      <h2 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 10px" }}>Full briefing</h2>
      <section
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          borderRadius: 12,
          padding: "14px 16px",
        }}
      >
        <p style={{ fontSize: 13, lineHeight: 1.75, color: T.sub, margin: 0 }}>{b.body}</p>
      </section>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 14 }}>
        {b.theaters.map((th) => (
          <span
            key={th}
            style={{
              fontSize: 9.5,
              fontWeight: 700,
              color: T.accent,
              border: `1px solid ${T.border}`,
              borderRadius: 6,
              padding: "2px 7px",
            }}
          >
            {th}
          </span>
        ))}
      </div>

      <nav style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 22 }}>
        {older ? (
          <Link
            to="/briefing/$date"
            params={{ date: older.date }}
            style={{ fontSize: 11.5, color: T.accent, fontWeight: 700 }}
          >
            ← {older.date}
          </Link>
        ) : (
          <span />
        )}
        {newer ? (
          <Link
            to="/briefing/$date"
            params={{ date: newer.date }}
            style={{ fontSize: 11.5, color: T.accent, fontWeight: 700 }}
          >
            {newer.date} →
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <p style={{ fontSize: 12.5, lineHeight: 1.75, color: T.sub, marginTop: 22 }}>
        Live figures, maps and timelines for these theaters are on the{" "}
        <Link to="/" style={{ color: T.accent, fontWeight: 700 }}>
          main conflict dashboard
        </Link>
        .
      </p>

      <p
        style={{
          fontSize: 10,
          color: T.sub,
          marginTop: 24,
          textTransform: "uppercase",
          letterSpacing: ".12em",
        }}
      >
        Unclassified · OSINT · Not an independent intelligence product
      </p>
    </Shell>
  );
}
