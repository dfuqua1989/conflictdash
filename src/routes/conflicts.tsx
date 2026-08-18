import { createFileRoute, Link } from "@tanstack/react-router";
import { BRIEFINGS, formatBriefingDate } from "@/data/briefings";

const TITLE = "Every Active War & Conflict Tracked | World Conflict Debrief";
const DESCRIPTION =
  "Index of every conflict tracked here: Ukraine, Iran and Hormuz, Gaza, Taiwan, Sudan, South Asia and the Americas — live deep dives plus background primers.";
const URL = "https://conflictdash.lovable.app/conflicts";

const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const T = {
  bg: "#0a1017",
  card: "#111a24",
  text: "#cdd8e3",
  sub: "#8496a8",
  border: "rgba(120,150,180,0.20)",
  accent: "#5b8ec8",
};

interface Theater {
  name: string;
  blurb: string;
  section: string;
  backgrounders: { label: string; path: string }[];
}

const THEATERS: Theater[] = [
  {
    name: "Ukraine & Russia",
    blurb:
      "Russian personnel and equipment losses, frontline sectors, deep-strike campaigns against Russian energy infrastructure, and the state of negotiations.",
    section: "ukraine",
    backgrounders: [
      { label: "Russian casualties in Ukraine, explained", path: "/background/russian-casualties-ukraine" },
    ],
  },
  {
    name: "Iran & the Strait of Hormuz",
    blurb:
      "The 2026 US-Iran war: the naval blockade, strike-and-counterstrike tempo, Hormuz transit volumes, oil prices, and the collapsed MoU track.",
    section: "iran",
    backgrounders: [{ label: "Strait of Hormuz: a strategic primer", path: "/background/strait-of-hormuz" }],
  },
  {
    name: "Gaza, Lebanon & the Levant",
    blurb:
      "Gaza's ceasefire and humanitarian picture, the Lebanon front and Hezbollah's rebuilt arsenal, and Syria's transition.",
    section: "gaza",
    backgrounders: [
      { label: "Hezbollah's capabilities after the war", path: "/background/hezbollah-capabilities" },
    ],
  },
  {
    name: "Taiwan & the South China Sea",
    blurb:
      "Taiwan Strait pressure operations, South China Sea incidents at Second Thomas Shoal and Scarborough, and the legal fight over the nine-dash line.",
    section: "scs",
    backgrounders: [{ label: "Will China invade Taiwan?", path: "/background/will-china-invade-taiwan" }],
  },
  {
    name: "Great Powers: US, China, Russia",
    blurb:
      "Force posture, nuclear arsenals, NATO cohesion, defense budgets, and the escalation ladders that connect otherwise separate theaters.",
    section: "usmil",
    backgrounders: [
      { label: "Is the US at war?", path: "/background/is-the-us-at-war" },
      { label: "Nuclear weapons by country", path: "/background/nuclear-weapons-by-country" },
      { label: "How close is World War 3?", path: "/background/world-war-3-risk" },
    ],
  },
  {
    name: "Africa: Sudan, DR Congo, Sahel",
    blurb:
      "Sudan's civil war between the army and the RSF, M23's advance in eastern DR Congo, and the Sahel's jihadist insurgencies.",
    section: "africa",
    backgrounders: [{ label: "Why Sudan is at war", path: "/background/why-sudan-is-at-war" }],
  },
  {
    name: "South Asia",
    blurb:
      "The India-Pakistan ceasefire and its stress points, plus the Pakistan-Afghanistan border war with the TTP and Kabul.",
    section: "southasia",
    backgrounders: [
      { label: "Will India and Pakistan go to war again?", path: "/background/will-india-pakistan-go-to-war-again" },
      { label: "The Pakistan-Afghanistan war, explained", path: "/background/pakistan-afghanistan-war-explained" },
    ],
  },
  {
    name: "The Americas",
    blurb:
      "The Venezuela intervention, Cuba's blockade, Mexico's cartel war, Haiti's gang crisis, and Colombia's fractured peace process.",
    section: "venezuela",
    backgrounders: [],
  },
];

export const Route = createFileRoute("/conflicts")({
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
          name: "Every Active War & Conflict Tracked",
          description: DESCRIPTION,
          url: URL,
          hasPart: THEATERS.map((th) => ({
            "@type": "WebPage",
            name: th.name,
            description: th.blurb,
            url: `https://conflictdash.lovable.app/deep-dive/${th.section}`,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "World Conflict Debrief",
              item: "https://conflictdash.lovable.app/",
            },
            { "@type": "ListItem", position: 2, name: "Conflicts", item: URL },
          ],
        }),
      },
    ],
  }),
  component: ConflictsHub,
});

const linkStyle = { color: T.accent, textDecoration: "none", fontWeight: 700 } as const;

function ConflictsHub() {
  const latest = BRIEFINGS[0];

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
        <Link to="/" style={{ ...linkStyle, fontSize: 11 }}>
          ← Back to the live conflict dashboard
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
          Index · All Theaters
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          Every Active War & Conflict Tracked
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          One index for every theater on the dashboard. Each entry links to its live deep dive —
          refreshed with the dashboard — and to the background primers that explain how the conflict
          got here.
        </p>

        {latest ? (
          <div
            style={{
              marginTop: 18,
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              padding: "12px 14px",
              fontSize: 12.5,
              lineHeight: 1.6,
              color: T.sub,
            }}
          >
            <strong style={{ color: T.text }}>Latest briefing —</strong>{" "}
            {formatBriefingDate(latest.date)}: {latest.title}.{" "}
            <Link to="/briefing/$date" params={{ date: latest.date }} style={linkStyle}>
              Read it →
            </Link>{" "}
            <Link to="/briefing" style={linkStyle}>
              Full archive →
            </Link>
          </div>
        ) : null}

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 26 }}>
          {THEATERS.map((th) => (
            <article
              key={th.section}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderLeft: `4px solid ${T.accent}`,
                borderRadius: 12,
                padding: "14px 16px",
              }}
            >
              <h2 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 6px" }}>
                <Link
                  to="/deep-dive/$section"
                  params={{ section: th.section }}
                  style={{ color: T.text, textDecoration: "none" }}
                >
                  {th.name}
                </Link>
              </h2>
              <p style={{ fontSize: 12.5, lineHeight: 1.6, color: T.sub, margin: "0 0 8px" }}>{th.blurb}</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <Link
                  to="/deep-dive/$section"
                  params={{ section: th.section }}
                  style={{ ...linkStyle, fontSize: 11 }}
                >
                  Live deep dive →
                </Link>
                {th.backgrounders.map((b) => (
                  <Link
                    key={b.path}
                    to={b.path}
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: T.accent,
                      textDecoration: "none",
                      border: `1px solid ${T.border}`,
                      borderRadius: 6,
                      padding: "3px 8px",
                    }}
                  >
                    {b.label}
                  </Link>
                ))}
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
