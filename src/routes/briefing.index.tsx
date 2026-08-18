import { createFileRoute, Link } from "@tanstack/react-router";
import { BRIEFINGS, formatBriefingDate } from "@/data/briefings";

const TITLE = "Daily Conflict Briefing Archive | World Conflict Debrief";
const DESCRIPTION =
  "Archive of daily open-source conflict briefings covering Ukraine, Iran, Gaza, Taiwan and the Caribbean — one dated summary per day.";
const URL = "https://conflictdash.lovable.app/briefing";

const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const T = {
  bg: "#0a1017",
  card: "#111a24",
  text: "#cdd8e3",
  sub: "#8496a8",
  border: "rgba(120,150,180,0.20)",
  accent: "#5b8ec8",
};

export const Route = createFileRoute("/briefing/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Daily Conflict Briefing Archive",
          description: DESCRIPTION,
          url: URL,
          hasPart: BRIEFINGS.map((b) => ({
            "@type": "NewsArticle",
            headline: b.title,
            datePublished: `${b.date}T21:00:00Z`,
            url: `https://conflictdash.lovable.app/briefing/${b.date}`,
          })),
        }),
      },
    ],
  }),
  component: BriefingArchive,
});

function BriefingArchive() {
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
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <Link to="/" style={{ fontSize: 11, color: T.accent, textDecoration: "none", fontWeight: 700 }}>
          ← Back to the live conflict dashboard
        </Link>
        <Link
          to="/conflicts"
          style={{ fontSize: 11, color: T.accent, textDecoration: "none", fontWeight: 700, marginLeft: 14 }}
        >
          All conflicts index →
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
          Archive · Daily Briefings
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          Daily Conflict Briefing Archive
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          Every day the dashboard publishes a synthesized open-source briefing across the active
          theaters. Those briefings are archived here with their original date so they stay readable
          — and findable — after the live dashboard has moved on.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 26 }}>
          {BRIEFINGS.map((b) => (
            <article
              key={b.date}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderLeft: `4px solid ${T.accent}`,
                borderRadius: 12,
                padding: "14px 16px",
              }}
            >
              <div style={{ fontSize: 10, color: T.accent, fontWeight: 800, letterSpacing: ".1em" }}>
                {formatBriefingDate(b.date).toUpperCase()}
              </div>
              <h2 style={{ fontSize: 15, fontWeight: 800, margin: "6px 0 6px" }}>
                <Link
                  to="/briefing/$date"
                  params={{ date: b.date }}
                  style={{ color: T.text, textDecoration: "none" }}
                >
                  {b.title}
                </Link>
              </h2>
              <p style={{ fontSize: 12.5, lineHeight: 1.6, color: T.sub, margin: "0 0 8px" }}>{b.lede}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
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
                <Link
                  to="/briefing/$date"
                  params={{ date: b.date }}
                  style={{ marginLeft: "auto", fontSize: 11, color: T.accent, fontWeight: 700 }}
                >
                  Read the full briefing →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p
          style={{
            fontSize: 10,
            color: T.sub,
            marginTop: 26,
            textTransform: "uppercase",
            letterSpacing: ".12em",
          }}
        >
          Unclassified · OSINT · Not an independent intelligence product
        </p>
      </div>
    </main>
  );
}
