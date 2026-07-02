"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";
import { adminInitialState } from "../formState";

export default function LoginForm() {
	const [state, formAction, pending] = useActionState(loginAction, adminInitialState);

	return (
		<form action={formAction} className="space-y-4">
			{state.status === "error" && (
				<p role="alert" className="rounded-lg bg-occitan-terracotta/10 text-occitan-terracotta px-4 py-3 text-sm">
					{state.message}
				</p>
			)}
			<div>
				<label htmlFor="password" className="block text-sm font-medium text-institution-800 mb-1">
					Mot de passe
				</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					autoFocus
					className="w-full rounded-lg border border-institution-200 px-3 py-2 text-sm"
				/>
			</div>
			<button type="submit" disabled={pending} className="btn-primary w-full justify-center disabled:opacity-60">
				{pending ? "Connexion..." : "Se connecter"}
			</button>
		</form>
	);
}
