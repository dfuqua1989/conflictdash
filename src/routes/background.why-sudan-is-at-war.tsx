import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Why Is Sudan at War? The World's Largest Displacement Crisis Explained | World Conflict Debrief";
const DESCRIPTION =
  "Sudan's civil war between the army and the RSF has displaced more people than any other conflict on Earth — 13.6 million and counting. What started it, why the El Fasher massacre matters, and why the world stopped paying attention.";
const URL = "https://conflictdash.lovable.app/background/why-sudan-is-at-war";

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
    label: "Displaced",
    icon: "🏚️",
    figure: "13.6M",
    color: "#f97316",
    text: "9.3 million displaced inside Sudan, plus 4.3 million refugees in neighboring countries. This is the largest displacement crisis anywhere in the world right now — larger than Ukraine, Gaza, or Syria.",
  },
  {
    label: "Killed",
    icon: "☠️",
    figure: "150K–400K",
    color: "#ef4444",
    text: "Estimates vary enormously by method: ACLED's confirmed-incident count sits near 56,000, while broader mortality modeling that accounts for indirect deaths from disease and starvation runs into the hundreds of thousands.",
  },
  {
    label: "Facing hunger",
    icon: "🍽️",
    figure: "21M",
    color: "#eab308",
    text: "The World Health Organization says 21 million people in Sudan \u201cdesperately\u201d need food. Famine has been formally confirmed in multiple locations since August 2024, starting at the Zamzam displacement camp.",
  },
  {
    label: "El Fasher massacre",
    icon: "💀",
    figure: "60K–150K",
    color: "#dc2626",
    text: "The RSF's October 2025 capture of El Fasher, Darfur's last army stronghold, was accompanied by what multiple rights groups call a genocidal massacre \u2014 among the deadliest single events of the 21st century.",
  },
];

const SECTIONS = [
  {
    h: "It's a fight between two armies, not an army and a rebellion",
    p: "Sudan's war isn't a government fighting an insurgency — it's two organized military forces fighting each other for control of the state itself. The Sudanese Armed Forces (SAF), led by Abdel Fattah al-Burhan, and the Rapid Support Forces (RSF), a paramilitary led by Mohamed Hamdan \u201cHemedti\u201d Dagalo, jointly ran the country after ousting a transitional civilian government in a 2021 coup. That partnership collapsed in April 2023 over a single unresolved question: how, and how fast, to fold the RSF into the regular army. Neither side would give up its own chain of command, and the disagreement turned into open warfare in the capital within days.",
  },
  {
    h: "Where the RSF came from",
    p: "The RSF's origins trace to the Janjaweed militias that carried out mass killings in Darfur in the 2000s, later formalized into a paramilitary force under the Bashir government and eventually built into a parallel army with its own independent funding — gold mining, mostly, along with alleged foreign backing. That gave Hemedti a force capable of genuinely contesting the state rather than simply serving it, which is precisely what made the 2023 rupture so violent: this was never a lopsided fight between a government and a militia.",
  },
  {
    h: "Why the war spread beyond Khartoum",
    p: "Fighting began in the capital but spread quickly to Darfur, Kordofan and beyond as each side sought territory and resources to sustain the war. Darfur in particular became the RSF's stronghold and the site of its worst documented atrocities, echoing the same region's history of mass violence two decades earlier. More than ten external countries have been drawn in, backing one side or the other with weapons, funding or diplomatic cover, which is a major reason repeated US, Saudi and African Union mediation efforts have failed to produce a lasting ceasefire — too many outside parties have a stake in one side winning outright.",
  },
  {
    h: "El Fasher: the war's darkest chapter",
    p: "El Fasher was the Sudanese army's last significant foothold in Darfur, and the RSF besieged it for more than a year before finally capturing it in October 2025. What followed, according to satellite evidence and survivor testimony compiled by multiple human rights organizations, was a mass killing on a scale that puts it among the deadliest single atrocities anywhere this century \u2014 estimates range from 60,000 to as high as 150,000 dead in the days during and after the city fell. The RSF disputes the highest figures. Researchers describe the pattern of killing as genocidal, consistent with the same ethnic-targeting dynamics documented in Darfur during the 2000s.",
  },
  {
    h: "The drone war nobody's tracking closely",
    p: "Sudan's conflict has quietly become one of the world's most drone-saturated wars. Both the SAF and RSF have adopted drone strikes extensively through 2026, and the UN's human rights chief told the Human Rights Council that more than 1,000 civilians were killed in drone strikes in just the first five months of the year \u2014 part of a documented 600 percent year-on-year increase in drone-related deaths. This mirrors a broader global pattern of drones becoming the dominant weapon in conflicts that draw far less international attention than Ukraine's.",
  },
  {
    h: "Why the world stopped watching",
    p: "Sudan's crisis is larger by nearly every humanitarian measure than the wars in Gaza, Syria or Ukraine, yet it receives a fraction of the media coverage and funding response. Analysts and aid officials attribute this partly to the difficulty of reporting from inside an active war zone with almost no functioning infrastructure, and partly to competition for global attention from the simultaneous wars in the Middle East and Europe. The result is what the World Food Programme has called the world \u201cforgetting about its most brutal conflict\u201d even as humanitarian need is projected to reach 33.7 million people \u2014 roughly two-thirds of Sudan's population \u2014 in 2026.",
  },
];

