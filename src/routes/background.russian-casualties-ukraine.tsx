import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "How Many Russian Soldiers Have Died in Ukraine? | World Conflict Debrief";
const DESCRIPTION =
  "Why casualty figures for the Russian army in Ukraine range from 250,000 to over 1.4 million — what each number actually counts, who produces it, and which one to trust.";
const URL = "https://conflictdash.lovable.app/background/russian-casualties-ukraine";
const SOCIAL_TITLE = "Russian Casualties in Ukraine, Explained";
const SOCIAL_DESCRIPTION =
  "Why Russian loss estimates range from 250,000 to 1.4 million — what each figure counts, who publishes it, and which one to trust.";
const IMAGE = "https://conflictdash.lovable.app/og-russian-casualties-ukraine.jpg";

const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const T = {
  bg: "#0a1017",
  card: "#111a24",
  text: "#cdd8e3",
  sub: "#8496a8",
  border: "rgba(120,150,180,0.20)",
  accent: "#ef4444",
};

const FIGURES = [
  {
    source: "Ukrainian General Staff",
    icon: "🇺🇦",
    figure: "1,446,150",
    counts: "KILLED + WOUNDED",
    color: "#ef4444",
    text: "The daily running total published by Kyiv, and by far the most widely circulated figure. Critically, it is a casualty count, not a death count — it combines killed, wounded, missing and captured into one number. Roughly 1,200 to 1,600 are added on an average day. It is the most timely series available and the only one updated daily, but it originates with a belligerent and cannot be independently verified line by line.",
  },
  {
    source: "GCHQ / Western intelligence",
    icon: "🇬🇧",
    figure: "~500,000",
    counts: "KILLED ONLY",
    color: "#f97316",
    text: "British signals intelligence has assessed Russian dead at close to half a million. Intelligence estimates draw on intercepts, satellite imagery, medical and pay records, and are generally regarded as the most methodologically serious figures available — but they are published rarely, without workings, and cannot be audited from outside.",
  },
  {
    source: "Confirmed-name projects",
    icon: "📋",
    figure: "~250,000+",
    counts: "NAMED DEAD ONLY",
    color: "#eab308",
    text: "Independent Russian-language journalism identifies individual dead soldiers by name from obituaries, cemetery surveys, probate records and social media. This is the most rigorous method and the most conservative: every entry is a documented human being. It is also a guaranteed undercount, because a soldier whose death was never publicly recorded never enters the database.",
  },
  {
    source: "Analyst consensus range",
    icon: "⚖️",
    figure: "350,000 – 500,000",
    counts: "RUSSIAN DEAD",
    color: "#8b5cf6",
    text: "Where most independent military analysts land once the different methods are reconciled. The wide band is not evasion — it reflects genuine uncertainty about the ratio of wounded to killed in a war where drone injuries and long casualty-evacuation times have pushed the historical ratio in unusual directions.",
  },
];

const SECTIONS = [
  {
    h: "The number everyone quotes is not a death toll",
    p: "Almost every viral figure about Russian losses traces back to the Ukrainian General Staff's daily bulletin, which currently stands above 1.44 million. That number is real, published daily, and routinely misreported. It counts casualties — killed, wounded, missing and captured together — which in any modern war means the dead are a minority of the total. Applying a conventional wounded-to-killed ratio to that figure produces a death estimate in the low-to-mid hundreds of thousands, which is roughly where independent analysts sit. The gap between '1.4 million losses' and '400,000 dead' is not two sides disagreeing. It is one number being read as if it meant something it never claimed to mean.",
  },
  {
    h: "Three methods, three different questions",
    p: "The figures diverge because they are answers to different questions. A daily general-staff bulletin answers 'how much damage did we inflict', and is produced under wartime information-operations pressure by a participant. An intelligence assessment answers 'what is the true attrition rate', using collection methods that cannot be shown publicly. A confirmed-name database answers 'who can we prove is dead', and deliberately refuses to estimate beyond the evidence. None of the three is dishonest. Each has a structural bias baked into its method — inflation, opacity and undercount respectively — and the useful move is to read all three rather than picking the one that suits an argument.",
  },
  {
    h: "What the equipment losses independently suggest",
    p: "Personnel figures are contested; equipment losses are somewhat easier to corroborate, because destroyed vehicles can be photographed and geolocated. The Ukrainian tallies stand at over 12,200 tanks, more than 25,000 armoured vehicles and over 47,000 artillery systems. Visual-confirmation projects that require photographic proof for every entry consistently record lower totals than official claims, but the ratio between them has stayed fairly stable over three years — which is itself informative. A claim series that stays in a consistent relationship with independently verified evidence is behaving differently from one that is simply invented.",
  },
  {
    h: "Who is actually dying",
    p: "Russian losses are not distributed evenly across Russian society. Reporting through 2026 has repeatedly found that ethnic minorities — Buryats, Tuvans, Chukchi and Nenets among them — and men from the Far North, Far East and Siberia are heavily overrepresented in the dead relative to their share of the population. Moscow and St Petersburg are heavily underrepresented. This reflects both recruitment economics, where a military contract is worth vastly more relative to local wages in poor republics, and deployment patterns that place these units in the most exposed frontline positions.",
  },
  {
    h: "The drone war changed the arithmetic",
    p: "One structural shift makes 2026's casualty figures different in kind from 2022's. Ukrainian drone units reported passing one million verified strikes for the year, with an estimated 193,500 Russian personnel killed or wounded by drone attack alone. If broadly accurate, that means drones — not artillery — now account for the majority of Russian battlefield losses. It also changes the wounded-to-killed ratio: small munitions delivered precisely produce a different injury profile from massed shellfire, and drone-saturated ground makes casualty evacuation far more dangerous, which pushes deaths up among the wounded.",
  },
  {
    h: "What about Ukrainian losses",
    p: "Ukraine publishes far less about its own dead, which is normal for a state under invasion but leaves a real gap. Independent verification work put Ukrainian losses at roughly 96,800 killed plus 97,900 missing as of mid-2026 — around 194,000 dead or unaccounted for, excluding wounded entirely. The missing category is doing heavy work in that figure: a substantial share are presumed dead in territory Ukraine does not control. Any honest comparison of the two sides has to note that the Ukrainian figure is built to a stricter evidentiary standard than the Russian daily bulletin it is often set against.",
  },
];

