import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Strait of Hormuz: Strategic Primer — Chokepoint, Oil Transit & Naval Flashpoints";
const DESCRIPTION =
  "Why the Strait of Hormuz is the world's most important oil chokepoint: transit volumes, geography, Iranian closure threats, and a history of US–Iran naval confrontations from the Tanker War to today.";
const URL = "https://conflictdash.lovable.app/background/strait-of-hormuz";
const SOCIAL_TITLE = "Strait of Hormuz: Oil Chokepoint Primer";
const SOCIAL_DESCRIPTION =
  "Transit volumes, geography, Iranian closure threats and the history of US–Iran naval confrontations at the world's key oil chokepoint.";
const IMAGE = "https://conflictdash.lovable.app/og-strait-of-hormuz.jpg";

const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const T = {
  bg: "#0a1017",
  card: "#111a24",
  text: "#cdd8e3",
  sub: "#8496a8",
  border: "rgba(120,150,180,0.20)",
  accent: "#f97316",
};

const FACTS = [
  { label: "Width at narrowest point", value: "~21 nautical miles (39 km)" },
  { label: "Shipping lanes", value: "Two 2-mile lanes + 2-mile buffer" },
  { label: "Oil transit", value: "~20 million barrels/day" },
  { label: "Share of global oil trade", value: "~20% of world consumption" },
  { label: "LNG transit", value: "~20% of global LNG (mostly Qatari)" },
  { label: "Bordering states", value: "Iran (north), Oman & UAE (south)" },
];

const TIMELINE = [
  {
    date: "1980–1988",
    title: "The Tanker War",
    text: "During the Iran–Iraq War both sides attacked commercial shipping in the Gulf. Over 400 vessels were hit. The US reflagged Kuwaiti tankers under Operation Earnest Will — the largest naval convoy operation since WWII.",
  },
  {
    date: "April 1988",
    title: "Operation Praying Mantis",
    text: "After the frigate USS Samuel B. Roberts struck an Iranian mine, US forces destroyed two Iranian oil platforms and sank or crippled roughly half of Iran's operational navy in a single day — still the largest US surface engagement since 1945.",
  },
  {
    date: "July 1988",
    title: "Iran Air Flight 655",
    text: "USS Vincennes shot down a civilian Iranian airliner over the strait, killing 290. The incident remains a defining grievance in Iranian strategic memory and shapes escalation calculus to this day.",
  },
  {
    date: "2008–2016",
    title: "IRGC Navy swarm era",
    text: "Repeated close-quarters harassment of US warships by IRGC fast attack craft normalized a doctrine of asymmetric swarming: small, fast, cheap boats massed against high-value hulls.",
  },
  {
    date: "2019",
    title: "Limpet mine attacks & drone shootdown",
    text: "Tankers were struck near the Gulf of Oman, Iran downed a US RQ-4 surveillance drone, and the UK seized the Grace 1 tanker — triggering the tit-for-tat seizure of the Stena Impero.",
  },
  {
    date: "2023–2024",
    title: "Seizures and Houthi spillover",
    text: "Iran seized multiple commercial tankers while allied Houthi attacks in the Red Sea demonstrated how a second chokepoint can be closed by proxy, compounding Hormuz risk premiums.",
  },
  {
    date: "2026",
    title: "Blockade and reopening",
    text: "During the 2026 US–Iran confrontation the strait was effectively blockaded before the Islamabad Memorandum lifted restrictions. The episode confirmed that even a short closure repriced global energy within days.",
  },
];

const WHY = [
  {
    h: "There is no adequate bypass",
    p: "Saudi Arabia's East–West pipeline and the UAE's Fujairah line can move roughly 6–7 million barrels a day combined — well under a third of normal Hormuz throughput, and only if both run at full capacity. Kuwait, Qatar, Iraq and Bahrain have no overland alternative at all.",
  },
  {
    h: "Geography favors the defender's disruptor",
    p: "Inbound and outbound lanes hug Omani waters, but the entire strait sits within range of Iranian anti-ship cruise missiles, mines, midget submarines, and shore-based drones dispersed along a 1,000-mile coastline of coves and islands.",
  },
  {
    h: "Closure is a threat, not a plan",
    p: "Iran exports its own crude through the strait and depends on it for imports. Analysts generally treat full closure as self-harming and therefore reserved for regime-survival scenarios; harassment, seizures, and insurance-driven friction are the everyday instruments.",
  },
  {
    h: "The economic shock is global and immediate",
    p: "Even partial disruption raises war-risk insurance, lengthens voyages, and moves Brent by double digits within days. Asia absorbs the largest share — roughly three-quarters of Hormuz crude heads to China, India, Japan and South Korea.",
  },
];

