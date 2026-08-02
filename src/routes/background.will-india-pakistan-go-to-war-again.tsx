import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Will India and Pakistan Go to War Again? What the 2025 War Actually Changed | World Conflict Debrief";
const DESCRIPTION =
  "India and Pakistan fought a real four-day war in May 2025 \u2014 the most serious clash since Kargil. A year later, the ceasefire holds but nothing is resolved. What would actually trigger round two, and what's different this time.";
const URL = "https://conflictdash.lovable.app/background/will-india-pakistan-go-to-war-again";

const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const T = {
  bg: "#0a1017",
  card: "#111a24",
  text: "#cdd8e3",
  sub: "#8496a8",
  border: "rgba(120,150,180,0.20)",
  accent: "#FF9933",
};

const TIMELINE = [
  {
    date: "Apr 22, 2025",
    icon: "🔻",
    label: "Pahalgam attack",
    color: "#dc2626",
    text: "26 civilians killed in a militant attack in Indian-administered Kashmir. New Delhi blamed Pakistan-based Lashkar-e-Taiba; Islamabad denied any role.",
  },
  {
    date: "May 6\u20137, 2025",
    icon: "🎯",
    label: "Operation Sindoor",
    color: "#f97316",
    text: "India struck nine sites it described as terrorist infrastructure inside Pakistan and Pakistan-administered Kashmir \u2014 the largest cross-border strike in over two decades.",
  },
  {
    date: "May 7\u201310, 2025",
    icon: "⚔️",
    label: "Four days of fighting",
    color: "#dc2626",
    text: "Pakistan responded along the Line of Control and claimed downed Indian aircraft, using Chinese-supplied weapons in combat for the first time. A ceasefire was reached May 10 under international pressure.",
  },
  {
    date: "May 2026",
    icon: "🎖️",
    label: "Dueling victory narratives",
    color: "#eab308",
    text: "On the first anniversary, both countries publicly commemorated the war as their own strategic success \u2014 Pakistan's military held ceremonies in Rawalpindi and Lahore; India's military made its own victory claims.",
  },
];

const SECTIONS = [
  {
    h: "What actually happened in 2025 \u2014 and why it was different",
    p: "The four-day war in May 2025 was the most serious India-Pakistan confrontation since the 1999 Kargil conflict, and it broke new ground in a specific way: both sides used advanced weapons systems in combat that neither had previously deployed against the other, including cruise missiles, short-range ballistic missiles and drones. Pakistan's Chinese-supplied HQ-9B air-defense system failed to intercept Indian BrahMos missiles, a real-world test of Chinese military technology against a serious opponent that defense analysts on both sides are still studying. It ended not because either side achieved a decisive result, but because international pressure forced a ceasefire before the fighting could escalate further.",
  },
  {
    h: "Ceasefire without reconciliation",
    p: "That's the phrase analysts consistently use to describe the year since, and it's precise: the ceasefire has held completely \u2014 no resumption of cross-border fire, no further strikes \u2014 while literally nothing about the underlying dispute has moved. Both governments have used the anniversary to reinforce domestic narratives of victory rather than pursue any dialogue. Pakistan's army chief Asim Munir was elevated to field marshal after the war and has since positioned himself publicly as a regional peacemaker, even while Pakistan deepens a defense relationship with China \u2014 including pursuit of the longer-range HQ-19 missile-defense system \u2014 in ways that visibly worry New Delhi.",
  },
  {
    h: "The dispute the war never touched",
    p: "The war started over a specific attack, but the conflict underneath it is the same one that's defined India-Pakistan relations since Partition in 1947: the status of Kashmir. Nothing in the 2025 war or its aftermath changed that dispute in any way. If anything, the war demonstrated that both sides are willing to strike further and use more advanced weapons than in any prior post-nuclearization confrontation, while a full-scale war remains something neither side wants \u2014 mutual nuclear deterrence is the thing actually keeping the peace, not any diplomatic progress.",
  },
  {
    h: "What would actually trigger a second round",
    p: "Analysts point to the same pattern that triggered 2025: a mass-casualty militant attack inside India that New Delhi attributes to Pakistan-based groups, followed by Indian cross-border strikes. That's the mechanism that has repeated multiple times since 2016 \u2014 Uri, Pulwama, now Pahalgam \u2014 each one larger than the last. The specific risk going forward is less about deliberate escalation from either government and more about whether militant groups operating from Pakistani soil, over which Islamabad's control is itself contested, carry out another attack severe enough to force an Indian response.",
  },
  {
    h: "The China factor now shaping the calculus",
    p: "The most significant post-war shift isn't military \u2014 it's the visible deepening of the Pakistan-China defense relationship, which India's strategic establishment now treats as a standing complication rather than a one-off. Pakistan deployed Chinese weapons in real combat for the first time in 2025, and analysts on both sides are still assessing what that test revealed about Chinese military technology. For India, any future crisis now has to be weighed against China's principal strategic rival deepening ties with India's principal regional rival \u2014 a dynamic that didn't exist in the same way before 2025.",
  },
  {
    h: "The case for cautious optimism",
    p: "Despite the tension, some analysts argue a durable thaw isn't as far-fetched as it looks. Bilateral relations have eased after previous periods of conflict, often followed by a revival of trade and cultural ties, and there's no shortage of historical precedent for that pattern repeating. The obstacle isn't necessarily appetite for de-escalation \u2014 it's the ease with which a single attack can reset the relationship back to crisis footing, which is exactly what happened in April 2025 and has happened multiple times before that.",
  },
];

