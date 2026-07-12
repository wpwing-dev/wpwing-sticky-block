# Competitor Analysis - Sticky Block for Gutenberg

Last researched: 11/07/2026. Data from wordpress.org plugin directory.

## Our position

- Slug: `wpwing-sticky-block`, v2.6.0, fewer than 10 active installs, no reviews yet (recently listed)
- Strengths: most complete free feature set in the block-based niche - bottom sticky, dismissible with expiry, entry/exit transitions with easing, scale effect, full sticky-state styling (background, text color, shadow, border, radius, opacity, padding), scroll trigger offset, stop-before element, responsive disable both ways, JS events, block transforms, reduced-motion support, no jQuery
- Weakness: zero visibility - no installs, no reviews, no translations

## Direct competitors (Gutenberg block based)

### 1. Sticky Block for Gutenberg Editor (`sticky-block`)

- 7,000+ installs, 4.6/5 (11 reviews), v1.11.1, free
- Last updated: ~6 months ago (tested up to WP 6.9.4 only) - appears to be coasting
- Features: container block, top offset, z-index, admin bar aware, min/max screen width, push-up element, `.block-is-sticky` / `.block-is-not-sticky` classes, 7 translations
- Our take: the plugin we most directly compete with, nearly identical name and concept. We beat it on every styling/behavior feature. It wins on installs, reviews, age, and translations. Its "push-up element" is roughly our "stop before". Its staleness is our opening.

### 2. Sticky Content - Make Any Section Sticky on Scroll (`sticky-menu-block`, bPlugins)

- 400+ installs, 3/5 (1 review), v2.0.1, freemium
- Last updated: 08/07/2026 - actively developed, shipping fast
- Free: sticky block + shortcode, top offset, sticky background, padding
- Pro: sticky modes (Always / After Scroll / While in View), custom start/end triggers (ID, selector, pixel), % positioning, independent static vs sticky styling, border/radius/shadow, z-index, container-confined sticky, fade/slide/scale/zoom transitions with duration/delay/easing, opacity/transform
- Our take: the most feature-comparable rival, but they paywall almost everything we give away free. "Free where they charge" is a strong review-magnet angle. Watch their releases weekly. Their "While in View" / container-confined mode is the one capability we lack.

## Indirect competitors (selector-based, not blocks)

### 3. Sticky Menu & Sticky Header (`sticky-menu-or-anything-on-scroll`, WebFactory)

- 100,000+ installs, 4.7/5 (759 reviews), v2.35, freemium (WP Sticky PRO)
- Last updated: 15/04/2026
- Free: stick any element by selector, top spacing, min/max screen width, push-up element, admin bar aware, z-index, legacy/dynamic modes, debug mode
- Pro: multiple sticky elements, per-page activation, visual element picker
- Our take: category leader. Free version allows only ONE sticky element - we allow unlimited. Selector-based config intimidates non-technical users; our in-editor UX is the differentiator to message against.

### 4. My Sticky Bar (`mystickymenu`, Premio)

- 100,000+ installs, 4.9/5 (1,193 reviews), v2.9.1, freemium
- Last updated: ~2 weeks ago - very active
- Free: sticky menu/header with fade/slide, welcome/notification bar with buttons, contact form, countdown timer, 10 locales, custom CSS, z-index/opacity, mobile settings
- Pro: multiple bars, page targeting, news ticker, geo targeting, coupon codes, scheduling, scroll/time triggers, bottom bar
- Our take: really a notification-bar product that also does sticky headers. Its pro features (page targeting, scheduling, time triggers) show what people pay for. Any block can be nested in our container, which covers its countdown/CTA use cases natively.

### 5. Fixed Widget and Sticky Elements (`q2w3-fixed-widget`)

- 80,000+ installs, 4.7/5 (261 reviews), v6.2.3, free
- Last updated: March 2023 - effectively abandoned (tested up to WP 6.2 only)
- Features: sticky widgets/blocks, top/bottom margins, stop elements, min screen width/height, plain JS
- Our take: huge abandoned install base in the sticky-sidebar niche. A "sticky sidebar" use case (container-confined sticky) would let us pick up its refugees.

### 6. All-in-One Sticky Anything (`all-in-one-wp-sticky-anything`)

- 1,000+ installs, 4.9/5 (15 reviews), v1.1.4, free
- Last updated: 22/05/2026
- Features: click-to-call, fixed widgets, sticky header/menu/sidebar, social icons, cookie consent, TOC, Elementor integration
- Our take: Swiss-army-knife approach, mostly Elementor-focused. Not a direct threat in the Gutenberg niche.

### 7. Sticky Sidebar for Ads and Blocks (`sticky-blocks`)

- 40+ installs, 5/5 (1 review), v1.0.5, free, last updated 08/2025
- Sticky sidebars/widgets for ads via CSS selectors from a dashboard
- Our take: negligible, but confirms demand for the sticky-ads/sidebar use case.

## Platform risk

WordPress core has an experimental "sticky position block support" for Group blocks (make.wordpress.org, 2023). It only covers basic `position: sticky` within the parent - none of our trigger offsets, state styles, transitions, dismissal, or responsive controls. Track it, but our value is everything CSS sticky cannot do.

## Feature gaps to close (things a competitor has and we do not)

1. Container-confined sticky / "While in View" mode (bPlugins pro, core sticky) - sticks only within its parent section
2. Translations (sticky-block has 7 languages; we have none)
3. Time-delay and scroll-percentage reveal triggers (My Sticky Bar pro)
4. Scheduling / date-range visibility (My Sticky Bar pro)
5. Visual editor preview of the sticky state (nobody does this well in-editor - opportunity, not just a gap)

## Positioning summary

- Message: "everything the sticky pro plugins charge for, free, native in the block editor, under 4 KB of JS"
- Nearest threat: bPlugins Sticky Content (active, freemium, same niche)
- Biggest opportunity: stale direct rival (`sticky-block`, 7k installs) and abandoned Fixed Widget (80k installs)
