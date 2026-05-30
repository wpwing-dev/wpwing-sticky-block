=== WPWing Sticky Block ===

Contributors:      wpwing, voboghure
Tags:              sticky, sticky block, gutenberg, block editor, fixed
Requires at least: 5.8
Tested up to:      7.0
Requires PHP:      7.4
Stable tag:        2.1.0
License:           GPL-3.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-3.0.html

Make any block sticky. A lightweight Gutenberg container block that fixes its content to the top of the viewport as visitors scroll — no coding required.

== Description ==

**WPWing Sticky Block** is a Gutenberg container block that sticks to the top of the page once the visitor scrolls past it. Drop any blocks inside — a navigation menu, a call-to-action, a contact button, a sidebar widget — and they will follow the reader down the page.

Unlike CSS `position: sticky` (which only works within its parent scroll container), WPWing Sticky Block uses `position: fixed` with intelligent scroll detection, so it works reliably in any layout.

= Key Features =

* **Multiple sticky blocks per page** — place as many sticky blocks as you need, each with its own settings.
* **Container block** — nest any Gutenberg blocks inside: navigation, buttons, headings, images, widgets.
* **Top offset** — set how many pixels of space to leave between the sticky block and the top of the viewport.
* **Admin toolbar aware** — automatically shifts down for logged-in users who have the WordPress admin bar visible.
* **Z-index control** — fine-tune stacking order so the sticky block always sits above (or below) other elements.
* **Scroll direction mode** — choose "Always sticky" or "Only while scrolling up" (the pattern used by modern sticky headers that appear on the way back up).
* **Stop before an element** — un-stick the block before it overlaps a footer or another landmark, using a CSS selector (e.g. `#footer`).
* **Disable on mobile** — turn off sticky behaviour below a configurable viewport breakpoint (default 768 px).
* **Sticky-state background color** — set a background color that only appears while the block is stuck, e.g. a solid white behind a transparent nav.
* **Sticky-state text color** — change the text color when sticky, so a transparent header with light text can switch to dark text on a white background.
* **Sticky-state shadow** — add a drop shadow (Small / Medium / Large) that appears only when the block is in sticky position.
* **Sticky-state top padding** — add extra breathing room above the content when the block is stuck.
* **Full width when sticky** — instantly expand the block to span the full viewport width the moment it becomes sticky, ideal for navigation bars.
* **Entry transition** — animate the block smoothly into view with a Fade, Slide down, or combined Fade + Slide effect, with a configurable duration.
* **Accessibility** — set an `aria-label` on the sticky wrapper to give screen reader users useful context.
* **Zero dependencies** — no jQuery. The frontend script is plain JavaScript, under 3 KB minified.

= How to use =

1. In the block editor, search for **Sticky Block** and insert it anywhere on your page.
2. Add blocks inside it — a Navigation block, a Button, a Group, anything you like.
3. Open the block settings panel on the right and adjust offset, z-index, scroll behaviour, and sticky-state styles.
4. Preview your page and scroll — the block will stick to the top.

== Installation ==

= Automatic installation =

1. Go to **Plugins → Add New** in your WordPress admin.
2. Search for **WPWing Sticky Block**.
3. Click **Install Now**, then **Activate**.

= Manual installation =

1. Download the plugin ZIP from WordPress.org.
2. Go to **Plugins → Add New → Upload Plugin**.
3. Upload the ZIP and activate.

== Frequently Asked Questions ==

= Can I add more than one sticky block on a page? =

Yes — v2.0.0 fully supports multiple sticky blocks on the same page. Each block has its own independent settings and scroll listener.

= Does it work with the full-site editor (FSE)? =

Yes. The block works in both the classic page/post editor and the full-site editor (Site Editor) in WordPress 5.9+.

= Why does my sticky block not work inside a column or group? =

If a parent element has `overflow: hidden` or `overflow: clip` set, `position: fixed` will be clipped to that container and may not behave as expected. Remove the overflow restriction on the parent, or move the sticky block outside the constrained container.

= Can I disable sticky behaviour on phones? =

Yes. Open the **Responsive** panel in the block settings and enable "Disable sticky on mobile". You can also adjust the breakpoint (default: 768 px).

= How do I make the block stop before the footer? =

Open the **Behavior** panel and enter a CSS selector in the "Stop before element" field — for example `#footer` or `.site-footer`. The block will un-stick before its bottom reaches that element.

= Will it conflict with my theme's sticky header? =

It should not conflict, but if both your theme and the plugin apply `position: fixed` to overlapping elements, adjust the **Z-index** setting in the block sidebar to control which element sits on top.

== Screenshots ==

1. WPWing Sticky Block in the block inserter.
2. A sticky block with inner content shown in the editor.
3. The block settings sidebar — Sticky Options, Behavior, Responsive, Accessibility, and Sticky State Styles panels.
4. The block in action on the frontend in sticky (fixed) position.

== Changelog ==

= 2.1.0 =
* New: **Entry transition** — choose how the sticky block animates into view when it becomes stuck. Options: Fade, Slide down, or Fade + Slide (combined). Duration is adjustable from 50 ms to 600 ms. Previously the block snapped into position with no animation.
* New: **Full width when sticky** — a single toggle that expands the block to span the entire viewport width the moment it becomes sticky. Perfect for navigation bars and announcement banners that need edge-to-edge coverage.
* New: **Text color when sticky** — set a different text color for the sticky state. Combine with the existing sticky background color to build the classic transparent-header-to-solid effect: light text on a transparent background that switches to dark text on white when the user scrolls.

= 2.0.0 =
* New: multiple sticky blocks supported per page (removed the single-block limitation).
* New: "Only while scrolling up" scroll direction mode.
* New: Stop-before-element setting — un-stick before a chosen element (e.g. footer).
* New: Disable-on-mobile toggle with configurable breakpoint.
* New: Sticky-state background color (shown only when the block is stuck).
* New: Sticky-state shadow presets (Small / Medium / Large).
* New: Sticky-state top-padding control.
* New: ARIA label control for accessibility.
* Improvement: Rewrote frontend script in vanilla JavaScript — no jQuery dependency.
* Improvement: Scroll handler uses requestAnimationFrame for smooth, jank-free performance.
* Improvement: Upgraded to Gutenberg Block API v3.
* Improvement: Frontend script registered via block.json viewScript — loads only on pages that contain the block.
* Fix: Editor border style now correctly targets the block wrapper class.
* Fix: adminBarHeight variable scope (was implicit global).
* Fix: stopBefore check now evaluated before sticky is applied, preventing a one-frame flicker.
* Fix: Trigger position (divTop) and block width recalculated on viewport resize to handle layout reflows.
* Fix: Minimum WordPress version corrected to 5.8 (was incorrectly listed as 4.8 in readme).
* Tested up to WordPress 7.0.

= 1.0.1 =
* Minor fixes.

= 1.0.0 =
* Initial release.