export const Route = createFileRoute("/background/will-india-pakistan-go-to-war-again")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "will india and pakistan go to war, india pakistan war 2025, operation sindoor, india pakistan conflict 2026, kashmir conflict, india pakistan nuclear war",
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
          headline: "Will India and Pakistan Go to War Again? What the 2025 War Actually Changed",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Thing", name: "India-Pakistan relations" },
            { "@type": "Thing", name: "Operation Sindoor" },
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
              name: "Will India and Pakistan go to war again?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No date or probability can be responsibly forecast. The ceasefire from May 2025 has held for over a year with zero violations, but the underlying Kashmir dispute is completely unresolved. Analysts say the most likely trigger for renewed conflict would be another mass-casualty militant attack inside India attributed to Pakistan-based groups, the same pattern that caused the 2025 war.",
              },
            },
            {
              "@type": "Question",
              name: "What was Operation Sindoor?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Operation Sindoor was India's military response to the April 22, 2025 Pahalgam attack, which killed 26 civilians in Indian-administered Kashmir. On May 6-7, 2025, India struck nine sites it described as terrorist infrastructure inside Pakistan and Pakistan-administered Kashmir, triggering four days of fighting before a ceasefire on May 10.",
              },
            },
            {
              "@type": "Question",
              name: "Did China get involved in the India-Pakistan war?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "China did not participate directly, but Pakistan used Chinese-supplied weapons in combat against India for the first time, including an HQ-9B air-defense system that failed to intercept Indian missiles. The deepening Pakistan-China defense relationship since the war is a significant new factor in India's strategic calculations.",
              },
            },
            {
              "@type": "Question",
              name: "Is the India-Pakistan ceasefire still holding?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, as of mid-2026 the ceasefire reached on May 10, 2025 has held for over a year with no resumption of cross-border fire. Analysts describe the state as a ceasefire without reconciliation \u2014 stable but with the core dispute over Kashmir entirely unaddressed.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: IndiaPakistanPrimer,
});

function IndiaPakistanPrimer() {
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
          Background Primer · South Asia
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          Will India and Pakistan Go to War Again?
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          Two nuclear-armed neighbors fought a real war in May 2025 — the most serious clash since
          1999. A year on, the ceasefire holds completely, and the dispute underneath it hasn't
          moved an inch. Here's what actually changed, and what would trigger round two.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          How the 2025 war unfolded
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {TIMELINE.map((ev) => (
            <div
              key={ev.date}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderLeft: `4px solid ${ev.color}`,
                borderRadius: 12,
                padding: "12px 14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <span style={{ fontSize: 16 }}>{ev.icon}</span>
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 800,
                    color: ev.color,
                    letterSpacing: ".04em",
                  }}
                >
                  {ev.date}
                </span>
                <div style={{ fontSize: 13, fontWeight: 700, flex: 1 }}>{ev.label}</div>
              </div>
              <p style={{ fontSize: 12.5, lineHeight: 1.6, color: T.sub, margin: 0 }}>{ev.text}</p>
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
          This relationship is tracked continuously on the{" "}
          <Link to="/" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            main conflict dashboard
          </Link>
          , under Theaters → South Asia → India–Pakistan.
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
