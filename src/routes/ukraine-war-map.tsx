import { createFileRoute, Link } from "@tanstack/react-router";
import { BRIEFINGS } from "@/data/briefings";

const TITLE = "Ukraine War Map 2026 — Live Frontline & Daily Briefing";
const DESCRIPTION =
  "Where the Ukraine frontline stands in 2026: an axis-by-axis map of Donetsk, Zaporizhzhia, Kharkiv and Kherson, plus a daily open-source briefing on the war.";
const URL = "https://conflictdash.lovable.app/ukraine-war-map";
const IMAGE = "https://conflictdash.lovable.app/og-image.png";

const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const T = {
  bg: "#0a1017",
  card: "#111a24",
  text: "#cdd8e3",
  sub: "#8496a8",
  border: "rgba(120,150,180,0.20)",
  accent: "#dc2626",
  link: "#5b8ec8",
};

const AXES = [
  {
    name: "Pokrovsk – Myrnohrad (Donetsk)",
    status: "MOST ACTIVE",
    color: "#dc2626",
    text: "The main effort of the Russian summer campaign. Pressure is applied by infiltration and flank envelopment rather than massed armour, with the logistics roads west of the city the real objective.",
  },
  {
    name: "Kostiantynivka – Chasiv Yar (Donetsk)",
    status: "HEAVY",
    color: "#f97316",
    text: "Slow, block-by-block attrition on the approach to the Sloviansk–Kramatorsk belt, the last major urban cluster in Donetsk oblast still under Ukrainian control.",
  },
  {
    name: "Kupiansk – Lyman (Kharkiv)",
    status: "CONTESTED",
    color: "#f97316",
    text: "Persistent Russian attempts to force the Oskil river line, repeatedly checked and locally reversed. A supporting axis intended to fix Ukrainian reserves away from Donetsk.",
  },
  {
    name: "Orikhiv – Robotyne (Zaporizhzhia)",
    status: "STATIC",
    color: "#eab308",
    text: "Largely positional. Dense minefields and drone saturation on both sides make manoeuvre prohibitively costly; the line has moved only marginally in either direction.",
  },
  {
    name: "Kherson – Dnipro river line",
    status: "STATIC / STRIKE WAR",
    color: "#eab308",
    text: "No ground manoeuvre across the river. This axis is fought almost entirely with artillery, FPV drones and glide bombs against the city and the right bank.",
  },
  {
    name: "Black Sea & deep-strike corridor",
    status: "UKRAINIAN INITIATIVE",
    color: "#22c55e",
    text: "Where Ukraine holds the asymmetric advantage: naval drones, long-range strikes on refineries and airbases, and a functioning grain corridor despite the absence of a surface fleet.",
  },
];

const SECTIONS = [
  {
    h: "How to read any Ukraine war map",
    p: "Frontline maps published by ISW, DeepState and open-source mappers are drawn from geolocated imagery — usually a soldier's video or a claimed flag — which means every map lags reality by roughly 24 to 72 hours and shows 'claimed' zones alongside confirmed ones. Territory shaded as Russian advance is frequently a grey zone controlled by neither side and covered by drones from both. The practical rule: treat colour changes of less than a few kilometres as noise, and watch the road and rail junctions rather than the shading.",
  },
  {
    h: "Where the war actually stands",
    p: "The line has not moved decisively in either direction for a prolonged period. Russia holds the initiative on the ground in Donetsk and buys small advances at very high cost in personnel and vehicles; Ukraine holds the initiative in the deep-strike and maritime domains, where refineries, airbases and Black Sea assets are being hit far behind the line. Neither posture is currently capable of producing a collapse, which is why the war is best tracked as a daily attrition ledger rather than as a map of arrows.",
  },
  {
    h: "What would actually change the map",
    p: "Three variables: the availability of Ukrainian air defence interceptors, which determines whether cities and power generation survive the strike campaign; Russian ability to generate assault infantry without a further mobilisation; and the tempo of Western materiel and licensing decisions. A visible change on the map is a lagging indicator of all three — the leading indicators are drone-production figures, interceptor deliveries and recruitment numbers, all of which are tracked daily on the dashboard.",
  },
];

