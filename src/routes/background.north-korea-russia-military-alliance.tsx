import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "North Korea's Troops in Russia's War, Explained | World Conflict Debrief";
const DESCRIPTION =
  "From the first Kursk deployment to the proposed five-year pact — how deep North Korea's military involvement in Ukraine actually runs.";
const URL = "https://conflictdash.lovable.app/background/north-korea-russia-military-alliance";
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
  accent: "#8b5cf6",
};

const FACTS = [
  { label: "First deployment", value: "~11,000-12,000 troops sent to Kursk, confirmed Oct 2024" },
  { label: "Confirmed casualties", value: "6,000+ killed or wounded (NIS, UK Defence Intelligence)" },
  { label: "Reinforcements", value: "3,000+ additional troops sent Jan-Feb 2025" },
  { label: "Official confirmation", value: "Russia & North Korea jointly confirmed, Apr 26-28, 2025" },
  { label: "Current proposal", value: "5-year (2027-2031) formal military pact" },
  { label: "Legal basis", value: "2024 Russia-DPRK mutual defense treaty" },
];

const SECTIONS = [
  {
    h: "How this started: Kursk, October 2024",
    p: 'Ukraine\u2019s surprise August 2024 incursion into Russia\u2019s Kursk region put Russian territory under sustained occupation for the first time since WWII. Facing a manpower gap it couldn\u2019t fill fast enough, Russia turned to its 2024 mutual defense treaty with North Korea. The first North Korean units \u2014 trained at Russian bases, issued Russian equipment and forged documents attributing them to Russia\u2019s Tuva region \u2014 arrived in the Kursk combat zone by Oct 23, 2024. Both governments denied it for six months before jointly confirming it in April 2025.',
  },
  {
    h: "The casualties were real and significant",
    p: "North Korean troops suffered heavily in their first modern combined-arms war: South Korea\u2019s intelligence service and UK Defence Intelligence both estimated over 6,000 killed or wounded by mid-2026 \u2014 more than half the original deployment. Pyongyang sent reinforcements anyway, including a further 3,000 troops in early 2025, and 1,100 wounded soldiers who\u2019d returned home were reportedly slated to return to the front. Whatever the human cost, Russia has praised the results, and North Korea has gained real combat experience against a modern, drone-saturated battlefield, plus Russian technical assistance upgrading its own weapons systems.",
  },
  {
    h: "From battlefield partner to formal ally",
    p: "By August 2026, the relationship moved beyond ad hoc troop deployment. Russian Defense Minister Belousov traveled to Pyongyang to propose a formal five-year (2027-2031) military cooperation plan \u2014 an attempt to institutionalize what\u2019s so far been a series of individual arrangements. South Korea\u2019s Ministry of National Defence says North Korea continues preparing further troop deployments but has detected no signs one is imminent, following Ukrainian President Zelensky\u2019s claim that Pyongyang was preparing to send up to 50,000 additional troops \u2014 a claim North Korea\u2019s Kim Yo Jong publicly denied.",
  },
  {
    h: "Why this matters beyond Ukraine",
    p: "A formalized Russia-North Korea military pact would be the most significant structural change to North Korea\u2019s alliance posture since the Korean War armistice. It gives Pyongyang a great-power military patron actively at war, hands-on modern combat experience for its officer corps, and \u2014 per US and South Korean assessments \u2014 likely technology transfer covering satellites, submarines, and missile guidance. For Russia, it\u2019s a manpower and artillery-shell pipeline that\u2019s let it sustain offensive operations longer than its own mobilization alone would allow.",
  },
];

const FAQS = [
  {
    q: "How many North Korean troops are actually in Russia right now?",
    a: "Estimates vary; South Korea's NIS put the figure near 11,000 stationed in Kursk Oblast at the start of 2026, with additional reinforcement waves since. No fully current, confirmed total exists.",
  },
  {
    q: "Has North Korea officially admitted this?",
    a: "Yes — both Russia and North Korea confirmed the deployment in exchanged statements on April 26-28, 2025, after six months of denial.",
  },
  {
    q: "Is a new North Korea-Russia treaty actually happening?",
    a: "As of late August 2026, it's a proposal raised by Russia's defense minister, not yet a signed agreement. South Korea's own assessment is that further deployment is being prepared but isn't imminent.",
  },
];

export const Route = createFileRoute("/background/north-korea-russia-military-alliance")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "north korea russia troops, dprk kursk deployment, north korea ukraine war, russia north korea military pact, kim jong un putin alliance",
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
          headline: "North Korea's Troops in Russia's War, Explained",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Thing", name: "North Korea-Russia military cooperation" },
            { "@type": "Place", name: "Kursk Oblast" },
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
  component: NKRussiaPrimer,
});

function NKRussiaPrimer() {
  return (
    <main style={{ background: T.bg, color: T.text, fontFamily: FONT, minHeight: "100vh", padding: "28px 16px 64px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <Link to="/" style={{ fontSize: 11, color: "#5b8ec8", textDecoration: "none", fontWeight: 700 }}>
          ← Back to the live conflict dashboard
        </Link>

        <div style={{ marginTop: 18, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent, fontWeight: 800 }}>
          Background Primer · Great Power Rivalry
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          North Korea's Troops in Russia's War, Explained
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          North Korea has gone from quietly denying involvement to being one of Russia's most important
          wartime partners — supplying troops, artillery shells, and now negotiating a formal five-year
          military pact.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>The numbers</h2>
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
          , under Great Power Rivalry → Escalation & Vectors.
        </p>

        <p style={{ fontSize: 10, color: T.sub, marginTop: 24, textTransform: "uppercase", letterSpacing: ".12em" }}>
          Unclassified · OSINT · Compiled from open sources (NATO, NIS, RFE/RL, NPR, UK MoD)
        </p>
      </div>
    </main>
  );
}
