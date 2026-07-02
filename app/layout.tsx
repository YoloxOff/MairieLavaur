import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { mairie } from "@/lib/coordonnees";
import { quickLinks } from "@/lib/nav";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="fr" className={publicSans.variable}>
			<body className="font-sans text-institution-900">
				<a className="skip-link" href="#main-content">
					Aller au contenu principal
				</a>

				<div className="bg-institution-900 text-institution-100 text-sm">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 py-1.5 overflow-x-auto">
						<div className="flex items-center gap-4 shrink-0">
							<span className="hidden sm:inline text-institution-300">Liens rapides :</span>
							{quickLinks.map((link) => (
								<a key={link.href} href={link.href} className="hover:text-white whitespace-nowrap">
									{link.label}
								</a>
							))}
						</div>
						<div className="flex items-center gap-4 shrink-0">
							<a href="/contact#urgences" className="hover:text-white flex items-center gap-1 whitespace-nowrap">
								<span aria-hidden="true">☎</span> Numeros utiles
							</a>
							<a href="/services-municipaux#rendez-vous" className="hover:text-white whitespace-nowrap">
								Prendre rendez-vous
							</a>
						</div>
					</div>
				</div>

				<Header />

				<main id="main-content">{children}</main>

				<Footer />
				<CookieBanner />

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
