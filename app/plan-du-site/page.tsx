import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { primaryNav } from "@/lib/nav";

export const metadata: Metadata = { title: "Plan du site" };

export default function PlanDuSitePage() {
	return (
		<article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
			<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Plan du site" }]} />
			<h1 className="text-3xl sm:text-4xl font-bold text-institution-900 mb-6">Plan du site</h1>
			<ul className="space-y-4">
				{primaryNav.map((item) => (
					<li key={item.href}>
						<Link href={item.href} className="font-semibold text-institution-800 hover:underline">
							{item.label}
						</Link>
						{item.children && (
							<ul className="mt-2 ml-4 space-y-1">
								{item.children.map((child) => (
									<li key={child.href}>
										<Link href={child.href} className="text-sm text-institution-600 hover:underline">
											{child.label}
										</Link>
									</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ul>
		</article>
	);
}
