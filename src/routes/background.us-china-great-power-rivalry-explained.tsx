import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "US-China Great Power Rivalry Explained | World Conflict Debrief";
const DESCRIPTION =
  "The US-China military and strategic balance in 2026: forces compared, the nuclear arsenal race, Indo-Pacific alliances, and why direct combat hasn't happened — yet.";
const URL = "https://conflictdash.lovable.app/background/us-china-great-power-rivalry-explained";
const SOCIAL_TITLE = "US-China Great Power Rivalry Explained | World Conflict Debrief";
const SOCIAL_DESCRIPTION =
  "China has the world's largest navy by hull count and the fastest-growing nuclear arsenal. The US still leads on nearly every other metric. Here's the balance, and why no PLA-US force has fired on the other — yet.";
const IMAGE = "https://conflictdash.lovable.app/og-image.png";

const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const T = {
  bg: "#0a1017",
  card: "#111a24",
  text: "#cdd8e3",
  sub: "#8496a8",
  border: "rgba(120,150,180,0.20)",
  accent: "#ef4444",
};

const COMPARE = [
  { metric: "Active personnel", us: "2.1M", china: "2.0M (PLA-wide) / 3.1M total", edge: "roughly even" },
  { metric: "Navy (hull count)", us: "480 ships", china: "370+ PLAN hulls, world's largest by count", edge: "China" },
  { metric: "Aircraft carriers", us: "11 nuclear carriers", china: "3 (Fujian commissioned Nov 2025)", edge: "US" },
  { metric: "Stealth aircraft", us: "660", china: "350", edge: "US" },
  { metric: "Nuclear warheads", us: "5,042", china: "620, fastest-growing arsenal of any state", edge: "US (but gap narrowing)" },
  { metric: "Defense budget", us: "$895B", china: "$266B", edge: "US" },
];

const SECTIONS = [
  {
    h: "Where China actually leads",
    p: "By raw hull count, the PLA Navy is the world's largest — over 370 vessels versus the US Navy's roughly 480 total ships, though the US fleet includes far more blue-water tonnage and 11 nuclear-powered carriers versus China's three (the newest, Fujian, was commissioned in November 2025 and is still working toward full operational capability). China's nuclear arsenal, while still a fraction of the US and Russian stockpiles at roughly 620 warheads, is expanding faster than any other nuclear state — the metric analysts watch most closely for how the strategic balance shifts this decade. China has also built 350+ new ICBM silos since 2021, a buildout with no real precedent in the post-Cold War era.",
  },
  {
    h: "Where the US still leads decisively",
    p: "On nearly every other conventional metric, the US retains a clear edge: roughly triple the defense budget ($895B vs $266B), nearly double the stealth aircraft fleet, and a global basing network of 750+ overseas installations that gives US forces reach China's PLA doesn't currently match. The nuclear gap also remains wide in absolute terms — the US and Russia each hold roughly 5,000 warheads to China's 620 — though the trajectory, not the snapshot, is what worries planners.",
  },
  {
    h: "The distinction that actually matters: no direct combat",
    p: "Despite record-frequency friction — maritime militia swarms, laser incidents, water-cannon confrontations, and grey-zone coercion across the Taiwan Strait and South China Sea — no PLA unit and no US or allied unit has fired on the other. That's the single most load-bearing fact separating today's tension from an actual war: many live points of friction, zero direct great-power combat. All of the friction described above stays calibrated below the armed-conflict threshold by design on both sides. The risk analysts flag isn't a deliberate PLA decision to fight — it's an accident or miscalculation during an already-dense pattern of close encounters.",
  },
  {
    h: "The alliance structure China doesn't have",
    p: "The US advantage that doesn't show up in a raw hardware comparison is the alliance network: treaty commitments to Japan, South Korea, the Philippines, and Australia, plus deepening informal security cooperation across the Indo-Pacific. China's Indo-Pacific neighborhood, by contrast, includes multiple states with live territorial disputes against it — India, the Philippines, Japan, and Taiwan among them — meaning Beijing's regional posture has to account for potential friction on several fronts simultaneously rather than operating from a secure rear.",
  },
];

