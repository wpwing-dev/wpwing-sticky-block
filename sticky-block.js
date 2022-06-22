/**
 * @preserve WPWing Sticky Block 1.0.0 | License: GPL-3.0-or-later
 */

(function ($) {
	// === Initialization ===

	$(document).ready(function () {
		// Cache selectors for faster performance.
		let $window = $(window);
		let wpwingSticky = $("#wpwing-sticky");
		let topSpace = wpwingSticky.data("top-space");
		let zIndex = wpwingSticky.data("z-index");
		let divTop = wpwingSticky.offset().top - topSpace;

		// Run this on scroll events.
		$window.scroll(function () {
			let windowTop = $window.scrollTop();

			if (windowTop > divTop) {
				// Make the div sticky.
				wpwingSticky.css({
					position: "fixed",
					top: topSpace,
					"z-index": zIndex,
				});
			} else {
				// Unstick the div.
				wpwingSticky.css({ position: "static", top: 0, "z-index": zIndex });
			}
		});
	});
})(jQuery);
