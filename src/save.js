import { __ } from "@wordpress/i18n";
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
		stickyScale,
		stickyPaddingTop,
		stickyTextColor,
		fullWidthWhenSticky,
		stickyTransition,
		stickyTransitionDuration,
		stickyTransitionEasing,
		stickyPaddingBottom,
		stickyPaddingLeft,
		stickyPaddingRight,
		stickyBorderStyle,
		stickyBorderWidth,
		stickyBorderColor,
		stickyExtraClass,
		hideBeforeSticky,
		stickyPosition,
		bottomSpace,
		disableOnDesktop,
		desktopBreakpoint,
		dismissible,
		dismissExpiry,
		dismissButtonPosition,
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
				'data-sticky-scale': stickyScale !== 100 ? stickyScale : undefined,
				'data-sticky-padding-top': stickyPaddingTop || undefined,
				'data-sticky-text-color': stickyTextColor || undefined,
				'data-full-width-when-sticky': fullWidthWhenSticky || undefined,
				'data-sticky-transition': stickyTransition !== 'none' ? stickyTransition : undefined,
				'data-sticky-transition-duration': stickyTransition !== 'none' ? stickyTransitionDuration : undefined,
				'data-sticky-transition-easing': stickyTransition !== 'none' && stickyTransitionEasing !== 'ease' ? stickyTransitionEasing : undefined,
				'data-sticky-padding-bottom': stickyPaddingBottom || undefined,
				'data-sticky-padding-left': stickyPaddingLeft || undefined,
				'data-sticky-padding-right': stickyPaddingRight || undefined,
				'data-sticky-border-style': stickyBorderStyle !== 'none' ? stickyBorderStyle : undefined,
				'data-sticky-border-width': stickyBorderStyle !== 'none' ? stickyBorderWidth : undefined,
				'data-sticky-border-color': stickyBorderColor || undefined,
				'data-sticky-extra-class': stickyExtraClass || undefined,
				'data-hide-before-sticky': hideBeforeSticky || undefined,
				'data-sticky-position': stickyPosition !== 'top' ? stickyPosition : undefined,
				'data-bottom-space': stickyPosition === 'bottom' ? bottomSpace : undefined,
				'data-disable-on-desktop': disableOnDesktop || undefined,
				'data-desktop-breakpoint': disableOnDesktop ? desktopBreakpoint : undefined,
				'data-dismissible': dismissible || undefined,
				'data-dismiss-expiry': dismissible ? dismissExpiry : undefined,
				'data-dismiss-position': dismissible && dismissButtonPosition !== 'right' ? dismissButtonPosition : undefined,
			} ) }
		>
			{ dismissible && (
				<button
					type="button"
					className={ `wpwing-sticky-dismiss wpwing-sticky-dismiss--${ dismissButtonPosition }` }
					aria-label={ __( "Dismiss", "wpwing-sticky-block" ) }
				>
					<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
						<path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" fill="none" />
					</svg>
				</button>
			) }
			<InnerBlocks.Content />
		</div>
	);
}
