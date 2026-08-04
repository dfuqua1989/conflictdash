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
const SJ_LOGO="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABfCAMAAAAUE/NuAAAAP1BMVEVeXl4jIy6Xl5fW1te3t7cDAl4GBKEFA9HExMTw8PBmZJ3+/v4AAAEDA/Xq6uoYGBgAAAAAAAAAAAAAAAAAAAB72I3gAAAAEHRSTlP//+tgqv///4oi/wD//zH/lEO6OgAABblJREFUeNrlmYmOwygMQH2Qa0Ph//92bSAEcrZpJpV2oxlNqkl5+MR2YPzRBf9tMP8KTOZxsJMfM/b0ONjwOPBbNnbsfmTjnojv1TY7494AD4RwI5oJzJvhxGAtmHsUzoAW+3fjmNFaD+Z7qR3JSjZ79OAqsMs6ySSjz4vC++/EDtiZazKAWcGE6V/k8zPk9SvWo/kikALWTirtYbK1IwhgBxaiZHIz7YlsuuiqliF+Py2ttk5bMEAu2RhskoysT+oYYCLDJXVzFNciR5Z8jD4mO6DsXLo7lZXZeDGtetXQZzJecDITTWW9SVGSbp3YEAqvVvm8KIDjTlF20RNOZP+xoStDRX9ReSVDZJVO4aSbCjqI20MS6TP5U0PPZlKfmtTGALaIaSg3GdDpSeJJX5+SZyO5KTzkDny9UABrmorqAUoy621eQT70n7qzmigvlWLLwyJzcRG7CEO6szgr286RdpYj529MbkLJvaolij1kHlFJzIrrPwijAMrL+RV2ArMmsTG7E8IG2Ppzcr+xY4DsPuLY+bSH9AWvCY23JC1k3tK2KyqHwh0Xew7JapCjnmpwULM4loNDMixLBgBEn21AuzuOyQNEvFU4cYxk3iDjdkBPjrDO76v9Ok0eUG8d6jBAWGkbu1fXNqvMDZMSxxOuPuFSaHre9OrSFyuwXF2DlW/DQlyGfcdgWu2yrkB29twItlV0oe70KC5Dca1mY7IScR3HHM8B3CN3XSvopHAI5QqWJtt3q9l04oi7NRcA7Igs8jaKnp07hB6ccKucSzjsg0fYljgwZQNtFtTpLbrqVDjC6lZ5nCvIAuzEGm7TWmhFWtEzxj+B/E8Qn97hpmLLVRUclJW82sRsr9O+Ogx/EhnE2RtRP/MZV5KDC4oZkPZUfWSrNqq5iYZGtbherT/jar4ywbqwC+6RoF4Ic+oQCSO5U3LAiqu3aN+4UrTvS2zUxlAmr3byp3hrI7kRiZsmKv/8yrxjsB5dc8zHSMq3bamFNkXXmapnRz4Bz/khypf8yXYTeVZ+814gnYI5JTVxVT9beeKJhDWqeUNkDAdwqDPOwZJAnRFb+1ndauhG4qdGtUciIwCRiVVCAsOZxIsDR9UthlZq91qkNDwAL9v7I3CfhgeFwEE0zZmq5/aFs4k73ZBee0HlvYgNVXd6BOZ1MWCbNrhWE9LVpIeue6WrOTMzH08EOGRTJhFX8s0ilQT/Frb+pqJAzY967Yir8gJpu2CG41HEbBUpHlkaNyz7CRG2QYw5K7Fqm1eOZVKKvjLLlD7LrU4rzWCvyau6F+4dDMVs72NwnT6L40JMPmUv3K8s02F7AWyiZ3v09cGR668NcLC5fOGs1zqWWMt8gH7RS2E7OZg611rLYlzH1A9fgHVgwbAuSsLZEcKp3W4bvhyUs46INhsqjIHdbQYwuRvA/djv1Bhb8eshBK+5ARxmFxrMfjcrF3xP0cTfgl0Ec5w36hxF8lmYoZRTCjcbwxO+Oy45A/fScPHcp4GWjEZW92XvynIYCFTC/ibwWJmLLCCkZMQzWKsWNtKYOT3VbgJzAZawGnP7UxbCNGX3ULTfAx6L/BMmnz75TelpvsxRfwCOgsbPpo7bcaeg+wZcT3qMNeO6TYP7wW4B7qN0bpG73eE7tTtUzXEoyIt8deXtxWeqdmkaCZ9O3u4CL9pK8/dg3JSY/gBsNiXG7XbwRvDiDWcCO3/l6P/mNW4C94tDmP8czJ7WvoUPgMfoXLQYSD8Ajg1f7dTX3jd/CE6NblUI0ej+HjyVImWHce0t9xWwnBHF0NObx8Aq8dy2+2svuC+BpaSbdC2F9PgceCTKs34v5e1zYCWnGkDSR/8oWIsBlAxK5klVC1hPKIBrMfwF2IRZvoLpWTBDDKqr2C/A+hIB6AdgHkm4v5GYHMFvwONvwHJEmsfBaSraPw8e/6dg/hV44B+Bv7h+Bv4Xhd/PpUlTIQQAAAAASUVORK5CYII=";
const SJMark=({size=26,style={}})=><img src={SJ_LOGO} alt="" aria-hidden="true" draggable="false" style={{width:size,height:"auto",opacity:0.18,pointerEvents:"none",userSelect:"none",position:"absolute",filter:"saturate(1.4)",...style}}/>;
const WAR_START=new Date("2022-02-24T00:00:00Z").getTime();function getWarDay(){const live=Math.floor((Date.now()-WAR_START)/86400000);return live>0?live:Math.floor((REPORT_NOW.getTime()-WAR_START)/86400000);}

const CONFLICTS=[
  {id:"ukraine",name:"Ukraine War",region:"Eastern Europe",status:"Active",statusColor:"#ef4444",icon:"🇺🇦",deaths:"~500K–700K killed",displaced:"11.8M total",get summary(){return `War Day ${getWarDay()}. 1.45M+ Russian casualties. Putin publicly admitted fuel shortages at United Russia congress Jun 28 — first time. Rejected all diplomatic solutions. Russia launched 142 drones + 2 Zircon + 6 Iskander overnight. NATO Ankara concluded: $80B/yr pledged, Patriot co-production greenlit.`;},get warDay(){return getWarDay();}},
  {id:"gaza",name:"Israel & the Levant",region:"Middle East",status:"Multi-Front",statusColor:"#f59e0b",icon:"🇵🇸",deaths:"73,326 killed total",displaced:"1.9M displaced",summary:"Ceasefire since Oct 10, 2025. 1,200+ killed since ceasefire. Jul 31: Board of Peace announced a Hamas disarmament agreement \u2014 Hamas says it won\u2019t implement without Israeli withdrawal first, Israel hasn\u2019t endorsed it. Quiet annexation accelerating; 80% of buildings damaged.",warDay:null},
  {id:"iran",name:"US-Iran War (2026)",region:"Middle East",status:"NAVAL BLOCKADE",statusColor:"#dc2626",icon:"🇮🇷",deaths:"~6,000+ total",displaced:"Hundreds K",summary:"Operation Epic Fury Feb 28; Islamabad MoU signed Jun 17 has effectively collapsed. Five straight days of US strikes (Jul 11-15) hit 140+ Iranian targets, including the first confirmed blockade-enforcement strike — a tanker disabled by Hellfire fire for running the blockade; Iran struck two UAE tankers in Omani waters (1 crew death) and hit Jordan/Bahrain/Kuwait/Oman. CENTCOM restored a naval blockade on Iranian ports Jul 14 — over 20 warships and hundreds of aircraft now operating in-theater. Trump reversed a proposed 20% Hormuz toll. Separately, satellite imagery shows Iran covertly rebuilding at Parchin and Pickaxe Mountain.",warDay:null},
  {id:"taiwan",name:"Taiwan Strait",region:"Indo-Pacific",status:"ELEVATED",statusColor:"#eab308",icon:"🌊",deaths:"No direct conflict casualties",displaced:"N/A",summary:"PLA Eastern Theater Command continues normalizing military pressure. TSMC produces ~90% of world's advanced chips. Any blockade triggers $1T+ global GDP shock.",warDay:null},
  {id:"south-china-sea",name:"South China Sea",region:"Indo-Pacific",status:"FLASHPOINT",statusColor:"#f97316",icon:"🏝️",deaths:"No direct conflict yet",displaced:"N/A",summary:"Three separate confrontations in a single week (Jul 20\u201324) at Second Thomas Shoal and Scarborough Shoal pulled in the USS George Washington carrier group and triggered joint US-Philippines-Japan drills \u2014 the sharpest acceleration of the year. Near-daily CCG harassment of Philippine resupply continues underneath it. $3.37T annual trade transits the SCS.",warDay:null},
  {id:"caribbean",name:"Caribbean / Cuba Blockade",region:"Latin America",status:"BLOCKADE",statusColor:"#f97316",icon:"🇨🇺",deaths:"Grid collapse — ~10M in the dark",displaced:"5 island-wide blackouts in 2026, 3 in one week (Jul)",summary:"US oil blockade on Cuba since Jan 2026 — the first effective blockade since the Missile Crisis. Food production down 60%, rolling blackouts, and a deepening humanitarian crisis; maritime enforcement overlaps Operation Southern Spear’s strike zone. Opens the Venezuela / Caribbean section → Cuba Blockade tab.",warDay:null},
  {id:"venezuela",name:"Venezuela",region:"Latin America",status:"QUIET",statusColor:"#8496a8",icon:"🇻🇪",deaths:"221+ killed in Caribbean boat strikes",displaced:"Maduro captured Jan 3, 2026",summary:"Quiet on the intervention front, dominated by disaster response. US captured Maduro Jan 3, 2026 (Operation Absolute Resolve); Southern Spear boat strikes killed 221+ since Sept 2025 but have been paused entirely since Jun 21. The Jun 24 twin earthquakes are now the defining story — over 5,500 dead as of late July, tens of thousands still missing. The Caribbean's other live front is Cuba's grid collapse — see the Cuba Blockade card.",warDay:null},
  {id:"sudan",name:"Sudan",region:"East Africa",status:"Active",statusColor:"#ef4444",icon:"🇸🇩",deaths:"150K–400K killed (est.)",displaced:"13.6M — world's largest displacement crisis",summary:"Civil war between the Sudanese Armed Forces (SAF) and paramilitary Rapid Support Forces (RSF) since Apr 2023. The RSF's Oct 2025 capture of El Fasher, the SAF's last Darfur stronghold, was accompanied by what rights groups call a genocidal massacre — estimates of 60,000-150,000 dead in that event alone. Both sides have turned to drones: the UN recorded 1,000+ civilian drone deaths in just the first five months of 2026. No lasting ceasefire has held despite repeated mediation attempts.",warDay:null},
  {id:"drc",name:"DR Congo",region:"Central Africa",status:"Active",statusColor:"#ef4444",icon:"🇨🇩",deaths:"Thousands killed since Jan 2025 offensive",displaced:"7M+ internally displaced",summary:"Rwanda-backed M23 rebels seized Goma (Jan 2025) and Bukavu (Feb 2025), the two largest cities in the mineral-rich east. A US-brokered peace deal was signed in Washington in Jun 2025, followed by a Doha framework in Nov 2025, but fighting resumed and intensified again in early 2026 — key provisions remain unimplemented. Goma's banks have stayed closed for over a year. Eastern DRC's coltan and other critical minerals are central to both the conflict's origins and to the US mineral-access deal that helped produce the ceasefire framework.",warDay:null},
  {id:"sahel",name:"Sahel (Mali/Burkina Faso/Niger)",region:"West Africa",status:"Active",statusColor:"#ef4444",icon:"🏜️",deaths:"10,000+ killed in 2025 alone",displaced:"Millions — Burkina Faso alone: 2.06M",summary:"Military juntas in Mali, Burkina Faso and Niger — having expelled French and UN forces since 2022-23 and formed the breakaway Alliance of Sahel States — are fighting a worsening al-Qaeda (JNIM) and Islamic State (ISSP) insurgency with backing from Russia's Africa Corps (rebranded Wagner). The Liptako-Gourma tri-border area now accounts for over half of all terrorism deaths worldwide, per Global Conflict Tracker. JNIM blockaded Bamako in 2025 and is expanding south toward the Gulf of Guinea.",warDay:null},
  {id:"indopak",name:"India–Pakistan",region:"South Asia",status:"Fragile Ceasefire",statusColor:"#f97316",icon:"🇮🇳🇵🇰",deaths:"Dozens killed, May 2025 war",displaced:"Nuclear-armed rivals, ceasefire since May 10, 2025",summary:"A four-day war in May 2025 — India's Operation Sindoor strikes following the Apr 22 Pahalgam attack, met by Pakistani counterstrikes using Chinese weapons in combat for the first time — ended in a ceasefire that has held for over a year. Both sides claim victory; neither has reconciled. Pakistan's army chief Asim Munir was elevated to field marshal and now postures as a peacemaker even as Islamabad deepens its defense alliance with China, unsettling New Delhi. Analysts describe the state as ceasefire without reconciliation — tense but not currently active. India’s Indus Waters Treaty suspension remains a live pressure point.",warDay:null},
  {id:"pakafghan",name:"Pakistan–Afghanistan",region:"South Asia",status:"Active",statusColor:"#ef4444",icon:"🇵🇰🇦🇫",deaths:"76+ killed, 289+ civilian casualties since Feb 26",displaced:"115,000+ displaced in Afghanistan",summary:"Pakistan declared \u201copen war\u201d with Afghanistan on Feb 27, 2026 and launched Operation Ghazab lil Haq, a sustained air and ground campaign, after Taliban forces retaliated for earlier Pakistani strikes on TTP camps. A Mar 16 Pakistani strike on a Kabul drug-rehabilitation hospital reportedly killed 400+ people. UN experts say Pakistan's campaign violates the UN Charter's prohibition on the use of force. China has brokered repeated truces; none have held, because the core issue \u2014 the Taliban's unwillingness to move against its ideological ally the TTP \u2014 remains unresolved. Taliban drones struck Pakistani territory for the first time Jul 1, 2026.",warDay:null},
];

const NEWS=[
  {id:"b_wide_drone_campaign_aug4",confidence:"Confirmed",conflictId:"ukraine",severity:"major",icon:"🟠",headline:"Ukraine Launches Wide Overnight Drone Attack on Russian Logistics and Oil Infrastructure",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Aug 4, 2026",bullets:["Ukraine's military launched a wide-ranging drone attack overnight into Aug 4, reportedly striking logistics and oil infrastructure in multiple Russian regions, per Russian Telegram channels cited by the Kyiv Independent","Part of a sustained campaign against Wildberries' logistics network specifically — Ukrainian strikes have now damaged more than 17% of the retailer's entire infrastructure in just a few weeks, per RBC-Ukraine","Lands the same day Russian losses came in lighter than the recent run (+1,240 on Aug 3, down from a 1,300\\u20131,500+ daily range), and as NATO Ambassador Whitaker said a joint US-Ukraine Patriot-production deal remains unlikely before winter"],sources:["Kyiv Independent","RBC-Ukraine"],impact:"Continues the established pattern of sustained pressure on Russian logistics and fuel infrastructure even as the personnel-attrition numbers ease slightly day to day",impactColor:"#f97316"},
  {id:"b_moscow_chayko_bombing_aug1",confidence:"Confirmed",conflictId:"ukraine",severity:"critical",icon:"\ud83d\udca3",headline:"Bomb Kills 3 at Moscow Restaurant in Suspected Assassination Attempt on Russian Aerospace Forces Commander",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Aug 3, 2026",bullets:["A bomb delivered by a female courier detonated at Moscow's Balzi Rossi restaurant on Aug 1, killing her, a security guard who'd refused her entry, and a third person, and injuring 20+, per Russia's National Anti-Terrorism Committee","Multiple Russian and Ukrainian sources, and a source who spoke to the Kyiv Independent, say the target was Gen. Alexander Chayko, commander of Russia's Aerospace Forces since May 2026 \u2014 he was celebrating his 55th birthday at the restaurant and is wanted in Ukraine for war crimes tied to the 2022 Bucha occupation","Follows a similar late-July incident in Kharkiv, where a man recruited by Russian intelligence posing as Ukraine's SBU attempted to assassinate a Ukrainian brigade commander \u2014 both incidents point to an intensifying campaign of targeted killings on both sides"],sources:["Kyiv Independent","Meduza","CNN"],impact:"If confirmed as a targeted hit, one of the most senior Russian military figures targeted for assassination since the full-scale invasion began \u2014 a marked escalation in the shadow war running alongside the front line",impactColor:"#dc2626"},
  {id:"b_engels_saratov_strike_aug2",confidence:"Confirmed",conflictId:"ukraine",severity:"critical",icon:"\ud83d\udca3",headline:"Ukraine Hits Russian Strategic Bomber Base at Engels-2 and Saratov Refinery, 600km From the Front",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Aug 2, 2026",bullets:["Zelensky personally confirmed simultaneous strikes on the Saratov oil refinery (~7M tonnes/year) and the Engels-2 strategic bomber base 17km away, home to the Tu-95MS and Tu-160 aircraft Russia uses to launch cruise-missile strikes on Ukraine \u2014 both over 600km from the front line","The same night's operation also hit a fuel depot in Kaluga Oblast and a drone-preparation site near Navlya, Bryansk Oblast, per the General Staff","Follows an Aug 1 multi-target night in Crimea \u2014 two rail bridges (Sivash/Chonhar and Vladyslavivka), a naval-drone storage depot, a Black Sea Fleet electronic-reconnaissance unit in Sevastopol \u2014 and lands the same week Russia's General Staff confirmed a 2026-record 42,860 personnel losses for July"],sources:["Reuters","Kyiv Independent","Militarnyi"],impact:"A strategic bomber base is a materially different target class than the refinery-focused campaign of recent months \u2014 direct pressure on Russia's long-range strike capability, not just its fuel economy",impactColor:"#dc2626"},
  {id:"b_kyiv_ballistic_barrage_aug1",confidence:"Confirmed",conflictId:"ukraine",severity:"critical",icon:"\ud83d\udd34",headline:"Russia\u2019s Most Lopsided Ballistic Barrage Yet Hits Kyiv \u2014 1 of 27 Missiles Intercepted \u2014 as Trump Walks Back Patriot Licensing",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Aug 1, 2026",bullets:["Russia launched 35 missiles \u2014 27 of them ballistic \u2014 and 185 attack drones at Kyiv overnight into Aug 1. Only 1 ballistic missile was intercepted, which Zelensky attributed directly to a shortage of Patriot interceptors \u2014 a worse ratio than the Jul 29-30 attack\u2019s 1-of-9","At least 9-10 killed (7 in Darnytskyi district, 2 in Solomianskyi, 1 in the Kyiv region) and 28-30 wounded including 4 children; five districts damaged along with the Lithuanian embassy, a school, and the Kyivmedspetstrans ambulance service, which had 5 vehicles burnt out","The attack lands days after Trump told a Friday Cabinet meeting the US has \u2018not agreed\u2019 to license Ukraine to produce PAC-3 Patriot interceptors domestically \u2014 walking back the apparent green light from the Jul 7-8 NATO Ankara summit and contradicting Zelensky\u2019s Jul 9 claim that licensing terms had been reached"],sources:["Reuters","AP","Euronews"],impact:"The starkest single exposure yet of the interceptor shortage, arriving at the same moment as a US policy reversal that would have addressed it \u2014 puts direct pressure on Washington either to reverse course or explain why not",impactColor:"#dc2626"},
  {id:"b_gaza_board_of_peace_disarmament_jul31",confidence:"Confirmed",conflictId:"gaza",severity:"critical",icon:"🟡",headline:"Trump\u2019s Board of Peace Announces Hamas Disarmament Agreement \u2014 Israel Hasn\u2019t Endorsed It, Hamas Says Israel Must Withdraw First",conflict:"Gaza",conflictColor:"#f59e0b",publishedAt:"Jul 31, 2026",bullets:["Trump announced Thursday that the Board of Peace reached a \u2018historic agreement\u2019 for the complete disarmament of Hamas and other armed groups in Gaza, calling it a monumental step toward peace. Mediators from Egypt, Qatar and Turkiye finalized the roadmap alongside the US-led Board of Peace and International Stabilization Force","Under the agreement, weapons held by Gaza police transfer first, followed by heavy-weapons decommissioning to a new National Committee (NCAG) over a detailed timetable to be finalized within 14 days; Israel is to withdraw its forces on a corresponding schedule, with no weapons handed to Israel or any non-Palestinian body","Hamas official Ghazi Hamad confirmed the group agreed to disarm but said Hamas \u2018will not implement any part of the agreement\u2019 unless Israel fulfills its own withdrawal obligations first; Netanyahu has not publicly responded, and Israel reportedly conveyed reservations that the plan doesn\u2019t adequately address its demand for full demilitarization before any withdrawal"],sources:["Al Jazeera","NPR","The National"],impact:"A potentially major breakthrough on paper, but built on the same sequencing dispute (who moves first) that has stalled prior phases \u2014 genuinely unclear yet whether this is the real thing or another announced-but-unimplemented framework",impactColor:"#f97316"},
  {id:"b_iran_retaliation_widens_qeshm_review_jul31",confidence:"Confirmed",conflictId:"iran",severity:"critical",icon:"🔴",headline:"Iran\u2019s Retaliation Widens to Kuwait, Jordan and Bahrain as CENTCOM Reviews the Strike That Killed a Family on Qeshm",conflict:"Iran",conflictColor:"#8b5cf6",publishedAt:"Jul 31, 2026",bullets:["Iran\u2019s retaliation for the US strike that killed a couple and their 2-year-old child on Qeshm island proved broader than first reported \u2014 the IRGC says it targeted US-linked bases and interests across Kuwait, Jordan and Bahrain, not just Jordan. Iraq\u2019s Iran-backed Popular Mobilization Forces separately claim 20 of their members killed and 32 wounded from US counter-strikes, and more US troops were wounded per Jul 30 reporting","CENTCOM says it is now reviewing the strike that killed the Qeshm family \u2014 a rare instance of the US publicly scrutinizing one of its own strikes in this war","Trump told reporters he is \u2018losing faith\u2019 with Iran but stopped short of ruling out a negotiated deal entirely; Iran\u2019s Foreign Ministry has separately and officially denied any Iranian role in the Egypt Damietta port drone strike, walking back earlier anonymous-source hints of involvement"],sources:["Al Jazeera","CNBC"],impact:"The broader-than-reported retaliation and the CENTCOM review together suggest a war still actively escalating in scope even as the Egypt-expansion narrative specifically has been walked back",impactColor:"#dc2626"},
  {id:"b_mass_attack_poland_jul30",confidence:"Confirmed",conflictId:"ukraine",severity:"critical",icon:"🔴",headline:"Russia\u2019s Largest Strike in Weeks Kills 8-10 as a Missile Crosses Into Poland, Prompting NATO Jets to Scramble",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Jul 30, 2026",bullets:["Russia launched 74 missiles (61 Kh-101/Kalibr cruise, 9 Iskander-M/S-400/KN-23 ballistic, 4 Zircon/Onyx anti-ship) and 284 drones overnight Jul 29-30 \u2014 the largest combined strike since the mid-July interceptor shortage began. Air defense intercepted just 1 of 9 ballistic missiles fired","An Iskander-M strike killed 6 members of one family, including 3 children, near Kryvyi Rih; Lviv had two high-rises, a school and two kindergartens damaged; at least 8-10 dead and 50+ injured nationwide, per Zelensky and local officials","A missile or debris \u2014 believed a Russian Kh-101 \u2014 crossed into Poland\u2019s Lublin region, leaving a 30-foot crater near Tarnawa-Kolonia; Polish PM Tusk confirmed the incident and Polish/NATO fighter jets scrambled in response, the most serious NATO-airspace incident in months"],sources:["Reuters","NPR","Kyiv Independent"],impact:"A mass-casualty attack paired with a direct NATO-airspace incident \u2014 exactly the kind of spillover event that could force alliance-level escalation-risk discussions regardless of how Kyiv and Moscow\u2019s own war is trending",impactColor:"#dc2626"},
  {id:"b_iran_war_reescalates_egypt_jul30",confidence:"Confirmed",conflictId:"iran",severity:"critical",icon:"🔴",headline:"Iran War Reignites: US Launches \u2018Heavy Wave\u2019 of Strikes After Iranian Attack on Jordan Base, Egypt Hit for First Time",conflict:"Iran",conflictColor:"#8b5cf6",publishedAt:"Jul 30, 2026",bullets:["The five-night pause ended: Iran struck US forces at a base in Jordan Jul 28-29 (intercepted), and CENTCOM responded with a \u2018heavy wave\u2019 of strikes on dozens of IRGC targets across southern/coastal Iran, including military command centers and drone facilities. Iranian state media reported a couple and their 2-year-old child killed on Qeshm island; the US also sanctioned 10 entities and 8 tankers","A drone hit a US-owned LNG storage tanker at Egypt\u2019s Damietta port \u2014 initially reported with anonymous Iranian sources hinting at involvement, though Iran\u2019s Foreign Ministry has since officially denied any Iranian role","Saudi Arabia conducted joint strikes with the US against Iranian-backed militias in Iraq \u2014 its first acknowledged direct involvement in the war \u2014 while Jordan intercepted a separate Iranian missile attack. The IRGC says the Strait of Hormuz stays closed as long as US \u2018interference\u2019 continues"],sources:["Al Jazeera","CNN","Havana Times/Democracy Now"],impact:"The clearest evidence yet that the war is expanding geographically rather than winding down \u2014 Egypt and Saudi Arabia\u2019s direct involvement for the first time raises the number of states in active combat roles, a material shift for any regional escalation assessment",impactColor:"#dc2626"},
  {id:"b_ryazan_refinery_zelensky_trump_jul29",confidence:"Confirmed",conflictId:"ukraine",severity:"major",icon:"🟠",headline:"Zelensky Calls White House Meeting with Trump \u2018Good,\u2019 Then Ukraine Hits Russia\u2019s Ryazan Refinery",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Jul 29, 2026",bullets:["Zelensky met Trump at the White House Jul 28, describing the meeting as \u2018good\u2019 and covering Patriot production licenses and diplomacy, per his Fox News interview \u2014 \u2018the initiative is not in the hands of Putin,\u2019 he said afterward","Hours later, Ukraine\u2019s General Staff and SOF confirmed a strike on the Rosneft-owned Ryazan oil refinery (~17.1M tonnes/year, ~5% of Russian refining capacity) and an adjacent Wildberries logistics complex \u2014 the refinery had previously been forced offline for an extended period after a May 2026 strike","The same week also saw strikes reach a classified Rosrezerv strategic fuel reserve in Udmurtia (1,300km deep) and an export terminal in Rostov Oblast, continuing the sustained campaign against Russian fuel infrastructure"],sources:["Kyiv Independent","Washington Post"],impact:"A high-level US-Ukraine diplomatic reset paired with one of the deepest and most consequential strikes of the campaign \u2014 reinforcing that materiel/diplomatic support and battlefield pressure are moving together rather than as separate tracks",impactColor:"#f97316"},
    {id:"b_graham_act_advances_jul29",confidence:"Confirmed",conflictId:"ukraine",severity:"major",icon:"🟠",headline:"Senate Advances Graham Russia-Iran Sanctions Act in Tribute Vote Following Senator\u2019s Death",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Jul 29, 2026",bullets:["The Senate voted to advance the Lindsey O. Graham Sanctioning Russia and Iran Act of 2026, named for the senator who died Jul 13 \u2014 a watered-down version of his original proposed measures, now also targeting Iran per Trump\u2019s demand","This directly supersedes the Jul 14 defense-bill blockage, which had cited the Iran war and Graham\u2019s death as complicating factors \u2014 the sanctions track has since moved forward even as broader appropriations remain contested"],sources:["Kyiv Independent"],impact:"Shows Congress finding a path forward on Russia/Iran sanctions even where broader defense appropriations remain gridlocked \u2014 a modest but concrete legislative data point for the dashboard\u2019s sanctions and political-calendar tracking",impactColor:"#f97316"},
  {id:"b_crimea_tyumen_jul26",confidence:"Confirmed",conflictId:"ukraine",severity:"major",icon:"🟠",headline:"Ukraine Strikes Tyumen Refinery and Multiple Crimea Targets Overnight as Russia Preps New Push Toward Dobropillia",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Jul 27, 2026",bullets:["Ukraine's Defense Forces struck a Chornomornaftogaz facility, a drone relay station, a logistics bridge in Donetsk region, a drone storage site and a troop concentration area in Luhansk region overnight Jul 26, per Ukraine's General Staff","A separate strike hit the Tyumen oil refinery, confirmed by Ukrainian officials, extending the deep-strike campaign against Russian fuel infrastructure","Russian forces are reported preparing a new offensive push toward Dobropillia while diverting additional resources to protect military logistics from continuing Ukrainian strikes; despite increased security and repeated assaults, Russian troops have so far failed to achieve their objectives there"],sources:["RBC-Ukraine"],impact:"Continues the established pattern of sustained Ukrainian pressure on Russian logistics and fuel infrastructure even as Russia signals a fresh offensive push in Donetsk region",impactColor:"#f97316"},
  {id:"b_uk_burnham_zelensky_jul27",confidence:"Confirmed",conflictId:"ukraine",severity:"major",icon:"🟠",headline:"UK PM Burnham Makes First Ukraine Visit, Pledges \u2018Stone Cloak\u2019 Electronic Warfare Tech License to Kyiv",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Jul 27, 2026",bullets:["New UK Prime Minister Burnham met Zelensky in his first visit to Ukraine as premier, per the Kyiv Independent, pledging to honor every commitment the UK has made to Ukraine in full","The visit included a licensing deal granting Ukraine production rights to the UK\u2019s \u2018Stone Cloak\u2019 electronic warfare systems \u2014 the kind of local-production materiel arrangement that has become the dominant form of Western support short of direct troop involvement","Comes as Russian strikes continue at high tempo (Kyiv, Chernihiv, Zaporizhzhia hit in the past 48 hours) and as Krymenergo reports Crimea-wide power restrictions following Ukrainian strikes on the peninsula"],sources:["Kyiv Independent"],impact:"A concrete continuity signal from a new UK government at a moment when sustained Western materiel support \u2014 not new diplomatic tracks \u2014 is what\u2019s actually moving the war",impactColor:"#f97316"},
  {id:"b_donetsk_assault_repelled_jul22",confidence:"Confirmed",conflictId:"ukraine",severity:"major",icon:"🟠",headline:"Ukraine Repels One of Russia's Largest Assaults of the War in Donetsk Region",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Jul 26, 2026",bullets:["A four-hour assault on Jul 22 involved troops from three separate Russian formations and dozens of armored and military vehicles pushing into the Donetsk region — one of the largest single Russian assaults of the war to date","Ukrainian forces, including the Azov Corps, stopped the advancing columns using minefields, explosive barriers, drones and tactical aircraft, which also destroyed pontoon bridges Russian troops were using to move armor across; the assault ended with heavy Russian losses","Ukraine's General Staff and Security Service separately carried out a new wave of strikes Jul 24-25 against Russian command posts, ammunition depots, drone facilities, air defense and radar systems (including an S-400), plus an offshore oil platform and vessels allegedly moving military cargo between Iran and Russia"],sources:["RBC-Ukraine","Ukraine General Staff"],impact:"A rare clean tactical win worth flagging on its own terms — three-formation combined-arms assaults are exactly the kind of push Russia has struggled to sustain all war, and this one ended in heavy losses for the attackers rather than a breakthrough",impactColor:"#22c55e"},
  {id:"b_ukraine_political_crisis",confidence:"Confirmed",conflictId:"ukraine",severity:"critical",icon:"🔴",headline:"Zelensky Still Struggling to Resolve Fedorov Crisis as Protests Continue Past a Week",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Jul 24, 2026",bullets:["HOW IT STARTED — Zelensky announced Jul 12 that Ukraine was 'changing its political strategy,' launching the war's fourth government reshuffle: PM Yulia Svyrydenko resigned Jul 15, replaced by ex-Naftogaz CEO Serhii Koretsky (Rada confirmed the new Cabinet Jul 16). The bigger shock was the dismissal of Defense Minister Mykhailo Fedorov after just six months — credited with cutting ministry corruption and persuading Elon Musk to deny Russia Starlink access — with SBU officer Yevhenii Khmara installed as acting defense minister. Analysts point to a feud between Fedorov and then-Commander-in-Chief Oleksandr Syrskyi as the real driver; Fedorov declined an advisor role, saying 'I don't need to be Minister of Defense just to be Minister of Defense'","THE COMMANDER FALLS — After the General Staff flatly denied Jul 20 reports that Syrskyi had been removed, Zelensky did exactly that on Jul 21, appointing Maj. Gen. Mykhailo Drapatyi (previously Joint Forces commander) as commander-in-chief to 'reset' the war effort. Syrskyi broke his usual silence with an op-ed apologizing if he'd offended Fedorov while defending his record: he says he established Ukraine's drone forces as a separate branch and couldn't 'switch a million-people army to drones in two months.' Russia responded by urgently adding Drapatyi to its wanted list","STILL UNRESOLVED — Fedorov confirmed Jul 23 he will accept nothing but reinstatement as defense minister, rejecting Zelensky's Deputy Prime Minister for military innovation offer outright; a senior air force commander resigned in protest, as did Deputy Air Force Commander Pavlo Yelizarov earlier. Zelensky says Syrskyi will stay on as an adviser to the new command, and separately replaced General Staff chief Andrii Hnatov with Ihor Skybiuk on Jul 22. A Rating Group poll (Jul 20-21) found Fedorov's trust surged from 35% to 65% in a week while Syrskyi's fell from 39% to 23% — though a separate Rating Group poll found 55% of Ukrainians actually agreed with Syrskyi's dismissal (15% opposed, 19% indifferent)","NO RESOLUTION AS OF JUL 24 — Protests that began with 1,000+ in Kyiv's central square — some dubbing it the 'Cardboard Maidan' — have now run over a week and spread to Lviv, Odesa, Dnipro and beyond, with organizers warning of continued nightly demonstrations. The BBC's Paul Adams reported Jul 24 that Zelensky is 'struggling to fix' the crisis: most analysts believe the reshuffle's real goal was cutting Fedorov down to size, but the backlash has 'backfired dramatically' instead. Zelensky is still reportedly weighing a new defense minister from a list of candidates; no appointment has been confirmed","CONTEXT — Martial law and mobilization were both extended to Oct 31, 2026 (the 20th such vote). The churn lands squarely on the dashboard's central open thread: Patriot-production licensing and air-defense reform now ride on an untested defense minister and a brand-new commander-in-chief. The UN human rights mission (Danielle Bell) reported 1,396 civilians killed and 7,978 wounded nationwide in H1 2026"],sources:["Kyiv Independent","RFE/RL","Ukrinform","Financial Times","RBC-Ukraine","Al Jazeera","Newsweek","EA WorldView","BBC"],impact:"Ukraine's most serious wartime political crisis to date: two of the three people running the war effort replaced inside ten days, protests into their second week with no resolution, and the BBC's own framing — that the move 'backfired dramatically' — signals this is now a genuine governing crisis, not a passing news cycle",impactColor:"#dc2626"},
  {id:"b_iran_war_jul23",confidence:"Confirmed",conflictId:"iran",severity:"critical",icon:"🔴",headline:"13th Night of Strikes as Iran Disputes Report It Rejected an Iraqi Ceasefire Proposal",conflict:"Iran",conflictColor:"#8b5cf6",publishedAt:"Jul 24, 2026",bullets:["THE CAMPAIGN — CENTCOM has now struck Iranian military operations centers, maritime capabilities, aircraft hangars, drone storage and logistics infrastructure through a 13th consecutive night, hitting Bandar Abbas, Qeshm and Hormozgan province targets; on Jul 24 the US military separately fired on another merchant vessel attempting to breach its blockade of Iranian ports. The US used a B-1 long-range bomber for the first time this phase of the war — a single B-1 can carry two dozen 2,000lb bombs or dozens of cruise missiles. Iranian authorities say 95+ locations across 12+ cities have been hit since the campaign resumed; Hegseth puts the cost to the US at $37.5B, and the House has adopted a $95B budget package to fund the war","DISPUTED CEASEFIRE STORY — Iran has publicly disputed a New York Times report describing an Iraqi-brokered US ceasefire proposal as rejected by Tehran; Iranian officials call the story 'misleading' (a characterization Baghdad also pushed back on) and instead blame the Trump administration for 'breach of its promises' under the Islamabad MoU. Neither government has verbally confirmed a return to diplomacy. Trump told reporters Jul 24 he believes 'Tehran is getting more serious' and met his Cabinet the same day to weigh further escalation if talks don't produce results","CASUALTIES — Iran's health ministry now puts the toll at 59 killed and 666 injured specifically since the ceasefire collapsed on Jun 27 (separate from the roughly 3,000 Iranian deaths estimated across the full war since Feb 28). Cumulative US deaths stand at 18, including 3 from the Jul 17 Jordan strike (all now named) and a separate drone-detonation death at Erbil Air Base. Trump has threatened to destroy an Iranian bridge or power plant — including inside Tehran itself — every time Iran hits a ship in Hormuz; FM Araghchi calls the doctrine 'eye for an eye'","OIL AND SHIPPING — Brent crude topped $100/bbl for the first time since May, up roughly $13 in a week; US gas averages $3.94+/gallon and rising. The Houthis moved from declaring an embargo to actually attacking Saudi-bound tankers in the Red Sea; US forces say they've redirected 12 vessels since resuming the blockade. Iran also struck Kuwait and Jordan again overnight, with sirens in Bahrain","NUCLEAR THREAT — Trump has separately threatened the fortified Pickaxe Mountain nuclear site, where satellite imagery has shown reconstruction since June; Tehran calls any strike there a red line. On the Ukraine track, Rubio and Lavrov met for 35 minutes in Manila — see the Ukraine political thread for details"],sources:["CNN","ABC News","Fox News","Al Jazeera","Just Security","Britannica"],impact:"13 nights in and the diplomatic track has curdled into a dispute over whether a ceasefire offer even existed — a president publicly weighing further escalation and two governments blaming each other for a stalled deal is a worse position than the 'unaccepted proposal' framing of two days ago",impactColor:"#dc2626"},
  {id:"b_taiwan_okinotori_jul24",confidence:"Reported",conflictId:"south-china-sea",severity:"major",icon:"🟠",headline:"China Holds Taiwan Strait Live-Fire Drills, Then Fires Near Japan's Okinotori for the First Time",conflict:"South China Sea",conflictColor:"#eab308",publishedAt:"Jul 24, 2026",bullets:["China's military ran a two-day live-fire exercise in the Taiwan Strait (Jul 22-23) following increased incursions near Taiwan's waters and airspace, per Taiwan's defense ministry","Beijing then conducted live-fire drills near Japan's Okinotori for the first time, directly disputing Japan's claimed EEZ around the reef; the PRC argues Okinotori isn't a natural island and that Japan's EEZ claim there violates international law","The exercises follow joint PRC-Russian aerial drills that encroached into South Korea's air defense identification zone and the Jul 6-13 Joint Sea-2026 exercise off Qingdao — AEI assesses the drills may be building PLA-Russian interoperability relevant to a future Taiwan scenario. Wang Yi and Rubio met on the ASEAN sidelines Jul 22, with both sides stressing continued communication despite the tension"],sources:["TaiwanPlus","AEI"],impact:"A rare first-time live-fire challenge to Japan's EEZ claim, layered on top of already-elevated Taiwan Strait activity — expands the friction map beyond the usual median-line incursions right as regional diplomats are gathered in Manila",impactColor:"#f97316"},
  {id:"b_rubio_lavrov_manila_jul23",confidence:"Confirmed",conflictId:"ukraine",severity:"critical",icon:"🔴",headline:"Rubio and Lavrov Meet in Manila for 35 Minutes — No Breakthrough, But the First Real Movement on Peace Talks in Months",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Jul 23, 2026",bullets:["Secretary of State Marco Rubio met Russian Foreign Minister Sergei Lavrov on the sidelines of the ASEAN Foreign Ministers' Meeting in Manila on Jul 23 — their fourth meeting since 2025, after Riyadh, Kuala Lumpur and New York. The talks lasted just 35 minutes","Rubio called the conversation 'good' and 'frank' but declined specifics and dismissed expectations of rapid progress, saying fresh proposals will be needed after previous peace ideas failed: the US 'is prepared to play a constructive role in bringing about an end to a senseless war,' but diplomacy 'will require sustained effort and new ideas.' He pointed to civilian deaths and Russian strikes on Kyiv, and framed the core problem as finding a settlement 'that both sides can accept'","Lavrov's ministry said he 'reaffirmed Russia's readiness for a political and diplomatic settlement' and told Rubio Moscow remains committed to the Trump-Putin Anchorage proposals from August 2025. But Bloomberg reports Putin has abandoned any territorial concessions, with the Kremlin now treating the informal Anchorage understandings as void — and Lavrov and Ushakov have separately accused Washington of betraying the 'spirit of Anchorage' and of no longer presenting itself as an impartial mediator","The meeting lands with US peace efforts effectively frozen while Washington's attention is consumed by the Iran war, and with Kyiv and Moscow still far apart on territory. Zelensky held what he called 'a good and important conversation' with US envoys Steve Witkoff and Jared Kushner on Jul 22, and says Putin's inner circle is beginning to recognize reality; separately, EU ambassadors approved a 21st sanctions package that von der Leyen says packs a historic punch"],sources:["Reuters/Moscow Times","RFE/RL","Al Jazeera","Meduza","Kyiv Independent"],impact:"The first substantive US-Russia contact on Ukraine in months, but a 35-minute meeting with no announced outcome — and Bloomberg's reporting that Putin has dropped territorial concessions entirely suggests the gap has widened rather than narrowed since Anchorage",impactColor:"#dc2626"},
  {id:"b_odesa_ship_jul20",confidence:"Confirmed",conflictId:"ukraine",severity:"critical",icon:"🔴",headline:"Two Grain Ships Struck in Four Days as Maersk Suspends Ukrainian Port Calls; Kyiv Calls Emergency UN Meeting",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Jul 23, 2026",bullets:["Russia hit the Golden Leo — a Guinea-Bissau-flagged, Turkish-owned bulk carrier loaded with corn, crewed by Indian and Syrian sailors — with three cruise missiles late Jul 19 as it left Odesa, sparking a fire; Ukraine's navy said 9 crew members and a Ukrainian maritime pilot were killed, 8 of 17 aboard rescued after an overnight search-and-rescue operation","Russia's Defense Ministry separately said it struck fuel storage facilities at Odesa's port the same night; Odesa's regional governor said Russian strikes have now killed 28 people in the region this month alone amid near-daily shelling","The strike lands atop an already-elevated month of Black Sea violence — Russian forces have used Geran-4 drones against grain carriers at Chornomorsk earlier in July — and comes a day after one of the war's largest ballistic barrages hit Kyiv; Ukraine has lost roughly a third of its Black Sea grain-export capacity to Russian strikes, while Ukrainian pressure has forced Russia to curtail shipping through the Sea of Azov, which normally handles about a quarter of its own grain exports","In response, Ukraine launched more than 400 drones at the Moscow region overnight, hitting an oil depot in Podolsk and a warehouse fire at the Yuzhnye Vrata industrial complex in Domodedovo","A separate Russian strike on Odesa the afternoon of Jul 20 killed 3 and injured 8 more, per local officials — a distinct land-target incident on top of the overnight maritime strike, underscoring how sustained the pressure on the city has become","ESCALATION Jul 22-23: Russia struck a second bulk carrier, the Golden Rose, though its crew was rescued. Shipping giant Maersk suspended operations at a Ukrainian port in response, and Ukraine called an emergency UN meeting over what it describes as a Russian blockade of the Black Sea grain corridor. Russia separately imposed an unofficial nighttime shipping ban at its own Novorossiysk port (Reuters), and a Bulgarian Navy vessel discovered an unidentified drone in the Black Sea"],sources:["Reuters","CBC","Euromaidan Press"],impact:"A commercial shipping line pulling out and a UN emergency session mark the point where attritional strikes become a functioning blockade — with both countries major grain exporters, the corridor closure carries a global food-security dimension well beyond the casualty count",impactColor:"#dc2626"},
  {id:"b_ukraine_strike_exchange",confidence:"Confirmed",conflictId:"ukraine",severity:"critical",icon:"🔴",headline:"Four Straight Nights of Russian Strikes on Kyiv and Kharkiv, Answered Each Time by Ukrainian Deep Strikes",conflict:"Ukraine",conflictColor:"#5b8ec8",publishedAt:"Jul 22, 2026",bullets:["Jul 18-19 — Russia launched 41 missiles (25 of them ballistic) and 125 attack drones, with Kyiv the primary target, in one of the war's largest ballistic-heavy barrages; Ukraine's Air Force intercepted or suppressed 18 missiles and 108 drones, but fires broke out across five Kyiv districts, killing 1 and wounding 16","Jul 19-20 — Strikes hit Kyiv and the Kharkiv outskirts, killing at least 4 and injuring 20+; the Kyiv strike destroyed the UKRTAC plant and its warehouses, and 16 were injured in Kharkiv region, three seriously","Jul 22 — More than 10 impacts were reported across Ukraine after another combined overnight missile-and-drone attack. Ukraine answered in kind through the week: three Russian oil depots hit deep inside Russia, a Buk air defense system, a logistics bridge, two tankers plus a floating crane in the Black and Azov seas, the sanctioned shadow-fleet tanker Avero, and a Russian MiG-29 destroyed on its airbase in Kursk region","Zelensky personally confirmed strikes on a Russian oil depot and other key targets, while ISW reported Russia's renewed push into northern Sumy region failed to gain ground — Moscow is still trying to establish buffer zones along the border. The exchange keeps landing on the dashboard's central materiel question: Ukraine's PAC-3/Patriot stocks are drawn from the same US inventory the parallel Iran war is consuming"],sources:["NPR","AP","RBC-Ukraine","Ukrainska Pravda","ISW"],impact:"A sustained, bidirectional escalation rather than isolated attacks — neither side is de-escalating, and Ukraine's interceptor supply is the variable that decides whether the Russian half of the exchange keeps getting through",impactColor:"#dc2626"},
  {id:"b_scs_ayungin_jul21",confidence:"Confirmed",conflictId:"south-china-sea",severity:"major",icon:"🟠",headline:"Filipino Sailor Injured Near Second Thomas Shoal as US and Australia Condemn China",conflict:"South China Sea",conflictColor:"#eab308",publishedAt:"Jul 21, 2026",bullets:["A Filipino Navy sailor was injured near Ayungin Shoal (Second Thomas Shoal) on Jul 20 in an encounter with Chinese vessels; the US State Department said it 'condemns China's dangerous and aggressive actions against Philippine navy personnel' and called on Beijing to 'immediately cease its destabilizing conduct.' Australia joined the condemnation","The incident landed just as Secretary of State Rubio arrived in Manila for the ASEAN Foreign Ministers' Meeting, where Rubio said he was open to a possible sideline meeting with China's Wang Yi; in an op-ed published the same day he touted Washington's 'commitment to freedom of navigation in Southeast Asia'","The clash threatens to overshadow an ASEAN agenda already dominated by Myanmar's civil war and the regional fallout from the Iran war's effect on Hormuz shipping"],sources:["Philstar","France24","State Department"],impact:"A fresh flashpoint at the exact moment US and Chinese diplomats are in the same city — a real test of whether ASEAN can address South China Sea tensions while everyone's attention is split with the Middle East",impactColor:"#f97316"},
    ];

const LOSSES={ukraine:[
  {id:1,category:"Personnel",total:"1,451,750",todayChange:"+1,240",color:"#ef4444",icon:"☠️",description:"Killed & wounded (est.)"},
  {id:2,category:"Tanks",total:"12,232",todayChange:"+1",color:"#f97316",icon:"🪖",description:"Main battle tanks"},
  {id:3,category:"Armoured Vehs",total:"25,075",todayChange:"+5",color:"#eab308",icon:"🚧",description:"APCs, IFVs, MRAPs"},
  {id:4,category:"Artillery",total:"47,276",todayChange:"+80",color:"#84cc16",icon:"💥",description:"Guns, howitzers, mortars"},
  {id:5,category:"MLRS",total:"1,996",todayChange:"+8",color:"#22c55e",icon:"🚀",description:"Multiple launch rockets"},
  {id:6,category:"Air Defence",total:"1,533",todayChange:"+4",color:"#06b6d4",icon:"🛡️",description:"SAM & SHORAD systems"},
  {id:7,category:"UAVs",total:"440,948",todayChange:"+1,657",color:"#5b8ec8",icon:"🛸",description:"Operational UAVs"},
  {id:8,category:"Aircraft",total:"439",todayChange:"—",color:"#8b5cf6",icon:"✈️",description:"Fixed-wing aircraft"},
  {id:9,category:"Helicopters",total:"354",todayChange:"—",color:"#ec4899",icon:"🚁",description:"Rotary-wing aircraft"},
  {id:10,category:"Cruise Missiles",total:"5,005",todayChange:"—",color:"#14b8a6",icon:"🎯",description:"Destroyed in flight"},
  {id:11,category:"Ships/Boats",total:"34",todayChange:"—",color:"#64748b",icon:"⛵",description:"Naval vessels"},
  {id:12,category:"Vehicles",total:"129,438",todayChange:"+485",color:"#a78bfa",icon:"🚛",description:"Trucks & logistics"},
  {id:13,category:"Ground Robots",total:"2,112",todayChange:"+4",color:"#f43f5e",icon:"🤖",description:"UGV platforms"},
  {id:14,category:"Special Equip",total:"4,490",todayChange:"+6",color:"#fb923c",icon:"🔧",description:"Engineering & EW"},
],gaza:[
  {id:15,category:"Total Killed",total:"73,066+",todayChange:null,color:"#f59e0b",icon:"☠️",description:"Total killed since Oct 2023"},
  {id:16,category:"Children Killed",total:"20,179+",todayChange:null,color:"#ef4444",icon:"👶",description:"Children killed"},
  {id:17,category:"Post-ceasefire killed",total:"1,200",todayChange:null,color:"#f97316",icon:"💀",description:"Killed since Oct 10, 2025 ceasefire"},
  {id:18,category:"Buildings Damaged",total:"80%",todayChange:null,color:"#eab308",icon:"🏚️",description:"Of Gaza buildings damaged or destroyed"},
],"south-china-sea":[
  {id:25,category:"Annual Trade Value",total:"$3.37T",todayChange:null,color:"#06b6d4",icon:"🚢",description:"Annual trade value transiting SCS"},
  {id:26,category:"Incidents YTD 2026",total:"47+",todayChange:"+18 Jun",color:"#ef4444",icon:"⚠️",description:"Documented PRC harassment incidents"},
  {id:27,category:"China Claims",total:"~90%",todayChange:null,color:"#f97316",icon:"🗺️",description:"Nine-Dash Line; UNCLOS tribunal ruled no legal basis"},
  {id:28,category:"Claimant Nations",total:"6",todayChange:null,color:"#eab308",icon:"🌏",description:"China, Philippines, Vietnam, Malaysia, Brunei, Taiwan"},
  {id:29,category:"Militia Vessels (Whitsun)",total:"220+",todayChange:null,color:"#ef4444",icon:"⛵",description:"Chinese maritime militia at Whitsun Reef — Jun 3, 2026"},
]};

const STRIKES=[
  {id:26,date:"Jul 29",targetName:"Ryazan Oil Refinery (Rosneft) + Lukoil-Permnefteorgsintez (Perm) + Wildberries Warehouse",region:"Ryazan Oblast / Perm Krai, Russia",distance:360,category:"Energy/Logistics",icon:"\ud83d\udee2\ufe0f",severity:"critical",result:"A two-front energy day. Drones hit the Rosneft-owned Ryazan refinery (~17.1M tonnes/year, ~5% of Russian refining output) and an adjacent Wildberries warehouse complex, with six people hospitalised; Ryazan governor Pavel Malkov confirmed a mass attack and industrial fires. Ukraine's General Staff separately confirmed a strike on Lukoil-Permnefteorgsintez in Perm \u2014 one of Russia's largest refineries at over 13M tonnes/year \u2014 with Perm Krai governor Dmitry Makhonin acknowledging an industrial facility was struck. Repairs at Ryazan and Novokuybyshevsk are estimated at roughly four weeks."},
  {id:25,date:"Jul 25",targetName:"Tyumen Oil Refinery (Western Siberia) + Filanovsky Platform, Caspian Sea",region:"Tyumen Oblast / Caspian Sea",distance:2000,category:"Energy/Naval",icon:"\ud83c\udfed",severity:"critical",result:"Russia's largest independent refinery, roughly 2,000km from the Ukrainian border, was struck and subsequently halted crude processing entirely. The attack ignited a 2.6M-tonne/year diesel hydrotreater and a combined high-octane gasoline unit; the plant processes around 9M tonnes annually. It became the sixth major Russian refinery to suspend operations since the start of July. The same night the SBU struck the Filanovsky oil platform in the Caspian Sea and two bulk carriers it said were moving weapons to Russia."},
  {id:24,date:"Jul 23",targetName:"NS-Oil Refinery (Ulyanovsk) + Subkhankulovo Pipeline Station (Bashkortostan) + Voronezh Wildberries Hub",region:"Ulyanovsk/Bashkortostan/Voronezh, Russia",distance:650,category:"Energy/Logistics",icon:"🛢️",severity:"major",result:"A three-target night ~650km inside Russia: the NS-Oil refinery in Novospasskoye caught fire, the Subkhankulovo Linear Production and Dispatching Station (a major pipeline hub near Tuymazy) was struck, and a Wildberries logistics hub in Voronezh was hit for a second consecutive night. Russia's MoD claimed 223 Ukrainian drones intercepted across 19 regions, Crimea and the Sea of Azov overnight."},
  {id:23,date:"Jul 22",targetName:"Russian MiG-29 Fighter Jet, Kursk Airbase",region:"Kursk Oblast, Russia",distance:120,category:"Military",icon:"✈️",severity:"critical",result:"Ukrainian forces destroyed a Russian MiG-29 fighter jet on the ground at its airbase in Kursk region — a rare confirmed kill of a crewed Russian fixed-wing combat aircraft, alongside a re-strike on the Saratov oil refinery the same cycle."},
  {id:22,date:"Jul 18",targetName:"Moscow Region: Noginsk Oil Depot + Elektrostal USF Warehouse + Wildberries Logistics Fire",region:"Moscow Oblast, Russia",distance:450,category:"Energy/Military-Industrial",icon:"🎯",severity:"critical",result:"Strikes landed inside Moscow region itself for the first time this cycle: an oil depot hit in Noginsk, a warehouse at the 1st Center of Unmanned Systems Forces destroyed by fire in Elektrostal, and a large fire at Wildberries' second-largest logistics center in Moscow. Moscow's mayor said 1,892 Ukrainian drones were detected heading toward the region between Jul 11-18 alone."},
  {id:3,date:"Jun 24",targetName:"Kerch Strait air defense + Saky & Hvardiiske airfields",region:"Crimea",distance:280,category:"Military",icon:"📡",severity:"major",result:"SSU Alpha unit struck air defense systems and military infrastructure at Saky and Hvardiiske airfields."},
  {id:4,date:"Jun 23",targetName:"Voronezh missile electronics plant",region:"Voronezh Oblast",distance:640,category:"Military-Industrial",icon:"🏭",severity:"critical",result:"Confirmed hit on plant manufacturing electronics for Iskander missiles and Kh-101 cruise missiles."},
  {id:5,date:"Jun 23",targetName:"N. Crimean Canal railway bridge",region:"Occupied Kherson/Crimea",distance:250,category:"Infrastructure",icon:"🌉",severity:"critical",result:"DESTROYED — Russia's last intact rail link supplying Crimea from the north."},
  {id:8,_rotated:true,date:"Jun 27",targetName:"Titan-Barikady military plant, Volgograd",region:"Volgograd Oblast",distance:780,category:"Military-Industrial",icon:"🚀",severity:"critical",result:"Zelensky confirmed FP-5 Flamingo missiles struck the Titan-Barikady facility — a key Russian military-industrial complex in the Volgograd corridor."},
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
const CASUALTIES=[{date:"Jun 18",value:1370},{date:"Jun 19",value:1240},{date:"Jun 20",value:1290},{date:"Jun 21",value:1290},{date:"Jun 22",value:1390},{date:"Jun 23",value:1260},{date:"Jun 24",value:1270},{date:"Jun 25",value:1310},{date:"Jun 26",value:1350},{date:"Jun 27",value:1250},{date:"Jun 28",value:1230},{date:"Jun 29",value:1350},{date:"Jun 30",value:1210},{date:"Jul 1",value:1140},{date:"Jul 2",value:1250},{date:"Jul 3",value:1190},{date:"Jul 4",value:1290},{date:"Jul 5",value:1420},{date:"Jul 6",value:1200},{date:"Jul 7",value:1260},{date:"Jul 8",value:1310},{date:"Jul 9",value:1460},{date:"Jul 10",value:1490},{date:"Jul 11",value:1320},{date:"Jul 12",value:1600},{date:"Jul 13",value:1120},{date:"Jul 14",value:1470},{date:"Jul 15",value:1340},{date:"Jul 16",value:1370},{date:"Jul 17",value:1420},{date:"Jul 18",value:1520},{date:"Jul 19",value:1600},{date:"Jul 20",value:1370},{date:"Jul 21",value:1330},{date:"Jul 22",value:1460},{date:"Jul 23",value:1410},{date:"Jul 24",value:1450},{date:"Jul 25",value:1440},{date:"Jul 26",value:1590},{date:"Jul 27",value:1560},{date:"Jul 28",value:1310},{date:"Jul 29",value:1360},{date:"Jul 30",value:1340},{date:"Jul 31",value:1470},{date:"Aug 1",value:1500},{date:"Aug 2",value:1390},{date:"Aug 3",value:1240}];
const EVENTS={ukraine:[{id:1,date:"Jan 6, 2026",label:"Coalition of Willing — Paris",note:"35 nations at Elysée Palace. UK + France pledge troops post-ceasefire.",color:"#22c55e",isUpcoming:false},{id:2,date:"Feb 17, 2026",label:"Geneva trilateral talks",note:"Military track: constructive. Political track: stuck.",color:"#f97316",isUpcoming:false},{id:3,date:"May 9, 2026",label:"Trump 3-day ceasefire",note:"Expired. Full-scale combat resumed immediately.",color:"#f97316",isUpcoming:false},{id:4,date:"Jun 7, 2026",label:"Putin refuses direct talks",note:"Declines Zelensky face-to-face proposal.",color:"#ef4444",isUpcoming:false},{id:5,date:"Jun 23, 2026",label:"Rail bridge to Crimea destroyed",note:"Last intact rail link from north severed.",color:"#ef4444",isUpcoming:false},{id:6,date:"Jun 25, 2026",label:"Belarus halts Shahed relay",note:"Partial compliance with Ukraine ultimatum.",color:"#22c55e",isUpcoming:false},{id:7,date:"Jun 27, 2026",label:"Putin-Lukashenko Valdai summit",note:"2-day secret talks at Putin's private residence. WSJ: Russia pressuring Belarus to open second front. No communiqué issued.",color:"#ef4444",isUpcoming:false},{id:8,date:"Jun 27, 2026",label:"Serbia's Vucic announces resignation",note:"Snap elections coming. Pro-Russia Balkan president destabilised. Serbia has warm ties with Moscow — election outcome uncertain.",color:"#f59e0b",isUpcoming:false},{id:10,date:"Jun 16-17, 2026",label:"Russia rejects Turkish ceasefire proposal",note:"Fidan proposed ceasefire in Moscow — Russia rejected, remained firm on Donbas demands. Turkey had hoped to bring both sides to NATO Ankara. Diplomatic track blocked.",color:"#ef4444",isUpcoming:false},{id:11,date:"Jun 28, 2026",label:"Putin United Russia congress — rejects diplomacy",note:"First public admission of fuel shortages. ISW: 'rejected diplomatic solutions.' United Russia formally claimed as Putin's party. Duma elections Sept 2026.",color:"#ef4444",isUpcoming:false},{id:9,date:"Jul 7, 2026",label:"NATO Ankara Summit",note:"Potential ceasefire deadline. Security guarantees on agenda. Slovakia refuses aid pledge. Turkey jet engine deal confirmed.",color:"#5b8ec8",isUpcoming:true}],iran:[
    {id:1,date:"Feb 28, 2026",label:"Operation Epic Fury",note:"US-led strikes on Iranian nuclear facilities at Natanz, Fordow, and Isfahan. Iran immediately closes Strait of Hormuz. ~6,000 total killed in strikes.",color:"#ef4444",isUpcoming:false},
    {id:2,date:"Mar\u2013May 2026",label:"Hormuz blockade \u2014 3.5 months",note:"Iran maintains full Hormuz blockade. IMO: 20,000+ seafarers stranded on ~2,000 vessels. Global oil prices spike. US naval blockade imposed in response.",color:"#f97316",isUpcoming:false},
    {id:3,date:"Jun 14, 2026",label:"Hormuz blockade lifted",note:"Trump announces removal of US naval blockade. Iran concurrently lifts Hormuz closure. Tanker traffic resumes. IMO: 2,000 vessels freed.",color:"#22c55e",isUpcoming:false},
    {id:4,date:"Jun 16-17, 2026",label:"Lucerne technical talks",note:"Pakistan/Qatar mediated talks in Switzerland. Joint statement: encouraging progress in positive and constructive atmosphere. Core enrichment and IAEA access gaps remain.",color:"#8b5cf6",isUpcoming:false},
    {id:5,date:"Jun 17, 2026",label:"Islamabad MoU signed",note:"Trump signed at Versailles G7 dinner; Pezeshkian signed remotely. Pakistan brokered; Qatar, Saudi Arabia, Turkey facilitated. 60-day negotiation window opens.",color:"#8b5cf6",isUpcoming:false},
    {id:6,date:"Jun 21, 2026",label:"Enrichment red lines surface",note:"Pezeshkian: we will never back down from the right to enrich uranium. IAEA inspection dispute: Iran demands sanctions relief first; US demands inspections first.",color:"#ef4444",isUpcoming:false},
    {id:7,date:"Jun 26, 2026",label:"Iran fires drones at Hormuz",note:"Trump stated Iran fired 4 one-way attack drones at Hormuz \u2014 one struck cargo ship. Trump declared MoU violation. Talks entered jeopardy.",color:"#ef4444",isUpcoming:false},
    {id:8,date:"Jul 6-7, 2026",label:"Iran strikes three tankers",note:"IRGC missiles hit the Al Rekayyat (Marshall Islands flag), Saudi Wedyan and Liberian Cyprus Prosperity for transiting outside Iran\u2019s designated northern route. Saudi Arabia and Qatar condemned the attacks.",color:"#f97316",isUpcoming:false},
    {id:9,date:"Jul 7, 2026",label:"US strikes 80+ targets, revokes GL X",note:"CENTCOM hit air defenses, C2, coastal radar, anti-ship missile sites and 60+ IRGC boats over four hours \u2014 Kharg Island, Qeshm, Bandar Abbas, Sirik. Treasury simultaneously revoked the GL X oil-sales license. Trump ordered the strikes from the NATO summit in Ankara.",color:"#dc2626",isUpcoming:false},
    {id:10,date:"Jul 8, 2026",label:"IRGC counterstrike; Trump: MoU \u2018over\u2019",note:"IRGC claims strikes on 85 US military installations in Bahrain and Kuwait. Trump declared the MoU \u2018over\u2019 and talks a \u2018waste of time,\u2019 then ordered additional strikes. Brent +6% to $78.",color:"#dc2626",isUpcoming:false},
    {id:11,date:"Jul 9-10, 2026",label:"Khamenei buried; Mojtaba never appears",note:"Khamenei buried at the Imam Reza shrine in Mashhad as crowds chanted \u2018Kill Trump.\u2019 US strikes continued through the funeral. Successor Mojtaba Khamenei never appeared during the six-day funeral \u2014 no image, video or voice recording of him has surfaced since.",color:"#8b5cf6",isUpcoming:false},
    {id:12,date:"Jul 11, 2026",label:"Talks resume in Pakistan",note:"First negotiating round after Khamenei\u2019s burial, per Al Arabiya \u2014 agenda covers sanctions, frozen assets, the nuclear program. No government ever officially confirmed this meeting took place.",color:"#8b5cf6",isUpcoming:false},
    {id:13,date:"Jul 12-13, 2026",label:"Open combat resumes across five countries",note:"IRGC intercepted two tankers in Hormuz; CENTCOM struck ~140 Iranian targets overnight. Iran retaliated across Jordan, Bahrain, Kuwait and Oman \u2014 the clearest sign the 60-day MoU window had collapsed into active war.",color:"#dc2626",isUpcoming:false},
    {id:14,date:"Jul 14, 2026",label:"Naval blockade in effect; MoU declared dead",note:"US blockade of Iran\u2019s entire coastline took effect 20:00 GMT. Iran hit al-Juffair base in Bahrain and fired on Jordan. Iran\u2019s deputy FM declared Tehran has \u2018no commitments\u2019 left under the MoU.",color:"#dc2626",isUpcoming:false},
    {id:15,date:"Jul 15, 2026",label:"First blockade enforcement strike",note:"US aircraft fired Hellfire missiles into the tanker M/T Belma\u2019s smokestack after it ignored warnings toward Kharg Island \u2014 disabling, not sinking it. Brent held near $80/bbl.",color:"#dc2626",isUpcoming:false},
    {id:16,date:"Jul 16, 2026",label:"Strikes expand into northern Iran",note:"Second confirmed enforcement strike disables another vessel. Iran\u2019s FM says the MoU has \u2018entered a crisis stage.\u2019 House Republicans unveil a $95B Iran-war funding plan.",color:"#dc2626",isUpcoming:false},
    {id:17,date:"Jul 17, 2026",label:"Bridges struck in Hormozgan; seventh night",note:"US hits six bridges near Bandar Abbas \u2014 at least 8 killed per Iranian state media. Iran widens retaliation to Jordan, Qatar and Kuwait.",color:"#dc2626",isUpcoming:false},
    {id:18,date:"Jul 18, 2026",label:"Jordan attack kills US troops",note:"Iranian strikes on US forces in Jordan killed American service members \u2014 the first fatalities since March. Iran\u2019s negotiators call the MoU \u2018effectively suspended.\u2019",color:"#dc2626",isUpcoming:false},
    {id:19,date:"Jul 19, 2026",label:"US death toll confirmed at 3",note:"CENTCOM confirms 3 US dead from the Jordan strike. Israeli officials say Israel would respond immediately to any Iranian attack \u2014 the clearest sign Israel could be drawn back in directly.",color:"#dc2626",isUpcoming:false},
    {id:20,date:"Jul 20, 2026",label:"Ninth night; Houthis join; Hormuz traffic collapses",note:"Widest single-night geographic spread yet. Houthis announce a maritime embargo in solidarity with Iran. Hormuz traffic collapses to ~9 vessels/day vs ~130 pre-war; Brent surges to ~$91.",color:"#dc2626",isUpcoming:false},
    {id:21,date:"Jul 21, 2026",label:"Tenth night; third US death named",note:"Sgt. Michael Swinton named as the third US fatality (Erbil, Iraq). Kuwait facilities on fire from Iranian retaliation. Houthis escalate their embargo specifically against Saudi Arabia.",color:"#dc2626",isUpcoming:false},
    {id:22,date:"Jul 22, 2026",label:"Eleventh night; Bab el-Mandeb closes to Saudi Arabia",note:"Cumulative US deaths reach 18. Trump says the US plans to hit the fortified Pickaxe Mountain site. Houthis declare Bab el-Mandeb off limits to Saudi Arabia \u2014 a second chokepoint now at risk.",color:"#dc2626",isUpcoming:false},
    {id:23,date:"Jul 24, 2026",label:"13th night; ceasefire-proposal dispute",note:"Iran disputes an NYT report describing an Iraqi-brokered US ceasefire proposal as rejected by Tehran, blaming Washington instead. Neither government confirms a return to diplomacy.",color:"#dc2626",isUpcoming:false},
    {id:24,date:"Jul 25-29, 2026",label:"Five-night pause",note:"No US strikes on Iranian territory for five consecutive nights \u2014 the longest lull since the campaign resumed Jul 7. Trump says Iran requested the pause \u2018because we\u2019ve been hitting them very hard\u2019; Iran\u2019s Foreign Ministry denies any direct negotiations beyond ongoing Oman-mediated talks. Neither side calls it a ceasefire.",color:"#eab308",isUpcoming:false},
    {id:25,date:"Jul 29-30, 2026",label:"War reignites: Jordan base attack, Qeshm strike, Saudi Arabia joins",note:"Iran struck a US base in Jordan (intercepted); CENTCOM answered with a \u2018heavy wave\u2019 of strikes on dozens of IRGC targets, killing a family of three on Qeshm island per Iranian media, and the US sanctioned 10 entities and 8 tankers. Saudi Arabia conducted its first acknowledged direct strikes alongside the US, against Iranian-backed militias in Iraq. A drone also hit a US-owned LNG tanker at Egypt\u2019s Damietta port \u2014 initially reported with anonymous Iranian sources hinting at involvement.",color:"#dc2626",isUpcoming:false},
    {id:26,date:"Jul 30-31, 2026",label:"Retaliation widens; CENTCOM reviews Qeshm strike; Egypt denial",note:"Iran\u2019s retaliation for the Qeshm strike proved broader than first reported \u2014 IRGC claims hit US-linked targets across Kuwait, Jordan and Bahrain; Iraq\u2019s Iran-backed militias claim 20 killed, 32 wounded from US counter-strikes; more US troops wounded. CENTCOM says it is reviewing the Qeshm strike itself. Iran\u2019s Foreign Ministry has now officially denied any role in the Egypt tanker incident, walking back the earlier anonymous hints. Trump says he is \u2018losing faith\u2019 with Iran but has not ruled out a deal.",color:"#dc2626",isUpcoming:false},
    {id:27,date:"~Aug 16, 2026",label:"60-day MoU clock expires",note:"Window closes. Trump has said he could relaunch full military strikes if talks fail. If no deal, Iran could resume full enrichment and Hormuz re-closure.",color:"#ef4444",isUpcoming:true},
  ],taiwan:[{id:13,date:"Oct 1, 2025",label:"PLA median line crossings surge",note:"PLA aircraft and vessels crossing Taiwan Strait median line at record frequency — 200+ crossings in 2025.",color:"#eab308",isUpcoming:false},{id:14,date:"Feb 15, 2026",label:"Joint combat readiness patrol",note:"PLA Eastern Theater launched largest joint patrol exercise since 2023.",color:"#ef4444",isUpcoming:false},{id:15,date:"Jun 1, 2026",label:"CCG patrols east of Taiwan",note:"Japan-Philippines EEZ talks trigger PRC response beyond China own 10-dash line.",color:"#eab308",isUpcoming:false},{id:16,date:"Jun 18, 2026",label:"Taiwan defense budget raised",note:"Taiwan Legislature approved $19.7B defense budget — largest in history.",color:"#22c55e",isUpcoming:false},{id:161,date:"Jul 24, 2026",label:"China's first live-fire drill near Okinotori",note:"Directly contests a Japanese maritime claim, days after a Taiwan Strait live-fire exercise \u2014 widening friction to a second US treaty ally in the same week.",color:"#ef4444",isUpcoming:false}],"south-china-sea":[{id:17,date:"Jul 12, 2016",label:"UNCLOS Tribunal ruling",note:"PCA ruled China Nine-Dash Line has no legal basis. China rejected ruling as null and void.",color:"#22c55e",isUpcoming:false},{id:18,date:"Feb 1, 2021",label:"China Coast Guard Law enacted",note:"Authorizes CCG to use all necessary means including weapons against foreign vessels in claimed waters.",color:"#ef4444",isUpcoming:false},{id:19,date:"Mar 1, 2026",label:"EDCA sites expansion completed",note:"Philippines and US complete expansion to 9 EDCA military access sites.",color:"#5b8ec8",isUpcoming:false},{id:20,date:"Jun 3, 2026",label:"220 militia vessels — Whitsun Reef",note:"Largest maritime militia presence recorded at Whitsun Reef.",color:"#ef4444",isUpcoming:false},{id:21,date:"Jun 10, 2026",label:"Laser incident — Philippine helicopter",note:"Chinese vessel directed military-grade laser at PCG helicopter; pilot temporarily blinded.",color:"#ef4444",isUpcoming:false},{id:22,date:"Jun 24, 2026",label:"Water cannon attack — BRP Kalayaan",note:"CCG fired water cannons 18 minutes at Philippine supply boat. 2 sailors injured.",color:"#ef4444",isUpcoming:false},{id:23,date:"Jul 20, 2026",label:"CCG baton strike injures PH sailor — 2nd Thomas Shoal",note:"Chinese coast guard personnel struck a Philippine Navy sailor with a wooden baton during a confrontation near the BRP Sierra Madre. Rubio: US \u2018condemns China\u2019s dangerous and aggressive actions.\u2019",color:"#ef4444",isUpcoming:false},{id:24,date:"Jul 24, 2026",label:"3rd clash in a week — Scarborough Shoal",note:"CCG fired water cannon at Philippine vessels for the third confrontation in a single week. USS George Washington CSG transited the Luzon Strait Jul 22 in response; joint US-Philippines-Japan maritime drills followed.",color:"#ef4444",isUpcoming:false}],gaza:[{id:23,date:"Oct 10, 2025",label:"Ceasefire begins",note:"Fragile ceasefire following intensive international pressure. Hamas not disarming.",color:"#22c55e",isUpcoming:false},{id:24,date:"Jan 15, 2026",label:"1,000+ killed post-ceasefire",note:"UN: more than 1,000 Palestinians killed since the Oct 2025 ceasefire.",color:"#ef4444",isUpcoming:false},{id:25,date:"May 10, 2026",label:"ICJ orders aid corridor",note:"International Court of Justice orders Israel to open aid corridors. Only partial compliance.",color:"#f59e0b",isUpcoming:false},{id:26,date:"Jun 20, 2026",label:"UN flash appeal 13% funded",note:"$4B+ Gaza reconstruction appeal only 13% funded. Hospital system collapsed.",color:"#ef4444",isUpcoming:false},{id:52,date:"Jul 17, 2026",label:"Heaviest fire since ceasefire",note:"14+ killed in a single day including a funeral-procession strike; post-ceasefire toll passes 1,123. IDF cites control of ~65% of Gaza.",color:"#ef4444",isUpcoming:false}],venezuela:[{id:34,date:"Aug 2025",label:"Operation Southern Spear begins",note:"US Navy begins deploying warships and personnel to the Caribbean, citing the need to combat drug trafficking.",color:"#f97316",isUpcoming:false},{id:35,date:"Sep 2, 2025",label:"First lethal boat strike",note:"US strikes a vessel from Venezuela, killing all 11 aboard. Trump releases video; administration says operation will continue.",color:"#ef4444",isUpcoming:false},{id:36,date:"Nov 2025",label:"Secret Maduro-Trump contacts",note:"NYT reports Trump and Rubio spoke with Maduro by phone; a potential leaders' meeting reportedly discussed.",color:"#eab308",isUpcoming:false},{id:37,date:"Dec 2025",label:"Oil tanker seizures begin",note:"US seizures expand to sanctioned Venezuelan oil tankers as part of mounting pressure campaign.",color:"#f97316",isUpcoming:false},{id:38,date:"Jan 3, 2026",label:"Maduro captured — Operation Absolute Resolve",note:"~200 US special operations forces and 150 aircraft from 20 bases strike Caracas; Maduro and wife Cilia Flores captured and flown to New York to face narcoterrorism charges. Lasted ~2hrs 20min.",color:"#dc2626",isUpcoming:false},{id:39,date:"Jan 5, 2026",label:"Colombia's Petro threatens response",note:"Petro warns he would 'take up arms' if similar intervention occurred in Colombia. Thousands protest in Cúcuta near Venezuelan border.",color:"#f97316",isUpcoming:false},{id:40,date:"Jan 2026",label:"Rubio signals Cuba could be next",note:"Secretary of State Rubio: 'Cuban leaders should be concerned' — cites deep Cuban security/intelligence presence inside Venezuela's former government.",color:"#eab308",isUpcoming:false},{id:41,date:"Mar 6, 2026",label:"Strikes expand into Ecuador",note:"US strikes a target on the Colombia-Ecuador border, initially described as a FARC dissident compound; NYT later reports it was a dairy farm.",color:"#ef4444",isUpcoming:false},{id:42,date:"Jun 12, 2026",label:"Tren de Aragua leader killed",note:"US airstrike, conducted in coordination with Venezuelan authorities, kills Héctor 'Niño Guerrero' Guerrero Flores, leader of Tren de Aragua.",color:"#dc2626",isUpcoming:false},{id:43,date:"Jun 21, 2026",label:"221+ killed in boat strikes to date",note:"Wikipedia/AS-COA tracker: at least 221 people killed (17 missing presumed dead) across 64+ strikes on 65 vessels since Sept 2025 — UN data disputes the administration's underlying drug-trafficking-route claims.",color:"#ef4444",isUpcoming:false},{id:44,date:"Jan 29, 2026",label:"Executive Order 14380 — Cuba oil blockade",note:"Trump declares national emergency, authorizes tariffs on any country supplying oil to Cuba. NYT: first effective US blockade of Cuba since the 1962 Missile Crisis.",color:"#dc2626",isUpcoming:false},{id:45,date:"Dec 2025",label:"Venezuelan oil to Cuba cut off",note:"As part of the Venezuela intervention buildup, the US seizes tankers carrying Venezuelan oil bound for Cuba and declares a blockade on those exports — Cuba's main fuel lifeline severed a month before the broader blockade EO.",color:"#f97316",isUpcoming:false},{id:46,date:"Mar 13, 2026",label:"Díaz-Canel confirms talks with US",note:"Cuban First Secretary publicly confirms diplomatic talks aimed at addressing the oil/energy blockade. Cuba releases 51 political prisoners as part of the opening; 2,000+ more released by Apr 3.",color:"#eab308",isUpcoming:false},{id:47,date:"Mar 30, 2026",label:"Russian oil tanker defies blockade",note:"100,000-tonne Russian crude shipment arrives in Havana — described by CSIS as calculated blockade-running timed to avoid a showdown while the Iran war was still active. A reported second shipment later turned back.",color:"#f97316",isUpcoming:false},{id:48,date:"May 14, 2026",label:"Cuba: out of oil and diesel",note:"Cuban Ministry of Energy and Mines warns the country has run out of oil and diesel entirely.",color:"#ef4444",isUpcoming:false},{id:49,date:"May 21, 2026",label:"Raúl Castro indicted",note:"US indicts former Cuban leader (believed by some critics to still govern as an éminence grise) over the 1996 Brothers to the Rescue shootdown — a move analysts compare to the pre-capture indictment pattern used against Maduro.",color:"#dc2626",isUpcoming:false},{id:50,date:"Jun 2026",label:"OHCHR documents humanitarian collapse",note:"Infant mortality risen to 9.9/1,000 births, childhood cancer survival down to 65%, food production down 60%, medicine supplies at only 30% of normal levels — UN attributes the deterioration to the blockade.",color:"#dc2626",isUpcoming:false},{id:51,date:"Jul 8, 2026",label:"Cuba takes blockade to UN General Assembly",note:"FM Rodríguez: record $8B in damage Mar 2025–Feb 2026 (+7% YoY), excluding the fuel blockade's impact; talks with Washington have made 'no progress.' US Amb. Waltz: 'There is no American blockade.' Procedural vote passed 136-9-30 — but Germany and Canada abstained, signaling erosion of Cuba's traditional UN support under US lobbying.",color:"#f97316",isUpcoming:false}]};
const BRIEFING={summaryShort:"Russian losses reached 1,451,750+ (+1,240 on Aug 3, down from the 1,300–1,500 range of recent days) per the General Staff. Ukraine launched a wide drone attack overnight into Aug 4, hitting logistics and oil infrastructure across Russia; Wildberries alone has lost over 17% of its logistics infrastructure to strikes in recent weeks. Iran: the diplomatic whiplash continued into Aug 4 — Rubio says a Hormuz deal has 'progress but not finality,' Bessent floated a resolution 'today or tomorrow,' and Iran/Oman are reportedly closing in on a channel-sharing accord with a shared service fee — but Iran's FM spokesman says no delegations or negotiators are being dispatched, and a second cargo ship was attacked near Oman overnight, sending Brent crude up 2.7%. Zelensky's Moscow-bombing/Chayko story and the Fedorov crisis remain unresolved from prior updates.",summary:"Russian combat losses climbed to roughly 1,451,750 as of the Aug 4 General Staff report (+1,240 on Aug 3), a somewhat lighter day after a stretch of 1,300–1,500+ daily losses. Ukraine's military conducted a wide-ranging drone attack overnight into Aug 4, reportedly striking logistics and oil infrastructure in multiple Russian regions, per Russian Telegram channels cited by the Kyiv Independent — part of a sustained campaign that has damaged more than 17% of Wildberries' entire logistics infrastructure in just a few weeks, according to RBC-Ukraine. Iran policy remains in its now-familiar whiplash pattern: Tuesday brought cautiously optimistic signals from Washington — Secretary of State Rubio said there's 'progress but not finality' on a Hormuz deal and stressed that 'the straits are open' with oil already moving through them, while Treasury Secretary Bessent floated a resolution as soon as 'today or tomorrow.' Iranian and US officials describe an emerging Iran-Oman arrangement in which inbound Gulf traffic transits an Iran-controlled channel and outbound traffic uses a channel near Oman, with a shared 'service fee' for security and environmental costs — though a US official disputed that any Iranian permissions or tolls would be involved, and Iran's Foreign Ministry spokesman said no delegations or negotiators are being sent abroad 'in the coming days,' maintaining Tehran's position that it isn't in direct talks with Washington. Underscoring the gap between the diplomatic signaling and the situation on the water, a second cargo vessel was struck by a projectile overnight near Oman — UKMTO reports the crew abandoned ship and one seafarer is missing — and Brent crude rose 2.7% Tuesday on the renewed uncertainty. Qatar's Foreign Ministry separately says talks are in 'very progressive stages' with draft agreement text 'being circulated,' though it stresses there's no direct US-Iran channel. Elsewhere: Ukraine's Fedorov political crisis remains unresolved, and the Aug 1 Moscow bombing/Gen. Chayko story has seen no official confirmation either way.",watch:"Whether Trump's 'today or tomorrow' timeline for a Hormuz resolution actually produces something concrete, or becomes the latest in a months-long pattern of announced-then-stalled progress; whether the second Oman-area vessel attack escalates tensions further even as diplomatic channels claim progress; and whether Ukraine's overnight drone campaign against Russian logistics draws a proportional response.",generatedAt:new Date().toISOString()};
const UKRAINE_BRIEFING={summaryShort:"A bomb killed 3 at a Moscow restaurant Aug 1 in what multiple sources describe as an assassination attempt on Gen. Alexander Chayko, Russia's Aerospace Forces commander and a Bucha war-crimes suspect — still unconfirmed either way. Russian losses reached roughly 1,451,750 (+1,240) as of the Aug 4 General Staff report, a lighter day after a stretch of 1,300–1,500+ losses. Ukraine launched a wide overnight drone attack into Aug 4 against Russian logistics and oil infrastructure; the Wildberries strike campaign alone has now damaged over 17% of the retailer's logistics network. Fedorov/Syrskyi crisis remains unresolved.",summary:"The Moscow bombing remains the week's most striking unresolved story. A bomb delivered by a female courier detonated at the Balzi Rossi restaurant on the evening of Aug 1, killing her, a security guard who'd refused her entry, and a third victim, with 20+ injured, per Russia's National Anti-Terrorism Committee. Multiple Russian and Ukrainian outlets, and a source who spoke to the Kyiv Independent, say the actual target was Gen. Alexander Chayko — appointed commander of Russia's Aerospace Forces in May 2026, wanted in Ukraine for war crimes tied to his command of forces that occupied Bucha in 2022. Neither Russian authorities nor Ukraine has confirmed it as a targeted operation as of this report. Russia's own attrition continues at a somewhat lighter pace: cumulative losses reached roughly 1,451,750 as of the Aug 4 General Staff report (+1,240 on Aug 3), down from the 1,300–1,500+ daily range seen over the prior several days, though RBC-Ukraine reports Russia is still losing up to 40,000 personnel a month, with contract recruitment no longer sufficient to replace losses and internal Kremlin discussion reportedly turning to a new mobilization wave. Ukraine's military conducted a wide drone attack overnight into Aug 4, reportedly hitting logistics and oil infrastructure across multiple Russian regions per Russian Telegram channels — part of a sustained campaign against Wildberries' logistics network that has now damaged more than 17% of the retailer's total infrastructure in just a few weeks. The Engels-2/Saratov deep-strike campaign from Aug 1-2 remains the recent high-water mark for long-range strikes. Separately, Ukraine's Ambassador to NATO Matthew Whitaker said Washington is unlikely to reach a joint Patriot-production agreement with Ukraine before this winter, confirming the Jul 31 licensing walkback has real near-term consequences rather than being a rhetorical reversal.",assessment:[{cat:"Covert War",text:"The Aug 1 Moscow restaurant bombing that killed 3 and injured 20+ is widely reported, though still not officially confirmed, to have targeted Gen. Alexander Chayko, commander of Russia's Aerospace Forces and a Bucha war-crimes suspect. Follows a late-July attempt on a Ukrainian brigade commander in Kharkiv via a Russian-recruited asset posing as the SBU."},{cat:"Attrition",text:"Cumulative Russian losses reached roughly 1,451,750 as of the Aug 4 General Staff report (+1,240 on Aug 3) — a lighter day after a stretch running 1,300–1,500+. Russia is still losing up to 40,000 personnel a month per RBC-Ukraine, with contract recruitment reportedly no longer covering losses, prompting internal Kremlin talk of a new mobilization wave."},{cat:"Territory",text:"Russian advance remains grinding — Pokrovsk and the Sloviansk sector are the hottest points on the front, with Ukrainian counterattacks reportedly denying further Russian gains around Sloviansk on Aug 1-2. Monthly gain estimates diverge sharply by source (DeepState vs. ISW), among the slowest rates of any war in the past century either way."},{cat:"Deep Strikes",text:"Ukraine's overnight Aug 4 drone campaign hit logistics and oil infrastructure across Russia, continuing a sustained economic-target strategy that has now damaged over 17% of Wildberries' logistics network. The Aug 1-2 strikes on the Engels-2 strategic bomber base and Saratov refinery remain the campaign's most significant recent long-range escalation."},{cat:"Air Defense",text:"NATO Ambassador Matthew Whitaker said Aug 3 that a joint US-Ukraine Patriot-production deal is unlikely before winter, confirming the Jul 31 licensing walkback carries real operational consequences following the Aug 1 Kyiv attack (1 of 27 ballistic missiles intercepted)."},{cat:"Political",text:"Fedorov's dismissal remains a full command shake-up with no resolution: Zelensky replaced Commander-in-Chief Syrskyi with Mykhailo Drapatyi and General Staff chief Andrii Hnatov with Ihor Skybiuk. Separately, Ukraine imposed a new round of sanctions on the Russian defense industry via an Aug 3 presidential decree."}],watch:"Whether Russian authorities confirm or deny Chayko was the target of the Moscow bombing; whether Russia retaliates specifically against the overnight Aug 4 drone campaign or the Engels-2 strike; and whether Pokrovsk and Sloviansk hold against an otherwise favorable attrition picture.",generatedAt:new Date().toISOString()};
const IRAN_BRIEFING={summaryShort:"Rubio says a Hormuz deal has 'progress but not finality'; Bessent floated a resolution 'today or tomorrow.' Iran and Oman are reportedly nearing a channel-sharing accord — inbound Gulf traffic via an Iran-controlled channel, outbound via a channel near Oman, with a shared service fee — though a US official disputes any Iranian tolls or permissions being involved, and Iran's FM spokesman says no delegations are being sent abroad. A second cargo ship was attacked near Oman overnight; Brent crude rose 2.7%. Core gaps — enrichment, missiles, Hormuz governance — remain unresolved with roughly 12 days left on the nominal MoU clock.",summary:"Tuesday brought the most concrete-sounding signals yet on a possible Hormuz resolution, though the underlying disagreement between Washington and Tehran hasn't actually closed. Secretary of State Rubio said there's 'progress but not finality' on an agreement, while stressing that in the meantime 'the straits are open' — ships and oil are already moving through, he said, distinguishing the immediate shipping question from the longer-term denuclearization talks. Treasury Secretary Bessent went further, floating a possible resolution 'today or tomorrow.' Iranian and US officials describe an emerging Iran-Oman arrangement: vessels entering the Gulf would transit a channel controlled by Iran, while vessels leaving use a channel near Oman, with a 'service fee' covering security, staffing and environmental costs split between the two countries. But the account isn't clean — a US official familiar with the negotiations said any 'temporary' routes would not involve Iranian permissions or tolls, directly contradicting the Iranian side's description, and Iran's Foreign Ministry spokesman Esmaeil Baqaei said Tehran has no plans to host foreign delegations or send negotiators abroad 'in the coming days,' reaffirming its position that it is not in direct talks with Washington. Qatar's Foreign Ministry, mediating a separate diplomatic track, said Tuesday that efforts are 'in very progressive stages' with draft agreement text 'being circulated,' while also confirming there is no direct US-Iran channel. Underscoring the gap between diplomatic signaling and conditions on the water, a second cargo vessel was struck by an unidentified projectile overnight near Oman — UKMTO reports the crew abandoned ship and one seafarer remains missing — and Brent crude rose 2.7% Tuesday, reversing Monday's decline on the fresh uncertainty. Trump reiterated Monday that he wants a deal 'today or tomorrow' or Iran faces 'devastating air strikes,' framing it as Iran's 'last chance... before decapitation.' None of the core negotiating gaps — uranium enrichment, the missile program, formal Hormuz shipping governance, IAEA access to bombed sites — have visibly moved. The nominal 60-day Islamabad MoU window, signed Jun 17, closes around Aug 16 — roughly 12 days out.",assessment:[{cat:"Diplomacy — Shipping Deal",text:"Rubio: 'progress but not finality' on a Hormuz agreement; Bessent floated resolution 'today or tomorrow.' Emerging Iran-Oman framework reportedly splits Gulf traffic into inbound (Iran-controlled channel) and outbound (Oman-area channel) lanes with a shared service fee — but a US official disputes Iranian tolls/permissions being involved, an unresolved discrepancy in the two sides' accounts."},{cat:"Diplomacy — Denial",text:"Iran's Foreign Ministry spokesman Baqaei says no delegations or negotiators are being sent abroad 'in the coming days,' maintaining that Tehran isn't in direct talks with Washington — consistent with the pattern of the US claiming imminent talks while Iran denies them that has repeated for weeks."},{cat:"Escalation Risk",text:"A second cargo vessel was struck by an unidentified projectile near Oman overnight into Aug 4 — UKMTO reports the crew abandoned ship and one seafarer is missing. Combined with Trump's 'devastating air strikes' threat if no deal materializes 'today or tomorrow,' the risk of renewed escalation remains live even amid diplomatic signaling."},{cat:"Markets",text:"Brent crude rose 2.7% Tuesday, reversing Monday's 4.2% drop, reflecting market skepticism about the diplomatic process rather than confidence in an imminent resolution — shipping analysts quoted by CNN describe the mood as 'less upbeat' than administration officials."},{cat:"Diplomacy/MoU",text:"Qatar's Foreign Ministry says talks are in 'very progressive stages' with draft agreement text 'being circulated,' via Qatari mediation rather than a direct US-Iran channel. Enrichment rights, the missile program, and formal Hormuz governance remain unresolved with roughly 12 days left on the nominal MoU clock (window closes ~Aug 16)."},{cat:"Iran Domestic",text:"No confirmed public appearance by successor Supreme Leader Mojtaba Khamenei since his father's Jul 9-10 burial — now nearly four weeks with no image, video or voice recording, though a photo of an Iranian woman holding his portrait circulated in Tehran press coverage Aug 4."}],watch:"Whether Trump's 'today or tomorrow' timeline actually produces a finalized Hormuz arrangement, or becomes the latest missed marker in a months-long pattern; whether the discrepancy between the US and Iranian accounts of the shipping deal gets resolved or becomes its own flashpoint; and whether the second Oman-area vessel attack draws a formal response from either side.",generatedAt:new Date().toISOString()};
const ESCALATION_RISKS=[
  {theater:"Iran – US / Gulf",icon:"🇮🇷",level:"SEVERE",color:"#dc2626",text:"The only theater with sustained direct combat between a nuclear-armed power's forces and a state adversary. Hormuz blockade, a fortified nuclear-site target under explicit threat, and rising US/Iranian casualties push this to the top of the board."},
  {theater:"Russia – Ukraine / NATO",icon:"🇺🇦",level:"ELEVATED",color:"#f97316",text:"Deep NATO-member materiel and licensing involvement (Patriot co-production, intelligence-cued strikes) without direct NATO-Russia combat. Nuclear rhetoric remains coercive rather than operational per IC consensus — China's tacit red line is the main restraint on Moscow."},
  {theater:"Israel & the Levant",icon:"🇮🇱",level:"ELEVATED",color:"#f97316",text:"Post-ceasefire violence running at a higher tempo than the truce implies, with Lebanon and Syria fronts both live. Contained to regional actors so far — no direct US or Iranian state-on-state exchange tied to this front specifically."},
  {theater:"Indo-Pacific / Taiwan & SCS",icon:"🇹🇼",level:"MODERATE",color:"#eab308",text:"Grey-zone coercion (militia swarms, live-fire drills, laser/water-cannon incidents) at record frequency, now extending to Japan's Okinotori. No kinetic engagement between PLA and US/allied forces — the gap between friction and war remains wide but is narrowing."},
  {theater:"Americas / Venezuela & Cuba",icon:"🇻🇪",level:"MODERATE",color:"#eab308",text:"A US regional-intervention campaign (Maduro's capture, Cuba oil blockade) rather than a great-power confrontation — Russia's blockade-running tanker to Havana is the closest brush with direct great-power friction in this theater."},
  {theater:"Global Nuclear Threshold",icon:"☢️",level:"MODERATE",color:"#eab308",text:"New START's Feb 2026 lapse leaves the two largest arsenals uncapped for the first time since 1972; Iran's enrichment clock and Belarus-based Russian tactical weapons add live vectors. No state has crossed a use-threshold."},
  {theater:"Direct Great-Power Combat",icon:"⚖️",level:"LOW",color:"#22c55e",text:"No US, Russian, or Chinese regular forces are in direct combat with one another anywhere on the board — the structural line that separates today's multi-theater tension from an actual world war remains, for now, intact."},
];
const ESCALATION_BRIEFING={summaryShort:"No two nuclear-armed states have their own regular forces in direct combat with each other — that remains the load-bearing fact keeping today's multiple, simultaneous crises short of a world war. But the margin has narrowed: an active US-Iran shooting war, NATO materiel flowing deep into a grinding Russia-Ukraine attrition fight, record Taiwan Strait/SCS grey-zone activity, and a lapsed New START treaty all stress the same finite pool of interceptors, deterrence bandwidth and diplomatic attention at once. Iran and the nuclear threshold are the two variables most likely to move this assessment.",summary:"A global escalation assessment has to separate two different questions: how many dangerous fronts are live, and whether any of them involve direct combat between the states whose own war would actually be systemic — the US, Russia, and China. On the first question, the answer is uncomfortably high: an active shooting war between US forces and Iran with real casualties on both sides and a fortified nuclear site under explicit threat; a grinding Russia-Ukraine attritional war in which NATO members supply licensing, intelligence and deep-strike-enabling materiel without their own troops engaging Russian forces directly; sustained post-ceasefire violence in Gaza with live Lebanon and Syria fronts; record-frequency Chinese grey-zone coercion against Taiwan and in the South China Sea, now extending to a first-ever challenge near Japan's Okinotori; and a US regional-intervention campaign in the Western Hemisphere spanning Venezuela's captured government and a hardening Cuba blockade. On the second, more decisive question, the picture is calmer: no US, Russian, or Chinese regular military unit is presently in direct combat with another nuclear power's regular forces anywhere on the board. That distinction — many live regional wars, zero direct great-power wars — is the single most load-bearing fact in any 'is this becoming World War 3' assessment, and it still holds. What has changed for the worse is the shared infrastructure underneath all of it: New START's Feb 2026 lapse leaves the US and Russian arsenals uncapped for the first time since 1972; the Iran war is visibly draining the same Patriot/PAC-3 stockpile Ukraine depends on, meaning stress in one theater now measurably degrades deterrence capacity in another; and IC assessments describe Russian nuclear rhetoric around Ukraine as coercive signalling rather than operational planning, restrained chiefly by Moscow's need to keep Chinese backing rather than by any formal treaty. The two variables most likely to move this assessment materially worse are (1) whether the Iran war crosses from conventional strikes into an attack on the hardened Pickaxe Mountain nuclear site that Tehran has called an explicit red line, and (2) whether Taiwan Strait or South China Sea grey-zone friction produces a first kinetic incident between PLA and US/allied forces. Short of either, the analysis below assesses the aggregate risk of a systemic, multi-great-power war as elevated relative to any point since the Cold War's end, but still short of imminent.",assessment:[{cat:"Iran/Gulf",text:"The sharpest edge on the board. CENTCOM strikes running in consecutive nightly waves, a US B-1 sortie flown for the first time this phase of the war, cumulative US deaths in the double digits, and a president publicly weighing further escalation against a nuclear site Tehran calls a red line. Brent past $100 and a second Red Sea chokepoint (Bab el-Mandeb) now under active Houthi attack — rather than just threat — signal the economic-coercion loop is tightening alongside the military one."},{cat:"Russia/Ukraine/NATO",text:"Structurally a proxy-materiel war, not a NATO-Russia war: alliance members supply licensing, intelligence cueing and air-defense hardware, but no NATO member's own forces are engaging Russian forces directly. Russia's own attrition math (~8:1 loss ratio per CSIS) argues against Moscow choosing to widen the war voluntarily; the more likely escalation path runs through Belarus (forward-based tactical warheads, a growing Oreshnik footprint) rather than a direct Russia-NATO clash."},{cat:"Israel & Levant",text:"Post-ceasefire violence at its highest tempo since the truce, with Lebanon and Syria both carrying live-fire risk of their own. The absence of a fully authoritative governance transition (Board of Peace/NCAG) leaves the underlying dispute unresolved even as the shooting continues at a lower boil than open war — a pattern that keeps this theater dangerous without yet functioning as an escalation trigger for outside powers."},{cat:"Indo-Pacific",text:"The friction curve is rising in both frequency and audacity — 220+ militia vessels at Whitsun Reef, a laser strike that temporarily blinded a Philippine pilot, and a first-ever PLA live-fire exercise near Japan's Okinotori disputing Tokyo's own EEZ claim. All of it stays calibrated below the armed-conflict threshold by design; the risk is less a deliberate PLA decision to fight and more an accident or miscalculation during an already-dense pattern of close encounters."},{cat:"Americas",text:"A unilateral US regional-intervention campaign rather than a great-power confrontation: Maduro's capture and prosecution, an effective Cuba oil blockade the UN links to a documented humanitarian toll, and boat strikes UN data disputes on undercount grounds. The closest brush with direct great-power friction remains Russia's blockade-running tanker delivery to Havana — notable but a single incident, not a pattern."},{cat:"Nuclear/Strategic",text:"The treaty architecture is eroding faster than any single crisis: New START's Feb 2026 expiry leaves both major arsenals uncapped for the first time in over 50 years, China's arsenal is growing at the fastest rate of any state, and Iran's enrichment clock runs against an MoU deadline both sides increasingly treat as overtaken by events. None of this represents crossed thresholds, but it removes guardrails that would matter if any single theater above deteriorated further."},{cat:"Cross-Theater Stress",text:"The clearest structural warning sign isn't any one front but the shared resource pool underneath all of them — Ukraine's Patriot/PAC-3 shortage is explicitly worsened by the same interceptor stocks the Iran war is drawing down, and US Congressional gridlock over Iran war authorization has already delayed unrelated defense appropriations that Ukraine funding typically rides alongside. Simultaneous crises are degrading each other's response capacity even without direct linkage in cause."}],watch:"Whether the Iran war crosses into a strike on the Pickaxe Mountain site Tehran calls a red line; whether Taiwan Strait/SCS friction produces a first PLA-US/allied kinetic incident; and whether the Patriot/PAC-3 shortage becomes acute enough in either Ukraine or the Gulf to force a visible capability trade-off between the two live wars.",generatedAt:new Date().toISOString()};
const TICKER_ITEMS=NEWS.map(n=>({tag:n.severity==="critical"?"Breaking":n.conflict,color:n.severity==="critical"?"#ef4444":n.conflictColor,text:n.headline}));
const DEADLINES=[{date:"Resolved",target:new Date("2026-06-22T00:00:00Z"),label:"Belarus Ultimatum — Elapsed",icon:"🇧🇾",color:"#22c55e",desc:"Window closed Jun 22 with partial compliance (relay shutdown). No further Ukrainian strikes on Belarusian territory followed — treated as a closed case pending any reversal."},{date:"Jul 7–8",target:new Date("2026-07-07T09:00:00Z"),label:"NATO Ankara Summit",icon:"🤝",color:"#5b8ec8",desc:"CONCLUDED, but the Patriot outcome didn't hold. Allies pledged $80B (~€70B) for Ukraine in 2026 and reaffirmed Article 5; Trump's apparent green light for Europe/Ukraine to produce Patriot missiles under license was walked back Jul 31 — he told a Cabinet meeting the US has 'not agreed' to license the technology, directly contradicting Zelensky's Jul 9 claim a deal was reached. Exposed starkly by the Aug 1 Kyiv attack (1 of 27 ballistic missiles intercepted). Russia's Turkish ceasefire push was rejected before the summit began."},{date:"Jul 24",target:new Date("2026-07-24T00:00:00Z"),label:"Ukraine Protest Deadline — Elapsed",icon:"🇺🇦",color:"#dc2626",desc:"Deadline passed Jul 24 without resolution — BBC reports Zelensky is 'struggling to fix' the crisis. Fedorov still refuses any role but reinstatement; protests continue into a second week with no new defense minister named."},{date:"~Aug 16",target:new Date("2026-08-16T00:00:00Z"),label:"Iran Nuclear Deadline",icon:"☢️",color:"#8b5cf6",desc:"60-day MoU window closes. Trump: could relaunch attacks if talks fail."}];
const GLOBAL_TOLL={deaths:"~850K+",displaced:"~29M+",note:"Approximate aggregate across all 8 tracked conflicts. Heterogeneous sourcing and methodology per theater — see individual theater pages for ranges and citations. Not an official or precise figure."};
const ENERGY_DISRUPTIONS=[
  {icon:"🛢️",label:"Russian refining capacity",text:"~40% offline from Ukraine's deep-strike campaign on refineries. Russia importing gasoline from Asia by sea for the first time in decades (Reuters, Jun 17).",color:"#ef4444"},
  {icon:"🚢",label:"Strait of Hormuz",text:"Effectively closed. Daily crossings have collapsed to roughly 9 vessels versus a ~130/day pre-war average, with Iran attacking tankers and the US enforcing a blockade of Iran's entire coastline since Jul 14. Brent has topped $92/bbl.",color:"#dc2626"},
  {icon:"🚨",label:"Bab el-Mandeb",text:"Houthis declared the strait off limits to Saudi Arabia on Jul 21-22 and warned international shipping away — roughly 2.5M barrels/day at risk. Six ships turned course and Saudi-loaded tankers backed out; a second chokepoint now compromised alongside Hormuz.",color:"#dc2626"},
  {icon:"⛽",label:"Cuba oil blockade",text:"US blockade since Jan 2026 has left Cuba without domestic oil or diesel reserves (May 14 Cuban government statement) — the most severe ongoing fuel crisis in the dataset.",color:"#dc2626"},
  {icon:"🇻🇪",label:"Venezuela export disruption",text:"Venezuelan oil exports to Cuba cut off Dec 2025 as part of the pre-Maduro-capture pressure campaign — the proximate trigger for Cuba's blockade-driven shortage.",color:"#f97316"},
  {icon:"⚓",label:"US sanctions on Russian seaborne oil",text:"Reimposed Jun 28 after temporary waivers expired — tightens economic pressure on Russia alongside the refinery damage.",color:"#22c55e"},
];
const POLITICAL_CALENDAR=[
  {date:"Jul 7-8, 2026",label:"NATO Ankara Summit — CONCLUDED",note:"$80B allied pledge for 2026; Article 5 reaffirmed. The Patriot manufacturing license, apparently agreed at political level, was walked back by Trump on Jul 31 ('we have not agreed to that') — contradicting Zelensky's Jul 9 claim and exposed by the Aug 1 Kyiv attack's 1-of-27 intercept rate. Russia had rejected Turkey's ceasefire push — negotiating track remains blocked. See Ukraine → NATO tab.",color:"#22c55e"},
  {date:"Jul 24, 2026",label:"Ukraine protest deadline on Fedorov — ELAPSED",note:"Deadline passed without resolution; BBC reports Zelensky is 'struggling to fix' the crisis as of Jul 24. Fedorov still refuses any role but reinstatement; protests continue into a second week across Kyiv, Lviv, Odesa and Dnipro with no new defense minister confirmed.",color:"#dc2626"},
  {date:"~Aug 16, 2026",label:"Iran MoU 60-day deadline",note:"Window for a final nuclear deal closes. Trump has said he could relaunch strikes if talks fail.",color:"#8b5cf6"},
  {date:"Sept 2026",label:"Russia Duma elections",note:"United Russia formally claimed as Putin's party for the first time since 2007; top candidates are long-standing loyalists.",color:"#ef4444"},
  {date:"TBD 2026",label:"Serbia snap elections",note:"Vucic resigned amid sustained student-led protests; snap elections now pending. A pro-Russia Balkan anchor is in flux ahead of the vote — outcome could shift Serbia's alignment.",color:"#f59e0b"},
  {date:"TBD",label:"Venezuela political transition",note:"Rodríguez's 180-day interim mandate expired Jul 3, now complicated by Jun 24 earthquake recovery. Machado, widely seen as the 2024 election's actual winner, wants to return but the US has discouraged it.",color:"#dc2626"},
];
const CYBER_HYBRID=[
  {icon:"🛰️",label:"GPS jamming over Venezuela",text:"Bloomberg reported extensive GPS jamming in Venezuelan airspace in the weeks before Maduro's capture — source unconfirmed, consistent with both Venezuelan defensive countermeasures and US operational prep.",color:"#dc2626",confidence:"Reported"},
  {icon:"🗣️",label:"Kremlin cognitive warfare re: Belarus",text:"ISW (Jun 23-24): Kremlin running an information campaign to frame any Ukrainian strikes on legitimate Belarusian military targets (e.g. Shahed relay stations) as unprovoked escalation against the Union State.",color:"#ef4444",confidence:"Reported"},
  {icon:"🎣",label:"China maritime grey-zone tactics",text:"Maritime militia swarms (220+ vessels at Whitsun Reef) and water-cannon incidents function as deniable coercion below the threshold of armed conflict — full detail in S. China Sea & Taiwan → Incidents tab.",color:"#f97316",confidence:"Confirmed"},
  {icon:"📡",label:"Disputed narrative: Iran drone attribution",text:"The Jun 26 Hormuz drone-attack claim that triggered US retaliatory strikes has not been independently verified — illustrates the attribution problem common to hybrid/grey-zone incidents.",color:"#8b5cf6",confidence:"Disputed"},
];
const LEGAL_TRACKER=[
  {icon:"⚖️",label:"ICC arrest warrants — Netanyahu & Gallant",theater:"Gaza",text:"Issued Nov 2024 for war crimes and crimes against humanity. Enforcement limited — Netanyahu has avoided ICC member states.",color:"#f59e0b"},
  {icon:"🏛️",label:"ICJ genocide case — South Africa v. Israel",theater:"Gaza",text:"Ongoing at the International Court of Justice; provisional measures issued requiring Israel to prevent genocidal acts. Israel contests the characterization.",color:"#f59e0b"},
  {icon:"🔴",label:"Raúl Castro indictment",theater:"Caribbean",text:"Indicted May 21, 2026 over the 1996 Brothers to the Rescue shootdown — a pattern analysts compare to the pre-capture indictment used against Maduro.",color:"#dc2626"},
  {icon:"⚓",label:"Maduro & Flores narcoterrorism trial",theater:"Caribbean",text:"Captured Jan 3, 2026 and flown to New York to face narcoterrorism charges — trial ongoing.",color:"#dc2626"},
  {icon:"🇺🇸",label:"Congressional war-crimes investigations",theater:"Caribbean",text:"Bipartisan House and Senate Armed Services investigations open into Operation Southern Spear boat strikes, including the alleged 'double-tap strike' on disabled vessels.",color:"#f97316"},
];
const SANCTIONS_TRACKER=[
  {icon:"🛢️",label:"EU adopts 21st sanctions package, freezes oil price cap",theater:"Russia",text:"The EU formally adopted its 21st Russia sanctions package Jul 23 — suspending automatic rises in the price cap through Jul 2027, adding 32 banks to the transaction ban list, banning LNG terminal services for Russian entities, and sanctioning 200+ individuals and entities across finance, energy, crypto and the shadow fleet. A parallel Belarus package was adopted alongside it.",color:"#5b8ec8"},
  {icon:"🚢",label:"632 shadow-fleet vessels banned",theater:"Russia",text:"EU's 20th sanctions package (Apr 2026) brought the sanctioned-tanker list to 632, plus a first-ever third-country port listing (Indonesia) for price-cap circumvention. Enforcement gaps remain — Urals crude traded ~$74-82/barrel in May, still far above the $44.10 cap.",color:"#5b8ec8"},
  {icon:"📜",label:"Putin extends counter-sanctions to 2027",theater:"Russia",text:"Jun 26: Putin extended Russia's retaliatory ban on selling oil to any buyer using the G7/EU price-cap mechanism through end-2027 — signaling Moscow expects the sanctions standoff to persist for years, not months.",color:"#ef4444"},
  {icon:"🏦",label:"$6B of Iran's frozen assets releasing",theater:"Iran",text:"Implementation of the Jun 17 MoU's Clause 11 continues: $6B of $12B in Qatar-frozen Iranian funds moving toward release as part of the sanctions-relief track, even as the broader nuclear inspection regime remains stalled.",color:"#8b5cf6"},
  {icon:"🏛️",label:"Congress split on new Russia sanctions",theater:"Russia",text:"The Ukraine Support Act (mandatory sanctions on Russian banks, oil firms, tankers) passed the House 226-195 (Jun 4) but faces a likely Trump veto over its lack of presidential waiver flexibility — stalled in the Senate.",color:"#eab308"},
];


// ── Primitives ──────────────────────────────────────────────────────────────────
const Pill=({label,color})=><span style={{background:color+"22",border:`1px solid ${color}55`,borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:700,color,letterSpacing:".04em",textTransform:"uppercase",flexShrink:0,whiteSpace:"nowrap"}}>{label}</span>;
const ConfidenceTag=({level})=>{
  if(!level) return null;
  if(level==="Disputed") return <span className="redact-tag" title="Disputed — sourcing or attribution is contested">Disputed</span>;
  return <Pill label={level} color={level==="Confirmed"?"#22c55e":"#5b8ec8"}/>;
};
const Card=({t,children,style,onClick})=><div onClick={onClick} style={{background:t.isDark?"linear-gradient(180deg,rgba(120,160,220,.10),rgba(255,255,255,0) 45%),"+t.card:"linear-gradient(180deg,rgba(255,255,255,.35),rgba(255,255,255,0) 22%),"+t.card,borderRadius:12,marginBottom:10,border:`1px solid ${t.border}`,borderTop:t.isDark?"1px solid rgba(255,255,255,.16)":`1px solid rgba(255,255,255,.7)`,overflow:"hidden",boxShadow:t.isDark?"0 6px 20px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.08)":"0 4px 14px rgba(59,130,246,.16),inset 0 1px 0 rgba(255,255,255,.6)",...style}}>{children}</div>;
const ST=({t,children,color})=><h2 style={{fontSize:11,fontWeight:700,color:color??t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:8,marginTop:18,paddingLeft:9,borderLeft:`3px solid ${color??(t.isDark?"#5b8ec8":"#3a4a5c")}`,lineHeight:1.3}}>{children}</h2>;
const Row=({t,children,last})=><div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px",borderBottom:last?0:`.5px solid ${t.sep}`}}>{children}</div>;
const Hero=({t,children,style})=><div style={{background:"linear-gradient(135deg,#091220 0%,#0e1d32 100%)",borderRadius:14,padding:"16px 16px 14px",marginBottom:12,border:"1px solid rgba(59,130,246,0.2)",color:"#fff",...style}}>{children}</div>;
const Grid2=({t,items})=><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>{items.map((item,i)=><div key={i} style={{background:t.isDark?"rgba(255,255,255,0.04)":"rgba(20,40,70,0.05)",borderRadius:10,padding:"10px 12px",border:`1px solid ${item.color}22`,minWidth:0}}>{item.icon&&<div style={{fontSize:18,marginBottom:4}}>{item.icon}</div>}<div style={{fontSize:item.vs??22,fontWeight:800,color:item.color,lineHeight:1.1,fontVariantNumeric:"tabular-nums",overflowWrap:"break-word",wordBreak:"break-word"}}>{item.val}</div><div style={{fontSize:11,fontWeight:700,color:t.isDark?"rgba(255,255,255,.7)":t.text,marginTop:2}}>{item.label}</div>{item.sub&&<div style={{fontSize:10,color:t.isDark?"rgba(255,255,255,.4)":t.sub,marginTop:1,lineHeight:1.35}}>{item.sub}</div>}</div>)}</div>;
const Note=({t,children,color})=><div style={{background:color+"11",border:`1px solid ${color}30`,borderRadius:8,padding:"9px 12px",fontSize:11.5,color:t.sub,lineHeight:1.55,marginBottom:10}}>{children}</div>;
const ReadAloudButton=({text,color,t})=>{
  const[speaking,setSpeaking]=useState(false);
  const[supported,setSupported]=useState(false);
  useEffect(()=>{if(typeof window!=="undefined"&&"speechSynthesis" in window)setSupported(true);},[]);
  useEffect(()=>()=>{if(typeof window!=="undefined"&&"speechSynthesis" in window)window.speechSynthesis.cancel();},[]);
  if(!supported) return null;
  const toggle=()=>{
    if(speaking){window.speechSynthesis.cancel();setSpeaking(false);return;}
    window.speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.rate=1.0;u.pitch=1.0;
    u.onend=()=>setSpeaking(false);
    u.onerror=()=>setSpeaking(false);
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  };
  return <button onClick={toggle} aria-label={speaking?"Stop reading aloud":"Read aloud"} style={{display:"flex",alignItems:"center",gap:5,background:"none",border:`1px solid ${color}55`,borderRadius:8,padding:"5px 9px",cursor:"pointer",color,fontSize:10.5,fontWeight:700,fontFamily:FONT,letterSpacing:".02em",flexShrink:0}}>
    {speaking?"⏹ Stop":"🔊 Listen"}
  </button>;
};
const Skeleton=({t,height=60})=><div style={{background:t.isDark?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)",borderRadius:10,height,marginBottom:10,animation:"shimmer 1.5s infinite"}}/>;
const TT=(props)=>{const{active,payload}=props;if(!active||!payload?.length)return null;return <div style={{background:"#0e1628",border:"1px solid rgba(59,130,246,0.3)",borderRadius:8,padding:"8px 12px",fontSize:12}}><div style={{color:"#ef4444",fontWeight:700}}>{payload[0]?.value?.toLocaleString()}</div><div style={{color:"#7a93b8",fontSize:10}}>casualties</div></div>;};
function useCountdown(target){const[text,setText]=useState("");useEffect(()=>{const tick=()=>{const ms=target.getTime()-Date.now();if(ms<=0){setText("ELAPSED");return;}const d=Math.floor(ms/86400000),h=Math.floor((ms%86400000)/3600000),m=Math.floor((ms%3600000)/60000);setText(`D-${d} · ${h}h ${m}m`);};tick();const id=setInterval(tick,60000);return()=>clearInterval(id);},[target]);return text;}

const MONTHS={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
const REPORT_NOW=new Date("2026-08-04T18:55:00Z");
const BUILD_NUMBER=9;
function parseNewsDate(s){if(!s)return null;const m=s.match(/([A-Z][a-z]{2})\s+(\d{1,2}),\s+(\d{4})/);if(m)return new Date(Date.UTC(+m[3],MONTHS[m[1]],+m[2]));const m2=s.match(/([A-Z][a-z]{2})\s+(\d{4})/);if(m2)return new Date(Date.UTC(+m2[2],MONTHS[m2[1]],1));return null;}
function ageInfo(s){const d=parseNewsDate(s);if(!d)return null;const days=Math.floor((REPORT_NOW-d)/86400000);return{days,stale:days>=10};}
function Freshness({t,date}){const info=ageInfo(date);if(!info)return null;const label=info.days<=0?"today":info.days===1?"1d ago":`${info.days}d ago`;const color=info.stale?"#f59e0b":t.sub;return <span style={{display:"inline-flex",alignItems:"center",gap:3,fontSize:10,color,fontWeight:info.stale?700:400}}><span style={{width:5,height:5,borderRadius:"50%",background:info.stale?"#f59e0b":"#22c55e",display:"inline-block"}}/>{label}{info.stale?" · stale":""}</span>;}

// ── News Ticker ──────────────────────────────────────────────────────────────────
function NewsTicker(){const doubled=[...TICKER_ITEMS,...TICKER_ITEMS];return <div className="ticker-wrap" style={{background:"#070d1c",borderBottom:"1px solid rgba(91,142,196,0.2)",overflow:"hidden",height:34,display:"flex",alignItems:"center"}}><div className="ticker-inner" style={{display:"flex",gap:40,alignItems:"center",animation:"ticker 150s linear infinite",whiteSpace:"nowrap",willChange:"transform"}}>{doubled.map((n,i)=><span key={i} style={{fontSize:12,color:"rgba(255,255,255,.7)",display:"flex",alignItems:"center",gap:6}}><span style={{background:n.color+"30",border:`1px solid ${n.color}55`,borderRadius:20,padding:"1px 7px",fontSize:11,fontWeight:700,color:n.color}}>{n.tag}</span>{n.text}</span>)}</div></div>;}

// ── Briefing Panel ───────────────────────────────────────────────────────────────
function BriefingPanel({t}){
  const briefing=BRIEFING;
  const[expanded,setExpanded]=useState(false);

  return <div style={{background:t.isDark?"linear-gradient(135deg,#091321,#0d1f38)":"linear-gradient(135deg,#eef3fc,#e6edf9)",border:"1px solid rgba(59,130,246,0.25)",borderLeft:"4px solid #5b8ec8",borderRadius:14,padding:"14px 16px",marginBottom:16}}>
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
      <span style={{width:8,height:8,borderRadius:"50%",background:"#22c55e",display:"inline-block",flexShrink:0}}/>
      <span style={{fontSize:10,fontWeight:800,color:"#5b8ec8",textTransform:"uppercase",letterSpacing:".1em"}}>Daily Briefing</span>
      <span style={{fontSize:10,color:t.sub,marginLeft:"auto"}}>{new Date(briefing.generatedAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
      <ReadAloudButton text={`${briefing.summaryShort} 72 hour watch: ${briefing.watch}`} color="#5b8ec8" t={t}/>
    </div>
    <p style={{fontSize:12.5,color:t.text,lineHeight:1.6,margin:"0 0 10px"}}>{briefing.summaryShort}</p>
    <div style={{fontSize:11.5,color:"#f97316",background:"rgba(249,115,22,0.08)",border:"1px solid rgba(249,115,22,0.2)",borderRadius:8,padding:"7px 10px",lineHeight:1.5,marginBottom:10}}>⚠️ <strong>72hr Watch:</strong> {briefing.watch}</div>
    <div style={{display:"flex",gap:6}}>
      <button onClick={()=>setExpanded(e=>!e)} aria-expanded={expanded} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,background:"none",border:`1px solid ${t.border}`,borderRadius:8,padding:"7px 10px",cursor:"pointer",color:"#5b8ec8",fontSize:11,fontWeight:700,fontFamily:FONT,letterSpacing:".03em"}}>
        {expanded?"▲ Show Less":"📝 Read Full Briefing"}
      </button>
      <ReadAloudButton text={briefing.summary} color="#5b8ec8" t={t}/>
    </div>
    {expanded&&<div style={{borderTop:`1px solid ${t.border}`,marginTop:10,paddingTop:10}}>
      <p style={{fontSize:12,color:t.sub,lineHeight:1.65,margin:0}}>{briefing.summary}</p>
    </div>}
  </div>;
}

// ── Command Palette ──────────────────────────────────────────────────────────────
function CommandPalette({open,onClose,sections,onNavigate,t}){const[query,setQuery]=useState("");const inputRef=useRef(null);useEffect(()=>{if(open){setQuery("");setTimeout(()=>inputRef.current?.focus(),50);}},[open]);useEffect(()=>{const h=e=>{if(e.key==="Escape")onClose();};window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h);},[onClose]);const allItems=sections.flatMap(s=>s.tabs.map(tab=>({sectionId:s.id,sectionLabel:s.label,tabId:tab.id,tabLabel:tab.label})));const filtered=query?allItems.filter(i=>i.tabLabel.toLowerCase().includes(query.toLowerCase())||i.sectionLabel.toLowerCase().includes(query.toLowerCase())):allItems;if(!open)return null;return <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:1000,display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:80,backdropFilter:"blur(4px)"}}><div onClick={e=>e.stopPropagation()} style={{background:t.isDark?"#0e1628":"#fff",border:`1px solid ${t.border}`,borderRadius:16,width:"min(520px,92vw)",overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,0.5)",animation:"fadeIn 0.15s ease-out"}}><div style={{padding:"12px 14px",borderBottom:`1px solid ${t.sep}`,display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:16,opacity:0.6}}>🔍</span><input ref={inputRef} value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search sections..." style={{flex:1,background:"none",border:"none",outline:"none",color:t.text,fontSize:15,fontFamily:FONT}}/><span style={{fontSize:10,color:t.sub,background:t.isDark?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)",borderRadius:5,padding:"2px 6px"}}>ESC</span></div><div style={{maxHeight:380,overflowY:"auto"}}>{filtered.length===0&&<div style={{padding:24,textAlign:"center",color:t.sub,fontSize:13}}>No results found</div>}{filtered.map((item,i)=><button key={i} onClick={()=>{onNavigate(item.sectionId,item.tabId);onClose();}} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 14px",background:"none",border:"none",borderBottom:`.5px solid ${t.sep}`,cursor:"pointer",textAlign:"left",fontFamily:FONT}}><span style={{fontSize:16}}>{item.tabLabel.split(" ")[0]}</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:t.text}}>{item.tabLabel.replace(/^[^\s]+\s/,"")}</div><div style={{fontSize:10,color:t.sub}}>{item.sectionLabel}</div></div><span style={{fontSize:10,color:t.sub,opacity:0.6}}>↵</span></button>)}</div><div style={{padding:"6px 14px",borderTop:`1px solid ${t.sep}`,display:"flex",gap:12,fontSize:10,color:t.sub,position:"relative"}}><SJMark size={18} style={{bottom:2,right:6,transform:"rotate(4deg)"}}/><span>↵ Navigate</span><span>ESC Close</span><span>⌘K Toggle</span></div></div></div>;}

// ── World Map ─────────────────────────────────────────────────────────────────────
const THEATER_COORDS={ukraine:{x:467.8,y:87.7,label:"Ukraine"},gaza:{x:476.6,y:138.8,label:"Gaza"},iran:{x:519.3,y:136.4,label:"Iran"},taiwan:{x:668.9,y:159.8,label:"Taiwan"},"south-china-sea":{x:653.3,y:191.3,label:"SCS"},venezuela:{x:251.3,y:195.4,label:"Venezuela"},caribbean:{x:216.9,y:161.4,label:"Cuba"},sudan:{x:472.2,y:181.9,label:"Sudan"},drc:{x:464.9,y:228.2,label:"DR Congo"},sahel:{x:395.6,y:186.0,label:"Sahel"},indopak:{x:566.2,y:132.1,label:"India-Pak"},pakafghan:{x:554.4,y:133.4,label:"Pak-Afghan"}};
const WORLD_LAND_PATH="M243.6,273.1 L231.1,263.2 L222.8,243.1 L219.4,240.2 L219.1,236.5 L222.7,230.9 L220.1,229.7 L220.1,226.5 L222.0,221.6 L224.8,220.0 L228.6,213.3 L226.3,201.3 L223.2,199.6 L221.2,201.9 L222.2,203.3 L220.3,204.2 L219.9,202.6 L214.4,200.9 L211.2,196.5 L210.9,197.9 L209.6,196.9 L209.5,193.8 L205.6,187.9 L197.3,186.2 L189.6,180.0 L185.4,181.5 L170.0,174.4 L165.6,169.9 L166.1,166.0 L164.4,162.3 L150.6,145.7 L148.6,139.7 L144.6,139.1 L154.1,158.2 L156.9,160.7 L155.9,162.2 L150.7,157.0 L150.4,153.6 L144.3,149.0 L146.3,146.7 L143.3,144.0 L139.7,136.0 L145.1,135.5 L153.3,139.2 L163.3,138.1 L169.0,144.8 L175.6,144.5 L180.0,152.6 L184.1,154.0 L182.9,164.7 L186.9,172.9 L190.2,174.8 L198.3,171.7 L199.4,167.1 L206.6,165.6 L202.4,180.9 L211.1,180.6 L214.6,182.5 L213.8,193.8 L217.3,199.4 L223.2,197.8 L229.3,200.4 L233.5,193.8 L236.9,193.4 L240.5,190.2 L241.9,191.0 L240.1,192.9 L240.7,199.2 L242.1,197.1 L241.3,194.1 L244.1,193.0 L244.6,190.9 L248.5,195.2 L255.8,196.5 L262.5,194.8 L260.6,195.6 L261.4,196.9 L264.8,198.4 L265.2,200.6 L268.7,202.1 L273.0,207.6 L280.1,208.2 L286.0,212.4 L288.9,219.0 L288.0,223.9 L292.0,224.3 L292.0,227.0 L293.7,225.3 L300.2,227.9 L300.9,230.9 L311.2,231.4 L317.3,236.7 L320.9,237.6 L322.8,243.5 L321.9,247.9 L314.1,258.9 L312.7,271.8 L309.0,282.8 L306.7,285.6 L300.8,286.6 L294.1,290.8 L292.2,293.4 L291.4,301.0 L280.4,316.4 L275.1,317.6 L270.2,315.1 L273.8,323.1 L271.7,326.6 L268.4,328.0 L261.5,328.3 L261.9,333.3 L260.6,334.3 L255.3,334.4 L255.6,337.0 L259.0,338.4 L255.2,340.9 L254.3,345.1 L250.5,346.5 L249.8,348.5 L254.1,351.0 L253.4,353.4 L246.4,360.4 L248.6,364.8 L245.6,364.6 L242.6,366.3 L242.2,368.8 L233.5,364.5 L232.0,354.9 L235.3,350.2 L231.9,349.4 L234.8,342.5 L237.2,343.5 L238.4,337.9 L236.9,337.2 L236.2,340.6 L234.8,340.2 L237.3,329.5 L236.5,323.8 L241.2,311.1 L241.1,301.5 L244.2,281.3 L243.6,273.1 Z M226.2,174.0 L229.1,174.1 L230.7,175.5 L228.4,176.0 L226.2,174.0 Z M220.8,161.4 L235.2,169.0 L227.2,170.2 L228.7,168.7 L225.1,165.5 L217.4,163.4 L218.2,162.7 L211.2,164.7 L215.0,161.7 L220.8,161.4 Z M226.9,155.9 L227.7,158.1 L227.2,159.8 L225.8,157.5 L226.9,155.9 Z M114.8,86.9 L120.5,88.1 L125.5,93.0 L120.8,92.1 L115.4,88.9 L114.8,86.9 Z M103.9,78.6 L107.2,77.8 L106.6,80.9 L108.5,83.1 L103.9,78.6 Z M113.0,81.5 L110.0,77.4 L111.1,73.0 L107.3,71.3 L98.9,62.6 L94.6,64.9 L86.7,61.2 L86.7,35.8 L96.7,38.0 L111.6,34.5 L113.1,35.6 L115.2,33.7 L120.5,36.4 L123.5,34.6 L123.8,36.7 L130.1,35.6 L143.9,38.0 L146.9,39.4 L143.8,40.7 L147.8,41.3 L155.7,40.5 L158.0,42.1 L160.5,40.7 L158.2,39.6 L159.6,38.7 L164.1,38.3 L174.5,41.4 L181.2,41.0 L181.0,39.3 L183.0,38.9 L186.4,39.8 L186.4,42.3 L190.6,37.5 L185.6,34.8 L185.8,31.8 L188.4,29.9 L193.6,31.5 L196.6,34.5 L194.7,35.8 L198.8,36.4 L198.8,39.1 L201.7,37.0 L204.4,38.8 L203.7,40.8 L205.9,42.6 L209.8,38.3 L210.0,35.4 L216.4,36.0 L219.4,37.3 L217.9,40.1 L219.1,42.8 L209.4,44.3 L205.9,49.1 L198.4,52.3 L198.3,54.0 L195.7,54.3 L190.6,59.6 L189.6,64.8 L192.9,65.3 L194.9,69.8 L198.0,69.3 L211.1,74.6 L217.2,75.1 L217.5,80.1 L222.4,85.7 L225.3,82.0 L222.6,76.4 L229.9,71.3 L225.5,65.2 L228.1,62.4 L226.4,55.7 L235.9,55.4 L241.4,58.9 L245.4,59.1 L246.0,64.8 L249.7,66.8 L256.5,61.1 L263.6,70.2 L262.7,71.9 L272.6,76.5 L276.1,80.1 L276.3,83.2 L266.6,88.3 L252.4,88.3 L242.0,97.5 L247.4,93.5 L255.4,91.0 L257.4,92.3 L255.3,94.1 L256.7,99.1 L259.6,100.4 L263.3,100.0 L265.5,97.0 L267.1,99.9 L254.7,106.3 L253.1,106.1 L253.0,103.9 L256.8,101.6 L250.8,102.0 L249.4,96.8 L246.1,95.8 L241.1,102.4 L233.6,102.4 L229.3,106.1 L225.1,106.1 L224.6,108.2 L216.2,111.4 L215.3,110.3 L217.5,106.3 L216.6,101.5 L203.6,93.5 L196.4,93.9 L190.4,92.5 L189.3,90.6 L126.7,91.6 L120.8,87.8 L116.8,86.7 L115.9,82.7 L113.0,81.5 Z M218.1,54.2 L215.4,56.2 L213.3,55.4 L215.0,54.1 L218.1,54.2 Z M215.3,50.9 L209.9,53.8 L209.2,52.2 L206.2,52.4 L208.1,51.1 L209.1,46.5 L222.0,51.9 L215.3,50.9 Z M16.5,50.0 L3.6,47.5 L2.9,45.5 L0.3,46.2 L1.3,47.4 L0.0,48.6 L0.0,37.8 L11.3,42.6 L12.6,44.9 L12.1,43.0 L18.1,43.4 L22.4,45.9 L16.6,47.3 L16.5,50.0 Z M232.9,41.9 L228.9,42.9 L228.4,41.5 L231.3,39.7 L232.9,41.9 Z M249.1,34.7 L251.2,37.2 L247.1,38.5 L262.6,43.5 L258.0,48.5 L251.7,44.8 L248.9,45.1 L248.6,46.7 L254.8,50.2 L256.3,52.8 L255.5,54.8 L247.1,51.9 L253.0,56.8 L242.2,54.1 L233.7,49.4 L225.4,49.7 L226.9,47.7 L235.6,47.3 L235.7,45.0 L238.6,42.4 L237.1,40.2 L229.2,38.0 L230.6,37.3 L224.5,34.6 L219.3,35.7 L202.9,33.9 L201.1,33.0 L203.4,31.8 L200.2,31.7 L199.5,29.0 L203.5,25.5 L209.3,24.8 L207.6,26.5 L209.4,28.2 L211.4,26.0 L217.1,24.9 L220.9,27.7 L220.6,29.5 L227.1,27.6 L249.1,34.7 Z M181.7,34.6 L187.4,37.4 L178.2,36.7 L181.7,34.6 Z M173.1,37.4 L148.2,39.0 L139.2,35.1 L150.2,34.0 L138.0,33.6 L136.8,32.6 L142.0,31.5 L134.7,30.8 L138.1,27.7 L144.0,26.1 L146.3,26.6 L145.2,27.9 L155.7,27.1 L159.6,30.6 L160.7,29.5 L159.1,26.7 L161.1,26.3 L165.8,27.8 L167.9,32.4 L175.6,35.0 L171.7,36.4 L173.1,37.4 Z M0.0,32.8 L0.3,30.8 L5.4,31.6 L2.9,32.6 L0.0,32.8 Z M185.1,30.6 L179.3,31.4 L172.3,27.4 L176.8,27.7 L174.4,26.0 L177.0,24.7 L183.6,24.9 L182.1,27.0 L185.5,28.1 L185.1,30.6 Z M132.3,31.3 L126.5,32.6 L120.2,30.0 L124.6,25.1 L122.4,23.5 L138.8,23.8 L143.3,25.7 L135.1,28.2 L132.3,31.3 Z M186.6,25.8 L190.0,23.9 L198.9,24.6 L190.5,29.6 L188.0,29.5 L186.6,25.8 Z M162.4,25.7 L166.1,25.2 L167.8,25.8 L165.8,27.6 L162.4,25.7 Z M223.4,27.6 L220.4,25.1 L226.5,25.2 L230.6,27.4 L223.4,27.6 Z M192.0,21.6 L187.5,22.5 L184.8,21.8 L189.2,19.8 L192.0,21.6 Z M147.0,22.3 L151.6,21.1 L138.4,21.0 L143.5,17.6 L157.6,20.3 L154.5,17.7 L156.5,16.7 L165.1,20.3 L150.6,23.1 L147.0,22.3 Z M184.2,16.8 L196.4,16.8 L201.8,19.9 L219.7,19.6 L222.6,21.8 L204.1,23.2 L194.6,22.0 L193.6,19.2 L184.2,16.8 Z M172.1,18.0 L181.1,16.9 L182.9,19.6 L181.9,21.6 L178.2,21.8 L175.8,21.4 L175.9,19.8 L172.2,20.0 L172.1,18.0 Z M141.5,16.5 L130.0,19.1 L127.0,18.6 L135.3,14.8 L141.8,14.4 L141.5,16.5 Z M155.9,13.5 L151.0,15.1 L147.7,14.2 L155.9,13.5 Z M180.8,11.1 L187.6,12.3 L183.8,13.9 L180.8,11.1 Z M168.4,11.6 L165.6,10.0 L175.9,11.3 L178.5,13.7 L166.3,12.5 L168.4,11.6 Z M219.8,0.0 L238.2,0.0 L262.6,1.0 L249.6,4.0 L254.5,4.0 L241.8,8.6 L229.1,9.9 L232.2,10.2 L230.6,10.7 L232.5,12.1 L222.8,15.6 L226.9,16.8 L221.0,18.4 L201.1,17.6 L200.9,16.3 L205.0,15.7 L203.9,13.7 L211.2,14.7 L204.5,12.5 L210.9,9.8 L206.8,7.4 L218.1,6.8 L205.3,6.7 L196.5,3.0 L215.2,1.8 L219.8,0.0 Z M194.6,4.7 L209.3,9.9 L198.2,12.9 L193.6,12.5 L191.2,11.5 L193.0,9.8 L185.1,7.7 L190.4,5.5 L189.5,4.8 L194.6,4.7 Z M247.5,373.5 L234.1,366.1 L242.0,369.4 L245.9,365.2 L249.4,368.8 L255.4,371.1 L247.5,373.5 Z M265.1,364.6 L264.0,363.4 L266.7,361.8 L271.7,362.6 L265.1,364.6 Z M372.4,204.1 L367.0,194.4 L363.1,190.9 L360.8,184.0 L363.4,180.2 L364.1,174.9 L362.3,164.7 L367.9,152.9 L378.7,143.0 L379.3,135.9 L384.6,131.8 L386.8,127.3 L395.2,128.9 L403.3,125.0 L421.1,123.0 L424.7,124.2 L423.0,132.6 L442.4,142.1 L444.6,140.2 L444.7,136.8 L447.9,135.2 L464.3,140.5 L468.8,138.6 L475.1,140.2 L480.0,130.3 L480.4,124.9 L472.2,126.4 L461.4,124.9 L458.5,120.7 L459.6,118.6 L458.2,117.3 L460.6,114.8 L464.0,114.6 L465.0,112.6 L469.2,113.0 L474.5,110.4 L485.2,113.3 L492.3,111.7 L492.1,108.8 L481.5,101.8 L486.9,96.3 L477.7,99.0 L480.7,102.1 L475.3,104.1 L472.1,101.5 L474.0,99.5 L468.3,98.1 L464.1,102.6 L461.5,108.9 L464.0,113.0 L458.6,115.5 L455.4,113.3 L452.7,114.0 L454.2,115.5 L453.1,116.0 L450.3,115.2 L453.4,122.2 L451.4,121.5 L451.5,125.5 L450.0,125.6 L443.1,115.2 L443.4,111.3 L429.2,100.4 L427.4,101.4 L428.0,104.9 L441.1,115.4 L437.5,114.7 L436.6,116.4 L437.9,118.8 L435.8,121.3 L434.3,115.8 L419.8,104.1 L414.5,107.5 L406.9,107.6 L406.8,110.8 L401.8,113.2 L399.4,117.7 L400.2,119.3 L395.2,124.8 L390.3,124.8 L388.1,126.8 L385.5,124.1 L380.2,124.3 L380.4,120.6 L378.8,119.3 L380.5,113.8 L379.1,107.7 L382.3,105.8 L395.8,106.7 L396.9,105.0 L397.3,99.7 L390.0,94.4 L389.8,92.5 L396.4,92.6 L395.7,89.5 L397.8,90.7 L403.0,88.6 L403.6,86.4 L408.5,84.6 L410.5,80.6 L418.0,79.4 L419.6,78.1 L418.0,74.1 L419.0,69.8 L423.5,68.1 L422.8,70.4 L424.2,71.5 L421.4,74.2 L424.3,78.1 L427.8,76.9 L431.4,78.8 L439.2,75.9 L443.7,77.0 L447.3,74.9 L448.0,69.0 L450.1,68.0 L453.6,70.0 L454.3,66.3 L451.9,64.2 L464.7,61.9 L462.4,60.6 L450.8,62.4 L447.4,60.0 L447.9,53.4 L456.4,48.2 L453.1,45.8 L449.3,46.6 L447.1,48.4 L447.5,50.1 L439.7,54.6 L438.0,58.4 L441.8,61.8 L437.4,65.4 L435.3,72.5 L428.8,74.5 L423.0,63.4 L418.6,66.5 L412.6,65.8 L411.1,56.7 L423.4,49.9 L432.8,40.9 L442.6,35.5 L462.6,31.8 L469.5,33.8 L466.7,34.5 L469.1,36.2 L481.1,37.6 L491.2,41.9 L491.4,43.7 L485.3,45.8 L473.7,44.1 L477.4,46.1 L477.7,50.1 L482.3,51.6 L481.2,49.1 L482.6,48.1 L488.0,49.8 L489.9,49.1 L488.4,47.2 L493.5,44.5 L497.7,45.6 L499.0,43.8 L496.6,38.9 L502.8,39.8 L504.0,41.3 L501.2,41.6 L501.2,43.1 L503.0,44.0 L519.4,38.1 L521.0,38.2 L518.9,39.9 L530.7,38.1 L533.2,39.7 L535.7,37.9 L533.4,36.3 L534.6,35.4 L552.2,40.2 L553.7,38.8 L548.7,36.5 L548.2,32.3 L555.4,26.8 L561.3,27.6 L561.8,29.1 L559.7,31.2 L561.8,34.0 L561.3,37.7 L563.7,39.3 L558.4,45.0 L560.9,45.4 L566.8,41.1 L565.5,39.5 L566.5,37.8 L563.6,36.0 L565.3,33.3 L562.4,31.1 L566.4,29.3 L565.9,27.4 L568.2,28.8 L567.3,31.4 L569.7,31.9 L568.7,30.0 L572.4,28.9 L581.1,30.3 L578.9,25.2 L592.9,24.4 L591.1,23.0 L593.7,21.2 L623.9,17.7 L631.9,14.3 L638.3,17.6 L646.8,17.0 L653.6,19.3 L643.1,23.8 L651.2,24.3 L652.3,26.0 L656.8,24.9 L673.8,27.0 L673.9,25.0 L682.2,25.4 L685.8,26.8 L686.8,28.6 L685.5,29.7 L691.8,32.9 L693.9,30.1 L710.8,31.0 L709.2,28.5 L712.2,27.4 L732.2,29.1 L739.9,32.8 L753.3,32.7 L755.2,33.8 L754.9,35.8 L757.6,36.6 L773.0,36.2 L776.8,38.6 L779.6,37.7 L777.8,36.0 L778.8,34.8 L800.0,37.8 L800.0,48.6 L794.2,49.6 L798.6,53.9 L798.3,55.8 L786.0,57.5 L778.5,62.3 L775.3,60.4 L763.4,62.3 L760.0,66.7 L762.6,68.4 L762.4,72.3 L760.3,72.4 L759.3,74.7 L760.3,75.9 L756.4,77.2 L755.6,80.3 L752.3,81.0 L751.6,83.7 L748.4,86.2 L745.4,74.4 L746.5,70.7 L748.5,67.8 L751.9,67.2 L763.7,58.9 L765.5,55.1 L755.8,60.5 L754.0,57.2 L748.3,58.1 L742.7,62.6 L744.5,64.3 L736.1,65.3 L736.3,63.3 L732.9,62.9 L716.0,64.6 L700.3,76.2 L707.0,78.8 L710.9,77.6 L714.1,80.6 L714.2,82.9 L711.2,93.1 L707.2,98.9 L699.7,106.7 L696.7,108.3 L694.0,107.0 L683.4,116.5 L687.7,124.6 L686.9,129.1 L681.1,131.0 L680.3,124.7 L681.9,124.3 L677.1,121.0 L678.5,117.1 L676.1,116.1 L669.0,118.9 L671.5,114.7 L670.3,113.3 L662.3,118.0 L661.2,119.3 L664.2,122.8 L671.9,122.7 L672.3,124.2 L669.1,124.9 L664.8,129.6 L667.2,131.1 L670.9,138.3 L669.5,141.0 L671.3,143.3 L670.4,147.6 L663.7,157.5 L657.5,162.3 L646.2,166.0 L645.4,168.9 L644.2,169.0 L644.1,166.0 L641.2,165.2 L635.3,170.5 L634.8,172.3 L641.9,182.5 L643.0,187.5 L642.7,192.2 L633.7,200.5 L633.5,197.0 L630.0,195.0 L628.0,190.8 L624.1,189.7 L624.4,187.5 L622.4,187.6 L620.5,198.8 L628.8,208.8 L631.6,220.2 L625.3,216.2 L622.4,206.3 L618.9,201.1 L618.5,202.7 L619.5,192.9 L615.9,178.1 L611.9,181.3 L609.3,180.5 L609.6,174.6 L603.1,162.3 L601.1,162.2 L600.6,164.8 L593.3,165.8 L592.2,169.4 L582.6,179.1 L578.5,180.8 L577.5,195.8 L572.3,202.2 L563.4,180.6 L561.4,166.1 L556.6,167.4 L553.7,164.2 L554.1,162.1 L547.5,155.2 L536.7,156.1 L527.5,154.3 L525.5,150.5 L521.6,152.3 L514.5,148.6 L511.4,142.4 L506.6,142.9 L512.9,157.0 L513.4,153.6 L514.6,154.2 L515.1,159.0 L520.0,158.7 L525.2,152.5 L526.3,158.4 L530.5,160.2 L532.9,163.6 L528.5,169.1 L528.2,172.6 L522.8,177.3 L516.4,179.5 L515.9,181.7 L508.2,185.9 L496.6,189.6 L494.8,178.5 L487.0,166.3 L485.5,159.8 L477.0,148.1 L477.7,144.6 L477.6,144.2 L477.4,143.5 L475.4,149.2 L472.1,143.2 L479.3,159.2 L478.9,161.4 L481.9,164.4 L455.6,164.4 L455.6,169.8 L453.0,169.8 L453.1,181.6 L451.2,181.4 L448.7,189.8 L452.3,196.5 L452.1,199.6 L452.9,200.3 L454.6,201.5 L453.1,200.5 L457.3,195.6 L459.4,198.2 L464.4,198.4 L466.7,196.0 L469.7,197.2 L472.8,190.7 L475.5,198.2 L480.6,187.1 L481.9,178.0 L485.4,175.2 L487.3,180.8 L495.7,189.5 L494.9,192.1 L498.0,195.5 L512.7,191.3 L513.4,195.0 L506.1,212.3 L489.5,230.6 L487.1,236.3 L486.1,239.6 L487.6,242.1 L487.1,246.6 L490.0,252.7 L490.6,263.3 L489.1,267.1 L477.3,277.0 L478.8,288.7 L472.4,293.0 L472.1,300.0 L466.8,307.6 L457.3,315.2 L450.2,315.0 L443.6,317.5 L440.8,315.7 L440.5,309.0 L433.8,296.7 L431.7,283.3 L426.2,272.4 L425.9,268.6 L430.3,256.1 L429.4,246.8 L426.5,237.3 L419.6,226.7 L421.8,215.4 L418.9,210.8 L413.1,212.2 L409.6,206.8 L406.0,206.8 L395.6,211.0 L389.7,209.8 L382.3,211.9 L372.4,204.1 Z M264.7,194.4 L264.6,196.4 L262.3,196.5 L262.9,194.7 L264.7,194.4 Z M247.1,172.5 L247.4,174.6 L243.0,174.0 L241.3,176.3 L234.5,174.3 L239.3,173.4 L237.4,170.0 L242.7,170.1 L247.1,172.5 Z M257.7,96.9 L258.5,98.2 L262.2,98.5 L260.3,99.8 L257.5,98.7 L257.7,96.9 Z M281.2,91.0 L280.5,92.9 L282.0,92.5 L283.0,95.6 L282.1,97.9 L279.6,97.5 L279.5,95.0 L276.9,97.3 L275.6,97.2 L277.1,96.0 L275.0,95.3 L268.0,94.6 L275.8,84.5 L276.9,84.7 L273.8,89.4 L281.2,91.0 Z M383.2,75.1 L387.4,76.7 L386.6,80.4 L384.9,82.8 L377.8,84.0 L379.6,81.2 L378.5,78.5 L383.2,75.1 Z M388.8,73.3 L387.6,74.6 L387.1,67.9 L388.9,65.7 L393.3,65.7 L390.9,68.6 L395.6,68.2 L393.1,72.8 L395.4,73.0 L401.0,81.0 L403.7,81.6 L402.3,84.1 L403.2,85.5 L387.2,88.5 L392.4,85.1 L388.3,83.6 L390.6,82.7 L389.8,79.5 L393.1,79.8 L393.5,78.2 L389.2,76.0 L388.8,73.3 Z M351.6,50.1 L346.8,48.8 L350.6,47.5 L345.9,46.9 L350.8,44.7 L354.3,46.5 L367.8,44.6 L367.2,46.3 L369.8,48.2 L358.5,52.6 L349.4,51.3 L351.6,50.1 Z M353.7,0.7 L329.1,2.2 L351.0,3.4 L348.5,5.0 L365.0,2.9 L372.9,4.6 L355.5,7.6 L360.6,7.7 L356.2,11.5 L356.3,14.4 L358.9,16.2 L351.8,17.2 L355.9,18.6 L356.4,20.9 L354.1,21.1 L356.9,23.5 L352.0,23.7 L354.6,24.7 L353.9,25.7 L347.6,26.1 L350.4,29.1 L344.9,28.8 L350.8,31.1 L351.7,33.2 L347.7,33.8 L343.2,31.2 L344.0,33.0 L341.4,34.4 L350.3,34.7 L338.3,39.2 L329.4,40.1 L324.0,44.0 L311.5,47.3 L308.5,52.6 L304.8,54.8 L305.7,56.9 L303.6,61.7 L292.7,59.7 L285.3,52.2 L280.1,42.6 L282.3,39.5 L285.6,38.5 L287.0,35.2 L278.5,36.1 L279.2,32.8 L285.8,33.5 L275.9,30.6 L278.4,28.1 L269.8,20.2 L247.8,18.7 L241.3,16.1 L251.6,15.2 L237.1,13.4 L254.0,9.7 L254.8,8.7 L248.8,7.8 L266.0,2.6 L288.0,1.5 L301.1,3.6 L296.1,1.0 L322.0,0.0 L353.7,0.7 Z M427.6,122.3 L430.5,121.2 L434.5,120.7 L433.6,125.0 L427.6,122.3 Z M418.1,113.3 L420.5,112.6 L421.5,118.1 L418.7,118.1 L418.1,113.3 Z M420.9,107.8 L420.5,112.2 L419.0,109.8 L420.9,107.8 Z M424.5,74.5 L427.5,72.5 L428.2,73.8 L426.9,76.0 L424.5,74.5 Z M446.1,14.3 L447.6,13.7 L446.2,12.8 L450.9,12.2 L454.9,13.9 L446.1,14.3 Z M438.0,16.7 L430.6,15.1 L432.6,14.2 L423.2,9.0 L437.8,7.9 L447.9,10.9 L442.3,12.0 L438.0,16.7 Z M438.6,7.2 L450.9,6.3 L460.9,7.9 L451.2,9.7 L438.6,7.2 Z M553.2,354.7 L556.7,355.9 L556.8,356.4 L552.8,357.8 L553.2,354.7 Z M510.4,266.0 L504.7,290.9 L500.9,292.7 L497.9,291.0 L496.1,283.1 L498.6,277.8 L497.7,270.6 L498.8,267.4 L506.0,263.0 L509.3,256.1 L512.2,264.7 L511.6,266.8 L510.4,266.0 Z M662.0,245.5 L664.7,247.2 L659.4,248.0 L662.0,245.5 Z M654.6,247.3 L640.6,244.6 L634.1,242.2 L635.7,239.6 L641.4,242.0 L646.1,241.1 L657.1,246.2 L654.6,247.3 Z M635.2,239.5 L625.3,231.2 L619.1,218.8 L611.8,208.9 L616.6,209.5 L623.6,218.0 L625.9,218.1 L630.8,223.4 L629.9,225.6 L635.8,231.9 L635.2,239.5 Z M659.0,227.7 L658.1,234.5 L655.3,234.8 L651.7,232.1 L649.0,233.1 L644.9,231.6 L642.1,222.6 L643.7,218.3 L647.0,218.7 L647.5,216.4 L651.1,215.3 L660.3,205.0 L664.8,209.1 L660.7,215.0 L664.4,221.3 L661.8,221.6 L661.2,225.9 L659.0,227.7 Z M580.7,200.6 L581.4,206.2 L578.6,207.6 L577.1,201.6 L578.1,197.2 L580.7,200.6 Z M666.0,195.2 L660.4,201.1 L665.6,193.0 L666.0,195.2 Z M643.3,174.6 L641.5,173.8 L641.4,171.5 L646.2,169.6 L643.3,174.6 Z M553.0,17.4 L529.9,23.4 L523.2,28.6 L523.6,30.9 L527.9,33.1 L514.7,31.1 L516.5,27.6 L521.0,25.3 L518.9,24.9 L524.2,22.6 L523.6,21.3 L535.9,18.2 L553.0,17.4 Z M634.2,11.6 L621.0,13.7 L626.9,9.8 L634.2,11.6 Z M607.4,9.6 L602.6,7.2 L613.2,4.7 L622.6,8.7 L622.1,11.1 L617.2,11.4 L607.4,9.6 Z M514.5,6.2 L505.7,8.1 L499.7,6.5 L514.5,6.2 Z M785.0,335.1 L786.6,334.0 L787.2,336.3 L783.8,340.6 L784.6,341.9 L781.0,342.9 L779.1,347.4 L776.3,349.4 L770.4,348.3 L771.2,345.3 L778.9,339.7 L782.4,334.1 L784.0,332.8 L785.0,335.1 Z M724.6,341.1 L721.7,333.4 L729.5,333.8 L728.7,340.1 L724.6,341.1 Z M786.3,330.2 L788.2,324.4 L784.5,316.5 L787.4,318.7 L789.6,324.0 L789.7,322.1 L792.8,325.8 L796.7,325.3 L795.5,329.2 L793.8,329.2 L789.4,336.0 L788.1,334.9 L788.7,331.2 L786.3,330.2 Z M668.0,315.1 L662.3,318.2 L655.6,315.8 L657.3,310.5 L651.9,294.1 L652.8,295.2 L652.1,292.7 L653.9,294.6 L652.0,289.4 L652.7,284.3 L659.4,279.5 L668.6,276.7 L673.4,267.9 L675.2,269.7 L674.5,268.4 L679.3,262.0 L682.4,260.9 L688.0,264.0 L690.3,257.5 L694.6,256.3 L692.9,254.1 L694.1,253.7 L700.7,256.7 L703.3,255.6 L704.3,257.0 L701.1,264.1 L711.6,271.4 L713.9,267.9 L716.7,252.4 L719.8,262.9 L721.3,261.9 L723.1,264.1 L725.3,274.8 L730.8,278.6 L732.6,283.9 L734.9,284.1 L735.3,286.9 L739.7,291.8 L741.3,299.4 L739.8,309.0 L734.1,319.8 L733.3,324.6 L725.2,328.9 L721.9,327.2 L722.3,325.8 L719.1,328.3 L712.5,326.2 L710.2,321.1 L706.9,319.7 L707.1,316.4 L704.1,318.7 L706.2,312.4 L702.2,317.7 L698.4,311.6 L691.8,308.6 L680.3,310.5 L676.0,312.5 L674.8,315.0 L668.0,315.1 Z M764.5,277.9 L766.7,278.8 L771.4,283.4 L767.7,282.1 L764.5,277.9 Z M675.5,248.7 L683.0,246.3 L674.6,251.6 L675.5,248.7 Z M726.6,241.8 L734.9,252.2 L728.7,251.0 L724.6,245.4 L721.7,244.3 L717.0,248.8 L709.2,245.5 L705.8,246.4 L708.2,243.4 L706.5,238.2 L697.0,233.2 L695.5,234.8 L693.3,231.3 L697.1,229.7 L693.8,229.7 L690.0,226.2 L694.2,224.7 L697.7,225.8 L698.7,231.2 L701.0,232.8 L705.4,228.3 L713.3,230.7 L721.3,234.1 L724.4,238.4 L728.1,240.1 L728.6,241.5 L726.6,241.8 Z M743.4,237.5 L746.7,241.3 L746.4,242.1 L744.8,241.3 L743.4,237.5 Z M729.6,239.2 L733.6,237.2 L735.1,238.4 L736.8,234.9 L738.5,235.3 L737.7,238.5 L733.9,240.7 L729.6,239.2 Z M734.8,231.1 L738.3,232.4 L740.3,235.8 L739.6,236.5 L734.8,231.1 Z M684.2,232.8 L689.9,232.0 L690.7,234.1 L684.2,232.8 Z M667.1,223.0 L668.7,227.5 L674.1,225.3 L670.0,228.8 L673.7,238.1 L671.6,237.9 L672.7,235.7 L670.0,236.0 L668.8,230.8 L667.3,231.6 L667.6,238.6 L666.2,239.0 L665.6,233.1 L663.9,231.2 L666.7,222.2 L668.6,220.2 L673.2,221.3 L678.3,219.9 L674.9,223.1 L667.1,223.0 Z M683.8,224.4 L683.1,221.0 L684.3,217.8 L685.9,223.0 L684.4,224.4 L685.3,225.8 L683.8,224.4 Z M676.0,207.1 L674.7,202.6 L670.9,204.3 L674.4,200.3 L675.2,201.5 L678.8,199.5 L678.7,197.4 L680.5,198.7 L681.2,204.3 L680.4,206.8 L679.6,204.0 L678.6,205.4 L678.7,208.6 L676.0,207.1 Z M674.0,198.6 L672.0,197.5 L673.2,194.4 L674.4,194.2 L674.1,196.0 L675.7,193.4 L674.0,198.6 Z M671.1,195.5 L670.9,191.6 L673.6,192.5 L671.1,195.5 Z M676.2,192.7 L677.5,192.9 L676.1,189.8 L678.3,189.9 L679.5,193.9 L677.8,193.2 L677.3,196.4 L676.2,192.7 Z M670.5,185.1 L675.4,186.5 L675.7,189.9 L673.2,187.2 L668.1,186.3 L668.9,184.5 L666.8,183.3 L666.4,179.6 L667.3,180.5 L668.3,173.8 L671.7,173.9 L672.3,177.6 L670.0,182.9 L670.5,185.1 Z M670.0,155.5 L669.3,162.3 L668.3,164.5 L666.9,160.2 L670.0,155.5 Z M698.2,134.2 L695.6,135.5 L694.1,134.8 L695.4,131.9 L699.2,131.7 L698.2,134.2 Z M701.8,133.5 L700.2,130.4 L691.1,132.4 L693.3,134.3 L690.4,140.1 L687.6,134.0 L694.7,128.2 L701.5,127.9 L703.8,123.1 L705.3,124.4 L709.8,120.7 L710.9,114.4 L714.2,112.2 L715.3,118.1 L713.2,120.8 L712.8,127.1 L701.8,133.5 Z M710.7,109.0 L714.2,106.8 L715.5,100.9 L719.8,104.6 L722.9,104.1 L723.4,107.1 L720.1,107.8 L718.2,110.5 L714.7,108.7 L713.5,111.6 L711.0,111.7 L710.7,109.0 Z M718.9,99.3 L717.2,97.7 L715.8,99.8 L715.3,97.5 L714.9,80.0 L717.0,77.2 L721.5,91.7 L718.2,90.8 L716.8,94.7 L718.9,99.3 Z M710.8,26.0 L715.7,24.6 L719.1,26.4 L710.8,26.0 Z M732.4,22.4 L724.7,21.1 L735.0,21.3 L732.4,22.4 Z M705.6,19.0 L722.4,20.0 L720.7,22.0 L708.8,22.6 L704.4,20.9 L705.6,19.0 Z";
function WorldMap({t,conflicts,onSelect,selectedId}){const ocean=t.isDark?"#060d1a":"#dae4f0",land=t.isDark?"#0e1e35":"#b8cce0",border=t.isDark?"#152a46":"#8aaec8";return <div style={{background:ocean,borderRadius:14,overflow:"hidden",border:`1px solid ${t.border}`,marginBottom:16}}><div style={{padding:"8px 14px 4px",display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".08em"}}>🌍 Active Conflict Theaters</span><span style={{fontSize:10,color:t.sub,marginLeft:"auto"}}>tap pin to navigate</span></div><svg viewBox="0 0 800 380" width="100%" style={{display:"block"}}><rect width={800} height={380} fill={ocean}/><path d={WORLD_LAND_PATH} fill={land} stroke={border} strokeWidth="0.6"/>{conflicts.map(c=>{const pin=THEATER_COORDS[c.id];if(!pin)return null;const isSel=selectedId===c.id,r=isSel?11:8;const isVolatile=["ESCALATING","NEW CIVIL WAR","US INTERVENTION"].includes(c.status);return <g key={c.id} style={{cursor:"pointer"}} onClick={()=>onSelect(c.id)}><circle cx={pin.x} cy={pin.y} r={r+10} fill={c.statusColor} opacity={0.07}/>{isVolatile&&<circle cx={pin.x} cy={pin.y} r={r} fill="none" stroke={c.statusColor} strokeWidth={1.5} style={{transformOrigin:`${pin.x}px ${pin.y}px`,animation:"radarPing 1.8s ease-out infinite"}}/>}{isSel&&<circle cx={pin.x} cy={pin.y} r={r+18} fill="none" stroke={c.statusColor} strokeWidth={1} opacity={0.35} strokeDasharray="4,3"/>}<circle cx={pin.x} cy={pin.y} r={r} fill={c.statusColor} opacity={isSel?1:0.88}/><text textAnchor="middle" x={pin.x} y={pin.y+4} fontSize={isSel?10:8} fill="#fff" fontWeight="bold" style={{pointerEvents:"none"}}>{c.icon}</text><text textAnchor="middle" x={pin.x} y={pin.y+r+13} fontSize={8} fill={isSel?c.statusColor:t.isDark?"rgba(255,255,255,0.7)":"rgba(0,0,0,0.6)"} fontWeight={isSel?"bold":"normal"} style={{pointerEvents:"none"}}>{pin.label}</text></g>;})}</svg></div>;}

// ── Ukraine Frontline Map SVG ─────────────────────────────────────────────────────
const SECTORS=[{name:"Pokrovsk area",icon:"🔴",status:"CRITICAL",color:"#ef4444",detail:"Still the single hottest sector on the front alongside Huliaipole and Kostyantynivka, with Russian assault density consistently heaviest here through late July. Russia claimed the city's capture earlier in the year but has been unable to fully consolidate or push meaningfully west of it since — the front here has stabilized into grinding, incremental fighting rather than a clean breakthrough. Ukraine's AI-enabled drone interdiction (per CSIS) is a major reason Russian gains remain historically slow despite the pressure."},{name:"Kostyantynivka",icon:"🔴",status:"ACTIVE",color:"#ef4444",detail:"Remains contested and a recurring subject of disputed Russian capture claims that ISW and other OSINT trackers have repeatedly found unsupported by ground evidence — a pattern consistent with Kremlin information-operation timing around Western media cycles rather than confirmed battlefield change."},{name:"Kupyansk",icon:"🔴",status:"ACTIVE",color:"#ef4444",detail:"Russian infiltration pressure continues on the city's outskirts. Russian milbloggers have repeatedly posted likely AI-altered flag-raising footage as part of a cognitive-war effort to exaggerate the pace of advances — a recurring tactic across multiple sectors this year."},{name:"Zaporizhzhia",icon:"🟡",status:"MODERATE",color:"#eab308",detail:"Ukrainian forces have held or advanced within the Orikhiv/Prymorske area for much of 2026. Molniya AI-guided loitering munitions are now used en masse by Russian forces here — existing Ukrainian detectors reportedly remain only partially effective against them."},{name:"Kherson",icon:"🟡",status:"MODERATE",color:"#eab308",detail:"Ground activity remains limited. Ukraine continues intermediate-range strikes on Russian military/energy assets in occupied Kherson Oblast."},{name:"Crimea",icon:"⚡",status:"SIEGE",color:"#5b8ec8",detail:"State of emergency conditions persist — fuel and water shortages, Sevastopol power cuts, civilian exodus. Russian 810th Naval Infantry Brigade elements run mobile fire groups against Ukrainian drones; a Russian milblogger has admitted refinery repairs are 'useless' against repeated strikes, including the Jul 28 hit near Ichki."}];
const SECTOR_PINS=[{name:"Kostyantynivka",x:340.7,y:133.2,labelDx:10,labelDy:11},{name:"Pokrovsk area",x:329.4,y:141.2,labelDx:-8,labelDy:-8,anchor:"end"},{name:"Kupyansk",x:339.0,y:95.2,labelDx:7,labelDy:-4},{name:"Zaporizhzhia",x:285.8,y:155.4,labelDx:-7,labelDy:-6,anchor:"end"},{name:"Kherson",x:231.4,y:194.0,labelDx:7,labelDy:5},{name:"Crimea",x:262.4,y:245.2,labelDx:7,labelDy:4}];
const CRIMEA_ROUTES=[{name:"Kerch Bridge",statusLabel:"DEGRADED",color:"#f97316",detail:"3 Ukrainian attacks since 2022. Unsafe for heavy traffic/rail. Oil terminals ablaze."},{name:"Chonhar Bridge (R-280)",statusLabel:"DISABLED",color:"#ef4444",detail:"Destroyed Jun 7-9 — only vehicles under 1.5 tons can cross. Largest artery severed."},{name:"N. Crimean Canal Bridges",statusLabel:"DESTROYED",color:"#dc2626",detail:"Railway bridge destroyed Jun 23 — Russia last intact rail link from north."},{name:"Henichesk Strait",statusLabel:"SUSPENDED",color:"#ef4444",detail:"Traffic suspended after Jun 20 strike."},{name:"Perekop / Armiansk Road",statusLabel:"DAMAGED",color:"#f97316",detail:"Road bridge struck Jun 11. 50 Russian military vehicles destroyed."}];
const TALKS=[{label:"Russia Demands",color:"#ef4444",flag:"🇷🇺",points:["Full cession of all four annexed oblasts","Ukrainian neutrality — no NATO","Disarmament of Ukrainian armed forces","Recognition of Crimea annexation (2014)"],assessment:"Maximalist. Effectively demands Ukrainian surrender."},{label:"Ukraine Position",color:"#5b8ec8",flag:"🇺🇦",points:["Ceasefire first, then negotiate territorial terms","Retain 800,000-strong armed forces","NATO-level security guarantees","Any territorial concessions must go to national referendum"],assessment:"Firm on sovereignty. Dec 2025 20-Point Plan offers buffer zones — but no unilateral withdrawal."},{label:"Western Framework",color:"#8b5cf6",flag:"🇪🇺",points:["Coalition of the Willing: 35 nations — UK + France pledging troops","EU €90B support loan 2026-2027","G7 Prosperity Package: ~$800B reconstruction","EU opened first of 6 accession clusters"],assessment:"Europe framing war in terms of long-term security. France/UK ready to deploy."}];

const UA_LAND_PATH="M205.1,17.7 L215.3,18.3 L216.4,20.5 L223.3,18.9 L224.3,18.2 L226.2,13.5 L225.9,11.1 L226.8,11.0 L237.9,13.7 L243.7,9.7 L248.8,10.6 L250.1,10.0 L250.8,12.2 L254.6,10.0 L257.1,10.1 L262.7,16.4 L263.4,23.0 L267.6,25.5 L270.1,28.6 L270.2,30.0 L269.4,30.9 L263.2,32.2 L263.0,33.0 L264.3,33.7 L266.1,37.1 L265.9,40.2 L265.3,41.0 L267.7,41.8 L267.9,42.9 L265.3,45.7 L274.3,46.1 L275.8,48.3 L284.4,47.0 L285.8,51.8 L290.4,52.8 L288.7,53.9 L288.9,55.5 L290.1,56.4 L290.9,60.2 L292.2,61.3 L292.8,64.3 L290.9,65.8 L291.9,69.7 L294.4,71.4 L295.9,74.5 L297.7,74.7 L300.7,72.2 L306.5,72.3 L310.0,76.8 L313.0,76.1 L315.8,77.2 L315.7,78.8 L317.0,79.3 L322.5,75.4 L329.9,74.2 L331.8,72.5 L334.6,72.0 L336.0,74.9 L338.6,76.5 L338.5,79.5 L341.3,83.3 L345.4,85.8 L347.2,89.1 L350.8,87.8 L350.9,83.9 L353.6,83.9 L354.8,86.5 L357.9,87.5 L361.5,87.0 L361.9,88.6 L365.5,90.2 L367.3,92.2 L369.7,92.0 L372.0,89.9 L374.3,94.1 L380.6,94.7 L382.0,98.3 L385.9,100.6 L390.1,98.5 L392.6,99.0 L392.8,100.1 L390.9,102.4 L393.6,107.3 L393.2,110.1 L389.1,114.0 L388.4,116.5 L383.7,117.1 L383.1,119.0 L385.0,121.4 L389.1,122.8 L390.9,121.7 L391.3,122.9 L389.6,124.8 L385.4,124.2 L383.8,126.2 L382.2,131.3 L386.0,131.4 L387.0,132.3 L387.3,133.8 L386.8,134.7 L388.5,138.1 L386.2,140.3 L387.7,141.3 L389.7,140.9 L389.9,142.1 L386.8,146.4 L386.8,149.1 L385.0,149.8 L385.8,151.5 L385.3,154.8 L384.4,156.2 L375.5,155.2 L371.1,155.8 L366.0,154.7 L364.3,156.0 L363.0,160.6 L361.4,160.4 L359.3,162.3 L354.0,163.4 L352.8,166.6 L352.7,169.8 L351.2,172.7 L353.4,173.2 L353.6,174.2 L351.6,176.2 L351.8,179.1 L350.2,181.2 L349.5,181.6 L350.0,180.0 L348.7,179.2 L337.4,179.8 L332.9,186.2 L330.6,184.5 L322.6,188.9 L322.8,189.6 L320.8,194.1 L320.2,193.7 L320.8,193.9 L321.5,191.3 L319.2,189.5 L312.8,191.3 L310.8,193.4 L310.2,195.1 L308.3,193.1 L302.1,193.6 L293.3,200.2 L290.9,202.8 L286.2,210.5 L282.4,212.1 L283.7,210.1 L287.1,208.7 L290.1,203.8 L290.2,203.0 L288.5,203.3 L288.9,200.5 L287.4,199.7 L286.8,198.1 L286.3,198.7 L287.3,201.9 L285.1,205.0 L283.4,206.5 L280.5,206.5 L278.7,208.9 L280.1,217.0 L282.8,223.3 L282.2,223.7 L278.2,220.9 L278.1,217.9 L276.1,215.5 L272.7,215.2 L271.3,216.1 L268.5,212.4 L262.7,211.2 L258.0,208.3 L254.2,207.6 L254.0,209.9 L251.6,210.2 L251.2,211.2 L251.8,211.8 L250.5,212.4 L250.9,213.1 L248.9,212.9 L247.5,211.3 L246.0,211.6 L246.6,210.4 L244.4,210.5 L244.9,207.4 L242.4,210.2 L240.3,209.2 L240.2,210.5 L234.8,210.3 L229.1,212.2 L224.0,210.5 L223.5,208.9 L224.1,208.0 L221.1,207.9 L215.9,204.3 L215.8,205.6 L214.1,205.4 L213.3,204.4 L214.0,203.6 L217.7,203.3 L219.7,201.9 L218.5,200.2 L212.9,198.5 L211.7,199.2 L211.6,200.8 L207.8,195.7 L209.3,197.1 L213.1,196.8 L225.2,199.7 L226.9,199.2 L227.7,197.1 L232.2,193.7 L225.5,196.5 L223.7,195.1 L221.5,196.6 L220.9,195.1 L218.8,194.4 L217.1,190.2 L217.0,188.9 L218.5,185.2 L218.2,184.3 L217.0,183.9 L217.8,182.1 L215.4,181.6 L216.1,179.4 L214.7,176.4 L213.1,175.5 L212.8,174.1 L212.5,175.3 L214.2,176.2 L214.4,178.5 L215.6,179.4 L214.8,182.2 L217.2,182.5 L216.2,184.2 L217.7,184.5 L217.2,187.0 L215.4,188.7 L216.3,190.9 L216.2,193.7 L214.4,194.6 L211.3,193.6 L209.3,194.7 L207.4,194.4 L207.4,193.3 L210.1,188.4 L207.8,190.6 L206.3,188.9 L207.7,191.4 L205.8,194.4 L204.1,195.3 L200.3,194.4 L192.4,196.8 L191.6,198.0 L192.5,200.2 L192.0,201.9 L190.7,203.4 L189.4,203.5 L190.0,205.0 L186.0,212.0 L178.4,220.4 L178.1,218.1 L177.4,220.6 L175.2,219.5 L174.4,222.0 L173.8,220.6 L173.9,223.5 L173.0,222.2 L171.1,223.1 L171.2,224.1 L172.4,225.3 L169.7,227.0 L168.6,224.4 L168.8,221.7 L167.6,220.2 L167.6,224.0 L166.9,224.6 L166.6,228.8 L167.8,229.3 L169.1,228.4 L166.9,231.4 L167.7,232.6 L168.4,231.5 L169.2,232.8 L169.6,231.5 L170.1,233.0 L169.5,233.4 L170.2,236.5 L169.6,239.2 L168.4,239.9 L167.9,235.7 L163.2,233.0 L158.8,233.2 L153.3,236.4 L152.4,237.8 L149.4,236.5 L148.8,238.0 L149.7,239.0 L147.7,239.5 L139.5,236.4 L138.6,233.2 L136.7,231.9 L138.2,230.0 L143.2,230.4 L143.1,228.8 L144.0,228.1 L142.6,225.6 L144.5,223.7 L144.8,222.3 L146.8,221.8 L146.8,220.7 L148.3,219.8 L148.3,216.1 L153.0,214.6 L152.6,211.7 L154.2,208.7 L152.5,206.3 L152.2,201.6 L152.7,200.0 L157.9,197.3 L158.2,203.1 L160.0,201.8 L160.5,199.4 L162.0,201.2 L163.7,199.0 L164.4,199.3 L164.2,200.9 L167.1,203.0 L168.0,201.0 L169.0,200.8 L169.2,199.5 L171.7,203.7 L173.6,202.6 L177.1,202.6 L178.2,201.0 L177.0,201.0 L175.4,198.7 L173.3,197.5 L174.3,196.0 L173.8,188.6 L165.9,184.2 L166.8,180.5 L166.2,179.5 L165.1,180.5 L164.2,178.8 L165.6,178.1 L165.6,174.9 L166.4,174.0 L165.9,172.0 L164.2,171.5 L163.8,173.0 L162.7,173.4 L158.9,168.1 L157.3,167.9 L156.4,165.3 L159.0,158.1 L157.7,157.0 L159.0,154.4 L157.6,153.7 L156.6,151.0 L152.8,152.3 L150.3,149.4 L149.6,146.6 L144.8,145.3 L143.6,145.4 L142.7,148.2 L141.3,144.7 L139.3,145.9 L140.2,144.1 L140.1,142.6 L137.1,143.5 L136.3,141.9 L134.4,142.6 L134.1,140.1 L130.9,139.3 L127.8,136.0 L124.4,135.7 L123.5,134.6 L119.6,137.0 L118.3,136.2 L115.4,138.6 L111.8,137.4 L111.7,138.6 L109.7,138.9 L107.4,137.6 L106.2,138.5 L106.1,141.0 L104.1,139.6 L102.1,142.2 L96.0,143.4 L95.3,147.2 L93.2,150.5 L73.6,153.5 L69.7,158.5 L65.8,159.6 L63.9,156.8 L61.1,155.4 L60.1,153.2 L58.2,152.0 L55.3,151.8 L51.5,153.6 L46.7,151.5 L43.4,152.4 L41.8,150.6 L37.2,150.1 L35.0,151.2 L28.1,147.1 L26.4,150.0 L25.2,150.8 L23.4,150.1 L23.3,151.6 L22.4,152.0 L21.5,150.9 L21.9,148.7 L20.8,147.3 L19.6,146.5 L16.6,147.1 L13.9,142.4 L11.3,142.4 L10.0,139.0 L9.1,138.7 L9.4,137.3 L6.4,137.2 L6.6,131.9 L10.3,128.3 L11.5,122.7 L13.2,119.0 L14.8,118.3 L15.2,115.7 L22.2,117.7 L21.7,115.0 L18.2,112.9 L19.4,109.2 L19.0,105.7 L17.4,101.0 L17.9,99.8 L27.2,87.2 L38.9,75.8 L39.7,74.0 L46.1,72.8 L46.8,70.0 L48.9,68.5 L48.3,62.9 L47.1,62.4 L47.1,61.2 L45.6,59.9 L49.6,58.3 L46.1,55.7 L44.6,53.5 L43.6,48.9 L38.7,43.9 L40.0,40.7 L39.0,39.1 L39.3,38.2 L38.1,37.2 L38.6,36.6 L37.8,34.5 L38.3,33.6 L41.2,32.9 L46.1,34.8 L51.8,30.6 L53.2,27.0 L54.9,25.3 L62.0,25.3 L71.0,23.1 L75.6,24.0 L84.5,23.8 L91.2,24.7 L93.3,26.1 L98.2,26.3 L99.1,27.7 L103.8,27.9 L107.8,29.5 L114.2,29.3 L114.8,29.6 L115.0,32.3 L116.9,32.7 L116.7,34.8 L121.2,33.6 L125.8,34.7 L125.2,37.8 L126.3,38.7 L128.0,37.0 L128.8,33.9 L131.5,35.6 L134.0,35.7 L136.9,32.7 L139.6,36.7 L142.3,35.3 L145.4,35.9 L146.1,39.2 L147.6,39.4 L148.1,40.8 L149.6,36.5 L153.5,35.3 L155.3,33.4 L157.4,34.2 L158.8,37.0 L158.8,39.0 L160.8,41.9 L163.9,41.3 L164.8,39.6 L167.6,37.9 L171.7,39.8 L172.9,38.7 L178.6,38.1 L182.3,40.7 L182.2,42.7 L183.0,43.8 L187.0,46.1 L189.2,41.8 L188.0,39.9 L188.7,38.6 L187.5,36.9 L187.9,36.2 L186.6,35.6 L187.0,34.9 L186.4,34.2 L187.3,33.6 L187.6,31.1 L188.8,30.9 L189.3,29.4 L188.7,29.2 L191.3,24.8 L192.3,24.7 L194.6,21.5 L195.6,21.7 L195.1,19.6 L198.9,18.9 L201.8,20.2 L205.1,17.7 Z M169.6,227.8 L177.0,221.3 L178.1,220.7 L173.4,225.4 L171.3,227.0 L169.6,227.8 Z M231.6,212.7 L241.0,213.8 L240.7,214.2 L231.6,212.7 Z M210.1,206.3 L219.9,208.7 L221.9,209.8 L209.3,206.2 L208.1,204.5 L207.7,202.6 L210.1,206.3 Z";
const UA_CRIMEA_PATH="M254.0,209.9 L254.2,207.6 L255.2,208.3 L258.0,208.3 L262.7,211.2 L264.7,211.7 L266.4,211.5 L267.8,212.4 L268.5,212.4 L269.1,212.8 L270.1,215.0 L271.3,216.1 L272.1,216.2 L272.7,215.2 L275.1,215.2 L277.1,216.1 L278.1,217.9 L278.2,220.9 L278.7,221.5 L280.0,221.9 L281.7,223.6 L282.8,223.3 L283.7,225.2 L289.9,234.9 L293.1,237.2 L293.9,237.3 L298.1,235.8 L298.7,235.2 L298.9,234.4 L299.7,233.7 L300.0,232.4 L300.7,231.7 L301.2,231.7 L301.1,233.5 L303.9,235.1 L304.7,235.0 L305.7,233.0 L306.8,232.1 L309.7,232.0 L310.3,231.5 L310.8,232.0 L310.7,232.5 L311.5,232.1 L313.1,232.8 L314.8,232.5 L315.7,233.6 L316.8,233.1 L317.4,233.6 L317.9,235.5 L316.8,236.1 L315.0,235.6 L314.6,236.6 L314.9,237.1 L314.8,237.4 L313.6,238.1 L313.2,239.4 L313.0,242.0 L313.1,242.7 L314.0,243.9 L313.7,244.6 L312.1,245.2 L310.0,245.4 L309.5,246.5 L309.1,246.6 L305.3,245.2 L304.1,246.9 L301.0,247.1 L300.5,246.8 L299.6,245.0 L297.9,243.8 L295.4,243.0 L293.6,243.2 L291.5,244.8 L291.4,246.0 L292.1,246.7 L290.8,246.9 L290.5,247.2 L290.6,248.6 L289.6,247.8 L289.2,248.2 L288.6,247.9 L288.3,248.1 L287.4,249.6 L286.1,250.0 L284.5,253.4 L283.6,253.3 L282.9,252.1 L282.5,252.0 L281.5,252.0 L280.4,252.7 L276.8,252.9 L275.3,254.0 L271.4,255.5 L269.4,258.7 L268.4,261.4 L267.1,261.4 L266.5,262.7 L265.2,263.1 L264.5,264.5 L263.5,265.3 L259.9,266.7 L258.1,266.1 L255.3,266.1 L253.4,265.0 L253.1,264.1 L252.2,263.0 L250.9,263.2 L247.8,260.4 L247.8,260.1 L249.2,259.5 L252.1,259.0 L250.9,258.6 L251.6,256.5 L250.9,253.7 L251.8,251.6 L252.9,250.9 L253.1,249.0 L251.9,243.8 L251.4,243.0 L248.3,240.7 L245.4,241.8 L245.0,241.0 L243.5,240.5 L241.5,238.1 L237.6,235.4 L234.0,235.2 L232.6,236.5 L231.0,236.5 L229.3,235.8 L228.7,233.6 L229.6,232.1 L232.2,230.0 L233.5,229.7 L234.6,228.6 L236.1,228.7 L236.1,227.6 L237.0,226.5 L243.6,222.9 L243.7,222.5 L243.2,222.1 L243.4,221.6 L244.8,222.6 L245.5,222.5 L250.2,219.3 L251.2,219.7 L253.1,218.4 L254.0,219.1 L254.7,219.1 L254.7,217.4 L256.5,216.9 L254.5,216.0 L253.1,216.2 L253.7,215.3 L253.4,215.0 L253.6,214.1 L253.3,212.4 L253.7,211.7 L253.3,210.6 L254.0,209.9 Z";
const UA_OCCUPIED_PATH="M339.0,95.2 L315.8,77.2 L322.5,75.4 L334.6,72.0 L338.5,79.5 L347.2,89.1 L353.6,83.9 L361.5,87.0 L367.3,92.2 L374.3,94.1 L385.9,100.6 L392.8,100.1 L393.2,110.1 L383.7,117.1 L389.1,122.8 L389.6,124.8 L382.2,131.3 L387.3,133.8 L386.2,140.3 L389.9,142.1 L385.0,149.8 L384.4,156.2 L366.0,154.7 L361.4,160.4 L337.4,179.8 L290.7,187.3 L242.0,193.4 L258.0,208.3 L285.8,164.7 L331.7,157.3 L333.2,141.2 L344.0,133.2 L347.2,131.2 L352.1,117.1 Z";
const UA_FRONTLINE_PATH="M339.0,95.2 L352.1,117.1 L347.2,131.2 L344.0,133.2 L333.2,141.2 L331.7,157.3 L285.8,164.7 L290.7,187.3 L242.0,193.4";
function FMap({t,sel,setSel}){const abbrev=n=>n==="Kostyantynivka"?"Kostyant.":n==="Pokrovsk area"?"Pokrovsk":n;return <div style={{borderRadius:12,overflow:"hidden",border:"1px solid rgba(59,130,246,0.2)",marginBottom:0}}><svg viewBox="0 0 400 279" width="100%" style={{display:"block",background:"#0a1524"}}><path d={UA_LAND_PATH} fill="#1e3a5f" stroke="#2d5f99" strokeWidth="1.2"/><path d={UA_CRIMEA_PATH} fill="#1e3a5f" stroke="#2d5f99" strokeWidth="1.2"/><path d={UA_OCCUPIED_PATH} fill="#4a1111" stroke="#8b2222" strokeWidth="1" opacity="0.85"/><path d={UA_FRONTLINE_PATH} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6,3" opacity="0.9"/>{[["Kyiv",186.6,71.4,"#60a5fa","start",5],["Kharkiv",309.2,86.2,"#60a5fa","start",5],["Dnipro",283.6,135.4,"#60a5fa","start",5],["Odesa",190.8,199.2,"#60a5fa","start",5],["Donetsk",342.9,149.6,"#fca5a5","start",5],["Luhansk",375.3,131.9,"#fca5a5","end",-5]].map(([n,x,y,col,ta,dx])=><g key={n}><circle cx={x} cy={y} r="3" fill={col} opacity="0.85"/><text x={x+dx} y={y+4} fontSize="7.5" fill={col} textAnchor={ta} opacity="0.8">{n}</text></g>)}{SECTOR_PINS.map(pin=>{const sec=SECTORS.find(s=>s.name===pin.name);if(!sec)return null;const isSel=sel===pin.name,r=isSel?9:6;return <g key={pin.name} style={{cursor:"pointer"}} onClick={()=>setSel(isSel?null:pin.name)}><circle cx={pin.x} cy={pin.y} r={r+4} fill={sec.color} opacity={0.15}/><circle cx={pin.x} cy={pin.y} r={r} fill={sec.color} opacity={isSel?1:0.85} stroke="#0c1829" strokeWidth={1.5}/>{isSel&&<circle cx={pin.x} cy={pin.y} r={r+7} fill="none" stroke={sec.color} strokeWidth={1} opacity={0.5} strokeDasharray="3,2"/>}<text x={pin.x+(pin.labelDx||6)} y={pin.y+(pin.labelDy||4)} fontSize="7" fill="#dde6f5" textAnchor={pin.anchor??"start"} fontWeight={isSel?"bold":"normal"} opacity={0.9}>{abbrev(pin.name)}</text></g>;})} <rect x="0" y="263" width="400" height="16" fill="rgba(0,0,0,0.65)"/><circle cx="10" cy="271" r="3" fill="#1e3a5f" stroke="#2d5f99" strokeWidth="1"/><text x="16" y="275" fontSize="7.5" fill="#7a93b8">UA-held</text><circle cx="62" cy="271" r="3" fill="#4a1111" stroke="#8b2222" strokeWidth="1"/><text x="68" y="275" fontSize="7.5" fill="#7a93b8">Occupied</text><line x1="114" y1="271" x2="127" y2="271" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2"/><text x="131" y="275" fontSize="7.5" fill="#7a93b8">Front line</text></svg></div>;}

// ── Ukraine Section Tabs ─────────────────────────────────────────────────────────
function LossesTab({t}){const[sortBy,setSortBy]=useState("default");const chartData=CASUALTIES.map(c=>({d:c.date,kia:c.value}));const avg7d=Math.round(CASUALTIES.slice(-7).reduce((a,b)=>a+b.value,0)/7);const vals=chartData.map(d=>d.kia);const yMin=Math.floor(Math.min(...vals)/50)*50-50;const yMax=Math.ceil(Math.max(...vals)/50)*50+50;const sortedByTotal=useMemo(()=>[...LOSSES.ukraine].sort((a,b)=>(parseInt(b.total.replace(/[^0-9]/g,""))||0)-(parseInt(a.total.replace(/[^0-9]/g,""))||0)),[]);const displayLosses=sortBy==="total"?sortedByTotal:LOSSES.ukraine;
  const weeklyCas=(()=>{const out=[];for(let end=CASUALTIES.length;end-7>=0;end-=7){const s=CASUALTIES.slice(end-7,end);out.unshift({m:s[6].date,avg:Math.round(s.reduce((a,b)=>a+b.value,0)/7),total:s.reduce((a,b)=>a+b.value,0)});}return out;})();
  const wkDelta=weeklyCas.length>=2?weeklyCas[weeklyCas.length-1].avg-weeklyCas[weeklyCas.length-2].avg:0;
  const dailyCasFull=CASUALTIES.map(d=>({m:d.date,v:d.value}));
  const casMA=dailyCasFull.map((d,i)=>({...d,ma:i>=6?Math.round(dailyCasFull.slice(i-6,i+1).reduce((a,b)=>a+b.v,0)/7):null}));
  const costPerKm=HISTORICAL.ruTerritoryKm2.map((d,i)=>({m:d.m,v:Math.round(HISTORICAL.ruCasualtiesMonthly[i].v/Math.max(1,d.v))}));
  return <div><ST t={t}>📊 Daily Russian Casualties — Last 14 Days</ST><Card t={t} style={{padding:"14px 8px 8px"}}><div style={{height:180}}><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{top:0,right:4,left:-20,bottom:0}}><defs><linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="d" tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false}/><YAxis domain={[yMin,yMax]} tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false}/><Tooltip content={<TT/>}/><ReferenceLine y={avg7d} stroke="#fbbf24" strokeDasharray="4 2" strokeWidth={1.5}/><Area type="monotone" dataKey="kia" stroke="#ef4444" fill="url(#areaGrad)" strokeWidth={2}/></AreaChart></ResponsiveContainer></div><div style={{display:"flex",alignItems:"center",gap:6,padding:"4px 8px",fontSize:11,color:t.sub}}><span style={{width:18,height:2,background:"#fbbf24",display:"inline-block"}}/>7-day avg: ~{avg7d.toLocaleString()}/day</div></Card><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:14,marginBottom:6}}><ST t={t}>🇷🇺 Equipment Destroyed</ST><div style={{display:"flex",gap:4}}>{["default","total"].map(s=><button key={s} onClick={()=>setSortBy(s)} style={{padding:"3px 8px",fontSize:10,borderRadius:6,cursor:"pointer",fontFamily:FONT,fontWeight:600,background:sortBy===s?"#5b8ec8":"none",color:sortBy===s?"#fff":t.sub,border:`1px solid ${sortBy===s?"#5b8ec8":t.border}`}}>{s==="default"?"Default":"Sort by Total"}</button>)}</div></div><Card t={t}>{displayLosses.map((item,i)=><Row key={item.id} t={t} last={i===displayLosses.length-1}><span style={{fontSize:18,width:28,textAlign:"center",flexShrink:0}}>{item.icon}</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:t.text}}>{item.category}</div><div style={{fontSize:11,color:t.sub}}>{item.description}</div></div><div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:15,fontWeight:700,color:item.color??t.text,fontVariantNumeric:"tabular-nums"}}>{item.total}</div><div style={{fontSize:11,fontWeight:500,color:item.todayChange==="—"?t.sub:"#22c55e"}}>{item.todayChange}</div></div></Row>)}</Card>
    <ST t={t}>📈 H1 2026 Trends</ST>
    <TrendChart t={t} data={HISTORICAL.ruCasualtiesCumulative} color="#ef4444" label="Cumulative RU Casualties" unit="total killed/wounded" area desc="Crossed 1.4M in June. The curve is near-linear — sustained attrition of roughly 36-38K/month with no sign of the rate easing." />
    <TrendChart t={t} data={ruMonthlyWithMTD()} color="#f97316" label="Monthly RU Casualty Rate" unit="killed/wounded per month" desc="June closed at ~16.5K, the lowest complete month of H1 — a sharp one-month dip from May's ~36K that's worth watching for whether it's a real slowdown or a reporting gap. The final point is the current month accumulating in real time from the daily MoD reports, so it sits below the completed months until the month closes." />
    <div style={{height:150}}><ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={weeklyCas} margin={{top:4,right:8,left:-12,bottom:0}}>
          <XAxis dataKey="m" tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false}/>
          <YAxis domain={[0,Math.ceil(Math.max(...weeklyCas.map(d=>d.avg))/200)*200+200]} tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false} width={38}/>
          <Tooltip contentStyle={{background:t.isDark?"#101d30":"#fff",border:`1px solid ${t.border}`,borderRadius:8,fontSize:12}} labelStyle={{color:t.sub}} formatter={(v,n)=>[v.toLocaleString(),n==="avg"?"avg/day":"week total"]}/>
          <Bar dataKey="avg" name="avg" fill="#ef4444" radius={[3,3,0,0]}/>
        </ComposedChart>
      </ResponsiveContainer></div>
    <div style={{fontSize:11,color:t.sub,lineHeight:1.5,padding:"2px 8px 14px"}}>Weekly RU personnel losses, avg/day — each bar a complete 7-day window ending on the date shown. Latest week runs {weeklyCas[weeklyCas.length-1].avg.toLocaleString()}/day ({weeklyCas[weeklyCas.length-1].total.toLocaleString()} total), {wkDelta===0?"flat versus":wkDelta>0?"up "+wkDelta.toLocaleString()+"/day on":"down "+Math.abs(wkDelta).toLocaleString()+"/day on"} the week before.</div>
    <TrendChart t={t} data={HISTORICAL.ruTerritoryKm2} color="#eab308" label="RU Territorial Gains" unit="km² captured per month" desc="The key counter-trend: Russian advance peaked in March and has declined sharply since — June's ~11km² is the slowest of the year despite record casualties, underscoring the attrition-vs-gain mismatch." />
    <TrendChart t={t} data={costPerKm} color="#dc2626" label="Casualties per km² Gained" unit="RU killed/wounded per km² captured" area desc="Derived series: monthly casualties divided by territorial gain. January cost ~950 casualties per km²; June's figure (~1,505) is noisier than prior months given the casualty dip that month — read this ratio alongside the raw casualty and territory charts above rather than in isolation." />
    <TrendChart t={t} data={HISTORICAL.deepStrikes} color="#5b8ec8" label="Ukrainian Deep Strikes" unit="strikes on RU rear per month" desc="Ukraine's long-range strike campaign has climbed steadily — refinery and logistics targeting now a defining feature of the war's economic dimension." />
    <TrendChart t={t} data={HISTORICAL.refineryOffline} color="#22c55e" label="RU Refining Capacity Offline" unit="% of national capacity" area desc="From ~8% in January to ~40% by June — the cumulative effect of the deep-strike campaign on Russia's fuel economy." />
  </div>;}

function FrontlineTab({t}){const[sel,setSel]=useState(null);const selSec=sel?SECTORS.find(s=>s.name===sel):null;return <div><ST t={t}>🗺️ Situation Map — {REPORT_NOW.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</ST><div style={{fontSize:11,color:t.sub,textAlign:"center",marginBottom:6}}>Tap a sector pin for detail · Dashed red = contact line</div><FMap t={t} sel={sel} setSel={setSel}/>{selSec?<div style={{margin:"8px 0 12px",background:`${selSec.color}12`,border:`1.5px solid ${selSec.color}55`,borderRadius:10,padding:"12px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontSize:18}}>{selSec.icon}</span><span style={{fontSize:14,fontWeight:800,color:t.text,flex:1}}>{selSec.name}</span><Pill label={selSec.status} color={selSec.color}/><button onClick={()=>setSel(null)} aria-label="Close details" style={{background:"none",border:"none",color:t.sub,cursor:"pointer",fontSize:16,padding:"0 2px"}}>✕</button></div><div style={{fontSize:12.5,color:t.sub,lineHeight:1.6}}>{selSec.detail}</div></div>:<div style={{fontSize:10.5,color:t.sub,textAlign:"center",marginBottom:10,opacity:0.6}}>No sector selected — tap a pin above</div>}<ST t={t}>🎯 Sector Analysis</ST>{SECTORS.map(s=><Card key={s.name} t={t} style={{borderLeft:`4px solid ${s.color}`,cursor:"pointer"}} onClick={()=>setSel(sel===s.name?null:s.name)}><div style={{padding:"13px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:18}}>{s.icon}</span><span style={{fontSize:14,fontWeight:700,color:t.text,flex:1}}>{s.name}</span><Pill label={s.status} color={s.color}/><span style={{fontSize:12,color:t.sub}}>{sel===s.name?"▲":"▼"}</span></div>{sel===s.name&&<div style={{fontSize:12.5,color:t.sub,lineHeight:1.6,paddingTop:8}}>{s.detail}</div>}</div></Card>)}</div>;}

function AirDefTab({t}){return <div>
      <Hero t={t} color="#06b6d4"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#67e8f9",marginBottom:6}}>🛡️ AIR DEFENSE — THE INTERCEPT WAR</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Ukraine wins the drone fight on economics and loses the ballistic fight on inventory. CSIS: only 14 of 54 Russian ballistic missiles intercepted in June; zero of the 23 that hit Kyiv on Jul 6. The gap was never skill — it is PAC-3 stock. On Jul 8 at Ankara, Trump licensed Ukraine to manufacture Patriots itself; no timeline yet exists.</div></Hero>
      <Grid2 t={t} items={[
        {icon:"🎯",label:"Drone intercept rate",val:"91.7%",sub:"May 2026 monthly avg; ~89% on Jul 4 night",color:"#22c55e"},
        {icon:"💰",label:"Interceptor economics",val:"$7.5k vs $35k",sub:"UA interceptor drone vs Shahed/Geran — cost flipped",color:"#5b8ec8"},
        {icon:"🚀",label:"Ballistic intercepts",val:"14 of 54",sub:"June, per CSIS. Zero of 23 on Jul 6.",color:"#dc2626"},
        {icon:"📜",label:"Patriot license",val:"Walked back",sub:"Jul 9 claim reversed by Trump Jul 31 — \u2018we have not agreed to that\u2019",color:"#dc2626"},
      ]}/>
      <ST t={t} color="#06b6d4">📋 The Layered System</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>The Jul 8 shift — a license, not a delivery</span> — Trump: "We're going to give a license to you to make Patriots... I said, make them yourself." Zelensky, Jul 9: the licence is agreed "at the political level," with interceptor supplies due "in the coming days" — but an adviser to the defence minister warns setting up production will take many months, and reported bottlenecks run 12-24 months on subcontracted components. Trump had not yet informed Lockheed Martin or RTX. Kyiv has meanwhile asked nearly 40 countries for interceptors from existing stocks, against future contracted deliveries. Separately, Poland and several NATO states signed on to a European PAC-3 maintenance center and Polish co-production with Ukraine; Poland is sending 5 missiles now. Ukraine's own 'Freyja' anti-ballistic interceptor may draw eight European partners.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Top layer — Patriot/SAMP-T</span> — The only counter to Iskander-M and Zircon-class threats. Stock is the war's binding constraint: US production ~500-650 PAC-3 MSE/yr against global demand, European GEM-T co-production (up to 1,000 missiles, DE/NL/RO/ES) the structural fix. Zelensky renewed interceptor appeals after the Kyiv strike.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Middle layer — IRIS-T, NASAMS, F-16s</span> — Cruise-missile and heavy-drone attrition; Denmark-donated F-16s now fly regular intercept sorties. Effective but missile-hungry against saturation raids.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Bottom layer — interceptor drones + mobile teams</span> — The 2026 revolution: $7.5k interceptor drones and gun trucks now take the bulk of Shahed/Gerbera kills, flipping the exchange ratio Ukraine's way and freeing missiles for what only missiles can stop. Sky Fortress acoustic net cues the layer.</div>
        <div><span style={{color:t.text,fontWeight:700}}>The stress test</span> — Saturation raids mix decoys (Gerbera), jet drones (Geran-4), cruise and ballistic in one wave to exhaust the stack top-down. See Drone War → Saturation for the model; the Jul 1-2 raid is its worst-case validation.</div>
      </div></div></Card>
      <Card t={t} style={{padding:"12px 14px 10px"}}>
      <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",marginBottom:8}}><div style={{fontSize:12,fontWeight:700,color:t.text}}>Ballistic Intercept Collapse</div><div style={{fontSize:10,color:t.sub}}>% of RU ballistic missiles intercepted</div></div>
      {BALLISTIC_INTERCEPTS.map((b,i)=>{const pct=Math.round(b.downed/b.n*100);return <div key={i} style={{marginBottom:9}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3}}><span style={{color:t.text,fontWeight:600}}>{b.label}</span><span style={{color:pct>0?"#eab308":"#dc2626",fontWeight:700}}>{b.downed}/{b.n} — {pct}%</span></div>
        <div style={{height:7,borderRadius:4,background:t.isDark?"rgba(255,255,255,.07)":"rgba(0,0,0,.07)",overflow:"hidden"}}><div style={{height:"100%",width:`${Math.max(pct,2)}%`,borderRadius:4,background:pct>0?"#eab308":"#dc2626",animation:"barGrow .8s ease-out",transformOrigin:"left"}}/></div>
      </div>;})}
      <div style={{fontSize:10,fontWeight:800,color:t.sub,textTransform:"uppercase",letterSpacing:".08em",margin:"12px 0 8px",paddingTop:10,borderTop:`1px solid ${t.isDark?"rgba(255,255,255,.08)":"rgba(0,0,0,.08)"}`}}>Most Recent Nights</div>
      {BALLISTIC_INTERCEPTS_RECENT.map((b,i)=>{const pct=Math.round(b.downed/b.n*100);return <div key={i} style={{marginBottom:9}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3}}><span style={{color:t.text,fontWeight:600}}>{b.label}</span><span style={{color:pct>0?"#eab308":"#dc2626",fontWeight:700}}>{b.downed}/{b.n} — {pct}%</span></div>
        <div style={{height:7,borderRadius:4,background:t.isDark?"rgba(255,255,255,.07)":"rgba(0,0,0,.07)",overflow:"hidden"}}><div style={{height:"100%",width:`${Math.max(pct,2)}%`,borderRadius:4,background:pct>0?"#eab308":"#dc2626",animation:"barGrow .8s ease-out",transformOrigin:"left"}}/></div>
      </div>;})}
      <div style={{fontSize:11,color:t.sub,lineHeight:1.5,marginTop:8}}>Ballistic intercept performance collapsed from 26% in June to zero for most of mid-July as PAC-3 stocks ran out, then partially recovered late-month — Jul 13–19 and Jul 20–26 both show a real rebound (50% and 56%), and the Jul 25–26 Kyiv strike downed 5 of 7 (71%), the best single-night rate since the shortage began. The drone intercept rate has stayed near 90% throughout — this is specifically an interceptor-inventory story. Mixed granularity by necessity: June is a monthly figure (CSIS), weekly rows sum only nights with a confirmed ballistic-specific breakdown, and the most recent nights are single engagements (UA Air Force). Sources noted per row.</div>
    </Card>
      <Note t={t} color="#06b6d4">Intercept rates: UA Air Force nightly reports (via Militarnyi/Ukrinform); economics per interceptor-drone program disclosures. Cross-reference: Drone War → Intercept & AD Systems, Great Powers → Defense Industry (PAC-3 production).</Note>
    </div>;}

function SouthernFrontTab({t}){const[sub,setSub]=useState("crimea");return <div><div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>{[{id:"crimea",label:"🏴 Crimea"},{id:"blacksea",label:"🌊 Black Sea"},].map(o=><button key={o.id} onClick={()=>setSub(o.id)} style={{padding:"4px 12px",fontSize:11,borderRadius:14,cursor:"pointer",fontFamily:FONT,fontWeight:700,background:sub===o.id?"#5b8ec8":"none",color:sub===o.id?"#fff":t.sub,border:`1px solid ${sub===o.id?"#5b8ec8":t.border}`}}>{o.label}</button>)}</div>{sub==="crimea"&&<CrimeaTab t={t}/>}{sub==="blacksea"&&<BlackSeaTab t={t}/>}</div>;}

function StrikeWarTab({t}){const[sub,setSub]=useState("strikes");return <div><div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>{[{id:"strikes",label:"💥 Deep Strikes"},{id:"airdef",label:"🛡️ Air Defense"},].map(o=><button key={o.id} onClick={()=>setSub(o.id)} style={{padding:"4px 12px",fontSize:11,borderRadius:14,cursor:"pointer",fontFamily:FONT,fontWeight:700,background:sub===o.id?"#5b8ec8":"none",color:sub===o.id?"#fff":t.sub,border:`1px solid ${sub===o.id?"#5b8ec8":t.border}`}}>{o.label}</button>)}</div>{sub==="strikes"&&<StrikesTab t={t}/>}{sub==="airdef"&&<AirDefTab t={t}/>}</div>;}

function DiploAlliesTab({t}){const[sub,setSub]=useState("diplomacy");return <div><div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>{[{id:"diplomacy",label:"🗣️ Diplomacy"},{id:"nato",label:"🤝 NATO & Allies"},].map(o=><button key={o.id} onClick={()=>setSub(o.id)} style={{padding:"4px 12px",fontSize:11,borderRadius:14,cursor:"pointer",fontFamily:FONT,fontWeight:700,background:sub===o.id?"#5b8ec8":"none",color:sub===o.id?"#fff":t.sub,border:`1px solid ${sub===o.id?"#5b8ec8":t.border}`}}>{o.label}</button>)}</div>{sub==="diplomacy"&&<DiplomacyTab t={t}/>}{sub==="nato"&&<NATOTab t={t}/>}</div>;}

function DiplomacyTab({t}){const[open,setOpen]=useState(null);const TRACKS=[{label:"🇹🇷 Turkish ceasefire push",status:"BLOCKED",color:"#ef4444",text:"Rejected by Moscow outright pre-summit, freezing the only comprehensive-ceasefire track."},{label:"🇺🇸 Trump-Zelensky channel",status:"ACTIVE",color:"#22c55e",text:"Jul 28 White House meeting — Zelensky called it 'good' — covered Patriot production licensing and diplomacy; Ukraine struck the Ryazan refinery hours later, underscoring materiel/battlefield alignment over political breakthroughs."},{label:"🇺🇸🇷🇺 Rubio-Lavrov Manila channel",status:"OPENED",color:"#eab308",text:"35-minute Jul 23 meeting produced no breakthrough but marked the first substantive direct US-Russia contact on Ukraine in months; Bloomberg reports Putin has since dropped territorial-concession offers entirely."},{label:"🔄 Prisoner swaps",status:"DELIVERING",color:"#22c55e",text:"Istanbul-framework exchanges keep working through backlogs — the only track with an unbroken 2026 record."},{label:"💰 Sanctions-relief sequencing",status:"UNTESTED",color:"#eab308",text:"West ties relief to verified withdrawal; Russia demands relief first — no mechanism agreed. EU adopted its 21st sanctions package Jul 23, freezing the oil price cap through Jul 2027."},{label:"🇷🇺 Moscow's posture",status:"MAXIMALIST",color:"#ef4444",text:"Territorial recognition plus NATO renunciation remain preconditions; Kremlin now treats the Anchorage understandings as void."}];return <div><Hero t={t} style={{borderLeft:"4px solid #8b5cf6"}}><div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🗣️ Peace Talks — Current Status</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:12}}><div><div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Overall status</div><div style={{fontSize:20,fontWeight:800,color:"#ef4444"}}>STALLED</div></div><div><div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Most recent contact</div><div style={{fontSize:13,fontWeight:700,color:"#5b8ec8",lineHeight:1.3}}>Zelensky-Trump, White House, Jul 28</div></div><div><div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Military track</div><div style={{fontSize:13,fontWeight:700,color:"#22c55e"}}>Constructive</div></div><div><div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Political track</div><div style={{fontSize:13,fontWeight:700,color:"#ef4444"}}>STUCK</div></div></div></Hero><ST color="#22c55e" t={t}>📋 Track Status Board</ST><Card t={t}><div style={{padding:"11px 14px"}}>{TRACKS.map((tr,i,a)=><div key={i} style={{marginBottom:i<a.length-1?8:0,paddingBottom:i<a.length-1?8:0,borderBottom:i<a.length-1?`.5px solid ${t.sep}`:0}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:12.5,fontWeight:700,color:t.text}}>{tr.label}</span><span style={{fontSize:10,fontWeight:800,color:tr.color}}>{tr.status}</span></div><div style={{fontSize:11.5,color:t.sub,lineHeight:1.5}}>{tr.text}</div></div>)}</div></Card><ST color="#8b5cf6" t={t}>⚖️ Negotiating Positions</ST>{TALKS.map(pos=><Card key={pos.label} t={t} style={{borderLeft:`4px solid ${pos.color}`,marginBottom:10}}><div style={{padding:"13px 14px",cursor:"pointer"}} onClick={()=>setOpen(open===pos.label?null:pos.label)}><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:22}}>{pos.flag}</span><span style={{fontSize:14,fontWeight:800,color:t.text,flex:1}}>{pos.label}</span><span style={{fontSize:14,color:t.sub}}>{open===pos.label?"▲":"▼"}</span></div></div>{open===pos.label&&<div style={{padding:"0 14px 14px"}}>{pos.points.map((pt,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:12.5,color:t.sub,lineHeight:1.5}}><span style={{color:pos.color,fontWeight:700,flexShrink:0}}>▸</span>{pt}</div>)}<div style={{fontSize:11.5,color:t.sub,background:`${pos.color}09`,border:`1px solid ${pos.color}18`,borderRadius:6,padding:"8px 10px",lineHeight:1.5,marginTop:8,fontStyle:"italic"}}>{pos.assessment}</div></div>}</Card>)}<EventsTimeline t={t} events={EVENTS.ukraine} label="Diplomatic Timeline"/></div>;}

function CrimeaTab({t}){return <div><Hero t={t} style={{borderLeft:"4px solid #ef4444"}}><div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🏴 OPERATION LOGISTICS LOCKDOWN — SIEGE OF CRIMEA</div><Grid2 t={t} items={[{val:"BANNED",label:"Civilian fuel sales",sub:"All sales suspended Jun 21",color:"#ef4444"},{val:"↓71%",label:"R-280 highway traffic",sub:"vs 14 days ago",color:"#ef4444"},{val:"80% cancelled",label:"Jun 2026 tourism",sub:"Summer season collapsed",color:"#f97316",vs:16},{val:"~25%",label:"BSF battle space",sub:"Down from 60% pre-war",color:"#f97316"},{val:"DECLARED",label:"Crimea state of emergency",sub:"Fuel · water · power failures Jun 27",color:"#ef4444"}]}/></Hero><ST color="#ef4444" t={t}>🗺️ Supply Routes Status</ST>{CRIMEA_ROUTES.map(r=><Card key={r.name} t={t} style={{borderLeft:`4px solid ${r.color}`}}><div style={{padding:"12px 14px"}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5}}><div style={{fontSize:13,fontWeight:700,color:t.text}}>{r.name}</div><Pill label={r.statusLabel} color={r.color}/></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{r.detail}</div></div></Card>)}</div>;}

function StrikesTab({t}){const cats=["All","Energy","Military","Military-Industrial","Infrastructure"];const[cat,setCat]=useState("All");const filtered=cat==="All"?STRIKES:STRIKES.filter(s=>s.category===cat);const sevColor=sev=>sev==="critical"?"#ef4444":sev==="major"?"#f97316":"#eab308";return <div><Hero t={t}><div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🎯 Ukrainian Deep-Strike Campaign — Jun–Jul 2026</div><Grid2 t={t} items={[{val:`${STRIKES.length}`,label:"Targets struck",color:"#ef4444"},{val:`${STRIKES.filter(s=>s.severity==="critical").length}`,label:"Critical hits",color:"#f97316"},{val:"2,800km",label:"Max range strike",sub:"Tyumen, Siberia",color:"#fbbf24"},{val:"1,343",label:"UA drone models",sub:"Brave1 platform",color:"#5b8ec8"}]}/></Hero><div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>{cats.map(c=><button key={c} onClick={()=>setCat(c)} style={{padding:"4px 10px",fontSize:11,borderRadius:16,cursor:"pointer",fontFamily:FONT,fontWeight:600,background:cat===c?"#5b8ec8":"none",color:cat===c?"#fff":t.sub,border:`1px solid ${cat===c?"#5b8ec8":t.border}`}}>{c}</button>)}</div>{filtered.map(s=><Card key={s.id} t={t} style={{borderLeft:`4px solid ${sevColor(s.severity)}`}}><div style={{padding:"12px 14px"}}><div style={{display:"flex",alignItems:"flex-start",gap:8}}><span style={{fontSize:18,flexShrink:0}}>{s.icon}</span><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:3}}><Pill label={s.severity.toUpperCase()} color={sevColor(s.severity)}/><Pill label={s.category} color="#5b8ec8"/><span style={{fontSize:10,color:t.sub}}>{s.date} · {s.region}</span>{s.distance&&<span style={{fontSize:10,color:t.sub}}>{s.distance.toLocaleString()}km</span>}</div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:4}}>{s.targetName}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{s.result}</div></div></div></div></Card>)}</div>;}

function EconomyTab({t}){const METRICS=[{icon:"💰",label:"National Wealth Fund (liquid)",val:"$46.4B",change:"↑ slightly from $44.1B Jun 1",color:"#eab308",desc:"Liquid NWF assets actually ticked up month-over-month as of Jul 1 (3.61T rubles) via FX/gold purchases funded by the oil windfall — not in freefall, but still down two-thirds from the $113.5B pre-war peak and providing limited runway."},{icon:"🛢️",label:"Urals Crude Price",val:"~$77/bbl",change:"Above $59/bbl budget benchmark",color:"#22c55e",desc:"Volatile swing: Urals crashed to ~$42/bbl in early July (below budget) as the temporary Hormuz reopening eased supply, then rebounded as the Iran war reignited Jul 29-30 and pushed Brent back up — currently a net positive for Kremlin revenue, reversing the early-July shortfall."},{icon:"📉",label:"Ruble vs USD",val:"~79",change:"Stronger than 88-95 range earlier this year",color:"#22c55e",desc:"The ruble has held firm in the high-70s/low-80s, even touching a multi-year high near 70 in May-June — a byproduct of capital controls and weak import demand suppressing FX outflows, though a strong ruble also erodes the ruble-value of oil export revenue."},{icon:"💵",label:"CBR Key Rate",val:"14.00%",change:"10th consecutive cut, down from 21% peak",color:"#22c55e",desc:"Cut again Jul 24 (25bp) — the tenth straight reduction since mid-2025. Annual inflation has fallen to 5.9% (as of Jul 20) from double digits, though the CBR flagged rising inflation expectations and said further hikes 'cannot be completely ruled out' if price pressure resurges."},{icon:"🏭",label:"Refineries Struck (2026)",val:"~40% capacity",change:"Ryazan refinery hit again Jul 29",color:"#f97316",desc:"Ukraine's long-range strike campaign continues damaging Russian refining capacity — the Ryazan refinery (~5% of national capacity) was struck again Jul 29, having previously been forced offline for an extended period after a May 2026 strike. Gasoline production remains well below 2025 levels."},{icon:"💸",label:"Budget Deficit",val:"6T rubles (H1)",change:"~60% above the full-year 2026 plan",color:"#ef4444",desc:"Russia's deficit hit 6 trillion rubles (~$77B, 2.6% of GDP) in the first five months of 2026 alone — already roughly 60% above the government's full-year target, driven by the earlier oil-price shortfall and sustained war spending."},{icon:"👥",label:"Labor Shortage",val:"Critical",change:"↓ 2.8M+ mobilized/emigrated",color:"#ef4444",desc:"Labor shortage from 700K+ killed/wounded + 1.3M+ emigration remains a structural drag largely unaffected by short-term price swings. Wage inflation remains elevated."}];return <div><Hero t={t} style={{borderLeft:"4px solid #eab308"}}><div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>💸 Russian War Economy — Late Jul 2026</div><div style={{fontSize:13,color:"rgba(255,255,255,.75)",lineHeight:1.6,marginBottom:10}}>A more mixed picture than a month ago: the ruble has strengthened, inflation is cooling and the CBR keeps cutting rates, and Urals crude has rebounded above the budget benchmark as the Iran war reignites — but the H1 budget deficit is already far over-plan, refining capacity remains structurally damaged, and the labor shortage is unchanged.</div><div style={{display:"flex",flexWrap:"wrap",gap:6}}><Pill label="NWF: $46.4B" color="#eab308"/><Pill label="Urals: ~$77/bbl" color="#22c55e"/><Pill label="Inflation: ~5.9%" color="#22c55e"/><Pill label="CBR rate: 14.00%" color="#22c55e"/></div></Hero>{METRICS.map(m=><Card key={m.label} t={t} style={{borderLeft:`4px solid ${m.color}`}}><div style={{padding:"12px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18,flexShrink:0}}>{m.icon}</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:t.text}}>{m.label}</div><div style={{fontSize:11,color:m.color,fontWeight:600}}>{m.change}</div></div><div style={{fontSize:18,fontWeight:800,color:m.color,textAlign:"right",flexShrink:0}}>{m.val}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{m.desc}</div></div></Card>)}</div>;}

function IntelTab({t}){const ASSESSMENTS=[{date:"Jun 25",source:"ISW",label:"Main effort: Kostyantynivka",icon:"🎯",color:"#ef4444",text:"Russia Spring-Summer 2026 main effort focused on Kostyantynivka. 27+ Russian assaults per day. Advance after capturing Toretsk (Aug 2025). Civilian evacuation ordered."},{date:"Jun 25",source:"UK MOD",label:"Net territorial gain slowing",icon:"📐",color:"#22c55e",text:"Russia captured ~108 km² in 2026 YTD, vs ~2,800 km² in full year 2024. Advance rate declined by ~85-90% from peak."},{date:"Jun 24",source:"GUR (UA Intel)",label:"Belarus complied with ultimatum",icon:"🇧🇾",color:"#8b5cf6",text:"Ukrainian GUR confirmed Belarus halted Shahed relay system operations as of Jun 22. Zelensky: Whatever the case, the effect is achieved."},{date:"Jun 20",source:"CIA / IC consensus",label:"Russia will not use nuclear weapons",icon:"☢️",color:"#22c55e",text:"Intelligence community consensus: Putin nuclear threats are coercive, not operational. Any tactical nuclear use would cost Russia China support — crossing Putin true red line."},{date:"Jun 18",source:"Pentagon",label:"F-16 operational assessment",icon:"✈️",color:"#5b8ec8",text:"Ukraine F-16 fleet operational but limited in number. Key contribution: SEAD missions and Western AMRAAM integration improving air defence suppression."},{date:"Jun 27",source:"WSJ / Kyiv Post",label:"Putin-Lukashenko: second-front pressure signal",icon:"🇧🇾",color:"#ef4444",text:"WSJ reports Putin is pressuring Lukashenko to allow Russia to recruit Belarusian citizens through Union State mechanisms. 2-day secret Valdai talks with full delegations — no communiqué issued. Most significant Belarus escalation signal since Shahed relay shutdown."},{date:"Jun 28",source:"ISW / AP / CNBC",label:"Putin Congress: fuel crisis admitted, diplomacy rejected",icon:"📢",color:"#ef4444",text:"ISW (Jun 28): Putin at United Russia congress 'vaguely acknowledged' Ukraine strike campaign impacts but 'promoted a facade of stability' and 'rejected diplomatic solutions.' First public admission of fuel shortages — called a 'temporary deficit.' Russia's central bank: GDP growth forecast 0.5%-1.5% in 2026. Russia to import gasoline from Asia by sea for first time in decades."},{date:"Jun 29",source:"Middle East Eye",label:"Russia rejected Fidan ceasefire — Pokrovsk encirclement risk",icon:"🤝",color:"#ef4444",text:"MEE confirmed Russia rejected Turkish FM Fidan's ceasefire proposal during Jun 16-17 Moscow visit. Turkey hoped to bring both sides to NATO Ankara. Russia firm on Donbas cession demands. RFERL: Pokrovsk is 'on the brink of encirclement' as Russian forces advance from multiple directions. NATO Ankara opens with diplomatic track already dead."},{date:"Jun 27",source:"Fire Point / Defense News",label:"FP-9 ballistic missile — Moscow-range capability approaching",icon:"🚀",color:"#22c55e",text:"Fire Point announced first flights of FP-9 ballistic missile (850km range, 800kg warhead). CEO: next flight should be to Moscow. Company also signed deal with German Hensoldt to build Freyja ABM system — Patriot-class capability at one-third the cost using FP-7 as interceptor munition."},{date:"Jul 16",source:"Reuters / Kyiv sources",label:"Fedorov's dismissal reads as a Syrskyi power consolidation",icon:"🏛️",color:"#f97316",text:"Multiple Kyiv sources frame the Defense Minister's removal less as a policy shift and more as Commander-in-Chief Syrskyi's continued consolidation of authority over procurement and mobilization — the fourth significant wartime cabinet reshuffle, with Koretsky's confirmation as PM seen as a technocratic, low-friction choice rather than a change in war strategy."},{date:"Jul 17",source:"Militarnyi / MoD",label:"Drone units pass 1M verified strikes for 2026",icon:"🛸",color:"#22c55e",text:"Ukrainian drone units have struck over 1 million verified targets since the start of 2026, including an estimated 193,500 Russian personnel killed or wounded by drone strikes alone — the clearest evidence yet that drones, not artillery, now account for the majority of Russian battlefield losses."},{date:"Jul 19",source:"NPR / Ukraine Air Force",label:"Ballistic-heavy barrage signals possible interceptor rationing",icon:"⚠️",color:"#ef4444",text:"The Jul 18-19 Kyiv attack (41 missiles, 25 ballistic) saw only 18 of 41 missiles intercepted — a lower rate than the 5-of-8 ballistic intercept night on Jul 13-14 — one plausible read is Patriot/PAC-3 interceptor stocks are being rationed as the parallel Iran war draws on the same US supply chain Ukraine depends on."},{date:"Jul 26",source:"CSIS/UA AF",label:"Ballistic-intercept rate briefly rebounds to 71%",icon:"🛡️",color:"#22c55e",text:"Ukraine downed 5 of 7 ballistic missiles in the Jul 25-26 Kyiv strike (71%) — the best single-night rate since the mid-July PAC-3 shortage began. The rebound proved short-lived: the Jul 29-30 mass attack saw only 1 of 9 intercepted, suggesting the shortage is the binding constraint rather than a tactics fix."},{date:"Jul 28",source:"Kyiv Independent/WaPo",label:"Zelensky-Trump White House meeting, Patriot licenses discussed",icon:"🤝",color:"#5b8ec8",text:"Zelensky met Trump at the White House, calling it 'good' and covering Patriot production licensing and diplomacy. Hours later Ukraine struck the Ryazan refinery (~5% of Russian refining capacity) and a classified Rosrezerv strategic reserve depot 1,300km inside Russia — materiel diplomacy and deep strikes moving together."},{date:"Jul 30",source:"Bloomberg/Meduza",label:"Fedorov: dismissal tied to procurement reform, Syrskyi rift 'ideological not personal'",icon:"🏛️",color:"#f97316",text:"In a new Ukrainska Pravda interview, Fedorov linked his July dismissal directly to a procurement/tender restructuring push that drew internal backlash pressuring Zelensky. He also said there was no personal conflict with former Commander-in-Chief Syrskyi — 'more of an ideological conflict' over the shape of the war effort — and that the Defense Ministry never blocked a single General Staff decision."},{date:"Jul 30",source:"Reuters/NPR/Kyiv Independent",label:"Largest combined strike in weeks; missile crosses into Poland",icon:"🚨",color:"#ef4444",text:"Russia's Jul 29-30 attack (74 missiles, 284 drones) was the largest since the mid-July shortage began, killing 8-10 including 3 children from one family near Kryvyi Rih. A missile or debris, believed Russian, crossed into Poland's Lublin region, prompting Polish and NATO jets to scramble — the most serious NATO-airspace incident in months and a live test of Article 4/5 thresholds if it recurs."}];const INTEL_TL=ASSESSMENTS.map((a,i)=>({...a,id:i,note:a.text})).sort((x,y)=>(MONTHS[x.date.slice(0,3)]-MONTHS[y.date.slice(0,3)])||(parseInt(x.date.slice(4),10)-parseInt(y.date.slice(4),10)));return <div><Hero t={t} style={{borderLeft:"4px solid #8b5cf6"}}><div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🔍 Intelligence Assessments — Jul 2026</div><div style={{fontSize:12,color:"rgba(255,255,255,.55)",lineHeight:1.6}}>Compiled from ISW, UK MOD daily updates, Ukrainian GUR, CIA, CSIS, Pentagon and open-source intelligence.</div></Hero><ST t={t}>📅 Assessment Timeline</ST><ScrubTimeline t={t} events={INTEL_TL}/>{INTEL_TL.map((a,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${a.color}`}}><div style={{padding:"12px 14px"}}><div style={{display:"flex",alignItems:"flex-start",gap:8}}><span style={{fontSize:18,flexShrink:0}}>{a.icon}</span><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:3}}><Pill label={a.source} color={a.color}/><span style={{fontSize:10,color:t.sub}}>{a.date}</span></div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:5}}>{a.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{a.text}</div></div></div></div></Card>)}</div>;}

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
      <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🤝 NATO & Coalition — Late Jul 2026</div>
      <Grid2 t={t} items={[
        {val:"32",label:"NATO members",sub:"All at 2%+ GDP target",color:"#5b8ec8"},
        {val:"35",label:"Coalition of Willing",sub:"Elysee Palace Jan 6, 2026",color:"#22c55e"},
        {val:"€90B",label:"EU support loan",sub:"2026-2027 package",color:"#eab308"},
        {val:"Jul 28",label:"Most recent contact",sub:"Zelensky-Trump, White House",color:"#22c55e"},
      ]}/>
    </Hero>
    <ST t={t} color="#5b8ec8">📅 Since Ankara — What's Actually Moved</ST>
    <Card t={t} style={{borderLeft:"4px solid #5b8ec8"}}><div style={{padding:"12px 14px"}}>
      <div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:8}}>Three weeks on, the Ankara production pledge is still unrealized — but contact has continued</div>
      {["Zelensky met Trump at the White House Jul 28, calling it 'good' — Patriot production licensing was raised again, though still no firm production timeline has been set since Ankara. Ukraine struck Russia's Ryazan refinery hours after the meeting","Rubio and Lavrov met for 35 minutes in Manila Jul 23 — the first substantive direct US-Russia contact on Ukraine in months. No breakthrough, but Bloomberg reports Putin has since dropped territorial-concession offers entirely, and the Kremlin now treats the Anchorage understandings as void","The EU adopted its 21st Russia sanctions package Jul 23, freezing the oil price cap's automatic rise through Jul 2027, adding 32 banks to the transaction ban list, and sanctioning 200+ additional entities — concrete follow-through even as the broader political/ceasefire track remains stalled","New UK PM Burnham made his first visit to Ukraine as premier, pledging to honor every UK commitment in full and licensing 'Stone Cloak' electronic warfare tech production to Kyiv — a continuity signal from a new government"].map((pt,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:12,color:t.sub,lineHeight:1.6}}><span style={{color:"#5b8ec8",flexShrink:0}}>▸</span>{pt}</div>)}
    </div></Card>
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
    {icon:"⚖️",label:"2026 losses vs recruitment",val:"225.5K / 221K",change:"Zelensky, Jul 25 — losses now exceed intake",color:"#ef4444",desc:"In his Jul 25 evening address Zelensky put 2026 Russian enlistment at 221,000 against roughly 225,500 losses — 131,000 killed and about 93,000 wounded this year. It is the first time Kyiv has framed the crossover with official figures rather than inference. Treat as a belligerent estimate: Janis Kluge (SWP), working from regional budget data, puts Russian dead nearer 9,000/month — roughly a third of the implied rate. The direction of travel is agreed; the magnitude is not."},
    {icon:"📉",label:"Contract recruitment 2026",val:"195K / 409K",change:"Under 50% of annual target by July",color:"#f97316",desc:"Ukraine’s Foreign Intelligence Service (SZRU) reported ~195,000 contracts signed by early July against a running target of 204,500 and an annual goal of 409,000. The daily signing rate has fallen to 1,070–1,090 from roughly 1,200 across 2024–25. Recruitment has shifted toward smaller regions, educational institutions, labour migrants and occupied territory — the SZRU says ~7,900 residents of occupied Ukraine are planned for 2026, which it characterises as a war crime."},
    {icon:"🚨",label:"Fall mobilization wave",val:"Warned",change:"Zelensky citing intelligence, Jul 25",color:"#dc2626",desc:"Kyiv says it has clear intelligence that Russia is preparing a significant new mobilization wave for the autumn, with Putin ‘preparing the conditions for expanding mobilization’. Analysts have floated a one-off drive of roughly 200,000 as an alternative to the contract model. An anonymous Russian general quoted Jul 21 put the requirement to finish taking Donbas at 55,000–60,000 replacements every month — far beyond what the current system delivers."},
    {icon:"🩹",label:"H1 2026 loss breakdown",val:"196.7K",change:"115.3K irrecoverable",color:"#ef4444",desc:"SZRU’s first-half accounting: approximately 196,700 total personnel losses, comprising 115,300 irrecoverable, 80,400 medical casualties and about 1,000 prisoners of war. Medical and functional fitness requirements have been lowered to widen the recruitment pool."},
    {icon:"🤖",label:"Unmanned Systems Forces",val:"8K / 34.4K",change:"~23% of planned strength",color:"#eab308",desc:"Russia’s new drone branch (VBS) had trained roughly 8,000 specialists by mid-2026 against an expected 34,400, per CIT — a shortfall that matters more than raw headcount, since it is the arm Russia needs most to contest Ukraine’s drone advantage."},
    {icon:"🏭",label:"Labour shortage",val:"Critical",change:"2.8M+ removed from workforce",color:"#ef4444",desc:"700K+ killed or wounded plus 1.3M+ emigrated = 2.8M+ removed from the workforce. CBR: the labour shortage is the primary constraint on economic growth in 2026. Regional spending on recruiter bonuses more than doubled in 2026, from 358M to 802M rubles monthly."},
  ];
  const UA=[
    {icon:"⚔️",label:"UA casualties (est.)",val:"~194K",change:"Dead or missing (UALosses Jun 21)",color:"#5b8ec8",desc:"UALosses project verified by BBC, Mediazona: 96,821 killed + 97,938 missing as of Jun 21, 2026. Excludes wounded. GCHQ estimate: nearly 500,000 Russian killed."},
    {icon:"🔄",label:"Mobilization age",val:"25+",change:"Lowered from 27 in 2025",color:"#f97316",desc:"Ukraine lowered mobilization age to 25 in 2025. EU simultaneously announced restricting travel protections for Ukrainian men abroad — at Kyiv's request — to reduce evasion."},
    {icon:"🤝",label:"POW exchange Jun 26",val:"160 home",change:"None since — 5-week gap",color:"#22c55e",desc:"160 Ukrainian POWs returned Jun 26 in a UAE-mediated swap, all held since 2022 and including Azovstal defenders. No further exchange has taken place in the five weeks since — the longest pause in one of the few functioning Kyiv–Moscow channels."},
  ];
  return <div>
    <Hero t={t} style={{borderLeft:"4px solid #f97316"}}>
      <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>👥 Manpower — Jul 2026</div>
      <Grid2 t={t} items={[
        {val:"225.5K",label:"RU losses in 2026",sub:"Now exceeding enlistment",color:"#ef4444"},
        {val:"221K",label:"RU enlisted in 2026",sub:"195K contracts vs 409K target",color:"#f97316"},
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

function UkraineSection({t,initialTab}){const[tab,setTab]=useState(initialTab??"overview");const[briefExpanded,setBriefExpanded]=useState(false);useEffect(()=>{if(initialTab)setTab(initialTab);},[initialTab]);return <div><div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>{UKRAINE_TABS.map(tb=><button key={tb.id} onClick={()=>setTab(tb.id)} style={{padding:"5px 10px",fontSize:11,borderRadius:16,cursor:"pointer",fontFamily:FONT,fontWeight:600,background:tab===tb.id?"#5b8ec8":"none",color:tab===tb.id?"#fff":t.sub,border:`1px solid ${tab===tb.id?"#5b8ec8":t.border}`}}>{tb.label}</button>)}</div>{tab==="belarus"&&<div><div style={{fontSize:11,color:t.sub,lineHeight:1.6,marginBottom:12,paddingLeft:9,borderLeft:`3px solid #f97316`}}>Belarus is treated here as the northern axis of the Russia-Ukraine war — a co-belligerent supplying territory, basing and nuclear hosting rather than troops. Consolidated from its former standalone section.</div><BelarusSection t={t}/></div>}{tab==="overview"&&<div>
<div style={{background:t.isDark?"linear-gradient(135deg,#091321,#0d1f38)":"linear-gradient(135deg,#eef3fc,#e6edf9)",border:"1px solid rgba(59,130,246,0.25)",borderLeft:"4px solid #5b8ec8",borderRadius:14,padding:"14px 16px",marginBottom:16}}>
  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
    <span style={{width:8,height:8,borderRadius:"50%",background:"#22c55e",display:"inline-block",flexShrink:0}}/>
    <span style={{fontSize:11,fontWeight:700,color:t.text,letterSpacing:".04em"}}>🤖 AI DAILY — UKRAINE ANALYSIS</span>
    <span style={{marginLeft:"auto",fontSize:10,color:t.sub}}>{new Date(UKRAINE_BRIEFING.generatedAt).toLocaleDateString([],{month:"short",day:"numeric"})}</span>
  </div>
  <div style={{fontSize:12.5,color:t.text,lineHeight:1.6,marginBottom:12}}>{UKRAINE_BRIEFING.summaryShort}</div>
  <div style={{fontSize:11,color:t.sub,fontStyle:"italic",paddingTop:10,paddingBottom:2,borderTop:`1px solid ${t.isDark?"rgba(255,255,255,.08)":"rgba(0,0,0,.08)"}`,marginBottom:10}}>
    👁 <strong style={{color:t.text,fontStyle:"normal"}}>Watch: </strong>{UKRAINE_BRIEFING.watch}
  </div>
  <div style={{display:"flex",gap:6}}>
    <button onClick={()=>setBriefExpanded(e=>!e)} aria-expanded={briefExpanded} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,background:"none",border:`1px solid ${t.border}`,borderRadius:8,padding:"7px 10px",cursor:"pointer",color:"#5b8ec8",fontSize:11,fontWeight:700,fontFamily:FONT,letterSpacing:".03em"}}>
      {briefExpanded?"▲ Show Less":"📝 Read Full Analysis"}
    </button>
    <ReadAloudButton text={[UKRAINE_BRIEFING.summary,...UKRAINE_BRIEFING.assessment.map(a=>`${a.cat}: ${a.text}`)].join(". ")} color="#5b8ec8" t={t}/>
  </div>
  {briefExpanded&&<div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${t.isDark?"rgba(255,255,255,.08)":"rgba(0,0,0,.08)"}`}}>
    <div style={{fontSize:12.5,color:t.text,lineHeight:1.6,marginBottom:12}}>{UKRAINE_BRIEFING.summary}</div>
    <div style={{display:"flex",flexDirection:"column",gap:7}}>
      {UKRAINE_BRIEFING.assessment.map((a,i)=><div key={i} style={{display:"flex",gap:8,fontSize:11.5}}>
        <span style={{color:"#5b8ec8",fontWeight:700,minWidth:78,flexShrink:0}}>{a.cat}</span>
        <span style={{color:t.sub,lineHeight:1.5}}>{a.text}</span>
      </div>)}
    </div>
  </div>}
</div>
<Hero t={t}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}><span style={{width:8,height:8,borderRadius:"50%",background:"#ef4444",display:"inline-block",animation:"blink 1.4s ease-in-out infinite",flexShrink:0}}/><span style={{fontSize:11,color:"rgba(255,255,255,.45)",letterSpacing:".08em",textTransform:"uppercase"}}>War Day {getWarDay()} · Live</span><span style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:5}}><span style={{width:6,height:6,borderRadius:"50%",background:"#22c55e",display:"inline-block",flexShrink:0}}/><span style={{fontSize:10.5,color:"rgba(255,255,255,.5)"}}>Data as of {REPORT_NOW.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}, {REPORT_NOW.toLocaleTimeString([],{hour:"numeric",minute:"2-digit",timeZoneName:"short"})}</span></span></div><div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".05em"}}>🇷🇺 Total Russian Personnel Losses</div><div style={{fontSize:42,fontWeight:800,letterSpacing:-2,lineHeight:1,fontVariantNumeric:"tabular-nums"}}>{LOSSES.ukraine[0].total}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",marginTop:14,paddingTop:12,borderTop:"1px solid rgba(255,255,255,.08)"}}><div><div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Today</div><div style={{fontSize:22,fontWeight:800,color:"#ff9500",fontVariantNumeric:"tabular-nums"}}>{LOSSES.ukraine[0].todayChange}</div></div><div><div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>7-Day Avg</div><div style={{fontSize:20,fontWeight:700,color:"#fbbf24",fontVariantNumeric:"tabular-nums"}}>~{Math.round(CASUALTIES.slice(-7).reduce((a,b)=>a+b.value,0)/7).toLocaleString()}</div></div><div><div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Since Feb 22</div><div style={{fontSize:15,fontWeight:700,color:"rgba(255,255,255,.6)",marginTop:3}}>Day {getWarDay()}</div></div></div></Hero><Grid2 t={t} items={[{icon:"🛸",label:"UAVs Destroyed Today",val:LOSSES.ukraine[6].todayChange,sub:"cumulative "+LOSSES.ukraine[6].total,color:"#5b8ec8"},{icon:"☠️",label:"Personnel Today",val:LOSSES.ukraine[0].todayChange,sub:"cumulative "+LOSSES.ukraine[0].total,color:"#8b5cf6"},{icon:"🪖",label:"Tanks Today",val:LOSSES.ukraine[1].todayChange,sub:"cumulative "+LOSSES.ukraine[1].total,color:"#f97316"},{icon:"💥",label:"Artillery Today",val:LOSSES.ukraine[3].todayChange,sub:"cumulative "+LOSSES.ukraine[3].total,color:"#ef4444"}]}/><ST t={t}>📈 14-Day Casualty Trend</ST><Card t={t} style={{padding:"12px 8px 6px"}}><div style={{height:110}}><ResponsiveContainer width="100%" height="100%"><AreaChart data={CASUALTIES.slice(-14)} margin={{top:4,right:8,left:-18,bottom:0}}><defs><linearGradient id="g_ovCas" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="date" tick={{fontSize:8,fill:t.sub}} tickLine={false} axisLine={false} interval={2}/><YAxis tick={{fontSize:8,fill:t.sub}} tickLine={false} axisLine={false} width={26}/><Tooltip content={<TT/>}/><Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} fill="url(#g_ovCas)"/></AreaChart></ResponsiveContainer></div><div style={{fontSize:10,color:t.sub,padding:"2px 10px 6px",textAlign:"right"}}>Full history & 7-day average: Trends → Ukraine</div></Card>
<ST t={t}>📊 Two Curves That Define 2026</ST>
<Card t={t} style={{padding:"12px 8px 8px"}}>
  <div style={{fontSize:11,fontWeight:700,color:t.text,padding:"0 8px 6px"}}>Russian losses per month <span style={{color:t.sub,fontWeight:400}}>· holding above 36,000</span></div>
  <div style={{height:120}}><ResponsiveContainer width="100%" height="100%"><ComposedChart data={ruMonthlyWithMTD()} margin={{top:4,right:8,left:-14,bottom:0}}><XAxis dataKey="m" tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false}/><YAxis tick={{fontSize:8,fill:t.sub}} tickLine={false} axisLine={false} domain={["dataMin-2000","dataMax+2000"]} width={34} tickFormatter={v=>Math.round(v/1000)+"k"}/><Tooltip content={<TT/>}/><Bar dataKey="v" fill="#ef4444" radius={[3,3,0,0]} name="RU losses"/></ComposedChart></ResponsiveContainer></div>
  <div style={{fontSize:11,fontWeight:700,color:t.text,padding:"10px 8px 6px",borderTop:`.5px solid ${t.sep}`,marginTop:6}}>Russian refining knocked offline <span style={{color:t.sub,fontWeight:400}}>· % of capacity, deep-strike campaign</span></div>
  <div style={{height:120}}><ResponsiveContainer width="100%" height="100%"><AreaChart data={HISTORICAL.refineryOffline} margin={{top:4,right:8,left:-14,bottom:0}}><defs><linearGradient id="g_ovRef" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/><stop offset="95%" stopColor="#f97316" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="m" tick={{fontSize:9,fill:t.sub}} tickLine={false} axisLine={false}/><YAxis tick={{fontSize:8,fill:t.sub}} tickLine={false} axisLine={false} width={30} tickFormatter={v=>v+"%"}/><Tooltip content={<TT/>}/><Area type="monotone" dataKey="v" stroke="#f97316" strokeWidth={2} fill="url(#g_ovRef)" name="Refining offline %"/></AreaChart></ResponsiveContainer></div>
  <div style={{fontSize:10,color:t.sub,padding:"6px 10px 2px",textAlign:"right"}}>Deeper energy & attrition trends: RU Economy tab · Losses tab (H1 2026 Trends)</div>
</Card>
<ST t={t}>🗺️ Frontline Hotspots</ST><Card t={t}>{SECTORS.filter(sec=>sec.status==="CRITICAL"||sec.status==="DISPUTED CLAIM").map((sec,i,a)=><Row key={sec.name} t={t} last={i===a.length-1}><span style={{fontSize:16,flexShrink:0}}>{sec.icon}</span><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}><span style={{fontSize:12.5,fontWeight:700,color:t.text}}>{sec.name}</span><span style={{fontSize:9,fontWeight:800,color:sec.color,background:sec.color+"18",border:`1px solid ${sec.color}40`,borderRadius:20,padding:"1px 7px"}}>{sec.status}</span></div><div style={{fontSize:11.5,color:t.sub,lineHeight:1.5}}>{sec.detail}</div></div></Row>)}<div style={{padding:"8px 14px",fontSize:10.5,color:t.sub,fontStyle:"italic",borderTop:`.5px solid ${t.sep}`}}>Full 6-sector map with all statuses: Frontline tab</div></Card>
<ST t={t}>📋 This Week in the War</ST><Card t={t}>{WEEK_UPDATES.map((u,i)=><Row key={i} t={t} last={i===WEEK_UPDATES.length-1}><div style={{fontSize:12.5,color:t.text,lineHeight:1.55}}>{u}</div></Row>)}</Card></div>}{tab==="losses"&&<LossesTab t={t}/>}{tab==="frontline"&&<FrontlineTab t={t}/>}{tab==="diploallies"&&<DiploAlliesTab t={t}/>}{tab==="southernfront"&&<SouthernFrontTab t={t}/>}{tab==="strikewar"&&<StrikeWarTab t={t}/>}{tab==="economy"&&<EconomyTab t={t}/>}{tab==="manpower"&&<ManpowerTab t={t}/>}{tab==="intel"&&<IntelTab t={t}/>}
    {tab==="uaindustry"&&<div>
      <Hero t={t} color="#eab308"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#fde68a",marginBottom:6}}>🏭 UKRAINE'S DEFENSE INDUSTRY</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>From aid recipient to arsenal: roughly half of Ukraine's ammunition is now domestically made, its drone ecosystem out-produces both NATO and Russia in unit terms, and Kyiv has begun exporting — including to the countries that arm it.</div></Hero>
      <Grid2 t={t} items={[
        {icon:"🛸",label:"Drone output",val:"100k+/mo",sub:"120+ companies, all classes incl. interceptors",color:"#22c55e"},
        {icon:"💥",label:"155mm unit cost",val:"~$1,500",sub:"Undercuts European rounds 3-5×",color:"#eab308"},
        {icon:"🚀",label:"Flamingo FP-5",val:"Fielded",sub:"3,000km-class cruise missile; Volgograd strike Jun 27",color:"#f97316"},
        {icon:"📜",label:"Patriot license",val:"Walked back",sub:"Jul 9 claim reversed by Trump Jul 31 — \u2018we have not agreed to that\u2019",color:"#dc2626"},
      ]}/>
      <ST t={t} color="#eab308">📋 What Kyiv Now Builds</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Deep-strike weapons</span> — FP-5 Flamingo cruise missiles (Volgograd plant strike, Jun 27), long-range drones behind the refinery campaign that has Russian refining at 42.47% of capacity, and naval drones that forced the Black Sea Fleet east. The St. Petersburg/Kronstadt strike (Jul 3-4) was flown almost entirely on domestic airframes.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Artillery & armor</span> — Bohdan SPH at 20+/month (18 built for Denmark in 8 weeks), 152mm and 155mm shell lines (the latter ~$1,500/round), with Rheinmetall JV plants localizing NATO-caliber production in-country.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>The export turn</span> — Denmark-model contracts (frozen-asset profits funding UA production for UA use), propellant JV with D&M in the US (production from mid-2026), and EW systems like Sky Fortress marketed at a fraction of Western cost. RUSI's read: Ukraine's industry is Europe's fastest path to closing its own production gap.</div>
        <div><span style={{color:t.text,fontWeight:700}}>Constraints</span> — Funding (capacity exceeds contracts), Russian strikes on plants (a propellant facility lost early-war), and energetics inputs shared with the West's own bottleneck (see Great Powers → Critical Minerals).</div>
      </div></div></Card>
      <Note t={t} color="#eab308">Figures: RUSI, Militarnyi, UA GenStaff and program disclosures; production rates are announced capacities, not audited output. Cross-reference: Great Powers → Defense Industry & Arms Flow, Drone War → Cost.</Note>
    </div>}
    {tab==="analysts"&&<AnalystsTab t={t}/>}</div>;}

// ── SCS Section ───────────────────────────────────────────────────────────────────
const SCS_TABS=[{id:"overview",label:"🗺️ Overview"},{id:"incidents",label:"⚠️ Incidents"},{id:"military",label:"⚔️ Military"},{id:"law",label:"⚖️ Law & Claims"},{id:"taiwan",label:"🌊 Taiwan Strait"}];
const SCS_CLAIMANTS=[{flag:"🇨🇳",name:"China (PRC)",claim:"~90% via Nine-Dash Line",color:"#ef4444",note:"Operates largest artificial island militarization campaign. 7 reefs fortified. Coast Guard Law (2021) permits use of force on foreign vessels."},{flag:"🇵🇭",name:"Philippines",claim:"Exclusive Economic Zone (EEZ)",color:"#5b8ec8",note:"Won UNCLOS arbitration in 2016. Faces near-daily Chinese water cannon attacks at Second Thomas Shoal. US MDT invoked since 2024."},{flag:"🇻🇳",name:"Vietnam",claim:"Paracel & Spratly Islands",color:"#ef4444",note:"Claims historic rights. Operates 48+ features. Significant oil and gas interests."},{flag:"🇲🇾",name:"Malaysia",claim:"Part of Spratly Islands",color:"#22c55e",note:"Quiet but active claimant. Operates Swallow Reef airstrip. Relies on ASEAN diplomacy."},{flag:"🇧🇳",name:"Brunei",claim:"Louisa Reef",color:"#eab308",note:"Narrowest claim. Does not occupy any feature. Relies on bilateral agreements."},{flag:"🇹🇼",name:"Taiwan (ROC)",claim:"Same as PRC (historical)",color:"#06b6d4",note:"Occupies Itu Aba / Taiping Island. Largest natural island in Spratlys."}];
const SCS_FORCES=[{flag:"🇨🇳",name:"China PLA Navy",strength:"Dominant",color:"#ef4444",assets:["3 carriers (Liaoning, Shandong, Fujian) — Fujian commissioned Nov 2025, working toward full operational capability","7 militarized artificial islands with airstrips and missile batteries","Coast Guard largest in world — 150+ vessels >1,000 tons","H-6K bombers with YJ-12 ASMs based at Woody Island","DF-21D/DF-26 carrier killers with 1,500–4,000km range"]},{flag:"🇺🇸",name:"US 7th Fleet",strength:"Power Projection",color:"#5b8ec8",assets:["USS George Washington CSG (Japan-based, Yokosuka) — replaced Reagan as forward-deployed in 2024; Reagan in extended maintenance since Mar 2025","Regular B-52H overflights from Guam under FONOP","P-8A Poseidon maritime patrol — near-continuous ISR","FONOP cadence: ~15 operations/year","9 EDCA sites in Philippines (expanded 2026)"]},{flag:"🇵🇭",name:"Philippine Armed Forces",strength:"Limited but Growing",color:"#5b8ec8",assets:["BRP Jose Rizal (guided-missile frigate)","FA-50 light combat aircraft — 12 delivered","HIMARS coastal defense battalion operational 2025","US assistance: $500M+ in FMF since 2022"]}];
function SCSLawInfographic({t}){
  const STAT_ITEMS=[
    {val:"200 nm",label:"UNCLOS EEZ limit",sub:"Max distance a coastal state can claim resource rights over",color:"#3b82f6"},
    {val:"~1,000 nm",label:"China's claim reaches",sub:"James Shoal, the nine-dash line's southernmost point",color:"#ef4444"},
    {val:"5x",label:"Past the legal limit",sub:"How far beyond 200nm China's claim extends",color:"#f97316"},
    {val:"50 nm",label:"...from Malaysia's coast",sub:"James Shoal sits almost against Malaysian Borneo",color:"#eab308"},
  ];
  const ZONES=[
    {icon:"🟢",label:"Territorial Sea",range:"0–12 nm",text:"Full sovereignty — treated the same as land territory."},
    {icon:"🟡",label:"Contiguous Zone",range:"12–24 nm",text:"Limited customs, immigration and pollution enforcement only."},
    {icon:"🔵",label:"Exclusive Economic Zone",range:"24–200 nm",text:"Exclusive rights to fish, oil, gas and other resources — not sovereignty."},
    {icon:"⚪",label:"High Seas",range:"beyond 200 nm",text:"International waters. No coastal state can claim any part of it."},
  ];
  return <>
    <Card t={t} style={{padding:"14px"}}>
      <div style={{fontSize:12,fontWeight:700,color:t.text,marginBottom:2}}>📐 How Far a Claim Can Legally Reach</div>
      <div style={{fontSize:10,color:t.sub,marginBottom:12}}>UNCLOS sets a hard limit — China's claim runs far past it</div>
      <Grid2 t={t} items={STAT_ITEMS}/>
      <div style={{marginTop:12,fontSize:10.5,color:t.sub,lineHeight:1.6}}>James Shoal is also fully submerged, which under UNCLOS makes it incapable of generating any maritime claim at all regardless of distance — the core finding behind the 2016 tribunal ruling above.</div>
    </Card>
    <ST t={t} color="#3b82f6">🗺️ The Four UNCLOS Zones</ST>
    {ZONES.map((z,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${["#22c55e","#eab308","#3b82f6","#94a3b8"][i]}`}}><div style={{padding:"10px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:16}}>{z.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text}}>{z.label}</div><div style={{fontSize:10,color:t.sub,marginLeft:"auto"}}>{z.range}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{z.text}</div></div></Card>)}
  </>;
}

const SCS_LEGAL=[{title:"UNCLOS Arbitration — 2016",icon:"⚖️",color:"#22c55e",text:"PCA ruled unanimously in favor of Philippines. China Nine-Dash Line has no legal basis. China response: Null and void."},{title:"Nine-Dash Line (China)",icon:"🇨🇳",color:"#ef4444",text:"China claim to ~90% of the SCS. Originally 11-dash (1947), revised to 9 (1953). No clear legal basis — China argues historic rights which the tribunal rejected."},{title:"US-Philippines MDT (1951)",icon:"🤝",color:"#5b8ec8",text:"Article V: attack on either party triggers mutual defense obligations. US explicitly clarified MDT covers Philippine armed forces, public vessels, and aircraft in the SCS."},{title:"Chinese Coast Guard Law (2021)",icon:"⚡",color:"#ef4444",text:"Authorizes CCG to use all necessary means including weapons against foreign vessels in waters claimed by China."},{title:"ASEAN Code of Conduct Talks",icon:"🌏",color:"#eab308",text:"Negotiations since 2002 for a binding COC. Still not concluded. China pushing for exclusion of non-ASEAN parties — seen as delaying tactic."}];

function SCSSection({t,initialTab}){const[tab,setTab]=useState(initialTab??"overview");useEffect(()=>{if(initialTab)setTab(initialTab);},[initialTab]);const conflict=CONFLICTS.find(c=>c.id==="south-china-sea");const losses=LOSSES["south-china-sea"];const scsEvents=EVENTS["south-china-sea"];const news=NEWS.filter(n=>n.conflictId==="south-china-sea");return <div><div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>{SCS_TABS.map(tb=><button key={tb.id} onClick={()=>setTab(tb.id)} style={{padding:"5px 10px",fontSize:11,borderRadius:16,cursor:"pointer",fontFamily:FONT,fontWeight:600,background:tab===tb.id?"#06b6d4":"none",color:tab===tb.id?"#fff":t.sub,border:`1px solid ${tab===tb.id?"#06b6d4":t.border}`}}>{tb.label}</button>)}</div>{tab==="overview"&&<div><Hero t={t} style={{borderLeft:"4px solid #06b6d4"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:28}}>🏝️</span><div><div style={{fontSize:16,fontWeight:800,color:"#fff"}}>South China Sea</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}><Pill label="FLASHPOINT" color="#f97316"/><Pill label="Maritime Dispute" color="#06b6d4"/></div></div></div><div style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"9px 12px",fontSize:12,color:"rgba(255,255,255,.75)",lineHeight:1.6,marginBottom:12}}>{conflict?.summary}</div><Grid2 t={t} items={losses.slice(0,4).map(l=>({val:l.total,label:l.category,sub:l.description??"",color:l.color??"#06b6d4"}))}/></Hero><SCSMap t={t}/><ST t={t} color="#06b6d4">🌏 Claimant Nations</ST>{SCS_CLAIMANTS.map((c,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${c.color}`}}><div style={{padding:"10px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18}}>{c.flag}</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:t.text}}>{c.name}</div><div style={{fontSize:10,color:t.sub}}>{c.claim}</div></div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{c.note}</div></div></Card>)}{news.map(item=><Card key={item.id} t={t} style={{borderLeft:`4px solid ${item.impactColor}`}}><div style={{padding:"12px 14px"}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6,flexWrap:"wrap"}}><Pill label={item.conflict} color={item.conflictColor}/><span style={{fontSize:10,color:t.sub}}>{item.publishedAt}</span><ConfidenceTag level={item.confidence}/></div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:6}}>{item.headline}</div>{item.bullets.map((b,i)=><div key={i} style={{display:"flex",gap:6,fontSize:12,color:t.sub,marginBottom:4,lineHeight:1.5}}><span style={{color:item.impactColor,flexShrink:0}}>▸</span>{b}</div>)}<div style={{fontSize:11,color:item.impactColor,fontWeight:600,marginTop:6}}>{item.impact}</div></div></Card>)}</div>}{tab==="incidents"&&<div><Hero t={t} style={{borderLeft:"4px solid #ef4444"}}><div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>⚠️ SCS Incidents — 2024–2026</div><Grid2 t={t} items={[{val:"47+",label:"Incidents YTD 2026",sub:"vs 32 same period 2025 — pre-July count",color:"#ef4444"},{val:"3 in 1 week",label:"Jul 20\u201324 clashes",sub:"2nd Thomas Shoal + Scarborough — CSG deployed",color:"#f97316"},{val:"220+",label:"Militia vessels",sub:"Whitsun Reef Jun 3",color:"#eab308"},{val:"2",label:"Sailors injured",sub:"Jun 24 water cannon; +1 more Jul 20",color:"#ef4444"}]}/></Hero><Note t={t} color="#f97316">The pace accelerated sharply in late July: three separate confrontations in a single week (Jul 20 baton strike at Second Thomas Shoal, then two water-cannon incidents at Scarborough Shoal through Jul 24) prompted the USS George Washington carrier strike group to transit the Luzon Strait and triggered joint US-Philippines-Japan maritime drills.</Note><TrendChart t={t} data={HISTORICAL.scsIncidents} color="#06b6d4" label="S. China Sea Incidents (cumulative YTD)" unit="documented PRC incidents" area desc="A steepening curve — incident frequency has accelerated each month, from 6 in January to 49 cumulative by late July." /><EventsTimeline t={t} events={scsEvents} label="Key Events Timeline"/></div>}{tab==="military"&&<div><Hero t={t} style={{borderLeft:"4px solid #8b5cf6"}}><div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>⚔️ Military Balance — Aug 2026</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>China holds the dominant position within the First Island Chain. The US maintains deterrence via carrier strike groups, FONOPs, and expanded Philippine basing access.</div></Hero>{SCS_FORCES.map((f,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${f.color}`}}><div style={{padding:"10px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><span style={{fontSize:20}}>{f.flag}</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:t.text}}>{f.name}</div><Pill label={f.strength} color={f.color}/></div></div>{f.assets.map((a,j)=><div key={j} style={{display:"flex",gap:7,marginBottom:5,fontSize:12,color:t.sub,lineHeight:1.6}}><span style={{color:f.color,fontWeight:700,flexShrink:0}}>▸</span>{a}</div>)}</div></Card>)}</div>}{tab==="law"&&<div><Hero t={t} style={{borderLeft:"4px solid #8b5cf6"}}><div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>⚖️ Legal Framework & Claims</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>The 2016 UNCLOS Tribunal ruled China Nine-Dash Line has no legal basis under international law. China rejects the ruling. The legal battle continues through diplomatic channels.</div></Hero><SCSLawInfographic t={t}/>{SCS_LEGAL.map((item,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${item.color}`}}><div style={{padding:"10px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}><span style={{fontSize:18}}>{item.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text}}>{item.title}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{item.text}</div></div></Card>)}</div>}{tab==="taiwan"&&<div><ConflictOverviewCard conflict={CONFLICTS.find(c=>c.id==="taiwan")} t={t}/><ST t={t}>🌊 Taiwan Strait — Theater Map</ST><div style={{borderRadius:12,overflow:"hidden",border:`1px solid ${t.border}`,marginBottom:12}}><svg viewBox="0 0 400 351" width="100%" style={{display:"block",background:"#060d1c"}}><path d="M284.6,18.7 L283.6,19.6 L278.6,19.6 L283.5,20.6 L283.6,23.0 L282.6,23.7 L277.3,23.0 L277.0,24.7 L275.6,25.4 L272.0,24.7 L273.3,25.3 L271.6,28.5 L277.4,31.0 L275.7,33.4 L278.6,35.7 L276.0,37.6 L277.8,40.3 L274.7,42.1 L274.7,40.3 L271.1,42.4 L267.3,42.8 L266.6,45.6 L263.7,47.9 L261.0,47.4 L262.0,43.2 L269.3,39.8 L268.9,38.6 L270.9,35.7 L272.0,36.0 L274.7,31.0 L266.0,31.3 L266.6,33.3 L263.9,37.8 L264.7,39.5 L262.2,39.8 L260.6,36.1 L258.5,37.7 L259.1,32.9 L261.2,31.4 L258.5,31.4 L258.8,29.8 L261.6,27.6 L257.9,29.1 L256.5,34.7 L255.0,34.3 L254.0,30.3 L252.5,30.1 L252.1,33.1 L254.9,35.9 L254.7,37.1 L250.3,33.7 L249.2,34.0 L248.0,31.0 L246.3,31.6 L245.1,36.1 L248.2,38.0 L247.7,40.3 L244.6,39.3 L245.1,42.2 L247.7,45.0 L251.9,42.0 L255.7,42.6 L255.4,43.7 L258.1,44.5 L257.0,47.2 L258.9,48.3 L258.1,49.2 L260.0,52.2 L258.5,54.6 L256.8,55.0 L255.4,52.8 L252.8,51.8 L250.7,49.4 L248.8,51.3 L246.1,51.4 L246.2,53.1 L250.4,53.2 L250.8,58.2 L252.7,59.3 L252.3,60.6 L256.0,59.9 L256.4,57.2 L257.3,57.6 L260.4,53.8 L261.8,55.9 L261.2,56.8 L264.3,58.0 L267.4,57.6 L263.3,60.8 L262.0,59.9 L259.0,60.5 L258.5,62.6 L257.0,61.8 L250.8,63.3 L249.6,64.4 L251.5,65.2 L251.5,66.5 L247.7,69.2 L247.7,71.1 L245.5,72.4 L239.7,81.2 L238.4,81.3 L237.3,79.5 L229.5,76.9 L226.1,73.9 L219.2,71.1 L222.8,74.5 L224.9,74.7 L227.8,82.1 L232.5,83.6 L238.7,82.3 L241.5,80.5 L243.1,77.4 L245.8,77.0 L253.1,80.0 L251.9,84.7 L248.6,86.7 L247.7,89.7 L246.8,87.7 L245.8,88.0 L248.9,94.9 L247.1,99.4 L246.2,99.9 L244.1,98.2 L240.8,99.9 L239.2,99.4 L241.6,106.9 L245.4,107.0 L246.5,105.7 L245.9,108.0 L247.3,109.1 L245.8,110.0 L247.7,110.4 L246.2,111.7 L247.9,111.5 L247.7,112.5 L249.3,113.3 L248.5,114.7 L249.6,115.0 L250.3,117.6 L248.8,119.3 L250.8,119.7 L246.5,120.5 L247.7,118.9 L246.3,112.9 L244.2,113.3 L244.1,115.9 L245.3,116.8 L244.6,118.5 L241.1,118.9 L242.5,112.5 L240.2,112.5 L239.1,114.7 L238.3,113.4 L239.2,110.6 L234.0,109.3 L235.4,105.3 L234.2,106.2 L233.2,104.2 L231.1,104.5 L232.0,105.5 L229.6,106.6 L227.3,112.1 L219.7,115.8 L223.7,121.7 L225.4,119.7 L226.5,122.2 L224.1,123.9 L225.3,125.7 L227.6,121.4 L228.8,122.2 L229.6,121.4 L233.5,125.2 L233.3,126.8 L229.8,126.9 L230.2,130.1 L228.3,130.9 L226.8,129.8 L223.8,130.9 L221.9,128.1 L220.5,128.6 L219.8,130.5 L221.5,133.2 L222.5,133.1 L221.5,134.1 L219.2,133.4 L219.5,134.9 L217.6,134.1 L218.4,132.4 L217.6,131.7 L216.4,134.1 L215.6,133.1 L217.8,128.4 L212.2,127.8 L215.3,125.8 L215.5,124.6 L213.0,124.3 L206.9,126.7 L206.3,127.7 L208.9,128.4 L209.2,130.7 L211.0,129.6 L212.5,130.5 L210.7,135.0 L205.9,135.7 L205.4,137.2 L211.3,141.6 L214.2,138.7 L213.0,142.0 L213.8,144.6 L214.9,144.2 L212.6,145.8 L211.9,144.6 L208.9,144.6 L208.9,147.5 L210.2,148.8 L212.4,148.3 L212.6,149.3 L211.2,149.7 L202.2,148.5 L201.5,149.9 L197.9,151.4 L196.9,150.4 L198.7,147.9 L196.8,145.4 L196.4,148.2 L195.2,144.6 L193.7,146.9 L195.4,149.5 L189.8,148.8 L192.1,150.6 L193.5,155.8 L197.1,153.5 L198.2,156.0 L200.6,156.4 L199.7,159.0 L196.2,162.3 L194.4,160.6 L193.8,161.5 L193.3,164.7 L195.0,165.6 L194.9,167.0 L192.6,169.8 L188.8,171.4 L188.8,169.3 L190.2,168.9 L181.7,164.5 L181.9,160.3 L180.2,161.9 L181.4,164.9 L180.4,166.0 L177.4,167.5 L173.6,166.5 L173.0,168.0 L171.7,167.9 L171.2,169.9 L170.0,170.0 L167.8,167.9 L167.9,166.5 L169.7,165.5 L167.4,164.9 L168.2,162.9 L166.7,160.6 L163.8,167.4 L160.1,165.3 L159.7,168.8 L157.8,168.7 L158.1,167.6 L156.2,169.3 L160.9,171.6 L157.6,174.4 L158.9,175.9 L150.2,173.2 L147.8,173.8 L152.1,175.4 L145.9,174.6 L152.4,179.7 L160.0,178.3 L158.5,183.2 L160.6,182.0 L162.7,182.3 L164.7,187.2 L161.7,187.7 L157.0,191.5 L156.4,193.4 L154.5,190.3 L152.4,191.9 L154.1,193.4 L151.8,198.0 L151.6,201.6 L148.6,201.9 L144.8,205.9 L143.4,209.1 L142.4,208.3 L142.9,206.4 L146.3,202.0 L144.2,202.5 L145.0,201.1 L144.3,199.0 L143.6,201.1 L142.1,201.3 L138.9,199.5 L139.6,201.0 L141.2,201.2 L140.1,203.5 L140.5,206.2 L137.8,209.0 L136.5,213.2 L137.3,216.1 L134.6,219.6 L135.0,212.5 L133.5,209.3 L124.8,206.7 L124.4,208.7 L127.7,208.8 L129.5,211.1 L128.9,213.7 L127.4,216.4 L125.8,217.2 L122.9,216.0 L119.3,218.1 L117.8,216.3 L116.9,216.8 L117.8,218.0 L116.2,224.6 L117.0,225.8 L115.8,227.1 L114.8,227.7 L114.3,222.3 L113.1,224.0 L113.7,226.2 L109.8,227.6 L106.1,231.1 L105.2,224.9 L102.7,224.4 L98.6,227.4 L96.7,225.7 L98.0,224.4 L96.6,224.2 L94.1,227.6 L94.8,230.5 L92.9,233.5 L94.2,235.8 L93.8,237.3 L88.6,243.5 L82.1,243.2 L74.5,239.2 L74.5,241.7 L77.3,245.1 L81.2,245.4 L83.9,244.1 L85.0,245.3 L87.2,244.9 L88.8,250.2 L90.3,250.5 L89.2,251.9 L84.8,248.0 L82.6,247.7 L85.3,250.0 L82.8,251.8 L81.4,255.0 L79.7,254.0 L79.5,250.3 L73.7,250.6 L74.7,252.6 L76.8,251.3 L79.1,252.1 L75.1,258.3 L76.7,263.8 L74.4,265.1 L72.9,268.7 L66.4,269.4 L61.3,266.3 L57.1,266.1 L56.4,266.6 L60.9,267.6 L53.2,274.4 L50.4,275.7 L50.2,273.1 L52.0,271.5 L47.4,269.1 L49.9,271.8 L49.3,273.1 L42.7,277.0 L38.5,277.7 L35.2,280.6 L33.7,280.1 L33.1,277.5 L34.5,278.8 L34.0,276.4 L30.2,274.1 L28.0,274.2 L28.3,273.1 L27.2,271.9 L29.3,270.9 L29.9,269.1 L19.1,274.1 L19.6,271.4 L16.9,271.1 L16.9,18.5 L284.6,18.7 Z M17.2,274.3 L20.2,275.1 L23.2,273.4 L18.4,279.4 L18.2,280.9 L20.0,282.6 L20.7,280.6 L22.0,281.2 L20.4,283.1 L21.1,285.4 L16.9,284.5 L17.2,274.3 Z M106.4,236.6 L108.4,235.3 L109.3,237.3 L108.6,240.4 L98.1,238.5 L100.3,236.7 L101.9,238.0 L103.4,237.5 L104.9,235.5 L106.4,236.6 Z M126.5,219.3 L131.0,219.4 L130.4,220.9 L128.6,221.2 L128.3,224.2 L125.0,225.2 L125.6,229.1 L119.4,229.6 L122.1,226.6 L123.5,223.1 L120.5,222.5 L122.5,220.1 L122.3,217.7 L124.6,217.4 L126.5,219.3 Z M228.4,77.2 L236.5,80.4 L235.9,82.2 L228.4,80.0 L225.7,74.0 L228.4,77.2 Z M162.8,169.1 L167.8,170.4 L168.3,172.4 L165.3,176.9 L161.6,175.0 L163.4,173.8 L163.6,172.9 L162.3,173.6 L161.7,172.7 L162.8,169.1 Z M260.9,107.9 L258.9,110.0 L261.6,113.3 L257.4,114.0 L256.6,116.8 L253.5,115.6 L252.9,114.8 L254.0,111.8 L252.1,112.0 L252.1,110.9 L257.1,110.5 L257.7,109.6 L254.2,108.7 L254.9,105.3 L253.5,106.2 L252.9,105.1 L254.1,102.9 L257.9,101.1 L257.8,103.7 L263.2,107.4 L261.6,108.7 L260.9,107.9 Z M245.5,128.9 L243.7,131.6 L242.8,129.5 L239.9,129.2 L239.0,127.6 L240.4,126.2 L242.7,128.6 L245.5,128.9 Z M233.4,107.2 L232.8,114.8 L230.6,115.7 L229.8,112.0 L231.2,108.0 L232.6,106.5 L233.4,107.2 Z M249.9,74.7 L248.8,76.2 L245.1,74.2 L247.7,72.2 L249.9,74.7 Z M288.1,21.7 L290.0,20.3 L291.9,22.5 L290.1,23.2 L288.1,21.7 Z" fill={t.isDark?"#0e1e35":"#c2d3e5"} stroke={t.isDark?"#2c3c4f":"#8aaec8"} strokeWidth="1"/><path d="M377.5,144.8 L372.9,150.7 L371.9,155.4 L372.4,163.7 L376.2,166.5 L373.8,167.0 L374.7,169.4 L373.2,171.4 L373.8,173.7 L370.4,176.7 L369.2,182.9 L370.0,184.3 L363.8,191.5 L360.7,198.6 L361.9,202.5 L355.9,224.4 L352.5,243.9 L349.5,249.3 L349.0,256.0 L346.1,259.9 L343.4,267.5 L337.2,274.7 L336.5,278.6 L328.1,286.1 L323.6,294.2 L319.8,305.3 L319.7,323.2 L317.3,327.4 L317.5,332.5 L313.4,329.1 L311.7,328.7 L311.7,330.2 L310.4,330.5 L308.6,325.2 L309.5,319.7 L305.2,308.4 L299.0,300.5 L291.7,296.8 L288.9,294.6 L286.3,290.9 L289.0,294.2 L287.9,291.1 L283.7,286.0 L284.1,282.9 L281.5,277.8 L281.7,274.9 L278.2,266.2 L279.6,263.0 L278.2,262.9 L276.6,264.5 L276.3,262.0 L273.3,262.3 L273.6,260.3 L275.9,259.0 L273.6,258.2 L275.2,257.7 L273.6,255.7 L275.1,253.8 L274.6,252.2 L277.2,246.8 L276.8,245.4 L278.6,245.1 L277.0,244.0 L277.5,242.8 L279.5,242.7 L277.6,237.2 L279.1,234.7 L277.3,234.8 L277.2,233.0 L278.2,231.9 L278.3,225.7 L280.6,217.9 L286.7,208.8 L289.9,201.0 L293.4,197.4 L294.0,194.0 L298.0,189.2 L301.6,179.6 L306.7,173.6 L309.7,166.0 L314.0,162.3 L316.8,162.3 L316.5,161.2 L321.4,153.0 L322.3,148.9 L329.9,138.7 L347.8,132.0 L351.5,133.3 L348.8,130.5 L351.1,126.9 L354.5,124.6 L359.2,124.3 L363.1,129.6 L365.0,129.4 L364.6,130.7 L366.1,132.1 L376.8,134.7 L378.3,140.4 L383.1,141.6 L377.5,144.8 Z M358.2,323.9 L359.6,325.8 L355.4,324.5 L354.2,321.6 L358.4,321.6 L358.2,323.9 Z M179.8,171.2 L181.4,170.8 L182.9,172.2 L183.7,176.8 L182.9,177.8 L178.6,176.7 L175.5,179.3 L173.6,178.6 L173.5,174.0 L175.5,173.0 L179.1,174.2 L179.8,171.2 Z M250.4,227.8 L251.6,231.2 L250.0,230.3 L245.7,233.2 L243.6,231.7 L247.0,231.2 L245.0,230.3 L245.0,228.6 L250.4,227.8 Z M240.6,229.3 L242.1,224.9 L243.0,225.7 L241.6,229.8 L238.8,230.3 L240.6,229.3 Z" fill={t.isDark?"#1a3a5c":"#a8c8e8"} stroke="#60a5fa" strokeWidth="1.2"/><path d="M326.5,49.3 L287.1,110.9 L242.1,172.6 L208.3,246.5 L174.5,326.6" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.75"/>{[["Taipei",358.0,139.9,"#93c5fd","start",6,4],["Kaohsiung",287.1,287.8,"#93c5fd","start",6,4],["Xiamen",162.7,173.8,"#94a3b8","end",-6,4],["Fuzhou",230.8,76.4,"#94a3b8","start",6,4],["Kinmen",175.6,176.3,"#f97316","start",7,-8]].map(([n,x,y,col,ta,dx,dy])=><g key={n}><circle cx={x} cy={y} r="3.5" fill={col}/><text x={x+dx} y={y+dy} fontSize="9" fill={col} textAnchor={ta}>{n}</text></g>)}<rect x="5" y="327" width="390" height="16" fill="rgba(0,0,0,0.55)"/><line x1="10" y1="335" x2="25" y2="335" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2"/><text x="29" y="338" fontSize="7" fill="#94a3b8">Median line (informal)</text><circle cx="180" cy="335" r="3" fill="#f97316"/><text x="186" y="338" fontSize="7" fill="#94a3b8">Taiwan-held, off mainland coast</text></svg></div><ST t={t}>📡 Intelligence Signals</ST><Card t={t}>{[{icon:"⚡",label:"Current threat level: ELEVATED but stable",text:"PLA continues normalizing military pressure via frequent joint combat readiness patrols across the median line."},{icon:"🎯",label:"China\u2019s first live-fire drill near Okinotori (Jul 24)",text:"Directly contests a Japanese maritime claim near the atoll, days after the Taiwan Strait itself saw a live-fire exercise \u2014 widening friction to a second US treaty ally\u2019s waters in the same week."},{icon:"💻",label:"Semiconductor stakes: $1T+ shock risk",text:"Taiwan produces ~90% of world most advanced chips (TSMC ≤3nm). Any conflict or blockade triggers estimated $1T+ global GDP shock."}].map((item,i,a)=><div key={i} style={{display:"flex",gap:10,padding:"11px 14px",borderBottom:i<a.length-1?`.5px solid ${t.sep}`:0}}><span style={{fontSize:20,flexShrink:0}}>{item.icon}</span><div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:3}}>{item.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{item.text}</div></div></div>)}</Card><EventsTimeline t={t} events={EVENTS.taiwan} label="Key Events"/></div>}</div>;}

// ── Theater Sections ──────────────────────────────────────────────────────────────
function RankBar({t,data,field,max,color,accent}){return <Card t={t}><div style={{padding:"10px 14px"}}>
    {data.map((c,i)=>{const v=c[field]||0;return <div key={i} style={{marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3,fontSize:12}}><span style={{color:t.text,fontWeight:600}}>{c.flag} {c.name}</span><span style={{color:c.rank===1?color:t.sub,fontWeight:700}}>{typeof v==="number"?v.toLocaleString():v}</span></div>
      <div style={{height:6,background:t.isDark?"rgba(255,255,255,.08)":"rgba(0,0,0,.08)",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.max(v?3:0,v/max*100)}%`,background:c.rank===1?color:accent,borderRadius:3,transformOrigin:"left",animation:`barGrow .6s cubic-bezier(.22,1,.36,1) ${i*0.04}s both`}}/></div>
    </div>;})}
  </div></Card>;}

function ConflictOverviewCard({conflict,t,readAloud}){return <Hero t={t} style={{borderLeft:`4px solid ${conflict.statusColor}`}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:28}}>{conflict.icon}</span><div style={{flex:1,minWidth:0}}><div style={{fontSize:16,fontWeight:800,color:"#fff",display:"inline-block",animation:"textReveal .45s ease-out both"}}>{conflict.name}</div><Pill label={conflict.status} color={conflict.statusColor}/></div>{readAloud&&<ReadAloudButton text={conflict.summary} color={conflict.statusColor} t={t}/>}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}><div><div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>Deaths</div><div style={{fontSize:13,fontWeight:700,color:conflict.statusColor}}>{conflict.deaths}</div></div><div><div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>Displaced</div><div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{conflict.displaced}</div></div></div><div style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"9px 12px",fontSize:12,color:"rgba(255,255,255,.75)",lineHeight:1.6}}>{conflict.summary}</div></Hero>;}

function ScrubTimeline({t,events}){
  const[idx,setIdx]=useState(events.length-1);
  const ev=events[idx];
  return <Card t={t} style={{marginBottom:10}}>
    <div style={{padding:"14px 16px 12px"}}>
      <div style={{position:"relative",height:22,marginBottom:2}}>
        <div style={{position:"absolute",top:9,left:7,right:7,height:2,background:t.sep,borderRadius:1}}/>
        {events.map((e,i)=><button key={e.id??i} onClick={()=>setIdx(i)} aria-label={`${e.date}: ${e.label}`} style={{position:"absolute",top:2,left:`calc(${(i/(events.length-1||1))*100}% - 7px)`,width:14,height:14,borderRadius:"50%",background:i===idx?e.color:t.card,border:`2px solid ${e.color}`,cursor:"pointer",padding:0,boxShadow:i===idx?`0 0 0 3px ${e.color}33`:"none"}}/>)}
      </div>
      <input type="range" min={0} max={events.length-1} step={1} value={idx} onChange={e=>setIdx(Number(e.target.value))} aria-label="Drag to scrub through the timeline" style={{width:"100%",accentColor:ev.color,marginBottom:10,cursor:"pointer"}}/>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <button onClick={()=>setIdx(i=>Math.max(0,i-1))} disabled={idx===0} aria-label="Previous event" style={{background:"none",border:`1px solid ${t.border}`,borderRadius:8,padding:"4px 10px",cursor:idx===0?"default":"pointer",color:t.text,opacity:idx===0?0.35:1,fontSize:13,flexShrink:0}}>◀</button>
        <div style={{flex:1,textAlign:"center",minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginBottom:2}}>
            <span style={{fontSize:10,fontWeight:800,color:ev.color}}>{ev.date}</span>
            {ev.isUpcoming&&<Pill label="UPCOMING" color="#5b8ec8"/>}
          </div>
          <div style={{fontSize:13,fontWeight:800,color:t.text}}>{ev.label}</div>
        </div>
        <button onClick={()=>setIdx(i=>Math.min(events.length-1,i+1))} disabled={idx===events.length-1} aria-label="Next event" style={{background:"none",border:`1px solid ${t.border}`,borderRadius:8,padding:"4px 10px",cursor:idx===events.length-1?"default":"pointer",color:t.text,opacity:idx===events.length-1?0.35:1,fontSize:13,flexShrink:0}}>▶</button>
      </div>
      <div style={{fontSize:12,color:t.sub,lineHeight:1.6,textAlign:"center",marginTop:8}}>{ev.note}</div>
      <div style={{fontSize:9,color:t.sub,textAlign:"center",marginTop:8,opacity:0.55}}>Event {idx+1} of {events.length} — drag the slider or tap a marker</div>
    </div>
  </Card>;
}

function EventsTimeline({t,events,label}){if(!events?.length)return null;return <><ST t={t}>📅 {label??"Key Events"}</ST><ScrubTimeline t={t} events={events}/><Card t={t}>{events.map((ev,i)=><div key={ev.id} style={{display:"flex",gap:12,padding:"11px 14px",borderBottom:i<events.length-1?`.5px solid ${t.sep}`:0}}><div style={{minWidth:70,fontSize:10,fontWeight:700,color:ev.color,paddingTop:2,flexShrink:0}}>{ev.date}</div><div style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0,alignSelf:"stretch"}}><div style={{width:11,height:11,borderRadius:"50%",background:ev.color,border:`2px solid ${t.card}`,boxShadow:`0 0 0 1.5px ${ev.color}`,marginTop:3,flexShrink:0,zIndex:1}}/>{i<events.length-1&&<div style={{width:2,flex:1,background:t.sep,marginTop:2}}/>}</div><div style={{paddingBottom:i<events.length-1?4:0}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>{ev.isUpcoming&&<Pill label="UPCOMING" color="#5b8ec8"/>}<div style={{fontSize:13,fontWeight:700,color:t.text}}>{ev.label}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{ev.note}</div></div></div>)}</Card></>;}


function TheaterSection({t,conflict}){if(!conflict)return <Skeleton t={t} height={200}/>;return <div><ConflictOverviewCard conflict={conflict} t={t}/><Note t={t} color="#5b8ec8">Detailed section for {conflict.name} coming soon.</Note></div>;}

// ── Theaters Overview ──────────────────────────────────────────────────────────────
function Sparkline({data,color,width=56,height=20}){
  if(!data||data.length<2) return null;
  const min=Math.min(...data),max=Math.max(...data);
  const range=max-min||1;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*width},${height-((v-min)/range)*height}`).join(" ");
  const lastY=height-((data[data.length-1]-min)/range)*height;
  return <svg width={width} height={height} style={{display:"block",flexShrink:0}} aria-hidden="true">
    <polyline points={pts} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx={width} cy={lastY} r="2" fill={color}/>
  </svg>;
}

function getConflictTrend(id){
  const deltas=arr=>arr.map((d,i)=>i===0?null:d.v-arr[i-1].v).filter(v=>v!==null);
  switch(id){
    case "ukraine":{const d=CASUALTIES.slice(-7).map(x=>x.value);return d.length>=2?{data:d,rising:d[d.length-1]>=d[0],period:"7-day"}:null;}
    case "gaza":{const d=deltas(HISTORICAL.gazaCasualtiesSinceCeasefire);return d.length>=2?{data:d,rising:d[d.length-1]>=d[0],period:"recent"}:null;}
    case "south-china-sea":{const d=HISTORICAL.scsIncidents.map(x=>x.v);return{data:d,rising:d[d.length-1]>=d[0],period:"6-month"};}
    case "venezuela":{const d=deltas(HISTORICAL.boatStrikeDeaths);return d.length>=2?{data:d,rising:d[d.length-1]>=d[0],period:"recent"}:null;}
    case "caribbean":{const d=HISTORICAL.cubaGridCollapses.map(x=>x.v);return{data:d,rising:d[d.length-1]>=d[0],period:"grid collapses"};}
    default:return null;
  }
}

const SECTION_MAP={"south-china-sea":"scs","taiwan":"scs","caribbean":"venezuela","sudan":"africa","drc":"africa","sahel":"africa","indopak":"southasia","pakafghan":"southasia"};
const NESTED_TAB_IDS=["sudan","drc","sahel","indopak","pakafghan"];
function TheatersOverview({t,conflicts,onSelectConflict}){const STATUS_ORDER={"ESCALATING":0,"NEW CIVIL WAR":0,"US INTERVENTION":0,"MoU CRISIS":0,"CO-BELLIGERENT":1,"FLASHPOINT":1,"BLOCKADE":1,"Active":2,"MoU":3,"ELEVATED":4,"Fragile Ceasefire":5};const sorted=[...conflicts].sort((a,b)=>(STATUS_ORDER[a.status]??9)-(STATUS_ORDER[b.status]??9));return <div><div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",marginBottom:14}}>🌍 {conflicts.length} Active Theaters — Tap to Deep Dive</div><div style={{display:t.isLandscape?"grid":"block",gridTemplateColumns:t.isLandscape?"1fr 1fr":undefined,gap:t.isLandscape?12:0}}>{sorted.map((c,ci)=>{const sectionId=SECTION_MAP[c.id]??c.id;return <button key={c.id} className="theater-card" onPointerDown={e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty("--px",`${((e.clientX-r.left)/r.width*100)}%`);e.currentTarget.style.setProperty("--py",`${((e.clientY-r.top)/r.height*100)}%`);}} onClick={()=>onSelectConflict(sectionId,NESTED_TAB_IDS.includes(c.id)?c.id:undefined)} style={{display:"block",width:"100%",background:t.card,borderTop:`1px solid ${t.border}`,borderRight:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,borderLeft:`4px solid ${c.statusColor}`,borderRadius:14,padding:"16px 18px",marginBottom:12,cursor:"pointer",fontFamily:FONT,textAlign:"left",animation:`riseIn .3s ease-out ${ci*0.05}s both`}}><div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:10}}><span style={{fontSize:28,flexShrink:0,lineHeight:1}}>{c.icon}</span><div style={{flex:1,minWidth:0}}><div style={{fontSize:15,fontWeight:800,color:t.text,lineHeight:1.2,marginBottom:4}}>{c.name}</div><div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}><span style={{background:c.statusColor+"22",border:`1px solid ${c.statusColor}55`,borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:700,color:c.statusColor,textTransform:"uppercase"}}>{c.status}</span><span style={{fontSize:11,color:t.sub}}>{c.region}</span></div></div>{(()=>{const tr=getConflictTrend(c.id);if(!tr)return <span style={{fontSize:16,color:t.sub,flexShrink:0,marginTop:4}}>→</span>;const color=tr.rising?"#ef4444":"#22c55e";return <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,flexShrink:0}}><Sparkline data={tr.data} color={color}/><span style={{fontSize:8.5,fontWeight:800,color}}>{tr.rising?"▲":"▼"} {tr.period}</span></div>;})()}</div><div style={{display:"flex",gap:20,marginBottom:10}}><div><div style={{fontSize:10,color:t.sub,marginBottom:1}}>Deaths</div><div style={{fontSize:13,fontWeight:700,color:c.statusColor}}>{c.deaths}</div></div><div><div style={{fontSize:10,color:t.sub,marginBottom:1}}>Displaced</div><div style={{fontSize:13,fontWeight:700,color:t.text}}>{c.displaced}</div></div>{c.warDay&&<div><div style={{fontSize:10,color:t.sub,marginBottom:1}}>War day</div><div style={{fontSize:13,fontWeight:700,color:t.text}}>{c.warDay}</div></div>}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.6,background:t.isDark?"rgba(255,255,255,.03)":"rgba(0,0,0,.03)",borderRadius:8,padding:"9px 11px"}}>{c.summary}</div><div style={{marginTop:10,fontSize:11,color:"#5b8ec8",fontWeight:600}}>Open Deep Dive →</div></button>;})}</div>
  <div style={{fontSize:10,fontWeight:700,color:t.sub,textTransform:"uppercase",letterSpacing:".1em",margin:"20px 0 14px"}}>🧭 Cross-Theater Sections — Tap to Deep Dive</div>
  <div style={{display:t.isLandscape?"grid":"block",gridTemplateColumns:t.isLandscape?"1fr 1fr":undefined,gap:t.isLandscape?12:0}}>
  {[
    {id:"dronewar",name:"Drone War Dashboard",icon:"🛸",status:"WEEKLY TRACKER",statusColor:"#22c55e",region:"Ukraine / Russia",s1l:"RU launch rate",s1v:"~5k/mo",s2l:"UA output",s2v:"100k+/mo",summary:"Nightly launch/intercept data, saturation model, strike log, cost race, AD systems, and drone asset library. Current through Jul 8."},
    {id:"usmil",name:"Great Powers",icon:"⚔️",status:"REFERENCE",statusColor:"#5b8ec8",region:"US / China / Russia",s1l:"Tabs",s1v:"19",s2l:"Focus",s2v:"Escalation risk",summary:"Escalation risk assessment and power comparison lead, then rankings, naval pipeline, 5th-gen fighters, space & counterspace, critical minerals, arms flow, Arctic, defense-industrial production, nuclear arsenals and delivery systems, treaty architecture, and Cyber & Hybrid warfare."},
    ].map((c,ci)=><button key={c.id} className="theater-card" onPointerDown={e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty("--px",`${((e.clientX-r.left)/r.width*100)}%`);e.currentTarget.style.setProperty("--py",`${((e.clientY-r.top)/r.height*100)}%`);}} onClick={()=>onSelectConflict(c.id)} style={{display:"block",width:"100%",background:t.card,borderTop:`1px solid ${t.border}`,borderRight:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,borderLeft:`4px solid ${c.statusColor}`,borderRadius:14,padding:"16px 18px",marginBottom:12,cursor:"pointer",fontFamily:FONT,textAlign:"left",animation:`riseIn .3s ease-out ${ci*0.05}s both`}}><div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:10}}><span style={{fontSize:28,flexShrink:0,lineHeight:1}}>{c.icon}</span><div style={{flex:1,minWidth:0}}><div style={{fontSize:15,fontWeight:800,color:t.text,lineHeight:1.2,marginBottom:4}}>{c.name}</div><div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}><span style={{background:c.statusColor+"22",border:`1px solid ${c.statusColor}55`,borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:700,color:c.statusColor,textTransform:"uppercase"}}>{c.status}</span><span style={{fontSize:11,color:t.sub}}>{c.region}</span></div></div><span style={{fontSize:16,color:t.sub,flexShrink:0,marginTop:4}}>→</span></div><div style={{display:"flex",gap:20,marginBottom:10}}><div><div style={{fontSize:10,color:t.sub,marginBottom:1}}>{c.s1l}</div><div style={{fontSize:13,fontWeight:700,color:c.statusColor}}>{c.s1v}</div></div><div><div style={{fontSize:10,color:t.sub,marginBottom:1}}>{c.s2l}</div><div style={{fontSize:13,fontWeight:700,color:t.text}}>{c.s2v}</div></div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.6,background:t.isDark?"rgba(255,255,255,.03)":"rgba(0,0,0,.03)",borderRadius:8,padding:"9px 11px"}}>{c.summary}</div><div style={{marginTop:10,fontSize:11,color:"#5b8ec8",fontWeight:600}}>Open Deep Dive →</div></button>)}
  </div></div>;}

// ── Today View ─────────────────────────────────────────────────────────────────────
const HISTORICAL={
  ruCasualtiesCumulative:[{m:"Jan",v:1242000},{m:"Feb",v:1278000},{m:"Mar",v:1315000},{m:"Apr",v:1351000},{m:"May",v:1387000},{m:"Jun",v:1403550}],
  ruCasualtiesMonthly:[{m:"Jan",v:36000},{m:"Feb",v:36000},{m:"Mar",v:37000},{m:"Apr",v:36000},{m:"May",v:36000},{m:"Jun",v:16550}],
  refineryOffline:[{m:"Jan",v:8},{m:"Feb",v:14},{m:"Mar",v:19},{m:"Apr",v:25},{m:"May",v:38},{m:"Jun",v:40}],
  ruTerritoryKm2:[{m:"Jan",v:18},{m:"Feb",v:24},{m:"Mar",v:31},{m:"Apr",v:22},{m:"May",v:16},{m:"Jun",v:11}],
  deepStrikes:[{m:"Jan",v:9},{m:"Feb",v:14},{m:"Mar",v:18},{m:"Apr",v:22},{m:"May",v:31},{m:"Jun",v:34}],
  scsIncidents:[{m:"Jan",v:6},{m:"Feb",v:11},{m:"Mar",v:18},{m:"Apr",v:27},{m:"May",v:38},{m:"Jun",v:47},{m:"Jul",v:49}],
  boatStrikeDeaths:[{m:"Jan",v:24},{m:"Feb",v:58},{m:"Mar",v:97},{m:"Apr",v:142},{m:"May",v:188},{m:"Jun",v:221},{m:"Jul",v:221}],
    oilPriceBrent:[{m:"Jan",v:61},{m:"Feb",v:72},{m:"Mar",v:118},{m:"Apr",v:92},{m:"May",v:82},{m:"Jun",v:74}],
  gazaCasualtiesSinceCeasefire:[{m:"Jan",v:451},{m:"Apr",v:800},{m:"Jun",v:981},{m:"Jul",v:1200}],
  lebanonCasualties:[{m:"Mar 2",v:0},{m:"Apr 1",v:1318},{m:"May 1",v:2618},{m:"Jul 5",v:4304}],
  dprkCasualties:[{m:"Apr '25",v:6000},{m:"Jun '26",v:7000}],
  cubaGridCollapses:[{m:"Jan",v:0},{m:"Feb",v:0},{m:"Mar",v:2},{m:"Apr",v:0},{m:"May",v:0},{m:"Jun",v:0},{m:"Jul",v:3}],
};

// Complete months plus a live month-to-date point derived from the daily CASUALTIES
// array. Charts only — the KPI delta card and costPerKm intentionally keep using the
// raw complete-month series, since a partial month there would read as a real decline.
function ruMonthlyWithMTD(){
  const MON={Jan:"Jan",Feb:"Feb",Mar:"Mar",Apr:"Apr",May:"May",Jun:"Jun",Jul:"Jul",Aug:"Aug",Sep:"Sep",Oct:"Oct",Nov:"Nov",Dec:"Dec"};
  const base=HISTORICAL.ruCasualtiesMonthly;
  const latest=CASUALTIES[CASUALTIES.length-1];
  if(!latest) return base;
  const mon=MON[latest.date.split(" ")[0]];
  if(!mon||base.some(d=>d.m===mon)) return base;
  const days=CASUALTIES.filter(d=>d.date.startsWith(mon+" "));
  if(days.length<3) return base;
  return [...base,{m:mon,v:days.reduce((a,b)=>a+b.value,0),partial:true,days:days.length}];
}

function TrendChart({t,data,color,label,unit,desc,area}){
  const Chart=area?AreaChart:LineChart;
  const partialIdx=data.findIndex(d=>d&&d.partial);
  const partialPt=partialIdx>=0?data[partialIdx]:null;
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
          {area?<Area type="monotone" dataKey="v" stroke={color} fill={`url(#g_${label.replace(/[^a-z]/gi,"")})`} strokeWidth={2}/>:<Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={(p)=>p.index===partialIdx?<circle key={p.index} cx={p.cx} cy={p.cy} r={4} fill={t.card} stroke={color} strokeWidth={2} strokeDasharray="2 1.5"/>:<circle key={p.index} cx={p.cx} cy={p.cy} r={2.5} fill={color}/>}/>}
        </Chart>
      </ResponsiveContainer>
    </div>
    {partialPt&&<div style={{fontSize:10,color:color,fontWeight:700,padding:"4px 8px 0",letterSpacing:".02em"}}>◌ {partialPt.m} is month-to-date ({partialPt.days} days) — not a complete month, do not read as a decline</div>}
    {desc&&<div style={{fontSize:11,color:t.sub,lineHeight:1.5,padding:"6px 8px 2px"}}>{desc}</div>}
  </Card>;
}

const BALLISTIC_INTERCEPTS=[
  {label:"June (month)",n:54,downed:14,src:"CSIS"},
  {label:"Jun 29–Jul 5",n:23,downed:0,src:"UA AF"},
  {label:"Jul 6–12",n:13,downed:0,src:"UA AF"},
  {label:"Jul 13–19",n:16,downed:8,src:"UA AF"},
  {label:"Jul 20–26",n:9,downed:5,src:"UA AF"},
];
const BALLISTIC_INTERCEPTS_RECENT=[
  {label:"Jul 22 (nationwide)",n:1,downed:0,src:"UA AF"},
  {label:"Jul 23 (Odesa/Zaporizhzhia)",n:1,downed:0,src:"UA AF"},
  {label:"Jul 25–26 (Kyiv)",n:7,downed:5,src:"UA AF/Defense Express"},
];
function DeadlineCard({d,t}){const countdown=useCountdown(d.target);return <div style={{background:t.card,borderTop:`1px solid ${t.border}`,borderRight:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,borderLeft:`3px solid ${d.color}`,borderRadius:12,padding:"14px 16px",marginBottom:10,display:"flex",gap:14,alignItems:"flex-start"}}><div style={{flexShrink:0,textAlign:"center",minWidth:52}}><div style={{fontSize:20,marginBottom:2}}>{d.icon}</div><div style={{fontSize:10,fontWeight:800,color:d.color,lineHeight:1.2,whiteSpace:"nowrap"}}>{d.date}</div>{countdown&&<div style={{fontSize:9,fontWeight:700,color:d.color,opacity:0.75,marginTop:2,whiteSpace:"nowrap"}}>{countdown}</div>}</div><div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:3}}>{d.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{d.desc}</div></div></div>;}

function CollapsibleSection({title,defaultOpen=false,t,children}){
  const[open,setOpen]=useState(defaultOpen);
  return <div style={{marginBottom:20}}>
    <button onClick={()=>setOpen(o=>!o)} aria-expanded={open} style={{display:"flex",alignItems:"center",gap:10,width:"100%",background:t.isDark?"rgba(91,142,200,.07)":"rgba(91,142,200,.06)",border:`1px solid ${t.isDark?"rgba(91,142,200,.28)":"rgba(91,142,200,.25)"}`,borderRadius:10,cursor:"pointer",padding:"11px 13px",marginBottom:open?10:0,fontFamily:FONT,textAlign:"left"}}>
      <span style={{fontSize:11,fontWeight:800,color:t.text,textTransform:"uppercase",letterSpacing:".07em",flex:1}}>{title}</span>
      <span style={{fontSize:9,fontWeight:800,color:"#5b8ec8",letterSpacing:".08em",flexShrink:0}}>{open?"HIDE":"SHOW"}</span>
      <span style={{width:20,height:20,borderRadius:"50%",background:"rgba(91,142,200,.18)",border:"1px solid rgba(91,142,200,.45)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"transform .18s ease",transform:open?"rotate(0deg)":"rotate(-90deg)"}}>
        <span style={{fontSize:10,color:"#5b8ec8",lineHeight:1}}>▾</span>
      </span>
    </button>
    {open&&children}
  </div>;
}

function TodayView({t}){const critical=NEWS.filter(n=>n.severity==="critical");const watch=NEWS.filter(n=>n.severity==="watch"||n.severity==="major");const criticalShown=critical.slice(0,5);const watchShown=watch.slice(0,7-criticalShown.length);const shown=[...criticalShown,...watchShown];const shownCritical=shown.filter(n=>n.severity==="critical").length;const shownMajor=shown.filter(n=>n.severity==="major").length;const shownWatch=shown.filter(n=>n.severity==="watch").length;return <div style={{padding:"16px 16px 0",animation:"fadeIn .25s ease-out",position:"relative"}}><SJMark size={30} style={{top:2,right:6,transform:"rotate(-6deg)"}}/>
    <div style={{position:"relative",overflow:"hidden",background:t.isDark?"linear-gradient(135deg,#140b0b,#1c0f0f)":"linear-gradient(135deg,#fdf4f4,#fbeaea)",border:"1px solid rgba(220,38,38,.35)",borderRadius:14,padding:"16px 16px 12px",marginBottom:16,boxShadow:t.isDark?"0 4px 18px rgba(0,0,0,.42)":"0 2px 10px rgba(220,38,38,.10)"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#dc2626,#f97316,#dc2626)"}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          <span style={{width:7,height:7,borderRadius:"50%",background:"#dc2626",display:"inline-block",animation:"blink 1.4s ease-in-out infinite",flexShrink:0}}/>
          <span style={{fontSize:10.5,fontWeight:800,color:"#dc2626",letterSpacing:".18em",textTransform:"uppercase"}}>Principal Developments</span>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5}}>
          <ReadAloudButton text={shown.slice(0,4).map(n=>`${n.conflict}: ${n.headline}`).join(". ")} color="#dc2626" t={t}/>
        </div>
      </div>
      <div style={{fontSize:10,color:t.sub,marginBottom:10}}>Today's most consequential developments across all tracked theaters</div>
      {shown.slice(0,4).map((n,i)=><div key={n.id} style={{display:"flex",gap:11,padding:"9px 0",borderTop:i?`1px solid ${t.isDark?"rgba(220,38,38,.15)":"rgba(220,38,38,.12)"}`:"none",alignItems:"flex-start"}}>
        <span style={{width:22,height:22,borderRadius:6,background:n.severity==="critical"?"rgba(220,38,38,.15)":"rgba(249,115,22,.15)",border:`1px solid ${n.severity==="critical"?"rgba(220,38,38,.4)":"rgba(249,115,22,.4)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:n.severity==="critical"?"#dc2626":"#f97316",flexShrink:0,fontVariantNumeric:"tabular-nums"}}>{i+1}</span>
        <div style={{flex:1,minWidth:0}}>
          <span style={{fontSize:9,fontWeight:700,color:n.conflictColor,letterSpacing:".07em",textTransform:"uppercase"}}>{n.conflict}</span>
          <div style={{fontSize:12,color:t.text,lineHeight:1.45,marginTop:2}}>{n.headline}</div>
        </div>
      </div>)}
    </div>
    <BriefingPanel t={t}/>
    <div style={{background:t.isDark?"rgba(220,38,38,.07)":"rgba(220,38,38,.05)",border:"1px solid rgba(220,38,38,.18)",borderRadius:12,padding:"12px 16px",marginBottom:20,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}><span style={{width:8,height:8,borderRadius:"50%",background:"#dc2626",display:"inline-block",animation:"blink 1s ease-in-out infinite",flexShrink:0}}/><span style={{fontSize:12,fontWeight:700,color:"#dc2626"}}>{shownCritical} critical · {shownMajor} major · {shownWatch} watch</span><span style={{marginLeft:"auto",fontSize:11,color:t.sub}}>War Day {getWarDay()} · {REPORT_NOW.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span></div><CollapsibleSection t={t} title="01 · Breaking"><div style={{display:t.isLandscape?"grid":"block",gridTemplateColumns:t.isLandscape?"1fr 1fr":undefined,gap:t.isLandscape?10:0}}>{shown.map((story,si)=>{const sc=story.severity==="critical"?"#dc2626":story.severity==="major"?"#f97316":"#eab308";const isCrit=story.severity==="critical";return <div key={story.id} style={{position:"relative",overflow:"hidden",background:t.isDark?"linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,0) 40%),"+t.card:t.card,borderTop:t.isDark?"1px solid rgba(255,255,255,.08)":`1px solid ${t.border}`,borderRight:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,borderLeft:`3px solid ${sc}`,borderRadius:12,padding:"14px 16px",marginBottom:10,boxShadow:t.isDark?"0 3px 12px rgba(0,0,0,.38)":"0 2px 8px rgba(59,130,246,.10)",animation:`riseIn .32s ease-out ${si*0.05}s both${isCrit?", criticalPulse 2.2s ease-in-out "+(si*0.05+0.4)+"s infinite":""}`}}>{isCrit&&<div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(220,38,38,.10),transparent 30%)",animation:"edgeSheen 2.6s ease-in-out infinite",pointerEvents:"none"}}/>}{isCrit&&<div className="stamp">Priority</div>}<div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:6}}><span style={{fontSize:18,flexShrink:0,marginTop:1}}>{story.icon}</span><div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:700,color:t.text,lineHeight:1.4,marginBottom:5}}>{story.headline}</div><div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}><span style={{background:story.conflictColor+"22",border:`1px solid ${story.conflictColor}55`,borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:700,color:story.conflictColor}}>{story.conflict}</span><span style={{fontSize:10,color:t.sub}}>{story.publishedAt}</span><Freshness t={t} date={story.publishedAt}/><ConfidenceTag level={story.confidence}/></div></div></div><div style={{fontSize:11,fontWeight:600,color:story.impactColor}}>{story.impact}</div></div>;})}</div></CollapsibleSection><CollapsibleSection t={t} title="02 · Combined Toll — All Tracked Conflicts"><div style={{background:t.card,borderTop:`1px solid ${t.border}`,borderRight:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,borderLeft:"3px solid #dc2626",borderRadius:12,padding:"14px 16px"}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:8}}><div><div style={{fontSize:10,color:t.sub}}>Deaths</div><div style={{fontSize:22,fontWeight:800,color:"#dc2626",fontVariantNumeric:"tabular-nums"}}>{GLOBAL_TOLL.deaths}</div></div><div><div style={{fontSize:10,color:t.sub}}>Displaced</div><div style={{fontSize:22,fontWeight:800,color:"#f97316",fontVariantNumeric:"tabular-nums"}}>{GLOBAL_TOLL.displaced}</div></div></div><div style={{fontSize:11,color:t.sub,lineHeight:1.55}}>{GLOBAL_TOLL.note}</div></div></CollapsibleSection><CollapsibleSection t={t} title="03 · Global Energy Disruption"><div style={{display:t.isLandscape?"grid":"block",gridTemplateColumns:t.isLandscape?"1fr 1fr":undefined,gap:t.isLandscape?10:0}}>{ENERGY_DISRUPTIONS.map((e,i)=><div key={i} style={{background:t.card,borderTop:`1px solid ${t.border}`,borderRight:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,borderLeft:`3px solid ${e.color}`,borderRadius:12,padding:"12px 14px",marginBottom:8}}><div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}><span style={{fontSize:16}}>{e.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text}}>{e.label}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{e.text}</div></div>)}<TrendChart t={t} data={HISTORICAL.oilPriceBrent} color="#f97316" label="Brent Crude" unit="$ per barrel" area desc="From $61 in January to a $118 peak in March after the Feb 28 US-Israel strikes on Iran shut most Hormuz traffic — the largest inflation-adjusted quarterly jump on record (EIA). Eased to ~$74 by June as Hormuz reopened. Ties together every energy story on this dashboard — Ukraine's refinery campaign, Hormuz, and the Cuba/Venezuela fuel crisis all move this one number." /></div></CollapsibleSection><CollapsibleSection t={t} title="04 · Sanctions Tracker"><div style={{display:t.isLandscape?"grid":"block",gridTemplateColumns:t.isLandscape?"1fr 1fr":undefined,gap:t.isLandscape?10:0}}>{SANCTIONS_TRACKER.map((s,i)=><div key={i} style={{background:t.card,borderTop:`1px solid ${t.border}`,borderRight:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,borderLeft:`3px solid ${s.color}`,borderRadius:12,padding:"12px 14px",marginBottom:8}}><div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3,flexWrap:"wrap"}}><span style={{fontSize:16}}>{s.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text,flex:1}}>{s.label}</div><span style={{fontSize:9,fontWeight:700,color:s.color,background:s.color+"18",borderRadius:10,padding:"1px 7px"}}>{s.theater}</span></div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{s.text}</div></div>)}</div></CollapsibleSection><CollapsibleSection t={t} title="05 · Political Calendar"><div style={{display:t.isLandscape?"grid":"block",gridTemplateColumns:t.isLandscape?"1fr 1fr":undefined,gap:t.isLandscape?10:0}}>{POLITICAL_CALENDAR.map((p,i)=><div key={i} style={{background:t.card,borderTop:`1px solid ${t.border}`,borderRight:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,borderLeft:`3px solid ${p.color}`,borderRadius:12,padding:"12px 14px",marginBottom:8,display:"flex",gap:12}}><div style={{minWidth:78,fontSize:10,fontWeight:700,color:p.color,flexShrink:0,paddingTop:1}}>{p.date}</div><div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:2}}>{p.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{p.note}</div></div></div>)}</div></CollapsibleSection><CollapsibleSection t={t} title="06 · Legal & Accountability Tracker"><div style={{display:t.isLandscape?"grid":"block",gridTemplateColumns:t.isLandscape?"1fr 1fr":undefined,gap:t.isLandscape?10:0}}>{LEGAL_TRACKER.map((l,i)=><div key={i} style={{background:t.card,borderTop:`1px solid ${t.border}`,borderRight:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,borderLeft:`3px solid ${l.color}`,borderRadius:12,padding:"12px 14px",marginBottom:8}}><div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3,flexWrap:"wrap"}}><span style={{fontSize:16}}>{l.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text,flex:1}}>{l.label}</div><span style={{background:l.color+"22",border:`1px solid ${l.color}55`,borderRadius:20,padding:"1px 8px",fontSize:9,fontWeight:700,color:l.color,textTransform:"uppercase"}}>{l.theater}</span></div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{l.text}</div></div>)}</div></CollapsibleSection><CollapsibleSection t={t} title="07 · Upcoming Deadlines"><div style={{display:t.isLandscape?"grid":"block",gridTemplateColumns:t.isLandscape?"1fr 1fr":undefined,gap:t.isLandscape?10:0}}>{DEADLINES.map((d,i)=><DeadlineCard key={i} d={d} t={t}/>)}</div></CollapsibleSection><CollapsibleSection t={t} title="🕵️ Cyber & Hybrid Warfare"><div style={{display:t.isLandscape?"grid":"block",gridTemplateColumns:t.isLandscape?"1fr 1fr":undefined,gap:t.isLandscape?10:0}}>{CYBER_HYBRID.map((c,i)=><div key={i} style={{background:t.card,borderTop:`1px solid ${t.border}`,borderRight:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,borderLeft:`3px solid ${c.color}`,borderRadius:12,padding:"12px 14px",marginBottom:8}}><div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3,flexWrap:"wrap"}}><span style={{fontSize:16}}>{c.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text,flex:1}}>{c.label}</div><ConfidenceTag level={c.confidence}/></div><div style={{fontSize:12,color:t.sub,lineHeight:1.6}}>{c.text}</div></div>)}</div><div style={{fontSize:10.5,color:t.sub,fontStyle:"italic",padding:"6px 2px 0"}}>See full Cyber section → Deep Dive. Attribution in cyber/hybrid incidents is frequently contested — treat sourcing as preliminary unless independently confirmed.</div></CollapsibleSection></div>;}

// ── Deep Dive View ─────────────────────────────────────────────────────────────────
const CONFLICT_SECTIONS=[{id:"ukraine",label:"🇺🇦 Ukraine",conflictId:"ukraine"},{id:"dronewar",label:"🛸 Drone War",conflictId:"dronewar"},{id:"usmil",label:"⚔️ Great Powers",conflictId:"usmil"},{id:"iran",label:"🇮🇷 Iran",conflictId:"iran"},{id:"gaza",label:"🌍 Israel & Levant",conflictId:"gaza"},{id:"scs",label:"🏝️ S. China Sea & Taiwan",conflictId:"south-china-sea"},{id:"venezuela",label:"🌎 Americas",conflictId:"venezuela"},{id:"africa",label:"🌍 Africa",conflictId:"sudan"},{id:"southasia",label:"🌏 South Asia",conflictId:"indopak"}];

function GazaSection({t,initialTab}){
  const[tab,setTab]=useState(initialTab??"conflict");useEffect(()=>{if(initialTab)setTab(initialTab);},[initialTab]);
  const conflict=CONFLICTS.find(c=>c.id==="gaza");
  const losses=LOSSES.gaza??[];
  const events=EVENTS.gaza??[];
  const HUM_METRICS=[
    {icon:"☠️",label:"Total killed",val:"73,326",color:"#ef4444",desc:"Since Oct 7, 2023 (incl. 21,500 children), Gaza MoH as of Jul 25, 2026 (173,811+ wounded). Actual toll likely higher — morgue capacity overwhelmed, thousands missing under rubble; a peer-reviewed Lancet mortality survey has separately estimated true violent deaths well above the MoH count."},
    {icon:"👶",label:"Children killed",val:"20,179+",color:"#ef4444",desc:"Over 27% of total killed are children — highest child casualty rate in any modern conflict per Save the Children."},
    {icon:"💀",label:"Post-ceasefire killed",val:"1,200",color:"#f97316",desc:"Palestinians killed since Oct 10, 2025 ceasefire, Gaza MoH as of Jul 19 (3,703 wounded). Hamas not disarming; Israel controls ~65% of the Strip. Fragile ceasefire with no enforcement mechanism."},
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
      <LevantMap t={t}/>
      <Note t={t} color="#f59e0b">⚖️ <strong>Contested framing:</strong> A UN Commission of Inquiry (Sep 2025) and multiple human rights bodies concluded Israel's campaign met the legal definition of genocide; Israel rejects this characterization as biased and has called for the Commission's abolition. The ICJ genocide case (South Africa v. Israel) remains open and unresolved. This dashboard presents both the findings and Israel's rejection of them without adjudicating the underlying legal question.</Note>
      <ST t={t}>🗺️ Current Situation</ST>
      <Card t={t}>{[{icon:"🤝",label:"Ceasefire Status (Oct 10, 2025)",text:"Fragile ceasefire holding — 1,200 Palestinians killed since it began (Israel has struck on ~246 of the first 273 ceasefire days per an Al Jazeera analysis). Hamas not disarming. International monitoring mission deployed. No permanent agreement."},{icon:"🏛️",label:"Quiet Annexation",text:"Israel advancing settlement activity in West Bank. West Bank: 1,081+ killed since Oct 2023, highest displacement since 1967. ICJ ruled settlements illegal Jul 2024."},{icon:"🇺🇸",label:"US position",text:"Trump administration: conditional support for two-state solution. Governance runs through the Trump-chaired Board of Peace and the Cairo-based NCAG (named Jan 2026) — see Governance tab for status. Jared Kushner's reconstruction plan has been dismissed by experts as unrealistic."}].map((item,i,a)=><div key={i} style={{display:"flex",gap:10,padding:"11px 14px",borderBottom:i<a.length-1?`.5px solid ${t.sep}`:0}}><span style={{fontSize:20,flexShrink:0}}>{item.icon}</span><div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:3}}>{item.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{item.text}</div></div></div>)}
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
      <Card t={t}><div style={{padding:"11px 14px",fontSize:12,color:t.sub,lineHeight:1.6}}>Aoun met Trump at the White House in late July and pressed to activate the framework and address Hezbollah's weapons without triggering internal Lebanese conflict. The first concrete step followed: the Lebanese army deployed into three pilot towns in the south, with PM Salam calling it the start of a return-and-reconstruction process. But Hezbollah says no actual Israeli withdrawal has occurred, and cites an IDF shooting incident involving Lebanese army personnel as proof Israel still controls the south. UNIFIL's mandate ends Dec 31, 2026 with no renewal — its exit removes the last neutral monitor from the south just as the framework depends on verification.</div></Card>
      <ST t={t} color="#c8313c">📖 Strategic Primer — Hezbollah's Role &amp; Capabilities</ST>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:6}}>
        <ReadAloudButton text={"What it is — Hezbollah is a Lebanese Shia Islamist movement founded in 1982 that operates as a hybrid organization: a political party holding seats in parliament and, at times, cabinet posts, alongside a separate and far larger military wing. Force structure — Independent estimates put pre-2024 active fighting strength at roughly 20,000 to 25,000, with a reserve pool cited as high as 100,000 by some Israeli assessments. Its arsenal was long described as the largest non-state rocket and missile stockpile in the world. The 2024 degradation — The group absorbed the heaviest blow in its history in 2024: the September pager and radio device attacks disabled much of its command network, and an Israeli strike weeks later killed longtime Secretary-General Hassan Nasrallah. Naim Qassem was named successor. The Iran linkage — Hezbollah is the most capable member of Iran's Axis of Resistance and has historically received funding, training and weapons transfers via the IRGC-Quds Force. Why disarmament is the crux — The framework's core demand, verified disarmament as the price of Israeli withdrawal, asks Hezbollah to give up the one asset that gives its political wing continued leverage inside Lebanon and its patron continued reach toward Israel."} color="#c8313c" t={t}/>
      </div>
      <Card t={t}><div style={{padding:"11px 14px",fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>What it is</span> — Hezbollah is a Lebanese Shia Islamist movement founded in 1982 that operates as a hybrid organization: a political party holding seats in parliament and, at times, cabinet posts, alongside a separate and far larger military wing. That dual structure is central to why disarmament negotiations are so fraught \u2014 the political wing survives any military setback, and Lebanon's fragile sectarian power-sharing system gives it institutional leverage no purely militant group would have.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Force structure</span> — Independent estimates (IISS, CSIS) put pre-2024 active fighting strength at roughly 20,000\u201325,000, with a reserve/mobilizable pool cited as high as 100,000 by some Israeli assessments \u2014 figures that are inherently uncertain given the group's secrecy. Its arsenal was long described as the largest non-state rocket/missile stockpile in the world, built around large numbers of short-range rockets supplemented by a smaller but more consequential precision-guided missile program developed with Iranian and Syrian assistance.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>The 2024 degradation</span> — The group absorbed the heaviest blow in its history in 2024: the September pager/radio device attacks disabled much of its mid-level command network in a single day, and an Israeli strike weeks later killed longtime Secretary-General Hassan Nasrallah along with most of his senior command tier. Naim Qassem, previously deputy secretary-general, was named successor. CSIS and IISS assessments through 2025-26 describe the precision-missile program and top command structure as substantially degraded, even as the broader rocket stockpile and rank-and-file manpower base remain largely intact.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>The Iran linkage</span> — Hezbollah is the most capable member of what Iran calls its "Axis of Resistance" and has historically received funding, training and weapons transfers via the IRGC-Quds Force, alongside its own financing streams (diaspora networks, and disputed allegations of illicit trade). Tehran's doctrine of "unity of the fronts" treats Lebanon as a forward deterrent extending Iran's own reach to Israel's northern border \u2014 the reason Araghchi's warning about Beirut (noted above) carries real strategic weight rather than being rhetorical.</div>
        <div><span style={{color:t.text,fontWeight:700}}>Why disarmament is the crux</span> — The Jun 26 framework's core demand \u2014 verified disarmament as the price of Israeli withdrawal \u2014 asks Hezbollah to give up the one asset (its arsenal) that gives its political wing continued leverage inside Lebanon and its patron continued reach toward Israel. That structural bind, more than any single tactical dispute, is why Qassem rejected the deal outright rather than negotiating its terms.</div>
      </div></Card>
      <Note t={t} color="#c8313c">Organizational and force-strength background per IISS Military Balance, CSIS, and Alma Research Center open-source assessments; figures on personnel and arsenal size are independent estimates, not official disclosures, and vary meaningfully by source.</Note>
      <Note t={t} color="#c8313c">Casualty and displacement figures per the Lebanese Health Ministry and UN; framework terms per the US State Department text and Al Jazeera/Reuters reporting. This tab covers the Israel-Hezbollah/Lebanon front; the Israel-Iran war and nuclear file are tracked in the Iran section.</Note>
      <TrendChart t={t} data={HISTORICAL.lebanonCasualties} color="#c8313c" label="Lebanon: Killed Since War Resumed (cumulative)" unit="Lebanese MoH, since Mar 2, 2026" desc="4 real dated points, no interpolation: Mar 2 (war restart, 0), Apr 1 (1,318), May 1 (2,618), Jul 5 (4,304). No confirmed June aggregate was published — that gap is shown honestly rather than smoothed." />
    </div>}
    {tab==="governance"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #8b5cf6"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🌐 SIX MONTHS INTO THE CEASEFIRE</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,.75)",lineHeight:1.6}}>The Oct 10, 2025 ceasefire has held in the narrow sense — mass fighting stopped — but nearly every other pillar of the 20-point plan remains stalled. The Board of Peace's own assessment: "there is no recovery in Gaza."</div>
      </Hero>
      <ST t={t} color="#8b5cf6">🗺️ Territorial Control</ST>
      <Card t={t}>{[
        {icon:"📝",label:"Jul 31 — a disarmament agreement, on paper",text:"The Board of Peace announced Hamas has agreed to disarm: police weapons transfer first, then heavy weapons decommission to NCAG over a timetable to be finalized within 14 days, with Israeli withdrawal on a matching schedule. Hamas official Ghazi Hamad says the group \u2018will not implement any part of the agreement\u2019 unless Israel withdraws first; Israel hasn't endorsed it and has conveyed reservations. Same first-mover sequencing dispute that has stalled every prior phase — genuinely unclear whether this is real movement or another announced-but-unimplemented framework."},
        {icon:"📏",label:"Yellow Line → Orange Line",text:"Israel's post-ceasefire withdrawal line has shifted from ~53% territorial control at signing to ~64% as of mid-2026, per aid-group mapping — moving toward the Mediterranean, not away from it."},
        {icon:"⚠️",label:"Permanent-division risk",text:"Board of Peace envoy Nikolay Mladenov (May 2026): a prolonged stalemate risks \"a dangerous status quo\" — 2 million Palestinians left without a viable future while Israel's presence across the Strip entrenches."},
        {icon:"🏛️",label:"Governance vacuum",text:"The Board of Peace (chaired by Trump) and the National Committee for the Administration of Gaza (NCAG) were named in January 2026 but remain non-operational on the ground — no functioning transitional authority exists."},
        {icon:"🪖",label:"International Stabilization Force (ISF)",text:"A multinational force under the ceasefire plan, meant to backstop NCAG once it's operational; Kosovo is among the contributing states. A staging waypoint (\"Life Support Area Endurance\") is being set up on the Gaza border, but the ISF itself has not yet deployed into the Strip."},
        {icon:"🔻",label:"Hamas's residual control",text:"Estimated at ~40% of the Strip as of mid-2026 (Board of Peace sourcing via Jerusalem Post) — down from full control pre-ceasefire, but still enough to keep the \"governance vacuum\" above from resolving."},
      ].map((item,i,a)=><div key={i} style={{display:"flex",gap:10,padding:"11px 14px",borderBottom:i<a.length-1?`.5px solid ${t.sep}`:0}}><span style={{fontSize:20,flexShrink:0}}>{item.icon}</span><div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:3}}>{item.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{item.text}</div></div></div>)}</Card>
      <ST t={t} color="#8b5cf6">🏗️ Reconstruction</ST>
      <Grid2 t={t} items={[{val:"$70B",label:"Estimated cost",sub:"Brookings — \"no modern comparison\"",color:"#8b5cf6"},{val:"0",label:"Reconstruction begun",sub:"Six months post-ceasefire",color:"#ef4444"},{val:"80%",label:"Buildings damaged",sub:"Or destroyed",color:"#f97316"},{val:"1,200",label:"Killed since ceasefire",sub:"As of Jul 25 (Gaza MoH)",color:"#ef4444"}]}/>
      <Note t={t} color="#8b5cf6">Jared Kushner's January 2026 "New Gaza" master plan (skyscrapers, seaside resorts) has been dismissed by experts as unrealistic even as a planning exercise. No credible reconstruction framework has replaced it.</Note>
      <TrendChart t={t} data={HISTORICAL.gazaCasualtiesSinceCeasefire} color="#f59e0b" label="Gaza: Killed Since Ceasefire (cumulative)" unit="Palestinians killed since Oct 10, 2025 truce" desc="Only 3 reliably dated points exist for this series — Jan 9: 451 (Al Jazeera/Gaza GMO), Apr 28: ~800 (UN Security Council briefing), Jun 10: 1,092+ (Gaza MoH/OCHA, Jul 9); Jul 26: 1,200 (Gaza MoH). Deliberately not smoothed into a full monthly series per this dashboard's sourcing standard — the point stands regardless: a 'ceasefire' has still killed over 1,100 people in 9 months." />
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


// ── Strait of Hormuz — geographic map ─────────────────────────────────────────
// Coastlines are simplified outlines; all named positions (ports, islands,
// chokepoint) are plotted at their true lat/lon and the projection preserves
// true scale (equirectangular, cos-latitude corrected at 26.25°N).
const HZ={lon0:54.60,lon1:57.90,lat0:25.10,lat1:27.40,W:400,H:310};
const hzX=(lon)=>((lon-HZ.lon0)/(HZ.lon1-HZ.lon0))*HZ.W;
const hzY=(lat)=>((HZ.lat1-lat)/(HZ.lat1-HZ.lat0))*HZ.H;
const hzPath=(pts)=>pts.map((pt,i)=>`${i?"L":"M"}${hzX(pt[1]).toFixed(1)},${hzY(pt[0]).toFixed(1)}`).join(" ");

const HZ_IRAN_PATH="M472.7,244.4 L464.3,244.2 L462.0,243.1 L462.9,241.0 L459.4,241.2 L451.0,245.2 L447.4,244.8 L443.7,247.2 L442.2,246.1 L437.2,249.4 L432.8,250.1 L417.7,246.0 L407.7,230.0 L403.1,229.0 L398.1,230.3 L384.5,237.8 L385.8,229.2 L382.5,223.4 L376.9,222.6 L367.5,224.4 L362.1,222.6 L354.0,223.3 L345.8,220.7 L346.7,219.8 L328.7,217.8 L327.1,209.1 L321.6,194.2 L317.5,189.4 L315.0,189.4 L311.1,177.5 L311.6,173.1 L316.7,166.3 L315.1,162.0 L307.0,153.1 L307.7,149.6 L305.2,139.6 L300.6,132.7 L301.8,105.3 L293.9,74.0 L286.7,65.9 L286.8,63.7 L281.9,60.0 L287.7,58.1 L286.5,55.9 L287.7,53.5 L282.7,55.4 L277.7,51.6 L274.6,52.3 L274.4,49.8 L272.8,50.2 L272.0,48.5 L276.9,43.4 L270.5,41.0 L267.7,35.1 L261.5,37.0 L256.5,33.3 L240.3,33.3 L212.5,26.7 L201.2,28.1 L195.8,31.3 L184.7,32.3 L181.0,37.0 L162.3,50.3 L141.1,54.4 L129.2,54.5 L115.7,67.4 L119.1,65.6 L118.8,72.9 L115.7,79.4 L111.7,82.9 L102.1,86.3 L81.3,81.9 L76.7,84.0 L73.4,90.8 L61.0,94.2 L40.1,111.5 L23.2,121.9 L18.1,120.1 L2.4,120.2 L-1.1,113.2 L-4.7,109.9 L-21.1,109.3 L-25.5,107.1 L-31.8,95.2 L-35.4,92.3 L-54.5,93.2 L-69.5,87.7 L-72.7,88.1 L-72.7,-53.9 L472.7,-53.9 L472.7,244.4 Z M-11.3,145.4 L-6.4,149.6 L-8.9,154.7 L-12.4,153.7 L-13.1,147.0 L-11.3,145.4 Z M-72.7,122.6 L-72.7,113.6 L-68.7,114.5 L-68.3,117.7 L-66.6,118.9 L-66.9,122.1 L-72.7,122.6 Z M208.8,76.2 L211.0,70.2 L218.7,68.3 L219.3,72.5 L215.7,75.7 L211.0,77.1 L208.8,76.2 Z M197.8,54.1 L203.6,57.4 L204.5,60.0 L193.2,64.1 L179.5,82.8 L163.3,94.8 L154.7,88.6 L142.1,95.9 L131.6,95.6 L109.4,108.5 L93.3,112.7 L89.6,112.0 L87.3,114.8 L83.7,114.8 L82.5,109.9 L83.5,106.0 L81.7,101.1 L83.0,99.7 L91.1,101.4 L97.6,97.8 L118.1,91.6 L126.1,86.2 L142.3,81.3 L141.4,79.4 L143.7,74.8 L143.2,68.8 L137.3,61.9 L140.4,60.1 L157.3,66.5 L161.9,65.4 L174.7,57.2 L190.7,53.6 L197.8,54.1 Z M228.3,40.5 L231.3,43.9 L229.7,46.9 L226.2,48.0 L222.4,46.5 L224.9,40.1 L228.3,40.5 Z M-6.5,198.6 L-6.9,203.1 L-10.9,200.3 L-6.5,198.6 Z M156.9,97.1 L158.1,101.7 L156.3,104.6 L153.9,106.1 L151.9,105.0 L153.7,98.9 L156.9,97.1 Z M53.8,203.1 L55.1,206.9 L52.4,208.3 L50.7,207.6 L49.9,204.7 L53.8,203.1 Z";
const HZ_OMAN_PATH="M203.5,238.9 L210.9,242.0 L214.5,252.6 L213.2,272.7 L216.2,281.2 L214.1,295.3 L213.6,315.8 L216.2,326.4 L209.6,327.2 L207.1,337.6 L199.0,344.7 L190.4,347.2 L185.1,357.8 L181.7,359.8 L177.2,359.6 L173.5,356.6 L170.0,347.3 L164.6,341.2 L167.1,338.8 L173.2,342.2 L170.4,329.4 L161.9,326.5 L153.0,330.4 L145.3,338.8 L144.1,343.0 L144.8,363.4 L147.7,371.5 L144.3,374.7 L143.5,379.2 L140.6,383.0 L142.1,390.9 L-6.2,390.9 L-4.7,390.7 L-7.2,388.7 L-2.2,389.7 L-0.1,387.0 L4.4,377.7 L2.4,376.8 L1.9,374.5 L5.3,373.3 L6.3,369.5 L8.6,368.5 L5.3,357.4 L13.0,349.9 L18.7,351.5 L21.0,348.4 L19.4,346.3 L44.6,329.1 L54.5,324.4 L53.9,321.6 L58.5,321.2 L79.9,294.5 L80.4,290.5 L82.7,288.3 L84.6,288.6 L87.1,293.1 L85.0,297.4 L88.3,296.3 L89.0,293.9 L85.3,285.3 L89.6,280.2 L92.5,279.8 L92.8,275.1 L95.4,275.3 L101.7,267.8 L103.7,269.6 L104.9,266.9 L105.8,267.8 L109.9,259.5 L108.4,258.7 L115.3,245.5 L117.3,244.7 L114.2,250.4 L114.9,252.1 L124.4,251.2 L128.1,242.9 L131.3,239.4 L137.4,236.3 L141.9,230.9 L150.6,227.3 L164.8,212.5 L162.1,218.8 L163.9,219.4 L165.6,211.0 L173.4,202.1 L174.7,197.7 L170.6,201.2 L176.4,190.2 L179.1,180.5 L189.4,178.8 L191.9,186.7 L190.4,205.3 L186.6,212.6 L190.5,220.3 L186.8,224.7 L188.0,234.7 L192.6,236.5 L194.6,240.2 L203.5,238.9 Z M-14.6,390.9 L-22.1,386.1 L-17.9,383.2 L-16.4,386.1 L-16.3,383.5 L-13.9,381.4 L-12.9,385.2 L-7.9,390.9 L-14.6,390.9 Z M201.2,286.3 L204.6,286.8 L204.0,289.0 L201.6,289.9 L201.2,286.3 Z M-27.2,390.4 L-25.5,387.8 L-24.7,387.8 L-25.4,390.9 L-27.2,390.4 Z M204.9,279.3 L207.2,282.9 L212.0,283.8 L211.4,287.6 L198.3,295.0 L194.9,293.7 L195.0,289.1 L199.4,286.0 L198.0,281.4 L201.3,278.9 L204.9,279.3 Z M179.1,180.4 L180.8,174.3 L191.7,155.5 L194.9,153.2 L196.4,158.0 L195.4,160.7 L202.0,158.0 L205.1,160.1 L205.4,162.5 L214.2,158.8 L218.7,159.8 L217.5,156.5 L214.3,155.8 L207.1,158.8 L208.0,149.6 L213.1,153.0 L213.8,151.0 L208.8,147.0 L212.9,143.2 L213.8,136.7 L216.2,140.3 L218.7,138.5 L219.6,142.2 L220.7,141.2 L225.7,144.0 L228.8,144.0 L227.9,141.3 L230.4,140.3 L231.4,145.1 L224.6,145.8 L218.0,152.5 L222.1,156.4 L227.4,155.1 L228.8,157.0 L225.4,161.5 L224.6,158.8 L222.1,158.8 L222.1,162.5 L227.9,169.0 L219.7,167.3 L218.7,163.5 L215.4,165.3 L217.1,161.6 L214.4,161.1 L209.5,165.4 L210.4,173.6 L213.8,169.0 L213.8,174.6 L227.0,175.4 L224.1,178.8 L215.8,183.5 L216.2,185.7 L219.3,184.1 L221.0,185.6 L221.0,188.1 L218.2,190.0 L220.9,194.5 L224.6,195.8 L222.9,198.7 L219.1,197.1 L216.2,198.7 L218.1,201.9 L213.8,210.5 L213.8,214.7 L206.3,223.5 L206.3,220.7 L202.9,227.9 L202.0,232.8 L203.5,238.9 L194.6,240.2 L192.6,236.5 L187.3,233.1 L186.8,224.7 L190.5,220.3 L186.6,212.6 L190.4,205.3 L191.9,186.7 L189.4,178.8 L179.1,180.4 Z M218.8,337.3 L227.9,355.1 L229.5,363.9 L243.5,390.9 L142.1,390.9 L140.6,383.0 L143.5,379.2 L144.3,374.7 L147.7,371.5 L144.8,363.4 L144.1,343.0 L145.3,338.8 L153.0,330.4 L161.9,326.5 L170.4,329.4 L173.2,342.2 L167.1,338.8 L164.6,341.2 L170.0,347.3 L173.5,356.6 L179.1,359.9 L184.0,359.1 L190.4,347.2 L199.0,344.7 L207.1,337.6 L209.6,327.2 L216.2,326.4 L218.8,337.3 Z";
const HZ_LANE=[[25.95,57.55],[26.20,57.05],[26.45,56.62],[26.70,56.30],[26.80,55.90],[26.75,55.40],[26.65,54.90]];
const HZ_PORTS=[
  {n:"Bandar Abbas",lat:27.18,lon:56.28,side:"ir",note:"Iran's main naval base"},
  {n:"Bandar Lengeh",lat:26.55,lon:54.88,side:"ir"},
  {n:"Bandar-e Jask",lat:25.65,lon:57.78,side:"ir",note:"Outside the strait"},
  {n:"Khasab",lat:26.18,lon:56.24,side:"om"},
  {n:"Fujairah",lat:25.12,lon:56.34,side:"om",note:"Bypass terminal"},
];
const HZ_ISLES=[
  {n:"Hormuz I.",lat:27.06,lon:56.46},
  {n:"Larak I.",lat:26.85,lon:56.36},
  {n:"Gt. Tunb",lat:26.27,lon:55.30},
  {n:"Abu Musa",lat:25.88,lon:55.03},
];

function HormuzMap({t}){
  const sea=t.isDark?"#08131f":"#dbeafe";
  const land=t.isDark?"#16212e":"#e2e8f0";
  const edge=t.isDark?"#2c3c4f":"#94a3b8";
  return <Card t={t} style={{padding:"12px 8px 8px"}}>
    <div style={{padding:"0 8px 8px",display:"flex",alignItems:"baseline",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
      <div style={{fontSize:12,fontWeight:700,color:t.text}}>Strait of Hormuz — Geographic Reference</div>
      <div style={{fontSize:10,color:t.sub}}>to scale · 330 × 255 km</div>
    </div>
    <div style={{width:"100%",overflow:"hidden",borderRadius:10}}>
    <svg viewBox={`0 0 ${HZ.W} ${HZ.H}`} style={{width:"100%",height:"auto",display:"block",background:sea}} role="img" aria-label="Map of the Strait of Hormuz showing Iran, Oman's Musandam Peninsula, the shipping lane and the 21-nautical-mile chokepoint.">
      <defs>
        <pattern id="hzBlock" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="#dc2626" strokeWidth="2" strokeOpacity="0.30"/>
        </pattern>
      </defs>

      {/* US blockade zone — entire Iranian coastline, effective Jul 14 */}
      <path d={HZ_IRAN_PATH} fill="url(#hzBlock)"/>

      {/* landmasses */}
      <path d={HZ_IRAN_PATH} fill={land} stroke={edge} strokeWidth="1"/>
      <path d={HZ_OMAN_PATH} fill={land} stroke={edge} strokeWidth="1"/>

      {/* shipping lane (traffic separation scheme, Omani waters) */}
      <path d={hzPath(HZ_LANE)} fill="none" stroke="#22d3ee" strokeWidth="7" strokeOpacity="0.16" strokeLinecap="round" strokeLinejoin="round"/>
      <path d={hzPath(HZ_LANE)} fill="none" stroke="#22d3ee" strokeWidth="1.6" strokeDasharray="7 5" strokeLinecap="round" strokeLinejoin="round"/>

      {/* chokepoint — narrowest transit, 21 nmi / 39 km */}
      <line x1={hzX(56.48)} y1={hzY(26.73)} x2={hzX(56.51)} y2={hzY(26.39)} stroke="#f97316" strokeWidth="1.6" strokeDasharray="3 3"/>
      <circle cx={hzX(56.48)} cy={hzY(26.73)} r="2.4" fill="#f97316"/>
      <circle cx={hzX(56.51)} cy={hzY(26.39)} r="2.4" fill="#f97316"/>
      <text x={hzX(56.56)} y={hzY(26.56)} fill="#f97316" fontSize="9" fontWeight="700" fontFamily={FONT}>21 nmi</text>

      {/* islands */}
      {HZ_ISLES.map(o=><g key={o.n}>
        <circle cx={hzX(o.lon)} cy={hzY(o.lat)} r="3.2" fill={land} stroke={edge} strokeWidth="0.8"/>
        <text x={hzX(o.lon)+5} y={hzY(o.lat)+3} fill={t.sub} fontSize="8" fontFamily={FONT}>{o.n}</text>
      </g>)}

      {/* ports */}
      {HZ_PORTS.map(o=><g key={o.n}>
        <rect x={hzX(o.lon)-2.6} y={hzY(o.lat)-2.6} width="5.2" height="5.2" fill={o.side==="ir"?"#ef4444":"#22c55e"} stroke={sea} strokeWidth="0.8"/>
        <text x={hzX(o.lon)+6} y={hzY(o.lat)+3} fill={t.text} fontSize="8.5" fontWeight="600" fontFamily={FONT}>{o.n}</text>
      </g>)}

      {/* country + water labels */}
      <text x={hzX(55.60)} y={hzY(27.28)} fill={t.sub} fontSize="11" fontWeight="800" letterSpacing="2" fontFamily={FONT}>IRAN</text>
      <text x={hzX(55.60)} y={hzY(25.35)} fill={t.sub} fontSize="10" fontWeight="800" letterSpacing="1.5" fontFamily={FONT}>UAE / OMAN</text>
      <text x={hzX(56.63)} y={hzY(26.22)} fill={t.sub} fontSize="8" fontStyle="italic" fontFamily={FONT}>Musandam Pen.</text>
      <text x={hzX(54.75)} y={hzY(26.10)} fill={t.sub} fontSize="9" fontStyle="italic" fontFamily={FONT}>Persian Gulf</text>
      <text x={hzX(57.05)} y={hzY(25.60)} fill={t.sub} fontSize="9" fontStyle="italic" fontFamily={FONT}>Gulf of Oman</text>
    </svg>
    </div>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",padding:"8px 10px 2px",fontSize:9.5,color:t.sub}}>
      <span><span style={{display:"inline-block",width:8,height:8,background:"#ef4444",marginRight:4}}/>Iranian port</span>
      <span><span style={{display:"inline-block",width:8,height:8,background:"#22c55e",marginRight:4}}/>Oman/UAE port</span>
      <span><span style={{display:"inline-block",width:14,height:2,background:"#22d3ee",marginRight:4,verticalAlign:"middle"}}/>Shipping lane</span>
      <span><span style={{display:"inline-block",width:10,height:8,background:"#dc262640",marginRight:4,verticalAlign:"middle"}}/>US blockade zone</span>
    </div>
    <div style={{fontSize:11,color:t.sub,lineHeight:1.5,padding:"6px 10px 2px"}}>The chokepoint is roughly 21 nautical miles (39 km) across at its narrowest, and the internationally used shipping lanes run through Omani territorial waters south of the median line — which is why Iran can threaten traffic without formally closing its own waters. Transit volume has collapsed to about 9 vessels a day against a pre-war average near 130. Coastlines are simplified; ports, islands and the chokepoint are plotted at true coordinates and the projection preserves scale.</div>
  </Card>;
}

const SD_MAP={lon0:20.5,lon1:39.0,lat0:3.0,lat1:23.5,W:400,H:452};
const SDX=(lon)=>((lon-SD_MAP.lon0)/(SD_MAP.lon1-SD_MAP.lon0))*SD_MAP.W;
const SDY=(lat)=>((SD_MAP.lat1-lat)/(SD_MAP.lat1-SD_MAP.lat0))*SD_MAP.H;
const SD_PATHS={SDN:"M291.1,309.5 L288.1,309.0 L288.5,298.1 L285.9,290.5 L274.7,281.8 L272.1,265.9 L274.7,249.6 L264.7,248.1 L263.2,253.0 L250.2,254.1 L255.4,260.6 L257.3,273.8 L245.4,285.9 L234.7,301.8 L223.5,304.1 L205.3,291.2 L197.2,295.8 L194.9,302.2 L183.8,306.4 L183.1,310.9 L161.5,310.9 L158.6,306.4 L143.0,305.6 L135.2,309.4 L129.2,307.5 L118.1,294.7 L114.4,288.6 L98.8,291.6 L92.9,301.8 L87.3,321.5 L79.9,325.7 L73.2,328.1 L71.5,327.1 L64.0,320.7 L62.6,313.9 L66.1,304.7 L66.0,295.7 L53.6,281.9 L51.1,272.5 L51.4,267.1 L43.4,260.6 L43.2,247.8 L38.7,239.3 L31.1,240.6 L33.2,232.5 L38.8,223.3 L36.4,214.2 L43.5,207.4 L39.0,202.3 L44.7,188.6 L54.6,172.4 L73.2,173.9 L72.2,86.4 L72.4,77.2 L97.3,77.1 L97.3,33.1 L184.2,33.1 L268.1,33.1 L353.9,33.1 L360.8,54.7 L356.1,58.7 L359.2,81.4 L367.2,107.7 L375.4,113.2 L387.2,121.3 L376.3,133.9 L360.4,137.5 L353.6,144.3 L351.4,158.9 L342.1,191.3 L344.4,200.2 L341.0,219.1 L332.2,240.8 L319.1,251.7 L309.9,268.6 L307.7,277.6 L297.5,283.8 L291.1,306.8 L291.1,309.5 Z",SSD:"M291.1,309.5 L291.4,326.7 L288.1,333.4 L276.6,333.9 L269.3,346.5 L282.6,348.1 L293.5,358.8 L297.3,367.6 L307.2,372.8 L320.0,396.7 L305.3,411.3 L292.0,424.4 L278.7,434.6 L263.5,434.5 L246.1,439.7 L232.3,434.8 L223.4,440.8 L204.4,426.1 L199.3,416.7 L187.2,421.4 L177.2,419.9 L171.4,423.6 L161.7,420.9 L148.6,402.7 L145.2,395.8 L129.0,387.0 L123.5,373.8 L114.5,364.3 L100.0,352.8 L99.8,345.6 L87.9,336.7 L73.2,328.1 L79.9,325.7 L87.3,321.5 L92.9,301.8 L98.8,291.6 L114.4,288.6 L118.1,294.7 L129.2,307.5 L135.2,309.4 L143.0,305.6 L158.6,306.4 L161.5,310.9 L183.1,310.9 L183.8,306.4 L194.9,302.2 L197.2,295.8 L205.3,291.2 L223.5,304.1 L234.7,301.8 L245.4,285.9 L257.3,273.8 L255.4,260.6 L250.2,254.1 L263.2,253.0 L264.7,248.1 L274.7,249.6 L272.1,265.9 L274.7,281.8 L285.9,290.5 L288.5,298.1 L288.1,309.0 L291.1,309.5 Z",EGY:"M311.8,-132.3 L305.8,-123.5 L301.1,-106.8 L295.2,-95.3 L290.2,-91.5 L283.0,-98.6 L273.2,-108.4 L257.8,-140.0 L255.6,-138.0 L264.5,-114.8 L277.8,-92.6 L294.2,-58.3 L302.1,-46.3 L309.1,-33.8 L328.5,-9.4 L324.2,-5.6 L324.9,8.8 L350.1,28.6 L353.9,33.1 L268.1,33.1 L184.2,33.1 L97.3,33.1 L97.3,-48.1 L97.3,-126.5 L90.8,-144.3 L96.4,-157.9 L93.0,-167.3 L100.9,-177.9 L129.6,-178.3 L150.4,-172.4 L171.9,-165.9 L181.9,-162.5 L198.6,-169.5 L207.5,-175.8 L226.5,-177.6 L241.9,-174.8 L247.8,-163.9 L252.8,-171.1 L270.1,-165.9 L287.0,-164.6 L297.6,-170.2 L311.8,-132.3 Z",LBY:"M-122.1,14.0 L-137.4,22.2 L-149.6,10.1 L-183.8,0.6 L-193.3,-13.2 L-210.3,-23.4 L-220.5,-19.4 L-228.1,-31.7 L-229.0,-41.1 L-241.7,-57.2 L-233.2,-66.4 L-235.0,-80.3 L-232.3,-92.3 L-233.9,-102.4 L-230.1,-120.4 L-231.2,-130.6 L-238.2,-150.1 L-227.7,-155.2 L-225.8,-164.5 L-228.1,-173.7 L-213.3,-182.2 L-206.6,-189.2 L-196.1,-195.5 L-194.8,-212.5 L-169.4,-204.9 L-160.4,-206.8 L-142.3,-203.1 L-113.6,-193.3 L-103.5,-173.7 L-84.1,-169.4 L-53.6,-160.2 L-30.6,-149.2 L-20.0,-154.9 L-9.7,-165.1 L-14.7,-181.9 L-7.9,-192.7 L7.7,-203.0 L22.6,-206.0 L51.8,-201.5 L59.2,-191.6 L67.2,-191.5 L74.1,-187.8 L95.6,-185.2 L100.9,-177.9 L93.0,-167.3 L96.4,-157.9 L90.8,-144.3 L97.3,-126.5 L97.3,-48.1 L97.3,33.1 L97.3,77.1 L72.4,77.2 L72.2,86.4 L-14.1,44.2 L-100.3,2.0 L-122.1,14.0 Z",TCD:"M-129.8,234.6 L-127.7,224.2 L-141.5,223.7 L-141.5,209.5 L-150.5,201.4 L-141.1,172.3 L-113.6,151.5 L-112.4,122.9 L-104.1,78.1 L-99.4,68.6 L-108.4,61.1 L-108.7,54.1 L-116.8,48.3 L-122.1,14.0 L-100.3,2.0 L-14.1,44.2 L72.2,86.4 L73.2,173.9 L54.6,172.4 L44.7,188.6 L39.0,202.3 L43.5,207.4 L36.4,214.2 L38.8,223.3 L33.2,232.5 L31.1,240.6 L38.7,239.3 L43.2,247.8 L43.4,260.6 L51.4,267.1 L51.1,272.5 L37.4,276.2 L26.5,285.2 L10.8,309.2 L-9.5,319.4 L-30.4,318.1 L-36.5,320.1 L-34.4,327.8 L-45.6,335.6 L-54.8,344.2 L-82.0,352.6 L-87.4,347.6 L-91.0,347.2 L-95.0,352.8 L-112.9,354.5 L-109.5,348.5 L-116.3,333.3 L-119.4,324.2 L-128.8,320.5 L-141.5,307.6 L-136.8,297.2 L-127.0,299.4 L-120.9,297.8 L-108.8,298.0 L-120.6,278.0 L-119.8,263.4 L-121.2,248.7 L-129.8,234.6 Z",CAF:"M-112.9,354.5 L-95.0,352.8 L-91.0,347.2 L-87.4,347.6 L-82.0,352.6 L-54.8,344.2 L-45.6,335.6 L-34.4,327.8 L-36.5,320.1 L-30.4,318.1 L-9.5,319.4 L10.8,309.2 L26.5,285.2 L37.4,276.2 L51.1,272.5 L53.6,281.9 L66.0,295.7 L66.1,304.7 L62.6,313.9 L64.0,320.7 L71.5,327.1 L87.9,336.7 L99.8,345.6 L100.0,352.8 L114.5,364.3 L123.5,373.8 L129.0,387.0 L145.2,395.8 L148.6,402.7 L141.5,405.1 L127.6,404.6 L111.4,402.3 L103.3,404.1 L100.1,409.5 L93.1,410.2 L84.6,405.5 L60.5,416.5 L50.6,414.3 L47.7,416.0 L41.2,429.3 L25.1,425.0 L9.2,422.8 L-4.5,414.7 L-22.3,407.2 L-33.9,414.3 L-42.3,425.5 L-44.3,440.9 L-58.2,439.6 L-72.8,435.9 L-85.7,447.6 L-97.0,468.1 L-99.3,461.8 L-100.3,451.7 L-110.2,444.6 L-118.1,433.2 L-120.0,425.3 L-130.2,413.8 L-128.5,407.2 L-130.6,397.9 L-128.9,380.8 L-123.8,376.8 L-112.9,354.5 Z",ETH:"M376.3,188.3 L389.5,198.3 L402.1,193.1 L407.4,197.7 L422.2,198.0 L441.0,206.8 L446.6,214.5 L456.2,221.5 L465.1,234.5 L472.5,241.6 L464.9,251.4 L457.6,261.7 L459.2,267.8 L459.6,274.5 L471.7,274.9 L476.9,273.3 L481.7,277.2 L476.9,285.0 L484.9,297.2 L492.9,307.8 L501.2,315.7 L571.9,341.8 L590.0,341.7 L528.9,407.9 L500.8,408.8 L481.5,424.4 L467.6,424.8 L461.7,431.7 L447.0,431.7 L438.2,424.3 L418.5,433.5 L412.1,442.7 L397.7,441.0 L392.9,438.4 L387.8,439.0 L381.0,438.8 L353.6,420.1 L338.6,420.1 L331.2,412.8 L331.2,400.4 L320.0,396.7 L307.2,372.8 L297.3,367.6 L293.5,358.8 L282.6,348.1 L269.3,346.5 L276.6,333.9 L288.1,333.4 L291.4,326.7 L291.1,306.8 L297.5,283.8 L307.7,277.6 L309.9,268.6 L319.1,251.7 L332.2,240.8 L341.0,219.1 L344.4,200.2 L369.6,204.8 L376.3,188.3 Z",ERI:"M472.5,241.6 L465.1,234.5 L456.2,221.5 L446.6,214.5 L441.0,206.8 L422.2,198.0 L407.4,197.7 L402.1,193.1 L389.5,198.3 L376.3,188.3 L369.6,204.8 L344.4,200.2 L342.1,191.3 L351.4,158.9 L353.6,144.3 L360.4,137.5 L376.3,133.9 L387.2,121.3 L399.8,146.8 L405.8,167.1 L417.6,177.8 L447.1,198.6 L459.1,211.2 L470.9,223.9 L477.6,231.5 L488.2,238.1 L481.7,243.5 L472.5,241.6 Z"};
const SD_CITIES=[
  {n:"Khartoum",lat:15.50,lon:32.56,side:"saf",note:"Capital — SAF-held"},
  {n:"Port Sudan",lat:19.62,lon:37.22,side:"saf",note:"Wartime seat of government"},
  {n:"El Fasher",lat:13.63,lon:25.35,side:"rsf",note:"Fell to RSF, Oct 2025"},
  {n:"Nyala",lat:12.05,lon:24.88,side:"rsf",note:"South Darfur, RSF-held"},
  {n:"Juba",lat:4.86,lon:31.57,side:"ssd",note:"South Sudan capital"},
];

const CD_MAP={lon0:11.5,lon1:32.0,lat0:-14.0,lat1:5.5,W:400,H:379};
const CDX=(lon)=>((lon-CD_MAP.lon0)/(CD_MAP.lon1-CD_MAP.lon0))*CD_MAP.W;
const CDY=(lat)=>((CD_MAP.lat1-lat)/(CD_MAP.lat1-CD_MAP.lat0))*CD_MAP.H;
const CD_PATHS={COD:"M377.2,38.7 L376.1,61.4 L383.9,64.1 L377.6,71.0 L370.1,76.1 L362.7,86.3 L358.6,95.3 L357.5,110.9 L352.9,118.3 L352.8,133.0 L347.2,138.4 L346.4,150.0 L343.8,151.4 L341.9,162.1 L346.9,170.9 L348.1,194.4 L351.6,212.2 L349.7,222.3 L353.6,233.6 L364.9,244.5 L375.4,269.0 L367.7,267.0 L341.5,270.3 L336.3,272.6 L330.7,285.0 L335.1,293.6 L331.6,316.6 L329.2,336.1 L334.5,339.6 L348.1,347.1 L353.5,343.6 L355.1,364.6 L340.2,364.4 L332.2,353.7 L325.0,345.4 L310.0,342.7 L305.6,332.5 L293.7,338.7 L278.1,335.9 L271.6,327.1 L259.2,325.3 L250.0,325.8 L248.9,319.8 L242.2,319.3 L233.3,318.1 L221.2,321.0 L212.7,320.6 L207.9,322.3 L209.0,299.2 L202.4,292.0 L201.0,280.0 L203.9,268.3 L199.9,260.8 L199.6,248.6 L175.9,248.8 L177.6,241.8 L167.6,241.8 L166.6,245.2 L154.5,246.0 L149.6,257.3 L146.7,262.2 L135.9,259.4 L129.4,262.1 L116.5,263.7 L109.1,253.6 L104.6,247.3 L99.0,235.6 L94.2,221.1 L36.6,220.9 L29.8,223.2 L24.1,222.8 L16.0,225.5 L13.3,219.4 L18.3,217.4 L18.9,208.9 L22.1,203.9 L29.2,199.8 L34.3,201.8 L41.0,194.4 L51.6,194.6 L52.9,200.1 L60.1,203.5 L71.6,191.3 L83.0,181.8 L87.9,175.6 L87.3,159.6 L95.7,140.7 L104.7,130.7 L117.5,121.4 L119.8,115.2 L120.3,108.0 L123.4,101.3 L122.4,90.3 L124.9,73.0 L128.7,60.9 L134.5,50.5 L135.7,38.8 L137.4,25.2 L145.0,15.4 L155.5,9.1 L171.5,15.7 L184.0,22.9 L198.2,24.8 L212.8,28.6 L218.6,16.8 L221.3,15.4 L230.2,17.3 L251.9,7.6 L259.6,11.7 L265.9,11.1 L268.9,6.4 L276.1,4.7 L290.8,6.8 L303.3,7.2 L309.7,5.2 L321.6,21.2 L330.3,23.6 L335.5,20.3 L344.6,21.6 L355.4,17.5 L360.1,25.8 L377.2,38.7 Z",RWA:"M369.2,129.0 L376.9,139.9 L375.8,151.4 L370.1,153.8 L359.8,152.5 L353.8,163.6 L341.9,162.1 L343.8,151.4 L346.4,150.0 L347.2,138.4 L352.8,133.0 L357.5,134.9 L369.2,129.0 Z",UGA:"M397.4,126.9 L376.0,126.6 L369.2,129.0 L357.5,134.9 L352.8,133.0 L352.9,118.3 L357.5,110.9 L358.6,95.3 L362.7,86.3 L370.1,76.1 L377.6,71.0 L383.9,64.1 L376.1,61.4 L377.2,38.7 L385.3,33.4 L397.7,37.7 L413.4,33.2 L427.1,33.2 L439.1,24.3 L448.4,37.8 L450.7,47.5 L459.2,69.9 L452.1,84.0 L442.5,96.9 L436.9,104.8 L437.1,125.4 L397.4,126.9 Z",BDI:"M348.1,194.4 L346.9,170.9 L341.9,162.1 L353.8,163.6 L359.8,152.5 L370.1,153.8 L371.3,161.5 L375.5,165.9 L375.7,172.2 L370.8,176.3 L363.2,186.4 L356.2,193.4 L348.1,194.4 Z",COG:"M29.2,199.8 L21.9,193.2 L16.0,196.4 L8.1,204.8 L-7.9,184.2 L6.9,173.5 L-0.4,160.6 L6.3,155.8 L19.4,153.4 L21.0,144.8 L31.4,154.1 L48.6,154.9 L54.6,145.7 L57.1,132.8 L55.0,117.6 L45.7,106.1 L54.2,83.6 L49.3,79.8 L34.8,81.4 L29.3,71.3 L30.7,62.8 L55.4,63.6 L71.1,68.7 L86.7,73.3 L88.1,62.8 L98.3,44.7 L109.9,34.4 L123.1,37.7 L135.7,38.8 L134.5,50.5 L128.7,60.9 L124.9,73.0 L122.4,90.3 L123.4,101.3 L120.3,108.0 L119.8,115.2 L117.5,121.4 L104.7,130.7 L95.7,140.7 L87.3,159.6 L87.9,175.6 L83.0,181.8 L71.6,191.3 L60.1,203.5 L52.9,200.1 L51.6,194.6 L41.0,194.4 L34.3,201.8 L29.2,199.8 Z",ZMB:"M414.8,286.3 L424.0,295.0 L429.0,311.5 L425.7,316.7 L421.7,332.5 L425.5,348.6 L419.4,355.4 L413.4,373.4 L423.7,378.5 L364.5,394.5 L366.3,408.3 L351.5,411.0 L340.4,418.7 L338.1,425.4 L331.1,427.0 L314.1,443.0 L303.3,455.5 L296.7,456.0 L290.4,453.8 L268.6,451.6 L265.1,450.2 L264.9,448.6 L257.2,444.2 L244.6,443.1 L228.6,447.5 L215.9,435.3 L202.7,419.4 L203.6,357.6 L244.2,357.8 L242.6,351.1 L245.5,343.8 L242.0,334.7 L244.3,325.3 L242.2,319.3 L248.9,319.8 L250.0,325.8 L259.2,325.3 L271.6,327.1 L278.1,335.9 L293.7,338.7 L305.6,332.5 L310.0,342.7 L325.0,345.4 L332.2,353.7 L340.2,364.4 L355.1,364.6 L353.5,343.6 L348.1,347.1 L334.5,339.6 L329.2,336.1 L331.6,316.6 L335.1,293.6 L330.7,285.0 L336.3,272.6 L341.5,270.3 L367.7,267.0 L375.4,269.0 L383.6,273.9 L391.3,277.2 L403.7,280.5 L414.8,286.3 Z",AGO:"M94.2,221.1 L99.0,235.6 L104.6,247.3 L109.1,253.6 L116.5,263.7 L129.4,262.1 L135.9,259.4 L146.7,262.2 L149.6,257.3 L154.5,246.0 L166.6,245.2 L167.6,241.8 L177.6,241.8 L175.9,248.8 L199.6,248.6 L199.9,260.8 L203.9,268.3 L201.0,280.0 L202.4,292.0 L209.0,299.2 L207.9,322.3 L212.7,320.6 L221.2,321.0 L233.3,318.1 L242.2,319.3 L244.3,325.3 L242.0,334.7 L245.5,343.8 L242.6,351.1 L244.2,357.8 L203.6,357.6 L202.7,419.4 L215.9,435.3 L228.6,447.5 L192.7,455.4 L145.5,452.6 L132.0,443.3 L52.9,444.2 L49.9,445.5 L38.3,436.7 L25.6,436.2 L14.0,439.5 L4.6,443.2 L2.7,431.0 L5.4,413.9 L12.2,396.1 L13.2,387.7 L19.5,370.2 L24.2,362.2 L35.4,349.5 L41.6,340.9 L43.7,326.5 L42.7,315.5 L36.8,308.5 L31.6,296.7 L26.8,285.1 L27.9,281.0 L33.9,273.3 L28.0,254.5 L24.0,241.5 L14.2,229.2 L16.0,225.5 L24.1,222.8 L29.8,223.2 L36.6,220.9 L94.2,221.1 Z M18.3,217.4 L13.3,219.4 L8.1,204.8 L16.0,196.4 L21.9,193.2 L29.2,199.8 L22.1,203.9 L18.9,208.9 L18.3,217.4 Z",TZA:"M437.1,125.4 L440.4,127.5 L511.2,167.1 L512.5,178.4 L540.5,197.8 L531.5,221.7 L532.7,232.8 L545.2,239.8 L545.8,244.9 L540.4,256.6 L541.5,262.5 L540.2,271.8 L547.0,284.0 L555.1,303.2 L562.3,307.4 L546.8,318.7 L525.4,326.2 L513.7,325.9 L506.8,331.7 L493.2,332.2 L488.1,334.7 L464.6,329.2 L450.0,330.8 L444.5,304.4 L437.9,295.3 L433.9,289.9 L414.8,286.3 L403.7,280.5 L391.3,277.2 L383.6,273.9 L375.4,269.0 L364.9,244.5 L353.6,233.6 L349.7,222.3 L351.6,212.2 L348.1,194.4 L356.2,193.4 L363.2,186.4 L370.8,176.3 L375.7,172.2 L375.5,165.9 L371.3,161.5 L370.1,153.8 L375.8,151.4 L376.9,139.9 L369.2,129.0 L376.0,126.6 L397.4,126.9 L437.1,125.4 Z"};
const CD_CITIES=[
  {n:"Kinshasa",lat:-4.44,lon:15.27,side:"cap",note:"DRC national capital"},
  {n:"Goma",lat:-1.68,lon:29.23,side:"m23",note:"North Kivu capital — M23-held"},
  {n:"Bukavu",lat:-2.51,lon:28.86,side:"m23",note:"South Kivu capital — fell Feb 2025"},
  {n:"Kigali",lat:-1.94,lon:30.06,side:"rwa",note:"Rwanda capital"},
  {n:"Kampala",lat:0.35,lon:32.58,side:"uga",note:"Uganda capital"},
];

const SH_MAP={lon0:-13.0,lon1:16.0,lat0:4.0,lat1:25.5,W:400,H:305};
const SHX=(lon)=>((lon-SH_MAP.lon0)/(SH_MAP.lon1-SH_MAP.lon0))*SH_MAP.W;
const SHY=(lat)=>((SH_MAP.lat1-lat)/(SH_MAP.lat1-SH_MAP.lat0))*SH_MAP.H;
const SH_PATHS={MLI:"M11.4,154.4 L16.1,151.8 L18.4,143.4 L22.8,143.1 L32.4,147.1 L40.2,144.3 L45.5,145.2 L47.6,142.1 L102.9,141.8 L106.0,131.9 L103.6,130.2 L96.9,68.9 L90.3,7.7 L111.4,7.5 L157.9,38.4 L204.5,69.4 L207.7,76.0 L216.3,80.1 L222.7,82.4 L222.9,91.4 L238.2,90.0 L238.2,122.7 L230.7,132.2 L229.5,140.9 L217.2,143.1 L198.4,144.4 L193.3,149.4 L184.5,150.0 L175.6,150.0 L172.2,147.3 L164.6,149.3 L151.7,155.2 L149.1,159.6 L138.4,166.0 L136.5,169.6 L130.7,172.5 L124.0,170.6 L120.3,174.1 L118.2,183.8 L107.3,195.6 L107.6,200.4 L103.9,206.4 L104.8,214.6 L99.1,216.7 L95.9,218.5 L93.7,212.4 L89.7,214.0 L87.4,213.8 L84.8,217.9 L74.2,217.8 L70.4,215.7 L68.6,217.0 L64.3,212.9 L65.1,208.6 L63.3,207.0 L60.4,208.4 L60.9,203.8 L63.8,200.1 L58.1,194.2 L56.5,190.3 L53.4,187.1 L50.7,186.8 L47.3,188.8 L42.9,190.7 L39.1,193.7 L33.2,192.6 L29.4,189.0 L27.1,188.5 L23.5,190.4 L21.3,190.4 L20.5,185.2 L21.1,180.8 L20.0,175.3 L14.8,171.3 L12.1,163.2 L11.4,154.4 Z",BFA:"M140.3,225.0 L130.9,221.3 L124.4,221.8 L119.6,225.4 L113.4,222.4 L111.0,217.7 L104.8,214.6 L103.9,206.4 L107.6,200.4 L107.3,195.6 L118.2,183.8 L120.3,174.1 L124.0,170.6 L130.7,172.5 L136.5,169.6 L138.4,166.0 L149.1,159.6 L151.7,155.2 L164.6,149.3 L172.2,147.3 L175.6,150.0 L184.5,150.0 L183.4,156.8 L185.2,163.3 L193.0,172.6 L193.4,179.4 L209.3,182.6 L209.0,192.4 L206.0,196.6 L199.3,197.9 L196.5,204.1 L191.7,205.7 L179.6,205.4 L173.3,204.3 L168.8,206.6 L162.7,205.6 L138.8,206.2 L138.4,214.3 L140.3,225.0 Z",NER:"M209.0,192.4 L209.3,182.6 L193.4,179.4 L193.0,172.6 L185.2,163.3 L183.4,156.8 L184.5,150.0 L193.3,149.4 L198.4,144.4 L217.2,143.1 L229.5,140.9 L230.7,132.2 L238.2,122.7 L238.2,90.0 L257.6,83.7 L297.6,55.8 L344.8,28.8 L366.6,34.9 L374.4,42.7 L384.2,37.4 L387.5,59.5 L392.7,63.1 L392.9,67.7 L398.7,72.5 L395.7,78.6 L390.4,107.4 L389.6,125.9 L372.0,139.2 L366.1,157.9 L371.8,163.2 L371.8,172.3 L380.6,172.6 L379.3,179.3 L375.4,180.1 L374.9,184.7 L372.3,185.0 L363.0,169.4 L359.8,168.9 L349.0,176.8 L338.3,172.7 L330.9,171.8 L326.9,173.8 L318.8,173.4 L310.7,179.4 L303.7,179.8 L287.0,172.5 L280.4,175.9 L273.4,175.7 L268.2,170.3 L254.4,165.0 L239.6,166.7 L236.0,169.8 L234.0,177.9 L230.1,183.7 L229.1,196.3 L218.6,188.2 L213.7,188.2 L209.0,192.4 Z",MRT:"M11.4,154.4 L2.3,144.6 L-6.0,134.2 L-15.2,130.5 L-21.8,126.3 L-29.5,126.4 L-36.2,129.5 L-43.0,128.3 L-47.8,132.9 L-49.0,125.2 L-45.1,118.2 L-43.4,104.9 L-44.9,90.8 L-46.6,83.8 L-45.2,76.7 L-48.8,70.0 L-56.0,63.8 L-53.0,59.1 L1.0,59.2 L-1.6,38.7 L1.7,31.4 L14.7,30.2 L14.2,-6.1 L59.5,-5.4 L59.5,-26.9 L111.4,7.5 L90.3,7.7 L96.9,68.9 L103.6,130.2 L106.0,131.9 L102.9,141.8 L47.6,142.1 L45.5,145.2 L40.2,144.3 L32.4,147.1 L22.8,143.1 L18.4,143.4 L16.1,151.8 L11.4,154.4 Z",DZA:"M344.8,28.8 L297.6,55.8 L257.6,83.7 L238.2,90.0 L222.9,91.4 L222.7,82.4 L216.3,80.1 L207.7,76.0 L204.5,69.4 L157.9,38.4 L111.4,7.5 L59.5,-26.9 L59.8,-29.6 L59.7,-47.4 L81.9,-57.9 L95.7,-60.0 L107.0,-63.8 L112.3,-70.9 L128.4,-76.6 L129.0,-87.1 L137.0,-88.3 L143.2,-93.5 L161.3,-95.9 L163.8,-101.5 L160.2,-104.5 L155.4,-119.4 L154.6,-128.1 L149.4,-137.2 L162.6,-144.9 L177.6,-147.4 L186.3,-153.2 L199.5,-157.5 L222.9,-160.1 L245.7,-161.2 L252.7,-159.1 L265.7,-164.7 L280.4,-164.8 L286.0,-161.5 L295.5,-162.4 L292.7,-155.1 L294.8,-141.6 L291.6,-129.9 L283.1,-122.0 L284.3,-111.3 L295.6,-102.8 L295.7,-99.4 L304.2,-93.7 L310.1,-68.2 L314.6,-55.7 L315.3,-49.1 L312.9,-37.5 L313.9,-31.0 L312.1,-23.3 L313.3,-14.4 L307.9,-8.4 L316.0,1.9 L316.5,8.0 L321.4,15.9 L327.9,13.3 L338.8,19.9 L344.8,28.8 Z",SEN:"M-51.2,168.9 L-56.9,157.8 L-63.8,152.8 L-57.7,150.1 L-51.0,140.1 L-47.8,132.9 L-43.0,128.3 L-36.2,129.5 L-29.5,126.4 L-21.8,126.3 L-15.2,130.5 L-6.0,134.2 L2.3,144.6 L11.4,154.4 L12.1,163.2 L14.8,171.3 L20.0,175.3 L21.1,180.8 L20.5,185.2 L18.5,186.0 L11.0,184.9 L10.0,186.5 L6.9,186.8 L-3.0,183.3 L-9.7,183.2 L-35.2,182.6 L-38.8,184.2 L-43.4,183.7 L-50.7,186.1 L-53.0,175.2 L-40.4,175.5 L-37.1,173.5 L-34.6,173.4 L-29.5,170.1 L-23.6,173.1 L-17.6,173.3 L-11.7,170.2 L-14.4,166.1 L-19.0,168.4 L-23.3,168.4 L-28.7,164.9 L-33.1,165.1 L-36.2,168.5 L-51.2,168.9 Z",GIN:"M62.9,252.7 L59.0,252.3 L56.2,258.1 L52.3,258.0 L49.6,255.0 L50.5,249.3 L44.8,240.6 L41.2,242.2 L38.2,242.5 L34.4,243.3 L34.6,238.1 L32.3,234.4 L32.8,230.3 L29.8,224.3 L26.0,219.2 L14.9,219.2 L11.7,221.9 L7.9,222.2 L5.6,225.3 L4.0,229.2 L-3.4,235.4 L-9.5,227.1 L-14.8,221.5 L-18.3,219.7 L-21.8,216.8 L-23.4,210.6 L-25.4,207.4 L-29.4,205.1 L-23.3,198.2 L-19.1,198.5 L-15.5,196.1 L-12.4,196.1 L-10.3,194.2 L-11.4,189.5 L-9.9,188.0 L-9.7,183.2 L-3.0,183.3 L6.9,186.8 L10.0,186.5 L11.0,184.9 L18.5,186.0 L20.5,185.2 L21.3,190.4 L23.5,190.4 L27.1,188.5 L29.4,189.0 L33.2,192.6 L39.1,193.7 L42.9,190.7 L47.3,188.8 L50.7,186.8 L53.4,187.1 L56.5,190.3 L58.1,194.2 L63.8,200.1 L60.9,203.8 L60.4,208.4 L63.3,207.0 L65.1,208.6 L64.3,212.9 L68.6,217.0 L65.8,218.1 L64.7,222.9 L67.9,228.7 L71.3,240.1 L66.2,241.8 L64.8,243.8 L65.9,246.5 L65.1,252.7 L62.9,252.7 Z",CIV:"M139.9,290.9 L133.6,291.0 L124.0,288.3 L115.2,288.4 L98.8,290.9 L89.3,295.0 L75.6,300.2 L72.9,299.8 L74.0,288.1 L75.3,286.4 L74.9,280.8 L69.1,274.8 L64.7,273.9 L60.6,270.0 L63.6,263.7 L62.3,256.8 L62.9,252.7 L65.1,252.7 L65.9,246.5 L64.8,243.8 L66.2,241.8 L71.3,240.1 L67.9,228.7 L64.7,222.9 L65.8,218.1 L68.6,217.0 L70.4,215.7 L74.2,217.8 L84.8,217.9 L87.4,213.8 L89.7,214.0 L93.7,212.4 L95.9,218.5 L99.1,216.7 L104.8,214.6 L111.0,217.7 L113.4,222.4 L119.6,225.4 L124.4,221.8 L130.9,221.3 L140.3,225.0 L144.0,245.1 L138.2,257.1 L134.6,273.1 L140.5,285.3 L139.9,290.9 Z",BEN:"M216.4,273.0 L205.0,274.6 L201.6,264.8 L202.3,232.2 L199.5,229.3 L199.0,222.4 L194.2,217.4 L190.0,213.2 L191.7,205.7 L196.5,204.1 L199.3,197.9 L206.0,196.6 L209.0,192.4 L213.7,188.2 L218.6,188.2 L229.1,196.3 L228.6,201.0 L231.7,209.5 L229.0,215.2 L230.4,219.0 L223.7,227.8 L219.5,232.1 L216.9,241.1 L217.2,250.1 L216.4,273.0 Z",NGA:"M296.6,294.0 L282.2,299.2 L277.0,298.4 L271.7,301.6 L260.7,301.3 L253.3,292.4 L248.7,282.1 L239.0,272.8 L228.6,273.0 L216.4,273.0 L217.2,250.1 L216.9,241.1 L219.5,232.1 L223.7,227.8 L230.4,219.0 L229.0,215.2 L231.7,209.5 L228.6,201.0 L229.1,196.3 L230.1,183.7 L234.0,177.9 L236.0,169.8 L239.6,166.7 L254.4,165.0 L268.2,170.3 L273.4,175.7 L280.4,175.9 L287.0,172.5 L303.7,179.8 L310.7,179.4 L318.8,173.4 L326.9,173.8 L330.9,171.8 L338.3,172.7 L349.0,176.8 L359.8,168.9 L363.0,169.4 L372.3,185.0 L374.9,184.7 L380.4,190.3 L378.9,192.9 L378.1,197.6 L366.5,208.6 L362.9,217.6 L360.9,225.0 L358.0,228.1 L355.2,238.1 L347.8,243.9 L345.7,251.1 L342.6,256.8 L341.3,262.7 L331.8,267.5 L324.1,261.7 L318.9,261.9 L310.7,270.2 L306.7,270.3 L300.1,284.0 L296.6,294.0 Z",GHA:"M193.9,277.6 L172.3,285.9 L164.6,290.8 L152.2,294.9 L139.9,290.9 L140.5,285.3 L134.6,273.1 L138.2,257.1 L144.0,245.1 L140.3,225.0 L138.4,214.3 L138.8,206.2 L162.7,205.6 L168.8,206.6 L173.3,204.3 L179.6,205.4 L178.6,209.9 L184.4,217.2 L184.4,227.5 L185.7,238.6 L189.1,243.8 L186.1,256.6 L187.2,263.7 L190.9,272.7 L193.9,277.6 Z"};
const SH_CITIES=[
  {n:"Bamako",lat:12.64,lon:-8.00,side:"cap",note:"Mali capital"},
  {n:"Ouagadougou",lat:12.37,lon:-1.52,side:"cap",note:"Burkina Faso capital"},
  {n:"Niamey",lat:13.51,lon:2.11,side:"cap",note:"Niger capital"},
  {n:"Gao",lat:16.27,lon:-0.04,side:"jnim",note:"Tri-border insurgent hotspot"},
  {n:"Timbuktu",lat:16.77,lon:-3.01,side:"jnim",note:"Long under JNIM blockade pressure"},
];

function SudanMap({t}){
  const sea=t.isDark?"#08131f":"#dbeafe";
  const land=t.isDark?"#16212e":"#e2e8f0";
  const edge=t.isDark?"#2c3c4f":"#94a3b8";
  const SIDE_COLOR={saf:"#3b82f6",rsf:"#dc2626",ssd:"#22c55e"};
  return <Card t={t} style={{padding:"12px 8px 8px"}}>
    <div style={{padding:"0 8px 8px",display:"flex",alignItems:"baseline",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
      <div style={{fontSize:12,fontWeight:700,color:t.text}}>Sudan & South Sudan — Geographic Reference</div>
      <div style={{fontSize:10,color:t.sub}}>to scale · real coordinates</div>
    </div>
    <div style={{width:"100%",overflow:"hidden",borderRadius:10}}>
    <svg viewBox={`0 0 ${SD_MAP.W} ${SD_MAP.H}`} style={{width:"100%",height:"auto",display:"block",background:sea}} role="img" aria-label="Map of Sudan and South Sudan showing Khartoum, Port Sudan, El Fasher, Nyala and Juba relative to neighboring Egypt, Libya, Chad, Central African Republic, Ethiopia and Eritrea.">
      {["EGY","LBY","TCD","CAF","ETH","ERI"].map(code=><path key={code} d={SD_PATHS[code]} fill={land} stroke={edge} strokeWidth="1"/>)}
      <path d={SD_PATHS.SDN} fill={t.isDark?"#1e2f22":"#dcfce7"} stroke="#3b82f6" strokeWidth="1.4"/>
      <path d={SD_PATHS.SSD} fill={t.isDark?"#241a1a":"#fef3c7"} stroke="#22c55e" strokeWidth="1.4"/>
      {SD_CITIES.map(o=><g key={o.n}>
        <rect x={SDX(o.lon)-2.8} y={SDY(o.lat)-2.8} width="5.6" height="5.6" fill={SIDE_COLOR[o.side]} stroke={sea} strokeWidth="0.8"/>
        <text x={SDX(o.lon)+6} y={SDY(o.lat)+3} fill={t.text} fontSize="9" fontWeight="600" fontFamily={FONT}>{o.n}</text>
      </g>)}
      <text x={SDX(28)} y={SDY(17.5)} fill={t.sub} fontSize="11" fontWeight="800" letterSpacing=".08em" fontFamily={FONT}>SUDAN</text>
      <text x={SDX(30.5)} y={SDY(6.5)} fill={t.sub} fontSize="11" fontWeight="800" letterSpacing=".08em" fontFamily={FONT}>SOUTH SUDAN</text>
    </svg>
    </div>
    <div style={{padding:"8px 8px 0",display:"flex",gap:10,flexWrap:"wrap",fontSize:9,color:t.sub}}>
      <span>🟦 SAF-held</span><span>🟥 RSF-held</span><span>🟩 South Sudan</span>
    </div>
    <div style={{padding:"6px 8px 0",fontSize:9.5,color:t.sub,opacity:.7}}>Borders plotted at true coordinates and the projection preserves scale.</div>
  </Card>;
}

function DRCMap({t}){
  const sea=t.isDark?"#08131f":"#dbeafe";
  const land=t.isDark?"#16212e":"#e2e8f0";
  const edge=t.isDark?"#2c3c4f":"#94a3b8";
  const SIDE_COLOR={cap:"#94a3b8",m23:"#dc2626",rwa:"#f97316",uga:"#eab308"};
  return <Card t={t} style={{padding:"12px 8px 8px"}}>
    <div style={{padding:"0 8px 8px",display:"flex",alignItems:"baseline",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
      <div style={{fontSize:12,fontWeight:700,color:t.text}}>Eastern DR Congo — Geographic Reference</div>
      <div style={{fontSize:10,color:t.sub}}>to scale · real coordinates</div>
    </div>
    <div style={{width:"100%",overflow:"hidden",borderRadius:10}}>
    <svg viewBox={`0 0 ${CD_MAP.W} ${CD_MAP.H}`} style={{width:"100%",height:"auto",display:"block",background:sea}} role="img" aria-label="Map of DR Congo showing Goma and Bukavu in the M23-contested east, relative to Kinshasa and neighboring Rwanda, Uganda, Burundi, Republic of Congo, Zambia, Angola and Tanzania.">
      {["COG","ZMB","AGO","TZA"].map(code=><path key={code} d={CD_PATHS[code]} fill={land} stroke={edge} strokeWidth="1"/>)}
      <path d={CD_PATHS.COD} fill={t.isDark?"#1a1f2e":"#e0e7ff"} stroke="#94a3b8" strokeWidth="1.4"/>
      <path d={CD_PATHS.RWA} fill={t.isDark?"#2e1f14":"#ffedd5"} stroke="#f97316" strokeWidth="1.2"/>
      <path d={CD_PATHS.UGA} fill={t.isDark?"#2e2a14":"#fef9c3"} stroke="#eab308" strokeWidth="1.2"/>
      <path d={CD_PATHS.BDI} fill={land} stroke={edge} strokeWidth="1"/>
      {CD_CITIES.map(o=><g key={o.n}>
        <rect x={CDX(o.lon)-2.8} y={CDY(o.lat)-2.8} width="5.6" height="5.6" fill={SIDE_COLOR[o.side]} stroke={sea} strokeWidth="0.8"/>
        <text x={CDX(o.lon)+6} y={CDY(o.lat)+3} fill={t.text} fontSize="9" fontWeight="600" fontFamily={FONT}>{o.n}</text>
      </g>)}
      <text x={CDX(18)} y={CDY(-8)} fill={t.sub} fontSize="11" fontWeight="800" letterSpacing=".08em" fontFamily={FONT}>DR CONGO</text>
      <text x={CDX(29.5)} y={CDY(-2.5)} fill={t.sub} fontSize="8.5" fontWeight="700" fontFamily={FONT}>RWANDA</text>
    </svg>
    </div>
    <div style={{padding:"8px 8px 0",display:"flex",gap:10,flexWrap:"wrap",fontSize:9,color:t.sub}}>
      <span>⬜ Kinshasa</span><span>🟥 M23-held</span><span>🟧 Rwanda</span><span>🟨 Uganda</span>
    </div>
    <div style={{padding:"6px 8px 0",fontSize:9.5,color:t.sub,opacity:.7}}>Borders plotted at true coordinates and the projection preserves scale.</div>
  </Card>;
}

function SahelMap({t}){
  const sea=t.isDark?"#08131f":"#dbeafe";
  const land=t.isDark?"#16212e":"#e2e8f0";
  const edge=t.isDark?"#2c3c4f":"#94a3b8";
  const SIDE_COLOR={cap:"#94a3b8",jnim:"#dc2626"};
  return <Card t={t} style={{padding:"12px 8px 8px"}}>
    <div style={{padding:"0 8px 8px",display:"flex",alignItems:"baseline",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
      <div style={{fontSize:12,fontWeight:700,color:t.text}}>Sahel Tri-Border — Geographic Reference</div>
      <div style={{fontSize:10,color:t.sub}}>to scale · real coordinates</div>
    </div>
    <div style={{width:"100%",overflow:"hidden",borderRadius:10}}>
    <svg viewBox={`0 0 ${SH_MAP.W} ${SH_MAP.H}`} style={{width:"100%",height:"auto",display:"block",background:sea}} role="img" aria-label="Map of Mali, Burkina Faso and Niger showing Bamako, Ouagadougou, Niamey, Gao and Timbuktu, relative to neighboring Mauritania, Algeria, Senegal, Guinea, Cote d'Ivoire, Benin, Nigeria and Ghana.">
      {["MRT","DZA","SEN","GIN","CIV","BEN","NGA","GHA"].map(code=><path key={code} d={SH_PATHS[code]} fill={land} stroke={edge} strokeWidth="1"/>)}
      {["MLI","BFA","NER"].map(code=><path key={code} d={SH_PATHS[code]} fill={t.isDark?"#241a1a":"#fee2e2"} stroke="#dc2626" strokeWidth="1.4"/>)}
      {SH_CITIES.map(o=><g key={o.n}>
        <rect x={SHX(o.lon)-2.8} y={SHY(o.lat)-2.8} width="5.6" height="5.6" fill={SIDE_COLOR[o.side]} stroke={sea} strokeWidth="0.8"/>
        <text x={SHX(o.lon)+6} y={SHY(o.lat)+3} fill={t.text} fontSize="9" fontWeight="600" fontFamily={FONT}>{o.n}</text>
      </g>)}
      <text x={SHX(-6)} y={SHY(16)} fill={t.sub} fontSize="10" fontWeight="800" letterSpacing=".06em" fontFamily={FONT}>MALI</text>
      <text x={SHX(-1)} y={SHY(11)} fill={t.sub} fontSize="10" fontWeight="800" letterSpacing=".06em" fontFamily={FONT}>BURKINA FASO</text>
      <text x={SHX(3.5)} y={SHY(16.5)} fill={t.sub} fontSize="10" fontWeight="800" letterSpacing=".06em" fontFamily={FONT}>NIGER</text>
    </svg>
    </div>
    <div style={{padding:"8px 8px 0",display:"flex",gap:10,flexWrap:"wrap",fontSize:9,color:t.sub}}>
      <span>⬜ Capital</span><span>🟥 JNIM-affected zone</span>
    </div>
    <div style={{padding:"6px 8px 0",fontSize:9.5,color:t.sub,opacity:.7}}>Borders plotted at true coordinates and the projection preserves scale.</div>
  </Card>;
}

const SC_MAP={lon0:105.0,lon1:122.0,lat0:3.0,lat1:23.0,W:400,H:480};
const SCX=(lon)=>((lon-SC_MAP.lon0)/(SC_MAP.lon1-SC_MAP.lon0))*SC_MAP.W;
const SCY=(lat)=>((SC_MAP.lat1-lat)/(SC_MAP.lat1-SC_MAP.lat0))*SC_MAP.H;
const SC_PATHS={CHN:"M125.6,103.7 L105.3,115.3 L86.0,107.8 L85.3,87.2 L96.9,76.3 L122.6,69.6 L136.2,70.1 L141.4,79.3 L131.1,89.9 L125.6,103.7 Z M533.1,-642.2 L574.1,-634.6 L601.9,-617.5 L611.5,-595.0 L647.2,-594.9 L667.6,-604.4 L706.5,-611.5 L694.1,-589.9 L685.0,-581.1 L676.9,-554.8 L661.1,-531.5 L632.6,-535.7 L612.4,-527.2 L618.6,-506.7 L615.2,-478.3 L603.1,-477.7 L603.3,-465.5 L588.1,-479.6 L578.7,-466.2 L542.4,-455.9 L546.1,-443.2 L525.7,-444.1 L514.6,-451.6 L498.4,-434.6 L472.5,-421.7 L453.3,-406.3 L420.4,-399.3 L403.1,-388.1 L377.8,-381.5 L390.3,-392.7 L385.3,-402.0 L404.0,-418.1 L391.5,-430.7 L371.0,-422.2 L344.5,-405.6 L330.0,-390.1 L306.9,-388.9 L294.9,-377.7 L307.3,-361.5 L326.5,-357.5 L327.3,-346.8 L345.9,-339.8 L372.3,-356.9 L393.2,-347.5 L408.4,-346.9 L412.2,-334.3 L378.9,-327.6 L367.9,-314.7 L345.0,-302.6 L333.0,-285.8 L358.3,-272.6 L367.5,-249.0 L381.9,-227.0 L397.8,-208.6 L397.5,-190.8 L382.7,-184.2 L388.3,-171.4 L402.2,-164.0 L398.6,-144.4 L392.6,-125.4 L379.4,-123.3 L362.2,-97.3 L343.2,-65.8 L321.3,-37.1 L289.0,-15.0 L256.3,5.2 L229.7,8.0 L215.4,18.6 L207.2,10.8 L193.9,22.8 L161.0,34.8 L136.1,38.5 L128.1,63.8 L115.1,65.2 L108.9,47.8 L114.5,38.5 L82.9,30.8 L71.8,34.7 L48.1,28.5 L36.9,18.8 L40.6,4.9 L19.1,0.6 L7.7,-8.4 L-12.3,4.3 L-35.2,7.1 L-54.0,7.0 L-66.6,12.8 L-78.8,16.4 L-75.2,43.8 L-87.8,43.2 L-89.9,37.5 L-90.6,27.6 L-107.8,34.6 L-118.0,30.2 L-135.5,21.2 L-128.7,1.2 L-143.6,-3.4 L-149.2,-25.5 L-174.0,-21.5 L-171.2,-50.0 L-148.9,-70.0 L-148.0,-89.8 L-148.6,-108.2 L-158.9,-113.9 L-166.8,-128.1 L-180.5,-126.3 L-205.9,-129.9 L-198.0,-139.9 L-209.0,-154.9 L-225.8,-144.8 L-245.5,-150.7 L-272.6,-135.4 L-294.0,-117.5 L-313.0,-114.5 L-323.3,-121.0 L-335.8,-121.6 L-352.6,-127.1 L-365.3,-121.0 L-380.8,-103.2 L-382.8,-122.1 L-397.2,-117.0 L-424.6,-119.4 L-451.2,-124.9 L-470.3,-135.4 L-488.6,-140.2 L-496.5,-151.7 L-509.7,-155.1 L-533.5,-170.8 L-552.3,-178.1 L-562.1,-172.4 L-594.8,-189.2 L-617.9,-204.4 L-624.5,-230.8 L-607.6,-227.6 L-606.8,-239.9 L-616.2,-252.1 L-613.8,-271.7 L-639.1,-299.9 L-677.8,-309.6 L-684.8,-328.0 L-702.2,-339.2 L-706.4,-346.1 L-709.9,-359.8 L-709.1,-369.1 L-723.4,-374.6 L-731.1,-372.1 L-737.0,-394.3 L-730.4,-399.8 L-733.6,-405.5 L-711.1,-416.8 L-694.9,-421.5 L-670.0,-418.3 L-661.1,-433.6 L-630.9,-436.4 L-622.5,-446.0 L-585.4,-459.0 L-582.1,-464.4 L-584.0,-478.1 L-567.9,-484.3 L-589.0,-526.0 L-542.4,-535.6 L-530.4,-541.0 L-513.4,-583.9 L-466.7,-576.0 L-453.6,-586.9 L-452.5,-610.9 L-433.0,-613.2 L-415.1,-629.2 L-405.9,-631.1 L-399.7,-614.4 L-379.9,-601.7 L-346.3,-592.6 L-330.1,-573.3 L-339.2,-545.3 L-330.7,-534.9 L-302.7,-530.8 L-271.0,-527.4 L-242.6,-512.5 L-228.1,-509.8 L-217.4,-487.7 L-203.5,-473.4 L-177.6,-474.0 L-129.0,-468.6 L-97.7,-471.9 L-74.5,-468.4 L-39.7,-453.8 L-11.2,-453.8 L-0.8,-446.3 L26.6,-459.2 L64.6,-467.6 L99.8,-468.5 L127.3,-476.9 L144.2,-489.8 L160.7,-497.8 L156.9,-505.8 L149.4,-515.0 L161.7,-530.4 L175.0,-528.3 L199.2,-523.4 L222.6,-536.2 L258.5,-545.5 L275.7,-561.3 L292.3,-568.1 L326.5,-571.3 L345.0,-568.6 L347.6,-577.2 L326.3,-593.9 L307.4,-601.6 L289.3,-592.7 L266.1,-596.5 L252.8,-593.4 L246.7,-603.2 L263.3,-627.2 L274.8,-645.3 L303.0,-636.3 L336.2,-651.4 L336.0,-662.0 L357.2,-687.4 L370.3,-695.1 L370.0,-708.4 L357.1,-714.1 L376.5,-726.0 L405.8,-730.4 L437.0,-731.0 L472.2,-723.9 L492.9,-715.0 L507.4,-690.8 L516.2,-680.5 L524.4,-665.8 L533.1,-642.2 Z",TWN:"M394.8,-33.5 L380.6,5.0 L370.5,24.7 L358.1,4.4 L355.4,-13.4 L369.3,-36.9 L388.1,-55.1 L398.9,-47.9 L394.8,-33.5 Z",PHL:"M503.0,350.0 L505.4,366.0 L506.8,379.5 L498.7,401.4 L490.2,377.0 L479.1,389.1 L486.7,406.8 L479.9,418.1 L452.2,404.1 L445.6,386.8 L452.8,375.3 L437.9,364.0 L430.5,373.9 L419.4,373.0 L402.0,386.4 L398.1,379.4 L407.3,359.2 L422.2,352.4 L435.0,343.4 L443.3,354.2 L461.2,347.7 L465.0,337.0 L481.7,336.3 L480.3,317.8 L499.4,329.1 L501.3,341.2 L503.0,350.0 Z M446.6,305.3 L438.2,313.2 L430.8,328.4 L423.4,335.5 L408.9,318.9 L413.8,312.5 L419.7,305.7 L422.3,290.8 L435.3,289.4 L431.5,305.6 L448.9,282.4 L446.6,305.3 Z M317.8,328.4 L286.5,351.2 L298.0,334.4 L315.0,319.6 L329.1,303.0 L341.4,279.1 L345.6,298.7 L330.1,311.9 L317.8,328.4 Z M397.3,266.6 L411.4,274.0 L426.4,274.0 L425.9,284.0 L415.0,294.2 L400.1,301.4 L399.2,290.3 L400.9,278.0 L397.3,266.6 Z M482.4,260.1 L489.0,286.9 L470.9,280.5 L471.4,288.6 L477.1,303.4 L465.9,308.8 L464.9,291.9 L457.9,290.6 L454.2,276.1 L468.0,278.0 L467.7,268.9 L453.3,250.6 L475.9,251.1 L482.4,260.1 Z M388.9,238.3 L382.6,259.1 L372.6,247.1 L360.6,228.8 L380.7,229.7 L388.9,238.3 Z M384.0,107.9 L398.5,114.8 L405.8,108.5 L407.9,114.6 L404.1,124.6 L412.1,141.8 L405.9,161.7 L392.1,169.7 L388.4,189.0 L393.6,208.1 L406.1,210.8 L416.5,207.9 L445.9,221.2 L443.6,234.3 L451.3,240.1 L448.9,251.1 L430.5,239.3 L421.9,226.7 L415.8,235.5 L400.8,221.2 L379.4,224.7 L367.7,219.4 L368.9,209.5 L376.3,203.4 L369.3,197.8 L366.2,206.5 L354.6,192.7 L351.1,182.2 L350.2,159.3 L359.7,167.2 L362.1,129.6 L369.8,107.9 L384.0,107.9 Z",VNM:"M71.8,34.7 L40.4,55.3 L20.7,78.0 L15.6,94.6 L33.6,119.9 L55.6,151.3 L76.9,166.1 L91.2,185.4 L102.0,229.8 L98.8,272.0 L79.2,287.8 L52.3,303.3 L33.1,323.3 L3.7,345.6 L-4.8,330.2 L1.8,314.0 L-15.7,300.3 L4.7,290.7 L29.4,288.9 L19.1,274.4 L58.6,255.9 L61.5,227.1 L56.1,211.1 L60.3,187.1 L54.4,170.2 L36.6,153.5 L21.8,132.4 L2.2,104.0 L-26.0,89.6 L-19.2,81.0 L-4.2,74.7 L-13.3,53.8 L-42.3,53.6 L-52.8,31.8 L-66.6,12.8 L-54.0,7.0 L-35.2,7.1 L-12.3,4.3 L7.7,-8.4 L19.1,0.6 L40.6,4.9 L36.9,18.8 L48.1,28.5 L71.8,34.7 Z",MYS:"M-92.3,403.1 L-90.5,415.4 L-75.0,412.5 L-67.3,402.7 L-61.9,404.9 L-48.0,419.4 L-38.1,435.5 L-36.7,451.6 L-39.2,462.6 L-37.0,470.8 L-35.2,485.0 L-26.9,491.6 L-17.7,512.9 L-18.1,521.0 L-34.8,522.6 L-57.1,504.8 L-84.9,485.7 L-87.7,473.5 L-101.3,457.5 L-104.5,437.6 L-113.0,424.5 L-110.4,407.0 L-115.6,396.9 L-111.5,392.6 L-92.3,403.1 Z M320.4,444.5 L303.1,452.7 L282.7,448.7 L255.7,448.6 L247.5,475.9 L238.4,484.3 L226.4,517.7 L207.2,522.8 L184.9,516.1 L173.7,518.2 L159.9,530.3 L144.9,528.6 L129.7,533.4 L113.7,519.9 L109.7,503.8 L127.0,512.1 L145.1,507.6 L149.9,487.3 L159.9,482.7 L188.1,477.5 L205.0,458.6 L216.6,443.4 L227.3,455.8 L232.2,447.6 L243.5,448.4 L244.8,433.1 L245.9,421.3 L264.0,404.6 L275.9,385.8 L285.4,385.7 L297.5,397.9 L298.6,408.3 L314.1,415.0 L333.7,422.2 L332.0,431.6 L316.2,432.8 L320.4,444.5 Z",BRN:"M216.6,443.4 L225.9,434.4 L245.9,421.3 L244.8,433.1 L243.5,448.4 L232.2,447.6 L227.3,455.8 L216.6,443.4 Z"};
const SCS_FEATURES=[
  {n:"Scarborough Shoal",lat:15.183,lon:117.767,side:"chn",note:"China-controlled since 2012; Philippines claims"},
  {n:"2nd Thomas Shoal",lat:9.733,lon:115.867,side:"phl",note:"BRP Sierra Madre grounded here since 1999"},
  {n:"Mischief Reef",lat:9.917,lon:115.533,side:"chn",note:"China-built military installation"},
  {n:"Fiery Cross Reef",lat:9.549,lon:112.889,side:"chn",note:"China-built airfield"},
  {n:"Subi Reef",lat:10.913,lon:114.062,side:"chn",note:"China-built military installation"},
  {n:"Itu Aba",lat:10.37,lon:114.37,side:"twn",note:"Taiwan-controlled, largest natural Spratly island"},
  {n:"Woody Island",lat:16.83,lon:112.33,side:"chn",note:"Paracels; China's regional military hub"},
];
const SCS_NINEDASH=[[21.0,108.0],[18.5,108.3],[15.8,111.0],[12.0,110.0],[8.5,111.8],[4.0,109.3],[4.0,115.0],[8.0,117.5],[12.0,117.5],[15.5,118.3],[19.5,119.5],[21.5,122.0]];


const CAR_MAP={lon0:-78.0,lon1:-58.0,lat0:6.0,lat1:24.0,W:400,H:370};
const CARX=(lon)=>((lon-CAR_MAP.lon0)/(CAR_MAP.lon1-CAR_MAP.lon0))*CAR_MAP.W;
const CARY=(lat)=>((CAR_MAP.lat1-lat)/(CAR_MAP.lat1-CAR_MAP.lat0))*CAR_MAP.H;
const CAR_PATHS={VEN:"M133.4,251.3 L132.8,256.1 L121.1,258.5 L127.6,267.8 L127.3,278.6 L118.5,290.5 L126.1,306.8 L134.7,305.5 L139.2,290.7 L133.0,283.4 L132.0,267.9 L156.9,259.5 L154.1,249.8 L161.1,243.3 L168.3,257.8 L182.3,258.1 L195.3,269.6 L196.1,276.4 L214.1,276.6 L235.4,274.4 L246.9,283.7 L262.2,286.2 L273.4,279.8 L273.6,274.6 L298.4,273.4 L322.4,273.1 L305.4,279.1 L312.2,288.8 L328.2,290.4 L343.4,300.5 L346.6,317.0 L357.0,316.5 L364.8,321.3 L349.0,333.4 L347.2,340.9 L354.1,348.5 L349.1,352.4 L336.8,355.7 L337.2,365.2 L331.8,370.8 L345.3,386.4 L348.0,392.2 L340.7,400.1 L318.3,407.8 L303.9,411.0 L298.1,415.8 L282.2,410.7 L267.4,408.1 L263.7,410.0 L272.6,415.3 L271.8,429.1 L274.6,442.0 L291.5,443.8 L292.6,448.1 L278.3,453.9 L276.0,462.6 L267.8,466.0 L252.9,470.8 L249.0,477.1 L233.5,478.4 L222.5,467.6 L216.4,447.1 L211.1,439.9 L203.8,435.4 L213.9,425.1 L213.2,420.5 L207.6,414.4 L203.5,400.8 L205.1,386.0 L209.6,379.1 L213.2,368.0 L206.1,364.5 L194.7,366.8 L180.3,365.7 L172.2,367.9 L158.1,350.3 L146.5,347.6 L120.8,349.6 L116.0,342.4 L111.1,340.7 L110.4,336.4 L112.8,328.8 L111.2,320.6 L106.8,316.0 L104.2,306.6 L93.9,305.2 L99.4,293.2 L101.9,278.5 L107.7,270.9 L115.4,265.0 L120.5,254.7 L133.4,251.3 Z",CUB:"M-85.4,16.7 L-68.1,18.1 L-52.4,18.4 L-33.6,25.4 L-25.6,32.9 L-6.9,30.6 L0.1,35.4 L17.1,48.1 L29.5,57.4 L36.1,57.1 L48.0,61.3 L46.6,67.1 L61.3,68.0 L76.4,76.4 L74.1,81.2 L60.8,83.8 L47.3,84.8 L33.5,83.2 L4.9,85.2 L18.3,73.7 L10.1,68.4 L-2.7,67.0 L-9.7,61.1 L-14.4,49.4 L-25.7,50.2 L-44.3,44.7 L-50.4,40.3 L-76.4,37.2 L-83.4,33.2 L-75.9,28.0 L-95.5,27.0 L-109.9,37.6 L-118.2,37.9 L-121.0,42.9 L-130.9,45.2 L-139.5,43.2 L-128.9,36.9 L-124.6,29.5 L-115.6,24.9 L-105.4,20.9 L-90.2,18.9 L-85.4,16.7 Z",COL:"M52.5,496.5 L44.0,491.6 L34.2,484.8 L28.5,488.1 L11.5,485.2 L6.6,476.4 L2.9,476.7 L-17.1,464.9 L-19.8,458.6 L-12.4,457.0 L-13.2,446.7 L-8.6,439.3 L1.4,437.9 L9.8,425.0 L17.4,414.2 L10.1,409.3 L13.8,397.4 L9.3,378.6 L13.6,373.2 L10.5,355.8 L2.4,344.8 L4.9,334.9 L11.4,336.3 L15.1,330.2 L10.5,318.1 L12.9,315.1 L23.3,315.8 L38.3,301.4 L46.5,299.2 L46.7,292.4 L50.4,275.1 L61.9,265.5 L74.5,265.1 L76.1,260.8 L91.7,262.6 L107.4,252.2 L115.2,247.6 L124.9,237.7 L132.0,238.9 L137.3,244.3 L133.4,251.3 L120.5,254.7 L115.4,265.0 L107.7,270.9 L101.9,278.5 L99.4,293.2 L93.9,305.2 L104.2,306.6 L106.8,316.0 L111.2,320.6 L112.8,328.8 L110.4,336.4 L111.1,340.7 L116.0,342.4 L120.8,349.6 L146.5,347.6 L158.1,350.3 L172.2,367.9 L180.3,365.7 L194.7,366.8 L206.1,364.5 L213.2,368.0 L209.6,379.1 L205.1,386.0 L203.5,400.8 L207.6,414.4 L213.2,420.5 L213.9,425.1 L203.8,435.4 L211.1,439.9 L216.4,447.1 L222.5,467.6 L218.7,470.1 L214.8,458.0 L209.2,451.5 L202.6,458.5 L163.7,458.1 L163.9,470.9 L175.6,473.1 L175.0,480.9 L171.0,478.8 L159.7,482.2 L159.6,497.1 L168.5,504.6 L171.6,516.4 L171.1,525.3 L162.1,581.7 L152.1,570.8 L146.1,570.3 L159.0,549.4 L143.7,539.7 L131.7,541.5 L124.5,537.9 L113.5,543.4 L98.6,540.8 L86.8,519.2 L77.6,513.9 L71.2,504.2 L57.9,494.5 L52.5,496.5 Z",GUY:"M364.8,321.3 L378.0,328.9 L390.3,342.3 L390.9,352.9 L398.4,353.4 L409.2,363.4 L417.1,370.6 L413.9,389.0 L401.7,394.4 L402.8,399.3 L399.1,409.9 L408.0,424.8 L414.4,424.8 L417.0,436.4 L429.2,454.3 L424.3,455.0 L413.3,453.3 L406.8,458.7 L397.7,462.4 L391.4,463.2 L389.2,467.3 L379.4,466.2 L367.1,456.6 L365.6,447.1 L360.5,436.7 L363.7,419.2 L369.2,412.0 L364.7,402.4 L357.8,399.3 L360.4,390.3 L355.7,385.5 L345.3,386.4 L331.8,370.8 L337.2,365.2 L336.8,355.7 L349.1,352.4 L354.1,348.5 L347.2,340.9 L349.0,333.4 L364.8,321.3 Z",TTO:"M326.4,272.2 L337.9,269.5 L342.1,270.2 L341.3,285.5 L324.6,287.8 L321.0,285.9 L326.8,280.3 L326.4,272.2 Z",DOM:"M125.8,88.1 L128.3,84.6 L143.9,84.7 L155.7,90.0 L161.0,89.5 L164.6,96.7 L175.6,96.3 L174.9,102.5 L183.8,103.2 L193.6,110.7 L186.2,119.1 L176.7,114.6 L167.5,115.5 L160.9,114.5 L157.3,118.3 L149.7,119.5 L146.6,114.6 L140.0,117.5 L132.0,131.6 L126.8,128.3 L125.8,122.4 L126.2,116.8 L121.1,110.7 L126.0,107.2 L127.5,99.3 L125.8,88.1 Z",HTI:"M96.2,84.0 L108.4,84.9 L125.8,88.1 L127.5,99.3 L126.0,107.2 L121.1,110.7 L126.2,116.8 L125.8,122.4 L112.6,118.9 L103.1,120.3 L90.9,118.9 L81.6,122.7 L70.8,116.3 L72.6,109.7 L91.0,112.5 L106.1,114.2 L113.3,109.6 L104.2,100.7 L104.3,92.8 L91.7,89.6 L96.2,84.0 Z",JAM:"M8.6,113.3 L22.1,115.1 L32.7,120.0 L36.0,125.7 L21.9,126.0 L15.9,129.5 L4.7,126.2 L-6.8,118.7 L-4.4,114.0 L4.1,112.6 L8.6,113.3 Z"};
const CAR_CITIES=[
  {n:"Caracas",lat:10.48,lon:-66.90,side:"ven",note:"Venezuela capital"},
  {n:"Maracaibo",lat:10.67,lon:-71.61,side:"ven",note:"Oil hub, western Venezuela"},
  {n:"Havana",lat:23.11,lon:-82.37,side:"cub",note:"Cuba capital"},
  {n:"Guantanamo Bay",lat:19.90,lon:-75.10,side:"us",note:"US naval base; logistics hub for Southern Spear"},
  {n:"Roosevelt Roads",lat:18.245,lon:-65.638,side:"us",note:"Reactivated US naval base, Puerto Rico"},
  {n:"Port of Spain",lat:10.65,lon:-61.50,side:"tto",note:"Trinidad & Tobago"},
  {n:"Santo Domingo",lat:18.49,lon:-69.93,side:"dom",note:"Dominican Republic capital"},
  {n:"Port-au-Prince",lat:18.59,lon:-72.31,side:"hti",note:"Haiti capital"},
];
const SOUTHERN_SPEAR_AO=[[15.0,-68.0],[15.0,-62.5],[10.5,-60.5],[8.0,-62.0],[8.5,-68.5],[11.5,-70.5],[15.0,-68.0]];


const LV_MAP={lon0:32.0,lon1:40.0,lat0:29.0,lat1:37.0,W:400,H:474};
const LVX=(lon)=>((lon-LV_MAP.lon0)/(LV_MAP.lon1-LV_MAP.lon0))*LV_MAP.W;
const LVY=(lat)=>((LV_MAP.lat1-lat)/(LV_MAP.lat1-LV_MAP.lat0))*LV_MAP.H;
const LV_PATHS={ISR:"M186.0,254.2 L177.3,272.9 L159.2,264.7 L148.7,304.2 L161.3,310.8 L148.5,319.0 L146.4,334.6 L169.9,326.5 L171.0,349.6 L146.1,444.3 L113.3,342.5 L127.8,323.0 L124.4,319.6 L137.6,291.9 L147.8,247.2 L154.9,232.2 L156.3,231.6 L173.0,231.7 L177.6,221.3 L191.1,220.6 L191.8,244.8 L185.0,253.8 L186.0,254.2 Z",LBN:"M191.1,220.6 L177.6,221.3 L173.0,231.7 L156.3,231.6 L174.1,183.4 L199.0,141.6 L199.9,139.5 L222.4,142.6 L230.6,165.8 L203.3,188.1 L191.1,220.6 Z",SYR:"M339.6,214.6 L241.7,277.7 L186.0,254.2 L185.0,253.8 L191.8,244.8 L191.1,220.6 L203.3,188.1 L230.6,165.8 L222.4,142.6 L199.9,139.5 L195.3,94.2 L207.5,69.8 L220.9,56.8 L234.3,43.9 L237.0,10.8 L253.3,22.3 L308.4,5.9 L335.0,17.0 L376.1,16.8 L433.7,-5.4 L460.6,-4.4 L517.5,-13.6 L491.9,23.4 L464.5,38.0 L469.2,81.3 L450.3,152.9 L339.6,214.6 Z",JOR:"M177.3,272.9 L186.0,254.2 L241.7,277.7 L339.6,214.6 L359.8,286.7 L350.2,295.6 L250.1,325.4 L299.9,384.6 L283.4,394.7 L275.2,414.5 L237.0,422.7 L225.1,444.1 L203.4,462.3 L147.8,452.9 L146.1,444.3 L171.0,349.6 L169.9,326.5 L177.3,309.1 L177.3,272.9 Z",EGY:"M146.1,444.3 L132.1,468.1 L121.3,512.9 L107.7,543.7 L96.1,554.1 L79.4,534.9 L56.8,508.5 L21.2,423.6 L16.0,428.9 L36.7,491.5 L67.4,551.0 L105.2,643.3 L123.7,675.5 L139.8,709.0 L184.6,774.6 L174.7,784.9 L176.3,823.4 L234.5,876.6 L243.3,888.8 L45.0,888.8 L-149.0,888.8 L-350.0,888.8 L-350.0,670.6 L-350.0,459.9 L-365.0,412.1 L-352.1,375.6 L-359.9,350.2 L-341.8,321.8 L-275.2,320.8 L-227.1,336.5 L-177.5,354.0 L-154.3,363.2 L-115.8,344.4 L-95.2,327.5 L-51.2,322.6 L-15.6,330.0 L-2.0,359.4 L9.6,340.1 L49.7,354.1 L88.7,357.4 L113.3,342.5 L146.1,444.3 Z",PSE:"M177.3,272.9 L177.3,309.1 L169.9,326.5 L146.4,334.6 L148.5,319.0 L161.3,310.8 L148.7,304.2 L159.2,264.7 L177.3,272.9 Z"};
const LEV_CITIES=[
  {n:"Tel Aviv",lat:32.085,lon:34.782,side:"isr"},
  {n:"Jerusalem",lat:31.768,lon:35.214,side:"isr"},
  {n:"Beirut",lat:33.894,lon:35.502,side:"lbn"},
  {n:"Damascus",lat:33.514,lon:36.277,side:"syr"},
  {n:"Amman",lat:31.945,lon:35.928,side:"jor"},
  {n:"Gaza City",lat:31.502,lon:34.467,side:"gaza"},
];
const LITANI_RIVER=[[33.83,35.90],[33.62,35.83],[33.57,35.69],[33.38,35.48],[33.34,35.13]];
const GAZA_BBOX={lat0:31.22,lat1:31.59,lon0:34.22,lon1:34.55};


const IP_MAP={lon0:66.0,lon1:82.0,lat0:22.0,lat1:37.0,W:400,H:428};
const IPX=(lon)=>((lon-IP_MAP.lon0)/(IP_MAP.lon1-IP_MAP.lon0))*IP_MAP.W;
const IPY=(lat)=>((IP_MAP.lat1-lat)/(IP_MAP.lat1-IP_MAP.lat0))*IP_MAP.H;
const IP_PATHS={IND:"M295.9,43.0 L322.8,76.4 L320.3,99.7 L330.2,114.3 L329.4,128.9 L311.5,125.0 L318.5,156.5 L343.0,174.5 L377.8,194.5 L361.9,207.4 L352.2,234.1 L376.4,244.9 L400.0,258.9 L432.6,274.9 L466.9,278.6 L481.3,293.1 L500.6,295.9 L530.7,302.5 L551.5,302.0 L554.4,290.7 L551.1,272.6 L553.0,260.3 L568.3,254.3 L570.4,276.8 L570.9,282.5 L593.6,293.3 L609.3,288.9 L630.4,290.8 L650.8,289.9 L652.6,272.4 L642.4,263.3 L662.6,259.7 L685.3,238.5 L714.1,220.4 L735.1,227.4 L752.9,215.3 L764.7,233.1 L756.2,245.1 L783.2,249.3 L785.1,260.2 L776.3,265.4 L778.3,282.9 L760.5,277.8 L728.1,297.5 L728.9,313.8 L715.1,337.8 L713.8,351.7 L702.7,375.2 L683.1,368.7 L682.2,398.2 L676.5,407.9 L679.2,420.1 L666.8,426.8 L653.7,381.6 L646.7,381.7 L642.7,399.9 L629.0,385.1 L636.7,368.9 L647.9,367.2 L659.4,343.1 L645.0,338.2 L621.8,338.6 L598.0,334.7 L595.8,314.9 L583.9,313.5 L564.1,301.1 L555.2,320.5 L573.3,335.6 L557.7,346.2 L552.1,356.6 L567.5,364.3 L563.2,381.5 L571.9,402.9 L575.8,426.4 L572.2,436.8 L555.2,436.5 L524.4,442.4 L525.8,463.9 L512.5,480.7 L476.5,499.9 L448.5,533.5 L429.7,551.5 L404.8,570.2 L404.8,583.3 L392.3,590.3 L369.8,600.6 L358.1,602.1 L350.6,623.8 L355.8,661.0 L357.2,684.6 L346.6,711.7 L346.4,760.2 L333.5,761.6 L322.1,783.4 L329.7,792.8 L306.9,800.8 L298.5,820.2 L288.5,828.5 L264.8,801.8 L253.3,761.9 L243.7,733.1 L234.9,719.6 L221.6,692.2 L215.4,656.5 L211.1,638.7 L188.4,599.5 L178.0,544.2 L170.5,507.7 L170.6,473.1 L165.8,446.4 L129.4,463.5 L111.8,460.0 L79.1,425.5 L91.1,415.1 L83.7,403.9 L54.4,379.7 L71.1,360.7 L126.1,360.8 L121.1,336.3 L107.1,321.8 L104.2,299.8 L87.9,287.0 L115.4,257.1 L144.4,259.3 L170.6,229.4 L186.3,200.4 L210.5,171.8 L210.1,151.4 L231.5,134.9 L211.3,120.8 L202.6,101.5 L193.7,76.5 L206.0,64.2 L243.9,71.2 L271.8,67.0 L295.9,43.0 Z",PAK:"M229.0,-3.8 L247.4,9.5 L254.8,31.4 L295.9,43.0 L271.8,67.0 L243.9,71.2 L206.0,64.2 L193.7,76.5 L202.6,101.5 L211.3,120.8 L231.5,134.9 L210.1,151.4 L210.5,171.8 L186.3,200.4 L170.6,229.4 L144.4,259.3 L115.4,257.1 L87.9,287.0 L104.2,299.8 L107.1,321.8 L121.1,336.3 L126.1,360.8 L71.1,360.7 L54.4,379.7 L36.1,372.5 L28.6,352.0 L9.3,330.3 L-36.7,335.6 L-77.4,336.2 L-112.6,340.2 L-103.1,307.0 L-67.1,292.3 L-69.2,279.1 L-81.1,274.5 L-81.8,249.4 L-105.7,236.8 L-115.8,219.6 L-128.1,204.6 L-86.3,219.2 L-61.2,214.9 L-46.3,218.5 L-41.2,212.3 L-23.8,214.8 L8.7,202.9 L9.5,178.7 L23.5,162.5 L42.1,162.6 L44.8,154.6 L63.9,150.8 L73.2,153.5 L82.9,145.5 L81.6,128.3 L92.2,111.1 L108.1,103.9 L98.3,85.0 L122.0,85.9 L128.9,75.6 L127.9,64.7 L140.3,52.7 L137.5,38.5 L131.6,26.4 L146.2,14.0 L173.0,8.0 L201.7,4.7 L214.4,-0.6 L229.0,-3.8 Z",CHN:"M1108.5,522.8 L1086.9,536.5 L1066.4,527.6 L1065.7,503.1 L1078.0,490.2 L1105.3,482.2 L1119.7,482.9 L1125.3,493.7 L1114.3,506.3 L1108.5,522.8 Z M1541.4,-364.1 L1584.9,-355.0 L1614.6,-334.7 L1624.7,-307.9 L1662.7,-307.8 L1684.3,-319.1 L1725.7,-327.5 L1712.5,-301.8 L1702.8,-291.4 L1694.2,-260.1 L1677.4,-232.4 L1647.1,-237.4 L1625.6,-227.4 L1632.2,-202.9 L1628.6,-169.2 L1615.8,-168.4 L1616.0,-153.9 L1599.9,-170.8 L1589.9,-154.8 L1551.3,-142.5 L1555.2,-127.5 L1533.6,-128.5 L1521.7,-137.4 L1504.6,-117.2 L1477.0,-101.9 L1456.6,-83.6 L1421.7,-75.3 L1403.3,-61.9 L1376.4,-54.1 L1389.6,-67.4 L1384.4,-78.5 L1404.2,-97.7 L1391.0,-112.6 L1369.2,-102.5 L1341.0,-82.7 L1325.6,-64.3 L1301.1,-62.9 L1288.3,-49.6 L1301.5,-30.3 L1322.0,-25.6 L1322.8,-12.8 L1342.6,-4.5 L1370.6,-24.8 L1392.8,-13.7 L1408.9,-13.0 L1413.0,2.0 L1377.6,9.9 L1365.9,25.4 L1341.6,39.7 L1328.8,59.6 L1355.7,75.3 L1365.5,103.4 L1380.7,129.5 L1397.7,151.4 L1397.3,172.6 L1381.6,180.4 L1387.6,195.7 L1402.3,204.5 L1398.5,227.8 L1392.1,250.4 L1378.1,252.9 L1359.9,283.8 L1339.6,321.3 L1316.4,355.3 L1282.0,381.6 L1247.3,405.7 L1219.1,408.9 L1203.8,421.6 L1195.2,412.4 L1181.0,426.5 L1146.1,440.8 L1119.6,445.2 L1111.1,475.3 L1097.2,477.0 L1090.7,456.3 L1096.6,445.3 L1063.1,436.1 L1051.3,440.8 L1026.1,433.4 L1014.2,421.8 L1018.1,405.3 L995.3,400.1 L983.2,389.4 L961.9,404.6 L937.6,407.9 L917.7,407.8 L904.3,414.7 L891.3,418.9 L895.1,451.6 L881.8,450.8 L879.5,444.1 L878.8,432.3 L860.4,440.6 L849.6,435.3 L831.0,424.6 L838.3,400.9 L822.5,395.4 L816.5,369.1 L790.1,373.9 L793.1,340.0 L816.8,316.2 L817.8,292.7 L817.1,270.8 L806.2,264.0 L797.8,247.2 L783.2,249.3 L756.2,245.1 L764.7,233.1 L752.9,215.3 L735.1,227.4 L714.1,220.4 L685.3,238.5 L662.6,259.7 L642.4,263.3 L631.5,255.6 L618.3,254.9 L600.4,248.3 L586.9,255.6 L570.4,276.8 L568.3,254.3 L553.0,260.3 L523.9,257.5 L495.6,251.0 L475.3,238.5 L455.9,232.8 L447.5,219.1 L433.4,215.0 L408.2,196.4 L388.1,187.7 L377.8,194.5 L343.0,174.5 L318.5,156.5 L311.5,125.0 L329.4,128.9 L330.2,114.3 L320.3,99.7 L322.8,76.4 L295.9,43.0 L254.8,31.4 L247.4,9.5 L229.0,-3.8 L224.5,-12.0 L220.7,-28.2 L221.6,-39.3 L206.4,-45.8 L198.2,-43.0 L191.9,-69.4 L199.0,-75.9 L195.6,-82.6 L219.4,-96.1 L236.7,-101.6 L263.2,-97.8 L272.6,-116.0 L304.7,-119.4 L313.6,-130.7 L353.0,-146.2 L356.5,-152.7 L354.5,-168.9 L371.7,-176.3 L349.2,-225.9 L398.7,-237.3 L411.5,-243.7 L429.5,-294.8 L479.1,-285.4 L493.0,-298.3 L494.2,-326.9 L515.0,-329.5 L534.0,-348.5 L543.8,-350.9 L550.3,-331.0 L571.4,-315.8 L607.0,-305.1 L624.3,-282.1 L614.6,-248.8 L623.6,-236.4 L653.3,-231.6 L687.0,-227.6 L717.2,-209.8 L732.7,-206.6 L744.1,-180.3 L758.7,-163.4 L786.3,-164.0 L837.9,-157.6 L871.1,-161.6 L895.8,-157.4 L932.8,-140.0 L963.1,-140.1 L974.1,-131.2 L1003.2,-146.5 L1043.6,-156.4 L1081.1,-157.5 L1110.3,-167.5 L1128.2,-182.8 L1145.7,-192.4 L1141.7,-201.8 L1133.7,-212.8 L1146.8,-231.2 L1160.9,-228.6 L1186.6,-222.8 L1211.5,-238.0 L1249.6,-249.0 L1267.9,-267.9 L1285.5,-276.0 L1321.9,-279.8 L1341.6,-276.6 L1344.3,-286.7 L1321.7,-306.6 L1301.6,-315.8 L1282.4,-305.2 L1257.7,-309.7 L1243.6,-306.1 L1237.1,-317.7 L1254.8,-346.2 L1267.0,-367.8 L1297.0,-357.0 L1332.2,-375.0 L1332.0,-387.6 L1354.6,-417.8 L1368.5,-427.0 L1368.1,-442.7 L1354.4,-449.5 L1375.1,-463.7 L1406.1,-468.9 L1439.3,-469.6 L1476.7,-461.1 L1498.7,-450.6 L1514.1,-421.8 L1523.5,-409.6 L1532.2,-392.0 L1541.4,-364.1 Z",AFG:"M-119.7,38.5 L-94.2,49.3 L-75.4,45.5 L-70.2,32.6 L-50.4,28.3 L-36.3,19.6 L-31.3,-3.2 L-10.3,-8.7 L-6.4,-18.9 L5.4,-11.2 L13.0,-10.4 L26.9,-10.2 L45.7,-4.1 L53.4,-0.7 L71.5,-9.8 L79.9,-4.3 L88.0,-17.4 L102.9,-16.8 L106.8,-21.0 L109.4,-32.5 L120.2,-42.4 L133.7,-35.9 L131.0,-27.2 L138.5,-25.8 L136.2,-1.9 L146.1,7.5 L154.8,1.5 L165.9,-1.4 L181.5,-14.1 L198.7,-12.0 L224.5,-12.0 L229.0,-3.8 L214.4,-0.6 L201.7,4.7 L173.0,8.0 L146.2,14.0 L131.6,26.4 L137.5,38.5 L140.3,52.7 L127.9,64.7 L128.9,75.6 L122.0,85.9 L98.3,85.0 L108.1,103.9 L92.2,111.1 L81.6,128.3 L82.9,145.5 L73.2,153.5 L63.9,150.8 L44.8,154.6 L42.1,162.6 L23.5,162.5 L9.5,178.7 L8.7,202.9 L-23.8,214.8 L-41.2,212.3 L-46.3,218.5 L-61.2,214.9 L-86.3,219.2 L-128.1,204.6 L-105.5,178.7 L-107.5,160.4 L-126.5,155.6 L-128.4,137.4 L-136.6,114.7 L-125.9,99.0 L-136.8,94.8 L-129.9,74.1 L-119.7,38.5 Z"};
const IP_CITIES=[
  {n:"Srinagar",lat:34.084,lon:74.797,side:"ind",note:"J&K summer capital, India-administered"},
  {n:"Jammu",lat:32.727,lon:74.857,side:"ind"},
  {n:"Islamabad",lat:33.684,lon:73.048,side:"pak",note:"Pakistan capital"},
  {n:"Muzaffarabad",lat:34.370,lon:73.471,side:"pak",note:"Capital, Pakistan-administered Kashmir (AJK)"},
  {n:"Leh",lat:34.153,lon:77.577,side:"ind",note:"Ladakh"},
  {n:"Kargil",lat:34.559,lon:76.126,side:"ind",note:"1999 Kargil War"},
];
const LOC_PATH=[[35.4,77.0],[34.85,76.3],[34.559,76.126],[34.35,75.0],[34.09,74.06],[33.77,74.09],[33.2,74.35],[32.5,74.5]];


const PA_MAP={lon0:58.0,lon1:76.0,lat0:22.0,lat1:39.0,W:400,H:435};
const PAX=(lon)=>((lon-PA_MAP.lon0)/(PA_MAP.lon1-PA_MAP.lon0))*PA_MAP.W;
const PAY=(lat)=>((PA_MAP.lat1-lat)/(PA_MAP.lat1-PA_MAP.lat0))*PA_MAP.H;
const PA_PATHS={PAK:"M381.3,47.8 L397.7,59.7 L404.3,79.4 L440.8,89.7 L419.4,111.2 L394.6,115.0 L360.9,108.8 L350.0,119.8 L357.9,142.2 L365.6,159.5 L383.5,172.2 L364.6,187.0 L364.9,205.2 L343.3,230.9 L329.4,256.9 L306.2,283.7 L280.4,281.7 L255.9,308.6 L270.4,320.1 L273.0,339.8 L285.4,352.7 L289.8,374.7 L240.9,374.6 L226.1,391.7 L209.9,385.2 L203.2,366.8 L186.1,347.4 L145.1,352.2 L109.0,352.6 L77.7,356.2 L86.1,326.5 L118.1,313.3 L116.3,301.5 L105.7,297.4 L105.1,274.8 L83.8,263.6 L74.9,248.1 L63.9,234.7 L101.1,247.7 L123.3,243.9 L136.6,247.2 L141.1,241.6 L156.6,243.8 L185.5,233.2 L186.3,211.4 L198.6,196.9 L215.2,196.9 L217.6,189.8 L234.6,186.5 L242.8,188.8 L251.5,181.6 L250.3,166.3 L259.7,150.8 L273.9,144.4 L265.1,127.4 L286.3,128.2 L292.4,119.0 L291.4,109.2 L302.5,98.4 L300.0,85.7 L294.7,74.9 L307.7,63.7 L331.6,58.3 L357.1,55.4 L368.4,50.6 L381.3,47.8 Z",AFG:"M71.4,85.7 L94.0,95.4 L110.8,92.0 L115.4,80.4 L133.0,76.6 L145.5,68.8 L149.9,48.3 L168.6,43.4 L172.1,34.3 L182.6,41.1 L189.3,41.9 L201.7,42.1 L218.4,47.5 L225.2,50.6 L241.3,42.4 L248.8,47.3 L256.0,35.6 L269.3,36.1 L272.7,32.4 L275.0,22.0 L284.6,13.1 L296.6,19.0 L294.2,26.8 L300.9,28.0 L298.9,49.5 L307.7,57.9 L315.4,52.5 L325.3,50.0 L339.1,38.5 L354.4,40.4 L377.3,40.4 L381.3,47.8 L368.4,50.6 L357.1,55.4 L331.6,58.3 L307.7,63.7 L294.7,74.9 L300.0,85.7 L302.5,98.4 L291.4,109.2 L292.4,119.0 L286.3,128.2 L265.1,127.4 L273.9,144.4 L259.7,150.8 L250.3,166.3 L251.5,181.6 L242.8,188.8 L234.6,186.5 L217.6,189.8 L215.2,196.9 L198.6,196.9 L186.3,211.4 L185.5,233.2 L156.6,243.8 L141.1,241.6 L136.6,247.2 L123.3,243.9 L101.1,247.7 L63.9,234.7 L84.0,211.5 L82.2,195.0 L65.4,190.7 L63.6,174.4 L56.4,154.0 L65.9,140.0 L56.2,136.2 L62.3,117.6 L71.4,85.7 Z",IRN:"M-90.6,46.1 L-71.1,41.1 L-55.3,26.5 L-40.4,27.2 L-30.7,22.5 L-14.9,24.8 L9.7,37.8 L27.4,40.6 L52.8,63.3 L69.4,64.2 L71.4,85.7 L62.3,117.6 L56.2,136.2 L65.9,140.0 L56.4,154.0 L63.6,174.4 L65.4,190.7 L82.2,195.0 L84.0,211.5 L63.9,234.7 L74.9,248.1 L83.8,263.6 L105.1,274.8 L105.7,297.4 L116.3,301.5 L118.1,313.3 L86.1,326.5 L77.7,356.2 L35.9,348.5 L11.7,342.6 L-13.4,339.3 L-22.9,307.9 L-33.5,303.4 L-50.6,308.0 L-73.0,320.3 L-100.2,311.9 L-122.6,292.2 L-144.0,284.9 L-158.8,260.6 L-175.2,226.5 L-187.2,230.7 L-201.3,222.2 L-209.6,232.2 L-221.9,218.7 L-222.1,205.1 L-229.2,205.1 L-225.6,186.6 L-237.0,167.1 L-264.2,153.1 L-279.6,128.8 L-274.5,108.8 L-263.3,100.0 L-265.0,85.0 L-279.5,77.3 L-293.9,46.8 L-306.1,26.3 L-301.7,18.4 L-308.7,-11.0 L-293.5,-18.2 L-289.9,-8.6 L-278.7,3.2 L-263.5,6.6 L-255.4,5.9 L-229.2,-13.0 L-220.9,-14.9 L-214.3,-7.4 L-222.0,5.3 L-208.1,18.7 L-202.6,17.4 L-195.6,36.3 L-174.5,41.6 L-159.1,54.4 L-127.5,58.8 L-92.8,52.1 L-90.6,46.1 Z",IND:"M440.8,89.7 L464.7,119.7 L462.5,140.6 L471.3,153.7 L470.6,166.7 L454.6,163.3 L460.9,191.5 L482.7,207.7 L513.6,225.6 L499.5,237.2 L490.9,261.1 L512.4,270.8 L533.3,283.4 L562.3,297.7 L592.8,301.0 L605.6,314.1 L622.8,316.5 L649.5,322.5 L668.0,322.0 L670.6,311.9 L667.6,295.7 L669.3,284.6 L682.9,279.2 L684.8,299.4 L685.2,304.5 L705.4,314.2 L719.4,310.2 L738.2,312.0 L756.3,311.2 L757.9,295.5 L748.8,287.3 L766.7,284.1 L787.0,265.1 L812.6,248.8 L831.2,255.1 L847.1,244.3 L857.5,260.2 L850.0,271.0 L873.9,274.8 L875.6,284.5 L867.8,289.2 L869.6,304.9 L853.8,300.3 L825.0,318.0 L825.7,332.6 L813.4,354.1 L812.3,366.5 L802.4,387.6 L785.0,381.8 L784.1,408.3 L779.1,417.0 L781.5,427.9 L770.5,433.9 L758.8,393.4 L752.7,393.4 L749.0,409.8 L736.9,396.5 L743.7,382.0 L753.7,380.5 L763.9,358.8 L751.1,354.5 L730.5,354.8 L709.3,351.3 L707.4,333.5 L696.8,332.3 L679.2,321.2 L671.3,338.6 L687.4,352.1 L673.5,361.7 L668.5,371.0 L682.2,377.8 L678.4,393.3 L686.1,412.5 L689.6,433.6 L686.4,442.9 L671.3,442.6 L643.9,447.9 L645.2,467.2 L633.3,482.3 L601.3,499.5 L576.5,529.6 L559.8,545.8 L537.6,562.5 L537.6,574.3 L526.5,580.6 L506.5,589.8 L496.1,591.1 L489.4,610.6 L494.1,643.9 L495.3,665.1 L485.8,689.4 L485.7,732.9 L474.2,734.2 L464.1,753.7 L470.9,762.1 L450.6,769.4 L443.1,786.8 L434.2,794.1 L413.2,770.2 L402.9,734.4 L394.4,708.6 L386.6,696.5 L374.8,671.9 L369.3,639.9 L365.4,623.9 L345.2,588.8 L336.0,539.2 L329.4,506.4 L329.4,475.4 L325.1,451.5 L292.8,466.8 L277.1,463.7 L248.1,432.7 L258.8,423.5 L252.2,413.4 L226.1,391.7 L240.9,374.6 L289.8,374.7 L285.4,352.7 L273.0,339.8 L270.4,320.1 L255.9,308.6 L280.4,281.7 L306.2,283.7 L329.4,256.9 L343.3,230.9 L364.9,205.2 L364.6,187.0 L383.5,172.2 L365.6,159.5 L357.9,142.2 L350.0,119.8 L360.9,108.8 L394.6,115.0 L419.4,111.2 L440.8,89.7 Z"};
const PA_CITIES=[
  {n:"Kabul",lat:34.555,lon:69.208,side:"afg",note:"Afghanistan capital"},
  {n:"Islamabad",lat:33.684,lon:73.048,side:"pak",note:"Pakistan capital"},
  {n:"Peshawar",lat:34.015,lon:71.525,side:"pak",note:"Near Torkham crossing"},
  {n:"Kandahar",lat:31.629,lon:65.737,side:"afg"},
  {n:"Quetta",lat:30.180,lon:66.975,side:"pak",note:"Near Chaman crossing"},
  {n:"Jalalabad",lat:34.442,lon:70.436,side:"afg"},
  {n:"Torkham Crossing",lat:34.173,lon:71.084,side:"border",note:"Main NATO-era supply crossing"},
  {n:"Spin Boldak",lat:31.009,lon:66.418,side:"border",note:"Jul 1, 2026 Taliban drone strikes hit here"},
];


function SCSMap({t}){
  const sea=t.isDark?"#08131f":"#dbeafe";
  const land=t.isDark?"#16212e":"#e2e8f0";
  const edge=t.isDark?"#2c3c4f":"#94a3b8";
  const SIDE_COLOR={chn:"#dc2626",phl:"#3b82f6",twn:"#f97316"};
  const dashPath=SCS_NINEDASH.map((pt,i)=>`${i?"L":"M"}${SCX(pt[1]).toFixed(1)},${SCY(pt[0]).toFixed(1)}`).join(" ");
  return <Card t={t} style={{padding:"12px 8px 8px"}}>
    <div style={{padding:"0 8px 8px",display:"flex",alignItems:"baseline",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
      <div style={{fontSize:12,fontWeight:700,color:t.text}}>South China Sea — Geographic Reference</div>
      <div style={{fontSize:10,color:t.sub}}>to scale · nine-dash line approximate</div>
    </div>
    <div style={{width:"100%",overflow:"hidden",borderRadius:10}}>
    <svg viewBox={`0 0 ${SC_MAP.W} ${SC_MAP.H}`} style={{width:"100%",height:"auto",display:"block",background:sea}} role="img" aria-label="Map of the South China Sea showing Scarborough Shoal, Second Thomas Shoal, Mischief Reef, Fiery Cross Reef, Subi Reef, Itu Aba and Woody Island, relative to China, Taiwan, the Philippines, Vietnam, Malaysia and Brunei, with China's approximate nine-dash line claim.">
      {["CHN","TWN","PHL","VNM","MYS","BRN"].map(code=><path key={code} d={SC_PATHS[code]} fill={land} stroke={edge} strokeWidth="1"/>)}
      <path d={dashPath} fill="none" stroke="#dc2626" strokeWidth="1.4" strokeDasharray="5 4" opacity="0.75"/>
      {SCS_FEATURES.map(o=><g key={o.n}>
        <circle cx={SCX(o.lon)} cy={SCY(o.lat)} r="3.4" fill={SIDE_COLOR[o.side]} stroke={sea} strokeWidth="0.8"/>
        <text x={SCX(o.lon)+5} y={SCY(o.lat)+3} fill={t.text} fontSize="8" fontWeight="600" fontFamily={FONT}>{o.n}</text>
      </g>)}
    </svg>
    </div>
    <div style={{padding:"8px 8px 0",display:"flex",gap:10,flexWrap:"wrap",fontSize:9,color:t.sub}}>
      <span>🔴 China-held</span><span>🔵 Philippines-held</span><span>🟠 Taiwan-held</span><span>- - China's nine-dash claim (approximate)</span>
    </div>
    <div style={{padding:"6px 8px 0",fontSize:9.5,color:t.sub,opacity:.7}}>Land borders plotted at true coordinates. China has never published official nine-dash coordinates; the line here follows commonly published approximations.</div>
  </Card>;
}

function CaribbeanMap({t}){
  const sea=t.isDark?"#08131f":"#dbeafe";
  const land=t.isDark?"#16212e":"#e2e8f0";
  const edge=t.isDark?"#2c3c4f":"#94a3b8";
  const SIDE_COLOR={ven:"#dc2626",cub:"#dc2626",us:"#3b82f6",tto:"#94a3b8",dom:"#94a3b8",hti:"#94a3b8"};
  const aoPath=SOUTHERN_SPEAR_AO.map((pt,i)=>`${i?"L":"M"}${CARX(pt[1]).toFixed(1)},${CARY(pt[0]).toFixed(1)}`).join(" ")+" Z";
  return <Card t={t} style={{padding:"12px 8px 8px"}}>
    <div style={{padding:"0 8px 8px",display:"flex",alignItems:"baseline",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
      <div style={{fontSize:12,fontWeight:700,color:t.text}}>Caribbean Theater — Geographic Reference</div>
      <div style={{fontSize:10,color:t.sub}}>to scale · AO approximate</div>
    </div>
    <div style={{width:"100%",overflow:"hidden",borderRadius:10}}>
    <svg viewBox={`0 0 ${CAR_MAP.W} ${CAR_MAP.H}`} style={{width:"100%",height:"auto",display:"block",background:sea}} role="img" aria-label="Map of the Caribbean showing Venezuela, Cuba, Colombia, Guyana, Trinidad, the Dominican Republic and Haiti, with Guantanamo Bay, Roosevelt Roads and the approximate Southern Spear operating area.">
      {["VEN","CUB","COL","GUY","TTO","DOM","HTI","JAM"].map(code=><path key={code} d={CAR_PATHS[code]} fill={land} stroke={edge} strokeWidth="1"/>)}
      <path d={aoPath} fill="#3b82f6" fillOpacity="0.12" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="4 3"/>
      {CAR_CITIES.map(o=><g key={o.n}>
        <rect x={CARX(o.lon)-2.6} y={CARY(o.lat)-2.6} width="5.2" height="5.2" fill={SIDE_COLOR[o.side]} stroke={sea} strokeWidth="0.8"/>
        <text x={CARX(o.lon)+6} y={CARY(o.lat)+3} fill={t.text} fontSize="8" fontWeight="600" fontFamily={FONT}>{o.n}</text>
      </g>)}
    </svg>
    </div>
    <div style={{padding:"8px 8px 0",display:"flex",gap:10,flexWrap:"wrap",fontSize:9,color:t.sub}}>
      <span>🔴 Venezuela/Cuba</span><span>🔵 US bases</span><span>- - Southern Spear AO (approximate)</span>
    </div>
    <div style={{padding:"6px 8px 0",fontSize:9.5,color:t.sub,opacity:.7}}>Land borders plotted at true coordinates. The shaded operating area is illustrative, based on SOUTHCOM/press reporting, not an official boundary.</div>
  </Card>;
}

function LevantMap({t}){
  const sea=t.isDark?"#08131f":"#dbeafe";
  const land=t.isDark?"#16212e":"#e2e8f0";
  const edge=t.isDark?"#2c3c4f":"#94a3b8";
  const SIDE_COLOR={isr:"#3b82f6",lbn:"#f97316",syr:"#dc2626",jor:"#94a3b8",gaza:"#eab308"};
  const litaniPath=LITANI_RIVER.map((pt,i)=>`${i?"L":"M"}${LVX(pt[1]).toFixed(1)},${LVY(pt[0]).toFixed(1)}`).join(" ");
  return <Card t={t} style={{padding:"12px 8px 8px"}}>
    <div style={{padding:"0 8px 8px",display:"flex",alignItems:"baseline",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
      <div style={{fontSize:12,fontWeight:700,color:t.text}}>Israel & the Levant — Geographic Reference</div>
      <div style={{fontSize:10,color:t.sub}}>to scale · Litani course approximate</div>
    </div>
    <div style={{width:"100%",overflow:"hidden",borderRadius:10}}>
    <svg viewBox={`0 0 ${LV_MAP.W} ${LV_MAP.H}`} style={{width:"100%",height:"auto",display:"block",background:sea}} role="img" aria-label="Map of Israel, Lebanon, Syria, Jordan and Gaza showing Tel Aviv, Jerusalem, Beirut, Damascus, Amman and Gaza City, with the Litani River marking Lebanon's security-zone boundary.">
      {["ISR","LBN","SYR","JOR","EGY","PSE"].map(code=><path key={code} d={LV_PATHS[code]} fill={land} stroke={edge} strokeWidth="1"/>)}
      <path d={litaniPath} fill="none" stroke="#22d3ee" strokeWidth="1.6" opacity="0.8"/>
      <rect x={LVX(GAZA_BBOX.lon0)} y={LVY(GAZA_BBOX.lat1)} width={LVX(GAZA_BBOX.lon1)-LVX(GAZA_BBOX.lon0)} height={LVY(GAZA_BBOX.lat0)-LVY(GAZA_BBOX.lat1)} fill="#eab308" fillOpacity="0.35" stroke="#eab308" strokeWidth="1"/>
      {LEV_CITIES.map(o=><g key={o.n}>
        <circle cx={LVX(o.lon)} cy={LVY(o.lat)} r="3.2" fill={SIDE_COLOR[o.side]} stroke={sea} strokeWidth="0.8"/>
        <text x={LVX(o.lon)+5} y={LVY(o.lat)+3} fill={t.text} fontSize="8" fontWeight="600" fontFamily={FONT}>{o.n}</text>
      </g>)}
    </svg>
    </div>
    <div style={{padding:"8px 8px 0",display:"flex",gap:10,flexWrap:"wrap",fontSize:9,color:t.sub}}>
      <span>🟨 Gaza Strip</span><span>— Litani River (Lebanon security-zone line)</span>
    </div>
    <div style={{padding:"6px 8px 0",fontSize:9.5,color:t.sub,opacity:.7}}>Land borders plotted at true coordinates. Gaza Strip shown as a bounding box (source data lacks its own boundary); Litani course simplified from major bends.</div>
  </Card>;
}

function IndiaPakistanMap({t}){
  const sea=t.isDark?"#08131f":"#dbeafe";
  const land=t.isDark?"#16212e":"#e2e8f0";
  const edge=t.isDark?"#2c3c4f":"#94a3b8";
  const SIDE_COLOR={ind:"#f97316",pak:"#22c55e"};
  const locPath=LOC_PATH.map((pt,i)=>`${i?"L":"M"}${IPX(pt[1]).toFixed(1)},${IPY(pt[0]).toFixed(1)}`).join(" ");
  return <Card t={t} style={{padding:"12px 8px 8px"}}>
    <div style={{padding:"0 8px 8px",display:"flex",alignItems:"baseline",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
      <div style={{fontSize:12,fontWeight:700,color:t.text}}>Kashmir & the Line of Control — Geographic Reference</div>
      <div style={{fontSize:10,color:t.sub}}>to scale · LoC approximate</div>
    </div>
    <div style={{width:"100%",overflow:"hidden",borderRadius:10}}>
    <svg viewBox={`0 0 ${IP_MAP.W} ${IP_MAP.H}`} style={{width:"100%",height:"auto",display:"block",background:sea}} role="img" aria-label="Map of India and Pakistan showing Srinagar, Jammu, Islamabad, Muzaffarabad, Leh and Kargil, with the approximate Line of Control dividing Indian- and Pakistani-administered Kashmir.">
      {["CHN","AFG"].map(code=><path key={code} d={IP_PATHS[code]} fill={land} stroke={edge} strokeWidth="1"/>)}
      <path d={IP_PATHS.IND} fill={t.isDark?"#2e2414":"#ffedd5"} stroke="#f97316" strokeWidth="1.2"/>
      <path d={IP_PATHS.PAK} fill={t.isDark?"#14261a":"#dcfce7"} stroke="#22c55e" strokeWidth="1.2"/>
      <path d={locPath} fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="6 3"/>
      {IP_CITIES.map(o=><g key={o.n}>
        <circle cx={IPX(o.lon)} cy={IPY(o.lat)} r="3.2" fill={SIDE_COLOR[o.side]} stroke={sea} strokeWidth="0.8"/>
        <text x={IPX(o.lon)+5} y={IPY(o.lat)+3} fill={t.text} fontSize="8" fontWeight="600" fontFamily={FONT}>{o.n}</text>
      </g>)}
    </svg>
    </div>
    <div style={{padding:"8px 8px 0",display:"flex",gap:10,flexWrap:"wrap",fontSize:9,color:t.sub}}>
      <span>🟧 India</span><span>🟩 Pakistan</span><span>- - Line of Control (approximate)</span>
    </div>
    <div style={{padding:"6px 8px 0",fontSize:9.5,color:t.sub,opacity:.7}}>Land borders plotted at true coordinates. The LoC is undefined near Siachen Glacier and is drawn here from published reference points, not survey data.</div>
  </Card>;
}

function PakAfghanMap({t}){
  const sea=t.isDark?"#08131f":"#dbeafe";
  const land=t.isDark?"#16212e":"#e2e8f0";
  const edge=t.isDark?"#2c3c4f":"#94a3b8";
  const SIDE_COLOR={afg:"#dc2626",pak:"#22c55e",border:"#eab308"};
  return <Card t={t} style={{padding:"12px 8px 8px"}}>
    <div style={{padding:"0 8px 8px",display:"flex",alignItems:"baseline",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
      <div style={{fontSize:12,fontWeight:700,color:t.text}}>Pakistan–Afghanistan & the Durand Line — Geographic Reference</div>
      <div style={{fontSize:10,color:t.sub}}>to scale · real coordinates</div>
    </div>
    <div style={{width:"100%",overflow:"hidden",borderRadius:10}}>
    <svg viewBox={`0 0 ${PA_MAP.W} ${PA_MAP.H}`} style={{width:"100%",height:"auto",display:"block",background:sea}} role="img" aria-label="Map of Pakistan and Afghanistan showing Kabul, Islamabad, Peshawar, Kandahar, Quetta, Jalalabad, Torkham crossing and Spin Boldak along the Durand Line border.">
      {["IRN","IND"].map(code=><path key={code} d={PA_PATHS[code]} fill={land} stroke={edge} strokeWidth="1"/>)}
      <path d={PA_PATHS.AFG} fill={t.isDark?"#241a1a":"#fee2e2"} stroke="#dc2626" strokeWidth="1.4"/>
      <path d={PA_PATHS.PAK} fill={t.isDark?"#14261a":"#dcfce7"} stroke="#22c55e" strokeWidth="1.4"/>
      {PA_CITIES.map(o=><g key={o.n}>
        <circle cx={PAX(o.lon)} cy={PAY(o.lat)} r="3.2" fill={SIDE_COLOR[o.side]} stroke={sea} strokeWidth="0.8"/>
        <text x={PAX(o.lon)+5} y={PAY(o.lat)+3} fill={t.text} fontSize="8" fontWeight="600" fontFamily={FONT}>{o.n}</text>
      </g>)}
      <text x={PAX(65)} y={PAY(33)} fill={t.sub} fontSize="10" fontWeight="800" letterSpacing=".06em" fontFamily={FONT}>AFGHANISTAN</text>
      <text x={PAX(68)} y={PAY(28)} fill={t.sub} fontSize="10" fontWeight="800" letterSpacing=".06em" fontFamily={FONT}>PAKISTAN</text>
    </svg>
    </div>
    <div style={{padding:"8px 8px 0",display:"flex",gap:10,flexWrap:"wrap",fontSize:9,color:t.sub}}>
      <span>🟥 Afghanistan</span><span>🟩 Pakistan</span><span>🟨 Border crossing</span>
    </div>
    <div style={{padding:"6px 8px 0",fontSize:9.5,color:t.sub,opacity:.7}}>Borders plotted at true coordinates. The Pakistan-Afghanistan border shown is the 1893 Durand Line, which Afghanistan has never formally recognized.</div>
  </Card>;
}

function IranSection({t,initialTab}){
  const[tab,setTab]=useState(initialTab??"overview");useEffect(()=>{if(initialTab)setTab(initialTab);},[initialTab]);
  const[briefExpanded,setBriefExpanded]=useState(false);
  const conflict=CONFLICTS.find(c=>c.id==="iran");
  const events=EVENTS.iran??[];
  const news=NEWS.filter(n=>n.conflictId==="iran");
  const TABS=[{id:"overview",label:"🇮🇷 Overview"},{id:"hormuz",label:"🚢 Hormuz"},{id:"timeline",label:"📅 Timeline"},{id:"gaps",label:"⚠️ Gaps"}];
  const GAPS=[
  {icon:"🚢",label:"Hormuz governance & routes",status:"KINETIC",color:"#dc2626",text:"The gap that ignited Jul 6-8: Iran insists shipping use its designated northern route under Iranian control and is negotiating a 'service fee' framework with Oman; Washington insists the strait is international water and will not tolerate tolls or route regimes. Iran enforced its rules with missiles; the US answered with two strike waves. The MoU text obliges Iran to keep the strait open and toll-free through the 60-day window — both sides now claim the other broke it."},
    {icon:"☢️",label:"Enrichment",status:"UNRESOLVED",color:"#ef4444",text:"US demands zero enrichment. Iran insists on its right to enrich under NPT. No bridge found in Lucerne. This is the core gap."},
    {icon:"🔍",label:"IAEA access to bombed sites",status:"THREATENED",color:"#dc2626",text:"US: Iran must allow IAEA to inspect bombed Natanz, Fordow, Isfahan. Iran: inspections only after sanctions relief — classic sequencing deadlock. Now sharper: CNN/Institute for Science and International Security satellite imagery (published Jul 10, shots from Jun 22–Jul 7) shows Iran repairing bomb-impact holes and reinforcing concrete at the Taleghan 2 facility inside Parchin, plus vehicle traffic at the underground Pickaxe Mountain site — activity ISIS founder David Albright called 'significant, new attempted reconstruction.' No comparable rebuilding was seen at Natanz, Fordow or Isfahan. Jul 21: Trump moved from monitoring to explicit threat, saying there is 'nothing' Iran can do to stop the US from attacking Pickaxe Mountain 'very heavily' — the clearest signal yet that a suspected covert site, not just the declared ones, is now a live target."},
    {icon:"🚀",label:"Missile programme",status:"IRAN RED LINE",color:"#ef4444",text:"Pezeshkian: the discussion over our missiles does not exist in the MoU, and it never will. Tehran absolute red line. US insists missiles are a requirement."},
    {icon:"🇱🇧",label:"Lebanon / Hezbollah",status:"COMPLICATING",color:"#f97316",text:"Israel-Hezbollah fighting ongoing. Iran demands Lebanon fighting stops as part of any final deal. Israel is not party to MoU — Netanyahu and Trump do not always see eye to eye."},
    {icon:"🇾🇪",label:"Houthi maritime embargo",status:"ESCALATING",color:"#dc2626",text:"The Houthis announced a maritime embargo Jul 20 in solidarity with Iran, then escalated Jul 21 to declare it specifically against Saudi Arabia — threatening the Bab-el-Mandeb Strait on top of Hormuz. A full Bab-el-Mandeb closure could force most Saudi oil exports to reroute and cut global supply by a further ~7%, on top of the ~10% the Iran war has already removed. Not a party to the MoU, but with an established track record of Red Sea shipping attacks."},
    {icon:"💰",label:"Sanctions relief",status:"SEQUENCING",color:"#eab308",text:"Iran: sanctions relief first, then IAEA access. US: IAEA verification first, then sanctions. Sequencing disagreement mirrors 2015 JCPOA negotiations."},
  ];
  const TB={padding:"5px 10px",fontSize:11,borderRadius:16,cursor:"pointer",fontFamily:FONT,fontWeight:600};
  return <div>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
      {TABS.map(tb=><button key={tb.id} onClick={()=>setTab(tb.id)} style={{...TB,background:tab===tb.id?"#8b5cf6":"none",color:tab===tb.id?"#fff":t.sub,border:`1px solid ${tab===tb.id?"#8b5cf6":t.border}`}}>{tb.label}</button>)}
    </div>
    {tab==="overview"&&<div>
      <div style={{background:t.isDark?"linear-gradient(135deg,#1a0f24,#241238)":"linear-gradient(135deg,#f3ecfb,#ece3f8)",border:"1px solid rgba(139,92,246,0.25)",borderLeft:"4px solid #8b5cf6",borderRadius:14,padding:"14px 16px",marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <span style={{width:8,height:8,borderRadius:"50%",background:"#22c55e",display:"inline-block",flexShrink:0}}/>
          <span style={{fontSize:11,fontWeight:700,color:t.text,letterSpacing:".04em"}}>🤖 AI DAILY — IRAN WAR ANALYSIS</span>
          <span style={{marginLeft:"auto",fontSize:10,color:t.sub}}>{new Date(IRAN_BRIEFING.generatedAt).toLocaleDateString([],{month:"short",day:"numeric"})}</span>
        </div>
        <div style={{fontSize:12.5,color:t.text,lineHeight:1.6,marginBottom:12}}>{IRAN_BRIEFING.summaryShort}</div>
        <div style={{fontSize:11,color:t.sub,fontStyle:"italic",paddingTop:10,paddingBottom:2,borderTop:`1px solid ${t.isDark?"rgba(255,255,255,.08)":"rgba(0,0,0,.08)"}`,marginBottom:10}}>
          👁 <strong style={{color:t.text,fontStyle:"normal"}}>Watch: </strong>{IRAN_BRIEFING.watch}
        </div>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>setBriefExpanded(e=>!e)} aria-expanded={briefExpanded} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,background:"none",border:`1px solid ${t.border}`,borderRadius:8,padding:"7px 10px",cursor:"pointer",color:"#8b5cf6",fontSize:11,fontWeight:700,fontFamily:FONT,letterSpacing:".03em"}}>
            {briefExpanded?"▲ Show Less":"📝 Read Full Analysis"}
          </button>
          <ReadAloudButton text={[IRAN_BRIEFING.summary,...IRAN_BRIEFING.assessment.map(a=>`${a.cat}: ${a.text}`)].join(". ")} color="#8b5cf6" t={t}/>
        </div>
        {briefExpanded&&<div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${t.isDark?"rgba(255,255,255,.08)":"rgba(0,0,0,.08)"}`}}>
          <div style={{fontSize:12.5,color:t.text,lineHeight:1.6,marginBottom:12}}>{IRAN_BRIEFING.summary}</div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {IRAN_BRIEFING.assessment.map((a,i)=><div key={i} style={{display:"flex",gap:8,fontSize:11.5}}>
              <span style={{color:"#8b5cf6",fontWeight:700,minWidth:110,flexShrink:0}}>{a.cat}</span>
              <span style={{color:t.sub,lineHeight:1.5}}>{a.text}</span>
            </div>)}
          </div>
        </div>}
      </div>
      <ConflictOverviewCard conflict={conflict} t={t}/>
      <Hero t={t} style={{borderLeft:"4px solid #8b5cf6"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🚨 War Reignites — Five-Night Pause Ends, Egypt & Saudi Arabia Drawn In</div>
        <Grid2 t={t} items={[{val:"More wounded",label:"US troops",sub:"Jul 30 \u2014 additional wounded reported, toll still forming",color:"#dc2626"},{val:"Kuwait/Jordan/Bahrain",label:"Iran\u2019s retaliation",sub:"Broader than first reported after the Qeshm strike",color:"#dc2626"},{val:"Under review",label:"Qeshm strike",sub:"CENTCOM reviewing strike that killed a family of 3",color:"#f97316"},{val:"13 days",label:"MoU clock (nominal)",sub:"Overtaken by events on the ground",color:"#8b5cf6"}]}/>
      </Hero>
      <ST t={t}>📡 Key Intelligence</ST>
      <Card t={t}>{[{icon:"📜",label:"Islamabad Memorandum",text:"Signed Jun 17. Pakistan brokered; Qatar, Saudi Arabia, Turkey, Egypt facilitated. 60-day window covers nuclear program, Hormuz shipping, sanctions, missiles, Lebanon."},{icon:"🚢",label:"Hormuz: live-fire zone again",text:"Iran struck three tankers Jul 6-7 (Marshall Islands-flagged Al Rekayyat, Saudi Wedyan, Liberian Cyprus Prosperity) for using non-designated routes. US answered with 80+ targets Jul 7 and a second round Jul 8 (Sirik, Bushehr, Konarak, Chabahar, Kish). IRGC claims strikes on 85 US military sites in Bahrain and Kuwait."},{icon:"🇾🇪",label:"Houthis join the conflict",text:"The Houthis announced a maritime embargo Jul 20 in solidarity with Iran, adding a further armed actor with a track record of Red Sea shipping attacks — a real risk of the war spreading to a second maritime chokepoint."},{icon:"☢️",label:"Nuclear: IAEA inspectors",text:"MoU allows IAEA inspectors back into Iran. But Iran and US in dispute over whether bombed sites must be opened before or after sanctions relief."},{icon:"⚠️",label:"MoU state of play",text:"The war has widened since the Jul 29-30 re-escalation: a US strike killed an Iranian family of three on Qeshm island (CENTCOM now reviewing it), and Iran's retaliation hit US-linked targets across Kuwait, Jordan and Bahrain — broader than first reported. Iran has since officially denied any role in the Egypt tanker incident. Trump says he's 'losing faith' with Iran but hasn't ruled out a deal. Enrichment, missiles and Hormuz governance remain unbridged — 13 days to Aug 16."}].map((item,i,a)=><div key={i} style={{display:"flex",gap:10,padding:"11px 14px",borderBottom:i<a.length-1?`.5px solid ${t.sep}`:0}}><span style={{fontSize:20,flexShrink:0}}>{item.icon}</span><div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:3}}>{item.label}</div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{item.text}</div></div></div>)}
      </Card>
      {news.map(item=><Card key={item.id} t={t} style={{borderLeft:`4px solid ${item.impactColor}`}}><div style={{padding:"11px 14px"}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6,flexWrap:"wrap"}}><Pill label={item.conflict} color={item.conflictColor}/><span style={{fontSize:10,color:t.sub}}>{item.publishedAt}</span><ConfidenceTag level={item.confidence}/><Freshness t={t} date={item.publishedAt}/></div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:6}}>{item.headline}</div>{item.bullets.map((b,i)=><div key={i} style={{display:"flex",gap:6,fontSize:12,color:t.sub,marginBottom:4,lineHeight:1.5}}><span style={{color:item.impactColor,flexShrink:0}}>▸</span>{b}</div>)}<div style={{fontSize:11,color:item.impactColor,fontWeight:600,marginTop:6}}>{item.impact}</div></div></Card>)}
    </div>}
    {tab==="timeline"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #8b5cf6"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>📅 US-Iran War 2026 — Full Timeline</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>From Operation Epic Fury (Feb 28) through the Islamabad MoU and the 16-day countdown to Aug 16.</div>
      </Hero>
      <EventsTimeline t={t} events={events} label="US-Iran War Timeline"/>
    </div>}
    {tab==="gaps"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #ef4444"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>⚠️ Unresolved Gaps — 17 Days Remain</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Six fundamental disagreements remain unbridged. The sixth — who controls Hormuz — has already turned kinetic.</div>
      </Hero>
      {GAPS.map((g,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${g.color}`}}><div style={{padding:"11px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontSize:18}}>{g.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text,flex:1}}>{g.label}</div><Pill label={g.status} color={g.color}/></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{g.text}</div></div></Card>)}
    </div>}

    {tab==="hormuz"&&<div>
      <Hero t={t} color="#0e7490"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#22d3ee",marginBottom:6}}>🚢 THE HORMUZ BLOCKADE</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>The strait — the artery for roughly a fifth of global oil — is under dueling regimes: Iran claims sole control and strikes "non-compliant" vessels; the US has imposed a formal naval blockade of the entire Iranian coastline, effective 20:00 GMT Jul 14. Every transit is now a live test of two competing claims to the same water.</div></Hero>
      <HormuzMap t={t}/>
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
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:6}}>
        <ReadAloudButton text={"Jul 14, blockade declared — CENTCOM formalized the naval blockade of Iran's entire coastline. Jul 15-16, two enforcement strikes — the tanker M/T Belma was hit with Hellfire fire after ignoring warnings; a second vessel was disabled as the campaign widened into northern Iran. Jul 18-19, Jordan attack — Iranian strikes on US forces in Jordan were confirmed as 3 US service members killed. Jul 20, ninth night — the Houthis joined with their own maritime embargo; Hormuz daily crossings collapsed to roughly 9 vessels versus a 130 per day pre-war average. Jul 21, tenth night — a US service member was confirmed killed at Erbil Air Base; the Houthis escalated their embargo to target Saudi Arabia specifically. Jul 22, eleventh night — the Houthis declared Bab el-Mandeb off limits to Saudi Arabia, threatening a second chokepoint. Jul 23, twelfth night — Brent crude topped 100 dollars a barrel, and Trump threatened to destroy Iranian infrastructure every time a ship is hit in the strait."} color="#0e7490" t={t}/>
      </div>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Jul 14 — blockade declared</span> — CENTCOM formalized the naval blockade of Iran's entire coastline at 20:00 GMT, superseding the looser designated-route enforcement Iran had been running unilaterally since early July.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Jul 15-16 — two enforcement strikes</span> — The M/T Belma ignored warnings toward Kharg Island and was hit with Hellfire fire Jul 15; a second vessel attempting to run the blockade was disabled Jul 16 as the campaign widened into northern Iran for the first time.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Jul 18-19 — Jordan attack, US toll revised to 3 dead</span> — Iranian strikes on US forces in Jordan, initially reported as 2 killed/1 missing, were confirmed Jul 19 as 3 US service members killed — the first American combat fatalities of this round since March. The Pentagon separately disclosed nearly 100 troops injured (96% returned to duty) since Jul 7, pushing back on reports of undercounted casualties.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Jul 20 — ninth night, Houthis join, traffic collapses</span> — Strikes hit Abadan and Tabriz (the widest geographic spread yet) as the Houthis announced their own maritime embargo in solidarity with Iran. Hormuz daily crossings have fallen to roughly 9 vessels versus a ~130/day pre-war average; Brent crude jumped to ~$91/bbl. UK and French patrol offers remain rejected by Iran's chief negotiator, who asserts only coastal states control Hormuz security.</div>
        <div><span style={{color:t.text,fontWeight:700}}>Jul 21 — tenth night, Erbil death confirmed, ceasefire floated</span> — A US service member, Sgt. Michael Swinton, was confirmed killed in a controlled drone-detonation at Erbil Air Base, Iraq — separate from the Jordan strike casualties; Iranian authorities say 95 locations across 12 cities have been hit over 10 days, with Hegseth estimating the war's cost to the US at $37.5B. Iran attacked another tanker in Hormuz; the Houthis escalated their embargo to specifically target Saudi Arabia. Trump called Iran 'desperate' to talk while threatening to hit 'Pickaxe Mountain' — a reported new nuclear site — 'very heavily'; regional mediators reportedly floated a 10-day ceasefire proposal to both sides.</div>
        <div style={{marginTop:6}}><span style={{color:t.text,fontWeight:700}}>Jul 22 — eleventh night, a second chokepoint closes</span> — Strikes hit seven provinces including an electrical installation near the Bushehr nuclear plant. Iran attacked another tanker in the strait, pushing Brent past $92/bbl. The Houthis declared Bab el-Mandeb off limits to Saudi Arabia and warned shipping away — ~2.5M barrels/day at risk, six ships turned course, Saudi-loaded tankers backed out. With Hormuz effectively closed and Bab el-Mandeb now threatened, two of the region's critical chokepoints are compromised at once.</div>
        <div style={{marginTop:6}}><span style={{color:t.text,fontWeight:700}}>Jul 23 — twelfth night, Brent tops $100, Tehran directly threatened</span> — The US flew a B-1 bomber for the first time this phase of the war. Brent crossed $100/bbl, up ~$13 in a week; Trump threatened to destroy an Iranian bridge or power plant, including in Tehran, every time Iran hits a ship in the strait. The Houthis moved from declaring an embargo to actually attacking Saudi-bound tankers; US forces say they've redirected 12 vessels since resuming the blockade. The House adopted a $95B war-funding package.</div>
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
    {icon:"📉",label:"Refinery-driven inflation",color:"#eab308",text:"Ukrainian deep strikes have knocked ~40% of Russian refining capacity offline, driving fuel shortages — though CBR has cut its key rate to 14.00% (10th straight cut) as annual inflation eased to ~5.9% by late July."},
    {icon:"👥",label:"Mobilisation strain",color:"#f97316",text:"Russia is losing ~40,000/month — more than it recruits since Nov 2025 per the Telegraph. Wage inflation remains elevated; NWF liquid assets sit at ~$46.4B, down two-thirds from $113.5B pre-war but not currently in freefall."},
  ];
  const NUCLEAR_FACTS=[
    {icon:"🚀",label:"Delivery systems",text:"Iskander-M tactical missile systems (dual-capable, conventional or nuclear) confirmed deployed to Belarus. Belarus's Su-25 fleet was also reportedly modified for nuclear delivery."},
    {icon:"🔢",label:"Warhead count — undisclosed",text:"Neither Moscow nor Minsk has confirmed a number. Independent estimates (SIPRI, FAS) generally describe a small tactical arsenal — likely low double digits — but this is inference, not disclosure."},
    {icon:"🏛️",label:"Legal basis",text:"Lukashenko and Putin frame this under the Union State treaty framework — Belarus argues it retains 'control' while Russia controls launch authority, echoing NATO's own nuclear-sharing arrangements (see Great Powers → NATO tab)."},
    {icon:"🌍",label:"NATO response",text:"NATO has not repositioned its own nuclear posture in response, but cites the deployment as justification for continued Eastern Flank reinforcement."},
  ];
  const BEL_EVENTS=[
    {id:1,date:"Feb 2022",label:"Launchpad for invasion",note:"Belarus allowed Russia to stage the initial 2022 invasion from its territory.",color:"#ef4444"},
    {id:2,date:"2023",label:"Russian tactical nukes deployed",note:"Belarus agreed to host Russian tactical nuclear weapons — first deployment outside Russia since the USSR collapsed.",color:"#ef4444"},
    {id:3,date:"Jun 19, 2026",label:"Zelensky 7-day ultimatum",note:"Ukraine gave Minsk one week to dismantle Shahed relay stations or face strikes.",color:"#f97316"},
    {id:4,date:"Jun 22, 2026",label:"Relay shutdown",note:"Guidance equipment ceased operations ahead of the deadline — partial compliance; full dismantlement remains unconfirmed weeks later.",color:"#22c55e"},
    {id:5,date:"Jun 26-27, 2026",label:"Secret Valdai summit",note:"Putin-Lukashenko 2-day talks. WSJ: second-front pressure. No communique issued.",color:"#ef4444"},
    {id:6,date:"Jul 6, 2026",label:"Lukashenko: \u2018no one will send you into this slaughter\u2019",note:"Public reassurance to Belarusian military academy graduates that troops will not be deployed to Ukraine, while blaming a Western \u2018war party\u2019 for prolonging the conflict.",color:"#eab308"},
    {id:7,date:"~Jul 18, 2026",label:"Bryansk bus strike accusation, Zelensky radar threat",note:"Lukashenko accused Ukraine of a drone strike hitting a Belarusian youth soccer team\u2019s bus in Russia\u2019s Bryansk region; Zelensky threatened to strike radar stations inside Belarus, then stood down after Belarus reportedly deactivated them.",color:"#ef4444"},
    {id:8,date:"Jul 25, 2026",label:"Second Lukashenko-Putin meeting; Belousov visits Minsk",note:"Lukashenko traveled to Russia for an unannounced Putin meeting the same day Russian Defense Minister Belousov met his Belarusian counterpart Khrenin in Minsk — the second high-level Moscow-Minsk contact in a month, alongside Lukashenko\u2019s own de-escalation signals toward the West.",color:"#ef4444"},
  ];
  const TB={padding:"5px 10px",fontSize:11,borderRadius:16,cursor:"pointer",fontFamily:FONT,fontWeight:600};
  return <div>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
      {[{id:"overview",label:"🇧🇾 Overview"},{id:"basing",label:"🪖 Mobilization & Basing"},{id:"nuclear",label:"☢️ Nuclear Hosting"},{id:"homefront",label:"🏠 Home Front"},{id:"timeline",label:"📜 Timeline"}].map(tb=><button key={tb.id} onClick={()=>setTab(tb.id)} style={{...TB,background:tab===tb.id?"#f97316":"none",color:tab===tb.id?"#fff":t.sub,border:`1px solid ${tab===tb.id?"#f97316":t.border}`}}>{tb.label}</button>)}
    </div>
    {tab==="overview"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #f97316"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:28}}>🇧🇾</span><div><div style={{fontSize:16,fontWeight:800,color:"#fff"}}>Belarus</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}><Pill label="CO-BELLIGERENT" color="#f97316"/><Pill label="Union State" color="#ef4444"/></div></div></div>
        <div style={{fontSize:13,color:"rgba(255,255,255,.75)",lineHeight:1.6,marginBottom:12}}>ISW assesses Belarus as effectively a co-belligerent. Minsk has avoided sending troops, but it hosts Russian tactical nukes, provided launch territory in 2022, and operated Shahed guidance relays until Ukraine's June ultimatum forced a shutdown. Lukashenko continues walking a tightrope — reassuring his own military it won't be deployed while making a second Kremlin visit in a month as Russian Defense Minister Belousov met his Belarusian counterpart in Minsk the same day.</div>
        <Grid2 t={t} items={[{val:"Jul 25",label:"2nd Lukashenko-Putin meeting",sub:"Belousov in Minsk same day",color:"#ef4444"},{val:"Jun 22",label:"Relay shutdown",sub:"Partial compliance",color:"#22c55e"},{val:"Unconfirmed",label:"Full dismantlement",sub:"Weeks past the ultimatum window",color:"#f97316"},{val:"Yes",label:"Hosts RU tac-nukes",sub:"Since 2023",color:"#ef4444"}]}/>
      </Hero>
      {news.map(item=><Card key={item.id} t={t} style={{borderLeft:`4px solid ${item.impactColor}`}}><div style={{padding:"12px 14px"}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6,flexWrap:"wrap"}}><Pill label={item.conflict} color={item.conflictColor}/><span style={{fontSize:10,color:t.sub}}>{item.publishedAt}</span><ConfidenceTag level={item.confidence}/><Freshness t={t} date={item.publishedAt}/></div><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:6}}>{item.headline}</div>{item.bullets.map((b,i)=><div key={i} style={{display:"flex",gap:6,fontSize:12,color:t.sub,marginBottom:4,lineHeight:1.5}}><span style={{color:item.impactColor,flexShrink:0}}>▸</span>{b}</div>)}<div style={{fontSize:11,color:item.impactColor,fontWeight:600,marginTop:6}}>{item.impact}</div></div></Card>)}
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
  const[tab,setTab]=useState(initialTab??"escalation");useEffect(()=>{if(initialTab)setTab(initialTab);},[initialTab]);
  const[escExpanded,setEscExpanded]=useState(false);
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
  const indopacSorted=useMemo(()=>[...INDOPAC_BALANCE].sort((a,b)=>(parseFloat(String(b.budget).replace(/[^0-9.]/g,""))||0)-(parseFloat(String(a.budget).replace(/[^0-9.]/g,""))||0)),[]);
  const TABS=[{id:"escalation",label:"🌐 Escalation Risk"},{id:"china",label:"🇨🇳 China Deep Dive"},{id:"systems",label:"🚀 Systems"},{id:"posture",label:"🌍 Posture"},{id:"nato",label:"🤝 NATO & Allies"},{id:"rankings",label:"🌐 Global Rankings"},{id:"indopac",label:"🌏 Indo-Pacific Balance"},{id:"fighters5g",label:"✈️ 5th-Gen Fighters"},{id:"navypipe",label:"🚢 Naval Pipeline"},{id:"space",label:"🛰️ Space & Counterspace"},{id:"minerals",label:"⛏️ Critical Minerals"},{id:"arctic",label:"🧊 Arctic"},{id:"defindustry",label:"🏭 Defense Industry"},{id:"dprk",label:"🇰🇵 DPRK-Russia Axis"},{id:"vectors",label:"⚠️ Active Vectors"},{id:"arsenals",label:"🌐 Global Arsenals"},{id:"delivery",label:"🚀 Delivery Systems"},{id:"treaties",label:"📜 Treaties & Doctrine"},{id:"cyber",label:"🌪️ Cyber & Hybrid"}]

  // ── merged from former Strategic & Hybrid (Nuclear) section ──
  const VECTORS=[
    {flag:"🇷🇺",name:"Russia — Strategic Signalling",status:"ACTIVE",color:"#ef4444",text:"Largest arsenal on earth. Putin has repeatedly invoked nuclear rhetoric. IC consensus (Jun 2026): threats are coercive, not operational — any use would forfeit Chinese support, Putin's true red line."},
    {flag:"🇧🇾",name:"Belarus — Forward-Based Tac-Nukes",status:"DEPLOYED",color:"#f97316",text:"Hosts Russian tactical nuclear weapons since 2023 — first deployment outside Russia since the USSR. Russia has now started building a forward-operating base in Belarus for its dual-capable Oreshnik IRBM (SIPRI); Oreshnik has already struck Ukraine with conventional warheads, most recently May 2026. Separately, Russia claims a 2025 successful 14,000km test of the nuclear-powered Burevestnik cruise missile after repeated failures."},
    {flag:"🇮🇷",name:"Iran — Nuclear Clock",status:"21 DAYS",color:"#8b5cf6",text:"Islamabad MoU 60-day window closes ~Aug 16. IAEA inspector access disputed. Enrichment red lines unresolved — Pezeshkian: 'we will never back down from the right to enrich uranium.'"},
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
    {icon:"🤝",label:"NATO Nuclear Sharing",color:"#5b8ec8",text:"US tactical weapons are forward-deployed under dual-key arrangements in Belgium, Germany, Italy, the Netherlands, and Turkey — host nations maintain delivery aircraft, but launch authority remains exclusively American. Full detail in Great Powers → NATO & Allies tab."},
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

  
;

  const PEERS=[
    {flag:"🇺🇸",name:"United States",color:"#5b8ec8",personnel:"~1.32M active + 800K reserve",budget:"~$895B (FY26 enacted)",carriers:"11 supercarriers (all nuclear-powered)",fighters5gen:"~630 (F-22 + F-35A/B/C)",nuclearTriad:"Complete — Ohio SSBNs, B-2/B-21, Minuteman III silos",satellites:"~250 military/ISR satellites — dominant"},
    {flag:"🇨🇳",name:"China",color:"#ef4444",personnel:"~2.0M active (world's largest)",budget:"~$235B official (DoD/SIPRI estimate actual spend 40-90% higher)",carriers:"3 (Liaoning, Shandong, Fujian — Fujian commissioned Nov 2025, working toward full operational capability)",fighters5gen:"~250+ J-20, J-35 carrier variant emerging",nuclearTriad:"Rapidly expanding — 350+ new silos identified since 2021",satellites:"~140 ISR/military satellites — fastest-growing fleet"},
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
    {icon:"⚓",name:"PLA Navy (PLAN)",color:"#ef4444",text:"World's largest navy by hull count (~370+ vessels). 3 carriers, with Fujian (catapult-equipped, conventional-powered) commissioned Nov 2025 and now working toward full operational capability, including far-sea training, during 2026. Building Type 076 amphibious assault ships and a 4th carrier reportedly nuclear-powered."},
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
    {cls:"Aircraft Carriers",us:"Ford-class (11 in fleet, lead ship USS Gerald R. Ford; nuclear-powered, EMALS catapults)",china:"3 carriers — Liaoning & Shandong (ski-jump, operational); Fujian (catapult-equipped, conventional power) commissioned Nov 2025, working toward full operational capability in 2026",note:"US sustains continuous forward-deployed carrier presence across multiple theaters simultaneously; China's carrier force remains regionally focused and still building proficiency."},
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

    {tab==="china"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #ef4444"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>🇨🇳 PLA Deep Dive — Jun 2026</div>
        <Grid2 t={t} items={[
          {val:"2.0M",label:"Active personnel",sub:"World's largest standing force",color:"#ef4444"},
          {val:"370+",label:"PLAN hull count",sub:"World's largest navy by ships",color:"#ef4444"},
          {val:"350+",label:"New ICBM silos",sub:"Under construction since 2021",color:"#f97316"},
          {val:"3",label:"Aircraft carriers",sub:"Fujian commissioned Nov 2025, working toward full operational capability in 2026",color:"#eab308"},
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
      <Card t={t}><div style={{padding:"12px 14px"}}>{indopacSorted.map((c2,i,arr)=>{const n=parseFloat(String(c2.budget).replace(/[^0-9.]/g,""))||0;const max=parseFloat(String(arr[0].budget).replace(/[^0-9.]/g,""))||1;const w=Math.max(3,Math.sqrt(n/max)*100);return <div key={i} style={{marginBottom:i===arr.length-1?0:10}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:3}}><span style={{fontSize:12,fontWeight:600,color:t.text}}>{c2.flag} {c2.name}</span><span style={{fontSize:13,fontWeight:700,color:c2.color,fontVariantNumeric:"tabular-nums"}}>{c2.budget}</span></div><div style={{height:8,borderRadius:4,background:t.isDark?"rgba(255,255,255,.05)":"rgba(0,0,0,.06)",overflow:"hidden"}}><div style={{height:"100%",width:`${w}%`,borderRadius:4,background:`linear-gradient(90deg,${c2.color}88,${c2.color})`,transformOrigin:"left",animation:`barGrow .7s cubic-bezier(.22,1,.36,1) ${i*0.06}s both`}}/></div></div>;})}
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
      <Note t={t} color="#dc2626">⚠️ Jul 25-26: Zelensky says Russia is preparing to receive an additional 30,000 DPRK troops \u2014 nearly tripling the current deployment \u2014 with facilities being readied in Voronezh Oblast since June. North Korea is also reportedly preparing to send additional ballistic-missile transporter-erector-launchers. Not yet confirmed by Russian or North Korean officials; Kyiv frames it as tied to a feared autumn Russian offensive.</Note>
      <ST t={t} color="#ef4444">🔄 The Bargain</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>What Pyongyang sends</span> — Millions of 152mm/122mm artillery shells (the single largest external ammunition source for Russia), KN-23/24 short-range ballistic missiles used repeatedly against Ukrainian cities, and roughly 12,000 troops committed to retaking Kursk Oblast from late 2024 — North Korea's first large-scale combat deployment since the Korean War.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>What Moscow pays back</span> — Food and fuel shipments easing chronic DPRK shortages, but the strategic payload is technology transfer: Western and South Korean intelligence assess likely Russian assistance on ballistic missile guidance, satellite launch capability, and possibly submarine and air-defense systems — capabilities Pyongyang has struggled to master alone.</div>
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Kursk casualties</span> — DPRK troops took heavy losses in Kursk's open terrain, unfamiliar with drone-saturated modern combat. UK MoD and South Korean NIS estimates held near 6,000 killed/wounded from spring 2025 through early 2026 — a plateau — while Ukraine's HUR claimed the toll passed 7,000 by mid-2026, a figure that exceeds the Western estimate and isn't reconciled between sources (see the chart below for the full series). Either figure makes it by far North Korea's costliest military engagement in decades, yet Pyongyang has shown no sign of reducing its commitment.</div>
        <div><span style={{color:t.text,fontWeight:700}}>Why it matters beyond Ukraine</span> — The arrangement gives North Korea combat-tested troops, potential missile-tech uplift, and a great-power patron willing to shield it at the UN — durably changing the Korean Peninsula's risk calculus independent of how the Ukraine war ends.</div>
      </div></div></Card>
      <TrendChart t={t} data={HISTORICAL.dprkCasualties} color="#ef4444" label="DPRK Casualties in Kursk (cumulative)" unit="killed/wounded, Western vs Ukrainian estimates" desc="UK MoD/South Korean NIS estimated ~6,000 DPRK casualties from Apr 2025 through early 2026 — a plateau. Ukraine's HUR claimed 7,000+ by late June 2026, a figure that exceeds the Western estimate; shown as reported, not reconciled." />
      <Note t={t} color="#ef4444">Figures are Western/South Korean intelligence estimates (DIA, NIS, RUSI) — North Korea does not confirm troop or material commitments, and ranges are wide. Cross-reference: Arms Flow (NATO & Allies tab), the Delivery Systems tab (DPRK's own arsenal is tracked separately there).</Note>
    </div>}
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
    {tab==="escalation"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #dc2626"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>🌐 Global Escalation Risk Assessment</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>How many fronts are live, and whether any involve direct combat between the great powers whose own war would be systemic. Full analysis first, per-theater risk levels below.</div>
      </Hero>
      <ST t={t} color="#dc2626">🤖 AI Analysis</ST>
      <Card t={t}><div style={{padding:"14px 16px"}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
          <span style={{width:8,height:8,borderRadius:"50%",background:"#dc2626",display:"inline-block",flexShrink:0}}/>
          <span style={{fontSize:11,fontWeight:700,color:t.text,letterSpacing:".04em"}}>WORLD WAR 3 RISK ASSESSMENT</span>
          <span style={{marginLeft:"auto",fontSize:10,color:t.sub}}>{new Date(ESCALATION_BRIEFING.generatedAt).toLocaleDateString([],{month:"short",day:"numeric"})}</span>
        </div>
        <div style={{fontSize:12.5,color:t.text,lineHeight:1.6,marginBottom:12}}>{ESCALATION_BRIEFING.summaryShort}</div>
        <div style={{fontSize:11,color:t.sub,fontStyle:"italic",paddingTop:10,paddingBottom:2,borderTop:`1px solid ${t.isDark?"rgba(255,255,255,.08)":"rgba(0,0,0,.08)"}`,marginBottom:10}}>
          👁 <strong style={{color:t.text,fontStyle:"normal"}}>Watch: </strong>{ESCALATION_BRIEFING.watch}
        </div>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>setEscExpanded(e=>!e)} aria-expanded={escExpanded} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,background:"none",border:`1px solid ${t.border}`,borderRadius:8,padding:"7px 10px",cursor:"pointer",color:"#dc2626",fontSize:11,fontWeight:700,fontFamily:FONT,letterSpacing:".03em"}}>
            {escExpanded?"▲ Show Less":"📝 Read Full Analysis"}
          </button>
          <ReadAloudButton text={[ESCALATION_BRIEFING.summary,...ESCALATION_BRIEFING.assessment.map(a=>`${a.cat}: ${a.text}`)].join(". ")} color="#dc2626" t={t}/>
        </div>
        {escExpanded&&<div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${t.isDark?"rgba(255,255,255,.08)":"rgba(0,0,0,.08)"}`}}>
          <div style={{fontSize:12.5,color:t.text,lineHeight:1.6,marginBottom:12}}>{ESCALATION_BRIEFING.summary}</div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {ESCALATION_BRIEFING.assessment.map((a,i)=><div key={i} style={{display:"flex",gap:8,fontSize:11.5}}>
              <span style={{color:"#dc2626",fontWeight:700,minWidth:100,flexShrink:0}}>{a.cat}</span>
              <span style={{color:t.sub,lineHeight:1.5}}>{a.text}</span>
            </div>)}
          </div>
        </div>}
      </div></Card>
      <ST t={t} color="#dc2626">🚦 Per-Theater Risk Levels</ST>
      {ESCALATION_RISKS.map((r,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${r.color}`}}><div style={{padding:"11px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}><span style={{fontSize:18}}>{r.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text,flex:1}}>{r.theater}</div><Pill label={r.level} color={r.color}/></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{r.text}</div></div></Card>)}
    <ST t={t} color="#5b8ec8">⚖️ US vs. China — Power Comparison</ST>
      <Note t={t} color="#5b8ec8">Russia retains the world's largest nuclear stockpile but its conventional military has been substantially degraded by the Ukraine war (see Manpower tab). China is the only peer-tier competitor across most conventional categories.</Note>
      {PEERS.map((p,i)=><Card key={i} t={t} style={{borderLeft:`4px solid ${p.color}`}}><div style={{padding:"12px 14px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><span style={{fontSize:22}}>{p.flag}</span><div style={{fontSize:14,fontWeight:800,color:t.text}}>{p.name}</div></div>
        {[["Active personnel",p.personnel],["Defense budget",p.budget],["Carriers",p.carriers],["5th-gen fighters",p.fighters5gen],["Nuclear triad",p.nuclearTriad],["Military satellites",p.satellites]].map(([k,v],j)=><div key={j} style={{display:"flex",justifyContent:"space-between",gap:10,fontSize:12,padding:"4px 0",borderBottom:j<5?`.5px solid ${t.sep}`:0}}><span style={{color:t.sub,flexShrink:0}}>{k}</span><span style={{color:t.text,fontWeight:600,textAlign:"right"}}>{v}</span></div>)}
      </div></Card>)}
      <ST t={t} color="#5b8ec8">🏆 Category Leaders</ST>
      <Grid2 t={t} items={EDGE_CATEGORIES.map(e=>({val:e.val,label:e.label,sub:e.sub,color:e.color}))}/>
      <Note t={t} color="#5b8ec8">Budget and inventory figures blend DoD's annual China Military Power Report, SIPRI, and IISS Military Balance estimates. China's official defense budget is widely assessed by Western analysts as substantially understated.</Note>
      <Note t={t} color="#dc2626">Assessment synthesizes the per-theater data tracked elsewhere on this dashboard — not an independent intelligence product. Distinguishes live regional conflicts from direct great-power combat, which remains the decisive threshold for a systemic war.</Note>
    </div>}
    {tab==="cyber"&&<CyberSection t={t}/>}
  </div>;
}

const CYBER_THREATS={
  cables:[
    {icon:"🚨",label:"Bulgarian-flagged vessel — anchor-drag suspicion",date:"Jan 26, 2026",actor:"Unclear",color:"#dc2626",text:"Swedish coast guard boarded a Bulgarian-flagged vessel on suspicion of anchor-dragging and cable sabotage; Latvia sent a warship to investigate related cable damage. The owner denied involvement — no charges resulted, continuing the pattern of suspicion without successful prosecution."},
    {icon:"📡",label:"Sventoji–Liepāja cable — Lithuania/Latvia",date:"Jan 2, 2026",actor:"Unclear",color:"#dc2626",text:"An undersea telecoms cable linking Lithuania and Latvia (owned by Sweden's Arelion) was damaged. Latvian police boarded a docked vessel and opened proceedings, but by Jan 5 found no evidence tying the ship to the damage — case remains open, illustrating how rarely these incidents are conclusively attributed."},
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
  const TABS=[{id:"cuba",label:"🇨🇺 Cuba Blockade"},{id:"spear",label:"🚤 Southern Spear"},{id:"conflict",label:"🇻🇪 Venezuela"},{id:"mexico",label:"🇲🇽 Mexico"},{id:"haiti",label:"🇭🇹 Haiti"},{id:"colombia",label:"🇨🇴 Colombia"}];

  const CUBA_STATS=[
    {val:"3 in 8 days",label:"Island-wide blackouts",sub:"Jul 6, 10 & 14 — 5th total collapse of 2026, ~10M affected each time",color:"#dc2626"},
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
    {val:"221",label:"Killed in boat strikes",sub:"Unchanged since Jun 21 — strikes paused a month+",color:"#ef4444"},
    {val:"67+",label:"Vessels struck",sub:"Since Sep 2025; no strike since Jun 21",color:"#f97316"},
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
        {icon:"☠️",label:"Deaths",val:"5,546+",sub:"As of Jul 25 (one-month mark); largely plateaued since",color:"#ef4444"},
        {icon:"❓",label:"Still missing",val:"~29,500",sub:"Citizen tracker — govt hasn't updated its own count since Jun 25",color:"#f97316"},
        {icon:"🩹",label:"Injured",val:"16,740",sub:"Government tally, mostly discharged",color:"#eab308"},
        {icon:"💰",label:"Est. damage",val:"$19.6B",sub:"Euronews one-month assessment",color:"#5b8ec8"},
      ]}/>
      <Note t={t} color="#0ea5e9">Death toll climbed steeply then plateaued: 235 (Jun 26) → 3,535 (Jul 7) → 4,930 (Jul 16) → 5,119 (Jul 18) → 5,546 (Jul 25) — largely unchanged in the week since, suggesting medical teams are no longer seeing new serious cases while recovery crews continue finding remains in rubble. The missing count is the most contested figure: Venezuela's government hasn't updated its own tally since Jun 25 (157 then), leaving the field to a citizen-run tracker reporting ~29,500 unresolved reports as of Jul 25 — plausible given UN estimates of 40,000–50,000 still unaccounted for in mid-July. Caracas and La Guaira remain hardest-hit.</Note>
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
      <CaribbeanMap t={t}/>
      <Note t={t} color="#f97316">Operational pause: no strike has occurred since Jun 21, 2026 — the longest gap since the campaign began, which WOLA attributes to SOUTHCOM assets being diverted to Venezuela earthquake relief. Separately, Pentagon and DEA analysts told the Washington Post (Jul 27) the campaign has not measurably slowed cocaine's flow into the US, contradicting the administration's claim of a 98.2% reduction in maritime trafficking.</Note>
      <ST t={t} color="#f97316">⚖️ Legal & Accountability Controversy</ST>
      {LEGAL_CONTROVERSY.map((item,i)=><Card key={i} t={t} style={{borderLeft:"4px solid #f97316"}}><div style={{padding:"11px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18}}>{item.icon}</span><div style={{fontSize:13,fontWeight:700,color:t.text}}>{item.label}</div></div><div style={{fontSize:12,color:t.sub,lineHeight:1.55}}>{item.text}</div></div></Card>)}
      <ST t={t} color="#f97316">🎯 Cartel & Gang Targets</ST>
      <Card t={t} style={{borderLeft:"4px solid #ef4444"}}><div style={{padding:"12px 14px"}}>
        {["Tren de Aragua — Venezuelan organized crime gang, designated a Foreign Terrorist Organization by the White House in February 2026. Leader Héctor 'Niño Guerrero' Guerrero Flores killed in a coordinated US-Venezuelan airstrike June 12, 2026.","ELN (Ejército de Liberación Nacional) — Colombian guerrilla group with extensive documented activity inside Venezuela near the Maracaibo border region; cited as a target in the March 2026 Ecuador-border strike, though the actual target was later reported by NYT to be a dairy farm.","FARC dissidents — named as the original justification for the March 2026 Colombia-Ecuador border strike; the bombing did not directly involve US forces but was conducted jointly with Ecuador."].map((pt,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:8,fontSize:12.5,color:t.sub,lineHeight:1.5}}><span style={{color:"#ef4444",flexShrink:0}}>▸</span>{pt}</div>)}
      </div></Card>
      <Note t={t} color="#f97316">Casualty and strike-count figures sourced from AS/COA and Wikipedia's strike tracker, both compiled from DoD/SOUTHCOM announcements and independent verification efforts — treat exact figures as the best available public estimate, not an official confirmed tally.</Note>
      <TrendChart t={t} data={HISTORICAL.boatStrikeDeaths} color="#dc2626" label="Caribbean Boat-Strike Deaths (cumulative)" unit="killed in Southern Spear strikes" area desc="221+ killed since the campaign began in Sept 2025 — a near-linear escalation through June, unchanged in July as the campaign paused entirely from Jun 21. Casualty figures and the operation's legal basis remain contested." />
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
      <TrendChart t={t} data={HISTORICAL.cubaGridCollapses} color="#f97316" label="Cuba: Total National Grid Collapses" unit="nationwide blackouts per month, 2026" desc="5 confirmed total-system collapses in 2026 as of Jul 14 (Mar 4, Mar 16, Jul 6, Jul 10, Jul 14 — cross-referenced across CNN, Reuters, Fox News, Havana Times and Al Jazeera), consistent with reporting that this is the 9th such collapse since late 2024. Zero months reflect no confirmed total-system collapse that month — rolling 18-22hr/day outages continued throughout regardless." />
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
        <div style={{marginBottom:6}}><span style={{color:t.text,fontWeight:700}}>Sheinbaum's red line</span> — "We collaborate, we coordinate, we work together, but we will never subordinate ourselves." Mexico has approved narrow cooperation (e.g. Mexican Senate authorization for joint US 7th Special Forces Group training with Mexican Marines) while explicitly rejecting unilateral US military action as a sovereignty violation.</div>
        <div><span style={{color:t.text,fontWeight:700}}>The rhetoric sharpens</span> — DEA Administrator Terry Cole said Jul 14 the Mexican government and cartel networks are "one and the same" and the agency's top priority. Sheinbaum rejected it Jul 15 as "more a political statement than one backed by evidence," noting the US remains the world's largest illicit-drug market — a sign the relationship is fraying at the rhetorical level even as formal cooperation continues.</div>
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
      <Note t={t} color="#006341">Sources: Atlantic Council, CFR, CNN, Al Jazeera, Newsweek, Bloomberg, Ken Klippenstein reporting on NORTHCOM planning, EveryCRSReport (CRS). Cartel/FTO and NORTHCOM detail is fast-moving and often based on leaked planning documents rather than confirmed operations — treat "prepared to strike" and "has struck" as distinct claims. Cross-reference: Southern Spear tab (the one confirmed kinetic campaign in this theater) and Great Powers → Critical Minerals (China-Mexico transshipment angle).</Note>
    </div>}
    {tab==="haiti"&&<div>
      <Hero t={t} color="#00209F"><div style={{fontSize:11,fontWeight:800,letterSpacing:".12em",color:"#6699ff",marginBottom:6}}>🇭🇹 A STATE THAT HAS LARGELY STOPPED GOVERNING ITS CAPITAL</div><div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Since the Viv Ansanm gang coalition's Feb 2024 offensive, Haiti's crisis has deepened rather than stabilized: gangs hold most of Port-au-Prince, a new UN-blessed force is only beginning to deploy, and the planned Aug 30 elections have already been postponed to December — proof the gangs, not the ballot, currently set the state's calendar.</div></Hero>
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
      <ST t={t} color="#f97316">🗳️ Elections Postponed to December — Gangs Forced the Delay</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>The Aug 30, 2026 election date did not hold. A new surge of gang violence forced Acting PM Alix Didier Fils-Aimé to suspend it, and Haiti's electoral council (CEP) published a revised calendar on Jul 28 setting the first round of presidential and legislative voting for Dec 13, 2026, with results due by Jan 20, 2027 — contingent on the security situation actually improving. It would be the country's first presidential election in a decade. The postponement is itself the risk analysts (BISI) had flagged as more likely than the alternative: not that Viv Ansanm would contest an election, but that gang control of Port-au-Prince would prevent one from happening on schedule at all.</div></div></Card>
      <Note t={t} color="#00209F">Sources: UN Security Council Report (monthly Haiti forecasts), Human Rights Watch World Report 2026, Global Centre for the Responsibility to Protect, International Crisis Group, BISI. Casualty and control-percentage figures vary by source and are difficult to verify independently given the security situation; treat percentages as directional. Cross-reference: Mexico tab (shared FTO-designation mechanism), Cuba Blockade tab (same hemisphere, same humanitarian-crisis pattern of a fragile state under compounding pressure).</Note>
    </div>}

    {tab==="colombia"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #fcd116"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:28}}>🇨🇴</span><div><div style={{fontSize:16,fontWeight:800,color:"#fff"}}>Colombia — Total Peace in Pieces</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}><Pill label="MULTI-FACTION CONFLICT" color="#dc2626"/><Pill label="PEACE POLICY COLLAPSED" color="#f97316"/></div></div></div>
        <Grid2 t={t} items={[
          {icon:"🪖",label:"Armed combatants",val:"25,000+",sub:"Up ~85% since 2017, across all factions",color:"#ef4444"},
          {icon:"💔",label:"Catatumbo massacre",val:"100+ dead",sub:"Jan 2025 — ELN vs FARC dissidents, 55,000 displaced",color:"#dc2626"},
          {icon:"💰",label:"Bounty on Mordisco",val:"5B pesos",sub:"Lead FARC-dissident (EMC) commander",color:"#eab308"},
          {icon:"🗳️",label:"Presidential election",val:"May 31, 2026",sub:"The live variable for the conflict's trajectory",color:"#5b8ec8"},
        ]}/>
      </Hero>
      <ST t={t} color="#fcd116">⚔️ Total Peace collapses</ST>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:6}}>
        <ReadAloudButton text={"President Gustavo Petro's signature Total Peace policy sought parallel negotiations with every major armed and criminal group in Colombia. A yearlong ELN ceasefire from June 2023 to August 2024 was the longest in that group's six-decade history and briefly looked like a breakthrough. It collapsed catastrophically in January 2025: ELN fighters attacked a rival FARC-dissident faction in the Catatumbo region near the Venezuelan border, killing over 100 people, mostly civilians, and displacing roughly 55,000. Petro declared a state of emergency and said the ELN had chosen the path of war. Petro himself acknowledged in 2025 that the policy had not achieved peace."} color="#fcd116" t={t}/>
      </div>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>President Gustavo Petro's signature "Total Peace" (Paz Total) policy sought parallel negotiations with every major armed and criminal group in Colombia — ELN guerrillas, FARC dissident factions, and organized-crime groups like the Gulf Clan. A yearlong ELN ceasefire (Jun 2023–Aug 2024) was the longest in that group's six-decade history and briefly looked like a breakthrough. It collapsed catastrophically in Jan 2025: ELN fighters attacked a rival FARC-dissident faction in the Catatumbo region near the Venezuelan border, killing 100+ people, mostly civilians, and displacing roughly 55,000. Petro declared a state of emergency and said the ELN had "chosen the path of war." Petro himself acknowledged in 2025 that the policy had "not achieved peace."</div></div></Card>
      <ST t={t} color="#fcd116">🧩 A fractured battlefield</ST>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:6}}>
        <ReadAloudButton text={"The FARC dissident landscape has splintered into competing factions rather than consolidating: the dominant Estado Mayor Central under Ivan Mordisco Marquez, an EMC splinter led by Calarca, and Segunda Marquetalia, with violence between these factions now compounding the fighting against the state. Combined armed-group strength has grown roughly 85 percent since 2017 to over 25,000 fighters, even as Total Peace was meant to shrink it. A 5 billion peso bounty is on Mordisco's head. The May 31, 2026 presidential election is widely seen as the deciding variable — every leading candidate has been critical of Petro's approach, and the outcome will determine whether Total Peace continues, is overhauled, or is abandoned outright."} color="#fcd116" t={t}/>
      </div>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>The FARC dissident landscape has splintered into competing factions rather than consolidating: the dominant Estado Mayor Central (EMC) under Iván "Mordisco" Márquez, an EMC splinter led by Calarcá, and Segunda Marquetalia — with violence between these factions now compounding the fighting against the state. Combined armed-group strength has grown roughly 85% since 2017 to over 25,000 fighters, even as Total Peace was meant to shrink it. A 5-billion-peso bounty is on Mordisco's head. The May 31, 2026 presidential election is widely seen as the deciding variable — every leading candidate has been critical of Petro's approach, and the outcome will determine whether Total Peace continues, is overhauled, or is abandoned outright.</div></div></Card>
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
  { date:"Jul 20", ru_d:94,ru_m:2, ru_int:82,ru_thru:14, ua_d:null,ua_int:0,ua_thru:0, alert_h:5.8, pw_gwh:0.24,
    confirmed:true, targets:"Dispersed, no single focal city reported",
    note:"🔴 2 Kh-59/69 missiles + 94 drones. Air defense downed/suppressed 81 drones; 1 missile failed to reach its target. 🔵 SBU/Unmanned Systems Forces struck 13 electrical substations in Crimea and 4 shadow-fleet vessels overnight, per commander Brovdi (\\'Madyar\\')." },
  { date:"Jul 21", ru_d:58,ru_m:0, ru_int:46,ru_thru:8, ua_d:null,ua_int:0,ua_thru:0, alert_h:3.9, pw_gwh:0.15,
    confirmed:true, targets:"Kursk/Orel/Millerovo-directed drones, dispersed impact",
    note:"🔴 One of the lighter nights of the week: 58 Shahed-type/Gerbera/Italmas drones, no missiles. Air defense downed/suppressed 46; 8 drones hit 7 locations." },
  { date:"Jul 22", ru_d:216,ru_m:4, ru_int:207,ru_thru:13, ua_d:null,ua_int:0,ua_thru:0, alert_h:7.2, pw_gwh:0.29,
    confirmed:true, targets:"Nationwide dispersal; Bucha and Kharkiv hit",
    note:"🔴 1 Iskander-M + 3 Kh-59/69 + 216 drones — 220 total, among the largest drone volumes of the week. Air defense downed/suppressed 204 drones + all 3 Kh-59/69; the Iskander-M and 12 drones hit 12 locations, debris fell at 7 more. A Bucha-district house was hit (5 injured, incl. 3 children); Kharkiv's gas station was struck for a second time same day. 🔵 Ukraine re-struck the Saratov oil refinery, per the General Staff." },
  { date:"Jul 23", ru_d:168,ru_m:6, ru_int:156,ru_thru:11, ua_d:null,ua_int:0,ua_thru:0, alert_h:6.4, pw_gwh:0.22,
    confirmed:true, targets:"Odesa (near-continuous overnight), Zaporizhzhia",
    note:"🔴 1 Iskander-M + 5 Kh-59/69 + 168 drones — 174 total. Air defense downed/suppressed 2 missiles + 154 drones; hits by the ballistic missile, 3 guided missiles and 7 drones recorded at 9 locations. 1 killed in Zaporizhzhia; Odesa took near-continuous fire overnight, damaging infrastructure, an office building, cars and homes. 🔵 Ukraine struck the NS-Oil refinery in Ulyanovsk Oblast, the Subkhankulovo pipeline dispatching station in Bashkortostan, and a Wildberries logistics hub in Voronezh for a second straight night; Russia's MoD claims 223 Ukrainian drones intercepted over 19 regions." },
  { date:"Jul 24", ru_d:180,ru_m:5, ru_int:164,ru_thru:21, ua_d:null,ua_int:0,ua_thru:0, alert_h:6.6, pw_gwh:0.29,
    confirmed:true, targets:"Kyiv region (missile strike), nationwide drone dispersal",
    note:"🔴 5 Kh-59/69 + 180 drones. Air defense downed/suppressed 4 missiles + 160 drones; 1 missile + 14 drones hit 9 locations, debris at 8 more. A missile strike on Kyiv region killed 10 and injured roughly 100 — one of the deadliest single strikes on the region this month." },
  { date:"Jul 25", ru_d:157,ru_m:2, ru_int:128,ru_thru:31, ua_d:null,ua_int:0,ua_thru:0, alert_h:5.4, pw_gwh:0.21,
    confirmed:true, targets:"Zaporizhzhia (shopping mall), Poltava (gas stations), Sumy",
    note:"🔴 2 Kh-59/69 + 157 drones. Air defense downed 1 missile + 127 drones; 26 drones hit 9 locations, debris at 4 more. A Zaporizhzhia shopping mall was set ablaze with casualties; four Poltava gas stations were damaged; a Sumy drone strike left further fatalities." },
  { date:"Jul 26", ru_d:136,ru_m:8, ru_int:110,ru_thru:34, ua_d:null,ua_int:0,ua_thru:0, alert_h:7.0, pw_gwh:0.30,
    confirmed:true, targets:"Nationwide — 7 Iskander-M/S-400 ballistic the main story",
    note:"🔴 1 Kh-59/69 + 7 Iskander-M/S-400 ballistic + 136 drones. Air defense downed the Kh-59/69, 5 of 7 ballistic missiles, and 104 drones — Ukraine's best single-night ballistic-intercept rate (71%) since the mid-July PAC-3 shortage began. 2 ballistic + 27 drones still hit 18 locations. 🔵 Ukraine separately struck Russian-flagged vessels carrying Iranian military cargo across the Caspian Sea." },
  { date:"Jul 27", ru_d:147,ru_m:0, ru_int:123,ru_thru:24, ua_d:null,ua_int:0,ua_thru:0, alert_h:4.8, pw_gwh:0.18,
    confirmed:true, targets:"Nationwide dispersal, drone-only",
    note:"🔴 Drone-only night: 147 Shahed/Gerbera/Italmas + Parodiya decoys. Air defense downed/suppressed 123; 21 drones hit 10 locations. Air Force spokesman Ihnat separately flagged a rise in ballistic-missile use over the preceding week (~50 launched) alongside factory-fresh missile markings, suggesting Russian production is keeping pace with expenditure." },
  { date:"Jul 28", ru_d:123,ru_m:0, ru_int:107,ru_thru:16, ua_d:null,ua_int:0,ua_thru:0, alert_h:4.5, pw_gwh:0.17,
    confirmed:true, targets:"Nationwide dispersal, drone-only",
    note:"🔴 Second consecutive drone-only night: air defense downed/suppressed 107 of an estimated 123 attack drones; 16 hit 9 locations. The two-night pause in ballistic and cruise missile use lines up with the broader lull in the parallel Iran war, both consistent with a period of interceptor/munition conservation rather than de-escalation." },
  { date:"Aug 1", ru_d:109,ru_m:null, ru_int:109,ru_thru:24, ua_d:null,ua_int:0,ua_thru:0, alert_h:null, pw_gwh:null,
    confirmed:true, targets:"19 locations struck, debris in 3 more \u2014 133 drones total (incl. Shahed-type), 109 intercepted",
    note:"Missile breakdown, alert-hours and power-outage figures not sourced for this night \u2014 left blank rather than estimated. Air Force-confirmed drone intercept count only." },
  { date:"Jul 29", ru_d:284,ru_m:74, ru_int:320,ru_thru:38, ua_d:null,ua_int:0,ua_thru:0, alert_h:8.9, pw_gwh:0.41,
    confirmed:true, targets:"Kyiv, Kryvyi Rih, Lviv, Poland spillover — deadliest night in weeks",
    note:"🔴 The largest combined strike since the mid-July shortage began: 61 Kh-101/Kalibr cruise + 9 Iskander-M/S-400/KN-23 ballistic + 4 Zircon/Onyx anti-ship missiles (74 total) plus 284 drones. Air defense downed/suppressed 55 missiles (only 1 of 9 ballistic) + 265 drones; 3 anti-ship + 6 ballistic + 2 cruise + 17 drones hit 20 locations, debris at 13 more. An Iskander-M strike killed 6 members of one family (incl. 3 children) near Kryvyi Rih; Lviv had two high-rises hit and a school plus two kindergartens damaged; at least 8-10 killed and 50+ injured nationwide. A missile/debris crossed into Poland's Lublin region — believed a Russian Kh-101 — prompting Polish and NATO jets to scramble, the most serious NATO-airspace incident since the Sep 2025 drone incursions." },
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
  { date:"Aug 2", targets:[
      {name:"Saratov Oil Refinery + Engels-2 Strategic Bomber Base",region:"Saratov Oblast, Russia",dist:600,cat:"Energy/Airbase",icon:"\ud83d\udca3",severity:"critical",
       result:"Zelensky personally confirmed the strike: two strategic facilities hit simultaneously more than 600km from the front line. The Saratov refinery (~7M tonnes/year, Rosneft) caught fire, reportedly hitting its ELOU-AVT-6 crude distillation unit. Engels-2, 17km away, hosts Tu-95MS and Tu-160 strategic bombers used for missile strikes on Ukraine \u2014 a fire was confirmed there too, though Ukraine has not specified exactly what was hit."},
      {name:"Lyudinovskaya Oil Depot + Bryansk Drone-Prep Site",region:"Kaluga / Bryansk Oblasts, Russia",dist:450,cat:"Energy/Logistics",icon:"\ud83d\udee2\ufe0f",severity:"high",
       result:"Same night: a fuel depot in Kaluga Oblast and a site near Navlya, Bryansk Oblast used to store, prepare and launch Russian strike drones were both hit, per Zelensky and the General Staff."} ]},
  { date:"Aug 1", targets:[
      {name:"Crimea Rail Bridges + Naval Drone Depot + Black Sea Fleet SIGINT",region:"Crimea / Kherson Oblast",dist:200,cat:"Logistics/Naval",icon:"\ud83c\udf09",severity:"high",
       result:"A coordinated multi-target night: the Sivash railway bridge (Chonhar) and a second rail bridge near Vladyslavivka \u2014 both key logistics links between Crimea and Russian-held southern Ukraine \u2014 were struck, alongside a naval-drone storage depot near Chornomorske, a Black Sea Fleet electronic-reconnaissance unit in Sevastopol, and a repair base at Pervomaiske. Separately, HUR drones destroyed a Pantsir-S1 air defense system (~$15M) and a Sargan patrol boat (~$6M)."} ]},
  { date:"Jul 29", targets:[
      {name:"Ryazan Oil Refinery (Rosneft) + Wildberries Logistics Warehouse",region:"Ryazan Oblast, Russia",dist:360,cat:"Energy/Logistics",icon:"🛢️",severity:"critical",
       result:"A major drone attack hit the Rosneft-owned Ryazan refinery — ~17.1M tonnes/year capacity, roughly 5% of all Russian refining output — sparking a large fire, alongside a Wildberries warehouse complex in the same city. The refinery was previously forced offline for an extended period after a May 2026 strike. Confirmed by both Zelensky and Ukraine's General Staff, hours after Zelensky's Jul 28 White House meeting with Trump."},
      {name:"Lukoil-Permnefteorgsintez Refinery, Perm",region:"Perm Krai, Russia",dist:1800,cat:"Energy",icon:"\ud83c\udfed",severity:"critical",
       result:"Ukraine's General Staff confirmed a strike on one of Russia's largest refineries, processing over 13M tonnes of crude annually and producing gasoline, diesel, jet fuel and lubricants. Perm Krai governor Dmitry Makhonin confirmed an industrial facility was hit, saying several drones were intercepted on approach. Footage circulated on Russian social media from around 10am local time."} ]},
  { date:"Jul 28", targets:[
      {name:"Prioritet State Reserve Fuel Depot (Rosrezerv) + Ichki Crimea Depot + Chervonopopivka UAV Storage",region:"Udmurt Republic / Crimea / Luhansk, Russia & occupied Ukraine",dist:1300,cat:"Energy/Military-Industrial",icon:"🎯",severity:"critical",
       result:"Ukraine's deepest strike of this cycle: the Prioritet plant in Borok, Udmurt Republic — part of Russia's classified strategic state reserve system, ~1,300km from Ukraine — was hit and set ablaze. Same 48 hours: a logistics and fuel/lubricants depot near Ichki (occupied Crimea), a Russian UAV storage facility near Chervonopopivka (Luhansk Oblast), and a Moscow Oblast steel plant were also struck; occupied Crimea reported a blackout."} ]},
  { date:"Jul 27", targets:[
      {name:"Rostov Oblast Export Terminal + Yaroslavl Oil Facility",region:"Rostov & Yaroslavl Oblasts, Russia",dist:700,cat:"Energy/Logistics",icon:"🛢️",severity:"major",
       result:"Zelensky confirmed a strike on an export terminal in Rostov Oblast overnight Jul 26-27, with parallel deep-strike hits reaching oil facilities in Yaroslavl region — continuing the sustained campaign against Russian fuel export and refining infrastructure."} ]},
  { date:"Jul 26", targets:[
      {name:"Russian-Flagged Vessels Carrying Iranian Military Cargo",region:"Caspian Sea",dist:null,cat:"Military/Interdiction",icon:"🚢",severity:"major",
       result:"Ukraine struck Russian-flagged vessels transporting Iranian military cargo across the Caspian Sea — a rarer maritime interdiction target tying together the Russia-Iran materiel relationship the dashboard tracks separately in the Iran theater."} ]},
  { date:"Jul 23", targets:[
      {name:"NS-Oil Refinery (Ulyanovsk) + Subkhankulovo Pipeline Station (Bashkortostan) + Voronezh Wildberries Hub",region:"Ulyanovsk/Bashkortostan/Voronezh, Russia",dist:650,cat:"Energy/Logistics",icon:"🛢️",severity:"major",
       result:"A three-target night ~650km inside Russia: the NS-Oil refinery in Novospasskoye caught fire, the Subkhankulovo pipeline dispatching station near Tuymazy was struck, and a Voronezh Wildberries hub was hit for a second straight night. Russia claimed 223 Ukrainian drones intercepted across 19 regions."} ]},
  { date:"Jul 22", targets:[
      {name:"Russian MiG-29 Fighter Jet, Kursk Airbase",region:"Kursk Oblast, Russia",dist:120,cat:"Military",icon:"✈️",severity:"critical",
       result:"A rare confirmed kill of a crewed Russian fixed-wing combat aircraft, destroyed on the ground at its Kursk airbase; Ukraine also re-struck the Saratov oil refinery the same cycle."} ]},
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
  const strikeRegionRows=useMemo(()=>{const counts={};DW_STRIKE_LOG.forEach(d=>d.targets.forEach(tg=>{counts[tg.region]=(counts[tg.region]||0)+1;}));return Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,8);},[]);
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
          {(()=>{const rows=strikeRegionRows;const max=rows.length?rows[0][1]:1;return rows.map(([rg,n],i)=><div key={rg} style={{marginBottom:i===rows.length-1?0:8}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:11,fontWeight:600,color:DWC.text}}>{rg}</span><span style={{fontSize:11,fontWeight:700,color:DWC.ua}}>{n}</span></div><div style={{height:6,borderRadius:3,background:"rgba(91,142,196,.12)",overflow:"hidden"}}><div style={{height:"100%",width:`${Math.max(4,n/max*100)}%`,borderRadius:3,background:`linear-gradient(90deg,${DWC.ua}88,${DWC.ua})`,transformOrigin:"left",animation:`barGrow .6s cubic-bezier(.22,1,.36,1) ${i*0.05}s both`}}/></div></div>);})()}
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

function AfricaSection({t,initialTab,onFlash}){
  const[tab,setTab]=useState(initialTab??"sudan");useEffect(()=>{if(initialTab)setTab(initialTab);},[initialTab]);
  useEffect(()=>{onFlash&&onFlash(tab);},[tab]);
  const TABS=[{id:"sudan",label:"🇸🇩 Sudan"},{id:"drc",label:"🇨🇩 DR Congo"},{id:"sahel",label:"🏜️ Sahel"}];

  const SUDAN_STATS=[
    {val:"150K–400K",label:"Killed (est.)",sub:"Wide range reflects conflict-zone data limits — ACLED: ~56,000 confirmed",color:"#ef4444"},
    {val:"Apr 2023",label:"War began",sub:"Power struggle between SAF chief Burhan and RSF commander Hemedti",color:"#f97316"},
    {val:"60K–150K",label:"El Fasher massacre",sub:"Oct 2025 RSF capture of SAF's last Darfur stronghold",color:"#dc2626"},
    {val:"1,000+",label:"Drone deaths, Jan–May 2026",sub:"UN: 600% rise in drone deaths, 81% rise in drone attacks, 2024→2025",color:"#eab308"},
  ];
  const DRC_STATS=[
    {val:"Jan 2025",label:"Goma falls",sub:"M23 seized North Kivu's capital; banks still closed a year later",color:"#dc2626"},
    {val:"Feb 2025",label:"Bukavu falls",sub:"South Kivu's capital, second major city taken",color:"#dc2626"},
    {val:"7M+",label:"Internally displaced",sub:"Among the world's largest displacement crises",color:"#f97316"},
    {val:"6M+",label:"Killed since 1996",sub:"Cumulative toll across three decades of eastern DRC conflict",color:"#ef4444"},
  ];
  const SAHEL_STATS=[
    {val:"10,000+",label:"Killed, Mali/Burkina Faso/Niger",sub:"2025 political-violence deaths — ACLED",color:"#ef4444"},
    {val:"50%+",label:"Of global terrorism deaths",sub:"Liptako-Gourma tri-border area alone — Global Conflict Tracker",color:"#dc2626"},
    {val:"2.06M",label:"Displaced, Burkina Faso",sub:"~20,000 killed there over 3 years of insurgency",color:"#f97316"},
    {val:"~40%",label:"Burkina Faso territory",sub:"Share the junta actually controls, per multiple trackers",color:"#eab308"},
  ];

  return <div>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>{TABS.map(tb=><button key={tb.id} className="pill-tab" onClick={()=>setTab(tb.id)} style={{padding:"6px 12px",borderRadius:20,fontSize:12,fontWeight:tab===tb.id?700:400,cursor:"pointer",fontFamily:FONT,background:tab===tb.id?"#dc2626":"none",color:tab===tb.id?"#fff":t.sub,border:`1px solid ${tab===tb.id?"#dc2626":t.border}`}}>{tb.label}</button>)}</div>
    <ConflictOverviewCard conflict={CONFLICTS.find(c=>c.id===tab)} t={t} readAloud/>

    {tab==="sudan"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #dc2626"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:28}}>🇸🇩</span><div><div style={{fontSize:16,fontWeight:800,color:"#fff"}}>Sudan — SAF vs. RSF</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}><Pill label="CIVIL WAR" color="#dc2626"/><Pill label="WORLD'S WORST DISPLACEMENT CRISIS" color="#f97316"/></div></div></div>
        <Grid2 t={t} items={SUDAN_STATS}/>
      </Hero>
      <SudanMap t={t}/>
      <ST t={t} color="#dc2626">⚔️ The War</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>Fighting erupted in Khartoum in April 2023 between the Sudanese Armed Forces (SAF), led by Abdel Fattah al-Burhan, and the paramilitary Rapid Support Forces (RSF), led by Mohamed Hamdan "Hemedti" Dagalo — former partners in the 2021 coup who fell out over how to integrate the RSF into the regular army. The war has since spread from Khartoum to Darfur, Kordofan and beyond, drawing in over 10 external countries backing one side or the other. Multiple mediation efforts — including US, Saudi and African Union channels — have failed to produce a lasting ceasefire.</div></div></Card>
      <ST t={t} color="#dc2626">💀 El Fasher — the war's worst single event</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>The RSF's October 2025 capture of El Fasher — the SAF's last stronghold in Darfur, under siege for over a year — was accompanied by what multiple human rights groups and researchers describe as a genocidal massacre. Estimates of the dead in the days during and after the city's fall range from 60,000 to as high as 150,000, based on satellite evidence and survivor testimony, which would make it among the most lethal single massacres of the 21st century. The RSF disputes the highest figures.</div></div></Card>
      <ST t={t} color="#dc2626">🛸 The drone war escalation</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>Sudan's war has transformed into a drone-dominated conflict, per ACLED. UN High Commissioner for Human Rights Volker Türk told the Human Rights Council that over 1,000 civilians were killed in drone strikes in just the first five months of 2026 alone, part of a documented 600% year-on-year rise in drone-related deaths. Both SAF and RSF have adopted the tactic, extending strikes into previously less-contested areas.</div></div></Card>
      <ST t={t} color="#f97316">🆘 Humanitarian Crisis</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}>
        <Grid2 t={t} items={[
          {icon:"🏚️",label:"Displaced",val:"13.6M",sub:"9.3M internal + 4.3M refugees — world's largest displacement crisis",color:"#f97316"},
          {icon:"🍽️",label:"Food insecure",val:"21M",sub:"\u201cDesperately\u201d need food, per WHO",color:"#ef4444"},
          {icon:"🏥",label:"Health assistance needed",val:"20M+",sub:"70%+ of hospitals destroyed or non-functional",color:"#eab308"},
          {icon:"💰",label:"Humanitarian need, 2026",val:"33.7M people",sub:"~2/3 of Sudan's population — WFP projection",color:"#dc2626"},
        ]}/>
        <div style={{fontSize:12,color:t.sub,lineHeight:1.7,marginTop:10}}>Famine was first confirmed at the Zamzam displacement camp in Aug 2024 and has since expanded to multiple localities across El Fasher and Kadugli. Cholera has spread nationwide — the IRC records over 120,000 confirmed cases and 3,000+ deaths from the outbreak alone. Mass rape and sexual violence are documented as widespread and systematic by UN agencies and rights groups on both sides of the front line. International attention has been consistently overshadowed by the Middle East and Ukraine wars despite Sudan's larger displacement toll than either.</div>
      </div></Card>
    </div>}

    {tab==="drc"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #dc2626"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:28}}>🇨🇩</span><div><div style={{fontSize:16,fontWeight:800,color:"#fff"}}>DR Congo — M23 Offensive</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}><Pill label="RWANDA-BACKED REBELLION" color="#dc2626"/><Pill label="PEACE DEAL FRAGILE" color="#f97316"/></div></div></div>
        <Grid2 t={t} items={DRC_STATS}/>
      </Hero>
      <DRCMap t={t}/>
      <ST t={t} color="#dc2626">⚔️ The Offensive</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>M23 — a Tutsi-led rebel group that first emerged in 2012 and resurfaced in 2021 — launched a major offensive in North and South Kivu in early 2025, seizing provincial capitals Goma (Jan 27) and Bukavu (Feb 18). The group frames itself as protecting Congolese Tutsi communities; the DRC government and independent UN reporting describe it as a Rwandan proxy force. Rwanda denies backing M23. The advance has been the most significant territorial shift in eastern DRC's three-decade conflict in years.</div></div></Card>
      <ST t={t} color="#dc2626">🕊️ A peace deal that hasn't held</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>The DRC and Rwanda signed a US-brokered peace agreement in Washington on Jun 27, 2025, demanding "disengagement, disarmament and conditional integration" of armed groups. A follow-up Doha framework between the DRC government and M23 directly followed in late 2025, with a comprehensive deal targeted for summer 2026. But by early 2026, fighting had not only resumed but intensified in several areas, and most of the eight peace-framework pillars remain unimplemented. Former president Joseph Kabila dismissed the Washington deal as "nothing more than a trade agreement."</div></div></Card>
      <ST t={t} color="#eab308">⛏️ Minerals & the US Deal</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}>
        <div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>Eastern DRC holds some of the world's largest reserves of coltan (used in every smartphone and laptop), cobalt and tin — the same territory M23 has seized. After losing Goma and Bukavu, Kinshasa turned to Washington for security guarantees, reportedly offering US access to critical minerals in exchange. That mineral-access arrangement is widely seen as the deciding factor that brought Rwanda to the table for the June 2025 Washington deal — a resource-for-security trade with clear echoes of the critical-minerals diplomacy playing out elsewhere in Great Powers. Skepticism runs deep on the ground: in rebel-held Goma, residents and former officials have dismissed the peace agreement as a transaction over resources rather than a genuine settlement, and M23 leadership has vowed to keep fighting despite EU sanctions on its commanders. The UN Human Rights Council pressed in Oct 2025 for a Commission of Inquiry field mission by Jan 2026, but this has been delayed by UN funding shortages.</div>
      </div></Card>
    </div>}

    {tab==="sahel"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #dc2626"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:28}}>🏜️</span><div><div style={{fontSize:16,fontWeight:800,color:"#fff"}}>Sahel — Junta States vs. Jihadist Insurgency</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}><Pill label="WORST TERRORISM ZONE GLOBALLY" color="#dc2626"/><Pill label="3 MILITARY JUNTAS" color="#f97316"/></div></div></div>
        <Grid2 t={t} items={SAHEL_STATS}/>
      </Hero>
      <SahelMap t={t}/>
      <ST t={t} color="#dc2626">🪖 The juntas</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>Military juntas seized power in Mali (2020 and 2021), Burkina Faso (2022, under Capt. Ibrahim Traoré) and Niger (2023). All three expelled French and UN forces, withdrew from ECOWAS, and formed the breakaway Alliance of Sahel States (AES) in 2023. Mali and Burkina Faso jointly announced intent to leave the International Criminal Court in Sep 2025, denouncing it as politically instrumentalized. Despite the security rationale that brought them to power, none of the three juntas has reversed the insurgency's advance.</div></div></Card>
      <ST t={t} color="#dc2626">⚠️ The insurgency</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>Two jihadist groups dominate: JNIM (Jama'at Nusrat al-Islam wal-Muslimin), al-Qaeda's affiliate, and ISSP (Islamic State Sahel Province). JNIM blockaded Mali's capital Bamako in 2025, cutting fuel and supply routes to the seat of government itself. Burkina Faso's junta controls only an estimated 40% of its own territory. Both groups have expanded south, establishing what ACLED calls a deliberate — not incidental — corridor toward Benin, Togo, Ivory Coast and Ghana on the Gulf of Guinea.</div></div></Card>
      <ST t={t} color="#8b5cf6">🇷🇺 The Russia Pivot</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}>
        <div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>Following the 2022-23 French withdrawal, all three juntas turned to Russia's Wagner Group — rebranded Africa Corps after Yevgeny Prigozhin's 2023 death — as their primary external security partner. Africa Corps provides logistical and aerial support to help juntas hold transit routes and urban centers, but has not reversed the broader security trend: JNIM and ISSP together control more Sahelian territory than at any point since the 2012 Mali crisis that started the whole conflict. A 2026 Tuareg-separatist offensive (Azawad Liberation Front) alongside JNIM took most of Mali's Kidal region from Malian and Russian forces, destroying an Africa Corps helicopter and prompting France to advise its remaining nationals to leave the country. Mali's government and Russia characterized the wider offensive as a thwarted coup attempt. Some reporting indicates renewed, more limited US security engagement in the region in 2026 after a 2023 pullback — a notable shift given Washington's earlier retreat alongside France's.</div>
      </div></Card>
    </div>}
  </div>;
}

function SouthAsiaSection({t,initialTab,onFlash}){
  const[tab,setTab]=useState(initialTab??"indopak");useEffect(()=>{if(initialTab)setTab(initialTab);},[initialTab]);
  useEffect(()=>{onFlash&&onFlash(tab);},[tab]);
  const TABS=[{id:"indopak",label:"🇮🇳🇵🇰 India–Pakistan"},{id:"pakafghan",label:"🇵🇰🇦🇫 Pakistan–Afghanistan"}];

  const INDOPAK_STATS=[
    {val:"Apr 22, 2025",label:"Pahalgam attack",sub:"26 civilians killed in Indian Kashmir; India blamed Pakistan-based Lashkar-e-Taiba",color:"#ef4444"},
    {val:"May 6-7, 2025",label:"Operation Sindoor",sub:"India struck 9 sites in Pakistan and Pakistan-administered Kashmir",color:"#f97316"},
    {val:"4 days",label:"Length of the war",sub:"Ceasefire reached May 10, 2025 — held over a year since",color:"#22c55e"},
    {val:"First use",label:"Chinese weapons in combat",sub:"Pakistan's Chinese-supplied HQ-9B failed to intercept Indian BrahMos missiles",color:"#eab308"},
    {val:"Suspended",label:"Indus Waters Treaty",sub:"India suspended the pact after the Apr 2025 attack; Pakistan warns water coercion risks 'serious consequences'",color:"#0ea5e9"},
  ];

  const PAKAFGHAN_STATS=[
    {val:"Feb 27, 2026",label:"\u201cOpen war\u201d declared",sub:"Pakistan launches Operation Ghazab lil Haq across the border",color:"#dc2626"},
    {val:"400+",label:"Killed, Kabul hospital strike",sub:"Mar 16 — Pakistani strike on a drug-rehabilitation facility",color:"#ef4444"},
    {val:"115,000+",label:"Displaced in Afghanistan",sub:"Since Feb 26, per OHCHR",color:"#f97316"},
    {val:"289+",label:"Civilian casualties",sub:"76 killed, 213 injured since Feb 26 — OHCHR",color:"#eab308"},
    {val:"Jul 1, 2026",label:"First drone strikes on Pakistan",sub:"Taliban fired drones into Balochistan, injuring 2; Pakistan shot down 4",color:"#8b5cf6"},
  ];


  return <div>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>{TABS.map(tb=><button key={tb.id} className="pill-tab" onClick={()=>setTab(tb.id)} style={{padding:"6px 12px",borderRadius:20,fontSize:12,fontWeight:tab===tb.id?700:400,cursor:"pointer",fontFamily:FONT,background:tab===tb.id?"#dc2626":"none",color:tab===tb.id?"#fff":t.sub,border:`1px solid ${tab===tb.id?"#dc2626":t.border}`}}>{tb.label}</button>)}</div>
    <ConflictOverviewCard conflict={CONFLICTS.find(c=>c.id===tab)} t={t} readAloud/>

    {tab==="indopak"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #f97316"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:28}}>🇮🇳🇵🇰</span><div><div style={{fontSize:16,fontWeight:800,color:"#fff"}}>India–Pakistan — Ceasefire Without Reconciliation</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}><Pill label="NUCLEAR RIVALS" color="#f97316"/><Pill label="CEASEFIRE HOLDING" color="#22c55e"/></div></div></div>
        <Grid2 t={t} items={INDOPAK_STATS}/>
      </Hero>
      <IndiaPakistanMap t={t}/>
      <ST t={t} color="#f97316">⚔️ The Four-Day War</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>A militant attack in Pahalgam, Indian-administered Kashmir, killed 26 civilians on Apr 22, 2025. New Delhi blamed Pakistan-based Lashkar-e-Taiba; Islamabad denied involvement. India launched Operation Sindoor on May 6-7, striking nine sites it described as terrorist infrastructure inside Pakistan and Pakistan-administered Kashmir. Pakistan responded with its own strikes along the Line of Control and claimed to down Indian aircraft, deploying Chinese-supplied weapons in combat for the first time — including an HQ-9B air-defense system that failed to intercept incoming Indian BrahMos missiles. International pressure produced a ceasefire on May 10, ending the most serious bilateral confrontation since the 1999 Kargil conflict.</div></div></Card>
      <ST t={t} color="#f97316">🤝 A year of no reconciliation</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>Both sides publicly claim strategic victory — Pakistan marks the anniversary as the "Day of the Battle of Truth"; India's military insists its own strikes achieved their aims. Pakistan's army chief Asim Munir was elevated to field marshal after the war and now positions himself as a regional peacemaker, even as Islamabad deepens its defense relationship with China — including pursuit of the longer-range HQ-19 missile-defense system — in ways that unsettle New Delhi. Cricket and sporting ties remain frozen; Pakistan's football team was barred from the SAFF Women's Championship hosted in India. Analysts describe the underlying dynamic as unchanged: both nuclear-armed states remain one trigger event from another crisis, tempered mainly by mutual deterrence rather than any actual settlement.</div></div></Card>
    <ST t={t} color="#f97316">💧 Water, tariffs and a cautious thaw</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>India's suspension of the 1960 Indus Waters Treaty remains in force and is now the sharpest unresolved point of leverage between the two states, with Islamabad warning that using water as a coercive tool would carry serious consequences for regional stability. A separate wrinkle: Trump's tariff regime landed asymmetrically, with roughly 50% duties on Indian goods against 19% on Pakistani goods, giving Islamabad comparatively more trade and diplomatic momentum in Washington. On the diplomatic side, a brief public handshake between India's foreign minister Jaishankar and Pakistan's National Assembly speaker Ayaz Sadiq at a Dhaka funeral on Dec 31, 2025 sparked cautious debate about a 2026 thaw. Analysts remain split — some cite historical precedent for gradual post-conflict normalization, others point to the bitterness of the May 2025 war as a durable obstacle to any near-term dialogue.</div></div></Card>
    </div>}

    {tab==="pakafghan"&&<div>
      <Hero t={t} style={{borderLeft:"4px solid #dc2626"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:28}}>🇵🇰🇦🇫</span><div><div style={{fontSize:16,fontWeight:800,color:"#fff"}}>Pakistan–Afghanistan — \u201cOpen War\u201d</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}><Pill label="ACTIVE" color="#dc2626"/><Pill label="CHINA MEDIATING" color="#eab308"/></div></div></div>
        <Grid2 t={t} items={PAKAFGHAN_STATS}/>
      </Hero>
      <PakAfghanMap t={t}/>
      <ST t={t} color="#dc2626">⚔️ From border strikes to open war</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>Pakistan struck a Tehreek-e-Taliban Pakistan (TTP) leader in Kabul in Oct 2025, the first strike on the Afghan capital since the Taliban's 2021 return to power. Skirmishes continued through the winter despite an internationally mediated truce. On Feb 21-22, 2026 Pakistan struck TTP camps directly; Taliban forces retaliated across the border on Feb 26. The next day, Pakistan's defense minister declared "open war with Afghanistan" and launched Operation Ghazab lil Haq — coordinated air and ground strikes on Kabul, Kandahar and dozens of other locations. On Mar 16, a Pakistani strike hit a drug-rehabilitation hospital in Kabul, reportedly killing more than 400 people; Pakistani officials disputed the account. UN human rights experts said Pakistan's campaign violates the UN Charter's prohibition on the use of force, rejecting Islamabad's self-defense justification since the Taliban itself had not directly attacked Pakistan.</div></div></Card>
      <ST t={t} color="#dc2626">🧩 Why it won't resolve</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>The impasse traces to one unresolved demand: Pakistan wants the Afghan Taliban to move against the TTP, its ideological and ethnic kin, operating from Afghan soil. The Taliban has little incentive to comply — TTP fighters are considered "brothers in blood and arms," and Taliban leaders reportedly see TTP-held areas as a fallback sanctuary should their own rule ever collapse. China has brokered repeated truces, including a five-day pause around the end of Ramadan, none of which have held beyond a few weeks. Russia has separately struck an equipment-repair deal with the Taliban that worries Islamabad. Pakistan, for its part, accuses Afghanistan of becoming "a colony of India" — tying this conflict rhetorically to the broader India-Pakistan rivalry next door.</div></div></Card>
    <ST t={t} color="#dc2626">🇨🇳 China's quiet mediation, so far unsuccessful</ST>
      <Card t={t}><div style={{padding:"11px 14px"}}><div style={{fontSize:12,color:t.sub,lineHeight:1.7}}>China opened a parallel mediation track in Urumqi on Apr 1, after Qatari, Saudi and Turkish efforts had failed to produce a lasting ceasefire; Beijing announced Apr 8 that both sides agreed to "explore a comprehensive solution" and pledged not to take actions that would escalate the situation. The truce didn't hold: cross-border artillery and ground clashes continued through the spring, and on Jul 1 the Taliban launched its first known drone strikes onto Pakistani soil, hitting Balochistan and injuring two people near a school — Pakistan shot down four drones and accused Kabul of backing the attack. Pakistani officials say their forces have killed nearly 800 militants, including 133 Afghan Taliban fighters, since the campaign began in February. As of early July, mediation efforts were continuing without producing an actual pause in fighting — the conflict remains active with no durable ceasefire in sight.</div></div></Card>
    </div>}
  </div>;
}

function DeepDiveView({t,selectedConflict,setSelectedConflict,initialTab,onFlash}){useEffect(()=>{window.scrollTo({top:0,behavior:"instant"});},[selectedConflict]);const conflictId=selectedConflict==="scs"?"south-china-sea":(CONFLICT_SECTIONS.find(s=>s.id===selectedConflict)?.conflictId??selectedConflict);const conflict=CONFLICTS.find(c=>c.id===conflictId);return <div style={{animation:"fadeIn .25s ease-out",position:"relative"}}><SJMark size={22} style={{top:6,right:10,transform:"rotate(-10deg)"}}/><div onTouchStart={e=>e.stopPropagation()} onTouchMove={e=>e.stopPropagation()} onTouchEnd={e=>e.stopPropagation()} style={{background:t.card,borderBottom:`1px solid ${t.border}`,padding:"10px 14px",overflowX:"auto",scrollbarWidth:"none",display:"flex",gap:6}}>{CONFLICT_SECTIONS.map(sec=><button key={sec.id} className="pill-tab" onClick={()=>setSelectedConflict(sec.id)} style={{flexShrink:0,padding:"6px 12px",borderRadius:20,border:`1px solid ${selectedConflict===sec.id?"#5b8ec8":t.border}`,background:selectedConflict===sec.id?"#5b8ec8":"none",color:selectedConflict===sec.id?"#fff":t.sub,fontSize:12,fontWeight:selectedConflict===sec.id?700:400,cursor:"pointer",fontFamily:FONT,whiteSpace:"nowrap"}}>{sec.label}</button>)}</div><div key={selectedConflict} className="rise" style={{padding:"14px 16px 0"}}>{selectedConflict==="ukraine"&&<UkraineSection t={t} initialTab={initialTab}/>}{selectedConflict==="scs"&&<SCSSection t={t} initialTab={initialTab}/>}{selectedConflict==="gaza"&&<GazaSection t={t} initialTab={initialTab}/>}{selectedConflict==="iran"&&<IranSection t={t} initialTab={initialTab}/>}{selectedConflict==="usmil"&&<USMilSection t={t} initialTab={initialTab}/>}{selectedConflict==="venezuela"&&<VenezuelaSection t={t} initialTab={initialTab}/>}{selectedConflict==="dronewar"&&<DroneWarSection t={t} initialTab={initialTab}/>}{selectedConflict==="africa"&&<AfricaSection t={t} initialTab={initialTab} onFlash={onFlash}/>}{selectedConflict==="southasia"&&<SouthAsiaSection t={t} initialTab={initialTab} onFlash={onFlash}/>}{!["ukraine","scs","usmil","venezuela","dronewar","gaza","iran","africa","southasia"].includes(selectedConflict)&&<TheaterSection t={t} conflict={conflict}/>}</div></div>;}

// ── Main App ────────────────────────────────────────────────────────────────────────
const VIEWS=[{id:"today",label:"Today",icon:"📡"},{id:"theaters",label:"Theaters",icon:"🌍"},{id:"deepdive",label:"Deep Dive",icon:"🔬"}];
const SECTION_TAB_LISTS={
  ukraine:[{id:"overview",label:"📊 Overview"},{id:"losses",label:"⚖️ Losses"},{id:"manpower",label:"👥 Manpower"},{id:"frontline",label:"🎯 Frontline"},{id:"southernfront",label:"🌊 Southern Front"},{id:"strikewar",label:"💥 Strike War"},{id:"economy",label:"💸 RU Economy"},{id:"uaindustry",label:"🏭 UA Industry"},{id:"intel",label:"🔍 Intel"},{id:"diploallies",label:"🗣️ Diplomacy & Allies"},{id:"analysts",label:"📺 Analysts"},{id:"belarus",label:"🇧🇾 Belarus Axis"}],
  usmil:[{id:"escalation",label:"🌐 Escalation Risk"},{id:"china",label:"🇨🇳 China Deep Dive"},{id:"systems",label:"🚀 Systems"},{id:"posture",label:"🌍 Posture"},{id:"nato",label:"🤝 NATO & Allies"},{id:"rankings",label:"🌐 Global Rankings"},{id:"indopac",label:"🌏 Indo-Pacific Balance"},{id:"fighters5g",label:"✈️ 5th-Gen Fighters"},{id:"navypipe",label:"🚢 Naval Pipeline"},{id:"space",label:"🛰️ Space & Counterspace"},{id:"minerals",label:"⛏️ Critical Minerals"},{id:"arctic",label:"🧊 Arctic"},{id:"defindustry",label:"🏭 Defense Industry"},{id:"dprk",label:"🇰🇵 DPRK-Russia Axis"},{id:"vectors",label:"⚠️ Active Vectors"},{id:"arsenals",label:"🌐 Global Arsenals"},{id:"delivery",label:"🚀 Delivery Systems"},{id:"treaties",label:"📜 Treaties & Doctrine"},{id:"cyber",label:"🌪️ Cyber & Hybrid"}],
  dronewar:[{id:"overview",label:"Overview"},{id:"saturation",label:"🌡 Saturation"},{id:"strikelog",label:"📋 Strike Log"},{id:"yearly",label:"📅 Yearly"},{id:"intercept",label:"Intercept"},{id:"cost",label:"💰 Cost"},{id:"impact",label:"⚠️ Casualties"},{id:"assets",label:"Drone Assets"},{id:"events",label:"Key Events"}],
  iran:[{id:"overview",label:"🇮🇷 Overview"},{id:"hormuz",label:"🚢 Hormuz"},{id:"timeline",label:"📅 Timeline"},{id:"gaps",label:"⚠️ Gaps"}],
  venezuela:[{id:"cuba",label:"🇨🇺 Cuba Blockade"},{id:"spear",label:"🚤 Southern Spear"},{id:"conflict",label:"🇻🇪 Venezuela"},{id:"mexico",label:"🇲🇽 Mexico"},{id:"haiti",label:"🇭🇹 Haiti"},{id:"colombia",label:"🇨🇴 Colombia"}],
  scs:[{id:"overview",label:"🗺️ Overview"},{id:"incidents",label:"⚠️ Incidents"},{id:"military",label:"⚔️ Military"},{id:"law",label:"⚖️ Law & Claims"},{id:"taiwan",label:"🌊 Taiwan Strait"}],
  gaza:[{id:"conflict",label:"⚔️ Gaza"},{id:"humanitarian",label:"🆘 Humanitarian"},{id:"governance",label:"🌐 Governance"},{id:"lebanon",label:"🇱🇧 Lebanon Front"},{id:"syria",label:"🇸🇾 Syria"}],
  africa:[{id:"sudan",label:"🇸🇩 Sudan"},{id:"drc",label:"🇨🇩 DR Congo"},{id:"sahel",label:"🏜️ Sahel"}],
  southasia:[{id:"indopak",label:"🇮🇳🇵🇰 India–Pakistan"},{id:"pakafghan",label:"🇵🇰🇦🇫 Pakistan–Afghanistan"}],
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
  cyber:{icon:"\uD83D\uDEF0\uFE0F",a:"#0ea5e9",b:"#8b5cf6",label:"CYBER & HYBRID"},
  sudan:{icon:"🇸🇩",a:"#D21034",b:"#007A3D",label:"SUDAN"},
  drc:{icon:"🇨🇩",a:"#007FFF",b:"#F7D618",label:"DR CONGO"},
  sahel:{icon:"🏜️",a:"#eab308",b:"#22c55e",label:"SAHEL"},
  indopak:{icon:"🇮🇳🇵🇰",a:"#FF9933",b:"#01411C",label:"INDIA-PAKISTAN"},
  pakafghan:{icon:"🇵🇰🇦🇫",a:"#01411C",b:"#CE1126",label:"PAKISTAN-AFGHAN"},
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

const FAQ_ITEMS=[
  {q:"How often is this updated?",a:"Twice daily, by 8:00 PM EST."},
  {q:"Who built this?",a:"Dylan Fuqua (@fuquad08)."},
  {q:"What is this?",a:"An unclassified OSINT dashboard tracking active and simmering conflicts worldwide — casualties, displacement, and daily developments across each theater."},
  {q:"Where does the data come from?",a:"Open-source reporting and public statements compiled and summarized manually each cycle."},
];

function FaqModal({open,onClose,t}){
  if(!open) return null;
  return <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:950,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"flex-end",justifyContent:"center",animation:"fadeIn .18s ease-out"}}>
    <div onClick={e=>e.stopPropagation()} style={{background:t.card,width:"100%",maxWidth:480,borderRadius:"16px 16px 0 0",border:`1px solid ${t.border}`,borderBottom:"none",padding:"18px 18px 26px",fontFamily:FONT,color:t.text,maxHeight:"78vh",overflowY:"auto"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
        <h2 style={{fontSize:14,fontWeight:800,letterSpacing:".04em",margin:0}}>FAQ</h2>
        <button onClick={onClose} aria-label="Close FAQ" style={{background:"none",border:`1px solid ${t.border}`,borderRadius:8,color:t.sub,fontSize:13,padding:"3px 9px",cursor:"pointer",fontFamily:FONT}}>✕</button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {FAQ_ITEMS.map((item,i)=><div key={i}>
          <div style={{fontSize:12,fontWeight:700,color:t.isDark?"#e4ecf6":t.text,marginBottom:3}}>{item.q}</div>
          <div style={{fontSize:11.5,color:t.sub,lineHeight:1.5}}>{item.a}</div>
        </div>)}
      </div>
      <div style={{marginTop:16,paddingTop:12,borderTop:`1px solid ${t.sep}`,fontSize:10,color:t.sub,letterSpacing:".03em",textAlign:"center"}}>
        Unclassified · OSINT · Updated 2x daily by 8:00 PM EST · @fuquad08
      </div>
      <div style={{marginTop:6,fontSize:9,color:t.sub,opacity:.6,letterSpacing:".04em",textAlign:"center"}}>
        Build #{BUILD_NUMBER}
      </div>
    </div>
  </div>;
}

export default function Dashboard({initialView,initialSection,initialTab}={}){
  const[showSplash,setShowSplash]=useState(!initialView||initialView==="today");
  const isLandscape=useIsLandscape();
  const[dark,setDark]=useState(true);
  const[view,setView]=useState(initialView||"today");
  const[selectedConflict,setSelectedConflict]=useState(initialSection||"ukraine");
  const[paletteOpen,setPaletteOpen]=useState(false);const[pendingTab,setPendingTab]=useState(initialTab||null);
  const[faqOpen,setFaqOpen]=useState(false);
  const[flash,setFlash]=useState(null);
  const flashN=useRef(0);
  const t={...(dark?DARK:LIGHT),isLandscape};
  const touchStartX=useRef(null);
  const criticalCount=NEWS.filter(n=>n.severity==="critical").slice(0,5).length;
  const _tp=Math.min(99,criticalCount*12+NEWS.filter(n=>n.severity==="major").length*5+NEWS.filter(n=>n.severity==="watch").length*2);const threatLevel=_tp>=80?{color:"#ef4444",label:"CRITICAL",pct:_tp}:_tp>=60?{color:"#f97316",label:"SEVERE",pct:_tp}:_tp>=35?{color:"#eab308",label:"HIGH",pct:_tp}:{color:"#22c55e",label:"ELEVATED",pct:_tp};

  useEffect(()=>{const handler=e=>{if((e.metaKey||e.ctrlKey)&&e.key==="k"){e.preventDefault();setPaletteOpen(p=>!p);}};window.addEventListener("keydown",handler);return()=>window.removeEventListener("keydown",handler);},[]);

  const triggerFlash=(id)=>{flashN.current+=1;const n=flashN.current;setFlash({id,n});setTimeout(()=>{setFlash(f=>f&&f.n===n?null:f);},950);};
  useEffect(()=>{if(!showSplash&&view==="deepdive"&&selectedConflict!=="africa"&&selectedConflict!=="southasia")triggerFlash(selectedConflict);},[selectedConflict,view]);

  const handleSwipe=deltaX=>{if(Math.abs(deltaX)<60)return;const views=VIEWS.map(v=>v.id);const idx=views.indexOf(view);if(deltaX<0&&idx<views.length-1)setView(views[idx+1]);else if(deltaX>0&&idx>0)setView(views[idx-1]);};
  const handleNavigate=(sectionId,tabId)=>{setSelectedConflict(sectionId);setPendingTab(tabId||null);setView("deepdive");setPaletteOpen(false);};

  return <div style={{background:t.bg,minHeight:"100vh",maxWidth:t.isLandscape?900:480,margin:"0 auto",fontFamily:FONT,lineHeight:1.5,WebkitFontSmoothing:"antialiased",paddingBottom:34,position:"relative"}} className={t.isDark?"t-dark":""}>
    <style dangerouslySetInnerHTML={{__html:GCSS+NAV_ANIM_CSS}}/>
    <div className="grain-overlay"/>
    <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:90,pointerEvents:"none",background:"#1f6f43",color:"#e8f5ec",fontSize:8,fontWeight:700,letterSpacing:".2em",textAlign:"center",padding:"2px 0",fontFamily:FONT,textTransform:"uppercase",maxWidth:t.isLandscape?900:480,margin:"0 auto"}}>Unclassified · OSINT · @FUQUAD08</div>
    {showSplash&&<SplashScreen onDone={()=>setShowSplash(false)}/>}
    <NavBurst flash={flash}/>
    <CommandPalette open={paletteOpen} onClose={()=>setPaletteOpen(false)} sections={SECTIONS} onNavigate={handleNavigate} t={t}/>
    <FaqModal open={faqOpen} onClose={()=>setFaqOpen(false)} t={t}/>
    <div style={{background:t.isDark?"linear-gradient(180deg,#070c13,#0b131d)":t.card,borderBottom:"2px solid rgba(120,150,180,0.30)",position:"sticky",top:0,zIndex:100}}>
      <div style={{background:"#1f6f43",color:"#e8f5ec",fontSize:8,fontWeight:700,letterSpacing:".18em",padding:"2px 10px",fontFamily:FONT,textTransform:"uppercase",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`2px solid ${threatLevel.color}`}}>
        <span>Unclassified · OSINT</span>
        <span style={{color:threatLevel.color,fontWeight:800,letterSpacing:".1em",fontFamily:"monospace"}}>{threatLevel.label}</span>
      </div>
      <div style={{padding:"7px 12px 0"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{width:7,height:7,borderRadius:"50%",background:"#ef4444",display:"inline-block",animation:"blink 1.4s ease-in-out infinite",flexShrink:0}}/>
          <h1 style={{fontSize:14,fontWeight:800,color:t.isDark?"#e4ecf6":t.text,letterSpacing:"-.01em",margin:0,flex:1,minWidth:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>WORLD CONFLICT DEBRIEF<span className="tt-cursor"/><span style={{position:"absolute",width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0,0,0,0)",whiteSpace:"nowrap",border:0}}> — Live OSINT Dashboard Tracking Global Conflicts.</span></h1>
          <button className="pill-tab" onClick={()=>setFaqOpen(true)} aria-label="Open FAQ" style={{background:t.isDark?"rgba(59,130,246,0.12)":"rgba(59,130,246,0.08)",border:`1px solid ${t.border}`,borderRadius:8,padding:"5px 9px",cursor:"pointer",color:t.sub,fontSize:12,fontWeight:800,fontFamily:FONT,flexShrink:0}}>❓</button>
          <button className="pill-tab" onClick={()=>setPaletteOpen(true)} aria-label="Open search" style={{background:t.isDark?"rgba(59,130,246,0.12)":"rgba(59,130,246,0.08)",border:`1px solid ${t.border}`,borderRadius:8,padding:"5px 10px",cursor:"pointer",color:t.sub,fontSize:12,fontFamily:FONT,flexShrink:0}}>🔍 <span style={{fontSize:10}}>⌘K</span></button>
          <button className="pill-tab" onClick={()=>setDark(d=>!d)} aria-label={dark?"Switch to light mode":"Switch to dark mode"} style={{background:t.isDark?"rgba(59,130,246,0.12)":"rgba(59,130,246,0.08)",border:`1px solid ${t.border}`,borderRadius:8,padding:"5px 9px",cursor:"pointer",fontSize:16,fontFamily:FONT,flexShrink:0}}>{dark?"☀️":"🌙"}</button>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:2,paddingLeft:15}}>
          <span style={{fontSize:10,color:t.sub,letterSpacing:".03em"}}>As of {REPORT_NOW.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}).toUpperCase()}</span>
          <span style={{fontSize:10,color:t.sub,letterSpacing:".03em",fontWeight:600}}>WAR DAY {getWarDay()}</span>
        </div>
      </div>
      <div style={{padding:"7px 12px 8px"}}>
        <a href="https://buymeacoffee.com/fuquad08" target="_blank" rel="noopener noreferrer" aria-label="Support this project on Buy Me a Coffee" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,width:"100%",boxSizing:"border-box",fontSize:13,fontWeight:800,color:"#5b8ec8",letterSpacing:".04em",fontFamily:FONT,textDecoration:"none",border:`1.5px solid ${t.isDark?"rgba(91,142,200,0.5)":"rgba(91,142,200,0.4)"}`,background:t.isDark?"rgba(91,142,200,0.10)":"rgba(91,142,200,0.07)",borderRadius:10,padding:"8px 16px"}}>☕ <span>SUPPORT THIS PROJECT</span></a>
      </div>
      <div style={{display:"flex",gap:0}}>
        {VIEWS.map(v=>{const badge=v.id==="today"&&criticalCount>0?criticalCount:v.id==="theaters"&&CONFLICTS.length?CONFLICTS.length:0;return <button key={v.id} onClick={()=>setView(v.id)} style={{flex:1,padding:"8px 4px 10px",background:"none",border:"none",borderBottom:view===v.id?"2px solid #5b8ec8":"2px solid transparent",cursor:"pointer",fontFamily:FONT,fontSize:12,fontWeight:view===v.id?700:400,color:view===v.id?"#5b8ec8":t.sub,display:"flex",alignItems:"center",justifyContent:"center",gap:5,position:"relative"}}><span style={{fontSize:14}}>{v.icon}</span><span>{v.label}</span>{badge>0&&<span style={{background:v.id==="today"?"#ef4444":"#5b8ec8",color:"#fff",borderRadius:10,fontSize:9,fontWeight:800,padding:"1px 5px",lineHeight:1.5,minWidth:16,textAlign:"center",display:"inline-block",animation:v.id==="today"?"splashPulse 1.8s ease-in-out infinite":"none"}}>{badge}</span>}</button>;})}
      </div>
      <NewsTicker/>
    </div>
    <div onTouchStart={e=>{touchStartX.current=e.touches[0].clientX;}} onTouchEnd={e=>{if(touchStartX.current!==null){handleSwipe(touchStartX.current-e.changedTouches[0].clientX);touchStartX.current=null;}}}>
      {view==="today"&&<TodayView t={t}/>}
      {view==="theaters"&&<div style={{padding:"16px 16px 0",animation:"fadeIn .25s ease-out",position:"relative"}}><SJMark size={26} style={{bottom:10,right:8,transform:"rotate(-4deg)"}}/><WorldMap t={t} conflicts={CONFLICTS} onSelect={id=>{const sectionId=id==="south-china-sea"||id==="taiwan"?"scs":(SECTION_MAP[id]??id);const tabId=NESTED_TAB_IDS.includes(id)?id:undefined;setSelectedConflict(sectionId);setPendingTab(tabId||null);setView("deepdive");}} selectedId={selectedConflict==="scs"?"south-china-sea":selectedConflict}/><TheatersOverview t={t} conflicts={CONFLICTS} onSelectConflict={(id,tabId)=>{setSelectedConflict(id);setPendingTab(tabId||null);setView("deepdive");}}/></div>}
      {view==="deepdive"&&<DeepDiveView t={t} selectedConflict={selectedConflict} setSelectedConflict={setSelectedConflict} initialTab={pendingTab} onFlash={triggerFlash}/>}
    </div>
  </div>;
}

