<?php
/**
 * Reusable Google Maps embed. Uses the key-less `output=embed` iframe so it
 * works before a Google Maps API key is configured; swap for the JS API
 * (Places/Markers) once services/parkings/monuments data is available.
 *
 * @param array $args { 'height' => string px, 'query' => string search query }
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$height = isset( $args['height'] ) ? $args['height'] : '420';
$query  = isset( $args['query'] ) ? $args['query'] : 'Mairie de Lavaur, Place du Plô, 81500 Lavaur';
?>
<div class="rounded-xl overflow-hidden shadow-sm ring-1 ring-institution-100">
	<iframe
		src="https://www.google.com/maps?q=<?php echo rawurlencode( $query ); ?>&output=embed"
		width="100%"
		height="<?php echo esc_attr( $height ); ?>"
		style="border:0"
		loading="lazy"
		referrerpolicy="no-referrer-when-downgrade"
		title="<?php esc_attr_e( 'Carte interactive - Ville de Lavaur', 'lavaur' ); ?>"
	></iframe>
</div>
