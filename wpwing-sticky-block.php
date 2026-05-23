<?php

/**
 * Plugin Name:       WPWing Sticky Block
 * Description:       A sticky container block that keeps its content fixed at the top of the viewport as visitors scroll. Supports multiple instances per page.
 * Version:           2.0.0
 * Requires at least: 5.8
 * Tested up to:      6.8
 * Requires PHP:      7.4
 * Author:            WPWing
 * Author URI:        https://wpwing.com/
 * License:           GPL-3.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       wpwing-sticky-block
 * Domain Path:       /languages
 *
 * @package           wpwing-sticky-block
 */

function wpwing_sticky_block_init(): void {
	register_block_type( __DIR__ . '/build' );
}

add_action( 'init', 'wpwing_sticky_block_init' );

function wpwing_sticky_block_patterns(): void {
	register_block_pattern_category(
		'wpwing',
		[ 'label' => __( 'WPWing', 'wpwing-sticky-block' ) ]
	);

	register_block_pattern(
		'wpwing/sticky-navigation-bar',
		[
			'title'       => __( 'Sticky Navigation Bar', 'wpwing-sticky-block' ),
			'description' => __( 'A site navigation bar that sticks to the top of the page as visitors scroll.', 'wpwing-sticky-block' ),
			'categories'  => [ 'wpwing', 'header' ],
			'content'     => '<!-- wp:wpwing/sticky-block {"topSpace":0,"checkForAdmin":true,"zIndex":100,"scrollDirection":"always","stickyBackground":"#ffffff","stickyShadow":"md"} --><div class="wp-block-wpwing-sticky-block" data-top-space="0" data-check-for-admin="true" data-z-index="100" data-scroll-direction="always" data-sticky-bg="#ffffff" data-sticky-shadow="md"><!-- wp:navigation /--></div><!-- /wp:wpwing/sticky-block -->',
		]
	);

	register_block_pattern(
		'wpwing/sticky-cta-bar',
		[
			'title'       => __( 'Sticky Call-to-Action Bar', 'wpwing-sticky-block' ),
			'description' => __( 'A call-to-action bar with a heading and button that appears when the visitor scrolls back up.', 'wpwing-sticky-block' ),
			'categories'  => [ 'wpwing', 'call-to-action' ],
			'content'     => '<!-- wp:wpwing/sticky-block {"topSpace":0,"checkForAdmin":true,"zIndex":50,"scrollDirection":"up-only","stickyShadow":"sm"} --><div class="wp-block-wpwing-sticky-block" data-top-space="0" data-check-for-admin="true" data-z-index="50" data-scroll-direction="up-only" data-sticky-shadow="sm"><!-- wp:group {"style":{"spacing":{"padding":{"top":"12px","bottom":"12px","left":"24px","right":"24px"}}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between","verticalAlignment":"center"}} --><div class="wp-block-group" style="padding-top:12px;padding-right:24px;padding-bottom:12px;padding-left:24px"><!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.1rem","fontStyle":"normal","fontWeight":"600"}}} --><h3 class="wp-block-heading" style="font-size:1.1rem;font-style:normal;font-weight:600">Ready to get started?</h3><!-- /wp:heading --><!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button --><div class="wp-block-button"><a class="wp-block-button__link wp-element-button">Get Started</a></div><!-- /wp:button --></div><!-- /wp:buttons --></div><!-- /wp:group --></div><!-- /wp:wpwing/sticky-block -->',
		]
	);
}

add_action( 'init', 'wpwing_sticky_block_patterns' );
