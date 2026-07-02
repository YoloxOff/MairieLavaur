import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import Footer from "@/components/Footer";
import { getMairie } from "@/lib/data/coordonnees";

const publicSans = Public_Sans({
	subsets: ["latin"],
	variable: "--font-public-sans",
	display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "Ville de Lavaur - Site officiel",
		template: "%s | Ville de Lavaur",
	},
	description: "Site officiel de la Ville de Lavaur : actualites, demarches en ligne, agenda et services municipaux.",
	openGraph: {
		siteName: "Ville de Lavaur",
		type: "website",
		locale: "fr_FR",
	},
	twitter: {
		card: "summary_large_image",
	},
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const mairie = await getMairie();

	return (
		<html lang="fr" className={publicSans.variable}>
			<body className="font-sans text-institution-900">
				<a className="skip-link" href="#main-content">
					Aller au contenu principal
				</a>

				<SiteChrome footer={<Footer />}>{children}</SiteChrome>

				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "GovernmentOrganization",
							name: "Ville de Lavaur",
							url: siteUrl,
							telephone: mairie.telephone,
							email: mairie.email,
							address: {
								"@type": "PostalAddress",
								streetAddress: `${mairie.adresseLigne1}, ${mairie.adresseLigne2}`,
								postalCode: mairie.codePostal,
								addressLocality: mairie.ville,
								addressCountry: "FR",
							},
						}),
					}}
				/>
			</body>
		</html>
	);
}
