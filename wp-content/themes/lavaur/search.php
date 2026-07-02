<?php
/**
 * Recherche globale (cahier des charges section 6 "Recherche globale").
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
	<?php lavaur_breadcrumb(); ?>
	<h1 class="section-title mb-2">
		<?php
		printf(
			/* translators: %s: search query */
			esc_html__( 'Resultats pour "%s"', 'lavaur' ),
			esc_html( get_search_query() )
		);
		?>
	</h1>
	<p class="text-institution-600 mb-8"><?php printf( esc_html( _n( '%d resultat trouve', '%d resultats trouves', $wp_query->found_posts, 'lavaur' ) ), (int) $wp_query->found_posts ); ?></p>

	<?php if ( have_posts() ) : ?>
		<ul class="space-y-4">
			<?php while ( have_posts() ) : the_post(); ?>
				<li class="card p-5">
					<p class="text-xs font-semibold uppercase tracking-wide text-institution-500 mb-1"><?php echo esc_html( get_post_type_object( get_post_type() )->labels->singular_name ); ?></p>
					<h2 class="font-semibold text-institution-900 mb-2"><a class="hover:underline" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
					<p class="text-sm text-institution-600"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 24 ) ); ?></p>
				</li>
			<?php endwhile; ?>
		</ul>
		<nav class="mt-10"><?php the_posts_pagination(); ?></nav>
	<?php else : ?>
		<p class="text-institution-600"><?php esc_html_e( 'Aucun resultat ne correspond a votre recherche.', 'lavaur' ); ?></p>
	<?php endif; ?>
</section>

<?php get_footer(); ?>
