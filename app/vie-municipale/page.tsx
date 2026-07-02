import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import SectionBlock, { PageHero, type SectionData } from "@/components/SectionBlock";
import { getMairie } from "@/lib/data/coordonnees";
import { getPageSections } from "@/lib/data/pageSections";

export const metadata: Metadata = { title: "Vie municipale" };

export default async function VieMunicipalePage() {
	const [mairie, dbSections] = await Promise.all([getMairie(), getPageSections("vie-municipale")]);

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
		...dbSections.map((s) => ({
			id: s.sectionId,
			title: s.title,
			body: <div dangerouslySetInnerHTML={{ __html: s.bodyHtml }} />,
		})),
	];

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
