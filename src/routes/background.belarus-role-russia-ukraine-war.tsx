import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "What Is Belarus's Role in the Russia-Ukraine War? | World Conflict Debrief";
const DESCRIPTION =
  "From invasion launchpad to nuclear host to reluctant Shahed relay — Belarus's complicated, escalating involvement, explained.";
const URL = "https://conflictdash.lovable.app/background/belarus-role-russia-ukraine-war";
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
  { label: "Feb 2022", value: "Launchpad for Russia's invasion from the north" },
  { label: "2023", value: "Russia deploys tactical nuclear weapons onto Belarusian soil" },
  { label: "Dec 30, 2025", value: "Oreshnik missile declared 'on combat duty'" },
  { label: "Jun 19-22, 2026", value: "Ultimatum, then Shahed drone relay halted" },
  { label: "Jun 26-27, 2026", value: "Secret Putin-Lukashenko summit at Valdai" },
  { label: "Combat role", value: "None — no Belarusian troops in Ukraine" },
];

const SECTIONS = [
  {
    h: "The launchpad that never became a combatant",
    p: "Belarus's President Alexander Lukashenko allowed Russian forces to stage the entire northern axis of the February 2022 invasion from Belarusian territory, aimed at Kyiv. But Belarusian troops themselves never crossed into Ukraine in a combat role — a distinction Lukashenko has maintained carefully for over three years, giving him deniability while still functioning as an indispensable rear base.",
  },
  {
    h: "Hosting Russia's nuclear weapons",
    p: "In 2023, Russia moved tactical nuclear weapons onto Belarusian soil for the first time since the Soviet collapse — a symbolic and practical escalation that put NATO's eastern flank within much shorter strike range. Belarus later declared its Oreshnik intermediate-range missile system \"on combat duty\" in December 2025, and Russia used it to strike Lviv in January 2026, demonstrating the system's operational reach from Belarusian and Russian launch points alike.",
  },
  {
    h: "The Shahed relay and the June 2026 ultimatum",
    p: "Belarus has served as a transit and relay point for Iranian-designed Shahed attack drones launched at Ukraine — allowing Russia to route strikes through Belarusian airspace, straining Ukraine's air defense along an additional axis. On Jun 19, 2026, Zelensky issued Ukraine a seven-day ultimatum demanding Belarus stop the relay; three days later, Belarus announced a shutdown, a rare instance of Minsk stepping back rather than escalating.",
  },
  {
    h: "Squeezed between Moscow and Beijing",
    p: 'Since the relay shutdown, Lukashenko\u2019s position has looked less like defiance and more like a leader managing competing pressures. He held a secret two-day summit with Putin at Putin\u2019s private residence in late June 2026 \u2014 reportedly used to press Belarus toward opening a second front against Ukraine, which Lukashenko has so far resisted. Days later, he traveled to Beijing to meet Xi Jinping, and by early July was publicly telling Belarusians "no one will send you into this slaughter" \u2014 his most explicit public statement yet against direct Belarusian participation. A second Putin-Lukashenko meeting in late July, alongside a visit from Russian Defense Minister Belousov, suggests the pressure campaign continues.',
  },
];

const FAQS = [
  {
    q: "Are Belarusian troops fighting in Ukraine?",
    a: "No — Belarus has provided territory, airspace, and logistics support throughout the war, but has not committed its own forces to combat operations inside Ukraine.",
  },
  {
    q: "Does Belarus have nuclear weapons?",
    a: "Belarus hosts Russian tactical nuclear weapons deployed there since 2023; it does not have independent control over them.",
  },
  {
    q: "Why did Belarus stop the Shahed drone relay?",
    a: "Ukraine issued a seven-day ultimatum on Jun 19, 2026 demanding the relay stop; Belarus complied three days later, on Jun 22 — one of the few instances of Minsk yielding to Ukrainian pressure rather than Russian pressure.",
  },
];

export const Route = createFileRoute("/background/belarus-role-russia-ukraine-war")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "belarus russia ukraine war, lukashenko putin, belarus shahed drones, belarus nuclear weapons, belarus second front",
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
          headline: "What Is Belarus's Role in the Russia-Ukraine War?",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Place", name: "Belarus" },
            { "@type": "Thing", name: "Russia-Ukraine war" },
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
  component: BelarusPrimer,
});

function BelarusPrimer() {
  return (
    <main style={{ background: T.bg, color: T.text, fontFamily: FONT, minHeight: "100vh", padding: "28px 16px 64px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <Link to="/" style={{ fontSize: 11, color: "#5b8ec8", textDecoration: "none", fontWeight: 700 }}>
          ← Back to the live conflict dashboard
        </Link>

        <div style={{ marginTop: 18, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent, fontWeight: 800 }}>
          Background Primer · Ukraine
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          What Is Belarus's Role in the Russia-Ukraine War?
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          Belarus never sent its own troops to fight — but it's hosted the invasion, hosted Russian nuclear
          weapons, relayed Iranian-designed drones toward Ukraine, and is now the subject of intense
          pressure from both Moscow and Beijing over which way it tilts next.
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
          , under Ukraine Deep Dive → Belarus Axis.
        </p>

        <p style={{ fontSize: 10, color: T.sub, marginTop: 24, textTransform: "uppercase", letterSpacing: ".12em" }}>
          Unclassified · OSINT · Compiled from open sources (WSJ, ISW, Reuters)
        </p>
      </div>
    </main>
  );
}
