import { useState, useEffect, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const BUILD_NUMBER = 182;

const WAR_START = new Date("2022-02-24T00:00:00Z").getTime();
function getWarDay() {
  const live = Math.floor((Date.now() - WAR_START) / 86400000);
  return live > 0 ? live : Math.floor((REPORT_NOW.getTime() - WAR_START) / 86400000);
}
const REPORT_NOW = new Date();

const CONFLICTS = [
  { id: "ukraine", name: "Ukraine War", region: "Eastern Europe", status: "Active", statusColor: "#ef4444", reliability: "Confirmed", urgency: "critical", icon: "🇺🇦", deaths: "~500K–700K killed", displaced: "11.8M total", summary: `War Day ${getWarDay()}. 1.45M+ Russian casualties. Putin publicly admitted fuel shortages at United Russia congress Jun 28 — first time. Rejected all diplomatic solutions. Russia launched 142 drones + 2 Zircon + 6 Iskander overnight. NATO Ankara concluded: $80B/yr pledged, Patriot co-production greenlit.`, warDay: getWarDay() },
  { id: "gaza", name: "Israel & the Levant", region: "Middle East", status: "Multi-Front", statusColor: "#f59e0b", reliability: "Confirmed", urgency: "elevated", icon: "🇵🇸", deaths: "73,326 killed total", displaced: "1.9M displaced", summary: "Ceasefire since Oct 10, 2025. 1,200+ killed since ceasefire. Jul 31: Board of Peace announced a Hamas disarmament agreement — Hamas says it won’t implement without Israeli withdrawal first; Al-Quds Brigades separately consented Aug 2. Netanyahu hardened Israel’s public line Aug 4, ruling out withdrawal until Hamas is ‘completely disarmed.’ Strikes intensified rather than eased since the deal. Israel has sharply escalated strikes on Hezbollah near Nabatieh’s Ali al-Taher ridge in recent days, including an Aug 15 strike that killed a woman 48 hours after her wedding; Gaza strikes continue in parallel, with a late-Aug drone strike killing three members of one family near Khan Younis. Quiet annexation accelerating; 80% of buildings damaged.", warDay: null },
  { id: "iran", name: "US-Iran War (2026)", region: "Middle East", status: "WAR REIGNITED", statusColor: "#dc2626", reliability: "Confirmed", urgency: "critical", icon: "🇮🇷", deaths: "~6,000+ total", displaced: "Hundreds K", summary: "Operation Epic Fury began Feb 28; six months in, a brief diplomatic opening (a mine-free declaration, an Iran-Oman shipping route) collapsed within days into the most direct exchange of the war. Since Aug 30 the US has struck Iranian rocket launchers, radar and mine-laying sites, and destroyed or disabled 8+ Iran-linked oil tankers; Iran has retaliated against US bases in Jordan, the UAE, Kuwait and Bahrain, targeted a US aircraft carrier and destroyer with ballistic missiles twice, attacked 13+ commercial vessels, and captured a US underwater drone. The Pentagon has disclosed 797 US troops wounded. Iran plans a Hormuz 'exclusion zone'; commercial traffic has collapsed to ~10 vessels/day. Brent crude crossed $100/bbl Sep 9, and the IAEA referred Iran to the UN Security Council over nuclear non-cooperation the same day. Trump says the war will end 'immediately after' the US midterms.", warDay: null },
  { id: "taiwan", name: "Taiwan Strait", region: "Indo-Pacific", status: "ELEVATED", statusColor: "#eab308", reliability: "Confirmed", urgency: "elevated", icon: "🌊", deaths: "No direct conflict casualties", displaced: "N/A", summary: "PLA Eastern Theater Command continues normalizing military pressure. TSMC produces ~90% of world's advanced chips. Any blockade triggers $1T+ global GDP shock.", warDay: null },
  { id: "south-china-sea", name: "South China Sea", region: "Indo-Pacific", status: "FLASHPOINT", statusColor: "#f97316", reliability: "Confirmed", urgency: "elevated", icon: "🏝️", deaths: "No direct conflict yet", displaced: "N/A", summary: "Three separate confrontations in a single week (Jul 20–24) at Second Thomas Shoal and Scarborough Shoal pulled in the USS George Washington carrier group and triggered joint US-Philippines-Japan drills — the sharpest acceleration of the year. August has shifted the friction from sea to law and record: the PLA staged naval and air drills at Scarborough on Aug 1 after Manila filed its UN bid for extended seabed rights off Palawan, and on Aug 6 Beijing acknowledged for the first time that two coast guard personnel died in the Aug 2025 Scarborough collision. Near-daily CCG harassment of Philippine resupply continues underneath it. $3.37T annual trade transits the SCS.", warDay: null },
  { id: "caribbean", name: "Caribbean / Cuba Blockade", region: "Latin America", status: "BLOCKADE", statusColor: "#f97316", reliability: "Confirmed", urgency: "elevated", icon: "🇨🇺", deaths: "Grid collapse — ~10M in the dark", displaced: "5 island-wide blackouts in 2026, 3 in one week (Jul)", summary: "US oil blockade on Cuba since Jan 2026 — the first effective blockade since the Missile Crisis. Food production down 60%, rolling blackouts, and a deepening humanitarian crisis; maritime enforcement overlaps Operation Southern Spear’s strike zone.", warDay: null },
  { id: "venezuela", name: "Venezuela", region: "Latin America", status: "TRANSITION", statusColor: "#eab308", reliability: "Confirmed", urgency: "watch", icon: "🇻🇪", deaths: "227+ killed in Caribbean boat strikes", displaced: "Maduro captured Jan 3, 2026", summary: "A government transition is now the defining story. Interim President Delcy Rodríguez's government and the opposition concluded a first round of US-backed talks Aug 12 with a Supreme Court reform agreement; a second round is underway toward a new electoral council by November. Trump announced a sweeping US-Venezuela oil deal Aug 29, negotiated by Rubio and Hegseth with Rodríguez, giving the US access to the country's untapped reserves. Southern Spear boat strikes, paused for two months, resumed Aug 25 — the campaign-wide toll has reached 227+. Earthquake recovery continues in parallel; the Jun 24 quakes killed 6,125+ confirmed, with UN humanitarian chief Tom Fletcher visiting survivors in late August. Cuba's grid collapse remains the region's other live front.", warDay: null },
  { id: "haiti", name: "Haiti", region: "Caribbean", status: "STATE COLLAPSE", statusColor: "#dc2626", reliability: "Confirmed", urgency: "critical", icon: "🇭🇹", deaths: "3,050+ killed Jan–Jun 2026 (UN)", displaced: "1.5M — more than 1 in 10 Haitians", summary: "Gang coalitions control an estimated 70–90% of Port-au-Prince and have expanded north into the Artibonite and Centre departments. The UN recorded more than 3,050 people killed between January and June 2026 alone, with 1.5 million displaced — more than one in ten Haitians. A gang coalition attack on Kenscoff, south of the capital, killed 47 and saw more than 50 people kidnapped on Aug 23–24 — one of the largest mass-kidnapping incidents in recent Haitian history, per the UN and Al Jazeera. Roughly 6.4 million people, over half the population, need humanitarian assistance. A UN-authorized Gang Suppression Force has begun deploying to Cité Soleil and Artibonite ahead of the vote. Haiti has had no president since Jovenel Moïse's assassination in July 2021; presidential and legislative elections are scheduled for Dec 13, 2026, with security conditions in serious doubt.", warDay: null },
  { id: "mexico", name: "Mexico", region: "North America", status: "CARTEL CONFLICT", statusColor: "#f97316", reliability: "Confirmed", urgency: "critical", icon: "🇲🇽", deaths: "~30,000–35,000 homicides annually", displaced: "44,695 documented internally, 2024–25", summary: "Sustained cartel conflict rather than a declared war. Mexican forces killed CJNG leader Nemesio 'El Mencho' Oseguera Cervantes in Jalisco on Feb 22, 2026, triggering a wave of blockades, arson and clashes across a dozen states that left more than 70 dead. The 2026 Peace Index recorded homicides falling 22.7% year-on-year, but warned the decline masks a shift toward disappearances and extortion rather than genuine stabilization. Cartels have increasingly deployed explosive-laden drones and heavy weaponry. Displacement is poorly counted — the Ibero-American University documented 44,695 internally displaced across 2024–25, describing it as an invisible crisis.", warDay: null },
  { id: "colombia", name: "Colombia", region: "Latin America", status: "ELEVATED", statusColor: "#eab308", reliability: "Reported", urgency: "watch", icon: "🇨🇴", deaths: "450,000 killed over six decades of conflict", displaced: "100,000 displaced in Catatumbo alone", summary: "The 2016 FARC peace agreement did not end Colombia's armed conflict. Fighting escalated sharply in the Catatumbo region on the Venezuelan border in January 2025, when the ELN launched an offensive against FARC dissidents of the 33rd Front — the largest single forced-displacement incident since records began in 1997. An estimated 100,000 people have been displaced there over the following year, and the Petro government suspended ELN peace talks and invoked emergency powers. OCHA recorded more than 79,500 mass-displacement victims nationwide between January and August, a 53% rise on the prior year's total. Trump-endorsed hardliner Abelardo de la Espriella won a razor-thin runoff in June and took office Aug 7, campaigning on a military-led security policy that signals Petro's 'Total Peace' framework will likely be overhauled.", warDay: null },
  { id: "sudan", name: "Sudan", region: "East Africa", status: "Active", statusColor: "#ef4444", reliability: "Confirmed", urgency: "critical", icon: "🇸🇩", deaths: "150K–400K killed (est.)", displaced: "13.6M — world's largest displacement crisis", summary: "Civil war between the Sudanese Armed Forces (SAF) and paramilitary Rapid Support Forces (RSF) since Apr 2023. The RSF's Oct 2025 capture of El Fasher, the SAF's last Darfur stronghold, was accompanied by what rights groups call a genocidal massacre — estimates of 60,000-150,000 dead in that event alone. The RSF now besieges El-Obeid, North Kordofan’s capital — UN warns of possible “hallmarks of genocide” repeat with 500,000 trapped. Both sides have turned to drones: the UN recorded 1,000+ civilian drone deaths in just the first five months of 2026. No lasting ceasefire has held despite repeated mediation attempts.", warDay: null },
  { id: "drc", name: "DR Congo", region: "Central Africa", status: "Active", statusColor: "#ef4444", reliability: "Confirmed", urgency: "critical", icon: "🇨🇩", deaths: "Thousands killed since Jan 2025 offensive", displaced: "7M+ internally displaced", summary: "Rwanda-backed M23 rebels seized Goma (Jan 2025) and Bukavu (Feb 2025), the two largest cities in the mineral-rich east. A US-brokered peace deal was signed in Washington in Jun 2025, followed by a Doha framework in Nov 2025; fighting resumed and intensified in early 2026, but diplomacy has since regained ground — the DRC and M23's Congo River Alliance agreed a roadmap for renewed peace talks after five days of Switzerland talks (Aug 17–21), including a standardized ceasefire-violation reporting mechanism, and a verification mission has entered South Kivu. Fighting continues on the ground regardless; Goma's banks have stayed closed for over a year. Eastern DRC's coltan and other critical minerals remain central to both the conflict's origins and the US mineral-access deal underlying the ceasefire framework.", warDay: null },
  { id: "sahel", name: "Sahel (Mali/Burkina Faso/Niger)", region: "West Africa", status: "Active", statusColor: "#ef4444", reliability: "Confirmed", urgency: "critical", icon: "🏜️", deaths: "10,000+ killed in 2025 alone", displaced: "Millions — Burkina Faso alone: 2.06M", summary: "Military juntas in Mali, Burkina Faso and Niger — having expelled French and UN forces since 2022-23 and formed the breakaway Alliance of Sahel States — are fighting a worsening al-Qaeda (JNIM) and Islamic State (ISSP) insurgency with backing from Russia's Africa Corps (rebranded Wagner). The Liptako-Gourma tri-border area now accounts for over half of all terrorism deaths worldwide, per Global Conflict Tracker. JNIM blockaded Bamako in 2025 and is expanding south toward the Gulf of Guinea.", warDay: null },
  { id: "indopak", name: "India–Pakistan", region: "South Asia", status: "Fragile Ceasefire", statusColor: "#f97316", reliability: "Confirmed", urgency: "watch", icon: "🇮🇳🇵🇰", deaths: "Dozens killed, May 2025 war", displaced: "Nuclear-armed rivals, ceasefire since May 10, 2025", summary: "A four-day war in May 2025 — India's Operation Sindoor strikes following the Apr 22 Pahalgam attack, met by Pakistani counterstrikes using Chinese weapons in combat for the first time — ended in a ceasefire that has held for over a year. Both sides claim victory; neither has reconciled. A fresh diplomatic spat erupted Aug 20 after US Ambassador to India Sergio Gor, also Trump’s special envoy for South and Central Asia, called Indian-administered Kashmir ‘an important part of India’ during the first standalone US ambassadorial visit to the territory since 2019 — Pakistan summoned the top US diplomat in Islamabad in response. Pakistan's army chief Asim Munir was elevated to field marshal and now postures as a peacemaker even as Islamabad deepens its defense alliance with China, unsettling New Delhi. Analysts describe the state as ceasefire without reconciliation — tense but not currently active. India’s Indus Waters Treaty suspension remains a live pressure point.", warDay: null },
  { id: "pakafghan", name: "Pakistan–Afghanistan", region: "South Asia", status: "Active", statusColor: "#ef4444", reliability: "Confirmed", urgency: "critical", icon: "🇵🇰🇦🇫", deaths: "76+ killed, 289+ civilian casualties since Feb 26", displaced: "115,000+ displaced in Afghanistan", summary: "Pakistan declared “open war” with Afghanistan on Feb 27, 2026 and launched Operation Ghazab lil Haq, a sustained air and ground campaign, after Taliban forces retaliated for earlier Pakistani strikes on TTP camps. A Mar 16 Pakistani strike on a Kabul drug-rehabilitation hospital reportedly killed 400+ people. UN experts say Pakistan's campaign violates the UN Charter's prohibition on the use of force. China has brokered repeated truces; none have held, because the core issue — the Taliban's unwillingness to move against its ideological ally the TTP — remains unresolved. Taliban drones struck Pakistani territory for the first time Jul 1, 2026.", warDay: null },
];

const TODAYS_MOVERS = [
  { id: "iran", trend: "up", label: "Iran", reason: "War reignited — Larak Island strikes, Jordan/UAE retaliation, tanker attacks", color: "#dc2626" },
  { id: "ukraine", trend: "up", label: "Ukraine", reason: "Losses elevated for a third straight day; UAV toll near monthly highs", color: "#f97316" },
  { id: "usmil", trend: "up", label: "Great Powers", reason: "Ratcliffe trilateral summit proposal; Xi-Putin-Modi at SCO summit", color: "#eab308" },
  { id: "gaza", trend: "flat", label: "Israel & Levant", reason: "Nabatieh tension remains high, no new major strikes reported today", color: "#8496a8" },
  { id: "venezuela", trend: "down", label: "Americas", reason: "Transition talks progressing; Trump-brokered oil deal announced", color: "#22c55e" },
  { id: "drc", trend: "down", label: "Africa", reason: "DRC-M23 Doha roadmap holding after Switzerland talks", color: "#22c55e" },
  { id: "south-china-sea", trend: "flat", label: "S. China Sea", reason: "Steady gray-zone pressure, no new confirmed incidents this week", color: "#8496a8" },
  { id: "indopak", trend: "flat", label: "South Asia", reason: "Ceasefire holding; Kashmir diplomatic friction unresolved", color: "#8496a8" },
];

const CASUALTIES = [
  { date: "Aug 1", value: 1500 }, { date: "Aug 5", value: 1330 }, { date: "Aug 10", value: 1190 }, { date: "Aug 15", value: 1370 }, { date: "Aug 20", value: 1480 }, { date: "Aug 25", value: 1230 }, { date: "Aug 30", value: 1400 }, { date: "Sep 5", value: 1260 }, { date: "Sep 10", value: 1520 },
];

const CONFLICT_INTENSITY = [
  { name: "Ukraine", intensity: 92, deaths: "~500K–700K", color: "#ef4444" },
  { name: "Iran", intensity: 95, deaths: "~6,000+", color: "#dc2626" },
  { name: "Haiti", intensity: 78, deaths: "3,050+", color: "#dc2626" },
  { name: "Sudan", intensity: 85, deaths: "150K–400K", color: "#ef4444" },
  { name: "DRC", intensity: 80, deaths: "7K+", color: "#ef4444" },
  { name: "Pak-Afghan", intensity: 75, deaths: "76+", color: "#ef4444" },
  { name: "S. China Sea", intensity: 62, deaths: "0", color: "#f97316" },
  { name: "Taiwan", intensity: 55, deaths: "0", color: "#eab308" },
];

const NEWS = [
  { id: "b_jordan_aircraft_damage_wsj_2029_sep10", confidence: "Reported", conflictId: "iran", severity: "major", icon: "✈️", headline: "Reports Say US Aircraft Damaged in Jordan Strike, War Could Run Past 2029 — Both Denied or Undisclosed by Trump", conflict: "Iran", conflictColor: "#8b5cf6", publishedAt: "Sep 10, 2026", bullets: ["ABC News and Reuters, citing US officials, reported multiple aircraft were damaged in Iran's strike on Jordan's Muwaffaq Salti Air Base — one A-10 left missing a wing, ~8 F-15s lightly damaged and returned to service — which Trump publicly denied", "The Wall Street Journal reported top White House advisers have privately warned the war could last through the end of Trump's term, potentially beyond January 2029, contradicting his public claim it will end 'immediately after' the midterms", "Iranian state media reported unidentified explosions overnight along the Hormozgan coast (Sirik, Minab, Jask, Qeshm) with no attacker identified; the IRGC separately claimed it struck a US Saildrone unmanned surface vessel, unconfirmed by the US"] },
  { id: "b_iaea_un_referral_goldman_120_sep9", confidence: "Confirmed", conflictId: "iran", severity: "critical", icon: "☢️", headline: "Iran Reported to UN Security Council Over Nuclear Non-Cooperation; Goldman Warns of $120 Oil", conflict: "Iran", conflictColor: "#8b5cf6", publishedAt: "Sep 9, 2026", bullets: ["The IAEA reported Iran to the UN Security Council for failing to cooperate with a long-running investigation into uranium traces at undeclared sites; the resolution, proposed by the US, UK, France and Germany, was condemned by Iran's deputy FM as based on 'fabrications' — AP, ABC News", "Goldman Sachs warned intensifying Gulf attacks could push Brent crude above $120/bbl, roughly 20% above current levels; Iran's IRGC said it recovered a US Anduril Dive-LD underwater drone near the strait after the US said the vehicle malfunctioned — CBS News", "Trump told reporters he thinks 'the war is going to end immediately after the election' because Iran 'can't hold out any longer'; Iranian hardline lawmakers said Tehran has 'serious options' and would respond 'decisively on the field'"] },
  { id: "b_oil_100_iran_attacks_10ships_jordan_sep9", confidence: "Confirmed", conflictId: "iran", severity: "critical", icon: "🛢️", headline: "Oil Crosses $100 as Iran Attacks 10 Ships and Fires on Jordan Base", conflict: "Iran", conflictColor: "#8b5cf6", publishedAt: "Sep 9, 2026", bullets: ["Iran said it attacked 10 ships near the Strait of Hormuz and fired missiles at US forces at Jordan's Al-Azraq base, calling both actions defensive after the US announced it sank 5 Iranian oil tankers a day earlier; Jordan's air defenses intercepted 18 of 20 incoming missiles — Al Jazeera", "UKMTO reported a tanker hit by a projectile off Iraq's coast and a cargo ship struck near al-Faw, Iraq; CENTCOM denied a separate IRGC claim of striking US destroyers; Iran's Foreign Ministry condemned a new IAEA resolution on its nuclear program — ABC News, CBS News", "South Korea's defense ministry dispatched a fact-finding team — explicitly not troops — to assess the strait following last week's tanker strike. Brent crude crossed $100/bbl in early Wednesday trading, the first time this war"] },
  { id: "b_witkoff_kushner_moscow_kyiv_sep5", confidence: "Confirmed", conflictId: "ukraine", severity: "major", icon: "🤝", headline: "US Envoys Land in Moscow With New Peace Proposal; Narrow Capital Pause Doesn't Stop Nationwide Strikes", conflict: "Ukraine", conflictColor: "#5b8ec8", publishedAt: "Sep 5, 2026", bullets: ["US special envoy Steve Witkoff and Jared Kushner arrived in Moscow Sep 5 carrying a new proposal for a negotiated peace, with a first visit to Kyiv expected next — CNN, RFE/RL", "Putin ordered a 3-day halt to strikes on Kyiv specifically tied to the visit; Zelensky reciprocated with a pledge to refrain from striking Moscow, but the gesture didn't extend nationwide — Russia killed at least 6 and injured 51 across Ukraine overnight, including 4 dead in Dnipropetrovsk's Kamianske", "The Kremlin restated that Putin's demand for Ukraine to cede Donetsk, Luhansk, Zaporizhzhia, and Kherson in full and abandon NATO ambitions remains 'unshakeable' — RFE/RL, Kyiv Independent"] },
  { id: "b_pratas_incursions_analysts_iran_distraction_sep1", confidence: "Confirmed", conflictId: "taiwan", severity: "moderate", icon: "🇨🇳", headline: "China Increases Pratas Intrusions as Analysts Say Beijing May Be Exploiting US Focus on Iran", conflict: "South China Sea", conflictColor: "#06b6d4", publishedAt: "Sep 1, 2026", bullets: ["Taiwan's Coast Guard Administration reports China Coast Guard ships around Taiwan's Pratas atoll have significantly increased since Beijing began permanent patrols east of Taiwan in May; the PLA carried out 125 aerial incursions into Taiwan's ADIZ in August — down from 2024-25 levels but still sustained — per AEI's China & Taiwan Update", "Crisis Group's William Yang told Al Jazeera Beijing may be taking advantage of a US 'distracted by the war in Iran' and a president 'ambivalent' toward Taiwan; the UK, Germany and France issued a rare joint statement in late June opposing China's expanded patrols as a threat to 'regional stability and freedom of navigation'", "Taiwan's cabinet has approved a bill to bolster the island's unmanned-systems inventory, moving forward despite ongoing legislative gridlock"] },
];

const ANALYSTS = [
  { name: "The Enforcer", handle: "@EnforcerOfficial", flag: "🇺🇦", color: "#f97316", bio: "Frontline-focused OSINT and battlefield analysis account. Rapid-turnaround coverage of strikes, equipment losses, and tactical developments across the Ukraine theater.", url: "https://twitter.com/EnforcerOfficial", recent: ["Crimea Siege — Daily Supply Route Status", "Frontline Sector Breakdown — Pokrovsk/Sloviansk", "Equipment Loss Verification — Visual Confirmation Roundup"] },
  { name: "Preston Stewart", handle: "@prestonstewart", flag: "🇺🇸", color: "#5b8ec8", bio: "West Point graduate · Field Artillery officer · Multiple frontline reporting trips to Ukraine. 500k+ YouTube subscribers.", url: "https://www.youtube.com/@prestonstewart", recent: ["Siege of Crimea Has Begun as Russia Air Defence Reaches Tipping Point", "Sustained Elevated Losses: Reading Russia's Late-August Casualty Run", "$882 Per Soldier — The Economics of Russia Meat Assaults"] },
  { name: "ISW", handle: "understandingwar.org", flag: "🇺🇸", color: "#8b5cf6", bio: "Leading open-source research institute. Daily Ukraine assessment. Primary reference used by US DoD.", url: "https://www.understandingwar.org/", recent: ["Russia Continues Offensive Operations Amid Slowing Advance Rate — Late Aug", "ISW: Ukrainian Forces Advance Near Kharkiv, Donetsk, and Zaporizhzhia", "Interactive Deep State Ukraine Map — Daily Updated"] },
  { name: "Ryan McBeth", handle: "@RyanMcBethProgramming", flag: "🇺🇸", color: "#ef4444", bio: "20-year US Army veteran · Intel analyst · MS Cybersecurity. Specialises in OSINT, disinformation, drone warfare. 1M+ subscribers.", url: "https://www.youtube.com/@RyanMcBethProgramming", recent: ["Drones vs Snipers: Who Actually Winning in Ukraine?", "What We NOT Being Told About Iran", "Ukraine Fortress Belt (Helsinki Commission)"] },
  { name: "Perun", handle: "@PerunAU", flag: "🇦🇺", color: "#22c55e", bio: "In-depth video essays on military logistics, industrial capacity, strategy, and economics of modern warfare.", url: "https://www.youtube.com/@PerunAU", recent: ["Ukraine Drone Superpower Strategy", "Russia Economic Warfare State", "The Logistics of the Siege of Crimea"] },
  { name: "Oryx", handle: "oryxspioenkop.com", flag: "🇳🇱", color: "#5b8ec8", bio: "The benchmark open-source database of visually-confirmed equipment losses. Cited by every major newsroom.", url: "https://www.oryxspioenkop.com/", recent: ["Attack On Europe: Documenting Russian Equipment Losses", "Documenting Ukrainian Equipment Losses", "Naval Losses Tracker — Updated"] },
  { name: "Kyiv Independent", handle: "kyivindependent.com", flag: "🇺🇦", color: "#8b5cf6", bio: "Ukraine leading English-language newsroom. Frontline dispatches, investigations, and analysis.", url: "https://kyivindependent.com/", recent: ["Kramatorsk Strike Toll Climbs to 24 as Rescue Response Continues", "Inside Ukraine's Refinery Campaign as Lukoil Goes Dark", "Ratcliffe's Unannounced Moscow Trip: What We Know"] },
  { name: "Michael Kofman", handle: "Russia Contingency", flag: "🇺🇸", color: "#ef4444", bio: "One of the most respected Russian-military specialists. Deep force-structure, doctrine, and attrition analysis via War on the Rocks podcast.", url: "https://warontherocks.com/", recent: ["Assessing Russia 2026 Offensive Potential", "Force Generation and the Attrition War", "The State of Ukrainian Manpower"] },
  { name: "Jake Broe", handle: "@JakeBroe", flag: "🇺🇸", color: "#06b6d4", bio: "US Air Force veteran (Nuclear & Missile Operations Officer, Minuteman III ICBM system) who left service the same week Russia invaded in Feb 2022 and became a full-time war analyst. Daily video updates with a strong pro-Ukraine advocacy stance.", url: "https://www.youtube.com/@JakeBroe", recent: ["“Train to Kyiv” Fundraiser — 8th NAFO-Partnered Vehicle Drive", "Why Russia's Battlefield Gains Don't Add Up to Victory", "Daily War Map Update — Frontline Breakdown"] },
];

const SECTION_MAP = {
  ukraine: "ukraine-war-map",
  gaza: "background/is-the-gaza-ceasefire-holding",
  iran: "background/strait-of-hormuz",
  taiwan: "background/will-china-invade-taiwan",
  "south-china-sea": "background/us-china-great-power-rivalry-explained",
  caribbean: "background/venezuela-cuba-crisis-explained",
  venezuela: "background/venezuela-cuba-crisis-explained",
  haiti: "background/venezuela-cuba-crisis-explained",
  mexico: "background/world-war-3-risk",
  colombia: "background/world-war-3-risk",
  sudan: "background/why-sudan-is-at-war",
  drc: "background/drc-m23-conflict-explained",
  sahel: "background/world-war-3-risk",
  indopak: "background/will-india-pakistan-go-to-war-again",
  pakafghan: "background/pakistan-afghanistan-war-explained",
};

const THEATER_COORDS = {
  ukraine: { x: 540, y: 110, label: "Ukraine" },
  gaza: { x: 530, y: 160, label: "Levant" },
  iran: { x: 570, y: 170, label: "Iran" },
  taiwan: { x: 715, y: 185, label: "Taiwan" },
  "south-china-sea": { x: 690, y: 215, label: "SCS" },
  caribbean: { x: 210, y: 185, label: "Caribbean" },
  venezuela: { x: 235, y: 205, label: "Venezuela" },
  haiti: { x: 250, y: 190, label: "Haiti" },
  mexico: { x: 155, y: 165, label: "Mexico" },
  colombia: { x: 230, y: 225, label: "Colombia" },
  sudan: { x: 515, y: 220, label: "Sudan" },
  drc: { x: 505, y: 260, label: "DRC" },
  sahel: { x: 445, y: 205, label: "Sahel" },
  indopak: { x: 610, y: 175, label: "India-Pak" },
  pakafghan: { x: 590, y: 155, label: "Pak-Afghan" },
};

const WORLD_PATHS = [
  { d: "M180,60 L280,55 L320,80 L310,120 L260,140 L200,130 L170,100 Z", label: "North America" },
  { d: "M220,150 L290,145 L310,190 L280,230 L230,220 L210,180 Z", label: "South America" },
  { d: "M430,70 L500,65 L540,90 L520,140 L470,150 L440,120 Z", label: "Europe" },
  { d: "M440,160 L520,155 L560,200 L540,280 L480,290 L440,240 Z", label: "Africa" },
  { d: "M540,80 L630,75 L720,90 L760,140 L730,210 L650,230 L560,200 L540,140 Z", label: "Asia" },
  { d: "M700,240 L760,235 L780,270 L740,290 L700,270 Z", label: "Oceania" },
];

const URGENCY_META = {
  critical: { label: "Critical", dot: "#ef4444" },
  elevated: { label: "Elevated", dot: "#f97316" },
  watch: { label: "Watch", dot: "#eab308" },
};

function reliabilityLabel(c) {
  return c === "Confirmed" ? "Verified" : c === "Reported" ? "Reported" : "OSINT";
}

function formatDate(date) {
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).toUpperCase();
}

