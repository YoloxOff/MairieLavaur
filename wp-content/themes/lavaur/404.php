<?php
/**
 * 404.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<section class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 text-center">
	<p class="text-6xl font-bold text-institution-200 mb-4">404</p>
	<h1 class="section-title mb-4"><?php esc_html_e( 'Page introuvable', 'lavaur' ); ?></h1>
	<p class="text-institution-600 mb-8"><?php esc_html_e( 'La page que vous recherchez n\'existe pas ou plus.', 'lavaur' ); ?></p>
	<div class="flex items-center justify-center gap-3">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn-primary"><?php esc_html_e( 'Retour a l\'accueil', 'lavaur' ); ?></a>
		<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn-secondary"><?php esc_html_e( 'Nous contacter', 'lavaur' ); ?></a>
	</div>
</section>

<?php get_footer(); ?>
