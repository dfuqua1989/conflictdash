import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Pakistan vs Afghanistan: TTP Conflict Explained | World Conflict Debrief";
const DESCRIPTION =
  "Why Pakistan declared open war on Afghanistan's Taliban in 2026: a militant group, not a border dispute, and why mediated truces keep collapsing.";
const URL = "https://conflictdash.lovable.app/background/pakistan-afghanistan-war-explained";

const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const T = {
  bg: "#0a1017",
  card: "#111a24",
  text: "#cdd8e3",
  sub: "#8496a8",
  border: "rgba(120,150,180,0.20)",
  accent: "#22c55e",
};

const TIMELINE = [
  {
    date: "Oct 2025",
    icon: "🎯",
    label: "First Kabul strike",
    color: "#f97316",
    text: "Pakistan struck a TTP leader inside Kabul \u2014 the first Pakistani strike on the Afghan capital since the Taliban's 2021 return to power, and the moment the conflict stopped being purely a border issue.",
  },
  {
    date: "Feb 21\u201322, 2026",
    icon: "💥",
    label: "Airstrikes on TTP camps",
    color: "#f97316",
    text: "Pakistan struck Tehreek-e-Taliban Pakistan camps directly inside Afghan territory, breaking a fragile truce that had held since late 2025.",
  },
  {
    date: "Feb 26, 2026",
    icon: "⚔️",
    label: "Taliban retaliates",
    color: "#dc2626",
    text: "Afghan Taliban forces launched retaliatory cross-border attacks on Pakistani military positions, describing them as a calculated response rather than an escalation.",
  },
  {
    date: "Feb 27, 2026",
    icon: "🚨",
    label: "\u201cOpen war\u201d declared",
    color: "#dc2626",
    text: "Pakistan's defense minister publicly declared open war with Afghanistan and launched Operation Ghazab lil Haq \u2014 coordinated air and ground strikes on Kabul, Kandahar and dozens of other locations.",
  },
  {
    date: "Mar 16, 2026",
    icon: "💀",
    label: "Kabul hospital strike",
    color: "#ef4444",
    text: "A Pakistani strike hit a drug-rehabilitation hospital in Kabul, reportedly killing more than 400 people. Pakistani officials disputed the Afghan account of the incident.",
  },
];

const SECTIONS = [
  {
    h: "This isn't a border dispute \u2014 it's about one militant group",
    p: "Pakistan and Afghanistan share the Durand Line, a colonial-era border that Kabul has never formally recognized, and cross-border tension is nothing new. But the current war has a much narrower cause: Pakistan wants the Afghan Taliban government to shut down the Tehreek-e-Taliban Pakistan (TTP), a militant group that uses Afghan soil to plan and launch attacks inside Pakistan. Everything else \u2014 the airstrikes, the declared \u201copen war,\u201d the collapsed truces \u2014 flows from Pakistan's demand and the Taliban's refusal to fully meet it.",
  },
  {
    h: "Brothers in arms, not just neighbors",
    p: "The TTP and the Afghan Taliban are separate organizations, but they share ideology, ethnic composition and a common history \u2014 the TTP essentially modeled itself on the Afghan Taliban and fought alongside it for years before the Afghan Taliban retook power in 2021. Afghan Taliban leaders reportedly view TTP fighters as \u201cbrothers in blood and arms\u201d and are reluctant to move against them, partly out of loyalty and partly out of calculation: if the Taliban's own rule in Afghanistan ever collapsed, TTP-controlled areas inside Pakistan could serve as a fallback sanctuary, the same way Afghanistan itself served the Taliban during the US occupation years.",
  },
  {
    h: "From strikes to a declared war",
    p: "Pakistan's frustration built through 2025 as TTP attacks inside Pakistan continued despite repeated diplomatic pressure on Kabul. The October 2025 strike on a TTP leader inside Kabul \u2014 the first on the Afghan capital itself \u2014 marked an escalation in method, not just intent. A negotiated truce followed but didn't hold. When Pakistan struck TTP camps again in February 2026 and the Taliban retaliated across the border, Pakistan's defense minister made the conflict official, declaring \u201copen war\u201d and launching a named military campaign rather than continuing a pattern of deniable cross-border strikes.",
  },
  {
    h: "The hospital strike and the legal fight over who's right",
    p: "The war's most consequential single event was a March 16, 2026 Pakistani strike on a drug-rehabilitation facility in Kabul that Afghan officials say killed more than 400 people. Pakistan disputed the account. Independent of that specific dispute, UN human rights experts have said Pakistan's broader campaign violates the UN Charter's prohibition on the use of force, rejecting Islamabad's self-defense justification on the grounds that the Taliban government itself had not directly attacked Pakistan \u2014 only the TTP had, and Pakistan has not published evidence tying TTP attacks directly to Taliban command and control.",
  },
  {
    h: "Why China's truces keep collapsing",
    p: "China has repeatedly brokered pauses in the fighting, including a five-day truce around the end of Ramadan in 2026, using its investment leverage over both governments. None have held beyond a few weeks, because the truces address the fighting without resolving the underlying demand \u2014 the Taliban still hasn't committed to move against the TTP in any verifiable way. Russia has separately struck a deal with the Taliban, reportedly focused on repairing Russian-made military equipment, which worries Pakistan that Kabul is quietly building capacity for future conflicts regardless of who mediates the current one.",
  },
  {
    h: "What actually ends this",
    p: "Analysts see limited realistic paths to a lasting resolution. A genuine Taliban crackdown on the TTP risks internal fractures within the Taliban's own coalition, or could push TTP fighters toward even more extreme rivals like Islamic State-Khorasan. Pakistan, meanwhile, has shown no sign of accepting a ceasefire that doesn't include some verifiable action against TTP sanctuaries. That leaves the most likely near-term outcome as a continuation of the current pattern: periodic strikes, brief internationally brokered pauses, and a fundamental disagreement that no mediator has yet found a way to bridge.",
  },
];

