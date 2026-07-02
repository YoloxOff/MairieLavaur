import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { demarcheCategories } from "@/lib/content/demarches";
import { getDemarches } from "@/lib/data/demarches";

export const metadata: Metadata = { title: "Demarches" };

export default async function DemarchesPage() {
	const all = await getDemarches();

	return (
		<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
			<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Demarches" }]} />
			<h1 className="section-title mb-2">Demarches</h1>
			<p className="text-institution-600 mb-10">
				Naissance, mariage, deces, carte d&apos;identite, passeport, urbanisme, elections... Retrouvez toutes vos demarches et leurs formulaires.
			</p>

			{demarcheCategories.map((cat) => {
				const items = all.filter((d) => d.category === cat);
				if (items.length === 0) return null;
				return (
					<div key={cat} id={cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="mb-10 scroll-mt-24">
						<h2 className="text-lg font-semibold text-institution-900 mb-4">{cat}</h2>
						<ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
							{items.map((d) => (
								<li key={d.slug}>
									<Link href={`/demarches/${d.slug}`} className="card flex items-center justify-between gap-3 px-4 py-3">
										<span className="font-medium text-institution-800">{d.title}</span>
										<svg className="h-4 w-4 text-institution-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
											<polyline points="9 18 15 12 9 6" />
										</svg>
									</Link>
								</li>
							))}
						</ul>
					</div>
				);
			})}
		</section>
	);
}
