<?php
/**
 * Accueil - cahier des charges section 5 "Accueil".
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<!-- Hero dynamique -->
<section class="relative overflow-hidden bg-institution-900 text-white">
	<div class="absolute inset-0 bg-gradient-to-br from-institution-800 via-institution-900 to-institution-700"></div>
	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
		<p class="reveal reveal-visible text-occitan-gold font-semibold tracking-wide uppercase text-sm mb-3"><?php esc_html_e( 'Ville de Lavaur', 'lavaur' ); ?></p>
		<h1 class="reveal reveal-visible text-4xl sm:text-5xl font-bold tracking-tight max-w-2xl"><?php esc_html_e( 'Une ville qui vous ressemble, au coeur du Tarn', 'lavaur' ); ?></h1>
		<p class="reveal reveal-visible mt-4 max-w-xl text-institution-100"><?php esc_html_e( 'Actualites, demarches en ligne et vie municipale : retrouvez tous les services de votre ville en quelques clics.', 'lavaur' ); ?></p>

		<form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>" class="reveal reveal-visible mt-8 flex max-w-xl gap-2">
			<label for="hero-search" class="sr-only"><?php esc_html_e( 'Rechercher sur le site', 'lavaur' ); ?></label>
			<input id="hero-search" type="search" name="s" placeholder="<?php esc_attr_e( 'Rechercher une demarche, une actualite...', 'lavaur' ); ?>" class="min-w-0 flex-1 rounded-full border-0 px-5 py-3 text-institution-900 placeholder:text-institution-400">
			<button type="submit" class="btn-primary !bg-occitan-gold !text-institution-900 hover:!brightness-95"><?php esc_html_e( 'Rechercher', 'lavaur' ); ?></button>
		</form>
	</div>
</section>

<!-- Acces rapides -->
<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 reveal reveal-visible" aria-labelledby="acces-rapides-title">
	<h2 id="acces-rapides-title" class="sr-only"><?php esc_html_e( 'Acces rapides', 'lavaur' ); ?></h2>
	<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
		<?php
		$acces_rapides = array(
			array( 'label' => __( 'Etat civil', 'lavaur' ), 'url' => home_url( '/demarches/' ), 'icon' => '📄' ),
			array( 'label' => __( 'Urbanisme', 'lavaur' ), 'url' => home_url( '/demarches/#urbanisme' ), 'icon' => '🏗' ),
			array( 'label' => __( 'Ecoles & cantine', 'lavaur' ), 'url' => home_url( '/vivre-a-lavaur/#education' ), 'icon' => '🏫' ),
			array( 'label' => __( 'Signaler un probleme', 'lavaur' ), 'url' => home_url( '/demarches/#signalement' ), 'icon' => '🚧' ),
			array( 'label' => __( 'Prendre rendez-vous', 'lavaur' ), 'url' => home_url( '/services-municipaux/#rendez-vous' ), 'icon' => '📅' ),
			array( 'label' => __( 'Marche & dechets', 'lavaur' ), 'url' => home_url( '/vivre-a-lavaur/#commerces' ), 'icon' => '♻️' ),
		);
		foreach ( $acces_rapides as $item ) :
			?>
			<a href="<?php echo esc_url( $item['url'] ); ?>" class="card flex flex-col items-center gap-2 px-3 py-5 text-center">
				<span class="text-2xl" aria-hidden="true"><?php echo esc_html( $item['icon'] ); ?></span>
				<span class="text-sm font-medium text-institution-800"><?php echo esc_html( $item['label'] ); ?></span>
			</a>
		<?php endforeach; ?>
	</div>
</section>

<!-- Actualites -->
<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 reveal reveal-visible" aria-labelledby="actualites-title">
	<div class="flex items-end justify-between mb-8">
		<h2 id="actualites-title" class="section-title"><?php esc_html_e( 'Actualites', 'lavaur' ); ?></h2>
		<a class="text-sm font-medium text-institution-700 hover:text-institution-900" href="<?php echo esc_url( home_url( '/actualites/' ) ); ?>"><?php esc_html_e( 'Toutes les actualites →', 'lavaur' ); ?></a>
	</div>

	<?php
	$actus = new WP_Query( array(
		'post_type'      => 'actualite',
		'posts_per_page' => 3,
		'no_found_rows'  => true,
	) );
	?>
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
							<p class="text-xs font-semibold uppercase tracking-wide text-occitan-terracotta mb-2">
								<?php
								$terms = get_the_terms( get_the_ID(), 'categorie_actualite' );
								echo $terms && ! is_wp_error( $terms ) ? esc_html( $terms[0]->name ) : esc_html__( 'Ville', 'lavaur' );
								?>
							</p>
							<h3 class="font-semibold text-institution-900 mb-2"><?php the_title(); ?></h3>
							<p class="text-sm text-institution-600"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 18 ) ); ?></p>
						</div>
					</a>
				</article>
			<?php endwhile; wp_reset_postdata(); ?>
		</div>
	<?php else : ?>
		<p class="text-institution-600"><?php esc_html_e( 'Aucune actualite publiee pour le moment.', 'lavaur' ); ?></p>
	<?php endif; ?>
</section>

<!-- Agenda -->
<section class="bg-surface-light py-16 reveal reveal-visible" aria-labelledby="agenda-title">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-end justify-between mb-8">
			<h2 id="agenda-title" class="section-title"><?php esc_html_e( 'Agenda', 'lavaur' ); ?></h2>
			<a class="text-sm font-medium text-institution-700 hover:text-institution-900" href="<?php echo esc_url( home_url( '/agenda/' ) ); ?>"><?php esc_html_e( 'Voir tout l\'agenda →', 'lavaur' ); ?></a>
		</div>

		<?php
		$evenements = new WP_Query( array(
			'post_type'      => 'evenement',
			'posts_per_page' => 3,
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
		) );
		?>
		<?php if ( $evenements->have_posts() ) : ?>
			<div class="grid gap-6 md:grid-cols-3">
				<?php while ( $evenements->have_posts() ) : $evenements->the_post(); ?>
					<article class="card p-5">
						<p class="text-xs font-semibold uppercase tracking-wide text-institution-500 mb-2"><?php echo esc_html( lavaur_evenement_date_range( get_the_ID() ) ); ?></p>
						<h3 class="font-semibold text-institution-900 mb-2"><a href="<?php the_permalink(); ?>" class="hover:underline"><?php the_title(); ?></a></h3>
						<p class="text-sm text-institution-600"><?php echo esc_html( get_post_meta( get_the_ID(), 'lieu', true ) ); ?></p>
					</article>
				<?php endwhile; wp_reset_postdata(); ?>
			</div>
		<?php else : ?>
			<p class="text-institution-600"><?php esc_html_e( 'Aucun evenement a venir pour le moment.', 'lavaur' ); ?></p>
		<?php endif; ?>
	</div>
</section>

<!-- Chiffres cles -->
<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 reveal reveal-visible" aria-labelledby="chiffres-title">
	<h2 id="chiffres-title" class="section-title mb-8"><?php esc_html_e( 'Lavaur en chiffres', 'lavaur' ); ?></h2>
	<dl class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
		<?php
		// Chiffres a mettre a jour par la mairie (donnees indicatives).
		$chiffres = array(
			array( 'valeur' => '11 000+', 'label' => __( 'Habitants', 'lavaur' ) ),
			array( 'valeur' => '150+', 'label' => __( 'Associations', 'lavaur' ) ),
			array( 'valeur' => '10', 'label' => __( 'Groupes scolaires', 'lavaur' ) ),
			array( 'valeur' => '800', 'label' => __( 'Ans d\'histoire', 'lavaur' ) ),
		);
		foreach ( $chiffres as $chiffre ) :
			?>
			<div>
				<dt class="sr-only"><?php echo esc_html( $chiffre['label'] ); ?></dt>
				<dd class="text-3xl font-bold text-institution-800"><?php echo esc_html( $chiffre['valeur'] ); ?></dd>
				<p class="mt-1 text-sm text-institution-600"><?php echo esc_html( $chiffre['label'] ); ?></p>
			</div>
		<?php endforeach; ?>
	</dl>
</section>

<!-- Carte interactive -->
<section class="bg-surface-light py-16 reveal reveal-visible" aria-labelledby="carte-title">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 id="carte-title" class="section-title mb-8"><?php esc_html_e( 'Carte interactive', 'lavaur' ); ?></h2>
		<?php get_template_part( 'template-parts/map', null, array( 'height' => '420' ) ); ?>
	</div>
</section>

<!-- Newsletter -->
<section class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-center reveal reveal-visible" aria-labelledby="newsletter-title">
	<h2 id="newsletter-title" class="section-title"><?php esc_html_e( 'Restez informe', 'lavaur' ); ?></h2>
	<p class="mt-3 text-institution-600"><?php esc_html_e( 'Inscrivez-vous a la newsletter municipale pour ne rien manquer.', 'lavaur' ); ?></p>
	<div class="mt-6 max-w-md mx-auto text-left">
		<?php get_template_part( 'template-parts/newsletter-form' ); ?>
	</div>
</section>

<?php get_footer(); ?>
