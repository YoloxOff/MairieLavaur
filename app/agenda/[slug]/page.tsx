import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ShareLinks from "@/components/ShareLinks";
import Map from "@/components/Map";
import ActuThumbnail from "@/components/ActuThumbnail";
import { getEvenements, getEvenementBySlug } from "@/lib/data/evenements";

export async function generateStaticParams() {
	const items = await getEvenements();
	return items.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const ev = await getEvenementBySlug(slug);
	if (!ev) return {};
	return { title: ev.title };
}

function formatEventDate(dateDebut: string, dateFin?: string) {
	const debut = new Date(dateDebut);
	const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" };
	let out = debut.toLocaleDateString("fr-FR", opts);
	if (dateFin) {
		const fin = new Date(dateFin);
		if (fin.toDateString() !== debut.toDateString()) {
			out += ` → ${fin.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`;
		}
	}
	return out;
}

export default async function EvenementDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const ev = await getEvenementBySlug(slug);
	if (!ev) notFound();

	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

	return (
		<article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
			<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Agenda", href: "/agenda" }, { label: ev.title }]} />

			<p className="text-xs font-semibold uppercase tracking-wide text-occitan-terracotta mb-2">{ev.category}</p>
			<h1 className="text-3xl sm:text-4xl font-bold text-institution-900 mb-4">{ev.title}</h1>

			<div className="card p-5 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
				<div>
					<p className="text-sm font-semibold text-institution-800">{formatEventDate(ev.dateDebut, ev.dateFin)}</p>
					<p className="text-sm text-institution-600">{ev.lieu}</p>
				</div>
				{ev.inscriptionRequise && (
					<a href={ev.inscriptionUrl || "/contact"} className="btn-primary sm:ml-auto">
						S&apos;inscrire a cet evenement
					</a>
				)}
			</div>

			{ev.image && <ActuThumbnail image={ev.image} alt={ev.title} className="w-full h-64 rounded-xl mb-8" />}

			<div className="prose prose-institution max-w-none prose-headings:text-institution-900 prose-a:text-institution-700">
				{ev.content.map((p, i) => (
					<p key={i}>{p}</p>
				))}
			</div>

			<div className="mt-10">
				<h2 className="section-title !text-lg mb-4">Lieu</h2>
				<Map height="320" query={`${ev.lieu}, Lavaur`} />
			</div>

			<div className="mt-10 pt-6 border-t border-institution-100">
				<p className="text-sm font-semibold text-institution-700 mb-3">Partager cet evenement</p>
				<ShareLinks url={`${siteUrl}/agenda/${ev.slug}`} title={ev.title} />
			</div>
		</article>
	);
}
