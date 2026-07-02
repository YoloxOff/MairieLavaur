import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import SectionBlock, { PageHero, type SectionData } from "@/components/SectionBlock";
import { mairie } from "@/lib/coordonnees";

export const metadata: Metadata = { title: "Vie municipale" };

const sections: SectionData[] = [
	{
		id: "maire",
		title: "Le Maire",
		body: (
			<p>
				L&apos;Hôtel de Ville est ouvert au public {mairie.horaires.map((h) => `${h.jours.toLowerCase()} ${h.heures}`).join(", ")}. Contact : {mairie.telephone} - {mairie.email}.
			</p>
		),
	},
	{
		id: "elus",
		title: "Les elus",
		body: <p>Retrouvez le trombinoscope des elus et les expressions politiques des groupes du conseil municipal aupres du service communication de la mairie.</p>,
	},
	{ id: "conseil-municipal", title: "Conseil municipal", body: <p>Dates des seances, ordres du jour et retransmissions du conseil municipal, disponibles aupres de la mairie.</p> },
	{ id: "deliberations", title: "Deliberations", body: <p>Registre des decisions et deliberations du conseil municipal.</p> },
	{ id: "budgets", title: "Budgets", body: <p>Budgets primitifs, comptes administratifs et documents budgetaires de la commune.</p> },
	{
		id: "marches-publics",
		title: "Marches publics",
		body: (
			<p>
				Consultations en cours de la Ville de Lavaur, dont l&apos;appel a candidatures pour l&apos;amenagement d&apos;un espace de restauration « rooftop » au-dessus du cinema Cine-Pastel. Contact commande publique : commandepublique@ville-lavaur.fr.
			</p>
		),
	},
	{
		id: "recrutement",
		title: "Recrutement & offres d'emploi",
		body: (
			<>
				<p>La Ville de Lavaur recrute actuellement :</p>
				<ul>
					<li>un·e Gestionnaire Paie-RH</li>
					<li>un·e Agent d&apos;Etat Civil et Operations Funeraires</li>
				</ul>
				<p>Fiches de poste detaillees disponibles aupres du service Ressources Humaines de la mairie.</p>
			</>
		),
	},
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
