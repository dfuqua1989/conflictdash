import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Red Sea Crisis: Houthi Attacks & Global Shipping Explained | World Conflict Debrief";
const DESCRIPTION =
  "Why Yemen's Houthis are attacking ships in the Red Sea, how the Bab el-Mandeb blockade rerouted global trade, and what it means for energy prices and regional security.";
const URL = "https://conflictdash.lovable.app/background/red-sea-crisis";
const SOCIAL_TITLE = "Red Sea Crisis: Houthi Attacks & Global Shipping Explained | World Conflict Debrief";
const SOCIAL_DESCRIPTION =
  "Why Yemen's Houthis are attacking ships in the Red Sea, how the Bab el-Mandeb blockade rerouted global trade, and what it means for energy prices and regional security.";
const IMAGE = "https://conflictdash.lovable.app/og-red-sea-crisis.jpg";

const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const T = {
  bg: "#0a1017",
  card: "#111a24",
  text: "#cdd8e3",
  sub: "#8496a8",
  border: "rgba(120,150,180,0.20)",
  accent: "#ef4444",
};

const FACTS = [
  { label: "Chokepoint", value: "Bab el-Mandeb" },
  { label: "Narrowest width", value: "~18 nautical miles (29 km)" },
  { label: "Global trade via Suez", value: "~12% of world trade" },
  { label: "Container traffic via Suez", value: "~30% of global boxes" },
  { label: "Rerouting cost", value: "Cape of Good Hope adds ~10–14 days" },
  { label: "Houthi attacks since Nov 2023", value: "100+ vessels targeted" },
];

const TIMELINE = [
  {
    date: "Nov 2023",
    title: "Houthi attacks begin",
    text: "After Hamas's October 7 attack and Israel's response in Gaza, Yemen's Houthis began firing missiles and drones at commercial ships in the Red Sea and Gulf of Aden, declaring they would target any vessel linked to Israel, the US or the UK.",
  },
  {
    date: "Dec 2023",
    title: "Operation Prosperity Guardian",
    text: "The US announced a multinational maritime task force to protect Red Sea shipping. Major container lines began rerouting around Africa, adding thousands of miles and roughly two weeks to Asia-Europe voyages.",
  },
  {
    date: "Jan 2024",
    title: "US-UK strikes on Yemen",
    text: "American and British forces began striking Houthi radar, missile sites and weapons depots in Yemen, recognising that passive defense could not stop the attacks.",
  },
  {
    date: "Feb 2024",
    title: "Rubymar sunk",
    text: "The Belize-flagged, Lebanese-operated bulk carrier Rubymar was hit by a Houthi missile, abandoned, and later sank — the first vessel lost to the crisis. The crew survived, but the event demonstrated that the group could not only disrupt but destroy shipping.",
  },
  {
    date: "2024–2025",
    title: "Stalemate and adaptation",
    text: "Shipping rates and war-risk insurance premiums stayed elevated. Carriers built a two-tier market: some vessels paid higher premiums and transited the Red Sea; others accepted the longer, more expensive Cape route. The Houthis kept firing despite months of airstrikes.",
  },
  {
    date: "Jul 2026",
    title: "Houthis join Iran's maritime embargo",
    text: "During the 2026 US-Iran war, the Houthis announced their own maritime embargo in solidarity with Tehran. On Jul 22 they declared Bab el-Mandeb off-limits to Saudi Arabia, threatening a second chokepoint alongside the Strait of Hormuz.",
  },
  {
    date: "Aug 2026",
    title: "Saudi Arabia and Houthi tensions spike",
    text: "A Houthi attack on a Saudi Aramco refinery and a separate attack on a vessel in Bab el-Mandeb killed several people. The UN warned the risk of a return to full Houthi-Saudi war was the highest since the 2022 truce.",
  },
];

const WHY = [
  {
    h: "There is no cheap alternative",
    p: "Suez handles roughly 12% of world trade and about 30% of global container traffic. Rerouting around the Cape of Good Hope adds roughly 10–14 days, extra fuel, crew wages and insurance. Those costs showed up in freight rates, delivery delays and consumer prices in Europe and North America.",
  },
  {
    h: "Bab el-Mandeb is a natural bottleneck",
    p: "The strait at the southern mouth of the Red Sea is only about 18 nautical miles wide at its narrowest point. Anti-ship missiles, drones and small boats can cover it from the Yemeni coast, giving the Houthis a geographic advantage far beyond their conventional military strength.",
  },
  {
    h: "The Houthis are fighting a different kind of war",
    p: "Yemen's Houthi movement is not a naval power in the traditional sense. It uses cheap drones, ballistic missiles, loitering munitions and speedboats to threaten high-value commercial vessels. The goal is not sea control but economic coercion and political signalling: keep the Gaza war in the headlines, pressure Saudi Arabia and strain US naval resources.",
  },
  {
    h: "The crisis is politically entangled",
    p: "The Red Sea attacks are nominally about Gaza and Israel, but the Houthis also have their own war with Saudi Arabia and a relationship with Iran that is close but not fully controlled. In 2026 the Red Sea front effectively merged with the Hormuz crisis, with Houthi embargoes and Iranian strikes compounding one another.",
  },
];

