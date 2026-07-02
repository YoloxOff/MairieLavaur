<?php
/**
 * Actualite - single article view with share buttons and related news.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

while ( have_posts() ) :
	the_post();
	$terms = get_the_terms( get_the_ID(), 'categorie_actualite' );
	?>
	<article class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
		<?php lavaur_breadcrumb(); ?>

		<?php if ( $terms && ! is_wp_error( $terms ) ) : ?>
			<p class="text-xs font-semibold uppercase tracking-wide text-occitan-terracotta mb-2"><?php echo esc_html( $terms[0]->name ); ?></p>
		<?php endif; ?>

		<h1 class="text-3xl sm:text-4xl font-bold text-institution-900 mb-3"><?php the_title(); ?></h1>
		<p class="text-sm text-institution-500 mb-8">
			<?php
			printf(
				/* translators: 1: date, 2: author name */
				esc_html__( 'Publie le %1$s par %2$s', 'lavaur' ),
				esc_html( get_the_date() ),
				esc_html( get_the_author() )
			);
			?>
		</p>

		<?php if ( has_post_thumbnail() ) : ?>
			<?php the_post_thumbnail( 'lavaur-hero', array( 'class' => 'w-full rounded-xl mb-8', 'loading' => 'eager' ) ); ?>
		<?php endif; ?>

		<div class="prose prose-institution max-w-none prose-headings:text-institution-900 prose-a:text-institution-700">
			<?php the_content(); ?>
		</div>

		<div class="mt-10 pt-6 border-t border-institution-100">
			<p class="text-sm font-semibold text-institution-700 mb-3"><?php esc_html_e( 'Partager cet article', 'lavaur' ); ?></p>
			<?php lavaur_share_links(); ?>
		</div>
	</article>

	<?php
	$related = new WP_Query( array(
		'post_type'      => 'actualite',
		'posts_per_page' => 3,
		'post__not_in'   => array( get_the_ID() ),
		'no_found_rows'  => true,
		'tax_query'      => $terms && ! is_wp_error( $terms ) ? array(
			array(
				'taxonomy' => 'categorie_actualite',
				'field'    => 'term_id',
				'terms'    => wp_list_pluck( $terms, 'term_id' ),
			),
		) : array(),
	) );
	?>
	<?php if ( $related->have_posts() ) : ?>
		<section class="bg-surface-light py-16">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h2 class="section-title mb-8"><?php esc_html_e( 'A lire aussi', 'lavaur' ); ?></h2>
				<div class="grid gap-6 md:grid-cols-3">
					<?php while ( $related->have_posts() ) : $related->the_post(); ?>
						<article class="card p-5">
							<h3 class="font-semibold text-institution-900 mb-2"><a class="hover:underline" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
							<p class="text-sm text-institution-600"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 16 ) ); ?></p>
						</article>
					<?php endwhile; wp_reset_postdata(); ?>
				</div>
			</div>
		</section>
	<?php endif; ?>
<?php endwhile; ?>

<?php get_footer(); ?>
