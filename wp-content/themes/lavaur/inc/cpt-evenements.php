<?php
/**
 * Evenements: agenda entries with date range, lieu and inscription meta
 * (cahier des charges section "Agenda" - vue calendrier/liste, filtres, inscription).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function lavaur_register_evenements() {
	register_post_type( 'evenement', array(
		'labels' => array(
			'name'          => __( 'Evenements', 'lavaur' ),
			'singular_name' => __( 'Evenement', 'lavaur' ),
			'add_new_item'  => __( 'Ajouter un evenement', 'lavaur' ),
			'edit_item'     => __( 'Modifier l\'evenement', 'lavaur' ),
			'all_items'     => __( 'Agenda', 'lavaur' ),
		),
		'public'       => true,
		'has_archive'  => true,
		'rewrite'      => array( 'slug' => 'agenda' ),
		'menu_icon'    => 'dashicons-calendar-alt',
		'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt', 'revisions', 'custom-fields' ),
		'show_in_rest' => true,
		'taxonomies'   => array( 'categorie_agenda' ),
	) );

	register_taxonomy( 'categorie_agenda', 'evenement', array(
		'labels' => array(
			'name'          => __( 'Categories d\'agenda', 'lavaur' ),
			'singular_name' => __( 'Categorie', 'lavaur' ),
		),
		'public'       => true,
		'hierarchical' => true,
		'rewrite'      => array( 'slug' => 'agenda/categorie' ),
		'show_in_rest' => true,
	) );

	register_post_meta( 'evenement', 'date_debut', array(
		'type'          => 'string',
		'single'        => true,
		'show_in_rest'  => true,
		'auth_callback' => function () { return current_user_can( 'edit_posts' ); },
	) );
	register_post_meta( 'evenement', 'date_fin', array(
		'type'          => 'string',
		'single'        => true,
		'show_in_rest'  => true,
		'auth_callback' => function () { return current_user_can( 'edit_posts' ); },
	) );
	register_post_meta( 'evenement', 'lieu', array(
		'type'          => 'string',
		'single'        => true,
		'show_in_rest'  => true,
		'auth_callback' => function () { return current_user_can( 'edit_posts' ); },
	) );
	register_post_meta( 'evenement', 'inscription_requise', array(
		'type'          => 'boolean',
		'single'        => true,
		'show_in_rest'  => true,
		'auth_callback' => function () { return current_user_can( 'edit_posts' ); },
	) );
	register_post_meta( 'evenement', 'inscription_url', array(
		'type'          => 'string',
		'single'        => true,
		'show_in_rest'  => true,
		'auth_callback' => function () { return current_user_can( 'edit_posts' ); },
	) );
}
add_action( 'init', 'lavaur_register_evenements' );

function lavaur_seed_agenda_categories() {
	$defaults = array( 'Culture', 'Sport', 'Jeunesse', 'Associations', 'Commemorations' );
	foreach ( $defaults as $term ) {
		if ( ! term_exists( $term, 'categorie_agenda' ) ) {
			wp_insert_term( $term, 'categorie_agenda' );
		}
	}
}
add_action( 'after_switch_theme', 'lavaur_seed_agenda_categories' );

/**
 * Meta box so editors can fill date/lieu/inscription without relying on a
 * page-builder plugin. Kept intentionally simple (no ACF dependency).
 */
function lavaur_evenement_meta_box() {
	add_meta_box( 'lavaur_evenement_details', __( 'Details de l\'evenement', 'lavaur' ), 'lavaur_render_evenement_meta_box', 'evenement', 'normal', 'high' );
}
add_action( 'add_meta_boxes', 'lavaur_evenement_meta_box' );

function lavaur_render_evenement_meta_box( $post ) {
	wp_nonce_field( 'lavaur_save_evenement', 'lavaur_evenement_nonce' );
	$date_debut = get_post_meta( $post->ID, 'date_debut', true );
	$date_fin   = get_post_meta( $post->ID, 'date_fin', true );
	$lieu       = get_post_meta( $post->ID, 'lieu', true );
	$inscription = get_post_meta( $post->ID, 'inscription_requise', true );
	$inscription_url = get_post_meta( $post->ID, 'inscription_url', true );
	?>
	<p>
		<label for="lavaur_date_debut"><?php esc_html_e( 'Date et heure de debut', 'lavaur' ); ?></label><br>
		<input type="datetime-local" id="lavaur_date_debut" name="lavaur_date_debut" value="<?php echo esc_attr( $date_debut ); ?>">
	</p>
	<p>
		<label for="lavaur_date_fin"><?php esc_html_e( 'Date et heure de fin', 'lavaur' ); ?></label><br>
		<input type="datetime-local" id="lavaur_date_fin" name="lavaur_date_fin" value="<?php echo esc_attr( $date_fin ); ?>">
	</p>
	<p>
		<label for="lavaur_lieu"><?php esc_html_e( 'Lieu', 'lavaur' ); ?></label><br>
		<input type="text" id="lavaur_lieu" name="lavaur_lieu" class="widefat" value="<?php echo esc_attr( $lieu ); ?>">
	</p>
	<p>
		<label><input type="checkbox" name="lavaur_inscription_requise" value="1" <?php checked( $inscription, '1' ); ?>> <?php esc_html_e( 'Inscription requise', 'lavaur' ); ?></label>
	</p>
	<p>
		<label for="lavaur_inscription_url"><?php esc_html_e( 'Lien d\'inscription', 'lavaur' ); ?></label><br>
		<input type="url" id="lavaur_inscription_url" name="lavaur_inscription_url" class="widefat" value="<?php echo esc_attr( $inscription_url ); ?>">
	</p>
	<?php
}

function lavaur_save_evenement_meta( $post_id ) {
	if ( ! isset( $_POST['lavaur_evenement_nonce'] ) || ! wp_verify_nonce( $_POST['lavaur_evenement_nonce'], 'lavaur_save_evenement' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	if ( isset( $_POST['lavaur_date_debut'] ) ) {
		update_post_meta( $post_id, 'date_debut', sanitize_text_field( $_POST['lavaur_date_debut'] ) );
	}
	if ( isset( $_POST['lavaur_date_fin'] ) ) {
		update_post_meta( $post_id, 'date_fin', sanitize_text_field( $_POST['lavaur_date_fin'] ) );
	}
	if ( isset( $_POST['lavaur_lieu'] ) ) {
		update_post_meta( $post_id, 'lieu', sanitize_text_field( $_POST['lavaur_lieu'] ) );
	}
	update_post_meta( $post_id, 'inscription_requise', isset( $_POST['lavaur_inscription_requise'] ) ? '1' : '' );
	if ( isset( $_POST['lavaur_inscription_url'] ) ) {
		update_post_meta( $post_id, 'inscription_url', esc_url_raw( $_POST['lavaur_inscription_url'] ) );
	}
}
add_action( 'save_post_evenement', 'lavaur_save_evenement_meta' );
