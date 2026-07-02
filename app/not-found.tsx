import Link from "next/link";

export default function NotFound() {
	return (
		<section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 text-center">
			<p className="text-6xl font-bold text-institution-200 mb-4">404</p>
			<h1 className="section-title mb-4">Page introuvable</h1>
			<p className="text-institution-600 mb-8">La page que vous recherchez n&apos;existe pas ou plus.</p>
			<div className="flex items-center justify-center gap-3">
				<Link href="/" className="btn-primary">
					Retour a l&apos;accueil
				</Link>
				<Link href="/contact" className="btn-secondary">
					Nous contacter
				</Link>
			</div>
		</section>
	);
}
