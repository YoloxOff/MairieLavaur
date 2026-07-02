export type DemarcheCategorie =
	| "Naissance"
	| "Mariage"
	| "Deces"
	| "Carte d'identite"
	| "Passeport"
	| "Urbanisme"
	| "Elections"
	| "Famille"
	| "Ecoles"
	| "Cantine"
	| "Dechets"
	| "Stationnement"
	| "Signalement";

export type Demarche = {
	slug: string;
	title: string;
	category: DemarcheCategorie;
	content: string[];
	lienEnLigne?: string;
};

export const demarcheCategories: DemarcheCategorie[] = [
	"Naissance",
	"Mariage",
	"Deces",
	"Carte d'identite",
	"Passeport",
	"Urbanisme",
	"Elections",
	"Famille",
	"Ecoles",
	"Cantine",
	"Dechets",
	"Stationnement",
	"Signalement",
];

// Contenu d'exemple - a completer avec les procedures reelles et les
// formulaires PDF officiels de la mairie.
export const demarches: Demarche[] = [
	{
		slug: "declaration-naissance",
		title: "Declaration de naissance",
		category: "Naissance",
		content: [
			"Toute naissance doit etre declaree a la mairie du lieu de naissance dans les 5 jours suivant l'accouchement.",
			"Documents a fournir : certificat medical de naissance, livret de famille (le cas echeant), piece d'identite des parents.",
		],
	},
	{
		slug: "demande-carte-identite",
		title: "Demande de carte nationale d'identite",
		category: "Carte d'identite",
		content: [
			"La demande de carte d'identite s'effectue sur rendez-vous en mairie, apres une pre-demande en ligne.",
			"Piece a fournir : justificatif de domicile, photo d'identite conforme, ancienne carte.",
		],
		lienEnLigne: "https://www.service-public.fr/particuliers/vosdroits/N358",
	},
	{
		slug: "demande-passeport",
		title: "Demande de passeport",
		category: "Passeport",
		content: [
			"Comme pour la carte d'identite, la demande de passeport necessite une pre-demande en ligne suivie d'un rendez-vous en mairie.",
		],
		lienEnLigne: "https://www.service-public.fr/particuliers/vosdroits/N360",
	},
	{
		slug: "dossier-mariage",
		title: "Constitution d'un dossier de mariage",
		category: "Mariage",
		content: [
			"Le dossier de mariage doit etre depose au service etat civil au moins un mois avant la date souhaitee.",
			"Documents necessaires : pieces d'identite, justificatifs de domicile, actes de naissance de moins de 3 mois.",
		],
	},
	{
		slug: "declaration-deces",
		title: "Declaration de deces",
		category: "Deces",
		content: [
			"La declaration de deces doit etre effectuee dans les 24h aupres de la mairie du lieu de deces, generalement par les pompes funebres.",
		],
	},
	{
		slug: "demande-urbanisme",
		title: "Demande d'autorisation d'urbanisme",
		category: "Urbanisme",
		content: [
			"Permis de construire, declaration prealable de travaux : le service urbanisme instruit toutes les demandes d'autorisation.",
			"Le service urbanisme se situe au 300 Chemin d'En Roudil, 81500 Lavaur. Il est ouvert du lundi au jeudi de 8h a 12h et de 13h30 a 17h30, et le vendredi de 8h a 12h et de 13h30 a 16h30.",
			"Contact : 05 63 83 12 42 ou 05 63 83 03 04 - urbanisme@ville-lavaur.fr.",
			"Le Plan Local d'Urbanisme (PLU) de Lavaur, approuve par deliberation du 15 decembre 2025, est consultable en mairie et sur le Geoportail de l'urbanisme. La dematerialisation des actes d'urbanisme permet de deposer une demande via le guichet unique en ligne.",
		],
		lienEnLigne: "https://www.service-public.fr/particuliers/vosdroits/N319",
	},
	{
		slug: "inscription-liste-electorale",
		title: "Inscription sur les listes electorales",
		category: "Elections",
		content: [
			"L'inscription sur les listes electorales peut se faire en ligne, en mairie, ou par courrier.",
		],
		lienEnLigne: "https://www.service-public.fr/particuliers/vosdroits/R16396",
	},
	{
		slug: "inscription-scolaire",
		title: "Inscription scolaire",
		category: "Ecoles",
		content: [
			"L'inscription dans les ecoles vauréennes s'effectue aupres du service des affaires scolaires, sur presentation d'un justificatif de domicile et du livret de famille.",
		],
	},
	{
		slug: "inscription-cantine",
		title: "Inscription a la cantine scolaire",
		category: "Cantine",
		content: [
			"L'inscription et la reservation des repas de cantine se font en ligne via le portail famille.",
		],
	},
	{
		slug: "signalement-voirie",
		title: "Signaler un probleme sur la voie publique",
		category: "Signalement",
		content: [
			"Nid de poule, eclairage public defectueux, depot sauvage : signalez tout probleme constate sur la voie publique.",
			"Le service concerne intervient generalement sous 5 jours ouvres.",
		],
	},
	{
		slug: "carte-dechetterie",
		title: "Demande de carte d'acces a la dechetterie",
		category: "Dechets",
		content: [
			"La carte d'acces a la dechetterie communautaire est delivree gratuitement sur presentation d'un justificatif de domicile.",
		],
	},
	{
		slug: "carte-stationnement-residentiel",
		title: "Carte de stationnement residentiel",
		category: "Stationnement",
		content: [
			"Les riverains du centre-ville peuvent demander une carte de stationnement residentiel aupres du service circulation.",
		],
	},
];

export function getDemarcheBySlug(slug: string): Demarche | undefined {
	return demarches.find((d) => d.slug === slug);
}

export function getDemarchesByCategory(category: DemarcheCategorie): Demarche[] {
	return demarches.filter((d) => d.category === category);
}
