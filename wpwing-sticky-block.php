<?php

/**
 * Plugin Name:       Sticky Block for Gutenberg
 * Description:       Sticky Block for Gutenberg — make any content follow your visitors as they scroll.
 * Version:           2.4.0
 * Requires at least: 5.8
 * Tested up to:      7.0
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

if ( ! function_exists( 'wpwing_sticky_block_init' ) ) {
	function wpwing_sticky_block_init(): void {
		register_block_type( __DIR__ . '/build' );
	}
	add_action( 'init', 'wpwing_sticky_block_init' );
}

if ( ! function_exists( 'wpwing_sticky_block_row_meta' ) ) {
	function wpwing_sticky_block_row_meta( array $links, string $file ): array {
		if ( plugin_basename( __FILE__ ) === $file ) {
			$links[] = '<a href="' . esc_url( plugins_url( 'docs/index.html', __FILE__ ) ) . '" target="_blank">'
				. esc_html__( 'Documentation', 'wpwing-sticky-block' )
				. '</a>';
		}
		return $links;
	}
	add_filter( 'plugin_row_meta', 'wpwing_sticky_block_row_meta', 10, 2 );
}
