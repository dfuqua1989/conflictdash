import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Will China Invade Taiwan? What the 2026 Indicators Actually Show | World Conflict Debrief";
const DESCRIPTION =
  "An assessment of Chinese military pressure on Taiwan in 2026 — why a blockade is more likely than an amphibious invasion, what the warning indicators would be, and why $1 trillion of global GDP rides on the answer.";
const URL = "https://conflictdash.lovable.app/background/will-china-invade-taiwan";
const SOCIAL_TITLE = "Will China Invade Taiwan? 2026 Indicators";
const SOCIAL_DESCRIPTION =
  "Why a blockade is likelier than an invasion, the warning indicators to watch, and why $1 trillion of global GDP rides on the Taiwan Strait.";
const IMAGE = "https://conflictdash.lovable.app/og-will-china-invade-taiwan.jpg";

const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const T = {
  bg: "#0a1017",
  card: "#111a24",
  text: "#cdd8e3",
  sub: "#8496a8",
  border: "rgba(120,150,180,0.20)",
  accent: "#eab308",
};

const SCENARIOS = [
  {
    name: "Continued grey-zone pressure",
    icon: "🌫️",
    level: "ONGOING",
    color: "#eab308",
    text: "Not a scenario so much as the present reality. Median-line crossings, air-defence identification zone incursions, coast guard patrols and live-fire exercises at a tempo that would have been treated as a crisis in 2020 and is now routine. The strategic point is exhaustion and normalization: each incursion that draws no response resets the baseline slightly higher, wearing down Taiwanese readiness and international attention without ever presenting a single event dramatic enough to trigger a response.",
  },
  {
    name: "Quarantine or blockade",
    icon: "🚢",
    level: "MOST PLAUSIBLE",
    color: "#f97316",
    text: "The scenario most military analysts consider likeliest if Beijing moves. A coast guard-led 'customs inspection' regime around Taiwan would be legally ambiguous by design, deniable as law enforcement rather than war, and extremely hard to counter without firing the first shot. It requires no beach landing, exploits China's overwhelming advantage in hull count, and puts the burden of escalation on Washington and Taipei.",
  },
  {
    name: "Seizure of an offshore island",
    icon: "🏝️",
    level: "PLAUSIBLE",
    color: "#f97316",
    text: "Taking Kinmen, Matsu or the Pratas Islands would be militarily straightforward and politically calibrated — a real seizure of Taiwan-administered territory that falls well short of attacking the main island. It would test the credibility of American commitments at low cost. The risk for Beijing is that it forfeits surprise for the larger objective while galvanizing exactly the international response it wants to avoid.",
  },
  {
    name: "Full amphibious invasion",
    icon: "⚔️",
    level: "LEAST LIKELY NEAR-TERM",
    color: "#22c55e",
    text: "The scenario that dominates public imagination and ranks lowest on most professional assessments for the near term. A contested landing across 130km of open water against a defender on mountainous terrain is among the hardest operations in warfare, and would require a months-long mobilization that is close to impossible to conceal. It is not off the table — it is simply the option with the worst risk-reward for Beijing while cheaper alternatives remain unexhausted.",
  },
];

const SECTIONS = [
  {
    h: "The honest answer to the headline question",
    p: "Nobody outside a very small circle in Beijing knows, and anyone offering a confident date is selling something. What can be assessed is capability, intent signalling and cost — and on those, the picture is clearer than the invasion-countdown genre suggests. China is visibly building the capability. It has not committed to using it. And the specific option people fear most, a full amphibious assault, is the one Beijing has the least reason to choose while cheaper forms of coercion remain available and untried. The more useful question is not 'when is the invasion' but 'what does sustained pressure short of invasion do to Taiwan over a decade'.",
  },
  {
    h: "What actually changed in 2026",
    p: "Pressure around Taiwan has escalated in kind, not just in volume. PLA activity around the island roughly doubled in monthly incident count over the first half of the year, following a 2025 that already saw more than 200 median-line crossings. In February the Eastern Theater Command ran its largest joint patrol exercise since 2023. By June, coast guard patrols were operating east of Taiwan — the far side of the island, not the strait — which is a materially different signal about encirclement. In late July, live-fire drills in the strait were followed immediately by China's first-ever live-fire exercise near Japan's Okinotori, directly contesting a Japanese maritime claim. That last step widens the dispute from a cross-strait matter to a regional one involving a US treaty ally.",
  },
  {
    h: "Why a blockade beats an invasion on Beijing's own logic",
    p: "An invasion requires China to solve the hardest problem in modern warfare while the world watches the build-up for months. A quarantine requires it to solve a paperwork problem. If Chinese coast guard vessels begin inspecting ships bound for Kaohsiung, every responding party faces an unattractive menu: accept the inspection regime and concede the principle, or use force against a law-enforcement vessel and own the first shot. Taiwan imports the overwhelming majority of its energy and much of its food. It does not need to be conquered to be coerced; it needs to be squeezed, and squeezing is cheaper, slower, deniable and reversible in a way that an invasion never is.",
  },
  {
    h: "The semiconductor problem is everyone's problem",
    p: "Taiwan produces roughly 90 percent of the world's most advanced semiconductors — the sub-3-nanometre chips underpinning everything from phones to weapons systems to AI infrastructure. Credible estimates of the global economic shock from a conflict or blockade start above one trillion dollars. This creates the most peculiar feature of the whole standoff: the entire developed world, China very much included, has a concrete material interest in nothing happening. Chinese manufacturing is itself dependent on Taiwanese silicon. That interdependence is not a guarantee of peace — 1914 settled that argument — but it is a real and continuous restraint that has to be weighed against the military trend lines.",
  },
  {
    h: "What the warning indicators would actually be",
    p: "The signals that would matter are unglamorous and mostly logistical. Large-scale requisitioning of civilian roll-on/roll-off ferries for military sealift. Mass movement of blood supplies and field-hospital capacity toward the coast. Reserve call-ups beyond exercise norms. A sustained stockpiling of fuel and munitions in the Eastern Theater. Evacuation of Chinese nationals from Taiwan and the wider region. Sharp changes in the tone of internal propaganda aimed at domestic audiences rather than external ones. Fleets exercising is normal and has been for years. Fleets exercising while the civilian merchant marine is being quietly conscripted is not.",
  },
  {
    h: "How to read the noise",
    p: "Coverage of this subject is unusually poor because the incentives reward alarm. Every incursion is reportable, every anniversary invites a countdown, and specific invasion dates circulate widely on the basis of remarks that were about readiness targets rather than intentions. A readiness deadline is an instruction to be capable by a date. It is not a decision to act on it, and the two get conflated constantly. The defensible position is that the risk is real, rising, and structural — while the specific near-term probability of a full invasion remains lower than the volume of coverage implies.",
  },
];

