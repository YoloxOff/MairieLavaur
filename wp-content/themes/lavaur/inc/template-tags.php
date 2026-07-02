<?php
/**
 * Small reusable helpers shared across templates.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Fil d'Ariane (breadcrumb) - section "Referencement (SEO)".
 */
function lavaur_breadcrumb() {
	$items = array( array( 'label' => __( 'Accueil', 'lavaur' ), 'url' => home_url( '/' ) ) );

	if ( is_singular( array( 'actualite', 'evenement', 'demarche' ) ) ) {
		$post_type_obj = get_post_type_object( get_post_type() );
		$archive_link  = get_post_type_archive_link( get_post_type() );
		if ( $archive_link ) {
			$items[] = array( 'label' => $post_type_obj->labels->name, 'url' => $archive_link );
		}
		$items[] = array( 'label' => get_the_title(), 'url' => '' );
	} elseif ( is_post_type_archive( array( 'actualite', 'evenement', 'demarche' ) ) ) {
		$items[] = array( 'label' => post_type_archive_title( '', false ), 'url' => '' );
	} elseif ( is_page() ) {
		$ancestors = array_reverse( get_post_ancestors( get_the_ID() ) );
		foreach ( $ancestors as $ancestor_id ) {
			$items[] = array( 'label' => get_the_title( $ancestor_id ), 'url' => get_permalink( $ancestor_id ) );
		}
		$items[] = array( 'label' => get_the_title(), 'url' => '' );
	} elseif ( is_category() || is_tax() ) {
		$items[] = array( 'label' => single_term_title( '', false ), 'url' => '' );
	} elseif ( is_search() ) {
		$items[] = array( 'label' => sprintf( __( 'Resultats pour "%s"', 'lavaur' ), get_search_query() ), 'url' => '' );
	}

	if ( count( $items ) < 2 ) {
		return;
	}

	echo '<nav aria-label="' . esc_attr__( 'Fil d\'Ariane', 'lavaur' ) . '" class="text-sm text-institution-600 mb-6">';
	echo '<ol class="flex flex-wrap items-center gap-1">';
	foreach ( $items as $i => $item ) {
		echo '<li class="flex items-center gap-1">';
		if ( $item['url'] ) {
			printf( '<a href="%s" class="hover:underline">%s</a>', esc_url( $item['url'] ), esc_html( $item['label'] ) );
			echo '<span aria-hidden="true" class="mx-1">/</span>';
		} else {
			printf( '<span aria-current="page" class="font-medium text-institution-900">%s</span>', esc_html( $item['label'] ) );
		}
		echo '</li>';
	}
	echo '</ol></nav>';
}

/**
 * Formats an evenement's date range for display on cards and single view.
 */
function lavaur_evenement_date_range( $post_id ) {
	$debut = get_post_meta( $post_id, 'date_debut', true );
	$fin   = get_post_meta( $post_id, 'date_fin', true );
	if ( ! $debut ) {
		return '';
	}
	$debut_ts = strtotime( $debut );
	$fin_ts   = $fin ? strtotime( $fin ) : 0;

	$out = date_i18n( 'j F Y \\à H\\hi', $debut_ts );
	if ( $fin_ts && date_i18n( 'Ymd', $fin_ts ) !== date_i18n( 'Ymd', $debut_ts ) ) {
		$out .= ' → ' . date_i18n( 'j F Y', $fin_ts );
	}
	return $out;
}

/**
 * Social share links (section "Actualites" - partage reseaux sociaux).
 */
function lavaur_share_links( $url = '', $title = '' ) {
	$url   = $url ? $url : lavaur_current_url();
	$title = $title ? $title : get_the_title();

	$networks = array(
		'facebook' => 'https://www.facebook.com/sharer/sharer.php?u=' . rawurlencode( $url ),
		'linkedin' => 'https://www.linkedin.com/sharing/share-offsite/?url=' . rawurlencode( $url ),
		'email'    => 'mailto:?subject=' . rawurlencode( $title ) . '&body=' . rawurlencode( $url ),
	);

	echo '<ul class="flex items-center gap-3">';
	foreach ( $networks as $network => $href ) {
		printf(
			'<li><a class="btn-secondary !px-3 !py-2" rel="noopener noreferrer" target="_blank" href="%s" aria-label="%s">%s</a></li>',
			esc_url( $href ),
			esc_attr( sprintf( __( 'Partager sur %s', 'lavaur' ), ucfirst( $network ) ) ),
			esc_html( ucfirst( $network ) )
		);
	}
	echo '</ul>';
}

/**
 * Returns the map partial as an HTML string (for embedding inside section
 * bodies built via lavaur_render_sections, which expect a string not echo).
 */
function lavaur_get_map_html( $args = array() ) {
	ob_start();
	get_template_part( 'template-parts/map', null, $args );
	return ob_get_clean();
}

/**
 * Renders a page's anchored sub-sections (used by the page-{slug}.php
 * templates that mirror the cahier des charges arborescence). Each section
 * ships placeholder copy the mairie's editors are expected to replace.
 *
 * @param array $sections List of ['id', 'title', 'body' (HTML string)].
 */
function lavaur_render_sections( $sections ) {
	foreach ( $sections as $i => $section ) {
		$alt_bg = 0 === $i % 2;
		printf( '<section id="%s" class="scroll-mt-24 %s reveal reveal-visible">', esc_attr( $section['id'] ), $alt_bg ? '' : 'bg-surface-light' );
		echo '<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">';
		printf( '<h2 class="section-title mb-4">%s</h2>', esc_html( $section['title'] ) );
		echo '<div class="prose prose-institution max-w-none prose-headings:text-institution-900 prose-a:text-institution-700">' . $section['body'] . '</div>'; // phpcs:ignore -- trusted theme-authored HTML, not user input.
		echo '</div></section>';
	}
}
