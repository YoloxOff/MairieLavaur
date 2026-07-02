import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import SectionBlock, { PageHero, type SectionData } from "@/components/SectionBlock";
import { isatis } from "@/lib/coordonnees";

export const metadata: Metadata = { title: "Vivre a Lavaur" };

const sections: SectionData[] = [
	{
		id: "petite-enfance",
		title: "Petite enfance",
		body: <p>La ville propose des services destines aux jeunes enfants. Renseignements aupres de la mairie pour les creches et le relais petite enfance.</p>,
	},
	{
		id: "education",
		title: "Ecoles, colleges, lycees",
		body: (
			<>
				<p>La ville de Lavaur compte plusieurs etablissements scolaires, publics et prives, de qualite.</p>
				<p>Le restaurant scolaire confectionne 1 200 repas par jour avec un maximum de produits frais et en liaison chaude, pour tous les etablissements publics et prives.</p>
				<p>Une antenne locale du Conservatoire de Musique et de Danse du Tarn, geree par la CCTA, est egalement disponible, ainsi que des echanges et jumelages scolaires.</p>
			</>
		),
	},
	{
		id: "jeunesse",
		title: "Jeunesse et loisirs",
		body: (
			<>
				<p>La ville propose un programme riche et diversifie pour les jeunes, organise autour de plusieurs structures.</p>
				<p><strong>Le Centre de loisirs des Clauzades</strong> accueille les enfants pendant les vacances et sur les temps periscolaires.</p>
				<p><strong>L&apos;Espace Jeunesse Municipal</strong> s&apos;adresse aux 11-25 ans, avec deux implantations : pres du lycee Las Cases et au college des Clauzades.</p>
				<p><strong>Les ALAE</strong> (Accueils Loisirs Associes a l&apos;Ecole) assurent la continuite des temps scolaires et periscolaires durant l&apos;annee.</p>
				<p><strong>Les sejours</strong> offrent aux jeunes des moments pour faire du sport, s&apos;oxygener, vivre en groupe et tisser du lien social.</p>
			</>
		),
	},
	{
		id: "culture",
		title: "Culture & bibliotheque",
		body: (
			<>
				<p>En 2001, la Ville de Lavaur a fait l&apos;acquisition de l&apos;ancienne maison des Sœurs du Christ, au cœur du castrum, pour y creer un pole culturel regroupant une mediatheque, un musee du Pays de Cocagne et des archives anciennes.</p>
				<p>Le musee, actuellement en restructuration, organise plusieurs grandes manifestations temporaires (mai/aout et octobre/decembre) dans sa chapelle d&apos;exposition.</p>
			</>
		),
	},
	{
		id: "sport",
		title: "Sport & associations",
		body: (
			<>
				<p>Lavaur est une ville sportive par excellence, dont le tissu associatif local affiche des succes au niveau national et international. La sensibilisation au sport du plus grand nombre est une priorite municipale.</p>
				<p>La ville propose <strong>Sport Juillet</strong>, un programme estival cree avec les associations locales pour decouvrir cinq disciplines sportives differentes, et a obtenu le label Maison Sport Sante.</p>
				<p>La vie associative est riche et variee : soutien aux associations, subventions, reservation d&apos;espaces (halle aux grains, halle d&apos;Occitanie) et guide des manifestations sont proposes par la mairie.</p>
			</>
		),
	},
	{
		id: "sante-securite",
		title: "Sante & securite",
		body: (
			<>
				<p>Lavaur dispose d&apos;un centre hospitalier en partenariat avec le CHU de Toulouse depuis 2009. Depuis 2024, il propose des consultations specialisees (cardiologie, rhumatologie, orthopedie, neurologie...), une unite de court-sejour geriatrique, une unite douleur et memoire, un service de radiologie avec mammographie 3D, et une equipe psychiatrique specialisee. Les urgences fonctionnent de 8h a 20h.</p>
				<p>Une permanence du Comite de la Ligue contre le Cancer se tient le 3e mercredi du mois (14h-16h30) a l&apos;Espace Saint Roch.</p>
				<p>Des permanences d&apos;accompagnement pour les personnes en situation de handicap et leurs familles sont proposees par l&apos;AFM Telethon a la Maison des associations (Bel Air).</p>
				<p><strong>Police municipale</strong> : joignable 24h/24 et 7j/7 au 05 63 58 05 69.</p>
				<p>
					<strong>Centre Communal d&apos;Action Sociale (CCAS)</strong> : accueille les habitants en difficulte financiere ou sociale et propose un soutien ponctuel et un accompagnement personnalise (service social, aides aux personnes agees et handicapees, portage de repas a domicile, logement social, Residence Autonomie pour les plus de 60 ans).
					A l&apos;Espace Saint Roch, 2 rue de l&apos;abattoir (2e etage), 81500 Lavaur. Ouvert du lundi au vendredi de 8h30 a 12h et de 14h a 17h (16h le vendredi).
				</p>
			</>
		),
	},
	{
		id: "mobilite",
		title: "Mobilite",
		body: (
			<>
				<p>
					<strong>{isatis.nom}</strong> : {isatis.description}
				</p>
				<p>Trois lignes regulieres desservent la ville : la ligne 1 (Les Lilas-Mairie / Les Violettes-Gare routiere), la ligne 2 (Gare SNCF / College les Clauzades, 13 points d&apos;arret du lundi au samedi matin), et une ligne transversale desservant Bel-Air et le quartier des Vignes.</p>
				<p>Tous les transports scolaires sont integres a l&apos;Isatis, sans inscription ni paiement, avec accessibilite PMR et suivi en temps reel via l&apos;application zenbus.</p>
				<p>
					Contact : {isatis.telephone} - {isatis.email}
				</p>
			</>
		),
	},
	{ id: "commerces", title: "Commerces & marche", body: <p>Commerces de centre-ville et marche hebdomadaire de Lavaur. Contenu a completer par la mairie.</p> },
];

export default function VivreALavaurPage() {
	return (
		<>
			<PageHero title="Vivre a Lavaur" description="Petite enfance, ecoles, culture, sport, sante, mobilite : tous les services du quotidien." />
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
				<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Vivre a Lavaur" }]} />
			</div>
			{sections.map((section, i) => (
				<SectionBlock key={section.id} section={section} index={i} />
			))}
		</>
	);
}
