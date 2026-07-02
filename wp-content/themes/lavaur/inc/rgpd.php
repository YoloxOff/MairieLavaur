<?php
/**
 * RGPD cookie consent banner. Vanilla Alpine.js, no third-party CMP dependency.
 * See template-parts/cookie-banner.php for markup.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function lavaur_render_cookie_banner() {
	get_template_part( 'template-parts/cookie-banner' );
}
add_action( 'wp_footer', 'lavaur_render_cookie_banner', 20 );
