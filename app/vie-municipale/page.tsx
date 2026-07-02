import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import SectionBlock, { PageHero, type SectionData } from "@/components/SectionBlock";

export const metadata: Metadata = { title: "Vie municipale" };

const sections: SectionData[] = [
	{ id: "maire", title: "Le Maire", body: <p>Presentation du maire et de ses delegations. Contenu et photo a fournir par la mairie.</p> },
	{ id: "elus", title: "Les elus", body: <p>Liste des adjoints et conseillers municipaux avec leurs delegations. Contenu a completer par la mairie.</p> },
	{ id: "conseil-municipal", title: "Conseil municipal", body: <p>Dates des seances, ordres du jour et retransmissions du conseil municipal.</p> },
	{ id: "deliberations", title: "Deliberations", body: <p>Registre des deliberations du conseil municipal, telechargeables au format PDF.</p> },
	{ id: "budgets", title: "Budgets", body: <p>Budgets primitifs, comptes administratifs et documents budgetaires de la commune.</p> },
	{ id: "marches-publics", title: "Marches publics", body: <p>Consultations en cours et avis de marches publics de la Ville de Lavaur.</p> },
	{ id: "recrutement", title: "Recrutement & offres d'emploi", body: <p>Offres d&apos;emploi et de stage au sein des services municipaux.</p> },
	{ id: "publications", title: "Publications & comptes-rendus", body: <p>Bulletin municipal, rapports d&apos;activite et comptes-rendus telechargeables.</p> },
];

export default function VieMunicipalePage() {
	return (
		<>
			<PageHero title="Vie municipale" description="Le maire, les elus, le conseil municipal et les publications officielles de la ville." />
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
				<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Vie municipale" }]} />
			</div>
			{sections.map((section, i) => (
				<SectionBlock key={section.id} section={section} index={i} />
			))}
		</>
	);
}
