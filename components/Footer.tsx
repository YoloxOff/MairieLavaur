import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

const reseaux: Record<string, string> = {
	Facebook: "https://www.facebook.com/",
	Instagram: "https://www.instagram.com/",
	YouTube: "https://www.youtube.com/",
	LinkedIn: "https://www.linkedin.com/",
};

export default function Footer() {
	return (
		<footer className="bg-institution-900 text-institution-100 mt-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-4">
				<div>
					<p className="text-white font-bold text-lg mb-3">Ville de Lavaur</p>
					<address className="not-italic text-sm text-institution-200 leading-relaxed">
						Place du Plô
						<br />
						81500 Lavaur
						<br />
						<a href="tel:+33563583500" className="hover:text-white">
							05 63 58 35 00
						</a>
						<br />
						<a href="mailto:contact@mairie-lavaur.fr" className="hover:text-white">
							contact@mairie-lavaur.fr
						</a>
					</address>
				</div>

				<nav aria-label="Liens utiles">
					<h3 className="text-sm font-semibold uppercase tracking-wide text-institution-300 mb-3">Liens utiles</h3>
					<ul className="space-y-2 text-sm">
						<li>
							<Link className="hover:text-white" href="/demarches">
								Demarches en ligne
							</Link>
						</li>
						<li>
							<Link className="hover:text-white" href="/vie-municipale#recrutement">
								Offres d&apos;emploi
							</Link>
						</li>
						<li>
							<Link className="hover:text-white" href="/vie-municipale#marches-publics">
								Marches publics
							</Link>
						</li>
						<li>
							<Link className="hover:text-white" href="/contact">
								Contact &amp; FAQ
							</Link>
						</li>
					</ul>
				</nav>

				<div>
					<h3 className="text-sm font-semibold uppercase tracking-wide text-institution-300 mb-3">Suivez-nous</h3>
					<ul className="flex items-center gap-3">
						{Object.entries(reseaux).map(([label, href]) => (
							<li key={label}>
								<a
									className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
									rel="noopener noreferrer"
									target="_blank"
									href={href}
									aria-label={label}
								>
									<span className="text-xs font-semibold">{label.charAt(0)}</span>
								</a>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h3 className="text-sm font-semibold uppercase tracking-wide text-institution-300 mb-3">Newsletter</h3>
					<p className="text-sm text-institution-200 mb-3">Recevez l&apos;actualite de la ville chaque mois.</p>
					<NewsletterForm />
				</div>
			</div>

			<div className="border-t border-white/10">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-institution-300">
					<p>&copy; {new Date().getFullYear()} Ville de Lavaur. Tous droits reserves.</p>
					<ul className="flex flex-wrap gap-x-4 gap-y-1">
						<li>
							<Link className="hover:text-white" href="/mentions-legales">
								Mentions legales
							</Link>
						</li>
						<li>
							<Link className="hover:text-white" href="/politique-de-confidentialite">
								Politique de confidentialite
							</Link>
						</li>
						<li>
							<Link className="hover:text-white" href="/plan-du-site">
								Plan du site
							</Link>
						</li>
						<li>
							<Link className="hover:text-white" href="/accessibilite">
								Accessibilite : partiellement conforme
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}
