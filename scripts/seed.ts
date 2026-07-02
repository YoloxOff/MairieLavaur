import { sql } from "../lib/db.ts";
import { actualites } from "../lib/content/actualites.ts";
import { evenements } from "../lib/content/evenements.ts";
import { demarches } from "../lib/content/demarches.ts";
import { mairie } from "../lib/coordonnees.ts";

async function createTables() {
	await sql`
		CREATE TABLE IF NOT EXISTS actualites (
			id SERIAL PRIMARY KEY,
			slug TEXT UNIQUE NOT NULL,
			title TEXT NOT NULL,
			excerpt TEXT NOT NULL,
			content TEXT NOT NULL,
			category TEXT NOT NULL,
			date DATE NOT NULL,
			author TEXT NOT NULL,
			image TEXT,
			created_at TIMESTAMPTZ DEFAULT now(),
			updated_at TIMESTAMPTZ DEFAULT now()
		)
	`;
	await sql`
		CREATE TABLE IF NOT EXISTS evenements (
			id SERIAL PRIMARY KEY,
			slug TEXT UNIQUE NOT NULL,
			title TEXT NOT NULL,
			category TEXT NOT NULL,
			date_debut TIMESTAMPTZ NOT NULL,
			date_fin TIMESTAMPTZ,
			lieu TEXT NOT NULL,
			inscription_requise BOOLEAN NOT NULL DEFAULT false,
			inscription_url TEXT,
			content TEXT NOT NULL,
			image TEXT,
			created_at TIMESTAMPTZ DEFAULT now(),
			updated_at TIMESTAMPTZ DEFAULT now()
		)
	`;
	await sql`
		CREATE TABLE IF NOT EXISTS demarches (
			id SERIAL PRIMARY KEY,
			slug TEXT UNIQUE NOT NULL,
			title TEXT NOT NULL,
			category TEXT NOT NULL,
			content TEXT NOT NULL,
			lien_en_ligne TEXT,
			created_at TIMESTAMPTZ DEFAULT now(),
			updated_at TIMESTAMPTZ DEFAULT now()
		)
	`;
	await sql`
		CREATE TABLE IF NOT EXISTS page_sections (
			id SERIAL PRIMARY KEY,
			page_slug TEXT NOT NULL,
			section_id TEXT NOT NULL,
			title TEXT NOT NULL,
			body_html TEXT NOT NULL,
			position INT NOT NULL DEFAULT 0,
			updated_at TIMESTAMPTZ DEFAULT now(),
			UNIQUE(page_slug, section_id)
		)
	`;
	await sql`
		CREATE TABLE IF NOT EXISTS coordonnees (
			id INT PRIMARY KEY DEFAULT 1,
			nom TEXT NOT NULL,
			adresse_ligne1 TEXT NOT NULL,
			adresse_ligne2 TEXT NOT NULL,
			code_postal TEXT NOT NULL,
			ville TEXT NOT NULL,
			telephone TEXT NOT NULL,
			fax TEXT,
			email TEXT NOT NULL,
			horaires TEXT NOT NULL,
			CHECK (id = 1)
		)
	`;
}

async function seedActualites() {
	for (const a of actualites) {
		await sql`
			INSERT INTO actualites (slug, title, excerpt, content, category, date, author, image)
			VALUES (${a.slug}, ${a.title}, ${a.excerpt}, ${a.content.join("\n\n")}, ${a.category}, ${a.date}, ${a.author}, ${a.image || null})
			ON CONFLICT (slug) DO NOTHING
		`;
	}
}

async function seedEvenements() {
	for (const e of evenements) {
		await sql`
			INSERT INTO evenements (slug, title, category, date_debut, date_fin, lieu, inscription_requise, inscription_url, content, image)
			VALUES (${e.slug}, ${e.title}, ${e.category}, ${e.dateDebut}, ${e.dateFin || null}, ${e.lieu}, ${e.inscriptionRequise}, ${e.inscriptionUrl || null}, ${e.content.join("\n\n")}, ${e.image || null})
			ON CONFLICT (slug) DO NOTHING
		`;
	}
}

async function seedDemarches() {
	for (const d of demarches) {
		await sql`
			INSERT INTO demarches (slug, title, category, content, lien_en_ligne)
			VALUES (${d.slug}, ${d.title}, ${d.category}, ${d.content.join("\n\n")}, ${d.lienEnLigne || null})
			ON CONFLICT (slug) DO NOTHING
		`;
	}
}

