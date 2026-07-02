// Minimal transactional email sender. Uses the Resend HTTP API directly (no
// SDK dependency) when RESEND_API_KEY is configured; otherwise logs to the
// server console so forms keep working end-to-end in local/dev without any
// email provider set up. Swap the provider here if the mairie prefers
// another one (Brevo/Sendinblue, SMTP via a Vercel-compatible provider, etc).
type SendMailInput = {
	to: string;
	subject: string;
	text: string;
};

export async function sendMail({ to, subject, text }: SendMailInput): Promise<{ sent: boolean }> {
	const apiKey = process.env.RESEND_API_KEY;
	const from = process.env.MAIL_FROM || "Ville de Lavaur <onboarding@resend.dev>";

	if (!apiKey) {
		console.log("[mail:stub] RESEND_API_KEY non configuree - email non envoye.", { to, subject, text });
		return { sent: false };
	}

	const res = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ from, to, subject, text }),
	});

	if (!res.ok) {
		console.error("[mail] echec envoi Resend", res.status, await res.text());
		return { sent: false };
	}

	return { sent: true };
}