export const Route = createFileRoute("/background/will-china-invade-taiwan")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "will china invade taiwan, taiwan invasion 2026, china taiwan war, taiwan strait blockade, pla taiwan, taiwan semiconductor conflict, china taiwan tensions",
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
      { property: "og:image:alt", content: "Abstract radar rings around a Taiwan-like island" },
      { name: "twitter:image", content: IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Will China Invade Taiwan? What the 2026 Indicators Actually Show",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Thing", name: "Taiwan Strait" },
            { "@type": "Thing", name: "China Taiwan relations" },
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
              name: "Will China invade Taiwan?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No date can be responsibly forecast. China is building the capability and has escalated military pressure sharply, but a full amphibious invasion is the option most analysts rank as least likely in the near term, because a contested landing across 130km of water is extraordinarily difficult and cheaper coercive options remain available and untried.",
              },
            },
            {
              "@type": "Question",
              name: "What is the most likely China-Taiwan scenario?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A quarantine or blockade led by the Chinese coast guard is widely considered the most plausible move if Beijing acts. It would be deliberately framed as law enforcement rather than war, would be legally ambiguous, and would place the burden of firing first on Taiwan and the United States.",
              },
            },
            {
              "@type": "Question",
              name: "Why does Taiwan matter to the global economy?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Taiwan produces around 90 percent of the world's most advanced semiconductors. Credible estimates put the global economic shock from a conflict or blockade above one trillion dollars, which gives nearly every major economy, including China's, a concrete interest in avoiding escalation.",
              },
            },
            {
              "@type": "Question",
              name: "What are the warning signs of an invasion?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The meaningful indicators are logistical rather than dramatic: mass requisitioning of civilian ferries for sealift, movement of blood supplies and field hospitals toward the coast, reserve call-ups beyond exercise norms, sustained fuel and munitions stockpiling, and evacuation of Chinese nationals from the region.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: TaiwanInvasionPrimer,
});

function TaiwanInvasionPrimer() {
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
          Background Primer · Indo-Pacific
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          Will China Invade Taiwan?
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          Military pressure around Taiwan roughly doubled through the first half of 2026. That is a
          real trend and it is not the same thing as an imminent invasion. This assessment separates
          the four scenarios and sets out what the actual warning indicators would look like.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          Four scenarios, ranked by plausibility
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SCENARIOS.map((s) => (
            <div
              key={s.name}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderLeft: `4px solid ${s.color}`,
                borderRadius: 12,
                padding: "12px 14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                <div style={{ fontSize: 13, fontWeight: 700, flex: 1 }}>{s.name}</div>
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: 800,
                    color: s.color,
                    border: `1px solid ${s.color}`,
                    borderRadius: 6,
                    padding: "2px 8px",
                    letterSpacing: ".05em",
                  }}
                >
                  {s.level}
                </span>
              </div>
              <p style={{ fontSize: 12.5, lineHeight: 1.6, color: T.sub, margin: 0 }}>{s.text}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          The full assessment
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
          PLA incident counts, coast guard activity and the wider regional picture are tracked
          continuously on the{" "}
          <Link to="/" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            main conflict dashboard
          </Link>
          , under South China Sea and Great Power Rivalry.
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
