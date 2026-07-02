<?php
/**
 * Demarches - listing grouped by categorie, telechargement des formulaires.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$categories = get_terms( array( 'taxonomy' => 'categorie_demarche', 'hide_empty' => false ) );
?>

<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
	<?php lavaur_breadcrumb(); ?>
	<h1 class="section-title mb-2"><?php esc_html_e( 'Demarches', 'lavaur' ); ?></h1>
	<p class="text-institution-600 mb-10"><?php esc_html_e( 'Naissance, mariage, deces, carte d\'identite, passeport, urbanisme, elections... Retrouvez toutes vos demarches et leurs formulaires.', 'lavaur' ); ?></p>

	<?php if ( ! empty( $categories ) && ! is_wp_error( $categories ) ) : ?>
		<?php foreach ( $categories as $cat ) : ?>
			<?php
			$demarches_cat = new WP_Query( array(
				'post_type'      => 'demarche',
				'posts_per_page' => -1,
				'no_found_rows'  => true,
				'tax_query'      => array(
					array(
						'taxonomy' => 'categorie_demarche',
						'field'    => 'term_id',
						'terms'    => $cat->term_id,
					),
				),
			) );
			if ( ! $demarches_cat->have_posts() ) {
				continue;
			}
			?>
			<div id="<?php echo esc_attr( $cat->slug ); ?>" class="mb-10">
				<h2 class="text-lg font-semibold text-institution-900 mb-4"><?php echo esc_html( $cat->name ); ?></h2>
				<ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					<?php while ( $demarches_cat->have_posts() ) : $demarches_cat->the_post(); ?>
						<li>
							<a href="<?php the_permalink(); ?>" class="card flex items-center justify-between gap-3 px-4 py-3">
								<span class="font-medium text-institution-800"><?php the_title(); ?></span>
								<svg class="h-4 w-4 text-institution-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
							</a>
						</li>
					<?php endwhile; wp_reset_postdata(); ?>
				</ul>
			</div>
		<?php endforeach; ?>
	<?php else : ?>
		<p class="text-institution-600"><?php esc_html_e( 'Aucune demarche publiee pour le moment.', 'lavaur' ); ?></p>
	<?php endif; ?>
</section>

<?php get_footer(); ?>
