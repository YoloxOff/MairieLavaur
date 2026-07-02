import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { PageHero } from "@/components/SectionBlock";
import Map from "@/components/Map";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { numerosUtiles as staticNumerosUtiles, toTelHref } from "@/lib/coordonnees";
import { getMairie } from "@/lib/data/coordonnees";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
	const mairie = await getMairie();
	const numerosUtiles = [
		{ label: "Mairie - Hôtel de Ville", tel: mairie.telephone, telHref: toTelHref(mairie.telephone) },
		...staticNumerosUtiles.slice(1),
	];
	const faq = [
		{
			q: "Comment obtenir un acte d'etat civil ?",
			a: "Rendez-vous dans la rubrique Demarches pour effectuer une demande en ligne ou telecharger le formulaire correspondant.",
		},
		{
			q: "Comment signaler un probleme sur la voie publique ?",
			a: "Utilisez le formulaire de signalement disponible dans la rubrique Demarches, ou contactez directement les services techniques.",
		},
		{
			q: "Quels sont les horaires d'ouverture de la mairie ?",
			a: `La mairie est ouverte ${mairie.horaires.map((h) => `${h.jours.toLowerCase()} de ${h.heures}`).join(", ")}.`,
		},
	];

	return (
		<>
			<PageHero title="Contact" description="Une question, une demarche ? Contactez la mairie de Lavaur." />
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
				<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Contact" }]} />
			</div>

			<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid gap-10 lg:grid-cols-2">
				<Reveal>
					<h2 className="section-title mb-6">Formulaire de contact</h2>
					<ContactForm />
				</Reveal>

				<Reveal>
					<h2 className="section-title mb-6">Plan d&apos;acces</h2>
					<Map height="280" />

					<div id="urgences" className="scroll-mt-24 mt-8">
						<h3 className="text-lg font-semibold text-institution-900 mb-3">Numeros utiles & urgences</h3>
						<ul className="space-y-2 text-sm">
							{numerosUtiles.map((n) => (
								<li key={n.label} className="flex justify-between gap-4">
									<span>{n.label}</span>
									<a className="font-medium hover:underline shrink-0" href={`tel:${n.telHref}`}>
										{n.tel}
									</a>
								</li>
							))}
						</ul>
						<p className="text-xs text-institution-500 mt-3">
							Horaires d&apos;ouverture de la mairie : {mairie.horaires.map((h) => `${h.jours} ${h.heures}`).join(" · ")}
						</p>
					</div>
				</Reveal>
			</section>

			<section className="bg-surface-light">
				<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14">
					<Reveal>
						<h2 className="section-title mb-6">Questions frequentes</h2>
						<div className="space-y-3">
							{faq.map((item) => (
								<details key={item.q} className="card p-4 group">
									<summary className="cursor-pointer list-none flex items-center justify-between font-medium text-institution-800">
										{item.q}
										<svg
											className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth={2}
											aria-hidden="true"
										>
											<polyline points="6 9 12 15 18 9" />
										</svg>
									</summary>
									<p className="mt-3 text-sm text-institution-600">{item.a}</p>
								</details>
							))}
						</div>
					</Reveal>
				</div>
			</section>
		</>
	);
}