export const Route = createFileRoute("/background/why-sudan-is-at-war")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "why is sudan at war, sudan civil war explained, sudan RSF SAF, el fasher massacre, sudan displacement crisis, sudan war 2026",
      },
      { property: "og:type", content: "article" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Why Is Sudan at War? The World's Largest Displacement Crisis Explained",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Thing", name: "Sudanese civil war" },
            { "@type": "Thing", name: "Rapid Support Forces" },
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
              name: "Why is Sudan at war?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sudan's civil war began in April 2023 when a power-sharing partnership between the Sudanese Armed Forces and the paramilitary Rapid Support Forces collapsed over how to merge the RSF into the regular army. Neither side would give up its own command structure, and the dispute turned into open warfare in Khartoum within days.",
              },
            },
            {
              "@type": "Question",
              name: "How many people have died in the Sudan war?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Estimates range widely by method, from roughly 56,000 confirmed by incident-tracking projects like ACLED to as high as 400,000 in broader mortality estimates that include indirect deaths from disease and starvation.",
              },
            },
            {
              "@type": "Question",
              name: "What happened at El Fasher?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The RSF captured El Fasher, the Sudanese army's last stronghold in Darfur, in October 2025 after a siege of more than a year. Human rights groups describe what followed as a genocidal massacre, with estimates of the dead ranging from 60,000 to as high as 150,000.",
              },
            },
            {
              "@type": "Question",
              name: "Why doesn't Sudan get more media attention?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Aid officials point to the difficulty of reporting from an active war zone with almost no functioning infrastructure, combined with global attention being split between simultaneous wars in Ukraine and the Middle East. Sudan's humanitarian toll exceeds those conflicts by most measures despite receiving far less coverage and funding.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: SudanPrimer,
});

function SudanPrimer() {
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
          Background Primer · Sudan
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          Why Is Sudan at War?
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          13.6 million displaced. Up to 400,000 dead. A massacre in Darfur that may be the deadliest
          single event of the century so far. Sudan's war is the world's largest humanitarian
          crisis, and most people have barely heard of it. Here's why it started and why it hasn't
          stopped.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          The scale, in four numbers
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FIGURES.map((f) => (
            <div
              key={f.label}
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
                <div style={{ fontSize: 13, fontWeight: 700, flex: 1 }}>{f.label}</div>
                <span style={{ fontSize: 20, fontWeight: 800, color: f.color }}>{f.figure}</span>
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
          Sudan is tracked continuously on the{" "}
          <Link to="/" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            main conflict dashboard
          </Link>
          , under Theaters → Africa → Sudan.
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
