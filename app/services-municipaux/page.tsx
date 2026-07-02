import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { PageHero } from "@/components/SectionBlock";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Services municipaux" };

const services = [
	{ nom: "Etat civil", horaires: "Lun-Ven 8h30-12h / 13h30-17h", tel: "05 63 58 35 01" },
	{ nom: "Urbanisme", horaires: "Lun-Ven 9h-12h", tel: "05 63 58 35 02" },
	{ nom: "Affaires scolaires & cantine", horaires: "Lun-Ven 8h30-17h", tel: "05 63 58 35 03" },
	{ nom: "Culture", horaires: "Mar-Sam 10h-18h", tel: "05 63 58 35 04" },
	{ nom: "Sport & vie associative", horaires: "Lun-Ven 9h-12h / 14h-17h", tel: "05 63 58 35 05" },
	{ nom: "Environnement & dechets", horaires: "Lun-Ven 9h-12h", tel: "05 63 58 35 06" },
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
