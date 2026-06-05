=== Sticky Block for Gutenberg ===

Contributors:      wpwing, voboghure
Tags:              sticky, sticky block, gutenberg, block editor, fixed
Requires at least: 5.8
Tested up to:      7.0
Requires PHP:      7.4
Stable tag:        2.2.0
License:           GPL-3.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-3.0.html

Make any block sticky. A lightweight Gutenberg container block that fixes its content to the top of the viewport as visitors scroll — no coding required.

== Description ==

**Sticky Block for Gutenberg** is a container block that sticks to the top of the page once the visitor scrolls past it. Drop any blocks inside — a navigation menu, a call-to-action, a contact button, a sidebar widget — and they will follow the reader down the page.

Unlike CSS `position: sticky` (which only works within its parent scroll container), Sticky Block for Gutenberg uses `position: fixed` with intelligent scroll detection, so it works reliably in any layout.

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
* **Sticky-state padding (all sides)** — control top, bottom, left, and right padding independently, applied only while the block is stuck.
* **Sticky-state border** — add a Solid or Dashed border with custom width and color that appears only in the sticky state.
* **Full width when sticky** — instantly expand the block to span the full viewport width the moment it becomes sticky, ideal for navigation bars.
* **Entry & exit transition** — animate the block smoothly in and out of the sticky state with Fade, Slide down, or Fade + Slide, with a configurable duration.
* **Custom class when sticky** — add your own CSS classes to the block when it becomes sticky, for advanced theme integration.
* **Block transforms** — convert any Group block into a Sticky Block (and back) directly in the editor, without rebuilding.
* **Accessibility** — set an `aria-label` on the sticky wrapper to give screen reader users useful context.
* **Zero dependencies** — no jQuery. The frontend script is plain JavaScript, under 4 KB minified.

= How to use =

1. In the block editor, search for **Sticky Block** and insert it anywhere on your page.
2. Add blocks inside it — a Navigation block, a Button, a Group, anything you like.
3. Open the block settings panel on the right and adjust offset, z-index, scroll behaviour, and sticky-state styles.
4. Preview your page and scroll — the block will stick to the top.

== Installation ==

= Automatic installation =

1. Go to **Plugins → Add New** in your WordPress admin.
2. Search for **Sticky Block for Gutenberg**.
3. Click **Install Now**, then **Activate**.

= Manual installation =

1. Download the plugin ZIP from WordPress.org.
2. Go to **Plugins → Add New → Upload Plugin**.
3. Upload the ZIP and activate.

== Frequently Asked Questions ==

= Can I add more than one sticky block on a page? =

Yes — you can place as many sticky blocks as you need on the same page. Each one has its own independent settings.

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

1. Sticky Block for Gutenberg in the block inserter.
2. A sticky block with inner content shown in the editor.
3. The block settings sidebar — Sticky Options, Behavior, Responsive, Accessibility, and Sticky State Styles panels.
4. The block in action on the frontend in sticky (fixed) position.

== Changelog ==

= 2.2.0 =
* New: Your sticky bar now animates out the same way it came in. If you chose a Fade or Slide entry, the exit now matches — no more jarring snap when the block leaves the sticky position.
* New: You can now control the spacing on all four sides of your sticky block, not just the top. Handy when your sticky nav feels cramped once it locks to the screen.
* New: Add a border that only appears when your block is stuck — a clean way to draw a visual line between a sticky header and the content scrolling beneath it. Choose Solid or Dashed, set a thickness and a color.
* New: Enter a CSS class name and it gets added automatically when the block sticks, then removed when it scrolls back to its normal position. Useful for applying custom styles from your theme.
* New: You can now switch any existing Group block into a Sticky Block — and back — with a single click in the editor. All the content inside is kept exactly as it was.

= 2.1.0 =
* New: Your sticky block can now glide into view instead of snapping into place. Choose Fade, Slide down, or both together — and set how fast the animation plays.
* New: One toggle makes your sticky block stretch edge to edge the moment it becomes sticky. Great for navigation bars that need to span the full width of the screen.
* New: Set a different text color for when the block is sticky. Pair it with a sticky background color to build the popular transparent-to-solid header effect.

= 2.0.0 =
* New: Place more than one sticky block on the same page — each with its own independent settings.
* New: Choose whether your block stays sticky all the time, or only reappears when the visitor scrolls back up.
* New: Tell the block to stop sticking before it reaches your footer, so it never overlaps the bottom of your page.
* New: Turn off sticky behavior on phones with a single toggle, and choose exactly which screen width counts as mobile.
* New: Set a background color that only shows when the block is stuck — ideal for a transparent header that needs a solid fill once it leaves the top of the page.
* New: Add a shadow under the block when it is sticky — a subtle touch that helps it stand out from the content below.
* New: Add extra padding above your content when the block is stuck.
* New: Give the sticky wrapper a label that screen readers can announce, so visitors using assistive technology know what it is.
* Improvement: The plugin no longer requires jQuery — it now loads a small, fast script only on pages where you have placed a sticky block.
* Improvement: Scrolling feels smoother and more responsive than before.
* Fix: The block no longer briefly flickers into the wrong position when scrolling near the footer stop point.
* Fix: The sticky position is now correctly recalculated when the page layout changes — for example after an image loads or the browser window is resized.

= 1.0.1 =
* Fix: Minor fixes.

= 1.0.0 =
* New: Initial release.
