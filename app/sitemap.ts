import type { MetadataRoute } from "next";
import { actualites } from "@/lib/content/actualites";
import { evenements } from "@/lib/content/evenements";
import { demarches } from "@/lib/content/demarches";
import { primaryNav } from "@/lib/nav";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
	const staticRoutes: MetadataRoute.Sitemap = primaryNav
		.filter((item) => !item.href.includes("#"))
		.map((item) => ({ url: `${siteUrl}${item.href}`, lastModified: new Date() }));

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
