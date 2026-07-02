import type { MetadataRoute } from "next";
import { getActualites } from "@/lib/data/actualites";
import { getEvenements } from "@/lib/data/evenements";
import { getDemarches } from "@/lib/data/demarches";
import { primaryNav, quickLinks } from "@/lib/nav";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const allHrefs = [...primaryNav.map((item) => item.href), ...quickLinks.map((link) => link.href)];
	const uniquePaths = Array.from(new Set(allHrefs.filter((href) => !href.includes("#"))));
	const staticRoutes: MetadataRoute.Sitemap = uniquePaths.map((href) => ({ url: `${siteUrl}${href}`, lastModified: new Date() }));

	const [actualites, evenements, demarches] = await Promise.all([getActualites(), getEvenements(), getDemarches()]);

	const actualiteRoutes: MetadataRoute.Sitemap = actualites.map((a) => ({
		url: `${siteUrl}/actualites/${a.slug}`,
		lastModified: new Date(a.date),
	}));

	const evenementRoutes: MetadataRoute.Sitemap = evenements.map((e) => ({
		url: `${siteUrl}/agenda/${e.slug}`,
		lastModified: new Date(),
	}));

	const demarcheRoutes: MetadataRoute.Sitemap = demarches.map((d) => ({
		url: `${siteUrl}/demarches/${d.slug}`,
		lastModified: new Date(),
	}));

	return [...staticRoutes, ...actualiteRoutes, ...evenementRoutes, ...demarcheRoutes];
}
