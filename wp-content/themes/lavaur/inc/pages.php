<?php
/**
 * Seeds the static Pages the theme's page-{slug}.php templates render into,
 * and the primary menu, so the site is fully browsable right after theme
 * activation instead of showing "page not found" everywhere.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function lavaur_seed_pages() {
	$pages = array(
		'la-ville'                    => 'La Ville',
		'vie-municipale'               => 'Vie municipale',
		'vivre-a-lavaur'                => 'Vivre a Lavaur',
		'tourisme'                     => 'Tourisme',
		'services-municipaux'          => 'Services municipaux',
		'contact'                      => 'Contact',
		'mentions-legales'             => 'Mentions legales',
		'politique-de-confidentialite' => 'Politique de confidentialite',
		'plan-du-site'                 => 'Plan du site',
		'accessibilite'                => 'Accessibilite',
	);

	foreach ( $pages as $slug => $title ) {
		if ( get_page_by_path( $slug ) ) {
			continue;
		}
		wp_insert_post( array(
			'post_type'   => 'page',
			'post_title'  => $title,
			'post_name'   => $slug,
			'post_status' => 'publish',
			'post_content'=> '',
		) );
	}
}
add_action( 'after_switch_theme', 'lavaur_seed_pages' );
