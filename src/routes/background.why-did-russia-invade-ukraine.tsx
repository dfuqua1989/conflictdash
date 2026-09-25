import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Why Did Russia Invade Ukraine? | World Conflict Debrief";
const DESCRIPTION =
  "The real reasons behind Russia's 2022 full-scale invasion of Ukraine — NATO, empire, resources, and Putin's gamble — and why the war still grinds on.";
const URL = "https://conflictdash.lovable.app/background/why-did-russia-invade-ukraine";
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
  { label: "Feb 24, 2022", value: "Russia launches full-scale invasion from north, east, and south" },
  { label: "Stated aim", value: "'Demilitarization and denazification' — rejected as pretext" },
  { label: "Core driver", value: "Blocking Ukraine's westward drift toward NATO and the EU" },
  { label: "2014 prelude", value: "Crimea annexed; proxy war in the Donbas begins" },
  { label: "Casualties", value: "Combined military losses estimated in the hundreds of thousands" },
  { label: "2026 status", value: "Attritional war along a static front; diplomacy stalled" },
];

const SECTIONS = [
  {
    h: "The official story vs. the real one",
    p: "The Kremlin claimed it invaded to 'demilitarize and denazify' Ukraine and protect Russian speakers — justifications rejected by virtually every independent government and court. The actual drivers were strategic: Putin saw an independent, democratic, westward-leaning Ukraine as an existential threat to his model of rule and to Russia's claim to great-power status. A successful Ukraine next door was intolerable; a subjugated one was the goal.",
  },
  {
    h: "NATO was the trigger, not the cause",
    p: "Russia framed the invasion as a response to NATO expansion. But Ukraine was nowhere near membership in 2022, and the alliance had repeatedly declined to offer a timeline. NATO was the stated red line — the deeper cause was imperial: Putin's own writings deny that Ukraine is a real nation at all. Finland and Sweden's subsequent rush into NATO shows how the invasion produced exactly the outcome Moscow claimed to fear.",
  },
  {
    h: "A gamble that failed in weeks — and a war that never ended",
    p: "The original plan was a decapitation strike: seize Kyiv in days, install a puppet government, present the world with a fait accompli. Ukrainian resistance destroyed that plan within weeks. What followed was a grinding war of attrition — Russia pivoting to the Donbas and south, Ukraine counterattacking with Western weapons, and both sides bleeding manpower and matériel at rates unseen in Europe since 1945.",
  },
  {
    h: "Why it still matters in 2026",
    p: "The war has reshaped the world: European rearmament, a sanctioned and isolated Russian economy tilted toward China, a transformed global energy map, and a live test of whether borders can still be changed by force. Every negotiation over the front line is also a negotiation over the rules of the international order — which is why the outcome matters far beyond Ukraine's borders.",
  },
];

const FAQS = [
  {
    q: "Did NATO expansion cause the war?",
    a: "NATO expansion was Russia's stated justification, but Ukraine had no near-term path to membership in 2022. Most analysts identify Putin's refusal to accept an independent, democratic Ukraine as the core driver.",
  },
  {
    q: "What does Russia actually want now?",
    a: "At minimum: recognition of its territorial gains, Ukrainian neutrality, and limits on Ukraine's military. Ukraine and its backers reject ceding territory, which is why diplomacy has repeatedly stalled.",
  },
  {
    q: "How many people have died?",
    a: "Exact figures are contested, but combined military casualties (killed and wounded) are estimated in the hundreds of thousands, alongside tens of thousands of Ukrainian civilian deaths.",
  },
];

export const Route = createFileRoute("/background/why-did-russia-invade-ukraine")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "why did russia invade ukraine, russia ukraine war causes, putin ukraine 2022, nato expansion ukraine, russia ukraine war explained",
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
          headline: "Why Did Russia Invade Ukraine?",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Place", name: "Ukraine" },
            { "@type": "Place", name: "Russia" },
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
  component: WhyRussiaInvadedPrimer,
});

function WhyRussiaInvadedPrimer() {
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
          Why Did Russia Invade Ukraine?
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          The invasion was years in the making — a mix of imperial ideology, security paranoia,
          and a gamble that Kyiv would fall in days. It didn't. Here's the real story.
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
          , under the Ukraine deep dive.
        </p>

        <p style={{ fontSize: 10, color: T.sub, marginTop: 24, textTransform: "uppercase", letterSpacing: ".12em" }}>
          Unclassified · OSINT · Compiled from open sources (ISW, Reuters, RFE/RL)
        </p>
      </div>
    </main>
  );
}
