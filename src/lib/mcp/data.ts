// Shared data for the app's public MCP server.
// Mirrors the CONFLICTS list at the top of src/components/WorldConflictDebrief.jsx.
// Keep in sync when the dashboard's conflict roster changes.

export type Conflict = {
  id: string;
  name: string;
  region: string;
  status: string;
  statusColor: string;
  icon: string;
  deaths: string;
  displaced: string;
  summary: string;
  warDay: number | null;
};

const UA_WAR_START = new Date("2022-02-24T00:00:00Z").getTime();
const UA_WAR_DAY = Math.floor((Date.now() - UA_WAR_START) / 86400000);

export const CONFLICTS: Conflict[] = [
  { id: "ukraine", name: "Ukraine War", region: "Eastern Europe", status: "Active", statusColor: "#ef4444", icon: "🇺🇦", deaths: "~500K–700K killed", displaced: "11.8M total", summary: `War Day ${UA_WAR_DAY}. 1.399M+ Russian casualties. Putin publicly admitted fuel shortages at United Russia congress Jun 28 — first time. Rejected all diplomatic solutions. Russia launched 142 drones + 2 Zircon + 6 Iskander overnight. NATO Ankara concluded: $80B/yr pledged, Patriot co-production greenlit.`, warDay: UA_WAR_DAY },
  { id: "gaza", name: "Gaza / West Bank", region: "Middle East", status: "Fragile Ceasefire", statusColor: "#f59e0b", icon: "🇵🇸", deaths: "73,066+ killed total", displaced: "1.9M displaced", summary: "Ceasefire since Oct 10, 2025. 1,092+ killed since ceasefire. Quiet annexation accelerating. 80% of buildings damaged.", warDay: null },
  { id: "iran", name: "US-Iran War (2026)", region: "Middle East", status: "MoU CRISIS", statusColor: "#f97316", icon: "🇮🇷", deaths: "~6,000 total", displaced: "Hundreds K", summary: "Operation Epic Fury Feb 28. Islamabad Memorandum signed Jun 17. 60-day nuclear talks. Hormuz blockade lifted. IAEA inspectors returning.", warDay: null },
  { id: "taiwan", name: "Taiwan Strait", region: "Indo-Pacific", status: "ELEVATED", statusColor: "#eab308", icon: "🌊", deaths: "No direct conflict casualties", displaced: "N/A", summary: "PLA Eastern Theater Command continues normalizing military pressure. TSMC produces ~90% of world's advanced chips. Any blockade triggers $1T+ global GDP shock.", warDay: null },
  { id: "south-china-sea", name: "South China Sea", region: "Indo-Pacific", status: "FLASHPOINT", statusColor: "#f97316", icon: "🏝️", deaths: "No direct conflict yet", displaced: "N/A", summary: "Near-daily CCG harassment of Philippine resupply at Second Thomas Shoal. Scarborough Shoal floating platform deployed Jun 2026. $3.37T annual trade transits the SCS.", warDay: null },
  { id: "caribbean", name: "Caribbean / Cuba Blockade", region: "Latin America", status: "BLOCKADE", statusColor: "#f97316", icon: "🇨🇺", deaths: "Grid collapse — ~10M in the dark", displaced: "2 island-wide blackouts, week of Jul 6", summary: "US oil blockade on Cuba since Jan 2026 — the first effective blockade since the Missile Crisis. Food production down 60%, rolling blackouts, and a deepening humanitarian crisis; maritime enforcement overlaps Operation Southern Spear's strike zone.", warDay: null },
  { id: "venezuela", name: "Venezuela", region: "Latin America", status: "QUIET", statusColor: "#8496a8", icon: "🇻🇪", deaths: "221+ killed in Caribbean boat strikes", displaced: "Maduro captured Jan 3, 2026", summary: "Largely quiet since spring. US captured Maduro Jan 3, 2026 (Operation Absolute Resolve); Operation Southern Spear boat strikes have killed 221+ since Sept 2025 but the tempo slowed sharply after early May.", warDay: null },
  { id: "north-korea", name: "North Korea", region: "Indo-Pacific", status: "NUCLEAR WATCH", statusColor: "#a855f7", icon: "🇰🇵", deaths: "No direct conflict casualties", displaced: "N/A", summary: "North Korea's nuclear arsenal estimated at 50+ warheads with fissile material for 40 more. Hwasong-19 solid-fuel ICBM tested Oct 2024 demonstrated full US-mainland range. Kim–Putin strategic partnership treaty (Jun 2024) has funneled 12,000+ DPRK troops and millions of artillery shells to Russia's war in Ukraine in exchange for satellite, missile and air-defense tech. Watch: 7th nuclear test readiness at Punggye-ri Tunnel 3, and any SLBM launch from the new Sinpo-C submarine.", warDay: null },
];
