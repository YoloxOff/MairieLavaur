import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import AgendaViews from "@/components/AgendaViews";
import { evenementCategories } from "@/lib/content/evenements";
import { getUpcomingEvenements } from "@/lib/data/evenements";

export const metadata: Metadata = { title: "Agenda" };

export default async function AgendaPage({ searchParams }: { searchParams: Promise<{ categorie?: string }> }) {
	const { categorie } = await searchParams;
	const events = await getUpcomingEvenements(categorie);

	const now = new Date();
	const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
	const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
	const jsDay = monthStart.getDay(); // 0 (dimanche) .. 6 (samedi)
	const firstDayOfWeek = jsDay === 0 ? 7 : jsDay; // 1 (lundi) .. 7 (dimanche)

	const daysWithEvents: Record<number, string[]> = {};
	for (const ev of events) {
		const d = new Date(ev.dateDebut);
		if (d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()) {
			daysWithEvents[d.getDate()] = [...(daysWithEvents[d.getDate()] || []), ev.title];
		}
	}

	return (
		<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
			<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Agenda" }]} />
			<h1 className="section-title mb-2">Agenda</h1>
			<p className="text-institution-600 mb-8">Culture, sport, jeunesse, associations, commemorations : tous les evenements a venir a Lavaur.</p>

			<ul className="flex flex-wrap gap-2 mb-4">
				<li>
					<Link
						href="/agenda"
						className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium ${
							!categorie ? "bg-institution-800 text-white" : "bg-institution-50 text-institution-700 hover:bg-institution-100"
						}`}
					>
						Tous
					</Link>
				</li>
				{evenementCategories.map((cat) => (
					<li key={cat}>
						<Link
							href={`/agenda?categorie=${encodeURIComponent(cat)}`}
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

			<AgendaViews
				events={events}
				monthLabel={monthStart.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
				firstDayOfWeek={firstDayOfWeek}
				daysInMonth={daysInMonth}
				daysWithEvents={daysWithEvents}
			/>
		</section>
	);
}
