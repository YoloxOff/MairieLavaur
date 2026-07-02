<?php
/**
 * Actualites - categories, recherche, filtres (cahier des charges section "Actualites").
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$current_cat = isset( $_GET['categorie'] ) ? sanitize_title( wp_unslash( $_GET['categorie'] ) ) : '';
$search_term = isset( $_GET['recherche'] ) ? sanitize_text_field( wp_unslash( $_GET['recherche'] ) ) : '';

$paged = max( 1, get_query_var( 'paged' ) ? get_query_var( 'paged' ) : ( get_query_var( 'page' ) ? get_query_var( 'page' ) : 1 ) );

$query_args = array(
	'post_type'      => 'actualite',
	'posts_per_page' => 9,
	'paged'          => $paged,
);
if ( $current_cat ) {
	$query_args['tax_query'] = array(
		array(
			'taxonomy' => 'categorie_actualite',
			'field'    => 'slug',
			'terms'    => $current_cat,
		),
	);
}
if ( $search_term ) {
	$query_args['s'] = $search_term;
}
$actus = new WP_Query( $query_args );

$categories = get_terms( array( 'taxonomy' => 'categorie_actualite', 'hide_empty' => false ) );
?>

<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
	<?php lavaur_breadcrumb(); ?>
	<h1 class="section-title mb-2"><?php esc_html_e( 'Actualites', 'lavaur' ); ?></h1>
	<p class="text-institution-600 mb-8"><?php esc_html_e( 'Toute l\'actualite de la ville : vie municipale, culture, travaux, jeunesse, sport, associations, economie, education.', 'lavaur' ); ?></p>

	<form method="get" class="flex flex-wrap gap-3 mb-8" action="<?php echo esc_url( get_post_type_archive_link( 'actualite' ) ); ?>">
		<label for="recherche-actu" class="sr-only"><?php esc_html_e( 'Rechercher une actualite', 'lavaur' ); ?></label>
		<input type="search" id="recherche-actu" name="recherche" value="<?php echo esc_attr( $search_term ); ?>" placeholder="<?php esc_attr_e( 'Rechercher...', 'lavaur' ); ?>" class="rounded-full border border-institution-200 px-4 py-2 text-sm flex-1 min-w-[200px]">
		<?php if ( $current_cat ) : ?><input type="hidden" name="categorie" value="<?php echo esc_attr( $current_cat ); ?>"><?php endif; ?>
		<button type="submit" class="btn-secondary"><?php esc_html_e( 'Rechercher', 'lavaur' ); ?></button>
	</form>

	<?php if ( ! empty( $categories ) && ! is_wp_error( $categories ) ) : ?>
		<ul class="flex flex-wrap gap-2 mb-10">
			<li>
				<a href="<?php echo esc_url( get_post_type_archive_link( 'actualite' ) ); ?>" class="inline-block rounded-full px-4 py-1.5 text-sm font-medium <?php echo '' === $current_cat ? 'bg-institution-800 text-white' : 'bg-institution-50 text-institution-700 hover:bg-institution-100'; ?>">
					<?php esc_html_e( 'Toutes', 'lavaur' ); ?>
				</a>
			</li>
			<?php foreach ( $categories as $cat ) : ?>
				<li>
					<a href="<?php echo esc_url( add_query_arg( 'categorie', $cat->slug, get_post_type_archive_link( 'actualite' ) ) ); ?>" class="inline-block rounded-full px-4 py-1.5 text-sm font-medium <?php echo $current_cat === $cat->slug ? 'bg-institution-800 text-white' : 'bg-institution-50 text-institution-700 hover:bg-institution-100'; ?>">
						<?php echo esc_html( $cat->name ); ?>
					</a>
				</li>
			<?php endforeach; ?>
		</ul>
	<?php endif; ?>

	<?php if ( $actus->have_posts() ) : ?>
		<div class="grid gap-6 md:grid-cols-3">
			<?php while ( $actus->have_posts() ) : $actus->the_post(); ?>
				<article class="card">
					<a href="<?php the_permalink(); ?>" class="block">
						<?php if ( has_post_thumbnail() ) : ?>
							<?php the_post_thumbnail( 'lavaur-card', array( 'class' => 'w-full h-44 object-cover', 'loading' => 'lazy' ) ); ?>
						<?php else : ?>
							<div class="w-full h-44 bg-institution-100" aria-hidden="true"></div>
						<?php endif; ?>
						<div class="p-5">
							<p class="text-xs font-semibold uppercase tracking-wide text-occitan-terracotta mb-2"><?php echo esc_html( get_the_date() ); ?></p>
							<h2 class="font-semibold text-institution-900 mb-2"><?php the_title(); ?></h2>
							<p class="text-sm text-institution-600"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 18 ) ); ?></p>
						</div>
					</a>
				</article>
			<?php endwhile; ?>
		</div>

		<nav class="mt-10" aria-label="<?php esc_attr_e( 'Pagination', 'lavaur' ); ?>">
			<?php
			echo paginate_links( array(
				'total'   => $actus->max_num_pages,
				'current' => $paged,
				'mid_size'=> 2,
				'prev_text' => __( '← Precedent', 'lavaur' ),
				'next_text' => __( 'Suivant →', 'lavaur' ),
			) );
			?>
		</nav>
		<?php wp_reset_postdata(); ?>
	<?php else : ?>
		<p class="text-institution-600"><?php esc_html_e( 'Aucune actualite ne correspond a votre recherche.', 'lavaur' ); ?></p>
	<?php endif; ?>
</section>

<?php get_footer(); ?>
