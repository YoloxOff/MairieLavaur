import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { logoutAction } from "./actions";

export const metadata = { title: "Administration", robots: { index: false, follow: false } };

const navItems = [
	{ href: "/admin", label: "Tableau de bord" },
	{ href: "/admin/actualites", label: "Actualites" },
	{ href: "/admin/agenda", label: "Agenda" },
	{ href: "/admin/demarches", label: "Demarches" },
	{ href: "/admin/pages", label: "Pages" },
	{ href: "/admin/coordonnees", label: "Coordonnees" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	const authed = await isAuthenticated();

	if (!authed) {
		return <div className="min-h-screen bg-institution-50">{children}</div>;
	}

	return (
		<div className="flex min-h-screen bg-institution-50">
			<aside className="w-64 shrink-0 bg-institution-900 text-white flex flex-col">
				<div className="px-5 py-6 border-b border-white/10">
					<p className="font-bold">Administration</p>
					<p className="text-xs text-institution-300">Ville de Lavaur</p>
				</div>
				<nav className="flex-1 px-3 py-4 space-y-1">
					{navItems.map((item) => (
						<Link key={item.href} href={item.href} className="block rounded-lg px-3 py-2 text-sm font-medium text-institution-100 hover:bg-white/10">
							{item.label}
						</Link>
					))}
				</nav>
				<div className="px-3 py-4 border-t border-white/10 space-y-1">
					<Link href="/" className="block rounded-lg px-3 py-2 text-sm text-institution-300 hover:bg-white/10">
						← Voir le site
					</Link>
					<form action={logoutAction}>
						<button type="submit" className="w-full text-left rounded-lg px-3 py-2 text-sm text-institution-300 hover:bg-white/10">
							Se deconnecter
						</button>
					</form>
				</div>
			</aside>
			<main className="flex-1 p-8 max-w-5xl">{children}</main>
		</div>
	);
}
