"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(!window.localStorage.getItem("lavaur_cookie_consent"));
	}, []);

	function choose(value: "accepted" | "refused") {
		window.localStorage.setItem("lavaur_cookie_consent", value);
		setVisible(false);
		window.dispatchEvent(new CustomEvent("lavaur:consent", { detail: value }));
	}

	if (!visible) return null;

	return (
		<div
			role="dialog"
			aria-modal="false"
			aria-labelledby="cookie-banner-title"
			className="fixed inset-x-0 bottom-0 z-[100] border-t border-institution-100 bg-white/95 backdrop-blur px-4 py-4 sm:px-6"
		>
			<div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<p id="cookie-banner-title" className="text-sm text-institution-700">
					Ce site utilise des cookies de mesure d&apos;audience. Vous pouvez accepter ou refuser leur depot. En savoir plus dans notre{" "}
					<a className="underline hover:text-institution-900" href="/politique-de-confidentialite">
						politique de confidentialite
					</a>
					.
				</p>
				<div className="flex shrink-0 items-center gap-2">
					<button type="button" onClick={() => choose("refused")} className="btn-secondary !py-2">
						Refuser
					</button>
					<button type="button" onClick={() => choose("accepted")} className="btn-primary !py-2">
						Accepter
					</button>
				</div>
			</div>
		</div>
	);
}
