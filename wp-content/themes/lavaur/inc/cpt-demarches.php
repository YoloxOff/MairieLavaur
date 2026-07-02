<?php
/**
 * Demarches: administrative procedures with a downloadable form attachment
 * (cahier des charges section "Demarches" - telechargement des formulaires).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function lavaur_register_demarches() {
	register_post_type( 'demarche', array(
		'labels' => array(
			'name'          => __( 'Demarches', 'lavaur' ),
			'singular_name' => __( 'Demarche', 'lavaur' ),
			'add_new_item'  => __( 'Ajouter une demarche', 'lavaur' ),
			'edit_item'     => __( 'Modifier la demarche', 'lavaur' ),
			'all_items'     => __( 'Demarches', 'lavaur' ),
		),
		'public'       => true,
		'has_archive'  => true,
		'rewrite'      => array( 'slug' => 'demarches' ),
		'menu_icon'    => 'dashicons-media-document',
		'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt', 'revisions', 'custom-fields' ),
		'show_in_rest' => true,
		'taxonomies'   => array( 'categorie_demarche' ),
	) );

	register_taxonomy( 'categorie_demarche', 'demarche', array(
		'labels' => array(
			'name'          => __( 'Categories de demarches', 'lavaur' ),
			'singular_name' => __( 'Categorie', 'lavaur' ),
		),
		'public'       => true,
		'hierarchical' => true,
		'rewrite'      => array( 'slug' => 'demarches/categorie' ),
		'show_in_rest' => true,
	) );

	register_post_meta( 'demarche', 'formulaire_pdf_id', array(
		'type'          => 'integer',
		'single'        => true,
		'show_in_rest'  => true,
		'auth_callback' => function () { return current_user_can( 'edit_posts' ); },
	) );
	register_post_meta( 'demarche', 'lien_demarche_en_ligne', array(
		'type'          => 'string',
		'single'        => true,
		'show_in_rest'  => true,
		'auth_callback' => function () { return current_user_can( 'edit_posts' ); },
	) );
}
add_action( 'init', 'lavaur_register_demarches' );

function lavaur_seed_demarche_categories() {
	$defaults = array(
		'Naissance', 'Mariage', 'Deces', 'Carte d\'identite', 'Passeport', 'Urbanisme',
		'Elections', 'Famille', 'Ecoles', 'Cantine', 'Dechets', 'Stationnement', 'Signalement',
	);
	foreach ( $defaults as $term ) {
		if ( ! term_exists( $term, 'categorie_demarche' ) ) {
			wp_insert_term( $term, 'categorie_demarche' );
		}
	}
}
add_action( 'after_switch_theme', 'lavaur_seed_demarche_categories' );
