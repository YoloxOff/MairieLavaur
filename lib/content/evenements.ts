export type EvenementCategorie = "Culture" | "Sport" | "Jeunesse" | "Associations" | "Commemorations";

export type Evenement = {
	slug: string;
	title: string;
	category: EvenementCategorie;
	dateDebut: string; // ISO datetime
	dateFin?: string;
	lieu: string;
	inscriptionRequise: boolean;
	inscriptionUrl?: string;
	content: string[];
	image?: string;
};

export const evenementCategories: EvenementCategorie[] = [
	"Culture",
	"Sport",
	"Jeunesse",
	"Associations",
	"Commemorations",
];

// Reprises du site officiel https://www.ville-lavaur.fr/ (juillet 2026).
export const evenements: Evenement[] = [
	{
		slug: "fete-nationale",
		title: "Fête nationale",
		category: "Commemorations",
		dateDebut: "2026-07-13T18:00:00+02:00",
		dateFin: "2026-07-14T18:00:00+02:00",
		lieu: "Monument aux Morts, allées Jean-Jaurès, jardin de l'Évêché",
		inscriptionRequise: false,
		content: [
			"13 juillet, à partir de 18h : cérémonie au monument aux Morts, discours du maire, défilé, puis apéritif républicain offert par la Ville et bal des pompiers avec concert et restauration.",
			"14 juillet, de 14h30 à 18h : concours de pétanque.",
		],
	},
	{
		slug: "les-jeudis-au-jardin",
		title: "Les jeudis au jardin",
		category: "Culture",
		dateDebut: "2026-07-09T19:30:00+02:00",
		dateFin: "2026-07-23T23:30:00+02:00",
		lieu: "Jardin de l'Évêché",
		inscriptionRequise: false,
		content: ["Rendez-vous estival au jardin de l'Évêché - programmation annoncée par affichage."],
		image: "/images/agenda/jeudis-au-jardin.jpg",
	},
	{
		slug: "exposition-paul-gervais",
		title: "Exposition « Paul Gervais, joies de la Belle Époque »",
		category: "Culture",
		dateDebut: "2026-05-30T10:00:00+02:00",
		dateFin: "2026-09-20T18:00:00+02:00",
		lieu: "Chapelle du musée du Pays de Cocagne",
		inscriptionRequise: false,
		content: ["Exposition temporaire dans la chapelle du musée du Pays de Cocagne, du 30 mai au 20 septembre 2026."],
		image: "/images/actualites/expo-paul-gervais.jpg",
	},
];

export function getEvenementBySlug(slug: string): Evenement | undefined {
	return evenements.find((e) => e.slug === slug);
}

export function getUpcomingEvenements(category?: string): Evenement[] {
	const now = Date.now();
	return evenements
		.filter((e) => new Date(e.dateFin || e.dateDebut).getTime() >= now)
		.filter((e) => !category || e.category.toLowerCase() === category.toLowerCase())
		.sort((a, b) => new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime());
}
