import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Is the US at War Right Now? 2026 Answer | World Conflict Debrief";
const DESCRIPTION =
  "Congress hasn't declared war since 1942, yet US forces are in active combat. What's happening with Iran and in the Caribbean, and why it matters.";
const URL = "https://conflictdash.lovable.app/background/is-the-us-at-war";

const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const T = {
  bg: "#0a1017",
  card: "#111a24",
  text: "#cdd8e3",
  sub: "#8496a8",
  border: "rgba(120,150,180,0.20)",
  accent: "#5b8ec8",
};

const ENGAGEMENTS = [
  {
    label: "Iran",
    icon: "🇮🇷",
    status: "Active combat",
    color: "#ef4444",
    text: "US and Israeli airstrikes against Iranian military and nuclear sites, an active naval blockade of Iran's coastline, and reciprocal Iranian strikes on US-linked targets across the Gulf. This is the closest thing to a conventional war the US is currently fighting — missiles, airstrikes, and casualties on both sides.",
  },
  {
    label: "Caribbean / Venezuela",
    icon: "🚤",
    status: "Lethal strikes, paused",
    color: "#f97316",
    text: "Operation Southern Spear — US strikes on vessels suspected of drug trafficking, over 220 killed since September 2025. No formal declaration covers this; it's conducted under executive counter-narcotics authority and has drawn accusations of extrajudicial killing from rights groups. Paused since June 2026 amid earthquake-relief redeployment.",
  },
  {
    label: "Ukraine",
    icon: "🇺🇦",
    status: "Support, not combat",
    color: "#22c55e",
    text: "Weapons, intelligence sharing and training, but no US troops in direct combat against Russian forces. This is materially different from Iran and the Caribbean, where US forces are themselves striking targets and taking fire.",
  },
  {
    label: "Taiwan Strait / South China Sea",
    icon: "🏝️",
    status: "Deterrence posture",
    color: "#eab308",
    text: "Carrier strike groups, freedom-of-navigation patrols and treaty commitments, but no exchange of fire. This is a military posture intended to prevent a war, not a war itself.",
  },
];

const SECTIONS = [
  {
    h: "The short answer",
    p: "No, and yes. No — the United States has not had a constitutionally declared war since Congress declared war on Romania in June 1942, near the end of World War II. Every US military engagement since Korea has run on a different legal basis: authorizations for the use of military force, the War Powers Resolution, or purely executive action framed as self-defense or counter-terrorism. Yes — by any plain-English definition of the word, American forces are engaged in active combat right now, most clearly in the campaign against Iran, and are conducting lethal operations in the Caribbean under a separate legal theory entirely. The formal label and the observable reality have been disconnected for eight decades, and 2026 is no exception.",
  },
  {
    h: "Why \u201cdeclared war\u201d stopped being how this works",
    p: "The US Constitution gives Congress, not the president, the power to declare war — but Congress hasn't exercised that specific power in over 80 years, even through Korea, Vietnam, Iraq, Afghanistan, and now Iran. In practice, presidents have relied on broader legal instruments: the 2001 and 2002 Authorizations for Use of Military Force, the War Powers Resolution's 60-90 day window for unauthorized deployments, or simply executive authority to act in what the administration characterizes as national self-defense. Critics across the political spectrum \u2014 including UN human rights experts on other fronts, like Pakistan's campaign in Afghanistan \u2014 argue this pattern erodes the actual constitutional check the declaration requirement was designed to provide. Supporters argue the modern pace of conflict makes a congressional vote before every strike impractical. Either way, \u201cwar\u201d and \u201cdeclared war\u201d have not meant the same thing in US practice for generations.",
  },
  {
    h: "Iran: the one that actually looks like a war",
    p: "Of everything the US is currently doing militarily, the Iran conflict is the one that fits the ordinary meaning of \u201cwar\u201d without much argument. US and Israeli forces have struck Iranian military and nuclear infrastructure; Iran has struck back at US-linked targets across the Gulf, including Kuwait, Jordan and Bahrain; a naval blockade of the Iranian coast has been in place since April 2026; and as of early August, the US and Israel were preparing a further round of strikes on Iranian energy infrastructure, with Iran's own military command publicly warning of a \u201cfull-scale regional war.\u201d No congressional declaration covers any of it. The operative legal basis is presidential authority to respond to what the administration frames as Iranian threats to US forces and allies in the region \u2014 a framework that has produced sustained, reciprocal combat without ever being labeled a war in the constitutional sense.",
  },
  {
    h: "The Caribbean: lethal, but a different legal category entirely",
    p: "Operation Southern Spear is not a war against a state \u2014 it's a campaign of lethal strikes against vessels the US alleges are smuggling narcotics, conducted primarily off Venezuela and through the Caribbean. Over 220 people have been killed in these strikes since September 2025, under counter-narcotics authority rather than any war-powers framework. Human rights organizations, including WOLA, have characterized the killings as extrajudicial, since strikes are conducted without the normal legal process that would apply to interdicting a criminal suspect. The Trump administration disputes that framing and maintains the strikes are a legitimate exercise of executive authority against traffickers. Whatever the legal characterization, the operation has produced far more US-inflicted deaths than most declared conflicts the US has fought since Vietnam.",
  },
  {
    h: "What doesn't count, and why the distinction matters",
    p: "Not every US military commitment is a war, even when it involves real risk and real money. Support for Ukraine \u2014 weapons, training, intelligence \u2014 doesn't put American service members in direct combat with Russian forces, which is the meaningful line between arming a partner and fighting a war yourself. Carrier deployments to the Taiwan Strait and South China Sea are deterrence, not combat \u2014 their entire purpose is to make an actual war less likely by demonstrating the cost of starting one. Collapsing all of this into a single \u201cis America at war\u201d yes-or-no question obscures more than it reveals. The more useful question, and the one this page is actually trying to answer, is which of America's many military commitments involve US forces taking and returning fire right now \u2014 and as of August 2026, that's Iran, unambiguously, and the Caribbean, in a narrower but still lethal sense.",
  },
];

