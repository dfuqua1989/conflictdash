import { createFileRoute } from "@tanstack/react-router";
import WorldConflictDebrief from "@/components/WorldConflictDebrief.jsx";

const TITLE = "Global Conflict Tracker — Live OSINT Dashboard | World Conflict Debrief";
const DESCRIPTION =
  "Live global conflict tracker and OSINT dashboard. Daily situation reports on Ukraine, Gaza, Iran, Taiwan, South China Sea, Sudan, and North Korea — casualties, displacement, drone activity, and trend analysis.";
const URL = "https://conflictdash.lovable.app/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "global conflict tracker, world conflict map, osint dashboard, ukraine war live, gaza ceasefire, taiwan strait, north korea, daily conflict briefing",
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "World Conflict Debrief" },
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
          "@type": "WebSite",
          name: "World Conflict Debrief",
          alternateName: "Global Conflict Tracker",
          url: URL,
          description: DESCRIPTION,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "World Conflict Debrief",
          url: URL,
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
              name: "How often is the Global Conflict Tracker updated?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The dashboard is refreshed daily with situation reports aggregated from open-source intelligence, including Ukrainian General Staff, Russian MoD, ISW, ACLED, UN OCHA, CSIS, and major news outlets.",
              },
            },
            {
              "@type": "Question",
              name: "Which conflicts does the dashboard track?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Ukraine, Gaza and the West Bank, the US–Iran situation, Taiwan Strait, South China Sea, the Caribbean and Cuba blockade, Venezuela, and North Korea.",
              },
            },
            {
              "@type": "Question",
              name: "What sources feed the OSINT dashboard?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Open-source intelligence from Ukrainian Air Force, Russian MoD, Institute for the Study of War (ISW), ACLED, UN HRMMU, CSIS, and reporting from AP, Reuters, BBC, and Al Jazeera.",
              },
            },
            {
              "@type": "Question",
              name: "Is Ukraine still at war with Russia?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The full-scale Russian invasion of Ukraine that began February 24, 2022 remains active. The dashboard tracks daily casualties, equipment losses, drone activity, and combat clashes.",
              },
            },
            {
              "@type": "Question",
              name: "Is the data free to use?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The dashboard is a free public briefing. A machine-readable MCP endpoint is available at /mcp for AI agents and integrations.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <main>
      <WorldConflictDebrief />
    </main>
  ),
});
