import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "South China Sea Dispute Explained: Who Claims What | World Conflict Debrief";
const DESCRIPTION =
  "China's nine-dash line, the Philippines' standoff at Second Thomas Shoal, Scarborough Shoal, and why a third of global shipping passes through the most contested water on earth.";
const URL = "https://conflictdash.lovable.app/background/south-china-sea-dispute-explained";

const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const T = {
  bg: "#0a1017",
  card: "#111a24",
  text: "#cdd8e3",
  sub: "#8496a8",
  border: "rgba(120,150,180,0.20)",
  accent: "#5b8ec8",
};

const CLAIMANTS = [
  {
    label: "China",
    icon: "🇨🇳",
    status: "Nine-dash line",
    color: "#ef4444",
    text: "Claims 'indisputable sovereignty' over nearly the entire sea within the nine-dash line, a U-shaped boundary covering roughly 90% of it. Has built and militarized artificial islands in the Spratlys with runways, radars, and missile sites. Rejected the 2016 Hague ruling against it.",
  },
  {
    label: "Philippines",
    icon: "🇵🇭",
    status: "Legal winner, pressured",
    color: "#eab308",
    text: "Won the landmark 2016 arbitration case voiding the nine-dash line under the UN Convention on the Law of the Sea. Still faces daily Chinese coast guard pressure at Second Thomas Shoal — where it maintains troops on the grounded BRP Sierra Madre — and at Scarborough Shoal.",
  },
  {
    label: "Vietnam",
    icon: "🇻🇳",
    status: "Quiet builder",
    color: "#f97316",
    text: "Claims the Spratlys and Paracels on historical grounds and has quietly expanded its own outposts — the second-largest island-building program in the sea, conducted with far less publicity than China's. Occasional standoffs with Chinese survey vessels in its exclusive economic zone.",
  },
  {
    label: "Malaysia, Brunei, Taiwan",
    icon: "🌏",
    status: "Overlapping EEZ claims",
    color: "#5b8ec8",
    text: "Malaysia and Brunei claim slices of the southern Spratlys where the nine-dash line cuts into their exclusive economic zones; Chinese coast guard vessels regularly operate near Malaysian gas projects. Taiwan's claim mirrors China's and it holds Itu Aba, the largest natural Spratly island.",
  },
];

const SECTIONS = [
  {
    h: "What everyone is actually fighting over",
    p: "Three things, in ascending order of importance: fish, hydrocarbons, and geography. The South China Sea holds some of Asia's most contested fishing grounds and significant oil and gas reserves, mostly inside the exclusive economic zones international law assigns to coastal states. But the deeper stakes are positional: roughly a third of global shipping — trillions of dollars of trade annually — transits these waters, and the seabed sits between China's coast and the open Pacific. For Beijing, control of the South China Sea is a buffer protecting its coastline and its trade; for everyone else, Chinese control looks like a toll booth on the world's most important maritime highway, and a platform for projecting power into Southeast Asia.",
  },
  {
    h: "The nine-dash line and the ruling that voided it",
    p: "China's claim rests on the nine-dash line, a boundary drawn on Chinese maps in the 1940s that loops deep into the sea, running in places within 50 miles of other nations' coasts while sitting 1,000 miles from China. In 2016, a tribunal at The Hague ruled the line has no legal basis under the UN Convention on the Law of the Sea — a case brought by the Philippines and decided decisively in Manila's favor. China refused to participate, rejected the verdict as 'a piece of waste paper,' and accelerated the very behavior the ruling condemned: building artificial islands, enforcing its own fishing rules in others' waters, and using its coast guard and maritime militia as a gray-zone enforcement arm that stays just below the threshold of armed conflict.",
  },
  {
    h: "Second Thomas Shoal: the dispute's ground zero",
    p: "The sharpest daily confrontation is at Second Thomas Shoal, a submerged reef inside the Philippines' exclusive economic zone where Manila has maintained a garrison of marines since 1999 — aboard the BRP Sierra Madre, a rusting World War II-era landing ship deliberately grounded on the reef. Every Philippine resupply mission is now a test of wills: Chinese coast guard and militia vessels shadow, block, water-cannon, and occasionally collide with the resupply boats. The reef matters far beyond its size because of the US-Philippines Mutual Defense Treaty — Washington has repeatedly stated that an armed attack on Philippine public vessels, including the coast guard, would invoke it. That makes a collision at Second Thomas Shoal one of the few places on earth where a local scuffle could, in principle, pull in two superpowers.",
  },
  {
    h: "Why it connects to Taiwan",
    p: "The South China Sea dispute and the Taiwan question are usually discussed separately, but militarily they are one problem. China's artificial-island bases in the Spratlys extend its radar, missile, and air coverage southward, complicating any US effort to move forces toward a Taiwan contingency through the Philippine Sea. The Philippines' northernmost islands sit barely 100 miles from Taiwan, and the expanded American access to Philippine bases agreed in recent years is aimed at both theaters at once. Beijing understands the linkage perfectly: pressure in the South China Sea pins down attention and forces, while the nine-dash line's defense perimeter is, in Chinese planning, part of the same map as a Taiwan blockade.",
  },
  {
    h: "Where it stands now",
    p: "The pattern is a stable instability: Chinese pressure operations — water cannons, blocking maneuvers, militia swarms — continue below the war threshold; claimant states protest, document, and occasionally resupply through the blockade; the US and allies run freedom-of-navigation operations and joint patrols to demonstrate the water remains international. Nobody is close to surrendering their claim, nobody is close to enforcing it, and the artificial islands — the one truly irreversible fact created in the last decade — aren't going anywhere. The realistic risk is not a deliberate war but an accident at sea that someone's domestic politics won't let them walk back.",
  },
];

