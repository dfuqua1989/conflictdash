// Daily briefing archive.
//
// HOW TO ADD A NEW DAY:
//   1. Copy the BRIEFING object values out of src/components/WorldConflictDebrief.jsx
//      (summaryShort -> lede, summary -> body, watch -> watch).
//   2. Prepend a new entry to BRIEFINGS with the new ISO date (newest first).
//   3. Bump LAST_UPDATED in src/routes/sitemap[.]xml.ts — /briefing pages are
//      generated into the sitemap automatically from this array.

export interface Briefing {
  /** ISO date, YYYY-MM-DD. Used as the URL segment: /briefing/2026-08-15 */
  date: string;
  /** Short headline-style title (used in <title> and the archive list). */
  title: string;
  /** 1-2 sentence summary used for meta description and the archive list. */
  lede: string;
  /** Full briefing prose. */
  body: string;
  /** 72-hour watch items. */
  watch: string;
  /** Theaters covered, used for tags and structured data. */
  theaters: string[];
}

export const BRIEFINGS: Briefing[] = [
  {
    date: "2026-08-15",
    title: "Ukraine confirmed a Russian drone killed a three-month-old boy and injured 11 in a…",
    lede: "Ukraine confirmed a Russian drone killed a three-month-old boy and injured 11 in a Marhanets high-rise strike overnight; Zelensky said he expects at least 30,000 Russian troops eliminated this August alone. Ukrainian drones also hit the NOVATEK-Ust-Luga gas complex on the Baltic, a second major energy target after Novorossiysk this week. On Iran, Tehran mocked Trump’s Hormuz-annexation claim as unable to be ‘seized by tweet,’ while Reuters reported zero crude tankers transited the strait on Aug 14 — down from a pre-war baseline of roughly 130 vessels a day.",
    body: "Ukraine’s day split between grim arithmetic and defiant projection. A Russian drone strike on a high-rise in Marhanets, Dnipropetrovsk Oblast, killed a three-month-old boy overnight and injured 11 more people, seven seriously — the latest entry in a town that has already spent August fighting a water-supply crisis and an Aug 5 blackout affecting 126,000 households. Zelensky, briefed by commander-in-chief Mykhailo Drapatyi, said Ukraine expects to eliminate at least 30,000 Russian occupiers this month and confirmed reinforcements have been directed toward the Sloviansk and Kostiantynivka axes; he separately flagged a growing funding gap for the second half of the year and said talks with partners on additional financing are underway. Ukraine’s reach into Russian energy infrastructure widened further: overnight drone strikes hit the NOVATEK-Ust-Luga gas condensate complex in Leningrad Oblast — an 8-million-tonne-per-year facility feeding Russian military and economic activity — with fires reported and two processing units confirmed hit, days after the Sheskharis terminal shutdown at Novorossiysk and the Flamingo strikes on Savasleyka airbase and Samara. On Iran, the rhetorical war over Hormuz sharpened: Iranian Deputy FM Kazem Gharibabadi mocked Trump’s claim that the US would soon declare the strait American territory, saying it ‘cannot be seized by tweet’ and insisting Hormuz ‘has been Iranian, is Iranian, and will remain Iranian.’ The practical picture backs Tehran’s leverage claim regardless of the rhetoric: Reuters/Kpler data showed zero crude oil cargoes transited Hormuz on Aug 14, with only a grain carrier, an empty dry bulk ship and an empty LPG tanker making the passage — against a pre-war baseline of about 130 vessels daily. A parliamentary committee has separately approved an Iranian plan to formally bar US, Israeli and other ‘hostile’ countries’ assets from the strait.",
    watch: "Whether Ukraine’s funding gap for the back half of the year gets closed before it constrains operations; whether the Aug 16 MoU deadline passes without any framework or extension; and whether Hormuz traffic stays near zero for crude cargoes or partially recovers now that both sides have re-stated maximalist territorial claims.",
    theaters: ["Ukraine","Iran","Strait of Hormuz","Israel"],
  },
];

export const BRIEFING_DATES = BRIEFINGS.map((b) => b.date);

export function getBriefing(date: string): Briefing | undefined {
  return BRIEFINGS.find((b) => b.date === date);
}

export function formatBriefingDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, (m ?? 1) - 1, d)).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
