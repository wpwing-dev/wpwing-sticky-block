/**
 * WPWing Sticky Block — Frontend
 * Vanilla JS, no jQuery. Supports multiple sticky blocks per page.
 */

const SHADOWS = {
	sm: '0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.08)',
	md: '0 4px 6px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.08)',
	lg: '0 10px 15px rgba(0,0,0,.12), 0 4px 6px rgba(0,0,0,.08)',
};

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

		// Sticky-state styles (only present when non-default).
		const stickyBg = dataEl.dataset.stickyBg ?? '';
		const stickyShadow = SHADOWS[ dataEl.dataset.stickyShadow ] ?? '';
		const stickyPaddingTop = parseInt( dataEl.dataset.stickyPaddingTop ?? 0, 10 );

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

		function applySticky() {
			block.style.width = `${ originalWidth }px`;
			if ( stickyBg ) block.style.backgroundColor = stickyBg;
			if ( stickyShadow ) block.style.boxShadow = stickyShadow;
			if ( stickyPaddingTop ) block.style.paddingTop = `${ stickyPaddingTop }px`;
			block.classList.add( 'is-sticky' );
			isSticky = true;
		}

		function removeSticky() {
			block.style.width = '';
			block.style.backgroundColor = '';
			block.style.boxShadow = '';
			block.style.paddingTop = '';
			block.classList.remove( 'is-sticky' );
			isSticky = false;
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
				applySticky();
			} else if ( ! shouldStick && isSticky ) {
				removeSticky();
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
