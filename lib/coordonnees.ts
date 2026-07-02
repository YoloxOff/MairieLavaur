// Coordonnees reelles de la mairie, reprises du site officiel
// https://www.ville-lavaur.fr/ (juillet 2026).
export const mairie = {
	nom: "Ville de Lavaur",
	adresseLigne1: "Place du Général Sudre",
	adresseLigne2: "CS 60088",
	codePostal: "81503",
	ville: "LAVAUR",
	telephone: "05 63 83 12 20",
	telephoneHref: "+33563831220",
	fax: "05 63 41 42 89",
	email: "mairie@ville-lavaur.fr",
	horaires: [
		{ jours: "Lundi au jeudi", heures: "8h-12h / 13h30-17h30" },
		{ jours: "Vendredi", heures: "8h-12h / 13h30-16h30" },
	],
	adresseComplete: "Place du Général Sudre - CS 60088 - 81503 Lavaur",
};

export const numerosUtiles = [
	{ label: "Mairie - Hôtel de Ville", tel: "05 63 83 12 20", telHref: "+33563831220" },
	{ label: "Police municipale", tel: "05 63 58 05 69", telHref: "+33563580569" },
	{ label: "Gendarmerie", tel: "05 63 58 93 20", telHref: "+33563589320" },
	{ label: "Urgences - Gendarmerie", tel: "17", telHref: "17" },
	{ label: "SAMU", tel: "15", telHref: "15" },
	{ label: "Pompiers", tel: "18", telHref: "18" },
	{ label: "Centre hospitalier de Lavaur", tel: "05 63 58 81 81", telHref: "+33563588181" },
	{ label: "Violences femmes info", tel: "3919", telHref: "3919" },
	{ label: "Gare SNCF de Lavaur", tel: "05 63 58 01 19", telHref: "+33563580119" },
];

export const serviceUrbanisme = {
	adresse: "300 Chemin d'En Roudil, 81500 Lavaur",
	telephone: "05 63 83 12 42",
	telephoneAlt: "05 63 83 03 04",
	email: "urbanisme@ville-lavaur.fr",
	horaires: [
		{ jours: "Lundi au jeudi", heures: "8h-12h / 13h30-17h30" },
		{ jours: "Vendredi", heures: "8h-12h / 13h30-16h30" },
	],
};

export const isatis = {
	nom: "L'Isatis",
	description: "Le bus urbain gratuit de la Ville de Lavaur, en service depuis le 1er septembre 2021.",
	telephone: "05 31 81 96 35",
	email: "lisatis@ville-lavaur.fr",
};
