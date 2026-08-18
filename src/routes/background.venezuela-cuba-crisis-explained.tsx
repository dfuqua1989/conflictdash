import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "US Intervention in Venezuela and Cuba, Explained | World Conflict Debrief";
const DESCRIPTION =
  "From Operation Southern Spear to Maduro's capture, the Cuba oil blockade, and the 2026 earthquake: a timeline explainer of the US-Venezuela-Cuba crisis.";
const URL = "https://conflictdash.lovable.app/background/venezuela-cuba-crisis-explained";
const SOCIAL_TITLE = "US Intervention in Venezuela and Cuba, Explained | World Conflict Debrief";
const SOCIAL_DESCRIPTION =
  "How a boat-strike campaign against alleged drug traffickers became a regime-change operation, a Cuba oil blockade, and now a fragile transition — timeline and key facts.";
const IMAGE = "https://conflictdash.lovable.app/og-image.png";

const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const T = {
  bg: "#0a1017",
  card: "#111a24",
  text: "#cdd8e3",
  sub: "#8496a8",
  border: "rgba(120,150,180,0.20)",
  accent: "#f97316",
};

const STATS = [
  { val: "221+", label: "Killed in US boat strikes", sub: "64+ strikes on 65 vessels since Sept 2025, per Wikipedia/AS-COA tracker" },
  { val: "6,125", label: "Earthquake deaths", sub: "Jun 24, 2026 twin earthquakes; ~$20B in damage per World Bank" },
  { val: "9.9", label: "Cuba infant mortality /1,000", sub: "Up sharply per OHCHR, attributed to the oil blockade" },
  { val: "~7 mo", label: "Since Maduro's capture", sub: "Operation Absolute Resolve, Jan 3, 2026" },
];

