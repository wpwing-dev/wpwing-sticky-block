/**
 * WPWing Sticky Block — Frontend
 * Vanilla JS, no jQuery. Supports multiple sticky blocks per page.
 */

document.addEventListener( 'DOMContentLoaded', () => {
	const blocks = document.querySelectorAll( '.wp-block-wpwing-sticky-block' );
	if ( ! blocks.length ) return;

	// Admin bar offset is the same for every block on the page.
	const adminBarEl = document.getElementById( 'wpadminbar' );
	const adminBarHeight =
		adminBarEl && window.innerWidth > 600 ? adminBarEl.offsetHeight : 0;

	blocks.forEach( ( block ) => {
		// v2 format: data-* on the block root.
		// v1 format (deprecated save): data-* on an inner [data-top-space] child.
		const dataEl = block.hasAttribute( 'data-top-space' )
			? block
			: block.querySelector( '[data-top-space]' );

		if ( ! dataEl ) return;

		const topSpace = parseInt( dataEl.dataset.topSpace ?? 0, 10 );
		const checkForAdmin = dataEl.dataset.checkForAdmin !== 'false';
		const zIndex = parseInt( dataEl.dataset.zIndex ?? 1, 10 );
		const offset = topSpace + ( checkForAdmin ? adminBarHeight : 0 );

		// Calculate natural distance from page top once, before any scroll.
		const divTop =
			block.getBoundingClientRect().top + window.scrollY - offset;

		const originalWidth = block.offsetWidth;

		// Write CSS custom properties once — the scroll handler only toggles a class.
		block.style.setProperty( '--sticky-top', `${ offset }px` );
		block.style.setProperty( '--sticky-z-index', String( zIndex ) );

		let isSticky = false;
		let ticking = false;

		function update() {
			const shouldStick = window.scrollY > divTop;

			if ( shouldStick && ! isSticky ) {
				block.style.width = `${ originalWidth }px`;
				block.classList.add( 'is-sticky' );
				isSticky = true;
			} else if ( ! shouldStick && isSticky ) {
				block.style.width = '';
				block.classList.remove( 'is-sticky' );
				isSticky = false;
			}

			ticking = false;
		}

		window.addEventListener(
			'scroll',
			() => {
				if ( ! ticking ) {
					requestAnimationFrame( update );
					ticking = true;
				}
			},
			{ passive: true }
		);
	} );
} );
