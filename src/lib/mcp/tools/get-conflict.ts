import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { CONFLICTS } from "../data";

export default defineTool({
  name: "get_conflict",
  title: "Get conflict briefing",
  description: "Return the full briefing (status, casualties, displacement, summary) for one tracked conflict by its id. Use list_conflicts first to discover valid ids.",
  inputSchema: {
    id: z.string().describe("Conflict id, e.g. 'ukraine', 'gaza', 'iran', 'taiwan', 'south-china-sea', 'caribbean', 'venezuela', 'north-korea'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const c = CONFLICTS.find((x) => x.id === id);
    if (!c) {
      return {
        content: [{ type: "text", text: `Unknown conflict id: ${id}. Call list_conflicts to see available ids.` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(c, null, 2) }],
      structuredContent: { conflict: c },
    };
  },
});
