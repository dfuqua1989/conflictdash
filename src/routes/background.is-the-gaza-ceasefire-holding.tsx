import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Is the Gaza Ceasefire Holding? 2026 Status Explained | World Conflict Debrief";
const DESCRIPTION =
  "The October 2025 Gaza ceasefire at a glance: what's held, what's broken down, and where the Board of Peace disarmament plan stands as of August 2026.";
const URL = "https://conflictdash.lovable.app/background/is-the-gaza-ceasefire-holding";
const SOCIAL_TITLE = "Is the Gaza Ceasefire Holding? 2026 Status Explained | World Conflict Debrief";
const SOCIAL_DESCRIPTION =
  "The ceasefire technically holds, but over 1,000 Palestinians have died since it began and the US-backed disarmament roadmap has stalled. Here's the status, timeline, and what to watch.";
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

const STATUS = [
  { label: "Ceasefire status", val: "TECHNICALLY HOLDING", color: "#eab308" },
  { label: "Deaths since ceasefire began", val: "1,000+", color: "#ef4444" },
  { label: "Disarmament roadmap", val: "STALLED", color: "#ef4444" },
  { label: "IDF territorial control", val: "~65% of Gaza", color: "#f97316" },
];

const TIMELINE = [
  { d: "Oct 10, 2025", t: "Ceasefire begins", x: "A fragile ceasefire takes hold following intensive international pressure. Hamas does not disarm as part of the initial deal." },
  { d: "Jan 15, 2026", t: "1,000+ killed post-ceasefire", x: "The UN reports more than 1,000 Palestinians have been killed in Gaza since the October 2025 ceasefire began, despite the truce nominally holding." },
  { d: "May 10, 2026", t: "ICJ orders aid corridor", x: "The International Court of Justice orders Israel to open aid corridors into Gaza. Compliance is only partial." },
  { d: "Jun 20, 2026", t: "UN flash appeal 13% funded", x: "A $4B+ Gaza reconstruction appeal is only 13% funded. Gaza's hospital system is described as collapsed." },
  { d: "Jul 17, 2026", t: "Heaviest fire since the ceasefire", x: "More than 14 people are killed in a single day, including in a strike on a funeral procession. The post-ceasefire death toll passes 1,123. The IDF cites control of roughly 65% of Gaza." },
  { d: "Jul 31, 2026", t: "Board of Peace disarmament agreement announced", x: "Trump announces Hamas has agreed to disarm. Hamas says it won't actually implement the agreement without an Israeli withdrawal first. Israel has not endorsed the plan." },
  { d: "Aug 4, 2026", t: "Netanyahu hardens withdrawal line", x: "Netanyahu says Israel won't withdraw 'from current lines' until Hamas is 'completely disarmed.' The Al-Quds Brigades separately consent to the plan on Aug 2; strikes intensify regardless, with 18 killed on Aug 1 alone." },
  { d: "Aug 9, 2026", t: "Netanyahu rejects Trump's 15-point Gaza roadmap", x: "Netanyahu publicly rejects the US-backed disarmament roadmap at a cabinet meeting, insisting the IDF won't withdraw from any part of Gaza until Hamas is genuinely disarmed — reversing the plan's proposed sequencing. A Board of Peace official says the plan remains 'still operative' regardless." },
  { d: "Aug 14, 2026", t: "Kushner to visit; Houthis strike Aramco refinery", x: "Jared Kushner is expected in Israel and Egypt for Board of Peace talks pushing the Gaza plan forward. Separately, Yemen's Houthis claim a strike on a Saudi Aramco refinery, and the UN warns the risk of renewed Houthi-Saudi war is now the highest since the 2022 truce." },
];

