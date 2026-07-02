import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import SectionBlock, { PageHero, type SectionData } from "@/components/SectionBlock";

export const metadata: Metadata = { title: "Vivre a Lavaur" };

const sections: SectionData[] = [
	{ id: "petite-enfance", title: "Petite enfance", body: <p>Creches, assistantes maternelles et relais petite enfance. Contenu a completer par la mairie.</p> },
	{ id: "education", title: "Ecoles, colleges, lycees", body: <p>Carte scolaire, inscriptions et etablissements presents sur la commune.</p> },
	{ id: "culture", title: "Culture & bibliotheque", body: <p>Mediatheque, ecole de musique et programmation culturelle municipale.</p> },
	{ id: "sport", title: "Sport & associations", body: <p>Equipements sportifs et vie associative vauréenne. Consultez l&apos;agenda pour les evenements.</p> },
	{ id: "sante-securite", title: "Sante & securite", body: <p>Offre de soins locale, police municipale et dispositifs de securite.</p> },
	{ id: "mobilite", title: "Mobilite", body: <p>Transports en commun, stationnement et amenagements cyclables.</p> },
	{ id: "commerces", title: "Commerces & marche", body: <p>Commerces de centre-ville et marche hebdomadaire de Lavaur.</p> },
];

export default function VivreALavaurPage() {
	return (
		<>
			<PageHero title="Vivre a Lavaur" description="Petite enfance, ecoles, culture, sport, sante, mobilite : tous les services du quotidien." />
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
				<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Vivre a Lavaur" }]} />
			</div>
			{sections.map((section, i) => (
				<SectionBlock key={section.id} section={section} index={i} />
			))}
		</>
	);
}
