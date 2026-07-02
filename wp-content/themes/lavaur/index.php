<?php
/**
 * Fallback required by WordPress (top of the template hierarchy).
 * front-page.php / page-*.php / archive-*.php / single-*.php cover every
 * URL this theme's own content model produces.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
	<?php if ( have_posts() ) : ?>
		<div class="grid gap-6 md:grid-cols-3">
			<?php while ( have_posts() ) : the_post(); ?>
				<article class="card p-5">
					<h2 class="font-semibold text-institution-900 mb-2"><a class="hover:underline" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
					<p class="text-sm text-institution-600"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 18 ) ); ?></p>
				</article>
			<?php endwhile; ?>
		</div>
		<nav class="mt-10"><?php the_posts_pagination(); ?></nav>
	<?php else : ?>
		<p class="text-institution-600"><?php esc_html_e( 'Aucun contenu a afficher.', 'lavaur' ); ?></p>
	<?php endif; ?>
</section>

<?php get_footer(); ?>
