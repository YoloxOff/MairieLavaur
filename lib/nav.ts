export type NavChild = {
	label: string;
	href: string;
};

export type NavItem = {
	label: string;
	href: string;
	children?: NavChild[];
};

export const primaryNav: NavItem[] = [
	{ label: "Accueil", href: "/" },
	{
		label: "La Ville",
		href: "/la-ville",
		children: [
			{ label: "Presentation", href: "/la-ville#presentation" },
			{ label: "Histoire", href: "/la-ville#histoire" },
			{ label: "Patrimoine", href: "/la-ville#patrimoine" },
			{ label: "Quartiers", href: "/la-ville#quartiers" },
			{ label: "Plan interactif", href: "/la-ville#plan-interactif" },
			{ label: "Economie", href: "/la-ville#economie" },
			{ label: "Environnement", href: "/la-ville#environnement" },
			{ label: "Galerie photos & videos", href: "/la-ville#galerie" },
		],
	},
	{
		label: "Vie municipale",
		href: "/vie-municipale",
		children: [
			{ label: "Le Maire", href: "/vie-municipale#maire" },
			{ label: "Les elus", href: "/vie-municipale#elus" },
			{ label: "Conseil municipal", href: "/vie-municipale#conseil-municipal" },
			{ label: "Deliberations", href: "/vie-municipale#deliberations" },
			{ label: "Budgets", href: "/vie-municipale#budgets" },
			{ label: "Marches publics", href: "/vie-municipale#marches-publics" },
			{ label: "Recrutement & offres d'emploi", href: "/vie-municipale#recrutement" },
			{ label: "Publications & comptes-rendus", href: "/vie-municipale#publications" },
		],
	},
	{ label: "Actualites", href: "/actualites" },
	{ label: "Agenda", href: "/agenda" },
	{ label: "Demarches", href: "/demarches" },
	{
		label: "Vivre a Lavaur",
		href: "/vivre-a-lavaur",
		children: [
			{ label: "Petite enfance", href: "/vivre-a-lavaur#petite-enfance" },
			{ label: "Ecoles, colleges, lycees", href: "/vivre-a-lavaur#education" },
			{ label: "Culture & bibliotheque", href: "/vivre-a-lavaur#culture" },
			{ label: "Sport & associations", href: "/vivre-a-lavaur#sport" },
			{ label: "Sante & securite", href: "/vivre-a-lavaur#sante-securite" },
			{ label: "Mobilite", href: "/vivre-a-lavaur#mobilite" },
			{ label: "Commerces & marche", href: "/vivre-a-lavaur#commerces" },
		],
	},
	{
		label: "Tourisme",
		href: "/tourisme",
		children: [
			{ label: "Monuments", href: "/tourisme#monuments" },
			{ label: "Balades", href: "/tourisme#balades" },
			{ label: "Restaurants & hebergements", href: "/tourisme#restaurants-hebergements" },
			{ label: "Office de tourisme", href: "/tourisme#office-de-tourisme" },
		],
	},
	{
		label: "Services municipaux",
		href: "/services-municipaux",
		children: [
			{ label: "Tous les services", href: "/services-municipaux#tous-les-services" },
			{ label: "Horaires & contacts", href: "/services-municipaux#horaires-contacts" },
			{ label: "Prise de rendez-vous", href: "/services-municipaux#rendez-vous" },
		],
	},
	{ label: "Contact", href: "/contact" },
];
