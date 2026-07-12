import { defineMcp } from "@lovable.dev/mcp-js";
import listConflicts from "./tools/list-conflicts";
import getConflict from "./tools/get-conflict";

export default defineMcp({
  name: "world-conflict-debrief-mcp",
  title: "World Conflict Debrief",
  version: "0.1.0",
  instructions: "Read-only tools for the World Conflict Debrief dashboard — a daily briefing on active global conflicts. Use `list_conflicts` to see the tracked roster (Ukraine, Gaza, US–Iran, Taiwan, South China Sea, Caribbean/Cuba, Venezuela, North Korea) and `get_conflict` for a specific conflict's status, casualties, displacement, and summary.",
  tools: [listConflicts, getConflict],
});
