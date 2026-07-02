<?php
/**
 * Contact - formulaire, plan, numeros utiles, urgences, FAQ
 * (cahier des charges section "Contact").
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$contact_status = isset( $_GET['contact'] ) ? sanitize_key( wp_unslash( $_GET['contact'] ) ) : '';

$faq = array(
	array(
		'q' => __( 'Comment obtenir un acte d\'etat civil ?', 'lavaur' ),
		'a' => __( 'Rendez-vous dans la rubrique Demarches pour effectuer une demande en ligne ou telecharger le formulaire correspondant.', 'lavaur' ),
	),
	array(
		'q' => __( 'Comment signaler un probleme sur la voie publique ?', 'lavaur' ),
		'a' => __( 'Utilisez le formulaire de signalement disponible dans la rubrique Demarches, ou contactez directement les services techniques.', 'lavaur' ),
	),
	array(
		'q' => __( 'Quels sont les horaires d\'ouverture de la mairie ?', 'lavaur' ),
		'a' => __( 'La mairie est ouverte du lundi au vendredi de 8h30 a 12h et de 13h30 a 17h.', 'lavaur' ),
	),
);
?>

<section class="bg-institution-900 text-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
		<?php lavaur_breadcrumb(); ?>
		<h1 class="text-4xl font-bold"><?php the_title(); ?></h1>
		<p class="mt-3 max-w-2xl text-institution-100"><?php esc_html_e( 'Une question, une demarche ? Contactez la mairie de Lavaur.', 'lavaur' ); ?></p>
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid gap-10 lg:grid-cols-2 reveal reveal-visible">
	<div>
		<h2 class="section-title mb-6"><?php esc_html_e( 'Formulaire de contact', 'lavaur' ); ?></h2>

		<?php if ( 'sent' === $contact_status ) : ?>
			<p role="status" class="mb-6 rounded-lg bg-institution-50 text-institution-800 px-4 py-3 text-sm"><?php esc_html_e( 'Votre message a bien ete envoye. Merci, nous reviendrons vers vous rapidement.', 'lavaur' ); ?></p>
		<?php elseif ( 'error' === $contact_status ) : ?>
			<p role="alert" class="mb-6 rounded-lg bg-occitan-terracotta/10 text-occitan-terracotta px-4 py-3 text-sm"><?php esc_html_e( 'Merci de renseigner tous les champs obligatoires.', 'lavaur' ); ?></p>
		<?php endif; ?>

		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" class="space-y-4">
			<div class="grid gap-4 sm:grid-cols-2">
				<div>
					<label for="contact-nom" class="block text-sm font-medium text-institution-800 mb-1"><?php esc_html_e( 'Nom', 'lavaur' ); ?> *</label>
					<input type="text" id="contact-nom" name="nom" required class="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm">
				</div>
				<div>
					<label for="contact-email" class="block text-sm font-medium text-institution-800 mb-1"><?php esc_html_e( 'Email', 'lavaur' ); ?> *</label>
					<input type="email" id="contact-email" name="email" required class="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm">
				</div>
			</div>
			<div>
				<label for="contact-sujet" class="block text-sm font-medium text-institution-800 mb-1"><?php esc_html_e( 'Sujet', 'lavaur' ); ?></label>
				<input type="text" id="contact-sujet" name="sujet" class="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm">
			</div>
			<div>
				<label for="contact-message" class="block text-sm font-medium text-institution-800 mb-1"><?php esc_html_e( 'Message', 'lavaur' ); ?> *</label>
				<textarea id="contact-message" name="message" rows="5" required class="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm"></textarea>
			</div>
			<p class="text-xs text-institution-500">
				<?php
				printf(
					esc_html__( 'Les informations recueillies sont necessaires au traitement de votre demande. Voir notre %s.', 'lavaur' ),
					'<a class="underline" href="' . esc_url( home_url( '/politique-de-confidentialite/' ) ) . '">' . esc_html__( 'politique de confidentialite', 'lavaur' ) . '</a>'
				);
				?>
			</p>
			<input type="hidden" name="action" value="lavaur_contact_form">
			<?php wp_nonce_field( 'lavaur_contact_form', 'lavaur_contact_nonce' ); ?>
			<button type="submit" class="btn-primary"><?php esc_html_e( 'Envoyer', 'lavaur' ); ?></button>
		</form>
	</div>

	<div>
		<h2 class="section-title mb-6"><?php esc_html_e( 'Plan d\'acces', 'lavaur' ); ?></h2>
		<?php get_template_part( 'template-parts/map', null, array( 'height' => '280' ) ); ?>

		<div id="urgences" class="scroll-mt-24 mt-8">
			<h3 class="text-lg font-semibold text-institution-900 mb-3"><?php esc_html_e( 'Numeros utiles & urgences', 'lavaur' ); ?></h3>
			<ul class="space-y-2 text-sm">
				<li class="flex justify-between"><span><?php esc_html_e( 'Mairie', 'lavaur' ); ?></span><a class="font-medium hover:underline" href="tel:+33563583500">05 63 58 35 00</a></li>
				<li class="flex justify-between"><span><?php esc_html_e( 'Police municipale', 'lavaur' ); ?></span><a class="font-medium hover:underline" href="tel:+33563583510">05 63 58 35 10</a></li>
				<li class="flex justify-between"><span><?php esc_html_e( 'Urgences (SAMU / Police / Pompiers)', 'lavaur' ); ?></span><a class="font-medium hover:underline" href="tel:112">112</a></li>
			</ul>
		</div>
	</div>
</section>

<section class="bg-surface-light reveal reveal-visible">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14">
		<h2 class="section-title mb-6"><?php esc_html_e( 'Questions frequentes', 'lavaur' ); ?></h2>
		<div class="space-y-3">
			<?php foreach ( $faq as $item ) : ?>
				<details class="card p-4 group">
					<summary class="cursor-pointer list-none flex items-center justify-between font-medium text-institution-800">
						<?php echo esc_html( $item['q'] ); ?>
						<svg class="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
					</summary>
					<p class="mt-3 text-sm text-institution-600"><?php echo esc_html( $item['a'] ); ?></p>
				</details>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php if ( get_the_content() ) : ?>
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 prose prose-institution max-w-none"><?php the_content(); ?></div>
<?php endif; ?>

<?php get_footer(); ?>
