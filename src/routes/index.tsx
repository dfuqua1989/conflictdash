import { createFileRoute } from "@tanstack/react-router";
import WorldConflictDebrief from "@/components/WorldConflictDebrief.jsx";

const TITLE = "Global Conflict Tracker — Live OSINT Dashboard";
const DESCRIPTION =
  "Live OSINT conflict dashboard with twice-daily briefings on Ukraine, Gaza, Iran, Taiwan, the South China Sea and the Americas, plus drone warfare and nuclear risk.";
const URL = "https://conflictdash.lovable.app/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        name: "keywords",
        content:
          "global conflict tracker, osint dashboard, ukraine war live, gaza, iran, taiwan strait, south china sea, drone war tracker, daily conflict briefing",
      },
      { property: "og:url", content: URL },
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
                text: "The dashboard is refreshed twice daily, by 8:00 PM EST, from open-source intelligence including the Ukrainian General Staff, Russian MoD, ISW, ACLED, UN OCHA, CSIS and major news outlets.",
              },
            },
            {
              "@type": "Question",
              name: "Which conflicts does the dashboard track?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Ukraine; Israel and the Levant, including Gaza and the West Bank; Iran; the Taiwan Strait; the South China Sea; and the Americas, covering Cuba, Venezuela, Mexico and Haiti. Three thematic sections cover drone warfare, great-power rivalry, and strategic, nuclear and hybrid threats.",
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