export const Route = createFileRoute("/background/red-sea-crisis")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "red sea crisis, houthi attacks, bab el mandeb, yemen houthi shipping, suez canal shipping, red sea blockade, operation prosperity guardian, houthi red sea missiles",
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
      { property: "og:image:alt", content: "Map of the Red Sea and Bab el-Mandeb chokepoint" },
      { name: "twitter:image", content: IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Red Sea Crisis: Houthi Attacks & Global Shipping Explained",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Place", name: "Red Sea" },
            { "@type": "Place", name: "Bab el-Mandeb" },
            { "@type": "Thing", name: "Houthi attacks on shipping" },
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
              name: "Why are the Houthis attacking ships in the Red Sea?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Houthis say the attacks are in solidarity with Palestinians and aimed at vessels linked to Israel, the US and the UK. The practical effect has been to disrupt one of the world's busiest shipping lanes, raise insurance costs and force many carriers to reroute around Africa.",
              },
            },
            {
              "@type": "Question",
              name: "How does the Bab el-Mandeb blockade affect global shipping?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Bab el-Mandeb is the southern entrance to the Red Sea and the Suez Canal. Closing it forces most vessels to sail around the Cape of Good Hope, adding roughly 10–14 days, higher fuel costs and delayed deliveries. Because the Suez route carries about 12% of world trade and 30% of global container traffic, the disruption is felt in freight rates and consumer prices.",
              },
            },
            {
              "@type": "Question",
              name: "What is Operation Prosperity Guardian?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Operation Prosperity Guardian is the US-led multinational maritime task force created in late 2023 to protect commercial shipping in the Red Sea. It has intercepted Houthi missiles and drones and conducted defensive patrols, though many carriers still rerouted while attacks continued.",
              },
            },
            {
              "@type": "Question",
              name: "Can the Suez Canal be bypassed?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, by sailing around the Cape of Good Hope at the southern tip of Africa. That route is safe from Houthi weapons but adds thousands of nautical miles, extra fuel, crew time and insurance costs. For some trades the cost is worth it; for time-sensitive goods the delays are significant.",
              },
            },
            {
              "@type": "Question",
              name: "How did the Red Sea crisis connect to the 2026 Iran war?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "In July 2026 the Houthis announced their own maritime embargo in solidarity with Iran and declared Bab el-Mandeb off-limits to Saudi Arabia. This turned a parallel crisis into a second chokepoint threat alongside the Strait of Hormuz, compounding the risk to Gulf and Red Sea shipping simultaneously.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: RedSeaPrimer,
});

function RedSeaPrimer() {
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
          Red Sea Crisis: Houthi Attacks and the Bab el-Mandeb Blockade
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          Since late 2023, Yemen's Houthis have turned the Red Sea into a live maritime conflict
          zone. This primer explains the chokepoint, the shipping shock, the military response, and
          how the 2026 Iran war made the crisis worse.
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
          Why the Red Sea matters
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
          Timeline: from first attacks to the second chokepoint
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
          The key indicators are maritime and commercial, not just military: war-risk insurance
          quotes for Red Sea voyages, the number of container lines still transiting versus rerouting
          around Africa, Houthi claims on shipping traffic, Saudi Aramco and port security alerts, and
          any Houthi-Saudi escalation. In 2026 the Red Sea front is also a Hormuz front: the two
          chokepoints now move together.
        </p>

        <p style={{ fontSize: 12.5, lineHeight: 1.75, color: T.sub }}>
          Live status for the Red Sea and Iran theaters is tracked on the{" "}
          <Link to="/" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            main conflict dashboard
          </Link>
          . For the other major energy chokepoint, see the{" "}
          <Link to="/background/strait-of-hormuz" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            Strait of Hormuz primer
          </Link>
          .
        </p>

        <p style={{ fontSize: 10, color: T.sub, marginTop: 24, textTransform: "uppercase", letterSpacing: ".12em" }}>
          Unclassified · OSINT · Compiled from open sources (UKMTO, US Central Command, Lloyd's List)
        </p>
      </div>
    </main>
  );
}
