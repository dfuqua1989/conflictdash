import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "The DRC-M23 Conflict Explained | World Conflict Debrief";
const DESCRIPTION =
  "How Rwanda-backed M23 rebels seized Goma and Bukavu, why critical minerals are central to any peace deal, and where the fragile DRC-M23 peace process stands in 2026.";
const URL = "https://conflictdash.lovable.app/background/drc-m23-conflict-explained";
const SOCIAL_TITLE = "The DRC-M23 Conflict Explained | World Conflict Debrief";
const SOCIAL_DESCRIPTION =
  "M23 rebels seized two provincial capitals in eastern DRC in 2025. A Washington-brokered peace deal followed — but fighting never really stopped, and critical minerals are at the center of why.";
const IMAGE = "https://conflictdash.lovable.app/og-image.png";

const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const T = {
  bg: "#0a1017",
  card: "#111a24",
  text: "#cdd8e3",
  sub: "#8496a8",
  border: "rgba(120,150,180,0.20)",
  accent: "#dc2626",
};

const STATS = [
  { val: "7M+", label: "Internally displaced", sub: "Among the world's largest displacement crises" },
  { val: "Jan '25", label: "Goma falls", sub: "North Kivu's capital seized by M23" },
  { val: "Feb '25", label: "Bukavu falls", sub: "South Kivu's capital, second major city taken" },
  { val: "Aug 18", label: "2026 signing target", sub: "Full peace agreement deadline, set Jul 19" },
];

const TIMELINE = [
  { d: "2012 / 2021", t: "M23 emerges, then resurfaces", x: "The Tutsi-led March 23 Movement first emerged in 2012 and resurfaced as an active armed group in 2021, eventually launching a major offensive in North and South Kivu in early 2025." },
  { d: "Jan 27, 2025", t: "Goma falls", x: "M23 seizes Goma, the capital of North Kivu province — the most significant territorial shift in eastern DRC's three-decade conflict in years. Banks in the city remain closed more than a year later." },
  { d: "Feb 18, 2025", t: "Bukavu falls", x: "South Kivu's capital, the second major provincial city, falls to M23. The group now controls both provincial capitals in mineral-rich eastern DRC." },
  { d: "Jun 2025", t: "Washington Accords signed", x: "A US-brokered peace framework is signed, demanding 'disengagement, disarmament and conditional integration' of armed groups. Kinshasa, having turned to Washington for security guarantees, reportedly offers US access to critical minerals in exchange." },
  { d: "Late 2025", t: "Doha framework follows", x: "A follow-up framework between the DRC government and M23 directly follows the Washington Accords, with a comprehensive peace deal targeted for summer 2026." },
  { d: "Oct 2025", t: "UN presses for Commission of Inquiry", x: "The UN Human Rights Council presses for a Commission of Inquiry field mission by January 2026 — later delayed by UN funding shortages." },
  { d: "Early 2026", t: "Fighting resumes and intensifies", x: "Despite the frameworks, fighting not only resumes but intensifies in several areas. Most of the eight peace-framework pillars remain unimplemented." },
  { d: "Jul 19, 2026", t: "New signing target set: Aug 18", x: "The DRC and M23 commit, in a declaration of principles signed in Doha under Qatari mediation, to sign a full peace agreement by August 18. Negotiations on remaining terms are set to restart no later than August 8." },
  { d: "Aug 7, 2026", t: "M23 expels government member from verification mechanism", x: "M23 expels a Congolese government representative from the joint ceasefire verification mechanism established under the Washington Accords — a real complication for the Aug 18 signing target, not a clean run-up. The same week, the Congolese government releases M23 prisoners under the agreed prisoner-exchange mechanism, and Rwanda claims it repatriated roughly 300 refugees from the DRC. Pro-government Wazalendo fighters clash with M23 near Kavumu airport in South Kivu." },
  { d: "Aug 14, 2026", t: "AU/SADC adopt six-month peace roadmap", x: "Former African heads of state — Nigeria's Obasanjo, Ethiopia's Sahle-Work Zewde, Botswana's Masisi, and Kenya's Kenyatta among them — help broker a six-month DRC peace roadmap adopted by the AU and SADC. The International Contact Group for the Great Lakes urges the DRC to implement a plan to disarm the FDLR militia, even as M23 and pro-government forces continue clashing in Kalehe district, South Kivu." },
];

