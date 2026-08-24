const { test, expect } = require( '@playwright/test' );

async function login( page ) {
	await page.goto( '/wp-login.php' );
	await page.locator( '#user_login' ).fill( 'admin' );
	await page.locator( '#user_pass' ).fill( 'password' );
	await page.locator( '#wp-submit' ).click();
	await expect( page ).toHaveURL( /wp-admin/ );
}

async function findDemoPageId( page ) {
	const response = await page.request.get( '/index.php?rest_route=/wp/v2/pages&slug=sticky-demo-reveal' );
	await expect( response ).toBeOK();
	const pages = await response.json();
	expect( pages ).toHaveLength( 1 );
	return pages[ 0 ].id;
}

test.describe( 'WordPress editor integration', () => {
	test( 'opens a seeded page and exposes Sticky Block controls', async ( { page } ) => {
		await login( page );
		const pageId = await findDemoPageId( page );
		await page.goto( `/wp-admin/post.php?post=${ pageId }&action=edit` );
		await expect( page ).toHaveURL( /post\.php\?post=\d+&action=edit/ );
		const closeGuide = page.getByRole( 'button', { name: 'Close' } );
		if ( await closeGuide.count() ) await closeGuide.first().click();

		const documentBlock = page.locator( '.wp-block-wpwing-sticky-block' );
		const frameBlock = page.frameLocator( 'iframe[name="editor-canvas"]' ).locator( '.wp-block-wpwing-sticky-block' );
		const block = ( await documentBlock.count() ) > 0 ? documentBlock.first() : frameBlock.first();
		await expect( block ).toBeVisible();
		await expect( block ).toHaveAttribute( 'data-type', 'wpwing/sticky-block' );
	} );

	test( 'serves the seeded reveal page on the frontend', async ( { page } ) => {
		const pageId = await findDemoPageId( page );
		await page.goto( `/?page_id=${ pageId }` );
		const block = page.locator( '.wp-block-wpwing-sticky-block' );
		await expect( block ).toBeHidden();
		await expect( block ).toHaveAttribute( 'data-reveal-mode', 'delay' );
		await expect( block ).toHaveAttribute( 'data-reveal-delay', '3' );
		await new Promise( ( resolve ) => setTimeout( resolve, 3200 ) );
		await page.evaluate( () => window.scrollTo( 0, 1000 ) );
		await expect( block ).toBeVisible();
	} );
} );
