# Top/Briefing Area Newsroom Reformat

## What we're building
Reformat only the top of the dashboard — the sticky masthead through the "Breaking — Principal Developments" section — into a cleaner, newsroom/journal-style layout. The rest of the dashboard (maps, charts, deep-dive tabs, theater sections, footer, and all data constants) stays untouched.

## Scope
- Redesign the sticky masthead into a single clean newsroom banner:
  - Left: title, tagline, issue date, and war day.
  - Right: global threat meter, search (⌘K), FAQ, and dark/light toggle.
  - Keep the Unclassified/OSINT strip and attribution.
- Restyle the view tabs as a minimal horizontal "Sections" nav under the masthead.
- Restyle the news ticker as a thin "Latest Wire" band.
- Reorganize the Today view into three zones:
  1. **Lead Briefing** — the current BriefingPanel as a large, editor-style summary card with an accent left rule and read-aloud control.
  2. **Front-Page Movers** — Today's Biggest Movers as a compact horizontal strip of trend cards.
  3. **At a Glance** — SituationBoard and TheaterFreshness side-by-side on laptop, stacked on mobile.
- Reformat the Breaking section as **Lead Stories**:
  - One hero lead story with a larger headline, byline/confidence/freshness tags, and first bullet.
  - A secondary list of the next two stories.
  - Keep the existing "Also developing" collapsible list unchanged in behavior, but styled to match the newsroom palette.
- Introduce a newsroom palette and typography via the existing inline GCSS string:
  - Light mode: warm parchment background, near-black ink text, subtle warm-gray rules, signal-blue accents.
  - Dark mode: deep charcoal "late-edition" background, warm off-white text, muted rules, same signal-blue accents.
  - Add a serif display font (Newsreader or Merriweather) for headlines and a clean sans (Inter) for body copy, loaded through an `@import` inside the component's existing `<style>` block.
- Preserve all existing interactions: view switching, conflict selection, command palette, FAQ modal, dark/light toggle, read-aloud, news-ticker expand/collapse, and mobile swipe.

## Files to change
1. `src/components/WorldConflictDebrief.jsx` — masthead, tabs, ticker, TodayView layout, and newsroom theme additions only. No new files.

## Out of scope
- No changes to deep-dive sections, maps, charts, or data constants.
- No changes to `src/styles.css`, `src/routes/__root.tsx`, `src/routes/index.tsx`, background pages, `sitemap[.]xml.ts`, `feed[.]xml.ts`, `briefings.ts`, `robots.txt`, or `package.json`.
- No new backend, no `fetch(` calls, no new npm dependencies, no lazy loading or file splitting.

## Invariants to preserve
- Keep the dashboard as one file with 100% inline styles (no Tailwind classes).
- Bump `BUILD_NUMBER` from `201` to `202` since this is an agent edit to the dashboard.
- Keep the attributions `EnforcerOfficial` and `@FUQUAD08` intact.
- Keep the two SSR guards verbatim: `const[isLandscape,setIsLandscape]=useState(false)` and the `<style dangerouslySetInnerHTML={{__html:GCSS+NAV_ANIM_CSS}}/>` tag.

## Verification
- Confirm `BUILD_NUMBER` is `202`.
- Confirm `EnforcerOfficial` and `@FUQUAD08` are still present.
- Confirm zero new `fetch(` calls.
- Run `bunx tsgo` and check `/tmp/observability/build-errors.log` for a clean build.
- Capture Playwright screenshots at laptop (1280×1800) and mobile (402×725) to verify the masthead, lead briefing, movers, at-a-glance grid, and lead stories render without overlap or console errors.
