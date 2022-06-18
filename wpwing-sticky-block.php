<?php
/**
 * Plugin Name:       WPWing Sticky Block
 * Description:       Example static block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wpwing-sticky-block
 *
 * @package           create-block
 */

/**
 * Init function
 *
 * @since 1.0.0
 */
function wpwing_sticky_block_init() {
  register_block_type( __DIR__ . '/build' );
}

add_action( 'init', 'wpwing_sticky_block_init' );
