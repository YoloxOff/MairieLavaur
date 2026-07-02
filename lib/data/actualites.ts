import { sql } from "@/lib/db";
import type { Actualite, ActualiteCategorie } from "@/lib/content/actualites";

type Row = {
	id: number;
	slug: string;
	title: string;
	excerpt: string;
	content: string;
	category: string;
	date: string | Date;
	author: string;
	image: string | null;
};

function formatDate(value: unknown): string {
	if (typeof value === "string") return value.slice(0, 10);
	if (value instanceof Date) return value.toISOString().slice(0, 10);
	return String(value);
}

function fromRow(row: Row): Actualite & { id: number } {
	return {
		id: row.id,
		slug: row.slug,
		title: row.title,
		excerpt: row.excerpt,
		content: row.content.split("\n\n"),
		category: row.category as ActualiteCategorie,
		date: formatDate(row.date),
		author: row.author,
		image: row.image || undefined,
	};
}

export async function getActualites(): Promise<(Actualite & { id: number })[]> {
	const rows = (await sql`SELECT * FROM actualites ORDER BY date DESC`) as Row[];
	return rows.map(fromRow);
}

export async function getActualiteBySlug(slug: string): Promise<(Actualite & { id: number }) | undefined> {
	const rows = (await sql`SELECT * FROM actualites WHERE slug = ${slug} LIMIT 1`) as Row[];
	return rows[0] ? fromRow(rows[0]) : undefined;
}

export async function getActualiteById(id: number): Promise<(Actualite & { id: number }) | undefined> {
	const rows = (await sql`SELECT * FROM actualites WHERE id = ${id} LIMIT 1`) as Row[];
	return rows[0] ? fromRow(rows[0]) : undefined;
}

export type ActualiteInput = {
	slug: string;
	title: string;
	excerpt: string;
	content: string; // raw textarea value, paragraphs separated by blank lines
	category: string;
	date: string;
	author: string;
	image?: string;
};

export async function createActualite(input: ActualiteInput): Promise<void> {
	await sql`
		INSERT INTO actualites (slug, title, excerpt, content, category, date, author, image)
		VALUES (${input.slug}, ${input.title}, ${input.excerpt}, ${input.content}, ${input.category}, ${input.date}, ${input.author}, ${input.image || null})
	`;
}

export async function updateActualite(id: number, input: ActualiteInput): Promise<void> {
	await sql`
		UPDATE actualites
		SET slug = ${input.slug}, title = ${input.title}, excerpt = ${input.excerpt}, content = ${input.content},
			category = ${input.category}, date = ${input.date}, author = ${input.author}, image = ${input.image || null},
			updated_at = now()
		WHERE id = ${id}
	`;
}

export async function deleteActualite(id: number): Promise<void> {
	await sql`DELETE FROM actualites WHERE id = ${id}`;
}