export const Route = createFileRoute("/background/russian-casualties-ukraine")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "russian casualties ukraine, how many russian soldiers died, russian death toll ukraine, russian losses 2026, ukraine war casualties, russian army deaths",
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
      { property: "og:image:alt", content: "Abstract casualty trend line on a dark chart" },
      { name: "twitter:image", content: IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How Many Russian Soldiers Have Died in Ukraine?",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Thing", name: "Russian military casualties" },
            { "@type": "Thing", name: "Russo-Ukrainian War" },
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
              name: "How many Russian soldiers have died in Ukraine?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Most independent analysts estimate between 350,000 and 500,000 Russian military deaths, with British intelligence assessing close to 500,000 killed. The widely quoted figure of over 1.4 million is not a death toll — it is the Ukrainian General Staff's count of total casualties, combining killed, wounded, missing and captured.",
              },
            },
            {
              "@type": "Question",
              name: "Why do Russian casualty figures vary so much?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The figures answer different questions using different methods. Ukraine's daily bulletin counts all casualties and comes from a belligerent. Western intelligence estimates count deaths but cannot show their workings. Independent confirmed-name projects count only soldiers documented individually by name, which is rigorous but guarantees an undercount.",
              },
            },
            {
              "@type": "Question",
              name: "Are Ukraine's Russian casualty claims reliable?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "They are best treated as an upper bound and a trend indicator rather than a precise count. The daily series has stayed in a fairly consistent relationship with independently verified equipment losses over three years, which suggests it is not fabricated, but it originates with a participant in the war and cannot be audited entry by entry.",
              },
            },
            {
              "@type": "Question",
              name: "How many Ukrainian soldiers have died?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Independent verification work put Ukrainian losses at approximately 96,800 killed and 97,900 missing as of mid-2026 — roughly 194,000 dead or unaccounted for, excluding wounded. A substantial share of the missing are presumed dead in territory Ukraine does not control.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: RussianCasualtiesPrimer,
});

function RussianCasualtiesPrimer() {
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
          Background Primer · Ukraine
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          How Many Russian Soldiers Have Died in Ukraine?
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          Published figures range from about 250,000 to over 1.4 million. They are not all
          measuring the same thing, and the largest number is the one most often misread. Here is
          what each source actually counts.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          The four figures, and what each one measures
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FIGURES.map((f) => (
            <div
              key={f.source}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderLeft: `4px solid ${f.color}`,
                borderRadius: 12,
                padding: "12px 14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 18 }}>{f.icon}</span>
                <div style={{ fontSize: 13, fontWeight: 700, flex: 1 }}>{f.source}</div>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: f.color }}>{f.figure}</span>
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: 800,
                    color: f.color,
                    border: `1px solid ${f.color}`,
                    borderRadius: 6,
                    padding: "2px 8px",
                    letterSpacing: ".05em",
                  }}
                >
                  {f.counts}
                </span>
              </div>
              <p style={{ fontSize: 12.5, lineHeight: 1.6, color: T.sub, margin: 0 }}>{f.text}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          The full explanation
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
          The daily loss series, the derived casualty trend and the equipment breakdown behind this
          page are tracked continuously on the{" "}
          <Link to="/" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            main conflict dashboard
          </Link>
          , under Ukraine → Losses and Ukraine → Manpower.
        </p>

        <p
          style={{
            fontSize: 10,
            color: T.sub,
            marginTop: 24,
            textTransform: "uppercase",
            letterSpacing: ".12em",
          }}
        >
          Unclassified · OSINT · Not an independent intelligence product — synthesized from
          open-source theater data tracked elsewhere on this site
        </p>
      </div>
    </main>
  );
}
