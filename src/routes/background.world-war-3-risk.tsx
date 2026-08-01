import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Are We Heading Toward World War 3? Global Escalation Risk Assessment | World Conflict Debrief";
const DESCRIPTION =
  "A sober, theater-by-theater assessment of global escalation risk in 2026 — Ukraine, Iran, Israel, Taiwan, and the Americas — and why no two nuclear powers are yet in direct combat.";
const URL = "https://conflictdash.lovable.app/background/world-war-3-risk";
const SOCIAL_TITLE = "World War 3 Risk: 2026 Assessment";
const SOCIAL_DESCRIPTION =
  "A theater-by-theater read on global escalation risk in 2026 — Ukraine, Iran, Israel, Taiwan and the Americas — and why no nuclear powers are in direct combat.";
const IMAGE = "https://conflictdash.lovable.app/og-world-war-3-risk.jpg";

const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const T = {
  bg: "#0a1017",
  card: "#111a24",
  text: "#cdd8e3",
  sub: "#8496a8",
  border: "rgba(120,150,180,0.20)",
  accent: "#dc2626",
};

const RISKS = [
  { theater: "Iran – US / Gulf", icon: "🇮🇷", level: "SEVERE", color: "#dc2626", text: "The only theater with sustained direct combat between a nuclear-armed power's forces and a state adversary. Hormuz blockade, a fortified nuclear-site target under explicit threat, and rising US/Iranian casualties push this to the top of the board." },
  { theater: "Russia – Ukraine / NATO", icon: "🇺🇦", level: "ELEVATED", color: "#f97316", text: "Deep NATO-member materiel and licensing involvement without direct NATO-Russia combat. Nuclear rhetoric remains coercive rather than operational per IC consensus — China's tacit red line is the main restraint on Moscow." },
  { theater: "Israel & the Levant", icon: "🇮🇱", level: "ELEVATED", color: "#f97316", text: "Post-ceasefire violence running at a higher tempo than the truce implies, with Lebanon and Syria fronts both live. Contained to regional actors so far." },
  { theater: "Indo-Pacific / Taiwan & SCS", icon: "🇹🇼", level: "MODERATE", color: "#eab308", text: "Grey-zone coercion at record frequency, now extending to Japan's Okinotori. No kinetic engagement between PLA and US/allied forces yet." },
  { theater: "Americas / Venezuela & Cuba", icon: "🇻🇪", level: "MODERATE", color: "#eab308", text: "A US regional-intervention campaign rather than a great-power confrontation — Russia's blockade-running tanker to Havana is the closest brush with direct great-power friction here." },
  { theater: "Global Nuclear Threshold", icon: "☢️", level: "MODERATE", color: "#eab308", text: "New START's Feb 2026 lapse leaves the two largest arsenals uncapped for the first time since 1972. No state has crossed a use-threshold." },
  { theater: "Direct Great-Power Combat", icon: "⚖️", level: "LOW", color: "#22c55e", text: "No US, Russian, or Chinese regular forces are in direct combat with one another anywhere on the board — the line that separates today's tension from an actual world war remains intact." },
];

const SECTIONS = [
  { h: "The question that actually matters", p: "A global escalation assessment has to separate two different questions: how many dangerous fronts are live, and whether any of them involve direct combat between the states whose own war would actually be systemic — the US, Russia, and China. On the first question, the answer is uncomfortably high. On the second, more decisive question, the picture is calmer: no US, Russian, or Chinese regular military unit is presently in direct combat with another nuclear power's regular forces anywhere on the board. That distinction — many live regional wars, zero direct great-power wars — is the single most load-bearing fact in any 'is this becoming World War 3' assessment, and it still holds." },
  { h: "What's changed for the worse", p: "The shared infrastructure underneath every live conflict is eroding. New START's Feb 2026 lapse leaves the US and Russian arsenals uncapped for the first time since 1972. The Iran war is visibly draining the same Patriot/PAC-3 stockpile Ukraine depends on, meaning stress in one theater now measurably degrades deterrence capacity in another. Russian nuclear rhetoric around Ukraine is assessed as coercive signalling rather than operational planning — restrained chiefly by Moscow's need to keep Chinese backing rather than by any formal treaty." },
  { h: "The two variables that would move this assessment", p: "First: whether the Iran war crosses from conventional strikes into an attack on a hardened nuclear site that Tehran has called an explicit red line. Second: whether Taiwan Strait or South China Sea grey-zone friction produces a first kinetic incident between PLA and US/allied forces. Short of either, aggregate risk of a systemic, multi-great-power war is elevated relative to any point since the Cold War's end — but still short of imminent." },
];