export const Route = createFileRoute("/background/strait-of-hormuz")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "strait of hormuz, hormuz chokepoint, us iran maritime flashpoint, oil transit chokepoint, tanker war, iran navy, persian gulf shipping",
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
      { property: "og:image:alt", content: "Abstract nautical chart of the Strait of Hormuz" },
      { name: "twitter:image", content: IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Strait of Hormuz: Strategic Primer",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Place", name: "Strait of Hormuz" },
            { "@type": "Thing", name: "US–Iran maritime flashpoint" },
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
              name: "Why is the Strait of Hormuz strategically important?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "About 20 million barrels of oil per day — roughly a fifth of global consumption — plus about 20% of the world's LNG transit the strait. At its narrowest it is only 21 nautical miles wide, with shipping lanes just two miles across, and there is no pipeline capacity capable of replacing more than a fraction of that volume.",
              },
            },
            {
              "@type": "Question",
              name: "Can Iran actually close the Strait of Hormuz?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Iran can disrupt traffic quickly using naval mines, anti-ship cruise missiles, drones, midget submarines and IRGC fast attack craft. Sustained closure against US and coalition naval power is far harder, and Iran depends on the strait for its own exports, so full closure is generally treated as a regime-survival option rather than routine policy.",
              },
            },
            {
              "@type": "Question",
              name: "What happens to oil prices if Hormuz is disrupted?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Even partial disruption drives war-risk insurance premiums sharply higher and can move Brent crude by double-digit percentages within days. Asian importers — China, India, Japan and South Korea — take roughly three-quarters of the crude that transits the strait and feel the shock first.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: HormuzPrimer,
});

function HormuzPrimer() {
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
          Background Primer · Middle East
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          Strait of Hormuz: The World&rsquo;s Most Consequential Chokepoint
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          A 21-mile gap between Iran and Oman carries about a fifth of the world&rsquo;s oil. This
          primer explains the geography, the transit economics, and the four decades of naval
          confrontation that make Hormuz the default escalation lever in every US&ndash;Iran crisis.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          The chokepoint by the numbers
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
          Why the strait cannot be replaced
        </h2>
        {WHY.map((w) => (
          <section
            key={w.h}
            style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              padding: "14px 16px",
              marginBottom: 10,
            }}
          >
            <h3 style={{ fontSize: 13, fontWeight: 800, margin: "0 0 6px" }}>{w.h}</h3>
            <p style={{ fontSize: 12.5, lineHeight: 1.7, color: T.sub, margin: 0 }}>{w.p}</p>
          </section>
        ))}

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          A history of naval confrontation
        </h2>
        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {TIMELINE.map((e) => (
            <li
              key={e.date}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderLeft: `3px solid #5b8ec8`,
                borderRadius: 12,
                padding: "13px 16px",
                marginBottom: 10,
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 800, color: "#5b8ec8", letterSpacing: ".08em" }}>
                {e.date}
              </div>
              <h3 style={{ fontSize: 13, fontWeight: 800, margin: "3px 0 5px" }}>{e.title}</h3>
              <p style={{ fontSize: 12.5, lineHeight: 1.7, color: T.sub, margin: 0 }}>{e.text}</p>
            </li>
          ))}
        </ol>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          What to watch next
        </h2>
        <p style={{ fontSize: 12.5, lineHeight: 1.75, color: T.sub, marginTop: 0 }}>
          The reliable early indicators of a Hormuz crisis are commercial, not military: war-risk
          insurance quotes for Gulf voyages, AIS gaps and loitering behaviour near Bandar Abbas and
          Larak Island, GPS spoofing reports from bridge crews, IRGC Navy exercise announcements, and
          tanker rerouting toward Fujairah and Yanbu. Naval escort tasking and carrier positioning
          usually follow those signals rather than precede them.
        </p>

        <p style={{ fontSize: 12.5, lineHeight: 1.75, color: T.sub }}>
          Live status for the Iranian theater, including maritime enforcement and nuclear talks, is
          tracked on the{" "}
          <Link to="/" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            main conflict dashboard
          </Link>
          .
        </p>

        <p style={{ fontSize: 10, color: T.sub, marginTop: 24, textTransform: "uppercase", letterSpacing: ".12em" }}>
          Unclassified · OSINT · Compiled from open sources (EIA, US Navy historical records, IMO)
        </p>
      </div>
    </main>
  );
}
