const path = require( 'node:path' );
const { test, expect } = require( '@playwright/test' );

async function loadFixture( page, name ) {
	await page.goto( `file://${ path.resolve( `tests/fixtures/${ name }.html` ) }` );
}

async function scrollAndWait( page, position ) {
	await page.evaluate( ( scrollY ) => window.scrollTo( 0, scrollY ), position );
	await page.waitForTimeout( 200 );
}

test.describe( 'frontend sticky behavior', () => {
	test( 'activates at the natural position and emits sticky events', async ( { page } ) => {
		await loadFixture( page, 'sticky-default' );
		const block = page.locator( '.wp-block-wpwing-sticky-block' );

		await expect( block ).toHaveClass( /is-not-sticky/ );
		await scrollAndWait( page, 700 );
		await expect( block ).toHaveClass( /is-sticky/ );
		await expect( block ).toHaveCSS( 'position', 'fixed' );
		await expect.poll( () => page.evaluate( () => window.__events ) ).toEqual( [ 'sticky' ] );

		await scrollAndWait( page, 0 );
		await expect( block ).toHaveClass( /is-not-sticky/ );
		await expect.poll( () => page.evaluate( () => window.__events ) ).toEqual( [ 'sticky', 'unsticky' ] );
	} );

	test( 'waits for a percentage scroll trigger before revealing', async ( { page } ) => {
		await loadFixture( page, 'sticky-percent' );
		const block = page.locator( '.wp-block-wpwing-sticky-block' );

		await expect( block ).toHaveCSS( 'visibility', 'hidden' );
		await scrollAndWait( page, 700 );
		await expect( block ).toHaveCSS( 'visibility', 'hidden' );

		await scrollAndWait( page, 2200 );
		await expect( block ).toHaveClass( /is-sticky/ );
		await expect( block ).toHaveCSS( 'visibility', 'visible' );
	} );
} );
