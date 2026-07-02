<?php
/**
 * Demarche - detail with downloadable form and online-procedure link.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

while ( have_posts() ) :
	the_post();
	$pdf_id      = get_post_meta( get_the_ID(), 'formulaire_pdf_id', true );
	$lien_ligne  = get_post_meta( get_the_ID(), 'lien_demarche_en_ligne', true );
	?>
	<article class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
		<?php lavaur_breadcrumb(); ?>
		<h1 class="text-3xl sm:text-4xl font-bold text-institution-900 mb-6"><?php the_title(); ?></h1>

		<div class="prose prose-institution max-w-none prose-headings:text-institution-900 prose-a:text-institution-700">
			<?php the_content(); ?>
		</div>

		<div class="mt-10 flex flex-wrap gap-3">
			<?php if ( $lien_ligne ) : ?>
				<a href="<?php echo esc_url( $lien_ligne ); ?>" class="btn-primary" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Effectuer cette demarche en ligne', 'lavaur' ); ?></a>
			<?php endif; ?>
			<?php if ( $pdf_id && get_attached_file( $pdf_id ) ) : ?>
				<a href="<?php echo esc_url( wp_get_attachment_url( $pdf_id ) ); ?>" class="btn-secondary" download><?php esc_html_e( 'Telecharger le formulaire (PDF)', 'lavaur' ); ?></a>
			<?php endif; ?>
			<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn-secondary"><?php esc_html_e( 'Contacter le service concerne', 'lavaur' ); ?></a>
		</div>
	</article>
<?php endwhile; ?>

<?php get_footer(); ?>
