<?php
/**
 * Services Municipaux - tous les services, contacts, horaires, documents,
 * prise de rendez-vous (cahier des charges section "Services Municipaux").
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$services = array(
	array( 'nom' => __( 'Etat civil', 'lavaur' ), 'horaires' => __( 'Lun-Ven 8h30-12h / 13h30-17h', 'lavaur' ), 'tel' => '05 63 58 35 01' ),
	array( 'nom' => __( 'Urbanisme', 'lavaur' ), 'horaires' => __( 'Lun-Ven 9h-12h', 'lavaur' ), 'tel' => '05 63 58 35 02' ),
	array( 'nom' => __( 'Affaires scolaires & cantine', 'lavaur' ), 'horaires' => __( 'Lun-Ven 8h30-17h', 'lavaur' ), 'tel' => '05 63 58 35 03' ),
	array( 'nom' => __( 'Culture', 'lavaur' ), 'horaires' => __( 'Mar-Sam 10h-18h', 'lavaur' ), 'tel' => '05 63 58 35 04' ),
	array( 'nom' => __( 'Sport & vie associative', 'lavaur' ), 'horaires' => __( 'Lun-Ven 9h-12h / 14h-17h', 'lavaur' ), 'tel' => '05 63 58 35 05' ),
	array( 'nom' => __( 'Environnement & dechets', 'lavaur' ), 'horaires' => __( 'Lun-Ven 9h-12h', 'lavaur' ), 'tel' => '05 63 58 35 06' ),
);
?>

<section class="bg-institution-900 text-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
		<?php lavaur_breadcrumb(); ?>
		<h1 class="text-4xl font-bold"><?php the_title(); ?></h1>
		<p class="mt-3 max-w-2xl text-institution-100"><?php esc_html_e( 'Tous les services municipaux, leurs horaires et leurs contacts.', 'lavaur' ); ?></p>
	</div>
</section>

<section id="tous-les-services" class="scroll-mt-24 reveal reveal-visible">
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
		<h2 id="horaires-contacts" class="section-title mb-6"><?php esc_html_e( 'Tous les services', 'lavaur' ); ?></h2>
		<div class="grid gap-4 sm:grid-cols-2">
			<?php foreach ( $services as $service ) : ?>
				<div class="card p-5">
					<h3 class="font-semibold text-institution-900 mb-1"><?php echo esc_html( $service['nom'] ); ?></h3>
					<p class="text-sm text-institution-600"><?php echo esc_html( $service['horaires'] ); ?></p>
					<p class="text-sm text-institution-700 mt-1"><a class="hover:underline" href="tel:<?php echo esc_attr( str_replace( ' ', '', $service['tel'] ) ); ?>"><?php echo esc_html( $service['tel'] ); ?></a></p>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section id="rendez-vous" class="scroll-mt-24 bg-surface-light reveal reveal-visible">
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
		<h2 class="section-title mb-4"><?php esc_html_e( 'Prise de rendez-vous', 'lavaur' ); ?></h2>
		<p class="text-institution-600 mb-6"><?php esc_html_e( 'Prenez rendez-vous en ligne avec le service de votre choix, ou contactez-le directement par telephone.', 'lavaur' ); ?></p>
		<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn-primary"><?php esc_html_e( 'Demander un rendez-vous', 'lavaur' ); ?></a>
	</div>
</section>

<?php if ( get_the_content() ) : ?>
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 prose prose-institution max-w-none"><?php the_content(); ?></div>
<?php endif; ?>

<?php get_footer(); ?>
