<?php
/**
 * Lavaur theme bootstrap.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'LAVAUR_VERSION', '0.1.0' );
define( 'LAVAUR_DIR', get_template_directory() );
define( 'LAVAUR_URI', get_template_directory_uri() );

require LAVAUR_DIR . '/inc/setup.php';
require LAVAUR_DIR . '/inc/enqueue.php';
require LAVAUR_DIR . '/inc/nav.php';
require LAVAUR_DIR . '/inc/pages.php';
require LAVAUR_DIR . '/inc/cpt-actualites.php';
require LAVAUR_DIR . '/inc/cpt-evenements.php';
require LAVAUR_DIR . '/inc/cpt-demarches.php';
require LAVAUR_DIR . '/inc/seo.php';
require LAVAUR_DIR . '/inc/rgpd.php';
require LAVAUR_DIR . '/inc/newsletter.php';
require LAVAUR_DIR . '/inc/contact.php';
require LAVAUR_DIR . '/inc/template-tags.php';
