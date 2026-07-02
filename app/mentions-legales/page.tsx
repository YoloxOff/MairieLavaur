import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = { title: "Mentions legales" };

export default function MentionsLegalesPage() {
	return (
		<article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
			<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Mentions legales" }]} />
			<h1 className="text-3xl sm:text-4xl font-bold text-institution-900 mb-6">Mentions legales</h1>
			<div className="prose prose-institution max-w-none">
				<p>
					<strong>Editeur du site :</strong> Mairie de Lavaur, Place du Plô, 81500 Lavaur.
				</p>
				<p>
					<strong>Directeur de la publication :</strong> Le Maire de Lavaur.
				</p>
				<p>
					<strong>Hebergement :</strong> a completer avec les coordonnees de l&apos;hebergeur retenu.
				</p>
				<p className="text-sm text-institution-500">Contenu a completer par les services juridiques de la mairie avant mise en production.</p>
			</div>
		</article>
	);
}
