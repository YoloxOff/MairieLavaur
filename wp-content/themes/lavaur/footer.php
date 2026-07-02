	</main>

	<footer class="bg-institution-900 text-institution-100 mt-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-4">
			<div>
				<p class="text-white font-bold text-lg mb-3"><?php bloginfo( 'name' ); ?></p>
				<address class="not-italic text-sm text-institution-200 leading-relaxed">
					Place du Plô<br>
					81500 Lavaur<br>
					<a href="tel:+33563583500" class="hover:text-white">05 63 58 35 00</a><br>
					<a href="mailto:contact@mairie-lavaur.fr" class="hover:text-white">contact@mairie-lavaur.fr</a>
				</address>
			</div>

			<nav aria-label="<?php esc_attr_e( 'Liens utiles', 'lavaur' ); ?>">
				<h3 class="text-sm font-semibold uppercase tracking-wide text-institution-300 mb-3"><?php esc_html_e( 'Liens utiles', 'lavaur' ); ?></h3>
				<ul class="space-y-2 text-sm">
					<li><a class="hover:text-white" href="<?php echo esc_url( home_url( '/demarches/' ) ); ?>"><?php esc_html_e( 'Demarches en ligne', 'lavaur' ); ?></a></li>
					<li><a class="hover:text-white" href="<?php echo esc_url( home_url( '/vie-municipale/#recrutement' ) ); ?>"><?php esc_html_e( 'Offres d\'emploi', 'lavaur' ); ?></a></li>
					<li><a class="hover:text-white" href="<?php echo esc_url( home_url( '/vie-municipale/#marches-publics' ) ); ?>"><?php esc_html_e( 'Marches publics', 'lavaur' ); ?></a></li>
					<li><a class="hover:text-white" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Contact & FAQ', 'lavaur' ); ?></a></li>
				</ul>
			</nav>

			<div>
				<h3 class="text-sm font-semibold uppercase tracking-wide text-institution-300 mb-3"><?php esc_html_e( 'Suivez-nous', 'lavaur' ); ?></h3>
				<ul class="flex items-center gap-3">
					<?php
					$networks = array(
						'Facebook'  => 'https://www.facebook.com/',
						'Instagram' => 'https://www.instagram.com/',
						'YouTube'   => 'https://www.youtube.com/',
						'LinkedIn'  => 'https://www.linkedin.com/',
					);
					foreach ( $networks as $label => $href ) :
						?>
						<li>
							<a class="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" rel="noopener noreferrer" target="_blank" href="<?php echo esc_url( $href ); ?>" aria-label="<?php echo esc_attr( $label ); ?>">
								<span class="text-xs font-semibold"><?php echo esc_html( mb_substr( $label, 0, 1 ) ); ?></span>
							</a>
						</li>
					<?php endforeach; ?>
				</ul>
			</div>

			<div>
				<h3 class="text-sm font-semibold uppercase tracking-wide text-institution-300 mb-3"><?php esc_html_e( 'Newsletter', 'lavaur' ); ?></h3>
				<p class="text-sm text-institution-200 mb-3"><?php esc_html_e( 'Recevez l\'actualite de la ville chaque mois.', 'lavaur' ); ?></p>
				<?php get_template_part( 'template-parts/newsletter-form' ); ?>
			</div>
		</div>

		<div class="border-t border-white/10">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-institution-300">
				<p>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. <?php esc_html_e( 'Tous droits reserves.', 'lavaur' ); ?></p>
				<ul class="flex flex-wrap gap-x-4 gap-y-1">
					<li><a class="hover:text-white" href="<?php echo esc_url( home_url( '/mentions-legales/' ) ); ?>"><?php esc_html_e( 'Mentions legales', 'lavaur' ); ?></a></li>
					<li><a class="hover:text-white" href="<?php echo esc_url( home_url( '/politique-de-confidentialite/' ) ); ?>"><?php esc_html_e( 'Politique de confidentialite', 'lavaur' ); ?></a></li>
					<li><a class="hover:text-white" href="<?php echo esc_url( home_url( '/plan-du-site/' ) ); ?>"><?php esc_html_e( 'Plan du site', 'lavaur' ); ?></a></li>
					<li><a class="hover:text-white" href="<?php echo esc_url( home_url( '/accessibilite/' ) ); ?>"><?php esc_html_e( 'Accessibilite : partiellement conforme', 'lavaur' ); ?></a></li>
				</ul>
			</div>
		</div>
	</footer>

<?php wp_footer(); ?>
</body>
</html>
