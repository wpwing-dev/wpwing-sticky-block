# Update Plan - September 2026

Current version: 2.10.0. Released Tuesday 01/09/2026.
Priorities are driven by [competitors.md](competitors.md): improve reveal behavior first, then invest in visibility through presets, translations, and editor UX.

## Shipped

- v2.7.0 - dismiss button styling controls and the editor sticky-style preview toolbar
- v2.8.0 - container-confined sticky mode with viewport-only controls handled correctly
- v2.9.0 - flexible reveal triggers (immediate/scroll/delay modes, percentage-based scroll trigger)
- v2.10.0 - presets + visibility (see below)

## v2.10.0 - Tuesday 01/09/2026 - SHIPPED

Theme: presets + visibility

### Must ship

- [x] Register 4 presets: Sticky Nav Bar, Cookie Notice Bar, Floating CTA, Back to Top - implemented as **block variations** (`src/variations.js`), not PHP patterns. This WordPress version (7.0) strips a pattern's root-block attributes on insert while keeping inner-block attributes intact - variations pass attributes as structured JS objects instead of parsed HTML, sidestepping that entirely. Re-check this against future core versions before reusing the patterns approach elsewhere.
- [x] Add corner-anchored layout CSS for the Floating CTA / Back to Top presets (via `stickyExtraClass`) - needed `!important` on `width`, since `frontend.js` locks an inline `width` on any non-full-width sticky block to prevent reflow, which otherwise beats a plain stylesheet rule.
- [x] Generate a `.pot` file and seed 3 locales (es_ES, fr_FR, de_DE) - `make make-pot` / `make make-mo` (new Makefile targets, wpcli-based). Also required `wp i18n make-json` for the JS-side (editor) strings, which the `.mo` alone does not cover.

### Before release

- [x] Refresh `readme.txt` feature list with the new patterns and translations
- [x] Add a 2.10.0 changelog entry
- [x] Capture fresh screenshots (inserter, editor, sidebar, frontend) into `assets/screenshots/`
- [x] Update `package.json` `dist` script to include `languages/`

### Release gate

Shipped: all 4 presets insert cleanly and render as intended (full-width bar vs. corner-anchored button), translated strings load correctly per locale (verified es_ES end-to-end in-browser), and lint/build/Playwright suites pass (lint has pre-existing, unrelated failures on `master` - not introduced by this release, not blocking).

## Later

- Candidate backlog items below remain unscheduled.

## Ongoing (not release-gated)

- Ask happy users for reviews - we have zero; the direct rival has 11 and ranks above us
- Watch bPlugins Sticky Content releases weekly (they shipped 08/07/2026)
- Keep "Tested up to" current with WP point releases
- Candidate backlog for August: scheduling/date-range visibility, scroll progress bar, per-device offset values, sticky-state min/max width control
