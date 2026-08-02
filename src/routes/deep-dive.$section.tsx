import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/components/WorldConflictDebrief.jsx";

// NOTE FOR AGENT: verify this import path/export matches how src/routes/index.tsx
// currently imports the same component. If index.tsx uses a different relative
// path or a named export instead of default, adjust this import to match exactly
// — do not guess, check the working import in index.tsx and mirror it.

const BASE_URL = "https://conflictdash.lovable.app";

const SECTION_META = {
  ukraine: {
    title: "Ukraine War Deep Dive — Losses, Frontline, Diplomacy",
    description:
      "Live analysis of the Ukraine war: Russian losses, frontline movement, air defense, deep strikes, manpower, and diplomacy — updated twice daily.",
  },
  dronewar: {
    title: "Drone War Deep Dive — Strikes, Saturation, Intercepts",
    description:
      "Live tracking of the Ukraine-Russia drone war: nightly strikes, interception rates, saturation analysis, and the economics of drone defense.",
  },
  usmil: {
    title: "Great Power Rivalry Deep Dive — US, China, NATO",
    description:
      "US-China military posture, NATO alliance trends, defense industry capacity, and the systems shaping great-power competition in 2026.",
  },
  iran: {
    title: "Iran War Deep Dive — Escalation, Hormuz, Diplomacy",
    description:
      "Live analysis of the 2026 US-Iran war: military escalation, the Strait of Hormuz, nuclear diplomacy, and regional spillover.",
  },
  gaza: {
    title: "Israel & the Levant Deep Dive — Gaza, Lebanon, Syria",
    description:
      "Live tracking of Gaza's ceasefire, the Lebanon front, Syria's transition, and the humanitarian and governance crises across the Levant.",
  },
  scs: {
    title: "South China Sea & Taiwan Deep Dive — Incidents, Military Balance",
    description:
      "Live tracking of South China Sea incidents, Taiwan Strait tensions, and the military and legal dimensions of the region's flashpoints.",
  },
  nuclear: {
    title: "Strategic & Hybrid Deep Dive — Nuclear Risk, Cyber Warfare",
    description:
      "Global nuclear arsenals, escalation risk, delivery systems, treaty status, and the cyber and hybrid warfare campaigns running alongside them.",
  },
  venezuela: {
    title: "Americas Deep Dive — Venezuela, Cuba, Mexico, Haiti, Colombia",
    description:
      "Live tracking of the Venezuela intervention, Cuba's blockade, Mexico's cartel war, Haiti's gang crisis, and Colombia's fractured peace process.",
  },
  africa: {
    title: "Africa Deep Dive — Sudan, DR Congo, Sahel",
    description:
      "Live analysis of Sudan's civil war, the DR Congo's M23 conflict, and the Sahel jihadist insurgency — three of the world's most severe active wars.",
  },
  southasia: {
    title: "South Asia Deep Dive — India-Pakistan, Pakistan-Afghanistan",
    description:
      "Live analysis of the India-Pakistan ceasefire and the Pakistan-Afghanistan war — two nuclear-adjacent flashpoints in South Asia.",
  },
};

const DEFAULT_META = {
  title: "Deep Dive — World Conflict Debrief",
  description: "Live open-source conflict analysis across every active theater tracked by World Conflict Debrief.",
};

export const Route = createFileRoute("/deep-dive/$section")({
  head: ({ params }) => {
    const meta = SECTION_META[params.section] || DEFAULT_META;
    const url = `${BASE_URL}/deep-dive/${params.section}`;
    const fullTitle = `${meta.title} | World Conflict Debrief`;
    return {
      meta: [
        { title: fullTitle },
        { name: "description", content: meta.description },
        { property: "og:type", content: "website" },
        { property: "og:title", content: fullTitle },
        { property: "og:description", content: meta.description },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: fullTitle },
        { name: "twitter:description", content: meta.description },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: DeepDiveSectionPage,
});

function DeepDiveSectionPage() {
  const { section } = Route.useParams();
  return <Dashboard initialView="deepdive" initialSection={section} />;
}
