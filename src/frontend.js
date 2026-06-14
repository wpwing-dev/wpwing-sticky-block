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
		const disableOnDesktop = dataEl.dataset.disableOnDesktop === 'true';
		const desktopBreakpoint = parseInt( dataEl.dataset.desktopBreakpoint ?? 1024, 10 );

		// Sticky-state styles (only present when non-default).
		const stickyBg = dataEl.dataset.stickyBg ?? '';
		const stickyShadow = SHADOWS[ dataEl.dataset.stickyShadow ] ?? '';
		const stickyPaddingTop = parseInt( dataEl.dataset.stickyPaddingTop ?? 0, 10 );
		const stickyPaddingBottom = parseInt( dataEl.dataset.stickyPaddingBottom ?? 0, 10 );
		const stickyPaddingLeft = parseInt( dataEl.dataset.stickyPaddingLeft ?? 0, 10 );
		const stickyPaddingRight = parseInt( dataEl.dataset.stickyPaddingRight ?? 0, 10 );
		const stickyTextColor = dataEl.dataset.stickyTextColor ?? '';
		const fullWidthWhenSticky = dataEl.dataset.fullWidthWhenSticky === 'true';

		// Border when sticky.
		const stickyBorderStyle = dataEl.dataset.stickyBorderStyle ?? 'none';
		const stickyBorderWidth = parseInt( dataEl.dataset.stickyBorderWidth ?? 1, 10 );
		const stickyBorderColor = dataEl.dataset.stickyBorderColor ?? '';
		const hasBorder = stickyBorderStyle !== 'none';

		// Extra CSS classes when sticky (space-separated).
		const extraClasses = ( dataEl.dataset.stickyExtraClass ?? '' )
			.trim()
			.split( /\s+/ )
			.filter( Boolean );

		// Transition (entry + exit).
		const stickyTransition = dataEl.dataset.stickyTransition ?? 'none';
		const stickyTransitionDuration = parseInt( dataEl.dataset.stickyTransitionDuration ?? 300, 10 );
		const useSlide = stickyTransition === 'slide' || stickyTransition === 'fade-slide';
		const useFade = stickyTransition === 'fade' || stickyTransition === 'fade-slide';
		const hasTransition = stickyTransition !== 'none';

		// --- Feature 6: show only after scrolling ---
		const hideBeforeSticky = dataEl.dataset.hideBeforeSticky === 'true';

		// --- Feature 8: sticky position (top / bottom) ---
		const stickyPosition = dataEl.dataset.stickyPosition ?? 'top';
		const isBottomSticky = stickyPosition === 'bottom';
		const bottomSpace = parseInt( dataEl.dataset.bottomSpace ?? 0, 10 );
		// Slide direction is reversed for bottom-sticky.
		const slideInitial = isBottomSticky ? 'translateY(100%)' : 'translateY(-100%)';

		let stopEl = null;
		if ( stopBefore ) {
			try {
				stopEl = document.querySelector( stopBefore );
			} catch {
				// invalid CSS selector — silently ignore the stop-before setting
			}
		}

		// Top-sticky uses topSpace + optional admin bar. Bottom-sticky ignores admin bar.
		const offset = isBottomSticky
			? 0
			: topSpace + ( checkForAdmin ? adminBarHeight : 0 );

		// divTop is the scroll position at which the block leaves its natural position.
		// It's a `let` so the resize handler can recalculate it after layout reflows.
		let divTop = block.getBoundingClientRect().top + window.scrollY - offset;

		// Write CSS custom properties once — scroll handler only toggles a class.
		if ( isBottomSticky ) {
			block.style.setProperty( '--sticky-bottom', `${ bottomSpace }px` );
		} else {
			block.style.setProperty( '--sticky-top', `${ offset }px` );
		}
		block.style.setProperty( '--sticky-z-index', String( zIndex ) );

		// Feature 6: hide the block in its natural position until the trigger fires.
		if ( hideBeforeSticky ) {
			block.style.visibility = 'hidden';
			block.style.pointerEvents = 'none';
		}

		let isSticky = false;
		let ticking = false;
		let lastScrollY = window.scrollY;
		// Timer ID for the exit animation cleanup; non-null while an exit is in flight.
		let exitTimer = null;
		// Placeholder that holds the block's natural space while it is position:fixed.
		let spacer = null;

		// Feature 9: active when viewport is within the enabled range.
		function isActive() {
			const w = window.innerWidth;
			if ( disableOnMobile && w < mobileBreakpoint ) return false;
			if ( disableOnDesktop && w > desktopBreakpoint ) return false;
			return true;
		}

		function clearStickyStyles() {
			block.style.width = '';
			block.style.left = '';
			block.style.right = '';
			block.style.bottom = '';
			block.style.backgroundColor = '';
			block.style.boxShadow = '';
			block.style.paddingTop = '';
			block.style.paddingBottom = '';
			block.style.paddingLeft = '';
			block.style.paddingRight = '';
			block.style.borderStyle = '';
			block.style.borderWidth = '';
			block.style.borderColor = '';
			block.style.color = '';
			block.style.transition = '';
			block.style.transform = '';
			block.style.opacity = '';
		}

		function applySticky() {
			// If an exit animation is in flight, cancel it and snap back — no re-entry
			// animation needed since the block never actually left the sticky position.
			if ( exitTimer !== null ) {
				clearTimeout( exitTimer );
				exitTimer = null;
				block.style.transition = '';
				block.style.transform = '';
				block.style.opacity = '';
				isSticky = true;
				return;
			}

			// Feature 6: reveal the block before applying sticky styles.
			if ( hideBeforeSticky ) {
				block.style.visibility = '';
				block.style.pointerEvents = '';
			}

			// Capture natural dimensions before any sticky styles change the layout.
			const naturalHeight = block.offsetHeight;
			const naturalWidth = block.offsetWidth;

			// Prevent layout shift: hold the block's natural vertical space in the flow.
			spacer = document.createElement( 'div' );
			spacer.style.height = `${ naturalHeight }px`;
			spacer.setAttribute( 'aria-hidden', 'true' );
			block.parentNode.insertBefore( spacer, block );

			// Width and horizontal position.
			if ( fullWidthWhenSticky ) {
				block.style.width = '100vw';
				block.style.left = '0';
				block.style.right = '0';
			} else {
				block.style.width = `${ naturalWidth }px`;
			}

			// Sticky-state styles.
			if ( stickyBg ) block.style.backgroundColor = stickyBg;
			if ( stickyShadow ) block.style.boxShadow = stickyShadow;
			if ( stickyPaddingTop ) block.style.paddingTop = `${ stickyPaddingTop }px`;
			if ( stickyPaddingBottom ) block.style.paddingBottom = `${ stickyPaddingBottom }px`;
			if ( stickyPaddingLeft ) block.style.paddingLeft = `${ stickyPaddingLeft }px`;
			if ( stickyPaddingRight ) block.style.paddingRight = `${ stickyPaddingRight }px`;
			if ( hasBorder ) {
				block.style.borderStyle = stickyBorderStyle;
				block.style.borderWidth = `${ stickyBorderWidth }px`;
				if ( stickyBorderColor ) block.style.borderColor = stickyBorderColor;
			}
			if ( stickyTextColor ) block.style.color = stickyTextColor;

			// Add sticky class (applies position: fixed via CSS) and any extra classes.
			block.classList.add( 'is-sticky' );
			if ( isBottomSticky ) block.classList.add( 'is-sticky--bottom' );
			if ( extraClasses.length ) extraClasses.forEach( ( cls ) => block.classList.add( cls ) );
			isSticky = true;

			// Animate entry: set initial state → force reflow → set transition → animate to rest.
			if ( hasTransition ) {
				if ( useSlide ) block.style.transform = slideInitial;
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
			isSticky = false;

			if ( hasTransition ) {
				// Animate exit: transition to the hidden state, then clean up after.
				const transProps = [];
				if ( useSlide ) transProps.push( `transform ${ stickyTransitionDuration }ms ease` );
				if ( useFade ) transProps.push( `opacity ${ stickyTransitionDuration }ms ease` );
				block.style.transition = transProps.join( ', ' );

				requestAnimationFrame( () => {
					if ( useSlide ) block.style.transform = slideInitial;
					if ( useFade ) block.style.opacity = '0';
				} );

				// After the animation ends, remove the class and clear all inline styles.
				// +50 ms buffer so cleanup is never visible before the animation finishes.
				exitTimer = setTimeout( () => {
					exitTimer = null;
					if ( spacer ) { spacer.remove(); spacer = null; }
					clearStickyStyles();
					block.classList.remove( 'is-sticky' );
					if ( isBottomSticky ) block.classList.remove( 'is-sticky--bottom' );
					if ( extraClasses.length ) extraClasses.forEach( ( cls ) => block.classList.remove( cls ) );
					// Feature 6: re-hide once back in natural position.
					if ( hideBeforeSticky ) {
						block.style.visibility = 'hidden';
						block.style.pointerEvents = 'none';
					}
				}, stickyTransitionDuration + 50 );
			} else {
				if ( spacer ) { spacer.remove(); spacer = null; }
				clearStickyStyles();
				block.classList.remove( 'is-sticky' );
				if ( isBottomSticky ) block.classList.remove( 'is-sticky--bottom' );
				if ( extraClasses.length ) extraClasses.forEach( ( cls ) => block.classList.remove( cls ) );
				// Feature 6: re-hide once back in natural position.
				if ( hideBeforeSticky ) {
					block.style.visibility = 'hidden';
					block.style.pointerEvents = 'none';
				}
			}
		}

		function update() {
			const scrollY = window.scrollY;
			const scrollingUp = scrollY < lastScrollY;
			lastScrollY = scrollY;

			const belowTrigger = scrollY >= divTop;
			const directionOk = scrollDirection === 'always' || scrollingUp;

			// Check stopEl regardless of isSticky to prevent a one-frame flicker
			// where applySticky() fires before the stop condition is evaluated.
			let stopReached = false;
			if ( stopEl ) {
				if ( isBottomSticky ) {
					// Bottom sticky: stop when stopEl approaches the sticky block from below.
					const stopTop = stopEl.getBoundingClientRect().top;
					if ( stopTop <= window.innerHeight - bottomSpace - block.offsetHeight ) {
						stopReached = true;
					}
				} else {
					const stopTop = stopEl.getBoundingClientRect().top;
					if ( stopTop <= offset + block.offsetHeight ) {
						stopReached = true;
					}
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
			// exitTimer being set means the block is still position:fixed mid-animation,
			// so getBoundingClientRect() would return the fixed position, not the natural one.
			if ( ! isSticky && exitTimer === null ) {
				divTop = block.getBoundingClientRect().top + window.scrollY - offset;
			}
			onScroll();
		}

		window.addEventListener( 'scroll', onScroll, { passive: true } );
		window.addEventListener( 'resize', onResize, { passive: true } );
		// Recalculate divTop once all images and embeds have loaded — DOMContentLoaded
		// fires before late-loading assets shift the page layout.
		window.addEventListener( 'load', onResize, { once: true, passive: true } );
	} );
} );
