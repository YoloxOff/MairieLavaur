import Link from "next/link";
import Reveal from "@/components/Reveal";
import Map from "@/components/Map";
import NewsletterForm from "@/components/NewsletterForm";
import { actualites } from "@/lib/content/actualites";
import { getUpcomingEvenements } from "@/lib/content/evenements";

const accesRapides = [
	{ label: "Etat civil", href: "/demarches", icon: "📄" },
	{ label: "Urbanisme", href: "/demarches?categorie=urbanisme", icon: "🏗" },
	{ label: "Ecoles & cantine", href: "/vivre-a-lavaur#education", icon: "🏫" },
	{ label: "Signaler un probleme", href: "/demarches?categorie=signalement", icon: "🚧" },
	{ label: "Prendre rendez-vous", href: "/services-municipaux#rendez-vous", icon: "📅" },
	{ label: "Marche & dechets", href: "/vivre-a-lavaur#commerces", icon: "♻️" },
];

const chiffresCles = [
	{ valeur: "11 000+", label: "Habitants" },
	{ valeur: "150+", label: "Associations" },
	{ valeur: "10", label: "Groupes scolaires" },
	{ valeur: "800", label: "Ans d'histoire" },
];

function formatEventDate(dateDebut: string, dateFin?: string) {
	const debut = new Date(dateDebut);
	const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" };
	let out = debut.toLocaleDateString("fr-FR", opts);
	if (dateFin) {
		const fin = new Date(dateFin);
		if (fin.toDateString() !== debut.toDateString()) {
			out += ` → ${fin.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`;
		}
	}
	return out;
}

const newsletterMessages: Record<string, string> = {
	confirmed: "Votre inscription a la newsletter est confirmee, bienvenue !",
	expired: "Ce lien de confirmation a expire, merci de vous reinscrire.",
	invalid: "Ce lien de confirmation n'est pas valide.",
};

