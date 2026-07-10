import { createFileRoute } from "@tanstack/react-router";
import WorldConflictDebrief from "@/components/WorldConflictDebrief.jsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "World Conflict Debrief · Live" },
      { name: "description", content: "Live briefing on active global conflicts — casualties, displacement, and daily situation reports." },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:title", content: "World Conflict Debrief · Live" },
      { property: "og:description", content: "Live briefing on active global conflicts — casualties, displacement, and daily situation reports." },
      { property: "og:url", content: "https://conflictdash.lovable.app/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://conflictdash.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "World Conflict Debrief",
          url: "https://conflictdash.lovable.app/",
          description: "Live briefing on active global conflicts — casualties, displacement, and daily situation reports.",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "World Conflict Debrief",
          url: "https://conflictdash.lovable.app/",
        }),
      },
    ],
  }),
  component: () => <WorldConflictDebrief />,
});