const SECTIONS = [
  {
    h: "A resurfaced rebellion, not a new one",
    p: "M23 — the March 23 Movement — first emerged in 2012, was largely dormant for years, then resurfaced in 2021 before launching the offensive that seized Goma and Bukavu in early 2025. The group presents itself as protecting Congolese Tutsi communities from persecution. The DRC government and independent UN reporting describe it instead as a proxy force for Rwanda; Rwanda denies backing the group. Whichever framing is accurate, the practical result was the fastest territorial shift in eastern DRC's three-decade conflict in years.",
  },
  {
    h: "Why critical minerals are central to the peace deal",
    p: "Eastern DRC holds some of the world's largest reserves of coltan (used in virtually every smartphone and laptop), cobalt, and tin — and that's precisely the territory M23 seized. After losing Goma and Bukavu, Kinshasa turned to Washington for security guarantees, reportedly offering the US access to critical minerals in exchange for pressure on Rwanda. That mineral-access arrangement is widely seen as the deciding factor that brought Rwanda to the negotiating table at all — which is also why residents and former officials in M23-held Goma have dismissed the resulting peace agreement as a transaction over resources rather than a genuine settlement.",
  },
  {
    h: "A peace process that keeps slipping",
    p: "The Washington Accords (June 2025) and the follow-up Doha framework (late 2025) were both supposed to produce a comprehensive deal by summer 2026. Instead, fighting resumed and intensified in early 2026, and most of the eight peace-framework pillars remain unimplemented. A new signing target of August 18, 2026 was set in July — but by early August, M23 had already expelled a Congolese government representative from the ceasefire verification mechanism, and fighting continued in Kalehe district even as the AU and SADC adopted a new six-month roadmap. This is now the third deadline structure in just over a year.",
  },
  {
    h: "What's actually moving, even amid the setbacks",
    p: "It isn't all stalled: prisoner exchanges between the DRC government and M23 have continued on schedule, Rwanda claims to have repatriated roughly 300 refugees, and a genuine six-month diplomatic roadmap now exists with buy-in from senior African statesmen. The pattern is one of parallel tracks — real diplomatic and humanitarian progress alongside continued low-level fighting — rather than either a collapsed process or a clean resolution.",
  },
];

export const Route = createFileRoute("/background/drc-m23-conflict-explained")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "drc m23 conflict explained, why is congo at war, m23 rebels, goma bukavu, congo rwanda conflict, drc peace deal 2026, congo critical minerals",
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
      { property: "og:image:alt", content: "Map of eastern DRC showing Goma and Bukavu" },
      { name: "twitter:image", content: IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "The DRC-M23 Conflict Explained",
          description: DESCRIPTION,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "World Conflict Debrief" },
          publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          about: [
            { "@type": "Thing", name: "DRC conflict" },
            { "@type": "Thing", name: "M23 rebellion" },
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
              name: "Who is M23 and what do they want?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "M23 (the March 23 Movement) is a Tutsi-led rebel group that first emerged in 2012 and resurfaced in 2021. It presents itself as protecting Congolese Tutsi communities, while the DRC government and independent UN reporting describe it as a Rwandan proxy force; Rwanda denies backing it. M23 seized the provincial capitals Goma and Bukavu in early 2025.",
              },
            },
            {
              "@type": "Question",
              name: "Is there a DRC-M23 peace deal?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A US-brokered framework (the Washington Accords) was signed in June 2025, followed by a Doha framework in late 2025, but fighting resumed and intensified in 2026. A new full peace agreement signing target of August 18, 2026 was set in July, though M23 expelled a Congolese government official from the ceasefire verification mechanism in early August, complicating that target.",
              },
            },
            {
              "@type": "Question",
              name: "Why do critical minerals matter to the DRC conflict?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Eastern DRC holds some of the world's largest reserves of coltan, cobalt, and tin — exactly the territory M23 seized. Kinshasa reportedly offered the US access to these minerals in exchange for security guarantees and pressure on Rwanda, which analysts widely see as the deciding factor that brought Rwanda to the negotiating table.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: DrcM23Primer,
});

function DrcM23Primer() {
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
          Background Primer · Africa
        </div>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 10px", fontWeight: 800 }}>
          The DRC-M23 Conflict, Explained
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.sub, margin: 0 }}>
          Rwanda-backed M23 rebels seized two provincial capitals in eastern DRC in early 2025. A
          Washington-brokered peace deal followed — but fighting never really stopped, and critical
          minerals sit at the center of why.
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
          This timeline synthesizes the full DRC event log tracked in real time on the{" "}
          <Link to="/" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            main conflict dashboard
          </Link>
          , under Theaters → Africa, alongside{" "}
          <Link to="/background/why-sudan-is-at-war" style={{ color: "#5b8ec8", fontWeight: 700 }}>
            the Sudan conflict explainer
          </Link>
          .
        </p>

        <p style={{ fontSize: 10, color: T.sub, marginTop: 24, textTransform: "uppercase", letterSpacing: ".12em" }}>
          Unclassified · OSINT · Not an independent intelligence product — synthesized from
          open-source theater data tracked elsewhere on this site
        </p>
      </div>
    </main>
  );
}
