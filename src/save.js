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
				// stays identical to Phase 2 format for blocks with no sticky styles set.
				'data-sticky-bg': stickyBackground || undefined,
				'data-sticky-shadow': stickyShadow !== 'none' ? stickyShadow : undefined,
				'data-sticky-padding-top': stickyPaddingTop || undefined,
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
}
