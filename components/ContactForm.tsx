"use client";

import { useActionState } from "react";
import { submitContactAction, type FormState } from "@/app/actions";

const initialState: FormState = { status: "idle" };

export default function ContactForm() {
	const [state, formAction, pending] = useActionState(submitContactAction, initialState);

	return (
		<div>
			{state.status === "sent" && (
				<p role="status" className="mb-6 rounded-lg bg-institution-50 text-institution-800 px-4 py-3 text-sm">
					{state.message}
				</p>
			)}
			{state.status === "invalid" && (
				<p role="alert" className="mb-6 rounded-lg bg-occitan-terracotta/10 text-occitan-terracotta px-4 py-3 text-sm">
					{state.message}
				</p>
			)}

			<form action={formAction} className="space-y-4">
				<div className="grid gap-4 sm:grid-cols-2">
					<div>
						<label htmlFor="contact-nom" className="block text-sm font-medium text-institution-800 mb-1">
							Nom *
						</label>
						<input type="text" id="contact-nom" name="nom" required className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
					</div>
					<div>
						<label htmlFor="contact-email" className="block text-sm font-medium text-institution-800 mb-1">
							Email *
						</label>
						<input type="email" id="contact-email" name="email" required className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
					</div>
				</div>
				<div>
					<label htmlFor="contact-sujet" className="block text-sm font-medium text-institution-800 mb-1">
						Sujet
					</label>
					<input type="text" id="contact-sujet" name="sujet" className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
				</div>
				<div>
					<label htmlFor="contact-message" className="block text-sm font-medium text-institution-800 mb-1">
						Message *
					</label>
					<textarea id="contact-message" name="message" rows={5} required className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm" />
				</div>
				<p className="text-xs text-institution-500">
					Les informations recueillies sont necessaires au traitement de votre demande. Voir notre{" "}
					<a className="underline" href="/politique-de-confidentialite">
						politique de confidentialite
					</a>
					.
				</p>
				<button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
					{pending ? "Envoi..." : "Envoyer"}
				</button>
			</form>
		</div>
	);
}
