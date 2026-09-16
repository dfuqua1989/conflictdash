import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Who Are the Houthis? Yemen's Red Sea Power, Explained | World Conflict Debrief";
const DESCRIPTION =
  "The Houthi movement now controls most of Yemen's Red Sea coast, including Mocha, and is closing on the Bab el-Mandeb chokepoint. Who they are, what they want, and what their arsenal can do.";
const URL = "https://conflictdash.lovable.app/background/who-are-the-houthis";

const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const T = {
  bg: "#0a1017",
  card: "#111a24",
  text: "#cdd8e3",
  sub: "#8496a8",
  border: "rgba(120,150,180,0.20)",
  accent: "#5b8ec8",
};

const FACTS = [
  {
    label: "Who they are",
    icon: "🏴",
    status: "Zaydi Shia movement",
    color: "#eab308",
    text: "Formally Ansar Allah ('Supporters of God'), the Houthis are a Zaydi Shia revivalist movement from Yemen's northern Saada province, named after founder Hussein al-Houthi. They seized the capital Sanaa in 2014, triggering the Saudi-led intervention and a civil war that never formally ended.",
  },
  {
    label: "What they control",
    icon: "🗺️",
    status: "Expanding",
    color: "#ef4444",
    text: "The capital Sanaa, most of Yemen's populous north and west, and — since seizing the port of Mocha on Sep 11, 2026 — a growing share of the Red Sea coastline. Roughly 70% of Yemen's population lives under their administration, though the internationally recognized government holds the south and east.",
  },
  {
    label: "Their arsenal",
    icon: "🚀",
    status: "Iran-supplied",
    color: "#f97316",
    text: "Anti-ship ballistic and cruise missiles, one-way attack drones, explosive-laden unmanned surface vessels, and naval mines — much of it Iranian-designed or supplied. They have repeatedly hit commercial shipping and claimed strikes on US naval assets, including unmanned Saildrone-type vessels in the Strait of Hormuz's wider theater.",
  },
  {
    label: "Why it matters",
    icon: "⚓",
    status: "Chokepoint risk",
    color: "#dc2626",
    text: "The Bab el-Mandeb strait between Yemen and Djibouti carries roughly 12% of global trade and a significant share of Europe-Asia container traffic. A force that can credibly threaten it — as the Houthis demonstrated in the 2023-24 Red Sea crisis — holds a lever over the world economy.",
  },
];

const SECTIONS = [
  {
    h: "From mountain insurgency to maritime power",
    p: "The Houthis fought six wars against Yemen's central government between 2004 and 2010, then exploited the state's collapse after the Arab Spring to take Sanaa in 2014. The Saudi- and Emirati-led coalition that intervened in 2015 expected a short campaign; instead it got a grinding, years-long war that hardened the movement into a de facto state with its own tax system, courts, and armed forces. Iranian backing — weapons, training, advisors, and financing — deepened steadily through that period, transforming a local insurgency into the most capable member of Iran's 'Axis of Resistance' after Hezbollah.",
  },
  {
    h: "The Red Sea playbook",
    p: "The movement's modern significance comes from geography. Yemen sits on the Bab el-Mandeb, the narrow strait connecting the Red Sea to the Gulf of Aden — the southern gateway to the Suez Canal. Beginning in late 2023, the Houthis demonstrated they could attack shipping transiting the strait with missiles, drones, and USVs, forcing most major carriers to reroute around Africa at enormous cost. US and allied naval operations degraded but never eliminated that capability, and the 2026 Iran war reopened the question: as Iran came under blockade in the Gulf, its Houthi partners began pressing their own maritime front further south.",
  },
  {
    h: "The 2026 coastal offensive: Mocha and beyond",
    p: "On September 11, 2026, Houthi forces seized Mocha — a historic port city southwest of Taiz — as part of a drive to extend control along Yemen's Red Sea coast. The advance matters less for Mocha itself than for what it approaches: full Houthi control of the Yemeni side of the Bab el-Mandeb would put both banks of one of the world's most important chokepoints within range of its missile and drone arsenal, at the exact moment the Iran war is straining shipping through the Strait of Hormuz 1,500 miles to the northeast. Two maritime chokepoints, two Iran-aligned actors, one simultaneous crisis.",
  },
  {
    h: "What the Houthis actually want",
    p: "Publicly, the movement frames its maritime campaign as solidarity with Gaza and resistance to American and Israeli power. Structurally, its goals are closer to home: international recognition as Yemen's legitimate government, an end to Saudi and Emirati influence, revenue from ports and taxation, and a permanent seat at any negotiating table that decides Yemen's future. Attacking shipping has proven to be an effective way to purchase relevance — every crisis raises the price of ignoring them, and every ceasefire negotiation treats them more like a state than the internationally recognized government they displaced.",
  },
  {
    h: "The limits of their power",
    p: "For all their reach, the Houthis govern one of the poorest territories on earth. Yemen's humanitarian crisis — hunger, collapsed services, a shattered economy — continues under their rule, and their administration depends on coercion and Iranian subsidy. Their missile and drone arsenal is real but finite and heavily dependent on external supply, which the Iran war both enables and constrains. And while they can threaten shipping, they cannot escort it, insure it, or make it come back: the leverage is purely negative, which makes it a weapon best suited to crisis bargaining rather than governance.",
  },
];

