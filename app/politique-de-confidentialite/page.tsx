import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = { title: "Politique de confidentialite" };

export default function PolitiqueConfidentialitePage() {
	return (
		<article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
			<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Politique de confidentialite" }]} />
			<h1 className="text-3xl sm:text-4xl font-bold text-institution-900 mb-6">Politique de confidentialite</h1>
			<div className="prose prose-institution max-w-none">
				<h2>Donnees collectees</h2>
				<p>Le site collecte les donnees transmises via le formulaire de contact (nom, email, message) et le formulaire d&apos;inscription a la newsletter (email).</p>
				<h2>Cookies</h2>
				<p>Un bandeau de consentement permet d&apos;accepter ou de refuser les cookies de mesure d&apos;audience avant tout depot.</p>
				<h2>Vos droits</h2>
				<p>Conformement au RGPD, vous disposez d&apos;un droit d&apos;acces, de rectification et de suppression de vos donnees. Contactez la mairie pour exercer ce droit.</p>
				<p className="text-sm text-institution-500">Contenu a completer par le delegue a la protection des donnees (DPO) de la mairie.</p>
			</div>
		</article>
	);
}
