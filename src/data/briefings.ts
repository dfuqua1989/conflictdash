// Daily briefing archive.
//
// HOW A NEW DAY GETS ADDED (automated):
//   After src/components/WorldConflictDebrief.jsx is replaced with the new build, run:
//     node scripts/archive-briefing.mjs --title "Short headline for the day"
//   That script reads REPORT_NOW + the BRIEFING object out of the dashboard,
//   prepends the entry below, detects theaters, and bumps LAST_UPDATED in
//   src/routes/sitemap[.]xml.ts. Add --force to replace an already-archived date.
//   Omit --title and it auto-derives one from the lede (curated titles are better).

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
    date: "2026-08-17",
    title: "Ukraine and Russia Trade Record Strikes as NATO Downs Drone Over Romania",
    lede: "The Iran MoU’s 60-day clock expired at an impasse — no framework, no extension, both sides restating maximalist Hormuz claims. Ukraine absorbed a massive overnight barrage (Kyiv hit with ballistic missiles, fires in two districts) while striking back with a record 600-drone raid on Moscow that killed one and wounded three, plus a rare hit on a scarce Bastion coastal-defense system in Crimea. Russian losses reached 1,467,320 (+1,510).",
    body: "Two clocks ran out today, in different ways. The Iran side: the Islamabad MoU’s 60-day window formally expired Aug 16 with the US and Iran still at an impasse over Hormuz. Iran maintains it never considered the clock to have formally begun, so it never engaged in extension talks; Trump reiterated he’ll soon declare the strait US territory, while Iran’s deputy FM countered it ‘was Iran’s, is Iran’s, and will remain Iran’s.’ Nothing substantive moved — enrichment, the missile programme and Hormuz governance are exactly where they were yesterday. On Ukraine, Russia launched one of its largest barrages of the month overnight: ballistic missiles hit Kyiv directly, igniting fires in two districts and injuring a woman, while Russia’s Defence Ministry claimed it destroyed 822 Ukrainian drones nationwide. Ukraine’s own strike matched the scale — a record 600 drones sent toward the Moscow region, with Moscow Mayor Sergei Sobyanin confirming 201 were destroyed over the region itself; one person was killed and three wounded in the city from the barrage that got through. Separately, Ukrainian forces struck one of Russia’s scarce S-300V4/Bastion coastal-defense systems in Crimea — the launch platform for Zircon and Oniks anti-ship missiles — and blew up a Russian missile and artillery depot near Solone Ozero in a joint drone/SBU Alpha operation. Russian combat losses reached 1,467,320 as of the Aug 16 report (+1,510), with 1,920 drones and 75 artillery systems destroyed that day alone.",
    watch: "Whether the expired MoU produces any near-term escalation beyond rhetoric, or simply becomes the new stalemate baseline; whether Russia’s overnight barrage tempo (600+ drones on both sides in a single night) marks a sustained intensification or a one-off; and whether the Bastion-system hit in Crimea signals a deliberate new target set against Russia’s dwindling coastal-defense inventory.",
    theaters: ["Ukraine","Iran","Strait of Hormuz"],
  },
  {
    date: "2026-08-16",
    title: "Iran MoU Expires Unresolved as Ukraine Repels Record Drone Barrage on Moscow",
    lede: "The Iran MoU’s 60-day clock expired at an impasse — no framework, no extension, both sides restating maximalist Hormuz claims. Ukraine absorbed a massive overnight barrage (Kyiv hit with ballistic missiles, fires in two districts) while striking back with a record 600-drone raid on Moscow that killed one and wounded three, plus a rare hit on a scarce Bastion coastal-defense system in Crimea. Russian losses reached 1,467,320 (+1,510).",
    body: "Two clocks ran out today, in different ways. The Iran side: the Islamabad MoU’s 60-day window formally expired Aug 16 with the US and Iran still at an impasse over Hormuz. Iran maintains it never considered the clock to have formally begun, so it never engaged in extension talks; Trump reiterated he’ll soon declare the strait US territory, while Iran’s deputy FM countered it ‘was Iran’s, is Iran’s, and will remain Iran’s.’ Nothing substantive moved — enrichment, the missile programme and Hormuz governance are exactly where they were yesterday. On Ukraine, Russia launched one of its largest barrages of the month overnight: ballistic missiles hit Kyiv directly, igniting fires in two districts and injuring a woman, while Russia’s Defence Ministry claimed it destroyed 822 Ukrainian drones nationwide. Ukraine’s own strike matched the scale — a record 600 drones sent toward the Moscow region, with Moscow Mayor Sergei Sobyanin confirming 201 were destroyed over the region itself; one person was killed and three wounded in the city from the barrage that got through. Separately, Ukrainian forces struck one of Russia’s scarce S-300V4/Bastion coastal-defense systems in Crimea — the launch platform for Zircon and Oniks anti-ship missiles — and blew up a Russian missile and artillery depot near Solone Ozero in a joint drone/SBU Alpha operation. Russian combat losses reached 1,467,320 as of the Aug 16 report (+1,510), with 1,920 drones and 75 artillery systems destroyed that day alone.",
    watch: "Whether the expired MoU produces any near-term escalation beyond rhetoric, or simply becomes the new stalemate baseline; whether Russia’s overnight barrage tempo (600+ drones on both sides in a single night) marks a sustained intensification or a one-off; and whether the Bastion-system hit in Crimea signals a deliberate new target set against Russia’s dwindling coastal-defense inventory.",
    theaters: ["Ukraine","Iran","Strait of Hormuz"],
  },
  {
    date: "2026-08-15",
    title: "Ust-Luga gas complex hit; zero crude tankers cross Hormuz",
    lede: "Ukraine confirmed a Russian drone killed a three-month-old boy and injured 11 in a Marhanets high-rise strike overnight; Zelensky said he expects at least 30,000 Russian troops eliminated this August alone. Ukrainian drones also hit the NOVATEK-Ust-Luga gas complex on the Baltic, a second major energy target after Novorossiysk this week. On Iran, Tehran mocked Trump’s Hormuz-annexation claim as unable to be ‘seized by tweet,’ while Reuters reported zero crude tankers transited the strait on Aug 14 — down from a pre-war baseline of roughly 130 vessels a day.",
    body: "Ukraine’s day split between grim arithmetic and defiant projection. A Russian drone strike on a high-rise in Marhanets, Dnipropetrovsk Oblast, killed a three-month-old boy overnight and injured 11 more people, seven seriously — the latest entry in a town that has already spent August fighting a water-supply crisis and an Aug 5 blackout affecting 126,000 households. Zelensky, briefed by commander-in-chief Mykhailo Drapatyi, said Ukraine expects to eliminate at least 30,000 Russian occupiers this month and confirmed reinforcements have been directed toward the Sloviansk and Kostiantynivka axes; he separately flagged a growing funding gap for the second half of the year and said talks with partners on additional financing are underway. Ukraine’s reach into Russian energy infrastructure widened further: overnight drone strikes hit the NOVATEK-Ust-Luga gas condensate complex in Leningrad Oblast — an 8-million-tonne-per-year facility feeding Russian military and economic activity — with fires reported and two processing units confirmed hit, days after the Sheskharis terminal shutdown at Novorossiysk and the Flamingo strikes on Savasleyka airbase and Samara. On Iran, the rhetorical war over Hormuz sharpened: Iranian Deputy FM Kazem Gharibabadi mocked Trump’s claim that the US would soon declare the strait American territory, saying it ‘cannot be seized by tweet’ and insisting Hormuz ‘has been Iranian, is Iranian, and will remain Iranian.’ The practical picture backs Tehran’s leverage claim regardless of the rhetoric: Reuters/Kpler data showed zero crude oil cargoes transited Hormuz on Aug 14, with only a grain carrier, an empty dry bulk ship and an empty LPG tanker making the passage — against a pre-war baseline of about 130 vessels daily. A parliamentary committee has separately approved an Iranian plan to formally bar US, Israeli and other ‘hostile’ countries’ assets from the strait.",
    watch: "Whether Ukraine’s funding gap for the back half of the year gets closed before it constrains operations; whether the Aug 16 MoU deadline passes without any framework or extension; and whether Hormuz traffic stays near zero for crude cargoes or partially recovers now that both sides have re-stated maximalist territorial claims.",
    theaters: ["Ukraine", "Iran", "Strait of Hormuz"],
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
