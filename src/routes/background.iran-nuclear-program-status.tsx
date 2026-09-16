import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Iran's Nuclear Program After the 2026 Strikes | World Conflict Debrief";
const DESCRIPTION =
  "US and Israeli strikes hit Iran's nuclear infrastructure, but how much survived? What's known about Fordow, Natanz, the enriched uranium stockpile, and how close Tehran is to a weapon now.";
const URL = "https://conflictdash.lovable.app/background/iran-nuclear-program-status";

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
    label: "Fordow",
    icon: "⛰️",
    status: "Struck, status contested",
    color: "#f97316",
    text: "Iran's most hardened enrichment site, built inside a mountain near Qom. US bunker-penetrating munitions hit it during the 2026 campaign; independent verification of the damage has been limited by Iran's refusal to admit inspectors, and assessments differ on whether centrifuge halls were destroyed or merely buried.",
  },
  {
    label: "Natanz",
    icon: "🏭",
    status: "Repeatedly targeted",
    color: "#ef4444",
    text: "Iran's largest enrichment complex, hit by sabotage, cyber operations, and now airstrikes across multiple campaigns. Satellite imagery shows damage to surface buildings, but the site's deep underground halls were purpose-built to survive exactly this scenario.",
  },
  {
    label: "Enriched uranium stockpile",
    icon: "☢️",
    status: "Whereabouts unclear",
    color: "#dc2626",
    text: "Before the strikes, Iran held a large stockpile enriched to 60% — a short technical step from weapons-grade 90%. Whether that material was destroyed, dispersed, or moved to undeclared sites before the campaign is the single most important open question, and no public assessment has answered it definitively.",
  },
  {
    label: "Breakout time",
    icon: "⏱️",
    status: "Uncertain",
    color: "#eab308",
    text: "Pre-war estimates put Iran's breakout time — the period needed to produce enough fissile material for one weapon — at days to weeks. Post-strike estimates vary wildly depending on assumptions about surviving centrifuges and the stockpile's location, from 'months' to 'no real change.'",
  },
];

const SECTIONS = [
  {
    h: "What the strikes were aiming at",
    p: "The 2026 US-Israeli air campaign against Iran had nuclear infrastructure among its declared targets, alongside missile forces, naval assets, and command nodes. The nuclear target set centered on the enrichment complex at Natanz, the hardened Fordow site, conversion and research facilities at Isfahan, and associated workshops and storage. The logic of striking them was to set the program back years; the counter-argument, made by skeptics before the first bombs fell, was that a program this dispersed, this buried, and this well-understood by Iranian scientists cannot be bombed out of existence — only delayed, and possibly incentivized.",
  },
  {
    h: "The verification problem",
    p: "Battle damage assessment of deeply buried targets is genuinely hard, and in this case it is compounded by politics. Iran has barred International Atomic Energy Agency inspectors from the struck sites, while continuing to insist its program is peaceful — a claim that sat poorly even before the war, given the 60% enrichment levels no civilian program requires. The US and Israel have publicized strike footage and claimed major damage; independent analysts using commercial satellite imagery have confirmed destruction of surface structures but cannot see what survived underground. Both sides of the 'obliterated' versus 'barely scratched' argument are extrapolating from incomplete evidence.",
  },
  {
    h: "The stockpile question dominates everything",
    p: "Centrifuges can be rebuilt; halls can be re-dug. What cannot be quickly replaced is a large inventory of 60%-enriched uranium, which represents most of the work needed to reach weapons-grade material. US intelligence reporting before the strikes noted unusual vehicle activity at some sites, and Iranian officials hinted the material had been 'relocated to a safe place.' If the stockpile survived, Iran's breakout capability survived with it, whatever happened to the buildings. If it was destroyed or is now inaccessible under rubble, the program genuinely lost years. Nobody outside a small circle in Tehran knows for certain — and Tehran prefers it that way.",
  },
  {
    h: "Does the war make a bomb more or less likely?",
    p: "This is the strategic debate at the center of the conflict. The case for 'less': destroyed infrastructure, dead scientists, degraded air defenses, and a demonstrated willingness by Washington and Jerusalem to use force may deter weaponization and strengthen any negotiated outcome. The case for 'more': Iran's leadership has now watched what happens to states without nuclear weapons, hardliners who argued the 2015 nuclear deal was a trap feel vindicated, and the surviving program — whatever its size — is now likely to be reconstituted in deeper, more dispersed, more secret form. Historically, bombing campaigns have delayed nuclear programs; they have never, on their own, ended one that a state was determined to keep.",
  },
  {
    h: "What to watch next",
    p: "Three signals will do more to clarify the program's status than any official statement: whether Iran readmits IAEA inspectors and on what terms; whether commercial satellite imagery shows reconstruction, excavation, or new digging at known or new sites; and whether Iran's post-war posture shifts toward negotiation — which would suggest the program retains bargaining value — or toward open weaponization talk, which would suggest the leadership has concluded only a bomb guarantees survival. The naval blockade in place since April 2026 and the ongoing Hormuz confrontation mean any of these moves will unfold under active wartime conditions, with all the escalation risk that implies.",
  },
];

