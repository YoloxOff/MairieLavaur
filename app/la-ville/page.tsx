import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import SectionBlock, { PageHero, type SectionData } from "@/components/SectionBlock";
import Map from "@/components/Map";

export const metadata: Metadata = { title: "La Ville" };

const sections: SectionData[] = [
	{
		id: "presentation",
		title: "Presentation",
		body: (
			<>
				<p>Lavaur est une cite d&apos;histoire, au riche patrimoine architectural, situee dans le Tarn.</p>
				<p>La ville se classe premiere de sa categorie pour la qualite de vie dans le Tarn, et figure parmi les destinations privilegiees pour s&apos;installer pres de Toulouse.</p>
			</>
		),
	},
	{
		id: "histoire",
		title: "Un peu d'histoire",
		body: <p>Cite d&apos;histoire, Lavaur a construit au fil des siecles un patrimoine architectural riche, aujourd&apos;hui mis en valeur autour de son castrum et de ses monuments.</p>,
	},
	{
		id: "patrimoine",
		title: "Patrimoine : la cathedrale Saint-Alain et l'Hotel de Ville",
		body: (
			<>
				<p>La <strong>cathedrale Saint-Alain</strong> est le monument religieux majeur de la ville.</p>
				<p><strong>L&apos;Hotel de Ville</strong> est un edifice municipal notable du centre historique.</p>
				<p>En 2001, la Ville de Lavaur a fait l&apos;acquisition de l&apos;ancienne maison des Sœurs du Christ, vaste edifice et jardins situes au cœur du castrum, pour y creer un pole culturel regroupant une mediatheque, un musee et des archives anciennes.</p>
			</>
		),
	},
	{
		id: "quartiers",
		title: "Quartiers",
		body: <p>Presentation des quartiers de la ville et de leurs conseils de quartier. Contenu a completer par la mairie.</p>,
	},
	{
		id: "plan-interactif",
		title: "Plan interactif",
		body: <Map height="420" />,
	},
	{
		id: "economie",
		title: "Economie",
		body: (
			<p>
				Autrefois eveche et sous-prefecture, Lavaur est devenue le moteur du troisieme pole economique tarnais, apres Castres et Albi. Zones d&apos;activites, commerces de centre-ville et acteurs economiques locaux animent le tissu economique de la ville.
			</p>
		),
	},
	{
		id: "environnement",
		title: "Environnement",
		body: <p>Actions municipales en faveur de la transition ecologique et de la biodiversite. Contenu a completer par la mairie.</p>,
	},
	{
		id: "galerie",
		title: "Galerie photos & videos",
		body: <p>Galerie a alimenter avec des photos et videos de la ville.</p>,
	},
];

export default function LaVillePage() {
	return (
		<>
			<PageHero title="La Ville" description="Decouvrez Lavaur : son histoire, son patrimoine, ses quartiers et son cadre de vie au bord de l'Agout." />
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
				<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "La Ville" }]} />
			</div>
			{sections.map((section, i) => (
				<SectionBlock key={section.id} section={section} index={i} />
			))}
		</>
	);
}
