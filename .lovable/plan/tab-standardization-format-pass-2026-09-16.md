# Tab Standardization & Format Pass

Bring every tab on the dashboard — all 14 Ukraine sub-tabs and all theater / cross-theater sections — onto one shared layout skeleton and one card style.

## What I found

A structural scan of each tab shows the inconsistencies are real and concentrated:

- **Missing summary header.** Losses, Frontline, Arsenal and Analysts open straight into content with no summary panel, while Air Defense, Naval Losses, Crimea, Black Sea, NATO, Manpower, Strikes, Economy, Intel and Diplomacy all open with one.
- **Summary panel exists but has no stat grid.** Diplomacy, Economy and Intel use a hand-rolled layout instead of the shared stat grid every other summary uses.
- **No section headers at all.** Strikes and Economy have zero section headings, so their cards run together as one undifferentiated block.
- **Theater sections diverge.** Gaza, Iran, Africa, South Asia, Venezuela and South China Sea each lead with an overview card; Belarus, Cyber and US Military don't. An events timeline closes Gaza, Iran, Belarus, Venezuela and South China Sea but is absent from Cyber, US Military, Africa and South Asia.

## The standard every tab will follow

```text
1. Summary panel      — headline status + stat grid (shared components)
2. Section header     — every content block gets a labelled header
3. Content cards      — shared card style, consistent padding and left accent rule
4. Context note       — optional, shared note style
5. Events timeline    — closes the tab where event data exists
```

Theater sections additionally lead with the shared overview card before the summary panel.

## Work

1. **Ukraine sub-tabs (14).** Add a summary panel to Losses, Frontline, Arsenal and Analysts built from figures already in those tabs. Convert the hand-rolled summary layouts in Diplomacy, Economy and Intel to the shared stat grid. Add section headers to Strikes and Economy.
2. **Theater sections.** Add the shared overview card to Belarus, Cyber and US Military. Add the closing events timeline to Cyber, US Military, Africa and South Asia where event data exists for that theater; skip any theater with no events rather than inventing them.
3. **Card styling sweep.** Normalize one-off card padding, border radius, accent-rule width and header sizing across every tab to match the shared card style. Status pills and chips use the existing colour set unchanged.
4. **No content invention.** Every figure, date and sentence stays as written. This pass moves and restyles existing content only; nothing new is written and nothing is deleted except duplicated headings made redundant by the standard order.

## Technical notes

- Single file: `src/components/WorldConflictDebrief.jsx`. No other file changes.
- 100% inline styles — no Tailwind conversion, no refactoring or file splitting, no `fetch(` calls, no new dependencies.
- Both SSR guards preserved verbatim: the `isLandscape` state and the `<style dangerouslySetInnerHTML>` block.
- Attributions `EnforcerOfficial` and `@FUQUAD08` preserved.
- `BUILD_NUMBER` 216 → 217 (agent edit).
- The unused `SituationBoard` definition stays in place, untouched.

## Verification

- Structural re-scan confirming every tab matches the skeleton.
- `bunx tsgo` and a clean build log.
- Playwright pass at 1280x1800 and 402x725 with no console errors, spot-checking Ukraine sub-tabs and each theater.
- Grep-confirm build number, SSR guards, attributions, and zero new `fetch(`.
