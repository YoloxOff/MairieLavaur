import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ShareLinks from "@/components/ShareLinks";
import ActuThumbnail from "@/components/ActuThumbnail";
import { actualites, getActualiteBySlug } from "@/lib/content/actualites";

export function generateStaticParams() {
	return actualites.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const actu = getActualiteBySlug(slug);
	if (!actu) return {};
	return { title: actu.title, description: actu.excerpt };
}

export default async function ActualiteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const actu = getActualiteBySlug(slug);
	if (!actu) notFound();

	const related = actualites.filter((a) => a.category === actu.category && a.slug !== actu.slug).slice(0, 3);
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

	return (
		<>
			<article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
				<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Actualites", href: "/actualites" }, { label: actu.title }]} />

				<p className="text-xs font-semibold uppercase tracking-wide text-occitan-terracotta mb-2">{actu.category}</p>
				<h1 className="text-3xl sm:text-4xl font-bold text-institution-900 mb-3">{actu.title}</h1>
				<p className="text-sm text-institution-500 mb-8">
					Publie le {new Date(actu.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} par {actu.author}
				</p>

				<ActuThumbnail image={actu.image} alt={actu.title} className="w-full h-64 rounded-xl mb-8" />

				<div className="prose prose-institution max-w-none prose-headings:text-institution-900 prose-a:text-institution-700">
					{actu.content.map((p, i) => (
						<p key={i}>{p}</p>
					))}
				</div>

				<div className="mt-10 pt-6 border-t border-institution-100">
					<p className="text-sm font-semibold text-institution-700 mb-3">Partager cet article</p>
					<ShareLinks url={`${siteUrl}/actualites/${actu.slug}`} title={actu.title} />
				</div>
			</article>

			{related.length > 0 && (
				<section className="bg-surface-light py-16">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="section-title mb-8">A lire aussi</h2>
						<div className="grid gap-6 md:grid-cols-3">
							{related.map((r) => (
								<article key={r.slug} className="card p-5">
									<h3 className="font-semibold text-institution-900 mb-2">
										<Link href={`/actualites/${r.slug}`} className="hover:underline">
											{r.title}
										</Link>
									</h3>
									<p className="text-sm text-institution-600">{r.excerpt}</p>
								</article>
							))}
						</div>
					</div>
				</section>
			)}
		</>
	);
}
