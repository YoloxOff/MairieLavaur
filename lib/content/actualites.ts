export type ActualiteCategorie =
	| "Ville"
	| "Culture"
	| "Travaux"
	| "Jeunesse"
	| "Sport"
	| "Associations"
	| "Economie"
	| "Education";

export type Actualite = {
	slug: string;
	title: string;
	excerpt: string;
	content: string[];
	category: ActualiteCategorie;
	date: string; // ISO date
	author: string;
	image?: string;
};

export const actualiteCategories: ActualiteCategorie[] = [
	"Ville",
	"Culture",
	"Travaux",
	"Jeunesse",
	"Sport",
	"Associations",
	"Economie",
	"Education",
];

// Reprises du site officiel https://www.ville-lavaur.fr/ (juillet 2026).
export const actualites: Actualite[] = [
	{
		slug: "lavaur-en-tete-qualite-de-vie",
		title: "Lavaur, en tête de toutes les villes tarnaises pour sa qualité de vie",
		excerpt: "Lavaur se classe première commune du Tarn pour la qualité de vie dans sa catégorie, et destination privilégiée pour s'installer pres de Toulouse.",
		content: [
			"La Ville de Lavaur se classe première de sa catégorie (10 000 à 20 000 habitants) pour la qualité de vie dans le Tarn.",
			"Elle est egalement citee comme destination privilegiee pour s'installer pres de Toulouse selon le classement 2025 du Figaro, et comme destination de premier choix pour les seniors en quete de qualite de vie dans la region.",
			"Sur le plan economique, la ville a genere 2 400 emplois en 25 ans, la positionnant comme le troisieme pole economique du Tarn, tout en maitrisant la fiscalite locale : la taxe fonciere n'a augmente que de 10% en dix ans, contre 33% au niveau national.",
			"La commune cumule plusieurs labels : Ville active et sportive, Terre de Jeux 2024, et plusieurs reconnaissances environnementales et d'accessibilite, dont celui de premiere ville de sa categorie pour l'accessibilite sportive en France.",
		],
		category: "Ville",
		date: "2026-04-22",
		author: "Service Communication",
	},
	{
		slug: "exposition-paul-gervais-belle-epoque",
		title: "Exposition « Paul Gervais, joies de la Belle Époque »",
		excerpt: "Du 30 mai au 20 septembre 2026, dans la chapelle du musée du Pays de Cocagne.",
		content: ["Du 30 mai au 20 septembre 2026, dans la chapelle du musée du Pays de Cocagne."],
		category: "Culture",
		date: "2026-04-17",
		author: "Service Culture",
		image: "/images/actualites/expo-paul-gervais.jpg",
	},
	{
		slug: "handicap-permanences-afm-telethon",
		title: "Handicap : des permanences d'accompagnement pour les familles",
		excerpt: "L'AFM Telethon propose des permanences d'accueil a la Maison des associations pour les personnes en situation de handicap et leurs familles.",
		content: [
			"Des permanences pour informer et accompagner les familles concernées se tiennent à la Maison des associations (Bel Air), salle 104, 1er étage avec ascenseur.",
			"L'AFM Téléthon y accueille les personnes en situation de handicap et leurs familles pour la constitution de dossiers, les démarches administratives, les demandes d'aides, ainsi qu'un espace d'écoute contre l'isolement.",
			"Horaires : après-midi les 1er et 3e lundis du mois, matin les 2e et 4e lundis du mois.",
			"Contact : yrivaud@afm-telethon.fr ou 06 50 91 87 48.",
		],
		category: "Associations",
		date: "2026-04-02",
		author: "AFM Téléthon",
		image: "/images/actualites/handicap-afm-telethon.png",
	},
	{
		slug: "appel-a-candidatures-rooftop",
		title: "Appel à candidatures prolongé : mise à disposition d'un local « rooftop »",
		excerpt: "La ville prolonge d'un mois l'appel a candidatures pour l'amenagement d'un espace de restauration au-dessus du cinema Cine-Pastel.",
		content: [
			"L'appel à candidatures pour la mise à disposition d'un local en vue de l'aménagement et de l'exploitation d'un espace de restauration « rooftop », situé au-dessus du cinéma Ciné-Pastel, est prolongé d'un mois.",
			"Les candidatures sont attendues jusqu'au 15 juin 2026.",
			"Les personnes intéressées peuvent demander le dossier de candidature à commandepublique@ville-lavaur.fr. Plus de détails sont disponibles dans la rubrique Marchés publics du site.",
		],
		category: "Economie",
		date: "2026-04-02",
		author: "Commande publique",
	},
	{
		slug: "la-ville-recrute",
		title: "La ville recrute",
		excerpt: "La Ville de Lavaur recrute un(e) gestionnaire paie-RH et un(e) agent d'etat civil et operations funeraires.",
		content: [
			"La Ville de Lavaur recrute pour deux postes à temps complet : un·e Gestionnaire Paie-RH et un·e Agent d'État Civil et Opérations Funéraires.",
			"Les fiches de poste détaillées sont disponibles en téléchargement sur le site officiel de la ville.",
		],
		category: "Ville",
		date: "2026-03-24",
		author: "Ressources Humaines",
	},
];

export function getActualiteBySlug(slug: string): Actualite | undefined {
	return actualites.find((a) => a.slug === slug);
}

export function getActualitesByCategory(category?: string): Actualite[] {
	if (!category) return actualites;
	return actualites.filter((a) => a.category.toLowerCase() === category.toLowerCase());
}
