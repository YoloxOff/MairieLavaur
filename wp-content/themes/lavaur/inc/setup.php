<?php
/**
 * Core theme setup: supports, menus, image sizes, widget areas.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function lavaur_setup() {
	load_theme_textdomain( 'lavaur', LAVAUR_DIR . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script', 'navigation-widgets' ) );
	add_theme_support( 'custom-logo', array(
		'height'      => 80,
		'width'       => 240,
		'flex-height' => true,
		'flex-width'  => true,
	) );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );

	set_post_thumbnail_size( 1200, 675, true );
	add_image_size( 'lavaur-card', 640, 420, true );
	add_image_size( 'lavaur-hero', 1920, 960, true );

	register_nav_menus( array(
		'primary' => __( 'Menu principal', 'lavaur' ),
		'footer'  => __( 'Menu pied de page', 'lavaur' ),
		'utile'   => __( 'Liens utiles', 'lavaur' ),
	) );
}
add_action( 'after_setup_theme', 'lavaur_setup' );

function lavaur_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Pied de page', 'lavaur' ),
		'id'            => 'footer-1',
		'before_widget' => '<div class="footer-widget">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3 class="text-sm font-semibold uppercase tracking-wide text-institution-200 mb-3">',
		'after_title'   => '</h3>',
	) );
}
add_action( 'widgets_init', 'lavaur_widgets_init' );

/**
 * WordPress core already ships an XML sitemap (wp-sitemap.xml) since 5.5,
 * so no plugin is required to satisfy the "Sitemap XML" requirement.
 */
add_filter( 'wp_sitemaps_enabled', '__return_true' );

/**
 * Clean up admin bar spacing quirks on the front end for anonymous visitors.
 */
function lavaur_body_classes( $classes ) {
	if ( is_front_page() ) {
		$classes[] = 'is-front-page';
	}
	return $classes;
}
add_filter( 'body_class', 'lavaur_body_classes' );
