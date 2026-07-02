import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { demarches, getDemarcheBySlug } from "@/lib/content/demarches";

export function generateStaticParams() {
	return demarches.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const d = getDemarcheBySlug(slug);
	if (!d) return {};
	return { title: d.title };
}

export default async function DemarcheDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const d = getDemarcheBySlug(slug);
	if (!d) notFound();

	return (
		<article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
			<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Demarches", href: "/demarches" }, { label: d.title }]} />
			<p className="text-xs font-semibold uppercase tracking-wide text-occitan-terracotta mb-2">{d.category}</p>
			<h1 className="text-3xl sm:text-4xl font-bold text-institution-900 mb-6">{d.title}</h1>

			<div className="prose prose-institution max-w-none prose-headings:text-institution-900 prose-a:text-institution-700">
				{d.content.map((p, i) => (
					<p key={i}>{p}</p>
				))}
			</div>

			<div className="mt-10 flex flex-wrap gap-3">
				{d.lienEnLigne && (
					<a href={d.lienEnLigne} className="btn-primary" target="_blank" rel="noopener noreferrer">
						Effectuer cette demarche en ligne
					</a>
				)}
				<a href="/contact" className="btn-secondary">
					Contacter le service concerne
				</a>
			</div>
		</article>
	);
}
