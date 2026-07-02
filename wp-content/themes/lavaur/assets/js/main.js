// Vanilla JS helpers that don't need Alpine. Not built by a bundler - edit directly.
(function () {
	'use strict';

	// Lightweight "apparition des blocs au scroll" per cahier des charges section 3.
	var reveals = document.querySelectorAll( '.reveal' );
	if ( 'IntersectionObserver' in window && reveals.length ) {
		var observer = new IntersectionObserver(
			function ( entries ) {
				entries.forEach( function ( entry ) {
					if ( entry.isIntersecting ) {
						entry.target.classList.add( 'reveal-visible' );
						observer.unobserve( entry.target );
					}
				} );
			},
			{ threshold: 0.15 }
		);
		reveals.forEach( function ( el ) {
			observer.observe( el );
		} );
	} else {
		reveals.forEach( function ( el ) {
			el.classList.add( 'reveal-visible' );
		} );
	}
} )();
