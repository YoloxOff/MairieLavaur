"use client";

import { useActionState } from "react";
import { adminInitialState, type FormState } from "../formState";
import { demarcheCategories, type Demarche } from "@/lib/content/demarches";

export default function DemarcheForm({
	action,
	initial,
}: {
	action: (prev: FormState, formData: FormData) => Promise<FormState>;
	initial?: Demarche;
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
					{demarcheCategories.map((c) => (
						<option key={c} value={c}>
							{c}
						</option>
					))}
				</select>
			</div>
			<div>
				<label className="block text-sm font-medium text-institution-800 mb-1">Lien vers la demarche en ligne (optionnel)</label>
				<input name="lienEnLigne" defaultValue={initial?.lienEnLigne} className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
			</div>
			<div>
				<label className="block text-sm font-medium text-institution-800 mb-1">Contenu (un paragraphe par bloc, ligne vide entre chaque)</label>
				<textarea
					name="content"
					defaultValue={initial?.content.join("\n\n")}
					rows={8}
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
