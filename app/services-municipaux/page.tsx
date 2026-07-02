import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { PageHero } from "@/components/SectionBlock";
import Reveal from "@/components/Reveal";
import { mairie, serviceUrbanisme } from "@/lib/coordonnees";

export const metadata: Metadata = { title: "Services municipaux" };

const horairesMairie = mairie.horaires.map((h) => `${h.jours} ${h.heures}`).join(" · ");

const services = [
	{ nom: "Etat civil", horaires: horairesMairie, tel: mairie.telephone },
	{ nom: "Urbanisme", adresse: serviceUrbanisme.adresse, horaires: serviceUrbanisme.horaires.map((h) => `${h.jours} ${h.heures}`).join(" · "), tel: serviceUrbanisme.telephone },
	{ nom: "Affaires scolaires & cantine", horaires: horairesMairie, tel: mairie.telephone },
	{ nom: "Culture (mediatheque, musee du Pays de Cocagne)", horaires: "Voir horaires sur place", tel: mairie.telephone },
	{ nom: "Sport & vie associative", horaires: horairesMairie, tel: mairie.telephone },
	{ nom: "Police municipale", horaires: horairesMairie, tel: "05 63 58 05 69" },
	{ nom: "Environnement & proprete", horaires: horairesMairie, tel: mairie.telephone },
	{ nom: "L'Isatis (bus gratuit)", horaires: "Lundi au samedi", tel: "05 31 81 96 35" },
];

export default function ServicesMunicipauxPage() {
	return (
		<>
			<PageHero title="Services municipaux" description="Tous les services municipaux, leurs horaires et leurs contacts." />
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
				<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Services municipaux" }]} />
			</div>

			<section id="tous-les-services" className="scroll-mt-24">
				<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
					<Reveal>
						<h2 id="horaires-contacts" className="section-title mb-6 scroll-mt-24">
							Tous les services
						</h2>
						<div className="grid gap-4 sm:grid-cols-2">
							{services.map((service) => (
								<div key={service.nom} className="card p-5">
									<h3 className="font-semibold text-institution-900 mb-1">{service.nom}</h3>
									{"adresse" in service && service.adresse && <p className="text-sm text-institution-600">{service.adresse}</p>}
									<p className="text-sm text-institution-600">{service.horaires}</p>
									<p className="text-sm text-institution-700 mt-1">
										<a className="hover:underline" href={`tel:${service.tel.replace(/\s/g, "")}`}>
											{service.tel}
										</a>
									</p>
								</div>
							))}
						</div>
					</Reveal>
				</div>
			</section>

			<section id="rendez-vous" className="scroll-mt-24 bg-surface-light">
				<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
					<Reveal>
						<h2 className="section-title mb-4">Prise de rendez-vous</h2>
						<p className="text-institution-600 mb-6">
							Prenez rendez-vous en ligne avec le service de votre choix, ou contactez-le directement par telephone.
						</p>
						<Link href="/contact" className="btn-primary">
							Demander un rendez-vous
						</Link>
					</Reveal>
				</div>
			</section>
		</>
	);
}
