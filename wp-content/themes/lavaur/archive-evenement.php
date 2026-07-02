<?php
/**
 * Agenda - vue calendrier / vue liste, filtres, inscription (cahier des charges section "Agenda").
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$current_cat = isset( $_GET['categorie'] ) ? sanitize_title( wp_unslash( $_GET['categorie'] ) ) : '';

$query_args = array(
	'post_type'      => 'evenement',
	'posts_per_page' => 50,
	'no_found_rows'  => true,
	'meta_key'       => 'date_debut',
	'orderby'        => 'meta_value',
	'order'          => 'ASC',
	'meta_query'     => array(
		array(
			'key'     => 'date_debut',
			'value'   => current_time( 'Y-m-d\TH:i' ),
			'compare' => '>=',
			'type'    => 'DATETIME',
		),
	),
);
if ( $current_cat ) {
	$query_args['tax_query'] = array(
		array(
			'taxonomy' => 'categorie_agenda',
			'field'    => 'slug',
			'terms'    => $current_cat,
		),
	);
}
$evenements = new WP_Query( $query_args );
$categories = get_terms( array( 'taxonomy' => 'categorie_agenda', 'hide_empty' => false ) );

// Build a day => events map for the current month, for the "vue calendrier".
$month_start = strtotime( date_i18n( 'Y-m-01' ) );
$month_days  = (int) date_i18n( 't', $month_start );
$first_dow   = (int) date_i18n( 'N', $month_start ); // 1 (lundi) .. 7 (dimanche)
$days_with_events = array();
if ( $evenements->have_posts() ) {
	foreach ( $evenements->posts as $event_post ) {
		$debut = get_post_meta( $event_post->ID, 'date_debut', true );
		if ( ! $debut ) {
			continue;
		}
		$ts = strtotime( $debut );
		if ( date_i18n( 'Ym', $ts ) === date_i18n( 'Ym', $month_start ) ) {
			$day = (int) date_i18n( 'j', $ts );
			$days_with_events[ $day ][] = $event_post->post_title;
		}
	}
}
?>

<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12" x-data="{ view: 'liste' }">
	<?php lavaur_breadcrumb(); ?>
	<h1 class="section-title mb-2"><?php esc_html_e( 'Agenda', 'lavaur' ); ?></h1>
	<p class="text-institution-600 mb-8"><?php esc_html_e( 'Culture, sport, jeunesse, associations, commemorations : tous les evenements a venir a Lavaur.', 'lavaur' ); ?></p>

	<div class="flex flex-wrap items-center justify-between gap-4 mb-8">
		<?php if ( ! empty( $categories ) && ! is_wp_error( $categories ) ) : ?>
			<ul class="flex flex-wrap gap-2">
				<li>
					<a href="<?php echo esc_url( get_post_type_archive_link( 'evenement' ) ); ?>" class="inline-block rounded-full px-4 py-1.5 text-sm font-medium <?php echo '' === $current_cat ? 'bg-institution-800 text-white' : 'bg-institution-50 text-institution-700 hover:bg-institution-100'; ?>">
						<?php esc_html_e( 'Tous', 'lavaur' ); ?>
					</a>
				</li>
				<?php foreach ( $categories as $cat ) : ?>
					<li>
						<a href="<?php echo esc_url( add_query_arg( 'categorie', $cat->slug, get_post_type_archive_link( 'evenement' ) ) ); ?>" class="inline-block rounded-full px-4 py-1.5 text-sm font-medium <?php echo $current_cat === $cat->slug ? 'bg-institution-800 text-white' : 'bg-institution-50 text-institution-700 hover:bg-institution-100'; ?>">
							<?php echo esc_html( $cat->name ); ?>
						</a>
					</li>
				<?php endforeach; ?>
			</ul>
		<?php endif; ?>

		<div class="inline-flex rounded-full bg-institution-50 p-1" role="tablist" aria-label="<?php esc_attr_e( 'Mode d\'affichage', 'lavaur' ); ?>">
			<button type="button" role="tab" :aria-selected="view === 'liste'" @click="view = 'liste'" :class="view === 'liste' ? 'bg-white shadow-sm text-institution-900' : 'text-institution-600'" class="rounded-full px-4 py-1.5 text-sm font-medium"><?php esc_html_e( 'Vue liste', 'lavaur' ); ?></button>
			<button type="button" role="tab" :aria-selected="view === 'calendrier'" @click="view = 'calendrier'" :class="view === 'calendrier' ? 'bg-white shadow-sm text-institution-900' : 'text-institution-600'" class="rounded-full px-4 py-1.5 text-sm font-medium"><?php esc_html_e( 'Vue calendrier', 'lavaur' ); ?></button>
		</div>
	</div>

	<!-- Vue calendrier (mois en cours) -->
	<div x-show="view === 'calendrier'" x-cloak class="mb-10">
		<p class="font-semibold text-institution-800 mb-3"><?php echo esc_html( date_i18n( 'F Y' ) ); ?></p>
		<div class="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-institution-500 mb-1">
			<?php foreach ( array( 'L', 'M', 'M', 'J', 'V', 'S', 'D' ) as $d ) : ?>
				<div><?php echo esc_html( $d ); ?></div>
			<?php endforeach; ?>
		</div>
		<div class="grid grid-cols-7 gap-1">
			<?php for ( $i = 1; $i < $first_dow; $i++ ) : ?>
				<div></div>
			<?php endfor; ?>
			<?php for ( $day = 1; $day <= $month_days; $day++ ) : ?>
				<div class="aspect-square rounded-lg border border-institution-100 p-1.5 text-left <?php echo isset( $days_with_events[ $day ] ) ? 'bg-occitan-gold/10 ring-1 ring-occitan-gold' : ''; ?>">
					<span class="text-xs text-institution-700"><?php echo esc_html( $day ); ?></span>
					<?php if ( isset( $days_with_events[ $day ] ) ) : ?>
						<span class="block h-1.5 w-1.5 rounded-full bg-occitan-gold mt-1" aria-hidden="true"></span>
						<span class="sr-only"><?php echo esc_html( implode( ', ', $days_with_events[ $day ] ) ); ?></span>
					<?php endif; ?>
				</div>
			<?php endfor; ?>
		</div>
	</div>

	<!-- Vue liste -->
	<div x-show="view === 'liste'">
		<?php if ( $evenements->have_posts() ) : ?>
			<ul class="space-y-4">
				<?php while ( $evenements->have_posts() ) : $evenements->the_post(); ?>
					<li class="card flex flex-col sm:flex-row sm:items-center gap-4 p-5">
						<div class="sm:w-40 shrink-0 text-sm font-semibold text-institution-800"><?php echo esc_html( lavaur_evenement_date_range( get_the_ID() ) ); ?></div>
						<div class="flex-1">
							<h2 class="font-semibold text-institution-900"><a class="hover:underline" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
							<p class="text-sm text-institution-600"><?php echo esc_html( get_post_meta( get_the_ID(), 'lieu', true ) ); ?></p>
						</div>
						<?php if ( get_post_meta( get_the_ID(), 'inscription_requise', true ) ) : ?>
							<span class="shrink-0 inline-flex items-center rounded-full bg-occitan-terracotta/10 text-occitan-terracotta text-xs font-semibold px-3 py-1"><?php esc_html_e( 'Inscription requise', 'lavaur' ); ?></span>
						<?php endif; ?>
					</li>
				<?php endwhile; wp_reset_postdata(); ?>
			</ul>
		<?php else : ?>
			<p class="text-institution-600"><?php esc_html_e( 'Aucun evenement a venir pour cette categorie.', 'lavaur' ); ?></p>
		<?php endif; ?>
	</div>
</section>

<?php get_footer(); ?>