function SituationMap({ selectedId, onSelect }) {
  return (
    <div className="rounded-2xl border border-warm-border bg-paper p-5 shadow-[0_2px_16px_-8px_rgba(28,25,23,0.08)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-stone-sub">Live Situation Map</div>
          <div className="font-body text-sm text-subtle-text">Active theaters · tap a marker</div>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-wider text-stone-sub">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#ef4444]" />Critical</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#f97316]" />Elevated</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#eab308]" />Watch</span>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-xl border border-warm-border bg-parchment">
        <svg viewBox="0 0 800 340" className="h-auto w-full" role="img" aria-label="World conflict theaters map">
          {WORLD_PATHS.map((p, i) => (
            <path key={i} d={p.d} fill="#e7e5e4" stroke="#d6d3d1" strokeWidth="1" />
          ))}
          {CONFLICTS.map((c) => {
            const pin = THEATER_COORDS[c.id];
            if (!pin) return null;
            const isSel = selectedId === c.id;
            return (
              <g key={c.id} className="cursor-pointer" onClick={() => onSelect(c.id)}>
                <circle cx={pin.x} cy={pin.y} r={isSel ? 22 : 16} fill={c.statusColor} opacity="0.08" />
                {c.urgency === "critical" && (
                  <circle cx={pin.x} cy={pin.y} r={isSel ? 16 : 12} fill="none" stroke={c.statusColor} strokeWidth="1.2" opacity="0.45" className="origin-center animate-[pulse_2s_ease-in-out_infinite]" />
                )}
                <circle cx={pin.x} cy={pin.y} r={isSel ? 10 : 7} fill={c.statusColor} />
                <text x={pin.x} y={pin.y + 3} textAnchor="middle" fontSize={isSel ? 10 : 7} fill="#fff" fontWeight="700">{c.icon}</text>
                <text x={pin.x} y={pin.y + (isSel ? 18 : 14)} textAnchor="middle" fontSize={isSel ? 9 : 7} fill={c.statusColor} fontWeight={isSel ? 700 : 500}>{pin.label}</text>
              </g>
            );
          })}
        </svg>
        <div className="pointer-events-none absolute bottom-3 left-3 rounded-md border border-warm-border bg-paper/90 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-stone-sub backdrop-blur-sm">
          Unclassified · OSINT
        </div>
      </div>
    </div>
  );
}

