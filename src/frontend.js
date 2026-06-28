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

	// Respect the visitor's reduced-motion preference page-wide.
	const prefersReducedMotion =
		window.matchMedia &&
		window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	blocks.forEach( ( block, index ) => {
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
		const stickyTransitionEasing = dataEl.dataset.stickyTransitionEasing ?? 'ease';
		const useSlide = stickyTransition === 'slide' || stickyTransition === 'fade-slide';
		const useFade = stickyTransition === 'fade' || stickyTransition === 'fade-slide';
		// Reduced-motion visitors get the final state with no animation.
		const hasTransition = stickyTransition !== 'none' && ! prefersReducedMotion;

		const stickyScale = parseInt( dataEl.dataset.stickyScale ?? 100, 10 );
		const scaleVal = stickyScale / 100;
		const hasScale = stickyScale !== 100;

		// --- Feature 6: show only after scrolling ---
		const hideBeforeSticky = dataEl.dataset.hideBeforeSticky === 'true';

		// --- Feature 8: sticky position (top / bottom) ---
		const stickyPosition = dataEl.dataset.stickyPosition ?? 'top';
		const isBottomSticky = stickyPosition === 'bottom';
		const bottomSpace = parseInt( dataEl.dataset.bottomSpace ?? 0, 10 );
		// Slide direction is reversed for bottom-sticky.
		const slideInitial = isBottomSticky ? 'translateY(100%)' : 'translateY(-100%)';

		// --- Dismissible (close button + optional remembered dismissal) ---
		const dismissible = dataEl.dataset.dismissible === 'true';
		const dismissExpiry = parseInt( dataEl.dataset.dismissExpiry ?? 0, 10 );
		// Session-only when expiry is 0, otherwise persist across visits.
		const dismissStore = dismissExpiry === 0 ? window.sessionStorage : window.localStorage;
		const dismissKey = `wpwing-sticky-dismissed:${ block.id || `${ location.pathname }#${ index }` }`;

		if ( dismissible ) {
			try {
				const raw = dismissStore.getItem( dismissKey );
				if ( raw ) {
					const stillHidden = dismissExpiry === 0 || Date.now() < parseInt( raw, 10 );
					if ( stillHidden ) {
						block.style.display = 'none';
						return;
					}
					dismissStore.removeItem( dismissKey );
				}
			} catch {
				// storage unavailable (private mode, disabled) — fall through and show the block
			}
		}

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
		let dismissed = false;
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
			block.style.transformOrigin = '';
			block.style.opacity = '';
		}

		function applySticky() {
			// If an exit animation is in flight, cancel it and snap back — no re-entry
			// animation needed since the block never actually left the sticky position.
			if ( exitTimer !== null ) {
				clearTimeout( exitTimer );
				exitTimer = null;
				block.style.transition = '';
				block.style.transform = hasScale ? `scale(${ scaleVal })` : '';
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

			// Width and horizontal position. Pin both edges instead of using 100vw so the
			// bar spans the viewport minus the scrollbar — no horizontal overflow/shift.
			if ( fullWidthWhenSticky ) {
				block.style.left = '0';
				block.style.right = '0';
				block.style.width = 'auto';
			} else {
				block.style.width = `${ naturalWidth }px`;
			}

			// Anchor scaling to the stuck edge so a shrunk block stays flush with the
			// viewport instead of pulling away and leaving a gap.
			if ( hasScale ) {
				block.style.transformOrigin = isBottomSticky ? 'bottom center' : 'top center';
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

			block.dispatchEvent( new CustomEvent( 'wpwing:sticky', { bubbles: true } ) );

			// Animate entry: set initial state → force reflow → set transition → animate to rest.
			// Scale is composed into the same transform property as slide to avoid overriding it.
			if ( hasTransition ) {
				const initParts = [
					hasScale ? `scale(${ scaleVal })` : '',
					useSlide ? slideInitial : '',
				].filter( Boolean );
				if ( initParts.length ) block.style.transform = initParts.join( ' ' );
				if ( useFade ) block.style.opacity = '0';

				// Force layout recalculation so the browser registers the initial state.
				block.getBoundingClientRect();

				const transProps = [];
				if ( useSlide ) transProps.push( `transform ${ stickyTransitionDuration }ms ${ stickyTransitionEasing }` );
				if ( useFade ) transProps.push( `opacity ${ stickyTransitionDuration }ms ${ stickyTransitionEasing }` );
				block.style.transition = transProps.join( ', ' );

				requestAnimationFrame( () => {
					block.style.transform = hasScale ? `scale(${ scaleVal })` : '';
					if ( useFade ) block.style.opacity = '';
				} );
			} else if ( hasScale ) {
				block.style.transform = `scale(${ scaleVal })`;
			}
		}

		function removeSticky() {
			isSticky = false;

			block.dispatchEvent( new CustomEvent( 'wpwing:unsticky', { bubbles: true } ) );

			if ( hasTransition ) {
				// Animate exit: transition to the hidden state, then clean up after.
				const transProps = [];
				if ( useSlide ) transProps.push( `transform ${ stickyTransitionDuration }ms ${ stickyTransitionEasing }` );
				// Animate scale back to identity on fade-only exit so it doesn't persist until cleanup.
				if ( hasScale && ! useSlide ) transProps.push( `transform ${ stickyTransitionDuration }ms ${ stickyTransitionEasing }` );
				if ( useFade ) transProps.push( `opacity ${ stickyTransitionDuration }ms ${ stickyTransitionEasing }` );
				block.style.transition = transProps.join( ', ' );

				requestAnimationFrame( () => {
					if ( useSlide ) {
						// Keep scale during the slide-out so the transform doesn't snap.
						block.style.transform = hasScale ? `scale(${ scaleVal }) ${ slideInitial }` : slideInitial;
					} else if ( hasScale ) {
						block.style.transform = '';
					}
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
			if ( dismissed ) {
				ticking = false;
				return;
			}
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

		// Wire the dismiss button: remember the choice, tear down sticky state, hide.
		if ( dismissible ) {
			const dismissBtn = block.querySelector( '.wpwing-sticky-dismiss' );
			if ( dismissBtn ) {
				dismissBtn.addEventListener( 'click', () => {
					dismissed = true;
					try {
						dismissStore.setItem(
							dismissKey,
							dismissExpiry === 0 ? '1' : String( Date.now() + dismissExpiry * 86400000 )
						);
					} catch {
						// storage unavailable — dismissal just won't persist
					}
					if ( spacer ) { spacer.remove(); spacer = null; }
					block.style.display = 'none';
					block.dispatchEvent( new CustomEvent( 'wpwing:dismiss', { bubbles: true } ) );
				} );
			}
		}

		window.addEventListener( 'scroll', onScroll, { passive: true } );
		window.addEventListener( 'resize', onResize, { passive: true } );
		// Recalculate divTop once all images and embeds have loaded — DOMContentLoaded
		// fires before late-loading assets shift the page layout.
		window.addEventListener( 'load', onResize, { once: true, passive: true } );
	} );
} );
