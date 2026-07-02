import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = { title: "Accessibilite" };

export default function AccessibilitePage() {
	return (
		<article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
			<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Accessibilite" }]} />
			<h1 className="text-3xl sm:text-4xl font-bold text-institution-900 mb-6">Declaration d&apos;accessibilite</h1>
			<div className="prose prose-institution max-w-none">
				<p>La Ville de Lavaur s&apos;engage a rendre son site internet accessible conformement au RGAA (Referentiel General d&apos;Amelioration de l&apos;Accessibilite).</p>
				<p>Cette declaration sera mise a jour a l&apos;issue d&apos;un audit RGAA complet, une fois le contenu editorial final integre.</p>
				<h2>Etat de conformite</h2>
				<p>Partiellement conforme : navigation clavier, textes alternatifs et contrastes ont ete pris en compte des la conception, mais un audit formel reste a mener.</p>
			</div>
		</article>
	);
}