const TIMELINE = [
  { d: "Aug 2025", t: "Operation Southern Spear begins", x: "US Navy starts deploying warships and personnel to the Caribbean, citing the need to combat drug trafficking from Venezuela." },
  { d: "Sep 2, 2025", t: "First lethal boat strike", x: "A US strike on a vessel from Venezuela kills all 11 aboard. The administration says the campaign will continue." },
  { d: "Nov 2025", t: "Secret Maduro-Trump contacts", x: "The New York Times reports Trump and Rubio spoke with Maduro by phone; a potential leaders' meeting is reportedly discussed." },
  { d: "Dec 2025", t: "Oil tanker seizures begin", x: "US seizures expand to sanctioned Venezuelan oil tankers, including shipments bound for Cuba — severing Cuba's main fuel lifeline weeks before the formal blockade." },
  { d: "Jan 3, 2026", t: "Maduro captured — Operation Absolute Resolve", x: "Roughly 200 US special operations forces and 150 aircraft from 20 bases strike Caracas. Maduro and his wife Cilia Flores are captured and flown to New York to face narcoterrorism charges. The operation lasts about 2 hours 20 minutes." },
  { d: "Jan 5, 2026", t: "Colombia's Petro threatens response", x: "Colombian President Petro warns he would 'take up arms' if a similar intervention occurred in Colombia. Thousands protest in Cúcuta near the Venezuelan border." },
  { d: "Jan 29, 2026", t: "Executive Order 14380 — Cuba oil blockade", x: "Trump declares a national emergency and authorizes tariffs on any country supplying oil to Cuba — described by the New York Times as the first effective US blockade of Cuba since the 1962 Missile Crisis." },
  { d: "Mar 6, 2026", t: "Strikes expand into Ecuador", x: "The US strikes a target on the Colombia-Ecuador border, initially described as a FARC dissident compound; the New York Times later reports it was a dairy farm." },
  { d: "Mar 13, 2026", t: "Díaz-Canel confirms talks with US", x: "Cuba's First Secretary publicly confirms diplomatic talks aimed at addressing the oil and energy blockade. Cuba releases 51 political prisoners as part of the opening, with 2,000+ more released by early April." },
  { d: "Mar 30, 2026", t: "Russian oil tanker defies blockade", x: "A 100,000-tonne Russian crude shipment arrives in Havana — described by CSIS as calculated blockade-running timed to avoid a showdown while the Iran war was active." },
  { d: "May 14, 2026", t: "Cuba: out of oil and diesel", x: "Cuba's Ministry of Energy and Mines warns the country has run out of oil and diesel entirely." },
  { d: "May 21, 2026", t: "Raúl Castro indicted", x: "The US indicts the former Cuban leader over the 1996 Brothers to the Rescue shootdown — a move analysts compare to the pre-capture indictment pattern used against Maduro." },
  { d: "Jun 12, 2026", t: "Tren de Aragua leader killed", x: "A US airstrike, conducted in coordination with Venezuelan authorities, kills Héctor 'Niño Guerrero' Guerrero Flores, leader of the Tren de Aragua criminal organization." },
  { d: "Jun 2026", t: "OHCHR documents humanitarian collapse in Cuba", x: "Infant mortality has risen to 9.9 per 1,000 births, childhood cancer survival is down to 65%, food production is down 60%, and medicine supplies sit at only 30% of normal levels. The UN attributes the deterioration to the blockade." },
  { d: "Jun 21, 2026", t: "221+ killed in boat strikes to date", x: "A Wikipedia/AS-COA tracker puts the toll at 221 killed (17 missing, presumed dead) across 64+ strikes on 65 vessels since September 2025. UN data disputes the administration's underlying drug-trafficking-route claims." },
  { d: "Jul 8, 2026", t: "Cuba takes the blockade to the UN General Assembly", x: "Cuba's Foreign Minister cites a record $8B in damage from March 2025 to February 2026, excluding the fuel blockade's impact. A procedural vote passes 136-9-30 — but Germany and Canada abstain, signaling erosion of Cuba's traditional UN support." },
  { d: "Aug 3, 2026", t: "Earthquake toll passes 6,125", x: "Venezuela's National Assembly President confirms 6,125 dead and 61,000 hospitalized from the June 24 twin earthquakes. The World Bank estimates roughly $20B in physical damage." },
  { d: "Aug 3–12, 2026", t: "First in-person transition talks", x: "Venezuela's interim government and the opposition bloc hold their first in-person talks in Caracas, concluding with agreements to reform the judiciary and pursue recovery of gold reserves frozen at the Bank of England for earthquake reconstruction. Secretary of State Rubio calls it the start of a 'transition process'; Trump says the country is 'not ready yet' for elections." },
];

const SECTIONS = [
  {
    h: "Two campaigns, one administration",
    p: "What's unfolding in the Caribbean is really two overlapping US campaigns. The first is a maritime interdiction and eventually regime-change operation against Venezuela, framed around drug trafficking and culminating in Nicolás Maduro's January 2026 capture. The second is an economic-pressure campaign against Cuba, using an oil blockade to sever Havana's fuel lifeline — largely because Venezuela had been Cuba's main crude supplier. The two are connected by geography and by the same set of tools (interdiction, tariffs, indictment), but they are legally and operationally distinct actions.",
  },
  {
    h: "Why the boat strikes are contested",
    p: "The administration frames the strikes on vessels departing Venezuela as counter-narcotics enforcement. Independent trackers and the UN dispute the underlying premise, questioning whether all struck vessels were actually running drug routes, and whether extrajudicial lethal strikes against suspected traffickers are lawful under international law. Over 220 people have been killed across more than 60 strikes since September 2025 — a toll that has drawn sustained criticism even as the administration says the campaign will continue.",
  },
  {
    h: "The Cuba blockade's humanitarian toll",
    p: "Executive Order 14380 doesn't strike Cuba directly — it pressures any third country that supplies Cuba with oil. Havana ran out of oil and diesel entirely by May 2026, and by June the UN's human rights office was documenting a genuine humanitarian collapse: rising infant mortality, collapsing food production, and medicine supplies at roughly a third of normal levels. Russia's blockade-running tanker shipment in March showed the blockade isn't airtight, but it hasn't meaningfully eased the shortage.",
  },
  {
    h: "Where it stands now",
    p: "Two disasters have now converged on Venezuela: the aftermath of Maduro's capture and a devastating earthquake in June 2026 that killed over 6,000 people. The August transition talks between the interim government and the opposition — the first in-person negotiations of their kind — suggest a political process is finally starting, focused as much on earthquake reconstruction financing as on the shape of any eventual elections. Trump has said the country isn't ready for elections yet; no timeline has been set.",
  },
];

