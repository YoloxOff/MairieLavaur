import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import SectionBlock, { PageHero, type SectionData } from "@/components/SectionBlock";
import Map from "@/components/Map";
import Reveal from "@/components/Reveal";
import { getPageSections } from "@/lib/data/pageSections";

export const metadata: Metadata = { title: "Tourisme" };

export default async function TourismePage() {
	const dbSections = await getPageSections("tourisme");
	const sections: SectionData[] = dbSections.map((s) => ({
		id: s.sectionId,
		title: s.title,
		body: <div dangerouslySetInnerHTML={{ __html: s.bodyHtml }} />,
	}));

	return (
		<>
			<PageHero title="Tourisme" description="Decouvrir Lavaur : monuments, balades, gastronomie et hebergements." />
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
				<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Tourisme" }]} />
			</div>
			{sections.map((section, i) => (
				<SectionBlock key={section.id} section={section} index={i} />
			))}
			<section className="bg-surface-light">
				<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
					<Reveal>
						<h2 className="section-title mb-4">Carte interactive</h2>
						<Map height="420" />
					</Reveal>
				</div>
			</section>
		</>
	);
}