const FAQ = [
  {
    q: "Who is winning the war in Ukraine?",
    a: "Neither side is winning in the sense of achieving its stated war aims. Russia is making incremental territorial gains in Donetsk oblast at a cost in personnel and equipment that far exceeds the ground taken, while Ukraine is inflicting disproportionate losses and holding the advantage in deep strikes and the Black Sea. The war is currently an attrition contest rather than a war of manoeuvre, and the frontline has changed only marginally over the past year.",
  },
  {
    q: "Where is the fighting in Ukraine today?",
    a: "The heaviest fighting is concentrated in Donetsk oblast, on the Pokrovsk–Myrnohrad and Kostiantynivka–Chasiv Yar axes, with secondary pressure around Kupiansk and Lyman in Kharkiv oblast. The Zaporizhzhia and Kherson fronts are largely static and fought with artillery, glide bombs and drones rather than ground assaults. Long-range strikes continue against targets deep inside both countries.",
  },
  {
    q: "Can you see the Ukraine war on Google Maps?",
    a: "No. Google Maps does not display frontlines, military positions or occupied territory, and satellite imagery in the region is deliberately delayed and degraded. Frontline data comes instead from open-source analysts who geolocate combat footage — principally the Institute for the Study of War, DeepStateMap and Liveuamap — and from official general staff reporting on both sides.",
  },
  {
    q: "How much Ukrainian territory does Russia control?",
    a: "Russia occupies roughly a fifth of Ukraine, comprising Crimea and parts of Donetsk, Luhansk, Zaporizhzhia and Kherson oblasts. That share has been broadly stable for an extended period; changes are measured in square kilometres per week rather than in oblasts, which is why month-to-month map comparisons show almost no visible difference at national scale.",
  },
  {
    q: "How accurate are live Ukraine war maps?",
    a: "Accurate to within a few kilometres and lagging by roughly one to three days. Mappers only shade territory once combat footage can be geolocated, so confirmed control trails actual control, and 'grey zones' held by neither side are often rendered as though one side owns them. Cross-referencing two independent mappers, and reading the daily written assessment alongside the map, is the reliable approach.",
  },
  {
    q: "How often is this Ukraine briefing updated?",
    a: "Twice daily. The live dashboard is refreshed from open-source intelligence — Ukrainian General Staff, Russian MoD, ISW, ACLED and major wire reporting — and each day's assessment is archived as a dated briefing page you can read back through.",
  },
];

const LATEST_DATE = BRIEFINGS[0]?.date ?? "2026-08-22";

export const Route = createFileRoute("/ukraine-war-map")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "ukraine war map, russia ukraine war map, ukraine live map, ukraine frontline map, who is winning the war in ukraine, ukraine war news today, war in europe ukraine",
      },
      { property: "og:type", content: "article" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { property: "og:image", content: IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Schematic map of the Ukraine frontline" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Ukraine War Map 2026: Live Frontline and Daily Briefing",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          datePublished: LATEST_DATE,
          dateModified: LATEST_DATE,
          image: IMAGE,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Thing", name: "Russo-Ukrainian War" },
            { "@type": "Thing", name: "Ukraine frontline map" },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "World Conflict Debrief",
              item: "https://conflictdash.lovable.app/",
            },
            { "@type": "ListItem", position: 2, name: "Ukraine War Map", item: URL },
          ],
        }),
      },
    ],
  }),
  component: UkraineWarMapPage,
});

function FrontlineMap() {
  return (
    <svg
      viewBox="0 0 620 380"
      role="img"
      aria-label="Schematic map of Ukraine showing the approximate 2026 frontline, occupied territory in the east and south, and the most active combat axes"
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        background: "#0b131c",
        borderRadius: 12,
        border: `1px solid ${T.border}`,
      }}
    >
      <defs>
        <pattern id="occ" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="8" fill="#3a1418" />
          <rect width="3" height="8" fill="#5c1f26" />
        </pattern>
      </defs>

      {/* Ukraine outline (schematic) */}
      <path
        d="M70 120 L110 78 L175 62 L245 70 L300 52 L360 62 L420 52 L482 78 L536 108 L560 152 L536 200 L500 236 L470 292 L410 318 L340 330 L272 316 L214 330 L156 312 L112 268 L82 214 Z"
        fill="#132030"
        stroke="#3f5f80"
        strokeWidth="2"
      />

      {/* Occupied east / south (schematic) */}
      <path
        d="M420 52 L482 78 L536 108 L560 152 L536 200 L500 236 L470 292 L410 318 L372 300 L392 236 L378 178 L400 118 Z"
        fill="url(#occ)"
        stroke="#8f2b34"
        strokeWidth="1.5"
      />

      {/* Crimea */}
      <path d="M392 300 L452 306 L470 292 L440 336 L392 328 Z" fill="url(#occ)" stroke="#8f2b34" strokeWidth="1.5" />

      {/* Frontline */}
      <path
        d="M400 118 L378 178 L392 236 L372 300"
        fill="none"
        stroke="#ff3b3b"
        strokeWidth="3.5"
        strokeDasharray="10 5"
        strokeLinecap="round"
      />

      {/* Hotspots */}
      {[
        { x: 386, y: 196, label: "Pokrovsk" },
        { x: 396, y: 168, label: "Kostiantynivka" },
        { x: 400, y: 122, label: "Kupiansk" },
        { x: 356, y: 258, label: "Orikhiv" },
        { x: 320, y: 296, label: "Kherson" },
      ].map((h) => (
        <g key={h.label}>
          <circle cx={h.x} cy={h.y} r="5" fill="#ff5f5f" stroke="#0b131c" strokeWidth="1.5" />
          <text x={h.x + 9} y={h.y + 4} fill="#cdd8e3" fontSize="10" fontFamily={FONT}>
            {h.label}
          </text>
        </g>
      ))}

      <g>
        <circle cx="238" cy="150" r="4" fill="#5b8ec8" />
        <text x="247" y="154" fill="#8496a8" fontSize="10" fontFamily={FONT}>
          Kyiv
        </text>
      </g>

      {/* Legend */}
      <g fontFamily={FONT} fontSize="10">
        <rect x="20" y="300" width="12" height="10" fill="url(#occ)" stroke="#8f2b34" />
        <text x="38" y="309" fill="#8496a8">Russian-occupied (approx.)</text>
        <line x1="20" y1="326" x2="32" y2="326" stroke="#ff3b3b" strokeWidth="3" strokeDasharray="6 4" />
        <text x="38" y="330" fill="#8496a8">Active frontline</text>
        <circle cx="26" cy="345" r="4" fill="#ff5f5f" />
        <text x="38" y="349" fill="#8496a8">Contested hotspot</text>
      </g>
    </svg>
  );
}

