<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<form role="search" method="get" class="flex gap-2" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label for="searchform-input" class="sr-only"><?php esc_html_e( 'Rechercher', 'lavaur' ); ?></label>
	<input type="search" id="searchform-input" name="s" value="<?php echo esc_attr( get_search_query() ); ?>" placeholder="<?php esc_attr_e( 'Rechercher...', 'lavaur' ); ?>" class="min-w-0 flex-1 rounded-full border border-institution-200 px-4 py-2 text-sm">
	<button type="submit" class="btn-secondary"><?php esc_html_e( 'Rechercher', 'lavaur' ); ?></button>
</form>
