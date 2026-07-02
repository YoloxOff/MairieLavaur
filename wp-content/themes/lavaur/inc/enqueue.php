<?php
/**
 * Styles and scripts.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function lavaur_assets() {
	$style_path = LAVAUR_DIR . '/assets/dist/style.css';
	$style_ver  = file_exists( $style_path ) ? filemtime( $style_path ) : LAVAUR_VERSION;
	wp_enqueue_style( 'lavaur-style', LAVAUR_URI . '/assets/dist/style.css', array(), $style_ver );

	// Alpine.js is loaded from a pinned CDN build to avoid a JS bundler step;
	// swap for a self-hosted copy (npm run build:js) once a build pipeline exists.
	wp_enqueue_script( 'alpinejs', 'https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js', array(), '3.14.1', array(
		'strategy'  => 'defer',
		'in_footer' => true,
	) );

	wp_enqueue_script( 'lavaur-main', LAVAUR_URI . '/assets/js/main.js', array( 'alpinejs' ), LAVAUR_VERSION, array(
		'strategy'  => 'defer',
		'in_footer' => true,
	) );
}
add_action( 'wp_enqueue_scripts', 'lavaur_assets' );

/**
 * Preconnect to speed up first paint (Google Fonts / Maps when enabled).
 */
function lavaur_resource_hints( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = array(
			'href' => 'https://fonts.gstatic.com',
			'crossorigin',
		);
	}
	return $urls;
}
add_filter( 'wp_resource_hints', 'lavaur_resource_hints', 10, 2 );