export default async function HomePage({ searchParams }: { searchParams: Promise<{ newsletter?: string }> }) {
	const { newsletter } = await searchParams;
	const latestActus = actualites.slice(0, 3);
	const upcomingEvents = getUpcomingEvenements().slice(0, 3);

	return (
		<>
			{newsletter && newsletterMessages[newsletter] && (
				<div className="bg-institution-50 text-institution-800 text-sm text-center py-2 px-4">{newsletterMessages[newsletter]}</div>
			)}

			{/* Hero dynamique */}
			<section className="relative overflow-hidden bg-institution-900 text-white">
				<div className="absolute inset-0 bg-gradient-to-br from-institution-800 via-institution-900 to-institution-700" />
				<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
					<p className="text-occitan-gold font-semibold tracking-wide uppercase text-sm mb-3">Ville de Lavaur</p>
					<h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-2xl">Une ville qui vous ressemble, au coeur du Tarn</h1>
					<p className="mt-4 max-w-xl text-institution-100">
						Actualites, demarches en ligne et vie municipale : retrouvez tous les services de votre ville en quelques clics.
					</p>

					<form role="search" action="/actualites" method="get" className="mt-8 flex max-w-xl gap-2">
						<label htmlFor="hero-search" className="sr-only">
							Rechercher sur le site
						</label>
						<input
							id="hero-search"
							type="search"
							name="recherche"
							placeholder="Rechercher une demarche, une actualite..."
							className="min-w-0 flex-1 rounded-full border-0 px-5 py-3 text-institution-900 placeholder:text-institution-400"
						/>
						<button type="submit" className="btn-primary !bg-occitan-gold !text-institution-900 hover:!brightness-95">
							Rechercher
						</button>
					</form>
				</div>
			</section>

			{/* Acces rapides */}
			<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 relative z-10" aria-labelledby="acces-rapides-title">
				<h2 id="acces-rapides-title" className="sr-only">
					Acces rapides
				</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
					{accesRapides.map((item) => (
						<Link key={item.href} href={item.href} className="card flex flex-col items-center gap-2 px-3 py-5 text-center">
							<span className="text-2xl" aria-hidden="true">
								{item.icon}
							</span>
							<span className="text-sm font-medium text-institution-800">{item.label}</span>
						</Link>
					))}
				</div>
			</section>

			{/* Actualites */}
			<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="actualites-title">
				<Reveal>
					<div className="flex items-end justify-between mb-8">
						<h2 id="actualites-title" className="section-title">
							Actualites
						</h2>
						<Link className="text-sm font-medium text-institution-700 hover:text-institution-900" href="/actualites">
							Toutes les actualites →
						</Link>
					</div>

					<div className="grid gap-6 md:grid-cols-3">
						{latestActus.map((actu) => (
							<article key={actu.slug} className="card">
								<Link href={`/actualites/${actu.slug}`} className="block">
									<div className="w-full h-44 bg-institution-100" aria-hidden="true" />
									<div className="p-5">
										<p className="text-xs font-semibold uppercase tracking-wide text-occitan-terracotta mb-2">{actu.category}</p>
										<h3 className="font-semibold text-institution-900 mb-2">{actu.title}</h3>
										<p className="text-sm text-institution-600">{actu.excerpt}</p>
									</div>
								</Link>
							</article>
						))}
					</div>
				</Reveal>
			</section>

			{/* Agenda */}
			<section className="bg-surface-light py-16" aria-labelledby="agenda-title">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<Reveal>
						<div className="flex items-end justify-between mb-8">
							<h2 id="agenda-title" className="section-title">
								Agenda
							</h2>
							<Link className="text-sm font-medium text-institution-700 hover:text-institution-900" href="/agenda">
								Voir tout l&apos;agenda →
							</Link>
						</div>

						{upcomingEvents.length > 0 ? (
							<div className="grid gap-6 md:grid-cols-3">
								{upcomingEvents.map((ev) => (
									<article key={ev.slug} className="card p-5">
										<p className="text-xs font-semibold uppercase tracking-wide text-institution-500 mb-2">
											{formatEventDate(ev.dateDebut, ev.dateFin)}
										</p>
										<h3 className="font-semibold text-institution-900 mb-2">
											<Link href={`/agenda/${ev.slug}`} className="hover:underline">
												{ev.title}
											</Link>
										</h3>
										<p className="text-sm text-institution-600">{ev.lieu}</p>
									</article>
								))}
							</div>
						) : (
							<p className="text-institution-600">Aucun evenement a venir pour le moment.</p>
						)}
					</Reveal>
				</div>
			</section>

			{/* Chiffres cles */}
			<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="chiffres-title">
				<Reveal>
					<h2 id="chiffres-title" className="section-title mb-8">
						Lavaur en chiffres
					</h2>
					<dl className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
						{chiffresCles.map((c) => (
							<div key={c.label}>
								<dt className="sr-only">{c.label}</dt>
								<dd className="text-3xl font-bold text-institution-800">{c.valeur}</dd>
								<p className="mt-1 text-sm text-institution-600">{c.label}</p>
							</div>
						))}
					</dl>
				</Reveal>
			</section>

			{/* Carte interactive */}
			<section className="bg-surface-light py-16" aria-labelledby="carte-title">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<Reveal>
						<h2 id="carte-title" className="section-title mb-8">
							Carte interactive
						</h2>
						<Map />
					</Reveal>
				</div>
			</section>

			{/* Newsletter */}
			<section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-center" aria-labelledby="newsletter-title">
				<Reveal>
					<h2 id="newsletter-title" className="section-title">
						Restez informe
					</h2>
					<p className="mt-3 text-institution-600">Inscrivez-vous a la newsletter municipale pour ne rien manquer.</p>
					<div className="mt-6 max-w-md mx-auto text-left">
						<NewsletterForm dark={false} />
					</div>
				</Reveal>
			</section>
		</>
	);
}
