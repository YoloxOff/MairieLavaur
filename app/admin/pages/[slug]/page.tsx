import { notFound } from "next/navigation";
import { getPageSections, editablePages } from "@/lib/data/pageSections";
import { updatePageSectionAction } from "../../actions";
import SectionForm from "./SectionForm";

export default async function AdminPageSectionsPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const pageDef = editablePages.find((p) => p.slug === slug);
	if (!pageDef) notFound();

	const sections = await getPageSections(slug);

	return (
		<div>
			<h1 className="text-2xl font-bold text-institution-900 mb-6">{pageDef.label}</h1>
			<div className="space-y-4">
				{sections.map((s) => (
					<SectionForm
						key={s.id}
						sectionId={s.sectionId}
						title={s.title}
						bodyHtml={s.bodyHtml}
						action={updatePageSectionAction.bind(null, s.id, slug)}
					/>
				))}
				{sections.length === 0 && <p className="text-sm text-institution-500">Aucune section pour cette page.</p>}
			</div>
		</div>
	);
}