export const Route = createFileRoute("/background/iran-nuclear-program-status")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "iran nuclear program, fordow damage, natanz strike, iran enriched uranium stockpile, iran breakout time, iran nuclear deal 2026",
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
          headline: "Iran's Nuclear Program After the 2026 Strikes: What's Known and What Isn't",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Thing", name: "Iran nuclear program" },
            { "@type": "Thing", name: "Fordow" },
            { "@type": "Thing", name: "Natanz" },
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
              name: "Did the 2026 strikes destroy Iran's nuclear program?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Unknown, and probably not entirely. Surface structures at Fordow, Natanz and Isfahan were damaged or destroyed, but the underground halls were built to survive airstrikes, and the fate of Iran's 60%-enriched uranium stockpile — the program's most valuable asset — has not been publicly verified. Iran has barred IAEA inspectors from the struck sites.",
              },
            },
            {
              "@type": "Question",
              name: "How close is Iran to a nuclear weapon after the strikes?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Pre-war breakout estimates were days to weeks to produce enough fissile material for one weapon. Post-strike estimates range from 'months' to 'largely unchanged,' depending on assumptions about surviving centrifuges and whether the enriched stockpile was moved before the campaign.",
              },
            },
            {
              "@type": "Question",
              name: "Where is Iran's enriched uranium stockpile now?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Unclear. US intelligence noted unusual vehicle activity at nuclear sites before the strikes, and Iranian officials claimed the material was 'relocated to a safe place.' Whether it was destroyed, buried, or dispersed to undeclared sites is the central open question of the post-strike assessments.",
              },
            },
            {
              "@type": "Question",
              name: "Will Iran rebuild its nuclear program?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Most analysts expect reconstitution in deeper, more dispersed and more secret form if the conflict ends without a negotiated settlement — the historical pattern after strikes on nuclear programs. Whether Iran instead negotiates depends on how much bargaining value it believes the surviving program retains.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: IranNuclearStatus,
});

function IranNuclearStatus() {
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
          Background Primer · Iran
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          Iran's Nuclear Program After the Strikes
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          The 2026 campaign hit Fordow, Natanz and Isfahan — but the honest answer to "did it
          work?" is that nobody outside Tehran fully knows. Here's what's verified, what's
          contested, and the one question that matters more than all the others.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          Site by site, question by question
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
          The Iran war — strikes, blockade, Hormuz, and the nuclear question — is tracked
          continuously on the{" "}
          <Link to="/" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            main conflict dashboard
          </Link>
          , under Deep Dive → Iran, and in the{" "}
          <Link to="/background/strait-of-hormuz" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            Strait of Hormuz primer
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
