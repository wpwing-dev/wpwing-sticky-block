<?php

/**
 * Plugin Name:       WPWing Sticky Block
 * Description:       A sticky block which can hold any other block.
 * Version:           1.0.1
 * Requires at least: 5.8
 * Tested up to:      6.0
 * Requires PHP:      7.0
 * Author:            WPWing
 * Author URI:        https://wpwing.com/
 * License:           GPL-3.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       wpwing-sticky-block
 * Domain Path:       /languages
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

/**
 * Load custom javascript dependent on jquery
 *
 * @since 1.0.0
 */
function wpwing_sticky_block_frontend() {
  wp_register_script(
    'wpwing_sticky_block-js',
    plugins_url( 'sticky-block.js', __FILE__ ),
    ['jquery'],
    "1.0.0",
    true
  );
  wp_enqueue_script( 'wpwing_sticky_block-js' );
}

add_action( 'wp_enqueue_scripts', 'wpwing_sticky_block_frontend' );

/**
 * For test and debug, log function to view any data in wp-content/debug.log
 * uses: log_it($variable);
 *
 * @since 1.0.0
 */
if ( ! function_exists( 'log_it' ) ) {
  function log_it( $message ) {
    if ( WP_DEBUG === true ) {
      if ( is_array( $message ) || is_object( $message ) ) {
        error_log( "\r\n" . print_r( $message, true ) );
      } else {
        error_log( $message );
      }
    }
  }
}
