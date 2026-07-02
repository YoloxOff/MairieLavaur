"use client";

import { useActionState } from "react";
import { adminInitialState, type FormState } from "../formState";
import { evenementCategories, type Evenement } from "@/lib/content/evenements";

function toLocalInput(iso?: string): string {
	if (!iso) return "";
	const d = new Date(iso);
	const pad = (n: number) => String(n).padStart(2, "0");
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function EvenementForm({
	action,
	initial,
}: {
	action: (prev: FormState, formData: FormData) => Promise<FormState>;
	initial?: Evenement;
}) {
	const [state, formAction, pending] = useActionState(action, adminInitialState);

	return (
		<form action={formAction} className="space-y-4 max-w-2xl">
			{state.status === "error" && (
				<p role="alert" className="rounded-lg bg-occitan-terracotta/10 text-occitan-terracotta px-4 py-3 text-sm">
					{state.message}
				</p>
			)}

			<div>
				<label className="block text-sm font-medium text-institution-800 mb-1">Titre</label>
				<input name="title" defaultValue={initial?.title} required className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
			</div>
			<div>
				<label className="block text-sm font-medium text-institution-800 mb-1">Slug (URL)</label>
				<input name="slug" defaultValue={initial?.slug} required pattern="[a-z0-9-]+" className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
			</div>
			<div>
				<label className="block text-sm font-medium text-institution-800 mb-1">Categorie</label>
				<select name="category" defaultValue={initial?.category} className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm">
					{evenementCategories.map((c) => (
						<option key={c} value={c}>
							{c}
						</option>
					))}
				</select>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-institution-800 mb-1">Debut</label>
					<input type="datetime-local" name="dateDebut" defaultValue={toLocalInput(initial?.dateDebut)} required className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
				</div>
				<div>
					<label className="block text-sm font-medium text-institution-800 mb-1">Fin (optionnel)</label>
					<input type="datetime-local" name="dateFin" defaultValue={toLocalInput(initial?.dateFin)} className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
				</div>
			</div>
			<div>
				<label className="block text-sm font-medium text-institution-800 mb-1">Lieu</label>
				<input name="lieu" defaultValue={initial?.lieu} required className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
			</div>
			<div className="flex items-center gap-2">
				<input type="checkbox" id="inscriptionRequise" name="inscriptionRequise" defaultChecked={initial?.inscriptionRequise} className="rounded" />
				<label htmlFor="inscriptionRequise" className="text-sm text-institution-800">
					Inscription requise
				</label>
			</div>
			<div>
				<label className="block text-sm font-medium text-institution-800 mb-1">Lien d&apos;inscription (optionnel)</label>
				<input name="inscriptionUrl" defaultValue={initial?.inscriptionUrl} className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
			</div>
			<div>
				<label className="block text-sm font-medium text-institution-800 mb-1">Image (chemin, optionnel)</label>
				<input name="image" defaultValue={initial?.image} className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
			</div>
			<div>
				<label className="block text-sm font-medium text-institution-800 mb-1">Contenu (un paragraphe par bloc, ligne vide entre chaque)</label>
				<textarea
					name="content"
					defaultValue={initial?.content.join("\n\n")}
					rows={6}
					required
					className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm font-mono"
				/>
			</div>
			<button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
				{pending ? "Enregistrement..." : "Enregistrer"}
			</button>
		</form>
	);
}
