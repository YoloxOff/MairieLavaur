<?php
/**
 * Vivre a Lavaur - petite enfance, ecoles, culture, sport, sante, mobilite,
 * commerces (cahier des charges section "Vivre a Lavaur").
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
		<p class="mt-3 max-w-2xl text-institution-100"><?php esc_html_e( 'Petite enfance, ecoles, culture, sport, sante, mobilite : tous les services du quotidien.', 'lavaur' ); ?></p>
	</div>
</section>

<?php
lavaur_render_sections( array(
	array(
		'id'    => 'petite-enfance',
		'title' => __( 'Petite enfance', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Creches, assistantes maternelles et relais petite enfance. Contenu a completer par la mairie.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'education',
		'title' => __( 'Ecoles, colleges, lycees', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Carte scolaire, inscriptions et etablissements presents sur la commune.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'culture',
		'title' => __( 'Culture & bibliotheque', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Mediatheque, ecole de musique et programmation culturelle municipale.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'sport',
		'title' => __( 'Sport & associations', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Equipements sportifs et vie associative vauréenne. Consultez l\'agenda pour les evenements.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'sante-securite',
		'title' => __( 'Sante & securite', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Offre de soins locale, police municipale et dispositifs de securite.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'mobilite',
		'title' => __( 'Mobilite', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Transports en commun, stationnement et amenagements cyclables.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'commerces',
		'title' => __( 'Commerces & marche', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Commerces de centre-ville et marche hebdomadaire de Lavaur.', 'lavaur' ) . '</p>',
	),
) );
?>

<?php if ( get_the_content() ) : ?>
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 prose prose-institution max-w-none"><?php the_content(); ?></div>
<?php endif; ?>

<?php get_footer(); ?>
