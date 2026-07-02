import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import SectionBlock, { PageHero, type SectionData } from "@/components/SectionBlock";
import Map from "@/components/Map";
import { getPageSections } from "@/lib/data/pageSections";

export const metadata: Metadata = { title: "La Ville" };

export default async function LaVillePage() {
	const dbSections = await getPageSections("la-ville");
	const sections: SectionData[] = dbSections.map((s) => ({
		id: s.sectionId,
		title: s.title,
		body: <div dangerouslySetInnerHTML={{ __html: s.bodyHtml }} />,
	}));

	// Plan interactif is a live map, not editable prose - inserted at its usual spot.
	const economieIndex = sections.findIndex((s) => s.id === "economie");
	const mapSection: SectionData = { id: "plan-interactif", title: "Plan interactif", body: <Map height="420" /> };
	sections.splice(economieIndex === -1 ? sections.length : economieIndex, 0, mapSection);

	return (
		<>
			<PageHero title="La Ville" description="Decouvrez Lavaur : son histoire, son patrimoine, ses quartiers et son cadre de vie au bord de l'Agout." />
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
				<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "La Ville" }]} />
			</div>
			{sections.map((section, i) => (
				<SectionBlock key={section.id} section={section} index={i} />
			))}
		</>
	);
}
