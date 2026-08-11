import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Hezbollah in 2026: Structure & Arsenal Primer";
const DESCRIPTION =
  "Hezbollah's command structure, force strength and rocket arsenal after the 2024 decapitation, and its role as Iran's forward deterrent.";
const URL = "https://conflictdash.lovable.app/background/hezbollah-capabilities";
const SOCIAL_TITLE = "Hezbollah in 2026: Structure & Arsenal";
const SOCIAL_DESCRIPTION =
  "Hezbollah's command structure, force strength and rocket arsenal after the 2024 decapitation — and its role as Iran's forward deterrent.";
const IMAGE = "https://conflictdash.lovable.app/og-hezbollah-capabilities.jpg";

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
  { label: "Founded", value: "1982, during the Israeli occupation of Lebanon" },
  { label: "Active fighters (est., pre-2024)", value: "~20,000–25,000" },
  { label: "Reserve/mobilizable pool (disputed est.)", value: "Up to ~100,000 per some Israeli assessments" },
  { label: "Arsenal (historic peak)", value: "Largest non-state rocket/missile stockpile in the world" },
  { label: "Current Secretary-General", value: "Naim Qassem (since Oct 2024)" },
  { label: "Political wing", value: "Seats in Lebanese Parliament and, at times, cabinet" },
];

const SECTIONS = [
  {
    h: "What it is",
    p: "Hezbollah is a Lebanese Shia Islamist movement that operates as a hybrid organization: a political party holding seats in parliament and, at times, cabinet posts, alongside a separate and far larger military wing. That dual structure is central to why disarmament negotiations are so fraught — the political wing survives any military setback, and Lebanon's fragile sectarian power-sharing system gives it institutional leverage no purely militant group would have.",
  },
  {
    h: "Force structure",
    p: "Independent estimates (IISS, CSIS) put pre-2024 active fighting strength at roughly 20,000–25,000, with a reserve/mobilizable pool cited as high as 100,000 by some Israeli assessments — figures that are inherently uncertain given the group's secrecy. Its arsenal was long described as the largest non-state rocket/missile stockpile in the world, built around large numbers of short-range rockets supplemented by a smaller but more consequential precision-guided missile program developed with Iranian and Syrian assistance.",
  },
  {
    h: "The 2024 degradation",
    p: "The group absorbed the heaviest blow in its history in 2024: the September pager/radio device attacks disabled much of its mid-level command network in a single day, and an Israeli strike weeks later killed longtime Secretary-General Hassan Nasrallah along with most of his senior command tier. Naim Qassem, previously deputy secretary-general, was named successor. CSIS and IISS assessments through 2025–26 describe the precision-missile program and top command structure as substantially degraded, even as the broader rocket stockpile and rank-and-file manpower base remain largely intact.",
  },
  {
    h: "The Iran linkage",
    p: "Hezbollah is the most capable member of what Iran calls its \u2018Axis of Resistance\u2019 and has historically received funding, training and weapons transfers via the IRGC-Quds Force, alongside its own financing streams (diaspora networks, and disputed allegations of illicit trade). Tehran's doctrine of \u2018unity of the fronts\u2019 treats Lebanon as a forward deterrent extending Iran's own reach to Israel's northern border.",
  },
  {
    h: "Why disarmament is the crux",
    p: "Post-2024 diplomatic frameworks have asked Hezbollah to accept verified disarmament as the price of a full Israeli withdrawal from southern Lebanon. That demand asks the group to give up the one asset — its arsenal — that gives its political wing continued leverage inside Lebanon and its patron continued reach toward Israel. That structural bind, more than any single tactical dispute, is why successive rounds of talks have stalled rather than any specific term of a deal.",
  },
];

export const Route = createFileRoute("/background/hezbollah-capabilities")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "hezbollah capabilities, hezbollah military strength, hezbollah rocket arsenal, hezbollah iran, axis of resistance, naim qassem, lebanon israel conflict",
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
      { property: "og:image:alt", content: "Abstract map of Lebanon's terrain — Hezbollah capabilities primer" },
      { name: "twitter:image", content: IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Hezbollah: Strategic Primer",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Organization", name: "Hezbollah" },
            { "@type": "Thing", name: "Israel-Lebanon conflict" },
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
              name: "How large is Hezbollah's military capability?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Independent estimates put pre-2024 active fighting strength at roughly 20,000\u201325,000, with a reserve pool cited as high as 100,000 by some assessments. Its arsenal was long the largest non-state rocket and missile stockpile in the world, though 2024 strikes substantially degraded its precision-missile program and senior command structure.",
              },
            },
            {
              "@type": "Question",
              name: "Is Hezbollah still a threat after the 2024 losses?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, though degraded. The September 2024 pager attacks and the killing of Secretary-General Hassan Nasrallah disabled much of the group's command network and senior leadership. Analysts assess the broader rocket stockpile and rank-and-file manpower base as largely intact even as precision-strike capability and top command were substantially weakened.",
              },
            },
            {
              "@type": "Question",
              name: "What is Hezbollah's relationship with Iran?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Hezbollah is the most capable member of Iran's self-described 'Axis of Resistance' and has historically received funding, training and weapons via the IRGC-Quds Force. Tehran's 'unity of the fronts' doctrine treats Lebanon as a forward deterrent extending Iran's reach to Israel's northern border.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: HezbollahPrimer,
});

function HezbollahPrimer() {
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
        <Link
          to="/"
          style={{ fontSize: 11, color: "#5b8ec8", textDecoration: "none", fontWeight: 700 }}
        >
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
          Background Primer · Israel & the Levant
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          Hezbollah: Structure, Capabilities & Iran&rsquo;s Forward Deterrent
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          A hybrid political-military organization built over four decades, absorbing the heaviest
          blow in its history in 2024 — and still the linchpin of Iran&rsquo;s regional deterrence
          doctrine. This primer covers its structure, disputed force estimates, and why disarmament
          remains the hardest term in any Lebanon settlement.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          The organization by the numbers
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 10,
          }}
        >
          {FACTS.map((f) => (
            <div
              key={f.label}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderLeft: `3px solid ${T.accent}`,
                borderRadius: 12,
                padding: "12px 14px",
              }}
            >
              <div style={{ fontSize: 10, color: T.sub, marginBottom: 3 }}>{f.label}</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{f.value}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          Structure, arsenal & the Iran linkage
        </h2>
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
          Live status for the Israel-Lebanon front, including the post-2024 diplomatic framework and
          disarmament track, is tracked on the{" "}
          <Link to="/" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            main conflict dashboard
          </Link>
          .
        </p>

        <p style={{ fontSize: 10, color: T.sub, marginTop: 24, textTransform: "uppercase", letterSpacing: ".12em" }}>
          Unclassified · OSINT · Compiled from open-source assessments (IISS Military Balance, CSIS,
          Alma Research Center)
        </p>
      </div>
    </main>
  );
}
