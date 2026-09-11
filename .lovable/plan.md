# Dashboard Redesign Plan: Editorial Intelligence Journal

## What we're building
Replace the current dark, terminal-style World Conflict Debrief dashboard with the chosen "Editorial Intelligence Journal" direction: a clean, full-width, newsroom/OSINT briefing surface using the **Ink & Parchment** palette and **Outfit + Figtree** typography.

## Scope
- Redesign `src/components/WorldConflictDebrief.jsx` to match the v3 prototype structure.
- Keep all existing conflict data, summaries, status colors, route links, daily briefing, and attribution.
- Add two new major sections:
  1. **Interactive conflict map** — lightweight SVG/vector map of tracked theaters with status markers.
  2. **Analytics/charts band** — presentational bar, donut, and trend charts built with SVG/CSS (no new heavy charting library unless necessary).
- Update global styling to support the new palette and fonts.
- Maintain mobile and laptop responsiveness.
- Preserve the existing `BUILD_NUMBER` rule: bump by +1 since this is an agent edit to the dashboard.
- Keep attribution strings `EnforcerOfficial` and `@FUQUAD08`.

## Files to change
1. `src/components/WorldConflictDebrief.jsx` — full component redesign (convert from inline styles to Tailwind classes per the chosen direction).
2. `src/styles.css` — add Ink & Parchment semantic tokens and register Outfit/Figtree font families.
3. `src/routes/__root.tsx` — load Outfit and Figtree Google Fonts via `<link>`.
4. `src/routes/index.tsx` — minor adjustments only if the root route wrapper needs to accommodate the new layout.

## Out of scope
- No new backend/data fetching (dashboard remains driven by existing static data).
- No changes to background pages, sitemap, RSS, robots.txt, or MCP files.
- No real-time external data feeds.

## Verification
- Confirm `BUILD_NUMBER` incremented by exactly 1.
- Confirm `EnforcerOfficial` and `@FUQUAD08` present.
- Confirm zero `fetch(` calls added.
- Run typecheck and review build-errors.log.
- Check desktop and mobile preview for layout regressions.