"use client";

import { useActionState } from "react";
import { subscribeNewsletterAction, type FormState } from "@/app/actions";

const initialState: FormState = { status: "idle" };

export default function NewsletterForm({ dark = true }: { dark?: boolean }) {
	const [state, formAction, pending] = useActionState(subscribeNewsletterAction, initialState);

	return (
		<div>
			{state.message && (
				<p
					role="status"
					className={`text-sm mb-3 rounded-lg px-3 py-2 ${
						dark ? "bg-white text-institution-800 shadow-sm ring-1 ring-institution-100" : "bg-institution-50 text-institution-800"
					}`}
				>
					{state.message}
				</p>
			)}
			<form action={formAction} className="flex gap-2">
				<label htmlFor="newsletter-email" className="sr-only">
					Adresse email
				</label>
				<input
					type="email"
					id="newsletter-email"
					name="email"
					required
					placeholder="Votre email"
					className="min-w-0 flex-1 rounded-full border-0 px-4 py-2 text-sm text-institution-900 placeholder:text-institution-400 focus:ring-2 focus:ring-occitan-gold"
				/>
				<button
					type="submit"
					disabled={pending}
					className="rounded-full bg-occitan-gold px-4 py-2 text-sm font-medium text-institution-900 hover:brightness-95 disabled:opacity-60"
				>
					{pending ? "..." : "S'inscrire"}
				</button>
			</form>
		</div>
	);
}
