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
    date: "2026-08-18",
    title: "UAE Accuses Iran of Ballistic Missile Launches, Suspends All Trade With Tehran",
    lede: "The UAE says its air defenses detected two Iranian ballistic missiles targeting maritime traffic, one landing in its territorial waters — the first such incident in months — and has suspended all trade and financial dealings with Iran in response. Iran denies it fired anything. Separately, Trump said he won't try to revive the lapsed Iran ceasefire and that no talks are scheduled, even as he continues to insist the US has ‘total control’ of Hormuz. Ukraine's General Staff reports Russian losses at 1,469,970 (+1,210) as of Aug 18. Oil prices have risen for a third straight session.",
    body: "The most significant new development is a fourth country now directly involved: the UAE's Ministry of Defense said air defenses detected two ballistic missiles launched from Iran toward its territory, the first such detection in months, with one missile falling in UAE territorial waters and the second outside them. No casualties or land impact were reported, but the UAE responded immediately by halting all trade, commercial exchanges and financial transactions with Iran ‘until further notice.’ Iran's Foreign Ministry spokesman Esmaeil Baghaei rejected the accusation as ‘baseless’ and accused the UAE of behavior that undermines regional trust — an unusually sharp exchange between two states that have generally stayed out of direct confrontation with each other during this war. On the US-Iran track itself, Trump said explicitly that he won't try to revive the lapsed ceasefire/MoU and that no talks with Iran are currently scheduled, contradicting the more optimistic framing from some of his own officials earlier in the week. He continues to insist Hormuz is ‘open and operating’ under total US control with all mines cleared, even as MarineTraffic data shows only a handful of vessels transiting daily versus a pre-war baseline of roughly 110. On Ukraine, the General Staff's Aug 18 report puts cumulative Russian losses at 1,469,970 personnel (+1,210 in the past 24 hours) — a lower daily figure than the Aug 17 report's +1,440. Brent crude has risen for a third consecutive session as markets price in the UAE incident and the stalled diplomacy together.",
    watch: "Whether the UAE-Iran trade suspension escalates further or is quietly walked back once tensions cool; whether the UAE incident draws in other Gulf states or prompts a coordinated regional response; and whether Trump's flat refusal to revive talks hardens into a genuinely closed diplomatic door or is reversed as prior hard-line statements have been.",
    theaters: ["Ukraine","Iran","Strait of Hormuz"],
  },
  {
    date: "2026-08-17",
    title: "NATO F-18 Shoots Down Russian-Origin Drone Over Romania",
    lede: "Trump threatened to bomb Oman if it ‘gets in the way’ of reopening Hormuz, even as Iran’s Foreign Ministry said Tehran reached an agreement with Oman on future shipping-management arrangements in the strait — two contradictory signals on the same day the MoU deadline passed. Russia knocked out power to over 10,000 Chernihiv customers overnight. Kushner met Netanyahu in Israel a day after Hamas talks in Egypt on a Gaza peace proposal.",
    body: "The day after the MoU formally lapsed, Washington’s rhetoric sharpened rather than cooled. Trump told reporters in the Oval Office that declaring the Strait of Hormuz US territory is ‘a great idea,’ saying ‘we have total control over the strait,’ and separately threatened to bomb Oman if it ‘gets in the way’ of US efforts to reopen the waterway and end the war. That threat sits awkwardly next to a same-day statement from Iran’s Foreign Ministry spokesman that Tehran has actually reached an agreement with Oman on future shipping-management arrangements in the strait — suggesting Muscat is deepening ties with Tehran even as Trump threatens it. Global oil flow through Hormuz fell to a three-month low over the weekend. On Ukraine, Russia knocked out power to more than 10,000 Chernihiv customers overnight in a strike on a power facility, while a fire broke out at the Yevpatoria Aircraft Repair Plant in occupied Crimea. Diplomatically, Jared Kushner met Israeli PM Netanyahu in Israel, a day after holding talks with Hamas leaders in Egypt on the latest US-backed Gaza peace proposal.",
    watch: "Whether Trump follows through on the Oman threat in any concrete form, or whether it fades as rhetoric like prior territorial claims; whether the reported Iran-Oman shipping arrangement produces any visible change in strait traffic; and whether the Kushner-Netanyahu meeting signals movement on the Gaza proposal discussed with Hamas a day earlier.",
    theaters: ["Ukraine","Iran","Strait of Hormuz","Israel"],
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
