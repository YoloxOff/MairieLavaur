"use client";

import { useActionState } from "react";
import { adminInitialState, type FormState } from "../formState";
import { actualiteCategories, type Actualite } from "@/lib/content/actualites";

export default function ActualiteForm({
	action,
	initial,
}: {
	action: (prev: FormState, formData: FormData) => Promise<FormState>;
	initial?: Actualite;
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
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-institution-800 mb-1">Categorie</label>
					<select name="category" defaultValue={initial?.category} className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm">
						{actualiteCategories.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</select>
				</div>
				<div>
					<label className="block text-sm font-medium text-institution-800 mb-1">Date</label>
					<input type="date" name="date" defaultValue={initial?.date} required className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
				</div>
			</div>
			<div>
				<label className="block text-sm font-medium text-institution-800 mb-1">Auteur</label>
				<input name="author" defaultValue={initial?.author} className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
			</div>
			<div>
				<label className="block text-sm font-medium text-institution-800 mb-1">Image (chemin, ex: /images/actualites/photo.jpg)</label>
				<input name="image" defaultValue={initial?.image} className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
			</div>
			<div>
				<label className="block text-sm font-medium text-institution-800 mb-1">Resume (extrait)</label>
				<textarea name="excerpt" defaultValue={initial?.excerpt} rows={2} required className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
			</div>
			<div>
				<label className="block text-sm font-medium text-institution-800 mb-1">Contenu (un paragraphe par bloc, ligne vide entre chaque)</label>
				<textarea
					name="content"
					defaultValue={initial?.content.join("\n\n")}
					rows={10}
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
