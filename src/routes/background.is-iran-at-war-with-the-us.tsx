import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Is Iran at War With the US? | World Conflict Debrief";
const DESCRIPTION =
  "The 2026 US-Iran war explained — the strikes, the Strait of Hormuz, the nuclear question, and where the escalation stands now.";
const URL = "https://conflictdash.lovable.app/background/is-iran-at-war-with-the-us";
const SOCIAL_TITLE = TITLE;
const SOCIAL_DESCRIPTION = DESCRIPTION;
const IMAGE = "https://conflictdash.lovable.app/og-image.png";

const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const T = {
  bg: "#0a1017",
  card: "#111a24",
  text: "#cdd8e3",
  sub: "#8496a8",
  border: "rgba(120,150,180,0.20)",
  accent: "#dc2626",
};

const FACTS = [
  { label: "Status", value: "Active armed conflict between the US and Iran in 2026" },
  { label: "Flashpoint", value: "Strait of Hormuz — ~20% of global oil transits it" },
  { label: "Nuclear file", value: "Strikes hit Iranian nuclear facilities; program degraded, not eliminated" },
  { label: "Proxies", value: "Houthis, Hezbollah remnants, and Iraqi militias still in play" },
  { label: "Oil impact", value: "Brent crude spiking on every Hormuz escalation" },
  { label: "Diplomacy", value: "On-again, off-again channels via intermediaries" },
];

const SECTIONS = [
  {
    h: "Yes — this is a real war, not a standoff",
    p: "The United States and Iran moved from shadow war to open conflict in 2026. US strikes hit Iranian military and nuclear infrastructure, Iran retaliated with missiles and drones against US positions and regional targets, and both sides have sustained direct exchanges rather than fighting purely through proxies. It is not a declared war in the legal sense — but by any operational definition, the two countries are at war.",
  },
  {
    h: "The Strait of Hormuz is the whole ballgame",
    p: "Roughly a fifth of the world's oil passes through the Strait of Hormuz, a chokepoint only about 21 miles wide at its narrowest. Iran's ability to threaten, harass, or mine that shipping lane is its strongest card — every escalation there moves global oil prices within hours. The US Navy's presence in the Gulf exists largely to keep that strait open, and any sustained closure attempt would trigger a much larger American response.",
  },
  {
    h: "The nuclear question didn't go away",
    p: "Strikes on Iranian nuclear facilities set the program back but did not end it. The core dilemma remains: Iran retains the knowledge, much of the buried infrastructure, and the incentive to rebuild — possibly with a stronger case for a weapon than before. Whether the war ends in a negotiated cap on enrichment or a resumed dash toward a bomb is the central unanswered question of the conflict.",
  },
  {
    h: "The proxy network is degraded but not dead",
    p: "Iran's 'Axis of Resistance' has been battered — Hezbollah is a shadow of its 2023 strength, Hamas is shattered, and Assad's fall cut the land bridge. But the Houthis still menace Red Sea shipping, Iraqi militias can still strike US bases, and Iran retains the ability to reconstitute proxy capacity over time. The war's trajectory depends as much on these actors as on Tehran and Washington directly.",
  },
];

const FAQS = [
  {
    q: "Is the US officially at war with Iran?",
    a: "There has been no formal declaration of war, but the two countries are in an active armed conflict in 2026 — direct strikes and retaliations have occurred in both directions.",
  },
  {
    q: "Could Iran close the Strait of Hormuz?",
    a: "Iran could temporarily disrupt traffic with mines, missiles, and fast-attack boats, but sustaining a full closure against the US Navy would be extremely difficult — and attempting it would invite overwhelming retaliation.",
  },
  {
    q: "Did the strikes destroy Iran's nuclear program?",
    a: "No. The strikes degraded facilities and set the program back, but Iran retains the expertise and buried infrastructure to rebuild. The program is delayed, not eliminated.",
  },
];

export const Route = createFileRoute("/background/is-iran-at-war-with-the-us")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "is iran at war with the us, us iran war 2026, strait of hormuz, iran nuclear program, us iran conflict explained",
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
      { name: "twitter:image", content: IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Is Iran at War With the US?",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Place", name: "Iran" },
            { "@type": "Thing", name: "US-Iran conflict" },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: IranWarPrimer,
});

function IranWarPrimer() {
  return (
    <main style={{ background: T.bg, color: T.text, fontFamily: FONT, minHeight: "100vh", padding: "28px 16px 64px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <Link to="/" style={{ fontSize: 11, color: "#5b8ec8", textDecoration: "none", fontWeight: 700 }}>
          ← Back to the live conflict dashboard
        </Link>

        <div style={{ marginTop: 18, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent, fontWeight: 800 }}>
          Background Primer · Iran
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          Is Iran at War With the US?
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          Yes — 2026 turned a decades-long shadow war into open conflict. Here's what happened,
          why the Strait of Hormuz matters more than anything else, and what comes next.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>At a glance</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 10 }}>
          {FACTS.map((f) => (
            <div key={f.label} style={{ background: T.card, border: `1px solid ${T.border}`, borderLeft: `3px solid ${T.accent}`, borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 10, color: T.sub, marginBottom: 3 }}>{f.label}</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{f.value}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>The full explanation</h2>
        {SECTIONS.map((s) => (
          <section key={s.h} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: "14px 16px", marginBottom: 10 }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, margin: "0 0 6px" }}>{s.h}</h3>
            <p style={{ fontSize: 12.5, lineHeight: 1.7, color: T.sub, margin: 0 }}>{s.p}</p>
          </section>
        ))}

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>FAQ</h2>
        {FAQS.map((f) => (
          <section key={f.q} style={{ background: T.card, border: `1px solid ${T.border}`, borderLeft: `3px solid #5b8ec8`, borderRadius: 12, padding: "13px 16px", marginBottom: 10 }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, margin: "0 0 5px" }}>{f.q}</h3>
            <p style={{ fontSize: 12.5, lineHeight: 1.7, color: T.sub, margin: 0 }}>{f.a}</p>
          </section>
        ))}

        <p style={{ fontSize: 12.5, lineHeight: 1.75, color: T.sub, marginTop: 20 }}>
          Live status is tracked on the{" "}
          <Link to="/" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            main conflict dashboard
          </Link>
          , under the Iran deep dive.
        </p>

        <p style={{ fontSize: 10, color: T.sub, marginTop: 24, textTransform: "uppercase", letterSpacing: ".12em" }}>
          Unclassified · OSINT · Compiled from open sources (Reuters, ISW, AP)
        </p>
      </div>
    </main>
  );
}
