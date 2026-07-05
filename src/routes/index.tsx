import { createFileRoute } from "@tanstack/react-router";
import WorldConflictDebrief from "@/components/WorldConflictDebrief.tsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "World Conflict Debrief · Live" },
      { name: "description", content: "Live briefing on active global conflicts — casualties, displacement, and daily situation reports." },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:title", content: "World Conflict Debrief" },
      { property: "og:description", content: "Live briefing on active global conflicts." },
    ],
  }),
  component: () => <WorldConflictDebrief />,
});
