<?php
/**
 * Newsletter signup with double opt-in (cahier des charges section 6).
 * Stores subscribers as a lightweight CPT (no extra DB table, no plugin).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function lavaur_register_newsletter_cpt() {
	register_post_type( 'newsletter_abonne', array(
		'labels'          => array( 'name' => __( 'Abonnes newsletter', 'lavaur' ) ),
		'public'          => false,
		'show_ui'         => true,
		'show_in_menu'    => 'edit.php?post_type=actualite',
		'supports'        => array( 'title' ),
		'capability_type' => 'post',
	) );
}
add_action( 'init', 'lavaur_register_newsletter_cpt' );

function lavaur_newsletter_handle_signup() {
	if ( ! isset( $_POST['lavaur_newsletter_nonce'] ) || ! wp_verify_nonce( $_POST['lavaur_newsletter_nonce'], 'lavaur_newsletter_signup' ) ) {
		wp_safe_redirect( add_query_arg( 'newsletter', 'error', wp_get_referer() ?: home_url( '/' ) ) );
		exit;
	}

	$email = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
	if ( ! $email || ! is_email( $email ) ) {
		wp_safe_redirect( add_query_arg( 'newsletter', 'invalid', wp_get_referer() ?: home_url( '/' ) ) );
		exit;
	}

	$existing = get_page_by_title( $email, OBJECT, 'newsletter_abonne' );
	$token    = wp_generate_password( 32, false );

	if ( $existing ) {
		update_post_meta( $existing->ID, 'token', $token );
		$post_id = $existing->ID;
	} else {
		$post_id = wp_insert_post( array(
			'post_type'   => 'newsletter_abonne',
			'post_title'  => $email,
			'post_status' => 'publish',
		) );
		update_post_meta( $post_id, 'status', 'pending' );
		update_post_meta( $post_id, 'token', $token );
	}

	$confirm_url = add_query_arg( array( 'lavaur_confirm' => $token ), home_url( '/' ) );
	wp_mail(
		$email,
		sprintf( __( 'Confirmez votre inscription a la newsletter de %s', 'lavaur' ), get_bloginfo( 'name' ) ),
		sprintf( __( "Bonjour,\n\nMerci de confirmer votre inscription en cliquant sur ce lien :\n%s\n\nSi vous n'etes pas a l'origine de cette demande, ignorez ce message.", 'lavaur' ), $confirm_url )
	);

	wp_safe_redirect( add_query_arg( 'newsletter', 'pending', wp_get_referer() ?: home_url( '/' ) ) );
	exit;
}
add_action( 'admin_post_lavaur_newsletter_signup', 'lavaur_newsletter_handle_signup' );
add_action( 'admin_post_nopriv_lavaur_newsletter_signup', 'lavaur_newsletter_handle_signup' );

function lavaur_newsletter_confirm() {
	if ( empty( $_GET['lavaur_confirm'] ) ) {
		return;
	}
	$token = sanitize_text_field( wp_unslash( $_GET['lavaur_confirm'] ) );

	$matches = get_posts( array(
		'post_type'   => 'newsletter_abonne',
		'meta_key'    => 'token',
		'meta_value'  => $token,
		'numberposts' => 1,
	) );

	if ( $matches ) {
		update_post_meta( $matches[0]->ID, 'status', 'confirme' );
		wp_safe_redirect( add_query_arg( 'newsletter', 'confirmed', home_url( '/' ) ) );
		exit;
	}

	wp_safe_redirect( add_query_arg( 'newsletter', 'invalid', home_url( '/' ) ) );
	exit;
}
add_action( 'template_redirect', 'lavaur_newsletter_confirm' );
