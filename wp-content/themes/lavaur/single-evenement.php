<?php
/**
 * Evenement - single agenda entry with inscription CTA.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

while ( have_posts() ) :
	the_post();
	$lieu             = get_post_meta( get_the_ID(), 'lieu', true );
	$inscription       = get_post_meta( get_the_ID(), 'inscription_requise', true );
	$inscription_url   = get_post_meta( get_the_ID(), 'inscription_url', true );
	$terms             = get_the_terms( get_the_ID(), 'categorie_agenda' );
	?>
	<article class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
		<?php lavaur_breadcrumb(); ?>

		<?php if ( $terms && ! is_wp_error( $terms ) ) : ?>
			<p class="text-xs font-semibold uppercase tracking-wide text-occitan-terracotta mb-2"><?php echo esc_html( $terms[0]->name ); ?></p>
		<?php endif; ?>

		<h1 class="text-3xl sm:text-4xl font-bold text-institution-900 mb-4"><?php the_title(); ?></h1>

		<div class="card p-5 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
			<div>
				<p class="text-sm font-semibold text-institution-800"><?php echo esc_html( lavaur_evenement_date_range( get_the_ID() ) ); ?></p>
				<?php if ( $lieu ) : ?><p class="text-sm text-institution-600"><?php echo esc_html( $lieu ); ?></p><?php endif; ?>
			</div>
			<?php if ( $inscription ) : ?>
				<a href="<?php echo esc_url( $inscription_url ? $inscription_url : home_url( '/contact/' ) ); ?>" class="btn-primary sm:ml-auto"><?php esc_html_e( 'S\'inscrire a cet evenement', 'lavaur' ); ?></a>
			<?php endif; ?>
		</div>

		<?php if ( has_post_thumbnail() ) : ?>
			<?php the_post_thumbnail( 'lavaur-hero', array( 'class' => 'w-full rounded-xl mb-8', 'loading' => 'eager' ) ); ?>
		<?php endif; ?>

		<div class="prose prose-institution max-w-none prose-headings:text-institution-900 prose-a:text-institution-700">
			<?php the_content(); ?>
		</div>

		<?php if ( $lieu ) : ?>
			<div class="mt-10">
				<h2 class="section-title !text-lg mb-4"><?php esc_html_e( 'Lieu', 'lavaur' ); ?></h2>
				<?php get_template_part( 'template-parts/map', null, array( 'height' => '320', 'query' => $lieu . ', Lavaur' ) ); ?>
			</div>
		<?php endif; ?>

		<div class="mt-10 pt-6 border-t border-institution-100">
			<p class="text-sm font-semibold text-institution-700 mb-3"><?php esc_html_e( 'Partager cet evenement', 'lavaur' ); ?></p>
			<?php lavaur_share_links(); ?>
		</div>
	</article>
<?php endwhile; ?>

<?php get_footer(); ?>
