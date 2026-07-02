"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { primaryNav } from "@/lib/nav";

export default function Header() {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		function onEscape(e: KeyboardEvent) {
			if (e.key === "Escape") setOpen(false);
		}
		window.addEventListener("keyup", onEscape);
		return () => window.removeEventListener("keyup", onEscape);
	}, []);

	return (
		<header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-20">
					<Link href="/" className="flex items-center gap-3 shrink-0">
						<span className="text-xl font-bold text-institution-800">Ville de Lavaur</span>
					</Link>

					<nav aria-label="Menu principal" className="hidden lg:block">
						<ul className="flex items-center gap-1 text-[0.95rem]">
							{primaryNav.map((item) => (
								<li key={item.href} className={item.children ? "relative group" : "relative"}>
									<Link
										href={item.href}
										className="flex items-center gap-1 px-3 py-2 rounded-full font-medium text-institution-700 hover:bg-institution-50 hover:text-institution-900"
									>
										{item.label}
										{item.children && (
											<svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
												<polyline points="6 9 12 15 18 9" />
											</svg>
										)}
									</Link>
									{item.children && (
										<ul className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity absolute left-0 top-full pt-2 w-72 z-40">
											<li className="bg-white rounded-xl shadow-lg ring-1 ring-institution-100 p-2">
												<ul>
													{item.children.map((child) => (
														<li key={child.href}>
															<Link
																href={child.href}
																className="block px-3 py-2 rounded-lg text-sm text-institution-700 hover:bg-institution-50 hover:text-institution-900"
															>
																{child.label}
															</Link>
														</li>
													))}
												</ul>
											</li>
										</ul>
									)}
								</li>
							))}
						</ul>
					</nav>

					<div className="flex items-center gap-2">
						<Link href="/actualites" className="p-2 rounded-full hover:bg-institution-50" aria-label="Recherche">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
								<circle cx="11" cy="11" r="7" />
								<line x1="21" y1="21" x2="16.65" y2="16.65" />
							</svg>
						</Link>
						<button
							type="button"
							className="lg:hidden p-2 rounded-full hover:bg-institution-50"
							onClick={() => setOpen((v) => !v)}
							aria-expanded={open}
							aria-controls="mobile-menu"
							aria-label="Ouvrir le menu"
						>
							{open ? (
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
									<line x1="18" y1="6" x2="6" y2="18" />
									<line x1="6" y1="6" x2="18" y2="18" />
								</svg>
							) : (
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
									<line x1="3" y1="6" x2="21" y2="6" />
									<line x1="3" y1="12" x2="21" y2="12" />
									<line x1="3" y1="18" x2="21" y2="18" />
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>

			{open && (
				<nav id="mobile-menu" aria-label="Menu principal (mobile)" className="lg:hidden border-t border-institution-100 bg-white">
					<ul className="divide-y divide-institution-100 px-4 sm:px-6 py-2">
						{primaryNav.map((item) =>
							item.children ? (
								<li key={item.href} className="py-1">
									<details className="group">
										<summary className="flex items-center justify-between py-2 cursor-pointer font-medium text-institution-800 list-none">
											{item.label}
											<svg className="h-4 w-4 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
												<polyline points="6 9 12 15 18 9" />
											</svg>
										</summary>
										<ul className="pl-4 pb-2 space-y-1">
											{item.children.map((child) => (
												<li key={child.href}>
													<Link href={child.href} onClick={() => setOpen(false)} className="block py-1.5 text-institution-700 hover:text-institution-900">
														{child.label}
													</Link>
												</li>
											))}
										</ul>
									</details>
								</li>
							) : (
								<li key={item.href}>
									<Link href={item.href} onClick={() => setOpen(false)} className="block py-3 font-medium text-institution-800 hover:text-institution-900">
										{item.label}
									</Link>
								</li>
							)
						)}
					</ul>
				</nav>
			)}
		</header>
	);
}
