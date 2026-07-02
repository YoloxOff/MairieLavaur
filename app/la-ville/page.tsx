import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import SectionBlock, { PageHero, type SectionData } from "@/components/SectionBlock";
import Map from "@/components/Map";

export const metadata: Metadata = { title: "La Ville" };

const sections: SectionData[] = [
	{
		id: "presentation",
		title: "Presentation",
		body: <p>Sous-prefecture du Tarn, Lavaur est une ville d&apos;art et d&apos;histoire situee au bord de l&apos;Agout, entre Toulouse et Albi. Contenu a completer par la mairie.</p>,
	},
	{
		id: "histoire",
		title: "Histoire",
		body: <p>Fondee au haut Moyen Age, Lavaur a traverse la croisade des Albigeois et conserve un patrimoine historique riche. Contenu a completer par la mairie.</p>,
	},
	{
		id: "patrimoine",
		title: "Patrimoine",
		body: <p>Cathedrale Saint-Alain, jardin de l&apos;Eveche, pont de pierre... le patrimoine vauréen se decouvre au fil des rues. Contenu a completer par la mairie.</p>,
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
		body: <p>Zones d&apos;activites, commerces de centre-ville et acteurs economiques locaux. Contenu a completer par la mairie.</p>,
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
