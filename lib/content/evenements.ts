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
};

export const evenementCategories: EvenementCategorie[] = [
	"Culture",
	"Sport",
	"Jeunesse",
	"Associations",
	"Commemorations",
];

function inDays(days: number, hour = 18): string {
	const d = new Date();
	d.setUTCHours(hour, 0, 0, 0);
	d.setUTCDate(d.getUTCDate() + days);
	return d.toISOString();
}

// Dates calculees par rapport a aujourd'hui pour que l'agenda affiche toujours
// des evenements "a venir" - a remplacer par de vrais evenements via le CMS.
export const evenements: Evenement[] = [
	{
		slug: "fete-de-la-musique",
		title: "Fete de la musique",
		category: "Culture",
		dateDebut: inDays(4, 18),
		dateFin: inDays(4, 23),
		lieu: "Centre-ville",
		inscriptionRequise: false,
		content: [
			"Concerts et scenes ouvertes dans tout le centre-ville pour la Fete de la musique.",
			"Programmation complete disponible aupres de l'office de tourisme.",
		],
	},
	{
		slug: "tournoi-jeunes-tennis",
		title: "Tournoi jeunes de tennis",
		category: "Sport",
		dateDebut: inDays(9, 9),
		dateFin: inDays(10, 18),
		lieu: "Tennis Club Vaurais",
		inscriptionRequise: true,
		inscriptionUrl: "/contact",
		content: [
			"Le Tennis Club Vaurais organise son tournoi jeunes annuel, ouvert aux moins de 15 ans.",
			"Inscriptions limitees, places attribuees par ordre d'arrivee.",
		],
	},
	{
		slug: "forum-des-associations",
		title: "Forum des associations",
		category: "Associations",
		dateDebut: inDays(16, 9),
		dateFin: inDays(16, 17),
		lieu: "Halle aux grains",
		inscriptionRequise: false,
		content: [
			"Plus de 80 associations vauréennes presentent leurs activites pour la nouvelle saison.",
			"Entree libre, animations pour toute la famille.",
		],
	},
	{
		slug: "atelier-jeunesse-vacances",
		title: "Atelier creatif jeunesse - vacances",
		category: "Jeunesse",
		dateDebut: inDays(21, 14),
		lieu: "Maison des associations",
		inscriptionRequise: true,
		inscriptionUrl: "/contact",
		content: [
			"Un atelier creatif gratuit pour les 6-12 ans pendant les vacances scolaires.",
			"Places limitees a 20 enfants, inscription obligatoire aupres du service jeunesse.",
		],
	},
	{
		slug: "commemoration-8-mai",
		title: "Ceremonie commemorative",
		category: "Commemorations",
		dateDebut: inDays(2, 11),
		lieu: "Monument aux morts",
		inscriptionRequise: false,
		content: [
			"Ceremonie commemorative organisee par la municipalite en presence des anciens combattants.",
		],
	},
	{
		slug: "exposition-patrimoine",
		title: "Exposition sur le patrimoine vaurais",
		category: "Culture",
		dateDebut: inDays(30, 10),
		dateFin: inDays(45, 18),
		lieu: "Cathedrale Saint-Alain",
		inscriptionRequise: false,
		content: [
			"Une exposition retrace l'histoire du patrimoine batisseur de la ville de Lavaur.",
		],
	},
];

export function getEvenementBySlug(slug: string): Evenement | undefined {
	return evenements.find((e) => e.slug === slug);
}

export function getUpcomingEvenements(category?: string): Evenement[] {
	const now = Date.now();
	return evenements
		.filter((e) => new Date(e.dateDebut).getTime() >= now)
		.filter((e) => !category || e.category.toLowerCase() === category.toLowerCase())
		.sort((a, b) => new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime());
}
