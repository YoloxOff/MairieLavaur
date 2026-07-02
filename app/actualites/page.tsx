import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ActuThumbnail from "@/components/ActuThumbnail";
import { actualites, actualiteCategories } from "@/lib/content/actualites";

export const metadata: Metadata = { title: "Actualites" };

export default async function ActualitesPage({
	searchParams,
}: {
	searchParams: Promise<{ categorie?: string; recherche?: string }>;
}) {
	const { categorie, recherche } = await searchParams;

	let items = actualites;
	if (categorie) {
		items = items.filter((a) => a.category.toLowerCase() === categorie.toLowerCase());
	}
	if (recherche) {
		const q = recherche.toLowerCase();
		items = items.filter((a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q));
	}

	return (
		<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
			<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Actualites" }]} />
			<h1 className="section-title mb-2">Actualites</h1>
			<p className="text-institution-600 mb-8">
				Toute l&apos;actualite de la ville : vie municipale, culture, travaux, jeunesse, sport, associations, economie, education.
			</p>

			<form method="get" className="flex flex-wrap gap-3 mb-8">
				<label htmlFor="recherche-actu" className="sr-only">
					Rechercher une actualite
				</label>
				<input
					type="search"
					id="recherche-actu"
					name="recherche"
					defaultValue={recherche || ""}
					placeholder="Rechercher..."
					className="rounded-full border border-institution-200 px-4 py-2 text-sm flex-1 min-w-[200px]"
				/>
				{categorie && <input type="hidden" name="categorie" value={categorie} />}
				<button type="submit" className="btn-secondary">
					Rechercher
				</button>
			</form>

			<ul className="flex flex-wrap gap-2 mb-10">
				<li>
					<Link
						href="/actualites"
						className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium ${
							!categorie ? "bg-institution-800 text-white" : "bg-institution-50 text-institution-700 hover:bg-institution-100"
						}`}
					>
						Toutes
					</Link>
				</li>
				{actualiteCategories.map((cat) => (
					<li key={cat}>
						<Link
							href={`/actualites?categorie=${encodeURIComponent(cat)}`}
							className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium ${
								categorie?.toLowerCase() === cat.toLowerCase()
									? "bg-institution-800 text-white"
									: "bg-institution-50 text-institution-700 hover:bg-institution-100"
							}`}
						>
							{cat}
						</Link>
					</li>
				))}
			</ul>

			{items.length > 0 ? (
				<div className="grid gap-6 md:grid-cols-3">
					{items.map((actu) => (
						<article key={actu.slug} className="card">
							<Link href={`/actualites/${actu.slug}`} className="block">
								<ActuThumbnail image={actu.image} alt={actu.title} />
								<div className="p-5">
									<p className="text-xs font-semibold uppercase tracking-wide text-occitan-terracotta mb-2">
										{new Date(actu.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
									</p>
									<h2 className="font-semibold text-institution-900 mb-2">{actu.title}</h2>
									<p className="text-sm text-institution-600">{actu.excerpt}</p>
								</div>
							</Link>
						</article>
					))}
				</div>
			) : (
				<p className="text-institution-600">Aucune actualite ne correspond a votre recherche.</p>
			)}
		</section>
	);
}