function UkraineWarMapPage() {
  const latest = BRIEFINGS[0];

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
        <Link to="/" style={{ fontSize: 11, color: T.link, textDecoration: "none", fontWeight: 700 }}>
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
          Theater Reference · Ukraine
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          Ukraine War Map: Where the Frontline Stands in 2026
        </h1>
        <p style={{ fontSize: 11, color: T.sub, margin: "0 0 10px" }}>
          <time dateTime={LATEST_DATE}>Updated {LATEST_DATE}</time> · current through the latest
          daily briefing
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          A schematic read of the Ukraine frontline — which axes are moving, which are frozen, and
          how to interpret the live maps published by open-source analysts. Updated alongside the
          twice-daily briefing on the main dashboard.
        </p>

        <div style={{ marginTop: 20 }}>
          <FrontlineMap />
          <p style={{ fontSize: 10.5, color: T.sub, margin: "8px 2px 0", lineHeight: 1.6 }}>
            Schematic, not survey-grade. Shapes are simplified for orientation; for geolocated
            daily control changes consult ISW or DeepStateMap alongside this assessment.
          </p>
        </div>

        {latest && (
          <div
            style={{
              marginTop: 22,
              background: T.card,
              border: `1px solid ${T.border}`,
              borderLeft: `3px solid ${T.accent}`,
              borderRadius: 12,
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: T.accent,
                fontWeight: 800,
                marginBottom: 6,
              }}
            >
              Latest daily briefing · {latest.date}
            </div>
            <h2 style={{ fontSize: 14.5, fontWeight: 800, margin: "0 0 6px", lineHeight: 1.4 }}>
              {latest.title}
            </h2>
            <p style={{ fontSize: 12.5, lineHeight: 1.7, color: T.sub, margin: "0 0 10px" }}>
              {latest.lede}
            </p>
            <Link
              to="/briefing/$date"
              params={{ date: latest.date }}
              style={{ fontSize: 12, color: T.link, fontWeight: 700, textDecoration: "none" }}
            >
              Read the full briefing →
            </Link>
          </div>
        )}

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          The frontline, axis by axis
        </h2>
        <div style={{ display: "grid", gap: 10 }}>
          {AXES.map((a) => (
            <div
              key={a.name}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderRadius: 12,
                padding: "14px 16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  marginBottom: 6,
                  flexWrap: "wrap",
                }}
              >
                <h3 style={{ fontSize: 13, fontWeight: 800, margin: 0 }}>{a.name}</h3>
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: 800,
                    color: a.color,
                    border: `1px solid ${a.color}`,
                    borderRadius: 6,
                    padding: "2px 8px",
                    letterSpacing: ".05em",
                  }}
                >
                  {a.status}
                </span>
              </div>
              <p style={{ fontSize: 12.5, lineHeight: 1.6, color: T.sub, margin: 0 }}>{a.text}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>Reading the war</h2>
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

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>
          Ukraine war questions, answered
        </h2>
        {FAQ.map((f) => (
          <section
            key={f.q}
            style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              padding: "14px 16px",
              marginBottom: 10,
            }}
          >
            <h3 style={{ fontSize: 13, fontWeight: 800, margin: "0 0 6px" }}>{f.q}</h3>
            <p style={{ fontSize: 12.5, lineHeight: 1.7, color: T.sub, margin: 0 }}>{f.a}</p>
          </section>
        ))}

        <h2 style={{ fontSize: 16, fontWeight: 800, margin: "30px 0 12px" }}>Keep reading</h2>
        <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
          {[
            { to: "/deep-dive/ukraine", label: "Live Ukraine theater data on the dashboard" },
            { to: "/background/russian-casualties-ukraine", label: "Russian casualties in Ukraine, explained" },
            { to: "/briefing", label: "The full daily briefing archive" },
            { to: "/conflicts", label: "Every active conflict we track" },
            { to: "/background/world-war-3-risk", label: "How close are we to World War 3?" },
          ].map((l) => (
            <li key={l.to} style={{ marginBottom: 6 }}>
              <Link to={l.to} style={{ fontSize: 12.5, color: T.link, fontWeight: 700, textDecoration: "none" }}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

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
