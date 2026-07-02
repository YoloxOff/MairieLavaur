"use client";

import { useActionState } from "react";
import { adminInitialState, type FormState } from "../../formState";

export default function SectionForm({
	action,
	title,
	bodyHtml,
	sectionId,
}: {
	action: (prev: FormState, formData: FormData) => Promise<FormState>;
	title: string;
	bodyHtml: string;
	sectionId: string;
}) {
	const [state, formAction, pending] = useActionState(action, adminInitialState);

	return (
		<form action={formAction} className="card p-5 space-y-3">
			<p className="text-xs font-mono text-institution-400">#{sectionId}</p>
			{state.status === "success" && <p className="text-sm text-green-700">{state.message}</p>}
			{state.status === "error" && <p className="text-sm text-occitan-terracotta">{state.message}</p>}
			<div>
				<label className="block text-sm font-medium text-institution-800 mb-1">Titre</label>
				<input name="title" defaultValue={title} required className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
			</div>
			<div>
				<label className="block text-sm font-medium text-institution-800 mb-1">Contenu (HTML simple : &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;&lt;li&gt;)</label>
				<textarea
					name="bodyHtml"
					defaultValue={bodyHtml}
					rows={6}
					required
					className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm font-mono"
				/>
			</div>
			<button type="submit" disabled={pending} className="btn-secondary disabled:opacity-60">
				{pending ? "Enregistrement..." : "Enregistrer cette section"}
			</button>
		</form>
	);
}