export const Route = createFileRoute("/background/south-china-sea-dispute-explained")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "south china sea dispute, nine-dash line, second thomas shoal, scarborough shoal, spratly islands, philippines china standoff, hague ruling 2016",
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
          headline: "South China Sea Dispute Explained: Who Claims What, and Why",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Thing", name: "South China Sea dispute" },
            { "@type": "Thing", name: "Nine-dash line" },
            { "@type": "Thing", name: "Second Thomas Shoal" },
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
              name: "What is the nine-dash line?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A U-shaped boundary on Chinese maps claiming roughly 90% of the South China Sea, based on asserted historical rights. A 2016 tribunal at The Hague ruled it has no legal basis under the UN Convention on the Law of the Sea; China rejected the ruling.",
              },
            },
            {
              "@type": "Question",
              name: "Why is Second Thomas Shoal important?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "It's a reef inside the Philippines' exclusive economic zone where Manila stations marines on a deliberately grounded ship, the BRP Sierra Madre. Chinese vessels regularly attempt to block resupply missions, and because of the US-Philippines Mutual Defense Treaty, an armed attack there could draw in the United States.",
              },
            },
            {
              "@type": "Question",
              name: "Who claims the South China Sea?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "China claims most of it via the nine-dash line. The Philippines, Vietnam, Malaysia, and Brunei claim portions under their UNCLOS exclusive economic zones, and Taiwan's claim mirrors China's. The disputes overlap across the Spratly and Paracel island groups.",
              },
            },
            {
              "@type": "Question",
              name: "How much trade passes through the South China Sea?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Roughly a third of global shipping — several trillion dollars of trade annually — transits the South China Sea, making it one of the most economically important waterways on earth and the main reason outside powers, including the US, insist it remain international waters.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: SouthChinaSeaDispute,
});

function SouthChinaSeaDispute() {
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
          The South China Sea Dispute, Explained
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          A third of world trade crosses it, six governments claim pieces of it, and a
          water-cannon fight over a beached WWII ship is its most dangerous flashpoint. Here's
          the map of the argument.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          The claimants, and what each actually holds
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {CLAIMANTS.map((e) => (
            <div
              key={e.label}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderLeft: `4px solid ${e.color}`,
                borderRadius: 12,
                padding: "12px 14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 18 }}>{e.icon}</span>
                <div style={{ fontSize: 13, fontWeight: 700, flex: 1 }}>{e.label}</div>
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: 800,
                    color: e.color,
                    border: `1px solid ${e.color}`,
                    borderRadius: 6,
                    padding: "2px 8px",
                    letterSpacing: ".04em",
                    textTransform: "uppercase",
                  }}
                >
                  {e.status}
                </span>
              </div>
              <p style={{ fontSize: 12.5, lineHeight: 1.6, color: T.sub, margin: 0 }}>{e.text}</p>
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
          Incidents in the South China Sea and Taiwan Strait are tracked continuously on the{" "}
          <Link to="/" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            main conflict dashboard
          </Link>
          , under Deep Dive → S. China Sea &amp; Taiwan, alongside our{" "}
          <Link to="/background/will-china-invade-taiwan" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            Taiwan invasion assessment
          </Link>
          .
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
