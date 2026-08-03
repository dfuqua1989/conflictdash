import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/components/WorldConflictDebrief.jsx";

const BASE_URL = "https://conflictdash.lovable.app";

// Titles kept short deliberately: each gets " | World Conflict Debrief" (25 chars)
// appended below, so title text here should stay under ~35 chars to land the
// combined title around 55-60 chars total — consistent with the rest of the site.
const SECTION_META: Record<string, { title: string; description: string }> = {
  ukraine: {
    title: "Ukraine War — Losses & Frontline",
    description:
      "Live analysis of the Ukraine war: Russian losses, frontline movement, air defense, deep strikes, manpower, and diplomacy — updated twice daily.",
  },
  dronewar: {
    title: "Drone War — Strikes & Intercepts",
    description:
      "Live tracking of the Ukraine-Russia drone war: nightly strikes, interception rates, saturation analysis, and the economics of drone defense.",
  },
  usmil: {
    title: "Great Powers — US, China, Russia",
    description:
      "US-China military posture, nuclear arsenals, escalation risk, NATO alliance trends, and the systems shaping great-power competition in 2026.",
  },
  iran: {
    title: "Iran War — Escalation & Hormuz",
    description:
      "Live analysis of the 2026 US-Iran war: military escalation, the Strait of Hormuz, nuclear diplomacy, and regional spillover.",
  },
  gaza: {
    title: "Gaza, Lebanon & the Levant",
    description:
      "Live tracking of Gaza's ceasefire, the Lebanon front, Syria's transition, and the humanitarian and governance crises across the Levant.",
  },
  scs: {
    title: "South China Sea & Taiwan",
    description:
      "Live tracking of South China Sea incidents, Taiwan Strait tensions, and the military and legal dimensions of the region's flashpoints.",
  },
  venezuela: {
    title: "Americas — Venezuela to Colombia",
    description:
      "Live tracking of the Venezuela intervention, Cuba's blockade, Mexico's cartel war, Haiti's gang crisis, and Colombia's fractured peace process.",
  },
  africa: {
    title: "Africa — Sudan, DR Congo, Sahel",
    description:
      "Live analysis of Sudan's civil war, the DR Congo's M23 conflict, and the Sahel jihadist insurgency — three of the world's most severe active wars.",
  },
  southasia: {
    title: "India-Pakistan & Afghanistan Wars",
    description:
      "Live analysis of the India-Pakistan ceasefire and the Pakistan-Afghanistan war — two nuclear-adjacent flashpoints in South Asia.",
  },
};

const DEFAULT_META = {
  title: "Deep Dive",
  description: "Live open-source conflict analysis across every active theater tracked by World Conflict Debrief.",
};

export const Route = createFileRoute("/deep-dive/$section")({
  head: ({ params }) => {
    const meta = SECTION_META[params.section] || DEFAULT_META;
    const url = `${BASE_URL}/deep-dive/${params.section}`;
    const fullTitle = `${meta.title} | World Conflict Debrief`;
    return {
      // Explicit property/name keys on every tag so this page's values are the
      // only og:*/twitter:* tags present — nothing here should be left to merge
      // with root defaults. See agent note in the push message re: verifying
      // __root.tsx doesn't also emit a competing og:title/og:description.
      meta: [
        { title: fullTitle },
        { name: "description", content: meta.description },
        { property: "og:type", content: "website" },
        { property: "og:title", content: fullTitle },
        { property: "og:description", content: meta.description },
        { property: "og:url", content: url },
        { property: "og:site_name", content: "World Conflict Debrief" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: fullTitle },
        { name: "twitter:description", content: meta.description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: meta.title,
            description: meta.description,
            mainEntityOfPage: url,
            author: { "@type": "Organization", name: "World Conflict Debrief" },
            publisher: { "@type": "Organization", name: "World Conflict Debrief" },
          }),
        },
      ],
    };
  },
  component: DeepDiveSectionPage,
});

function DeepDiveSectionPage() {
  const { section } = Route.useParams();
  return <Dashboard initialView="deepdive" initialSection={section} />;
}
