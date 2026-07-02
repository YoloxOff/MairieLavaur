import { sql } from "@/lib/db";
import { mairie as fallbackMairie } from "@/lib/coordonnees";

export type Horaire = { jours: string; heures: string };

export type MairieData = {
	nom: string;
	adresseLigne1: string;
	adresseLigne2: string;
	codePostal: string;
	ville: string;
	telephone: string;
	fax: string;
	email: string;
	horaires: Horaire[];
};

type Row = {
	nom: string;
	adresse_ligne1: string;
	adresse_ligne2: string;
	code_postal: string;
	ville: string;
	telephone: string;
	fax: string | null;
	email: string;
	horaires: string;
};

export async function getMairie(): Promise<MairieData> {
	const rows = (await sql`SELECT * FROM coordonnees WHERE id = 1 LIMIT 1`) as Row[];
	if (!rows[0]) {
		return { ...fallbackMairie };
	}
	const row = rows[0];
	return {
		nom: row.nom,
		adresseLigne1: row.adresse_ligne1,
		adresseLigne2: row.adresse_ligne2,
		codePostal: row.code_postal,
		ville: row.ville,
		telephone: row.telephone,
		fax: row.fax || "",
		email: row.email,
		horaires: JSON.parse(row.horaires),
	};
}

export async function updateMairie(input: MairieData): Promise<void> {
	await sql`
		UPDATE coordonnees
		SET nom = ${input.nom}, adresse_ligne1 = ${input.adresseLigne1}, adresse_ligne2 = ${input.adresseLigne2},
			code_postal = ${input.codePostal}, ville = ${input.ville}, telephone = ${input.telephone},
			fax = ${input.fax || null}, email = ${input.email}, horaires = ${JSON.stringify(input.horaires)}
		WHERE id = 1
	`;
}
