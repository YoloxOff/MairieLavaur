<?php
/**
 * Primary navigation, driven from the site arborescence (cahier des charges
 * section 5). Renders from a static structure so the menu is complete out of
 * the box; swap for wp_nav_menu()/a Walker once editors manage it from
 * Apparence > Menus in the back office.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function lavaur_nav_structure() {
	return array(
		array( 'label' => __( 'Accueil', 'lavaur' ), 'url' => home_url( '/' ) ),
		array(
			'label'    => __( 'La Ville', 'lavaur' ),
			'url'      => home_url( '/la-ville/' ),
			'children' => array(
				array( 'label' => __( 'Presentation', 'lavaur' ), 'url' => home_url( '/la-ville/#presentation' ) ),
				array( 'label' => __( 'Histoire', 'lavaur' ), 'url' => home_url( '/la-ville/#histoire' ) ),
				array( 'label' => __( 'Patrimoine', 'lavaur' ), 'url' => home_url( '/la-ville/#patrimoine' ) ),
				array( 'label' => __( 'Quartiers', 'lavaur' ), 'url' => home_url( '/la-ville/#quartiers' ) ),
				array( 'label' => __( 'Plan interactif', 'lavaur' ), 'url' => home_url( '/la-ville/#plan-interactif' ) ),
				array( 'label' => __( 'Economie', 'lavaur' ), 'url' => home_url( '/la-ville/#economie' ) ),
				array( 'label' => __( 'Environnement', 'lavaur' ), 'url' => home_url( '/la-ville/#environnement' ) ),
				array( 'label' => __( 'Galerie photos & videos', 'lavaur' ), 'url' => home_url( '/la-ville/#galerie' ) ),
			),
		),
		array(
			'label'    => __( 'Vie municipale', 'lavaur' ),
			'url'      => home_url( '/vie-municipale/' ),
			'children' => array(
				array( 'label' => __( 'Le Maire', 'lavaur' ), 'url' => home_url( '/vie-municipale/#maire' ) ),
				array( 'label' => __( 'Les elus', 'lavaur' ), 'url' => home_url( '/vie-municipale/#elus' ) ),
				array( 'label' => __( 'Conseil municipal', 'lavaur' ), 'url' => home_url( '/vie-municipale/#conseil-municipal' ) ),
				array( 'label' => __( 'Deliberations', 'lavaur' ), 'url' => home_url( '/vie-municipale/#deliberations' ) ),
				array( 'label' => __( 'Budgets', 'lavaur' ), 'url' => home_url( '/vie-municipale/#budgets' ) ),
				array( 'label' => __( 'Marches publics', 'lavaur' ), 'url' => home_url( '/vie-municipale/#marches-publics' ) ),
				array( 'label' => __( 'Recrutement & offres d\'emploi', 'lavaur' ), 'url' => home_url( '/vie-municipale/#recrutement' ) ),
				array( 'label' => __( 'Publications & comptes-rendus', 'lavaur' ), 'url' => home_url( '/vie-municipale/#publications' ) ),
			),
		),
		array( 'label' => __( 'Actualites', 'lavaur' ), 'url' => home_url( '/actualites/' ) ),
		array( 'label' => __( 'Agenda', 'lavaur' ), 'url' => home_url( '/agenda/' ) ),
		array( 'label' => __( 'Demarches', 'lavaur' ), 'url' => home_url( '/demarches/' ) ),
		array(
			'label'    => __( 'Vivre a Lavaur', 'lavaur' ),
			'url'      => home_url( '/vivre-a-lavaur/' ),
			'children' => array(
				array( 'label' => __( 'Petite enfance', 'lavaur' ), 'url' => home_url( '/vivre-a-lavaur/#petite-enfance' ) ),
				array( 'label' => __( 'Ecoles, colleges, lycees', 'lavaur' ), 'url' => home_url( '/vivre-a-lavaur/#education' ) ),
				array( 'label' => __( 'Culture & bibliotheque', 'lavaur' ), 'url' => home_url( '/vivre-a-lavaur/#culture' ) ),
				array( 'label' => __( 'Sport & associations', 'lavaur' ), 'url' => home_url( '/vivre-a-lavaur/#sport' ) ),
				array( 'label' => __( 'Sante & securite', 'lavaur' ), 'url' => home_url( '/vivre-a-lavaur/#sante-securite' ) ),
				array( 'label' => __( 'Mobilite', 'lavaur' ), 'url' => home_url( '/vivre-a-lavaur/#mobilite' ) ),
				array( 'label' => __( 'Commerces & marche', 'lavaur' ), 'url' => home_url( '/vivre-a-lavaur/#commerces' ) ),
			),
		),
		array(
			'label'    => __( 'Tourisme', 'lavaur' ),
			'url'      => home_url( '/tourisme/' ),
			'children' => array(
				array( 'label' => __( 'Monuments', 'lavaur' ), 'url' => home_url( '/tourisme/#monuments' ) ),
				array( 'label' => __( 'Balades', 'lavaur' ), 'url' => home_url( '/tourisme/#balades' ) ),
				array( 'label' => __( 'Restaurants & hebergements', 'lavaur' ), 'url' => home_url( '/tourisme/#restaurants-hebergements' ) ),
				array( 'label' => __( 'Office de tourisme', 'lavaur' ), 'url' => home_url( '/tourisme/#office-de-tourisme' ) ),
			),
		),
		array(
			'label'    => __( 'Services municipaux', 'lavaur' ),
			'url'      => home_url( '/services-municipaux/' ),
			'children' => array(
				array( 'label' => __( 'Tous les services', 'lavaur' ), 'url' => home_url( '/services-municipaux/#tous-les-services' ) ),
				array( 'label' => __( 'Horaires & contacts', 'lavaur' ), 'url' => home_url( '/services-municipaux/#horaires-contacts' ) ),
				array( 'label' => __( 'Prise de rendez-vous', 'lavaur' ), 'url' => home_url( '/services-municipaux/#rendez-vous' ) ),
			),
		),
		array( 'label' => __( 'Contact', 'lavaur' ), 'url' => home_url( '/contact/' ) ),
	);
}

function lavaur_primary_nav( $mobile = false ) {
	$items = lavaur_nav_structure();

	if ( $mobile ) {
		echo '<ul class="divide-y divide-institution-100 px-4 sm:px-6 py-2">';
		foreach ( $items as $item ) {
			if ( ! empty( $item['children'] ) ) {
				echo '<li class="py-1">';
				echo '<details class="group">';
				printf(
					'<summary class="flex items-center justify-between py-2 cursor-pointer font-medium text-institution-800 list-none">%s <svg class="h-4 w-4 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg></summary>',
					esc_html( $item['label'] )
				);
				echo '<ul class="pl-4 pb-2 space-y-1">';
				foreach ( $item['children'] as $child ) {
					printf( '<li><a class="block py-1.5 text-institution-700 hover:text-institution-900" href="%s">%s</a></li>', esc_url( $child['url'] ), esc_html( $child['label'] ) );
				}
				echo '</ul></details></li>';
			} else {
				printf( '<li><a class="block py-3 font-medium text-institution-800 hover:text-institution-900" href="%s">%s</a></li>', esc_url( $item['url'] ), esc_html( $item['label'] ) );
			}
		}
		echo '</ul>';
		return;
	}

	echo '<ul class="flex items-center gap-1 text-[0.95rem]">';
	foreach ( $items as $item ) {
		$has_children = ! empty( $item['children'] );
		printf( '<li class="relative%s">', $has_children ? ' group' : '' );
		printf(
			'<a href="%s" class="flex items-center gap-1 px-3 py-2 rounded-full font-medium text-institution-700 hover:bg-institution-50 hover:text-institution-900">%s%s</a>',
			esc_url( $item['url'] ),
			esc_html( $item['label'] ),
			$has_children ? ' <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>' : ''
		);
		if ( $has_children ) {
			echo '<ul class="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity absolute left-0 top-full pt-2 w-72 z-40">';
			echo '<li class="bg-white rounded-xl shadow-lg ring-1 ring-institution-100 p-2">';
			echo '<ul>';
			foreach ( $item['children'] as $child ) {
				printf( '<li><a class="block px-3 py-2 rounded-lg text-sm text-institution-700 hover:bg-institution-50 hover:text-institution-900" href="%s">%s</a></li>', esc_url( $child['url'] ), esc_html( $child['label'] ) );
			}
			echo '</ul></li></ul>';
		}
		echo '</li>';
	}
	echo '</ul>';
}
