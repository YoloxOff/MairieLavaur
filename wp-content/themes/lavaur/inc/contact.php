<?php
/**
 * Contact form handler (cahier des charges section "Contact" - formulaire).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function lavaur_handle_contact_form() {
	$redirect = home_url( '/contact/' );

	$valid_nonce = isset( $_POST['lavaur_contact_nonce'] ) && wp_verify_nonce( $_POST['lavaur_contact_nonce'], 'lavaur_contact_form' );
	$nom     = isset( $_POST['nom'] ) ? sanitize_text_field( wp_unslash( $_POST['nom'] ) ) : '';
	$email   = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
	$sujet   = isset( $_POST['sujet'] ) ? sanitize_text_field( wp_unslash( $_POST['sujet'] ) ) : '';
	$message = isset( $_POST['message'] ) ? sanitize_textarea_field( wp_unslash( $_POST['message'] ) ) : '';

	if ( ! $valid_nonce || ! $nom || ! is_email( $email ) || ! $message ) {
		wp_safe_redirect( add_query_arg( 'contact', 'error', $redirect ) );
		exit;
	}

	$to      = get_option( 'admin_email' );
	$subject = $sujet ? $sujet : sprintf( __( 'Nouveau message de contact - %s', 'lavaur' ), $nom );
	$body    = sprintf( "%s\n\n%s: %s\n%s: %s\n\n%s", $message, __( 'Nom', 'lavaur' ), $nom, __( 'Email', 'lavaur' ), $email, __( 'Envoye depuis le formulaire de contact du site.', 'lavaur' ) );

	wp_mail( $to, $subject, $body, array( 'Reply-To: ' . $email ) );

	wp_safe_redirect( add_query_arg( 'contact', 'sent', $redirect ) );
	exit;
}
add_action( 'admin_post_lavaur_contact_form', 'lavaur_handle_contact_form' );
add_action( 'admin_post_nopriv_lavaur_contact_form', 'lavaur_handle_contact_form' );
