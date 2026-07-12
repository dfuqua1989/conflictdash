import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { CONFLICTS } from "../data";

export default defineTool({
  name: "list_conflicts",
  title: "List tracked conflicts",
  description: "List every active or watched conflict tracked by the World Conflict Debrief dashboard, with region, status, and casualty/displacement figures.",
  inputSchema: {
    region: z.string().optional().describe("Optional region filter, e.g. 'Middle East', 'Indo-Pacific'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ region }) => {
    const items = region
      ? CONFLICTS.filter((c) => c.region.toLowerCase() === region.toLowerCase())
      : CONFLICTS;
    const rows = items.map((c) => ({
      id: c.id,
      name: c.name,
      region: c.region,
      status: c.status,
      deaths: c.deaths,
      displaced: c.displaced,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { conflicts: rows },
    };
  },
});
