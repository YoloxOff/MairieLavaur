<?php
/**
 * Newsletter signup form (double opt-in). Used in the footer and on the homepage.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$status = isset( $_GET['newsletter'] ) ? sanitize_key( wp_unslash( $_GET['newsletter'] ) ) : '';
$messages = array(
	'pending'   => __( 'Merci ! Verifiez votre boite mail pour confirmer votre inscription.', 'lavaur' ),
	'confirmed' => __( 'Votre inscription est confirmee, bienvenue !', 'lavaur' ),
	'invalid'   => __( 'Adresse email invalide.', 'lavaur' ),
	'error'     => __( 'Une erreur est survenue, merci de reessayer.', 'lavaur' ),
);
?>
<?php if ( $status && isset( $messages[ $status ] ) ) : ?>
	<p role="status" class="text-sm mb-3 rounded-lg bg-white text-institution-800 shadow-sm ring-1 ring-institution-100 px-3 py-2"><?php echo esc_html( $messages[ $status ] ); ?></p>
<?php endif; ?>
<form class="flex gap-2" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
	<label for="newsletter-email" class="sr-only"><?php esc_html_e( 'Adresse email', 'lavaur' ); ?></label>
	<input
		type="email"
		id="newsletter-email"
		name="email"
		required
		placeholder="<?php esc_attr_e( 'Votre email', 'lavaur' ); ?>"
		class="min-w-0 flex-1 rounded-full border-0 px-4 py-2 text-sm text-institution-900 placeholder:text-institution-400 focus:ring-2 focus:ring-occitan-gold"
	>
	<input type="hidden" name="action" value="lavaur_newsletter_signup">
	<?php wp_nonce_field( 'lavaur_newsletter_signup', 'lavaur_newsletter_nonce' ); ?>
	<button type="submit" class="rounded-full bg-occitan-gold px-4 py-2 text-sm font-medium text-institution-900 hover:brightness-95">
		<?php esc_html_e( 'S\'inscrire', 'lavaur' ); ?>
	</button>
</form>
