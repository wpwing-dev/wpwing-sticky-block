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
		const stickyTextColor = dataEl.dataset.stickyTextColor ?? '';
		const fullWidthWhenSticky = dataEl.dataset.fullWidthWhenSticky === 'true';

		// Entry transition.
		const stickyTransition = dataEl.dataset.stickyTransition ?? 'none';
		const stickyTransitionDuration = parseInt( dataEl.dataset.stickyTransitionDuration ?? 300, 10 );
		const useSlide = stickyTransition === 'slide' || stickyTransition === 'fade-slide';
		const useFade = stickyTransition === 'fade' || stickyTransition === 'fade-slide';
		const hasTransition = stickyTransition !== 'none';

		const stopEl = stopBefore ? document.querySelector( stopBefore ) : null;
		const offset = topSpace + ( checkForAdmin ? adminBarHeight : 0 );

		// divTop is the scroll position at which the block leaves its natural position.
		// It's a `let` so the resize handler can recalculate it after layout reflows.
		let divTop = block.getBoundingClientRect().top + window.scrollY - offset;

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
			// Width and horizontal position.
			if ( fullWidthWhenSticky ) {
				block.style.width = '100vw';
				block.style.left = '0';
				block.style.right = '0';
			} else {
				// Measure natural width right before going fixed so it's always current.
				block.style.width = `${ block.offsetWidth }px`;
			}

			// Sticky-state styles.
			if ( stickyBg ) block.style.backgroundColor = stickyBg;
			if ( stickyShadow ) block.style.boxShadow = stickyShadow;
			if ( stickyPaddingTop ) block.style.paddingTop = `${ stickyPaddingTop }px`;
			if ( stickyTextColor ) block.style.color = stickyTextColor;

			// Add sticky class (applies position: fixed via CSS).
			block.classList.add( 'is-sticky' );
			isSticky = true;

			// Animate entry: set initial state → force reflow → set transition → animate to rest.
			if ( hasTransition ) {
				if ( useSlide ) block.style.transform = 'translateY(-100%)';
				if ( useFade ) block.style.opacity = '0';

				// Force layout recalculation so the browser registers the initial state.
				block.getBoundingClientRect();

				const transProps = [];
				if ( useSlide ) transProps.push( `transform ${ stickyTransitionDuration }ms ease` );
				if ( useFade ) transProps.push( `opacity ${ stickyTransitionDuration }ms ease` );
				block.style.transition = transProps.join( ', ' );

				requestAnimationFrame( () => {
					if ( useSlide ) block.style.transform = '';
					if ( useFade ) block.style.opacity = '';
				} );
			}
		}

		function removeSticky() {
			block.style.width = '';
			block.style.left = '';
			block.style.right = '';
			block.style.backgroundColor = '';
			block.style.boxShadow = '';
			block.style.paddingTop = '';
			block.style.color = '';
			block.style.transition = '';
			block.style.transform = '';
			block.style.opacity = '';
			block.classList.remove( 'is-sticky' );
			isSticky = false;
		}

		function update() {
			const scrollY = window.scrollY;
			const scrollingUp = scrollY < lastScrollY;
			lastScrollY = scrollY;

			const belowTrigger = scrollY > divTop;
			const directionOk = scrollDirection === 'always' || scrollingUp;

			// Check stopEl regardless of isSticky to prevent a one-frame flicker
			// where applySticky() fires before the stop condition is evaluated.
			let stopReached = false;
			if ( stopEl ) {
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

		function onResize() {
			// Recalculate the trigger position after layout reflows (images loading,
			// accordion expand, font swap, etc.) — only valid when block is in flow.
			if ( ! isSticky ) {
				divTop = block.getBoundingClientRect().top + window.scrollY - offset;
			}
			onScroll();
		}

		window.addEventListener( 'scroll', onScroll, { passive: true } );
		window.addEventListener( 'resize', onResize, { passive: true } );
	} );
} );
