import { sql } from "@/lib/db";
import type { Demarche, DemarcheCategorie } from "@/lib/content/demarches";

type Row = {
	id: number;
	slug: string;
	title: string;
	category: string;
	content: string;
	lien_en_ligne: string | null;
};

function fromRow(row: Row): Demarche & { id: number } {
	return {
		id: row.id,
		slug: row.slug,
		title: row.title,
		category: row.category as DemarcheCategorie,
		content: row.content.split("\n\n"),
		lienEnLigne: row.lien_en_ligne || undefined,
	};
}

export async function getDemarches(): Promise<(Demarche & { id: number })[]> {
	const rows = (await sql`SELECT * FROM demarches ORDER BY category, title`) as Row[];
	return rows.map(fromRow);
}

export async function getDemarcheBySlug(slug: string): Promise<(Demarche & { id: number }) | undefined> {
	const rows = (await sql`SELECT * FROM demarches WHERE slug = ${slug} LIMIT 1`) as Row[];
	return rows[0] ? fromRow(rows[0]) : undefined;
}

export async function getDemarcheById(id: number): Promise<(Demarche & { id: number }) | undefined> {
	const rows = (await sql`SELECT * FROM demarches WHERE id = ${id} LIMIT 1`) as Row[];
	return rows[0] ? fromRow(rows[0]) : undefined;
}

export type DemarcheInput = {
	slug: string;
	title: string;
	category: string;
	content: string;
	lienEnLigne?: string;
};

export async function createDemarche(input: DemarcheInput): Promise<void> {
	await sql`
		INSERT INTO demarches (slug, title, category, content, lien_en_ligne)
		VALUES (${input.slug}, ${input.title}, ${input.category}, ${input.content}, ${input.lienEnLigne || null})
	`;
}

export async function updateDemarche(id: number, input: DemarcheInput): Promise<void> {
	await sql`
		UPDATE demarches
		SET slug = ${input.slug}, title = ${input.title}, category = ${input.category}, content = ${input.content},
			lien_en_ligne = ${input.lienEnLigne || null}, updated_at = now()
		WHERE id = ${id}
	`;
}

export async function deleteDemarche(id: number): Promise<void> {
	await sql`DELETE FROM demarches WHERE id = ${id}`;
}
