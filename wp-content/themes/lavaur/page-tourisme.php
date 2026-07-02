<?php
/**
 * Tourisme - monuments, balades, restaurants, hebergements, office de
 * tourisme, carte interactive (cahier des charges section "Tourisme").
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<section class="bg-institution-900 text-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
		<?php lavaur_breadcrumb(); ?>
		<h1 class="text-4xl font-bold"><?php the_title(); ?></h1>
		<p class="mt-3 max-w-2xl text-institution-100"><?php esc_html_e( 'Decouvrir Lavaur : monuments, balades, gastronomie et hebergements.', 'lavaur' ); ?></p>
	</div>
</section>

<?php
lavaur_render_sections( array(
	array(
		'id'    => 'monuments',
		'title' => __( 'Monuments', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Cathedrale Saint-Alain, jardin de l\'Eveche, tour des Rondes... Contenu a completer par l\'office de tourisme.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'balades',
		'title' => __( 'Balades', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Itineraires de randonnee et balades le long de l\'Agout.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'restaurants-hebergements',
		'title' => __( 'Restaurants & hebergements', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Selection de restaurants, hotels et chambres d\'hotes a Lavaur et alentours.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'office-de-tourisme',
		'title' => __( 'Office de tourisme', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Coordonnees et horaires de l\'office de tourisme du Vaurais.', 'lavaur' ) . '</p>',
	),
) );
?>

<section class="bg-surface-light reveal reveal-visible">
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
		<h2 class="section-title mb-4"><?php esc_html_e( 'Carte interactive', 'lavaur' ); ?></h2>
		<?php get_template_part( 'template-parts/map', null, array( 'height' => '420' ) ); ?>
	</div>
</section>

<?php if ( get_the_content() ) : ?>
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 prose prose-institution max-w-none"><?php the_content(); ?></div>
<?php endif; ?>

<?php get_footer(); ?>
