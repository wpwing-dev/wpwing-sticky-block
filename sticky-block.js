/**
 * @preserve WPWing Sticky Block 1.0.0 | License: GPL-3.0-or-later
 */

(function ($) {
	// === Initialization ===

	$(document).ready(function () {
		// Cache selectors for faster performance.
		let browserWindow = $(window);
		let wpwingSticky = $("#wpwing-sticky");
		let topSpace = wpwingSticky.data("top-space");
		let checkForAdmin = wpwingSticky.data("check-for-admin");
		let zIndex = wpwingSticky.data("z-index");

		// Is there an admin bar and do we need to consider it
		if (
			checkForAdmin &&
			$("body").hasClass("admin-bar") &&
			browserWindow.width() > 600
		) {
			// below 600, the adminbar is not fixed
			adminBarHeight = $("#wpadminbar").height();
		} else {
			adminBarHeight = 0;
		}

		let divTop = wpwingSticky.offset().top - topSpace - adminBarHeight;

		// Run this on scroll events.
		browserWindow.scroll(function () {
			let windowTop = browserWindow.scrollTop();

			if (windowTop > divTop) {
				// Make the div sticky.
				wpwingSticky.css({
					position: "fixed",
					width: wpwingSticky.width(),
					top: topSpace,
					"z-index": zIndex,
				});
			} else {
				// Unstick the div.
				wpwingSticky.css({ position: "static", top: 0, "z-index": "auto" });
			}
		});
	});
})(jQuery);
