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
