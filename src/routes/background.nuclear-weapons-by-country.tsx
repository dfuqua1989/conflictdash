import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "How Many Nuclear Weapons Does Each Country Have? (2026) | World Conflict Debrief";
const DESCRIPTION =
  "Nuclear warhead counts for all nine armed states in 2026, why the numbers are estimates rather than facts, and what changed when New START expired in February leaving the two largest arsenals uncapped for the first time since 1972.";
const URL = "https://conflictdash.lovable.app/background/nuclear-weapons-by-country";
const SOCIAL_TITLE = "Nuclear Weapons by Country (2026)";
const SOCIAL_DESCRIPTION =
  "Warhead counts for all nine nuclear-armed states in 2026, why the totals are estimates, and what changed when New START expired.";
const IMAGE = "https://conflictdash.lovable.app/og-nuclear-weapons-by-country.jpg";

const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const T = {
  bg: "#0a1017",
  card: "#111a24",
  text: "#cdd8e3",
  sub: "#8496a8",
  border: "rgba(120,150,180,0.20)",
  accent: "#8b5cf6",
};

const ARSENALS = [
  { country: "Russia", flag: "🇷🇺", warheads: "~5,580", color: "#ef4444", note: "Around 1,718 deployed strategic. The largest stockpile in the world, and the only one comparable to the American arsenal in size or reach." },
  { country: "United States", flag: "🇺🇸", warheads: "~5,044", color: "#5b8ec8", note: "Around 1,670 deployed strategic. Together with Russia, accounts for roughly 87 percent of every nuclear warhead on Earth." },
  { country: "China", flag: "🇨🇳", warheads: "~620", color: "#eab308", note: "Expanding faster than any other state. The trajectory, rather than the current total, is what drives most strategic planning assumptions about the 2030s." },
  { country: "France", flag: "🇫🇷", warheads: "~290", color: "#8b5cf6", note: "Around 280 deployed across submarine and air legs. An increase was ordered in March 2026, and France stopped publishing figures in the same month." },
  { country: "United Kingdom", flag: "🇬🇧", warheads: "~225", color: "#5b8ec8", note: "Roughly 120 deployed, submarine-only since the retirement of other delivery legs. Specific numbers have not been publicly disclosed since 2021." },
  { country: "India", flag: "🇮🇳", warheads: "~172", color: "#f97316", note: "Not deployed in the ready sense — warheads are stored separately from delivery systems. Declared no-first-use doctrine." },
  { country: "Pakistan", flag: "🇵🇰", warheads: "~170", color: "#22c55e", note: "Non-deployed, assembled on short notice. No declared no-first-use policy." },
  { country: "Israel", flag: "🇮🇱", warheads: "~90", color: "#f97316", note: "Undeclared. Israel maintains deliberate ambiguity and has never officially confirmed possessing nuclear weapons." },
  { country: "North Korea", flag: "🇰🇵", warheads: "~60", color: "#dc2626", note: "Estimated, and revised upward from around 50 in the previous assessment. Withdrew from the Non-Proliferation Treaty in 2003." },
];

const SECTIONS = [
  {
    h: "Roughly 12,250 warheads, held by nine states",
    p: "The global total sits at approximately 12,250 warheads across nine nuclear-armed states. That is a dramatic reduction from the Cold War peak of more than 70,000 in the mid-1980s, and the number has been falling for four decades as older weapons were dismantled. What has changed recently is the direction of travel: the long decline has effectively flattened, and several arsenals are now growing. Two states, Russia and the United States, hold about 87 percent of the total between them, which means that global disarmament arithmetic is overwhelmingly a question about two countries.",
  },
  {
    h: "Why every number here is an estimate",
    p: "No nuclear-armed state publishes a verified, audited inventory. The figures come from research institutions that reconstruct stockpiles from delivery-system counts, fissile-material production histories, treaty declarations, satellite imagery and defence budgets. The uncertainty is not uniform: American and Russian deployed strategic numbers were the best-documented in the world because they were subject to mutual on-site inspection under treaty. Israeli figures are inferred almost entirely from indirect evidence. North Korean figures carry the widest error bars of all. Anyone quoting these totals to the exact warhead is quoting a modelled estimate as if it were a census.",
  },
  {
    h: "The transparency picture got worse in 2026",
    p: "Two of the nine states reduced disclosure in the space of a few years. The United Kingdom stopped publishing specific figures in 2021. France, having ordered an arsenal increase in March 2026, stopped disclosing in the same month. This matters beyond the tidiness of the data: published numbers are themselves a form of reassurance, and withdrawing them signals that a state now sees strategic advantage in opacity. When several states move that way at once, every other state's planning assumptions have to widen to accommodate the uncertainty — which tends to push force requirements up rather than down.",
  },
  {
    h: "What New START's expiry actually changed",
    p: "The last remaining strategic arms control treaty between the United States and Russia lapsed on 5 February 2026 with no replacement. It had capped each side at 1,550 deployed strategic warheads and, just as importantly, provided for mutual on-site inspections and data exchanges. For the first time since 1972, there is no treaty limit on the size of the two largest arsenals. The immediate practical effect is not a build-up — neither side can expand quickly, and both retain large non-deployed reserves they could upload rather than build. The real loss is verification. Each side must now assume the other's capabilities rather than inspect them, and worst-case assumption is the engine of arms races.",
  },
  {
    h: "Deployed, stockpiled and dismantled are different things",
    p: "Headline totals obscure a distinction that matters enormously. A deployed strategic warhead is mounted on a missile or available to aircraft, ready for use in hours. A stockpiled warhead is in storage and would take time to prepare. A retired warhead is queued for dismantlement and is not a usable weapon at all, though it is sometimes counted in the largest published figures. When a source reports Russia at over 5,500 and another reports it at around 1,700, they are usually both correct and describing different categories. The deployed strategic figure is the one that matters for immediate capability; the total stockpile matters for what could be fielded over months.",
  },
  {
    h: "Who is outside the treaty system",
    p: "The Non-Proliferation Treaty has 191 states party and has been the cornerstone of the global regime since 1970. Four of the nine armed states sit outside it: India, Pakistan and Israel never joined, and North Korea withdrew in 2003. This is precisely why those four arsenals are the least documented — non-membership means no declarations, no safeguards and no inspection regime. The treaty's bargain was that non-weapons states forgo nuclear arms in exchange for weapons states pursuing disarmament in good faith. With New START lapsed and several arsenals growing, that second half of the bargain is under more strain than at any point in decades.",
  },
];

