"use client";

import { useState } from "react";
import Link from "next/link";
import type { Evenement } from "@/lib/content/evenements";

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

type CalendarDay = { day: number; titles: string[] };

export default function AgendaViews({
	events,
	monthLabel,
	firstDayOfWeek,
	daysInMonth,
	daysWithEvents,
}: {
	events: Evenement[];
	monthLabel: string;
	firstDayOfWeek: number; // 1 (lundi) .. 7 (dimanche)
	daysInMonth: number;
	daysWithEvents: Record<number, string[]>;
}) {
	const [view, setView] = useState<"liste" | "calendrier">("liste");

	const leadingBlanks = Array.from({ length: firstDayOfWeek - 1 });
	const days: CalendarDay[] = Array.from({ length: daysInMonth }, (_, i) => ({
		day: i + 1,
		titles: daysWithEvents[i + 1] || [],
	}));

	return (
		<div>
			<div className="flex flex-wrap items-center justify-end gap-4 mb-8">
				<div className="inline-flex rounded-full bg-institution-50 p-1" role="tablist" aria-label="Mode d'affichage">
					<button
						type="button"
						role="tab"
						aria-selected={view === "liste"}
						onClick={() => setView("liste")}
						className={`rounded-full px-4 py-1.5 text-sm font-medium ${view === "liste" ? "bg-white shadow-sm text-institution-900" : "text-institution-600"}`}
					>
						Vue liste
					</button>
					<button
						type="button"
						role="tab"
						aria-selected={view === "calendrier"}
						onClick={() => setView("calendrier")}
						className={`rounded-full px-4 py-1.5 text-sm font-medium ${view === "calendrier" ? "bg-white shadow-sm text-institution-900" : "text-institution-600"}`}
					>
						Vue calendrier
					</button>
				</div>
			</div>

			{view === "calendrier" && (
				<div className="mb-10">
					<p className="font-semibold text-institution-800 mb-3 capitalize">{monthLabel}</p>
					<div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-institution-500 mb-1">
						{["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
							<div key={i}>{d}</div>
						))}
					</div>
					<div className="grid grid-cols-7 gap-1">
						{leadingBlanks.map((_, i) => (
							<div key={`blank-${i}`} />
						))}
						{days.map(({ day, titles }) => (
							<div
								key={day}
								className={`aspect-square rounded-lg border border-institution-100 p-1.5 text-left ${
									titles.length > 0 ? "bg-occitan-gold/10 ring-1 ring-occitan-gold" : ""
								}`}
							>
								<span className="text-xs text-institution-700">{day}</span>
								{titles.length > 0 && (
									<>
										<span className="block h-1.5 w-1.5 rounded-full bg-occitan-gold mt-1" aria-hidden="true" />
										<span className="sr-only">{titles.join(", ")}</span>
									</>
								)}
							</div>
						))}
					</div>
				</div>
			)}

			{view === "liste" &&
				(events.length > 0 ? (
					<ul className="space-y-4">
						{events.map((ev) => (
							<li key={ev.slug} className="card flex flex-col sm:flex-row sm:items-center gap-4 p-5">
								<div className="sm:w-52 shrink-0 text-sm font-semibold text-institution-800">{formatEventDate(ev.dateDebut, ev.dateFin)}</div>
								<div className="flex-1">
									<h2 className="font-semibold text-institution-900">
										<Link href={`/agenda/${ev.slug}`} className="hover:underline">
											{ev.title}
										</Link>
									</h2>
									<p className="text-sm text-institution-600">{ev.lieu}</p>
								</div>
								{ev.inscriptionRequise && (
									<span className="shrink-0 inline-flex items-center rounded-full bg-occitan-terracotta/10 text-occitan-terracotta text-xs font-semibold px-3 py-1">
										Inscription requise
									</span>
								)}
							</li>
						))}
					</ul>
				) : (
					<p className="text-institution-600">Aucun evenement a venir pour cette categorie.</p>
				))}
		</div>
	);
}
