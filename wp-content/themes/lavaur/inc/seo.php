<?php
/**
 * Baseline SEO: meta description, canonical, Open Graph, Schema.org
 * (cahier des charges section "Referencement (SEO)"). Deliberately dependency-free;
 * swap for Yoast/RankMath later without losing these defaults.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function lavaur_meta_description() {
	if ( is_singular() ) {
		$post = get_queried_object();
		$excerpt = has_excerpt( $post ) ? get_the_excerpt( $post ) : wp_trim_words( wp_strip_all_tags( $post->post_content ), 35 );
		return wp_strip_all_tags( $excerpt );
	}
	if ( is_category() || is_tax() ) {
		return wp_strip_all_tags( term_description() );
	}
	return get_bloginfo( 'description' );
}

function lavaur_head_meta() {
	$description = trim( lavaur_meta_description() );
	if ( $description ) {
		printf( '<meta name="description" content="%s">' . "\n", esc_attr( wp_html_excerpt( $description, 160, '...' ) ) );
	}

	printf( '<link rel="canonical" href="%s">' . "\n", esc_url( lavaur_current_url() ) );

	// Open Graph
	printf( '<meta property="og:site_name" content="%s">' . "\n", esc_attr( get_bloginfo( 'name' ) ) );
	printf( '<meta property="og:type" content="%s">' . "\n", is_singular() ? 'article' : 'website' );
	printf( '<meta property="og:title" content="%s">' . "\n", esc_attr( wp_get_document_title() ) );
	if ( $description ) {
		printf( '<meta property="og:description" content="%s">' . "\n", esc_attr( wp_html_excerpt( $description, 200, '...' ) ) );
	}
	printf( '<meta property="og:url" content="%s">' . "\n", esc_url( lavaur_current_url() ) );
	if ( is_singular() && has_post_thumbnail() ) {
		printf( '<meta property="og:image" content="%s">' . "\n", esc_url( get_the_post_thumbnail_url( null, 'lavaur-hero' ) ) );
	}
	printf( '<meta name="twitter:card" content="summary_large_image">' . "\n" );
}
add_action( 'wp_head', 'lavaur_head_meta', 1 );

function lavaur_current_url() {
	global $wp;
	return home_url( add_query_arg( array(), $wp->request ) );
}

/**
 * Schema.org GovernmentOrganization on every page, per section 10 (Schema.org).
 */
function lavaur_schema_org() {
	$schema = array(
		'@context' => 'https://schema.org',
		'@type'    => 'GovernmentOrganization',
		'name'     => get_bloginfo( 'name' ),
		'url'      => home_url( '/' ),
	);
	echo '<script type="application/ld+json">' . wp_json_encode( $schema ) . '</script>' . "\n";
}
add_action( 'wp_head', 'lavaur_schema_org', 2 );