async function seedCoordonnees() {
	await sql`
		INSERT INTO coordonnees (id, nom, adresse_ligne1, adresse_ligne2, code_postal, ville, telephone, fax, email, horaires)
		VALUES (1, ${mairie.nom}, ${mairie.adresseLigne1}, ${mairie.adresseLigne2}, ${mairie.codePostal}, ${mairie.ville}, ${mairie.telephone}, ${mairie.fax}, ${mairie.email}, ${JSON.stringify(mairie.horaires)})
		ON CONFLICT (id) DO NOTHING
	`;
}

type SectionSeed = { page: string; id: string; title: string; html: string; position: number };

const pageSections: SectionSeed[] = [
	// La Ville
	{
		page: "la-ville",
		id: "presentation",
		title: "Presentation",
		position: 0,
		html: "<p>Lavaur est une cite d'histoire, au riche patrimoine architectural, situee dans le Tarn.</p><p>La ville se classe premiere de sa categorie pour la qualite de vie dans le Tarn, et figure parmi les destinations privilegiees pour s'installer pres de Toulouse.</p>",
	},
	{
		page: "la-ville",
		id: "histoire",
		title: "Un peu d'histoire",
		position: 1,
		html: "<p>Cite d'histoire, Lavaur a construit au fil des siecles un patrimoine architectural riche, aujourd'hui mis en valeur autour de son castrum et de ses monuments.</p>",
	},
	{
		page: "la-ville",
		id: "patrimoine",
		title: "Patrimoine : la cathedrale Saint-Alain et l'Hotel de Ville",
		position: 2,
		html: "<p>La <strong>cathedrale Saint-Alain</strong> est le monument religieux majeur de la ville.</p><p><strong>L'Hotel de Ville</strong> est un edifice municipal notable du centre historique.</p><p>En 2001, la Ville de Lavaur a fait l'acquisition de l'ancienne maison des Sœurs du Christ, vaste edifice et jardins situes au cœur du castrum, pour y creer un pole culturel regroupant une mediatheque, un musee et des archives anciennes.</p>",
	},
	{
		page: "la-ville",
		id: "quartiers",
		title: "Quartiers",
		position: 3,
		html: "<p>Presentation des quartiers de la ville et de leurs conseils de quartier. Contenu a completer par la mairie.</p>",
	},
	{
		page: "la-ville",
		id: "economie",
		title: "Economie",
		position: 5,
		html: "<p>Autrefois eveche et sous-prefecture, Lavaur est devenue le moteur du troisieme pole economique tarnais, apres Castres et Albi. Zones d'activites, commerces de centre-ville et acteurs economiques locaux animent le tissu economique de la ville.</p>",
	},
	{
		page: "la-ville",
		id: "environnement",
		title: "Environnement",
		position: 6,
		html: "<p>Actions municipales en faveur de la transition ecologique et de la biodiversite. Contenu a completer par la mairie.</p>",
	},
	{
		page: "la-ville",
		id: "galerie",
		title: "Galerie photos & videos",
		position: 7,
		html: "<p>Galerie a alimenter avec des photos et videos de la ville.</p>",
	},
	// Vie municipale
	{
		page: "vie-municipale",
		id: "elus",
		title: "Les elus",
		position: 1,
		html: "<p>Retrouvez le trombinoscope des elus et les expressions politiques des groupes du conseil municipal aupres du service communication de la mairie.</p>",
	},
	{
		page: "vie-municipale",
		id: "conseil-municipal",
		title: "Conseil municipal",
		position: 2,
		html: "<p>Dates des seances, ordres du jour et retransmissions du conseil municipal, disponibles aupres de la mairie.</p>",
	},
	{
		page: "vie-municipale",
		id: "deliberations",
		title: "Deliberations",
		position: 3,
		html: "<p>Registre des decisions et deliberations du conseil municipal.</p>",
	},
	{
		page: "vie-municipale",
		id: "budgets",
		title: "Budgets",
		position: 4,
		html: "<p>Budgets primitifs, comptes administratifs et documents budgetaires de la commune.</p>",
	},
	{
		page: "vie-municipale",
		id: "marches-publics",
		title: "Marches publics",
		position: 5,
		html: "<p>La ville de Lavaur publie regulierement des appels d'offres pour des services et travaux, ainsi que des consultations recurrentes (electricite, gaz naturel, denrees alimentaires, fournitures de bureau).</p><p>Exemples de marches recents : prestations de fauchage et debroussaillage, amenagement de la route du Port d'en Taix, fournitures scolaires et de loisirs, et l'appel a candidatures pour l'amenagement d'un espace de restauration « rooftop » au-dessus du cinema Cine-Pastel.</p><p>Des listes annuelles des marches conclus sont disponibles depuis 2009. Contact commande publique : commandepublique@ville-lavaur.fr.</p>",
	},
	{
		page: "vie-municipale",
		id: "recrutement",
		title: "Recrutement & offres d'emploi",
		position: 6,
		html: "<p>La Ville de Lavaur recrute actuellement :</p><ul><li>un·e Gestionnaire Paie-RH</li><li>un·e Agent d'Etat Civil et Operations Funeraires</li></ul><p>Fiches de poste detaillees disponibles aupres du service Ressources Humaines de la mairie.</p>",
	},
	{
		page: "vie-municipale",
		id: "publications",
		title: "Publications & comptes-rendus",
		position: 7,
		html: "<p>Bulletin municipal, rapports d'activite et comptes-rendus telechargeables.</p>",
	},
	// Vivre a Lavaur
	{
		page: "vivre-a-lavaur",
		id: "petite-enfance",
		title: "Petite enfance",
		position: 0,
		html: "<p>La ville propose des services destines aux jeunes enfants. Renseignements aupres de la mairie pour les creches et le relais petite enfance.</p>",
	},
	{
		page: "vivre-a-lavaur",
		id: "education",
		title: "Ecoles, colleges, lycees",
		position: 1,
		html: "<p>La ville de Lavaur compte plusieurs etablissements scolaires, publics et prives, de qualite.</p><p>Le restaurant scolaire confectionne 1 200 repas par jour avec un maximum de produits frais et en liaison chaude, pour tous les etablissements publics et prives.</p><p>Une antenne locale du Conservatoire de Musique et de Danse du Tarn, geree par la CCTA, est egalement disponible, ainsi que des echanges et jumelages scolaires.</p>",
	},
	{
		page: "vivre-a-lavaur",
		id: "jeunesse",
		title: "Jeunesse et loisirs",
		position: 2,
		html: "<p>La ville propose un programme riche et diversifie pour les jeunes, organise autour de plusieurs structures.</p><p><strong>Le Centre de loisirs des Clauzades</strong> accueille les enfants pendant les vacances et sur les temps periscolaires.</p><p><strong>L'Espace Jeunesse Municipal</strong> s'adresse aux 11-25 ans, avec deux implantations : pres du lycee Las Cases et au college des Clauzades.</p><p><strong>Les ALAE</strong> (Accueils Loisirs Associes a l'Ecole) assurent la continuite des temps scolaires et periscolaires durant l'annee.</p><p><strong>Les sejours</strong> offrent aux jeunes des moments pour faire du sport, s'oxygener, vivre en groupe et tisser du lien social.</p>",
	},
	{
		page: "vivre-a-lavaur",
		id: "culture",
		title: "Culture & bibliotheque",
		position: 3,
		html: "<p>En 2001, la Ville de Lavaur a fait l'acquisition de l'ancienne maison des Sœurs du Christ, au cœur du castrum, pour y creer un pole culturel regroupant une mediatheque, un musee du Pays de Cocagne et des archives anciennes.</p><p>Le musee, actuellement en restructuration, organise plusieurs grandes manifestations temporaires (mai/aout et octobre/decembre) dans sa chapelle d'exposition.</p>",
	},
	{
		page: "vivre-a-lavaur",
		id: "sport",
		title: "Sport & associations",
		position: 4,
		html: "<p>Lavaur est une ville sportive par excellence, dont le tissu associatif local affiche des succes au niveau national et international. La sensibilisation au sport du plus grand nombre est une priorite municipale.</p><p>La ville propose <strong>Sport Juillet</strong>, un programme estival cree avec les associations locales pour decouvrir cinq disciplines sportives differentes, et a obtenu le label Maison Sport Sante.</p><p>La vie associative est riche et variee : soutien aux associations, subventions, reservation d'espaces (halle aux grains, halle d'Occitanie) et guide des manifestations sont proposes par la mairie.</p>",
	},
	{
		page: "vivre-a-lavaur",
		id: "sante-securite",
		title: "Sante & securite",
		position: 5,
		html: "<p>Lavaur dispose d'un centre hospitalier en partenariat avec le CHU de Toulouse depuis 2009. Depuis 2024, il propose des consultations specialisees (cardiologie, rhumatologie, orthopedie, neurologie...), une unite de court-sejour geriatrique, une unite douleur et memoire, un service de radiologie avec mammographie 3D, et une equipe psychiatrique specialisee. Les urgences fonctionnent de 8h a 20h.</p><p>Une permanence du Comite de la Ligue contre le Cancer se tient le 3e mercredi du mois (14h-16h30) a l'Espace Saint Roch.</p><p>Des permanences d'accompagnement pour les personnes en situation de handicap et leurs familles sont proposees par l'AFM Telethon a la Maison des associations (Bel Air).</p><p><strong>Police municipale</strong> : joignable 24h/24 et 7j/7 au 05 63 58 05 69.</p><p><strong>Centre Communal d'Action Sociale (CCAS)</strong> : accueille les habitants en difficulte financiere ou sociale et propose un soutien ponctuel et un accompagnement personnalise (service social, aides aux personnes agees et handicapees, portage de repas a domicile, logement social, Residence Autonomie pour les plus de 60 ans). A l'Espace Saint Roch, 2 rue de l'abattoir (2e etage), 81500 Lavaur. Ouvert du lundi au vendredi de 8h30 a 12h et de 14h a 17h (16h le vendredi).</p>",
	},
	{
		page: "vivre-a-lavaur",
		id: "mobilite",
		title: "Mobilite",
		position: 6,
		html: "<p><strong>L'Isatis</strong> : le bus urbain gratuit de la Ville de Lavaur, en service depuis le 1er septembre 2021.</p><p>Trois lignes regulieres desservent la ville : la ligne 1 (Les Lilas-Mairie / Les Violettes-Gare routiere), la ligne 2 (Gare SNCF / College les Clauzades, 13 points d'arret du lundi au samedi matin), et une ligne transversale desservant Bel-Air et le quartier des Vignes.</p><p>Tous les transports scolaires sont integres a l'Isatis, sans inscription ni paiement, avec accessibilite PMR et suivi en temps reel via l'application zenbus.</p><p>Contact : 05 31 81 96 35 - lisatis@ville-lavaur.fr</p>",
	},
	{
		page: "vivre-a-lavaur",
		id: "commerces",
		title: "Commerces & marche",
		position: 7,
		html: "<p>Commerces de centre-ville et marche hebdomadaire de Lavaur. Contenu a completer par la mairie.</p>",
	},
	// Tourisme
	{
		page: "tourisme",
		id: "monuments",
		title: "Monuments",
		position: 0,
		html: "<p>Lavaur est une cite d'histoire, au riche patrimoine architectural.</p><p><strong>La cathedrale Saint-Alain</strong>, monument religieux majeur de la ville, et <strong>l'Hotel de Ville</strong>, edifice municipal notable du centre historique, comptent parmi les incontournables du patrimoine vauréen.</p><p>Le <strong>jardin de l'Eveche</strong> accueille regulierement les rendez-vous estivaux de la ville (Jeudis au jardin, ceremonies commemoratives).</p>",
	},
	{
		page: "tourisme",
		id: "balades",
		title: "Balades",
		position: 1,
		html: "<p>Itineraires de randonnee et balades le long de l'Agout. Contenu a completer par l'office de tourisme.</p>",
	},
	{
		page: "tourisme",
		id: "restaurants-hebergements",
		title: "Restaurants & hebergements",
		position: 2,
		html: "<p>Selection de restaurants, hotels et chambres d'hotes a Lavaur et alentours.</p>",
	},
	{
		page: "tourisme",
		id: "office-de-tourisme",
		title: "Office de tourisme",
		position: 3,
		html: "<p>Coordonnees et horaires de l'office de tourisme du Vaurais, aupres de la mairie.</p>",
	},
];

async function seedPageSections() {
	for (const s of pageSections) {
		await sql`
			INSERT INTO page_sections (page_slug, section_id, title, body_html, position)
			VALUES (${s.page}, ${s.id}, ${s.title}, ${s.html}, ${s.position})
			ON CONFLICT (page_slug, section_id) DO NOTHING
		`;
	}
}

async function main() {
	console.log("Creating tables...");
	await createTables();
	console.log("Seeding actualites...");
	await seedActualites();
	console.log("Seeding evenements...");
	await seedEvenements();
	console.log("Seeding demarches...");
	await seedDemarches();
	console.log("Seeding coordonnees...");
	await seedCoordonnees();
	console.log("Seeding page sections...");
	await seedPageSections();
	console.log("Done.");
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
