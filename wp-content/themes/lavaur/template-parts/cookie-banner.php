<?php
/**
 * RGPD cookie consent banner. Consent choice stored in localStorage only
 * (no cookie is set until the visitor accepts) and gates any future
 * Analytics/Matomo/Maps loading via the `lavaur:consent` event.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div
	x-data="{
		visible: false,
		init() {
			this.visible = ! localStorage.getItem( 'lavaur_cookie_consent' );
		},
		choose( value ) {
			localStorage.setItem( 'lavaur_cookie_consent', value );
			this.visible = false;
			window.dispatchEvent( new CustomEvent( 'lavaur:consent', { detail: value } ) );
		}
	}"
	x-show="visible"
	x-cloak
	x-transition
	role="dialog"
	aria-modal="false"
	aria-labelledby="cookie-banner-title"
	class="fixed inset-x-0 bottom-0 z-[100] border-t border-institution-100 bg-white/95 backdrop-blur px-4 py-4 sm:px-6"
>
	<div class="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
		<p id="cookie-banner-title" class="text-sm text-institution-700">
			<?php
			printf(
				/* translators: %s: link to the privacy policy page */
				esc_html__( 'Ce site utilise des cookies de mesure d\'audience. Vous pouvez accepter ou refuser leur depot. En savoir plus dans notre %s.', 'lavaur' ),
				'<a class="underline hover:text-institution-900" href="' . esc_url( home_url( '/politique-de-confidentialite/' ) ) . '">' . esc_html__( 'politique de confidentialite', 'lavaur' ) . '</a>'
			);
			?>
		</p>
		<div class="flex shrink-0 items-center gap-2">
			<button type="button" @click="choose('refused')" class="btn-secondary !py-2"><?php esc_html_e( 'Refuser', 'lavaur' ); ?></button>
			<button type="button" @click="choose('accepted')" class="btn-primary !py-2"><?php esc_html_e( 'Accepter', 'lavaur' ); ?></button>
		</div>
	</div>
</div>
