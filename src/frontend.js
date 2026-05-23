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
		// v3 format: data-* on the block root.
		// v1 format (deprecated save): data-* on an inner [data-top-space] child.
		const dataEl = block.hasAttribute( 'data-top-space' )
			? block
			: block.querySelector( '[data-top-space]' );

		if ( ! dataEl ) return;

		// --- Read attributes ---
		const topSpace = parseInt( dataEl.dataset.topSpace ?? 0, 10 );
		const checkForAdmin = dataEl.dataset.checkForAdmin !== 'false';
		const zIndex = parseInt( dataEl.dataset.zIndex ?? 1, 10 );
		const scrollDirection = dataEl.dataset.scrollDirection ?? 'always';
		const stopBefore = dataEl.dataset.stopBefore ?? '';
		const disableOnMobile = dataEl.dataset.disableOnMobile === 'true';
		const mobileBreakpoint = parseInt( dataEl.dataset.mobileBreakpoint ?? 768, 10 );

		const stopEl = stopBefore ? document.querySelector( stopBefore ) : null;
		const offset = topSpace + ( checkForAdmin ? adminBarHeight : 0 );

		// Natural distance from page top before any scroll.
		const divTop = block.getBoundingClientRect().top + window.scrollY - offset;
		const originalWidth = block.offsetWidth;

		// Write CSS custom properties once — scroll handler only toggles a class.
		block.style.setProperty( '--sticky-top', `${ offset }px` );
		block.style.setProperty( '--sticky-z-index', String( zIndex ) );

		let isSticky = false;
		let ticking = false;
		let lastScrollY = window.scrollY;

		function isActive() {
			return ! disableOnMobile || window.innerWidth > mobileBreakpoint;
		}

		function update() {
			const scrollY = window.scrollY;
			const scrollingUp = scrollY < lastScrollY;
			lastScrollY = scrollY;

			const belowTrigger = scrollY > divTop;
			const directionOk =
				scrollDirection === 'always' || scrollingUp;

			// Un-stick when the sticky block's bottom reaches the stop element's top.
			let stopReached = false;
			if ( stopEl && isSticky ) {
				const stopTop = stopEl.getBoundingClientRect().top;
				if ( stopTop <= offset + block.offsetHeight ) {
					stopReached = true;
				}
			}

			const shouldStick =
				belowTrigger && isActive() && directionOk && ! stopReached;

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

		function onScroll() {
			if ( ! ticking ) {
				requestAnimationFrame( update );
				ticking = true;
			}
		}

		window.addEventListener( 'scroll', onScroll, { passive: true } );

		// Re-check on resize so disableOnMobile responds without a page reload.
		window.addEventListener( 'resize', onScroll, { passive: true } );
	} );
} );