export const Route = createFileRoute("/background/is-the-us-at-war")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "is the us at war, are we at war, is america at war right now, us military engagements 2026, iran war us involvement, southern spear",
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
          headline: "Is the US at War Right Now? The Honest Answer for 2026",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Thing", name: "United States military engagements" },
            { "@type": "Thing", name: "2026 Iran war" },
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
              name: "Is the US at war right now?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Not in the constitutional sense — Congress hasn't declared war since 1942. But US forces are engaged in active combat against Iran, including airstrikes and a naval blockade, and are conducting lethal strikes in the Caribbean under separate counter-narcotics authority. By ordinary definition, yes; by formal declaration, no.",
              },
            },
            {
              "@type": "Question",
              name: "When did the US last declare war?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Congress last formally declared war in June 1942, against Romania, near the end of World War II. Every US military conflict since — Korea, Vietnam, the Gulf War, Iraq, Afghanistan, and the current Iran conflict — has been conducted under other legal authorities rather than a constitutional declaration of war.",
              },
            },
            {
              "@type": "Question",
              name: "Is the US fighting a war with Iran?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Functionally, yes. US and Israeli forces have struck Iranian military and nuclear sites, Iran has struck US-linked targets across the Gulf in retaliation, and a naval blockade of Iran has been in place since April 2026. No congressional war declaration covers it; the legal basis is presidential authority rather than a formal declaration.",
              },
            },
            {
              "@type": "Question",
              name: "What is Operation Southern Spear?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A US campaign of lethal strikes against vessels suspected of drug trafficking, primarily near Venezuela and in the Caribbean, that has killed over 220 people since September 2025. It operates under counter-narcotics authority, not war powers, and human rights groups have called the killings extrajudicial.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: IsUSAtWarPrimer,
});

function IsUSAtWarPrimer() {
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
          Background Primer · United States
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          Is the US at War Right Now?
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          Congress hasn't declared war since 1942. American forces are still exchanging fire with
          Iran and conducting lethal strikes in the Caribbean. Both of those things are true at the
          same time — here's how to tell the difference between America's actual wars and everything
          else it's doing militarily.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          Four US military engagements, by what they actually are
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ENGAGEMENTS.map((e) => (
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
          The Iran war and Southern Spear are both tracked continuously on the{" "}
          <Link to="/" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            main conflict dashboard
          </Link>
          , under Deep Dive → Iran and Deep Dive → Americas → Southern Spear.
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
