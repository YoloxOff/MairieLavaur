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

// Contenu d'exemple - a remplacer par de vraies actualites via le CMS.
export const actualites: Actualite[] = [
	{
		slug: "reouverture-mediatheque",
		title: "Reouverture de la mediatheque apres travaux",
		excerpt: "La mediatheque municipale rouvre ses portes avec un espace jeunesse agrandi et de nouveaux horaires.",
		content: [
			"Apres deux mois de travaux, la mediatheque municipale a rouvert ses portes au public.",
			"L'espace jeunesse a ete agrandi et un nouveau coin lecture presse a ete amenage au rez-de-chaussee.",
			"Les horaires d'ouverture restent inchanges : du mardi au samedi, de 10h a 18h.",
		],
		category: "Culture",
		date: "2026-06-20",
		author: "Service Communication",
	},
	{
		slug: "travaux-place-du-plo",
		title: "Travaux de requalification de la place du Plo",
		excerpt: "Des travaux de voirie et d'embellissement debutent place du Plo pour ameliorer l'accessibilite du centre-ville.",
		content: [
			"La Ville de Lavaur engage une requalification complete de la place du Plo.",
			"Les travaux visent a ameliorer l'accessibilite PMR, planter de nouveaux arbres et refaire les reseaux d'eaux pluviales.",
			"Une circulation alternee sera mise en place pendant la duree du chantier.",
		],
		category: "Travaux",
		date: "2026-06-15",
		author: "Direction des services techniques",
	},
	{
		slug: "inscriptions-centre-loisirs-ete",
		title: "Ouverture des inscriptions au centre de loisirs d'ete",
		excerpt: "Les inscriptions pour l'accueil de loisirs des vacances d'ete sont ouvertes depuis ce lundi.",
		content: [
			"Le service jeunesse ouvre les inscriptions pour l'accueil de loisirs des vacances d'ete.",
			"Les familles peuvent inscrire leurs enfants directement en ligne depuis la rubrique Demarches.",
		],
		category: "Jeunesse",
		date: "2026-06-10",
		author: "Service Jeunesse",
	},
	{
		slug: "budget-participatif-2026",
		title: "Lancement du budget participatif 2026",
		excerpt: "Les Vaurais sont invites a proposer et voter pour des projets d'interet general.",
		content: [
			"La municipalite lance la deuxieme edition du budget participatif.",
			"Chaque habitant peut deposer un projet jusqu'au 30 septembre, avant un vote ouvert a tous en octobre.",
		],
		category: "Ville",
		date: "2026-06-05",
		author: "Cabinet du Maire",
	},
	{
		slug: "nouvelle-saison-sportive",
		title: "Les clubs sportifs vauréens preparent la nouvelle saison",
		excerpt: "Forums des associations, portes ouvertes et inscriptions : le point sur la rentree sportive.",
		content: [
			"Les clubs sportifs de la ville se preparent pour la rentree avec un forum des associations en septembre.",
			"Retrouvez la liste complete des clubs dans la rubrique Vivre a Lavaur.",
		],
		category: "Sport",
		date: "2026-05-28",
		author: "Service des Sports",
	},
	{
		slug: "marche-artisans-locaux",
		title: "Un marche de producteurs et artisans locaux tous les vendredis",
		excerpt: "La Ville soutient les circuits courts avec un nouveau marche hebdomadaire place du Foirail.",
		content: [
			"Un marche de producteurs et artisans locaux se tient desormais chaque vendredi place du Foirail.",
			"Cette initiative vise a soutenir l'economie locale et les circuits courts.",
		],
		category: "Economie",
		date: "2026-05-20",
		author: "Service Economie locale",
	},
];

export function getActualiteBySlug(slug: string): Actualite | undefined {
	return actualites.find((a) => a.slug === slug);
}

export function getActualitesByCategory(category?: string): Actualite[] {
	if (!category) return actualites;
	return actualites.filter((a) => a.category.toLowerCase() === category.toLowerCase());
}
