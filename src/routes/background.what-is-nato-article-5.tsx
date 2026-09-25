import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "What Is NATO Article 5? | World Conflict Debrief";
const DESCRIPTION =
  "NATO's Article 5 mutual defense clause explained — what it actually obligates, the one time it was invoked, and why it matters for the Ukraine war and Taiwan.";
const URL = "https://conflictdash.lovable.app/background/what-is-nato-article-5";
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
  { label: "What it says", value: "An attack on one member is an attack on all" },
  { label: "Times invoked", value: "Once — after 9/11, in 2001" },
  { label: "Members", value: "32 countries, including the US, UK, France, Germany, Poland" },
  { label: "What it requires", value: "Each member takes 'such action as it deems necessary' — not automatic war" },
  { label: "Ukraine's status", value: "Not a member — Article 5 does not apply to the Ukraine war" },
  { label: "Why it matters", value: "It is the deterrent at the heart of European security" },
];

const SECTIONS = [
  {
    h: "One sentence that holds an alliance together",
    p: "Article 5 of the 1949 North Atlantic Treaty says that an armed attack against one NATO member 'shall be considered an attack against them all.' It is the core promise of the alliance: 32 countries, from the United States to Estonia, are bound to treat an attack on any one of them as an attack on themselves. That promise — not any particular weapon — is what has kept Russia from testing NATO's eastern flank directly.",
  },
  {
    h: "It's not an automatic tripwire to war",
    p: "A common misconception: Article 5 does not legally force any member to declare war. It obligates each ally to take 'such action as it deems necessary, including the use of armed force.' In practice that could mean troops, sanctions, cyber operations, or logistics support. The ambiguity is deliberate — but the political expectation of military backing is what gives the clause its deterrent weight.",
  },
  {
    h: "Invoked exactly once — and not against a state",
    p: "The only invocation in NATO's history came after the September 11, 2001 attacks on the United States. Allies invoked Article 5 in solidarity, and NATO assets supported the campaign in Afghanistan. It has never been invoked against a state actor — not during the Cold War, not over Ukraine, and not over the drone and airspace incidents on the eastern flank in the 2020s.",
  },
  {
    h: "Why it dominates every escalation scenario",
    p: "Article 5 is why a Russian strike on Poland or the Baltics would be a world-changing event while strikes on Ukraine are not. It is also why NATO members calibrate their Ukraine support carefully — avoiding direct NATO-Russia combat that could force an Article 5 decision. And it looms over Asia: Taiwan has no equivalent guarantee, which is precisely what makes the Taiwan Strait more dangerous than the Suwałki Gap.",
  },
];

const FAQS = [
  {
    q: "Does Article 5 mean automatic war if a member is attacked?",
    a: "No. It requires each member to respond as it 'deems necessary,' which can include armed force but is not limited to it. The political commitment to collective defense, however, is treated as ironclad.",
  },
  {
    q: "Does Article 5 protect Ukraine?",
    a: "No. Ukraine is not a NATO member, so the alliance is not treaty-bound to defend it — which is why Western support has taken the form of weapons and funding rather than direct combat.",
  },
  {
    q: "Has Russia ever attacked a NATO member?",
    a: "Not with a direct military strike. There have been airspace violations, drone incursions, cyberattacks, and hybrid operations against members — all deliberately kept below the threshold that would force an Article 5 decision.",
  },
];

export const Route = createFileRoute("/background/what-is-nato-article-5")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "what is nato article 5, nato article 5 explained, nato mutual defense, article 5 ukraine, nato collective defense clause",
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
          headline: "What Is NATO Article 5?",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [{ "@type": "Organization", name: "NATO" }],
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
  component: Article5Primer,
});

function Article5Primer() {
  return (
    <main style={{ background: T.bg, color: T.text, fontFamily: FONT, minHeight: "100vh", padding: "28px 16px 64px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <Link to="/" style={{ fontSize: 11, color: "#5b8ec8", textDecoration: "none", fontWeight: 700 }}>
          ← Back to the live conflict dashboard
        </Link>

        <div style={{ marginTop: 18, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent, fontWeight: 800 }}>
          Background Primer · Alliances
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          What Is NATO Article 5?
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          One sentence in a 1949 treaty is the reason a war in Ukraine hasn't become a war in
          Europe. Here's what it actually says, what it doesn't, and why it matters now.
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
          Live alliance tracking is on the{" "}
          <Link to="/" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            main conflict dashboard
          </Link>
          , under Great Powers → Alliances.
        </p>

        <p style={{ fontSize: 10, color: T.sub, marginTop: 24, textTransform: "uppercase", letterSpacing: ".12em" }}>
          Unclassified · OSINT · Compiled from open sources (NATO, Reuters, IISS)
        </p>
      </div>
    </main>
  );
}
