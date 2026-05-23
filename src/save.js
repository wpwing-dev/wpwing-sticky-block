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
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
}
