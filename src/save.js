import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save( { attributes } ) {
	const {
		topSpace,
		checkForAdmin,
		zIndex,
		scrollDirection,
		stopBefore,
		disableOnMobile,
		mobileBreakpoint,
		ariaLabel,
		stickyBackground,
		stickyShadow,
		stickyPaddingTop,
		stickyTextColor,
		fullWidthWhenSticky,
		stickyTransition,
		stickyTransitionDuration,
		stickyPaddingBottom,
		stickyPaddingLeft,
		stickyPaddingRight,
		stickyBorderStyle,
		stickyBorderWidth,
		stickyBorderColor,
		stickyExtraClass,
	} = attributes;

	return (
		<div
			{ ...useBlockProps.save( {
				'data-top-space': topSpace,
				'data-check-for-admin': checkForAdmin,
				'data-z-index': zIndex,
				'data-scroll-direction': scrollDirection,
				'data-disable-on-mobile': disableOnMobile || undefined,
				'data-mobile-breakpoint': disableOnMobile ? mobileBreakpoint : undefined,
				'data-stop-before': stopBefore || undefined,
				'aria-label': ariaLabel || undefined,
				// Sticky-state style attrs — omitted when at default so the saved HTML
				// stays identical to prior format for blocks with no sticky styles set.
				'data-sticky-bg': stickyBackground || undefined,
				'data-sticky-shadow': stickyShadow !== 'none' ? stickyShadow : undefined,
				'data-sticky-padding-top': stickyPaddingTop || undefined,
				'data-sticky-text-color': stickyTextColor || undefined,
				'data-full-width-when-sticky': fullWidthWhenSticky || undefined,
				'data-sticky-transition': stickyTransition !== 'none' ? stickyTransition : undefined,
				'data-sticky-transition-duration': stickyTransition !== 'none' ? stickyTransitionDuration : undefined,
				'data-sticky-padding-bottom': stickyPaddingBottom || undefined,
				'data-sticky-padding-left': stickyPaddingLeft || undefined,
				'data-sticky-padding-right': stickyPaddingRight || undefined,
				'data-sticky-border-style': stickyBorderStyle !== 'none' ? stickyBorderStyle : undefined,
				'data-sticky-border-width': stickyBorderStyle !== 'none' ? stickyBorderWidth : undefined,
				'data-sticky-border-color': stickyBorderColor || undefined,
				'data-sticky-extra-class': stickyExtraClass || undefined,
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
}
