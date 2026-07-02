<?php
/**
 * Vie municipale - maire, elus, conseil, deliberations, budgets, marches
 * publics, recrutement, publications (cahier des charges section "Vie Municipale").
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
		<p class="mt-3 max-w-2xl text-institution-100"><?php esc_html_e( 'Le maire, les elus, le conseil municipal et les publications officielles de la ville.', 'lavaur' ); ?></p>
	</div>
</section>

<?php
lavaur_render_sections( array(
	array(
		'id'    => 'maire',
		'title' => __( 'Le Maire', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Presentation du maire et de ses delegations. Contenu et photo a fournir par la mairie.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'elus',
		'title' => __( 'Les elus', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Liste des adjoints et conseillers municipaux avec leurs delegations. Contenu a completer par la mairie.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'conseil-municipal',
		'title' => __( 'Conseil municipal', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Dates des seances, ordres du jour et retransmissions du conseil municipal.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'deliberations',
		'title' => __( 'Deliberations', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Registre des deliberations du conseil municipal, telechargeables au format PDF.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'budgets',
		'title' => __( 'Budgets', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Budgets primitifs, comptes administratifs et documents budgetaires de la commune.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'marches-publics',
		'title' => __( 'Marches publics', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Consultations en cours et avis de marches publics de la Ville de Lavaur.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'recrutement',
		'title' => __( 'Recrutement & offres d\'emploi', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Offres d\'emploi et de stage au sein des services municipaux.', 'lavaur' ) . '</p>',
	),
	array(
		'id'    => 'publications',
		'title' => __( 'Publications & comptes-rendus', 'lavaur' ),
		'body'  => '<p>' . esc_html__( 'Bulletin municipal, rapports d\'activite et comptes-rendus telechargeables.', 'lavaur' ) . '</p>',
	),
) );
?>

<?php if ( get_the_content() ) : ?>
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 prose prose-institution max-w-none"><?php the_content(); ?></div>
<?php endif; ?>

<?php get_footer(); ?>
