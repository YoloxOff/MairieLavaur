"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import CookieBanner from "./CookieBanner";
import { quickLinks } from "@/lib/nav";

// Keeps the admin area free of the public header/footer/cookie banner
// without needing a second root layout (route group restructure).
// Footer is a Server Component (fetches coordonnees from the DB), so it's
// rendered by the root layout and passed in as a prop rather than imported
// directly here (this file is a Client Component for usePathname()).
export default function SiteChrome({ children, footer }: { children: React.ReactNode; footer: React.ReactNode }) {
	const pathname = usePathname();
	const isAdmin = pathname?.startsWith("/admin");

	if (isAdmin) {
		return <>{children}</>;
	}

	return (
		<>
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

			{footer}
			<CookieBanner />
		</>
	);
}