export const Route = createFileRoute("/background/us-china-great-power-rivalry-explained")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "us china rivalry explained, us china military comparison, china military power 2026, us china nuclear arsenal, china taiwan military balance, great power competition",
      },
      { property: "og:type", content: "article" },
      { property: "og:title", content: SOCIAL_TITLE },
      { property: "og:description", content: SOCIAL_DESCRIPTION },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SOCIAL_TITLE },
      { name: "twitter:description", content: SOCIAL_DESCRIPTION },
      { property: "og:image", content: IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Map of the Indo-Pacific with US and Chinese military markers" },
      { name: "twitter:image", content: IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "US-China Great Power Rivalry Explained",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Thing", name: "US-China rivalry" },
            { "@type": "Thing", name: "Military balance" },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Does China have a bigger military than the US?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "It depends on the metric. China's navy is the world's largest by hull count (370+ ships vs the US Navy's roughly 480 total ships, though the US fleet has far more blue-water tonnage and 11 nuclear carriers to China's 3). The US leads decisively on defense spending, stealth aircraft, nuclear warheads, and global basing.",
              },
            },
            {
              "@type": "Question",
              name: "Are the US and China at war?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Despite record-frequency friction in the Taiwan Strait and South China Sea, no PLA unit and no US or allied unit has fired on the other. That absence of direct combat remains the key threshold separating today's tension from an actual conflict.",
              },
            },
            {
              "@type": "Question",
              name: "How fast is China's nuclear arsenal growing?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "China's nuclear arsenal, estimated at roughly 620 warheads, is expanding faster than any other nuclear-armed state's, including over 350 new ICBM silos built since 2021. It remains far smaller than the US and Russian arsenals of roughly 5,000 warheads each, but the growth rate is what analysts watch most closely.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: ChinaRivalryPrimer,
});

function ChinaRivalryPrimer() {
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
        <Link to="/" style={{ fontSize: 11, color: "#5b8ec8", textDecoration: "none", fontWeight: 700 }}>
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
          Background Primer · Great Power Rivalry
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          US-China Great Power Rivalry, Explained
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          China has the world's largest navy by hull count and the fastest-growing nuclear
          arsenal. The US still leads on nearly every other metric. Here's the actual balance —
          and why, despite record friction, no shot has been fired between the two.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>Military balance at a glance</h2>
        <Card_Table />

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>The full assessment</h2>
        {SECTIONS.map((s) => (
          <section
            key={s.h}
            style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              padding: "14px 16px",
              marginBottom: 10,
            }}
          >
            <h3 style={{ fontSize: 13, fontWeight: 800, margin: "0 0 6px" }}>{s.h}</h3>
            <p style={{ fontSize: 12.5, lineHeight: 1.7, color: T.sub, margin: 0 }}>{s.p}</p>
          </section>
        ))}

        <p style={{ fontSize: 12.5, lineHeight: 1.75, color: T.sub, marginTop: 24 }}>
          This assessment synthesizes the full military balance and China Deep Dive data tracked in
          real time on the{" "}
          <Link to="/" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            main conflict dashboard
          </Link>
          , under Theaters → Great Power Rivalry, plus the dedicated Taiwan Strait explainer at{" "}
          <Link to="/background/will-china-invade-taiwan" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            /background/will-china-invade-taiwan
          </Link>
          .
        </p>

        <p style={{ fontSize: 10, color: T.sub, marginTop: 24, textTransform: "uppercase", letterSpacing: ".12em" }}>
          Unclassified · OSINT · Not an independent intelligence product — synthesized from
          open-source theater data tracked elsewhere on this site
        </p>
      </div>
    </main>
  );
}

function Card_Table() {
  return (
    <div
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: 12,
        padding: "6px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr 1.4fr 0.9fr",
          padding: "8px 14px",
          fontSize: 10,
          fontWeight: 800,
          color: T.sub,
          textTransform: "uppercase",
          letterSpacing: ".05em",
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div>Metric</div>
        <div>US</div>
        <div>China</div>
        <div>Edge</div>
      </div>
      {COMPARE.map((r, i) => (
        <div
          key={r.metric}
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr 1.4fr 0.9fr",
            padding: "9px 14px",
            fontSize: 11.5,
            borderBottom: i < COMPARE.length - 1 ? `1px solid ${T.border}` : "none",
          }}
        >
          <div style={{ fontWeight: 700 }}>{r.metric}</div>
          <div style={{ color: T.sub }}>{r.us}</div>
          <div style={{ color: T.sub }}>{r.china}</div>
          <div style={{ color: r.edge === "China" ? "#ef4444" : r.edge === "US" ? "#5b8ec8" : "#eab308", fontWeight: 700 }}>
            {r.edge}
          </div>
        </div>
      ))}
    </div>
  );
}
