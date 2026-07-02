import { sql } from "@/lib/db";
import type { Evenement, EvenementCategorie } from "@/lib/content/evenements";

type Row = {
	id: number;
	slug: string;
	title: string;
	category: string;
	date_debut: string;
	date_fin: string | null;
	lieu: string;
	inscription_requise: boolean;
	inscription_url: string | null;
	content: string;
	image: string | null;
};

function fromRow(row: Row): Evenement & { id: number } {
	return {
		id: row.id,
		slug: row.slug,
		title: row.title,
		category: row.category as EvenementCategorie,
		dateDebut: new Date(row.date_debut).toISOString(),
		dateFin: row.date_fin ? new Date(row.date_fin).toISOString() : undefined,
		lieu: row.lieu,
		inscriptionRequise: row.inscription_requise,
		inscriptionUrl: row.inscription_url || undefined,
		content: row.content.split("\n\n"),
		image: row.image || undefined,
	};
}

export async function getEvenements(): Promise<(Evenement & { id: number })[]> {
	const rows = (await sql`SELECT * FROM evenements ORDER BY date_debut ASC`) as Row[];
	return rows.map(fromRow);
}

export async function getUpcomingEvenements(category?: string): Promise<(Evenement & { id: number })[]> {
	const all = await getEvenements();
	const now = Date.now();
	return all
		.filter((e) => new Date(e.dateFin || e.dateDebut).getTime() >= now)
		.filter((e) => !category || e.category.toLowerCase() === category.toLowerCase());
}

export async function getEvenementBySlug(slug: string): Promise<(Evenement & { id: number }) | undefined> {
	const rows = (await sql`SELECT * FROM evenements WHERE slug = ${slug} LIMIT 1`) as Row[];
	return rows[0] ? fromRow(rows[0]) : undefined;
}

export async function getEvenementById(id: number): Promise<(Evenement & { id: number }) | undefined> {
	const rows = (await sql`SELECT * FROM evenements WHERE id = ${id} LIMIT 1`) as Row[];
	return rows[0] ? fromRow(rows[0]) : undefined;
}

export type EvenementInput = {
	slug: string;
	title: string;
	category: string;
	dateDebut: string;
	dateFin?: string;
	lieu: string;
	inscriptionRequise: boolean;
	inscriptionUrl?: string;
	content: string;
	image?: string;
};

export async function createEvenement(input: EvenementInput): Promise<void> {
	await sql`
		INSERT INTO evenements (slug, title, category, date_debut, date_fin, lieu, inscription_requise, inscription_url, content, image)
		VALUES (${input.slug}, ${input.title}, ${input.category}, ${input.dateDebut}, ${input.dateFin || null}, ${input.lieu}, ${input.inscriptionRequise}, ${input.inscriptionUrl || null}, ${input.content}, ${input.image || null})
	`;
}

export async function updateEvenement(id: number, input: EvenementInput): Promise<void> {
	await sql`
		UPDATE evenements
		SET slug = ${input.slug}, title = ${input.title}, category = ${input.category}, date_debut = ${input.dateDebut},
			date_fin = ${input.dateFin || null}, lieu = ${input.lieu}, inscription_requise = ${input.inscriptionRequise},
			inscription_url = ${input.inscriptionUrl || null}, content = ${input.content}, image = ${input.image || null},
			updated_at = now()
		WHERE id = ${id}
	`;
}

export async function deleteEvenement(id: number): Promise<void> {
	await sql`DELETE FROM evenements WHERE id = ${id}`;
}
