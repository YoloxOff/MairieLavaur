<?php
/**
 * La Ville - presentation, histoire, patrimoine, quartiers, plan interactif,
 * economie, environnement, galerie (cahier des charges section "La Ville").
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
		<p class="mt-3 max-w-2xl text-institution-100"><?php esc_html_e( 'Decouvrez Lavaur : son histoire, son patrimoine, ses quartiers et son cadre de vie au bord de l\'Agout.', 'lavaur' ); ?></p>
	</div>
</section>

<?php
lavaur_render_sections( array(
	array(
		'id'    => 'presentation',
		'title' => __( 'Presentation', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Sous-prefecture du Tarn, Lavaur est une ville d\'art et d\'histoire situee au bord de l\'Agout, entre Toulouse et Albi. Contenu a completer par la mairie.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'histoire',
		'title' => __( 'Histoire', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Fondee au haut Moyen Age, Lavaur a traverse la croisade des Albigeois et conserve un patrimoine historique riche. Contenu a completer par la mairie.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'patrimoine',
		'title' => __( 'Patrimoine', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Cathedrale Saint-Alain, jardin de l\'Eveche, pont de pierre... le patrimoine vauréen se decouvre au fil des rues. Contenu a completer par la mairie.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'quartiers',
		'title' => __( 'Quartiers', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Presentation des quartiers de la ville et de leurs conseils de quartier. Contenu a completer par la mairie.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'plan-interactif',
		'title' => __( 'Plan interactif', 'lavaur' ),
		'body'  => lavaur_get_map_html(),
	),
	array(
		'id'    => 'economie',
		'title' => __( 'Economie', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Zones d\'activites, commerces de centre-ville et acteurs economiques locaux. Contenu a completer par la mairie.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'environnement',
		'title' => __( 'Environnement', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Actions municipales en faveur de la transition ecologique et de la biodiversite. Contenu a completer par la mairie.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'galerie',
		'title' => __( 'Galerie photos & videos', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Galerie a alimenter depuis la mediatheque WordPress (photos et videos de la ville).', 'lavaur' ) . '</p>',
	),
) );
?>

<?php if ( get_the_content() ) : ?>
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 prose prose-institution max-w-none"><?php the_content(); ?></div>
<?php endif; ?>

<?php get_footer(); ?>
