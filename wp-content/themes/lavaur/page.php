<?php
/**
 * Generic Page fallback (used when no page-{slug}.php template matches).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

while ( have_posts() ) :
	the_post();
	?>
	<article class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
		<?php lavaur_breadcrumb(); ?>
		<h1 class="text-3xl sm:text-4xl font-bold text-institution-900 mb-6"><?php the_title(); ?></h1>

		<?php if ( has_post_thumbnail() ) : ?>
			<?php the_post_thumbnail( 'lavaur-hero', array( 'class' => 'w-full rounded-xl mb-8' ) ); ?>
		<?php endif; ?>

		<div class="prose prose-institution max-w-none prose-headings:text-institution-900 prose-a:text-institution-700">
			<?php the_content(); ?>
		</div>
	</article>
<?php endwhile; ?>

<?php get_footer(); ?>
