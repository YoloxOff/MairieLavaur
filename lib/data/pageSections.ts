import { sql } from "@/lib/db";

export type PageSection = {
	id: number;
	pageSlug: string;
	sectionId: string;
	title: string;
	bodyHtml: string;
	position: number;
};

type Row = {
	id: number;
	page_slug: string;
	section_id: string;
	title: string;
	body_html: string;
	position: number;
};

function fromRow(row: Row): PageSection {
	return {
		id: row.id,
		pageSlug: row.page_slug,
		sectionId: row.section_id,
		title: row.title,
		bodyHtml: row.body_html,
		position: row.position,
	};
}

export const editablePages = [
	{ slug: "la-ville", label: "La Ville" },
	{ slug: "vie-municipale", label: "Vie municipale" },
	{ slug: "vivre-a-lavaur", label: "Vivre a Lavaur" },
	{ slug: "tourisme", label: "Tourisme" },
];

export async function getPageSections(pageSlug: string): Promise<PageSection[]> {
	const rows = (await sql`SELECT * FROM page_sections WHERE page_slug = ${pageSlug} ORDER BY position ASC`) as Row[];
	return rows.map(fromRow);
}

export async function getPageSectionById(id: number): Promise<PageSection | undefined> {
	const rows = (await sql`SELECT * FROM page_sections WHERE id = ${id} LIMIT 1`) as Row[];
	return rows[0] ? fromRow(rows[0]) : undefined;
}

export async function updatePageSection(id: number, input: { title: string; bodyHtml: string }): Promise<void> {
	await sql`
		UPDATE page_sections
		SET title = ${input.title}, body_html = ${input.bodyHtml}, updated_at = now()
		WHERE id = ${id}
	`;
}
