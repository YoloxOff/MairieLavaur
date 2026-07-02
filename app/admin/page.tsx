import Link from "next/link";
import { getActualites } from "@/lib/data/actualites";
import { getEvenements } from "@/lib/data/evenements";
import { getDemarches } from "@/lib/data/demarches";

export default async function AdminDashboard() {
	const [actualites, evenements, demarches] = await Promise.all([getActualites(), getEvenements(), getDemarches()]);

	const cards = [
		{ label: "Actualites", count: actualites.length, href: "/admin/actualites" },
		{ label: "Evenements (agenda)", count: evenements.length, href: "/admin/agenda" },
		{ label: "Demarches", count: demarches.length, href: "/admin/demarches" },
	];

	return (
		<div>
			<h1 className="text-2xl font-bold text-institution-900 mb-1">Tableau de bord</h1>
			<p className="text-institution-600 mb-8">Gerez le contenu du site de la Ville de Lavaur.</p>

			<div className="grid gap-4 sm:grid-cols-3 mb-10">
				{cards.map((c) => (
					<Link key={c.href} href={c.href} className="card p-5 block hover:shadow-md">
						<p className="text-3xl font-bold text-institution-800">{c.count}</p>
						<p className="text-sm text-institution-600 mt-1">{c.label}</p>
					</Link>
				))}
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				<Link href="/admin/pages" className="card p-5 block hover:shadow-md">
					<p className="font-semibold text-institution-900">Contenu des pages</p>
					<p className="text-sm text-institution-600 mt-1">Editer les sections de La Ville, Vie municipale, Vivre a Lavaur, Tourisme.</p>
				</Link>
				<Link href="/admin/coordonnees" className="card p-5 block hover:shadow-md">
					<p className="font-semibold text-institution-900">Coordonnees de la mairie</p>
					<p className="text-sm text-institution-600 mt-1">Adresse, telephone, email, horaires affiches sur tout le site.</p>
				</Link>
			</div>
		</div>
	);
}
