import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import SectionBlock, { PageHero, type SectionData } from "@/components/SectionBlock";
import { getPageSections } from "@/lib/data/pageSections";

export const metadata: Metadata = { title: "Vivre a Lavaur" };

export default async function VivreALavaurPage() {
	const dbSections = await getPageSections("vivre-a-lavaur");
	const sections: SectionData[] = dbSections.map((s) => ({
		id: s.sectionId,
		title: s.title,
		body: <div dangerouslySetInnerHTML={{ __html: s.bodyHtml }} />,
	}));

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