export const Route = createFileRoute("/background/world-war-3-risk")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "world war 3, are we at war, world war 3 risk, global escalation, is ww3 happening, nuclear war risk 2026, great power conflict",
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
      { property: "og:image:alt", content: "Abstract world map with glowing conflict hotspots" },
      { name: "twitter:image", content: IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Global Escalation Risk Assessment: Are We Heading Toward World War 3?",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Thing", name: "Global escalation risk" },
            { "@type": "Thing", name: "World War 3" },
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
              name: "Is World War 3 happening in 2026?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No two nuclear-armed states — the US, Russia, or China — currently have their own regular forces in direct combat with one another, which remains the decisive threshold separating today's multiple regional wars from a systemic world war. Several dangerous fronts are simultaneously live, including an active US-Iran shooting war, but that specific threshold has not been crossed.",
              },
            },
            {
              "@type": "Question",
              name: "Which countries are currently at war?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "As of 2026, active conflicts include Russia's war in Ukraine, a US-Iran shooting war centered on Iran's nuclear program and the Strait of Hormuz, post-ceasefire violence in Gaza and Lebanon, and a US regional-intervention campaign in Venezuela and Cuba. Grey-zone tension short of open war continues in the Taiwan Strait and South China Sea.",
              },
            },
            {
              "@type": "Question",
              name: "What would actually trigger a world war?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Analysts point to two realistic triggers: a US or Israeli strike on a hardened Iranian nuclear site crossing Tehran's declared red line, or a kinetic incident between Chinese and US/allied forces in the Taiwan Strait or South China Sea. Either would be the first direct combat between great-power militaries in the current environment.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: EscalationRiskPrimer,
});

function EscalationRiskPrimer() {
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
          Background Primer · Global Escalation
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          Are We Heading Toward World War 3?
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          Multiple regional wars are live at once in 2026 — but the question that actually
          determines whether this becomes systemic is narrower than it looks. This assessment
          separates the two questions and tracks the fronts most likely to change the answer.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          Per-theater risk levels
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {RISKS.map((r) => (
            <div
              key={r.theater}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderLeft: `4px solid ${r.color}`,
                borderRadius: 12,
                padding: "12px 14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <span style={{ fontSize: 18 }}>{r.icon}</span>
                <div style={{ fontSize: 13, fontWeight: 700, flex: 1 }}>{r.theater}</div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: r.color,
                    border: `1px solid ${r.color}`,
                    borderRadius: 6,
                    padding: "2px 8px",
                    letterSpacing: ".05em",
                  }}
                >
                  {r.level}
                </span>
              </div>
              <p style={{ fontSize: 12.5, lineHeight: 1.6, color: T.sub, margin: 0 }}>{r.text}</p>
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
          This assessment synthesizes per-theater data tracked in real time on the{" "}
          <Link to="/" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            main conflict dashboard
          </Link>
          , including a dedicated Escalation Risk tab under Strategic &amp; Hybrid.
        </p>

        <p style={{ fontSize: 10, color: T.sub, marginTop: 24, textTransform: "uppercase", letterSpacing: ".12em" }}>
          Unclassified · OSINT · Not an independent intelligence product — synthesized from
          open-source theater data tracked elsewhere on this site
        </p>
      </div>
    </main>
  );
}
