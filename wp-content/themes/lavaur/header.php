<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="theme-color" content="#1f3f70">
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'font-sans text-institution-900' ); ?>>
<?php wp_body_open(); ?>

<a class="skip-link" href="#main-content"><?php esc_html_e( 'Aller au contenu principal', 'lavaur' ); ?></a>

<div class="bg-institution-900 text-institution-100 text-sm">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-end gap-4 py-1.5">
		<a href="<?php echo esc_url( home_url( '/contact/#urgences' ) ); ?>" class="hover:text-white flex items-center gap-1">
			<span aria-hidden="true">☎</span> <?php esc_html_e( 'Numeros utiles', 'lavaur' ); ?>
		</a>
		<a href="<?php echo esc_url( home_url( '/services-municipaux/' ) ); ?>" class="hover:text-white"><?php esc_html_e( 'Prendre rendez-vous', 'lavaur' ); ?></a>
	</div>
</div>

<header class="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm" x-data="{ open: false }">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-20">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="flex items-center gap-3 shrink-0">
				<?php if ( has_custom_logo() ) : ?>
					<?php the_custom_logo(); ?>
				<?php else : ?>
					<span class="text-xl font-bold text-institution-800"><?php bloginfo( 'name' ); ?></span>
				<?php endif; ?>
			</a>

			<nav aria-label="<?php esc_attr_e( 'Menu principal', 'lavaur' ); ?>" class="hidden lg:block">
				<?php lavaur_primary_nav(); ?>
			</nav>

			<div class="flex items-center gap-2">
				<a href="<?php echo esc_url( home_url( '/?s=' ) ); ?>" class="p-2 rounded-full hover:bg-institution-50" aria-label="<?php esc_attr_e( 'Recherche', 'lavaur' ); ?>">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
				</a>
				<button
					type="button"
					class="lg:hidden p-2 rounded-full hover:bg-institution-50"
					@click="open = !open"
					:aria-expanded="open.toString()"
					aria-controls="mobile-menu"
					aria-label="<?php esc_attr_e( 'Ouvrir le menu', 'lavaur' ); ?>"
				>
					<svg x-cloak x-show="!open" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
					<svg x-cloak x-show="open" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
				</button>
			</div>
		</div>
	</div>

	<nav
		id="mobile-menu"
		x-cloak
		x-show="open"
		x-transition
		@keyup.escape.window="open = false"
		aria-label="<?php esc_attr_e( 'Menu principal (mobile)', 'lavaur' ); ?>"
		class="lg:hidden border-t border-institution-100 bg-white"
	>
		<?php lavaur_primary_nav( true ); ?>
	</nav>
</header>

<main id="main-content">
