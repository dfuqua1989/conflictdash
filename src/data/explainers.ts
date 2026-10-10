// Shared list of background explainers with topic tags, used for
// "Related explainers" links on explainer and briefing pages.
export interface Explainer {
  to: string;
  label: string;
  tags: string[];
}

export const EXPLAINERS: Explainer[] = [
  { to: "/ukraine-war-map", label: "Ukraine war map: where the frontline stands", tags: ["Ukraine", "Russia"] },
  { to: "/background/why-did-russia-invade-ukraine", label: "Why did Russia invade Ukraine?", tags: ["Ukraine", "Russia", "NATO"] },
  { to: "/background/russian-casualties-ukraine", label: "Russian casualties in Ukraine", tags: ["Ukraine", "Russia"] },
  { to: "/background/belarus-role-russia-ukraine-war", label: "Belarus's role in the Ukraine war", tags: ["Ukraine", "Russia", "NATO"] },
  { to: "/background/north-korea-russia-military-alliance", label: "North Korea–Russia military alliance", tags: ["North Korea", "Russia", "Ukraine"] },
  { to: "/background/what-is-nato-article-5", label: "What is NATO Article 5?", tags: ["NATO", "Ukraine", "Russia", "Global"] },
  { to: "/background/world-war-3-risk", label: "How close are we to World War 3?", tags: ["Global", "NATO", "China", "Iran"] },
  { to: "/background/nuclear-weapons-by-country", label: "Nuclear weapons by country", tags: ["Global", "North Korea", "Iran", "India-Pakistan"] },
  { to: "/background/is-the-us-at-war", label: "Is the US at war?", tags: ["US", "Global", "Iran", "Yemen"] },
  { to: "/background/is-iran-at-war-with-the-us", label: "Is Iran at war with the US?", tags: ["Iran", "US", "Strait of Hormuz"] },
  { to: "/background/iran-nuclear-program-status", label: "Iran's nuclear program after the strikes", tags: ["Iran", "Israel"] },
  { to: "/background/strait-of-hormuz", label: "Strait of Hormuz: why it matters", tags: ["Strait of Hormuz", "Iran"] },
  { to: "/background/red-sea-crisis", label: "The Red Sea crisis, explained", tags: ["Yemen", "Strait of Hormuz"] },
  { to: "/background/who-are-the-houthis", label: "Who are the Houthis?", tags: ["Yemen", "Iran"] },
  { to: "/background/is-the-gaza-ceasefire-holding", label: "Is the Gaza ceasefire holding?", tags: ["Israel", "Gaza"] },
  { to: "/background/is-the-lebanon-ceasefire-holding", label: "Is the Lebanon ceasefire holding?", tags: ["Lebanon", "Israel"] },
  { to: "/background/hezbollah-capabilities", label: "Hezbollah's capabilities", tags: ["Lebanon", "Israel", "Iran"] },
  { to: "/background/will-china-invade-taiwan", label: "Will China invade Taiwan?", tags: ["Taiwan", "China"] },
  { to: "/background/south-china-sea-dispute-explained", label: "South China Sea dispute, explained", tags: ["China", "Taiwan"] },
  { to: "/background/us-china-great-power-rivalry-explained", label: "US-China military rivalry", tags: ["China", "Taiwan", "US", "Global"] },
  { to: "/background/will-india-pakistan-go-to-war-again", label: "India vs Pakistan: next war?", tags: ["India-Pakistan"] },
  { to: "/background/pakistan-afghanistan-war-explained", label: "Pakistan–Afghanistan conflict", tags: ["India-Pakistan", "Afghanistan"] },
  { to: "/background/why-sudan-is-at-war", label: "Why Sudan is at war", tags: ["Sudan", "Africa"] },
  { to: "/background/drc-m23-conflict-explained", label: "The DRC-M23 conflict, explained", tags: ["Africa", "DRC"] },
  { to: "/background/venezuela-cuba-crisis-explained", label: "US intervention in Venezuela and Cuba", tags: ["Venezuela", "Americas", "US"] },
];

/** Explainers sharing the most tags, excluding the current page. */
export function relatedExplainers(tags: string[], excludePath?: string, limit = 5): Explainer[] {
  return EXPLAINERS.filter((e) => e.to !== excludePath)
    .map((e, i) => ({ e, i, score: e.tags.filter((t) => tags.includes(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, limit)
    .map((x) => x.e);
}
