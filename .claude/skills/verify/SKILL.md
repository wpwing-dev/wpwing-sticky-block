---
name: verify
description: Verify frontend changes to the sticky block by driving the built assets in headless Chrome
---

# Verifying wpwing-sticky-block changes

The block's frontend surface is stored HTML + `build/frontend.js` + `build/style-index.css` - WordPress only serves them, so a static harness page is the real runtime surface. The Local WP site (plugins-dev.local) is usually not running; don't start it.

## Recipe

1. `npm run build` (wp-scripts, node_modules already installed).
2. Copy `build/frontend.js` and `build/style-index.css` into a scratch dir.
3. Write a harness HTML page with the block markup exactly as `src/save.js` emits it: root `div.wp-block-wpwing-sticky-block` with `data-*` attributes (non-default values only), inner content, dismiss button markup if testing dismissible. Register listeners for `wpwing:sticky` / `wpwing:unsticky` / `wpwing:dismiss` into `window.__events` before loading `frontend.js`.
4. Drive with puppeteer-core (in node_modules via @wordpress/scripts) + system Chrome:
   `NODE_PATH=<plugin>/node_modules node drive.js` with `executablePath: '/usr/bin/google-chrome'`, args `--no-sandbox --disable-dev-shm-usage`.
5. Scroll via `window.scrollTo`, wait ~150ms for the rAF-throttled update, then read classes, `getComputedStyle().position`, rects, and `window.__events`.

## Gotchas

- `npx wp-scripts lint-js` default formatter crashes on this Node (util.styleText); use `--format json`. Lint has heavy pre-existing prettier noise - filter to substantive rules.
- CSS specificity ties in `style.scss` are resolved by source order; the `:has(> .wpwing-sticky-dismiss)` rule must stay ABOVE the sticky positioning rules (caused a shipped bug where dismissible blocks never stuck, fixed in 2.8.0).
- Editor UI (edit.js) changes can't be exercised this way - they need the WP editor running.
- Give harness blocks content above them so load state and pinned state differ (a block whose natural position equals the sticky offset is "stuck" at load).
