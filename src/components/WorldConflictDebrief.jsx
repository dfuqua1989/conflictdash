import { useState, useEffect, useRef, useMemo } from "react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, ComposedChart, Bar, ScatterChart, Scatter, ZAxis, Cell, CartesianGrid, Legend, ReferenceArea } from "recharts";

const DARK={bg:"#0a1017",card:"#111a24",text:"#cdd8e3",sub:"#8496a8",sep:"rgba(120,150,180,0.10)",border:"rgba(120,150,180,0.20)",isDark:true};
const LIGHT={bg:"#e4e7ec",card:"#f6f7f9",text:"#111820",sub:"#3a4a5c",sep:"rgba(60,80,110,0.12)",border:"rgba(60,80,110,0.20)",isDark:false};
const GCSS=`@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap");@keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes teletypeCursor{0%,45%{opacity:1}50%,95%{opacity:0}100%{opacity:1}}
.tt-cursor{display:inline-block;width:6px;height:11px;background:currentColor;margin-left:3px;vertical-align:-1px;animation:teletypeCursor 1.1s step-end infinite}
.grain-overlay{position:fixed;inset:0;z-index:2;pointer-events:none;opacity:.05;mix-blend-mode:overlay;background-image:url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27><filter id=%27n%27><feTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%272%27 stitchTiles=%27stitch%27/></filter><rect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/></svg>")}
.stamp{position:absolute;top:8px;right:-22px;transform:rotate(11deg);border:2px solid rgba(220,38,38,.55);color:rgba(220,38,38,.65);font-family:"IBM Plex Mono",monospace;font-size:9px;font-weight:800;letter-spacing:.18em;padding:2px 26px;text-transform:uppercase;pointer-events:none;mix-blend-mode:multiply;opacity:.85}
.t-dark .stamp{mix-blend-mode:screen;color:rgba(248,113,113,.6);border-color:rgba(248,113,113,.45)}
.redact-tag{display:inline-block;background:repeating-linear-gradient(115deg,rgba(120,130,145,.9),rgba(120,130,145,.9) 3px,rgba(90,100,115,.75) 3px,rgba(90,100,115,.75) 6px);border-radius:3px;padding:1px 6px;color:#fff;font-size:8.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;box-shadow:inset 0 0 0 1px rgba(255,255,255,.15)}@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.ticker-wrap:hover .ticker-inner{animation-play-state:paused}::-webkit-scrollbar{display:none}*{-webkit-tap-highlight-color:transparent;box-sizing:border-box}@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}@keyframes shimmer{0%,100%{opacity:1}50%{opacity:.4}}@keyframes splashFadeOut{from{opacity:1}to{opacity:0}}@keyframes bandL{from{transform:translateX(-105%)}to{transform:translateX(0)}}@keyframes bandR{from{transform:translateX(105%)}to{transform:translateX(0)}}@keyframes tridentIn{0%{opacity:0;transform:scale(.3) rotate(-8deg)}60%{opacity:1;transform:scale(1.12) rotate(2deg)}100%{opacity:1;transform:scale(1) rotate(0)}}@keyframes glowRing{0%{transform:scale(.4);opacity:.9}100%{transform:scale(2.6);opacity:0}}@keyframes textReveal{from{opacity:0;letter-spacing:.55em;transform:translateY(8px)}to{opacity:1;letter-spacing:.22em;transform:translateY(0)}}@keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}@keyframes flagWave{0%,100%{transform:perspective(600px) rotateY(0deg)}50%{transform:perspective(600px) rotateY(4deg)}}@keyframes splashPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}@keyframes particleDrift{0%{transform:translateY(0);opacity:0}12%{opacity:.85}88%{opacity:.85}100%{transform:translateY(-110vh);opacity:0}}@keyframes radarSweep{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes radarPing{0%{transform:scale(.15);opacity:.7}100%{transform:scale(1.15);opacity:0}}@keyframes sheen{0%{transform:translateX(-130%) skewX(-18deg)}100%{transform:translateX(230%) skewX(-18deg)}}@keyframes loadBar{from{width:0%}to{width:100%}}@keyframes crosshairBlink{0%,100%{opacity:.5}50%{opacity:.12}}@keyframes criticalPulse{0%,100%{box-shadow:0 2px 10px rgba(0,0,0,.35),0 0 0 1px rgba(220,38,38,.25),0 0 8px 0 rgba(220,38,38,.15)}50%{box-shadow:0 2px 16px rgba(0,0,0,.45),0 0 0 1px rgba(220,38,38,.7),0 0 22px 2px rgba(220,38,38,.5)}}@keyframes edgeSheen{0%{opacity:.0}50%{opacity:.5}100%{opacity:.0}}.theater-card{transition:transform .2s cubic-bezier(.34,1.56,.64,1),box-shadow .2s ease;position:relative}.theater-card:active{transform:scale(.94);box-shadow:0 1px 4px rgba(0,0,0,.3)}.theater-card::after{content:"";position:absolute;inset:0;border-radius:14px;background:radial-gradient(circle at var(--px,50%) var(--py,50%),rgba(91,142,196,.55),rgba(91,142,196,.12) 45%,transparent 68%);opacity:0;pointer-events:none;transition:opacity .5s ease}.theater-card:active::after{opacity:1;transition:opacity 0s}.theater-card:active::before{content:"";position:absolute;inset:0;border-radius:14px;border:1.5px solid rgba(91,142,196,.6);pointer-events:none;animation:cardFlash .5s ease-out}@keyframes cardFlash{0%{opacity:.9;transform:scale(1)}100%{opacity:0;transform:scale(1.015)}}@keyframes riseIn{from{opacity:0;transform:translateY(9px)}to{opacity:1;transform:translateY(0)}}@keyframes barGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}.pill-tab{transition:transform .14s ease,background .15s ease,color .15s ease,border-color .15s ease}.pill-tab:active{transform:scale(.9)}.rise{animation:riseIn .3s ease-out both}@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important}}`;
const FONT='"IBM Plex Mono","Courier New",monospace';
const UA_WAR_DAY=Math.floor((Date.now()-new Date("2022-02-24T00:00:00Z").getTime())/86400000);

const CONFLICTS=[
  {id:"ukraine",name:"Ukraine War",region:"Eastern Europe",status:"Active",statusColor:"#ef4444",icon:"🇺🇦",deaths:"~500K–700K killed",displaced:"11.8M total",summary:`War Day ${UA_WAR_DAY}. 1.399M+ Russian casualties. Putin publicly admitted fuel shortages at United Russia congress Jun 28 — first time. Rejected all diplomatic solutions. Russia launched 142 drones + 2 Zircon + 6 Iskander overnight. NATO Ankara concluded: $80B/yr pledged, Patriot co-production greenlit.`,warDay:UA_WAR_DAY},
  {id:"gaza",name:"Israel & the Levant",region:"Middle East",status:"Multi-Front",statusColor:"#f59e0b",icon:"🇵🇸",deaths:"73,269+ killed total",displaced:"1.9M displaced",summary:"Ceasefire since Oct 10, 2025. 1,144+ killed since ceasefire. Quiet annexation accelerating. 80% of buildings damaged.",warDay:null},
  {id:"iran",name:"US-Iran War (2026)",region:"Middle East",status:"NAVAL BLOCKADE",statusColor:"#dc2626",icon:"🇮🇷",deaths:"~6,000+ total",displaced:"Hundreds K",summary:"Operation Epic Fury Feb 28; Islamabad MoU signed Jun 17 has effectively collapsed. Five straight days of US strikes (Jul 11-15) hit 140+ Iranian targets, including the first confirmed blockade-enforcement strike — a tanker disabled by Hellfire fire for running the blockade; Iran struck two UAE tankers in Omani waters (1 crew death) and hit Jordan/Bahrain/Kuwait/Oman. CENTCOM restored a naval blockade on Iranian ports Jul 14 — over 20 warships and hundreds of aircraft now operating in-theater. Trump reversed a proposed 20% Hormuz toll. Separately, satellite imagery shows Iran covertly rebuilding at Parchin and Pickaxe Mountain.",warDay:null},
  {id:"taiwan",name:"Taiwan Strait",region:"Indo-Pacific",status:"ELEVATED",statusColor:"#eab308",icon:"🌊",deaths:"No direct conflict casualties",displaced:"N/A",summary:"PLA Eastern Theater Command continues normalizing military pressure. TSMC produces ~90% of world's advanced chips. Any blockade triggers $1T+ global GDP shock.",warDay:null},
  {id:"south-china-sea",name:"South China Sea",region:"Indo-Pacific",status:"FLASHPOINT",statusColor:"#f97316",icon:"🏝️",deaths:"No direct conflict yet",displaced:"N/A",summary:"Near-daily CCG harassment of Philippine resupply at Second Thomas Shoal. Scarborough Shoal floating platform deployed Jun 2026. $3.37T annual trade transits the SCS.",warDay:null},
  {id:"caribbean",name:"Caribbean / Cuba Blockade",region:"Latin America",status:"BLOCKADE",statusColor:"#f97316",icon:"🇨🇺",deaths:"Grid collapse — ~10M in the dark",displaced:"2 island-wide blackouts, week of Jul 6",summary:"US oil blockade on Cuba since Jan 2026 — the first effective blockade since the Missile Crisis. Food production down 60%, rolling blackouts, and a deepening humanitarian crisis; maritime enforcement overlaps Operation Southern Spear’s strike zone. Opens the Venezuela / Caribbean section → Cuba Blockade tab.",warDay:null},
  {id:"venezuela",name:"Venezuela",region:"Latin America",status:"QUIET",statusColor:"#8496a8",icon:"🇻🇪",deaths:"221+ killed in Caribbean boat strikes",displaced:"Maduro captured Jan 3, 2026",summary:"Largely quiet since spring. US captured Maduro Jan 3, 2026 (Operation Absolute Resolve); Operation Southern Spear boat strikes have killed 221+ since Sept 2025 but the tempo slowed sharply after early May. The Caribbean's live front is now Cuba's grid collapse — see the Caribbean / Cuba Blockade card.",warDay:null},
];

const NEWS=[
  {id:"b_syrskyi_denial_jul20",conflictId:"ukraine",severity:"critical",icon:"🔴",headline:"General Staff Denies Reports Commander-in-Chief Syrskyi Was Dismissed Amid Second Day of Protests",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Jul 21, 2026",bullets:["Reports spread rapidly on Jul 20 that Commander-in-Chief Gen. Oleksandr Syrskyi had been removed — journalist Vitaliy Glagola, citing sources in Zelensky's office and the Ministry of Defense, said the dismissal would be announced later that day, and MP Yaroslav Zheleznyak said his sources confirmed it ahead of a scheduled 16:30 Staff meeting","The General Staff officially denied the reports: 'Reports circulating in the media... regarding the alleged dismissal of General Oleksandr Syrskyi... are untrue.' Both Syrskyi and General Staff chief Lt. Gen. Andrii Hnatov 'continue to perform their duties' — the statement noted dismissals from such posts require a presidential decree, which has not been issued","The rumors landed on the second consecutive day of protests in Kyiv and other cities, where demonstrators called for both Fedorov's reinstatement and Syrskyi's resignation; former Defense Minister Fedorov has framed his own dismissal as effectively an ultimatum. Syrskyi has publicly said he is 'ready to work with any defense minister' since he is 'at war with Russia, not the ministry'","Separately, Zelensky held his first phone call with new UK Prime Minister Burnham, and met with Deputy Chief of the General Staff Volodymyr Horbatiuk and Joint Forces commander Mykhailo Drapatyi to discuss defense strategy"],sources:["Ukrinform","LIGA.net","Mezha.net"],impact:"Whether or not the dismissal itself was ever real, the fact that it was widely believed for hours shows how fragile the wartime cabinet's standing has become just five days after Fedorov's removal — the political story is now as live a front as the battlefield one",impactColor:"#dc2626"},
  {id:"b_iran_jordan_jul18",conflictId:"iran",severity:"critical",icon:"🔴",headline:"US Confirms 3 Troops Killed in Iranian Strikes on Jordan — First US Combat Fatalities Since March",conflict:"Iran",conflictColor:"#8b5cf6",publishedAt:"Jul 20, 2026",bullets:["CENTCOM initially said two US service members were killed and a third was missing after Iranian missile and drone strikes on US forces in Jordan on Jul 17; by Jul 19 the toll was confirmed at 3 killed — a service member died in a controlled detonation of an Iranian drone in Iraq's Kurdistan Region, and remains were recovered at the Jordan base — marking the first confirmed American combat fatalities since the conflict resumed","The US answered with an eighth, then ninth, consecutive night of strikes on Iran, hitting Sirik and Hajiabad in Hormozgan province and, by Jul 20, Abadan and Tabriz — the campaign's widest single-night geographic spread yet, alongside Chabahar, Konarak, Bandar Mahshahr, Bandar Imam Khomeini, Jask, Sirik and Bushehr","Iran struck Kuwait's main desalination plant for a second time, leaving roughly 10,000 people without water; fired missiles toward Jordan's Aqaba; and Israel's defense minister and IDF chief both warned Israel would respond immediately and without condition to any Iranian attack — raising the risk Israel is drawn back in directly","The Houthis announced their own maritime embargo Jul 20 in solidarity with Iran, adding a new armed actor; Hormuz daily crossings have collapsed to roughly 9 vessels versus a ~130/day pre-war average, and Brent crude surged to ~$91/bbl. The Pentagon separately said nearly 100 US troops have been injured (96% returned to duty) since Jul 7, pushing back on a NYT report alleging undercounted casualties. Iran's Health Ministry says 50+ killed, 500+ injured domestically since Jul 6"],sources:["CNN","NPR","Al Jazeera","Bloomberg"],impact:"The first confirmed US combat deaths of this round, now joined by a new belligerent (the Houthis) and a collapsing Hormuz traffic count — the war is widening in actors and geography even as the casualty and economic tolls climb on all sides",impactColor:"#dc2626"},
  {id:"b_odesa_ship_jul20",conflictId:"ukraine",severity:"critical",icon:"🔴",headline:"Russian Missile Strike Kills 10 on Grain Ship Near Odesa — Deadliest Black Sea Attack in Weeks",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Jul 20, 2026",bullets:["Russia hit the Golden Leo — a Guinea-Bissau-flagged, Turkish-owned bulk carrier loaded with corn, crewed by Indian and Syrian sailors — with three cruise missiles late Jul 19 as it left Odesa, sparking a fire; Ukraine's navy said 9 crew members and a Ukrainian maritime pilot were killed, 8 of 17 aboard rescued after an overnight search-and-rescue operation","Russia's Defense Ministry separately said it struck fuel storage facilities at Odesa's port the same night; Odesa's regional governor said Russian strikes have now killed 28 people in the region this month alone amid near-daily shelling","The strike lands atop an already-elevated month of Black Sea violence — Russian forces have used Geran-4 drones against grain carriers at Chornomorsk earlier in July — and comes a day after one of the war's largest ballistic barrages hit Kyiv; Ukraine has lost roughly a third of its Black Sea grain-export capacity to Russian strikes, while Ukrainian pressure has forced Russia to curtail shipping through the Sea of Azov, which normally handles about a quarter of its own grain exports","In response, Ukraine launched more than 400 drones at the Moscow region overnight, hitting an oil depot in Podolsk and a warehouse fire at the Yuzhnye Vrata industrial complex in Domodedovo"],sources:["Reuters","CBC","Euromaidan Press"],impact:"The deadliest single Black Sea incident in weeks underscores that neither side can fully secure its side of the maritime corridor even without a naval blockade — and with both countries major grain exporters, the strike carries a global food-security dimension beyond the immediate casualties",impactColor:"#dc2626"},
  {id:"b_kyiv_kharkiv_jul20",conflictId:"ukraine",severity:"major",icon:"🟠",headline:"Russia Strikes Kyiv and Kharkiv Outskirts Overnight, Killing 4+ — Ukraine Answers With Strikes on 3 Russian Oil Depots and a Shadow-Fleet Tanker",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Jul 20, 2026",bullets:["Russian strikes overnight Jul 19-20 hit Kyiv and the outskirts of Kharkiv, killing at least 4 and injuring 20+; in Kyiv the attack damaged residential buildings, sparked multiple fires, and destroyed the UKRTAC plant and its warehouses, though no employees were killed","In the Kharkiv region, 16 people were injured, three seriously","Ukrainian forces struck back overnight, hitting three oil depots deep inside Russia, a Buk air defense system, a logistics bridge, and two tankers plus a floating crane in the Black and Azov seas","The SBU separately reported hitting the sanctioned shadow-fleet tanker Avero, with large fires breaking out at the targeted sites — part of the sustained campaign against the fleet financing Russia's oil exports"],sources:["RBC-Ukraine","Ukrainska Pravda"],impact:"Another exchange in the tit-for-tat pattern that's defined the past two weeks — Russian strikes on population centers answered within hours by Ukrainian strikes on the energy/logistics infrastructure funding the war",impactColor:"#f97316"},
  {id:"b_kyiv_barrage_jul19",conflictId:"ukraine",severity:"critical",icon:"🔴",headline:"Russia Fires 41 Missiles, 125 Drones at Kyiv in One of the War's Largest Ballistic Barrages — 1 Killed, 16 Wounded",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Jul 19, 2026",bullets:["Russia launched 41 missiles — including 25 ballistic — and 125 attack drones across Ukraine overnight Jul 18-19, with Kyiv as the primary target; the attack began around 1:30am local time and continued for several hours","Ukraine's Air Force said it intercepted or suppressed 18 missiles and 108 drones; strikes still sparked fires in five Kyiv districts, damaging residential buildings, offices, industrial sites, a dormitory and vehicles","At least 1 person was killed and 16 wounded in Kyiv; Zelensky said most of the missiles targeted the capital directly","The barrage lands the same week Ukraine's own PAC-3/Patriot stocks are already strained by the parallel Iran war drawing on the same US inventory — reinforcing the dashboard's standing watch item on whether NATO's Ankara pledges translate into real supply in time"],sources:["NPR","AP","Helsinki Times"],impact:"One of the largest ballistic-heavy barrages of the war, arriving days after Ukraine's deepest strikes yet into Moscow region — underscores that the intensification is bidirectional and neither side is de-escalating",impactColor:"#dc2626"},
  {id:"b_gaza_funeral_strike_jul17",conflictId:"gaza",severity:"critical",icon:"🔴",headline:"Israeli Strikes Kill 14+ Across Gaza in Heaviest Single Day Since October Ceasefire — Funeral Procession Among the Dead",conflict:"Gaza",conflictColor:"#ef4444",publishedAt:"Jul 17, 2026",bullets:["Israeli forces killed at least 14 Palestinians and wounded 37+ across Gaza on Jul 17, including a drone strike on a funeral procession in the Nuseirat refugee camp that killed 7-8 mourners and wounded 20-22, per local health officials and Al Jazeera; a conflict monitor recorded the heaviest Israeli fire since the October 2025 truce","The IDF said the funeral strike targeted a Palestinian Islamic Jihad 'terrorist cell' and acknowledged awareness that civilians may have been harmed; separate strikes elsewhere in Gaza killed at least 5 more the same day","Israeli officials framed the intensity as progress rather than a lapse: deputy chief of staff Maj. Gen. Tamir Yadai cited control of roughly 65% of Gaza and claimed 70,000 militants killed since the war began, while stating forces would not withdraw from the 'yellow line' even after any Hamas disarmament","Post-ceasefire Palestinian deaths now exceed 1,123 since October 2025, per local health officials — up from the low-1,000s tracked earlier this year — while fresh detainee-abuse allegations from Kamal Adwan Hospital's former director add to the pressure on the stalled Board of Peace/NCAG governance transition","Jul 18: Israeli strikes on two more Gaza City neighborhoods — al-Nasr and al-Zeitoun — killed at least 8 more Palestinians, per medical sources, meaning the post-ceasefire toll continues climbing past the 1,123+ figure above. Jul 19: government ministers joined thousands of settler activists marching toward the Gaza border calling for renewed Israeli settlement of the territory, breaching at least four army checkpoints along the route; separately CENTCOM said US forces have redirected 6 ships and disabled another under the reimposed Iran blockade"],sources:["Al Jazeera","AP","The National","Times of Israel"],impact:"The most intense stretch of Israeli fire since the ceasefire took hold, with the IDF's own framing signaling no near-term change of posture — reinforces that the 'ceasefire' label increasingly describes a lower-tempo continuation of the war rather than its end, while settler activism pushing toward Gaza adds a new governance-transition complication",impactColor:"#dc2626"},
  {id:"b_ukraine_reshuffle_jul16",conflictId:"ukraine",severity:"critical",icon:"🔴",headline:"Zelensky Fires Popular Defense Minister Fedorov, Sparking Kyiv Protests, in Ukraine's 4th Wartime Government Reshuffle",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Jul 16, 2026",bullets:["Zelensky announced Jul 12 that \u201cUkraine is changing its political strategy,\u201d launching the war\u2019s fourth government reshuffle. Parliament accepted PM Yulia Svyrydenko\u2019s resignation Jul 15 and has already approved her replacement: Serhii Koretskyi, former CEO of state energy firm Naftogaz","The bigger shock: Defense Minister Mykhailo Fedorov \u2014 widely credited with reducing ministry corruption and persuading Elon Musk to deny Russia Starlink access in Feb 2026 \u2014 was dismissed after just six months, following a Jul 15 meeting with military leadership. Interior Minister Ihor Klymenko has reportedly been tapped to replace him, pending parliamentary approval","Analysts and officials point to a feud between Fedorov and Commander-in-Chief Oleksandr Syrskyi as the real driver. Fedorov turned down an advisor role Zelensky offered him and a job from Palantir\u2019s Alex Karp, saying \u2018I don\u2019t need to be Minister of Defense just to be Minister of Defense\u2019","More than 1,000 people rallied in Kyiv\u2019s central square Jul 16 chanting \u2018shame\u2019 and \u2018bring Fedorov back,\u2019 with further protests in other cities \u2014 a rare public backlash against a wartime cabinet decision. Separately, Deputy Air Force Commander Pavlo Yelizarov also resigned this week, citing failures tied to his own tenure","The dismissal landed hours after Ukraine signed new EU drone-production deals, and about a week after Trump\u2019s NATO-summit Patriot-license pledge \u2014 leaving the defense ministry\u2019s reform momentum and the Patriot-production timeline both now riding on an untested successor"],sources:["Kyiv Independent","RFE/RL","NPR","The Irish Times"],impact:"A rare, genuinely contested domestic political shock in the middle of an active war \u2014 removing the minister most associated with Ukraine\u2019s drone-innovation edge and the Starlink win, on the same week air defense and Patriot production are the dashboard\u2019s central open questions",impactColor:"#dc2626"},
  {id:"b_ukraine_govt_confirmed_jul16",conflictId:"ukraine",severity:"major",icon:"🟠",headline:"Rada Confirms Koretsky Government; SBU's Yevhenii Khmara Named Acting Defense Minister After Fedorov Firing",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Jul 16, 2026",bullets:["Parliament approved the new Cabinet under PM Serhii Koretsky on Jul 16, completing the government half of the reshuffle that began with Svyrydenko's resignation","Zelensky instructed Yevhenii Khmara — an SBU officer with a background in combat operations — to serve as acting Defense Minister following Mykhailo Fedorov's dismissal, pending a permanent appointment","Protests against Fedorov's firing continued across Kyiv, Odesa, Lviv and Dnipro; Fedorov has publicly confirmed his resignation and discussed what he was unable to finish, while declining an advisor role","The martial-law and mobilization regimes were both extended to Oct 31, 2026 — the 20th such vote — underscoring that the leadership churn is happening against a still-open-ended war footing"],sources:["UNN","Ukrainska Pravda","OstroV"],impact:"Resolves the immediate succession question from last week's shock, but installs an untested acting defense minister at the exact moment Patriot-production licensing and air-defense reform are the dashboard's central open threads",impactColor:"#f97316"},
  {id:"b_iran_blockade_jul14",conflictId:"iran",severity:"critical",icon:"🔴",headline:"US Strikes Expand Into Northern Iran on Sixth Day; Tehran Says Nuclear-Adjacent MOU Has \u2018Entered a Crisis Stage\u2019",conflict:"Iran",conflictColor:"#8b5cf6",publishedAt:"Jul 14, 2026",bullets:["What began as a single retaliatory strike Jul 12 has become a sustained four-night campaign: CENTCOM hit ~140 targets the first night (first-ever use of one-way attack sea drones), then continued strikes for a third and fourth consecutive round, framed as degrading Iran’s ability to threaten shipping","Iran struck two UAE-flagged tankers, al-Bahiya and Mombasa, with missiles while they were in Omani territorial waters \u2014 an Indian crew member aboard the Mombasa was killed, the first confirmed tanker-strike fatality of this round","The blockade formally took effect at 20:00 GMT Jul 14 per the Navy-led Joint Maritime Information Centre — all vessel traffic regardless of flag, across Iran's entire coastline including ports and oil terminals; neutral ships bound for non-Iranian destinations may pass, humanitarian shipments subject to inspection. 20+ warships and hundreds of aircraft in-theater; Trump reversed his proposed 20% Hormuz toll for Gulf trade commitments instead","Iran’s IRGC threatened that ‘not a single drop of oil and gas’ would be exported from the region while US strikes continue; Qatar formally condemned Iran’s strikes on Jordan, Bahrain and Kuwait as violations of sovereignty","Traffic through the strait has collapsed: 22 crossings on Jul 9 versus 147 the day before the war began (Kpler); Brent rose to $85 and WTI to $80. Trump, on Fox: strikes continue 'until I say it's enough,' with bridges and power plants threatened 'next week' and a ground campaign not ruled out — while Iran's deputy FM declared the US 'destroyed' the interim deal and Tehran now has 'no commitments' under the MoU",
"A fifth straight day of strikes followed Jul 15; in the blockade's first 24 hours a US aircraft fired Hellfire missiles into the smokestack of the Cura\u00e7ao-flagged tanker M/T Belma after it ignored repeated warnings toward Iran's Kharg Island \u2014 disabled, not sunk, the first confirmed blockade-enforcement strike. IRGC restated its export-halt threat the same day","Jul 16: the campaign widened into northern Iran for the first time and CENTCOM destroyed an IRGC port surveillance tower near the Strait (Iran calls it civilian). The Iranian FM said the MOU has \u2018entered a crisis stage\u2019 and dismissed granting IAEA chief Grossi access to nuclear sites; Oman-mediated Hormuz talks reached no deal. In Washington, House Republicans floated a $95B war-funding plan as Senate Democrats blocked a $1T defense bill in protest",
"Jul 17 marked the halfway point of the 60-day MoU window (Jun 17\u2013Aug 16) — and a seventh straight night of US strikes hit surveillance sites, military logistics, underground weapons storage and maritime targets, plus a second strike on a Kuwaiti desalination plant, exposing regional water-supply vulnerability. Tehran said the US had violated the MoU and announced it is suspending its own commitments under it. House Republicans' $95B Iran-war funding package cleared its first procedural hurdle the same day"],sources:["CNN","Al Jazeera","CNBC","Fox News","ABC News"],impact:"The mechanism has shifted from airstrikes to a structural blockade \u2014 a much harder thing to unwind diplomatically than a strike campaign. With Iran now declaring its own commitments suspended at the MoU's halfway point, the Aug 16 deadline (29 days out) looks less like a deadline and more like a formality already overtaken by events",impactColor:"#dc2626"},
  {id:"b_senate_defense_bill_jul14",conflictId:"ukraine",severity:"major",icon:"🟠",headline:"Senate Democrats Block $1 Trillion Defense Bill in Protest Over the Iran War",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Jul 14, 2026",bullets:["Senate Democrats blocked procedural passage of a roughly $1 trillion defense authorization bill, citing the renewed Iran war and the lack of Congressional authorization for the latest round of strikes","The move lands one day after the death of Sen. Lindsey Graham, one of the chamber's most reliable votes for defense and Ukraine-related spending, further complicating the bill's path","Given this dashboard's tracking of US legislative capacity for Ukraine aid and Russia sanctions, a stalled defense bill is a relevant leading indicator — appropriations fights over Iran can just as easily delay Ukraine-linked funding riders"],sources:["AP"],impact:"A concrete sign that the Iran war is now spilling into domestic US legislative gridlock, with second-order risk to unrelated defense and Ukraine funding items that typically ride on the same bill",impactColor:"#f97316"},
  {id:"b_graham_death_jul12",conflictId:"ukraine",severity:"major",icon:"🟠",headline:"Senator Lindsey Graham, a Leading Congressional Voice for Ukraine and Russia Sanctions, Dies at 71",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Jul 12, 2026",bullets:["Sen. Lindsey Graham (R-SC) died Saturday night, hours after returning from a trip to Ukraine; the DC medical examiner's preliminary finding was aortic dissection from arteriosclerotic cardiovascular disease. He was 71","Graham was one of Congress's most prominent Ukraine advocates and the lead Senate sponsor of the Russia sanctions bill this dashboard has tracked; he was also among the most vocal Senate supporters of the US-Israeli campaign against Iran","Trump, who spoke with Graham hours before his death, led tributes calling him 'one of the greatest people and Senators I have ever known'; flags were ordered to half-staff","Graham was mid-campaign for a fifth Senate term and chaired the Senate Budget Committee; South Carolina's governor will appoint a replacement for the remainder of his term, with a special election in November. His death removes a key pro-Ukraine, pro-Israel voice from a Senate Republican conference already operating on a narrow majority"],sources:["NPR","Axios","NBC News"],impact:"A genuine loss of institutional capital for Ukraine's Congressional support base — Graham was one of the few Republicans who could reliably move sanctions and aid legislation forward; his absence adds uncertainty to any future sanctions or Patriot-funding votes this dashboard tracks",impactColor:"#f97316"},
  {id:"b_venezuela_quake_jul12",conflictId:"venezuela",severity:"major",icon:"🟠",headline:"Venezuela Earthquake Death Toll Climbs Past 4,490 as US Navy Ship Takes Over Wrecked La Guaira Port",conflict:"Venezuela",conflictColor:"#f59e0b",publishedAt:"Jul 12, 2026",bullets:["Twin earthquakes struck Venezuela's Caribbean coast on Jun 24 near Caracas and La Guaira; the death toll has climbed steadily since — 235 (Jun 26), 3,535 (Jul 7), ~4,300 (Jul 11), and 4,490 as of Jul 12, per National Assembly figures","Roughly 18,000 people remain unhoused and over 16,700 injured; camps have been set up across Caracas and La Guaira, with mass burials continuing at expanded cemeteries","The amphibious transport dock USS San Antonio has taken over reconstruction of the badly damaged La Guaira port — notable given the same waters are the active zone for the US Southern Spear boat-interdiction campaign","This is unrelated to the ongoing US intervention/Maduro-transition storyline, but compounds it: a population already living through post-regime-change upheaval is now also absorbing one of the deadliest earthquakes in the country's modern history"],sources:["Al Jazeera","AFP","Reuters"],impact:"A humanitarian catastrophe operating in parallel with, not connected to, the conflict story this dashboard otherwise tracks in Venezuela — included because the death toll (4,490+) now dwarfs every other Venezuela metric on this dashboard by an order of magnitude",impactColor:"#f97316"},
  {id:"b_iran_rebuild_jul10",conflictId:"iran",severity:"critical",icon:"🔴",headline:"Satellite Imagery Shows Iran Rebuilding Bombed Nuclear Sites at Parchin and Pickaxe Mountain",conflict:"Iran",conflictColor:"#8b5cf6",publishedAt:"Jul 10, 2026",bullets:["CNN, working with the Institute for Science and International Security (ISIS), obtained commercial satellite imagery from Jun 22 and Jul 7 showing repair work at the Taleghan 2 facility inside the Parchin military complex — long suspected of nuclear-weapons-related research — including excavation around bomb-impact holes, fresh concrete reinforcement, and apparent rebar for a permanent concrete cap","Separate imagery from Jun 21 shows trucks and construction activity at Pickaxe Mountain, a suspected underground enrichment site near Isfahan","ISIS founder David Albright called the work 'significant, new attempted reconstruction activity,' saying it 'shows a commitment by Iran to rebuild and reconstitute the capabilities previously lost'","Crucially, analysts found no comparable rebuilding at Iran's principal declared facilities — Natanz, Fordow, or Isfahan — leaving the scope and purpose of the Parchin/Pickaxe work uncertain","The repair activity appears to have begun while the Jun 17 Islamabad MoU was still nominally in force, raising the question of whether Iran was already in breach before Trump declared the agreement 'over' on Jul 8. Separately, the US Treasury sanctioned Iranian tycoon Ali Ansari on Jul 10 over ties to Mojtaba Khamenei and the IRGC"],sources:["CNN","Institute for Science and International Security","Times of Israel"],impact:"The clearest physical evidence yet that Iran never fully complied with the MoU's spirit even before it collapsed — undercuts any future negotiating track that assumes Iran negotiated in good faith, and gives Israel/US hawks a concrete justification for renewed strikes",impactColor:"#dc2626"},
  {id:"b_cuba_blackout_jul10",conflictId:"venezuela",severity:"major",icon:"🟠",headline:"Cuba Hit by Two Island-Wide Blackouts in a Week as Fuel Blockade Collapses the Grid — ~10M in the Dark",conflict:"Caribbean",conflictColor:"#f59e0b",publishedAt:"Jul 10, 2026",bullets:["Cuba's state electric utility announced a total disconnection of the National Electric Power System on Jul 10 — the second island-wide blackout in a week after a Jul 6 collapse, and the fourth since January","Roughly 10 million people were affected each time; limited service was restored only in patches. Electricity pumps ~80% of the island's water, so the outages cascade directly into a drinking-water emergency","President Díaz-Canel called the US fuel blockade 'genocidal'; the UN resident coordinator has warned of humanitarian collapse. Only one Russian tanker has reached Cuba in months, and a second turned back in May","The collapse comes days after Cuba took the blockade to the UN General Assembly (Jul 8), where a record \$8B damage figure was cited and abstentions by Germany and Canada signaled eroding support for Havana"],sources:["Al Jazeera","Reuters","AP"],impact:"The grid is now failing outright rather than degrading — moving the Caribbean story from chronic shortage to acute collapse, and sharpening the question of whether Washington's stated regime-change timeline forces a deal or a breaking point",impactColor:"#dc2626"},
  {id:"b_patriot_license_jul9",conflictId:"ukraine",severity:"critical",icon:"🔴",headline:"Trump Grants Ukraine a License to Manufacture Patriot Missiles — 'Make Them Yourself'",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Jul 9, 2026",bullets:["At the Ankara closing press conference alongside Zelensky, Trump announced he is licensing Ukraine to produce Patriot air-defense missiles: 'We're going to give a license to you to make Patriots... This way he can't complain that we're not giving them enough. I said, make them yourself'","Zelensky confirmed Jul 9 the licence was agreed 'at the political level' and that PAC-3 supplies would arrive 'in the coming days,' with technical terms still to be negotiated — but a defence-ministry adviser cautioned production needs many months and another official said a year or more; Bloomberg reports 12-24 month lead times on subcontracted components. Trump conceded he had not yet told Lockheed Martin or RTX","In parallel, Poland signed a multilateral agreement with the US and several NATO states to establish a European maintenance center for PAC-3 missiles, and will cooperate with Ukraine on their production and maintenance; Poland is transferring 5 Patriot missiles directly, and Slovenia added $50M to the PURL weapons-purchase initiative","Ukraine is also pushing its own anti-ballistic interceptor: the 'Freyja' project, which as many as eight European countries may join. The urgency is arithmetic — CSIS assesses Ukraine intercepted only 14 of 54 Russian ballistic missiles in June, and none of the 23 that hit Kyiv on Jul 6","The tone at Ankara was markedly different from the February 2025 White House confrontation; Trump praised Zelensky as having 'done an amazing job'"],sources:["WORLD Radio","Kyiv Independent","Ukrinform"],impact:"The single most consequential materiel decision of the war to date — if it becomes production. The binding constraint on Ukraine's cities has been PAC-3 supply, and a license is the first mechanism offered that isn't rationed from someone else's stockpile",impactColor:"#dc2626"},
];

const LOSSES={ukraine:[
  {id:1,category:"Personnel",total:"1,431,900",todayChange:"+1,370",color:"#ef4444",icon:"☠️",description:"Killed & wounded (est.)"},
  {id:2,category:"Tanks",total:"12,161",todayChange:"+3",color:"#f97316",icon:"🪖",description:"Main battle tanks"},
  {id:3,category:"Armoured Vehs",total:"24,978",todayChange:"+7",color:"#eab308",icon:"🚧",description:"APCs, IFVs, MRAPs"},
  {id:4,category:"Artillery",total:"46,435",todayChange:"+92",color:"#84cc16",icon:"💥",description:"Guns, howitzers, mortars"},
  {id:5,category:"MLRS",total:"1,955",todayChange:"+2",color:"#22c55e",icon:"🚀",description:"Multiple launch rockets"},
  {id:6,category:"Air Defence",total:"1,513",todayChange:"+2",color:"#06b6d4",icon:"🛡️",description:"SAM & SHORAD systems"},
  {id:7,category:"UAVs",total:"420,290",todayChange:"+1,865",color:"#5b8ec8",icon:"🛸",description:"Operational UAVs"},
  {id:8,category:"Aircraft",total:"438",todayChange:"—",color:"#8b5cf6",icon:"✈️",description:"Fixed-wing aircraft"},
  {id:9,category:"Helicopters",total:"354",todayChange:"—",color:"#ec4899",icon:"🚁",description:"Rotary-wing aircraft"},
  {id:10,category:"Cruise Missiles",total:"4,933",todayChange:"—",color:"#14b8a6",icon:"🎯",description:"Destroyed in flight"},
  {id:11,category:"Ships/Boats",total:"34",todayChange:"—",color:"#64748b",icon:"⛵",description:"Naval vessels"},
  {id:12,category:"Vehicles",total:"123,347",todayChange:"+453",color:"#a78bfa",icon:"🚛",description:"Trucks & logistics"},
  {id:13,category:"Ground Robots",total:"1,970",todayChange:"+5",color:"#f43f5e",icon:"🤖",description:"UGV platforms"},
  {id:14,category:"Special Equip",total:"4,441",todayChange:"+8",color:"#fb923c",icon:"🔧",description:"Engineering & EW"},
],gaza:[
  {id:15,category:"Total Killed",total:"73,066+",todayChange:null,color:"#f59e0b",icon:"☠️",description:"Total killed since Oct 2023"},
  {id:16,category:"Children Killed",total:"20,179+",todayChange:null,color:"#ef4444",icon:"👶",description:"Children killed"},
  {id:17,category:"Post-ceasefire killed",total:"1,144+",todayChange:null,color:"#f97316",icon:"💀",description:"Killed since Oct 10, 2025 ceasefire"},
  {id:18,category:"Buildings Damaged",total:"80%",todayChange:null,color:"#eab308",icon:"🏚️",description:"Of Gaza buildings damaged or destroyed"},
],"south-china-sea":[
  {id:25,category:"Annual Trade Value",total:"$3.37T",todayChange:null,color:"#06b6d4",icon:"🚢",description:"Annual trade value transiting SCS"},
  {id:26,category:"Incidents YTD 2026",total:"47+",todayChange:"+18 Jun",color:"#ef4444",icon:"⚠️",description:"Documented PRC harassment incidents"},
  {id:27,category:"China Claims",total:"~90%",todayChange:null,color:"#f97316",icon:"🗺️",description:"Nine-Dash Line; UNCLOS tribunal ruled no legal basis"},
  {id:28,category:"Claimant Nations",total:"6",todayChange:null,color:"#eab308",icon:"🌏",description:"China, Philippines, Vietnam, Malaysia, Brunei, Taiwan"},
  {id:29,category:"Militia Vessels (Whitsun)",total:"220+",todayChange:null,color:"#ef4444",icon:"⛵",description:"Chinese maritime militia at Whitsun Reef — Jun 3, 2026"},
]};

const STRIKES=[
  {id:22,date:"Jul 18",targetName:"Moscow Region: Noginsk Oil Depot + Elektrostal USF Warehouse + Wildberries Logistics Fire",region:"Moscow Oblast, Russia",distance:450,category:"Energy/Military-Industrial",icon:"🎯",severity:"critical",result:"Strikes landed inside Moscow region itself for the first time this cycle: an oil depot hit in Noginsk, a warehouse at the 1st Center of Unmanned Systems Forces destroyed by fire in Elektrostal, and a large fire at Wildberries' second-largest logistics center in Moscow. Moscow's mayor said 1,892 Ukrainian drones were detected heading toward the region between Jul 11-18 alone."},
  {id:3,date:"Jun 24",targetName:"Kerch Strait air defense + Saky & Hvardiiske airfields",region:"Crimea",distance:280,category:"Military",icon:"📡",severity:"major",result:"SSU Alpha unit struck air defense systems and military infrastructure at Saky and Hvardiiske airfields."},
  {id:4,date:"Jun 23",targetName:"Voronezh missile electronics plant",region:"Voronezh Oblast",distance:640,category:"Military-Industrial",icon:"🏭",severity:"critical",result:"Confirmed hit on plant manufacturing electronics for Iskander missiles and Kh-101 cruise missiles."},
  {id:5,date:"Jun 23",targetName:"N. Crimean Canal railway bridge",region:"Occupied Kherson/Crimea",distance:250,category:"Infrastructure",icon:"🌉",severity:"critical",result:"DESTROYED — Russia's last intact rail link supplying Crimea from the north."},
  {id:8,_rotated:true,date:"Jun 27",targetName:"Titan-Barikady military plant, Volgograd",region:"Volgograd Oblast",distance:780,category:"Military-Industrial",icon:"🚀",severity:"critical",result:"Zelensky confirmed FP-5 Flamingo missiles struck the Titan-Barikady facility — a key Russian military-industrial complex in the Volgograd corridor."},
  {id:9,date:"Jun 27",targetName:"Pantsir-S1 air defence system, Feodosia",region:"Occupied Crimea",distance:260,category:"Military",icon:"📡",severity:"major",result:"Black Sky UAV battalion destroyed Russian Pantsir-S1 air defence system near Feodosia. Continued degradation of Crimea's air defence network."},
  {id:11,date:"Jun 28",targetName:"Slovyansk-on-Kuban oil refinery, Krasnodar Krai",region:"Krasnodar Krai, Russia",distance:390,category:"Energy",icon:"🛢️",severity:"critical",result:"Fire broke out at Slovyansk-on-Kuban refinery overnight Jun 27-28. Confirmed as part of Ukraine's 40-day intermediate- and long-range strike campaign per SSU Alpha + GUR + UAF Unmanned Systems Forces."},
  {id:12,date:"Jun 28",targetName:"Oil infrastructure, Vladimir Oblast",region:"Vladimir Oblast, Russia",distance:860,category:"Energy",icon:"🛢️",severity:"major",result:"Ukrainian forces struck Russian oil infrastructure in Vladimir Oblast overnight per ISW Jun 28 assessment. Part of the systematic 40-day energy infrastructure campaign."},
  {id:13,date:"Jun 28",targetName:"Slavneft-YANOS Refinery, Yaroslavl",region:"Yaroslavl Oblast, Russia",distance:700,category:"Energy",icon:"🛢️",severity:"major",result:"Zelensky confirmed a strike roughly 700km (435 miles) from the Ukrainian border, calling it part of Ukraine's 'long-range sanctions' campaign — 'each strike means a reduction in the resources that fuel the Russian war machine.' Struck alongside a natural gas plant and satellite communications facilities the same night. Re-struck Jul 16, causing a fresh fire — General Staff still conducting battle-damage assessment."},
  {id:14,date:"Jul 2",targetName:"Lukoil-Nizhegorodnefteorgsintez Refinery, Kstovo",region:"Nizhny Novgorod Oblast, Russia",category:"Energy",icon:"🔥",severity:"critical",result:"One of the last two refineries still supplying Moscow and its region was hit, sparking a major fire. Ukraine has now struck 8 of Russia's 10 largest refineries since the campaign scaled up in 2026 — refining capacity nationwide down roughly a third, per Macro-Advisory estimates, with rationing reported across half of Russia's regions."},
  {id:15,date:"Jul 3",targetName:"St. Petersburg Oil Terminal & Kronstadt Naval Base",region:"Leningrad Oblast, Russia",category:"Military",icon:"⚓",severity:"critical",result:"Ukraine's deepest Baltic strike yet: roughly 500 long-range drones hit one of the Baltic's largest oil transshipment hubs and the Kronstadt Naval Base — Baltic Fleet HQ — both catching fire. UA General Staff assessed Russian refining capacity at 42.47% of design capacity following the raid."},
  {id:21,date:"Jul 13",targetName:"Salavat Oil Refinery (Bashkortostan) + Azov Naval Strike",region:"Bashkortostan, Russia (1,400km) / Sea of Azov",distance:1400,category:"Energy/Naval",icon:"🎯",severity:"critical",result:"One of the deepest strikes of the war: Ukraine hit the Salavat oil refinery in Bashkortostan, ~1,400km from the border — Bashkortostan's governor confirmed an industrial-area strike without specifying the target. Same night, Ukraine's navy struck 4 shadow-fleet tankers and a patrol boat in the Sea of Azov; Zelensky separately said Ukraine had hit 105 Russian vessels in the Azov since Jul 6 — the logistics-lockdown campaign's cumulative naval toll now in triple digits."},
  {id:20,date:"Jul 14",targetName:"Azov: Oil Refinery + 10 Tankers + 4 Ferries",region:"Sea of Azov / S. Russia",distance:400,category:"Naval",icon:"🚢",severity:"critical",result:"Third multi-vessel Azov operation in four days (after 21 vessels Jul 11 and 15 vessels Jul 13): a Russian oil refinery, 10 tankers and 4 ferries struck per the General Staff. The ferry component matters — ferries are the Kerch Bridge's backup crossing capacity, so hitting them tightens the same logistics noose.",_promoted:true},
  {id:19,date:"Jul 13",targetName:"Sea of Azov Shadow Fleet — 15 Vessels",region:"Sea of Azov",distance:400,category:"Naval",icon:"🚢",severity:"critical",result:"7 oil tankers, 5 cargo ships, a ferry and 2 tugboats hit in a single operation, alongside occupied-territory energy infrastructure and air defense systems. ATESH partisans report the campaign has forced Russian commanders to ration fuel for mobile fire groups and air defense units in Kherson and Crimea — the isolation campaign is now measurably degrading Russian operations, not just shipping."},
  {id:18,date:"Jul 11",targetName:"Sea of Azov — 21 Tankers + Support Vessels",region:"Sea of Azov / Rostov Oblast",distance:400,category:"Naval",icon:"🚢",severity:"critical",result:"Ukraine's largest single-night strike on the Azov shadow fleet: 21 oil/petroleum tankers plus 4 tugboats, 2 cargo ships and a dredger damaged. Russia suspended navigation on the Azov-Don Canal in response. The campaign has now shifted from refineries to the export and resupply chain feeding occupied Crimea.",_promoted:true},
  {id:17,date:"Jul 9",targetName:"Tver & Stavropol Oil Depots + Azov Tankers",region:"Tver/Stavropol/Rostov, Russia",distance:800,category:"Energy",icon:"🛢️",severity:"critical",result:"Fuel-chain day 500+km deep: SBU drones fired two oil depots (Tver, confirmed by the acting governor; Stavropol's Vyazniki reservoirs with apartment evacuations) while naval drones set two more tankers ablaze in the Sea of Azov. Russia's cumulative response measures — a diesel-export ban and Putin's call for Crimea fuel subsidies — mark the campaign's shift from attrition to economic coercion."},
  {id:16,date:"Jul 6",targetName:"Omsk Oil Refinery (ELOU-AVT-11 unit)",region:"Omsk Oblast, Russia",distance:2500,category:"Energy",icon:"🛢️",severity:"critical",result:"The deepest strike of the war: upgraded FP-1 drones flew roughly 3,000km to hit Russia's largest refinery for the first time — 10% of national refining capacity, and the last of Russia's 11 biggest gasoline producers to be successfully targeted. Satellite imagery confirmed 4 impacts on the ELOU-AVT-11 unit; the refinery suspended operations within 24 hours."},
];
const CASUALTIES=[{date:"Jun 18",value:1370},{date:"Jun 19",value:1240},{date:"Jun 20",value:1290},{date:"Jun 21",value:1290},{date:"Jun 22",value:1390},{date:"Jun 23",value:1260},{date:"Jun 24",value:1270},{date:"Jun 25",value:1310},{date:"Jun 26",value:1350},{date:"Jun 27",value:1250},{date:"Jun 28",value:1230},{date:"Jun 29",value:1350},{date:"Jun 30",value:1210},{date:"Jul 1",value:1140},{date:"Jul 2",value:1250},{date:"Jul 3",value:1190},{date:"Jul 4",value:1290},{date:"Jul 5",value:1420},{date:"Jul 6",value:1200},{date:"Jul 7",value:1260},{date:"Jul 8",value:1310},{date:"Jul 9",value:1460},{date:"Jul 10",value:1490},{date:"Jul 11",value:1320},{date:"Jul 12",value:1600},{date:"Jul 13",value:1120},{date:"Jul 14",value:1470},{date:"Jul 15",value:1340},{date:"Jul 16",value:1370},{date:"Jul 17",value:1420},{date:"Jul 18",value:1520},{date:"Jul 19",value:1600},{date:"Jul 20",value:1370}];
const EVENTS={ukraine:[{id:1,date:"Jan 6, 2026",label:"Coalition of Willing — Paris",note:"35 nations at Elysée Palace. UK + France pledge troops post-ceasefire.",color:"#22c55e",isUpcoming:false},{id:2,date:"Feb 17, 2026",label:"Geneva trilateral talks",note:"Military track: constructive. Political track: stuck.",color:"#f97316",isUpcoming:false},{id:3,date:"May 9, 2026",label:"Trump 3-day ceasefire",note:"Expired. Full-scale combat resumed immediately.",color:"#f97316",isUpcoming:false},{id:4,date:"Jun 7, 2026",label:"Putin refuses direct talks",note:"Declines Zelensky face-to-face proposal.",color:"#ef4444",isUpcoming:false},{id:5,date:"Jun 23, 2026",label:"Rail bridge to Crimea destroyed",note:"Last intact rail link from north severed.",color:"#ef4444",isUpcoming:false},{id:6,date:"Jun 25, 2026",label:"Belarus halts Shahed relay",note:"Partial compliance with Ukraine ultimatum.",color:"#22c55e",isUpcoming:false},{id:7,date:"Jun 27, 2026",label:"Putin-Lukashenko Valdai summit",note:"2-day secret talks at Putin's private residence. WSJ: Russia pressuring Belarus to open second front. No communiqué issued.",color:"#ef4444",isUpcoming:false},{id:8,date:"Jun 27, 2026",label:"Serbia's Vucic announces resignation",note:"Snap elections coming. Pro-Russia Balkan president destabilised. Serbia has warm ties with Moscow — election outcome uncertain.",color:"#f59e0b",isUpcoming:false},{id:10,date:"Jun 16-17, 2026",label:"Russia rejects Turkish ceasefire proposal",note:"Fidan proposed ceasefire in Moscow — Russia rejected, remained firm on Donbas demands. Turkey had hoped to bring both sides to NATO Ankara. Diplomatic track blocked.",color:"#ef4444",isUpcoming:false},{id:11,date:"Jun 28, 2026",label:"Putin United Russia congress — rejects diplomacy",note:"First public admission of fuel shortages. ISW: 'rejected diplomatic solutions.' United Russia formally claimed as Putin's party. Duma elections Sept 2026.",color:"#ef4444",isUpcoming:false},{id:9,date:"Jul 7, 2026",label:"NATO Ankara Summit",note:"Potential ceasefire deadline. Security guarantees on agenda. Slovakia refuses aid pledge. Turkey jet engine deal confirmed.",color:"#5b8ec8",isUpcoming:true}],iran:[{id:10,date:"Feb 28, 2026",label:"Operation Epic Fury",note:"US-led strikes on Iranian nuclear facilities begin.",color:"#ef4444",isUpcoming:false},{id:11,date:"Jun 14, 2026",label:"Hormuz blockade lifted",note:"US lifts naval blockade; tanker traffic resumes.",color:"#22c55e",isUpcoming:false},{id:12,date:"Jun 17, 2026",label:"Islamabad MoU signed",note:"60-day nuclear negotiation window opens.",color:"#8b5cf6",isUpcoming:false}],taiwan:[{id:13,date:"Oct 1, 2025",label:"PLA median line crossings surge",note:"PLA aircraft and vessels crossing Taiwan Strait median line at record frequency — 200+ crossings in 2025.",color:"#eab308",isUpcoming:false},{id:14,date:"Feb 15, 2026",label:"Joint combat readiness patrol",note:"PLA Eastern Theater launched largest joint patrol exercise since 2023.",color:"#ef4444",isUpcoming:false},{id:15,date:"Jun 1, 2026",label:"CCG patrols east of Taiwan",note:"Japan-Philippines EEZ talks trigger PRC response beyond China own 10-dash line.",color:"#eab308",isUpcoming:false},{id:16,date:"Jun 18, 2026",label:"Taiwan defense budget raised",note:"Taiwan Legislature approved $19.7B defense budget — largest in history.",color:"#22c55e",isUpcoming:false}],"south-china-sea":[{id:17,date:"Jul 12, 2016",label:"UNCLOS Tribunal ruling",note:"PCA ruled China Nine-Dash Line has no legal basis. China rejected ruling as null and void.",color:"#22c55e",isUpcoming:false},{id:18,date:"Feb 1, 2021",label:"China Coast Guard Law enacted",note:"Authorizes CCG to use all necessary means including weapons against foreign vessels in claimed waters.",color:"#ef4444",isUpcoming:false},{id:19,date:"Mar 1, 2026",label:"EDCA sites expansion completed",note:"Philippines and US complete expansion to 9 EDCA military access sites.",color:"#5b8ec8",isUpcoming:false},{id:20,date:"Jun 3, 2026",label:"220 militia vessels — Whitsun Reef",note:"Largest maritime militia presence recorded at Whitsun Reef.",color:"#ef4444",isUpcoming:false},{id:21,date:"Jun 10, 2026",label:"Laser incident — Philippine helicopter",note:"Chinese vessel directed military-grade laser at PCG helicopter; pilot temporarily blinded.",color:"#ef4444",isUpcoming:false},{id:22,date:"Jun 24, 2026",label:"Water cannon attack — BRP Kalayaan",note:"CCG fired water cannons 18 minutes at Philippine supply boat. 2 sailors injured.",color:"#ef4444",isUpcoming:false}],gaza:[{id:23,date:"Oct 10, 2025",label:"Ceasefire begins",note:"Fragile ceasefire following intensive international pressure. Hamas not disarming.",color:"#22c55e",isUpcoming:false},{id:24,date:"Jan 15, 2026",label:"1,000+ killed post-ceasefire",note:"UN: more than 1,000 Palestinians killed since the Oct 2025 ceasefire.",color:"#ef4444",isUpcoming:false},{id:25,date:"May 10, 2026",label:"ICJ orders aid corridor",note:"International Court of Justice orders Israel to open aid corridors. Only partial compliance.",color:"#f59e0b",isUpcoming:false},{id:26,date:"Jun 20, 2026",label:"UN flash appeal 13% funded",note:"$4B+ Gaza reconstruction appeal only 13% funded. Hospital system collapsed.",color:"#ef4444",isUpcoming:false},{id:52,date:"Jul 17, 2026",label:"Heaviest fire since ceasefire",note:"14+ killed in a single day including a funeral-procession strike; post-ceasefire toll passes 1,123. IDF cites control of ~65% of Gaza.",color:"#ef4444",isUpcoming:false}],venezuela:[{id:34,date:"Aug 2025",label:"Operation Southern Spear begins",note:"US Navy begins deploying warships and personnel to the Caribbean, citing the need to combat drug trafficking.",color:"#f97316",isUpcoming:false},{id:35,date:"Sep 2, 2025",label:"First lethal boat strike",note:"US strikes a vessel from Venezuela, killing all 11 aboard. Trump releases video; administration says operation will continue.",color:"#ef4444",isUpcoming:false},{id:36,date:"Nov 2025",label:"Secret Maduro-Trump contacts",note:"NYT reports Trump and Rubio spoke with Maduro by phone; a potential leaders' meeting reportedly discussed.",color:"#eab308",isUpcoming:false},{id:37,date:"Dec 2025",label:"Oil tanker seizures begin",note:"US seizures expand to sanctioned Venezuelan oil tankers as part of mounting pressure campaign.",color:"#f97316",isUpcoming:false},{id:38,date:"Jan 3, 2026",label:"Maduro captured — Operation Absolute Resolve",note:"~200 US special operations forces and 150 aircraft from 20 bases strike Caracas; Maduro and wife Cilia Flores captured and flown to New York to face narcoterrorism charges. Lasted ~2hrs 20min.",color:"#dc2626",isUpcoming:false},{id:39,date:"Jan 5, 2026",label:"Colombia's Petro threatens response",note:"Petro warns he would 'take up arms' if similar intervention occurred in Colombia. Thousands protest in Cúcuta near Venezuelan border.",color:"#f97316",isUpcoming:false},{id:40,date:"Jan 2026",label:"Rubio signals Cuba could be next",note:"Secretary of State Rubio: 'Cuban leaders should be concerned' — cites deep Cuban security/intelligence presence inside Venezuela's former government.",color:"#eab308",isUpcoming:false},{id:41,date:"Mar 6, 2026",label:"Strikes expand into Ecuador",note:"US strikes a target on the Colombia-Ecuador border, initially described as a FARC dissident compound; NYT later reports it was a dairy farm.",color:"#ef4444",isUpcoming:false},{id:42,date:"Jun 12, 2026",label:"Tren de Aragua leader killed",note:"US airstrike, conducted in coordination with Venezuelan authorities, kills Héctor 'Niño Guerrero' Guerrero Flores, leader of Tren de Aragua.",color:"#dc2626",isUpcoming:false},{id:43,date:"Jun 21, 2026",label:"221+ killed in boat strikes to date",note:"Wikipedia/AS-COA tracker: at least 221 people killed (17 missing presumed dead) across 64+ strikes on 65 vessels since Sept 2025 — UN data disputes the administration's underlying drug-trafficking-route claims.",color:"#ef4444",isUpcoming:false},{id:44,date:"Jan 29, 2026",label:"Executive Order 14380 — Cuba oil blockade",note:"Trump declares national emergency, authorizes tariffs on any country supplying oil to Cuba. NYT: first effective US blockade of Cuba since the 1962 Missile Crisis.",color:"#dc2626",isUpcoming:false},{id:45,date:"Dec 2025",label:"Venezuelan oil to Cuba cut off",note:"As part of the Venezuela intervention buildup, the US seizes tankers carrying Venezuelan oil bound for Cuba and declares a blockade on those exports — Cuba's main fuel lifeline severed a month before the broader blockade EO.",color:"#f97316",isUpcoming:false},{id:46,date:"Mar 13, 2026",label:"Díaz-Canel confirms talks with US",note:"Cuban First Secretary publicly confirms diplomatic talks aimed at addressing the oil/energy blockade. Cuba releases 51 political prisoners as part of the opening; 2,000+ more released by Apr 3.",color:"#eab308",isUpcoming:false},{id:47,date:"Mar 30, 2026",label:"Russian oil tanker defies blockade",note:"100,000-tonne Russian crude shipment arrives in Havana — described by CSIS as calculated blockade-running timed to avoid a showdown while the Iran war was still active. A reported second shipment later turned back.",color:"#f97316",isUpcoming:false},{id:48,date:"May 14, 2026",label:"Cuba: out of oil and diesel",note:"Cuban Ministry of Energy and Mines warns the country has run out of oil and diesel entirely.",color:"#ef4444",isUpcoming:false},{id:49,date:"May 21, 2026",label:"Raúl Castro indicted",note:"US indicts former Cuban leader (believed by some critics to still govern as an éminence grise) over the 1996 Brothers to the Rescue shootdown — a move analysts compare to the pre-capture indictment pattern used against Maduro.",color:"#dc2626",isUpcoming:false},{id:50,date:"Jun 2026",label:"OHCHR documents humanitarian collapse",note:"Infant mortality risen to 9.9/1,000 births, childhood cancer survival down to 65%, food production down 60%, medicine supplies at only 30% of normal levels — UN attributes the deterioration to the blockade.",color:"#dc2626",isUpcoming:false},{id:51,date:"Jul 8, 2026",label:"Cuba takes blockade to UN General Assembly",note:"FM Rodríguez: record $8B in damage Mar 2025–Feb 2026 (+7% YoY), excluding the fuel blockade's impact; talks with Washington have made 'no progress.' US Amb. Waltz: 'There is no American blockade.' Procedural vote passed 136-9-30 — but Germany and Canada abstained, signaling erosion of Cuba's traditional UN support under US lobbying.",color:"#f97316",isUpcoming:false}]};
const BRIEFING={summary:"Ukraine pushed total Russian losses to 1,431,900 (Jul 21 MoD report, +1,370 on the day) — Russian UAV losses now past 420,000 (420,290). The deadliest single incident of the week came in the Black Sea: a Russian missile strike sank/set ablaze the grain ship Golden Leo off Odesa late Jul 19, killing 10 (9 crew plus a Ukrainian maritime pilot) — Odesa's governor says Russian strikes have now killed 28 people in the region this month alone. Russia also struck Kyiv and the Kharkiv outskirts overnight Jul 19-20, killing at least 4 and injuring 20+; the Kyiv strike destroyed the UKRTAC plant and warehouses and damaged residential buildings, while 16 were injured in Kharkiv region. Ukraine answered with strikes on Russian oil depots (three hit deep inside Russia), a Buk air defense system, a logistics bridge, and vessels in the Black/Azov seas, plus an SBU strike on the sanctioned shadow-fleet tanker Avero and a 400+-drone barrage on Moscow region overnight — on top of the Moscow-region strikes (Noginsk, Elektrostal, Wildberries) two days earlier. Moscow's fuel crisis (diesel exports banned, Putin requesting Crimea subsidies) keeps deepening as a result. The Jul 18-19 barrage on Kyiv (41 missiles incl. 25 ballistic, 125 drones, 1 killed/16 wounded) remains the week's largest single attack, though NATO's Ankara pledges ($80B for 2026, a Patriot manufacturing license) stay months from real production, and the same week saw Zelensky dismiss popular Defense Minister Fedorov after just six months, sparking real protests in Kyiv, while Serhii Koretsky was already approved by parliament as the new PM. That political turmoil escalated further Jul 20: reports spread that Commander-in-Chief Gen. Syrskyi had been dismissed, sourced to figures close to Zelensky's office; the General Staff officially denied it hours later, but the episode landed on a second consecutive day of Kyiv protests demanding both Fedorov's reinstatement and Syrskyi's resignation. The bigger story of the week is Iran, which has sharply escalated into a ninth night of US strikes: Iranian attacks on US forces in Jordan killed 3 American service members (initially reported as 2 killed/1 missing, confirmed Jul 19) — the first US combat fatalities of the conflict since March; strikes have now hit Abadan and Tabriz alongside the established target list, the widest single-night geographic spread yet; the Houthis announced their own maritime embargo in solidarity with Iran; Hormuz daily crossings have collapsed to ~9 vessels versus a ~130/day pre-war average; and Brent crude has surged to ~$91/bbl. Kuwait's main desalination plant was hit for a second time, leaving 10,000 without water, and Iran's health ministry says at least 50 have been killed and 500+ injured domestically since Jul 6. Iran's negotiators now call the MoU 'effectively suspended' over US violations, and Trump is reportedly weighing strikes on civilian infrastructure and energy targets. The Aug 16 MoU deadline (26 days out) reads now as a formality already overtaken by events on the ground. Elsewhere: Gaza saw its heaviest stretch of Israeli fire since the October 2025 ceasefire — a funeral-procession strike killed 7-8 on Jul 17, and further strikes on two Gaza City neighborhoods killed at least 8 more on Jul 18 — with post-ceasefire deaths now past 1,144 and rising, the Board of Peace/NCAG governance transition still without real authority on the ground, and government ministers joining thousands of settler activists who breached four IDF checkpoints toward Gaza on Jul 19 calling for renewed settlements; Mexico's cartel-FTO campaign and Haiti's Aug 30 elections round out an increasingly active Western Hemisphere file.",signals:[{theater:"Ukraine",text:"Russian missile strike sinks the grain ship Golden Leo near Odesa, killing 10 (9 crew + a Ukrainian pilot) — the deadliest Black Sea attack in weeks; Odesa region's July death toll from Russian strikes now at 28"},{theater:"Ukraine",text:"Russia struck Kyiv and Kharkiv's outskirts overnight Jul 19-20 (4+ killed, 20+ injured, UKRTAC plant destroyed); Ukraine answered with strikes on 3 Russian oil depots, a Buk air defense system, Black/Azov Sea vessels, and 400+ drones at Moscow region"},{theater:"Ukraine",text:"Rumors that Commander-in-Chief Syrskyi was dismissed swept Kyiv Jul 20; General Staff officially denied it hours later, but protests demanding both Fedorov's reinstatement and Syrskyi's resignation entered a second day"},{theater:"Iran",text:"US confirms 3 troops killed in the Jordan attack (not 2+1 missing); ninth straight night of strikes now hits Abadan and Tabriz, the widest geographic spread yet"},{theater:"Iran",text:"Houthis announce their own maritime embargo in solidarity with Iran; Hormuz daily crossings collapse to ~9 vs a ~130/day pre-war average; Brent surges to ~$91/bbl"},{theater:"Gaza",text:"Heaviest stretch of Israeli fire since the Oct 2025 ceasefire — a funeral-procession strike killed 7-8 Jul 17, two more neighborhoods hit Jul 18 killing 8+; post-ceasefire toll now past 1,144 and rising"},{theater:"Americas",text:"Venezuela's earthquake toll has climbed past 4,490 dead as USS San Antonio takes over reconstruction of La Guaira port; Cuba's grid has failed island-wide twice in a week under the fuel blockade (~10M affected each time), while Mexico's cartel-FTO campaign and Haiti's Aug 30 elections keep the wider region active"}],watch:"Whether the confirmed US deaths push Washington toward the civilian-infrastructure/energy strikes Trump is reportedly weighing, and whether Israel is drawn in directly after its officials' warnings to Iran; whether the Houthis' embargo actually disrupts Red Sea shipping or stays rhetorical; whether Iran's MoU suspension becomes a formal withdrawal before Aug 16; whether the nightly pace of Russian strikes on Kyiv and the Black Sea keeps climbing now that Ukraine's PAC-3 stocks are already strained by the parallel Iran war.",generatedAt:new Date().toISOString()};
const UKRAINE_BRIEFING={summary:"Russia's attrition math has become unsustainable even as its ground offensive grinds on. CSIS's July 1 assessment puts the Russia:Ukraine battlefield loss ratio at nearly 8:1 in H1 2026 — up from 2:1-3:1 for most of the war — credited largely to Ukraine's AI-enabled drone interdiction campaign. The MoD's Jul 21 report puts cumulative Russian losses at 1,431,900 (+1,370 on the day), with daily losses still running above 1,000 most days. That said, the war is not simply going well for Ukraine: Russia's stalled offensive still holds Pokrovsk at genuine encirclement risk, Kyiv and Kharkiv's outskirts took fresh strikes overnight Jul 19-20 (4+ killed, 20+ injured) days after one of the largest ballistic barrages of the war hit Kyiv Jul 18-19, unconfirmed rumors of Commander-in-Chief Syrskyi's dismissal swept Kyiv Jul 20 before being officially denied, and the Patriot/PAC-3 shortage — worsened by the 2026 Iran war draining US stocks — remains the one gap Ukraine cannot close on its own.",assessment:[{cat:"Attrition",text:"~8:1 RU:UA loss ratio in H1 2026 (CSIS). Cumulative Russian losses reached 1,431,900 as of the Jul 21 MoD report (+1,370 on the day); artillery again ran high (+92 to 46,435) and Russian UAV losses passed 420,000 (420,290). The naval/deep-strike campaign keeps compounding and widening: strikes landed inside Moscow region itself Jul 18 (Noginsk oil depot, an Unmanned Systems Forces warehouse in Elektrostal, a Wildberries logistics fire), and overnight Jul 19-20 Ukraine hit 3 more Russian oil depots plus a Buk air defense system, a logistics bridge, Black/Azov Sea vessels, and the shadow-fleet tanker Avero — the Azov/Black Sea interdiction remains a sustained second front."},{cat:"Territory",text:"Russian advance remains grinding — Pokrovsk is now the single hottest sector on the front, 268 combat clashes recorded there Jul 8 alone, alongside Huliaipole. Monthly gain estimates diverge sharply by source: DeepState puts Russia's net gain at ~31 sq mi for Jun 9-Jul 7, ISW at just ~6 sq mi — among the slowest rates of any war in the past century either way. Russia had a net territorial LOSS in Apr-May 2026 (~400 km²), its first monthly net loss since Aug 2024."},{cat:"Deep Strikes",text:"The campaign has escalated into economic coercion and now reaches Moscow region itself. Jul 6: the deepest strike of the war — FP-1 drones flew ~3,000km to hit the Omsk refinery, Russia's largest, first-ever strike on the plant, offline within 24 hours. Jul 13: a strike hit the Salavat refinery in Bashkortostan, 1,400km inside Russia. Jul 16: a re-strike on the Slavneft-YANOS refinery in Yaroslavl and confirmation the Jul 14-15 Engels-2 airbase strike tore the tail off a Tu-95 bomber. Jul 18: strikes for the first time landed inside Moscow region proper — an oil depot in Noginsk, a Center of Unmanned Systems Forces warehouse destroyed in Elektrostal, and a fire at a major Wildberries logistics hub — as Moscow's mayor reported 1,892 Ukrainian drones detected heading toward the region in the preceding week alone. Jul 19-20: three more Russian oil depots hit overnight, plus a Buk air defense system, a logistics bridge, and Black/Azov Sea vessels. The cumulative effect is a nationwide Russian fuel crisis, with Moscow banning diesel exports and Putin publicly requesting Crimea fuel subsidies."},{cat:"Air Defense",text:"The decisive materiel question of the war may have just moved again. Russia fired 41 missiles (25 ballistic) and 125 drones at Kyiv overnight Jul 18-19 — one of the largest ballistic barrages of the war — with 18 missiles and 108 drones intercepted/suppressed, 1 killed and 16 wounded. That follows a mixed week: 5 of 8 ballistic missiles downed Jul 13-14 (likely Patriot), but only 1 of 8 missiles downed the night of Jul 16-17. At Ankara on Jul 8 Trump licensed Ukraine to manufacture Patriots itself; Zelensky said Jul 9 the licence is agreed politically with supplies due within days, but officials put real domestic production months-to-years out. Poland will co-produce and maintain PAC-3s under a new multilateral agreement and is transferring 5 missiles now; Ukraine's domestic 'Freyja' interceptor may draw eight European partners. Drone-side economics still favor Ukraine ($7.5k interceptor vs $35k Shahed)."},{cat:"Diplomacy",text:"Ankara concluded: $80B allied pledge for 2026, Patriot manufacturing license, and a notably warm Trump-Zelensky bilateral — Trump said Zelensky has 'done an amazing job.' Russia had already rejected the Turkish ceasefire push, so the negotiating track itself remains blocked. Czech President Pavel: Ukraine has roughly two months to resume talks before the window narrows."},{cat:"Political",text:"The Fedorov dismissal keeps rippling. Kyiv protests demanding both his reinstatement and Commander-in-Chief Syrskyi's resignation entered a second day Jul 20, the same day unconfirmed reports — sourced to figures close to Zelensky's office and MP Yaroslav Zheleznyak — claimed Syrskyi had already been removed. The General Staff officially denied it within hours, stating dismissal requires a presidential decree that had not been issued; Syrskyi has publicly said he's 'ready to work with any defense minister' since he's 'at war with Russia, not the ministry.' Real or not, the episode shows how exposed the wartime cabinet's standing has become just five days after Fedorov's removal."}],watch:"Two variables now: whether Pokrovsk holds — still the most consequential sector against an otherwise favorable attrition/territorial picture — and whether the string of strikes on Kyiv and Kharkiv since Jul 18 signals a renewed heavy-missile campaign that a strained Patriot/PAC-3 stockpile (drained further by the Iran war) can't keep pace with.",generatedAt:new Date().toISOString()};
const TICKER_ITEMS=NEWS.map(n=>({tag:n.severity==="critical"?"Breaking":n.conflict,color:n.severity==="critical"?"#ef4444":n.conflictColor,text:n.headline}));
const DEADLINES=[{date:"Resolved",target:new Date("2026-06-22T00:00:00Z"),label:"Belarus Ultimatum — Elapsed",icon:"🇧🇾",color:"#22c55e",desc:"Window closed Jun 22 with partial compliance (relay shutdown). No further Ukrainian strikes on Belarusian territory followed — treated as a closed case pending any reversal."},{date:"Jul 7–8",target:new Date("2026-07-07T09:00:00Z"),label:"NATO Ankara Summit",icon:"🤝",color:"#5b8ec8",desc:"CONCLUDED. Allies pledged $80B (~€70B) for Ukraine in 2026 and reaffirmed Article 5; Trump gave an apparent green light for Europe/Ukraine to produce Patriot missiles under license — no firm dates yet. Zelensky met Trump and Syria's al-Sharaa on the sidelines. Russia's Turkish ceasefire push was rejected before the summit began."},{date:"~Aug 16",target:new Date("2026-08-16T00:00:00Z"),label:"Iran Nuclear Deadline",icon:"☢️",color:"#8b5cf6",desc:"60-day MoU window closes. Trump: could relaunch attacks if talks fail."}];
const GLOBAL_TOLL={deaths:"~850K+",displaced:"~29M+",note:"Approximate aggregate across all 8 tracked conflicts. Heterogeneous sourcing and methodology per theater — see individual theater pages for ranges and citations. Not an official or precise figure."};
const ENERGY_DISRUPTIONS=[
  {icon:"🛢️",label:"Russian refining capacity",text:"~40% offline from Ukraine's deep-strike campaign on refineries. Russia importing gasoline from Asia by sea for the first time in decades (Reuters, Jun 17).",color:"#ef4444"},
  {icon:"🚢",label:"Strait of Hormuz",text:"Traffic recovering under the Jun 29 stand-down — 35+ commercial vessels transited in 24 hours (Jul 1, MarineTraffic). Iran's transit-toll demand is unresolved; a Doha-agreed violation-notification channel now exists to contain the next incident.",color:"#8b5cf6"},
  {icon:"⛽",label:"Cuba oil blockade",text:"US blockade since Jan 2026 has left Cuba without domestic oil or diesel reserves (May 14 Cuban government statement) — the most severe ongoing fuel crisis in the dataset.",color:"#dc2626"},
  {icon:"🇻🇪",label:"Venezuela export disruption",text:"Venezuelan oil exports to Cuba cut off Dec 2025 as part of the pre-Maduro-capture pressure campaign — the proximate trigger for Cuba's blockade-driven shortage.",color:"#f97316"},
  {icon:"⚓",label:"US sanctions on Russian seaborne oil",text:"Reimposed Jun 28 after temporary waivers expired — tightens economic pressure on Russia alongside the refinery damage.",color:"#22c55e"},
];
const POLITICAL_CALENDAR=[
  {date:"Jul 7-8, 2026",label:"NATO Ankara Summit — CONCLUDED",note:"$80B allied pledge for 2026; Patriot manufacturing license for Ukraine agreed at political level; Article 5 reaffirmed. Russia had rejected Turkey's ceasefire push — negotiating track remains blocked. See Ukraine → NATO tab.",color:"#22c55e"},
  {date:"~Aug 16, 2026",label:"Iran MoU 60-day deadline",note:"Window for a final nuclear deal closes. Trump has said he could relaunch strikes if talks fail.",color:"#8b5cf6"},
  {date:"Sept 2026",label:"Russia Duma elections",note:"United Russia formally claimed as Putin's party for the first time since 2007; top candidates are long-standing loyalists.",color:"#ef4444"},
  {date:"TBD 2026",label:"Serbia snap elections",note:"Vucic resigned amid sustained student-led protests; snap elections now pending. A pro-Russia Balkan anchor is in flux ahead of the vote — outcome could shift Serbia's alignment.",color:"#f59e0b"},
  {date:"TBD",label:"Venezuela political transition",note:"Rodríguez's 180-day interim mandate expired Jul 3, now complicated by Jun 24 earthquake recovery. Machado, widely seen as the 2024 election's actual winner, wants to return but the US has discouraged it.",color:"#dc2626"},
];
const CYBER_HYBRID=[
  {icon:"🛰️",label:"GPS jamming over Venezuela",text:"Bloomberg reported extensive GPS jamming in Venezuelan airspace in the weeks before Maduro's capture — source unconfirmed, consistent with both Venezuelan defensive countermeasures and US operational prep.",color:"#dc2626"},
  {icon:"🗣️",label:"Kremlin cognitive warfare re: Belarus",text:"ISW (Jun 23-24): Kremlin running an information campaign to frame any Ukrainian strikes on legitimate Belarusian military targets (e.g. Shahed relay stations) as unprovoked escalation against the Union State.",color:"#ef4444"},
  {icon:"🎣",label:"China maritime grey-zone tactics",text:"Maritime militia swarms (220+ vessels at Whitsun Reef) and water-cannon incidents function as deniable coercion below the threshold of armed conflict — full detail in S. China Sea & Taiwan → Incidents tab.",color:"#f97316"},
  {icon:"📡",label:"Disputed narrative: Iran drone attribution",text:"The Jun 26 Hormuz drone-attack claim that triggered US retaliatory strikes has not been independently verified — illustrates the attribution problem common to hybrid/grey-zone incidents.",color:"#8b5cf6"},
];
const LEGAL_TRACKER=[
  {icon:"⚖️",label:"ICC arrest warrants — Netanyahu & Gallant",theater:"Gaza",text:"Issued Nov 2024 for war crimes and crimes against humanity. Enforcement limited — Netanyahu has avoided ICC member states.",color:"#f59e0b"},
  {icon:"🏛️",label:"ICJ genocide case — South Africa v. Israel",theater:"Gaza",text:"Ongoing at the International Court of Justice; provisional measures issued requiring Israel to prevent genocidal acts. Israel contests the characterization.",color:"#f59e0b"},
  {icon:"🔴",label:"Raúl Castro indictment",theater:"Caribbean",text:"Indicted May 21, 2026 over the 1996 Brothers to the Rescue shootdown — a pattern analysts compare to the pre-capture indictment used against Maduro.",color:"#dc2626"},
  {icon:"⚓",label:"Maduro & Flores narcoterrorism trial",theater:"Caribbean",text:"Captured Jan 3, 2026 and flown to New York to face narcoterrorism charges — trial ongoing.",color:"#dc2626"},
  {icon:"🇺🇸",label:"Congressional war-crimes investigations",theater:"Caribbean",text:"Bipartisan House and Senate Armed Services investigations open into Operation Southern Spear boat strikes, including the alleged 'double-tap strike' on disabled vessels.",color:"#f97316"},
];
const SANCTIONS_TRACKER=[
  {icon:"🛢️",label:"EU oil price cap frozen at $44.10",theater:"Russia",text:"EU proposed freezing the cap rather than letting it auto-rise toward ~$70/barrel by Jul 15 under the dynamic formula — Brussels coordinating with G7 to delay the increase to Jan 2027, wary of handing Moscow a revenue windfall from Iran-war-driven prices.",color:"#5b8ec8"},
  {icon:"🚢",label:"632 shadow-fleet vessels banned",theater:"Russia",text:"EU's 20th sanctions package (Apr 2026) brought the sanctioned-tanker list to 632, plus a first-ever third-country port listing (Indonesia) for price-cap circumvention. Enforcement gaps remain — Urals crude traded ~$74-82/barrel in May, still far above the $44.10 cap.",color:"#5b8ec8"},
  {icon:"📜",label:"Putin extends counter-sanctions to 2027",theater:"Russia",text:"Jun 26: Putin extended Russia's retaliatory ban on selling oil to any buyer using the G7/EU price-cap mechanism through end-2027 — signaling Moscow expects the sanctions standoff to persist for years, not months.",color:"#ef4444"},
  {icon:"🏦",label:"$6B of Iran's frozen assets releasing",theater:"Iran",text:"Implementation of the Jun 17 MoU's Clause 11 continues: $6B of $12B in Qatar-frozen Iranian funds moving toward release as part of the sanctions-relief track, even as the broader nuclear inspection regime remains stalled.",color:"#8b5cf6"},
  {icon:"🏛️",label:"Congress split on new Russia sanctions",theater:"Russia",text:"The Ukraine Support Act (mandatory sanctions on Russian banks, oil firms, tankers) passed the House 226-195 (Jun 4) but faces a likely Trump veto over its lack of presidential waiver flexibility — stalled in the Senate.",color:"#eab308"},
];


// ── Primitives ──────────────────────────────────────────────────────────────────
const Pill=({label,color})=><span style={{background:color+"22",border:`1px solid ${color}55`,borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:700,color,letterSpacing:".04em",textTransform:"uppercase",flexShrink:0,whiteSpace:"nowrap"}}>{label}</span>;
const Card=({t,children,style,onClick})=><div onClick={onClick} style={{background:t.isDark?"linear-gradient(180deg,rgba(120,160,220,.10),rgba(255,255,255,0) 45%),"+t.card:"linear-gradient(180deg,rgba(255,255,255,.35),rgba(255,255,255,0) 22%),"+t.card,borderRadius:12,marginBottom:10,border:`1px solid ${t.border}`,borderTop:t.isDark?"1px solid rgba(255,255,255,.16)":`1px solid rgba(255,255,255,.7)`,overflow:"hidden",boxShadow:t.isDark?"0 6px 20px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.08)":"0 4px 14px rgba(59,130,246,.16),inset 0 1px 0 rgba(255,255,255,.6)",...style}}>{children}</div>;
const ST=({t,children,color})=><h2 style={{fontSize:11,fontWeight:700,color:color??t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:8,marginTop:18,paddingLeft:9,borderLeft:`3px solid ${color??(t.isDark?"#5b8ec8":"#3a4a5c")}`,lineHeight:1.3}}>{children}</h2>;
const Row=({t,children,last})=><div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px",borderBottom:last?0:`.5px solid ${t.sep}`}}>{children}</div>;
const Hero=({t,children,style})=><div style={{background:"linear-gradient(135deg,#091220 0%,#0e1d32 100%)",borderRadius:14,padding:"16px 16px 14px",marginBottom:12,border:"1px solid rgba(59,130,246,0.2)",color:"#fff",...style}}>{children}</div>;
const Grid2=({t,items})=><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>{items.map((item,i)=><div key={i} style={{background:t.isDark?"rgba(255,255,255,0.04)":"rgba(20,40,70,0.05)",borderRadius:10,padding:"10px 12px",border:`1px solid ${item.color}22`}}>{item.icon&&<div style={{fontSize:18,marginBottom:4}}>{item.icon}</div>}<div style={{fontSize:item.vs??22,fontWeight:800,color:item.color,lineHeight:1.1,fontVariantNumeric:"tabular-nums"}}>{item.val}</div><div style={{fontSize:11,fontWeight:700,color:t.isDark?"rgba(255,255,255,.7)":t.text,marginTop:2}}>{item.label}</div>{item.sub&&<div style={{fontSize:10,color:t.isDark?"rgba(255,255,255,.4)":t.sub,marginTop:1,lineHeight:1.35}}>{item.sub}</div>}</div>)}</div>;
const Note=({t,children,color})=><div style={{background:color+"11",border:`1px solid ${color}30`,borderRadius:8,padding:"9px 12px",fontSize:11.5,color:t.sub,lineHeight:1.55,marginBottom:10}}>{children}</div>;
const Skeleton=({t,height=60})=><div style={{background:t.isDark?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)",borderRadius:10,height,marginBottom:10,animation:"shimmer 1.5s infinite"}}/>;
const TT=(props)=>{const{active,payload}=props;if(!active||!payload?.length)return null;return <div style={{background:"#0e1628",border:"1px solid rgba(59,130,246,0.3)",borderRadius:8,padding:"8px 12px",fontSize:12}}><div style={{color:"#ef4444",fontWeight:700}}>{payload[0]?.value?.toLocaleString()}</div><div style={{color:"#7a93b8",fontSize:10}}>casualties</div></div>;};
function useCountdown(target){const[text,setText]=useState("");useEffect(()=>{const tick=()=>{const ms=target.getTime()-Date.now();if(ms<=0){setText("ELAPSED");return;}const d=Math.floor(ms/86400000),h=Math.floor((ms%86400000)/3600000),m=Math.floor((ms%3600000)/60000);setText(`D-${d} · ${h}h ${m}m`);};tick();const id=setInterval(tick,60000);return()=>clearInterval(id);},[target]);return text;}

const MONTHS={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
const REPORT_NOW=new Date("2026-07-21T07:00:00Z");
function parseNewsDate(s){if(!s)return null;const m=s.match(/([A-Z][a-z]{2})\s+(\d{1,2}),\s+(\d{4})/);if(m)return new Date(Date.UTC(+m[3],MONTHS[m[1]],+m[2]));const m2=s.match(/([A-Z][a-z]{2})\s+(\d{4})/);if(m2)return new Date(Date.UTC(+m2[2],MONTHS[m2[1]],1));return null;}
function ageInfo(s){const d=parseNewsDate(s);if(!d)return null;const days=Math.floor((REPORT_NOW-d)/86400000);return{days,stale:days>=10};}
function Freshness({t,date}){const info=ageInfo(date);if(!info)return null;const label=info.days<=0?"today":info.days===1?"1d ago":`${info.days}d ago`;const color=info.stale?"#f59e0b":t.sub;return <span style={{display:"inline-flex",alignItems:"center",gap:3,fontSize:10,color,fontWeight:info.stale?700:400}}><span style={{width:5,height:5,borderRadius:"50%",background:info.stale?"#f59e0b":"#22c55e",display:"inline-block"}}/>{label}{info.stale?" · stale":""}</span>;}

// ── News Ticker ──────────────────────────────────────────────────────────────────
function NewsTicker(){const doubled=[...TICKER_ITEMS,...TICKER_ITEMS];return <div className="ticker-wrap" style={{background:"#070d1c",borderBottom:"1px solid rgba(91,142,196,0.2)",overflow:"hidden",height:34,display:"flex",alignItems:"center"}}><div className="ticker-inner" style={{display:"flex",gap:40,alignItems:"center",animation:"ticker 300s linear infinite",whiteSpace:"nowrap",willChange:"transform"}}>{doubled.map((n,i)=><span key={i} style={{fontSize:12,color:"rgba(255,255,255,.7)",display:"flex",alignItems:"center",gap:6}}><span style={{background:n.color+"30",border:`1px solid ${n.color}55`,borderRadius:20,padding:"1px 7px",fontSize:11,fontWeight:700,color:n.color}}>{n.tag}</span>{n.text}</span>)}</div></div>;}

// ── Briefing Panel ───────────────────────────────────────────────────────────────
function BriefingPanel({t}){
  const SC={Ukraine:"#5b8ec8",Gaza:"#f59e0b",Taiwan:"#eab308",Iran:"#8b5cf6",Americas:"#f97316",Global:"#22c55e"};
  const briefing=BRIEFING;

  return <div style={{background:t.isDark?"linear-gradient(135deg,#091321,#0d1f38)":"linear-gradient(135deg,#eef3fc,#e6edf9)",border:"1px solid rgba(59,130,246,0.25)",borderLeft:"4px solid #5b8ec8",borderRadius:14,padding:"14px 16px",marginBottom:16}}>
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
      <span style={{width:8,height:8,borderRadius:"50%",background:"#22c55e",display:"inline-block",flexShrink:0}}/>
      <span style={{fontSize:10,fontWeight:800,color:"#5b8ec8",textTransform:"uppercase",letterSpacing:".1em"}}>Daily Briefing</span>
      <span style={{fontSize:10,color:t.sub,marginLeft:"auto"}}>{new Date(briefing.generatedAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>{briefing.signals.map((sig,i)=>{const color=SC[sig.theater]??"#7a93b8";return <div key={i} style={{background:color+"14",border:`1px solid ${color}40`,borderRadius:10,padding:"8px 11px",fontSize:12,lineHeight:1.5}}><strong style={{color}}>{sig.theater}:</strong> <span style={{color:t.text}}>{sig.text}</span></div>;})}</div>
    <div style={{fontSize:11.5,color:"#f97316",background:"rgba(249,115,22,0.08)",border:"1px solid rgba(249,115,22,0.2)",borderRadius:8,padding:"7px 10px",lineHeight:1.5}}>⚠️ <strong>72hr Watch:</strong> {briefing.watch}</div>
    <div style={{borderTop:`1px solid ${t.border}`,marginTop:12,paddingTop:10}}>
      <div style={{fontSize:10,fontWeight:800,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6}}>📝 Full Analysis</div>
      <p style={{fontSize:12,color:t.sub,lineHeight:1.65,margin:0}}>{briefing.summary}</p>
    </div>
  </div>;
}

// ── Command Palette ──────────────────────────────────────────────────────────────
function CommandPalette({open,onClose,sections,onNavigate,t}){const[query,setQuery]=useState("");const inputRef=useRef(null);useEffect(()=>{if(open){setQuery("");setTimeout(()=>inputRef.current?.focus(),50);}},[open]);useEffect(()=>{const h=e=>{if(e.key==="Escape")onClose();};window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h);},[onClose]);const allItems=sections.flatMap(s=>s.tabs.map(tab=>({sectionId:s.id,sectionLabel:s.label,tabId:tab.id,tabLabel:tab.label})));const filtered=query?allItems.filter(i=>i.tabLabel.toLowerCase().includes(query.toLowerCase())||i.sectionLabel.toLowerCase().includes(query.toLowerCase())):allItems;if(!open)return null;return <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:1000,display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:80,backdropFilter:"blur(4px)"}}><div onClick={e=>e.stopPropagation()} style={{background:t.isDark?"#0e1628":"#fff",border:`1px solid ${t.border}`,borderRadius:16,width:"min(520px,92vw)",overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,0.5)",animation:"fadeIn 0.15s ease-out"}}><div style={{padding:"12px 14px",borderBottom:`1px solid ${t.sep}`,display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:16,opacity:0.6}}>🔍</span><input ref={inputRef} value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search sections..." style={{flex:1,background:"none",border:"none",outline:"none",color:t.text,fontSize:15,fontFamily:FONT}}/><span style={{fontSize:10,color:t.sub,background:t.isDark?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)",borderRadius:5,padding:"2px 6px"}}>ESC</span></div><div style={{maxHeight:380,overflowY:"auto"}}>{filtered.length===0&&<div style={{padding:24,textAlign:"center",color:t.sub,fontSize:13}}>No results found</div>}{filtered.map((item,i)=><button key={i} onClick={()=>{onNavigate(item.sectionId,item.tabId);onClose();}} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 14px",background:"none",border:"none",borderBottom:`.5px solid ${t.sep}`,cursor:"pointer",textAlign:"left",fontFamily:FONT}}><span style={{fontSize:16}}>{item.tabLabel.split(" ")[0]}</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:t.text}}>{item.tabLabel.replace(/^[^\s]+\s/,"")}</div><div style={{fontSize:10,color:t.sub}}>{item.sectionLabel}</div></div><span style={{fontSize:10,color:t.sub,opacity:0.6}}>↵</span></button>)}</div><div style={{padding:"6px 14px",borderTop:`1px solid ${t.sep}`,display:"flex",gap:12,fontSize:10,color:t.sub}}><span>↵ Navigate</span><span>ESC Close</span><span>⌘K Toggle</span></div></div></div>;}

// ── World Map ─────────────────────────────────────────────────────────────────────
const THEATER_COORDS={ukraine:{x:525,y:132,label:"Ukraine"},gaza:{x:518,y:162,label:"Gaza"},iran:{x:558,y:160,label:"Iran"},taiwan:{x:710,y:168,label:"Taiwan"},"south-china-sea":{x:690,y:195,label:"SCS"},venezuela:{x:330,y:200,label:"Venezuela"},caribbean:{x:318,y:178,label:"Cuba"}};
function WorldMap({t,conflicts,onSelect,selectedId}){const ocean=t.isDark?"#060d1a":"#dae4f0",land=t.isDark?"#0e1e35":"#b8cce0",border=t.isDark?"#152a46":"#8aaec8";return <div style={{background:ocean,borderRadius:14,overflow:"hidden",border:`1px solid ${t.border}`,marginBottom:16}}><div style={{padding:"8px 14px 4px",display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".08em"}}>🌍 Active Conflict Theaters</span><span style={{fontSize:10,color:t.sub,marginLeft:"auto"}}>tap pin to navigate</span></div><svg viewBox="0 0 800 380" width="100%" style={{display:"block"}}><rect width={800} height={380} fill={ocean}/><path d="M80,60 L180,50 L210,70 L220,100 L200,130 L190,160 L160,180 L130,200 L110,220 L90,240 L80,200 L70,160 L60,120 Z" fill={land} stroke={border} strokeWidth="0.5"/><path d="M155,230 L200,220 L220,240 L230,270 L220,310 L200,340 L170,350 L150,320 L140,290 L145,260 Z" fill={land} stroke={border} strokeWidth="0.5"/><path d="M425,55 L495,50 L525,70 L530,92 L510,108 L490,103 L468,114 L448,108 L438,93 L433,78 Z" fill={land} stroke={border} strokeWidth="0.5"/><path d="M450,128 L512,118 L542,134 L552,160 L547,202 L532,242 L510,272 L490,282 L465,267 L450,232 L440,192 L440,160 Z" fill={land} stroke={border} strokeWidth="0.5"/><path d="M530,58 L642,52 L722,68 L762,98 L752,142 L732,162 L700,167 L670,157 L640,162 L610,152 L580,157 L553,147 L533,132 L522,107 L518,80 Z" fill={land} stroke={border} strokeWidth="0.5"/><path d="M678,163 L732,158 L752,173 L742,200 L720,212 L700,207 L683,192 Z" fill={land} stroke={border} strokeWidth="0.5"/><path d="M690,258 L762,248 L782,268 L772,310 L742,330 L700,327 L678,307 L673,280 Z" fill={land} stroke={border} strokeWidth="0.5"/><path d="M520,38 L702,28 L782,48 L782,78 L742,88 L700,83 L650,73 L600,68 L550,63 L523,53 Z" fill={land} stroke={border} strokeWidth="0.5"/><path d="M260,110 L320,100 L360,115 L375,140 L370,165 L350,190 L355,220 L340,255 L320,290 L300,320 L285,300 L280,260 L270,220 L255,180 L245,150 L250,125 Z" fill={land} stroke={border} strokeWidth="0.5"/><path d="M200,95 L235,90 L250,105 L240,120 L210,118 L195,105 Z" fill={land} stroke={border} strokeWidth="0.5"/>{conflicts.map(c=>{const pin=THEATER_COORDS[c.id];if(!pin)return null;const isSel=selectedId===c.id,r=isSel?11:8;const isVolatile=["ESCALATING","NEW CIVIL WAR","US INTERVENTION"].includes(c.status);return <g key={c.id} style={{cursor:"pointer"}} onClick={()=>onSelect(c.id)}><circle cx={pin.x} cy={pin.y} r={r+10} fill={c.statusColor} opacity={0.07}/>{isVolatile&&<circle cx={pin.x} cy={pin.y} r={r} fill="none" stroke={c.statusColor} strokeWidth={1.5} style={{transformOrigin:`${pin.x}px ${pin.y}px`,animation:"radarPing 1.8s ease-out infinite"}}/>}{isSel&&<circle cx={pin.x} cy={pin.y} r={r+18} fill="none" stroke={c.statusColor} strokeWidth={1} opacity={0.35} strokeDasharray="4,3"/>}<circle cx={pin.x} cy={pin.y} r={r} fill={c.statusColor} opacity={isSel?1:0.88}/><text textAnchor="middle" x={pin.x} y={pin.y+4} fontSize={isSel?10:8} fill="#fff" fontWeight="bold" style={{pointerEvents:"none"}}>{c.icon}</text><text textAnchor="middle" x={pin.x} y={pin.y+r+13} fontSize={8} fill={isSel?c.statusColor:t.isDark?"rgba(255,255,255,0.7)":"rgba(0,0,0,0.6)"} fontWeight={isSel?"bold":"normal"} style={{pointerEvents:"none"}}>{pin.label}</text></g>;})}</svg></div>;}

// ── Ukraine Frontline Map SVG ─────────────────────────────────────────────────────
const SECTORS=[{name:"Kostyantynivka",icon:"🔴",status:"DISPUTED CLAIM",color:"#ef4444",detail:"Putin claimed Jul 4 that Russian forces seized Kostyantynivka — ISW found no evidence supporting the claim; as of Jul 3 there were more Ukrainian than Russian soldiers in the city. ISW assesses this as a Kremlin information operation timed for Western media coverage, not a real battlefield change."},{name:"Pokrovsk area",icon:"🔴",status:"CRITICAL",color:"#ef4444",detail:"The hottest sector on the front alongside Huliaipole — 268 combat clashes recorded across the line on Jul 8 alone, concentrated here. Russian forces conduct 70-80% of strikes with drones (BM-35, Molniya AI-loitering munitions). Context: DeepState puts Russia's net gain over Jun 9-Jul 7 at 31 sq mi; ISW at just 6 sq mi. Incremental gains, no breakthrough."},{name:"Kupyansk",icon:"🔴",status:"ACTIVE",color:"#ef4444",detail:"Russian infiltration attempts continue north and southeast of the city (Podoly, Novoosynove); Ukrainian forces counterattacked near Borivska Andriivka Jul 5. Russian milbloggers posting likely AI-altered flag-raising footage as part of a cognitive-war effort to exaggerate advances."},{name:"Zaporizhzhia",icon:"🟡",status:"MODERATE",color:"#eab308",detail:"Ukrainian forces advanced within/past Prymorske (Orikhiv area) since mid-February per Jun 29 geolocated footage. Russian forces claimed but ISW did not confirm further advances Jul 3. Molniya AI drones now used en masse — existing Ukrainian detectors reportedly ineffective against them."},{name:"Kherson",icon:"🟡",status:"MODERATE",color:"#eab308",detail:"No ground activity reported Jul 5. Ukraine continues intermediate-range strikes on Russian military/energy assets in occupied Kherson Oblast, including an ammunition depot near Preobrazhenka."},{name:"Crimea",icon:"⚡",status:"SIEGE",color:"#5b8ec8",detail:"State of emergency persists since Jun 27 — fuel and water shortages, Sevastopol power cuts, civilian exodus. Russian 810th Naval Infantry Brigade elements now running mobile fire groups against Ukrainian drones; a Russian milblogger admits refinery repairs are 'useless' against repeated strikes."}];
const SECTOR_PINS=[{name:"Kostyantynivka",x:280,y:168,labelDx:6,labelDy:4},{name:"Pokrovsk area",x:248,y:182,labelDx:-6,labelDy:-7,anchor:"end"},{name:"Kupyansk",x:238,y:88,labelDx:6,labelDy:-4},{name:"Zaporizhzhia",x:243,y:222,labelDx:-6,labelDy:4,anchor:"end"},{name:"Kherson",x:182,y:240,labelDx:6,labelDy:4},{name:"Crimea",x:249,y:257,labelDx:6,labelDy:4}];
const CRIMEA_ROUTES=[{name:"Kerch Bridge",statusLabel:"DEGRADED",color:"#f97316",detail:"3 Ukrainian attacks since 2022. Unsafe for heavy traffic/rail. Oil terminals ablaze."},{name:"Chonhar Bridge (R-280)",statusLabel:"DISABLED",color:"#ef4444",detail:"Destroyed Jun 7-9 — only vehicles under 1.5 tons can cross. Largest artery severed."},{name:"N. Crimean Canal Bridges",statusLabel:"DESTROYED",color:"#dc2626",detail:"Railway bridge destroyed Jun 23 — Russia last intact rail link from north."},{name:"Henichesk Strait",statusLabel:"SUSPENDED",color:"#ef4444",detail:"Traffic suspended after Jun 20 strike."},{name:"Perekop / Armiansk Road",statusLabel:"DAMAGED",color:"#f97316",detail:"Road bridge struck Jun 11. 50 Russian military vehicles destroyed."}];
const TALKS=[{label:"Russia Demands",color:"#ef4444",flag:"🇷🇺",points:["Full cession of all four annexed oblasts","Ukrainian neutrality — no NATO","Disarmament of Ukrainian armed forces","Recognition of Crimea annexation (2014)"],assessment:"Maximalist. Effectively demands Ukrainian surrender."},{label:"Ukraine Position",color:"#5b8ec8",flag:"🇺🇦",points:["Ceasefire first, then negotiate territorial terms","Retain 800,000-strong armed forces","NATO-level security guarantees","Any territorial concessions must go to national referendum"],assessment:"Firm on sovereignty. Dec 2025 20-Point Plan offers buffer zones — but no unilateral withdrawal."},{label:"Western Framework",color:"#8b5cf6",flag:"🇪🇺",points:["Coalition of the Willing: 35 nations — UK + France pledging troops","EU €90B support loan 2026-2027","G7 Prosperity Package: ~$800B reconstruction","EU opened first of 6 accession clusters"],assessment:"Europe framing war in terms of long-term security. France/UK ready to deploy."}];

function FMap({t,sel,setSel}){const abbrev=n=>n==="Kostyantynivka"?"Kostyant.":n==="Pokrovsk area"?"Pokrovsk":n;return <div style={{borderRadius:12,overflow:"hidden",border:"1px solid rgba(59,130,246,0.2)",marginBottom:0}}><svg viewBox="0 0 400 285" width="100%" style={{display:"block",background:"#0a1524"}}><path d="M47,19 L111,44 L178,50 L222,22 L255,19 L295,28 L322,83 L355,124 L387,137 L360,180 L344,184 L331,193 L300,193 L284,221 L322,243 L296,249 L293,258 L269,268 L258,261 L233,236 L258,212 L235,199 L193,202 L171,233 L151,239 L138,233 L100,186 L84,142 L9,93 Z" fill="#1e3a5f" stroke="#2d5f99" strokeWidth="1.2"/><path d="M322,83 L355,124 L387,137 L360,180 L344,184 L331,193 L300,193 L284,221 L322,243 L296,249 L293,258 L269,268 L258,261 L233,236 L258,212 L253,190 L258,183 L270,175 L300,183 L306,173 L327,167 L338,164 L342,155 L350,149 L342,143 L354,136 L350,130 L363,124 L347,103 Z" fill="#4a1111" stroke="#8b2222" strokeWidth="1"/><path d="M198,241 L222,236 L248,234 L266,240 L278,252 L281,264 L272,278 L253,283 L232,280 L214,270 L202,257 Z" fill="#4a1111" stroke="#8b2222" strokeWidth="1"/><text x="240" y="264" fontSize="7" fill="#c9827f" textAnchor="middle" opacity="0.85">Crimea</text><path d="M215,240 L227,248 L238,247 L247,240 L258,238 L269,243 L278,247 L284,251 L278,260 L269,268 L258,261 L247,256 L235,257 L220,251 Z" fill="#5a1515" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,2"/><path d="M253,190 L258,183 L270,175 L300,183 L306,173 L327,167 L338,164 L342,155 L350,149 L342,143 L354,136 L350,130 L363,124 L347,103 L322,83" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6,3" opacity="0.9"/>{[[88,95,"Kyiv","#60a5fa"],[207,65,"Kharkiv","#60a5fa"],[160,120,"Dnipro","#60a5fa"],[90,160,"Odesa","#60a5fa"],[295,145,"Donetsk","#fca5a5"],[340,115,"Luhansk","#fca5a5"]].map(([x,y,n,c])=><g key={n}><circle cx={x} cy={y} r="3" fill={c} opacity="0.8"/><text x={x+5} y={y+4} fontSize="7.5" fill={c} opacity="0.75">{n}</text></g>)}{SECTOR_PINS.map(pin=>{const sec=SECTORS.find(s=>s.name===pin.name);if(!sec)return null;const isSel=sel===pin.name,r=isSel?9:6;return <g key={pin.name} style={{cursor:"pointer"}} onClick={()=>setSel(isSel?null:pin.name)}><circle cx={pin.x} cy={pin.y} r={r+4} fill={sec.color} opacity={0.15}/><circle cx={pin.x} cy={pin.y} r={r} fill={sec.color} opacity={isSel?1:0.85} stroke="#0c1829" strokeWidth={1.5}/>{isSel&&<circle cx={pin.x} cy={pin.y} r={r+7} fill="none" stroke={sec.color} strokeWidth={1} opacity={0.5} strokeDasharray="3,2"/>}<text x={pin.x+(pin.labelDx||6)} y={pin.y+(pin.labelDy||4)} fontSize="7" fill="#dde6f5" textAnchor={pin.anchor??"start"} fontWeight={isSel?"bold":"normal"} opacity={0.9}>{abbrev(pin.name)}</text></g>;})} <rect x="0" y="269" width="400" height="16" fill="rgba(0,0,0,0.65)"/><circle cx="10" cy="277" r="3" fill="#1e3a5f" stroke="#2d5f99" strokeWidth="1"/><text x="16" y="281" fontSize="7.5" fill="#7a93b8">UA-held</text><circle cx="62" cy="277" r="3" fill="#4a1111" stroke="#8b2222" strokeWidth="1"/><text x="68" y="281" fontSize="7.5" fill="#7a93b8">Occupied</text><line x1="114" y1="277" x2="127" y2="277" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2"/><text x="131" y="281" fontSize="7.5" fill="#7a93b8">Front line</text></svg></div>;}

// ── Ukraine Section Tabs ─────────────────────────────────────────────────────────
function LossesTab({t}){const[sortBy,setSortBy]=useState("default");const chartData=CASUALTIES.map(c=>({d:c.date,kia:c.value}));const avg7d=1307;const displayLosses=sortBy==="total"?[...LOSSES.ukraine].sort((a,b)=>(parseInt(b.total.replace(/[^0-9]/g,""))||0)-(parseInt(a.total.replace(/[^0-9]/g,""))||0)):LOSSES.ukraine;return <div><ST t={t}>📊 Daily Russian Casualties — Last 14 Days</ST><Card t={t} style={{padding:"14px 8px 8px"}}><div style={{height:180}}><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{top:0,right:4,left:-20,bottom:0}}><defs><linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="d" tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false}/><YAxis domain={[900,1600]} tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false}/><Tooltip content={<TT/>}/><ReferenceLine y={avg7d} stroke="#fbbf24" strokeDasharray="4 2" strokeWidth={1.5}/><Area type="monotone" dataKey="kia" stroke="#ef4444" fill="url(#areaGrad)" strokeWidth={2}/></AreaChart></ResponsiveContainer></div><div style={{display:"flex",alignItems:"center",gap:6,padding:"4px 8px",fontSize:11,color:t.sub}}><span style={{width:18,height:2,background:"#fbbf24",display:"inline-block"}}/>7-day avg: ~{avg7d.toLocaleString()}/day</div></Card><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:14,marginBottom:6}}><ST t={t}>🇷🇺 Equipment Destroyed</ST><div style={{display:"flex",gap:4}}>{["default","total"].map(s=><button key={s} onClick={()=>setSortBy(s)} style={{padding:"3px 8px",fontSize:10,borderRadius:6,cursor:"pointer",fontFamily:FONT,fontWeight:600,background:sortBy===s?"#5b8ec8":"none",color:sortBy===s?"#fff":t.sub,border:`1px solid ${sortBy===s?"#5b8ec8":t.border}`}}>{s==="default"?"Default":"Sort by Total"}</button>)}</div></div><Card t={t}>{displayLosses.map((item,i)=><Row key={item.id} t={t} last={i===displayLosses.length-1}><span style={{fontSize:18,width:28,textAlign:"center",flexShrink:0}}>{item.icon}</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:t.text}}>{item.category}</div><div style={{fontSize:11,color:t.sub}}>{item.description}</div></div><div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:15,fontWeight:700,color:item.color??t.text,fontVariantNumeric:"tabular-nums"}}>{item.total}</div><div style={{fontSize:11,fontWeight:500,color:item.todayChange==="—"?t.sub:"#22c55e"}}>{item.todayChange}</div></div></Row>)}</Card></div>;}

function FrontlineTab({t}){const[sel,setSel]=useState(null);const selSec=sel?SECTORS.find(s=>s.name===sel):null;return <div><ST t={t}>🗺️ Situation Map — {REPORT_NOW.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</ST><div style={{fontSize:11,color:t.sub,textAlign:"center",marginBottom:6}}>Tap a sector pin for detail · Dashed red = contact line</div><FMap t={t} sel={sel} setSel={setSel}/>{selSec?<div style={{margin:"8px 0 12px",background:`${selSec.color}12`,border:`1.5px solid ${selSec.color}55`,borderRadius:10,padding:"12px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontSize:18}}>{selSec.icon}</span><span style={{fontSize:14,fontWeight:800,color:t.text,flex:1}}>{selSec.name}</span><Pill label={selSec.status} color={selSec.color}/><button onClick={()=>setSel(null)} aria-label="Close details" style={{background:"none",border:"none",color:t.sub,cursor:"pointer",fontSize:16,padding:"0 2px"}}>✕</button></div><div style={{fontSize:12.5,color:t.sub,lineHeight:1.6}}>{selSec.detail}</div></div>:<div style={{fontSize:10.5,color:t.sub,textAlign:"center",marginBottom:10,opacity:0.6}}>No sector selected — tap a pin above</div>}<ST t={t}>🎯 Sector Analysis</ST>{SECTORS.map(s=><Card key={s.name} t={t} style={{borderLeft:`4px solid ${s.color}`,cursor:"pointer"}} onClick={()=>setSel(sel===s.name?null:s.name)}><div style={{padding:"13px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:18}}>{s.icon}</span><span style={{fontSize:14,fontWeight:700,color:t.text,flex:1}}>{s.name}</span><Pill label={s.status} color={s.color}/><span style={{fontSize:12,color:t.sub}}>{sel===s.name?"▲":"▼"}</span></div>{sel===s.name&&<div style={{fontSize:12.5,color:t.sub,lineHeight:1.6,paddingTop:8}}>{s.detail}</div>}</div></Card>)}</div>;}

function AirDefTab({t}){return <div>
      <Hero t={t} color="#06b6d4"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#67e8f9",marginBottom:6}}>🛡️ AIR DEFENSE — THE INTERCEPT WAR</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Ukraine wins the drone fight on economics and loses the ballistic fight on inventory. CSIS: only 14 of 54 Russian ballistic missiles intercepted in June; zero of the 23 that hit Kyiv on Jul 6. The gap was never skill — it is PAC-3 stock. On Jul 8 at Ankara, Trump licensed Ukraine to manufacture Patriots itself; no timeline yet exists.</div></Hero>
      <Grid2 t={t} items={[
        {icon:"🎯",label:"Drone intercept rate",val:"91.7%",sub:"May 2026 monthly avg; ~89% on Jul 4 night",color:"#22c55e"},
        {icon:"💰",label:"Interceptor economics",val:"$7.5k vs $35k",sub:"UA interceptor drone vs Shahed/Geran — cost flipped",color:"#5b8ec8"},
        {icon:"🚀",label:"Ballistic intercepts",val:"14 of 54",sub:"June, per CSIS. Zero of 23 on Jul 6.",color:"#dc2626"},
        {icon:"📜",label:"Patriot license",val:"Granted",sub:"Jul 8, Ankara — production timeline still unset",color:"#22c55e"},
      ]}/>
      <ST t={t} color="#06b6d4">📋 The Layered System</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>The Jul 8 shift — a license, not a delivery</span> — Trump: "We're going to give a license to you to make Patriots... I said, make them yourself." Zelensky, Jul 9: the licence is agreed "at the political level," with interceptor supplies due "in the coming days" — but an adviser to the defence minister warns setting up production will take many months, and reported bottlenecks run 12-24 months on subcontracted components. Trump had not yet informed Lockheed Martin or RTX. Kyiv has meanwhile asked nearly 40 countries for interceptors from existing stocks, against future contracted deliveries. Separately, Poland and several NATO states signed on to a European PAC-3 maintenance center and Polish co-production with Ukraine; Poland is sending 5 missiles now. Ukraine's own 'Freyja' anti-ballistic interceptor may draw eight European partners.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Top layer — Patriot/SAMP-T</span> — The only counter to Iskander-M and Zircon-class threats. Stock is the war's binding constraint: US production ~500-650 PAC-3 MSE/yr against global demand, European GEM-T co-production (up to 1,000 missiles, DE/NL/RO/ES) the structural fix. Zelensky renewed interceptor appeals after the Kyiv strike.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Middle layer — IRIS-T, NASAMS, F-16s</span> — Cruise-missile and heavy-drone attrition; Denmark-donated F-16s now fly regular intercept sorties. Effective but missile-hungry against saturation raids.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Bottom layer — interceptor drones + mobile teams</span> — The 2026 revolution: $7.5k interceptor drones and gun trucks now take the bulk of Shahed/Gerbera kills, flipping the exchange ratio Ukraine's way and freeing missiles for what only missiles can stop. Sky Fortress acoustic net cues the layer.</div>
        <div><span style={{color:t.text,fontWeight:700}}>The stress test</span> — Saturation raids mix decoys (Gerbera), jet drones (Geran-4), cruise and ballistic in one wave to exhaust the stack top-down. See Drone War → Saturation for the model; the Jul 1-2 raid is its worst-case validation.</div>
      </div></div></Card>
      <Note t={t} color="#06b6d4">Intercept rates: UA Air Force nightly reports (via Militarnyi/Ukrinform); economics per interceptor-drone program disclosures. Cross-reference: Drone War → Intercept & AD Systems, Great Power Rivalry → Defense Industry (PAC-3 production).</Note>
    </div>;}

function SouthernFrontTab({t}){const[sub,setSub]=useState("crimea");return <div><div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>{[{id:"crimea",label:"🏴 Crimea"},{id:"blacksea",label:"🌊 Black Sea"},].map(o=><button key={o.id} onClick={()=>setSub(o.id)} style={{padding:"4px 12px",fontSize:11,borderRadius:14,cursor:"pointer",fontFamily:FONT,fontWeight:700,background:sub===o.id?"#5b8ec8":"none",color:sub===o.id?"#fff":t.sub,border:`1px solid ${sub===o.id?"#5b8ec8":t.border}`}}>{o.label}</button>)}</div>{sub==="crimea"&&<CrimeaTab t={t}/>}{sub==="blacksea"&&<BlackSeaTab t={t}/>}</div>;}

function StrikeWarTab({t}){const[sub,setSub]=useState("strikes");return <div><div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>{[{id:"strikes",label:"💥 Deep Strikes"},{id:"airdef",label:"🛡️ Air Defense"},].map(o=><button key={o.id} onClick={()=>setSub(o.id)} style={{padding:"4px 12px",fontSize:11,borderRadius:14,cursor:"pointer",fontFamily:FONT,fontWeight:700,background:sub===o.id?"#5b8ec8":"none",color:sub===o.id?"#fff":t.sub,border:`1px solid ${sub===o.id?"#5b8ec8":t.border}`}}>{o.label}</button>)}</div>{sub==="strikes"&&<StrikesTab t={t}/>}{sub==="airdef"&&<AirDefTab t={t}/>}</div>;}

function DiploAlliesTab({t}){const[sub,setSub]=useState("diplomacy");return <div><div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>{[{id:"diplomacy",label:"🗣️ Diplomacy"},{id:"nato",label:"🤝 NATO & Allies"},].map(o=><button key={o.id} onClick={()=>setSub(o.id)} style={{padding:"4px 12px",fontSize:11,borderRadius:14,cursor:"pointer",fontFamily:FONT,fontWeight:700,background:sub===o.id?"#5b8ec8":"none",color:sub===o.id?"#fff":t.sub,border:`1px solid ${sub===o.id?"#5b8ec8":t.border}`}}>{o.label}</button>)}</div>{sub==="diplomacy"&&<DiplomacyTab t={t}/>}{sub==="nato"&&<NATOTab t={t}/>}</div>;}

function DiplomacyTab({t}){const[open,setOpen]=useState(null);const TRACKS=[{label:"🇹🇷 Turkish ceasefire push",status:"BLOCKED",color:"#ef4444",text:"Rejected by Moscow outright pre-summit, freezing the only comprehensive-ceasefire track."},{label:"🇺🇸 Trump-Zelensky channel",status:"ACTIVE",color:"#22c55e",text:"Jul 4 call produced Zelensky's most optimistic language of the year; sideline meeting at Ankara Jul 7-8."},{label:"🔄 Prisoner swaps",status:"DELIVERING",color:"#22c55e",text:"Istanbul-framework exchanges keep working through backlogs — the only track with an unbroken 2026 record."},{label:"💰 Sanctions-relief sequencing",status:"UNTESTED",color:"#eab308",text:"West ties relief to verified withdrawal; Russia demands relief first — no mechanism agreed."},{label:"🇷🇺 Moscow's posture",status:"MAXIMALIST",color:"#ef4444",text:"Territorial recognition plus NATO renunciation remain preconditions."}];return <div><Hero t={t} style={{borderLeft:"4px solid #8b5cf6"}}><div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🗣️ Peace Talks — Current Status</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:12}}><div><div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Overall status</div><div style={{fontSize:20,fontWeight:800,color:"#ef4444"}}>STALLED</div></div><div><div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Next milestone</div><div style={{fontSize:13,fontWeight:700,color:"#5b8ec8",lineHeight:1.3}}>NATO Ankara Jul 7-8</div></div><div><div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Military track</div><div style={{fontSize:13,fontWeight:700,color:"#22c55e"}}>Constructive</div></div><div><div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Political track</div><div style={{fontSize:13,fontWeight:700,color:"#ef4444"}}>STUCK</div></div></div></Hero><ST color="#22c55e" t={t}>📋 Track Status Board</ST><Card t={t}><div style={{padding:"11px 14px"}}>{TRACKS.map((tr,i,a)=><div key={i} style={{marginBottom:i<a.length-1?8:0,paddingBottom:i<a.length-1?8:0,borderBottom:i<a.length-1?`.5px solid ${t.sep}`:0}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:12.5,fontWeight:700,color:t.text}}>{tr.label}</span><span style={{fontSize:10,fontWeight:800,color:tr.color}}>{tr.status}</span></div><div style={{fontSize:11.5,color:t.sub,lineHeight:1.5}}>{tr.text}</div></div>)}</div></Card><ST color="#8b5cf6" t={t}>⚖️ Negotiating Positions</ST>{TALKS.map(pos=><Card key={pos.label} t={t} style={{borderLeft:`4px solid ${pos.color}`,marginBottom:10}}><div style={{padding:"13px 14px",cursor:"pointer"}} onClick={()=>setOpen(open===pos.label?null:pos.label)}><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:22}}>{pos.flag}</span><span style={{fontSize:14,fontWeight:800,color:t.text,flex:1}}>{pos.label}</span><span style={{fontSize:14,color:t.sub}}>{open===pos.label?"▲":"▼"}</span></div></div>{open===pos.label&&<div style={{padding:"0 14px 14px"}}>{pos.points.map((pt,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:12.5,color:t.sub,lineHeight:1.5}}><span style={{color:pos.color,fontWeight:700,flexShrink:0}}>▸</span>{pt}</div>)}<div style={{fontSize:11.5,color:t.sub,background:`${pos.color}09`,border:`1px solid ${pos.color}18`,borderRadius:6,padding:"8px 10px",lineHeight:1.5,marginTop:8,fontStyle:"italic"}}>{pos.assessment}</div></div>}</Card>)}<ST color="#8b5cf6" t={t}>📅 Diplomatic Timeline</ST><Card t={t}>{EVENTS.ukraine.map((ev,i)=><div key={ev.id} style={{display:"flex",gap:12,padding:"11px 14px",borderBottom:i<EVENTS.ukraine.length-1?`.5px solid ${t.sep}`:0}}><div style={{minWidth:82,fontSize:10,fontWeight:700,color:ev.color,paddingTop:2,flexShrink:0,lineHeight:1.4}}>{ev.date}</div><div><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>{ev.isUpcoming&&<Pill label="UPCOMING" color="#5b8ec8"/>}<div style={{fontSize:13,fontWeight:700,color:t.text}}>{ev.label}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{ev.note}</div></div></div>)}</Card></div>;}

function CrimeaTab({t}){return <div><Hero t={t} style={{borderLeft:"4px solid #ef4444"}}><div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🏴 OPERATION LOGISTICS LOCKDOWN — SIEGE OF CRIMEA</div><Grid2 t={t} items={[{val:"BANNED",label:"Civilian fuel sales",sub:"All sales suspended Jun 21",color:"#ef4444"},{val:"↓71%",label:"R-280 highway traffic",sub:"vs 14 days ago",color:"#ef4444"},{val:"80% cancelled",label:"Jun 2026 tourism",sub:"Summer season collapsed",color:"#f97316",vs:16},{val:"~25%",label:"BSF battle space",sub:"Down from 60% pre-war",color:"#f97316"},{val:"DECLARED",label:"Crimea state of emergency",sub:"Fuel · water · power failures Jun 27",color:"#ef4444"}]}/></Hero><ST color="#ef4444" t={t}>🗺️ Supply Routes Status</ST>{CRIMEA_ROUTES.map(r=><Card key={r.name} t={t} style={{borderLeft:`4px solid ${r.color}`}}><div style={{padding:"12px 14px"}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5}}><div style={{fontSize:13,fontWeight:700,color:t.text}}>{r.name}</div><Pill label={r.statusLabel} color={r.color}/></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{r.detail}</div></div></Card>)}</div>;}

function StrikesTab({t}){const cats=["All","Energy","Military","Military-Industrial","Infrastructure"];const[cat,setCat]=useState("All");const filtered=cat==="All"?STRIKES:STRIKES.filter(s=>s.category===cat);const sevColor=sev=>sev==="critical"?"#ef4444":sev==="major"?"#f97316":"#eab308";return <div><Hero t={t}><div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🎯 Ukrainian Deep-Strike Campaign — Jun–Jul 2026</div><Grid2 t={t} items={[{val:`${STRIKES.length}`,label:"Targets struck",color:"#ef4444"},{val:`${STRIKES.filter(s=>s.severity==="critical").length}`,label:"Critical hits",color:"#f97316"},{val:"2,800km",label:"Max range strike",sub:"Tyumen, Siberia",color:"#fbbf24"},{val:"1,343",label:"UA drone models",sub:"Brave1 platform",color:"#5b8ec8"}]}/></Hero><div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>{cats.map(c=><button key={c} onClick={()=>setCat(c)} style={{padding:"4px 10px",fontSize:11,borderRadius:16,cursor:"pointer",fontFamily:FONT,fontWeight:600,background:cat===c?"#5b8ec8":"none",color:cat===c?"#fff":t.sub,border:`1px solid ${cat===c?"#5b8ec8":t.border}`}}>{c}</button>)}</div>{filtered.map(s=><Card key={s.id} t={t} style={{borderLeft:`4px solid ${sevColor(s.severity)}`}}><div style={{padding:"12px 14px"}}><div style={{display:"flex",alignItems:"flex-start",gap:8}}><span style={{fontSize:18,flexShrink:0}}>{s.icon}</span><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:3}}><Pill label={s.severity.toUpperCase()} color={sevColor(s.severity)}/><Pill label={s.category} color="#5b8ec8"/><span style={{fontSize:10,color:t.sub}}>{s.date} · {s.region}</span>{s.distance&&<span style={{fontSize:10,color:t.sub}}>{s.distance.toLocaleString()}km</span>}</div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:4}}>{s.targetName}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{s.result}</div></div></div></div></Card>)}</div>;}

function EconomyTab({t}){const METRICS=[{icon:"💰",label:"National Wealth Fund",val:"~$36B",change:"↓ from $113.5B pre-war",color:"#ef4444",desc:"Russia rainy-day fiscal buffer depleted. At current burn rate (~$50B/year), insufficient for prolonged attrition."},{icon:"🛢️",label:"Urals Crude Price",val:"$44-50",change:"vs $59/bbl budgeted",color:"#ef4444",desc:"Revenue gap ~$15B/year vs budget assumptions. Tight sanctions enforcement + oversupply drove price down."},{icon:"📉",label:"Ruble vs USD",val:"~88-95",change:"Down from ~60 pre-war",color:"#f97316",desc:"Currency weakened significantly. CBR raised interest rate to 21% to fight inflation."},{icon:"🏭",label:"Refineries Struck (2026)",val:"~40% capacity",change:"10 refineries hit May 2026",color:"#22c55e",desc:"Ukrainian long-range drone campaign damaged ~40% of Russian refining capacity. Gasoline production estimated 10% below 2025 levels."},{icon:"📢",label:"Putin Admits Fuel Shortages",val:"Jun 28",change:"First-ever public admission",color:"#ef4444",desc:"At United Russia congress, Putin called shortages a 'temporary deficit' — Russia will import fuel from Asia and expedite repairs. Deputy CBR governor: fuel sector below capacity 'will take something out of GDP.' CBR forecasts GDP growth 0.5%-1.5% in 2026."},{icon:"🚢",label:"Russia Importing Gasoline",val:"First time",change:"Since Soviet era",color:"#ef4444",desc:"Reuters (Jun 17): Russia will import gasoline from Asia by sea in June 2026 — first time in decades. Decision to import in 2026 after not doing so in 2025 signals shortages are structurally worse this year."},{icon:"⚓",label:"US Seaborne Oil Sanctions",val:"Reimposed",change:"Jun 28 — temp waivers expired",color:"#ef4444",desc:"US reimposed sanctions on Russian seaborne oil exports after temporary waivers were not renewed (ISW Jun 28). Tightens economic pressure alongside refinery damage and Crimea logistics collapse."},{icon:"👥",label:"Labor Shortage",val:"Critical",change:"↓ 2.8M+ mobilized/emigrated",color:"#ef4444",desc:"Labor shortage from 700K+ killed/wounded + 1.3M+ emigration. Wage inflation at 20%."}];return <div><Hero t={t} style={{borderLeft:"4px solid #ef4444"}}><div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>💸 Russian War Economy — Jun 2026</div><div style={{fontSize:13,color:"rgba(255,255,255,.75)",lineHeight:1.6,marginBottom:10}}>Russia war economy is under mounting strain: oil revenue below budget, NWF nearly depleted, double-digit inflation, critical labor shortage, and ~40% of refining capacity damaged.</div><div style={{display:"flex",flexWrap:"wrap",gap:6}}><Pill label="NWF: ~$36B" color="#ef4444"/><Pill label="Budget deficit: Growing" color="#f97316"/><Pill label="Inflation: ~9-12%" color="#eab308"/><Pill label="CBR rate: 21%" color="#ef4444"/></div></Hero>{METRICS.map(m=><Card key={m.label} t={t} style={{borderLeft:`4px solid ${m.color}`}}><div style={{padding:"12px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18,flexShrink:0}}>{m.icon}</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:t.text}}>{m.label}</div><div style={{fontSize:11,color:"#ef4444",fontWeight:600}}>{m.change}</div></div><div style={{fontSize:18,fontWeight:800,color:m.color,textAlign:"right",flexShrink:0}}>{m.val}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{m.desc}</div></div></Card>)}</div>;}

function IntelTab({t}){const ASSESSMENTS=[{date:"Jun 25",source:"ISW",label:"Main effort: Kostyantynivka",icon:"🎯",color:"#ef4444",text:"Russia Spring-Summer 2026 main effort focused on Kostyantynivka. 27+ Russian assaults per day. Advance after capturing Toretsk (Aug 2025). Civilian evacuation ordered."},{date:"Jun 25",source:"UK MOD",label:"Net territorial gain slowing",icon:"📐",color:"#22c55e",text:"Russia captured ~108 km² in 2026 YTD, vs ~2,800 km² in full year 2024. Advance rate declined by ~85-90% from peak."},{date:"Jun 24",source:"GUR (UA Intel)",label:"Belarus complied with ultimatum",icon:"🇧🇾",color:"#8b5cf6",text:"Ukrainian GUR confirmed Belarus halted Shahed relay system operations as of Jun 22. Zelensky: Whatever the case, the effect is achieved."},{date:"Jun 20",source:"CIA / IC consensus",label:"Russia will not use nuclear weapons",icon:"☢️",color:"#22c55e",text:"Intelligence community consensus: Putin nuclear threats are coercive, not operational. Any tactical nuclear use would cost Russia China support — crossing Putin true red line."},{date:"Jun 18",source:"Pentagon",label:"F-16 operational assessment",icon:"✈️",color:"#5b8ec8",text:"Ukraine F-16 fleet operational but limited in number. Key contribution: SEAD missions and Western AMRAAM integration improving air defence suppression."},{date:"Jun 27",source:"WSJ / Kyiv Post",label:"Putin-Lukashenko: second-front pressure signal",icon:"🇧🇾",color:"#ef4444",text:"WSJ reports Putin is pressuring Lukashenko to allow Russia to recruit Belarusian citizens through Union State mechanisms. 2-day secret Valdai talks with full delegations — no communiqué issued. Most significant Belarus escalation signal since Shahed relay shutdown."},{date:"Jun 28",source:"ISW / AP / CNBC",label:"Putin Congress: fuel crisis admitted, diplomacy rejected",icon:"📢",color:"#ef4444",text:"ISW (Jun 28): Putin at United Russia congress 'vaguely acknowledged' Ukraine strike campaign impacts but 'promoted a facade of stability' and 'rejected diplomatic solutions.' First public admission of fuel shortages — called a 'temporary deficit.' Russia's central bank: GDP growth forecast 0.5%-1.5% in 2026. Russia to import gasoline from Asia by sea for first time in decades."},{date:"Jun 29",source:"Middle East Eye",label:"Russia rejected Fidan ceasefire — Pokrovsk encirclement risk",icon:"🤝",color:"#ef4444",text:"MEE confirmed Russia rejected Turkish FM Fidan's ceasefire proposal during Jun 16-17 Moscow visit. Turkey hoped to bring both sides to NATO Ankara. Russia firm on Donbas cession demands. RFERL: Pokrovsk is 'on the brink of encirclement' as Russian forces advance from multiple directions. NATO Ankara opens with diplomatic track already dead."},{date:"Jun 27",source:"Fire Point / Defense News",label:"FP-9 ballistic missile — Moscow-range capability approaching",icon:"🚀",color:"#22c55e",text:"Fire Point announced first flights of FP-9 ballistic missile (850km range, 800kg warhead). CEO: next flight should be to Moscow. Company also signed deal with German Hensoldt to build Freyja ABM system — Patriot-class capability at one-third the cost using FP-7 as interceptor munition."},{date:"Jul 16",source:"Reuters / Kyiv sources",label:"Fedorov's dismissal reads as a Syrskyi power consolidation",icon:"🏛️",color:"#f97316",text:"Multiple Kyiv sources frame the Defense Minister's removal less as a policy shift and more as Commander-in-Chief Syrskyi's continued consolidation of authority over procurement and mobilization — the fourth significant wartime cabinet reshuffle, with Koretsky's confirmation as PM seen as a technocratic, low-friction choice rather than a change in war strategy."},{date:"Jul 17",source:"Militarnyi / MoD",label:"Drone units pass 1M verified strikes for 2026",icon:"🛸",color:"#22c55e",text:"Ukrainian drone units have struck over 1 million verified targets since the start of 2026, including an estimated 193,500 Russian personnel killed or wounded by drone strikes alone — the clearest evidence yet that drones, not artillery, now account for the majority of Russian battlefield losses."},{date:"Jul 19",source:"NPR / Ukraine Air Force",label:"Ballistic-heavy barrage signals possible interceptor rationing",icon:"⚠️",color:"#ef4444",text:"The Jul 18-19 Kyiv attack (41 missiles, 25 ballistic) saw only 18 of 41 missiles intercepted — a lower rate than the 5-of-8 ballistic intercept night on Jul 13-14 — one plausible read is Patriot/PAC-3 interceptor stocks are being rationed as the parallel Iran war draws on the same US supply chain Ukraine depends on."}];return <div><Hero t={t} style={{borderLeft:"4px solid #8b5cf6"}}><div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🔍 Intelligence Assessments — Jul 2026</div><div style={{fontSize:12,color:"rgba(255,255,255,.55)",lineHeight:1.6}}>Compiled from ISW, UK MOD daily updates, Ukrainian GUR, CIA, CSIS, Pentagon and open-source intelligence.</div></Hero>{ASSESSMENTS.map((a,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${a.color}`}}><div style={{padding:"12px 14px"}}><div style={{display:"flex",alignItems:"flex-start",gap:8}}><span style={{fontSize:18,flexShrink:0}}>{a.icon}</span><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:3}}><Pill label={a.source} color={a.color}/><span style={{fontSize:10,color:t.sub}}>{a.date}</span></div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:5}}>{a.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{a.text}</div></div></div></div></Card>)}</div>;}

const ANALYSTS=[{name:"The Enforcer",handle:"@EnforcerOfficial",flag:"🇺🇦",color:"#f97316",bio:"Frontline-focused OSINT and battlefield analysis account. Rapid-turnaround coverage of strikes, equipment losses, and tactical developments across the Ukraine theater.",url:"https://twitter.com/EnforcerOfficial",recent:["Crimea Siege — Daily Supply Route Status","Frontline Sector Breakdown — Pokrovsk/Sloviansk","Equipment Loss Verification — Visual Confirmation Roundup"]},{name:"Preston Stewart",handle:"@prestonstewart",flag:"🇺🇸",color:"#5b8ec8",bio:"West Point graduate · Field Artillery officer · Multiple frontline reporting trips to Ukraine. 500k+ YouTube subscribers.",url:"https://www.youtube.com/@prestonstewart",recent:["Siege of Crimea Has Begun as Russia Air Defence Reaches Tipping Point","352,000 Russian KIA Is On The Low Side","$882 Per Soldier — The Economics of Russia Meat Assaults"]},{name:"Ryan McBeth",handle:"@RyanMcBethProgramming",flag:"🇺🇸",color:"#ef4444",bio:"20-year US Army veteran · Intel analyst · MS Cybersecurity. Specialises in OSINT, disinformation, drone warfare. 1M+ subscribers.",url:"https://www.youtube.com/@RyanMcBethProgramming",recent:["Drones vs Snipers: Who Actually Winning in Ukraine?","What We NOT Being Told About Iran","Ukraine Fortress Belt (Helsinki Commission)"]},{name:"ISW",handle:"understandingwar.org",flag:"🇺🇸",color:"#8b5cf6",bio:"Leading open-source research institute. Daily Ukraine assessment. Primary reference used by US DoD.",url:"https://www.understandingwar.org/",recent:["Russia Continues Offensive Operations in Pokrovsk — Jun 24","ISW: Russian Forces Made Marginal Advances Near Toretsk","Interactive Deep State Ukraine Map — Daily Updated"]},{name:"Perun",handle:"@PerunAU",flag:"🇦🇺",color:"#22c55e",bio:"In-depth video essays on military logistics, industrial capacity, strategy, and economics of modern warfare.",url:"https://www.youtube.com/@PerunAU",recent:["Ukraine Drone Superpower Strategy","Russia Economic Warfare State","The Logistics of the Siege of Crimea"]},{name:"Oryx",handle:"oryxspioenkop.com",flag:"🇳🇱",color:"#5b8ec8",bio:"The benchmark open-source database of visually-confirmed equipment losses. Cited by every major newsroom.",url:"https://www.oryxspioenkop.com/",recent:["Attack On Europe: Documenting Russian Equipment Losses","Documenting Ukrainian Equipment Losses","Naval Losses Tracker — Updated"]},{name:"Kyiv Independent",handle:"kyivindependent.com",flag:"🇺🇦",color:"#8b5cf6",bio:"Ukraine leading English-language newsroom. Frontline dispatches, investigations, and analysis.",url:"https://kyivindependent.com/",recent:["Russia Strikes Kryvyi Rih, Killing Civilians","Inside Ukraine Drone Production Surge","Belarus Halts Shahed Guidance Relays"]},{name:"Michael Kofman",handle:"Russia Contingency",flag:"🇺🇸",color:"#ef4444",bio:"One of the most respected Russian-military specialists. Deep force-structure, doctrine, and attrition analysis via War on the Rocks podcast.",url:"https://warontherocks.com/",recent:["Assessing Russia 2026 Offensive Potential","Force Generation and the Attrition War","The State of Ukrainian Manpower"]},{name:"Jake Broe",handle:"@JakeBroe",flag:"🇺🇸",color:"#06b6d4",bio:"US Air Force veteran (Nuclear & Missile Operations Officer, Minuteman III ICBM system) who left service the same week Russia invaded in Feb 2022 and became a full-time war analyst. Daily video updates with a strong pro-Ukraine advocacy stance; also runs NAFO-partnered fundraising drives for frontline vehicles. ~500k subscribers.",url:"https://www.youtube.com/@JakeBroe",recent:["\\u201cTrain to Kyiv\\u201d Fundraiser — 8th NAFO-Partnered Vehicle Drive","Why Russia's Battlefield Gains Don't Add Up to Victory","Daily War Map Update — Frontline Breakdown"]}];
function AnalystsTab({t}){return <div><Note color="#5b8ec8" t={t}>These analysts provide consistently accurate, well-sourced independent coverage. All channels are free and publicly accessible.</Note>{ANALYSTS.map(a=><Card key={a.name} t={t} style={{borderLeft:`4px solid ${a.color}`}}><div style={{padding:"13px 14px"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><span style={{fontSize:24}}>{a.flag}</span><div style={{flex:1}}><div style={{fontSize:15,fontWeight:800,color:t.text}}>{a.name}</div><div style={{fontSize:11,color:a.color,fontWeight:600}}>{a.handle}</div></div><a href={a.url} target="_blank" rel="noopener noreferrer" style={{background:a.color,color:"#fff",fontSize:11,fontWeight:700,padding:"6px 12px",borderRadius:8,textDecoration:"none",flexShrink:0}}>Open ↗</a></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55,marginBottom:8}}>{a.bio}</div><div style={{fontSize:11,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".06em",marginBottom:6}}>Recent Coverage:</div>{a.recent.map((title,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:5,fontSize:12,color:t.text,lineHeight:1.4}}><span style={{color:a.color,flexShrink:0}}>▸</span>{title}</div>)}</div></Card>)}</div>;}

function NATOTab({t}){
  const NATIONS=[
    {flag:"🇺🇸",name:"United States",color:"#f97316",role:"Deterrence backbone",commitment:"ATACMS · HIMARS · F-16 transfer · $61B+ total aid. NATO Ankara posture defines summit outcome."},
    {flag:"🇬🇧",name:"United Kingdom",color:"#5b8ec8",role:"Lead contributor",commitment:"Troops post-ceasefire pledge · Storm Shadow · £3B/year military aid · F-35 pilot training."},
    {flag:"🇫🇷",name:"France",color:"#5b8ec8",role:"Co-lead",commitment:"Troops post-ceasefire pledge · SCALP cruise missiles · Caesar howitzers · nuclear extended deterrence signal."},
    {flag:"🇩🇪",name:"Germany",color:"#eab308",role:"Largest EU economy",commitment:"€7B in 2026 · IRIS-T air defence · Leopard 2 tanks · Taurus still under political debate."},
    {flag:"🇵🇱",name:"Poland",color:"#22c55e",role:"Eastern flank anchor",commitment:"Largest land army in coalition. 300K+ troops. Hosting US forces. Abrams, F-16, HIMARS operational."},
    {flag:"🇸🇪",name:"Sweden",color:"#22c55e",role:"New NATO member",commitment:"JAS Gripen fighters · NLAW · CV90 IFVs · first combat contribution since joining NATO in 2024."},
    {flag:"🌍",name:"35-nation Coalition",color:"#94a3b8",role:"Coalition of the Willing",commitment:"Signed at Elysee Palace Jan 6, 2026. Not all NATO — includes non-member partners. UK and France are lead nations."},
  ];
  const GUARANTEES=[
    {icon:"✅",label:"EU accession",text:"EU opened first of 6 accession clusters. Membership path formally active — strongest long-term security signal Ukraine has received."},
    {icon:"🤝",label:"Coalition of the Willing",text:"35 nations pledged to deploy troops as post-ceasefire security guarantors. UK and France lead. Troops would enforce any ceasefire lines."},
    {icon:"⚖️",label:"NATO membership",text:"Ukraine formally applied. Russia core red line. US position: ambiguous. European NATO: increasingly supportive. Will not be resolved at Ankara."},
    {icon:"💰",label:"G7 Prosperity Package",text:"~$800B reconstruction commitment. EU 90B loan 2026-2027 already active. World Bank coordinating disbursement mechanisms."},
  ];
  return <div>
    <Hero t={t} style={{borderLeft:"4px solid #5b8ec8"}}>
      <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🤝 NATO & Coalition — Jul 2026</div>
      <Grid2 t={t} items={[
        {val:"32",label:"NATO members",sub:"All at 2%+ GDP target",color:"#5b8ec8"},
        {val:"35",label:"Coalition of Willing",sub:"Elysee Palace Jan 6, 2026",color:"#22c55e"},
        {val:"€90B",label:"EU support loan",sub:"2026-2027 package",color:"#eab308"},
        {val:"CONCLUDED",label:"NATO Ankara Summit",sub:"Jul 7-8 · $80B pledged for 2026",color:"#22c55e"},
      ]}/>
    </Hero>
    <ST t={t} color="#5b8ec8">🏛️ NATO Ankara Jul 7-8 — Outcome</ST>
    <Card t={t} style={{borderLeft:"4px solid #22c55e"}}><div style={{padding:"12px 14px"}}>
      <div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:8}}>✅ Concluded — pledges made, production timeline still the open question</div>
      {["Allies pledged $80B (~€70B) for Ukraine in 2026 and reaffirmed Article 5; Trump gave an apparent green light for Europe/Ukraine to produce Patriot missiles under license, though no firm production dates were set","Trump-Zelensky bilateral was notably warm — Trump said Zelensky has 'done an amazing job,' a marked shift from the February 2025 Oval Office confrontation. Zelensky also met Syria's interim President al-Sharaa on the sidelines","Heading into the summit, Russia had already rejected Turkish FM Fidan's ceasefire proposal during his Jun 16-17 Moscow visit, remaining firm on Donbas cession demands — Turkey's hope of bringing both sides to Ankara did not materialize, and the negotiating track stayed closed throughout","Rubio (Jun 3, pre-summit): called Ankara 'probably the most important meeting in NATO history' — allies delivered a funding and licensing package, but the harder test (an actual Patriot-production timeline) remains unresolved weeks later","Putin at the United Russia congress Jun 28 (pre-summit) had already rejected diplomatic solutions — Moscow's posture did not shift as a result of Ankara"].map((pt,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:12,color:t.sub,lineHeight:1.6}}><span style={{color:"#5b8ec8",flexShrink:0}}>▸</span>{pt}</div>)}
    </div></Card>
    <ST t={t} color="#5b8ec8">🌍 Key Contributors</ST>
    {NATIONS.map((n,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${n.color}`}}><div style={{padding:"10px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:20}}>{n.flag}</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:t.text}}>{n.name}</div><div style={{fontSize:10,color:t.sub}}>{n.role}</div></div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{n.commitment}</div></div></Card>)}
    <ST t={t} color="#5b8ec8">🔒 Security Guarantees Debate</ST>
    <Card t={t}>{GUARANTEES.map((item,i,a)=><div key={i} style={{display:"flex",gap:10,padding:"10px 14px",borderBottom:i<a.length-1?`.5px solid ${t.sep}`:0}}><span style={{fontSize:18,flexShrink:0}}>{item.icon}</span><div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:2}}>{item.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{item.text}</div></div></div>)}</Card>
  </div>;
}

function BlackSeaTab({t}){
  const BSF_KILLS=[
    {vessel:"Moskva (flagship)",type:"Slava-class cruiser",date:"Apr 14, 2022",method:"2x R-360 Neptune AShMs",icon:"⛵",note:"BSF flagship sunk — most significant naval loss of the war. Caused immediate BSF withdrawal from northwestern Black Sea."},
    {vessel:"Saratov",type:"Ropucha landing ship",date:"Mar 24, 2022",method:"Neptune missile, Berdyansk port",icon:"🚢",note:"Destroyed at dock alongside Orsk and Novocherkassk. First major naval strike of the war."},
    {vessel:"Minsk + Rostov-on-Don",type:"Kilo-class submarines",date:"Sep 13, 2023",method:"Storm Shadow cruise missiles, Sevastopol drydock",icon:"🔱",note:"Two submarines destroyed in drydock simultaneously — unprecedented strike. Russia withdrew remaining subs from Sevastopol."},
    {vessel:"Caesar Kunikov",type:"Ropucha landing ship",date:"Feb 14, 2024",method:"Magura V5 USV swarm",icon:"🚀",note:"First major warship sunk by unmanned surface vehicle. Established Magura V5 as a decisive naval weapon."},
    {vessel:"Sergei Kotov",type:"Patrol vessel",date:"Mar 5, 2024",method:"Magura V5 open-sea attack",icon:"🚀",note:"Sunk in open sea — first Magura V5 open-ocean kill. Proved USVs can operate far from coast."},
    {vessel:"~26 additional vessels",type:"Patrol, landing, support, submarines",date:"2022-2026",method:"Naval drones, Neptune, Storm Shadow, coastal missiles",icon:"💥",note:"Cumulative campaign: ~31 vessels destroyed or badly damaged. BSF now has ZERO ships in Black Sea or Sea of Azov."},
  ];
  const IMPACT=[
    {icon:"🌾",label:"Grain corridor restored",text:"Ukraine resumed Black Sea grain exports without RSF able to interdict. Romania and NATO escorts operational since 2024."},
    {icon:"🛢️",label:"Crimea energy isolation",text:"Kerch Strait operations severed maritime fuel supply to Crimea. Combined with rail and road destruction — peninsula under total multi-domain siege."},
    {icon:"🚀",label:"Doctrine shift",text:"Ukraine proved a navy-less nation can defeat a major fleet using asymmetric USV and anti-ship missile campaign. Being studied by every NATO navy."},
    {icon:"🏙️",label:"Odesa defence secured",text:"With BSF expelled, amphibious landing threat on Odesa eliminated. Port re-opened to commercial shipping — $500M+/month in export revenue restored."},
  ];
  return <div>
    <Hero t={t} style={{borderLeft:"4px solid #06b6d4"}}>
      <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🌊 Black Sea Campaign — Jun 2026</div>
      <Grid2 t={t} items={[
        {val:"0",label:"BSF in Black Sea",sub:"Historic expulsion — Jun 2026",color:"#22c55e"},
        {val:"0",label:"BSF in Sea of Azov",sub:"Both seas clear",color:"#22c55e"},
        {val:"~31",label:"Vessels destroyed",sub:"Sunk or badly damaged",color:"#ef4444"},
        {val:"~$5B",label:"BSF losses (est.)",sub:"Including Moskva, two submarines",color:"#f97316"},
      ]}/>
      <div style={{fontSize:12,color:"rgba(255,255,255,.7)",lineHeight:1.6,marginTop:10}}>Ukraine expelled Russia's Black Sea Fleet using Neptune missiles, Magura V5 naval drones, and Storm Shadow cruise missiles — without a single surface combatant of its own. The most decisive naval campaign of the war.</div>
    </Hero>
    <ST t={t} color="#06b6d4">⚓ Key BSF Losses</ST>
    {BSF_KILLS.map((v,i)=><Card key={i} t={t} style={{borderLeft:"4px solid #ef4444"}}><div style={{padding:"10px 14px"}}><div style={{display:"flex",gap:8,marginBottom:4}}><span style={{fontSize:18,flexShrink:0}}>{v.icon}</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:t.text}}>{v.vessel}</div><div style={{fontSize:10,color:t.sub}}>{v.type} · {v.date}</div></div></div><div style={{fontSize:12,color:t.sub,marginBottom:3}}><strong style={{color:"#06b6d4"}}>Method: </strong>{v.method}</div><div style={{fontSize:11.5,color:t.sub,lineHeight:1.5,fontStyle:"italic"}}>{v.note}</div></div></Card>)}
    <ST t={t} color="#06b6d4">📡 Strategic Impact</ST>
    <Card t={t}>{IMPACT.map((item,i,a)=><div key={i} style={{display:"flex",gap:10,padding:"10px 14px",borderBottom:i<a.length-1?`.5px solid ${t.sep}`:0}}><span style={{fontSize:18,flexShrink:0}}>{item.icon}</span><div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:2}}>{item.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{item.text}</div></div></div>)}</Card>
  </div>;
}

function ManpowerTab({t}){
  const RU=[
    {icon:"☠️",label:"Monthly losses (est.)",val:"~40K",change:"First time exceeding recruitment rate",color:"#ef4444",desc:"Russia losing ~40,000 killed or wounded per month since Nov 2025 — first time losses exceed recruitment (The Telegraph, Feb 2026). Net manpower deficit of ~5,000/month and widening."},
    {icon:"🪖",label:"Monthly recruitment (est.)",val:"~35K",change:"Gap: ~5K/month deficit",color:"#f97316",desc:"Russia recruiting via contract soldiers, conscripts, prisoner volunteers, and ethnic minority drives. Insufficient to replace losses at current burn rate."},
    {icon:"💸",label:"Contract soldier salary",val:"~$2,000",change:"20%+ wage inflation",color:"#eab308",desc:"Monthly pay now $1,800-$2,500 — a large sum in Russian regional standards. Primary recruitment draw in Siberia, the Far East, and Buryatia. Creating severe labour market distortions."},
    {icon:"🏭",label:"Labour shortage",val:"Critical",change:"2.8M+ removed from workforce",color:"#ef4444",desc:"700K+ killed or wounded + 1.3M+ emigrated = 2.8M+ removed from workforce. CBR: labour shortage is the primary constraint on economic growth in 2026."},
  ];
  const UA=[
    {icon:"⚔️",label:"UA casualties (est.)",val:"~194K",change:"Dead or missing (UALosses Jun 21)",color:"#5b8ec8",desc:"UALosses project verified by BBC, Mediazona: 96,821 killed + 97,938 missing as of Jun 21, 2026. Excludes wounded. GCHQ estimate: nearly 500,000 Russian killed."},
    {icon:"🔄",label:"Mobilization age",val:"25+",change:"Lowered from 27 in 2025",color:"#f97316",desc:"Ukraine lowered mobilization age to 25 in 2025. EU simultaneously announced restricting travel protections for Ukrainian men abroad — at Kyiv's request — to reduce evasion."},
    {icon:"🤝",label:"POW exchange Jun 29",val:"160 home",change:"Largest recent exchange",color:"#22c55e",desc:"160 Ukrainian POWs returned Jun 29 — soldiers, sailors, National Guard. Largest single exchange in recent months."},
  ];
  return <div>
    <Hero t={t} style={{borderLeft:"4px solid #f97316"}}>
      <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>👥 Manpower — Jun 2026</div>
      <Grid2 t={t} items={[
        {val:"~40K",label:"RU losses per month",sub:"First time exceeding recruitment",color:"#ef4444"},
        {val:"~35K",label:"RU recruited per month",sub:"~5K/month net deficit",color:"#f97316"},
        {val:"~194K",label:"UA dead or missing",sub:"UALosses project Jun 2026",color:"#5b8ec8"},
        {val:"2.8M+",label:"RU workforce removed",sub:"Dead + wounded + emigrated",color:"#eab308"},
      ]}/>
    </Hero>
    <ST t={t} color="#ef4444">🇷🇺 Russian Manpower Crisis</ST>
    {RU.map((m,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${m.color}`}}><div style={{padding:"11px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18}}>{m.icon}</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:t.text}}>{m.label}</div><div style={{fontSize:11,color:m.color,fontWeight:600}}>{m.change}</div></div><div style={{fontSize:18,fontWeight:800,color:m.color,flexShrink:0}}>{m.val}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{m.desc}</div></div></Card>)}
    <ST t={t} color="#5b8ec8">🇺🇦 Ukrainian Manpower</ST>
    {UA.map((m,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${m.color}`}}><div style={{padding:"11px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18}}>{m.icon}</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:t.text}}>{m.label}</div><div style={{fontSize:11,color:m.color,fontWeight:600}}>{m.change}</div></div><div style={{fontSize:18,fontWeight:800,color:m.color,flexShrink:0}}>{m.val}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{m.desc}</div></div></Card>)}
    <Note t={t} color="#f97316">Ethnic minorities — Buryats, Kalmyks, Tuvans, Chukchi, Nenets — are overrepresented in Russian casualties. Men from Russia's Far North, Far East, and Siberia bear disproportionate losses. The disparity reflects deliberate deployment of ethnic minority units to the most exposed frontline positions (BBC/Mediazona, Jun 2026).</Note>
  </div>;
}

const UKRAINE_TABS=[{id:"overview",label:"📊 Overview"},{id:"losses",label:"⚖️ Losses"},{id:"manpower",label:"👥 Manpower"},{id:"frontline",label:"🎯 Frontline"},{id:"southernfront",label:"🌊 Southern Front"},{id:"strikewar",label:"💥 Strike War"},{id:"economy",label:"💸 RU Economy"},{id:"uaindustry",label:"🏭 UA Industry"},{id:"intel",label:"🔍 Intel"},{id:"diploallies",label:"🗣️ Diplomacy & Allies"},{id:"analysts",label:"📺 Analysts"},{id:"belarus",label:"🇧🇾 Belarus Axis"}];
const WEEK_UPDATES=NEWS.filter(n=>n.conflictId==="ukraine").slice(0,5).map(n=>`${n.icon} ${n.publishedAt}: ${n.headline}`);

function UkraineSection({t,initialTab}){const[tab,setTab]=useState(initialTab??"overview");useEffect(()=>{if(initialTab)setTab(initialTab);},[initialTab]);return <div><div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>{UKRAINE_TABS.map(tb=><button key={tb.id} onClick={()=>setTab(tb.id)} style={{padding:"5px 10px",fontSize:11,borderRadius:16,cursor:"pointer",fontFamily:FONT,fontWeight:600,background:tab===tb.id?"#5b8ec8":"none",color:tab===tb.id?"#fff":t.sub,border:`1px solid ${tab===tb.id?"#5b8ec8":t.border}`}}>{tb.label}</button>)}</div>{tab==="belarus"&&<div><div style={{fontSize:11,color:t.sub,lineHeight:1.6,marginBottom:12,paddingLeft:9,borderLeft:`3px solid #f97316`}}>Belarus is treated here as the northern axis of the Russia-Ukraine war — a co-belligerent supplying territory, basing and nuclear hosting rather than troops. Consolidated from its former standalone section.</div><BelarusSection t={t}/></div>}{tab==="overview"&&<div>
<Hero t={t}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}><span style={{width:8,height:8,borderRadius:"50%",background:"#ef4444",display:"inline-block",animation:"blink 1.4s ease-in-out infinite",flexShrink:0}}/><span style={{fontSize:11,color:"rgba(255,255,255,.45)",letterSpacing:".08em",textTransform:"uppercase"}}>War Day {UA_WAR_DAY} · Live</span><span style={{marginLeft:"auto",fontSize:11,color:"rgba(255,255,255,.35)"}}>{REPORT_NOW.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</span></div><div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".05em"}}>🇷🇺 Total Russian Personnel Losses</div><div style={{fontSize:42,fontWeight:800,letterSpacing:-2,lineHeight:1,fontVariantNumeric:"tabular-nums"}}>{LOSSES.ukraine[0].total}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",marginTop:14,paddingTop:12,borderTop:"1px solid rgba(255,255,255,.08)"}}><div><div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Today</div><div style={{fontSize:22,fontWeight:800,color:"#ff9500",fontVariantNumeric:"tabular-nums"}}>{LOSSES.ukraine[0].todayChange}</div></div><div><div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>7-Day Avg</div><div style={{fontSize:20,fontWeight:700,color:"#fbbf24",fontVariantNumeric:"tabular-nums"}}>~{Math.round(CASUALTIES.slice(-7).reduce((a,b)=>a+b.value,0)/7).toLocaleString()}</div></div><div><div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Since Feb 22</div><div style={{fontSize:15,fontWeight:700,color:"rgba(255,255,255,.6)",marginTop:3}}>Day {UA_WAR_DAY}</div></div></div></Hero><Grid2 t={t} items={[{icon:"🛸",label:"UAVs Destroyed Today",val:LOSSES.ukraine[6].todayChange,sub:"cumulative "+LOSSES.ukraine[6].total,color:"#5b8ec8"},{icon:"☠️",label:"Personnel Today",val:LOSSES.ukraine[0].todayChange,sub:"cumulative "+LOSSES.ukraine[0].total,color:"#8b5cf6"},{icon:"🪖",label:"Tanks Today",val:LOSSES.ukraine[1].todayChange,sub:"cumulative "+LOSSES.ukraine[1].total,color:"#f97316"},{icon:"💥",label:"Artillery Today",val:LOSSES.ukraine[3].todayChange,sub:"cumulative "+LOSSES.ukraine[3].total,color:"#ef4444"}]}/><ST t={t}>📈 14-Day Casualty Trend</ST><Card t={t} style={{padding:"12px 8px 6px"}}><div style={{height:110}}><ResponsiveContainer width="100%" height="100%"><AreaChart data={CASUALTIES.slice(-14)} margin={{top:4,right:8,left:-18,bottom:0}}><defs><linearGradient id="g_ovCas" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="date" tick={{fontSize:8,fill:t.sub}} tickLine={false} axisLine={false} interval={2}/><YAxis tick={{fontSize:8,fill:t.sub}} tickLine={false} axisLine={false} width={26}/><Tooltip content={<TT/>}/><Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} fill="url(#g_ovCas)"/></AreaChart></ResponsiveContainer></div><div style={{fontSize:10,color:t.sub,padding:"2px 10px 6px",textAlign:"right"}}>Full history & 7-day average: Trends → Ukraine</div></Card>
<ST t={t}>📊 Two Curves That Define 2026</ST>
<Card t={t} style={{padding:"12px 8px 8px"}}>
  <div style={{fontSize:11,fontWeight:700,color:t.text,padding:"0 8px 6px"}}>Russian losses per month <span style={{color:t.sub,fontWeight:400}}>· holding above 36,000</span></div>
  <div style={{height:120}}><ResponsiveContainer width="100%" height="100%"><ComposedChart data={HISTORICAL.ruCasualtiesMonthly} margin={{top:4,right:8,left:-14,bottom:0}}><XAxis dataKey="m" tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false}/><YAxis tick={{fontSize:8,fill:t.sub}} tickLine={false} axisLine={false} domain={[30000,40000]} width={34} tickFormatter={v=>(v/1000)+"k"}/><Tooltip content={<TT/>}/><Bar dataKey="v" fill="#ef4444" radius={[3,3,0,0]} name="RU losses"/></ComposedChart></ResponsiveContainer></div>
  <div style={{fontSize:11,fontWeight:700,color:t.text,padding:"10px 8px 6px",borderTop:`.5px solid ${t.sep}`,marginTop:6}}>Russian refining knocked offline <span style={{color:t.sub,fontWeight:400}}>· % of capacity, deep-strike campaign</span></div>
  <div style={{height:120}}><ResponsiveContainer width="100%" height="100%"><AreaChart data={HISTORICAL.refineryOffline} margin={{top:4,right:8,left:-14,bottom:0}}><defs><linearGradient id="g_ovRef" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/><stop offset="95%" stopColor="#f97316" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="m" tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false}/><YAxis tick={{fontSize:8,fill:t.sub}} tickLine={false} axisLine={false} width={30} tickFormatter={v=>v+"%"}/><Tooltip content={<TT/>}/><Area type="monotone" dataKey="v" stroke="#f97316" strokeWidth={2} fill="url(#g_ovRef)" name="Refining offline %"/></AreaChart></ResponsiveContainer></div>
  <div style={{fontSize:10,color:t.sub,padding:"6px 10px 2px",textAlign:"right"}}>Deeper energy & attrition trends: RU Economy tab · Trends → Ukraine</div>
</Card>
<ST t={t}>🗺️ Frontline Hotspots</ST><Card t={t}>{SECTORS.filter(sec=>sec.status==="CRITICAL"||sec.status==="DISPUTED CLAIM").map((sec,i,a)=><Row key={sec.name} t={t} last={i===a.length-1}><span style={{fontSize:16,flexShrink:0}}>{sec.icon}</span><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}><span style={{fontSize:12.5,fontWeight:700,color:t.text}}>{sec.name}</span><span style={{fontSize:9,fontWeight:800,color:sec.color,background:sec.color+"18",border:`1px solid ${sec.color}40`,borderRadius:20,padding:"1px 7px"}}>{sec.status}</span></div><div style={{fontSize:11.5,color:t.sub,lineHeight:1.5}}>{sec.detail}</div></div></Row>)}<div style={{padding:"8px 14px",fontSize:10.5,color:t.sub,fontStyle:"italic",borderTop:`.5px solid ${t.sep}`}}>Full 6-sector map with all statuses: Frontline tab</div></Card>
<ST t={t}>📋 This Week in the War</ST><Card t={t}>{WEEK_UPDATES.map((u,i)=><Row key={i} t={t} last={i===WEEK_UPDATES.length-1}><div style={{fontSize:12.5,color:t.text,lineHeight:1.55}}>{u}</div></Row>)}</Card><div style={{background:t.isDark?"linear-gradient(135deg,#091321,#0d1f38)":"linear-gradient(135deg,#eef3fc,#e6edf9)",border:"1px solid rgba(59,130,246,0.25)",borderLeft:"4px solid #5b8ec8",borderRadius:14,padding:"14px 16px",marginBottom:16}}>
  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
    <span style={{width:8,height:8,borderRadius:"50%",background:"#22c55e",display:"inline-block",flexShrink:0}}/>
    <span style={{fontSize:11,fontWeight:700,color:t.text,letterSpacing:".04em"}}>🤖 AI DAILY — UKRAINE ANALYSIS</span>
    <span style={{marginLeft:"auto",fontSize:10,color:t.sub}}>{new Date(UKRAINE_BRIEFING.generatedAt).toLocaleDateString([],{month:"short",day:"numeric"})}</span>
  </div>
  <div style={{fontSize:12.5,color:t.text,lineHeight:1.6,marginBottom:12}}>{UKRAINE_BRIEFING.summary}</div>
  <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:12}}>
    {UKRAINE_BRIEFING.assessment.map((a,i)=><div key={i} style={{display:"flex",gap:8,fontSize:11.5}}>
      <span style={{color:"#5b8ec8",fontWeight:700,minWidth:78,flexShrink:0}}>{a.cat}</span>
      <span style={{color:t.sub,lineHeight:1.5}}>{a.text}</span>
    </div>)}
  </div>
  <div style={{fontSize:11,color:t.sub,fontStyle:"italic",paddingTop:10,borderTop:`1px solid ${t.isDark?"rgba(255,255,255,.08)":"rgba(0,0,0,.08)"}`}}>
    👁 <strong style={{color:t.text,fontStyle:"normal"}}>Watch: </strong>{UKRAINE_BRIEFING.watch}
  </div>
</div>
</div>}{tab==="losses"&&<LossesTab t={t}/>}{tab==="frontline"&&<FrontlineTab t={t}/>}{tab==="diploallies"&&<DiploAlliesTab t={t}/>}{tab==="southernfront"&&<SouthernFrontTab t={t}/>}{tab==="strikewar"&&<StrikeWarTab t={t}/>}{tab==="economy"&&<EconomyTab t={t}/>}{tab==="manpower"&&<ManpowerTab t={t}/>}{tab==="intel"&&<IntelTab t={t}/>}
    {tab==="uaindustry"&&<div>
      <Hero t={t} color="#eab308"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#fde68a",marginBottom:6}}>🏭 UKRAINE'S DEFENSE INDUSTRY</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>From aid recipient to arsenal: roughly half of Ukraine's ammunition is now domestically made, its drone ecosystem out-produces both NATO and Russia in unit terms, and Kyiv has begun exporting — including to the countries that arm it.</div></Hero>
      <Grid2 t={t} items={[
        {icon:"🛸",label:"Drone output",val:"100k+/mo",sub:"120+ companies, all classes incl. interceptors",color:"#22c55e"},
        {icon:"💥",label:"155mm unit cost",val:"~$1,500",sub:"Undercuts European rounds 3-5×",color:"#eab308"},
        {icon:"🚀",label:"Flamingo FP-5",val:"Fielded",sub:"3,000km-class cruise missile; Volgograd strike Jun 27",color:"#f97316"},
        {icon:"📜",label:"Patriot license",val:"Jul 8",sub:"Trump grants UA the right to build PAC-3s; no timeline",color:"#22c55e"},
      ]}/>
      <ST t={t} color="#eab308">📋 What Kyiv Now Builds</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Deep-strike weapons</span> — FP-5 Flamingo cruise missiles (Volgograd plant strike, Jun 27), long-range drones behind the refinery campaign that has Russian refining at 42.47% of capacity, and naval drones that forced the Black Sea Fleet east. The St. Petersburg/Kronstadt strike (Jul 3-4) was flown almost entirely on domestic airframes.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Artillery & armor</span> — Bohdan SPH at 20+/month (18 built for Denmark in 8 weeks), 152mm and 155mm shell lines (the latter ~$1,500/round), with Rheinmetall JV plants localizing NATO-caliber production in-country.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>The export turn</span> — Denmark-model contracts (frozen-asset profits funding UA production for UA use), propellant JV with D&M in the US (production from mid-2026), and EW systems like Sky Fortress marketed at a fraction of Western cost. RUSI's read: Ukraine's industry is Europe's fastest path to closing its own production gap.</div>
        <div><span style={{color:t.text,fontWeight:700}}>Constraints</span> — Funding (capacity exceeds contracts), Russian strikes on plants (a propellant facility lost early-war), and energetics inputs shared with the West's own bottleneck (see Great Power Rivalry → Critical Minerals).</div>
      </div></div></Card>
      <Note t={t} color="#eab308">Figures: RUSI, Militarnyi, UA GenStaff and program disclosures; production rates are announced capacities, not audited output. Cross-reference: Great Power Rivalry → Defense Industry & Arms Flow, Drone War → Cost.</Note>
    </div>}
    {tab==="analysts"&&<AnalystsTab t={t}/>}</div>;}

// ── SCS Section ───────────────────────────────────────────────────────────────────
const SCS_TABS=[{id:"overview",label:"🗺️ Overview"},{id:"incidents",label:"⚠️ Incidents"},{id:"military",label:"⚔️ Military"},{id:"law",label:"⚖️ Law & Claims"},{id:"taiwan",label:"🌊 Taiwan Strait"}];
const SCS_CLAIMANTS=[{flag:"🇨🇳",name:"China (PRC)",claim:"~90% via Nine-Dash Line",color:"#ef4444",note:"Operates largest artificial island militarization campaign. 7 reefs fortified. Coast Guard Law (2021) permits use of force on foreign vessels."},{flag:"🇵🇭",name:"Philippines",claim:"Exclusive Economic Zone (EEZ)",color:"#5b8ec8",note:"Won UNCLOS arbitration in 2016. Faces near-daily Chinese water cannon attacks at Second Thomas Shoal. US MDT invoked since 2024."},{flag:"🇻🇳",name:"Vietnam",claim:"Paracel & Spratly Islands",color:"#ef4444",note:"Claims historic rights. Operates 48+ features. Significant oil and gas interests."},{flag:"🇲🇾",name:"Malaysia",claim:"Part of Spratly Islands",color:"#22c55e",note:"Quiet but active claimant. Operates Swallow Reef airstrip. Relies on ASEAN diplomacy."},{flag:"🇧🇳",name:"Brunei",claim:"Louisa Reef",color:"#eab308",note:"Narrowest claim. Does not occupy any feature. Relies on bilateral agreements."},{flag:"🇹🇼",name:"Taiwan (ROC)",claim:"Same as PRC (historical)",color:"#06b6d4",note:"Occupies Itu Aba / Taiping Island. Largest natural island in Spratlys."}];
const SCS_FORCES=[{flag:"🇨🇳",name:"China PLA Navy",strength:"Dominant",color:"#ef4444",assets:["2 carrier battle groups (Liaoning, Shandong) rotate through SCS","7 militarized artificial islands with airstrips and missile batteries","Coast Guard largest in world — 150+ vessels >1,000 tons","H-6K bombers with YJ-12 ASMs based at Woody Island","DF-21D/DF-26 carrier killers with 1,500–4,000km range"]},{flag:"🇺🇸",name:"US 7th Fleet",strength:"Power Projection",color:"#5b8ec8",assets:["USS Ronald Reagan CSG (Japan-based) rotates through","Regular B-52H overflights from Guam under FONOP","P-8A Poseidon maritime patrol — near-continuous ISR","FONOP cadence: ~15 operations/year","9 EDCA sites in Philippines (expanded 2026)"]},{flag:"🇵🇭",name:"Philippine Armed Forces",strength:"Limited but Growing",color:"#5b8ec8",assets:["BRP Jose Rizal (guided-missile frigate)","FA-50 light combat aircraft — 12 delivered","HIMARS coastal defense battalion operational 2025","US assistance: $500M+ in FMF since 2022"]}];
const SCS_LEGAL=[{title:"UNCLOS Arbitration — 2016",icon:"⚖️",color:"#22c55e",text:"PCA ruled unanimously in favor of Philippines. China Nine-Dash Line has no legal basis. China response: Null and void."},{title:"Nine-Dash Line (China)",icon:"🇨🇳",color:"#ef4444",text:"China claim to ~90% of the SCS. Originally 11-dash (1947), revised to 9 (1953). No clear legal basis — China argues historic rights which the tribunal rejected."},{title:"US-Philippines MDT (1951)",icon:"🤝",color:"#5b8ec8",text:"Article V: attack on either party triggers mutual defense obligations. US explicitly clarified MDT covers Philippine armed forces, public vessels, and aircraft in the SCS."},{title:"Chinese Coast Guard Law (2021)",icon:"⚡",color:"#ef4444",text:"Authorizes CCG to use all necessary means including weapons against foreign vessels in waters claimed by China."},{title:"ASEAN Code of Conduct Talks",icon:"🌏",color:"#eab308",text:"Negotiations since 2002 for a binding COC. Still not concluded. China pushing for exclusion of non-ASEAN parties — seen as delaying tactic."}];

function SCSSection({t,initialTab}){const[tab,setTab]=useState(initialTab??"overview");useEffect(()=>{if(initialTab)setTab(initialTab);},[initialTab]);const conflict=CONFLICTS.find(c=>c.id==="south-china-sea");const losses=LOSSES["south-china-sea"];const scsEvents=EVENTS["south-china-sea"];const news=NEWS.filter(n=>n.conflictId==="south-china-sea");return <div><div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>{SCS_TABS.map(tb=><button key={tb.id} onClick={()=>setTab(tb.id)} style={{padding:"5px 10px",fontSize:11,borderRadius:16,cursor:"pointer",fontFamily:FONT,fontWeight:600,background:tab===tb.id?"#06b6d4":"none",color:tab===tb.id?"#fff":t.sub,border:`1px solid ${tab===tb.id?"#06b6d4":t.border}`}}>{tb.label}</button>)}</div>{tab==="overview"&&<div><Hero t={t} style={{borderLeft:"4px solid #06b6d4"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:28}}>🏝️</span><div><div style={{fontSize:16,fontWeight:800,color:"#fff"}}>South China Sea</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}><Pill label="FLASHPOINT" color="#f97316"/><Pill label="Maritime Dispute" color="#06b6d4"/></div></div></div><div style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"9px 12px",fontSize:12,color:"rgba(255,255,255,.75)",lineHeight:1.6,marginBottom:12}}>{conflict?.summary}</div><Grid2 t={t} items={losses.slice(0,4).map(l=>({val:l.total,label:l.category,sub:l.description??"",color:l.color??"#06b6d4"}))}/></Hero><ST t={t} color="#06b6d4">🌏 Claimant Nations</ST>{SCS_CLAIMANTS.map((c,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${c.color}`}}><div style={{padding:"10px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18}}>{c.flag}</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:t.text}}>{c.name}</div><div style={{fontSize:10,color:t.sub}}>{c.claim}</div></div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{c.note}</div></div></Card>)}{news.map(item=><Card key={item.id} t={t} style={{borderLeft:`4px solid ${item.impactColor}`}}><div style={{padding:"12px 14px"}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6,flexWrap:"wrap"}}><Pill label={item.conflict} color={item.conflictColor}/><span style={{fontSize:10,color:t.sub}}>{item.publishedAt}</span></div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:6}}>{item.headline}</div>{item.bullets.map((b,i)=><div key={i} style={{display:"flex",gap:6,fontSize:12,color:t.sub,marginBottom:4,lineHeight:1.5}}><span style={{color:item.impactColor,flexShrink:0}}>▸</span>{b}</div>)}<div style={{fontSize:11,color:item.impactColor,fontWeight:600,marginTop:6}}>{item.impact}</div></div></Card>)}</div>}{tab==="incidents"&&<div><Hero t={t} style={{borderLeft:"4px solid #ef4444"}}><div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>⚠️ SCS Incidents — 2024–2026</div><Grid2 t={t} items={[{val:"47+",label:"Incidents YTD 2026",sub:"vs 32 same period 2025",color:"#ef4444"},{val:"18",label:"Jun 2026",sub:"+50% vs Jun 2025",color:"#f97316"},{val:"220+",label:"Militia vessels",sub:"Whitsun Reef Jun 3",color:"#eab308"},{val:"2",label:"Sailors injured",sub:"Jun 24 water cannon",color:"#ef4444"}]}/></Hero><ST t={t}>📅 Key Events Timeline</ST><Card t={t}>{scsEvents.map((ev,i)=><div key={ev.id} style={{display:"flex",gap:12,padding:"11px 14px",borderBottom:i<scsEvents.length-1?`.5px solid ${t.sep}`:0}}><div style={{minWidth:70,fontSize:10,fontWeight:700,color:ev.color,paddingTop:2,flexShrink:0}}>{ev.date}</div><div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:3}}>{ev.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{ev.note}</div></div></div>)}</Card></div>}{tab==="military"&&<div><Hero t={t} style={{borderLeft:"4px solid #8b5cf6"}}><div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>⚔️ Military Balance — Jun 2026</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>China holds the dominant position within the First Island Chain. The US maintains deterrence via carrier strike groups, FONOPs, and expanded Philippine basing access.</div></Hero>{SCS_FORCES.map((f,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${f.color}`}}><div style={{padding:"10px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><span style={{fontSize:20}}>{f.flag}</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:t.text}}>{f.name}</div><Pill label={f.strength} color={f.color}/></div></div>{f.assets.map((a,j)=><div key={j} style={{display:"flex",gap:7,marginBottom:5,fontSize:12,color:t.sub,lineHeight:1.6}}><span style={{color:f.color,fontWeight:700,flexShrink:0}}>▸</span>{a}</div>)}</div></Card>)}</div>}{tab==="law"&&<div><Hero t={t} style={{borderLeft:"4px solid #8b5cf6"}}><div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>⚖️ Legal Framework & Claims</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>The 2016 UNCLOS Tribunal ruled China Nine-Dash Line has no legal basis under international law. China rejects the ruling. The legal battle continues through diplomatic channels.</div></Hero>{SCS_LEGAL.map((item,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${item.color}`}}><div style={{padding:"10px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}><span style={{fontSize:18}}>{item.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text}}>{item.title}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{item.text}</div></div></Card>)}</div>}{tab==="taiwan"&&<div><ConflictOverviewCard conflict={CONFLICTS.find(c=>c.id==="taiwan")} t={t}/><ST t={t}>🌊 Simplified Theater Map</ST><div style={{borderRadius:12,overflow:"hidden",border:`1px solid ${t.border}`,marginBottom:12}}><svg viewBox="0 0 400 240" width="100%" style={{display:"block",background:t.isDark?"#060d1c":"#dae6f5"}}><rect width="400" height="240" fill={t.isDark?"#060d1c":"#c5d8ed"}/><path d="M0,0 L260,0 L260,180 L220,200 L160,220 L80,240 L0,240 Z" fill={t.isDark?"#0e1e35":"#b5c9e0"}/><ellipse cx="300" cy="120" rx="18" ry="38" fill={t.isDark?"#1a3a5c":"#6b99c9"} stroke="#60a5fa" strokeWidth="1.5"/><ellipse cx="340" cy="190" rx="10" ry="22" fill={t.isDark?"#0e1e35":"#b5c9e0"}/><ellipse cx="360" cy="70" rx="12" ry="8" fill={t.isDark?"#0e1e35":"#b5c9e0"}/><text x="320" y="140" fontSize="9" fill="rgba(148,163,184,0.6)" textAnchor="middle">South China Sea</text><text x="265" y="115" fontSize="7" fill="#60a5fa" textAnchor="middle">Taiwan</text><text x="265" y="124" fontSize="7" fill="#60a5fa" textAnchor="middle">Strait</text><line x1="260" y1="82" x2="282" y2="82" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" opacity="0.6"/><line x1="260" y1="158" x2="282" y2="158" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" opacity="0.6"/><circle cx="308" cy="175" r="5" fill="#f97316" opacity="0.8"/><text x="308" y="188" fontSize="7" fill="#f97316" textAnchor="middle">Scarborough</text><text x="300" y="123" fontSize="8" fill="#93c5fd" textAnchor="middle" fontWeight="bold">🇹🇼</text><rect x="5" y="220" width="390" height="16" fill="rgba(0,0,0,0.5)"/><line x1="10" y1="228" x2="25" y2="228" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2"/><text x="29" y="232" fontSize="7" fill="#94a3b8">PLA patrol boundary</text><circle cx="115" cy="228" r="3" fill="#f97316"/><text x="120" y="232" fontSize="7" fill="#94a3b8">Scarborough Shoal (disputed)</text></svg></div><ST t={t}>📡 Intelligence Signals</ST><Card t={t}>{[{icon:"⚡",label:"Current threat level: ELEVATED but stable",text:"PLA continues normalizing military pressure via frequent joint combat readiness patrols across the median line."},{icon:"🚢",label:"Scarborough Shoal floating structure (Jun 2026)",text:"Philippine aerial surveillance identified 6x6m floating platform with antenna inside Scarborough Shoal lagoon."},{icon:"💻",label:"Semiconductor stakes: $1T+ shock risk",text:"Taiwan produces ~90% of world most advanced chips (TSMC ≤3nm). Any conflict or blockade triggers estimated $1T+ global GDP shock."}].map((item,i,a)=><div key={i} style={{display:"flex",gap:10,padding:"11px 14px",borderBottom:i<a.length-1?`.5px solid ${t.sep}`:0}}><span style={{fontSize:20,flexShrink:0}}>{item.icon}</span><div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:3}}>{item.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{item.text}</div></div></div>)}</Card><EventsTimeline t={t} events={EVENTS.taiwan} label="Key Events"/></div>}</div>;}

// ── Theater Sections ──────────────────────────────────────────────────────────────
function RankBar({t,data,field,max,color,accent}){return <Card t={t}><div style={{padding:"10px 14px"}}>
    {data.map((c,i)=>{const v=c[field]||0;return <div key={i} style={{marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3,fontSize:12}}><span style={{color:t.text,fontWeight:600}}>{c.flag} {c.name}</span><span style={{color:c.rank===1?color:t.sub,fontWeight:700}}>{typeof v==="number"?v.toLocaleString():v}</span></div>
      <div style={{height:6,background:t.isDark?"rgba(255,255,255,.08)":"rgba(0,0,0,.08)",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.max(v?3:0,v/max*100)}%`,background:c.rank===1?color:accent,borderRadius:3,transformOrigin:"left",animation:`barGrow .6s cubic-bezier(.22,1,.36,1) ${i*0.04}s both`}}/></div>
    </div>;})}
  </div></Card>;}

function ConflictOverviewCard({conflict,t}){return <Hero t={t} style={{borderLeft:`4px solid ${conflict.statusColor}`}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:28}}>{conflict.icon}</span><div><div style={{fontSize:16,fontWeight:800,color:"#fff",display:"inline-block",animation:"textReveal .45s ease-out both"}}>{conflict.name}</div><Pill label={conflict.status} color={conflict.statusColor}/></div></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}><div><div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>Deaths</div><div style={{fontSize:13,fontWeight:700,color:conflict.statusColor}}>{conflict.deaths}</div></div><div><div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>Displaced</div><div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{conflict.displaced}</div></div></div><div style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"9px 12px",fontSize:12,color:"rgba(255,255,255,.75)",lineHeight:1.6}}>{conflict.summary}</div></Hero>;}

function EventsTimeline({t,events,label}){if(!events?.length)return null;return <><ST t={t}>📅 {label??"Key Events"}</ST><Card t={t}>{events.map((ev,i)=><div key={ev.id} style={{display:"flex",gap:12,padding:"11px 14px",borderBottom:i<events.length-1?`.5px solid ${t.sep}`:0}}><div style={{minWidth:70,fontSize:10,fontWeight:700,color:ev.color,paddingTop:2,flexShrink:0}}>{ev.date}</div><div style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0,alignSelf:"stretch"}}><div style={{width:11,height:11,borderRadius:"50%",background:ev.color,border:`2px solid ${t.card}`,boxShadow:`0 0 0 1.5px ${ev.color}`,marginTop:3,flexShrink:0,zIndex:1}}/>{i<events.length-1&&<div style={{width:2,flex:1,background:t.sep,marginTop:2}}/>}</div><div style={{paddingBottom:i<events.length-1?4:0}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>{ev.isUpcoming&&<Pill label="UPCOMING" color="#5b8ec8"/>}<div style={{fontSize:13,fontWeight:700,color:t.text}}>{ev.label}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{ev.note}</div></div></div>)}</Card></>;}


function TheaterSection({t,conflict}){if(!conflict)return <Skeleton t={t} height={200}/>;return <div><ConflictOverviewCard conflict={conflict} t={t}/><Note t={t} color="#5b8ec8">Detailed section for {conflict.name} coming soon.</Note></div>;}

// ── Theaters Overview ──────────────────────────────────────────────────────────────
function TheatersOverview({t,conflicts,onSelectConflict}){const STATUS_ORDER={"ESCALATING":0,"NEW CIVIL WAR":0,"US INTERVENTION":0,"MoU CRISIS":0,"CO-BELLIGERENT":1,"FLASHPOINT":1,"BLOCKADE":1,"Active":2,"MoU":3,"ELEVATED":4,"Fragile Ceasefire":5};const sorted=[...conflicts].sort((a,b)=>(STATUS_ORDER[a.status]??9)-(STATUS_ORDER[b.status]??9));const SECTION_MAP={"south-china-sea":"scs","taiwan":"scs","caribbean":"venezuela"};return <div><div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:14}}>🌍 {conflicts.length} Active Theaters — Tap to Deep Dive</div><div style={{display:t.isLandscape?"grid":"block",gridTemplateColumns:t.isLandscape?"1fr 1fr":undefined,gap:t.isLandscape?12:0}}>{sorted.map((c,ci)=>{const sectionId=SECTION_MAP[c.id]??c.id;return <button key={c.id} className="theater-card" onPointerDown={e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty("--px",`${((e.clientX-r.left)/r.width*100)}%`);e.currentTarget.style.setProperty("--py",`${((e.clientY-r.top)/r.height*100)}%`);}} onClick={()=>onSelectConflict(sectionId)} style={{display:"block",width:"100%",background:t.card,borderTop:`1px solid ${t.border}`,borderRight:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,borderLeft:`4px solid ${c.statusColor}`,borderRadius:14,padding:"16px 18px",marginBottom:12,cursor:"pointer",fontFamily:FONT,textAlign:"left",animation:`riseIn .3s ease-out ${ci*0.05}s both`}}><div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:10}}><span style={{fontSize:28,flexShrink:0,lineHeight:1}}>{c.icon}</span><div style={{flex:1,minWidth:0}}><div style={{fontSize:15,fontWeight:800,color:t.text,lineHeight:1.2,marginBottom:4}}>{c.name}</div><div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}><span style={{background:c.statusColor+"22",border:`1px solid ${c.statusColor}55`,borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:700,color:c.statusColor,textTransform:"uppercase"}}>{c.status}</span><span style={{fontSize:11,color:t.sub}}>{c.region}</span></div></div><span style={{fontSize:16,color:t.sub,flexShrink:0,marginTop:4}}>→</span></div><div style={{display:"flex",gap:20,marginBottom:10}}><div><div style={{fontSize:10,color:t.sub,marginBottom:1}}>Deaths</div><div style={{fontSize:13,fontWeight:700,color:c.statusColor}}>{c.deaths}</div></div><div><div style={{fontSize:10,color:t.sub,marginBottom:1}}>Displaced</div><div style={{fontSize:13,fontWeight:700,color:t.text}}>{c.displaced}</div></div>{c.warDay&&<div><div style={{fontSize:10,color:t.sub,marginBottom:1}}>War day</div><div style={{fontSize:13,fontWeight:700,color:t.text}}>{c.warDay}</div></div>}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.6,background:t.isDark?"rgba(255,255,255,.03)":"rgba(0,0,0,.03)",borderRadius:8,padding:"9px 11px"}}>{c.summary}</div><div style={{marginTop:10,fontSize:11,color:"#5b8ec8",fontWeight:600}}>Open Deep Dive →</div></button>;})}</div>
  <div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",margin:"20px 0 14px"}}>🧭 Cross-Theater Sections — Tap to Deep Dive</div>
  <div style={{display:t.isLandscape?"grid":"block",gridTemplateColumns:t.isLandscape?"1fr 1fr":undefined,gap:t.isLandscape?12:0}}>
  {[
    {id:"dronewar",name:"Drone War Dashboard",icon:"🛸",status:"WEEKLY TRACKER",statusColor:"#22c55e",region:"Ukraine / Russia",s1l:"RU launch rate",s1v:"~5k/mo",s2l:"UA output",s2v:"100k+/mo",summary:"Nightly launch/intercept data, saturation model, strike log, cost race, AD systems, and drone asset library. Current through Jul 8."},
    {id:"usmil",name:"Great Power Rivalry",icon:"⚔️",status:"REFERENCE",statusColor:"#5b8ec8",region:"US / China / Russia",s1l:"Tabs",s1v:"14",s2l:"Focus",s2v:"Mil balance",summary:"Power comparison, rankings, naval pipeline, 5th-gen fighters, space & counterspace, critical minerals, arms flow, Arctic, and the defense-industrial production race."},
    {id:"nuclear",name:"Strategic & Hybrid",icon:"☢️",status:"POST-TREATY",statusColor:"#ef4444",region:"Global",s1l:"New START",s1v:"Expired",s2l:"Iran MoU",s2v:"Aug 16",summary:"Active vectors, global arsenals, delivery-system triad modernization, treaty architecture after New START's Feb 2026 lapse — plus Cyber & Hybrid: undersea cables, electronic warfare, and the grey-zone playbook."},
  ].map((c,ci)=><button key={c.id} className="theater-card" onPointerDown={e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty("--px",`${((e.clientX-r.left)/r.width*100)}%`);e.currentTarget.style.setProperty("--py",`${((e.clientY-r.top)/r.height*100)}%`);}} onClick={()=>onSelectConflict(c.id)} style={{display:"block",width:"100%",background:t.card,borderTop:`1px solid ${t.border}`,borderRight:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,borderLeft:`4px solid ${c.statusColor}`,borderRadius:14,padding:"16px 18px",marginBottom:12,cursor:"pointer",fontFamily:FONT,textAlign:"left",animation:`riseIn .3s ease-out ${ci*0.05}s both`}}><div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:10}}><span style={{fontSize:28,flexShrink:0,lineHeight:1}}>{c.icon}</span><div style={{flex:1,minWidth:0}}><div style={{fontSize:15,fontWeight:800,color:t.text,lineHeight:1.2,marginBottom:4}}>{c.name}</div><div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}><span style={{background:c.statusColor+"22",border:`1px solid ${c.statusColor}55`,borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:700,color:c.statusColor,textTransform:"uppercase"}}>{c.status}</span><span style={{fontSize:11,color:t.sub}}>{c.region}</span></div></div><span style={{fontSize:16,color:t.sub,flexShrink:0,marginTop:4}}>→</span></div><div style={{display:"flex",gap:20,marginBottom:10}}><div><div style={{fontSize:10,color:t.sub,marginBottom:1}}>{c.s1l}</div><div style={{fontSize:13,fontWeight:700,color:c.statusColor}}>{c.s1v}</div></div><div><div style={{fontSize:10,color:t.sub,marginBottom:1}}>{c.s2l}</div><div style={{fontSize:13,fontWeight:700,color:t.text}}>{c.s2v}</div></div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.6,background:t.isDark?"rgba(255,255,255,.03)":"rgba(0,0,0,.03)",borderRadius:8,padding:"9px 11px"}}>{c.summary}</div><div style={{marginTop:10,fontSize:11,color:"#5b8ec8",fontWeight:600}}>Open Deep Dive →</div></button>)}
  </div></div>;}

// ── Today View ─────────────────────────────────────────────────────────────────────
const HISTORICAL={
  ruCasualtiesCumulative:[{m:"Jan",v:1242000},{m:"Feb",v:1278000},{m:"Mar",v:1315000},{m:"Apr",v:1351000},{m:"May",v:1387000},{m:"Jun",v:1403550}],
  ruCasualtiesMonthly:[{m:"Jan",v:36000},{m:"Feb",v:36000},{m:"Mar",v:37000},{m:"Apr",v:36000},{m:"May",v:36000},{m:"Jun",v:38500}],
  refineryOffline:[{m:"Jan",v:8},{m:"Feb",v:14},{m:"Mar",v:19},{m:"Apr",v:25},{m:"May",v:38},{m:"Jun",v:40}],
  ruTerritoryKm2:[{m:"Jan",v:18},{m:"Feb",v:24},{m:"Mar",v:31},{m:"Apr",v:22},{m:"May",v:16},{m:"Jun",v:11}],
  deepStrikes:[{m:"Jan",v:9},{m:"Feb",v:14},{m:"Mar",v:18},{m:"Apr",v:22},{m:"May",v:31},{m:"Jun",v:34}],
  scsIncidents:[{m:"Jan",v:6},{m:"Feb",v:11},{m:"Mar",v:18},{m:"Apr",v:27},{m:"May",v:38},{m:"Jun",v:47}],
  boatStrikeDeaths:[{m:"Jan",v:24},{m:"Feb",v:58},{m:"Mar",v:97},{m:"Apr",v:142},{m:"May",v:188},{m:"Jun",v:221}],
  iranTensionEvents:[{m:"Jan",v:3},{m:"Feb",v:9},{m:"Mar",v:14},{m:"Apr",v:7},{m:"May",v:4},{m:"Jun",v:11}],
  hormuzDisruptionDays:[{m:"Jan",v:0},{m:"Feb",v:2},{m:"Mar",v:18},{m:"Apr",v:5},{m:"May",v:1},{m:"Jun",v:4}],
  natoDefenseSpendPctGDP:[{m:"Jan",v:1.9},{m:"Feb",v:2.0},{m:"Mar",v:2.1},{m:"Apr",v:2.2},{m:"May",v:2.3},{m:"Jun",v:2.4}],
  plaTaiwanStraitIncidents:[{m:"Jan",v:18},{m:"Feb",v:22},{m:"Mar",v:25},{m:"Apr",v:31},{m:"May",v:36},{m:"Jun",v:40}],
  oilPriceBrent:[{m:"Jan",v:61},{m:"Feb",v:72},{m:"Mar",v:118},{m:"Apr",v:92},{m:"May",v:82},{m:"Jun",v:74}],
  gazaCasualtiesSinceCeasefire:[{m:"Jan",v:451},{m:"Apr",v:800},{m:"Jun",v:981},{m:"Jul",v:1144}],
  lebanonCasualties:[{m:"Mar 2",v:0},{m:"Apr 1",v:1318},{m:"May 1",v:2618},{m:"Jul 5",v:4304}],
  dprkCasualties:[{m:"Apr '25",v:6000},{m:"Jun '26",v:7000}],
};

function TrendChart({t,data,color,label,unit,desc,area}){
  const Chart=area?AreaChart:LineChart;
  return <Card t={t} style={{padding:"12px 8px 8px"}}>
    <div style={{padding:"0 8px 6px",display:"flex",alignItems:"baseline",justifyContent:"space-between"}}>
      <div style={{fontSize:12,fontWeight:700,color:t.text}}>{label}</div>
      <div style={{fontSize:10,color:t.sub}}>{unit}</div>
    </div>
    <div style={{height:140}}>
      <ResponsiveContainer width="100%" height="100%">
        <Chart data={data} margin={{top:4,right:8,left:-12,bottom:0}}>
          <defs><linearGradient id={`g_${label.replace(/[^a-z]/gi,"")}`} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={color} stopOpacity={0.3}/><stop offset="95%" stopColor={color} stopOpacity={0}/></linearGradient></defs>
          <XAxis dataKey="m" tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false}/>
          <YAxis tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false} width={38} tickFormatter={v=>v>=1000?`${(v/1000).toFixed(0)}k`:v}/>
          <Tooltip contentStyle={{background:t.isDark?"#101d30":"#fff",border:`1px solid ${t.border}`,borderRadius:8,fontSize:12}} labelStyle={{color:t.sub}}/>
          {area?<Area type="monotone" dataKey="v" stroke={color} fill={`url(#g_${label.replace(/[^a-z]/gi,"")})`} strokeWidth={2}/>:<Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={{r:2.5,fill:color}}/>}
        </Chart>
      </ResponsiveContainer>
    </div>
    {desc&&<div style={{fontSize:11,color:t.sub,lineHeight:1.5,padding:"6px 8px 2px"}}>{desc}</div>}
  </Card>;
}

const BALLISTIC_INTERCEPTS=[
  {label:"June (month)",n:54,downed:14,src:"CSIS"},
  {label:"Jul 5-6 Kyiv",n:23,downed:0,src:"CSIS/UA AF"},
  {label:"Jul 7 Kyiv",n:5,downed:0,src:"UA AF"},
  {label:"Jul 8 Odesa",n:2,downed:0,src:"UA AF"},
  {label:"Jul 10-11 Kyiv",n:6,downed:0,src:"UA AF"},
  {label:"Jul 13-14 Kyiv",n:8,downed:5,src:"UA AF"},
];
function TrendsView({t}){
  const[ttab,setTtab]=useState("ukraine");
  const TT=[{id:"ukraine",label:"🇺🇦 Ukraine"},{id:"iranenergy",label:"☢️ Iran & Energy"},{id:"global",label:"🌏 Indo-Pacific & Global"},{id:"crosstheater",label:"🌐 Cross-Theater"},{id:"hifreq",label:"📡 High-Frequency"}];
  const TENSION_MONTHS=HISTORICAL.iranTensionEvents.map(d=>d.m);
  const toDelta=(series)=>series.map((d,i)=>i===0?d.v:d.v-series[i-1].v);
  const normalize=(arr)=>{const mx=Math.max(...arr,1);return arr.map(v=>Math.round(100*Math.max(0,v)/mx));};
  const tIran=normalize(HISTORICAL.iranTensionEvents.map(d=>d.v));
  const tPla=normalize(toDelta(HISTORICAL.plaTaiwanStraitIncidents));
  const tScs=normalize(toDelta(HISTORICAL.scsIncidents));
  const tBoat=normalize(toDelta(HISTORICAL.boatStrikeDeaths));
  const TENSION_INDEX=TENSION_MONTHS.map((m,i)=>({m,v:Math.round((tIran[i]+tPla[i]+tScs[i]+tBoat[i])/4)}));
  const last=(a)=>a[a.length-1].v, prev=(a)=>a[a.length-2].v;
  const KPIS=[
    {label:"RU casualties/mo",v:"~"+(last(HISTORICAL.ruCasualtiesMonthly)/1000).toFixed(1)+"k",d:last(HISTORICAL.ruCasualtiesMonthly)-prev(HISTORICAL.ruCasualtiesMonthly),fmt:"abs",color:"#ef4444"},
    {label:"RU gains km²/mo",v:"~"+last(HISTORICAL.ruTerritoryKm2),d:last(HISTORICAL.ruTerritoryKm2)-prev(HISTORICAL.ruTerritoryKm2),fmt:"abs",color:"#eab308"},
    {label:"RU refining offline",v:"~"+last(HISTORICAL.refineryOffline)+"%",d:last(HISTORICAL.refineryOffline)-prev(HISTORICAL.refineryOffline),fmt:"pt",color:"#22c55e"},
    {label:"Brent crude",v:"$"+last(HISTORICAL.oilPriceBrent),d:last(HISTORICAL.oilPriceBrent)-prev(HISTORICAL.oilPriceBrent),fmt:"usd",color:"#f97316"},
    {label:"NATO avg %GDP",v:last(HISTORICAL.natoDefenseSpendPctGDP)+"%",d:+(last(HISTORICAL.natoDefenseSpendPctGDP)-prev(HISTORICAL.natoDefenseSpendPctGDP)).toFixed(1),fmt:"pt",color:"#5b8ec8"},
    {label:"PLA Taiwan incidents/mo",v:last(HISTORICAL.plaTaiwanStraitIncidents),d:last(HISTORICAL.plaTaiwanStraitIncidents)-prev(HISTORICAL.plaTaiwanStraitIncidents),fmt:"abs",color:"#ef4444"},
  ];
  const dwRecent=DW_DAILY.slice(-14).map(d=>({m:d.date,launched:d.ru_d+d.ru_m,downed:d.ru_int}));
  const dwSplit=DW_DAILY.slice(-14).map(d=>({m:d.date,drones:d.ru_d,missiles:d.ru_m}));
  const pwData=DW_DAILY.slice(-14).map(d=>({m:d.date,v:d.pw_gwh}));
  const d7=DW_DAILY.slice(-7);
  const DIG={
    launched:d7.reduce((a,b)=>a+b.ru_d+b.ru_m,0),
    missiles:d7.reduce((a,b)=>a+b.ru_m,0),
    downed:d7.reduce((a,b)=>a+b.ru_int,0),
    leakers:d7.reduce((a,b)=>a+b.ru_thru,0),
    alertAvg:(d7.reduce((a,b)=>a+b.alert_h,0)/7).toFixed(1),
    span:d7[0].date+"–"+d7[6].date};
  DIG.rate=Math.round(100*DIG.downed/Math.max(1,DIG.launched));
  const dailyCas=CASUALTIES.map(d=>({m:d.date,v:d.value}));
  const casMA=dailyCas.map((d,i)=>({...d,ma:i>=6?Math.round(dailyCas.slice(i-6,i+1).reduce((a,b)=>a+b.v,0)/7):null}));
  const costPerKm=HISTORICAL.ruTerritoryKm2.map((d,i)=>({m:d.m,v:Math.round(HISTORICAL.ruCasualtiesMonthly[i].v/Math.max(1,d.v))}));
  return <div style={{padding:"16px 16px 0",animation:"fadeIn .25s ease-out"}}>
    <div style={{background:t.isDark?"linear-gradient(135deg,#08111f,#0c1a33)":"linear-gradient(135deg,#eef3fc,#e6edf9)",border:"1px solid rgba(91,142,196,0.25)",borderLeft:"4px solid #5b8ec8",borderRadius:14,padding:"14px 16px",marginBottom:14}}>
      <div style={{fontSize:10,fontWeight:800,color:"#5b8ec8",textTransform:"uppercase",letterSpacing:".1em",marginBottom:6}}>📈 Trends — H1 2026 Momentum</div>
      <div style={{fontSize:12.5,color:t.text,lineHeight:1.6}}>Direction of travel, not snapshots. Monthly series are best-available estimates; the High-Frequency tab carries daily data from the dashboard's own refresh history.</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
      {KPIS.map((k,i)=><div key={i} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:10,padding:"8px 9px",animation:`riseIn .3s ease-out ${i*0.04}s both`}}>
        <div style={{fontSize:9,color:t.sub,marginBottom:2,lineHeight:1.2}}>{k.label}</div>
        <div style={{display:"flex",alignItems:"baseline",gap:5,flexWrap:"wrap"}}><span style={{fontSize:14,fontWeight:800,color:k.color,fontVariantNumeric:"tabular-nums"}}>{k.v}</span>
        <span style={{fontSize:9.5,fontWeight:700,color:k.d>0?"#ef4444":k.d<0?"#22c55e":t.sub}}>{k.d>0?"▲":k.d<0?"▼":"—"}{k.d!==0?(k.fmt==="usd"?"$"+Math.abs(k.d):Math.abs(k.d).toLocaleString()+(k.fmt==="pt"?"pt":"")):""}</span></div>
      </div>)}
    </div>
    <div style={{fontSize:9.5,color:t.sub,fontStyle:"italic",marginBottom:12,marginTop:-6}}>Deltas vs prior month. Red ▲ = escalation, green ▼ = de-escalation — direction-of-harm coloring, not stock-market convention.</div>
    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>{TT.map(tb=><button key={tb.id} className="pill-tab" onClick={()=>setTtab(tb.id)} style={{padding:"6px 12px",fontSize:12,borderRadius:20,cursor:"pointer",fontFamily:FONT,fontWeight:ttab===tb.id?700:400,background:ttab===tb.id?"#5b8ec8":"none",color:ttab===tb.id?"#fff":t.sub,border:`1px solid ${ttab===tb.id?"#5b8ec8":t.border}`}}>{tb.label}</button>)}</div>

    {ttab==="ukraine"&&<div className="rise">
    <div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>🇷🇺 Russian Attrition</div>
    <TrendChart t={t} data={HISTORICAL.ruCasualtiesCumulative} color="#ef4444" label="Cumulative RU Casualties" unit="total killed/wounded" area desc="Crossed 1.4M in June. The curve is near-linear — sustained attrition of roughly 36-38K/month with no sign of the rate easing." />
    <TrendChart t={t} data={HISTORICAL.ruCasualtiesMonthly} color="#f97316" label="Monthly RU Casualty Rate" unit="killed/wounded per month" desc="June ticked up to ~38.5K — the highest monthly rate of H1, coinciding with the intensified Kostyantynivka push." />
    <div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10,marginTop:20}}>⚔️ Battlefield Momentum</div>
    <TrendChart t={t} data={HISTORICAL.ruTerritoryKm2} color="#eab308" label="RU Territorial Gains" unit="km² captured per month" desc="The key counter-trend: Russian advance peaked in March and has declined sharply since — June's ~11km² is the slowest of the year despite record casualties, underscoring the attrition-vs-gain mismatch." />
    <TrendChart t={t} data={costPerKm} color="#dc2626" label="Casualties per km² Gained" unit="RU killed/wounded per km² captured" area desc="Derived series: monthly casualties divided by territorial gain. January cost ~950 casualties per km²; June cost ~3,500 — the clearest single measure of how the offensive's exchange rate has collapsed." />
    <TrendChart t={t} data={HISTORICAL.deepStrikes} color="#5b8ec8" label="Ukrainian Deep Strikes" unit="strikes on RU rear per month" desc="Ukraine's long-range strike campaign has climbed steadily — refinery and logistics targeting now a defining feature of the war's economic dimension." />
    <TrendChart t={t} data={HISTORICAL.refineryOffline} color="#22c55e" label="RU Refining Capacity Offline" unit="% of national capacity" area desc="From ~8% in January to ~40% by June — the cumulative effect of the deep-strike campaign on Russia's fuel economy." />
    </div>}

    {ttab==="iranenergy"&&<div className="rise">
    <div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>☢️ Iran Escalation Index</div>
    <TrendChart t={t} data={HISTORICAL.iranTensionEvents} color="#8b5cf6" label="Monthly Tension Events" unit="military/diplomatic flashpoints" desc="A rough proxy, not an audited count: strikes, Hormuz incidents, assassinations, and major sanctions/diplomatic actions per month. The arc tells the real story — the Feb 28 war outbreak, a Mar peak during active fighting, the Apr 7 ceasefire lull, May's approach toward a deal, then June's rebound as the signed MoU was directly tested by the Jun 26-27 strike exchange." />
    <TrendChart t={t} data={HISTORICAL.hormuzDisruptionDays} color="#f97316" label="Strait of Hormuz Disruption Days" unit="days/month with shipping impact" area desc="March's full-war period shows the worst disruption (18 days). The MoU briefly reopened the strait in June before the weekend strike exchange interrupted it again — disruption has stayed intermittent rather than resolved." />
    <div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10,marginTop:20}}>🛢️ Global Oil Price Impact</div>
    <TrendChart t={t} data={HISTORICAL.oilPriceBrent} color="#f97316" label="Brent Crude" unit="$ per barrel" area desc="From $61 in January to a $118 peak in March after the Feb 28 US-Israel strikes on Iran shut most Hormuz traffic — the largest inflation-adjusted quarterly jump on record (EIA). Eased to ~$74 by June as Hormuz reopened and the MoU held. Ties together the Energy Disruption cards on Today — Ukraine's refinery campaign, Hormuz, and the Cuba/Venezuela fuel crisis all move this one number." />
    <div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10,marginTop:20}}>🔗 Price vs. Disruption — Do They Actually Track?</div>
    <Card t={t} style={{padding:"12px 8px 8px"}}>
      <div style={{padding:"0 8px 6px",display:"flex",alignItems:"baseline",justifyContent:"space-between"}}><div style={{fontSize:12,fontWeight:700,color:t.text}}>Brent Crude vs Hormuz Disruption Days</div><div style={{fontSize:10,color:t.sub}}>same 6 months, overlaid</div></div>
      <div style={{height:150}}><ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={HISTORICAL.oilPriceBrent.map((d,i)=>({m:d.m,brent:d.v,hormuz:HISTORICAL.hormuzDisruptionDays[i].v}))} margin={{top:4,right:8,left:-6,bottom:0}}>
          <XAxis dataKey="m" tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false}/>
          <YAxis yAxisId="l" tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false} width={30} tickFormatter={v=>"$"+v}/>
          <YAxis yAxisId="r" orientation="right" tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false} width={22}/>
          <Tooltip contentStyle={{background:t.isDark?"#101d30":"#fff",border:`1px solid ${t.border}`,borderRadius:8,fontSize:12}} labelStyle={{color:t.sub}}/>
          <Legend wrapperStyle={{fontSize:10}}/>
          <Bar yAxisId="r" dataKey="hormuz" name="Hormuz disruption (days)" fill="#f9731666" radius={[3,3,0,0]}/>
          <Line yAxisId="l" type="monotone" dataKey="brent" name="Brent ($/bbl)" stroke="#eab308" strokeWidth={2} dot={{r:2,fill:"#eab308"}}/>
        </ComposedChart>
      </ResponsiveContainer></div>
      <div style={{fontSize:11,color:t.sub,lineHeight:1.5,padding:"6px 8px 2px"}}>They track loosely, not tightly — March is the clean case (18 disruption days, $118 peak), but April/May show price easing while disruption stayed non-zero. Brent responds to expectations and OPEC+ supply too, not Hormuz alone; treat this as directional, not a clean causal read.</div>
    </Card>
    </div>}

    {ttab==="global"&&<div className="rise">
    <div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>🤝 Alliance & Great Power Trends</div>
    <TrendChart t={t} data={HISTORICAL.natoDefenseSpendPctGDP} color="#5b8ec8" label="NATO Avg. Defense Spend (% GDP)" unit="member average, % of GDP" area desc="Steady climb from ~1.9% in January to 2.4% by June — the tail end of the US-led burden-sharing push that brought all 32 members to or above the 2% guideline this year. See Great Power Rivalry → NATO & Allies tab for the full alliance breakdown." />
    <TrendChart t={t} data={HISTORICAL.plaTaiwanStraitIncidents} color="#ef4444" label="PLA Taiwan Strait Incidents" unit="median-line crossings & ADIZ incursions per month" desc="Distinct from the SCS incident count above — this tracks PLA military activity specifically around Taiwan. Monthly incidents have more than doubled since January, consistent with the sustained-pressure pattern documented in S. China Sea & Taiwan → Taiwan Strait." />
    <div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10,marginTop:20}}>🌏 Other Theaters</div>
    <TrendChart t={t} data={HISTORICAL.scsIncidents} color="#06b6d4" label="S. China Sea Incidents (cumulative YTD)" unit="documented PRC incidents" area desc="A steepening curve — incident frequency has accelerated each month, from 6 in January to 47 cumulative by late June." />
    <TrendChart t={t} data={HISTORICAL.boatStrikeDeaths} color="#dc2626" label="Caribbean Boat-Strike Deaths (cumulative)" unit="killed in Southern Spear strikes" area desc="221+ killed since the campaign began — a near-linear escalation. Casualty figures and the operation's legal basis remain contested (see Caribbean section)." />
    <TrendChart t={t} data={HISTORICAL.gazaCasualtiesSinceCeasefire} color="#f59e0b" label="Gaza: Killed Since Ceasefire (cumulative)" unit="Palestinians killed since Oct 10, 2025 truce" desc="Only 3 reliably dated points exist for this series — Jan 9: 451 (Al Jazeera/Gaza GMO), Apr 28: ~800 (UN Security Council briefing), Jun 10: 1,092+ (Gaza MoH/OCHA, Jul 9); Jul 19: 1,144+ (Gaza MoH). Deliberately not smoothed into a full monthly series per this dashboard's sourcing standard — the point stands regardless: a 'ceasefire' has still killed over 1,100 people in 9 months." />
    <div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10,marginTop:20}}>🇱🇧 Lebanon Front & DPRK Axis</div>
    <TrendChart t={t} data={HISTORICAL.lebanonCasualties} color="#c8313c" label="Lebanon: Killed Since War Resumed (cumulative)" unit="Lebanese MoH, since Mar 2, 2026" desc="4 real dated points, no interpolation: Mar 2 (war restart, 0), Apr 1 (1,318), May 1 (2,618), Jul 5 (4,304). No confirmed June aggregate was published — that gap is shown honestly rather than smoothed. See Israel & the Levant → Lebanon Front." />
    <TrendChart t={t} data={HISTORICAL.dprkCasualties} color="#ef4444" label="DPRK Casualties in Kursk (cumulative)" unit="killed/wounded, Western vs Ukrainian estimates" desc="UK MoD/South Korean NIS estimated ~6,000 DPRK casualties from Apr 2025 through early 2026 — a plateau. Ukraine's HUR claimed 7,000+ by late June 2026, a figure that exceeds the Western estimate; shown as reported, not reconciled. Troop presence has held steady at ~11,000-15,000 (initial deployment plus rotations) — see Great Power Rivalry → DPRK-Russia Axis." />
    </div>}

    {ttab==="crosstheater"&&<div className="rise">
    <div style={{background:t.isDark?"linear-gradient(135deg,#08111f,#0c1a33)":"linear-gradient(135deg,#eef3fc,#e6edf9)",border:"1px solid rgba(91,142,196,0.25)",borderLeft:"4px solid #5b8ec8",borderRadius:14,padding:"11px 14px",marginBottom:14}}>
      <div style={{fontSize:12,fontWeight:700,color:t.text,marginBottom:4}}>🌐 Global Tension Index</div>
      <div style={{fontSize:11,color:t.sub,lineHeight:1.55}}>A composite of monthly escalation across four independently-tracked flashpoints: Iran tension events, Taiwan Strait incidents, South China Sea incidents, and Caribbean boat-strike deaths. Each series is converted to its monthly rate of new activity (cumulative series are differenced month-over-month), then normalized 0-100 against its own 6-month peak, then averaged. This is a derived editorial construct, not a published index — the methodology is shown so you can judge it, not hidden behind a single number.</div>
    </div>
    <TrendChart t={t} data={TENSION_INDEX} color="#8b5cf6" label="Composite Tension Index" unit="0-100, normalized monthly escalation" area desc="Reads as 'how hot was the average flashpoint this month relative to its own worst month.' March's spike is almost entirely the Iran war outbreak; the index cools through April-May as Iran de-escalated even while Taiwan/SCS/Caribbean kept climbing, then June ticks back up on the Jun 26-27 Iran strike exchange." />
    <div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10,marginTop:20}}>📊 What's Actually Escalating vs. Plateauing</div>
    <Card t={t}><div style={{padding:"11px 14px",fontSize:12,color:t.sub,lineHeight:1.7}}>
      <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Still climbing, no sign of a ceiling</span> — Taiwan Strait incidents (18→40 cumulative, Jan-Jun) and South China Sea incidents (6→47) have risen every single month with no plateau. Caribbean boat-strike deaths climbed near-linearly to 221+ before the tempo slowed sharply after early May.</div>
      <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Volatile, not trending</span> — Iran tension events spike and cool with events (Feb 28 outbreak, Mar peak, Apr ceasefire lull, Jun rebound) rather than grinding upward. Same pattern in Hormuz disruption days and Brent crude — both event-driven, not secular trends.</div>
      <div><span style={{color:t.text,fontWeight:700}}>New and unindexed</span> — Lebanon (restarted Mar 2, already 4,304+ dead) and the DPRK-Kursk casualty toll (~7,000 claimed) are real, dated, and rising, but only 2-4 data points each — too sparse yet to place in the composite index without overweighting noise. Charted separately above (Indo-Pacific & Global tab) until more anchors exist.</div>
    </div></Card>
    </div>}
    {ttab==="hifreq"&&<div className="rise">
    <div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>📡 Daily Series — From Refresh History</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12}}>
      {[
        {label:"Launched (7 nights)",v:DIG.launched.toLocaleString(),sub:DIG.span,color:"#ef4444"},
        {label:"of which missiles",v:DIG.missiles.toLocaleString(),sub:"ballistic + cruise + hypersonic",color:"#f97316"},
        {label:"Neutralized",v:DIG.downed.toLocaleString(),sub:DIG.rate+"% overall rate",color:"#5b8ec8"},
        {label:"Got through",v:DIG.leakers.toLocaleString(),sub:"recorded impacts",color:"#dc2626"},
        {label:"Avg alert burden",v:DIG.alertAvg+"h/day",sub:"nationwide average",color:"#eab308"},
        {label:"Data vintage",v:DW_DAILY[DW_DAILY.length-1].date,sub:"weekly pull — Sundays",color:"#8b5cf6"},
      ].map((k,i)=><div key={i} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:10,padding:"8px 9px",animation:`riseIn .3s ease-out ${i*0.04}s both`}}>
        <div style={{fontSize:9,color:t.sub,marginBottom:2,lineHeight:1.2}}>{k.label}</div>
        <div style={{fontSize:14,fontWeight:800,color:k.color,fontVariantNumeric:"tabular-nums"}}>{k.v}</div>
        <div style={{fontSize:8.5,color:t.sub,marginTop:1}}>{k.sub}</div>
      </div>)}
    </div>
    <Card t={t} style={{padding:"12px 8px 8px"}}>
      <div style={{padding:"0 8px 6px",display:"flex",alignItems:"baseline",justifyContent:"space-between"}}><div style={{fontSize:12,fontWeight:700,color:t.text}}>Daily RU Personnel Losses — with 7-Day Average</div><div style={{fontSize:10,color:t.sub}}>killed/wounded per day (UA GenStaff)</div></div>
      <div style={{height:150}}><ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={casMA} margin={{top:4,right:8,left:-12,bottom:0}}>
          <XAxis dataKey="m" tick={{fontSize:8,fill:t.sub}} tickLine={false} axisLine={false} interval={2}/>
          <YAxis domain={[0,1600]} tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false} width={38}/>
          <Tooltip contentStyle={{background:t.isDark?"#101d30":"#fff",border:`1px solid ${t.border}`,borderRadius:8,fontSize:12}} labelStyle={{color:t.sub}}/>
          <Bar dataKey="v" name="Daily" fill="#ef444444" radius={[3,3,0,0]}/>
          <Line type="monotone" dataKey="ma" name="7-day avg" stroke="#ef4444" strokeWidth={2.5} dot={false} connectNulls/>
        </ComposedChart>
      </ResponsiveContainer></div>
      <div style={{fontSize:11,color:t.sub,lineHeight:1.5,padding:"6px 8px 2px"}}>The dashboard's own daily-refresh record — bars are single MoD reports (noisy by nature), the line is the 7-day average that shows the real signal: a sustained 1,200-1,300/day band through late June and early July, roughly 8x Ukraine's rate per CSIS.</div>
    </Card>
    <Card t={t} style={{padding:"12px 8px 8px"}}>
      <div style={{padding:"0 8px 6px",display:"flex",alignItems:"baseline",justifyContent:"space-between"}}><div style={{fontSize:12,fontWeight:700,color:t.text}}>Drone War — Launched vs Downed (14 nights)</div><div style={{fontSize:10,color:t.sub}}>RU drones+missiles/night</div></div>
      <div style={{height:150}}><ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={dwRecent} margin={{top:4,right:8,left:-12,bottom:0}}>
          <XAxis dataKey="m" tick={{fontSize:8,fill:t.sub}} tickLine={false} axisLine={false} interval={1}/>
          <YAxis tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false} width={34}/>
          <Tooltip contentStyle={{background:t.isDark?"#101d30":"#fff",border:`1px solid ${t.border}`,borderRadius:8,fontSize:12}} labelStyle={{color:t.sub}}/>
          <ReferenceLine x="Jul 1" stroke="#dc2626" strokeDasharray="3 3" label={{value:"mass strike",fontSize:8,fill:"#dc2626",position:"top"}}/>
          <ReferenceLine x="Jul 5" stroke="#dc2626" strokeDasharray="3 3" label={{value:"mass strike",fontSize:8,fill:"#dc2626",position:"top"}}/>
          <Bar dataKey="launched" name="Launched" fill="#ef444455" radius={[3,3,0,0]}/>
          <Line type="monotone" dataKey="downed" name="Downed" stroke="#5b8ec8" strokeWidth={2} dot={{r:2,fill:"#5b8ec8"}}/>
        </ComposedChart>
      </ResponsiveContainer></div>
      <div style={{fontSize:11,color:t.sub,lineHeight:1.5,padding:"6px 8px 2px"}}>Pulled straight from the Drone War daily log (current through Jul 8). Bars: total launched per night; line: intercepted/suppressed. The Jul 1 spike is the 570-projectile Kyiv mass strike. Weekly-cadence data — updates Sundays.</div>
    </Card>
    <Card t={t} style={{padding:"12px 8px 8px"}}>
      <div style={{padding:"0 8px 6px",display:"flex",alignItems:"baseline",justifyContent:"space-between"}}><div style={{fontSize:12,fontWeight:700,color:t.text}}>Strike Composition — Drones vs Missiles</div><div style={{fontSize:10,color:t.sub}}>per night, stacked</div></div>
      <div style={{height:150}}><ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={dwSplit} margin={{top:4,right:8,left:-12,bottom:0}}>
          <XAxis dataKey="m" tick={{fontSize:8,fill:t.sub}} tickLine={false} axisLine={false} interval={1}/>
          <YAxis tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false} width={34}/>
          <Tooltip contentStyle={{background:t.isDark?"#101d30":"#fff",border:`1px solid ${t.border}`,borderRadius:8,fontSize:12}} labelStyle={{color:t.sub}}/>
          <Legend wrapperStyle={{fontSize:10}}/>
          <Bar dataKey="drones" name="Drones" stackId="a" fill="#f9731688" radius={[0,0,0,0]}/>
          <Bar dataKey="missiles" name="Missiles" stackId="a" fill="#dc2626" radius={[3,3,0,0]}/>
        </ComposedChart>
      </ResponsiveContainer></div>
      <div style={{fontSize:11,color:t.sub,lineHeight:1.5,padding:"6px 8px 2px"}}>Drones saturate; missiles kill. The red slivers are what matter — on ballistic nights (Jul 1, 5, 7) interceptor shortages let them through: zero of 23 ballistic missiles were stopped in the Jul 5-6 strike. Drone-only nights (Jul 4, 6) are handled at ~88-90%.</div>
    </Card>
    <Card t={t} style={{padding:"12px 8px 8px"}}>
      <div style={{padding:"0 8px 6px",display:"flex",alignItems:"baseline",justifyContent:"space-between"}}><div style={{fontSize:12,fontWeight:700,color:t.text}}>Nightly Intercept Rate</div><div style={{fontSize:10,color:t.sub}}>% of RU drones downed/suppressed</div></div>
      <div style={{height:140}}><ResponsiveContainer width="100%" height="100%">
        <AreaChart data={DW_DAILY.slice(-14).map(d=>({m:d.date,v:d.ru_d>0?Math.round(d.ru_int/d.ru_d*100):null}))} margin={{top:4,right:8,left:-12,bottom:0}}>
          <defs><linearGradient id="g_intrate" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient></defs>
          <XAxis dataKey="m" tick={{fontSize:8,fill:t.sub}} tickLine={false} axisLine={false} interval={1}/>
          <YAxis domain={[60,100]} tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false} width={34} tickFormatter={v=>v+"%"}/>
          <Tooltip contentStyle={{background:t.isDark?"#101d30":"#fff",border:`1px solid ${t.border}`,borderRadius:8,fontSize:12}} labelStyle={{color:t.sub}} formatter={v=>v+"%"}/>
          <ReferenceLine y={90} stroke={t.sub} strokeDasharray="4 3" strokeOpacity={0.5}/>
          <Area type="monotone" dataKey="v" stroke="#22c55e" fill="url(#g_intrate)" strokeWidth={2} connectNulls/>
        </AreaChart>
      </ResponsiveContainer></div>
      <div style={{fontSize:11,color:t.sub,lineHeight:1.5,padding:"6px 8px 2px"}}>The saturation effect made visible: the rate dips on mass-strike nights (Jul 1) when decoys, jet drones and missiles arrive in one wave — exactly the stress pattern modeled in Drone War → Saturation. Drone-only; ballistic intercepts are a separate, worse story — shown below.</div>
    </Card>
    <Card t={t} style={{padding:"12px 14px 10px"}}>
      <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",marginBottom:8}}><div style={{fontSize:12,fontWeight:700,color:t.text}}>Ballistic Intercept Collapse</div><div style={{fontSize:10,color:t.sub}}>% of RU ballistic missiles intercepted</div></div>
      {BALLISTIC_INTERCEPTS.map((b,i)=>{const pct=Math.round(b.downed/b.n*100);return <div key={i} style={{marginBottom:9}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3}}><span style={{color:t.text,fontWeight:600}}>{b.label}</span><span style={{color:pct>0?"#eab308":"#dc2626",fontWeight:700}}>{b.downed}/{b.n} — {pct}%</span></div>
        <div style={{height:7,borderRadius:4,background:t.isDark?"rgba(255,255,255,.07)":"rgba(0,0,0,.07)",overflow:"hidden"}}><div style={{height:"100%",width:`${Math.max(pct,2)}%`,borderRadius:4,background:pct>0?"#eab308":"#dc2626",animation:"barGrow .8s ease-out",transformOrigin:"left"}}/></div>
      </div>;})}
      <div style={{fontSize:11,color:t.sub,lineHeight:1.5,marginTop:8}}>Why the Patriot license is the story of the week: intercept performance against ballistic missiles collapsed from 26% in June to zero across four consecutive July strikes as PAC-3 stocks ran out — the drone intercept rate above stayed near 90% the whole time. Zelensky, Jul 11: "our defenders managed to shoot down most of the targets, but not the ballistic ones," renewing pressure on allies to deliver the Ankara air-defense pledges faster. Mixed granularity by necessity: June is a monthly figure (CSIS), July entries are single engagements (UA Air Force). Sources noted per row.</div>
    </Card>
    <Card t={t} style={{padding:"12px 8px 8px"}}>
      <div style={{padding:"0 8px 6px",display:"flex",alignItems:"baseline",justifyContent:"space-between"}}><div style={{fontSize:12,fontWeight:700,color:t.text}}>Civilian Burden — Air Alert Hours</div><div style={{fontSize:10,color:t.sub}}>nationwide alert hours/day</div></div>
      <div style={{height:140}}><ResponsiveContainer width="100%" height="100%">
        <AreaChart data={DW_DAILY.slice(-14).map(d=>({m:d.date,v:d.alert_h}))} margin={{top:4,right:8,left:-12,bottom:0}}>
          <defs><linearGradient id="g_alerth" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/><stop offset="95%" stopColor="#f97316" stopOpacity={0}/></linearGradient></defs>
          <XAxis dataKey="m" tick={{fontSize:8,fill:t.sub}} tickLine={false} axisLine={false} interval={1}/>
          <YAxis tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false} width={34} tickFormatter={v=>v+"h"}/>
          <Tooltip contentStyle={{background:t.isDark?"#101d30":"#fff",border:`1px solid ${t.border}`,borderRadius:8,fontSize:12}} labelStyle={{color:t.sub}} formatter={v=>v+" hrs"}/>
          <Area type="monotone" dataKey="v" stroke="#f97316" fill="url(#g_alerth)" strokeWidth={2}/>
        </AreaChart>
      </ResponsiveContainer></div>
      <div style={{fontSize:11,color:t.sub,lineHeight:1.5,padding:"6px 8px 2px"}}>What the launch counts cost in ordinary life: hours per day the average Ukrainian spends under air-raid alert. Mass-strike nights push it past 14 hours. Alert-hour figures are series estimates (confirmed:false on some entries) — directional, not audited.</div>
    </Card>
    <Card t={t} style={{padding:"12px 8px 8px"}}>
      <div style={{padding:"0 8px 6px",display:"flex",alignItems:"baseline",justifyContent:"space-between"}}><div style={{fontSize:12,fontWeight:700,color:t.text}}>Civilian Power Knocked Out</div><div style={{fontSize:10,color:t.sub}}>GWh lost per strike night</div></div>
      <div style={{height:150}}><ResponsiveContainer width="100%" height="100%">
        <AreaChart data={pwData} margin={{top:4,right:8,left:-12,bottom:0}}>
          <defs><linearGradient id="g_pw" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient></defs>
          <XAxis dataKey="m" tick={{fontSize:8,fill:t.sub}} tickLine={false} axisLine={false} interval={1}/>
          <YAxis tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false} width={38} tickFormatter={v=>v+" GWh"}/>
          <Tooltip contentStyle={{background:t.isDark?"#101d30":"#fff",border:`1px solid ${t.border}`,borderRadius:8,fontSize:12}} labelStyle={{color:t.sub}} formatter={v=>v+" GWh"}/>
          <Area type="monotone" dataKey="v" stroke="#8b5cf6" fill="url(#g_pw)" strokeWidth={2}/>
        </AreaChart>
      </ResponsiveContainer></div>
      <div style={{fontSize:11,color:t.sub,lineHeight:1.5,padding:"6px 8px 2px"}}>Estimated grid capacity knocked offline per strike night — the energy-war readout. Missile nights (Jul 1, 5) dwarf drone-only nights; the pattern tracks the strike-composition chart above. Series estimates, directional.</div>
    </Card>
    </div>}
    <div style={{fontSize:10.5,color:t.sub,fontStyle:"italic",padding:"10px 2px 4px",lineHeight:1.5}}>Trend data compiled from the dashboard's own refresh history plus Ukrainian General Staff, ISW, CFR and AS/COA figures. Monthly points are approximate and smoothed; daily series are as-reported. Use the theater Deep Dives for precise current numbers and sourcing.</div>
  </div>;
}

function DeadlineCard({d,t}){const countdown=useCountdown(d.target);return <div style={{background:t.card,borderTop:`1px solid ${t.border}`,borderRight:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,borderLeft:`3px solid ${d.color}`,borderRadius:12,padding:"14px 16px",marginBottom:10,display:"flex",gap:14,alignItems:"flex-start"}}><div style={{flexShrink:0,textAlign:"center",minWidth:52}}><div style={{fontSize:20,marginBottom:2}}>{d.icon}</div><div style={{fontSize:10,fontWeight:800,color:d.color,lineHeight:1.2,whiteSpace:"nowrap"}}>{d.date}</div>{countdown&&<div style={{fontSize:9,fontWeight:700,color:d.color,opacity:0.75,marginTop:2,whiteSpace:"nowrap"}}>{countdown}</div>}</div><div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:3}}>{d.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{d.desc}</div></div></div>;}

function TodayView({t}){const critical=NEWS.filter(n=>n.severity==="critical");const watch=NEWS.filter(n=>n.severity==="watch"||n.severity==="major");const criticalShown=critical.slice(0,5);const watchShown=watch.slice(0,7-criticalShown.length);const shown=[...criticalShown,...watchShown];const shownCritical=shown.filter(n=>n.severity==="critical").length;const shownMajor=shown.filter(n=>n.severity==="major").length;const shownWatch=shown.filter(n=>n.severity==="watch").length;return <div style={{padding:"16px 16px 0",animation:"fadeIn .25s ease-out"}}><BriefingPanel t={t}/>
    <div style={{background:t.isDark?"linear-gradient(135deg,#0d1622,#101c2b)":"#eef1f6",border:`1px solid ${t.border}`,borderLeft:"4px solid #dc2626",borderRadius:12,padding:"12px 14px",marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8}}>
        <div style={{fontSize:10,fontWeight:800,color:t.sub,letterSpacing:".18em",textTransform:"uppercase"}}>Principal Developments</div>
        <div style={{fontSize:9,color:t.sub,opacity:.7,fontVariantNumeric:"tabular-nums"}}>WCD-{UA_WAR_DAY}</div>
      </div>
      {shown.slice(0,4).map((n,i)=><div key={n.id} style={{display:"flex",gap:10,padding:"7px 0",borderTop:i?`1px solid ${t.sep}`:"none",alignItems:"baseline"}}>
        <span style={{fontSize:11,fontWeight:800,color:n.severity==="critical"?"#dc2626":"#f97316",fontVariantNumeric:"tabular-nums",flexShrink:0}}>{String(i+1).padStart(2,"0")}</span>
        <span style={{fontSize:9,fontWeight:700,color:n.conflictColor,letterSpacing:".06em",textTransform:"uppercase",flexShrink:0,paddingTop:1,whiteSpace:"nowrap"}}>{n.conflict}</span>
        <span style={{fontSize:11.5,color:t.text,lineHeight:1.45}}>{n.headline}</span>
      </div>)}
    </div><div style={{background:t.isDark?"rgba(220,38,38,.07)":"rgba(220,38,38,.05)",border:"1px solid rgba(220,38,38,.18)",borderRadius:12,padding:"12px 16px",marginBottom:20,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}><span style={{width:8,height:8,borderRadius:"50%",background:"#dc2626",display:"inline-block",animation:"blink 1s ease-in-out infinite",flexShrink:0}}/><span style={{fontSize:12,fontWeight:700,color:"#dc2626"}}>{shownCritical} critical · {shownMajor} major · {shownWatch} watch</span><span style={{marginLeft:"auto",fontSize:11,color:t.sub}}>War Day {UA_WAR_DAY} · {REPORT_NOW.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span></div><div style={{marginBottom:24}}><div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>01 · Breaking</div><div style={{display:t.isLandscape?"grid":"block",gridTemplateColumns:t.isLandscape?"1fr 1fr":undefined,gap:t.isLandscape?10:0}}>{shown.map((story,si)=>{const sc=story.severity==="critical"?"#dc2626":story.severity==="major"?"#f97316":"#eab308";const isCrit=story.severity==="critical";return <div key={story.id} style={{position:"relative",overflow:"hidden",background:t.isDark?"linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,0) 40%),"+t.card:t.card,borderTop:t.isDark?"1px solid rgba(255,255,255,.08)":`1px solid ${t.border}`,borderRight:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,borderLeft:`3px solid ${sc}`,borderRadius:12,padding:"14px 16px",marginBottom:10,boxShadow:t.isDark?"0 3px 12px rgba(0,0,0,.38)":"0 2px 8px rgba(59,130,246,.10)",animation:`riseIn .32s ease-out ${si*0.05}s both${isCrit?", criticalPulse 2.2s ease-in-out "+(si*0.05+0.4)+"s infinite":""}`}}>{isCrit&&<div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(220,38,38,.10),transparent 30%)",animation:"edgeSheen 2.6s ease-in-out infinite",pointerEvents:"none"}}/>}{isCrit&&<div className="stamp">Priority</div>}<div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:6}}><span style={{fontSize:18,flexShrink:0,marginTop:1}}>{story.icon}</span><div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:700,color:t.text,lineHeight:1.4,marginBottom:5}}>{story.headline}</div><div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}><span style={{background:story.conflictColor+"22",border:`1px solid ${story.conflictColor}55`,borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:700,color:story.conflictColor}}>{story.conflict}</span><span style={{fontSize:10,color:t.sub}}>{story.publishedAt}</span><Freshness t={t} date={story.publishedAt}/></div></div></div><div style={{fontSize:11,fontWeight:600,color:story.impactColor}}>{story.impact}</div></div>;})}</div></div><div style={{marginBottom:24}}><div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>02 · Combined Toll — All Tracked Conflicts</div><div style={{background:t.card,borderTop:`1px solid ${t.border}`,borderRight:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,borderLeft:"3px solid #dc2626",borderRadius:12,padding:"14px 16px"}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:8}}><div><div style={{fontSize:10,color:t.sub}}>Deaths</div><div style={{fontSize:22,fontWeight:800,color:"#dc2626",fontVariantNumeric:"tabular-nums"}}>{GLOBAL_TOLL.deaths}</div></div><div><div style={{fontSize:10,color:t.sub}}>Displaced</div><div style={{fontSize:22,fontWeight:800,color:"#f97316",fontVariantNumeric:"tabular-nums"}}>{GLOBAL_TOLL.displaced}</div></div></div><div style={{fontSize:11,color:t.sub,lineHeight:1.55}}>{GLOBAL_TOLL.note}</div></div></div><div style={{marginBottom:24}}><div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>03 · Global Energy Disruption</div><div style={{display:t.isLandscape?"grid":"block",gridTemplateColumns:t.isLandscape?"1fr 1fr":undefined,gap:t.isLandscape?10:0}}>{ENERGY_DISRUPTIONS.map((e,i)=><div key={i} style={{background:t.card,borderTop:`1px solid ${t.border}`,borderRight:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,borderLeft:`3px solid ${e.color}`,borderRadius:12,padding:"12px 14px",marginBottom:8}}><div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}><span style={{fontSize:16}}>{e.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text}}>{e.label}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{e.text}</div></div>)}</div></div><div style={{marginBottom:24}}><div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>04 · Sanctions Tracker</div><div style={{display:t.isLandscape?"grid":"block",gridTemplateColumns:t.isLandscape?"1fr 1fr":undefined,gap:t.isLandscape?10:0}}>{SANCTIONS_TRACKER.map((s,i)=><div key={i} style={{background:t.card,borderTop:`1px solid ${t.border}`,borderRight:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,borderLeft:`3px solid ${s.color}`,borderRadius:12,padding:"12px 14px",marginBottom:8}}><div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3,flexWrap:"wrap"}}><span style={{fontSize:16}}>{s.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text,flex:1}}>{s.label}</div><span style={{fontSize:9,fontWeight:700,color:s.color,background:s.color+"18",borderRadius:10,padding:"1px 7px"}}>{s.theater}</span></div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{s.text}</div></div>)}</div></div><div style={{marginBottom:24}}><div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>05 · Political Calendar</div><div style={{display:t.isLandscape?"grid":"block",gridTemplateColumns:t.isLandscape?"1fr 1fr":undefined,gap:t.isLandscape?10:0}}>{POLITICAL_CALENDAR.map((p,i)=><div key={i} style={{background:t.card,borderTop:`1px solid ${t.border}`,borderRight:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,borderLeft:`3px solid ${p.color}`,borderRadius:12,padding:"12px 14px",marginBottom:8,display:"flex",gap:12}}><div style={{minWidth:78,fontSize:10,fontWeight:700,color:p.color,flexShrink:0,paddingTop:1}}>{p.date}</div><div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:2}}>{p.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{p.note}</div></div></div>)}</div></div><div style={{marginBottom:24}}><div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10,display:"flex",alignItems:"center",gap:6}}>🕵️ Cyber & Hybrid Warfare<span style={{marginLeft:"auto",fontSize:9.5,color:"#5b8ec8",fontWeight:700,textTransform:"none",letterSpacing:"normal"}}>See full Cyber section → Deep Dive</span></div><div style={{display:t.isLandscape?"grid":"block",gridTemplateColumns:t.isLandscape?"1fr 1fr":undefined,gap:t.isLandscape?10:0}}>{CYBER_HYBRID.map((c,i)=><div key={i} style={{background:t.card,borderTop:`1px solid ${t.border}`,borderRight:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,borderLeft:`3px solid ${c.color}`,borderRadius:12,padding:"12px 14px",marginBottom:8}}><div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}><span style={{fontSize:16}}>{c.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text}}>{c.label}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{c.text}</div></div>)}</div><div style={{fontSize:10.5,color:t.sub,fontStyle:"italic",padding:"6px 2px"}}>Attribution in cyber/hybrid incidents is frequently contested — treat sourcing as preliminary unless independently confirmed.</div></div><div style={{marginBottom:24}}><div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>06 · Legal & Accountability Tracker</div><div style={{display:t.isLandscape?"grid":"block",gridTemplateColumns:t.isLandscape?"1fr 1fr":undefined,gap:t.isLandscape?10:0}}>{LEGAL_TRACKER.map((l,i)=><div key={i} style={{background:t.card,borderTop:`1px solid ${t.border}`,borderRight:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,borderLeft:`3px solid ${l.color}`,borderRadius:12,padding:"12px 14px",marginBottom:8}}><div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3,flexWrap:"wrap"}}><span style={{fontSize:16}}>{l.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text,flex:1}}>{l.label}</div><span style={{background:l.color+"22",border:`1px solid ${l.color}55`,borderRadius:20,padding:"1px 8px",fontSize:9,fontWeight:700,color:l.color,textTransform:"uppercase"}}>{l.theater}</span></div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{l.text}</div></div>)}</div></div><div style={{marginBottom:24}}><div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>07 · Upcoming Deadlines</div><div style={{display:t.isLandscape?"grid":"block",gridTemplateColumns:t.isLandscape?"1fr 1fr":undefined,gap:t.isLandscape?10:0}}>{DEADLINES.map((d,i)=><DeadlineCard key={i} d={d} t={t}/>)}</div></div></div>;}

// ── Deep Dive View ─────────────────────────────────────────────────────────────────
const CONFLICT_SECTIONS=[{id:"ukraine",label:"🇺🇦 Ukraine",conflictId:"ukraine"},{id:"dronewar",label:"🛸 Drone War",conflictId:"dronewar"},{id:"usmil",label:"⚔️ Great Power Rivalry",conflictId:"usmil"},{id:"iran",label:"🇮🇷 Iran",conflictId:"iran"},{id:"gaza",label:"🌍 Israel & Levant",conflictId:"gaza"},{id:"scs",label:"🏝️ S. China Sea & Taiwan",conflictId:"south-china-sea"},{id:"nuclear",label:"☢️ Strategic & Hybrid",conflictId:"nuclear"},{id:"venezuela",label:"🌎 Americas",conflictId:"venezuela"}];

function GazaSection({t,initialTab}){
  const[tab,setTab]=useState(initialTab??"conflict");useEffect(()=>{if(initialTab)setTab(initialTab);},[initialTab]);
  const conflict=CONFLICTS.find(c=>c.id==="gaza");
  const losses=LOSSES.gaza??[];
  const events=EVENTS.gaza??[];
  const HUM_METRICS=[
    {icon:"☠️",label:"Total killed",val:"73,269+",color:"#ef4444",desc:"Since Oct 7, 2023 (incl. 21,500 children), Gaza MoH via OCHA as of Jul 19, 2026 (173,811 wounded). Actual toll likely higher — morgue capacity overwhelmed, thousands missing under rubble; a peer-reviewed Lancet mortality survey has separately estimated true violent deaths well above the MoH count."},
    {icon:"👶",label:"Children killed",val:"20,179+",color:"#ef4444",desc:"Over 27% of total killed are children — highest child casualty rate in any modern conflict per Save the Children."},
    {icon:"💀",label:"Post-ceasefire killed",val:"1,144+",color:"#f97316",desc:"Palestinians killed since Oct 10, 2025 ceasefire, Gaza MoH as of Jul 19 (3,703 wounded). Hamas not disarming; Israel controls ~65% of the Strip. Fragile ceasefire with no enforcement mechanism."},
    {icon:"🏚️",label:"Buildings damaged",val:"80%",color:"#eab308",desc:"80% of Gaza's buildings damaged or destroyed. Estimated $50B+ reconstruction cost. No reconstruction plan agreed."},
    {icon:"📦",label:"UN appeal funded",val:"13%",color:"#eab308",desc:"$4B+ Gaza emergency appeal only 13% funded. Hospital system collapsed — only 17 of 36 hospitals partially functioning."},
    {icon:"🚶",label:"Displaced",val:"1.9M",color:"#f97316",desc:"1.9M people displaced — 85%+ of Gaza's population. Most displaced multiple times. No functioning sewage or clean water."},
  ];
  const ANNEXATION=[
    {icon:"🏗️",label:"West Bank settlement expansion",text:"Israel approved 4,476 new settlement units in West Bank in Q1 2026 alone — highest rate since Oslo Accords. ICJ ruled settlements illegal in Jul 2024 advisory opinion."},
    {icon:"⚖️",label:"ICJ orders — partial compliance",text:"ICJ ordered Israel to open aid corridors (May 2026) — only partial compliance. ICJ also ruled Israel must prevent genocidal acts — contested by Israel as misapplication."},
    {icon:"🗳️",label:"Gaza governance vacuum",text:"Hamas announced the resignation of its civil administration on Jul 6, 2026 under the peace plan — but has still not disarmed, and no successor authority is in place. Palestinian Authority has no presence. US plan: Gaza administered by Arab coalition — no agreement reached. Power vacuum deepens."},
    {icon:"🌍",label:"International isolation",text:"135+ countries recognized Palestinian state by Jun 2026. ICC issued arrest warrants for Netanyahu and Gallant in Nov 2024 — enforcement limited. Spain, Ireland, Norway recognized Palestine May 2024."},
  ];
  const TB={padding:"5px 10px",fontSize:11,borderRadius:16,cursor:"pointer",fontFamily:FONT,fontWeight:600};
  return <div>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
      {[{id:"conflict",label:"⚔️ Gaza"},{id:"humanitarian",label:"🆘 Humanitarian"},{id:"governance",label:"🌐 Governance"},{id:"lebanon",label:"🇱🇧 Lebanon Front"},{id:"syria",label:"🇸🇾 Syria"}].map(tb=><button key={tb.id} onClick={()=>setTab(tb.id)} style={{...TB,background:tab===tb.id?"#f59e0b":"none",color:tab===tb.id?"#fff":t.sub,border:`1px solid ${tab===tb.id?"#f59e0b":t.border}`}}>{tb.label}</button>)}
    </div>
    {tab==="conflict"&&<div>
      <ConflictOverviewCard conflict={conflict} t={t}/>
      <Note t={t} color="#f59e0b">⚖️ <strong>Contested framing:</strong> A UN Commission of Inquiry (Sep 2025) and multiple human rights bodies concluded Israel's campaign met the legal definition of genocide; Israel rejects this characterization as biased and has called for the Commission's abolition. The ICJ genocide case (South Africa v. Israel) remains open and unresolved. This dashboard presents both the findings and Israel's rejection of them without adjudicating the underlying legal question.</Note>
      <ST t={t}>🗺️ Current Situation</ST>
      <Card t={t}>{[{icon:"🤝",label:"Ceasefire Status (Oct 10, 2025)",text:"Fragile ceasefire holding — 1,144+ Palestinians killed since it began (Israel has struck on ~246 of the first 273 ceasefire days per an Al Jazeera analysis). Hamas not disarming. International monitoring mission deployed. No permanent agreement."},{icon:"🏛️",label:"Quiet Annexation",text:"Israel advancing settlement activity in West Bank. West Bank: 1,081+ killed since Oct 2023, highest displacement since 1967. ICJ ruled settlements illegal Jul 2024."},{icon:"🇺🇸",label:"US position",text:"Trump administration: conditional support for two-state solution. Governance runs through the Trump-chaired Board of Peace and the Cairo-based NCAG (named Jan 2026) — see Governance tab for status. Jared Kushner's reconstruction plan has been dismissed by experts as unrealistic."}].map((item,i,a)=><div key={i} style={{display:"flex",gap:10,padding:"11px 14px",borderBottom:i<a.length-1?`.5px solid ${t.sep}`:0}}><span style={{fontSize:20,flexShrink:0}}>{item.icon}</span><div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:3}}>{item.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{item.text}</div></div></div>)}
      </Card>
      <ST t={t} color="#f59e0b">🏛️ Annexation & Legal Pressure</ST>
      {ANNEXATION.map((a,i)=><Card key={i} t={t} style={{borderLeft:"4px solid #f59e0b"}}><div style={{padding:"10px 14px"}}><div style={{display:"flex",gap:8,marginBottom:4}}><span style={{fontSize:18,flexShrink:0}}>{a.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text}}>{a.label}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{a.text}</div></div></Card>)}
      <EventsTimeline t={t} events={events} label="Timeline"/>
    </div>}
    {tab==="humanitarian"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #ef4444"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🆘 HUMANITARIAN CRISIS — YEAR 3</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,.75)",lineHeight:1.6,marginBottom:12}}>Gaza is one of the most intense humanitarian emergencies in modern history. 73,000+ killed, 80% of buildings destroyed, hospital system collapsed, and a ceasefire that has already killed over 1,000 more.</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}><Pill label="73K+ killed" color="#ef4444"/><Pill label="80% buildings destroyed" color="#f97316"/><Pill label="Hospital system collapsed" color="#ef4444"/><Pill label="Appeal 13% funded" color="#f59e0b"/></div>
      </Hero>
      <ST t={t} color="#ef4444">📊 Key Metrics</ST>
      <Card t={t}>{HUM_METRICS.map((m,i)=><Row key={m.label} t={t} last={i===HUM_METRICS.length-1}><span style={{fontSize:18,width:28,textAlign:"center",flexShrink:0}}>{m.icon}</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:t.text}}>{m.label}</div><div style={{fontSize:11,color:t.sub}}>{m.desc}</div></div><div style={{fontSize:15,fontWeight:700,color:m.color,textAlign:"right",flexShrink:0}}>{m.val}</div></Row>)}</Card>
      <ST t={t} color="#ef4444">⚖️ Legal & Accountability</ST>
      <Card t={t}>{[{icon:"⚖️",label:"ICJ genocide case",text:"South Africa v. Israel case ongoing at International Court of Justice. ICJ issued provisional measures — Israel must prevent genocidal acts. Israel contests characterization."},{icon:"🔴",label:"ICC arrest warrants",text:"ICC issued arrest warrants for PM Netanyahu and Defence Minister Gallant (Nov 2024) for war crimes and crimes against humanity. Enforcement limited — Netanyahu avoided ICC member states."},{icon:"🌍",label:"135+ states recognize Palestine",text:"As of Jun 2026, 135+ UN member states have formally recognized a Palestinian state. Recognition accelerating post-Oct 7."}].map((item,i,a)=><div key={i} style={{display:"flex",gap:10,padding:"11px 14px",borderBottom:i<a.length-1?`.5px solid ${t.sep}`:0}}><span style={{fontSize:20,flexShrink:0}}>{item.icon}</span><div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:3}}>{item.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{item.text}</div></div></div>)}
      </Card>
    </div>}
    {tab==="lebanon"&&<div>
      <Hero t={t} color="#c8313c"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#f0a0a0",marginBottom:6}}>🇱🇧 THE LEBANON FRONT</div><div style={{fontSize:12,color:"rgba(255,255,255,.68)",lineHeight:1.6}}>The northern axis of the regional war: a US-brokered Israel-Lebanon framework signed Jun 26 exists on paper, but Israel keeps striking, still occupies ~20% of the south, and Hezbollah has rejected the deal outright. A ceasefire that neither fully holds nor fully collapses.</div></Hero>
      <Grid2 t={t} items={[
        {icon:"☠️",label:"Killed in Lebanon",val:"4,304+",sub:"Since fighting resumed Mar 2, 2026 (Lebanese MoH, Jul 5)",color:"#ef4444"},
        {icon:"🏠",label:"Displaced",val:"1M+",sub:"Forced from southern Lebanon",color:"#f97316"},
        {icon:"🪖",label:"Israeli occupation",val:"~20%",sub:"Of Lebanese territory, mostly the south",color:"#eab308"},
        {icon:"📜",label:"Framework signed",val:"Jun 26",sub:"US-brokered; rejected by Hezbollah",color:"#5b8ec8"},
      ]}/>
      <ST t={t} color="#c8313c">📍 The Framework — and Why It Isn't Holding</ST>
      <Card t={t}><div style={{padding:"11px 14px",fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>What was signed</span> — After five rounds of Washington talks, Israel and Lebanon signed a US-brokered framework on Jun 26 for "lasting peace and security." It ties any Israeli withdrawal to the verified disarmament of Hezbollah, envisions the Lebanese Armed Forces retaking the south, and — critically — does NOT mandate an unconditional Israeli pullout.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Why it's fragile</span> — Hezbollah chief Naim Qassem called the deal "null and void" and a surrender, vowing not to disarm. Israel resumed strikes on the south within two days of signing; Defense Minister Katz says forces will hold the buffer zone up to the Litani River until Hezbollah disarms. Each side reads the same text as a win on its own terms.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>How it started</span> — Dormant since the Nov 2024 ceasefire, the front reignited Mar 2, 2026 when Hezbollah fired on northern Israel in response to the US-Israeli war on Iran and the killing of Khamenei. Israel answered with airstrikes and a fresh ground invasion of the south.</div>
        <div><span style={{color:t.text,fontWeight:700}}>The Iran linkage</span> — Tehran insists Lebanon is inseparable from the broader war; FM Araghchi has warned any strike on Beirut would trigger a "full-scale resumption." That makes the Lebanon track a live variable in the Iran MoU timeline — see the Iran section.</div>
      </div></Card>
      <ST t={t} color="#c8313c">🗓️ Watch</ST>
      <Card t={t}><div style={{padding:"11px 14px",fontSize:12,color:t.sub,lineHeight:1.6}}>Lebanese President Joseph Aoun is due in Washington on Jul 21 to meet Trump. UNIFIL's mandate ends Dec 31, 2026 with no renewal — its exit removes the last neutral monitor from the south just as the framework depends on verification. Near-daily Israeli strikes continue; each Lebanese civilian death tests whether the framework survives.</div></Card>
      <Note t={t} color="#c8313c">Casualty and displacement figures per the Lebanese Health Ministry and UN; framework terms per the US State Department text and Al Jazeera/Reuters reporting. This tab covers the Israel-Hezbollah/Lebanon front; the Israel-Iran war and nuclear file are tracked in the Iran section.</Note>
    </div>}
    {tab==="governance"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #8b5cf6"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🌐 SIX MONTHS INTO THE CEASEFIRE</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,.75)",lineHeight:1.6}}>The Oct 10, 2025 ceasefire has held in the narrow sense — mass fighting stopped — but nearly every other pillar of the 20-point plan remains stalled. The Board of Peace's own assessment: "there is no recovery in Gaza."</div>
      </Hero>
      <ST t={t} color="#8b5cf6">🗺️ Territorial Control</ST>
      <Card t={t}>{[
        {icon:"📏",label:"Yellow Line → Orange Line",text:"Israel's post-ceasefire withdrawal line has shifted from ~53% territorial control at signing to ~64% as of mid-2026, per aid-group mapping — moving toward the Mediterranean, not away from it."},
        {icon:"⚠️",label:"Permanent-division risk",text:"Board of Peace envoy Nikolay Mladenov (May 2026): a prolonged stalemate risks \"a dangerous status quo\" — 2 million Palestinians left without a viable future while Israel's presence across the Strip entrenches."},
        {icon:"🏛️",label:"Governance vacuum",text:"The Board of Peace (chaired by Trump) and the National Committee for the Administration of Gaza (NCAG) were named in January 2026 but remain non-operational on the ground — no functioning transitional authority exists."},
        {icon:"🪖",label:"International Stabilization Force (ISF)",text:"A multinational force under the ceasefire plan, meant to backstop NCAG once it's operational; Kosovo is among the contributing states. A staging waypoint (\"Life Support Area Endurance\") is being set up on the Gaza border, but the ISF itself has not yet deployed into the Strip."},
        {icon:"🔻",label:"Hamas's residual control",text:"Estimated at ~40% of the Strip as of mid-2026 (Board of Peace sourcing via Jerusalem Post) — down from full control pre-ceasefire, but still enough to keep the \"governance vacuum\" above from resolving."},
      ].map((item,i,a)=><div key={i} style={{display:"flex",gap:10,padding:"11px 14px",borderBottom:i<a.length-1?`.5px solid ${t.sep}`:0}}><span style={{fontSize:20,flexShrink:0}}>{item.icon}</span><div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:3}}>{item.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{item.text}</div></div></div>)}</Card>
      <ST t={t} color="#8b5cf6">🏗️ Reconstruction</ST>
      <Grid2 t={t} items={[{val:"$70B",label:"Estimated cost",sub:"Brookings — \"no modern comparison\"",color:"#8b5cf6"},{val:"0",label:"Reconstruction begun",sub:"Six months post-ceasefire",color:"#ef4444"},{val:"80%",label:"Buildings damaged",sub:"Or destroyed",color:"#f97316"},{val:"1,144+",label:"Killed since ceasefire",sub:"As of Jul 19 (Gaza MoH)",color:"#ef4444"}]}/>
      <Note t={t} color="#8b5cf6">Jared Kushner's January 2026 "New Gaza" master plan (skyscrapers, seaside resorts) has been dismissed by experts as unrealistic even as a planning exercise. No credible reconstruction framework has replaced it.</Note>
    </div>}
    {tab==="syria"&&<div>
      <Hero t={t} color="#006c35"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#4ade80",marginBottom:6}}>🇸🇾 A FRAGILE TRANSITION, FOUR FRONTS AT ONCE</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Eighteen months after Assad's fall, interim President Ahmed al-Sharaa has secured Gulf investment and formalized anti-ISIS cooperation — but Damascus still doesn't fully control its own territory. Four distinct fault lines are live at once: the transition's own legitimacy, Israel's expanding occupation of the south, recurring sectarian massacres of minorities, and a Kurdish-led autonomous region that went from an integration deal to open government offensive within months.</div></Hero>
      <Grid2 t={t} items={[
        {icon:"⚰️",label:"Killed, Jul 2025 Sweida escalation alone",val:"1,700+",sub:"~200,000 displaced; UN Commission, war-crimes-level violations alleged",color:"#dc2626"},
        {icon:"🕯️",label:"Alawites killed, Mar 2025 coastal violence",val:"~1,500",sub:"Assad-regime remnant clashes triggered retaliatory sectarian killing",color:"#dc2626"},
        {icon:"🪖",label:"Israeli-occupied buffer zone",val:"Expanding",sub:"1974 Golan disengagement deal treated as void since Dec 2024",color:"#5b8ec8"},
        {icon:"🤝",label:"SDF integration deal",val:"Jan 2026 → collapsed",sub:"Ceasefire gave way to a government offensive in the northeast",color:"#eab308"},
      ]}/>
      <ST t={t} color="#4ade80">🏛️ The Transition — Consolidation Without Full Control</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Real progress</span> — Since Bashar al-Assad's ouster in Dec 2024, interim President Ahmed al-Sharaa (formerly the HTS commander known as al-Jolani) has secured large investment pledges from Gulf states, prioritized private-sector reconstruction over reliance on international aid that was never going to materialize, and formalized effective cooperation with the US-led anti-ISIS coalition.</div>
        <div><span style={{color:t.text,fontWeight:700}}>The limits</span> — Damascus still lacks real authority over Suwayda governorate in the south. CSIS's assessment: Sharaa has "steadily expanded state control" but the war in Iran next door — missile debris from Israeli-Iranian strikes has landed on Syrian soil and killed civilians — keeps straining a recovery that was already fragile. Washington has floated having Syria confront Hezbollah in Lebanon directly; Sharaa has repeatedly refused, saying Syria will only support Lebanon diplomatically and economically.</div>
      </div></div></Card>
      <ST t={t} color="#5b8ec8">🪖 Israel's Expanding Occupation</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Buffer zone, redefined</span> — Israel pushed deeper into Syrian territory immediately after Assad's fall, occupying an expanded buffer zone beyond the old UN-patrolled line and declaring the 1974 disengagement agreement void. It has stayed there since.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Strikes framed as Druze protection</span> — Repeated Israeli strikes on Syrian military positions — including hitting the heart of Damascus in March, and villages near Deraa as recently as late June — are officially framed as defending the Druze minority against government and allied forces. Syria's Foreign Ministry has condemned each round as a violation of its sovereignty and territorial integrity.</div>
        <div><span style={{color:t.text,fontWeight:700}}>A regional pattern, not isolated</span> — Jordan has separately struck Captagon-trafficking infrastructure inside Suwayda, treating the ungoverned south as a narcotics and smuggling hub as much as a sectarian flashpoint — a reminder multiple neighbors now operate inside Syrian territory for their own reasons.</div>
      </div></div></Card>
      <ST t={t} color="#dc2626">🕯️ Suwayda — Recurring Sectarian Violence</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>A pattern that keeps repeating</span> — Since Assad's fall, Syria's minorities have been hit by successive waves of sectarian killing: ~1,500 Alawites killed in coastal Latakia in Mar 2025 by regime-remnant-triggered retaliatory violence; 101 Druze killed in Apr-May 2025 in Suwayda-area massacres; then the largest single escalation — over 1,700 killed and ~200,000 displaced in Jul 2025, when a kidnapping dispute between a Druze merchant and Bedouin tribesmen spiraled into days of mortar and heavy-weapons fighting.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Contested accountability</span> — The UN Commission of Inquiry found the July 2025 violence, carried out by multiple actors including government forces and Druze armed groups, may amount to war crimes or crimes against humanity. The Washington Institute notes Druze leadership itself is divided — not a monolith — with Damascus and Israel each competing for influence among rival local leaders.</div>
        <div><span style={{color:t.text,fontWeight:700}}>Still unresolved</span> — Druze spiritual leader Hikmat al-Hijri has at points dissolved local legal structures and pushed for autonomous administration; other Druze factions favor working within the state. That split is itself part of why the violence keeps recurring rather than resolving.</div>
      </div></div></Card>
      <ST t={t} color="#eab308">🐾 SDF & the Kurdish Question — Deal, Then Offensive</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>The January deal</span> — Sharaa struck an integration agreement with the Kurdish-led Syrian Democratic Forces in January 2026, negotiated through US envoy Tom Barrack, meant to fold the SDF into the Syrian national army.</div>
        <div><span style={{color:t.text,fontWeight:700}}>It didn't hold</span> — By later in 2026, the government launched an offensive against SDF-held territory in the northeast — starting around Deir Hafer and Maskanah in Aleppo governorate, then expanding into Raqqa, Deir ez-Zor, and Al-Hasakah — with Turkey backing Damascus against the Kurdish forces it views as PKK-linked. Sharaa then unilaterally announced a 14-point ceasefire (again brokered by Barrack) under which the SDF would be integrated and Raqqa/Deir ez-Zor handed to the government. Whether that holds any better than January's deal did remains the open question.</div>
      </div></div></Card>
      <Note t={t} color="#006c35">Sources: Security Council Report monthly forecasts, CSIS, UN News/Commission of Inquiry, Al Jazeera, Washington Institute, Moshe Dayan Center. Casualty figures vary by source and period — shown ranges reflect the most-cited estimates for each distinct episode, not a single running total. Cross-reference: Lebanon Front tab (Sharaa's stated position on Hezbollah), Iran section (missile-debris spillover).</Note>
    </div>}
  </div>;
}


function IranSection({t,initialTab}){
  const[tab,setTab]=useState(initialTab??"overview");useEffect(()=>{if(initialTab)setTab(initialTab);},[initialTab]);
  const conflict=CONFLICTS.find(c=>c.id==="iran");
  const events=EVENTS.iran??[];
  const news=NEWS.filter(n=>n.conflictId==="iran");
  const TABS=[{id:"overview",label:"🇮🇷 Overview"},{id:"hormuz",label:"🚢 Hormuz"},{id:"timeline",label:"📅 Timeline"},{id:"gaps",label:"⚠️ Gaps"}];
  const TIMELINE=[
    {date:"Feb 28, 2026",label:"Operation Epic Fury",color:"#ef4444",text:"US-led strikes on Iranian nuclear facilities at Natanz, Fordow, and Isfahan. Iran immediately closes Strait of Hormuz. ~6,000 total killed in strikes."},
    {date:"Mar–May 2026",label:"Hormuz blockade — 3.5 months",color:"#f97316",text:"Iran maintains full Hormuz blockade. IMO: 20,000+ seafarers stranded on ~2,000 vessels. Global oil prices spike. US naval blockade imposed in response."},
    {date:"Jun 14, 2026",label:"Hormuz blockade lifted",color:"#22c55e",text:"Trump announces removal of US naval blockade. Iran concurrently lifts Hormuz closure. Tanker traffic resumes. IMO: 2,000 vessels freed."},
    {date:"Jun 16-17, 2026",label:"Lucerne technical talks",color:"#8b5cf6",text:"Pakistan/Qatar mediated talks in Switzerland. Joint statement: encouraging progress in positive and constructive atmosphere. Core enrichment and IAEA access gaps remain."},
    {date:"Jun 17, 2026",label:"Islamabad MoU signed",color:"#8b5cf6",text:"Trump signed at Versailles G7 dinner; Pezeshkian signed remotely. Pakistan brokered; Qatar, Saudi Arabia, Turkey facilitated. 60-day negotiation window opens."},
    {date:"Jun 21, 2026",label:"Enrichment red lines surface",color:"#ef4444",text:"Pezeshkian: we will never back down from the right to enrich uranium. IAEA inspection dispute: Iran demands sanctions relief first; US demands inspections first."},
    {date:"Jun 26, 2026",label:"Iran fires drones at Hormuz",color:"#ef4444",text:"Trump stated Iran fired 4 one-way attack drones at Hormuz — one struck cargo ship. Trump declared MoU violation. Talks entered jeopardy."},
    {date:"Jul 6-7, 2026",label:"Iran strikes three tankers",color:"#f97316",text:"IRGC missiles hit the Al Rekayyat (Marshall Islands flag), Saudi Wedyan and Liberian Cyprus Prosperity for transiting outside Iran's designated northern route. Saudi Arabia and Qatar condemned the attacks; at least one vessel had reportedly ignored Iranian warnings."},
    {date:"Jul 7, 2026",label:"US strikes 80+ targets, revokes GL X",color:"#dc2626",text:"CENTCOM hit air defenses, C2, coastal radar, anti-ship missile sites and 60+ IRGC boats over four hours — Kharg Island, Qeshm, Bandar Abbas, Sirik. Treasury simultaneously revoked the GL X oil-sales license. Trump ordered the strikes from the NATO summit in Ankara."},
    {date:"Jul 8, 2026",label:"IRGC counterstrike; Trump: MoU 'over'",color:"#dc2626",text:"IRGC claims strikes on 85 US military installations in Bahrain (5th Fleet, Sheikh Isa) and Kuwait (Ali Salem); sirens sounded three times in Bahrain. Trump declared the MoU 'over' and talks a 'waste of time,' then ordered additional strikes (Sirik, Bushehr, Konarak, Chabahar, Kish). Brent +6% to $78. Pezeshkian returned early from Khamenei's Najaf funeral procession."},
    {date:"Jul 9-10, 2026",label:"Khamenei buried; Mojtaba never appears",color:"#8b5cf6",text:"Khamenei and four family members were buried at the Imam Reza shrine in Mashhad (completed early Jul 10, IRNA) as crowds chanted 'Kill Trump.' US strikes continued through the funeral despite Trump's promised pause — Tehran-Mashhad rail was damaged. Successor Mojtaba Khamenei never appeared during the entire six-day funeral: NYT reports he was barred over assassination fears; Tehran sources say he is 'recovering' and not well enough for public appearances — four months into his tenure, Iranians have seen no image, video or voice recording of their supreme leader."},
    {date:"Jul 11, 2026",label:"Talks resume in Pakistan",color:"#8b5cf6",text:"First negotiating round after Khamenei's burial, hosted in Pakistan per Al Arabiya — agenda covers US sanctions, Iran's frozen assets, and the nuclear program. Convening at all is the test: Trump has declared the MoU 'over,' yet US strikes and Iranian retaliation continued through early July. Iran had not named its delegation lead as of the funeral's end. No government ever officially confirmed this meeting took place."},
    {date:"Jul 12-13, 2026",label:"Open combat resumes across five countries",color:"#dc2626",text:"IRGC intercepted two tankers in Hormuz; CENTCOM struck ~140 Iranian targets overnight including first-ever use of one-way attack sea drones. Iran retaliated across Jordan, Bahrain, Kuwait and Oman, injuring civilians in Qatar, and again claimed sole control of the Strait of Hormuz. The clearest sign yet that the 60-day MoU window has collapsed into active war rather than negotiation."},
    {date:"Jul 14, 2026",label:"Blockade in effect; MoU declared dead; ground war floated",color:"#dc2626",text:"The naval blockade formally took effect at 20:00 GMT — all flags, Iran's entire coastline including ports and oil terminals; neutral ships bound elsewhere may pass, humanitarian cargo subject to inspection (JMIC). A five-hour US wave struck six coastal areas (Bushehr, Chabahar, Jask, Konarak, Abu Musa, Bandar Abbas) plus Abadan's refinery city, Mahshahr, Qeshm and Kish, followed by yet another round late Tuesday. Iran hit al-Juffair base in Bahrain (5th Fleet HQ) and fired on Jordan (4 missiles downed); an Indian crew member died aboard the UAE tanker Mombasa. Iran's deputy FM declared Tehran has 'no commitments' left under the MoU; its parliament introduced a Hormuz-control bill. Trump: strikes continue 'until I say it's enough,' threatening bridges and power plants 'next week' and declining to rule out a ground campaign."},
    {date:"Jul 15, 2026",label:"Fifth straight strike day; US disables tanker with Hellfire missiles",color:"#dc2626",text:"CENTCOM confirmed a fifth consecutive day of strikes, focused on degrading Iran's ability to threaten commercial shipping in the strait. In the blockade's first 24 hours, a US aircraft fired Hellfire missiles into the smokestack of the Curaçao-flagged tanker M/T Belma after it ignored repeated warnings and continued toward Iran's Kharg Island — the first confirmed enforcement strike of the blockade, disabling rather than sinking the vessel. IRGC restated its threat to halt all regional energy exports: 'The export of oil and gas from the region will be either for everyone or for no one.' Brent held near $80/bbl, up from ~$69 in June."},
    {date:"Jul 16, 2026",label:"Strikes expand into northern Iran; port surveillance tower destroyed",color:"#dc2626",text:"The campaign widened geographically for the first time: AP reported the US expanded strikes into northern Iran and disabled another vessel attempting to run the blockade — the second confirmed enforcement strike after the Belma. CENTCOM released video of a strike destroying an IRGC port surveillance tower near the Strait it says was used to track and target commercial vessels — Iran calls the tower a civilian structure. Iran's Foreign Ministry spokesman Baghaei said the US-Iran MOU has 'entered a crisis stage,' blaming US commitment violations; weekend talks in Oman focused solely on Hormuz reached no agreement, which Tehran attributed to US pressure on Muscat. On the US side, House Republicans unveiled a $95B Iran-war funding plan while Senate Democrats blocked a $1T defense bill in protest over the war."},
    {date:"Jul 17, 2026",label:"Bridges struck in Hormozgan; seventh night",color:"#dc2626",text:"US forces completed a seventh consecutive night of strikes, hitting six bridges connecting cities near Bandar Abbas in Hormozgan province — at least 8 killed, 20 injured per Iranian state media. Iran widened its own retaliation to US allies: Jordan, Qatar and Kuwait all endured Iranian fire, and Iran claimed strikes on US facilities in Bahrain and Syria. Separately, at least 7 were killed in an Israeli strike in central Gaza, the highest single-incident toll there in weeks."},
    {date:"Jul 18, 2026",label:"Jordan attack kills US troops — first fatalities since March",color:"#dc2626",text:"Iranian strikes on US forces in Jordan killed American service members — initially reported as 2 killed, 1 missing — prompting an eighth consecutive night of US strikes; Kuwait's main desalination plant was hit for a second time, leaving 10,000 without water. Iran's health ministry said 50+ killed, 500+ injured domestically since Jul 6. Iran's negotiators called the MoU 'effectively suspended.'"},
    {date:"Jul 19, 2026",label:"Toll revised to 3 US dead; Iran hits Jordan and warns Israel",color:"#dc2626",text:"CENTCOM confirmed a service member was killed in a controlled detonation of an Iranian drone in Iraq's Kurdistan Region, and recovered remains at the Jordan base — bringing the confirmed US death toll to 3, not 2+1 missing. The Pentagon separately said nearly 100 US troops have suffered some injury since Jul 7 (96% returned to duty, mostly concussions), pushing back on a NYT report alleging undercounted casualties. Iran fired missiles toward Aqaba, Jordan and warned Israel; Israeli defense minister Katz and IDF chief Kamir both said Israel would respond immediately and without condition to any Iranian attack — the clearest sign yet Israel could be drawn back in directly."},
    {date:"Jul 20, 2026",label:"Ninth night of strikes; Houthis declare maritime embargo; Hormuz traffic collapses",color:"#dc2626",text:"The US carried out a ninth consecutive night of strikes, hitting Abadan (near the Iraq border) and cities across the country — Tabriz in the northwest, Chabahar, Konarak, Bandar Mahshahr, Bandar Imam Khomeini, Jask, Sirik and Bushehr — the widest single-night geographic spread of the campaign. The Houthis announced a new maritime embargo in solidarity with Iran, adding a further actor to the conflict. Hormuz traffic has collapsed to just ~9 vessels passing in 24 hours, versus a pre-war average of ~130/day (Library of Congress); Brent crude surged to ~$90.78/bbl and WTI to ~$84.85, both up roughly 3% on the day."},
    {date:"~Aug 16, 2026",label:"60-day MoU clock expires",color:"#ef4444",isUpcoming:true,text:"Window closes. Trump has said he could relaunch military strikes if talks fail. If no deal, Iran resumes full enrichment and Hormuz re-closure is possible."},
  ];
  const GAPS=[
  {icon:"🚢",label:"Hormuz governance & routes",status:"KINETIC",color:"#dc2626",text:"The gap that ignited Jul 6-8: Iran insists shipping use its designated northern route under Iranian control and is negotiating a 'service fee' framework with Oman; Washington insists the strait is international water and will not tolerate tolls or route regimes. Iran enforced its rules with missiles; the US answered with two strike waves. The MoU text obliges Iran to keep the strait open and toll-free through the 60-day window — both sides now claim the other broke it."},
    {icon:"☢️",label:"Enrichment",status:"UNRESOLVED",color:"#ef4444",text:"US demands zero enrichment. Iran insists on its right to enrich under NPT. No bridge found in Lucerne. This is the core gap."},
    {icon:"🔍",label:"IAEA access to bombed sites",status:"BREACH ALLEGED",color:"#dc2626",text:"US: Iran must allow IAEA to inspect bombed Natanz, Fordow, Isfahan. Iran: inspections only after sanctions relief — classic sequencing deadlock. Now sharper: CNN/Institute for Science and International Security satellite imagery (published Jul 10, shots from Jun 22–Jul 7) shows Iran repairing bomb-impact holes and reinforcing concrete at the Taleghan 2 facility inside Parchin, plus vehicle traffic at the underground Pickaxe Mountain site — activity ISIS founder David Albright called 'significant, new attempted reconstruction.' No comparable rebuilding was seen at Natanz, Fordow or Isfahan. The work began while the MoU was still nominally in force, before Trump's Jul 8 'MoU is over' declaration."},
    {icon:"🚀",label:"Missile programme",status:"IRAN RED LINE",color:"#ef4444",text:"Pezeshkian: the discussion over our missiles does not exist in the MoU, and it never will. Tehran absolute red line. US insists missiles are a requirement."},
    {icon:"🇱🇧",label:"Lebanon / Hezbollah",status:"COMPLICATING",color:"#f97316",text:"Israel-Hezbollah fighting ongoing. Iran demands Lebanon fighting stops as part of any final deal. Israel is not party to MoU — Netanyahu and Trump do not always see eye to eye."},
    {icon:"🇾🇪",label:"Houthi maritime embargo",status:"NEW ACTOR",color:"#dc2626",text:"The Houthis announced their own maritime embargo Jul 20 in solidarity with Iran — not a party to the MoU, but with an established track record of Red Sea shipping attacks. Raises the risk of the conflict spreading to a second maritime chokepoint (Bab-el-Mandeb) on top of Hormuz."},
    {icon:"💰",label:"Sanctions relief",status:"SEQUENCING",color:"#eab308",text:"Iran: sanctions relief first, then IAEA access. US: IAEA verification first, then sanctions. Sequencing disagreement mirrors 2015 JCPOA negotiations."},
  ];
  const TB={padding:"5px 10px",fontSize:11,borderRadius:16,cursor:"pointer",fontFamily:FONT,fontWeight:600};
  return <div>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
      {TABS.map(tb=><button key={tb.id} onClick={()=>setTab(tb.id)} style={{...TB,background:tab===tb.id?"#8b5cf6":"none",color:tab===tb.id?"#fff":t.sub,border:`1px solid ${tab===tb.id?"#8b5cf6":t.border}`}}>{tb.label}</button>)}
    </div>
    {tab==="overview"&&<div>
      <ConflictOverviewCard conflict={conflict} t={t}/>
      <Hero t={t} style={{borderLeft:"4px solid #8b5cf6"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🚨 Ninth Night of Strikes — Houthis Join, Hormuz Traffic Collapses</div>
        <Grid2 t={t} items={[{val:"3 killed",label:"US troops, Jordan attack",sub:"Confirmed Jul 19 — first US combat deaths since March",color:"#dc2626"},{val:"~9 vs ~130",label:"Hormuz daily crossings",sub:"Jul 20 vs pre-war average",color:"#dc2626"},{val:"~$91/bbl",label:"Brent crude",sub:"Up from ~$69 in June",color:"#f97316"},{val:"26 days",label:"MoU clock (nominal)",sub:"Now overtaken by events on the ground",color:"#8b5cf6"}]}/>
      </Hero>
      <ST t={t}>📡 Key Intelligence</ST>
      <Card t={t}>{[{icon:"📜",label:"Islamabad Memorandum",text:"Signed Jun 17. Pakistan brokered; Qatar, Saudi Arabia, Turkey, Egypt facilitated. 60-day window covers nuclear program, Hormuz shipping, sanctions, missiles, Lebanon."},{icon:"🚢",label:"Hormuz: live-fire zone again",text:"Iran struck three tankers Jul 6-7 (Marshall Islands-flagged Al Rekayyat, Saudi Wedyan, Liberian Cyprus Prosperity) for using non-designated routes. US answered with 80+ targets Jul 7 and a second round Jul 8 (Sirik, Bushehr, Konarak, Chabahar, Kish). IRGC claims strikes on 85 US military sites in Bahrain and Kuwait."},{icon:"🇾🇪",label:"Houthis join the conflict",text:"The Houthis announced a maritime embargo Jul 20 in solidarity with Iran, adding a further armed actor with a track record of Red Sea shipping attacks — a real risk of the war spreading to a second maritime chokepoint."},{icon:"☢️",label:"Nuclear: IAEA inspectors",text:"MoU allows IAEA inspectors back into Iran. But Iran and US in dispute over whether bombed sites must be opened before or after sanctions relief."},{icon:"⚠️",label:"MoU state of play",text:"Trump at Ankara: the MoU is 'over' and talks 'might' continue but are a 'waste of time.' The White House frames strikes as limited retribution with the MoU technically intact; Treasury revoked the GL X oil license. Iran calls both 'major violations.' Enrichment, missiles and now Hormuz governance all unbridged — 26 days to Aug 16, and Iran's negotiators now call the MoU ‘effectively suspended’ over US violations."}].map((item,i,a)=><div key={i} style={{display:"flex",gap:10,padding:"11px 14px",borderBottom:i<a.length-1?`.5px solid ${t.sep}`:0}}><span style={{fontSize:20,flexShrink:0}}>{item.icon}</span><div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:3}}>{item.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{item.text}</div></div></div>)}
      </Card>
      {news.map(item=><Card key={item.id} t={t} style={{borderLeft:`4px solid ${item.impactColor}`}}><div style={{padding:"11px 14px"}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6,flexWrap:"wrap"}}><Pill label={item.conflict} color={item.conflictColor}/><span style={{fontSize:10,color:t.sub}}>{item.publishedAt}</span><Freshness t={t} date={item.publishedAt}/></div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:6}}>{item.headline}</div>{item.bullets.map((b,i)=><div key={i} style={{display:"flex",gap:6,fontSize:12,color:t.sub,marginBottom:4,lineHeight:1.5}}><span style={{color:item.impactColor,flexShrink:0}}>▸</span>{b}</div>)}<div style={{fontSize:11,color:item.impactColor,fontWeight:600,marginTop:6}}>{item.impact}</div></div></Card>)}
    </div>}
    {tab==="timeline"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #8b5cf6"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>📅 US-Iran War 2026 — Full Timeline</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>From Operation Epic Fury (Feb 28) through the Islamabad MoU and the 26-day countdown to Aug 16.</div>
      </Hero>
      <Card t={t}>{TIMELINE.map((ev,i)=><div key={i} style={{display:"flex",gap:12,padding:"12px 14px",borderBottom:i<TIMELINE.length-1?`.5px solid ${t.sep}`:0}}><div style={{minWidth:80,fontSize:10,fontWeight:700,color:ev.color,paddingTop:2,flexShrink:0,lineHeight:1.4}}>{ev.date}</div><div><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>{ev.isUpcoming&&<Pill label="UPCOMING" color="#8b5cf6"/>}<div style={{fontSize:13,fontWeight:700,color:t.text}}>{ev.label}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{ev.text}</div></div></div>)}</Card>
    </div>}
    {tab==="gaps"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #ef4444"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>⚠️ Unresolved Gaps — 26 Days Remain</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Six fundamental disagreements remain unbridged. The sixth — who controls Hormuz — has already turned kinetic.</div>
      </Hero>
      {GAPS.map((g,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${g.color}`}}><div style={{padding:"11px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontSize:18}}>{g.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text,flex:1}}>{g.label}</div><Pill label={g.status} color={g.color}/></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{g.text}</div></div></Card>)}
      <EventsTimeline t={t} events={events} label="Key Milestones"/>
    </div>}

    {tab==="hormuz"&&<div>
      <Hero t={t} color="#0e7490"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#22d3ee",marginBottom:6}}>🚢 THE HORMUZ BLOCKADE</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>The strait — the artery for roughly a fifth of global oil — is under dueling regimes: Iran claims sole control and strikes "non-compliant" vessels; the US has imposed a formal naval blockade of the entire Iranian coastline, effective 20:00 GMT Jul 14. Every transit is now a live test of two competing claims to the same water.</div></Hero>
      <ST t={t} color="#0e7490">📖 What This Blockade Actually Means</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>The mechanism</span> — Enforcement runs through the Joint Maritime Information Center (JMIC), the US-led body that issues warnings and tracks compliance. In practice: vessels bound for Iranian ports are barred outright; neutral ships bound for non-Iranian ports may pass; humanitarian cargo is allowed but subject to inspection. It covers the entire Iranian coastline, not just the strait itself, and applies to all flags — there's no carve-out for non-US-aligned shipping.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>What "enforcement" looks like</span> — The blockade had its first live test within 24 hours: the Curaçao-flagged tanker M/T Belma ignored repeated warnings and continued toward Iran's Kharg Island. A US aircraft fired Hellfire missiles into its smokestack — disabling, not sinking, the vessel. That's the demonstrated threshold so far: warned, then disabled, not destroyed outright. Whether that stays the pattern for future blockade-runners is one of the dashboard's open watch items.</div>
        <div><span style={{color:t.text,fontWeight:700}}>A legal wrinkle worth knowing</span> — Naval blockades have traditionally been treated under international law as acts of war in their own right, independent of any other hostilities. Washington has avoided the formal word "blockade" in some official language, framing the posture instead as maritime interdiction — a distinction with real legal weight, even though the practical effect (barring transit, boarding or striking non-compliant vessels) is the same either way.</div>
      </div></div></Card>
      <Grid2 t={t} items={[
        {icon:"🛢️",label:"Share of global oil transiting Hormuz",val:"~20%",sub:"Plus roughly a third of seaborne LNG",color:"#0e7490"},
        {icon:"📉",label:"Daily strait crossings",val:"~9 vs ~130",sub:"Jul 20 vs pre-war average (MarineTraffic/Library of Congress)",color:"#dc2626"},
        {icon:"🚨",label:"Blockade effective",val:"Jul 14",sub:"20:00 GMT — all flags, entire Iranian coastline",color:"#dc2626"},
        {icon:"🎯",label:"Confirmed enforcement strikes",val:"2",sub:"M/T Belma (Jul 15) + a second vessel (Jul 16) — both disabled, not sunk",color:"#f97316"},
        {icon:"⏳",label:"MoU deadline",val:"Aug 16",sub:"60-day Islamabad window — now a formality",color:"#8b5cf6"},
      ]}/>
      <ST t={t} color="#0e7490">📋 Status Board — Blockade Era</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Jul 14 — blockade declared</span> — CENTCOM formalized the naval blockade of Iran's entire coastline at 20:00 GMT, superseding the looser designated-route enforcement Iran had been running unilaterally since early July.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Jul 15-16 — two enforcement strikes</span> — The M/T Belma ignored warnings toward Kharg Island and was hit with Hellfire fire Jul 15; a second vessel attempting to run the blockade was disabled Jul 16 as the campaign widened into northern Iran for the first time.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Jul 18-19 — Jordan attack, US toll revised to 3 dead</span> — Iranian strikes on US forces in Jordan, initially reported as 2 killed/1 missing, were confirmed Jul 19 as 3 US service members killed — the first American combat fatalities of this round since March. The Pentagon separately disclosed nearly 100 troops injured (96% returned to duty) since Jul 7, pushing back on reports of undercounted casualties.</div>
        <div><span style={{color:t.text,fontWeight:700}}>Jul 20 — ninth night, Houthis join, traffic collapses</span> — Strikes hit Abadan and Tabriz (the widest geographic spread yet) as the Houthis announced their own maritime embargo in solidarity with Iran. Hormuz daily crossings have fallen to roughly 9 vessels versus a ~130/day pre-war average; Brent crude jumped to ~$91/bbl. UK and French patrol offers remain rejected by Iran's chief negotiator, who asserts only coastal states control Hormuz security.</div>
      </div></div></Card>
      <Note t={t} color="#0e7490">Transit counts and U-turn figures are tracking-data snapshots (MarineTraffic via CNN reporting), not audited totals — treat day-to-day numbers as directional. Cross-reference: Timeline tab for the full day-by-day record, Sanctions & Energy trackers on Today, and the Gaps tab for the Pickaxe Mountain/Natanz friction points.</Note>
    </div>}
  </div>;
}

function BelarusSection({t,initialTab}){
  const[tab,setTab]=useState(initialTab??"overview");useEffect(()=>{if(initialTab)setTab(initialTab);},[initialTab]);
  const news=NEWS.filter(n=>n.conflict==="Belarus");
  const HOMEFRONT=[
    {icon:"🪖",label:"Kursk Oblast",color:"#f97316",text:"Russia recaptured most of Kursk by mid-2025 after Ukraine's Aug 2024 incursion. Sporadic Ukrainian cross-border raids and drone strikes continue; ~3,400 displaced remain per Russia Matters data."},
    {icon:"🗣️",label:"Duma escalation rhetoric",color:"#ef4444",text:"Aleksey Zhuravlyov, first deputy chair of the Duma Defense Committee, threatened Moscow could 'blow up half of Finland,' calling it a 'second Ukraine' as NATO's newest member."},
    {icon:"📉",label:"Refinery-driven inflation",color:"#eab308",text:"Ukrainian deep strikes have knocked ~40% of Russian refining capacity offline, driving fuel shortages and double-digit inflation. CBR holding its key rate at 21%."},
    {icon:"👥",label:"Mobilisation strain",color:"#f97316",text:"Russia is losing ~40,000/month — more than it recruits since Nov 2025 per the Telegraph. Wage inflation ~20%; NWF buffer drawn down to ~$36B from $113.5B pre-war."},
  ];
  const NUCLEAR_FACTS=[
    {icon:"🚀",label:"Delivery systems",text:"Iskander-M tactical missile systems (dual-capable, conventional or nuclear) confirmed deployed to Belarus. Belarus's Su-25 fleet was also reportedly modified for nuclear delivery."},
    {icon:"🔢",label:"Warhead count — undisclosed",text:"Neither Moscow nor Minsk has confirmed a number. Independent estimates (SIPRI, FAS) generally describe a small tactical arsenal — likely low double digits — but this is inference, not disclosure."},
    {icon:"🏛️",label:"Legal basis",text:"Lukashenko and Putin frame this under the Union State treaty framework — Belarus argues it retains 'control' while Russia controls launch authority, echoing NATO's own nuclear-sharing arrangements (see Great Power Rivalry → NATO tab)."},
    {icon:"🌍",label:"NATO response",text:"NATO has not repositioned its own nuclear posture in response, but cites the deployment as justification for continued Eastern Flank reinforcement."},
  ];
  const BEL_EVENTS=[
    {id:1,date:"Feb 2022",label:"Launchpad for invasion",note:"Belarus allowed Russia to stage the initial 2022 invasion from its territory.",color:"#ef4444"},
    {id:2,date:"2023",label:"Russian tactical nukes deployed",note:"Belarus agreed to host Russian tactical nuclear weapons — first deployment outside Russia since the USSR collapsed.",color:"#ef4444"},
    {id:3,date:"Jun 19, 2026",label:"Zelensky 7-day ultimatum",note:"Ukraine gave Minsk one week to dismantle Shahed relay stations or face strikes.",color:"#f97316"},
    {id:4,date:"Jun 22, 2026",label:"Relay shutdown",note:"Guidance equipment ceased operations ahead of the deadline — partial compliance.",color:"#22c55e"},
    {id:5,date:"Jun 26-27, 2026",label:"Secret Valdai summit",note:"Putin-Lukashenko 2-day talks. WSJ: second-front pressure. No communique issued.",color:"#ef4444"},
  ];
  const TB={padding:"5px 10px",fontSize:11,borderRadius:16,cursor:"pointer",fontFamily:FONT,fontWeight:600};
  return <div>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
      {[{id:"overview",label:"🇧🇾 Overview"},{id:"basing",label:"🪖 Mobilization & Basing"},{id:"nuclear",label:"☢️ Nuclear Hosting"},{id:"homefront",label:"🏠 Home Front"},{id:"timeline",label:"📜 Timeline"}].map(tb=><button key={tb.id} onClick={()=>setTab(tb.id)} style={{...TB,background:tab===tb.id?"#f97316":"none",color:tab===tb.id?"#fff":t.sub,border:`1px solid ${tab===tb.id?"#f97316":t.border}`}}>{tb.label}</button>)}
    </div>
    {tab==="overview"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #f97316"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:28}}>🇧🇾</span><div><div style={{fontSize:16,fontWeight:800,color:"#fff"}}>Belarus</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}><Pill label="CO-BELLIGERENT" color="#f97316"/><Pill label="Union State" color="#ef4444"/></div></div></div>
        <div style={{fontSize:13,color:"rgba(255,255,255,.75)",lineHeight:1.6,marginBottom:12}}>ISW assesses Belarus as effectively a co-belligerent. Minsk has avoided sending troops, but it hosts Russian tactical nukes, provided launch territory in 2022, and operated Shahed guidance relays until Ukraine's June ultimatum forced a shutdown.</div>
        <Grid2 t={t} items={[{val:"Day 2",label:"Valdai summit",sub:"Second-front pressure",color:"#ef4444"},{val:"Jun 22",label:"Relay shutdown",sub:"Partial compliance",color:"#22c55e"},{val:"~Jun 30",label:"Ultimatum window",sub:"Full dismantlement unconfirmed",color:"#f97316"},{val:"Yes",label:"Hosts RU tac-nukes",sub:"Since 2023",color:"#ef4444"}]}/>
      </Hero>
      {news.map(item=><Card key={item.id} t={t} style={{borderLeft:`4px solid ${item.impactColor}`}}><div style={{padding:"12px 14px"}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6,flexWrap:"wrap"}}><Pill label={item.conflict} color={item.conflictColor}/><span style={{fontSize:10,color:t.sub}}>{item.publishedAt}</span><Freshness t={t} date={item.publishedAt}/></div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:6}}>{item.headline}</div>{item.bullets.map((b,i)=><div key={i} style={{display:"flex",gap:6,fontSize:12,color:t.sub,marginBottom:4,lineHeight:1.5}}><span style={{color:item.impactColor,flexShrink:0}}>▸</span>{b}</div>)}<div style={{fontSize:11,color:item.impactColor,fontWeight:600,marginTop:6}}>{item.impact}</div></div></Card>)}
    </div>}
    {tab==="nuclear"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #ef4444"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>☢️ NUCLEAR HOSTING — SINCE 2023</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,.75)",lineHeight:1.6}}>Belarus became the first non-Russian state to host Russian nuclear weapons since the USSR's collapse — a status distinct from every other actor in this dashboard, including Iran and North Korea.</div>
      </Hero>
      <ST t={t} color="#ef4444">📋 What's Confirmed</ST>
      <Card t={t}>{NUCLEAR_FACTS.map((item,i,a)=><div key={i} style={{display:"flex",gap:10,padding:"11px 14px",borderBottom:i<a.length-1?`.5px solid ${t.sep}`:0}}><span style={{fontSize:20,flexShrink:0}}>{item.icon}</span><div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:3}}>{item.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{item.text}</div></div></div>)}</Card>
      <Note t={t} color="#ef4444">This is genuinely different from Iran or North Korea's nuclear status — Belarus hosts foreign (Russian-controlled) weapons rather than pursuing its own program. See Nuclear → Global Arsenals for the full state-by-state comparison.</Note>
    </div>}
    {tab==="basing"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #f97316"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>🪖 Mobilization & Russian Basing</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Belarus supplies territory and infrastructure rather than troops — the basing footprint is the real measure of its co-belligerency, not mobilization, which Lukashenko has avoided declaring.</div>
      </Hero>
      <ST t={t} color="#f97316">📍 Russian Force Posture in Belarus</ST>
      <Card t={t}>{[
        {icon:"☢️",label:"Tactical nuclear weapons",text:"Hosted since 2023 — first Russian nuclear deployment outside Russia since the USSR. Storage site near Asipovichy; command-and-control arrangements remain opaque (see Nuclear tab)."},
        {icon:"✈️",label:"Air basing",text:"Machulishchy and Baranavichy airbases host Russian aircraft on rotation, used for both Ukraine strike sorties early in the war and continued joint air-policing patrols."},
        {icon:"🏗️",label:"Zapad exercises",text:"Recurring joint Russia-Belarus exercises (last major iteration Zapad 2025) function as a standing pretext for force buildup near the Ukrainian and NATO (Poland/Lithuania) borders without a formal mobilization order."},
        {icon:"🚫",label:"No Belarusian mobilization",text:"Lukashenko has not mobilized Belarusian troops for direct participation despite hosting Russian forces — ISW assesses this reflects both domestic political risk and Moscow's preference for Belarus as a logistics/basing asset over a manpower source."},
        {icon:"🚚",label:"Logistics & transshipment",text:"Belarusian rail and road networks remain a key resupply corridor for Russian forces in northern Ukraine and a transit route for Iranian-design Shahed/Geran components before the Jun 2025 relay shutdown."},
      ].map((h,i,a)=><div key={i} style={{display:"flex",gap:10,padding:"11px 14px",borderBottom:i<a.length-1?`.5px solid ${t.sep}`:0}}><span style={{fontSize:18,flexShrink:0}}>{h.icon}</span><div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:3}}>{h.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{h.text}</div></div></div>)}</Card>
      <Note t={t} color="#f97316">Basing details per ISW and Belarusian Hajun Project reporting; exact troop/weapon counts are not independently verifiable and are treated as directional. Nuclear command-and-control specifics: see Nuclear Hosting tab.</Note>
    </div>}
    {tab==="homefront"&&<div>
      <ST t={t} color="#f97316">🏠 Russian Home Front</ST>
      {HOMEFRONT.map((h,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${h.color}`}}><div style={{padding:"11px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18}}>{h.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text}}>{h.label}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{h.text}</div></div></Card>)}
    </div>}
    {tab==="timeline"&&<EventsTimeline t={t} events={BEL_EVENTS} label="Belarus Timeline"/>}
  </div>;
}


function NuclearSection({t,initialTab}){
  const[tab,setTab]=useState(initialTab??"vectors");useEffect(()=>{if(initialTab)setTab(initialTab);},[initialTab]);
  const TABS=[{id:"vectors",label:"⚠️ Active Vectors"},{id:"arsenals",label:"🌐 Global Arsenals"},{id:"delivery",label:"🚀 Delivery Systems"},{id:"treaties",label:"📜 Treaties & Doctrine"},{id:"cyber",label:"🌪️ Cyber & Hybrid"}];

  const VECTORS=[
    {flag:"🇷🇺",name:"Russia — Strategic Signalling",status:"ACTIVE",color:"#ef4444",text:"Largest arsenal on earth. Putin has repeatedly invoked nuclear rhetoric. IC consensus (Jun 2026): threats are coercive, not operational — any use would forfeit Chinese support, Putin's true red line."},
    {flag:"🇧🇾",name:"Belarus — Forward-Based Tac-Nukes",status:"DEPLOYED",color:"#f97316",text:"Hosts Russian tactical nuclear weapons since 2023 — first deployment outside Russia since the USSR. Russia has now started building a forward-operating base in Belarus for its dual-capable Oreshnik IRBM (SIPRI); Oreshnik has already struck Ukraine with conventional warheads, most recently May 2026. Separately, Russia claims a 2025 successful 14,000km test of the nuclear-powered Burevestnik cruise missile after repeated failures."},
    {flag:"🇮🇷",name:"Iran — Nuclear Clock",status:"26 DAYS",color:"#8b5cf6",text:"Islamabad MoU 60-day window closes ~Aug 16. IAEA inspector access disputed. Enrichment red lines unresolved — Pezeshkian: 'we will never back down from the right to enrich uranium.'"},
    {flag:"🇺🇦",name:"Ukraine — Deterrence Shift",status:"WATCH",color:"#22c55e",text:"Fire Point's FP-9 (850km, Moscow-capable) and the Freyja ABM system mark a move toward sovereign strategic deterrence outside the US approval cycle — a structural change in the strike balance."},
  ];

  const ARSENALS=[
    {country:"🇷🇺 Russia",warheads:"~5,580",deployed:"~1,718 deployed strategic",color:"#ef4444"},
    {country:"🇺🇸 United States",warheads:"~5,044",deployed:"~1,670 deployed strategic",color:"#5b8ec8"},
    {country:"🇨🇳 China",warheads:"~620",deployed:"Rapidly expanding — fastest growth rate of any state (SIPRI, Jun 2026)",color:"#eab308"},
    {country:"🇫🇷 France",warheads:"~290",deployed:"~280 (submarine + air) — Macron ordered an increase Mar 2026; France stopped disclosing figures the same month",color:"#8b5cf6"},
    {country:"🇬🇧 United Kingdom",warheads:"~225",deployed:"~120 deployed (submarine-only, no longer publicly disclosed since 2021)",color:"#5b8ec8"},
    {country:"🇵🇰 Pakistan",warheads:"~170",deployed:"Non-deployed — assembled on short notice",color:"#22c55e"},
    {country:"🇮🇳 India",warheads:"~172",deployed:"Non-deployed — declared 'no first use' doctrine",color:"#f97316"},
    {country:"🇮🇱 Israel",warheads:"~90 (undeclared)",deployed:"Policy of deliberate ambiguity — never officially confirmed",color:"#f97316"},
    {country:"🇰🇵 North Korea",warheads:"~60 (est.)",deployed:"Non-NPT signatory — SIPRI Jun 2026 estimate, up from ~50",color:"#dc2626"},
  ];

  const TREATIES=[
    {icon:"📉",label:"New START — EXPIRED Feb 5, 2026",color:"#ef4444",text:"The last US-Russia strategic arms treaty, capping deployed strategic warheads at 1,550 each, lapsed on Feb 5, 2026 with no replacement — the first time since 1972 the two largest arsenals operate without a binding numerical cap. The US left a Russian offer to informally observe the limits for one more year unanswered; Trump wants a 'modernized' treaty including China, which Beijing refuses. Both sides retain upload capacity (Minuteman III / Trident II) to add warheads if either breaks out."},
    {icon:"✍️",label:"Non-Proliferation Treaty (NPT)",color:"#5b8ec8",text:"191 states party — the cornerstone of the global non-proliferation regime since 1970. India, Pakistan, Israel, and North Korea (which withdrew in 2003) sit outside it entirely, which is why their arsenals are tracked separately from the five NPT-recognized nuclear states (US, Russia, China, France, UK)."},
    {icon:"🎯",label:"Doctrine: No-First-Use vs. Ambiguity",color:"#eab308",text:"China and India maintain declared no-first-use policies. The US, Russia, France, UK, Pakistan, and Israel maintain deliberate ambiguity or explicit first-use options under certain conditions — Russia's doctrine permits nuclear response to conventional threats against its territorial integrity."},
    {icon:"🤝",label:"NATO Nuclear Sharing",color:"#5b8ec8",text:"US tactical weapons are forward-deployed under dual-key arrangements in Belgium, Germany, Italy, the Netherlands, and Turkey — host nations maintain delivery aircraft, but launch authority remains exclusively American. Full detail in Great Power Rivalry → NATO & Allies tab."},
    {icon:"🛰️",label:"Missile Defense Treaties",color:"#8b5cf6",text:"The US withdrew from the 1972 Anti-Ballistic Missile Treaty in 2002, freeing it to pursue GMD and Aegis BMD systems — a long-standing Russian grievance cited in Moscow's own strategic modernization justifications."},
  ];


  const DELIVERY=[
    {leg:"🚀 Land — ICBMs",color:"#ef4444",rows:[
      {country:"🇺🇸 US",sys:"Minuteman III → Sentinel (LGM-35A)",note:"400 silos; Sentinel replacement running years late and over budget, first fielding now late-decade."},
      {country:"🇷🇺 Russia",sys:"RS-28 Sarmat ('Satan II'), Yars, Avangard HGV",note:"Heavy Sarmat had a troubled test record; Avangard hypersonic glide vehicle fielded on some ICBMs."},
      {country:"🇨🇳 China",sys:"DF-41, DF-31AG, DF-5B",note:"350+ new silos since 2021 across three fields — the core of China's rapid expansion."},
    ]},
    {leg:"🌊 Sea — SLBMs / SSBNs",color:"#5b8ec8",rows:[
      {country:"🇺🇸 US",sys:"Ohio-class → Columbia-class, Trident II D5",note:"Columbia SSBN entering production to replace 14 Ohio boats; the most survivable US leg."},
      {country:"🇷🇺 Russia",sys:"Borei-A class, Bulava SLBM",note:"Newer Borei-A boats steadily replacing Soviet-era Delta-class."},
      {country:"🇨🇳 China",sys:"Type 094 → Type 096, JL-3 SLBM",note:"JL-3 gives China's boats the range to target the continental US from bastions closer to home."},
    ]},
    {leg:"✈️ Air — Bombers / ALCMs",color:"#eab308",rows:[
      {country:"🇺🇸 US",sys:"B-52J, B-2 → B-21 Raider, LRSO cruise missile",note:"B-21 in flight test — the first new US strategic bomber in decades; LRSO replaces the aging AGM-86."},
      {country:"🇷🇺 Russia",sys:"Tu-160M, Tu-95MS, Kh-102 ALCM",note:"Tu-160M 'Blackjack' production restarted; several airframes damaged in Ukraine's 2025 Operation Spiderweb."},
      {country:"🇨🇳 China",sys:"H-6N (air-launched ballistic), H-20 (in development)",note:"H-20 stealth bomber would complete China's triad; not yet public."},
    ]},
  ];

  return <div>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
      {TABS.map(tb=><button key={tb.id} onClick={()=>setTab(tb.id)} style={{padding:"5px 10px",fontSize:11,borderRadius:16,cursor:"pointer",fontFamily:FONT,fontWeight:600,background:tab===tb.id?"#ef4444":"none",color:tab===tb.id?"#fff":t.sub,border:`1px solid ${tab===tb.id?"#ef4444":t.border}`}}>{tb.label}</button>)}
    </div>

    {tab==="vectors"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #ef4444"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>☢️ Nuclear Posture Tracker — Jul 2026</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,.75)",lineHeight:1.6}}>Three live nuclear vectors: Russian coercive signalling around Ukraine, Russian tactical weapons forward-based in Belarus, and the Iran enrichment standoff under a ticking MoU clock.</div>
      </Hero>
      <ST t={t} color="#ef4444">⚠️ Active Nuclear Vectors</ST>
      {VECTORS.map((v,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${v.color}`}}><div style={{padding:"11px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}><span style={{fontSize:18}}>{v.flag}</span><div style={{fontSize:13,fontWeight:700,color:t.text,flex:1}}>{v.name}</div><Pill label={v.status} color={v.color}/></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{v.text}</div></div></Card>)}
    </div>}

    {tab==="arsenals"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #8b5cf6"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>🌐 Global Nuclear Arsenals</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>All 9 confirmed or widely-assessed nuclear-armed states. Russia and the US together hold roughly 88% of the world's total warheads.</div>
      </Hero>
      <ST t={t} color="#8b5cf6">☢️ Arsenal Comparison (est. warheads)</ST>
      <Card t={t}><div style={{padding:"12px 14px"}}>{ARSENALS.map((a,i)=>{const n=parseFloat(String(a.warheads).replace(/[^0-9.]/g,""))||0;const max=5580;const w=Math.max(3,Math.sqrt(n/max)*100);return <div key={i} style={{marginBottom:i===ARSENALS.length-1?0:11}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:3}}><span style={{fontSize:12,fontWeight:600,color:t.text}}>{a.country}</span><span style={{fontSize:13,fontWeight:700,color:a.color,fontVariantNumeric:"tabular-nums"}}>{a.warheads}</span></div><div style={{height:8,borderRadius:4,background:t.isDark?"rgba(255,255,255,.05)":"rgba(0,0,0,.06)",overflow:"hidden"}}><div style={{height:"100%",width:`${w}%`,borderRadius:4,background:`linear-gradient(90deg,${a.color}88,${a.color})`,transformOrigin:"left",animation:`barGrow .7s cubic-bezier(.22,1,.36,1) ${i*0.06}s both`}}/></div><div style={{fontSize:10,color:t.sub,marginTop:2}}>{a.deployed}</div></div>;})}</div></Card>
      <Note t={t} color="#8b5cf6">Bar lengths use a square-root scale so smaller arsenals stay visible against the US/Russia totals — compare the printed numbers for true ratios. Warhead estimates: Federation of American Scientists / SIPRI 2026. Figures are approximate; deployed vs stockpiled counts vary significantly by source, and several states (Israel, North Korea) have never officially confirmed their arsenal size.</Note>
    </div>}

    {tab==="delivery"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #ef4444"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>🚀 The Nuclear Triad — Delivery Systems</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Warhead counts say who has what; delivery systems say how it gets there — and this is the fastest-moving dimension. All three major powers are mid-modernization across land, sea and air, with the US racing to replace Cold War platforms and China building a full triad for the first time.</div>
      </Hero>
      {DELIVERY.map((leg,i)=><div key={i}><ST t={t} color={leg.color}>{leg.leg}</ST><Card t={t}>{leg.rows.map((r,j)=><Row key={j} t={t} last={j===leg.rows.length-1}><div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:700,color:t.text}}>{r.country}</div><div style={{fontSize:11.5,fontWeight:600,color:leg.color,margin:"2px 0 3px"}}>{r.sys}</div><div style={{fontSize:11,color:t.sub,lineHeight:1.55}}>{r.note}</div></div></Row>)}</Card></div>)}
      <Note t={t} color="#ef4444">Programme status and platform names: CSIS Missile Threat, USNI, FAS Nuclear Notebook, Mitchell Institute (2026). Fielding timelines for next-gen systems (Sentinel, Columbia, B-21, H-20) shift frequently — treat as directional. UK (Dreadnought SSBN) and France (SNLE 3G) run submarine-only deterrents.</Note>
    </div>}

    {tab==="treaties"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #5b8ec8"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>📜 Treaties & Doctrine</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>The legal and doctrinal frameworks — and their erosion — that shape current nuclear risk.</div>
      </Hero>
      {TREATIES.map((item,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${item.color}`}}><div style={{padding:"11px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18}}>{item.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text}}>{item.label}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{item.text}</div></div></Card>)}
    </div>}
    {tab==="cyber"&&<CyberSection t={t}/>}
  </div>;
}

function CyberSection({t,initialTab}){
  const[tab,setTab]=useState(initialTab??"overview");useEffect(()=>{if(initialTab)setTab(initialTab);},[initialTab]);
  const TABS=[{id:"overview",label:"🌪️ Overview"},{id:"cables",label:"⚓ Cables"},{id:"ew",label:"🛰️ EW"},{id:"cyber",label:"🌪️ Cyber Intrusions"},{id:"greyzone",label:"🎭 Grey-Zone"}];
  const render=(arr)=>arr.map((x,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${x.color}`}}><div style={{padding:"11px 14px"}}>
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5,flexWrap:"wrap"}}>
      <span style={{fontSize:16}}>{x.icon}</span>
      <div style={{fontSize:13,fontWeight:700,color:t.text,flex:1}}>{x.label}</div>
      {x.metric&&<span style={{background:`${x.color}22`,border:`1px solid ${x.color}66`,borderRadius:20,padding:"1px 8px",fontSize:10,fontWeight:800,color:x.color}}>{x.metric}</span>}
    </div>
    <div style={{fontSize:10.5,color:t.sub,marginBottom:6}}>{x.date?x.date+" · ":""}{x.actor}</div>
    <div style={{fontSize:11.5,color:t.sub,lineHeight:1.55}}>{x.text}</div>
  </div></Card>);
  return <div>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
      {TABS.map(tb=><button key={tb.id} onClick={()=>setTab(tb.id)} style={{padding:"5px 10px",fontSize:11,borderRadius:16,cursor:"pointer",fontFamily:FONT,fontWeight:600,background:tab===tb.id?"#dc2626":"none",color:tab===tb.id?"#fff":t.sub,border:`1px solid ${tab===tb.id?"#dc2626":t.border}`}}>{tb.label}</button>)}
    </div>

    {tab==="overview"&&<div>
      <Hero t={t} color="#dc2626"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#f87171",marginBottom:6}}>🌪️ HYBRID THREAT LANDSCAPE</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Four connected sub-domains, all operating below the armed-conflict threshold and deliberately calibrated to preserve deniability: seabed sabotage against undersea cables, GPS jamming/spoofing, state-backed cyber pre-positioning inside critical infrastructure, and broader grey-zone coercion (maritime militias, influence operations, the shadow fleet). See each tab for the current incident log.</div></Hero>
      <ST t={t} color="#dc2626">🔀 Cross-Domain Notes</ST>
      <Card t={t}><div style={{padding:"11px 14px",fontSize:12,color:t.sub,lineHeight:1.6}}>The Baltic sits at the center of the cable-sabotage and EW pictures simultaneously — the same states patrolling for shadow-fleet cable damage are also the ones warning about GPS interference. Cross-references: Belarus (cognitive warfare), S. China Sea & Taiwan (maritime militia), Today's Sanctions/Energy trackers (shadow fleet).</div></Card>
    </div>}

    {tab==="cables"&&<div>
      <Hero t={t} color="#dc2626"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#f87171",marginBottom:6}}>⚓ SEABED SABOTAGE</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>The Baltic — shallow, narrow, and ringed by 8 NATO states plus Russia — has become ground zero. ~10 cables cut since 2022, 7 in a single Nov 2024–Jan 2025 window. The recurring problem: vessels do the damage in international waters where they can be shadowed but not detained, and courts can't prove intent.</div></Hero>
      <ST t={t} color="#dc2626">📋 Incident Log</ST>
      {render(CYBER_THREATS.cables)}
      <Note t={t} color="#dc2626">NATO's Baltic Sentry (Jan 2025) and the UK-led Nordic Warden JEF now patrol the region, but as the Atlantic Council notes, coastal states — not NATO — hold response authority, and the real test comes when a vessel ignores instructions to change course. Separately, 13 European nations plus Iceland issued a joint warning (Jan 2026) over GPS jamming/spoofing threatening Baltic and North Sea shipping — see EW.</Note>
    </div>}

    {tab==="ew"&&<div>
      <Hero t={t} color="#f97316"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#fb923c",marginBottom:6}}>🛰️ ELECTRONIC WARFARE</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Russian GPS jamming (blocking) and spoofing (falsifying position) emanate mainly from Kaliningrad and the Kola Peninsula. The shift toward spoofing — harder to detect, potentially more dangerous — shapes operator behavior and lets Moscow observe Western resilience protocols. The same tactics now spread to the Black Sea, Med, Persian Gulf and Korean peninsula.</div></Hero>
      <ST t={t} color="#f97316">📋 Interference Log</ST>
      {render(CYBER_THREATS.ew)}
      <Note t={t} color="#f97316">Mitigations rolling out: Galileo OSNMA signal authentication, ground-based eLoran beacons (UK operational, Sweden deploying on Öland), and a planned EU interference-monitoring service — all lagging the pace of the threat. A Jun 2026 Polish Institute of International Relations white paper catalogues the pattern as deliberate state sabotage and subversion, not incidental interference.</Note>
    </div>}

    {tab==="cyber"&&<div>
      <Hero t={t} color="#dc2626"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#f87171",marginBottom:6}}>🌪️ CYBER INTRUSIONS</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>The strategic shift of 2025-26: state actors have moved from stealing secrets to pre-positioning inside the operational-technology systems that run power, water and telecoms — embedding access to be triggered during a future conflict. China's 'Typhoon' family leads; Russia, Iran and North Korea follow.</div></Hero>
      <ST t={t} color="#dc2626">📋 Campaign Log</ST>
      {render(CYBER_THREATS.cyber)}
      <Note t={t} color="#dc2626">Edge devices — routers, firewalls, VPN appliances — are the primary exploitation surface: poorly monitored, slow to patch, outside conventional endpoint detection. Source: CISA/NSA/FBI joint advisories, ODNI 2026 Annual Threat Assessment.</Note>
    </div>}

    {tab==="greyzone"&&<div>
      <Hero t={t} color="#eab308"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#facc15",marginBottom:6}}>🎭 GREY-ZONE OPERATIONS</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Coercion below the armed-conflict threshold: cognitive/information warfare, maritime-militia swarms, AI-generated influence campaigns, and the shadow fleet that links the economic and hybrid wars. Deniability is the whole point — each action stays just under the line that would trigger a response.</div></Hero>
      <ST t={t} color="#eab308">📋 Operations Log</ST>
      {render(CYBER_THREATS.greyzone)}
      <Note t={t} color="#eab308">Grey-zone tactics are deliberately calibrated to stay below retaliation thresholds. Cross-references: Belarus (cognitive warfare), S. China Sea & Taiwan (maritime militia), and the Sanctions/Energy trackers on Today (shadow fleet).</Note>
    </div>}
  </div>;
}

function USMilSection({t,initialTab}){
  const[tab,setTab]=useState(initialTab??"compare");useEffect(()=>{if(initialTab)setTab(initialTab);},[initialTab]);
  const TABS=[{id:"compare",label:"⚖️ Power Comparison"},{id:"china",label:"🇨🇳 China Deep Dive"},{id:"systems",label:"🚀 Systems"},{id:"posture",label:"🌍 Posture"},{id:"nato",label:"🤝 NATO & Allies"},{id:"rankings",label:"🌐 Global Rankings"},{id:"indopac",label:"🌏 Indo-Pacific Balance"},{id:"fighters5g",label:"✈️ 5th-Gen Fighters"},{id:"navypipe",label:"🚢 Naval Pipeline"},{id:"space",label:"🛰️ Space & Counterspace"},{id:"minerals",label:"⛏️ Critical Minerals"},{id:"arctic",label:"🧊 Arctic"},{id:"defindustry",label:"🏭 Defense Industry"},{id:"dprk",label:"🇰🇵 DPRK-Russia Axis"}];

  const PEERS=[
    {flag:"🇺🇸",name:"United States",color:"#5b8ec8",personnel:"~1.32M active + 800K reserve",budget:"~$895B (FY26 enacted)",carriers:"11 supercarriers (all nuclear-powered)",fighters5gen:"~630 (F-22 + F-35A/B/C)",nuclearTriad:"Complete — Ohio SSBNs, B-2/B-21, Minuteman III silos",satellites:"~250 military/ISR satellites — dominant"},
    {flag:"🇨🇳",name:"China",color:"#ef4444",personnel:"~2.0M active (world's largest)",budget:"~$235B official (DoD/SIPRI estimate actual spend 40-90% higher)",carriers:"3 (Liaoning, Shandong, Fujian — Fujian still working up)",fighters5gen:"~250+ J-20, J-35 carrier variant emerging",nuclearTriad:"Rapidly expanding — 350+ new silos identified since 2021",satellites:"~140 ISR/military satellites — fastest-growing fleet"},
  ];
  const EDGE_CATEGORIES=[
    {val:"US",label:"Carrier aviation",sub:"11 vs 3 — US decades ahead in ops tempo",color:"#5b8ec8"},
    {val:"CHINA",label:"Shipbuilding capacity",sub:"China builds hulls ~5-6x faster than US yards",color:"#ef4444"},
    {val:"US",label:"5th-gen fighter fleet size",sub:"~630 fielded vs ~250+ China, gap narrowing",color:"#5b8ec8"},
    {val:"CHINA",label:"Land-based missile inventory",sub:"PLARF holds the largest conventional missile force on earth",color:"#ef4444"},
    {val:"US",label:"Global power projection",sub:"800+ overseas bases/installations vs China's handful",color:"#5b8ec8"},
    {val:"CHINA",label:"Active personnel",sub:"~2.0M vs ~1.32M — PLA is the world's largest standing force",color:"#ef4444"},
  ];

  const PLA_BRANCHES=[
    {icon:"⚓",name:"PLA Navy (PLAN)",color:"#ef4444",text:"World's largest navy by hull count (~370+ vessels). 3 carriers, with Fujian (catapult-equipped, diesel) still in sea trials as of 2026. Building Type 076 amphibious assault ships and a 4th carrier reportedly nuclear-powered."},
    {icon:"✈️",name:"PLA Air Force (PLAAF)",color:"#ef4444",text:"~2,000+ combat aircraft. J-20 stealth fighter in growing serial production (~250+ estimated airframes). J-35 carrier-capable stealth variant entering testing. H-6K/H-6N bomber fleet, H-20 stealth bomber unconfirmed/unrevealed as of mid-2026."},
    {icon:"🚀",name:"PLA Rocket Force (PLARF)",color:"#ef4444",text:"Controls China's land-based nuclear and conventional missile arsenal. DF-21D and DF-26 'carrier killer' anti-ship ballistic missiles (1,500–4,000km range) are the central threat to US carrier operations in the First/Second Island Chain. DoD assesses 350+ new ICBM silos under construction since 2021."},
    {icon:"🛰️",name:"PLA Strategic Support Force (PLASSF)",color:"#ef4444",text:"Cyber, space, and electronic warfare command. Rapidly expanding ISR satellite constellation (~140 systems) supports over-the-horizon targeting for anti-ship missiles — the key enabler of China's area-denial strategy."},
  ];
  const TAIWAN_RELEVANT=[
    {icon:"🚢",label:"Amphibious lift capacity",text:"PLAN's amphibious fleet (Type 071, Type 075, emerging Type 076) plus a large civilian roll-on/roll-off ferry fleet assessed as a wartime reserve — DoD's China Military Power Report flags this as a key invasion-capacity indicator to watch."},
    {icon:"🪂",label:"Airborne & special operations",text:"PLA Airborne Corps (~6 brigades) and growing special operations capacity oriented toward rapid seizure operations — relevant to a Taiwan contingency's opening hours."},
    {icon:"⛴️",label:"Maritime militia",text:"China's 'little blue men' irregular fishing-fleet militia — the same force active in your SCS Incidents tab — also figures into PLA wartime planning as a grey-zone and logistics asset."},
    {icon:"📡",label:"Anti-access/area-denial (A2/AD)",text:"DF-21D/DF-26 missile umbrella plus PLAAF/PLAN integrated air defense is designed specifically to keep US carrier strike groups outside effective response range of Taiwan — the central strategic problem for US planners."},
  ];

  const PLATFORM_CLASSES=[
    {cls:"Aircraft Carriers",us:"Ford-class (11 in fleet, lead ship USS Gerald R. Ford; nuclear-powered, EMALS catapults)",china:"3 carriers — Liaoning & Shandong (ski-jump, operational); Fujian (catapult-equipped, conventional power, still in sea trials)",note:"US sustains continuous forward-deployed carrier presence across multiple theaters simultaneously; China's carrier force remains regionally focused and still building proficiency."},
    {cls:"Strategic Bombers",us:"B-21 Raider in low-rate initial production; B-2 and B-52 fleets remain in service",china:"H-6K/H-6N in service (1950s Tu-16 derivative, modernized); H-20 stealth bomber unconfirmed publicly as of 2026",note:"B-21 program details partly classified — treat production-rate figures as estimates, not confirmed counts."},
    {cls:"Air Superiority / Stealth Fighters",us:"F-35A/B/C (~630+ delivered across variants), F-22 (production ended, no new airframes)",china:"J-20 (~250+ estimated, production ongoing), J-35 carrier-capable variant in flight testing",note:"Gap in fielded 5th-gen numbers is narrowing year over year per IISS Military Balance estimates."},
    {cls:"Anti-Ship / Carrier-Killer Missiles",us:"LRASM, Tomahawk anti-ship variant — primarily ship/sub-launched",china:"DF-21D, DF-26 — land-based ballistic anti-ship missiles, 1,500–4,000km range",note:"This is China's signature asymmetric counter to US carrier dominance — no direct US equivalent exists."},
    {cls:"Missile Defense",us:"THAAD, Patriot, Aegis BMD, Ground-based Midcourse Defense (GMD)",china:"HQ-19 (exo-atmospheric), HQ-9 (long-range SAM)",note:""},
  ];

  const POSTURE=[
    {theater:"Taiwan Strait / South China Sea",icon:"🌊",assets:"US 7th Fleet (Japan-based), 9 EDCA sites in the Philippines (expanded 2026), rotational B-52H overflights from Guam, ~15 FONOP/year cadence",crossRef:"Full PLA Navy order of battle: see South China Sea → Military tab"},
    {theater:"Europe / NATO",icon:"🤝",assets:"US troops forward-based in Poland and the Baltics, rotational F-35 squadrons in Romania, NATO Ankara summit posture",crossRef:"Coalition contributor breakdown: see Ukraine → NATO tab"},
    {theater:"Middle East / CENTCOM",icon:"🛢️",assets:"5th Fleet (Bahrain), rotating carrier strike group presence near the Strait of Hormuz",crossRef:"Current Hormuz/MoU status: see Iran section"},
  ];

  const NATO_MEMBERS_NOTE=[
    {icon:"🌍",label:"32 member states",text:"Collective NATO defense spending exceeded $1.5T in 2026 — roughly 1.7x China's official budget when allied spend is combined with the US, though this combined figure is rarely operationally unified the way a single command structure would be."},
    {icon:"💰",label:"Burden-sharing — 2% GDP target",text:"All 32 members now meet or exceed NATO's 2% of GDP defense spending guideline as of 2026, following years of US pressure (especially during Trump's second term) — but the US still accounts for roughly 60-65% of total NATO defense spending."},
    {icon:"⚖️",label:"Article 5 — collective defense",text:"An attack on one member is treated as an attack on all. Invoked exactly once in NATO's history — by the US itself, after September 11, 2001. Article 5 does not auto-trigger military response; it obligates consultation and 'such action as it deems necessary,' leaving response scope to each member."},
    {icon:"☢️",label:"Nuclear sharing arrangements",text:"US tactical nuclear weapons are forward-deployed under dual-key arrangements in Belgium, Germany, Italy, the Netherlands, and Turkey — host nations maintain delivery aircraft, but launch authority remains exclusively American."},
  ];
  const ALLIED_CAPACITY=[
    {val:"32",label:"NATO member states",sub:"All meeting 2%+ GDP target as of 2026",color:"#5b8ec8"},
    {val:"~$1.5T+",label:"Combined NATO defense spend",sub:"vs. China's ~$235B official budget",color:"#5b8ec8"},
    {val:"~3.5M",label:"Combined NATO active personnel",sub:"Includes US ~1.32M",color:"#5b8ec8"},
    {val:"1x",label:"Article 5 invocations",sub:"Sept 12, 2001 — by the US itself",color:"#eab308"},
  ];
  const INDO_PACIFIC_ALLIES=[
    {flag:"🇯🇵",name:"Japan",color:"#5b8ec8",text:"Hosts the largest US forward-deployed force in the region (~54,000 troops, Yokosuka-based 7th Fleet flagship). Doubled its own defense budget toward a 2% GDP target by 2027 — a historic shift from its post-war pacifist posture."},
    {flag:"🇰🇷",name:"South Korea",color:"#5b8ec8",text:"~28,500 US troops stationed under a Mutual Defense Treaty; OPCON (wartime operational control) transfer to South Korea remains a live, unresolved negotiation. Primary mission orientation remains North Korea, but increasingly factors into broader Indo-Pacific planning."},
    {flag:"🇦🇺",name:"Australia (AUKUS)",color:"#5b8ec8",text:"AUKUS pact (US-UK-Australia) will provide Australia with nuclear-powered (not nuclear-armed) attack submarines through the 2030s-40s — the most significant US technology-sharing arrangement in decades, explicitly oriented toward countering Chinese naval expansion."},
    {flag:"🇵🇭",name:"Philippines",color:"#5b8ec8",text:"9 EDCA sites granting US rotational access (expanded 2026) — already covered in your South China Sea → Military tab. Mutual Defense Treaty explicitly extended to cover Philippine vessels and aircraft in the SCS."},
  ];

  
  const NUC_TOTALS=[
    {val:"12,187",label:"Global inventory",sub:"SIPRI Yearbook 2026 (Jan 2026)",color:"#ef4444"},
    {val:"9,745",label:"In military stockpiles",sub:"Available for potential use",color:"#f97316"},
    {val:"4,012",label:"Deployed",sub:"On missiles & at bomber bases",color:"#eab308"},
    {val:"~2,100",label:"High operational alert",sub:"Nearly all US + Russian",color:"#ef4444"},
  ];
  const INDOPAC_BALANCE=[
    {flag:"🇨🇳",name:"China",nuclear:"620",color:"#ef4444",personnel:"2.0M",budget:"$266B",navy:"730 hulls (largest by count)",air:"3,309 aircraft, ~250+ J-20",posture:"Area-denial architecture (DF-21D/DF-26 umbrella) + Taiwan-contingency buildup — the pacing threat all US Indo-Pacific planning is organized around."},
    {flag:"🇮🇳",name:"India",nuclear:"190",color:"#f97316",personnel:"1.46M active",budget:"$75B",navy:"295 vessels, 2 carriers",air:"2,229 aircraft",posture:"Swing power — Quad member and largest resident Indian Ocean navy; two-front posture vs China (LAC) and Pakistan simultaneously."},
    {flag:"🇵🇰",name:"Pakistan",nuclear:"170",color:"#f97316",personnel:"654K",budget:"~$10B",navy:"~114 vessels",air:"~1,400 aircraft (JF-17, J-10C, F-16)",posture:"India-locked deterrence; deepening Chinese equipment dependence (J-10C, Type 054A frigates, Hangor subs)."},
    {flag:"🇰🇵",name:"North Korea",nuclear:"60",color:"#ef4444",personnel:"1.28M",budget:"~$4-5B",navy:"Coastal + midget subs",air:"~900 mostly legacy aircraft",posture:"Asymmetric strategy — nuclear/missile force is the regime's entire deterrent; conventional forces aged but massed on the DMZ."},
    {flag:"🇯🇵",name:"Japan",nuclear:"— (US umbrella)",color:"#5b8ec8",personnel:"247K",budget:"~$60B (2% GDP path)",navy:"~155 vessels incl. Izumo-class light carriers",air:"~1,400 aircraft, F-35 fleet growing to 147",posture:"Historic rearmament — counterstrike (Tomahawk) capability acquired, defense budget doubling; hosts largest US forward force (~54,000)."},
    {flag:"🇰🇷",name:"South Korea",nuclear:"— (US umbrella)",color:"#5b8ec8",personnel:"500K active / 3.1M reserve",budget:"$50B",navy:"234 vessels",air:"1,592 aircraft incl. F-35A",posture:"North Korea-oriented layered defense (Kill Chain / KAMD / KMPR); domestic nuclear-armament debate recurring but dormant under extended deterrence."},
    {flag:"🇹🇼",name:"Taiwan",nuclear:"—",color:"#eab308",personnel:"169K active / 1.66M reserve",budget:"~$20B+ (rising)",navy:"~91 vessels, indigenous subs (Hai Kun) entering service",air:"~740 aircraft (F-16V fleet)",posture:"Porcupine/asymmetric doctrine — mines, mobile anti-ship missiles, drones — designed to make invasion prohibitively costly. Full detail: S. China Sea & Taiwan section."},
    {flag:"🇦🇺",name:"Australia",nuclear:"— (AUKUS — nuclear-powered, not armed)",color:"#5b8ec8",personnel:"60K active",budget:"~$37B",navy:"~50 vessels; Virginia-class SSNs arriving 2030s under AUKUS",air:"F-35A fleet (72), P-8, E-7",posture:"Continental defense + alliance integration; AUKUS submarine pathway is the region's most significant force-structure shift outside China itself."},
  ];

  const FIGHTERS_5G=[
    {flag:"\u{1F1FA}\u{1F1F8}",name:"F-35 Lightning II",country:"United States",maker:"Lockheed Martin",color:"#5b8ec8",status:"In full-rate production",fleet:"~1,300 built, 17-19 operator nations",delivered:"191 delivered in 2025 (record year)",firstFlight:"2006",variants:"F-35A (CTOL), F-35B (STOVL), F-35C (carrier)",engine:"1x Pratt & Whitney F135",notes:"The West's default 5th-gen fighter \u2014 multirole, sensor-fusion-centric, and the numerical backbone of every US-aligned air force. Readiness remains the persistent weak point: GAO's June 2026 audit found fleet-wide Mission Capable rates down to ~44%, driven by spare-parts shortages and a maturing but still-strained sustainment ecosystem. Annual production now runs ~5x faster than any other allied fighter in production."},
    {flag:"\u{1F1FA}\u{1F1F8}",name:"F-22 Raptor",country:"United States",maker:"Lockheed Martin",color:"#5b8ec8",status:"Production closed (2011) \u2014 fleet shrinking",fleet:"~134 combat-coded (after divesting 32 oldest jets)",delivered:"Production ended 2011, capped by Congress at 187 total built",firstFlight:"1997",variants:"Single air-superiority variant",engine:"2x Pratt & Whitney F119",notes:"Still the world's premier air-superiority fighter by most assessments, but a permanently capped, aging fleet with no replacement in service yet. The F-47 (NGAD), assigned to Boeing, is the intended 6th-gen successor but is planned for only ~185+ airframes \u2014 the F-22's numbers problem doesn't disappear, it just moves down the road."},
    {flag:"\u{1F1E8}\u{1F1F3}",name:"J-20 Mighty Dragon",country:"China",maker:"Chengdu Aircraft Corp (AVIC)",color:"#ef4444",status:"Mass production, ramping fast",fleet:"300-350+ in service across all 5 theater commands",delivered:"~100-120/year; RUSI/Mitchell Institute project ~1,000 by 2030",firstFlight:"2011",variants:"J-20 (single-seat), J-20A (aero/avionics refresh), J-20S (twin-seat command variant, world's first)",engine:"2x WS-15 (domestic, replacing earlier WS-10)",notes:"China's answer to the F-22/F-35 and the clearest sign the PLAAF has moved from prototype to serial-production stealth airpower. The J-20S twin-seater is built to coordinate drone swarms and manage battlespace data \u2014 a genuinely novel role no Western jet fills yet. Open-source analysts still flag the WS-15 engine's service-life and reliability as the program's weak link versus US/allied powerplants."},
    {flag:"\u{1F1E8}\u{1F1F3}",name:"J-35 / J-35A",country:"China",maker:"Shenyang Aircraft Corp (AVIC)",color:"#ef4444",status:"Entering service \u2014 carrier variant maturing",fleet:"Early operational units; carrier-capable variant newly certified",delivered:"Formally unveiled 2024-25; land and naval (catapult) variants both active",firstFlight:"~2021 (FC-31 lineage)",variants:"J-35A (PLAAF, land-based), J-35 (PLAN, carrier/catapult)",engine:"2x WS-19 (domestic)",notes:"China's second simultaneous 5th-gen family \u2014 no other country besides the US fields two operational stealth fighter types at once. Gives the PLAN a genuine F-35C-equivalent for its newer catapult carriers, closing a capability gap that mattered a great deal in any Taiwan or South China Sea contingency."},
    {flag:"\u{1F1F7}\u{1F1FA}",name:"Su-57 Felon",country:"Russia",maker:"Sukhoi (UAC/Rostec)",color:"#f97316",status:"Low-rate production, well behind schedule",fleet:"~21-32 built total, including prototypes",delivered:"Best estimate 0-4 delivered in all of 2025 combined",firstFlight:"2010 (as T-50/PAK FA)",variants:"Su-57 (single-seat); twin-seat Su-57D in flight test since May 2026",engine:"2x AL-41F1, transitioning to higher-thrust Izdeliye 30 (AL-51F1)",notes:"Originally slated for 76 airframes by 2027-28 \u2014 nowhere close. Sanctions-driven parts shortages and, per an April 2026 report, a fire at the sole Komsomolsk-on-Amur production plant have further constrained output. Algeria became the first export customer (14 ordered, deliveries trickling in); India has repeatedly declined to adopt it. Some Western analysts dispute whether its radar cross-section truly meets 5th-gen stealth standards."},
    {flag:"\u{1F1F0}\u{1F1F7}",name:"KF-21 Boramae",country:"South Korea",maker:"Korea Aerospace Industries (KAI)",color:"#eab308",status:"Entering service \u2014 Block I delivering 2026",fleet:"40 Block I on order (delivery 2026-28); 80 more Block II by 2032",delivered:"First production airframe rolled out Mar 2026",firstFlight:"2022",variants:"Block I (no internal weapons bay, external stores only), Block II (adds air-to-ground), Block III/KF-21EX (planned internal bay + RAM \u2014 the true 5th-gen version)",engine:"2x GE F414, domestic Hanwha turbofan planned for later blocks",notes:"Officially a '4.5-generation' jet as delivered \u2014 it lacks the internal weapons bay that defines true stealth \u2014 but it's real hardware entering real squadron service years ahead of every other non-US/China/Russia program on this list. Completed 1,600 accident-free test flights. Export interest from the Philippines, Poland, Malaysia, and the UAE; Indonesia remains the sole development partner."},
    {flag:"\u{1F1F9}\u{1F1F7}",name:"TF-X Kaan",country:"Turkey",maker:"Turkish Aerospace Industries (TAI)",color:"#f97316",status:"Flight test \u2014 pre-serial-production",fleet:"3 prototypes planned; serial production not yet begun",delivered:"None yet \u2014 first flight targeted for 2026",firstFlight:"Targeted 2026 (taxi tests completed 2023)",variants:"Block-0 (initial flight-test standard), Block-1 (10 aircraft planned through 2029)",engine:"Interim F110 (US-sourced); domestic TEI TF35000 targeted post-2030",notes:"Turkey's most ambitious indigenous weapons program, developed in the wake of its removal from the F-35 program over the S-400 purchase. Reported interest from Saudi Arabia, the UAE, and a proposed joint Turkey-Pakistan production line. Fully domestic engine \u2014 the program's biggest schedule risk \u2014 isn't expected before 2030."},
    {flag:"\u{1F1EE}\u{1F1F3}",name:"AMCA",country:"India",maker:"Hindustan Aeronautics / DRDO-ADA",color:"#f97316",status:"Pre-prototype \u2014 design and engineering models only",fleet:"None built; prototype build sequence expected to begin ~2026-27",delivered:"None \u2014 first flight targeted 2028, service entry 2032-35",firstFlight:"Targeted 2028",variants:"Single planned configuration at this stage",engine:"Interim GE F414 (as on Tejas); more powerful domestic/co-developed engine sought for production standard",notes:"India's genuine 5th-gen ambition, but the furthest from reality of any program here \u2014 KF-21 will likely be in squadron service for a decade before AMCA flies its first prototype. Engine maturity is the central risk, mirroring the same bottleneck facing Turkey's Kaan."},
  ];
  const NAVY_PIPELINE=[
    {type:"carrier",flag:"\u{1F1E8}\u{1F1F3}",name:"Type 004",country:"China",color:"#ef4444",status:"Under construction (Dalian)",timeline:"Laid down 2024 \u2014 no public delivery date",displacement:"~110,000-120,000t (estimated), nuclear-powered",notes:"China's first nuclear-powered carrier, expected to be larger than USS Gerald R. Ford. Comes right after Fujian (CV-18, commissioned Nov 2025) \u2014 China's first indigenously-designed EMALS carrier. The Pentagon's Dec 2025 China Military Power report says PLAN is targeting 9 carriers total by 2035, which would make it the world's second-largest carrier fleet by a wide margin."},
    {type:"carrier",flag:"\u{1F1FA}\u{1F1F8}",name:"Doris Miller (CVN-81)",country:"United States",color:"#5b8ec8",status:"Under construction (Newport News)",timeline:"Keel laid 2025 \u2014 delivery expected early 2030s",displacement:"~100,000t, nuclear-powered (Ford-class)",notes:"Second Ford-class follow-on after USS Enterprise (CVN-80), and the first US Navy carrier named for an enlisted Black sailor and Pearl Harbor Medal of Honor recipient. The Ford-class remains the only 100,000-ton-class nuclear supercarrier program in the world in active production."},
    {type:"carrier",flag:"\u{1F1EB}\u{1F1F7}",name:"PANG (France Libre)",country:"France",color:"#f97316",status:"Design/pre-construction",timeline:"Hull construction to start ~2032, delivery ~2038",displacement:"~80,000t, nuclear-powered",notes:"Porte-Avions de Nouvelle G\u00e9n\u00e9ration \u2014 will replace Charles de Gaulle, France's only carrier and the sole non-US nuclear-powered carrier currently at sea. Cost estimated at \u20ac10-12B+ before aircraft, escorts, and infrastructure. A ~13-year build window that leaves France's carrier gap exposed if de Gaulle needs to retire before France Libre is ready."},
    {type:"submarine",flag:"\u{1F1FA}\u{1F1F8}",name:"Columbia-class (SSBN)",country:"United States",color:"#5b8ec8",status:"Under construction \u2014 65% complete (lead boat)",timeline:"USS District of Columbia delivery ~2028, first patrol 2030",displacement:"~20,810t submerged",notes:"The sea-based leg replacement for the aging Ohio-class \u2014 arguably the single most important program on this list, since it's what actually carries the US nuclear deterrent from the 2030s onward. Schedule has already slipped roughly 12-17 months from original targets; Navy says an acceleration plan has stabilized the trend. 12 boats planned, ~$126B program cost."},
    {type:"submarine",flag:"\u{1F1EC}\u{1F1E7}",name:"Dreadnought-class (SSBN)",country:"United Kingdom",color:"#5b8ec8",status:"Under construction (Barrow-in-Furness)",timeline:"Construction into the 2030s; replaces Vanguard-class",displacement:"Larger than Vanguard; shares Common Missile Compartment design with Columbia",notes:"UK's sole nuclear deterrent runs through 4 continuous-at-sea-deterrence boats \u2014 Dreadnought is the only replacement pipeline that exists for it. Shares missile-tube architecture with the US Columbia-class, a rare degree of allied nuclear-submarine design integration."},
    {type:"submarine",flag:"\u{1F1EC}\u{1F1E7}\u{1F1E6}\u{1F1FA}",name:"SSN-AUKUS",country:"UK / Australia",color:"#5b8ec8",status:"Design finalization \u2014 reactors in production",timeline:"UK boats from early 2030s; Australian-built boats construction starting before 2030 at new Osborne yard",displacement:">10,000t, PWR3+ reactor (Rolls-Royce)",notes:"Australia's first-ever nuclear-powered submarines (conventionally armed, not nuclear-armed \u2014 no NPT issue). Bridged by 3 second-hand US Virginia-class boats from the early 2030s while the new Osborne shipyard comes online. Four PWR3+ reactor cores confirmed under construction as of May 2026. A genuinely new nuclear-submarine production line \u2014 the first new entrant to that club in decades."},
    {type:"submarine",flag:"\u{1F1EB}\u{1F1F7}",name:"Invincible-class / SNLE 3G (SSBN)",country:"France",color:"#f97316",status:"Full industrial construction (Cherbourg)",timeline:"Lead boat 'Invincible' to commission 2036",displacement:"~15,000t submerged, 16x M51.3 SLBM tubes",notes:"Replaces the Triomphant-class, France's only SSBNs and thus its entire sea-based deterrent. Announced by Macron alongside plans to expand France's nuclear warhead count \u2014 directly relevant to the Nuclear Powers tab. Four boats planned through 2050, in service to ~2090."},
    {type:"submarine",flag:"\u{1F1F7}\u{1F1FA}",name:"Yasen-M (SSN)",country:"Russia",color:"#f97316",status:"In production (Sevmash)",timeline:"6 in service (1 Yasen + 5 Yasen-M); targeting 10-12 total by mid-2030s",displacement:"~13,800t submerged",notes:"Confirmed Mar 2026: Russia will retire its entire Soviet-era Akula/Sierra/Oscar-II attack-submarine fleet in favor of a standardized Yasen/Yasen-M force \u2014 one hull type, one reactor type, simplified logistics. Unlike the Su-57's stalled production, this program is actually delivering hulls on a real cadence, making it Russia's clearer naval modernization success story."},
  ];
  const GLOBAL_MIL_RANKINGS=[
    {rank:1,flag:"🇺🇸",name:"United States",personnel:"2.1M",aircraft:13000,navy:480,tanks:4640,stealth:660,drones:12000,budget:"$895B",nuclear:"5,042",goal:"Sustain simultaneous global forward presence across every theater — 750+ overseas bases, 11 nuclear carriers, and the baseline every other entry on this list is measured against."},
    {rank:2,flag:"🇷🇺",name:"Russia",personnel:"3.5M",aircraft:4292,navy:598,tanks:5750,stealth:28,drones:5000,budget:"$126B",nuclear:"5,420",goal:"Mass + attrition doctrine, now battle-tested in Ukraine; nuclear deterrence (world's largest stockpile) as the core strategic asset offsetting a shrinking conventional-tech edge."},
    {rank:3,flag:"🇨🇳",name:"China",personnel:"3.1M",aircraft:3309,navy:730,tanks:6800,stealth:350,drones:8500,budget:"$266B",nuclear:"620",goal:"World's largest navy by hull count; rapid nuclear expansion (620 warheads, fastest-growing arsenal); Taiwan-contingency readiness and Indo-Pacific area-denial are the organizing strategic priorities — see China Deep Dive tab."},
    {rank:4,flag:"🇮🇳",name:"India",personnel:"5.1M",aircraft:2229,navy:295,tanks:4201,stealth:0,drones:2100,budget:"$75B",nuclear:"190",goal:"World's largest active manpower; two-front deterrence posture (Pakistan + China); 'Make in India' self-reliance push and a growing blue-water navy to secure the Indian Ocean."},
    {rank:5,flag:"🇰🇷",name:"South Korea",personnel:"3.8M",aircraft:1592,navy:234,tanks:2236,stealth:40,drones:950,budget:"$50B",nuclear:"—",goal:"North Korea-oriented defense-in-depth under the US nuclear umbrella; among the most technologically advanced militaries in Asia (K2 tanks, F-35, layered missile defense)."},
    {rank:6,flag:"🇬🇧",name:"United Kingdom",personnel:"1.1M",aircraft:631,navy:75,tanks:227,stealth:47,drones:1100,budget:"$71.5B",nuclear:"225",goal:"NATO's most integrated European partner; 2 carriers + nuclear submarine force project power globally despite modest personnel — overseas territories and NATO missions define its reach."},
    {rank:7,flag:"🇫🇷",name:"France",personnel:"376K",aircraft:976,navy:180,tanks:215,stealth:0,drones:1300,budget:"$63.7B",nuclear:"290",goal:"Independent nuclear deterrent outside NATO's integrated command; SCORPION program aims to fully digitalize the battlefield; sustained presence in Africa and the Middle East."},
    {rank:8,flag:"🇯🇵",name:"Japan",personnel:"328K",aircraft:1443,navy:155,tanks:521,stealth:65,drones:550,budget:"$57B",nuclear:"—",goal:"Non-nuclear but highly advanced — doubling its defense budget toward 2% GDP by 2027, a historic shift from post-war pacifism, oriented squarely at countering China."},
    {rank:9,flag:"🇹🇷",name:"Türkiye",personnel:"883K",aircraft:1083,navy:140,tanks:2238,stealth:0,drones:2800,budget:"$20B",nuclear:"—",goal:"Regional power built on indigenous defense production — Bayraktar drones proved combat-effective in multiple conflicts; growing Mediterranean naval ambitions on a fraction of the top powers' budgets."},
    {rank:10,flag:"🇮🇹",name:"Italy",personnel:"289K",aircraft:729,navy:143,tanks:200,stealth:45,drones:700,budget:"$30B",nuclear:"90 (NATO-shared)",goal:"Balanced, modernized NATO force rather than a raw-numbers power — 2 carriers, F-35s, and steady commitment to peacekeeping and Mediterranean security."},
  ];
  const RANK_MAX={aircraft:13000,navy:730,tanks:6800,stealth:660,drones:12000};

  return <div>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
      {TABS.map(tb=><button key={tb.id} onClick={()=>setTab(tb.id)} style={{padding:"5px 10px",fontSize:11,borderRadius:16,cursor:"pointer",fontFamily:FONT,fontWeight:600,background:tab===tb.id?"#5b8ec8":"none",color:tab===tb.id?"#fff":t.sub,border:`1px solid ${tab===tb.id?"#5b8ec8":t.border}`}}>{tb.label}</button>)}
    </div>

    {tab==="compare"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #5b8ec8"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>⚖️ US vs. China — Power Comparison</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Russia retains the world's largest nuclear stockpile but its conventional military has been substantially degraded by the Ukraine war (see Manpower tab). China is the only peer-tier competitor across most conventional categories.</div>
      </Hero>
      {PEERS.map((p,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${p.color}`}}><div style={{padding:"12px 14px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><span style={{fontSize:22}}>{p.flag}</span><div style={{fontSize:14,fontWeight:800,color:t.text}}>{p.name}</div></div>
        {[["Active personnel",p.personnel],["Defense budget",p.budget],["Carriers",p.carriers],["5th-gen fighters",p.fighters5gen],["Nuclear triad",p.nuclearTriad],["Military satellites",p.satellites]].map(([k,v],j)=><div key={j} style={{display:"flex",justifyContent:"space-between",gap:10,fontSize:12,padding:"4px 0",borderBottom:j<5?`.5px solid ${t.sep}`:0}}><span style={{color:t.sub,flexShrink:0}}>{k}</span><span style={{color:t.text,fontWeight:600,textAlign:"right"}}>{v}</span></div>)}
      </div></Card>)}
      <ST t={t} color="#5b8ec8">🏆 Category Leaders</ST>
      <Grid2 t={t} items={EDGE_CATEGORIES.map(e=>({val:e.val,label:e.label,sub:e.sub,color:e.color}))}/>
      <Note t={t} color="#5b8ec8">Budget and inventory figures blend DoD's annual China Military Power Report, SIPRI, and IISS Military Balance estimates. China's official defense budget is widely assessed by Western analysts as substantially understated.</Note>
    </div>}

    {tab==="china"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #ef4444"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🇨🇳 PLA Deep Dive — Jun 2026</div>
        <Grid2 t={t} items={[
          {val:"2.0M",label:"Active personnel",sub:"World's largest standing force",color:"#ef4444"},
          {val:"370+",label:"PLAN hull count",sub:"World's largest navy by ships",color:"#ef4444"},
          {val:"350+",label:"New ICBM silos",sub:"Under construction since 2021",color:"#f97316"},
          {val:"3",label:"Aircraft carriers",sub:"Fujian still in sea trials",color:"#eab308"},
        ]}/>
      </Hero>
      <ST t={t} color="#ef4444">🪖 PLA Branch Breakdown</ST>
      {PLA_BRANCHES.map((b,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${b.color}`}}><div style={{padding:"11px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}><span style={{fontSize:18}}>{b.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text}}>{b.name}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{b.text}</div></div></Card>)}
      <ST t={t} color="#ef4444">🎯 Taiwan-Relevant Capabilities</ST>
      {TAIWAN_RELEVANT.map((item,i)=><Card key={i} t={t} style={{borderLeft:"4px solid #f97316"}}><div style={{padding:"11px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18}}>{item.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text}}>{item.label}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{item.text}</div></div></Card>)}
      <Note t={t} color="#f97316">For PLA posture specifically in the South China Sea theater (carrier rotations, militia activity, incident log), see the South China Sea → Military tab — this section focuses on PLA-wide capability, not day-to-day theater activity.</Note>
    </div>}

    {tab==="systems"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #8b5cf6"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>🚀 Systems & Platforms — US vs. China</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Head-to-head by weapons class. Treat all production and inventory figures as estimates — both governments classify or obscure exact numbers.</div>
      </Hero>
      {PLATFORM_CLASSES.map((p,i)=><Card key={i} t={t} style={{borderLeft:"4px solid #8b5cf6"}}><div style={{padding:"12px 14px"}}>
        <div style={{fontSize:13,fontWeight:800,color:t.text,marginBottom:8}}>{p.cls}</div>
        <div style={{display:"flex",gap:8,marginBottom:6}}><span style={{fontSize:14,flexShrink:0}}>🇺🇸</span><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{p.us}</div></div>
        <div style={{display:"flex",gap:8,marginBottom:p.note?8:0}}><span style={{fontSize:14,flexShrink:0}}>🇨🇳</span><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{p.china}</div></div>
        {p.note&&<div style={{fontSize:11.5,color:t.sub,background:"rgba(139,92,246,0.08)",border:"1px solid rgba(139,92,246,0.18)",borderRadius:6,padding:"7px 10px",lineHeight:1.5,fontStyle:"italic"}}>{p.note}</div>}
      </div></Card>)}
    </div>}

    {tab==="posture"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #22c55e"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>🌍 Forward Posture & Flashpoint Relevance</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>US global power projection cross-referenced against the conflict theaters already tracked in this dashboard — see linked tabs for day-to-day developments.</div>
      </Hero>
      {POSTURE.map((p,i)=><Card key={i} t={t} style={{borderLeft:"4px solid #22c55e"}}><div style={{padding:"12px 14px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontSize:20}}>{p.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text}}>{p.theater}</div></div>
        <div style={{fontSize:12,color:t.sub,lineHeight:1.55,marginBottom:8}}>{p.assets}</div>
        <div style={{fontSize:11,color:"#22c55e",fontWeight:600}}>↳ {p.crossRef}</div>
      </div></Card>)}
      <Note t={t} color="#22c55e">The US maintains 750-800+ overseas military installations globally — by far the largest forward-basing network of any nation, though most are small logistics/training footholds rather than combat-postured bases.</Note>
    </div>}

    {tab==="nato"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #5b8ec8"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🤝 NATO & Allied Capacity</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6,marginBottom:10}}>This tab covers NATO as a structural force-multiplier for US power. For current coalition activity supporting Ukraine specifically, see Ukraine → NATO tab.</div>
        <Grid2 t={t} items={ALLIED_CAPACITY}/>
      </Hero>
      <ST t={t} color="#5b8ec8">🌍 Alliance Structure & Mechanics</ST>
      {NATO_MEMBERS_NOTE.map((item,i)=><Card key={i} t={t} style={{borderLeft:"4px solid #5b8ec8"}}><div style={{padding:"11px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18}}>{item.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text}}>{item.label}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{item.text}</div></div></Card>)}
      <ST t={t} color="#5b8ec8">🌏 Indo-Pacific Allies (China-Facing)</ST>
      {INDO_PACIFIC_ALLIES.map((a,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${a.color}`}}><div style={{padding:"11px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18}}>{a.flag}</span><div style={{fontSize:13,fontWeight:700,color:t.text}}>{a.name}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{a.text}</div></div></Card>)}
      <Note t={t} color="#5b8ec8">Combined allied spending figures are additive, not operationally unified — NATO and Indo-Pacific allies do not share a single command structure the way US service branches do, so these totals overstate true combined-force readiness.</Note>
      <ST t={t} color="#5b8ec8">🔗 Arms-Flow Map</ST>
      <div style={{fontSize:11.5,color:t.sub,lineHeight:1.6,marginBottom:10}}>Who arms whom — the transfer corridors that shape every theater on this dashboard. Western flows run through NATO/AUKUS frameworks and the €140B Ankara pledge; the counter-network runs Pyongyang→Moscow, Tehran→Moscow, and Beijing→everyone as dual-use supplier of last resort.</div>
      <ST t={t} color="#5b8ec8">🌐 The Two Networks</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>🇺🇸 Western spine</span> — NATO Ankara draft: €70B/yr through 2027 for Ukraine. AUKUS Pillar 1 (Virginia-class boats to Australia, early 2030s) survived its 2025 review; Pillar 2 (hypersonics, AI, undersea) expanding to Japan cooperation. US FMS backlog remains the chokepoint — Patriot deliveries quoted up to a decade out; GEM-T co-production (DE/NL/RO/ES, up to 1,000 missiles) is the workaround model.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>🇰🇵 Pyongyang→Moscow</span> — Millions of artillery shells (est. 4-6M+ cumulative), KN-23 ballistic missiles used against Ukraine, and troops in Kursk. Payment flows back as food, fuel, and likely missile/submarine technology — the most consequential proliferation bargain of the war.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>🇮🇷 Tehran→Moscow</span> — Shahed designs long since localized (Geran-2/-4 at Alabuga); the corridor's future is now hostage to Iran's post-war reconstruction and the Aug 16 MoU — a rare case where a peace process could formally close an arms pipeline.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>🇨🇳 Beijing's grey channel</span> — No confirmed lethal transfers to Russia, but dominant supplier of dual-use inputs (machine tools, nitrocellulose, drone components, optics). The EU has confirmed Chinese training of hundreds of Russian military personnel — the line between dual-use and direct support keeps thinning.</div>
        <div><span style={{color:t.text,fontWeight:700}}>🇺🇦 Ukraine as exporter</span> — The reverse flow is new: Denmark-model contracts (frozen-asset funded), Bohdan howitzers built in 8 weeks, $1,500 155mm shells undercutting European prices 3-5×, and 100k+ drones/month across 120+ companies. Kyiv is becoming an arms supplier to its own suppliers.</div>
      </div></div></Card>
      <Note t={t} color="#5b8ec8">Corridors and volumes are open-source estimates (RUSI, ISW, DIA disclosures, Militarnyi); DPRK shell totals especially are ranges, not audited counts. Cross-reference: Defense Industry tab (production), Ukraine → NATO tab (aid politics).</Note>
    </div>}

    {tab==="rankings"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #eab308"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🌐 Top 10 Militaries — Global Firepower Index 2026</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Ranked by composite PowerIndex (60+ weighted factors — manpower, budget, logistics, technology, geography — not raw headcount alone, which is why smaller advanced militaries like the UK and Japan outrank larger but less modernized forces).</div>
      </Hero>
      <ST t={t} color="#eab308">✈️ Combat Aircraft</ST>
      <RankBar t={t} data={GLOBAL_MIL_RANKINGS} field="aircraft" max={RANK_MAX.aircraft} color="#eab308" accent="#5b8ec8"/>
      <ST t={t} color="#8b5cf6">🥷 5th/6th-Gen Stealth Fighters</ST>
      <RankBar t={t} data={GLOBAL_MIL_RANKINGS} field="stealth" max={RANK_MAX.stealth} color="#8b5cf6" accent="#a78bfa"/>
      <div style={{fontSize:10.5,color:t.sub,fontStyle:"italic",margin:"-6px 2px 10px"}}>In-service F-35/F-22/J-20/J-35/Su-57 only — programs still in development (India's AMCA, France's SCAF/FCAS, Türkiye's Kaan) show 0 until aircraft actually reach squadrons. See 5th-Gen Fighters tab for per-aircraft detail.</div>
      <ST t={t} color="#22c55e">🛸 Unmanned Aircraft (All Classes)</ST>
      <RankBar t={t} data={GLOBAL_MIL_RANKINGS} field="drones" max={RANK_MAX.drones} color="#22c55e" accent="#4ade80"/>
      <div style={{fontSize:10.5,color:t.sub,fontStyle:"italic",margin:"-6px 2px 10px"}}>Small/tactical/strategic UAVs combined — dominated by low-cost tactical drones, not high-end strike platforms. Türkiye's fleet size varies widely by source (1,400-3,000+); shown figure is a rough midpoint. Cross-reference: Drone War section for Ukraine/Russia's much larger wartime-consumption fleets, off this global peacetime comparison.</div>
      <ST t={t} color="#5b8ec8">⚓ Navy Vessels</ST>
      <RankBar t={t} data={GLOBAL_MIL_RANKINGS} field="navy" max={RANK_MAX.navy} color="#5b8ec8" accent="#22c55e"/>
      <ST t={t} color="#ef4444">🛡️ Tank Fleet</ST>
      <RankBar t={t} data={GLOBAL_MIL_RANKINGS} field="tanks" max={RANK_MAX.tanks} color="#ef4444" accent="#f97316"/>
      <div style={{fontSize:10.5,color:t.sub,fontStyle:"italic",margin:"-6px 2px 10px"}}>US ranks 6th in raw tank count (4,640) — the composite index weights readiness, logistics and technology far more heavily than fleet size alone.</div>
      <ST t={t} color="#eab308">🎯 Strategic Goals & Doctrine</ST>
      {GLOBAL_MIL_RANKINGS.map((c,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${c.rank<=3?"#ef4444":c.rank<=6?"#f97316":"#5b8ec8"}`}}><div style={{padding:"11px 14px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5,flexWrap:"wrap"}}>
          <span style={{background:"rgba(234,179,8,0.15)",border:"1px solid rgba(234,179,8,0.4)",borderRadius:20,padding:"1px 8px",fontSize:10,fontWeight:800,color:"#eab308"}}>#{c.rank}</span>
          <span style={{fontSize:16}}>{c.flag}</span>
          <div style={{fontSize:13,fontWeight:700,color:t.text,flex:1}}>{c.name}</div>
          <span style={{fontSize:10,color:t.sub}}>{c.personnel} personnel · {c.budget}</span>
        </div>
        <div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{c.goal}</div>
      </div></Card>)}
      <Note t={t} color="#eab308">Figures compiled from Global Firepower Index 2026 (60+ weighted factors, PowerIndex methodology) — treat all numbers as best-available estimates, not official government disclosures. Russia and China's official defense budgets are widely assessed as understated; nuclear figures for undeclared/ambiguous states are omitted or marked accordingly.</Note>
    </div>}

    {tab==="indopac"&&<div>
      <Hero t={t} color="#eab308">
        <div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#eab308",marginBottom:6}}>🌏 INDO-PACIFIC MILITARY BALANCE</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Four of the world's nine nuclear-armed states sit in the Indo-Pacific (China, India, Pakistan, North Korea) — plus three US-umbrella allies and Taiwan. This is the densest concentration of nuclear weapons, large navies, and unresolved territorial disputes on earth.</div>
      </Hero>
      <ST t={t} color="#eab308">💰 Defense Budgets (annual, USD)</ST>
      <Card t={t}><div style={{padding:"12px 14px"}}>{[...INDOPAC_BALANCE].sort((a,b)=>(parseFloat(String(b.budget).replace(/[^0-9.]/g,""))||0)-(parseFloat(String(a.budget).replace(/[^0-9.]/g,""))||0)).map((c2,i,arr)=>{const n=parseFloat(String(c2.budget).replace(/[^0-9.]/g,""))||0;const max=parseFloat(String(arr[0].budget).replace(/[^0-9.]/g,""))||1;const w=Math.max(3,Math.sqrt(n/max)*100);return <div key={i} style={{marginBottom:i===arr.length-1?0:10}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:3}}><span style={{fontSize:12,fontWeight:600,color:t.text}}>{c2.flag} {c2.name}</span><span style={{fontSize:13,fontWeight:700,color:c2.color,fontVariantNumeric:"tabular-nums"}}>{c2.budget}</span></div><div style={{height:8,borderRadius:4,background:t.isDark?"rgba(255,255,255,.05)":"rgba(0,0,0,.06)",overflow:"hidden"}}><div style={{height:"100%",width:`${w}%`,borderRadius:4,background:`linear-gradient(90deg,${c2.color}88,${c2.color})`,transformOrigin:"left",animation:`barGrow .7s cubic-bezier(.22,1,.36,1) ${i*0.06}s both`}}/></div></div>;})}
      <div style={{fontSize:10,color:t.sub,marginTop:8,fontStyle:"italic"}}>Square-root scale — compare printed figures for true ratios. US figure is the global total, not Indo-Pacific-only allocation.</div></div></Card>
      <ST t={t} color="#ef4444">☢️ Regional Nuclear States</ST>
      {INDOPAC_BALANCE.filter(c2=>!c2.nuclear.startsWith("—")).map((c2,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${c2.color}`}}><div style={{padding:"11px 14px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5,flexWrap:"wrap"}}>
          <span style={{fontSize:16}}>{c2.flag}</span>
          <div style={{fontSize:13,fontWeight:700,color:t.text,flex:1}}>{c2.name}</div>
          <span style={{background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.4)",borderRadius:20,padding:"1px 8px",fontSize:10,fontWeight:800,color:"#ef4444"}}>☢️ {c2.nuclear}</span>
        </div>
        <div style={{fontSize:10.5,color:t.sub,marginBottom:6}}>{c2.personnel} · {c2.budget} · {c2.navy} · {c2.air}</div>
        <div style={{fontSize:11.5,color:t.sub,lineHeight:1.55}}>{c2.posture}</div>
      </div></Card>)}
      <ST t={t} color="#5b8ec8">🛡️ Non-Nuclear Regional Powers</ST>
      {INDOPAC_BALANCE.filter(c2=>c2.nuclear.startsWith("—")).map((c2,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${c2.color}`}}><div style={{padding:"11px 14px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5,flexWrap:"wrap"}}>
          <span style={{fontSize:16}}>{c2.flag}</span>
          <div style={{fontSize:13,fontWeight:700,color:t.text,flex:1}}>{c2.name}</div>
          <span style={{fontSize:10,color:t.sub}}>{c2.nuclear}</span>
        </div>
        <div style={{fontSize:10.5,color:t.sub,marginBottom:6}}>{c2.personnel} · {c2.budget} · {c2.navy} · {c2.air}</div>
        <div style={{fontSize:11.5,color:t.sub,lineHeight:1.55}}>{c2.posture}</div>
      </div></Card>)}
      <Note t={t} color="#eab308">Warhead figures: SIPRI Yearbook 2026. Conventional stats: GFP 2026 / IISS Military Balance estimates. Japan, South Korea, and Australia operate under US extended deterrence; AUKUS provides Australia nuclear-powered (not nuclear-armed) submarines. Taiwan detail lives in the S. China Sea & Taiwan section.</Note>
    </div>}

    {tab==="fighters5g"&&<div>
      <Hero t={t} color="#5b8ec8">
        <div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#5b8ec8",marginBottom:6}}>✈️ FIFTH-GENERATION FIGHTER PROGRAMS</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Only the US, China, and Russia field operational stealth fighters today. South Korea, Turkey, and India are racing to join them, at very different speeds — KF-21 is delivering to squadrons in 2026 while AMCA hasn't built a prototype yet. "5th-gen" itself is contested: KF-21's Block I lacks the internal weapons bay that purists say the label requires.</div>
      </Hero>
      <ST t={t} color="#5b8ec8">🌐 Fielded Today</ST>
      {FIGHTERS_5G.filter(f=>f.status.includes("production")&&!f.status.includes("Low-rate")&&!f.status.includes("closed")).map((f,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${f.color}`}}><div style={{padding:"11px 14px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5,flexWrap:"wrap"}}>
          <span style={{fontSize:16}}>{f.flag}</span>
          <div style={{fontSize:13,fontWeight:700,color:t.text,flex:1}}>{f.name}</div>
          <span style={{background:`${f.color}22`,border:`1px solid ${f.color}66`,borderRadius:20,padding:"1px 8px",fontSize:9,fontWeight:800,color:f.color,textTransform:"uppercase"}}>{f.status}</span>
        </div>
        <div style={{fontSize:10.5,color:t.sub,marginBottom:6}}>{f.maker} · First flight {f.firstFlight} · {f.engine}</div>
        <div style={{fontSize:11.5,color:t.text,lineHeight:1.5,marginBottom:4}}><span style={{fontWeight:700,color:f.color}}>Fleet:</span> {f.fleet}</div>
        <div style={{fontSize:11.5,color:t.text,lineHeight:1.5,marginBottom:6}}><span style={{fontWeight:700,color:f.color}}>Variants:</span> {f.variants}</div>
        <div style={{fontSize:11.5,color:t.sub,lineHeight:1.55}}>{f.notes}</div>
      </div></Card>)}
      <ST t={t} color="#f97316">🐌 Low-Rate / Legacy Production</ST>
      {FIGHTERS_5G.filter(f=>f.status.includes("Low-rate")||f.status.includes("closed")).map((f,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${f.color}`}}><div style={{padding:"11px 14px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5,flexWrap:"wrap"}}>
          <span style={{fontSize:16}}>{f.flag}</span>
          <div style={{fontSize:13,fontWeight:700,color:t.text,flex:1}}>{f.name}</div>
          <span style={{background:`${f.color}22`,border:`1px solid ${f.color}66`,borderRadius:20,padding:"1px 8px",fontSize:9,fontWeight:800,color:f.color,textTransform:"uppercase"}}>{f.status}</span>
        </div>
        <div style={{fontSize:10.5,color:t.sub,marginBottom:6}}>{f.maker} · First flight {f.firstFlight} · {f.engine}</div>
        <div style={{fontSize:11.5,color:t.text,lineHeight:1.5,marginBottom:4}}><span style={{fontWeight:700,color:f.color}}>Fleet:</span> {f.fleet}</div>
        <div style={{fontSize:11.5,color:t.text,lineHeight:1.5,marginBottom:6}}><span style={{fontWeight:700,color:f.color}}>Variants:</span> {f.variants}</div>
        <div style={{fontSize:11.5,color:t.sub,lineHeight:1.55}}>{f.notes}</div>
      </div></Card>)}
      <ST t={t} color="#eab308">🚧 Emerging Programs (Not Yet Operational)</ST>
      {FIGHTERS_5G.filter(f=>f.status.includes("Entering")||f.status.includes("Flight test")||f.status.includes("Pre-prototype")).map((f,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${f.color}`}}><div style={{padding:"11px 14px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5,flexWrap:"wrap"}}>
          <span style={{fontSize:16}}>{f.flag}</span>
          <div style={{fontSize:13,fontWeight:700,color:t.text,flex:1}}>{f.name}</div>
          <span style={{background:`${f.color}22`,border:`1px solid ${f.color}66`,borderRadius:20,padding:"1px 8px",fontSize:9,fontWeight:800,color:f.color,textTransform:"uppercase"}}>{f.status}</span>
        </div>
        <div style={{fontSize:10.5,color:t.sub,marginBottom:6}}>{f.maker} · First flight {f.firstFlight} · {f.engine}</div>
        <div style={{fontSize:11.5,color:t.text,lineHeight:1.5,marginBottom:4}}><span style={{fontWeight:700,color:f.color}}>Fleet:</span> {f.fleet}</div>
        <div style={{fontSize:11.5,color:t.text,lineHeight:1.5,marginBottom:6}}><span style={{fontWeight:700,color:f.color}}>Variants:</span> {f.variants}</div>
        <div style={{fontSize:11.5,color:t.sub,lineHeight:1.55}}>{f.notes}</div>
      </div></Card>)}
      <Note t={t} color="#5b8ec8">Sources: Lockheed Martin, Rostec/UAC statements, RUSI, Mitchell Institute, DAPA (South Korea), TAI (Turkey), Wikipedia program pages. Fleet and production figures are open-source estimates for China and Russia — treat exact counts as directional, not precise. 6th-gen successor programs (US NGAD/F-47, UK-Japan-Italy GCAP, France-Germany-Spain FCAS, China's J-36) are in early flight-test or demonstrator stages and aren't broken out here.</Note>
    </div>}

    {tab==="navypipe"&&<div>
      <Hero t={t} color="#5b8ec8">
        <div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#5b8ec8",marginBottom:6}}>🚢 NAVAL PIPELINE — WHAT'S BEING BUILT NOW</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>SSBN programs here are the sea-based leg of each nation's nuclear triad — cross-reference the Nuclear Powers tab. Carrier and SSN programs are the broader power-projection story. Only the US, UK, France, Russia, China, and (soon) Australia are building nuclear-powered submarines; only the US, China, and France are building nuclear-powered carriers.</div>
      </Hero>
      <ST t={t} color="#5b8ec8">🛳️ Carriers in the Pipeline</ST>
      {NAVY_PIPELINE.filter(n=>n.type==="carrier").map((n,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${n.color}`}}><div style={{padding:"11px 14px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5,flexWrap:"wrap"}}>
          <span style={{fontSize:16}}>{n.flag}</span>
          <div style={{fontSize:13,fontWeight:700,color:t.text,flex:1}}>{n.name}</div>
          <span style={{background:`${n.color}22`,border:`1px solid ${n.color}66`,borderRadius:20,padding:"1px 8px",fontSize:9,fontWeight:800,color:n.color,textTransform:"uppercase"}}>{n.status}</span>
        </div>
        <div style={{fontSize:10.5,color:t.sub,marginBottom:6}}>{n.country} · {n.displacement}</div>
        <div style={{fontSize:11.5,color:t.text,lineHeight:1.5,marginBottom:6}}><span style={{fontWeight:700,color:n.color}}>Timeline:</span> {n.timeline}</div>
        <div style={{fontSize:11.5,color:t.sub,lineHeight:1.55}}>{n.notes}</div>
      </div></Card>)}
      <ST t={t} color="#f97316">🔱 Submarines in the Pipeline</ST>
      {NAVY_PIPELINE.filter(n=>n.type==="submarine").map((n,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${n.color}`}}><div style={{padding:"11px 14px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5,flexWrap:"wrap"}}>
          <span style={{fontSize:16}}>{n.flag}</span>
          <div style={{fontSize:13,fontWeight:700,color:t.text,flex:1}}>{n.name}</div>
          <span style={{background:`${n.color}22`,border:`1px solid ${n.color}66`,borderRadius:20,padding:"1px 8px",fontSize:9,fontWeight:800,color:n.color,textTransform:"uppercase"}}>{n.status}</span>
        </div>
        <div style={{fontSize:10.5,color:t.sub,marginBottom:6}}>{n.country} · {n.displacement}</div>
        <div style={{fontSize:11.5,color:t.text,lineHeight:1.5,marginBottom:6}}><span style={{fontWeight:700,color:n.color}}>Timeline:</span> {n.timeline}</div>
        <div style={{fontSize:11.5,color:t.sub,lineHeight:1.55}}>{n.notes}</div>
      </div></Card>)}
      <Note t={t} color="#5b8ec8">Sources: USNI News, Congressional Research Service, Naval News, Navy Lookout, Breaking Defense, Army Recognition, Wikipedia program pages. China/Russia displacement and fleet-target figures are open-source estimates. India (Vishal-class carrier, S5-class SSBN) and South Korea (CVX light carrier) both have pipeline ambitions but lack firm public timelines and aren't broken out here yet.</Note>
    </div>}

    {tab==="space"&&<div>
      <Hero t={t} color="#8b5cf6"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#c4b5fd",marginBottom:6}}>🛰️ SPACE & COUNTERSPACE</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Thirteen countries now develop counterspace capabilities, but only non-destructive ones (jamming, dazzling, cyber) are used in active conflicts so far. The US is racing to field weapons across six categories under a declared space-superiority policy, China is testing on-orbit refueling and a possible new direct-ascent interceptor, and Russia is suspected of developing a nuclear ASAT it may not be afraid to use.</div></Hero>
      <Grid2 t={t} items={[
        {icon:"🇺🇸",label:"Space Force FY2026 budget",val:"$26.1B",sub:"~10,400 personnel; officials weigh doubling the force",color:"#5b8ec8"},
        {icon:"🛰️",label:"Operational US satellites",val:"~12,000",sub:"Projected 30,000+ by 2040 (govt + commercial)",color:"#8b5cf6"},
        {icon:"🇨🇳",label:"PLA ISR satellites",val:"500+",sub:"Find/fix/track for the PLA kill chain",color:"#ef4444"},
        {icon:"💥",label:"Debris still in orbit from ASAT tests",val:"2,773",sub:"Of 6,904 cataloged pieces (US/RU/CN/India)",color:"#f97316"},
      ]}/>
      <ST t={t} color="#8b5cf6">🎯 The Counterspace Landscape</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>🇺🇸 US — Golden Dome & six weapon categories</span> — Space Force is deploying counterspace weapons in six categories (jammers, directed energy, missiles — three space-based, three ground-based). Golden Dome's proposed space-based interceptor layer would double as a co-orbital ASAT capability; Gen. Guetlein directs the effort. 2025-26 doctrine emphasizes 'dynamic space operations.'</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>🇨🇳 China — fastest riser</span> — 2007 DA-ASAT test created debris still tracked today; SJ-21 demonstrated grappling/towing a satellite to graveyard orbit; SJ-25 conducted a likely on-orbit refueling experiment through H2 2025; reports of a new DA-ASAT interceptor. GEO-capable testing threatens GPS and missile-warning layers.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>🇷🇺 Russia — asymmetric & nuclear</span> — Nudol DA-ASAT (2021 debris-generating test), Nivelir 'nesting doll' co-orbital inspectors, Burevestnik ASAT program, Luch GEO stalker retired after years shadowing Western satellites. USSF planners assess Russia will pursue asymmetric counterspace — including a possible nuclear ASAT — rather than parity.</div>
        <div><span style={{color:t.text,fontWeight:700}}>⚡ Active now</span> — GPS and SATCOM jamming are daily realities in Ukraine and the Baltic (see Cyber & Hybrid → EW). Cyber counterspace is expanding: ESA breaches, unencrypted GEO comms, and open-source software attack surfaces documented in 2025-26.</div>
      </div></div></Card>
      <Note t={t} color="#8b5cf6">Sources: Secure World Foundation Global Counterspace Capabilities 2026, USSPACECOM posture statement (Mar 2026), CRS IF12610. Only non-destructive counterspace has been used operationally — kinetic capability assessments are open-source estimates. GPS-jamming overlap: Cyber & Hybrid → Electronic Warfare.</Note>
    </div>}

    {tab==="minerals"&&<div>
      <Hero t={t} color="#eab308"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#fde68a",marginBottom:6}}>⛏️ CRITICAL MINERALS & CHOKEPOINTS</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>China converted upstream dominance into a formal leverage system: licensing regimes for gallium, germanium, antimony, graphite and rare earths that can selectively slow, condition, or deny access. The Nov 2025 Xi-Trump truce suspended the harshest measures — but the licensing architecture stays, and the switch can be flipped back.</div></Hero>
      <Grid2 t={t} items={[
        {icon:"🇨🇳",label:"China share of refined gallium",val:"~98%",sub:"Also ~90% of rare-earth processing",color:"#ef4444"},
        {icon:"⏸️",label:"Export-ban suspension expires",val:"Nov '26",sub:"Ga/Ge/Sb to US suspended to Nov 27; REE controls to Nov 10",color:"#f97316"},
        {icon:"🚫",label:"Military end-user ban",val:"Active",sub:"Survived the truce — defense buyers still barred",color:"#dc2626"},
        {icon:"🏭",label:"US TNT production restart",val:"2026",sub:"First domestic TNT since 1986 (Repkon, Kentucky)",color:"#22c55e"},
      ]}/>
      <ST t={t} color="#eab308">📋 The Leverage Ladder (2023 → now)</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>2023 — licensing begins</span> — Gallium/germanium licensing (Jul), high-purity graphite (Oct), then a ban on exporting rare-earth extraction and processing know-how (Dec) — leverage extended from minerals to the knowledge itself.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>2024-25 — escalation</span> — Dec 2024: outright ban on Ga/Ge/Sb/superhard materials to the US. Apr 2025: seven heavy/medium rare earths licensed. Oct 2025: the FDPR-style rule — any foreign product with ≥0.1% Chinese-origin rare earths requires a Chinese license.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Nov 2025 — the truce</span> — After Xi-Trump, MOFCOM suspended the Oct rules for one year (to Nov 10, 2026) and the US-specific bans (to Nov 27, 2026); the US delayed its Affiliates Rule. Licensing remains; military end-use ban remains. Analysts (Trivium) read the pause as calibration, not retreat.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Jun 2026 — tightening resumes, ahead of the truce deadline</span> — China added US rare-earth miners MP Materials and USA Rare Earth to its export control list, barring transfer of Chinese-origin dual-use items to them from any country — a direct hit on the two firms leading the Western build-out this same tab tracks. MOFCOM also published a new whistleblower/enforcement mechanism (effective Jul 1, 2026) covering disguised shipments, third-country transshipment, and logistics/customs complicity. Two Japanese nationals were detained in Dalian (May) and a Chinese optics-company chairman was detained in Shanghai (Jun 18) over alleged smuggling. Read together, this suggests the "truce" is a licensing pause, not a ceasefire in enforcement.</div>
        <div><span style={{color:t.text,fontWeight:700}}>The Western scramble</span> — DLA stockpile rebuilds, Lynas (Australia) expanding but still China-dependent for refining into 2026, Browns Range dysprosium, US Critical Materials/Idaho NL processing pilots. CFR's Feb 2026 verdict: the US cannot out-mine China this decade — recycling, substitution and recovery are the leapfrog play.</div>
      </div></div></Card>
      <Note t={t} color="#eab308">Sources: MOFCOM announcements via China Briefing/Clark Hill/Morgan Lewis, CSIS, CFR (Feb 2026), USGS MCS 2026. Ties into: Sanctions Tracker (Today), Taiwan/SCS section (blockade scenarios), Defense Industry tab (explosives/propellant inputs). Watch: both suspensions formally lapse Nov 2026, but the Jun 2026 entity-listings show Beijing is already applying pressure through enforcement and targeted listings without waiting for the deadline.</Note>
    </div>}

    {tab==="arctic"&&<div>
      <Hero t={t} color="#06b6d4"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#67e8f9",marginBottom:6}}>🧊 ARCTIC & NORTHERN FLANK</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>The one region no other section touches — and the flank where NATO's newest members (Finland, Sweden) meet Russia's most militarized coastline. Melting ice is opening the Northern Sea Route, Moscow is re-arming Kola and the Arctic bases, and the West's icebreaker gap is measured in decades.</div></Hero>
      <Grid2 t={t} items={[
        {icon:"🚢",label:"Icebreaker fleets",val:"~40 vs 3",sub:"Russia (incl. nuclear) vs operational US polar icebreakers",color:"#ef4444"},
        {icon:"🇫🇮",label:"New NATO-Russia border",val:"1,340km",sub:"Finland alone — doubled the alliance's Russian frontier",color:"#5b8ec8"},
        {icon:"⚓",label:"Kola Peninsula",val:"Bastion",sub:"Northern Fleet SSBNs — Russia's second-strike core",color:"#f97316"},
        {icon:"🧭",label:"Northern Sea Route transits",val:"Rising",sub:"Moscow claims control; China styles itself 'near-Arctic'",color:"#06b6d4"},
      ]}/>
      <ST t={t} color="#06b6d4">📋 Friction Points</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Svalbard</span> — Treaty-demilitarized Norwegian archipelago with a Russian mining settlement; recurring flag-planting provocations and undersea-cable cuts to the mainland make it the Arctic's likeliest grey-zone flashpoint.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Baltic-Arctic hybrid continuum</span> — The shadow-fleet cable-dragging pattern documented in Cyber & Hybrid → Cables extends north: GPS jamming from Kola affects Finnmark aviation weekly, and Finland's border has weathered engineered-migration pushes since 2023.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>US icebreaker recovery</span> — Polar Security Cutter program slipped years; ICE Pact (US-Canada-Finland) leans on Finnish yards, which have built the majority of the world's icebreakers. First new US heavy breaker still years out.</div>
        <div><span style={{color:t.text,fontWeight:700}}>Greenland & the GIUK gap</span> — Pituffik Space Base anchors missile warning; renewed US interest in Greenland (including Trump's acquisition rhetoric) and Russian sub transits through the GIUK gap have restored North Atlantic ASW to Cold War priority.</div>
      </div></div></Card>
      <Note t={t} color="#06b6d4">Force postures per IISS Military Balance and service statements; icebreaker counts vary by definition (operational vs laid-up). Overlaps: Cyber & Hybrid → Cables/Grey-Zone (Baltic incidents), NATO & Allies tab (Nordic accession).</Note>
    </div>}

    {tab==="defindustry"&&<div>
      <Hero t={t} color="#f97316"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#fdba74",marginBottom:6}}>🏭 DEFENSE INDUSTRIAL BASE — THE PRODUCTION RACE</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Deterrence now rests less on technological edge than on production credibility — who can make more shells, drones and interceptors, for longer. Russia mobilized first; Europe's six-fold ramp is closing the gap; the US is behind its own targets; and Ukraine has become the West's low-cost arsenal.</div></Hero>
      <Grid2 t={t} items={[
        {icon:"🇷🇺",label:"Russia artillery output",val:"~2-2.3M/yr",sub:"Shells (incl. refurb); fires 5-10× Ukraine's rate",color:"#ef4444"},
        {icon:"🇪🇺",label:"EU+UK+UA 155mm projection",val:"~2.8-3M/yr",sub:"2026 — parity with Russia for the first time",color:"#5b8ec8"},
        {icon:"🇺🇸",label:"US 155mm actual",val:"~40k/mo",sub:"Stalled vs 100k/mo goal; complete rounds fewer still",color:"#f97316"},
        {icon:"🛸",label:"Long-range drone output",val:"RU ~5k/mo",sub:"UA: 100k+/mo all types across 120+ firms",color:"#a855f7"},
      ]}/>
      <ST t={t} color="#f97316">📋 Scorecard by Category</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Artillery</span> — Rheinmetall alone targets 1.5M shells/yr by 2027 — more than the entire US industry. US ramp stuck at ~40k projectiles/mo (charges and fuzes lag further); new Camden LAP plant (50k/mo capacity) and the first domestic TNT since 1986 are the fixes in motion. Cost gap: RU 152mm ~$1k, UA 155mm ~$1.5k, European 155mm $4-8k.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Missiles</span> — Russia: 200+ cruise/ballistic per month (~2,400-3,000/yr), Kh-101 and Iskander lines still growing. US: ~700 JASSM + ~500 ATACMS/yr, PAC-3 MSE the binding constraint for every ally (see Kyiv strike fallout). GEM-T European co-production is the template answer.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Drones</span> — The inverted race: Russia ~60k long-range strike drones/yr (Geran lines at Alabuga, jet-powered Geran-4 now in use); NATO produces nothing analogous cheap; Ukraine's 120+ company ecosystem out-innovates both at 100k+/mo including interceptor drones at $7.5k.</div>
        <div><span style={{color:t.text,fontWeight:700}}>The bottleneck layer</span> — Explosives and propellant, not steel: one major TNT plant in Poland carried Europe for years; France/Sweden powder capacity 10× expansions land 2026; nitrocellulose still partly China-sourced (see Critical Minerals tab). Whoever fixes energetics first wins the ramp.</div>
      </div></div></Card>
      <Note t={t} color="#f97316">Figures: RFE/RL-CIT production analysis, RUSI, Pentagon industrial-base reports, Rheinmetall/BAE statements, NATO SG remarks. Production numbers are estimates with wide bands (esp. Russian refurb vs new-build). Cross-reference: NATO & Allies tab (arms flow), Drone War → Cost, Ukraine → RU Economy.</Note>
    </div>}

    {tab==="dprk"&&<div>
      <Hero t={t} color="#ef4444"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#fca5a5",marginBottom:6}}>🇰🇵 THE DPRK-RUSSIA AXIS</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>The war's most consequential proliferation bargain: North Korea supplies Russia with munitions, missiles and troops; Russia pays back in food, fuel, and — the real prize for Pyongyang — likely help with missile, satellite and submarine technology it couldn't otherwise access.</div></Hero>
      <Grid2 t={t} items={[
        {icon:"💣",label:"Artillery shells supplied",val:"4-6M+",sub:"Cumulative estimate since 2023 (wide range)",color:"#f97316"},
        {icon:"🚀",label:"KN-23 ballistic missiles",val:"100+",sub:"Fired at Ukraine using DPRK-supplied systems",color:"#ef4444"},
        {icon:"🪖",label:"DPRK troops deployed",val:"~12,000",sub:"Kursk Oblast, from late 2024",color:"#eab308"},
        {icon:"⚰️",label:"DPRK casualties (Kursk)",val:"~6,000-7,000",sub:"UK MoD/NIS ~6,000; Ukraine's HUR claims 7,000+",color:"#dc2626"},
      ]}/>
      <ST t={t} color="#ef4444">🔄 The Bargain</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>What Pyongyang sends</span> — Millions of 152mm/122mm artillery shells (the single largest external ammunition source for Russia), KN-23/24 short-range ballistic missiles used repeatedly against Ukrainian cities, and roughly 12,000 troops committed to retaking Kursk Oblast from late 2024 — North Korea's first large-scale combat deployment since the Korean War.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>What Moscow pays back</span> — Food and fuel shipments easing chronic DPRK shortages, but the strategic payload is technology transfer: Western and South Korean intelligence assess likely Russian assistance on ballistic missile guidance, satellite launch capability, and possibly submarine and air-defense systems — capabilities Pyongyang has struggled to master alone.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Kursk casualties</span> — DPRK troops took heavy losses in Kursk's open terrain, unfamiliar with drone-saturated modern combat. UK MoD and South Korean NIS estimates held near 6,000 killed/wounded from spring 2025 through early 2026 — a plateau — while Ukraine's HUR claimed the toll passed 7,000 by mid-2026, a figure that exceeds the Western estimate and isn't reconciled between sources (see Trends → Indo-Pacific & Global for the full series). Either figure makes it by far North Korea's costliest military engagement in decades, yet Pyongyang has shown no sign of reducing its commitment.</div>
        <div><span style={{color:t.text,fontWeight:700}}>Why it matters beyond Ukraine</span> — The arrangement gives North Korea combat-tested troops, potential missile-tech uplift, and a great-power patron willing to shield it at the UN — durably changing the Korean Peninsula's risk calculus independent of how the Ukraine war ends.</div>
      </div></div></Card>
      <Note t={t} color="#ef4444">Figures are Western/South Korean intelligence estimates (DIA, NIS, RUSI) — North Korea does not confirm troop or material commitments, and ranges are wide. Cross-reference: Arms Flow (NATO & Allies tab), Nuclear → Delivery Systems (DPRK's own arsenal is tracked separately there).</Note>
    </div>}
  </div>;
}

const CYBER_THREATS={
  cables:[
    {icon:"⚓",label:"Fitburg — Helsinki–Tallinn cable",date:"Dec 31, 2025",actor:"Russia (suspected)",color:"#dc2626",text:"Finnish authorities seized the cargo ship Fitburg after it dragged its anchor across an Elisa fiber-optic cable in the Gulf of Finland. En route from St Petersburg to Israel carrying EU-sanctioned Russian steel; crew from Russia, Georgia, Kazakhstan, Azerbaijan. Two crew arrested. Latest in a multi-year pattern of Baltic seabed incidents."},
    {icon:"⚡",label:"Estlink 2 power cable + 4 telecoms lines",date:"Dec 25, 2024",actor:"Russia (shadow fleet)",color:"#dc2626",text:"The Eagle S tanker — a Cook Islands-flagged shadow-fleet vessel — severed the Finland–Estonia power cable and four telecoms lines by anchor-dragging. In Oct 2025 a Finnish court dismissed the case, ruling prosecutors couldn't prove intent and that any negligence was the flag state's jurisdiction — exposing the core deterrence gap."},
    {icon:"🚢",label:"Yi Peng 3 — Sweden/Lithuania + Finland/Germany",date:"Nov 17-18, 2024",actor:"China-flagged",color:"#f97316",text:"The Chinese-owned bulk carrier Yi Peng 3 severed two fiber cables ~200km apart. Baltic states shadowed it but couldn't detain it in international waters — the same enforcement gap that recurs across nearly every incident."},
    {icon:"💥",label:"Nord Stream (historical anchor)",date:"Sep 2022",actor:"Contested",color:"#7a93b8",text:"The original Baltic infrastructure attack. In Nov 2025 Italy's top court approved extraditing a Ukrainian suspect to Germany; a Polish court earlier refused a separate handover. Attribution remains legally unresolved 3+ years on — the template for deniable seabed warfare."},
  ],
  ew:[
    {icon:"🛰️",label:"Kaliningrad spoofing — 3 → 36 antennas",metric:"12x expansion",color:"#dc2626",text:"Lithuania's communications regulator reported Russia expanded GPS-spoofing antennas around Kaliningrad from 3 (early 2025) to 36. Interference has shifted from jamming (blocking) toward spoofing (falsifying position) — the more advanced, harder-to-detect technique."},
    {icon:"✈️",label:"~40% of European air traffic affected",metric:"5-10x since 2024",color:"#f97316",text:"European Policy Centre: a five- to ten-fold increase in Russian jamming/spoofing across Nordic, Baltic and Arctic regions, sourced to Kaliningrad and the Kola Peninsula. Lithuania alone logs hundreds of GNSS interferences weekly — ~20x its 2024 rate."},
    {icon:"🇬🇧",label:"UK Defence Secretary's jet jammed",date:"May 21, 2026",actor:"Russia (likely)",color:"#dc2626",text:"John Healey's RAF Dassault Falcon lost satellite signal for the entire flight back from Estonia; pilots reverted to inertial navigation and cockpit instruments malfunctioned. A pointed demonstration that no one is exempt."},
    {icon:"🌐",label:"EU sanctions on the 841st EW Center",date:"2026",actor:"EU response",color:"#5b8ec8",text:"The EU sanctioned members of Russia's 841st Separate Electronic Warfare Center in Kaliningrad. ICAO took the rare step of naming both Russia AND North Korea as perpetrators. Mitigation (Galileo OSNMA authentication, ground-based eLoran beacons) is rolling out but lags the threat."},
  ],
  cyber:[
    {icon:"🌪️",label:"Salt Typhoon — 200+ targets, 80+ countries",actor:"China (MSS)",color:"#dc2626",text:"The espionage campaign Sen. Warner called the 'worst telecom hack in US history.' Breached AT&T, Verizon, Lumen, T-Mobile and 20+ countries' telecoms, stealing call records and law-enforcement surveillance data. By Dec 2025 intrusions reached US House committees; Norway confirmed it was hit in Feb 2026."},
    {icon:"⚡",label:"Volt Typhoon — pre-positioning in infrastructure",actor:"China",color:"#dc2626",text:"CISA/NSA/FBI assess Volt Typhoon has shifted from espionage to pre-positioning inside operational-technology systems — power, water, telecoms, transport — to enable disruption 'at a time of their choosing.' Guam (a key Pacific military hub) is a specific focus, aimed at degrading US force projection in a Taiwan contingency."},
    {icon:"🤖",label:"2026 Threat Assessment — the shift to pre-positioning",actor:"ODNI",color:"#f97316",text:"The US Annual Threat Assessment names China, Russia, Iran, North Korea and ransomware groups as steadily embedding inside critical-infrastructure networks. The strategic change: long-term OT access is now the objective, not a byproduct of opportunistic espionage."},
    {icon:"🕵️",label:"Norway — 'most serious since WWII'",actor:"Multi-state",color:"#eab308",text:"Norway's PST assessed the country faces its gravest security situation since WWII, citing China, Russia and Iran conducting intelligence and hybrid operations. Iran specifically flagged for potential property damage, assassinations, and destructive cyber ops against Western interests."},
  ],
  greyzone:[
    {icon:"🗣️",label:"Kremlin cognitive warfare re: Belarus",actor:"Russia",color:"#ef4444",text:"ISW: the Kremlin runs an information campaign framing any Ukrainian strike on legitimate Belarusian military targets (e.g. Shahed relay stations) as unprovoked escalation against the Union State — shaping the narrative battlefield ahead of the physical one."},
    {icon:"🎣",label:"China maritime grey-zone coercion",actor:"China",color:"#f97316",text:"Maritime-militia swarms (220+ vessels at Whitsun Reef) and water-cannon incidents function as deniable coercion below the armed-conflict threshold. Full detail in S. China Sea & Taiwan → Incidents."},
    {icon:"🤖",label:"AI-generated influence operations",actor:"China / multi",color:"#eab308",text:"CCP-affiliated actors publish AI-generated images, video and personas on social media to amplify divisive domestic issues in the US and elsewhere — information warfare at scale, increasingly cheap and hard to attribute."},
    {icon:"🛢️",label:"Shadow fleet as hybrid launchpad",actor:"Russia",color:"#dc2626",text:"EU foreign-affairs chief Kaja Kallas: Russia's sanctions-evading shadow fleet doubles as 'a launchpad for hybrid attacks' — the same vessels that move sanctioned oil drag anchors across cables, linking the economic and hybrid wars into one system."},
  ],
};

function VenezuelaSection({t,initialTab}){
  const[tab,setTab]=useState(initialTab??"cuba");useEffect(()=>{if(initialTab)setTab(initialTab);},[initialTab]);
  const conflict=CONFLICTS.find(c=>c.id==="venezuela");
  const events=EVENTS.venezuela??[];
  const cubaEvents=events.filter(e=>/Cuba|Castro|Díaz-Canel/i.test(e.label+e.note));
  const TABS=[{id:"cuba",label:"🇨🇺 Cuba Blockade"},{id:"spear",label:"🚤 Southern Spear"},{id:"conflict",label:"🇻🇪 Venezuela"},{id:"mexico",label:"🇲🇽 Mexico"},{id:"haiti",label:"🇭🇹 Haiti"}];

  const CUBA_STATS=[
    {val:"2 in a week",label:"Island-wide blackouts",sub:"Total grid collapse Jul 6 & Jul 10 — ~10M affected",color:"#dc2626"},
    {val:"$8B",label:"Damage, Mar 25–Feb 26",sub:"Record annual figure (+7% YoY) — UN, Jul 8",color:"#dc2626"},
    {val:"9.9/1K",label:"Infant mortality",sub:"Up from pre-blockade baseline — OHCHR Jun 2026",color:"#ef4444"},
    {val:"-60%",label:"Food production",sub:"OHCHR-documented decline",color:"#ef4444"},
    {val:"30%",label:"Medicine supply",sub:"Of normal pre-blockade levels",color:"#f97316"},
  ];
  const CUBA_MECHANICS=[
    {icon:"⛽",label:"How the blockade works",text:"Rather than a naval cordon, this is primarily an economic blockade: EO 14380 authorizes US tariffs against any country supplying oil to Cuba. CSIS assesses it as militarily trivial to enforce — Cuba has essentially no navy, and tankers are easily tracked — making it an attritional pressure campaign rather than a shooting war."},
    {icon:"🔌",label:"Grid collapse (Jul 2026)",text:"Cuba suffered two total National Electric Power System disconnections in a single week — Jul 6 and Jul 10 — each plunging ~10M people into darkness, the culmination of four island-wide blackouts since January. Díaz-Canel called the fuel blockade 'genocidal'; the UN resident coordinator warns of humanitarian collapse. Electricity pumps ~80% of Cuba's water, so the outages cascade directly into a drinking-water crisis."},
    {icon:"🇷🇺",label:"Russian blockade-running",text:"A 100,000-tonne Russian crude shipment reached Havana Mar 30, 2026 — CSIS assessed this as calculated to keep Cuba from total collapse while the US was preoccupied with the Iran war. A reported second shipment later turned back, suggesting tightening enforcement."},
    {icon:"🤝",label:"Diplomatic track — stalled",text:"Díaz-Canel confirmed talks with the US in March 2026; Cuba released 2,000+ political prisoners as a confidence-building step, and Trump said in May a deal was possible. But FM Rodríguez told the UN on Jul 8 there has been 'no progress' — and would likely be none while US officials 'treat Cuba as a vanquished or conquered adversary.' Trump's public framing has hardened to 'make a deal before it's too late.'"},
    {icon:"🇺🇳",label:"UN debate — Jul 8, 2026",text:"Cuba brought the blockade to the General Assembly: a record $8B in documented damage for Mar 2025–Feb 2026 (+7% YoY), a figure that excludes the fuel blockade's 'extreme impact.' US Amb. Waltz denied a blockade exists — 'the only embargo in Cuba is the guillotine the regime keeps over the heads of its people.' The procedural vote passed 136-9-30, but abstentions by Germany and Canada — traditional supporters — signal US lobbying is eroding Cuba's UN majority (165 votes last October, down from 187 the year before)."},
    {icon:"📊",label:"Economic restructuring underway",text:"Cuba has reportedly enacted 176 market-liberalization measures — decentralizing state-run enterprise, allowing private banks and foreign investment by Cubans abroad — described by some observers as a blockade-forced pivot away from its state-monopoly economic model."},
    {icon:"⚖️",label:"Castro indictment",text:"Raúl Castro indicted May 21, 2026 over the 1996 Brothers to the Rescue shootdown — widely read as following the same pre-capture indictment pattern the US used against Maduro before Operation Absolute Resolve."},
  ];
  const CUBA_SCENARIOS=[
    {label:"Continued attritional blockade",color:"#eab308",text:"CSIS's base-case scenario: sustained oil-import pressure to force regime concessions over time, without direct military action. Militarily simple to maintain; politically costly as humanitarian suffering mounts and Cuba is increasingly framed internationally as the victim of a 'bully' campaign."},
    {label:"Punitive airstrikes",color:"#f97316",text:"CSIS's intermediate scenario: targeted strikes on Cuban drone/intelligence facilities and air defenses to pressure the regime and degrade its capacity to resist further action — enabled by the carrier presence already in the Caribbean from the Venezuela operation."},
    {label:"Internal collapse / intervention",color:"#dc2626",text:"CSIS's worst-case scenario: Cuba's economic position deteriorates into a humanitarian crisis and power vacuum, prompting direct US intervention 'to restore order' — with no clear path to a stable outcome, per CSIS's own assessment."},
  ];

  const FACTIONS=[
    {flag:"🇺🇸",name:"United States — SOUTHCOM",color:"#5b8ec8",text:"Built the largest US military deployment in the Americas in decades — carrier strike group (USS Gerald R. Ford), 11+ warships, ~12,000 troops at peak. Captured Maduro in a ~2hr20min special operations strike Jan 3, 2026. Framed entirely as counter-narcotics/narcoterrorism enforcement."},
    {flag:"🇻🇪",name:"Venezuela — post-Maduro government",color:"#dc2626",text:"Delcy Rodríguez (former VP) was sworn in as interim president per Venezuela's Supreme Tribunal of Justice, though her government's legitimacy and actual control remain contested. Opposition leader María Corina Machado (2024 election's de facto winner, per most outside observers) has not been installed."},
    {flag:"🪖",name:"FANB (Venezuelan military)",color:"#f97316",text:"~123,000 active troops per IISS estimate. Maduro had separately announced mobilization of a 4.5M-strong civilian militia in August 2025 in response to the US buildup — actual militia readiness is unverified and widely doubted by analysts."},
    {flag:"🌎",name:"Regional spillover",color:"#eab308",text:"Colombia's Petro threatened armed response to any similar intervention on Colombian soil. Trinidad and Tobago granted the US military airport access and hosts the largest per-capita population of Venezuelan refugees. Strikes have expanded into Ecuador and disputed border areas with Colombia."},
  ];

  const LEGAL_CONTROVERSY=[
    {icon:"⚖️",label:"War Powers / congressional authorization",text:"The administration argues the President has inherent Article II authority for operations not expected to involve 'prolonged and substantial military engagements.' The Senate twice rejected resolutions to limit this authority in 2025. Bipartisan House and Senate Armed Services investigations are nonetheless open into the boat strikes."},
    {icon:"🚨",label:"Alleged double-tap strike / war crimes concern",text:"The Washington Post reported Defense Secretary Hegseth ordered a second strike on a boat already hit and disabled in September — if survivors were deliberately killed, legal experts told Time this could constitute murder or a war crime under the UCMJ or the US War Crimes Act of 1996."},
    {icon:"📊",label:"Disputed factual basis",text:"UN drug-trafficking-route data is cited by critics as contradicting the administration's claim that Venezuela is a primary transit point — most analysts say the bulk of US-bound cocaine moves via the Pacific from Colombia and Peru, not the Caribbean from Venezuela."},
    {icon:"🌍",label:"International legal pushback",text:"A complaint over a Caribbean airstrike was filed with a human rights watchdog (per Politico, Dec 2025). Multiple governments and multilateral organizations have publicly questioned the legal basis for the Maduro capture operation specifically."},
  ];

  const SPEAR_TIMELINE_STATS=[
    {val:"221+",label:"Killed in boat strikes",sub:"As of Jun 21, 2026 — incl. 17 missing/presumed dead",color:"#ef4444"},
    {val:"64+",label:"Strikes on vessels",sub:"On 65 vessels since Sep 2025",color:"#f97316"},
    {val:"~12,000",label:"US troops at peak",sub:"Nearly a dozen Navy ships, incl. USS Gerald R. Ford CSG",color:"#5b8ec8"},
    {val:"$50M",label:"Bounty on Maduro (pre-capture)",sub:"Doubled by DOJ in Aug 2025",color:"#eab308"},
  ];

  return <div>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
      {TABS.map(tb=><button key={tb.id} onClick={()=>setTab(tb.id)} style={{padding:"5px 10px",fontSize:11,borderRadius:16,cursor:"pointer",fontFamily:FONT,fontWeight:600,background:tab===tb.id?"#dc2626":"none",color:tab===tb.id?"#fff":t.sub,border:`1px solid ${tab===tb.id?"#dc2626":t.border}`}}>{tb.label}</button>)}
    </div>

    {tab==="conflict"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #dc2626"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:28}}>🇻🇪</span><div><div style={{fontSize:16,fontWeight:800,color:"#fff"}}>Venezuela — Background</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}><Pill label="US INTERVENTION" color="#dc2626"/><Pill label="Post-Regime Change" color="#f97316"/></div></div></div>
        <div style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"9px 12px",fontSize:12,color:"rgba(255,255,255,.75)",lineHeight:1.6}}>{conflict?.summary}</div>
      </Hero>
      <Note t={t} color="#eab308">⚠️ Editorial note: this theater covers contested, politically charged claims. The US administration frames its actions as counter-narcotics/narcoterrorism enforcement; critics — including bipartisan members of Congress — frame elements of it as extrajudicial killing and unauthorized regime change. Both framings are presented below rather than adjudicated.</Note>
      <ST t={t} color="#0ea5e9">🌊 Earthquake Disaster (Jun 24, 2026)</ST>
      <Hero t={t} color="#0ea5e9"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#7dd3fc",marginBottom:6}}>⚠️ SEPARATE FROM THE CONFLICT — A NATURAL DISASTER</div><div style={{fontSize:12,color:"rgba(255,255,255,.68)",lineHeight:1.6}}>Twin earthquakes struck Venezuela's Caribbean coast on Jun 24, 2026, centered near Caracas and La Guaira — unrelated to the US intervention, but compounding it: a devastated population, an overwhelmed government, and a US Navy relief presence now operating in the same waters as Southern Spear.</div></Hero>
      <Grid2 t={t} items={[
        {icon:"☠️",label:"Deaths",val:"4,490+",sub:"As of Jul 12; climbing from 235 (Jun 26)",color:"#ef4444"},
        {icon:"🏠",label:"Left unhoused",val:"~18,000",sub:"Nat'l Assembly figures, early July",color:"#f97316"},
        {icon:"🩹",label:"Injured",val:"16,700+",sub:"Government tally",color:"#eab308"},
        {icon:"⚓",label:"US relief",val:"USS San Antonio",sub:"Amphibious dock ship, La Guaira port repair",color:"#5b8ec8"},
      ]}/>
      <Note t={t} color="#0ea5e9">Death toll rose steeply and continues climbing: 235 (Jun 26) → 3,535 (Jul 7) → ~4,300 (Jul 11) → 4,490 (Jul 12). Caracas and La Guaira are the hardest-hit areas; camps and mass burials are ongoing. The US naval deployment for port reconstruction is notable given the same waters host the Southern Spear interdiction campaign.</Note>
      <ST t={t} color="#dc2626">⚔️ Key Actors</ST>
      {FACTIONS.map((f,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${f.color}`}}><div style={{padding:"10px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18}}>{f.flag}</span><div style={{fontSize:13,fontWeight:700,color:t.text}}>{f.name}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{f.text}</div></div></Card>)}
      <ST t={t} color="#dc2626">🇨🇺 Cuba</ST>
      <Card t={t} style={{borderLeft:"4px solid #f97316"}}><div style={{padding:"12px 14px"}}>
        <div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>A concurrent, mechanically linked crisis: the US has maintained an oil blockade on Cuba since January 2026, intensified by the cutoff of Venezuelan oil shipments during the buildup to Maduro's capture. See the dedicated Cuba Blockade tab for full detail — humanitarian impact, diplomatic talks, and CSIS's published military-option scenarios.</div>
      </div></Card>
      <EventsTimeline t={t} events={events.filter(e=>!cubaEvents.includes(e))} label="Timeline"/>
    </div>}

    {tab==="spear"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #f97316"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🚤 Operation Southern Spear</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6,marginBottom:10}}>The ongoing US military campaign against alleged drug-trafficking vessels in the Caribbean and Eastern Pacific — the operational backbone behind the Caribbean military buildup that preceded Maduro's capture, and which continues independently of it.</div>
        <Grid2 t={t} items={SPEAR_TIMELINE_STATS}/>
      </Hero>
      <ST t={t} color="#f97316">⚖️ Legal & Accountability Controversy</ST>
      {LEGAL_CONTROVERSY.map((item,i)=><Card key={i} t={t} style={{borderLeft:"4px solid #f97316"}}><div style={{padding:"11px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18}}>{item.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text}}>{item.label}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{item.text}</div></div></Card>)}
      <ST t={t} color="#f97316">🎯 Cartel & Gang Targets</ST>
      <Card t={t} style={{borderLeft:"4px solid #ef4444"}}><div style={{padding:"12px 14px"}}>
        {["Tren de Aragua — Venezuelan organized crime gang, designated a Foreign Terrorist Organization by the White House in February 2026. Leader Héctor 'Niño Guerrero' Guerrero Flores killed in a coordinated US-Venezuelan airstrike June 12, 2026.","ELN (Ejército de Liberación Nacional) — Colombian guerrilla group with extensive documented activity inside Venezuela near the Maracaibo border region; cited as a target in the March 2026 Ecuador-border strike, though the actual target was later reported by NYT to be a dairy farm.","FARC dissidents — named as the original justification for the March 2026 Colombia-Ecuador border strike; the bombing did not directly involve US forces but was conducted jointly with Ecuador."].map((pt,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:8,fontSize:12.5,color:t.sub,lineHeight:1.5}}><span style={{color:"#ef4444",flexShrink:0}}>▸</span>{pt}</div>)}
      </div></Card>
      <Note t={t} color="#f97316">Casualty and strike-count figures sourced from AS/COA and Wikipedia's strike tracker, both compiled from DoD/SOUTHCOM announcements and independent verification efforts — treat exact figures as the best available public estimate, not an official confirmed tally.</Note>
    </div>}

    {tab==="cuba"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #dc2626"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🇨🇺 Cuba Blockade — 2026 Crisis</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6,marginBottom:10}}>An ongoing US oil/economic blockade, in effect since January 2026 — the first effective US blockade of Cuba since the 1962 Missile Crisis, per NYT reporting. Mechanically linked to the Venezuela operation: Venezuelan oil shipments to Cuba were cut off a month before the formal blockade order.</div>
        <Grid2 t={t} items={CUBA_STATS}/>
      </Hero>
      <Note t={t} color="#eab308">⚠️ Editorial note: humanitarian-impact figures below are OHCHR-attributed to the blockade; the US administration's stated rationale (Cuba hosting hostile foreign intelligence/military facilities, providing safe haven to designated terrorist groups) is presented separately and is independently contested by the Cuban government as "fraudulent."</Note>
      <ST t={t} color="#dc2626">⚙️ Mechanics & Developments</ST>
      {CUBA_MECHANICS.map((item,i)=><Card key={i} t={t} style={{borderLeft:"4px solid #dc2626"}}><div style={{padding:"11px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18}}>{item.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text}}>{item.label}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{item.text}</div></div></Card>)}
      <ST t={t} color="#dc2626">🔮 CSIS Scenarios — What Happens Next</ST>
      {CUBA_SCENARIOS.map((s,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${s.color}`}}><div style={{padding:"11px 14px"}}><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:4}}>{s.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{s.text}</div></div></Card>)}
      <EventsTimeline t={t} events={cubaEvents} label="Cuba Timeline"/>
      <Note t={t} color="#dc2626">CSIS's three scenarios are independent policy analysis, not a forecast or confirmed US plan — included to show the range of credible outcomes being discussed by Western security analysts as of mid-2026.</Note>
    </div>}

    {tab==="conflict"&&<div>
      <Hero t={t} color="#eab308"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#facc15",marginBottom:6}}>🗳️ POST-MADURO TRANSITION</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>US special forces captured Nicolás Maduro on Jan 3, 2026 — but the regime stayed. Delcy Rodríguez was sworn in as acting president two days later, Trump recognized her, and the constitutional six-month window to replace an absent president has now elapsed with no election scheduled. The open question analysts pose: democratic transition, or authoritarian adaptation with new faces?</div></Hero>
      <Grid2 t={t} items={[
        {icon:"🪖",label:"Maduro captured & extracted",val:"Jan 3",sub:"US special forces operation, Caracas",color:"#dc2626"},
        {icon:"🔓",label:"Political prisoners released",val:"659+",sub:"Jan 8-Mar 8, per rights groups; ~900 held pre-Jan",color:"#22c55e"},
        {icon:"📜",label:"Constitutional replacement window",val:"Lapsed",sub:"6 months from Jan 5 swearing-in — no election set",color:"#f97316"},
        {icon:"🗺️",label:"Rubio plan phases",val:"3",sub:"Stabilization → recovery → transition",color:"#5b8ec8"},
      ]}/>
      <ST t={t} color="#eab308">📋 The Players & The Stakes</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Delcy Rodríguez (interim)</span> — Maduro's VP, sworn in Jan 5 and recognized by Trump (who has called her 'president-elect' despite no election). Restored US diplomatic ties Mar 5; announced a 1999-present amnesty law; cooperating on security (Tren de Aragua leader Niño Guerrero killed in a joint US-Venezuela operation, Jun 2026).</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>María Corina Machado</span> — Nobel laureate and the country's most popular political figure (~72% approval), sidelined by Trump's stability-first approach but meeting him at the White House and demanding a seat in any negotiation via a 'grand national agreement.'</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>The US posture</span> — Rubio's three-phase plan runs stabilization (incl. selling seized crude), recovery (foreign oil access, national reconciliation), then transition 'up to the Venezuelan people.' Oil executives told Trump they need rule of law before investing $100B.</div>
        <div><span style={{color:t.text,fontWeight:700}}>The analysts' verdict so far</span> — WOLA: 'labeling it democratic does not seem possible' yet; authoritarian structures remain. Carnegie and the Atlantic Council both stress elections plus new electoral/judicial authorities as the real test. Harvard panel consensus (Feb): a contested transitional phase, not yet a democratic transition.</div>
      </div></div></Card>
      <Note t={t} color="#eab308">The 'lapsed window' framing follows Venezuela's constitutional six-month provision for replacing an absent president, as flagged by Carnegie — the interim government disputes that reading. Assessments cited (WOLA, Carnegie, Atlantic Council, Harvard DRCLAS) are independent analysis, not confirmed outcomes.</Note>
    </div>}
    {tab==="mexico"&&<div>
      <Hero t={t} color="#006341"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#4ade80",marginBottom:6}}>🇲🇽 THREE FRONTS, ONE RELATIONSHIP</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Not a shooting war — yet — but a rapidly hardening confrontation across three simultaneous tracks: a NORTHCOM-planned military campaign against cartels now designated as terrorists, a tariff standoff tied to the USMCA's 2026 review, and a fast-escalating diplomatic crisis over Mexican deaths in US immigration custody. Sheinbaum's line throughout: "sovereignty is not for sale."</div></Hero>
      <Grid2 t={t} items={[
        {icon:"🎯",label:"Cartels designated FTOs",val:"10+",sub:"8 initial (Jan 2025) + Juarez Cartel/Los Viagras (Jul 15, 2026)",color:"#dc2626"},
        {icon:"⚰️",label:"Mexicans dead in ICE custody/ops",val:"17",sub:"Mexico seeking US criminal charges over the toll",color:"#ef4444"},
        {icon:"📜",label:"Diplomatic protest notes filed",val:"11",sub:"Formal notes over enforcement deaths, per FM Velasco",color:"#f97316"},
        {icon:"💰",label:"Tariff rate on Mexican goods",val:"25-30%",sub:"IEEPA-based; Feb 2026 SCOTUS ruled the authority itself illegal",color:"#eab308"},
      ]}/>
      <ST t={t} color="#dc2626">🎯 The Cartel War — FTOs, NORTHCOM, and a Cooperation Model So Far</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>The designations</span> — Trump designated eight Latin American cartels and gangs as Foreign Terrorist Organizations on Jan 20, 2025, including six Mexican cartels plus Venezuela's Tren de Aragua and El Salvador's MS-13. The list keeps growing: Treasury/OFAC added the Juarez Cartel and Los Viagras (accused of Michoacán meth labs) on Jul 15, 2026. An FTO designation unlocks covert-action authorities a normal drug-trafficking case wouldn't.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>NORTHCOM's planning order</span> — not CENTCOM: Mexico sits under US Northern Command. A Top Secret directive tasked NORTHCOM (and subordinate SOCNORTH) with "operational preparation of the battlespace" inside Mexico — target packages for high-value individuals and supply-chain nodes tied to Sinaloa and CJNG, readiness for air/drone strikes and Green Beret/SEAL-style direct action.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>What's actually happened</span> — The pattern so far is cooperative, not unilateral: the Feb 2026 killing of CJNG leader "El Mencho" (Nemesio Oseguera Cervantes) was a Mexican military operation with US intelligence support, not a US strike — but it triggered a wave of cartel violence and fragmentation that analysts warn any "decapitation strategy" tends to produce. No confirmed unilateral US strike on Mexican soil has occurred as of this writing; the Southern Spear boat-interdiction campaign (see Southern Spear tab) remains the only confirmed kinetic US action against cartel-linked targets, and that's in international waters, not Mexican territory.</div>
        <div><span style={{color:t.text,fontWeight:700}}>Sheinbaum's red line</span> — "We collaborate, we coordinate, we work together, but we will never subordinate ourselves." Mexico has approved narrow cooperation (e.g. Mexican Senate authorization for joint US 7th Special Forces Group training with Mexican Marines) while explicitly rejecting unilateral US military action as a sovereignty violation.</div>
      </div></div></Card>
      <ST t={t} color="#eab308">💰 Tariffs & the USMCA Review</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>The IEEPA tariff track</span> — Trump imposed 25% tariffs on Mexican goods in Mar 2025 under IEEPA emergency powers, citing fentanyl and migration; threatened a hike to 30% multiple times, each time paused after direct Trump-Sheinbaum calls. In Feb 2026, the US Supreme Court ruled IEEPA cannot legally be used to impose tariffs at all — a major legal blow to the tool Trump had leaned on hardest, though the practical tariff relationship has continued via negotiation rather than immediate reversal.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Mexico's own countermove</span> — Rather than retaliate directly, Sheinbaum imposed a 50% tariff (effective Jan 1, 2026) on 1,000+ products from countries without a Mexican free-trade agreement — including China and India — a step that shields North American supply chains and implicitly aligns with US concerns about Chinese transshipment through Mexico.</div>
        <div><span style={{color:t.text,fontWeight:700}}>USMCA 2026 review</span> — The formal review of the US-Mexico-Canada trade pact is underway this year; tariff policy, the fentanyl/migration linkage, and China-transshipment rules are all live agenda items. $850B+ in annual two-way trade is the backdrop pressure keeping both sides at the table despite the friction.</div>
      </div></div></Card>
      <ST t={t} color="#dc2626">⚖️ Migration & the ICE Death Crisis — the Live Wire</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Jul 11, 2026 — the trigger</span> — ICE agents shot and killed Mexican national Lorenzo Salgado Araujo in Houston; ICE says he rammed a law enforcement vehicle and ignored commands. His death became the flashpoint for a broader reckoning already building over 17 total Mexican deaths tied to US immigration enforcement operations or detention conditions.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Jul 12 — Sheinbaum escalates</span> — At a press conference, Sheinbaum announced Mexico is formally seeking criminal and civil investigations in US courts over the 17 deaths — the toughest action Mexico has taken on this issue, going, in her words, "beyond the diplomatic realm." Mexico had already filed 11 formal diplomatic protest notes.</div>
        <div><span style={{color:t.text,fontWeight:700}}>The bind</span> — Analysts note migration enforcement and cartel policy now sit in tension: FTO designations and military pressure risk displacing communities and driving new asylum claims at the very border Trump wants closed. Mass deportations continue in parallel — 75,900+ Mexican nationals repatriated in a six-month window per Mexican government figures from an earlier phase of the crackdown, with the pace unchanged since.</div>
      </div></div></Card>
      <Note t={t} color="#006341">Sources: Atlantic Council, CFR, CNN, Al Jazeera, Newsweek, Bloomberg, Ken Klippenstein reporting on NORTHCOM planning, EveryCRSReport (CRS). Cartel/FTO and NORTHCOM detail is fast-moving and often based on leaked planning documents rather than confirmed operations — treat "prepared to strike" and "has struck" as distinct claims. Cross-reference: Southern Spear tab (the one confirmed kinetic campaign in this theater) and Great Power Rivalry → Critical Minerals (China-Mexico transshipment angle).</Note>
    </div>}
    {tab==="haiti"&&<div>
      <Hero t={t} color="#00209F"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#6699ff",marginBottom:6}}>🇭🇹 A STATE THAT HAS LARGELY STOPPED GOVERNING ITS CAPITAL</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Since the Viv Ansanm gang coalition's Feb 2024 offensive, Haiti's crisis has deepened rather than stabilized: gangs hold most of Port-au-Prince, a new UN-blessed force is only beginning to deploy, and elections scheduled for Aug 30, 2026 have become the next fight — over whether gang-aligned actors get a seat at the table or a shooting war first.</div></Hero>
      <Grid2 t={t} items={[
        {icon:"🏙️",label:"Port-au-Prince under gang control",val:"~85%",sub:"Up from ~10% government-held (HRW, GCR2P)",color:"#dc2626"},
        {icon:"🏚️",label:"Internally displaced",val:"1.4M+",sub:"As of Sept 2025, still climbing",color:"#f97316"},
        {icon:"🍽️",label:"Facing acute food insecurity",val:"5.7M",sub:"Over half the population",color:"#eab308"},
        {icon:"🪖",label:"Gang Suppression Force",val:"~1,000",sub:"Personnel deployed, early phase (Jul 2026)",color:"#5b8ec8"},
      ]}/>
      <ST t={t} color="#dc2626">🔫 Viv Ansanm — From Gang Alliance to De Facto Authority</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>The alliance</span> — Haiti's two largest gang coalitions, G9 and Gpèp, merged into Viv Ansanm in Feb 2024 and launched a coordinated offensive on Port-au-Prince's civilian infrastructure. What began as rival criminal networks is now a unified force controlling most of the capital plus expanding footholds in the Artibonite and Centre departments.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Governance by violence</span> — The OAS's R2P adviser determined in May 2025 that mass killing, rape, torture and enslavement in Haiti meet the threshold for crimes against humanity, citing the coordinated, hierarchical nature of gang control. Gangs deliberately target schools, markets and medical facilities and manipulate aid distribution to depopulate and control territory — while some leaders, like Jimmy "Barbecue" Chérizier, frame the campaign as a revolt against predatory elites.</div>
        <div><span style={{color:t.text,fontWeight:700}}>Cracks in the coalition</span> — Not fully unified: a December 2025 dispute over continued kidnappings triggered internal Viv Ansanm clashes in Port-au-Prince with multiple fatalities, including children — a reminder the alliance is a coalition of convenience, not a single command.</div>
      </div></div></Card>
      <ST t={t} color="#5b8ec8">🌐 The International Response — FTOs and the Gang Suppression Force</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Terrorist designations</span> — The US designated Viv Ansanm and Gran Grif as Foreign Terrorist Organizations, indicted Chérizier, and sentenced former gang leader Germine Joly to life in prison. The UN Security Council separately sanctioned both coalitions (first as entire gangs, not just individual leaders, in Jul 2025); the EU and Canada added individual sanctions. Same designation mechanism as the Mexican cartels — see Mexico tab.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>MSS → Gang Suppression Force</span> — The Kenya-led Multinational Security Support mission was chronically underfunded and unable to match the crisis's scale; the last Kenyan contingent departed in April 2026. The UN Security Council authorized its successor, the Gang Suppression Force (GSF), in Sept 2025 (Resolution 2793) — a mandate shift from "support the police" to actively "neutralize, isolate, and deter gangs." It's UN-blessed but not a UN mission; personnel costs run on voluntary contributions. Deployment remains in an early phase: ~1,000 personnel as of this month, far short of what the crisis demands.</div>
        <div><span style={{color:t.text,fontWeight:700}}>A hard accountability question</span> — The UN Secretary-General has warned that Haiti's own security forces — the HNP and a Special Security Task Force backed by the US contractor Vectus Global — saw a substantial rise in child casualties in 2025, and could themselves face UN listing for grave violations against children if the pattern repeats in 2026. The fight against the gangs is not a clean good-guys/bad-guys story.</div>
      </div></div></Card>
      <ST t={t} color="#f97316">🗳️ The Aug 30 Elections — the Next Flashpoint</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>General elections are scheduled for Aug 30, 2026 — the clearest near-term date in this file. Analysts (BISI) assess a realistic possibility that Viv Ansanm succeeds in placing political allies within Haiti's electoral infrastructure and securing a broad amnesty before candidate registration closes, formalizing criminal influence within the state rather than being defeated by it. Haiti's transitional government under PM Alix Didier Fils-Aimé remains divided on whether to engage the gangs directly or not — that indecision is itself part of the opening Viv Ansanm is working to exploit.</div></div></Card>
      <Note t={t} color="#00209F">Sources: UN Security Council Report (monthly Haiti forecasts), Human Rights Watch World Report 2026, Global Centre for the Responsibility to Protect, International Crisis Group, BISI. Casualty and control-percentage figures vary by source and are difficult to verify independently given the security situation; treat percentages as directional. Cross-reference: Mexico tab (shared FTO-designation mechanism), Cuba Blockade tab (same hemisphere, same humanitarian-crisis pattern of a fragile state under compounding pressure).</Note>
    </div>}
  </div>;
}



// ════════════════════════════════════════════════════════════════════════════
// DRONE WAR SECTION — integrated drone-strike dashboard (re-themed to slate)
// ════════════════════════════════════════════════════════════════════════════
const DWC = {
  bg:"#0b1220", card:"#101d30", card2:"#0a1628", border:"#1e3a5f",
  text:"#c8d8ed", muted:"#607898", gold:"#eab308", goldLt:"#fde68a",
  ru:"#ef4444", ruDk:"#7f1d1d", ruLt:"#fca5a5",
  ua:"#5b8ec8", uaDk:"#1e3a5f", uaLt:"#bcd3ec",
  green:"#22c55e", orange:"#f97316", purple:"#a855f7", teal:"#14b8a6",
};

const DW_DAILY = [
  { date:"Jun 1",  ru_d:245,ru_m:6,  ru_int:224,ru_thru:27, ua_d:285,ua_int:255,ua_thru:30, alert_h:7.2, pw_gwh:0.38, confirmed:false, note:null },
  { date:"Jun 2",  ru_d:656,ru_m:73, ru_int:642,ru_thru:87, ua_d:148,ua_int:148,ua_thru:0,  alert_h:14.1,pw_gwh:2.10,
    confirmed:true, targets:"Kyiv, Zaporizhzhia, Kharkiv, Dnipro, Poltava, Khmelnytskyi, Sumy",
    note:"🔴 Russia largest June attack: 656 drones + 73 missiles. 38 sites hit. Kyiv: 4 killed, 58 wounded; 140k homes lost power. National toll: 22 killed, 130+ injured." },
  { date:"Jun 3",  ru_d:215,ru_m:6,  ru_int:193,ru_thru:28, ua_d:354,ua_int:295,ua_thru:59, alert_h:9.3, pw_gwh:0.55,
    confirmed:true, targets:"St. Petersburg, Russian-occupied Donetsk, multiple regions",
    note:"🔵 Ukraine retaliatory wave: ~354 drones. St. Petersburg oil terminal hit (fire, Kirovsky district). Bus in Russian-controlled Donetsk struck. Russia claimed all 354 intercepted; fires contradict claim." },
  { date:"Jun 4",  ru_d:185,ru_m:5,  ru_int:169,ru_thru:21, ua_d:270,ua_int:240,ua_thru:30, alert_h:6.8, pw_gwh:0.31, confirmed:false, note:null },
  { date:"Jun 5",  ru_d:222,ru_m:7,  ru_int:203,ru_thru:26, ua_d:305,ua_int:272,ua_thru:33, alert_h:7.1, pw_gwh:0.35, confirmed:false, note:null },
  { date:"Jun 6",  ru_d:198,ru_m:6,  ru_int:181,ru_thru:23, ua_d:292,ua_int:260,ua_thru:32, alert_h:6.9, pw_gwh:0.33, confirmed:false, note:null },
  { date:"Jun 7",  ru_d:235,ru_m:7,  ru_int:215,ru_thru:27, ua_d:322,ua_int:287,ua_thru:35, alert_h:7.4, pw_gwh:0.37, confirmed:false, note:null },
  { date:"Jun 8",  ru_d:258,ru_m:8,  ru_int:237,ru_thru:29, ua_d:338,ua_int:300,ua_thru:38, alert_h:7.8, pw_gwh:0.40,
    confirmed:true, targets:"Occupied Crimea (military logistics train), Russian rear areas",
    note:"🔵 Ukrainian strike drone hit a military logistics train in occupied Crimea in the early hours of Jun 8 — part of the logistical lockdown campaign. Russia began slashing nighttime Crimea train schedules in response." },
  { date:"Jun 9",  ru_d:239,ru_m:7,  ru_int:220,ru_thru:26, ua_d:380,ua_int:318,ua_thru:62, alert_h:8.2, pw_gwh:0.44,
    confirmed:true, targets:"Russian drone component factory, Russian oil infrastructure, occupied Ukraine",
    note:"🔵 Ukraine FP-5 Flamingo cruise missile strikes Russian plant producing Shahed drone components. Russia fired 7 ballistic missiles + 239 drones at Ukraine; Ukraine downed 216 combined." },
  { date:"Jun 10", ru_d:212,ru_m:6,  ru_int:194,ru_thru:24, ua_d:288,ua_int:256,ua_thru:32, alert_h:6.8, pw_gwh:0.33,
    confirmed:true, targets:"Sevastopol (Crimea), occupied Mariupol port, Samara/Novokuibyshevsk refineries",
    note:"🔵 Ukrainian drones struck the Mariupol port (blackout), damaged the historic Sevastopol panorama museum, and the Kuibyshev refinery in Samara burned after 29+ drones. Crimea fuel rationing began." },
  { date:"Jun 11", ru_d:248,ru_m:7,  ru_int:226,ru_thru:29, ua_d:450,ua_int:378,ua_thru:72, alert_h:7.9, pw_gwh:0.41,
    confirmed:true, targets:"Moscow (Gazprom Neft refinery), multiple Russian regions",
    note:"🔵 Ukraine strikes Gazprom Neft Moscow oil refinery for the first time. Confirmed fires across SE Moscow. Part of systematic campaign targeting Russian energy revenue." },
  { date:"Jun 12", ru_d:226,ru_m:7,  ru_int:207,ru_thru:26, ua_d:296,ua_int:263,ua_thru:33, alert_h:7.0, pw_gwh:0.34, confirmed:false, note:null },
  { date:"Jun 13", ru_d:272,ru_m:9,  ru_int:249,ru_thru:32, ua_d:312,ua_int:278,ua_thru:34, alert_h:7.5, pw_gwh:0.38, confirmed:false, note:null },
  { date:"Jun 14", ru_d:202,ru_m:6,  ru_int:185,ru_thru:23, ua_d:276,ua_int:245,ua_thru:31, alert_h:6.7, pw_gwh:0.32, confirmed:false, note:null },
  { date:"Jun 15", ru_d:188,ru_m:5,  ru_int:172,ru_thru:21, ua_d:262,ua_int:232,ua_thru:30, alert_h:6.5, pw_gwh:0.30,
    confirmed:true, targets:"Kharkiv region, Chernihiv region, Dnipropetrovsk, Kherson",
    note:"🟡 ACLED confirms: week of Jun 9–15, Russia attacked 14+ petrol stations in front-line regions. Jun 9 alone: 3 stations in Kharkiv region. Chernihiv: 2 stations." },
  { date:"Jun 16", ru_d:222,ru_m:7,  ru_int:203,ru_thru:26, ua_d:430,ua_int:360,ua_thru:70, alert_h:7.5, pw_gwh:0.38,
    confirmed:true, targets:"Moscow Oil Refinery (Gazprom Neft), multiple Russian regions",
    note:"🔵 Ukraine struck the Moscow Oil Refinery overnight — Russian industry sources cited by Reuters said the strike shut down operations. First of two Moscow refinery hits in a single week." },
  { date:"Jun 17", ru_d:246,ru_m:8,  ru_int:226,ru_thru:28, ua_d:342,ua_int:304,ua_thru:38, alert_h:7.6, pw_gwh:0.39, confirmed:false, note:null },
  { date:"Jun 18", ru_d:239,ru_m:7,  ru_int:219,ru_thru:27, ua_d:555,ua_int:375,ua_thru:180,alert_h:11.2,pw_gwh:1.20,
    confirmed:true, targets:"Moscow Oil Refinery (2nd hit/week), Gukovo oil depot (Rostov), 13+ regions",
    note:"🔵 Ukraine's largest attack on Moscow of the war: ~555 drones nationwide, with ~194 downed on approach to Moscow. Moscow Oil Refinery hit for the 2nd time in a week — the facility halted operations. Aeroflot/Rossiya cancelled 170+ flights." },
  { date:"Jun 19", ru_d:192,ru_m:5,  ru_int:175,ru_thru:22, ua_d:298,ua_int:265,ua_thru:33, alert_h:6.8, pw_gwh:0.33, confirmed:false, note:null },
  { date:"Jun 20", ru_d:216,ru_m:6,  ru_int:198,ru_thru:24, ua_d:282,ua_int:251,ua_thru:31, alert_h:6.9, pw_gwh:0.34,
    confirmed:true, targets:"Crimea supply highways, Chonhar bridge approaches, Russian fuel convoys",
    note:"🟡 CNN/ISW detail Ukraine's logistical lockdown: mid-range roving drones now control 3 coastal highways to Crimea. Freight over the Chonhar bridge fell 71% in two weeks." },
  { date:"Jun 21", ru_d:232,ru_m:7,  ru_int:212,ru_thru:27, ua_d:540,ua_int:301,ua_thru:239,alert_h:8.4, pw_gwh:0.55,
    confirmed:true, targets:"Kerch fuel terminal & oil depot, Port Kavkaz (Krasnodar), Kerch Strait ferry, AD/radar sites",
    note:"🔵 Major Kerch Strait operation ~300 km from the front. Ukraine hit a Kerch fuel terminal and oil depot, the Port Kavkaz logistics hub and the ferry Panagia. Crimea attacks killed 4, wounded 28." },
  { date:"Jun 22", ru_d:206,ru_m:6,  ru_int:189,ru_thru:23, ua_d:272,ua_int:242,ua_thru:30, alert_h:6.7, pw_gwh:0.32, confirmed:false, note:null },
  { date:"Jun 23", ru_d:215,ru_m:6,  ru_int:196,ru_thru:25, ua_d:300,ua_int:267,ua_thru:33, alert_h:7.0, pw_gwh:0.34, confirmed:false, note:null },
  { date:"Jun 24", ru_d:220,ru_m:6,  ru_int:201,ru_thru:25, ua_d:380,ua_int:323,ua_thru:57, alert_h:7.2, pw_gwh:0.35,
    confirmed:true, targets:"Orenburg Gazprom gas/helium plant, Balaklava CHP (Sevastopol), Crimea coastal radar sites",
    note:"🔵 Ukraine struck Russia's only helium plant in Orenburg (1,500km deep) — fires and airport shutdowns reported. Balaklava thermal power plant in Sevastopol also hit; roughly half of occupied Crimea lost power. Russia claims 323 Ukrainian drones intercepted overnight." },
  { date:"Jun 25", ru_d:210,ru_m:6,  ru_int:192,ru_thru:24, ua_d:310,ua_int:276,ua_thru:34, alert_h:6.9, pw_gwh:0.33, confirmed:false, note:null },
  { date:"Jun 26", ru_d:189,ru_m:7,  ru_int:174,ru_thru:19, ua_d:700,ua_int:660,ua_thru:40, alert_h:9.5, pw_gwh:0.50,
    confirmed:true, targets:"12 Russian regions, Crimea, Black Sea — Kerch naval vessels, Novomoskovsk chemical/hydro plant",
    note:"🔵 One of Ukraine's biggest drone assaults since 2022 — 660+ drones per Russian MoD claim, hitting 12 regions plus Crimea. SBU struck Russian navy vessels (Volga, Vyatka) and a ferry at Kerch; Novomoskovsk chemical/hydro plant also hit. Zelensky ordered a '40-day influence operation' escalating strikes. 🔴 Same night: Russia launched 189 drones + 7 Iskander-M missiles at Ukraine; 4 missiles penetrated." },
  { date:"Jun 27", ru_d:205,ru_m:6,  ru_int:188,ru_thru:23, ua_d:290,ua_int:258,ua_thru:32, alert_h:6.8, pw_gwh:0.32, confirmed:false, note:null },
  { date:"Jun 28", ru_d:200,ru_m:6,  ru_int:183,ru_thru:23, ua_d:295,ua_int:263,ua_thru:32, alert_h:6.7, pw_gwh:0.32, confirmed:false, note:null },
  { date:"Jun 29", ru_d:155,ru_m:8,  ru_int:138,ru_thru:25, ua_d:460,ua_int:419,ua_thru:41, alert_h:8.0, pw_gwh:0.40,
    confirmed:true, targets:"Dnipro, Zaporizhzhia, Sumy, Odesa, Chernihiv, Kherson, Kharkiv regions (RU strikes); Dubna Space Communications Center 2nd strike (UA)",
    note:"🔴 Russian missile/drone strikes killed 13, injured 109 across Ukraine — Dnipro (5 killed) and Zaporizhzhia (3 killed) hit hardest; Sumy, Odesa, Chernihiv, Kherson also struck. Ukraine's Air Force shot down 138 incoming targets. 🔵 Same period: Zelensky confirmed a second Ukrainian strike on Russia's Dubna Space Communications Center (Moscow Oblast) — used for Russian intelligence and coordination of occupying forces. Russia claims 419+ Ukrainian drones intercepted since Monday evening." },
  { date:"Jun 30", ru_d:195,ru_m:6,  ru_int:178,ru_thru:23, ua_d:460,ua_int:419,ua_thru:41, alert_h:7.5, pw_gwh:0.36,
    confirmed:true, targets:"Dubna Satellite Communications Center (2nd strike), Moscow region, 18 Russian regions incl. Crimea",
    note:"🔵 Ukraine struck the Dubna Satellite Communications Center north of Moscow for the second time in just over a week — used for Russian ISR and coordinating occupying forces. Russia's MoD claimed 419 drones intercepted across 18 regions; Moscow's mayor reported 61 shot down approaching the capital, briefly disrupting Domodedovo and Zhukovsky airports. A 6-month-old died when drone debris hit a home in Yegoryevsk." },
  { date:"Jul 1",  ru_d:496,ru_m:74, ru_int:524,ru_thru:46, ua_d:390,ua_int:318,ua_thru:72, alert_h:9.6, pw_gwh:1.30,
    confirmed:true, targets:"Kyiv (30+ locations), Ufa refinery, Penza NIIFI sensor plant, Nizhny Novgorod refinery, Luhansk rail bridge",
    note:"🔴 Russia's deadliest strike on Kyiv in months: ~74 missiles (28 ballistic, incl. a Zircon hypersonic) plus ~496 drones, mostly aimed at the capital. Ukraine's Air Force intercepted 48 missiles and 476 drones; still, 25-30 killed and 90+ injured across 30+ Kyiv locations, a 64-apartment building destroyed. 🔵 Same period: Ukraine struck the Ufa refinery (~1,300km deep) and the Penza NIIFI sensor plant, plus a Nizhny Novgorod refinery and a Luhansk rail bridge used for Russian logistics." },
  { date:"Jul 2",  ru_d:105,ru_m:2,  ru_int:83, ru_thru:24, ua_d:260,ua_int:215,ua_thru:45, alert_h:6.2, pw_gwh:0.28,
    confirmed:true, targets:"Saky airbase (occupied Crimea, 2nd strike this week, 7 aircraft hit), Crimea approaches (2 waves)",
    note:"🔵 SBU struck Saky airbase in occupied Crimea for the second time in a week, hitting seven Russian aircraft (Su-30SM/Su-30/Su-24) in hangars — sustained campaign against Crimean airpower. 🔴 Russia's overnight barrage was comparatively light after Jul 1's mass strike: 2 Kh-59/69 missiles and 105 drones, with Ukraine's Air Force intercepting or suppressing 83 of them." },
  { date:"Jul 3",  ru_d:86, ru_m:2,  ru_int:69, ru_thru:17, ua_d:500,ua_int:0,ua_thru:0, alert_h:5.9, pw_gwh:0.24,
    confirmed:true, targets:"St. Petersburg Oil Terminal, Kronstadt Naval Base (Baltic Fleet HQ)",
    note:"🔵 Ukraine's deepest Baltic strike yet: ~500 long-range drones (per Russian MoD; ~200 at Moscow) hit the St. Petersburg Oil Terminal — one of the Baltic's largest transshipment hubs — and the Kronstadt Naval Base, both catching fire. UA GenStaff: Russian refining now at 42.47% of design capacity. 🔴 Russia's night was light: 86 drones + 2 missiles (Iskander-M, Kh-59/69); 69 drones downed, 17 through at 16 locations." },
  { date:"Jul 4",  ru_d:129,ru_m:0,  ru_int:115,ru_thru:14, ua_d:null,ua_int:0,ua_thru:0, alert_h:6.1, pw_gwh:0.20,
    confirmed:true, targets:"Kharkiv (gas station, Kyivskyi district), Izium missile strike, Zaporizhzhia (7 injured), Chernihiv",
    note:"🔴 129 drones launched overnight; 115 neutralized (~89%). Daytime Jul 5 follow-ons: jet-drone hit a Kharkiv gas station (2 injured), missile strike on Izium, 7 injured in Zaporizhzhia with an architectural landmark destroyed. 🔴 Russia claimed the capture of Kostiantynivka; Zelensky publicly refuted it — 'Putin decided to lie' — and ISW notes no confirmation of full control." },
  { date:"Jul 5",  ru_d:351,ru_m:68, ru_int:363,ru_thru:47, ua_d:625,ua_int:613,ua_thru:12, alert_h:9.2, pw_gwh:0.55,
    confirmed:true, targets:"Kyiv (Obolonskyi, Holosiivskyi, Podilskyi, Darnytskyi districts), Vyshneve (Ukroboronprom ammunition depot)",
    note:"🔴 Russia's 2nd mass strike on Kyiv in 5 days: 68 missiles (23 ballistic, 39 cruise, 6 Zircon hypersonic) + 351 drones. 363 intercepted (37 missiles + 326 drones), but ZERO ballistic missiles stopped — 29 hit at 34 locations alongside 18 drones. Vyshneve ammunition depot detonation forced 600+ evacuations. Death toll rose to 26 across Kyiv/Oblast as rescue work continued. Zelensky: 'insufficient supply of interceptor missiles.' 🔵 Ukraine's answer the same night: 625 drones at Russia (RU MoD claim), 613 downed — the largest UA raid to that point." },
  { date:"Jul 6",  ru_d:123,ru_m:0,  ru_int:108,ru_thru:12, ua_d:430,ua_int:0,ua_thru:0, alert_h:4.6, pw_gwh:0.16,
    confirmed:true, targets:"Nationwide drone-only barrage, north/south/center/east",
    note:"🔵 Quieter night — 123 drones, no missiles; 108 neutralized (~88%), 12 hit at 10 locations. 🔵 Ukraine's deepest strike of the war: FP-1 drones (3,000km) hit the Omsk refinery — Russia's largest, 10% of national refining capacity, first-ever strike on the plant — forcing it offline within 24 hours. That night Ukraine flew 430+ drones at Moscow and the surrounding region — its biggest strike on the capital area in two years (RU MoD claim; Ukraine does not disclose launch totals)." },
  { date:"Jul 7",  ru_d:169,ru_m:7,  ru_int:139,ru_thru:25, ua_d:null,ua_int:0,ua_thru:0, alert_h:6.4, pw_gwh:0.28,
    confirmed:true, targets:"Kyiv (Vyshneve depot follow-on, Desnianskyi/Sviatoshynskyi districts)",
    note:"🔴 5 Iskander-M/S-400 ballistic + 2 Kh-31P anti-radar missiles + 169 drones (evening start). 139 drones neutralized; 5 missiles hit 4 locations, 20 drones hit 11 locations, 2 Kh-31P failed to reach targets on their own. 3-4 killed, 15+ injured in Kyiv — the third ballistic strike on the capital in six days, landing during the NATO Ankara summit." },
  { date:"Jul 8",  ru_d:94, ru_m:2,  ru_int:72, ru_thru:21, ua_d:null,ua_int:73,ua_thru:0, alert_h:4.0, pw_gwh:0.14,
    confirmed:true, targets:"Odesa (civilian infrastructure)",
    note:"🔴 2 Iskander-M ballistic missiles + 94 drones (Shahed incl. jet-powered, Gerbera, Italmas, Parodiya decoys). 72 drones neutralized; both missiles hit along with 19 drones. 4 killed, 6-7 injured in Odesa — infrastructure and vehicles damaged. 🔵 Russian MoD claimed 73 Ukrainian drones downed overnight; Ukraine disclosed no launch total (charted as a gap, not a zero)." },
  { date:"Jul 9",  ru_d:88, ru_m:0,  ru_int:78, ru_thru:10, ua_d:null,ua_int:0,ua_thru:0, alert_h:3.8, pw_gwh:0.12,
    confirmed:true, targets:"Deep-strike day: Tver & Stavropol oil depots, Sea of Azov tankers",
    note:"🔵 Ukraine's fuel-chain day — Tver and Stavropol oil depots hit 500+km deep (evacuations near Vyazniki reservoirs), two tankers ablaze in the Sea of Azov. Moscow banned diesel exports through month-end; Putin called for Crimea fuel subsidies. Overnight into Ukraine: ~88 drones, no missiles; 78 neutralized." },
  { date:"Jul 10", ru_d:121,ru_m:12, ru_int:113,ru_thru:20, ua_d:178,ua_int:0,ua_thru:0, alert_h:6.7, pw_gwh:0.30,
    confirmed:true, targets:"Kyiv (Solomianskyi, Darnytskyi, Dniprovskyi), Sumy glide bombs",
    note:"🔴 12 missiles (6 Iskander-M/S-400 ballistic, 4 Kh-59/69, 2 Kh-31) + 121 drones. Air defense downed 2 missiles + 111 drones — but ZERO of 6 ballistic stopped; hits at 11 locations. 6 killed incl. a child, 29 wounded (Sumy glide-bomb strike on a crowd killed 4). 🔵 Russia claimed 178 UA drones downed; Ukraine struck 21 more Azov tankers + tugboats and suspended Azov-Don Canal traffic." },
  { date:"Jul 11", ru_d:115,ru_m:13, ru_int:102,ru_thru:23, ua_d:null,ua_int:0,ua_thru:0, alert_h:6.3, pw_gwh:0.27,
    confirmed:true, targets:"Kharkiv, Dnipro, Kryvyi Rih (struck twice)",
    note:"🔴 13 missiles (9 Kh-59/69 + 4 Kh-31 anti-radar) + 115 drones. Air defense downed 7 Kh-59/69 + 95 drones; the 4 Kh-31s failed to reach targets independently. 2 missiles + 19 drones hit 12 locations, debris at 12 more. Kryvyi Rih hit twice — 2 killed in the first strike; Kharkiv and Dnipro also struck with casualties." },
  { date:"Jul 12", ru_d:134,ru_m:3, ru_int:126,ru_thru:11, ua_d:null,ua_int:0,ua_thru:0, alert_h:5.8, pw_gwh:0.22,
    confirmed:true, targets:"Scattered strike-drone hits, 5 locations",
    note:"🔴 3 Kh-59/69 + 134 drones — Russia's largest single-night drone count since the Jun 2 mass strike (656). Air defense achieved ~92% efficiency, downing all 3 missiles + 123 drones; 6 strike-drone hits recorded at 5 locations." },
  { date:"Jul 13", ru_d:135,ru_m:10, ru_int:115,ru_thru:26, ua_d:288,ua_int:0,ua_thru:0, alert_h:7.1, pw_gwh:0.34,
    confirmed:true, targets:"Kyiv (Darnytskyi, Holosiivskyi — warehouses + a school)",
    note:"🔴 8 Iskander-M/S-400 ballistic + 2 Kh-59/69 + 135 drones. Air defense downed 5 of 8 ballistic missiles — the first confirmed ballistic intercepts in nearly two weeks, likely PAC-3 — plus both Kh-59/69 and 108 drones (~85%). 1 ballistic + 25 drones still hit 17 locations; 2 more ballistic missiles unconfirmed. 🔵 Same night: Ukraine's navy struck 4 shadow-fleet tankers + a patrol boat in the Sea of Azov, and hit the Salavat oil refinery in Bashkortostan — 1,400km deep, one of the furthest strikes of the war. Russia claimed 288 Ukrainian drones intercepted." },
  { date:"Jul 14", ru_d:122,ru_m:2, ru_int:103,ru_thru:20, ua_d:null,ua_int:0,ua_thru:0, alert_h:6.0, pw_gwh:0.25,
    confirmed:true, targets:"Sumy, Odesa (5th consecutive night), Zaporizhzhia, Dnipropetrovsk, Chernihiv",
    note:"🔴 2 Kh-59/69 + 122 drones. Air defense downed both missiles + 101 drones; 18 drones hit 19 locations, debris at 7 more. Casualties spread across five oblasts: 3 killed/20 injured in Sumy, 3 killed/8 injured in Odesa (its 5th straight night under attack), 1 killed in Zaporizhzhia, 1 killed/2 injured in Dnipropetrovsk (Kryvyi Rih), 1 killed in Chernihiv." },
  { date:"Jul 15", ru_d:122,ru_m:2, ru_int:101,ru_thru:20, ua_d:null,ua_int:0,ua_thru:0, alert_h:5.6, pw_gwh:0.24,
    confirmed:true, targets:"Nationwide, no single focal city reported",
    note:"🔴 2 missiles + 122 drones. Air defense downed/suppressed 101 drones; both missiles and 18 drones hit their targets. Same day, satellite imagery confirmed Ukraine's Jul 14 Salavat refinery strike damaged the AVT-4/AVT-6 processing units." },
  { date:"Jul 16", ru_d:146,ru_m:13, ru_int:132,ru_thru:22, ua_d:null,ua_int:0,ua_thru:0, alert_h:7.4, pw_gwh:0.31,
    confirmed:true, targets:"Kyiv (ballistic hit), nationwide drone dispersal",
    note:"🔴 13 missiles (8 Iskander-M/S-400, 4 Kh-22/32, 1 Kh-31P) + 146 drones (incl. 5 loitering munitions) — 159 total. Air defense downed/jammed 132; 5 ballistic + 1 Kh-31P + 16 drones hit 15 locations, debris at 7 more; the 4 Kh-22/32 cruise missiles failed to reach targets. 2 killed in a Kyiv ballistic strike. 🔵 Same window: SBU confirmed a Jul 14-15 drone strike on Engels-2 airbase (Saratov) tore the tail off a Tu-95 bomber; General Staff confirmed a fire at the Slavneft-YANOS refinery in Yaroslavl (a re-strike on the Jun 28 target)." },
  { date:"Jul 17", ru_d:130,ru_m:8, ru_int:120,ru_thru:18, ua_d:null,ua_int:0,ua_thru:0, alert_h:6.1, pw_gwh:0.26,
    confirmed:true, targets:"Dispersed, no single focal city reported",
    note:"🔴 8 missiles (1 Kh-31P + 7 Kh-59/69) + 130 drones (Shahed/Gerbera/Italmas + decoys). Air defense downed/suppressed 5 missiles + 115 drones. 🔵 Ministry of Defence said Ukrainian drone units have struck over 1 million verified targets since the start of 2026, including ~193,500 Russian soldiers killed/wounded by drone strikes alone; UAH 333.6B ($7.5B) in drone contracts signed for H1 2026, double the prior year." },
  { date:"Jul 18", ru_d:90,ru_m:7, ru_int:70,ru_thru:27, ua_d:null,ua_int:0,ua_thru:0, alert_h:5.3, pw_gwh:0.20,
    confirmed:true, targets:"Odesa Oblast (main target)",
    note:"🔴 7 missiles (2 Iskander-M, 2 Oniks anti-ship, 3 Kh-59/69) + 90 drones. Air defense downed/jammed 1 Kh-59/69 + 69 drones; hits recorded at 19 locations. 🔵 Ukraine struck inside Moscow region itself: an oil depot in Noginsk, a warehouse at the 1st Center of Unmanned Systems Forces in Elektrostal (destroyed by fire), and a large fire at a Wildberries logistics center in Moscow. Moscow's mayor said 1,892 Ukrainian drones were detected heading toward the region between Jul 11-18." },
  { date:"Jul 19", ru_d:125,ru_m:41, ru_int:126,ru_thru:40, ua_d:null,ua_int:0,ua_thru:0, alert_h:8.9, pw_gwh:0.38,
    confirmed:true, targets:"Kyiv (main target, 5 districts hit)",
    note:"🔴 41 missiles (25 ballistic) + 125 drones — one of the largest ballistic barrages on Kyiv of the war. Air defense intercepted/suppressed 18 missiles + 108 drones. 1 killed, 16 wounded; fires across five Kyiv districts hit residential buildings, offices, industrial sites, a dormitory and vehicles. Zelensky said most missiles targeted the capital." },
];

const DW_MONTHLY = [
  { month:"Jan '25", yr:2025, ru:3800, ua:1500, ruRate:76, uaRate:9,  civ:85,  inj:390, alert_h:5.8, pw_gwh:1.6,  ru_cost:133, ua_cost:96,  adDrone:18, adSam:52, adMfg:24, adEw:6, c:false },
  { month:"Feb '25", yr:2025, ru:4100, ua:1800, ruRate:77, uaRate:9,  civ:90,  inj:420, alert_h:6.1, pw_gwh:1.8,  ru_cost:144, ua_cost:102, adDrone:20, adSam:50, adMfg:23, adEw:7, c:false },
  { month:"Mar '25", yr:2025, ru:4300, ua:2200, ruRate:78, uaRate:10, civ:110, inj:510, alert_h:6.3, pw_gwh:1.9,  ru_cost:151, ua_cost:108, adDrone:22, adSam:48, adMfg:23, adEw:7, c:false },
  { month:"Apr '25", yr:2025, ru:4400, ua:2500, ruRate:79, uaRate:10, civ:130, inj:580, alert_h:6.5, pw_gwh:2.0,  ru_cost:154, ua_cost:112, adDrone:25, adSam:46, adMfg:22, adEw:7, c:false },
  { month:"May '25", yr:2025, ru:4600, ua:2800, ruRate:80, uaRate:11, civ:130, inj:590, alert_h:6.7, pw_gwh:2.1,  ru_cost:161, ua_cost:118, adDrone:27, adSam:44, adMfg:22, adEw:7, c:false },
  { month:"Jun '25", yr:2025, ru:5000, ua:3200, ruRate:81, uaRate:12, civ:232, inj:880, alert_h:7.2, pw_gwh:2.4,  ru_cost:175, ua_cost:128, adDrone:29, adSam:42, adMfg:22, adEw:7, c:true,  src:"UN HRMMU: 232 civilians killed Jun 2025" },
  { month:"Jul '25", yr:2025, ru:6200, ua:3000, ruRate:82, uaRate:12, civ:286, inj:980, alert_h:8.1, pw_gwh:3.0,  ru_cost:217, ua_cost:150, adDrone:31, adSam:40, adMfg:22, adEw:7, c:true,  src:"ISIS: 203 UAVs/day in Jul '25. UN HRMMU: 286 killed Jul 2025." },
  { month:"Aug '25", yr:2025, ru:6500, ua:3500, ruRate:83, uaRate:13, civ:58,  inj:260, alert_h:8.3, pw_gwh:3.2,  ru_cost:228, ua_cost:158, adDrone:33, adSam:38, adMfg:21, adEw:8, c:true,  src:"UN HRMMU: 58 killed Aug 2025." },
  { month:"Sep '25", yr:2025, ru:6800, ua:4200, ruRate:84, uaRate:13, civ:214, inj:1000,alert_h:8.6, pw_gwh:3.4,  ru_cost:238, ua_cost:164, adDrone:35, adSam:36, adMfg:21, adEw:8, c:true,  src:"UN HRMMU: 214 killed, ~1000 injured Sep 2025." },
  { month:"Oct '25", yr:2025, ru:7200, ua:5000, ruRate:85, uaRate:14, civ:180, inj:750, alert_h:9.0, pw_gwh:3.6,  ru_cost:252, ua_cost:176, adDrone:36, adSam:35, adMfg:21, adEw:8, c:false },
  { month:"Nov '25", yr:2025, ru:6900, ua:5500, ruRate:86, uaRate:15, civ:155, inj:640, alert_h:8.8, pw_gwh:3.5,  ru_cost:242, ua_cost:170, adDrone:37, adSam:34, adMfg:21, adEw:8, c:false },
  { month:"Dec '25", yr:2025, ru:7100, ua:6000, ruRate:87, uaRate:15, civ:145, inj:600, alert_h:9.2, pw_gwh:3.6,  ru_cost:249, ua_cost:176, adDrone:38, adSam:33, adMfg:21, adEw:8, c:false },
  { month:"Jan '26", yr:2026, ru:6200, ua:7200, ruRate:88, uaRate:14, civ:140, inj:570, alert_h:9.5, pw_gwh:3.8,  ru_cost:217, ua_cost:165, adDrone:40, adSam:30, adMfg:22, adEw:8, c:true,  src:"4,600+ Shahed-type UAVs in first 1.5 months of 2026 (Kyiv Independent)." },
  { month:"Feb '26", yr:2026, ru:5100, ua:7100, ruRate:88, uaRate:15, civ:95,  inj:390, alert_h:8.8, pw_gwh:3.1,  ru_cost:179, ua_cost:142, adDrone:41, adSam:29, adMfg:22, adEw:8, c:true,  src:"ISIS: 181 UAVs/day average Feb 2026 (5,068 total)." },
  { month:"Mar '26", yr:2026, ru:6462, ua:7000, ruRate:90, uaRate:16, civ:180, inj:720, alert_h:9.8, pw_gwh:3.9,  ru_cost:226, ua_cost:174, adDrone:42, adSam:28, adMfg:22, adEw:8, c:true,  src:"ISIS: 6,462 UAVs confirmed Mar 2026 (208/day, new peak)." },
  { month:"Apr '26", yr:2026, ru:6700, ua:8200, ruRate:90, uaRate:16, civ:160, inj:650, alert_h:9.5, pw_gwh:3.8,  ru_cost:235, ua_cost:178, adDrone:43, adSam:27, adMfg:22, adEw:8, c:true,  src:"UA MoD: ~6,700 enemy aerial assets in April 2026." },
  { month:"May '26", yr:2026, ru:8150, ua:9418, ruRate:92, uaRate:17, civ:210, inj:820, alert_h:11.2,pw_gwh:4.6,  ru_cost:285, ua_cost:210, adDrone:44, adSam:26, adMfg:22, adEw:8, c:true,  src:"UA Air Force: 8,150 drones + 211 missiles. 91.73% drone intercept. RU MoD: 9,418 UA drones (record)." },
  { month:"Jun '26", yr:2026, ru:7535, ua:9795, ruRate:91, uaRate:18, civ:98,  inj:449, alert_h:8.3, pw_gwh:3.7,  ru_cost:264, ua_cost:238, adDrone:45, adSam:25, adMfg:22, adEw:8, c:true,  src:"Full 30-day total. Confirmed: Jun 2 mass attack (22 killed), Jun 18 Moscow refinery hit x2, Jun 24 Orenburg helium plant strike, Jun 26 one of UA's largest drone assaults (660+, RU MoD claim), Jun 29 RU strikes killed 13/injured 109, Jun 30 Dubna comms center struck for the 2nd time." },
];

const DW_WEAPONS = [
  { name:"Shahed/Geran-2", side:"RU", cost:35000,  qty_may26:8150, notes:"Mass-produced at Alabuga. ~20-50k range; $35k midpoint per CSIS. 50-90 kg warhead." },
  { name:"Kh-101 Cruise Missile", side:"RU", cost:13000000, qty_may26:60,   notes:"Air-launched, stealth. Modified 3+ times to evade Ukrainian AD. ~53% intercepted." },
  { name:"KN-23/24 (DPRK)", side:"RU", cost:3000000,  qty_may26:40,   notes:"North Korean ballistic missiles. <53% intercept rate; Patriot shortage makes these lethal." },
  { name:"Iskander-M", side:"RU", cost:3000000,  qty_may26:30,   notes:"Ground-launched ballistic. 89.9% reach target. Extremely difficult to intercept without PAC-3." },
  { name:"Kh-22 / AS-4", side:"RU", cost:1000000,  qty_may26:20,   notes:"Air-launched. 94.6% reach target — most effective per CSIS cost-exchange analysis." },
  { name:"Gerbera / Italmas decoys", side:"RU", cost:15000,   qty_may26:400,  notes:"Deployed to saturate/confuse UA air defense. Absorb expensive interceptors." },
  { name:"An-196 Liutyi (deep strike)", side:"UA", cost:150000,  qty_may26:9418, notes:"Primary UA one-way deep-strike drone. Hits Russian energy, refineries, AD systems." },
  { name:"FP-5 Flamingo (cruise missile)", side:"UA", cost:500000,  qty_may26:12,   notes:"New Ukrainian cruise missile. Jun 9: used to strike Russian drone component factory." },
  { name:"Interceptor UAV (defensive)", side:"UA", cost:7500,    qty_may26:3000, notes:"40%+ of Shahed kills in May 2026. Massive cost advantage vs. SAM missiles." },
  { name:"PAC-3 (Patriot interceptor)", side:"UA", cost:3500000, qty_may26:55,   notes:"Only effective ballistic missile interceptor. Severe shortage. US produces 48/month." },
  { name:"NASAMS (AIM-9X)", side:"UA", cost:1000000,  qty_may26:140,  notes:"Cost-effective vs cruise missiles. NOT cost-effective vs. Shaheds ($35k drone vs $1M missile)." },
];

const DW_AD_METHODS = DW_MONTHLY.map((m) => ({
  month: m.month,
  "Interceptor Drones": m.adDrone, "SAM Systems": m.adSam,
  "Mobile Fire Groups": m.adMfg, "EW / Jamming": m.adEw,
}));

const DW_ORIGINS = [
  { region:"Krasnodar / Primorsko-Akhtarsk", pct:34, note:"Primary Shahed launch corridor. Low-altitude flight path over Black Sea." },
  { region:"Kursk / Bryansk border", pct:24, note:"Northern launch corridor. Shaheds routed through Belarus airspace toward Kyiv approach." },
  { region:"Crimea (Kerch, Saky)", pct:18, note:"Southern approach. Targets Kherson, Mykolaiv, Odesa. Ukraine hits launch sites regularly." },
  { region:"Engels Airbase (Saratov)", pct:10, note:"Strategic bomber base for Kh-101 cruise missile launches. UA drones have hit it multiple times." },
  { region:"Voronezh / Belgorod", pct:8,  note:"Artillery + short-range drone corridor for Kharkiv, Sumy. Front-line saturation." },
  { region:"Other Russian territory", pct:6,  note:"Caspian Sea naval launches, Murmansk, Black Sea Fleet." },
];

const DW_TARGETS_RU = [
  { cat:"Energy Infrastructure", pct:38, col:"#ef4444", note:"Power plants, transformer stations, substations. Goal: collapse Ukrainian grid." },
  { cat:"Residential / Civilian", pct:26, col:"#f97316", note:"Direct targeting of apartment blocks, markets, transit — documented by UN." },
  { cat:"Military / Industrial",  pct:18, col:"#dc2626", note:"Defense factories, ammunition depots, military bases." },
  { cat:"Transport Nodes",        pct:11, col:"#eab308", note:"Railway junctions, bridges, fuel depots. Attrition of logistics." },
  { cat:"Government / Admin",     pct:7,  col:"#fbbf24", note:"Administrative buildings, communication infrastructure." },
];
const DW_TARGETS_UA = [
  { cat:"Oil Refineries / Depots", pct:42, col:"#5b8ec8", note:"Systematic campaign against Russian energy export revenue. Moscow refinery hit twice in one week." },
  { cat:"Air Defense Systems",     pct:22, col:"#2563eb", note:"23 Russian AD systems destroyed, 109 damaged Jan-May 2026 (UA killboard)." },
  { cat:"Military / Industrial",   pct:18, col:"#1d4ed8", note:"Drone factories (Alabuga), missile component plants, ammunition facilities." },
  { cat:"Transport / Railways",    pct:11, col:"#60a5fa", note:"Fuel supply lines, rail hubs in Voronezh, Kursk, Rostov regions." },
  { cat:"Political Symbolism",     pct:7,  col:"#93c5fd", note:"Moscow area: signals capability, undermines Kremlin domestic narrative." },
];

const DW_INTERCEPT_WEAPON = [
  { weapon:"Shahed / attack drones", rate:90, col:"#22c55e", note:"Mar 2026: 5,833 of 6,463 intercepted (90.25%)." },
  { weapon:"Cruise missiles", rate:74, col:"#22c55e", note:"Mar 2026: 102 of 138 intercepted." },
  { weapon:"Ballistic missiles", rate:27, col:"#ef4444", note:"Russia produces ~120/mo; US Patriot supplies ~60 interceptors/mo." },
];

const DW_PRODUCTION = [
  { type:"FPV (fiber-optic)", icon:"🎯", adv:"Ukraine", ua:"30,000-50,000/mo", uaNote:"Spring 2026. Unjammable within 5-10 km cable range.", ru:"Scaling rapidly", ruNote:"Russia plans 7.3M FPV + 7.8M warheads in 2026 (Syrskyi)." },
  { type:"Interceptor drones", icon:"🛡️", adv:"Ukraine", ua:"1,000-1,500/day", uaNote:"Target 2,000/day. STING ~$2,500 vs $3M+ Patriot.", ru:"Limited", ruNote:"Ukraine far ahead in dedicated interceptor capability." },
  { type:"Shahed / Geran loitering", icon:"💥", adv:"Russia", ua:"~0 (own design)", uaNote:"Ukraine builds long-range FP-5 Flamingo instead.", ru:"5,000-8,000/mo", ruNote:"Alabuga factory + Iranian supply. Mass raids on cities." },
  { type:"Lancet (loitering munition)", icon:"🎯", adv:"Russia", ua:"No equivalent at scale", uaNote:"Ukraine counters with EW + interceptors.", ru:"Tripled 2023; large scale", ruNote:"Primary precision tool vs UA artillery. ~80% claimed hit rate." },
  { type:"Long-range strike drones", icon:"🚁", adv:"Ukraine", ua:"Significant — FP-5 Flamingo", uaNote:"Struck St. Petersburg (1,450 km), Tyumen (2,800 km).", ru:"Shahed-type + cruise", ruNote:"Used against cities + infrastructure at scale." },
  { type:"Ground UGVs", icon:"🤖", adv:"Ukraine", ua:"7,000+/mo in 2026", uaNote:"15,000 deployed 2025; up from 2,000 in 2024.", ru:"Expanding", ruNote:"Both racing; Ukraine ahead on doctrine and scale." },
];

const DW_UA_FORCE = {
  targetsStruck:"800,000+", interceptorsDay:"1,000-1,500", usfPersonnel:"86,000+", models:"1,343",
  facts:[
    ["👥","86,000+ personnel","Unmanned Systems Forces — a separate branch from the regular army (Feb 2026). Target: 100,000 by April."],
    ["🌍","Operates globally, not just the front","Crimea SEAD campaign, Kerch Bridge strikes, Voronezh plant, Tyumen refinery (2,800 km) — all USF operations."],
    ["🤖","AI integration","TFL-1 auto-steer module ($118) takes over if the pilot loses contact — 2-4x effectiveness."],
    ["📡","Fiber-optic FPV","First deployed near Kharkiv, Feb 2025. Unjammable — EW cannot disrupt the cable signal."],
    ["🛠️","1,343 drone models on Brave1","581 FPV, 434 fiber-optic. Ukraine exported drones for the first time in 2026."],
    ["🎯","Two-person crew record","23 Shaheds shot down in one engagement (STING interceptor drones, March 2026)."],
  ],
};

const dwFmt = n => n >= 1000 ? (n/1000).toFixed(n >= 10000 ? 0 : 1)+"k" : n;
const dwPct = (a,b) => b ? Math.round(100*a/b) : 0;

const DWTooltip2 = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:DWC.bg, border:`1px solid ${DWC.border}`, borderRadius:8, padding:"10px 14px", maxWidth:300, fontSize:12 }}>
      <div style={{ color:DWC.gold, fontWeight:700, marginBottom:6 }}>{label}</div>
      {payload.map((p,i) => (
        <div key={i} style={{ color:p.color||DWC.text, marginBottom:2 }}>
          <span style={{ opacity:.7 }}>{p.name}: </span>
          <span style={{ fontWeight:600 }}>{typeof p.value === "number" && p.value > 100 ? dwFmt(p.value) : p.value}{p.unit||""}</span>
        </div>
      ))}
    </div>
  );
};

const DWCard = ({ children, style }) => (
  <div style={{ background:DWC.card, border:`1px solid ${DWC.border}`, borderRadius:12, padding:16, ...style }}>{children}</div>
);

const DWStatPill = ({ label, val, sub, col }) => (
  <div style={{ background:DWC.card2, border:`1px solid ${DWC.border}`, borderRadius:10, padding:"12px 14px", flex:1, minWidth:0 }}>
    <div style={{ color:DWC.muted, fontSize:10, textTransform:"uppercase", letterSpacing:.8 }}>{label}</div>
    <div style={{ color:col||DWC.text, fontSize:22, fontWeight:900, fontFamily:FONT, lineHeight:1.1, marginTop:3 }}>{val}</div>
    {sub && <div style={{ color:DWC.muted, fontSize:11, marginTop:3 }}>{sub}</div>}
  </div>
);

const DWPieRing = ({ data, size=120 }) => {
  let acc = 0;
  const cx = size/2, cy = size/2, r = size*0.42, ir = size*0.22;
  const segs = data.map(d => { const s=acc; acc+=d.pct; return {...d, s, e:acc}; });
  const arc = (s,e,radius) => {
    const a1=(s/100)*2*Math.PI-Math.PI/2, a2=(e/100)*2*Math.PI-Math.PI/2;
    const x1=cx+radius*Math.cos(a1), y1=cy+radius*Math.sin(a1);
    const x2=cx+radius*Math.cos(a2), y2=cy+radius*Math.sin(a2);
    return `M${cx} ${cy} L${x1} ${y1} A${radius} ${radius} 0 ${e-s>50?1:0} 1 ${x2} ${y2}Z`;
  };
  return (
    <svg width={size} height={size} style={{ flexShrink:0 }}>
      {segs.map((s,i)=><path key={i} d={arc(s.s,s.e,r)} fill={s.col||s.color} stroke={DWC.bg} strokeWidth={1.5}/>)}
      <circle cx={cx} cy={cy} r={ir} fill={DWC.card}/>
    </svg>
  );
};

const DWSectionHead = ({ color, icon, title, sub }) => (
  <div style={{ marginBottom:14 }}>
    <h2 style={{ color, fontWeight:900, fontSize:15, display:"inline", margin:0 }}>{icon} {title}</h2>
    {sub && <span style={{ color:DWC.muted, fontSize:12, marginLeft:10 }}>{sub}</span>}
  </div>
);

const DW_SAT_SUSTAINABLE = 350;
const DW_SAT_SURGE = 750;
const dwSatZone = (load) =>
  load < 70  ? { label:"NOMINAL",   col:"#22c55e" } :
  load < 100 ? { label:"ELEVATED",  col:"#eab308" } :
  load < 150 ? { label:"SATURATED", col:"#f97316" } :
               { label:"CRITICAL",  col:"#ef4444" };

const DWGauge = ({ load, size=200, label, sublabel }) => {
  const z = dwSatZone(load);
  const cx = size/2, cy = size/2, r = size*0.4, sw = size*0.09;
  const sweep = 270, start = 135;
  const frac = Math.min(load/180, 1);
  const polar = (deg) => { const a = (deg-90) * Math.PI/180; return [cx + r*Math.cos(a), cy + r*Math.sin(a)]; };
  const arcPath = (fromDeg, toDeg) => {
    const [x1,y1] = polar(fromDeg), [x2,y2] = polar(toDeg);
    const large = (toDeg-fromDeg) > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };
  return (
    <svg width={size} height={size} style={{ flexShrink:0 }}>
      <path d={arcPath(start, start+sweep)} fill="none" stroke="#0a1628" strokeWidth={sw} strokeLinecap="round"/>
      {[70,100,150].map((m,i)=>{ const d = start + sweep*(m/180); const [tx,ty] = polar(d); return <circle key={i} cx={tx} cy={ty} r={2.5} fill="#334155"/>; })}
      <path d={arcPath(start, start+sweep*frac)} fill="none" stroke={z.col} strokeWidth={sw} strokeLinecap="round"/>
      <text x={cx} y={cy-6} textAnchor="middle" fill={z.col} fontSize={size*0.2} fontWeight="900" fontFamily={FONT}>{Math.round(load)}%</text>
      <text x={cx} y={cy+size*0.13} textAnchor="middle" fill={z.col} fontSize={size*0.075} fontWeight="700" letterSpacing="1.5">{z.label}</text>
      {label && <text x={cx} y={cy+size*0.27} textAnchor="middle" fill="#607898" fontSize={size*0.062}>{label}</text>}
      {sublabel && <text x={cx} y={cy+size*0.35} textAnchor="middle" fill="#475569" fontSize={size*0.052}>{sublabel}</text>}
    </svg>
  );
};
const DW_ASSETS = [
  { name:"Shahed-136 / Geran-2", side:"RU", cls:"Strike", role:"Loitering munition", status:"Primary RU strike drone",
    range:"1,500-2,500 km", speed:"~185 km/h", warhead:"50-90 kg", cost:"$20-50k", ceiling:"~4,000 m",
    engine:"Mado MD-550 piston (reverse-engineered German Limbach L550E), 2-blade pusher prop",
    guidance:"GLONASS/GPS + inertial; Nasir anti-jam satnav; many now 2G/3G/4G + Starlink remote-control",
    production:"~3,000/month; Alabuga capacity ceiling ~5,000/mo; 57,000+ deployed since 2022",
    intercepted:"~91.7% (May '26)",
    detail:"The defining weapon of the air war. Cropped delta-wing, ~3.5 m long, ~200 kg. Tiny radar cross-section (0.01-0.05 m2) and nap-of-earth flight make it hard to detect. Mass salvos are designed to saturate defenses, not to make each drone hit.",
    facts:["Russia mastered Starlink remote control of Geran-2 by Jan 2026 — enabled a 3-drone hit on a moving passenger train near Kharkiv","Mixed swarms pair Shaheds with Gerbera/Italmas decoys; a typical wave is 30-40% decoys","Built almost entirely from Western/Chinese commercial chips — a live sanctions-evasion story","US fielded its own reverse-engineered clone (LUCAS) at ~$35k in late 2025"] },
  { name:"Shahed MS-series (MS001)", side:"RU", cls:"Strike", role:"AI autonomous loitering munition", status:"Fielded 2025-26, expanding",
    range:"~2,000 km", speed:"~185 km/h", warhead:"~50 kg", cost:"~$50k+", ceiling:"~4,000 m",
    engine:"Piston pusher (Geran-2 airframe)",
    guidance:"Nvidia Jetson Orin Nano (67 TOPS machine vision) + 4-element CRPA anti-jam antenna + Nasir 8-channel receiver",
    production:"Subset of Geran-2 line; downed examples recovered in Sumy region June 2025+",
    intercepted:"Harder — resists jamming",
    detail:"A Ukrainian general called the downed MS001 a digital predator that thinks for itself. The Jetson Orin processes live camera imagery in flight, performs automatic target recognition, and can dynamically re-route without operator input. Far more resistant to GPS jamming than the base Shahed.",
    facts:["Nvidia Jetson Orin Nano is a $249 commercial AI module — 67 trillion ops/sec","Switched from Chinese BMTI chips to Xilinx (AMD) FPGA for signal processing","Carries infrared/night-vision camera for terminal guidance","Same Jetson Orin AI chip also found in Russia's V2U drone (per Ukraine DIU)"] },
  { name:"Geran-2 Series E (MANPAD carrier)", side:"RU", cls:"Strike", role:"Anti-helicopter drone", status:"Experimental, early 2026",
    range:"~1,500 km", speed:"~185 km/h", warhead:"18 kg 9K333 Verba MANPAD", cost:"n/a", ceiling:"~4,000 m",
    engine:"Piston pusher", guidance:"Remote-piloted via Chinese camera",
    production:"Experimental subcategory identified by Ukraine early 2026", intercepted:"n/a",
    detail:"A Geran-2 carrying an 18-kg 9K333 Verba man-portable SAM on its back, designed to hunt helicopters — after Ukraine's commander-in-chief noted helicopters accounted for ~40% of Russian drone kills.",
    facts:["Direct answer to Ukrainian helicopter air-defense success","Turns a one-way attack drone into an airborne SAM platform","Reconnaissance variant found carrying a Raspberry Pi 5 + Mini PC running Windows 11"] },
  { name:"Geran-3 / Shahed-238 (jet)", side:"RU", cls:"Strike", role:"Jet loitering munition", status:"Limited, scaling toward 2027",
    range:"~2,500 km", speed:"550-600 km/h", warhead:"~50 kg", cost:"~$80k est.", ceiling:"higher than piston Shahed",
    engine:"Turbojet", guidance:"Satnav + inertial; nose-mounted camera for terminal guidance",
    production:"Limited deployment; combined with China-produced Garpiya-3 for range", intercepted:"Much harder — 3x faster than piston Shahed",
    detail:"The turbojet evolution of the Shahed family. Roughly three times faster than the piston Geran-2, compressing Ukraine's intercept window dramatically. Expected to become a primary variant by 2027.",
    facts:["Speed is the key threat — interceptor drones tuned for ~185 km/h Shaheds struggle against 550+ km/h","Nose camera enables terminal guidance against moving targets","Higher service ceiling complicates mobile-fire-group and MANPAD engagement"] },
  { name:"Gerbera decoy", side:"RU", cls:"Decoy", role:"Decoy / radar saturation", status:"Mass-produced",
    range:"~600 km", speed:"~150 km/h", warhead:"None or small", cost:"~$10-15k", ceiling:"low-medium",
    engine:"Light piston / electric", guidance:"Basic satnav; sometimes radar reflectors to mimic Shahed signature",
    production:"~24,000 planned for 2025 (Ukraine DIU estimate)", intercepted:"Often ignored once identified — but forces identification first",
    detail:"A cheap plywood-and-foam decoy built to look like a Shahed on radar. Launched in mixed swarms to exhaust radar operators and soak up expensive interceptor missiles. A $10k decoy that draws a $1M NASAMS shot is a win for Russia even when it fails.",
    facts:["Feb 26 example: ~280 Shaheds inside a ~420-drone wave — the rest decoys","Forces Ukraine to spend identification time and sometimes munitions on non-threats","Cheaper airframe makes the Russian volume numbers look larger than the true strike count"] },
  { name:"Italmas (BM-35)", side:"RU", cls:"Decoy", role:"Light strike / decoy", status:"In service",
    range:"~200-300 km", speed:"~150 km/h", warhead:"Small", cost:"~$15k", ceiling:"low",
    engine:"Electric / light piston", guidance:"Satnav + inertial",
    production:"Mixed into Shahed swarms alongside Gerbera", intercepted:"Variable",
    detail:"A lighter, shorter-range drone used both as a decoy and for light strike. Appears repeatedly in mixed-type salvos alongside Shahed and Gerbera, each with distinct radar signatures, complicating Ukrainian classification.",
    facts:["Part of Russia's deliberate signature-diversity strategy in swarms","Distinct flight profile from Shahed/Gerbera muddies the radar picture"] },
  { name:"Kh-101 cruise missile", side:"RU", cls:"Missile", role:"Air-launched cruise missile", status:"Heavy use",
    range:"~5,500 km", speed:"~720 km/h", warhead:"~450 kg", cost:"~$13M", ceiling:"low-altitude terrain-following",
    engine:"Turbofan", guidance:"INS + GLONASS + terrain matching; modified 3+ times in 2026 to defeat UA AD",
    production:"Launched from Tu-95MS / Tu-160 bombers", intercepted:"~53% (missiles, May '26)",
    detail:"Russia's principal strategic air-launched cruise missile and the most problematic for Ukrainian defenses among the cruise category. Stealth profile and terrain-following flight. A single bomber volley costs more than a month of Shahed launches.",
    facts:["3+ hardware/software revisions in 2026 specifically to beat UA intercept tactics","Cost asymmetry is stark — one Kh-101 ~ 370 Shaheds","Engels airbase (launch site) repeatedly struck by UA drones to suppress sortie rate"] },
  { name:"Iskander-M / KN-23 ballistic", side:"RU", cls:"Missile", role:"Short-range ballistic missile", status:"Heavy use",
    range:"500-900 km", speed:"Mach 6+", warhead:"~500 kg", cost:"~$3M", ceiling:"ballistic apogee",
    engine:"Solid rocket", guidance:"INS + optical/terminal; quasi-ballistic maneuvering",
    production:"Domestic (Iskander) + DPRK transfer (KN-23/24)", intercepted:"<53% — only Patriot PAC-3 is effective",
    detail:"The deadliest threat to Ukrainian civilians. Quasi-ballistic maneuvering defeats most interceptors, and only the scarce Patriot PAC-3 can reliably engage them. US PAC-3 stocks were depleted by the 2026 Iran war.",
    facts:["Russia's June 2 attack used 30 ballistic missile hits across 38 locations","Hypersonic Oreshnik also fielded in 2026 for strategic signaling","Patriot shortage is the single biggest gap in Ukraine's air defense"] },
  { name:"An-196 Liutyi", side:"UA", cls:"Strike", role:"Deep-strike one-way drone", status:"Primary UA deep-strike asset",
    range:"~2,000 km", speed:"~200 km/h", warhead:"~50-75 kg", cost:"~$150k est.", ceiling:"medium",
    engine:"Piston, pusher prop", guidance:"Satnav + inertial; terminal optical on some",
    production:"Massively scaled since 2024; UA launched 9,418 drones in May '26 (per RU MoD)", intercepted:"Russia claims high; confirmed hits prove substantial leakage",
    detail:"Ukraine's workhorse for striking refineries, oil terminals, airbases (Engels), and Moscow. Reaches essentially all of European Russia. The backbone of the campaign that hit the Gazprom Neft Moscow refinery twice in a week.",
    facts:["Jun 18: ~555 launched in a single night — among the largest UA strikes of the war","Targets chosen to drain Russian oil-export revenue and erode air defenses","Ukraine generally does not disclose launch counts — figures come from Russian MoD"] },
  { name:"FP-5 Flamingo", side:"UA", cls:"Missile", role:"Long-range cruise missile", status:"Fielded 2026",
    range:"~3,000 km (claimed)", speed:"~700 km/h", warhead:"~1,000 kg (claimed)", cost:"~$500k est.", ceiling:"low-altitude",
    engine:"Turbojet", guidance:"INS + satnav; precision terminal",
    production:"Fire Point; scaling through 2026", intercepted:"Limited data",
    detail:"Ukraine's domestically developed heavy cruise missile — far higher speed, accuracy and warhead than a one-way UAV. Used June 9 2026 to strike a Russian plant producing Shahed components.",
    facts:["Same maker (Fire Point) is behind the FP-7.x interceptor program","Large warhead enables single-shot destruction of hardened industrial targets","Jun 9: hit a Shahed-component factory — attacking Russia's drone supply chain at the source"] },
  { name:"Batyar / Artemis ALM-20", side:"UA", cls:"Strike", role:"Shahed-class deep-strike analogs", status:"Fielded 2025-26",
    range:"~1,000+ km", speed:"~180-200 km/h", warhead:"~30-50 kg", cost:"~$50-120k", ceiling:"medium",
    engine:"Piston pusher", guidance:"Satnav + inertial",
    production:"Batyar by DeepStrikeTech (May '25); Artemis ALM-20 American-European (Oct '25)", intercepted:"Variable",
    detail:"Ukraine's own answer to the Shahed economic model. These cheaper analogs let Ukraine add volume to its deep-strike campaign without spending An-196 or Flamingo inventory.",
    facts:["Mirrors Russia's own volume logic back at Russian territory","ALM-20 is a trans-Atlantic co-development — widens the supplier base","Lets Ukraine reserve premium munitions for the hardest targets"] },
  { name:"Interceptor drones (Sting / Brave1)", side:"UA", cls:"Defense", role:"Drone-on-drone air defense", status:"Scaling fast — key 2026 shift",
    range:"~50-100 km", speed:"~300-350 km/h", warhead:"Kinetic / small charge", cost:"$5-10k", ceiling:"matches Shahed band",
    engine:"Electric / small turbine", guidance:"Operator target-select then autonomous terminal homing (Brave1: 95% automated)",
    production:"Scaling under Brave1; share of Shahed kills doubled in 4 months", intercepted:"n/a (is the interceptor)",
    detail:"The most important defensive development of 2026. Drone-on-drone interception at ~$7.5k beats a $35k Shahed on cost — finally flipping the economics that made Patriot-vs-Shahed unsustainable. Brave1 automates ~95% of the engagement.",
    facts:["World first (April '26): a Sting interceptor launched from an unmanned seaborne vessel killed a Shahed","Interceptor-drone share of Shahed kills doubled in 4 months even as Russia raised launches ~35%/month","Autonomy breaks the one pilot = one intercept ceiling that Russia's saturation tactics exploit","Ukraine's stated goal: a stable 95% intercept rate of aerial targets"] },
  { name:"PAC-3 / NASAMS (interceptor SAMs)", side:"UA", cls:"Defense", role:"Surface-to-air missile systems", status:"In service, supply-constrained",
    range:"PAC-3 ~35 km / NASAMS ~25 km", speed:"supersonic", warhead:"Hit-to-kill / proximity", cost:"PAC-3 ~$3.5M / NASAMS ~$1M", ceiling:"high (PAC-3)",
    engine:"Rocket", guidance:"Radar + active/semi-active homing",
    production:"Western-supplied; PAC-3 critically scarce", intercepted:"PAC-3 is the only reliable counter to ballistic missiles",
    detail:"The high-end backstop. PAC-3 is the only system that reliably stops Iskander/KN-23 ballistic missiles, but US stocks were drained by the 2026 Iran war and production is only ~48/month. NASAMS is wildly uneconomical against $35k Shaheds.",
    facts:["PAC-3 vs Shahed = ~100x unfavorable cost ratio","Zelenskyy's repeated June appeals to the US center on Patriot resupply","NASAMS reserved for cruise missiles; drones handed to cheaper layers"] },
  { name:"FP-7.x interceptor (in development)", side:"UA", cls:"Defense", role:"Domestic anti-ballistic interceptor", status:"Testing — mass production targeted Aug '26",
    range:"~100 km (target)", speed:"supersonic", warhead:"Kinetic", cost:"TBD (much less than PAC-3)", ceiling:"high (target)",
    engine:"Rocket", guidance:"Radar + terminal homing; partner-supplied radars & C2",
    production:"Fire Point; first test Jun '26 pretty successful; completed systems by 2027", intercepted:"n/a",
    detail:"Ukraine's bid for a domestic PAC-3 alternative to close the ballistic-missile gap. The Fire Point CEO described the first June 2026 test flight as pretty successful, with mass production targeted for August 2026.",
    facts:["Aims directly at the Patriot dependency that leaves cities exposed","Same manufacturer as the FP-5 Flamingo cruise missile","Domestic production would free Ukraine from US PAC-3 supply constraints"] },
];

const DW_STRIKE_LOG = [
  { date:"Jul 18", targets:[
      {name:"Moscow Region: Noginsk oil depot + Elektrostal USF warehouse + Wildberries logistics fire",region:"Moscow Oblast, Russia",dist:450,cat:"Energy/Military-Industrial",icon:"🎯",severity:"critical",
       result:"Strikes landed inside Moscow region itself: an oil depot hit in Noginsk, a warehouse at the 1st Center of Unmanned Systems Forces destroyed by fire in Elektrostal, and a large fire at Wildberries' second-largest logistics center in Moscow. Moscow's mayor reported 1,892 Ukrainian drones detected heading toward the region Jul 11-18."} ]},
  { date:"Jul 14", targets:[
      {name:"Russian oil refinery + 10 tankers + 4 ferries, Sea of Azov",region:"Sea of Azov / S. Russia",dist:400,cat:"Naval",icon:"🚢",severity:"critical",
       result:"The isolation campaign's tempo holds: Ukraine's General Staff reported strikes on a Russian oil refinery plus 10 tankers and 4 ferries in the Sea of Azov — the third multi-vessel Azov operation in four days (21 vessels Jul 11, 15 vessels Jul 13). Details on the refinery and vessel damage were not broken out in the initial report."} ]},
  { date:"Jul 13", targets:[
      {name:"Salavat Oil Refinery (Bashkortostan) + Sea of Azov naval strike",region:"Bashkortostan, Russia / Sea of Azov",dist:1400,cat:"Energy/Naval",icon:"🎯",severity:"critical",
       result:"One of the deepest strikes of the war — the Salavat oil refinery in Bashkortostan, ~1,400km from the border; the regional governor confirmed an industrial-area strike without naming the target. Same night, Ukraine's navy struck 4 shadow-fleet tankers and a patrol boat in the Sea of Azov. Zelensky separately said Ukraine has now struck 105 Russian vessels in the Azov since Jul 6."} ]},
  { date:"Jul 13", targets:[
      {name:"Sea of Azov shadow fleet — 15 vessels",region:"Sea of Azov",dist:400,cat:"Naval",icon:"🚢",severity:"critical",
       result:"Ukraine's Unmanned Systems Forces struck 15 vessels in a single operation: 7 oil tankers, 5 cargo ships, 1 ferry and 2 tugboats, alongside Russian energy infrastructure in occupied territory and enemy air defense systems. ATESH partisan reporting says the campaign has produced a severe fuel shortage in Kherson and Crimea — Russian commanders are now rationing fuel for mobile fire groups and air defense units."} ]},
  { date:"Jul 11", targets:[
      {name:"Sea of Azov — 21 Tankers + Support Vessels",region:"Sea of Azov / Rostov Oblast",dist:400,cat:"Naval",icon:"🚢",severity:"critical",
       result:"Ukraine's largest single-night strike on the Azov shadow fleet: 21 oil/petroleum tankers plus 4 tugboats, 2 cargo ships and a dredger damaged. Russia suspended navigation on the Azov-Don Canal in response. Satellite tracking (Cyberboroshno/Planet Labs) shows the shadow fleet north of the Kerch Bridge collapsing from ~100 vessels around Jul 1 to ~20 by Jul 8 — a fivefold reduction in eight nights."} ]},
  { date:"Jul 10", targets:[
      {name:"Yevpatoriia substation, Crimea power grid, + 3 Azov/Black Sea oil facilities",region:"Crimea / Russia (multi-region)",dist:300,cat:"Energy",icon:"⚡",severity:"major",
       result:"Fifth straight night of the isolation campaign: a key substation strike cut power to occupied Yevpatoriia, Krymenergo announced further restrictions in Crimea's Southern/Central districts, and Voda Kryma reported partial water-supply loss tied to the grid damage. Simultaneously, at least 3 oil facilities were struck in Russian regions bordering the Azov and Black Seas. 12 more Azov vessels hit in the preceding 24 hours per Ukrainian drone forces; Russia claimed 376 drones intercepted overnight without breaking out how many were over Crimea specifically."} ]},
  { date:"Jul 9", targets:[
      {name:"Tver & Stavropol oil depots + Sea of Azov tankers",region:"Tver / Stavropol / Rostov, Russia",dist:800,cat:"Energy",icon:"🛢️",severity:"critical",
       result:"Coordinated fuel-chain day: SBU drones struck two oil depots 500+km deep (Tver depot fire confirmed by acting Gov. Korolyov; Vyazniki reservoirs in Stavropol ablaze with apartment evacuations per Gov. Vladimirov), while naval drones set two more tankers on fire in the Sea of Azov (Rostov Gov. Slusar). The cumulative campaign has produced a national fuel crisis — Moscow banned diesel exports through month-end."} ]},
  { date:"Jul 6", targets:[
      {name:"Omsk Oil Refinery (ELOU-AVT-11 unit)",region:"Omsk Oblast, Russia",dist:2500,cat:"Energy",icon:"🛢️",severity:"critical",
       result:"Deepest strike of the war: upgraded long-range FP-1 drones (~3,000km flight) hit Russia's largest refinery for the first time — 10% of national refining capacity, the last of Russia's 11 largest gasoline producers to be successfully targeted. Satellite imagery confirmed 4 impacts on the ELOU-AVT-11 unit (~38-40% of plant capacity); the refinery suspended operations within 24 hours."} ]},
  { date:"Jul 2", targets:[
      {name:"Saky Airbase (2nd strike this week)",region:"Occupied Crimea",dist:220,cat:"Military",icon:"✈️",severity:"critical",
       result:"SBU struck Saky airbase for the second time in a week, hitting seven Russian aircraft (Su-30SM, Su-30, Su-24) sheltered in hangars — part of a sustained campaign to degrade Russian airpower on the peninsula."} ]},
  { date:"Jul 1", targets:[
      {name:"Ufa Refinery",region:"Bashkortostan",dist:1300,cat:"Energy",icon:"🛢️",severity:"critical",
       result:"Struck one of Russia's largest lubricant-producing refineries, ~1,300km from the border — among the deepest strikes of the campaign. Zelensky called it 'an entirely just response.'"},
      {name:"Penza NIIFI Sensor Plant",region:"Penza Oblast",dist:730,cat:"Military-Industrial",icon:"🏭",severity:"critical",
       result:"Hit a facility producing sensors for Russian cruise and ballistic missiles and satellite components — a direct strike on precision-strike supply chain infrastructure."},
      {name:"Nizhny Novgorod Oil Refinery",region:"Nizhny Novgorod Oblast",dist:920,cat:"Energy",icon:"🛢️",severity:"major",
       result:"Ukraine's General Staff confirmed a strike on one of Russia's largest refineries east of Moscow, starting a fire, hours after Russia's mass overnight attack on Kyiv."},
      {name:"Siverskyi Donets Rail Bridge",region:"Occupied Luhansk Oblast",dist:60,cat:"Logistics",icon:"🌉",severity:"major",
       result:"Struck a railway bridge near Stanytsia Luhanska used by Russian forces to move troops, weapons, and equipment to the front."} ]},
  { date:"Jun 30", targets:[
      {name:"Dubna Space Communications Center (2nd strike)",region:"Moscow Oblast",dist:1080,cat:"Military",icon:"📡",severity:"critical",
       result:"Zelensky confirmed a second Ukrainian strike on Russia's Dubna Space Communications Center, used for intelligence gathering and coordinating occupying forces in Ukraine — part of what Zelensky called Ukraine's 'plan of long-range sanctions' against Russia."} ]},
  { date:"Jun 26", targets:[
      {name:"Kerch naval vessels (Volga, Vyatka) + ferry Petropavlovsk",region:"Kerch, Crimea",dist:300,cat:"Naval",icon:"🚢",severity:"critical",
       result:"SBU struck two Russian reconnaissance/minelaying ships and a cargo-passenger ferry at Kerch port, reportedly starting a large fire — claim not independently verified. Part of a 12-region, 660+ drone overnight campaign, among Ukraine's largest since 2022."},
      {name:"Novomoskovsk chemical & hydroelectric plant",region:"Tula Oblast",dist:450,cat:"Military-Industrial",icon:"🏭",severity:"major",
       result:"Independent Russian outlet Astra reported a chemical plant and hydroelectric facility in Novomoskovsk were struck and caught fire during the same overnight operation."} ]},
  { date:"Jun 24", targets:[
      {name:"Orenburg Gazprom Gas Processing & Helium Plant",region:"Orenburg Oblast",dist:1500,cat:"Energy",icon:"🛢️",severity:"critical",
       result:"Russia's only helium production plant and a key KazRosGaz gas-purification facility — fires and airport shutdowns reported. ~1,500km from the Ukrainian border, among the deepest strikes of the campaign. Confirmed by Ukraine's General Staff."},
      {name:"Balaklava Thermal Power Plant + coastal radar sites",region:"Sevastopol, Crimea",dist:290,cat:"Energy",icon:"⚡",severity:"critical",
       result:"Balaklava CHP struck along with radar sites near Bakhchysarai, Kerch, and Mount Ai-Petri. Roughly half of occupied Crimea lost power — part of the continuing energy-siege campaign."} ]},
  { date:"Jun 23", targets:[
      {name:"Voronezh missile electronics plant",region:"Voronezh Oblast",dist:640,cat:"Military-Industrial",icon:"🏭",severity:"critical",
       result:"CONFIRMED HIT — Ukrainian missile strike on plant manufacturing electronics for Iskander tactical missiles and Kh-101 cruise missiles. Direct attack on Russia's primary precision-strike production capability."},
      {name:"Kerch thermal power plant + railway facilities (Crimea)",region:"Crimea",dist:310,cat:"Energy",icon:"⚡",severity:"critical",
       result:"Fire at Kerch thermal power plant confirmed Jun 23 following overnight drone strikes. Completes Crimea energy siege: oil terminals, gas compressors, power plant all hit within 72 hours."} ]},
  { date:"Jun 22", targets:[
      {name:"Crimea power plant (occupied territory)",region:"Crimea",dist:280,cat:"Energy",icon:"⚡",severity:"critical",
       result:"Ukrainian drones struck a power plant in Russian-occupied Crimea overnight — the latest in a systematic campaign targeting all energy infrastructure on the peninsula. Continues the Logistics Lockdown operation."},
      {name:"Moscow Oblast targets",region:"Moscow Oblast",dist:1080,cat:"Military-Industrial",icon:"🏭",severity:"major",
       result:"Additional strikes reported on targets in Moscow Oblast overnight. Second consecutive week of strikes in the capital region following the Kapotnya refinery shutdown Jun 18."} ]},
  { date:"Jun 21", targets:[
      {name:"TES-Terminal-1 oil facility, Kerch + Port Kavkaz, Krasnodar",region:"Crimea / Krasnodar",dist:310,cat:"Energy",icon:"🛢️",severity:"critical",
       result:"FIRE confirmed on both sides of Kerch Strait. TES-Terminal-1 is key storage for fuels supplying Russian occupation forces. SBU Alpha unit + Unmanned Systems Forces coordinated. Crimea governor bans all civilian fuel sales. 4 killed, 28 wounded."},
      {name:"4x S-400 radar stations + 2 Pantsir systems near Crimean Bridge",region:"Crimea",dist:300,cat:"Military",icon:"📡",severity:"critical",
       result:"Four S-400 radar stations and two Pantsir-S air defense complexes struck near the Crimean Bridge. Continues systematic SEAD campaign that began January 2026."},
      {name:"Railway bridges: N. Crimean Canal, Sivash (Chonhar), Zaporizhzhia",region:"Crimea / Zaporizhzhia",dist:250,cat:"Infrastructure",icon:"🌉",severity:"major",
       result:"Three railway bridges struck simultaneously — all used by Russian forces for military transport. Compounds previous Chonhar and North Crimean Canal bridge damage."},
      {name:"UAV command posts (Belgorod, Zaporizhzhia, Donetsk, Bryansk)",region:"Multiple",dist:120,cat:"Military",icon:"⚔️",severity:"major",
       result:"UAV command post near Pochaiv (Belgorod) struck by SBU. Additional drone control nodes hit near Myrne, Komar (Donetsk), Horky (Bryansk, Russia)."} ]},
  { date:"Jun 20", targets:[
      {name:"Tyumen Antipinsky Oil Refinery",region:"Tyumen Oblast, Siberia",dist:2800,cat:"Energy",icon:"🛢️",severity:"critical",
       result:"Ukrainian drones struck the Antipinsky refinery in Tyumen — processing 7.5-9M metric tons of crude oil per year. Confirmed by General Staff. Among the deepest Ukrainian strikes of the war."},
      {name:"4 gas compressors + Hlibivka underground gas storage, Crimea",region:"Crimea",dist:280,cat:"Energy",icon:"⚡",severity:"critical",
       result:"Four gas compressors struck across occupied Crimea. Hlibivka underground gas storage facility hit. Bridge across Henichesk Strait also struck. 13 additional military facilities hit."} ]},
  { date:"Jun 19", targets:[
      {name:"5 coastal radar stations + Osa SAM + drone workshop",region:"Crimea",dist:290,cat:"Military",icon:"📡",severity:"critical",
       result:"All five coastal radar stations struck by Unmanned Systems Forces overnight. Osa surface-to-air missile system destroyed. Drone production workshop struck — systematic degradation of Crimea air defenses."},
      {name:"Russian shadow fleet tanker (Black Sea)",region:"Black Sea",dist:0,cat:"Naval",icon:"🚢",severity:"major",
       result:"Shadow fleet tanker confirmed hit by Ukrainian General Staff. Part of ongoing campaign against Russian vessels sustaining the naval blockade and fuel supply."} ]},
  { date:"Jun 18", targets:[
      {name:"Moscow Oil Refinery (Kapotnya, Gazprom Neft)",region:"Moscow",dist:1070,cat:"Energy",icon:"🛢️",severity:"critical",
       result:"SHUT DOWN INDEFINITELY — General Staff confirmed damage to combined oil processing unit and storage tanks. Second strike in one week. Largest drone attack on Moscow since Feb 2022. All 4 Moscow airports temporarily closed; 500+ flights cancelled."},
      {name:"Railway bridge over N. Crimean Canal + Rostov oil depot",region:"Occupied Kherson / Rostov",dist:300,cat:"Infrastructure",icon:"🌉",severity:"major",
       result:"Railway bridge over North Crimean Canal struck — disrupting military transport to southern front. Rostov region oil depot struck; 1 killed, 2 injured."} ]},
  { date:"Jun 15", targets:[
      {name:"Chonhar Bridge",region:"Kherson Oblast / Crimea border",dist:250,cat:"Infrastructure",icon:"🌉",severity:"critical",
       result:"BRIDGE DAMAGED — only short land route between mainland occupied Ukraine and Crimea. Russian authorities suspended traffic; Dzhankoi checkpoint closed. Ukraine working to isolate the peninsula entirely."} ]},
  { date:"Jun 12", targets:[
      {name:"VNIIR-Progress defence factory",region:"Cheboksary, Chuvashia",dist:1100,cat:"Military-Industrial",icon:"🏭",severity:"critical",
       result:"Second attack in 5 weeks via FP-5 Flamingo cruise missiles. Plant produces Kometa-M navigation modules for Shahed drones, guided aerial bombs, and cruise missiles — critical to Russia's entire strike arsenal."},
      {name:"Kuibyshev Oil Refinery",region:"Samara Oblast",dist:1200,cat:"Energy",icon:"🛢️",severity:"critical",
       result:"Part of coordinated energy attack. Fuel disruptions forced gasoline purchase restrictions across 20+ Russian regions and occupied territories."},
      {name:"Vtorovo + Lobkovo pipeline pumping stations",region:"Vladimir Oblast",dist:920,cat:"Energy",icon:"⚡",severity:"major",
       result:"Two oil pumping stations struck by SBU Alpha-unit drones. Disrupts pipeline transit toward central Russia. Contributed to nationwide fuel shortage."} ]},
  { date:"Jun 11", targets:[
      {name:"St. Petersburg Kirishi Oil Terminal",region:"Leningrad Oblast",dist:1450,cat:"Energy",icon:"⛽",severity:"critical",
       result:"Russia's largest Baltic Sea oil terminal struck by FP-5 Flamingo cruise missile (~1,100km+ range strike). Simultaneous corvette strike at Baltiisk Naval Base."},
      {name:"Afipsky Oil Refinery",region:"Krasnodar Krai",dist:560,cat:"Energy",icon:"🛢️",severity:"major",
       result:"Fire reported. Capacity ~6M tons/year. Part of large-scale overnight energy operation."} ]},
  { date:"Jun 10", targets:[
      {name:"Mariupol Port (energy, radar, repair infrastructure)",region:"Mariupol, Donetsk Oblast",dist:110,cat:"Military",icon:"⚓",severity:"critical",
       result:"1st Azov Corps operation: electrical substations, radar equipment, control tower, fuel storage tanks struck. Port blackout confirmed. Significantly limited Mariupol's capacity as a logistics hub."},
      {name:"Panorama of the Defence of Sevastopol museum",region:"Sevastopol, Crimea",dist:270,cat:"Military",icon:"🎯",severity:"major",
       result:"Drone struck the historic Panorama museum building — Russian-installed governor confirmed roof on fire. Area used for Russian military coordination. Nighttime train schedules cut across Crimea following the operation."} ]},
  { date:"Jun 7", targets:[
      {name:"Semikolodyansk oil depot + Feodosia marine oil terminal",region:"Eastern Crimea",dist:210,cat:"Energy",icon:"🛢️",severity:"major",
       result:"Semikolodyansk depot used as transshipment for fuel oil, diesel, bitumen. Feodosia terminal: 7 fuel storage tanks — emergency fuel supply for Crimea. Both struck by Special Operations Forces."} ]},
  { date:"Jun 2", targets:[
      {name:"Dzhankoi railway station, Crimea",region:"Crimea",dist:220,cat:"Infrastructure",icon:"🚂",severity:"major",
       result:"Drone attack caused fire and damaged administrative building. Russian occupation authorities closed Dzhankoi Station to passengers — major delays across Crimea rail network. Footage geolocated by ISW."} ]},
  { date:"May 31", targets:[
      {name:"Slavneft-YANOS Oil Refinery (4th strike in month)",region:"Yaroslavl Oblast",dist:700,cat:"Energy",icon:"🛢️",severity:"critical",
       result:"Fourth confirmed Ukrainian strike on Slavneft-YANOS in May — one of Russia's five largest refineries (15M tons/year). Zelensky confirmed: 10 Russian oil refineries struck in May, six forced to shut down. Nearly 40% of Russia's primary refining capacity offline."},
      {name:"Kinef Refinery (full production halt)",region:"Kirishi, Leningrad Oblast",dist:1100,cat:"Energy",icon:"🛢️",severity:"critical",
       result:"Kinef struck in late March and again in early May — fully stopped production. Strikes triggered 50-litre fuel caps in St. Petersburg, 20-litre rationing in occupied Luhansk and Crimea."} ]},
  { date:"May 22-23", targets:[
      {name:"Metafrax Chemicals plant, Perm Krai",region:"Perm Krai, Urals",dist:1700,cat:"Military-Industrial",icon:"🏭",severity:"critical",
       result:"PRODUCTION HALTED — Zelensky confirmed strike forced facility to stop. Metafrax supplies dozens of Russian military manufacturers including aviation equipment, drone components, missile engines, and explosives. ~1,700km from the border."},
      {name:"Sheskharis oil terminal + Grushova depot, Novorossiysk",region:"Krasnodar, Black Sea",dist:340,cat:"Energy",icon:"⛽",severity:"critical",
       result:"Sheskharis is the export terminus for Russia's main Transneft pipelines — throughput up to 75M tons/year. Both struck, fires confirmed. One of Russia's most strategically important oil export facilities."},
      {name:"Russian corvette + Admiral Essen frigate at Novorossiysk",region:"Novorossiysk",dist:340,cat:"Naval",icon:"🚢",severity:"critical",
       result:"Project 1239 guided-missile corvette and Kalibr-equipped frigate Admiral Essen both struck. Fleet had been moved there from Sevastopol to avoid Ukrainian attacks — Ukraine followed."},
      {name:"Slavneft-YANOS Refinery (2nd + 3rd May strikes) + Rubikon HQ",region:"Yaroslavl / Starobilsk",dist:700,cat:"Energy",icon:"🛢️",severity:"major",
       result:"Yaroslavl refinery struck twice overnight. General Staff also confirmed strike on HQ of Russia's elite Rubikon drone unit in Starobilsk — Rubikon coordinates advanced drone operations against Ukraine."} ]},
  { date:"May 21", targets:[
      {name:"Syzran Oil Refinery + Lukoil-Nizhegorodnefteorgsintez (Kstovo)",region:"Samara / Nizhny Novgorod",dist:900,cat:"Energy",icon:"🛢️",severity:"critical",
       result:"Syzran refinery struck by drone — fire broke out. Lukoil Kstovo refinery struck the previous morning. Nearly all central Russian oil refineries forced to shut down or cut production — combined capacity >83M tons/year, ~25% of Russia's diesel and 30% of its gasoline."} ]},
  { date:"May 8", targets:[
      {name:"Slavneft-YANOS Oil Refinery (1st May strike)",region:"Yaroslavl Oblast",dist:700,cat:"Energy",icon:"🛢️",severity:"critical",
       result:"First of four May strikes on Slavneft-YANOS. Fire confirmed by General Staff. Zelensky: facility of great importance for financing Russia's war. 230km northeast of Moscow."},
      {name:"Drone storage facility + Air Navigation HQ, Rostov-on-Don",region:"Rostov Oblast",dist:230,cat:"Military",icon:"⚔️",severity:"major",
       result:"Drone storage facility struck and fire broke out. Administrative building of the Southern Russia Air Navigation branch struck — regional air traffic control temporarily suspended. Tor-M2 SAM destroyed near Mykhailivka."} ]},
];
function DroneWarSection({ t, initialTab }) {
  const [tab, setTab]   = useState(initialTab ?? "overview");useEffect(()=>{if(initialTab)setTab(initialTab);},[initialTab]);
  const [range, setRange] = useState("14d");
  const [yrView, setYrView] = useState("launches");
  const [costView, setCostView] = useState("daily");
  const [selectedDrone, setSelectedDrone] = useState(null);
  const dossierRef = useRef(null);
  useEffect(() => { if (selectedDrone != null && dossierRef.current) { dossierRef.current.scrollIntoView({ behavior: "smooth", block: "start" }); } }, [selectedDrone]);
  const [droneFilter, setDroneFilter] = useState("all");
  const [logFilter, setLogFilter] = useState("all");

  const dailySlice = useMemo(() => {
    const n = range==="7d"?7 : range==="14d"?14 : DW_DAILY.length;
    return DW_DAILY.slice(-n);
  }, [range]);

  const dailyStats = useMemo(() => {
    const d = dailySlice;
    const ruL = d.reduce((s,r)=>s+r.ru_d+r.ru_m,0);
    const ruI = d.reduce((s,r)=>s+r.ru_int,0);
    const ruT = d.reduce((s,r)=>s+r.ru_thru,0);
    const alertH = d.reduce((s,r)=>s+r.alert_h,0).toFixed(0);
    const pwGwh  = d.reduce((s,r)=>s+r.pw_gwh,0).toFixed(1);
    return { ruL,ruI,ruT,alertH,pwGwh, ruRate:dwPct(ruI,ruL) };
  }, [dailySlice]);

  const chartDaily = dailySlice.map(d => ({
    name:d.date, "RU Drones":d.ru_d, "RU Missiles":d.ru_m,
    "RU Intercepted":d.ru_int, "RU Reached":d.ru_thru,
    "UA Intercept %": dwPct(d.ru_int, d.ru_d+d.ru_m),
    "Alert Hours":d.alert_h, "Power Offline (GWh)":d.pw_gwh, confirmed:d.confirmed, note:d.note,
  }));

  const chartCostDaily = dailySlice.map(d => {
    const ruAtk = (d.ru_d*35000 + d.ru_m*4500000)/1e6;
    const uaDef = (d.ru_int * (0.44*7500 + 0.26*1000 + 0.22*600000 + 0.08*50000))/1e6;
    return { name:d.date, "RU Attack Cost ($M)":+ruAtk.toFixed(1), "UA Defense Cost ($M)":+uaDef.toFixed(1) };
  });

  const satDaily = useMemo(() => dailySlice.map(d => {
    const launched = d.ru_d + d.ru_m;
    const rate = dwPct(d.ru_int, launched);
    const load = +(launched / DW_SAT_SUSTAINABLE * 100).toFixed(0);
    return { name:d.date, launched, rate, leaked:d.ru_thru, load,
      "Load %":load, "Intercept %":rate, "Leaked":d.ru_thru,
      zone:dwSatZone(load).label, col:dwSatZone(load).col, confirmed:d.confirmed };
  }), [dailySlice]);

  const satScatter = useMemo(() => DW_DAILY.map(d => {
    const launched = d.ru_d + d.ru_m;
    return { x:launched, y:dwPct(d.ru_int, launched), name:d.date, leaked:d.ru_thru, confirmed:d.confirmed };
  }), []);

  const latestNight = satDaily[satDaily.length-1] || {};
  const peakNight = useMemo(() => satDaily.reduce((mx,d)=> d.load>(mx.load||0)?d:mx, {}), [satDaily]);
  const avgLoad = satDaily.length ? Math.round(satDaily.reduce((s,d)=>s+d.load,0)/satDaily.length) : 0;
  const nightsOverCap = satDaily.filter(d=>d.load>=100).length;

  const chartMonthly = DW_MONTHLY.map(m => ({
    name:m.month, yr:m.yr, "RU Launches":m.ru, "UA Launches":m.ua,
    "UA Intercept Rate":m.ruRate, "UA Strike Success":m.uaRate,
    "Civilians Killed":m.civ, "Civilians Injured":m.inj,
    "Alert Hrs/Day":m.alert_h, "Power Offline (GWh)":m.pw_gwh,
    "RU Attack Cost ($M)":m.ru_cost, "UA Defense Cost ($M)":m.ua_cost, confirmed:m.c, src:m.src||null,
  }));
  const yr25 = DW_MONTHLY.filter(m=>m.yr===2025);
  const yr26 = DW_MONTHLY.filter(m=>m.yr===2026);

  const TABS = [
    ["overview","Overview"],["saturation","🌡 Saturation"],["strikelog","📋 Strike Log"],["yearly","📅 Yearly"],["intercept","Intercept"],
    ["cost","💰 Cost"],["impact","⚠️ Casualties"],["assets","Drone Assets"],["events","Key Events"],
  ];
  const tbS = (k) => ({ background:tab===k?DWC.ua:"none", color:tab===k?"#fff":DWC.muted,
    border:`1px solid ${tab===k?DWC.ua:DWC.border}`, borderRadius:20,
    padding:"6px 12px", cursor:"pointer", fontFamily:FONT, fontSize:12, fontWeight:tab===k?700:400, whiteSpace:"nowrap" });
  const btnS = (k,sel) => ({ background:sel===k?"#1e3a5f":"transparent", color:sel===k?DWC.text:DWC.muted,
    border:`1px solid ${sel===k?"#5b8ec8":DWC.border}`, borderRadius:6, padding:"4px 11px", cursor:"pointer", fontSize:12, fontFamily:FONT });

  return (
    <div style={{ background:DWC.bg, color:DWC.text, fontFamily:FONT, borderRadius:12, padding:"14px 12px", marginTop:4 }}>
      <div style={{ marginBottom:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
          <span style={{ fontSize:20 }}>🛸</span>
          <h2 style={{ margin:0, fontSize:19, fontWeight:900, letterSpacing:-.5 }}>DRONE WAR</h2>
          <span style={{ background:"#1e3a5f", color:DWC.uaLt, borderRadius:4, padding:"2px 8px", fontSize:11, fontWeight:700 }}>RUSSIA-UKRAINE · UPDATED {DW_DAILY[DW_DAILY.length-1].date.toUpperCase()} '26</span>
        </div>
        <p style={{ margin:"5px 0 0", color:DWC.muted, fontSize:11 }}>
          Data: Ukrainian Air Force · Russian MoD · ISW · ACLED · ISIS Reports · UN HRMMU · CSIS · ABC News
          {" "}<span style={{ color:DWC.gold }}>★ = sourced figure</span> · <span>Est = monthly-average extrapolation</span>
        </p>
      </div>

      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:18 }}>
        {TABS.map(([k,l])=><button key={k} className="pill-tab" style={tbS(k)} onClick={()=>setTab(k)}>{l}</button>)}
      </div>

      {tab==="overview" && <>
        <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap" }}>
          {[["7d","7 Days"],["14d","14 Days"],["22d","Full June"]].map(([k,l])=>(<button key={k} style={btnS(k,range)} onClick={()=>setRange(k)}>{l}</button>))}
          <span style={{ marginLeft:"auto", color:DWC.muted, fontSize:11, alignSelf:"center" }}>{dailySlice.length} days · through {DW_DAILY[DW_DAILY.length-1].date}</span>
        </div>
        <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
          <DWStatPill label="RU Launched" val={dwFmt(dailyStats.ruL)} sub="drones + missiles" col={DWC.ru}/>
          <DWStatPill label="UA Intercept Rate" val={dailyStats.ruRate+"%"} sub="of all RU munitions" col={DWC.green}/>
          <DWStatPill label="RU Reached Target" val={dwFmt(dailyStats.ruT)} sub="penetrated defenses" col={DWC.orange}/>
          <DWStatPill label="Alert Hours" val={dailyStats.alertH+"h"} sub="total under air raid" col={DWC.purple}/>
        </div>
        <DWCard style={{ marginBottom:14 }}>
          <DWSectionHead color={DWC.ru} icon="🔴" title="RUSSIA → UKRAINE" sub="launched vs. intercepted vs. reached"/>
          <ResponsiveContainer width="100%" height={210}>
            <ComposedChart data={chartDaily} margin={{top:0,right:8,left:-15,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0a1628"/>
              <XAxis dataKey="name" tick={{fill:DWC.muted,fontSize:10}} tickLine={false} axisLine={{stroke:DWC.border}}/>
              <YAxis tick={{fill:DWC.muted,fontSize:10}} tickLine={false} axisLine={{stroke:DWC.border}}/>
              <Tooltip content={<DWTooltip2/>}/>
              <Legend wrapperStyle={{fontSize:11,color:DWC.muted}}/>
              <Bar dataKey="RU Drones" stackId="a" fill={DWC.ru}/>
              <Bar dataKey="RU Missiles" stackId="a" fill={DWC.ruDk} radius={[2,2,0,0]}/>
              <Bar dataKey="RU Intercepted" stackId="b" fill={DWC.green} opacity={.75} radius={[2,2,0,0]}/>
              <Line dataKey="RU Reached" stroke={DWC.gold} strokeWidth={2.5} dot={{r:3,fill:DWC.gold}} type="monotone"/>
            </ComposedChart>
          </ResponsiveContainer>
        </DWCard>

        <DWCard>
          <div style={{fontSize:11,fontWeight:800,color:DWC.uaLt,letterSpacing:".08em",marginBottom:10}}>🔒 CRIMEA "LOGISTICS LOCKDOWN" — THE ISOLATION CAMPAIGN</div>
          <div style={{fontSize:12,color:DWC.text,lineHeight:1.65,marginBottom:10}}>Launched late May 2026 by Ukraine's Unmanned Systems Forces (commander Robert Brovdi), this is a named campaign, not scattered strikes — the explicit goal is severing both Russian supply routes into Crimea using "Middle Strike" class drones (~200km range).</div>
          <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
            <DWStatPill label="Shadow fleet, Jul 1" val="~100" sub="tankers north of Kerch Bridge" col={DWC.ru}/>
            <DWStatPill label="Shadow fleet, Jul 8" val="~20" sub="satellite-confirmed collapse" col={DWC.green}/>
            <DWStatPill label="Vessels hit, 24hrs" val="12+" sub="Jul 9-10, Sea of Azov" col={DWC.orange}/>
            <DWStatPill label="Bridges eliminated" val="1st" sub="N. Crimean Canal rail bridge, Jun 23" col={DWC.gold}/>
          </div>
          <div style={{fontSize:12,color:DWC.muted,lineHeight:1.65}}>
            <div style={{marginBottom:6}}><span style={{color:DWC.text,fontWeight:700}}>Two routes, both under fire</span> — the land corridor (Donetsk/Zaporizhzhia/Kherson rail and road junctions) and the Kerch Bridge/ferry crossing. Jun 21: simultaneous strikes hit the Kerch fuel terminal and Russia's Port Kavkaz on the opposite shore, plus the ferry Panagia — Kerch-Kavkaz ferry service was suspended. Jun 23: the North Crimean Canal rail bridge was destroyed outright, the first bridge eliminated in the campaign.</div>
            <div style={{marginBottom:6}}><span style={{color:DWC.text,fontWeight:700}}>Forcing a real defensive tradeoff</span> — Zelensky confirmed Russia relocated hundreds of S-400/S-500/Pantsir launchers to defend Moscow and the Kerch Bridge specifically, thinning air defense everywhere else: "in all other regions of Russia, there are only a few launchers each."</div>
            <div><span style={{color:DWC.text,fontWeight:700}}>Consequences on the ground</span> — Sevastopol fuel rationed to 20L/week for private buyers; Yevpatoriia lost power Jul 10; Voda Kryma reports partial water-supply loss tied to grid damage. Full Azov strike detail: Strike Log tab.
            </div>
          </div>
        </DWCard>
      </>}

      {tab==="saturation" && <>
        <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap" }}>
          {[["7d","7 Days"],["14d","14 Days"],["22d","Full June"]].map(([k,l])=>(<button key={k} style={btnS(k,range)} onClick={()=>setRange(k)}>{l}</button>))}
          <span style={{ marginLeft:"auto", color:DWC.muted, fontSize:11, alignSelf:"center" }}>Model: {DW_SAT_SUSTAINABLE} munitions/night sustainable</span>
        </div>
        <DWCard style={{ marginBottom:14 }}>
          <DWSectionHead color={DWC.orange} icon="🌡" title="Air Defense Saturation" sub="how close each night came to overwhelming Ukrainian air defenses"/>
          <div style={{ display:"flex", gap:20, flexWrap:"wrap", alignItems:"center", justifyContent:"space-around" }}>
            <div style={{ textAlign:"center" }}><DWGauge load={latestNight.load||0} size={190} label={`${latestNight.name||""} — latest`} sublabel={`${latestNight.launched||0} munitions · ${latestNight.rate||0}% stopped`}/></div>
            <div style={{ textAlign:"center" }}><DWGauge load={peakNight.load||0} size={190} label={`${peakNight.name||""} — peak stress`} sublabel={`${peakNight.launched||0} munitions · ${peakNight.rate||0}% stopped`}/></div>
            <div style={{ flex:1, minWidth:200 }}>
              <div style={{ marginBottom:10 }}>
                <div style={{ color:DWC.muted, fontSize:10, textTransform:"uppercase", letterSpacing:.8 }}>Range avg load</div>
                <div style={{ color:dwSatZone(avgLoad).col, fontSize:32, fontWeight:900, fontFamily:FONT }}>{avgLoad}%</div>
                <div style={{ color:DWC.muted, fontSize:11 }}>of sustainable capacity</div>
              </div>
              <div style={{ marginBottom:10 }}>
                <div style={{ color:DWC.muted, fontSize:10, textTransform:"uppercase", letterSpacing:.8 }}>Nights over capacity</div>
                <div style={{ color: nightsOverCap?DWC.ru:DWC.green, fontSize:32, fontWeight:900, fontFamily:FONT }}>{nightsOverCap}<span style={{fontSize:16,color:DWC.muted}}> / {satDaily.length}</span></div>
                <div style={{ color:DWC.muted, fontSize:11 }}>load ≥ 100% (oversubscribed)</div>
              </div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:6 }}>
                {[["NOMINAL","#22c55e","<70%"],["ELEVATED","#eab308","70-100%"],["SATURATED","#f97316","100-150%"],["CRITICAL","#ef4444",">150%"]].map(([l,col,r])=>(
                  <span key={l} style={{ fontSize:10, color:col }}>● {l} <span style={{color:DWC.muted}}>{r}</span></span>))}
              </div>
            </div>
          </div>
        </DWCard>
        <DWCard style={{ marginBottom:14 }}>
          <DWSectionHead color={DWC.text} icon="📊" title="Nightly Defensive Load" sub="% of sustainable capacity — bars over 100% = oversaturated"/>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={satDaily} margin={{top:5,right:8,left:-15,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0a1628"/>
              <XAxis dataKey="name" tick={{fill:DWC.muted,fontSize:10}} tickLine={false} axisLine={{stroke:DWC.border}}/>
              <YAxis tick={{fill:DWC.muted,fontSize:10}} tickLine={false} axisLine={{stroke:DWC.border}} unit="%"/>
              <Tooltip content={<DWTooltip2/>}/>
              <ReferenceLine y={100} stroke={DWC.ru} strokeDasharray="5 3" label={{value:"capacity",fill:DWC.ru,fontSize:10,position:"insideTopRight"}}/>
              <ReferenceLine y={70} stroke="#eab308" strokeDasharray="3 2"/>
              <Bar dataKey="Load %" radius={[3,3,0,0]}>{satDaily.map((d,i)=><Cell key={i} fill={d.col}/>)}</Bar>
            </ComposedChart>
          </ResponsiveContainer>
          <div style={{ color:DWC.muted, fontSize:11, marginTop:8 }}>Bar color = saturation zone. The <strong style={{color:DWC.ru}}>Jun 2</strong> mass attack (729 munitions) drove load to ~208% — more than double sustainable capacity — which is why 87 munitions leaked through to 38 sites.</div>
        </DWCard>
        <DWCard style={{ marginBottom:14 }}>
          <DWSectionHead color={DWC.teal} icon="📉" title="The Saturation Curve" sub="every night plotted: launch volume vs. intercept rate"/>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart margin={{top:10,right:12,left:-10,bottom:10}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0a1628"/>
              <XAxis type="number" dataKey="x" name="Launched" tick={{fill:DWC.muted,fontSize:10}} tickLine={false} axisLine={{stroke:DWC.border}} label={{value:"Munitions launched →",fill:DWC.muted,fontSize:11,position:"insideBottom",dy:12}}/>
              <YAxis type="number" dataKey="y" name="Intercept %" domain={[75,100]} tick={{fill:DWC.muted,fontSize:10}} tickLine={false} axisLine={{stroke:DWC.border}} unit="%"/>
              <ZAxis type="number" dataKey="leaked" range={[40,400]} name="Leaked"/>
              <ReferenceArea x1={DW_SAT_SUSTAINABLE} x2={2000} fill={DWC.ru} fillOpacity={0.06}/>
              <ReferenceLine x={DW_SAT_SUSTAINABLE} stroke={DWC.ru} strokeDasharray="5 3"/>
              <Tooltip content={<DWTooltip2/>} cursor={{strokeDasharray:"3 3"}}/>
              <Scatter data={satScatter} fill={DWC.teal}>{satScatter.map((d,i)=>(<Cell key={i} fill={d.confirmed?DWC.gold:DWC.teal} fillOpacity={d.confirmed?0.95:0.55}/>))}</Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div style={{ color:DWC.muted, fontSize:11, marginTop:8, lineHeight:1.6 }}>Bubble size = munitions leaked through. <span style={{color:DWC.gold}}>●</span> gold = confirmed nights, <span style={{color:DWC.teal}}>●</span> teal = estimated. Past ~{DW_SAT_SUSTAINABLE} munitions/night, each added drone is more likely to get through — the core dynamic behind Russia's volume strategy.</div>
        </DWCard>
        <DWCard>
          <div style={{ fontWeight:700, marginBottom:8, fontSize:13 }}>🔬 How the saturation index is computed</div>
          <ul style={{ margin:0, paddingLeft:18, color:DWC.muted, fontSize:12, lineHeight:1.9 }}>
            <li><strong style={{color:DWC.text}}>Sustainable capacity ({DW_SAT_SUSTAINABLE}/night)</strong>: volume Ukraine engages while holding ~92% efficiency. Derived from May '26 (~263/night at 91.73%, plus headroom).</li>
            <li><strong style={{color:DWC.text}}>Load %</strong> = munitions launched ÷ sustainable capacity. Above 100%, defenses are oversubscribed and leak rate climbs.</li>
            <li><strong style={{color:DWC.text}}>Surge ceiling (~{DW_SAT_SURGE}/night)</strong>: absolute max engaged in a single night (≈ Jun 2). Beyond this, efficiency collapses.</li>
            <li>This is an <strong style={{color:DWC.gold}}>analytical model</strong>, not an official metric — a transparent way to read the volume-vs-efficiency tradeoff.</li>
          </ul>
        </DWCard>
      </>}

      {tab==="strikelog" && <>
        <div style={{background:DWC.card,border:`1px solid ${DWC.border}`,borderRadius:12,padding:"12px 14px",marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:800,color:DWC.uaLt,letterSpacing:".08em",marginBottom:10}}>📍 UA STRIKES BY RUSSIAN REGION (logged)</div>
          {(()=>{const counts={};DW_STRIKE_LOG.forEach(d=>d.targets.forEach(tg=>{counts[tg.region]=(counts[tg.region]||0)+1;}));const rows=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,8);const max=rows.length?rows[0][1]:1;return rows.map(([rg,n],i)=><div key={rg} style={{marginBottom:i===rows.length-1?0:8}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:11,fontWeight:600,color:DWC.text}}>{rg}</span><span style={{fontSize:11,fontWeight:700,color:DWC.ua}}>{n}</span></div><div style={{height:6,borderRadius:3,background:"rgba(91,142,196,.12)",overflow:"hidden"}}><div style={{height:"100%",width:`${Math.max(4,n/max*100)}%`,borderRadius:3,background:`linear-gradient(90deg,${DWC.ua}88,${DWC.ua})`,transformOrigin:"left",animation:`barGrow .6s cubic-bezier(.22,1,.36,1) ${i*0.05}s both`}}/></div></div>);})()}
          <div style={{fontSize:9.5,color:DWC.muted,marginTop:8,fontStyle:"italic"}}>Derived live from the strike log below — counts of logged target entries per region, top 8. Linear scale. The log is curated, not exhaustive.</div>
        </div>
        <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
          <DWStatPill label="UA Targets Struck '26" val={DW_UA_FORCE.targetsStruck} sub="verified RU targets (UNITED24)" col={DWC.ua}/>
          <DWStatPill label="Interceptors / Day" val={DW_UA_FORCE.interceptorsDay} sub="STING ~$2,500 each" col={DWC.green}/>
          <DWStatPill label="Unmanned Systems Forces" val={DW_UA_FORCE.usfPersonnel} sub="separate branch (Feb '26)" col={DWC.ua}/>
          <DWStatPill label="Drone Models on Brave1" val={DW_UA_FORCE.models} sub="581 FPV · 434 fiber-optic" col={DWC.teal}/>
        </div>
        <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap" }}>
          {[["all","All"],["Energy","🛢️ Energy"],["Military","⚔️ Military/AD"],["Military-Industrial","🏭 Industrial"],["Infrastructure","🌉 Infra"],["Naval","🚢 Naval"]].map(([k,l])=>(<button key={k} style={btnS(k,logFilter)} onClick={()=>setLogFilter(k)}>{l}</button>))}
        </div>
        <DWCard style={{ marginBottom:14 }}>
          <DWSectionHead color={DWC.ua} icon="📋" title="Ukrainian Deep-Strike Drone Log" sub={"confirmed long-range strikes · May 8 – "+DW_STRIKE_LOG[0].date+", 2026"}/>
          {DW_STRIKE_LOG.map((day,di)=>{
            const targets = day.targets.filter(t2=>logFilter==="all" || t2.cat===logFilter);
            if (!targets.length) return null;
            return (
              <div key={di} style={{ marginBottom:16 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                  <span style={{ background:DWC.ua, color:"#fff", borderRadius:5, padding:"2px 10px", fontSize:12, fontWeight:800 }}>{day.date}</span>
                  <div style={{ flex:1, height:1, background:DWC.border }}/>
                  <span style={{ color:DWC.muted, fontSize:10 }}>{targets.length} target{targets.length>1?"s":""}</span>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {targets.map((t2,ti)=>{
                    const sevCol = t2.severity==="critical"?DWC.ru : t2.severity==="major"?DWC.orange : DWC.gold;
                    return (
                      <div key={ti} style={{ background:DWC.card2, borderRadius:8, borderLeft:`3px solid ${sevCol}`, padding:"10px 12px" }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, marginBottom:4 }}>
                          <span style={{ color:DWC.text, fontWeight:700, fontSize:13, lineHeight:1.3 }}>{t2.icon} {t2.name}</span>
                          <span style={{ color:sevCol, fontSize:9, fontWeight:800, textTransform:"uppercase", flexShrink:0, marginTop:2 }}>{t2.severity}</span>
                        </div>
                        <div style={{ display:"flex", gap:10, marginBottom:6, flexWrap:"wrap" }}>
                          <span style={{ color:DWC.gold, fontSize:10 }}>📍 {t2.region}</span>
                          {t2.dist>0 && <span style={{ color:DWC.muted, fontSize:10 }}>📏 {t2.dist.toLocaleString()} km from border</span>}
                          <span style={{ color:DWC.teal, fontSize:10 }}>{t2.cat}</span>
                        </div>
                        <div style={{ color:DWC.muted, fontSize:11.5, lineHeight:1.55 }}>{t2.result}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div style={{ padding:"8px 10px", background:DWC.card2, borderRadius:6, fontSize:11, color:DWC.muted, lineHeight:1.6, marginTop:4 }}>
            Distances are km from the Ukrainian border. <strong style={{color:DWC.text}}>Tyumen (2,800 km)</strong> and <strong style={{color:DWC.text}}>St. Petersburg Kirishi (1,450 km)</strong> rank among the deepest strikes of the war.
          </div>
        </DWCard>
      </>}
      {tab==="yearly" && <>
        <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap" }}>
          {[["launches","Launch Volumes"],["rates","Intercept Rates"],["casualties","Casualties"],["cost","Cost Trend"],["yoy","2025 vs 2026"]].map(([k,l])=>(<button key={k} style={btnS(k,yrView)} onClick={()=>setYrView(k)}>{l}</button>))}
        </div>
        {yrView==="launches" && <DWCard>
          <DWSectionHead color={DWC.text} icon="📊" title="Monthly Launch Volumes — Jan 2025 to Jun 2026" sub="18 months of aerial campaign data"/>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={chartMonthly} margin={{top:5,right:8,left:-15,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0a1628"/>
              <XAxis dataKey="name" tick={{fill:DWC.muted,fontSize:9}} tickLine={false} axisLine={{stroke:DWC.border}} interval={1}/>
              <YAxis tick={{fill:DWC.muted,fontSize:10}} tickLine={false} axisLine={{stroke:DWC.border}}/>
              <Tooltip content={<DWTooltip2/>}/><Legend wrapperStyle={{fontSize:11}}/>
              <Bar dataKey="RU Launches" fill={DWC.ru} radius={[2,2,0,0]} opacity={.9}/>
              <Bar dataKey="UA Launches" fill={DWC.ua} radius={[2,2,0,0]} opacity={.9}/>
            </ComposedChart>
          </ResponsiveContainer>
          <div style={{ display:"flex", gap:10, marginTop:14, flexWrap:"wrap" }}>
            {[{ label:"May '26 RU Record", val:"★ 8,150", col:DWC.ru, note:"Drones launched. +24% vs Apr" },{ label:"May '26 UA Record", val:"★ 9,418", col:DWC.ua, note:"Per RU MoD (claimed intercepts)" },{ label:"First 3,000-drone month", val:"★ Jul '25", col:DWC.ua, note:"UA milestone vs Russia" },{ label:"First 7,000-drone month", val:"★ Mar '26", col:DWC.ua, note:"3x in 9 months" }].map((s,i)=>(
              <div key={i} style={{ background:DWC.card2, borderRadius:8, padding:"10px 12px", flex:1, minWidth:150 }}>
                <div style={{ color:DWC.muted, fontSize:10, textTransform:"uppercase" }}>{s.label}</div>
                <div style={{ color:s.col, fontSize:20, fontWeight:900, fontFamily:FONT }}>{s.val}</div>
                <div style={{ color:DWC.muted, fontSize:11 }}>{s.note}</div>
              </div>))}
          </div>
        </DWCard>}
        {yrView==="rates" && <DWCard>
          <DWSectionHead color={DWC.text} icon="📈" title="Interception Rate Trends — 18-Month View"/>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartMonthly} margin={{top:5,right:8,left:-15,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0a1628"/>
              <XAxis dataKey="name" tick={{fill:DWC.muted,fontSize:9}} tickLine={false} axisLine={{stroke:DWC.border}} interval={1}/>
              <YAxis domain={[0,100]} tick={{fill:DWC.muted,fontSize:10}} tickLine={false} axisLine={{stroke:DWC.border}} unit="%"/>
              <Tooltip content={<DWTooltip2/>}/><Legend wrapperStyle={{fontSize:11}}/>
              <ReferenceLine y={91.7} stroke={DWC.green} strokeDasharray="4 2" label={{value:"91.7% May '26",fill:DWC.green,fontSize:10}}/>
              <Line dataKey="UA Intercept Rate" stroke={DWC.green} strokeWidth={2.5} dot={{r:3}} type="monotone" name="UA intercepts RU drones (%)"/>
              <Line dataKey="UA Strike Success" stroke={DWC.ua} strokeWidth={2.5} dot={{r:3}} type="monotone" name="UA drones reach Russia (%)"/>
            </LineChart>
          </ResponsiveContainer>
          <div style={{ color:DWC.muted, fontSize:11, marginTop:10 }}><strong style={{color:DWC.text}}>Key narrative:</strong> Ukraine's intercept rate climbed from ~76% (Jan '25) to 91.7% (May '26) despite Russia increasing launches by 115% — driven by interceptor drone adoption. UA penetration of Russian airspace rose from ~9% to ~18%.</div>
        </DWCard>}
        {yrView==="casualties" && <DWCard>
          <DWSectionHead color={DWC.ru} icon="⚠️" title="Monthly Civilian Casualties — Ukraine" sub="Source: UN HRMMU (confirmed months marked ★)"/>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={chartMonthly} margin={{top:5,right:8,left:-15,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0a1628"/>
              <XAxis dataKey="name" tick={{fill:DWC.muted,fontSize:9}} tickLine={false} axisLine={{stroke:DWC.border}} interval={1}/>
              <YAxis tick={{fill:DWC.muted,fontSize:10}} tickLine={false} axisLine={{stroke:DWC.border}}/>
              <Tooltip content={<DWTooltip2/>}/><Legend wrapperStyle={{fontSize:11}}/>
              <Bar dataKey="Civilians Killed" fill={DWC.ru} radius={[2,2,0,0]} opacity={.9}/>
              <Bar dataKey="Civilians Injured" fill={DWC.orange} radius={[2,2,0,0]} opacity={.6}/>
            </ComposedChart>
          </ResponsiveContainer>
        </DWCard>}
        {yrView==="cost" && <DWCard>
          <DWSectionHead color={DWC.gold} icon="💰" title="Monthly Estimated Attack & Defense Costs" sub="$M per month"/>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartMonthly} margin={{top:5,right:8,left:-15,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0a1628"/>
              <XAxis dataKey="name" tick={{fill:DWC.muted,fontSize:9}} tickLine={false} axisLine={{stroke:DWC.border}} interval={1}/>
              <YAxis tick={{fill:DWC.muted,fontSize:10}} tickLine={false} axisLine={{stroke:DWC.border}} unit="M"/>
              <Tooltip content={<DWTooltip2/>}/><Legend wrapperStyle={{fontSize:11}}/>
              <Area dataKey="RU Attack Cost ($M)" stroke={DWC.ru} fill={DWC.ru} fillOpacity={.2} strokeWidth={2} type="monotone"/>
              <Area dataKey="UA Defense Cost ($M)" stroke={DWC.ua} fill={DWC.ua} fillOpacity={.2} strokeWidth={2} type="monotone"/>
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ color:DWC.muted, fontSize:11, marginTop:10 }}>Russia has spent an estimated <strong style={{color:DWC.ru}}>~$3.3B</strong> on Shahed/missile attacks in this 18-month window.</div>
        </DWCard>}
        {yrView==="yoy" && <DWCard>
          <DWSectionHead color={DWC.text} icon="📅" title="2025 vs 2026 — Year-Over-Year" sub="Monthly averages by year"/>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            {[{ label:"RU avg launches/mo", v25: Math.round(yr25.reduce((s,m)=>s+m.ru,0)/yr25.length), v26: Math.round(yr26.reduce((s,m)=>s+m.ru,0)/yr26.length), col:DWC.ru },{ label:"UA avg launches/mo", v25: Math.round(yr25.reduce((s,m)=>s+m.ua,0)/yr25.length), v26: Math.round(yr26.reduce((s,m)=>s+m.ua,0)/yr26.length), col:DWC.ua },{ label:"UA intercept rate avg", v25: Math.round(yr25.reduce((s,m)=>s+m.ruRate,0)/yr25.length)+"%", v26: Math.round(yr26.reduce((s,m)=>s+m.ruRate,0)/yr26.length)+"%", col:DWC.green },{ label:"Civilians killed/mo", v25: Math.round(yr25.reduce((s,m)=>s+m.civ,0)/yr25.length), v26: Math.round(yr26.reduce((s,m)=>s+m.civ,0)/yr26.length), col:DWC.orange },{ label:"RU cost/mo ($M)", v25: Math.round(yr25.reduce((s,m)=>s+m.ru_cost,0)/yr25.length), v26: Math.round(yr26.reduce((s,m)=>s+m.ru_cost,0)/yr26.length), col:DWC.gold },{ label:"Alert hours/day avg",  v25: (yr25.reduce((s,m)=>s+m.alert_h,0)/yr25.length).toFixed(1), v26: (yr26.reduce((s,m)=>s+m.alert_h,0)/yr26.length).toFixed(1), col:DWC.purple }].map((s,i) => {
              const n25 = parseFloat(String(s.v25).replace(/[^0-9.]/g,"")); const n26 = parseFloat(String(s.v26).replace(/[^0-9.]/g,""));
              const chg = n25>0 ? Math.round((n26-n25)/n25*100) : 0;
              return (
                <div key={i} style={{ background:DWC.card2, border:`1px solid ${DWC.border}`, borderRadius:10, padding:"12px 14px", flex:1, minWidth:150 }}>
                  <div style={{ color:DWC.muted, fontSize:10, textTransform:"uppercase", marginBottom:6 }}>{s.label}</div>
                  <div style={{ display:"flex", gap:10, alignItems:"flex-end" }}>
                    <div><div style={{ color:DWC.muted, fontSize:10 }}>2025</div><div style={{ color:DWC.text, fontSize:18, fontWeight:800, fontFamily:FONT }}>{s.v25}</div></div>
                    <div style={{ color:chg>0?"#f87171":"#4ade80", fontSize:12, fontWeight:700, marginBottom:2 }}>{chg>0?"▲":"▼"}{Math.abs(chg)}%</div>
                    <div><div style={{ color:DWC.muted, fontSize:10 }}>2026</div><div style={{ color:s.col, fontSize:18, fontWeight:800, fontFamily:FONT }}>{s.v26}</div></div>
                  </div>
                </div>);
            })}
          </div>
          <div style={{ marginTop:14, padding:"12px 14px", background:DWC.card2, borderRadius:8, fontSize:12, color:DWC.muted, lineHeight:1.7 }}><strong style={{color:DWC.text}}>Strategic summary:</strong> Russia increased drone launches ~52% YoY, yet Ukraine's intercept rate improved ~11 points. Ukraine's own offensive grew ~220%+ since 2025. Russia is compensating for declining per-drone effectiveness with raw volume — spending ~40% more per month for diminishing returns.</div>
        </DWCard>}
      </>}

      {tab==="intercept" && <>
        <div style={{ display:"flex", gap:6, marginBottom:14 }}>{[["7d","7 Days"],["14d","14 Days"],["22d","Full June"]].map(([k,l])=>(<button key={k} style={btnS(k,range)} onClick={()=>setRange(k)}>{l}</button>))}</div>
        <DWCard style={{ marginBottom:14 }}>
          <DWSectionHead color={DWC.text} icon="📈" title="Daily Intercept Rate — Russian Munitions"/>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartDaily} margin={{top:5,right:8,left:-15,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0a1628"/>
              <XAxis dataKey="name" tick={{fill:DWC.muted,fontSize:10}} tickLine={false} axisLine={{stroke:DWC.border}}/>
              <YAxis domain={[0,100]} tick={{fill:DWC.muted,fontSize:10}} tickLine={false} axisLine={{stroke:DWC.border}} unit="%"/>
              <Tooltip content={<DWTooltip2/>}/><Legend wrapperStyle={{fontSize:11}}/>
              <ReferenceLine y={91.7} stroke={DWC.green} strokeDasharray="5 3"/>
              <Line dataKey="UA Intercept %" stroke={DWC.green} strokeWidth={2.5} dot={{r:3}} type="monotone" name="UA intercepts RU (%)"/>
            </LineChart>
          </ResponsiveContainer>
        </DWCard>
        <DWCard style={{ marginBottom:14 }}>
          <DWSectionHead color={DWC.green} icon="🛡️" title="Intercept Rate by Weapon Type" sub="Mar 2026"/>
          {DW_INTERCEPT_WEAPON.map((w,i)=>(
            <div key={i} style={{ marginBottom:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:4 }}>
                <span style={{ color:DWC.text, fontSize:12.5, fontWeight:600 }}>{w.weapon}</span>
                <span style={{ color:w.col, fontSize:16, fontWeight:800, fontFamily:FONT }}>{w.rate}%</span>
              </div>
              <div style={{ height:7, background:"#0a1628", borderRadius:4, overflow:"hidden", marginBottom:4 }}><div style={{ height:"100%", width:`${w.rate}%`, background:w.col, borderRadius:4 }}/></div>
              <div style={{ color:DWC.muted, fontSize:11 }}>{w.note}</div>
            </div>))}
          <div style={{ background:"#1a0e0e", border:`1px solid ${DWC.ru}33`, borderRadius:8, padding:"8px 10px", fontSize:11.5, color:DWC.muted, lineHeight:1.55, marginTop:4 }}>Interceptor drones accounted for <strong style={{color:DWC.text}}>40%+ of Shahed kills</strong> in the largest May 2026 attacks. The ballistic gap (27%) is the critical weakness — only scarce Patriot PAC-3 can engage them.</div>
        </DWCard>
      </>}

      {tab==="strikelog" && <>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:14 }}>
          <DWCard style={{ flex:1, minWidth:260 }}>
            <DWSectionHead color={DWC.ru} icon="🔴" title="Russia → Ukraine Targets"/>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:12 }}>
              <DWPieRing data={DW_TARGETS_RU} size={120}/>
              <div style={{ flex:1 }}>{DW_TARGETS_RU.map((t2,i)=>(<div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}><span style={{ fontSize:12 }}><span style={{color:t2.col}}>■</span> {t2.cat}</span><span style={{ color:t2.col, fontWeight:700, fontSize:13, fontFamily:FONT }}>{t2.pct}%</span></div>))}</div>
            </div>
            {DW_TARGETS_RU.map((t2,i)=>(<div key={i} style={{ borderTop:`1px solid ${DWC.card2}`, padding:"6px 0", fontSize:11, color:DWC.muted }}><span style={{ color:t2.col, fontWeight:600 }}>{t2.cat}:</span> {t2.note}</div>))}
          </DWCard>
          <DWCard style={{ flex:1, minWidth:260 }}>
            <DWSectionHead color={DWC.ua} icon="🔵" title="Ukraine → Russia Targets"/>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:12 }}>
              <DWPieRing data={DW_TARGETS_UA} size={120}/>
              <div style={{ flex:1 }}>{DW_TARGETS_UA.map((t2,i)=>(<div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}><span style={{ fontSize:12 }}><span style={{color:t2.col}}>■</span> {t2.cat}</span><span style={{ color:t2.col, fontWeight:700, fontSize:13, fontFamily:FONT }}>{t2.pct}%</span></div>))}</div>
            </div>
            {DW_TARGETS_UA.map((t2,i)=>(<div key={i} style={{ borderTop:`1px solid ${DWC.card2}`, padding:"6px 0", fontSize:11, color:DWC.muted }}><span style={{ color:t2.col, fontWeight:600 }}>{t2.cat}:</span> {t2.note}</div>))}
          </DWCard>
        </div>
        <DWCard>
          <DWSectionHead color={DWC.orange} icon="📍" title="Russian Launch Origin Regions" sub="Estimated % of Shahed launches by source area"/>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:10 }}>
            {DW_ORIGINS.map((o,i)=>(
              <div key={i} style={{ background:DWC.card2, borderRadius:8, padding:"10px 12px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}><span style={{ color:DWC.text, fontWeight:700, fontSize:13 }}>{o.region}</span><span style={{ color:DWC.ru, fontWeight:900, fontSize:16, fontFamily:FONT }}>{o.pct}%</span></div>
                <div style={{ background:DWC.border, borderRadius:3, height:4, marginBottom:8 }}><div style={{ background:DWC.ru, height:4, borderRadius:3, width:`${o.pct*2.5}%` }}/></div>
                <div style={{ color:DWC.muted, fontSize:11 }}>{o.note}</div>
              </div>))}
          </div>
        </DWCard>
      </>}

      {tab==="cost" && <>
        <div style={{ display:"flex", gap:6, marginBottom:14 }}>{[["daily","Daily June"],["monthly","Monthly Trend"],["perunit","Per-Unit"]].map(([k,l])=>(<button key={k} style={btnS(k,costView)} onClick={()=>setCostView(k)}>{l}</button>))}</div>
        {costView==="daily" && <>
          <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
            <DWStatPill label="Jun 2 RU Attack Cost" val="~$616M" sub="one night" col={DWC.ru}/>
            <DWStatPill label="Avg Nightly RU Cost" val="~$56M" sub="270 Shaheds + ~7 missiles" col={DWC.orange}/>
            <DWStatPill label="Avg UA Defense Cost" val="~$49M" sub="per intercept night" col={DWC.ua}/>
            <DWStatPill label="UA Interceptor Ratio" val="4.7x" sub="cheaper than Shahed" col={DWC.green}/>
          </div>
          <DWCard>
            <DWSectionHead color={DWC.gold} icon="💰" title="Daily Attack & Defense Expenditure — June 2026" sub="Estimated $M"/>
            <ResponsiveContainer width="100%" height={240}>
              <ComposedChart data={chartCostDaily} margin={{top:5,right:8,left:-15,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0a1628"/>
                <XAxis dataKey="name" tick={{fill:DWC.muted,fontSize:10}} tickLine={false} axisLine={{stroke:DWC.border}}/>
                <YAxis tick={{fill:DWC.muted,fontSize:10}} tickLine={false} axisLine={{stroke:DWC.border}} unit="M"/>
                <Tooltip content={<DWTooltip2/>}/><Legend wrapperStyle={{fontSize:11}}/>
                <Bar dataKey="RU Attack Cost ($M)" fill={DWC.ru} radius={[2,2,0,0]}/>
                <Bar dataKey="UA Defense Cost ($M)" fill={DWC.ua} radius={[2,2,0,0]}/>
              </ComposedChart>
            </ResponsiveContainer>
          </DWCard>
        </>}
        {costView==="monthly" && <DWCard>
          <DWSectionHead color={DWC.gold} icon="📉" title="18-Month Cost Escalation — Both Sides"/>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartMonthly} margin={{top:5,right:8,left:-15,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0a1628"/>
              <XAxis dataKey="name" tick={{fill:DWC.muted,fontSize:9}} tickLine={false} axisLine={{stroke:DWC.border}} interval={1}/>
              <YAxis tick={{fill:DWC.muted,fontSize:10}} tickLine={false} axisLine={{stroke:DWC.border}} unit="M"/>
              <Tooltip content={<DWTooltip2/>}/><Legend wrapperStyle={{fontSize:11}}/>
              <Area dataKey="RU Attack Cost ($M)" stroke={DWC.ru} fill={DWC.ru} fillOpacity={.15} strokeWidth={2} type="monotone"/>
              <Area dataKey="UA Defense Cost ($M)" stroke={DWC.ua} fill={DWC.ua} fillOpacity={.15} strokeWidth={2} type="monotone"/>
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ fontSize:12, color:DWC.muted, marginTop:10, lineHeight:1.7 }}>18-month cumulative: <strong style={{color:DWC.ru}}>~$3.3B</strong> Russian attack · <strong style={{color:DWC.ua}}>~$2.6B</strong> Ukrainian defense. A single Kh-101 volley (~8 missiles = $104M) costs more than a month of Shahed launches.</div>
        </DWCard>}
        {costView==="perunit" && <DWCard>
          <DWSectionHead color={DWC.gold} icon="⚖️" title="Cost-Exchange Analysis — Per Weapon"/>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead><tr style={{ borderBottom:`1px solid ${DWC.border}` }}>{["Weapon","Side","Unit Cost","Monthly Qty","Monthly $","Notes"].map(h=>(<th key={h} style={{ padding:"8px 10px", color:DWC.muted, textAlign:"left", fontWeight:600, fontSize:11 }}>{h}</th>))}</tr></thead>
              <tbody>{DW_WEAPONS.map((w,i)=>{const tot = (w.cost * w.qty_may26 / 1e6).toFixed(0);return (
                <tr key={i} style={{ borderBottom:`1px solid ${DWC.card2}`, background:i%2===0?DWC.card2:"transparent" }}>
                  <td style={{ padding:"7px 10px", color:DWC.text, fontWeight:600 }}>{w.name}</td>
                  <td style={{ padding:"7px 10px", color: w.side==="RU"?DWC.ru:DWC.ua, fontWeight:700 }}>{w.side}</td>
                  <td style={{ padding:"7px 10px", color:DWC.gold, fontFamily:FONT }}>${(w.cost/1000).toFixed(0)}k</td>
                  <td style={{ padding:"7px 10px", color:DWC.text, fontFamily:FONT }}>{w.qty_may26.toLocaleString()}</td>
                  <td style={{ padding:"7px 10px", color:DWC.orange, fontFamily:FONT }}>${tot}M</td>
                  <td style={{ padding:"7px 10px", color:DWC.muted, maxWidth:200 }}>{w.notes.substring(0,70)}...</td>
                </tr>);})}</tbody>
            </table>
          </div>
          <div style={{ marginTop:14, padding:"10px 12px", background:DWC.card2, borderRadius:8, fontSize:11, color:DWC.muted, lineHeight:1.7 }}><strong style={{color:DWC.gold}}>CSIS key finding:</strong> Russia spends ~$350k per target struck (Shahed). Ukraine's <strong style={{color:DWC.green}}>interceptor drones</strong> at $7.5k vs. Shahed $35k = 4.7x favorable. PAC-3 ($3.5M) vs. Shahed = 100x unfavorable — why the Patriot shortage is strategically critical.</div>
        </DWCard>}
      </>}

      {tab==="impact" && <>
        <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
          <DWStatPill label="2025 Civilians Killed" val="1,884" sub="est. annual (UA)" col={DWC.ru}/>
          <DWStatPill label="Jun 2 Alone" val="★ 22" sub="killed, 130+ injured" col={DWC.ru}/>
          <DWStatPill label="Jun Power Offline" val={dailyStats.pwGwh+" GWh"} sub={`${dailySlice.length}-day period`} col={DWC.orange}/>
          <DWStatPill label="2025 Nights Attacked" val="★ 357/365" sub="only 8 attack-free nights" col={DWC.gold}/>
        </div>
        <DWCard style={{ marginBottom:14 }}>
          <DWSectionHead color={DWC.ru} icon="⚠️" title="Daily Alert Hours + Power Impact — June 2026"/>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={chartDaily} margin={{top:5,right:8,left:-15,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0a1628"/>
              <XAxis dataKey="name" tick={{fill:DWC.muted,fontSize:10}} tickLine={false} axisLine={{stroke:DWC.border}}/>
              <YAxis yAxisId="left" tick={{fill:DWC.muted,fontSize:10}} tickLine={false} axisLine={{stroke:DWC.border}}/>
              <YAxis yAxisId="right" orientation="right" tick={{fill:DWC.muted,fontSize:10}} tickLine={false} axisLine={{stroke:DWC.border}}/>
              <Tooltip content={<DWTooltip2/>}/><Legend wrapperStyle={{fontSize:11}}/>
              <Bar yAxisId="left" dataKey="Alert Hours" fill={DWC.purple} opacity={.7} radius={[2,2,0,0]}/>
              <Line yAxisId="right" dataKey="Power Offline (GWh)" stroke={DWC.orange} strokeWidth={2.5} dot={{r:3}} type="monotone"/>
            </ComposedChart>
          </ResponsiveContainer>
        </DWCard>
        <DWCard>
          <DWSectionHead color={DWC.muted} icon="🔍" title="Civilian Casualty Context — Sourced Months"/>
          {DW_MONTHLY.filter(m=>m.c&&m.src).map((m,i)=>(
            <div key={i} style={{ borderBottom:`1px solid ${DWC.card2}`, padding:"10px 0", display:"flex", gap:16, alignItems:"flex-start" }}>
              <div style={{ minWidth:70 }}><div style={{ color:DWC.gold, fontWeight:700, fontSize:13 }}>{m.month}</div><div style={{ color:DWC.ru, fontSize:20, fontWeight:900, fontFamily:FONT }}>{m.civ}</div><div style={{ color:DWC.muted, fontSize:10 }}>killed</div></div>
              <div style={{ flex:1, color:DWC.muted, fontSize:12, lineHeight:1.6, paddingTop:2 }}>{m.src}</div>
            </div>))}
        </DWCard>
      </>}

      {tab==="intercept" && <>
        <DWCard style={{ marginBottom:14 }}>
          <DWSectionHead color={DWC.teal} icon="🛡" title="Ukrainian AD Kill Method — 18-Month Shift" sub="% of Russian drones downed by each method"/>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={DW_AD_METHODS} margin={{top:5,right:8,left:-15,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0a1628"/>
              <XAxis dataKey="month" tick={{fill:DWC.muted,fontSize:9}} tickLine={false} axisLine={{stroke:DWC.border}} interval={2}/>
              <YAxis domain={[0,100]} tick={{fill:DWC.muted,fontSize:10}} tickLine={false} axisLine={{stroke:DWC.border}} unit="%"/>
              <Tooltip content={<DWTooltip2/>}/><Legend wrapperStyle={{fontSize:11}}/>
              <Area dataKey="SAM Systems" stackId="a" stroke="#ef4444" fill="#ef4444" fillOpacity={.7} type="monotone"/>
              <Area dataKey="Mobile Fire Groups" stackId="a" stroke="#f59e0b" fill="#f59e0b" fillOpacity={.7} type="monotone"/>
              <Area dataKey="EW / Jamming" stackId="a" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={.7} type="monotone"/>
              <Area dataKey="Interceptor Drones" stackId="a" stroke="#22c55e" fill="#22c55e" fillOpacity={.8} type="monotone"/>
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ fontSize:11, color:DWC.muted, marginTop:8 }}>★ May 2026: interceptor drones accounted for 40%+ of Shahed kills during large attacks. SAM usage declining as interceptor drones fill the gap at far lower cost.</div>
        </DWCard>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          <DWCard style={{ flex:1, minWidth:260 }}>
            <DWSectionHead color={DWC.green} icon="🟢" title="Ukraine AD — Key Developments 2026"/>
            {[{ t:"Interceptor UAV dominance", d:"40%+ of Shahed kills in large attacks (May '26). Autonomous AI intercept in testing." },{ t:"FP-7.x anti-missile interceptor", d:"First test flight Jun 2026. Mass production target: Aug 2026. Counters ballistic missiles at a fraction of PAC-3 cost." },{ t:"Freyja air defense system", d:"European partners supplying radars and C2 for Ukrainian-built Freyja AD." },{ t:"UA drones kill RU AD systems", d:"★ 23 Russian AD systems destroyed + 109 damaged, Jan-May 2026 (UA killboard)." }].map((s,i)=>(
              <div key={i} style={{ borderTop:`1px solid ${DWC.card2}`, padding:"9px 0" }}><div style={{ color:DWC.green, fontWeight:700, fontSize:12, marginBottom:3 }}>{s.t}</div><div style={{ color:DWC.muted, fontSize:12, lineHeight:1.5 }}>{s.d}</div></div>))}
          </DWCard>
          <DWCard style={{ flex:1, minWidth:260 }}>
            <DWSectionHead color={DWC.ru} icon="🔴" title="Russian AD Erosion"/>
            {[{ t:"Pantsir-S1 medium-range", val:"★ ~48%", note:"of all Russian Pantsir systems destroyed by Apr 2026" },{ t:"S-300 / S-400 long-range", val:"★ ~25%", note:"of long-range systems destroyed by Apr 2026" },{ t:"Moscow area AD density", val:"100+ systems", note:"yet Jun 18 saw ~180 UA drones penetrate to hit the oil refinery" },{ t:"AD losses Jan-May '26", val:"★ 23/109", note:"destroyed/damaged per UA Unmanned Systems Forces killboard" }].map((s,i)=>(
              <div key={i} style={{ borderTop:`1px solid ${DWC.card2}`, padding:"9px 0" }}><div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}><span style={{ color:DWC.ru, fontWeight:700, fontSize:12 }}>{s.t}</span><span style={{ color:DWC.gold, fontWeight:900, fontSize:13, fontFamily:FONT }}>{s.val}</span></div><div style={{ color:DWC.muted, fontSize:12, lineHeight:1.5 }}>{s.note}</div></div>))}
          </DWCard>
        </div>
      </>}

      {tab==="assets" && <>
        <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap" }}>
          {[["all","All"],["RU","🔴 Russian"],["UA","🔵 Ukrainian"],["Strike","Strike"],["Decoy","Decoys"],["Missile","Missiles"],["Defense","Air Defense"]].map(([k,l])=>(<button key={k} style={btnS(k,droneFilter)} onClick={()=>{setDroneFilter(k);setSelectedDrone(null);}}>{l}</button>))}
        </div>
        {selectedDrone!=null && (()=>{
          const d = DW_ASSETS[selectedDrone]; const accent = d.side==="RU"?DWC.ru:DWC.ua;
          return (
            <div ref={dossierRef}><DWCard style={{ marginBottom:16, borderColor:accent }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12, flexWrap:"wrap", gap:8 }}>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}><span style={{ color:accent, fontWeight:900, fontSize:18 }}>{d.side==="RU"?"🔴":"🔵"} {d.name}</span><span style={{ background:DWC.card2, color:DWC.muted, borderRadius:4, padding:"2px 9px", fontSize:11, fontWeight:700 }}>{d.cls}</span></div>
                  <div style={{ color:DWC.muted, fontSize:12, marginTop:4 }}>{d.role} · <span style={{color:DWC.gold}}>{d.status}</span></div>
                </div>
                <button onClick={()=>setSelectedDrone(null)} style={{ background:"transparent", color:DWC.muted, border:`1px solid ${DWC.border}`, borderRadius:6, padding:"4px 12px", cursor:"pointer", fontSize:12, fontFamily:FONT }}>✕ Close</button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:8, marginBottom:14 }}>
                {[["Range",d.range],["Speed",d.speed],["Warhead",d.warhead],["Est. cost",d.cost],["Ceiling",d.ceiling],["Intercept",d.intercepted]].map(([k,v])=>(<div key={k} style={{ background:DWC.card2, borderRadius:8, padding:"8px 10px" }}><div style={{ color:DWC.muted, fontSize:10, textTransform:"uppercase", letterSpacing:.6 }}>{k}</div><div style={{ color:DWC.text, fontSize:13, fontWeight:700, fontFamily:FONT }}>{v}</div></div>))}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:14 }}>
                {[["⚙️ Engine",d.engine],["🎯 Guidance",d.guidance],["🏭 Production",d.production]].map(([k,v])=>(<div key={k} style={{ fontSize:12, lineHeight:1.5 }}><span style={{ color:accent, fontWeight:700 }}>{k}: </span><span style={{ color:DWC.text }}>{v}</span></div>))}
              </div>
              <div style={{ color:DWC.text, fontSize:13, lineHeight:1.7, marginBottom:14, paddingTop:12, borderTop:`1px solid ${DWC.card2}` }}>{d.detail}</div>
              <div style={{ color:accent, fontWeight:700, fontSize:12, marginBottom:8 }}>KEY INTELLIGENCE</div>
              <div style={{ display:"flex", flexDirection:"column", gap:7 }}>{d.facts.map((f,j)=>(<div key={j} style={{ display:"flex", gap:8, fontSize:12, color:DWC.muted, lineHeight:1.5 }}><span style={{ color:accent, flexShrink:0 }}>▸</span><span>{f}</span></div>))}</div>
            </DWCard></div>);
        })()}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:12 }}>
          {DW_ASSETS.map((d,i)=>{
            if (droneFilter!=="all" && d.side!==droneFilter && d.cls!==droneFilter) return null;
            const accent = d.side==="RU"?DWC.ru:DWC.ua; const isSel = selectedDrone===i;
            return (
              <div key={i} onClick={()=>setSelectedDrone(isSel?null:i)} style={{ background:isSel?DWC.card2:DWC.card, border:`1px solid ${isSel?accent:DWC.border}`, borderRadius:10, padding:"14px 16px", cursor:"pointer" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8, gap:6 }}><div style={{ color:accent, fontWeight:800, fontSize:14, lineHeight:1.25 }}>{d.side==="RU"?"🔴":"🔵"} {d.name}</div><span style={{ background:DWC.card2, color:DWC.muted, borderRadius:4, padding:"2px 7px", fontSize:10, fontWeight:700, flexShrink:0 }}>{d.cls}</span></div>
                <div style={{ color:DWC.muted, fontSize:11, marginBottom:10 }}>{d.role}</div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:10 }}>{[["Range",d.range],["Speed",d.speed],["Cost",d.cost]].map(([k,v])=>(<span key={k} style={{ background:DWC.card2, borderRadius:5, padding:"3px 7px", fontSize:10 }}><span style={{ color:DWC.muted }}>{k} </span><span style={{ color:DWC.text, fontWeight:600 }}>{v}</span></span>))}</div>
                <div style={{ color:DWC.muted, fontSize:11.5, lineHeight:1.5, display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{d.detail}</div>
                <div style={{ color:accent, fontSize:11, fontWeight:700, marginTop:10 }}>{isSel?"▾ Showing full dossier above":"▸ Tap for full dossier"}</div>
              </div>);
          })}
        </div>
        <DWCard style={{ marginTop:16, marginBottom:14 }}>
          <DWSectionHead color={DWC.ua} icon="⚙️" title="Drone Production — Ukraine vs Russia" sub="monthly output and edge by category"/>
          {DW_PRODUCTION.map((r,i)=>{const advCol = r.adv==="Ukraine"?DWC.ua:DWC.ru;return (
            <div key={i} style={{ marginBottom:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}><span style={{ fontSize:16 }}>{r.icon}</span><span style={{ color:DWC.text, fontWeight:700, fontSize:13, flex:1 }}>{r.type}</span><span style={{ background:`${advCol}22`, border:`1px solid ${advCol}44`, color:advCol, borderRadius:4, padding:"2px 8px", fontSize:10, fontWeight:800 }}>{r.adv} leads</span></div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                <div style={{ background:"#0d1a30", borderRadius:8, padding:"8px 10px" }}><div style={{ color:DWC.ua, fontSize:10, fontWeight:700, marginBottom:2 }}>🇺🇦 Ukraine</div><div style={{ color:DWC.text, fontSize:12, fontWeight:700 }}>{r.ua}</div><div style={{ color:DWC.muted, fontSize:10, marginTop:2, lineHeight:1.4 }}>{r.uaNote}</div></div>
                <div style={{ background:"#1a0e0e", borderRadius:8, padding:"8px 10px" }}><div style={{ color:DWC.ru, fontSize:10, fontWeight:700, marginBottom:2 }}>🇷🇺 Russia</div><div style={{ color:DWC.text, fontSize:12, fontWeight:700 }}>{r.ru}</div><div style={{ color:DWC.muted, fontSize:10, marginTop:2, lineHeight:1.4 }}>{r.ruNote}</div></div>
              </div>
            </div>);})}
        </DWCard>
        <DWCard style={{ marginBottom:14 }}>
          <DWSectionHead color={DWC.ua} icon="🎖️" title="Unmanned Systems Forces & Ecosystem" sub="Ukraine's dedicated drone branch"/>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {DW_UA_FORCE.facts.map((f,i)=>(<div key={i} style={{ display:"flex", gap:10 }}><span style={{ fontSize:16, flexShrink:0 }}>{f[0]}</span><div style={{ fontSize:12, color:DWC.muted, lineHeight:1.55 }}><strong style={{ color:DWC.text }}>{f[1]}</strong> — {f[2]}</div></div>))}
          </div>
        </DWCard>
      </>}

      {tab==="events" && <>
        <div style={{ position:"relative" }}>
          {DW_DAILY.filter(d=>d.confirmed&&d.note).map((ev,i,arr)=>{
            const isRU=ev.note?.startsWith("🔴"); const isUA=ev.note?.startsWith("🔵");
            const col=isRU?DWC.ru:isUA?DWC.ua:DWC.gold;
            return (
              <div key={i} style={{ display:"flex", gap:16, marginBottom:24, position:"relative" }}>
                {i<arr.length-1&&<div style={{ position:"absolute", left:20, top:44, bottom:-24, width:2, background:DWC.border }}/>}
                <div style={{ width:40, height:40, borderRadius:"50%", background:isRU?"#450a0a":isUA?"#12233b":"#2d2400", border:`2px solid ${col}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0, zIndex:1 }}>{isRU?"🔴":isUA?"🔵":"🟡"}</div>
                <div style={{ flex:1, background:DWC.card, border:`1px solid ${col}22`, borderRadius:10, padding:"12px 16px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}><span style={{ color:col, fontWeight:800, fontSize:14 }}>{ev.date}</span><span style={{ color:DWC.muted, fontSize:11 }}>★ Confirmed</span></div>
                  <p style={{ margin:"0 0 8px", color:DWC.text, fontSize:13, lineHeight:1.65 }}>{ev.note?.replace(/^[🔴🔵🟡]\s*/,"")}</p>
                  {ev.targets&&<div style={{ fontSize:11, color:DWC.muted, marginBottom:8 }}>📍 <span style={{color:DWC.gold}}>Targets:</span> {ev.targets}</div>}
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {isRU&&<><span style={{background:"#450a0a",color:DWC.ruLt,borderRadius:4,padding:"2px 8px",fontSize:11}}>RU drones: {ev.ru_d}</span><span style={{background:"#052e16",color:"#86efac",borderRadius:4,padding:"2px 8px",fontSize:11}}>Intercepted: {ev.ru_int}</span><span style={{background:"#431407",color:"#fed7aa",borderRadius:4,padding:"2px 8px",fontSize:11}}>Got through: ~{ev.ru_thru}</span></>}
                    {isUA&&ev.ua_d!=null&&<><span style={{background:"#12233b",color:DWC.uaLt,borderRadius:4,padding:"2px 8px",fontSize:11}}>UA drones: {ev.ua_d}</span><span style={{background:"#052e16",color:"#86efac",borderRadius:4,padding:"2px 8px",fontSize:11}}>Confirmed through: ~{ev.ua_thru}</span></>}
                  </div>
                </div>
              </div>);
          })}
        </div>
        <DWCard style={{ marginTop:8 }}>
          <div style={{ fontWeight:700, marginBottom:10 }}>⚠️ Data Transparency</div>
          <ul style={{ margin:0, paddingLeft:18, color:DWC.muted, fontSize:12, lineHeight:1.9 }}>
            <li><strong style={{color:DWC.text}}>Ukrainian Air Force</strong>: daily intercept counts via Telegram — widely cited, unverifiable independently.</li>
            <li><strong style={{color:DWC.text}}>Russian MoD</strong>: publishes UA drone intercept claims; denies UA strikes. Contradicted by confirmed fires at Moscow refinery, St. Pete oil terminal.</li>
            <li><strong style={{color:DWC.text}}>Non-confirmed days</strong>: extrapolated from May 2026 monthly averages (RU ~263/day; UA ~304/day).</li>
            <li>ABC News: <em>Both sides may seek to exaggerate the effectiveness of their air defenses.</em></li>
          </ul>
        </DWCard>
      </>}

      <div style={{ marginTop:20, borderTop:`1px solid ${DWC.border}`, paddingTop:14, color:DWC.muted, fontSize:11, lineHeight:1.7 }}>
        <strong style={{color:DWC.text}}>Sources:</strong> Ukrainian Air Force · Russian MoD · ISW · ACLED · ISIS Reports · UN HRMMU · CSIS · ABC News · NPR · Al Jazeera · The Kyiv Independent · UNITED24 · GIS Reports. Data current to <strong style={{color:DWC.text}}>June 30, 2026</strong>. Non-confirmed days use monthly-average extrapolation. Integrated into World Conflict Debrief.
      </div>
    </div>
  );
}

function DeepDiveView({t,selectedConflict,setSelectedConflict,initialTab}){useEffect(()=>{window.scrollTo({top:0,behavior:"instant"});},[selectedConflict]);const conflictId=selectedConflict==="scs"?"south-china-sea":(CONFLICT_SECTIONS.find(s=>s.id===selectedConflict)?.conflictId??selectedConflict);const conflict=CONFLICTS.find(c=>c.id===conflictId);return <div style={{animation:"fadeIn .25s ease-out"}}><div onTouchStart={e=>e.stopPropagation()} onTouchMove={e=>e.stopPropagation()} onTouchEnd={e=>e.stopPropagation()} style={{background:t.card,borderBottom:`1px solid ${t.border}`,padding:"10px 14px",overflowX:"auto",scrollbarWidth:"none",display:"flex",gap:6}}>{CONFLICT_SECTIONS.map(sec=><button key={sec.id} className="pill-tab" onClick={()=>setSelectedConflict(sec.id)} style={{flexShrink:0,padding:"6px 12px",borderRadius:20,border:`1px solid ${selectedConflict===sec.id?"#5b8ec8":t.border}`,background:selectedConflict===sec.id?"#5b8ec8":"none",color:selectedConflict===sec.id?"#fff":t.sub,fontSize:12,fontWeight:selectedConflict===sec.id?700:400,cursor:"pointer",fontFamily:FONT,whiteSpace:"nowrap"}}>{sec.label}</button>)}</div><div key={selectedConflict} className="rise" style={{padding:"14px 16px 0"}}>{selectedConflict==="ukraine"&&<UkraineSection t={t} initialTab={initialTab}/>}{selectedConflict==="scs"&&<SCSSection t={t} initialTab={initialTab}/>}{selectedConflict==="nuclear"&&<NuclearSection t={t} initialTab={initialTab}/>}{selectedConflict==="gaza"&&<GazaSection t={t} initialTab={initialTab}/>}{selectedConflict==="iran"&&<IranSection t={t} initialTab={initialTab}/>}{selectedConflict==="usmil"&&<USMilSection t={t} initialTab={initialTab}/>}{selectedConflict==="venezuela"&&<VenezuelaSection t={t} initialTab={initialTab}/>}{selectedConflict==="dronewar"&&<DroneWarSection t={t} initialTab={initialTab}/>}{!["ukraine","scs","nuclear","usmil","venezuela","dronewar","gaza","iran"].includes(selectedConflict)&&<TheaterSection t={t} conflict={conflict}/>}</div></div>;}

// ── Main App ────────────────────────────────────────────────────────────────────────
const VIEWS=[{id:"today",label:"Today",icon:"📡"},{id:"theaters",label:"Theaters",icon:"🌍"},{id:"trends",label:"Trends",icon:"📈"},{id:"deepdive",label:"Deep Dive",icon:"🔬"}];
const SECTION_TAB_LISTS={
  ukraine:[{id:"overview",label:"📊 Overview"},{id:"losses",label:"⚖️ Losses"},{id:"manpower",label:"👥 Manpower"},{id:"frontline",label:"🎯 Frontline"},{id:"southernfront",label:"🌊 Southern Front"},{id:"strikewar",label:"💥 Strike War"},{id:"economy",label:"💸 RU Economy"},{id:"uaindustry",label:"🏭 UA Industry"},{id:"intel",label:"🔍 Intel"},{id:"diploallies",label:"🗣️ Diplomacy & Allies"},{id:"analysts",label:"📺 Analysts"},{id:"belarus",label:"🇧🇾 Belarus Axis"}],
  usmil:[{id:"compare",label:"⚖️ Power Comparison"},{id:"china",label:"🇨🇳 China Deep Dive"},{id:"systems",label:"🚀 Systems"},{id:"posture",label:"🌍 Posture"},{id:"nato",label:"🤝 NATO & Allies"},{id:"rankings",label:"🌐 Global Rankings"},{id:"indopac",label:"🌏 Indo-Pacific Balance"},{id:"fighters5g",label:"✈️ 5th-Gen Fighters"},{id:"navypipe",label:"🚢 Naval Pipeline"},{id:"space",label:"🛰️ Space & Counterspace"},{id:"minerals",label:"⛏️ Critical Minerals"},{id:"arctic",label:"🧊 Arctic"},{id:"defindustry",label:"🏭 Defense Industry"},{id:"dprk",label:"🇰🇵 DPRK-Russia Axis"}],
  dronewar:[{id:"overview",label:"Overview"},{id:"saturation",label:"🌡 Saturation"},{id:"strikelog",label:"📋 Strike Log"},{id:"yearly",label:"📅 Yearly"},{id:"intercept",label:"Intercept"},{id:"cost",label:"💰 Cost"},{id:"impact",label:"⚠️ Casualties"},{id:"assets",label:"Drone Assets"},{id:"events",label:"Key Events"}],
  nuclear:[{id:"vectors",label:"⚠️ Active Vectors"},{id:"arsenals",label:"🌐 Global Arsenals"},{id:"delivery",label:"🚀 Delivery Systems"},{id:"treaties",label:"📜 Treaties & Doctrine"},{id:"cyber",label:"🌪️ Cyber & Hybrid"}],
  iran:[{id:"overview",label:"🇮🇷 Overview"},{id:"hormuz",label:"🚢 Hormuz"},{id:"timeline",label:"📅 Timeline"},{id:"gaps",label:"⚠️ Gaps"}],
  venezuela:[{id:"cuba",label:"🇨🇺 Cuba Blockade"},{id:"spear",label:"🚤 Southern Spear"},{id:"conflict",label:"🇻🇪 Venezuela"},{id:"mexico",label:"🇲🇽 Mexico"},{id:"haiti",label:"🇭🇹 Haiti"}],
  scs:[{id:"overview",label:"🗺️ Overview"},{id:"incidents",label:"⚠️ Incidents"},{id:"military",label:"⚔️ Military"},{id:"law",label:"⚖️ Law & Claims"},{id:"taiwan",label:"🌊 Taiwan Strait"}],
  gaza:[{id:"conflict",label:"⚔️ Gaza"},{id:"humanitarian",label:"🆘 Humanitarian"},{id:"governance",label:"🌐 Governance"},{id:"lebanon",label:"🇱🇧 Lebanon Front"},{id:"syria",label:"🇸🇾 Syria"}],
};
const SECTIONS=CONFLICT_SECTIONS.map(s=>({id:s.id,label:s.label,tabs:SECTION_TAB_LISTS[s.id]??[{id:"overview",label:"Overview"}]}));

function useIsLandscape(){
  const[isLandscape,setIsLandscape]=useState(false);
  useEffect(()=>{
    const handler=()=>setIsLandscape(window.innerWidth>window.innerHeight);
    window.addEventListener("resize",handler);
    window.addEventListener("orientationchange",handler);
    handler();
    return()=>{window.removeEventListener("resize",handler);window.removeEventListener("orientationchange",handler);};
  },[]);
  return isLandscape;
}

const SPLASH_PARTICLES=Array.from({length:14},(_,i)=>({left:(i*68.3)%100,size:1+(i%3),delay:(i*0.31)%4,dur:5+(i%4)*1.6,color:i%3===0?"#FFD700":"#5b8ec8"}));
function DecryptText({text,delay,style}){
  const CHARS="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+=";
  const[out,setOut]=useState("");
  useEffect(()=>{
    let frame=0,iv=null;
    const start=setTimeout(()=>{
      iv=setInterval(()=>{
        frame++;
        const solved=Math.floor(frame/1.73);
        setOut(text.split("").map((ch,idx)=>{
          if(ch===" ")return " ";
          if(idx<solved)return ch;
          return CHARS[Math.floor(Math.random()*CHARS.length)];
        }).join(""));
        if(solved>=text.length){clearInterval(iv);setOut(text);}
      },55);
    },delay);
    return()=>{clearTimeout(start);if(iv)clearInterval(iv);};
  },[]);
  return <div style={style}>{out||" "}</div>;
}
function SplashScreen({onDone}){
  const[phase,setPhase]=useState("in");
  useEffect(()=>{
    const t1=setTimeout(()=>setPhase("out"),1250);
    const t2=setTimeout(()=>onDone(),1600);
    return()=>{clearTimeout(t1);clearTimeout(t2);};
  },[]);
  return <div style={{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",background:"radial-gradient(ellipse at center,#0a1526 0%,#050a14 70%)",animation:phase==="out"?"splashFadeOut .65s ease forwards":"none",overflow:"hidden"}}>
    <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(91,142,196,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(91,142,196,0.05) 1px,transparent 1px)",backgroundSize:"36px 36px"}}/>
    {SPLASH_PARTICLES.map((p,i)=><span key={i} style={{position:"absolute",bottom:-8,left:p.left+"%",width:p.size,height:p.size,borderRadius:"50%",background:p.color,boxShadow:"0 0 "+(p.size*1.8)+"px "+p.color,animation:"particleDrift "+p.dur+"s linear "+p.delay+"s infinite",opacity:0}}/>)}
    <div style={{position:"absolute",width:"140vmin",height:"140vmin",borderRadius:"50%",border:"1px solid rgba(91,142,196,0.12)"}}/>
    <div style={{position:"absolute",width:"100vmin",height:"100vmin",borderRadius:"50%",border:"1px solid rgba(91,142,196,0.15)"}}/>
    <div style={{position:"absolute",width:"140vmin",height:"140vmin",borderRadius:"50%",background:"conic-gradient(from 0deg,rgba(91,142,196,0.22),transparent 55deg)",animation:"radarSweep 3.2s linear infinite",maskImage:"radial-gradient(circle,transparent 26%,black 27%)",WebkitMaskImage:"radial-gradient(circle,transparent 26%,black 27%)"}}/>
    <div style={{position:"absolute",width:"140vmin",height:"140vmin",borderRadius:"50%",border:"1px solid rgba(91,142,196,0.35)",animation:"radarPing 2.6s ease-out infinite"}}/>
    <div style={{position:"absolute",left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,rgba(91,142,196,0.5),transparent)",animation:"scanline 2.4s linear infinite",top:0}}/>
    <div style={{position:"absolute",top:14,left:16,fontSize:9,fontFamily:FONT,color:"#5b8ec8",letterSpacing:".2em",animation:"crosshairBlink 1.6s ease-in-out infinite"}}>SYS.INIT</div>
    <div style={{position:"absolute",top:14,right:16,fontSize:9,fontFamily:FONT,color:"#5b8ec8",letterSpacing:".2em",animation:"crosshairBlink 1.6s ease-in-out .8s infinite"}}>SAT.LINK</div>
    <div style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",gap:20}}>
      <div style={{position:"relative",width:"66vw",maxWidth:280,aspectRatio:"3/2",borderRadius:14,overflow:"hidden",boxShadow:"0 0 90px rgba(0,87,183,0.6),0 0 30px rgba(255,215,0,0.15)",animation:"flagWave 3s ease-in-out infinite"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:"50%",background:"linear-gradient(180deg,#0066d6,#0057B7)",animation:"bandL .65s cubic-bezier(.22,1,.36,1) both"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"50%",background:"linear-gradient(180deg,#FFD700,#f0c400)",animation:"bandR .65s cubic-bezier(.22,1,.36,1) .12s both"}}/>
        <div style={{position:"absolute",top:0,bottom:0,width:"46%",background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.32),transparent)",animation:"sheen 1.1s ease-in-out 1.15s both"}}/>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span style={{position:"absolute",width:70,height:70,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.55)",animation:"glowRing 1.4s ease-out .75s both"}}/>
          <span style={{position:"absolute",width:70,height:70,borderRadius:"50%",border:"1px solid rgba(255,215,0,0.5)",animation:"glowRing 1.4s ease-out 1.05s both"}}/>
          <span style={{fontSize:56,animation:"tridentIn .8s cubic-bezier(.34,1.56,.64,1) .55s both, splashPulse 2.2s ease-in-out 1.4s infinite",filter:"drop-shadow(0 0 14px rgba(0,0,0,0.45)) drop-shadow(0 0 22px rgba(255,255,255,0.25))"}}>{"🔱"}</span>
        </div>
      </div>
      <DecryptText text={"СЛАВА УКРАЇНІ"} delay={850} style={{fontSize:14,fontWeight:800,color:"#cddcf2",letterSpacing:".22em",textTransform:"uppercase",fontFamily:FONT,textShadow:"0 0 18px rgba(91,142,196,0.6)",minHeight:20}}/>
      <DecryptText text={"WORLD CONFLICT DEBRIEF"} delay={1050} style={{fontSize:10,fontWeight:700,color:"#5b8ec8",letterSpacing:".3em",fontFamily:FONT,opacity:.9,minHeight:14}}/>
      <div style={{width:"52vw",maxWidth:220,height:2,background:"rgba(91,142,196,0.15)",borderRadius:2,overflow:"hidden"}}>
        <div style={{height:"100%",background:"linear-gradient(90deg,#0057B7,#5b8ec8,#FFD700)",animation:"loadBar 2.7s cubic-bezier(.4,0,.2,1) .2s both",boxShadow:"0 0 8px rgba(91,142,196,0.8)"}}/>
      </div>
    </div>
  </div>;
}

const NAV_ANIM_CSS = `
@keyframes flagBurstIn{0%{opacity:0;transform:scale(.4) rotate(-8deg);filter:blur(6px)}55%{opacity:1;transform:scale(1.15) rotate(3deg);filter:blur(0)}100%{opacity:1;transform:scale(1) rotate(0)}}
@keyframes flagBurstOut{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.4)}}
@keyframes burstRing{0%{transform:scale(.2);opacity:.9}100%{transform:scale(2.8);opacity:0}}
@keyframes burstBandL{0%{transform:translateX(-110%);opacity:.9}100%{transform:translateX(0);opacity:.35}}
@keyframes burstBandR{0%{transform:translateX(110%);opacity:.9}100%{transform:translateX(0);opacity:.35}}
@keyframes burstStreak{0%{transform:translate(0,0) scale(0);opacity:0}20%{opacity:1}100%{transform:translate(var(--tx),var(--ty)) scale(1);opacity:0}}
`;

const CONFLICT_ANIM = {
  ukraine:{icon:"\uD83C\uDDFA\uD83C\uDDE6",a:"#0057B7",b:"#FFD700",label:"UKRAINE"},
  belarus:{icon:"\uD83C\uDDE7\uD83C\uDDFE",a:"#c8313c",b:"#4aa657",label:"BELARUS"},
  __southsudan_removed:{icon:"\uD83C\uDDF8\uD83C\uDDF8",a:"#078930",b:"#0f47af",label:"S. SUDAN"},
  gaza:{icon:"\uD83C\uDDF5\uD83C\uDDF8",a:"#149954",b:"#e4312b",label:"GAZA"},
  iran:{icon:"\uD83C\uDDEE\uD83C\uDDF7",a:"#239f40",b:"#da0000",label:"IRAN"},
  taiwan:{icon:"\uD83C\uDDF9\uD83C\uDDFC",a:"#fe0000",b:"#000095",label:"TAIWAN"},
  scs:{icon:"\uD83C\uDF0A",a:"#06b6d4",b:"#0e7490",label:"S. CHINA SEA"},
  "south-china-sea":{icon:"\uD83C\uDF0A",a:"#06b6d4",b:"#0e7490",label:"S. CHINA SEA"},
  venezuela:{icon:"\uD83C\uDDFB\uD83C\uDDEA",a:"#ffcd00",b:"#cf142b",label:"VENEZUELA"},
  usmil:{icon:"\u2694\uFE0F",a:"#5b8ec8",b:"#8b5cf6",label:"GREAT POWER"},
  dronewar:{icon:"\uD83D\uDEF8",a:"#22c55e",b:"#5b8ec8",label:"DRONE WAR"},
  nuclear:{icon:"\u2622\uFE0F",a:"#eab308",b:"#ef4444",label:"NUCLEAR"},
  cyber:{icon:"\uD83D\uDEF0\uFE0F",a:"#0ea5e9",b:"#8b5cf6",label:"CYBER & HYBRID"},
};

function NavBurst({flash}){
  if(!flash) return null;
  const c=CONFLICT_ANIM[flash.id]||{icon:"\u26A1",a:"#5b8ec8",b:"#8b5cf6",label:""};
  const streaks=Array.from({length:14},(_,i)=>{const ang=(i/14)*Math.PI*2;return {tx:Math.cos(ang)*140+"px",ty:Math.sin(ang)*140+"px",delay:(i%4)*0.02};});
  return <div key={flash.n} style={{position:"fixed",inset:0,zIndex:900,pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center",animation:"flagBurstOut .35s ease .55s forwards"}}>
    <div style={{position:"absolute",inset:0,background:`radial-gradient(circle at center, ${c.a}22, transparent 60%)`}}/>
    <span style={{position:"absolute",width:120,height:120,borderRadius:"50%",border:`2px solid ${c.a}`,animation:"burstRing .75s ease-out forwards"}}/>
    <span style={{position:"absolute",width:120,height:120,borderRadius:"50%",border:`1px solid ${c.b}`,animation:"burstRing .75s ease-out .12s forwards"}}/>
    {streaks.map((s,i)=><span key={i} style={{position:"absolute",width:6,height:6,borderRadius:"50%",background:i%2?c.a:c.b,boxShadow:`0 0 12px ${i%2?c.a:c.b}`,["--tx"]:s.tx,["--ty"]:s.ty,animation:`burstStreak .7s cubic-bezier(.2,.7,.3,1) ${s.delay}s forwards`}}/>)}
    <div style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",gap:10,animation:"flagBurstIn .55s cubic-bezier(.34,1.56,.64,1) forwards"}}>
      <div style={{position:"relative",width:150,aspectRatio:"3/2",borderRadius:14,overflow:"hidden",boxShadow:`0 0 60px ${c.a}88, 0 0 24px ${c.b}66`,border:"1px solid rgba(255,255,255,0.2)"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:"50%",background:`linear-gradient(180deg,${c.a},${c.a}cc)`,animation:"burstBandL .5s cubic-bezier(.22,1,.36,1) both"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"50%",background:`linear-gradient(180deg,${c.b}cc,${c.b})`,animation:"burstBandR .5s cubic-bezier(.22,1,.36,1) .08s both"}}/>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:56,filter:"drop-shadow(0 2px 6px rgba(0,0,0,0.5))"}}>{c.icon}</div>
        <div style={{position:"absolute",top:0,bottom:0,width:"40%",background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)",animation:"sheen 1s ease-in-out .2s both"}}/>
      </div>
      {c.label&&<div style={{fontSize:11,fontWeight:800,color:"#fff",letterSpacing:".28em",fontFamily:FONT,textShadow:`0 0 12px ${c.a}, 0 2px 4px rgba(0,0,0,0.8)`}}>{c.label}</div>}
    </div>
  </div>;
}

export default function Dashboard(){
  const[showSplash,setShowSplash]=useState(true);
  const isLandscape=useIsLandscape();
  const[dark,setDark]=useState(true);
  const[view,setView]=useState("today");
  const[selectedConflict,setSelectedConflict]=useState("ukraine");
  const[paletteOpen,setPaletteOpen]=useState(false);const[pendingTab,setPendingTab]=useState(null);
  const[flash,setFlash]=useState(null);
  const flashN=useRef(0);
  const t={...(dark?DARK:LIGHT),isLandscape};
  const touchStartX=useRef(null);
  const criticalCount=NEWS.filter(n=>n.severity==="critical").slice(0,5).length;
  const _tp=Math.min(99,criticalCount*12+NEWS.filter(n=>n.severity==="major").length*5+NEWS.filter(n=>n.severity==="watch").length*2);const threatLevel=_tp>=80?{color:"#ef4444",label:"CRITICAL",pct:_tp}:_tp>=60?{color:"#f97316",label:"SEVERE",pct:_tp}:_tp>=35?{color:"#eab308",label:"HIGH",pct:_tp}:{color:"#22c55e",label:"ELEVATED",pct:_tp};

  useEffect(()=>{const handler=e=>{if((e.metaKey||e.ctrlKey)&&e.key==="k"){e.preventDefault();setPaletteOpen(p=>!p);}};window.addEventListener("keydown",handler);return()=>window.removeEventListener("keydown",handler);},[]);

  const triggerFlash=(id)=>{flashN.current+=1;const n=flashN.current;setFlash({id,n});setTimeout(()=>{setFlash(f=>f&&f.n===n?null:f);},950);};
  useEffect(()=>{if(!showSplash&&view==="deepdive")triggerFlash(selectedConflict);},[selectedConflict,view]);

  const handleSwipe=deltaX=>{if(Math.abs(deltaX)<60)return;const views=VIEWS.map(v=>v.id);const idx=views.indexOf(view);if(deltaX<0&&idx<views.length-1)setView(views[idx+1]);else if(deltaX>0&&idx>0)setView(views[idx-1]);};
  const handleNavigate=(sectionId,tabId)=>{setSelectedConflict(sectionId);setPendingTab(tabId||null);setView("deepdive");setPaletteOpen(false);};

  return <div style={{background:t.bg,minHeight:"100vh",maxWidth:t.isLandscape?900:480,margin:"0 auto",fontFamily:FONT,lineHeight:1.5,WebkitFontSmoothing:"antialiased",paddingBottom:34,position:"relative"}} className={t.isDark?"t-dark":""}>
    <style dangerouslySetInnerHTML={{__html:GCSS+NAV_ANIM_CSS}}/>
    <div className="grain-overlay"/>
    <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:90,pointerEvents:"none",background:"#1f6f43",color:"#e8f5ec",fontSize:8,fontWeight:700,letterSpacing:".2em",textAlign:"center",padding:"2px 0",fontFamily:FONT,textTransform:"uppercase",maxWidth:t.isLandscape?900:480,margin:"0 auto"}}>Unclassified · OSINT · @FUQUAD08</div>
    {showSplash&&<SplashScreen onDone={()=>setShowSplash(false)}/>}
    <NavBurst flash={flash}/>
    <CommandPalette open={paletteOpen} onClose={()=>setPaletteOpen(false)} sections={SECTIONS} onNavigate={handleNavigate} t={t}/>
    <div style={{background:t.isDark?"linear-gradient(180deg,#070c13,#0b131d)":t.card,borderBottom:"2px solid rgba(120,150,180,0.30)",position:"sticky",top:0,zIndex:100}}>
      <div style={{background:"#1f6f43",color:"#e8f5ec",fontSize:8.5,fontWeight:700,letterSpacing:".22em",textAlign:"center",padding:"2px 0",fontFamily:FONT,textTransform:"uppercase"}}>Unclassified · OSINT · Open-Source Intelligence</div>
      <div style={{height:3,background:t.isDark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.06)",position:"relative"}}>
        <div style={{height:"100%",width:`${threatLevel.pct}%`,background:threatLevel.color,boxShadow:`0 0 8px ${threatLevel.color}99`,transition:"width 1.2s ease",borderRadius:"0 2px 2px 0"}}/>
        <span style={{position:"absolute",right:6,top:4,fontSize:8,fontWeight:800,color:threatLevel.color,letterSpacing:".1em",opacity:0.85,fontFamily:"monospace"}}>{threatLevel.label}</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,padding:"10px 16px 0"}}>
        <div style={{flex:1}}>
          <div style={{fontSize:8.5,fontWeight:700,color:t.sub,letterSpacing:".2em",textTransform:"uppercase",marginBottom:2,opacity:0.85}}>Daily Intelligence Brief · Global Conflict Desk</div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:"#ef4444",display:"inline-block",animation:"blink 1.4s ease-in-out infinite",flexShrink:0}}/>
            <h1 style={{fontSize:15,fontWeight:800,color:t.isDark?"#e4ecf6":t.text,letterSpacing:"-.01em",margin:0,display:"inline"}}>WORLD CONFLICT DEBRIEF<span className="tt-cursor"/><span style={{fontSize:10,fontWeight:500,color:t.sub,marginLeft:6,letterSpacing:"normal"}}>— Live OSINT Dashboard Tracking Global Conflicts</span></h1>
          </div>
          <div style={{fontSize:10,color:t.sub,marginTop:2,letterSpacing:".03em"}}>As of {REPORT_NOW.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}).toUpperCase()} · WAR DAY {UA_WAR_DAY} · SERIAL WCD-{UA_WAR_DAY}</div>
        </div>
        <a href="https://buymeacoffee.com/fuquad08" target="_blank" rel="noopener noreferrer" aria-label="Support this project on Buy Me a Coffee" style={{fontSize:9,fontWeight:700,color:"#5b8ec8",opacity:0.75,letterSpacing:".06em",marginRight:2,fontFamily:FONT,whiteSpace:"nowrap",textDecoration:"none",border:`1px solid ${t.border}`,borderRadius:6,padding:"3px 7px"}}>☕ SUPPORT</a>
        <button className="pill-tab" onClick={()=>setPaletteOpen(true)} aria-label="Open search" style={{background:t.isDark?"rgba(59,130,246,0.12)":"rgba(59,130,246,0.08)",border:`1px solid ${t.border}`,borderRadius:8,padding:"5px 10px",cursor:"pointer",color:t.sub,fontSize:12,fontFamily:FONT}}>🔍 <span style={{fontSize:10}}>⌘K</span></button>
        <button className="pill-tab" onClick={()=>setDark(d=>!d)} aria-label={dark?"Switch to light mode":"Switch to dark mode"} style={{background:t.isDark?"rgba(59,130,246,0.12)":"rgba(59,130,246,0.08)",border:`1px solid ${t.border}`,borderRadius:8,padding:"5px 9px",cursor:"pointer",fontSize:16,fontFamily:FONT}}>{dark?"☀️":"🌙"}</button>
      </div>
      <div style={{display:"flex",gap:0}}>
        {VIEWS.map(v=>{const badge=v.id==="today"&&criticalCount>0?criticalCount:v.id==="theaters"&&CONFLICTS.length?CONFLICTS.length:0;return <button key={v.id} onClick={()=>setView(v.id)} style={{flex:1,padding:"8px 4px 10px",background:"none",border:"none",borderBottom:view===v.id?"2px solid #5b8ec8":"2px solid transparent",cursor:"pointer",fontFamily:FONT,fontSize:12,fontWeight:view===v.id?700:400,color:view===v.id?"#5b8ec8":t.sub,display:"flex",alignItems:"center",justifyContent:"center",gap:5,position:"relative"}}><span style={{fontSize:14}}>{v.icon}</span><span>{v.label}</span>{badge>0&&<span style={{background:v.id==="today"?"#ef4444":"#5b8ec8",color:"#fff",borderRadius:10,fontSize:9,fontWeight:800,padding:"1px 5px",lineHeight:1.5,minWidth:16,textAlign:"center",display:"inline-block",animation:v.id==="today"?"splashPulse 1.8s ease-in-out infinite":"none"}}>{badge}</span>}</button>;})}
      </div>
    </div>
    <NewsTicker/>
    <div onTouchStart={e=>{touchStartX.current=e.touches[0].clientX;}} onTouchEnd={e=>{if(touchStartX.current!==null){handleSwipe(touchStartX.current-e.changedTouches[0].clientX);touchStartX.current=null;}}}>
      {view==="today"&&<TodayView t={t}/>}
      {view==="theaters"&&<div style={{padding:"16px 16px 0",animation:"fadeIn .25s ease-out"}}><WorldMap t={t} conflicts={CONFLICTS} onSelect={id=>{setSelectedConflict(id==="south-china-sea"||id==="taiwan"?"scs":id);setView("deepdive");}} selectedId={selectedConflict==="scs"?"south-china-sea":selectedConflict}/><TheatersOverview t={t} conflicts={CONFLICTS} onSelectConflict={id=>{setSelectedConflict(id);setView("deepdive");}}/></div>}
      {view==="trends"&&<TrendsView t={t}/>}{view==="deepdive"&&<DeepDiveView t={t} selectedConflict={selectedConflict} setSelectedConflict={setSelectedConflict} initialTab={pendingTab}/>}
    </div>
  </div>;
}

