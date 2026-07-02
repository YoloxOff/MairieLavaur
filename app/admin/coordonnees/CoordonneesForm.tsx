"use client";

import { useActionState } from "react";
import { updateMairieAction } from "../actions";
import { adminInitialState } from "../formState";
import type { MairieData } from "@/lib/data/coordonnees";

export default function CoordonneesForm({ initial }: { initial: MairieData }) {
	const [state, formAction, pending] = useActionState(updateMairieAction, adminInitialState);
	const h1 = initial.horaires[0] || { jours: "", heures: "" };
	const h2 = initial.horaires[1] || { jours: "", heures: "" };

	return (
		<form action={formAction} className="space-y-4 max-w-2xl">
			{state.status === "success" && <p className="text-sm text-green-700">{state.message}</p>}
			{state.status === "error" && <p className="text-sm text-occitan-terracotta">{state.message}</p>}

			<div>
				<label className="block text-sm font-medium text-institution-800 mb-1">Nom</label>
				<input name="nom" defaultValue={initial.nom} required className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-institution-800 mb-1">Adresse ligne 1</label>
					<input name="adresseLigne1" defaultValue={initial.adresseLigne1} required className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
				</div>
				<div>
					<label className="block text-sm font-medium text-institution-800 mb-1">Adresse ligne 2</label>
					<input name="adresseLigne2" defaultValue={initial.adresseLigne2} className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-institution-800 mb-1">Code postal</label>
					<input name="codePostal" defaultValue={initial.codePostal} required className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
				</div>
				<div>
					<label className="block text-sm font-medium text-institution-800 mb-1">Ville</label>
					<input name="ville" defaultValue={initial.ville} required className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-institution-800 mb-1">Telephone</label>
					<input name="telephone" defaultValue={initial.telephone} required className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
				</div>
				<div>
					<label className="block text-sm font-medium text-institution-800 mb-1">Fax</label>
					<input name="fax" defaultValue={initial.fax} className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
				</div>
			</div>
			<div>
				<label className="block text-sm font-medium text-institution-800 mb-1">Email</label>
				<input type="email" name="email" defaultValue={initial.email} required className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
			</div>
			<fieldset className="border border-institution-200 rounded-lg p-4">
				<legend className="text-sm font-medium text-institution-800 px-1">Horaires</legend>
				<div className="grid grid-cols-2 gap-4 mb-3">
					<input name="horaires1Jours" defaultValue={h1.jours} placeholder="Jours (ex: Lundi au jeudi)" className="rounded-lg border border-institution-200 px-3 py-2 text-sm" />
					<input name="horaires1Heures" defaultValue={h1.heures} placeholder="Heures (ex: 8h-12h / 13h30-17h30)" className="rounded-lg border border-institution-200 px-3 py-2 text-sm" />
				</div>
				<div className="grid grid-cols-2 gap-4">
					<input name="horaires2Jours" defaultValue={h2.jours} placeholder="Jours (ex: Vendredi)" className="rounded-lg border border-institution-200 px-3 py-2 text-sm" />
					<input name="horaires2Heures" defaultValue={h2.heures} placeholder="Heures" className="rounded-lg border border-institution-200 px-3 py-2 text-sm" />
				</div>
			</fieldset>
			<button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
				{pending ? "Enregistrement..." : "Enregistrer"}
			</button>
		</form>
	);
}
