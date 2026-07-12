# Update Plan - July/August 2026

Weekly release cadence, every Sunday. Current version: 2.6.0 (released 05/07/2026).
Priorities driven by [competitors.md](competitors.md) - close the container-confined sticky gap, add the reveal triggers competitors paywall, and invest in visibility (translations, presets, editor UX).

## v2.7.0 - Sunday 12/07/2026 - SHIPPED

Theme: dismiss button polish + editor preview (small scope, one day out)

- [x] Dismiss button styling controls - icon color, background color, and size (`dismissButtonColor`, `dismissButtonBackground`, `dismissButtonSize` attributes, CSS vars on the button, defaults omit the style attribute so existing blocks stay valid)
- [x] "Preview sticky styles" in the editor toolbar - the panel toggle already existed (shipped silently in 2.6.0, never announced); 2.7.0 adds a toolbar eye button for it and announces the feature in readme.txt
- [ ] Fix pass: no support-forum reports existed for 2.6.0 - nothing to fix

## v2.8.0 - Sunday 19/07/2026

Theme: container-confined sticky (biggest feature gap)

- New: "Stick within parent" mode - the block stays sticky only while its parent container is in view, then scrolls away with it. Covers the sticky-sidebar and side-by-side-content use cases (bPlugins pro feature, Fixed Widget's whole niche)
- New: pick between viewport mode (current fixed behavior) and container mode per block
- Ensure stop-before, offsets, and transitions behave sensibly in container mode (disable what does not apply)

## v2.9.0 - Sunday 26/07/2026

Theme: reveal triggers (what My Sticky Bar sells as pro)

- New: "Show after time delay" - reveal the sticky block N seconds after page load
- New: "Show after scrolling X% of the page" - percentage-based alternative to the existing pixel trigger offset
- New: optional "hide again when scrolled back above trigger" refinement for show-only-after-scrolling
- Improvement: consolidate the trigger controls into one clear "Reveal" panel (pixels / percent / time)

## v2.10.0 - Sunday 02/08/2026

Theme: presets + visibility push

- New: block variations/patterns shipped with the plugin - "Sticky Nav Bar", "Cookie Notice Bar" (bottom + dismissible), "Floating CTA" (bottom + show after scroll), "Back to Top" - one-click starting points that showcase existing features
- New: generate .pot file and set up translations; seed 2-3 locales (competitor sticky-block ships 7 languages)
- Improvement: refresh readme.txt feature list and screenshots to cover 2.7-2.10 features

## Ongoing (not release-gated)

- Ask happy users for reviews - we have zero; the direct rival has 11 and ranks above us
- Watch bPlugins Sticky Content releases weekly (they shipped 08/07/2026)
- Keep "Tested up to" current with WP point releases
- Candidate backlog for August: scheduling/date-range visibility, scroll progress bar, per-device offset values, sticky-state min/max width control
