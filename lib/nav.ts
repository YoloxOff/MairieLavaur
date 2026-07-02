export type NavChild = {
	label: string;
	href: string;
};

export type NavItem = {
	label: string;
	href: string;
	children?: NavChild[];
};

// Structure reprise du menu principal du site officiel
// https://www.ville-lavaur.fr/ (Votre ville / Vie quotidienne / Pole
// Amenagement et Developpement / Cadre de vie / Culture / Sport-jeunesse).
// Les liens pointent vers la page ou l'ancre la plus proche de notre
// arborescence actuelle, faute d'avoir une page dediee pour chaque
// sous-rubrique du site d'origine.
export const primaryNav: NavItem[] = [
	{ label: "Accueil", href: "/" },
	{
		label: "Votre ville",
		href: "/la-ville",
		children: [
			{ label: "Visiter Lavaur", href: "/tourisme" },
			{ label: "Votre mairie", href: "/vie-municipale" },
		],
	},
	{
		label: "Vie quotidienne",
		href: "/vivre-a-lavaur",
		children: [
			{ label: "Education", href: "/vivre-a-lavaur#education" },
			{ label: "Associations", href: "/vivre-a-lavaur#sport" },
			{ label: "L'Isatis (bus gratuit)", href: "/vivre-a-lavaur#mobilite" },
			{ label: "Centre Communal d'Action Sociale", href: "/vivre-a-lavaur#sante-securite" },
			{ label: "Sante", href: "/vivre-a-lavaur#sante-securite" },
		],
	},
	{
		label: "Pôle Aménagement et Développement",
		href: "/services-municipaux",
		children: [
			{ label: "Vie économique", href: "/la-ville#economie" },
			{ label: "Urbanisme", href: "/services-municipaux#tous-les-services" },
		],
	},
	{
		label: "Cadre de vie",
		href: "/services-municipaux",
		children: [
			{ label: "Police municipale", href: "/services-municipaux#tous-les-services" },
			{ label: "Environnement", href: "/la-ville#environnement" },
			{ label: "Propreté", href: "/services-municipaux#guide-pratique" },
			{ label: "Guide pratique", href: "/services-municipaux#guide-pratique" },
		],
	},
	{
		label: "Culture",
		href: "/vivre-a-lavaur#culture",
		children: [
			{ label: "La médiathèque", href: "/vivre-a-lavaur#culture" },
			{ label: "Le musée", href: "/vivre-a-lavaur#culture" },
		],
	},
	{
		label: "Sport/jeunesse",
		href: "/vivre-a-lavaur#sport",
		children: [
			{ label: "Sport", href: "/vivre-a-lavaur#sport" },
			{ label: "Jeunesse et loisirs", href: "/vivre-a-lavaur#jeunesse" },
		],
	},
	{ label: "Contact", href: "/contact" },
];

// Liens rapides secondaires, sur le meme principe que la barre "Liens
// rapides" du site officiel (Newsletter, Plan interactif, Marches
// publics...). Garde Actualites/Agenda/Demarches facilement accessibles
// puisqu'ils ne sont plus dans le menu principal.
export const quickLinks: NavChild[] = [
	{ label: "Actualités", href: "/actualites" },
	{ label: "Agenda", href: "/agenda" },
	{ label: "Démarches", href: "/demarches" },
	{ label: "Marchés publics", href: "/vie-municipale#marches-publics" },
];