export const Route = createFileRoute("/background/nuclear-weapons-by-country")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "nuclear weapons by country, how many nuclear weapons, nuclear arsenal 2026, nuclear warheads list, new start treaty expired, which countries have nuclear weapons",
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
      { property: "og:image:alt", content: "Abstract world map with nuclear hotspot rings" },
      { name: "twitter:image", content: IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How Many Nuclear Weapons Does Each Country Have? (2026)",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Thing", name: "Nuclear weapons" },
            { "@type": "Thing", name: "Nuclear arms control" },
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
              name: "How many nuclear weapons are there in the world?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Approximately 12,250 warheads across nine nuclear-armed states as of 2026 — down sharply from a Cold War peak above 70,000, though the long decline has now largely flattened and several arsenals are growing. Russia and the United States together hold about 87 percent of the global total.",
              },
            },
            {
              "@type": "Question",
              name: "Which countries have nuclear weapons?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Nine states: Russia, the United States, China, France, the United Kingdom, India, Pakistan, Israel and North Korea. Israel has never officially confirmed its arsenal. India, Pakistan and Israel never joined the Non-Proliferation Treaty, and North Korea withdrew from it in 2003.",
              },
            },
            {
              "@type": "Question",
              name: "What happened to the New START treaty?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "New START expired on 5 February 2026 with no replacement. It had capped US and Russian deployed strategic warheads at 1,550 each and provided for mutual on-site inspections. For the first time since 1972 there is no treaty limit on the world's two largest arsenals, and the loss of verification is a more immediate problem than the loss of the numerical cap.",
              },
            },
            {
              "@type": "Question",
              name: "Which country has the most nuclear weapons?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Russia, with an estimated 5,580 warheads in total and around 1,718 deployed strategic warheads, slightly ahead of the United States at roughly 5,044 total and 1,670 deployed.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: NuclearArsenalsPrimer,
});

function NuclearArsenalsPrimer() {
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
          Background Primer · Strategic &amp; Nuclear
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          How Many Nuclear Weapons Does Each Country Have?
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          Roughly 12,250 warheads are held by nine states. Every figure below is a modelled estimate
          rather than a published inventory — and since February 2026, the two largest arsenals have
          been operating without a treaty cap for the first time since 1972.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          Warhead totals by country, 2026
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ARSENALS.map((a) => (
            <div
              key={a.country}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderLeft: `4px solid ${a.color}`,
                borderRadius: 12,
                padding: "12px 14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <span style={{ fontSize: 18 }}>{a.flag}</span>
                <div style={{ fontSize: 13, fontWeight: 700, flex: 1 }}>{a.country}</div>
                <span style={{ fontSize: 15, fontWeight: 800, color: a.color }}>{a.warheads}</span>
              </div>
              <p style={{ fontSize: 12.5, lineHeight: 1.6, color: T.sub, margin: 0 }}>{a.note}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          What the numbers do and don't tell you
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
          Arsenal figures, delivery systems and the treaty picture are tracked continuously on the{" "}
          <Link to="/" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            main conflict dashboard
          </Link>
          , under Strategic &amp; Hybrid → Global Arsenals, Delivery Systems and Treaties &amp;
          Doctrine.
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
