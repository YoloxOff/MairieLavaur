<?php
/**
 * Actualites: news items with category taxonomy per cahier des charges (section "Actualites").
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function lavaur_register_actualites() {
	register_post_type( 'actualite', array(
		'labels' => array(
			'name'               => __( 'Actualites', 'lavaur' ),
			'singular_name'      => __( 'Actualite', 'lavaur' ),
			'add_new_item'       => __( 'Ajouter une actualite', 'lavaur' ),
			'edit_item'          => __( 'Modifier l\'actualite', 'lavaur' ),
			'all_items'          => __( 'Toutes les actualites', 'lavaur' ),
		),
		'public'       => true,
		'has_archive'  => true,
		'rewrite'      => array( 'slug' => 'actualites' ),
		'menu_icon'    => 'dashicons-megaphone',
		'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt', 'author', 'revisions', 'custom-fields' ),
		'show_in_rest' => true,
		'taxonomies'   => array( 'categorie_actualite' ),
	) );

	register_taxonomy( 'categorie_actualite', 'actualite', array(
		'labels' => array(
			'name'          => __( 'Categories d\'actualites', 'lavaur' ),
			'singular_name' => __( 'Categorie', 'lavaur' ),
		),
		'public'       => true,
		'hierarchical' => true,
		'rewrite'      => array( 'slug' => 'actualites/categorie' ),
		'show_in_rest' => true,
	) );
}
add_action( 'init', 'lavaur_register_actualites' );

/**
 * Seed the default categories from the cahier des charges so editors have
 * a consistent starting taxonomy: Ville, Culture, Travaux, Jeunesse, Sport,
 * Associations, Economie, Education.
 */
function lavaur_seed_actualite_categories() {
	$defaults = array( 'Ville', 'Culture', 'Travaux', 'Jeunesse', 'Sport', 'Associations', 'Economie', 'Education' );
	foreach ( $defaults as $term ) {
		if ( ! term_exists( $term, 'categorie_actualite' ) ) {
			wp_insert_term( $term, 'categorie_actualite' );
		}
	}
}
add_action( 'after_switch_theme', 'lavaur_seed_actualite_categories' );
