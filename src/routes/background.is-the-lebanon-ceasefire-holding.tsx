import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Is the Israel-Lebanon Ceasefire Holding? | World Conflict Debrief";
const DESCRIPTION =
  "The November 2024 truce, the March 2026 collapse, the new Trilateral Framework, and why strikes near Nabatieh keep testing it.";
const URL = "https://conflictdash.lovable.app/background/is-the-lebanon-ceasefire-holding";
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
  accent: "#c8313c",
};

const FACTS = [
  { label: "Original ceasefire", value: "Signed Nov 26, 2024; effective Nov 27, 2024" },
  { label: "Collapse", value: "War resumed Mar 2, 2026" },
  { label: "Renewal", value: "New Trilateral Framework agreed Jun 26, 2026" },
  { label: "Aug 15, 2026 strike", value: "At least 11 killed near Nabatieh" },
  { label: "Aug 28, 2026 strike", value: "Newlywed killed 48 hours after wedding" },
  { label: "Core dispute", value: "Hezbollah disarmament vs. Israeli withdrawal" },
];

const SECTIONS = [
  {
    h: "A truce that never actually held",
    p: 'The original Nov 2024 ceasefire required Hezbollah to move north of the Litani River and disarm, while the Lebanese Armed Forces (LAF) took over the south and Israel withdrew. None of that fully happened: Israel continued near-daily strikes and kept five hilltop positions in south Lebanon; Hezbollah continued rearming north of the Litani. By January 2026, Israel had been accused of over 2,000 ceasefire violations. The truce collapsed into renewed war on March 2, 2026.',
  },
  {
    h: "The June 2026 framework: same idea, more mechanism",
    p: 'The Jun 26, 2026 Trilateral Framework tries to fix what the 2024 deal couldn\u2019t: it makes Israeli withdrawal conditional on verified Hezbollah disarmament rather than a parallel, unenforced obligation. It designates "pilot zones" \u2014 starting with the area south of the Litani \u2014 where a four-step process applies: clear non-state weapons, verify clearance via a third party, have the LAF assume sole control, then begin reconstruction. Hezbollah\u2019s leadership immediately called the deal \u201cnull and void.\u201d',
  },
  {
    h: "Why Nabatieh matters right now",
    p: "Since mid-August 2026, Israel has sharply escalated strikes on Hezbollah positions near the Ali al-Taher ridge outside Nabatieh \u2014 a strategic high point south of the Litani. An Aug 15 strike killed at least 11, the worst single incident since the June framework; an Aug 28 strike killed a woman 48 hours after her wedding. Hezbollah has targeted Israeli troops operating in the area in response. This is exactly the kind of sustained, high-casualty exchange that broke the 2024 ceasefire \u2014 happening in the same geography the new framework was designed to stabilize first.",
  },
  {
    h: "The disarmament dispute nobody's bridged",
    p: "The core problem is unchanged from 2024: Israel says withdrawal only follows disarmament; Hezbollah says it won\u2019t disarm under fire and while Israel still occupies territory. The LAF has made real if partial progress \u2014 it announced Phase 1 completion (Litani-to-border zone) in early 2026 and earned CENTCOM praise \u2014 but the IDF says significant Hezbollah infrastructure, including a 200-meter underground site at Majdal Zoun, remains undiscovered or undismantled north of that line.",
  },
];

const FAQS = [
  {
    q: "Is Lebanon at war with Israel right now?",
    a: "Not in the sense of open, declared war \u2014 but the ceasefire renewed in June 2026 is absorbing near-daily strikes, and its predecessor collapsed into a month of open combat starting March 2, 2026.",
  },
  {
    q: "What would actually break the current framework?",
    a: "A sustained run of high-casualty strikes like Aug 15's, or a Hezbollah retaliation that kills Israeli soldiers, are the likeliest triggers \u2014 the same pattern that ended the 2024 truce.",
  },
  {
    q: "Does Hezbollah still have weapons south of the Litani?",
    a: "The LAF says Phase 1 (clearing that zone) is complete; the IDF disputes it, citing specific undiscovered sites. Independent verification hasn't resolved the disagreement.",
  },
];

export const Route = createFileRoute("/background/is-the-lebanon-ceasefire-holding")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "israel lebanon ceasefire, hezbollah disarmament, nabatieh strikes, litani river, trilateral framework lebanon, is lebanon at war",
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
          headline: "Is the Israel-Lebanon Ceasefire Holding?",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Place", name: "Lebanon" },
            { "@type": "Thing", name: "Israel-Hezbollah conflict" },
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
  component: LebanonPrimer,
});

function LebanonPrimer() {
  return (
    <main style={{ background: T.bg, color: T.text, fontFamily: FONT, minHeight: "100vh", padding: "28px 16px 64px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <Link to="/" style={{ fontSize: 11, color: "#5b8ec8", textDecoration: "none", fontWeight: 700 }}>
          ← Back to the live conflict dashboard
        </Link>

        <div style={{ marginTop: 18, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent, fontWeight: 800 }}>
          Background Primer · Middle East
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          Is the Israel-Lebanon Ceasefire Holding?
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          Barely. A ceasefire technically exists, was renewed once after collapsing into open war, and is
          currently absorbing its heaviest strikes since that renewal — while the disarmament dispute
          underneath it hasn't moved.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>Status at a glance</h2>
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
          , under Israel & the Levant → Lebanon Front.
        </p>

        <p style={{ fontSize: 10, color: T.sub, marginTop: 24, textTransform: "uppercase", letterSpacing: ".12em" }}>
          Unclassified · OSINT · Compiled from open sources (peaceagreements.org, FDD, Al Jazeera, ICG)
        </p>
      </div>
    </main>
  );
}