export const Route = createFileRoute("/background/venezuela-cuba-crisis-explained")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "venezuela crisis explained, maduro capture, us cuba blockade, operation southern spear, venezuela cuba 2026, tren de aragua, venezuela earthquake, operation absolute resolve",
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
      { property: "og:image:alt", content: "Map of Venezuela, Cuba and the Caribbean with conflict markers" },
      { name: "twitter:image", content: IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "US Intervention in Venezuela and Cuba, Explained",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Thing", name: "Venezuela crisis" },
            { "@type": "Thing", name: "Cuba oil blockade" },
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
              name: "Was Maduro captured by the US?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. On January 3, 2026, US special operations forces conducted Operation Absolute Resolve, striking Caracas and capturing Nicolás Maduro and his wife Cilia Flores, who were flown to New York to face narcoterrorism charges. The operation lasted approximately 2 hours 20 minutes.",
              },
            },
            {
              "@type": "Question",
              name: "Why is the US blockading Cuba?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Executive Order 14380, signed January 29, 2026, authorizes tariffs on any country supplying oil to Cuba, effectively blockading Cuban fuel imports. It follows the loss of Cuba's main supplier, Venezuela, after the US intervention there. The UN has documented a resulting humanitarian collapse, including rising infant mortality and collapsed food production.",
              },
            },
            {
              "@type": "Question",
              name: "Is Venezuela having elections?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Not yet. As of August 2026, Venezuela's interim government and opposition bloc have held their first in-person transition talks, but President Trump has said the country is 'not ready yet' for elections, and no timeline has been announced.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: VenezuelaCubaPrimer,
});

function VenezuelaCubaPrimer() {
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
        <Link to="/" style={{ fontSize: 11, color: "#5b8ec8", textDecoration: "none", fontWeight: 700 }}>
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
          Background Primer · Americas
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          US Intervention in Venezuela and Cuba, Explained
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          A boat-strike campaign against alleged drug traffickers escalated into Maduro's capture, a
          Cuba oil blockade, and now a fragile political transition — complicated further by a
          devastating 2026 earthquake. Here's the full timeline.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>At a glance</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {STATS.map((s) => (
            <div
              key={s.label}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderRadius: 12,
                padding: "12px 14px",
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: T.accent }}>{s.val}</div>
              <div style={{ fontSize: 12, fontWeight: 700, marginTop: 2 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: T.sub, marginTop: 3, lineHeight: 1.4 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>The full assessment</h2>
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

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>Full timeline</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {TIMELINE.map((e) => (
            <div
              key={e.d + e.t}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderLeft: `3px solid ${T.accent}`,
                borderRadius: 10,
                padding: "10px 14px",
              }}
            >
              <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 3 }}>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: T.accent, whiteSpace: "nowrap" }}>
                  {e.d}
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 700 }}>{e.t}</span>
              </div>
              <p style={{ fontSize: 12, lineHeight: 1.55, color: T.sub, margin: 0 }}>{e.x}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 12.5, lineHeight: 1.75, color: T.sub, marginTop: 24 }}>
          This timeline synthesizes the full Venezuela and Cuba event log tracked in real time on the{" "}
          <Link to="/" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            main conflict dashboard
          </Link>
          , under Theaters → Americas.
        </p>

        <p style={{ fontSize: 10, color: T.sub, marginTop: 24, textTransform: "uppercase", letterSpacing: ".12em" }}>
          Unclassified · OSINT · Not an independent intelligence product — synthesized from
          open-source theater data tracked elsewhere on this site
        </p>
      </div>
    </main>
  );
}