export const Route = createFileRoute("/background/who-are-the-houthis")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "who are the houthis, ansar allah, yemen civil war, houthi red sea attacks, bab el-mandeb, mocha port seized, houthi missiles",
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
          headline: "Who Are the Houthis? Yemen's Red Sea Power, Explained",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Thing", name: "Houthi movement" },
            { "@type": "Thing", name: "Yemen civil war" },
            { "@type": "Thing", name: "Bab el-Mandeb strait" },
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
              name: "Who are the Houthis?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Houthis, formally Ansar Allah, are a Zaydi Shia movement from northern Yemen that seized the capital Sanaa in 2014. Backed by Iran, they now govern most of Yemen's population centers and field an arsenal of missiles, drones, and unmanned vessels capable of threatening Red Sea shipping.",
              },
            },
            {
              "@type": "Question",
              name: "Did the Houthis seize the port of Mocha?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Houthi forces seized the Yemeni port of Mocha on September 11, 2026, as part of a broader drive to expand control over Yemen's Red Sea coast — moving them closer to full control of the Yemeni side of the Bab el-Mandeb chokepoint.",
              },
            },
            {
              "@type": "Question",
              name: "Why does the Bab el-Mandeb strait matter?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Bab el-Mandeb connects the Red Sea to the Gulf of Aden and carries roughly 12% of global trade, including much of the container traffic between Europe and Asia via the Suez Canal. A force able to threaten it can impose major costs on the world economy.",
              },
            },
            {
              "@type": "Question",
              name: "Are the Houthis part of Iran's military?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No — they are an independent Yemeni movement with their own goals, but they are the most capable member of Iran's 'Axis of Resistance' after Hezbollah, relying on Iranian weapons, training, and financing while retaining autonomy over their own operations.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: WhoAreTheHouthis,
});

function WhoAreTheHouthis() {
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
          Background Primer · Yemen & the Red Sea
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          Who Are the Houthis?
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          They run most of Yemen, just seized the port of Mocha, and are closing on the Bab
          el-Mandeb chokepoint while the Iran war burns to the north. Here's who they are, where
          they came from, and why a movement from Yemen's mountains now holds a lever over global
          shipping.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          The essentials, at a glance
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FACTS.map((e) => (
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
          The Houthi coastal advance and Red Sea shipping picture are tracked continuously on the{" "}
          <Link to="/" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            main conflict dashboard
          </Link>
          , and the wider maritime crisis is covered in our{" "}
          <Link to="/background/red-sea-crisis" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            Red Sea crisis primer
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