export const Route = createFileRoute("/background/pakistan-afghanistan-war-explained")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "pakistan afghanistan war, why did pakistan declare war on afghanistan, TTP conflict, operation ghazab lil haq, durand line conflict, pakistan taliban war 2026",
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
          headline: "Why Did Pakistan Declare War on Afghanistan? The TTP Conflict Explained",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Thing", name: "Pakistan-Afghanistan conflict" },
            { "@type": "Thing", name: "Tehrik-i-Taliban Pakistan" },
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
              name: "Why did Pakistan declare war on Afghanistan?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Pakistan's defense minister declared open war on Feb 27, 2026 after Taliban forces retaliated for Pakistani airstrikes on TTP (Tehreek-e-Taliban Pakistan) camps inside Afghanistan. The core issue is Pakistan's demand that the Afghan Taliban crack down on the TTP, a militant group using Afghan soil to launch attacks inside Pakistan.",
              },
            },
            {
              "@type": "Question",
              name: "What is the TTP and why won't the Taliban fight it?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Tehreek-e-Taliban Pakistan is an al-Qaeda-aligned militant group ideologically and ethnically tied to the Afghan Taliban. Afghan Taliban leaders reportedly view TTP fighters as close allies and are reluctant to move against them, partly from loyalty and partly because TTP-held areas could serve as a fallback sanctuary if Taliban rule in Afghanistan ever collapsed.",
              },
            },
            {
              "@type": "Question",
              name: "What happened in the Kabul hospital strike?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "On March 16, 2026, a Pakistani strike hit a drug-rehabilitation facility in Kabul. Afghan officials reported more than 400 people killed; Pakistani officials disputed the account. UN human rights experts have separately said Pakistan's broader military campaign violates the UN Charter's prohibition on the use of force.",
              },
            },
            {
              "@type": "Question",
              name: "Has China stopped the Pakistan-Afghanistan war?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "China has brokered several truces, including a five-day pause around Ramadan 2026, but none have held for long because they don't resolve the core dispute over the TTP's presence in Afghanistan.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: PakAfghanPrimer,
});

function PakAfghanPrimer() {
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
          Why Did Pakistan Declare War on Afghanistan?
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          Two former allies against the same enemy are now fighting each other. Pakistan's defense
          minister declared "open war" in February 2026. Here's the militant group at the center of
          it, and why every Chinese-brokered truce keeps falling apart within weeks.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          How it escalated
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
          This conflict is tracked continuously on the{" "}
          <Link to="/" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            main conflict dashboard
          </Link>
          , under Theaters → South Asia → Pakistan–Afghanistan.
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
