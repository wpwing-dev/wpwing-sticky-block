# Update Plan - August 2026

Current version: 2.8.0. The next release is planned for Tuesday 25/08/2026.
Priorities are driven by [competitors.md](competitors.md): improve reveal behavior first, then invest in visibility through presets, translations, and editor UX.

## Shipped

- v2.7.0 - dismiss button styling controls and the editor sticky-style preview toolbar
- v2.8.0 - container-confined sticky mode with viewport-only controls handled correctly

## v2.9.0 - Tuesday 25/08/2026 - NEXT

Theme: flexible reveal triggers

Keep this release focused on extending the existing `scrollTriggerOffset` and `hideBeforeSticky` behavior. Do not include presets, translations, or unrelated styling changes in this release.

### Must ship

- [ ] Add a reveal trigger mode: immediately, after scrolling, or after a time delay
- [ ] Add time-delay seconds for the delayed mode
- [ ] Keep the existing default behavior unchanged for existing blocks
- [ ] Hide reveal controls in container mode, as they are already viewport-only
- [ ] Add editor help text and validate zero/negative/invalid values at the control boundary

### Stretch

- [ ] Add percentage-based scrolling as an alternative to the current pixel offset

### Before release

- [ ] Update `readme.txt` and in-plugin docs with examples for a back-to-top button and floating CTA
- [ ] Run build, JS/CSS lint, and manual desktop/mobile checks for top and bottom sticky positions

### Release gate

Ship only if existing blocks render unchanged, default attributes do not add unnecessary saved markup, delayed and percentage reveals work after resize, and container mode remains unaffected.

## Later

### v2.10.0 - presets + visibility

- Block variations/patterns: Sticky Nav Bar, Cookie Notice Bar, Floating CTA, and Back to Top
- Generate a `.pot` file and seed 2-3 locales
- Refresh `readme.txt` feature list and screenshots

## Ongoing (not release-gated)

- Ask happy users for reviews - we have zero; the direct rival has 11 and ranks above us
- Watch bPlugins Sticky Content releases weekly (they shipped 08/07/2026)
- Keep "Tested up to" current with WP point releases
- Candidate backlog for August: scheduling/date-range visibility, scroll progress bar, per-device offset values, sticky-state min/max width control
