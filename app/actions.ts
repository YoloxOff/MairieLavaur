"use server";

import { createConfirmationToken } from "@/lib/newsletter-token";
import { sendMail } from "@/lib/mail";

export type FormState = {
	status: "idle" | "pending" | "sent" | "confirm-pending" | "invalid" | "error";
	message?: string;
};

const initialState: FormState = { status: "idle" };
export { initialState as newsletterInitialState, initialState as contactInitialState };

function isEmail(value: FormDataEntryValue | null): value is string {
	return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function subscribeNewsletterAction(_prevState: FormState, formData: FormData): Promise<FormState> {
	const email = formData.get("email");
	if (!isEmail(email)) {
		return { status: "invalid", message: "Adresse email invalide." };
	}

	const token = createConfirmationToken(email);
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
	const confirmUrl = `${siteUrl}/api/newsletter/confirm?token=${encodeURIComponent(token)}`;

	const { sent } = await sendMail({
		to: email,
		subject: "Confirmez votre inscription a la newsletter de la Ville de Lavaur",
		text: `Bonjour,\n\nMerci de confirmer votre inscription en cliquant sur ce lien :\n${confirmUrl}\n\nCe lien expire dans 48h. Si vous n'etes pas a l'origine de cette demande, ignorez ce message.`,
	});

	if (!sent) {
		return {
			status: "confirm-pending",
			message: "Inscription enregistree. L'envoi d'email n'est pas encore configure (RESEND_API_KEY) - en production vous recevriez un lien de confirmation.",
		};
	}

	return { status: "confirm-pending", message: "Merci ! Verifiez votre boite mail pour confirmer votre inscription." };
}

export async function submitContactAction(_prevState: FormState, formData: FormData): Promise<FormState> {
	const nom = formData.get("nom");
	const email = formData.get("email");
	const sujet = formData.get("sujet");
	const message = formData.get("message");

	if (typeof nom !== "string" || !nom.trim() || !isEmail(email) || typeof message !== "string" || !message.trim()) {
		return { status: "invalid", message: "Merci de renseigner tous les champs obligatoires." };
	}

	const to = process.env.CONTACT_EMAIL || "contact@mairie-lavaur.fr";
	const { sent } = await sendMail({
		to,
		subject: typeof sujet === "string" && sujet ? sujet : `Nouveau message de contact - ${nom}`,
		text: `${message}\n\nNom: ${nom}\nEmail: ${email}\n\nEnvoye depuis le formulaire de contact du site.`,
	});

	if (!sent) {
		return {
			status: "sent",
			message: "Message enregistre. L'envoi d'email n'est pas encore configure (RESEND_API_KEY) - en production ce message partirait par email.",
		};
	}

	return { status: "sent", message: "Votre message a bien ete envoye. Merci, nous reviendrons vers vous rapidement." };
}
