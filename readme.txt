=== Sticky Block for Gutenberg ===

Contributors:      wpwing, voboghure
Tags:              sticky, sticky block, gutenberg, block editor, fixed
Requires at least: 5.8
Tested up to:      7.0
Requires PHP:      7.4
Stable tag:        2.5.0
License:           GPL-3.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-3.0.html

Make any block sticky. A lightweight Gutenberg container block that fixes its content to the top of the viewport as visitors scroll — no coding required.

== Description ==

**Sticky Block for Gutenberg** is a container block that sticks to the top or bottom of the page once the visitor scrolls past it. Drop any blocks inside — a navigation menu, a call-to-action, a contact button, a sidebar widget — and they will follow the reader down the page.

Unlike CSS `position: sticky` (which only works within its parent scroll container), Sticky Block for Gutenberg uses `position: fixed` with intelligent scroll detection, so it works reliably in any layout.

= Key Features =

* **Multiple sticky blocks per page** — place as many sticky blocks as you need, each with its own settings.
* **Container block** — nest any Gutenberg blocks inside: navigation, buttons, headings, images, widgets.
* **Top or bottom sticky** — choose whether the block locks to the top or bottom of the viewport. Cookie bars, chat widgets, and floating CTAs belong at the bottom.
* **Show only after scrolling** — hide the block entirely at page load and reveal it only after the visitor scrolls past the trigger point. Pairs naturally with an entry transition for a smooth appear effect.
* **Dismissible** — add a close button so visitors can dismiss the block, and optionally remember the dismissal for a set number of days. Perfect for cookie bars and floating CTAs.
* **Top offset** — set how many pixels of space to leave between the sticky block and the top of the viewport.
* **Admin toolbar aware** — automatically shifts down for logged-in users who have the WordPress admin bar visible.
* **Z-index control** — fine-tune stacking order so the sticky block always sits above (or below) other elements.
* **Scroll direction mode** — choose "Always sticky" or "Only while scrolling up" (the pattern used by modern sticky headers that appear on the way back up).
* **Stop before an element** — un-stick the block before it overlaps a footer or another landmark, using a CSS selector (e.g. `#footer`).
* **Disable on mobile** — turn off sticky behaviour below a configurable viewport breakpoint (default 768 px).
* **Disable on desktop** — turn off sticky behaviour above a configurable viewport breakpoint. Useful for elements that should only float on smaller screens.
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
4. Preview your page and scroll — the block will stick to the top (or bottom) of the viewport.

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

= Can I disable sticky behaviour on phones or only show it on mobile? =

Yes. Open the **Responsive** panel in the block settings. Enable "Disable sticky on mobile" to turn off sticky below a breakpoint (default: 768 px). Enable "Disable sticky on desktop" to turn it off above a breakpoint (default: 1024 px) — useful for elements that should only float on smaller screens.

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

= 2.5.0 - 28/06/2026 =
* New: Add a close button so visitors can dismiss the block, and optionally remember that choice for a set number of days. The missing piece for cookie bars and floating CTAs - now built with no code.
* Fix: Turning on "Full width when sticky" could push a thin horizontal scrollbar onto the page and nudge the layout sideways the moment the block stuck. The bar now spans the visible width exactly, with no overflow or shift.
* Fix: The plugin now honours the visitor's "reduce motion" system setting. When that setting is on, the block snaps cleanly into and out of its sticky position instead of fading or sliding - more comfortable for people sensitive to movement.
* Fix: When using the scale effect, the block now stays anchored to the edge it sticks to as it shrinks, instead of drifting away and leaving a small gap.

= 2.4.0 - 21/06/2026 =
* New: A popular design pattern is a logo or nav bar that shrinks slightly once the visitor starts scrolling - it signals that the header has switched modes without any jarring jump. You can now build this without writing a line of CSS: set a scale percentage in the block settings and the block smoothly reduces in size the moment it becomes sticky.
* New: You can now choose how your transition animation feels, not just how long it takes. Pick from five motion curves - a gentle ease in, a soft ease out, or a steady linear pace - to match the animation to the mood of your site.
* New: If you are a developer building on top of this plugin, the block now announces when it sticks and when it releases. You can listen for those moments in JavaScript and react to them - useful for triggering analytics, syncing other animations, or updating navigation state elsewhere on the page.
* Fix: When using a scale combined with a fade transition, the block would briefly snap back to its original size at the very end of the exit animation. It now smoothly returns to full size as it fades out, so the transition looks clean from start to finish.

= 2.3.0 - 14/06/2026 =
* New: Your sticky block can now lock to the bottom of the viewport instead of the top. Cookie consent bars, floating chat widgets, and mobile call-to-action strips all belong at the bottom — now you can build them without any custom code.
* New: A new "Show only after scrolling" toggle hides the block entirely at page load and reveals it only after the user has scrolled past it. Pair it with an entry transition for a smooth appear effect — ideal for back-to-top buttons and floating CTAs.
* New: You can now disable sticky behaviour on desktop — the counterpart to the existing mobile disable. Handy for elements that only make sense as floating buttons on small screens.
* Fix: Sticky was being disabled at exactly the mobile breakpoint width instead of below it, causing a one-pixel gap where the setting had no effect. The breakpoint now behaves consistently with its label.
* Fix: Resizing the window during the exit animation could corrupt the scroll trigger point, causing the block to snap straight back into sticky position. The trigger is now only recalculated once the block has fully returned to its natural position.
* Fix: The transition control in the editor was still labelled "Entry transition" even though it has driven both entry and exit animations since version 2.2.0.

= 2.2.0 - 07/06/2026 =
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