function IntensityMetrics() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="rounded-2xl border border-warm-border bg-paper p-5 shadow-[0_2px_16px_-8px_rgba(28,25,23,0.08)]">
        <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-stone-sub">Ukraine Daily Casualty Trend</div>
        <div className="font-body text-sm text-subtle-text">Reported Russian daily losses (last 10 readings)</div>
        <div className="mt-4 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CASUALTIES} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="casGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#a8a29e" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#a8a29e" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e7e5e4", fontSize: 12 }} />
              <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} fill="url(#casGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-warm-border bg-paper p-5 shadow-[0_2px_16px_-8px_rgba(28,25,23,0.08)]">
        <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-stone-sub">Conflict Intensity Index</div>
        <div className="font-body text-sm text-subtle-text">Composite volatility estimate by theater</div>
        <div className="mt-4 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CONFLICT_INTENSITY} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "#a8a29e" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 10, fill: "#44403c" }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ borderRadius: 8, border: "1px solid #e7e5e4", fontSize: 12 }} />
              <Bar dataKey="intensity" radius={[0, 6, 6, 0]}>{CONFLICT_INTENSITY.map((e, i) => (<Cell key={`cell-${i}`} fill={e.color} />))}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function TodaysMovers() {
  return (
    <div className="rounded-2xl border border-warm-border bg-paper p-5 shadow-[0_2px_16px_-8px_rgba(28,25,23,0.08)]">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-widest text-stone-sub">Today's Movers</div>
        <div className="rounded-full bg-parchment px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-stone-sub">Last 24h</div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TODAYS_MOVERS.map((m) => (
          <div key={m.id} className="rounded-xl border border-warm-border bg-parchment p-3">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-lg leading-none">{m.trend === "up" ? "▲" : m.trend === "down" ? "▼" : "→"}</span>
              <span className="font-display text-sm font-semibold text-ink">{m.label}</span>
            </div>
            <div className="font-body text-xs leading-relaxed text-subtle-text">{m.reason}</div>
            <div className="mt-2 h-1 w-full rounded-full bg-warm-border overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${m.trend === "up" ? 80 : m.trend === "down" ? 35 : 55}%`, background: m.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SituationBoard({ selectedId, onSelect }) {
  const sorted = useMemo(() => {
    const order = { critical: 0, elevated: 1, watch: 2 };
    return [...CONFLICTS].sort((a, b) => (order[a.urgency] ?? 9) - (order[b.urgency] ?? 9));
  }, []);

  return (
    <div className="rounded-2xl border border-warm-border bg-paper p-5 shadow-[0_2px_16px_-8px_rgba(28,25,23,0.08)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-stone-sub">Situation Board</div>
          <div className="font-body text-sm text-subtle-text">{CONFLICTS.length} active theaters · borders show urgency, corner shows reliability</div>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((c) => {
          const meta = URGENCY_META[c.urgency] || URGENCY_META.watch;
          const isSel = selectedId === c.id;
          const route = SECTION_MAP[c.id] || `background/world-war-3-risk`;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`relative rounded-xl border bg-parchment p-4 text-left transition-all duration-200 hover:shadow-md ${isSel ? "ring-1 ring-signal" : ""}`}
              style={{ borderLeftWidth: "4px", borderLeftColor: c.statusColor, borderColor: "#e7e5e4" }}
            >
              <div className="absolute right-3 top-3 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.dot }} />
                <span className="text-[9px] font-bold uppercase tracking-wider text-stone-sub">{meta.label}</span>
              </div>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl leading-none">{c.icon}</span>
                <div>
                  <div className="font-display text-sm font-semibold text-ink">{c.name}</div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-stone-sub">{c.region}</div>
                </div>
              </div>
              <div className="mb-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ background: `${c.statusColor}15`, color: c.statusColor, border: `1px solid ${c.statusColor}40` }}>
                {c.status}
              </div>
              <div className="mb-3 font-body text-xs leading-relaxed text-subtle-text line-clamp-3">{c.summary}</div>
              <div className="flex items-center justify-between border-t border-warm-border pt-2">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-stone-sub">{reliabilityLabel(c.reliability)}</div>
                <Link to={`/${route}`} className="text-[10px] font-bold uppercase tracking-wider text-signal hover:underline" onClick={(e) => e.stopPropagation()}>
                  Deep Dive →
                </Link>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NewsFeed() {
  const [expanded, setExpanded] = useState(null);
  return (
    <div className="rounded-2xl border border-warm-border bg-paper p-5 shadow-[0_2px_16px_-8px_rgba(28,25,23,0.08)]">
      <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-sub">Recent Intelligence</div>
      <div className="space-y-4">
        {NEWS.map((n) => {
          const isOpen = expanded === n.id;
          return (
            <article key={n.id} className="rounded-xl border border-warm-border bg-parchment p-4">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{n.icon}</span>
                  <span className="rounded bg-ink/5 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink">{n.conflict}</span>
                  <span className="rounded bg-paper px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-stone-sub border border-warm-border">{n.publishedAt}</span>
                </div>
                <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${n.severity === "critical" ? "bg-[#ef4444]/10 text-[#ef4444]" : n.severity === "major" ? "bg-[#f97316]/10 text-[#f97316]" : "bg-[#eab308]/10 text-[#eab308]"}`}>{n.severity}</span>
              </div>
              <h3 className="mb-2 font-display text-sm font-semibold leading-snug text-ink">{n.headline}</h3>
              {isOpen && (
                <ul className="mb-3 space-y-2">
                  {n.bullets.map((b, i) => (
                    <li key={i} className="font-body text-xs leading-relaxed text-subtle-text before:mr-2 before:content-['▸'] before:text-signal">{b}</li>
                  ))}
                </ul>
              )}
              <button onClick={() => setExpanded(isOpen ? null : n.id)} className="text-[10px] font-bold uppercase tracking-wider text-signal hover:underline">
                {isOpen ? "Collapse" : "Expand briefing"}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Analysts() {
  return (
    <div className="rounded-2xl border border-warm-border bg-paper p-5 shadow-[0_2px_16px_-8px_rgba(28,25,23,0.08)]">
      <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-sub">Trusted OSINT Sources</div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ANALYSTS.map((a) => (
          <div key={a.name} className="rounded-xl border border-warm-border bg-parchment p-4">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-2xl">{a.flag}</span>
              <div className="min-w-0 flex-1">
                <div className="truncate font-display text-sm font-semibold text-ink">{a.name}</div>
                <div className="truncate text-[10px] font-semibold text-stone-sub">{a.handle}</div>
              </div>
              <a href={a.url} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-lg px-2 py-1 text-[10px] font-bold text-white" style={{ background: a.color }}>Open ↗</a>
            </div>
            <p className="mb-3 font-body text-xs leading-relaxed text-subtle-text line-clamp-3">{a.bio}</p>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-stone-sub">Recent:</div>
            <div className="mt-1 font-body text-xs text-subtle-text line-clamp-2">{a.recent[0]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExecutiveSummary() {
  return (
    <div className="rounded-2xl border border-warm-border bg-paper p-6 shadow-[0_2px_16px_-8px_rgba(28,25,23,0.08)]">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#ef4444]" />
        <span className="text-xs font-bold uppercase tracking-widest text-stone-sub">Executive Summary · As of {formatDate(REPORT_NOW)}</span>
      </div>
      <h2 className="mb-3 font-display text-2xl font-light italic leading-tight text-ink lg:text-3xl">
        Global flashpoints are accelerating in three theaters simultaneously: Iran, Ukraine, and the Americas.
      </h2>
      <p className="max-w-3xl font-body text-sm leading-relaxed text-subtle-text lg:text-base">
        The US-Iran war reignited after a brief diplomatic window collapsed. Ukraine’s long-range strike campaign is degrading Russian refining and logistics while Moscow’s losses outpace recruitment. In the Americas, Venezuela’s political transition is advancing alongside resumed Caribbean boat strikes, while Haiti’s state collapse deepens. The Indo-Pacific remains tense but below open kinetic conflict.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full border border-warm-border bg-parchment px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-sub">{CONFLICTS.length} Active Theaters</span>
        <span className="rounded-full border border-warm-border bg-parchment px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-sub">War Day {getWarDay()}</span>
        <span className="rounded-full border border-warm-border bg-parchment px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-sub">Updated 2x Daily</span>
      </div>
    </div>
  );
}

export default function WorldConflictDebrief() {
  const [selectedId, setSelectedId] = useState("iran");
  const selected = CONFLICTS.find((c) => c.id === selectedId);

  return (
    <div className="min-h-screen bg-parchment font-body text-ink">
      <style>{`
        .font-display { font-family: "Outfit", sans-serif; }
        .font-body { font-family: "Figtree", sans-serif; }
      `}</style>

      {/* Top unclassified bar */}
      <div className="border-b border-warm-border bg-ink py-1.5 text-center">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-parchment">
          <span>Unclassified · OSINT · Build #{BUILD_NUMBER}</span>
          <span>@FUQUAD08 · EnforcerOfficial</span>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-warm-border bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:py-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="font-display text-3xl font-extralight italic leading-none text-ink lg:text-5xl">
                World Conflict Debrief
              </h1>
              <p className="mt-2 font-body text-sm text-stone-sub">Global Flashpoints & Daily Intelligence</p>
            </div>
            <div className="flex flex-col items-start gap-3 lg:items-end">
              <div className="text-right">
                <div className="text-xs font-semibold uppercase tracking-widest text-stone-sub">Report Date</div>
                <div className="font-display text-lg font-semibold text-ink">{formatDate(REPORT_NOW)}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold uppercase tracking-widest text-stone-sub">Ukraine War Day</div>
                <div className="font-display text-lg font-semibold text-ink">{getWarDay()}</div>
              </div>
              <a
                href="https://buymeacoffee.com/fuquad08"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-signal bg-signal/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-signal transition hover:bg-signal hover:text-white"
              >
                ☕ Support this project
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-6 lg:py-10">
        <div className="space-y-6 lg:space-y-8">
          <ExecutiveSummary />

          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SituationMap selectedId={selectedId} onSelect={setSelectedId} />
            </div>
            <div className="lg:col-span-5">
              {selected && (
                <div className="h-full rounded-2xl border border-warm-border bg-paper p-5 shadow-[0_2px_16px_-8px_rgba(28,25,23,0.08)]">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-sub">Selected Theater</div>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-3xl">{selected.icon}</span>
                    <div>
                      <div className="font-display text-lg font-semibold text-ink">{selected.name}</div>
                      <div className="text-xs font-medium uppercase tracking-wider text-stone-sub">{selected.region}</div>
                    </div>
                  </div>
                  <div className="mb-4 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: `${selected.statusColor}15`, color: selected.statusColor, border: `1px solid ${selected.statusColor}40` }}>
                    {selected.status}
                  </div>
                  <p className="mb-5 font-body text-sm leading-relaxed text-subtle-text">{selected.summary}</p>
                  <div className="grid grid-cols-2 gap-3 border-t border-warm-border pt-4">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-stone-sub">Deaths</div>
                      <div className="font-display text-sm font-semibold text-ink">{selected.deaths}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-stone-sub">Displaced</div>
                      <div className="font-display text-sm font-semibold text-ink">{selected.displaced}</div>
                    </div>
                    {selected.warDay && (
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-stone-sub">War Day</div>
                        <div className="font-display text-sm font-semibold text-ink">{selected.warDay}</div>
                      </div>
                    )}
                  </div>
                  <div className="mt-5">
                    <Link to={`/${SECTION_MAP[selected.id] || "background/world-war-3-risk"}`} className="inline-flex rounded-lg bg-ink px-4 py-2 text-xs font-bold uppercase tracking-wider text-parchment transition hover:bg-ink/90">
                      Open Deep Dive →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <IntensityMetrics />
          <TodaysMovers />
          <SituationBoard selectedId={selectedId} onSelect={setSelectedId} />

          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <NewsFeed />
            </div>
            <div className="lg:col-span-2">
              <Analysts />
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