const SECTIONS = [
  {
    h: "\u201cHolding\u201d is doing a lot of work in that sentence",
    p: "The October 2025 ceasefire has not formally collapsed — there's no return to the intensity of open war, and both sides continue to describe it as in effect. But more than 1,000 Palestinians have been killed in Gaza since it began, funding for reconstruction remains critically short, and the Israeli military continues to hold roughly two-thirds of the territory. A ceasefire that hasn't broken down and a ceasefire that's actually stopped the killing are two different things, and this one is closer to the first.",
  },
  {
    h: "The disarmament plan that both sides have rejected, differently",
    p: "The Trump administration's Board of Peace plan was supposed to be the mechanism that converts the ceasefire into something durable: Hamas disarms, Israel withdraws. In practice, Hamas agreed in principle on July 31 but says it won't actually disarm until Israel withdraws first — reversing the plan's intended sequencing. Netanyahu then explicitly rejected that sequencing on August 9, insisting on disarmament before any Israeli withdrawal. Both sides have effectively vetoed the version of the plan the other would accept, while a Board of Peace official maintains the plan is 'still operative.'",
  },
  {
    h: "Why this matters beyond Gaza",
    p: "The same US officials working the Gaza track — chiefly Jared Kushner — are simultaneously involved in Iran and Hormuz diplomacy, meaning bandwidth and leverage are split across theaters. Meanwhile, a Houthi strike on a Saudi Aramco refinery in mid-August and a UN warning about renewed Houthi-Saudi war risk shows the Gaza standoff isn't contained to Gaza — it's one node in a wider regional pressure system that includes Lebanon, Yemen, and the Gulf.",
  },
];

export const Route = createFileRoute("/background/is-the-gaza-ceasefire-holding")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "is the gaza ceasefire holding, gaza ceasefire status, gaza ceasefire 2026, hamas disarmament, board of peace plan, gaza war status, israel hamas ceasefire explained",
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
      { property: "og:image:alt", content: "Map of Gaza and the Levant with conflict status markers" },
      { name: "twitter:image", content: IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Is the Gaza Ceasefire Holding? 2026 Status Explained",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Thing", name: "Gaza ceasefire" },
            { "@type": "Thing", name: "Board of Peace plan" },
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
              name: "Is the Gaza ceasefire still in effect in 2026?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Technically yes — the October 2025 ceasefire has not formally collapsed. But more than 1,000 Palestinians have been killed in Gaza since it began, and the Israeli military continues to hold roughly 65% of the territory, so the practical picture is far short of a stable peace.",
              },
            },
            {
              "@type": "Question",
              name: "Has Hamas disarmed under the Gaza ceasefire?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Hamas agreed in principle to the US-backed Board of Peace disarmament plan on July 31, 2026, but says it will not actually implement disarmament until Israel withdraws first. Israeli Prime Minister Netanyahu rejected that sequencing on August 9, insisting on disarmament before any withdrawal, leaving the plan stalled.",
              },
            },
            {
              "@type": "Question",
              name: "What is the Board of Peace plan?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Board of Peace plan is a US-backed, Trump administration-brokered roadmap intended to convert the Gaza ceasefire into a lasting settlement via Hamas disarmament and phased Israeli withdrawal. As of August 2026 both Hamas and Israel have effectively rejected the version of the sequencing the other would accept.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: GazaCeasefirePrimer,
});

function GazaCeasefirePrimer() {
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
          Background Primer · Israel &amp; the Levant
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          Is the Gaza Ceasefire Holding?
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          The October 2025 truce hasn't collapsed — but it hasn't stopped the killing either, and the
          US-backed disarmament plan meant to make it permanent is now stalled between two
          irreconcilable sequencing demands.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>Status at a glance</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {STATUS.map((s) => (
            <div
              key={s.label}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderLeft: `4px solid ${s.color}`,
                borderRadius: 12,
                padding: "12px 14px",
              }}
            >
              <div style={{ fontSize: 11, color: T.sub, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>

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

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>Timeline since the ceasefire</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {TIMELINE.map((e) => (
            <div
              key={e.d + e.t}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderLeft: `3px solid ${T.accent}`,
                borderRadius: 10,
                padding: "10px 14px",
              }}
            >
              <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 3 }}>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: T.accent, whiteSpace: "nowrap" }}>
                  {e.d}
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 700 }}>{e.t}</span>
              </div>
              <p style={{ fontSize: 12, lineHeight: 1.55, color: T.sub, margin: 0 }}>{e.x}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 12.5, lineHeight: 1.75, color: T.sub, marginTop: 24 }}>
          This status synthesizes the full Gaza event log tracked in real time on the{" "}
          <Link to="/" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            main conflict dashboard
          </Link>
          , under Theaters → Israel &amp; the Levant.
        </p>

        <p style={{ fontSize: 10, color: T.sub, marginTop: 24, textTransform: "uppercase", letterSpacing: ".12em" }}>
          Unclassified · OSINT · Not an independent intelligence product — synthesized from
          open-source theater data tracked elsewhere on this site
        </p>
      </div>
    </main>
  );
}
