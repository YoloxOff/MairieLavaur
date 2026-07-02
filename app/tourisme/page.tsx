import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import SectionBlock, { PageHero, type SectionData } from "@/components/SectionBlock";
import Map from "@/components/Map";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Tourisme" };

const sections: SectionData[] = [
	{ id: "monuments", title: "Monuments", body: <p>Cathedrale Saint-Alain, jardin de l&apos;Eveche, tour des Rondes... Contenu a completer par l&apos;office de tourisme.</p> },
	{ id: "balades", title: "Balades", body: <p>Itineraires de randonnee et balades le long de l&apos;Agout.</p> },
	{ id: "restaurants-hebergements", title: "Restaurants & hebergements", body: <p>Selection de restaurants, hotels et chambres d&apos;hotes a Lavaur et alentours.</p> },
	{ id: "office-de-tourisme", title: "Office de tourisme", body: <p>Coordonnees et horaires de l&apos;office de tourisme du Vaurais.</p> },
];

export default function TourismePage() {
	return (
		<>
			<PageHero title="Tourisme" description="Decouvrir Lavaur : monuments, balades, gastronomie et hebergements." />
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
				<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Tourisme" }]} />
			</div>
			{sections.map((section, i) => (
				<SectionBlock key={section.id} section={section} index={i} />
			))}
			<section className="bg-surface-light">
				<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
					<Reveal>
						<h2 className="section-title mb-4">Carte interactive</h2>
						<Map height="420" />
					</Reveal>
				</div>
			</section>
		</>
	);
}
