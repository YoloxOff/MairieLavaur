import Link from "next/link";

export type Crumb = { label: string; href?: string };

export default function Breadcrumb({ items }: { items: Crumb[] }) {
	if (items.length < 2) return null;

	return (
		<nav aria-label="Fil d'Ariane" className="text-sm text-institution-600 mb-6">
			<ol className="flex flex-wrap items-center gap-1">
				{items.map((item, i) => (
					<li key={i} className="flex items-center gap-1">
						{item.href ? (
							<>
								<Link href={item.href} className="hover:underline">
									{item.label}
								</Link>
								<span aria-hidden="true" className="mx-1">
									/
								</span>
							</>
						) : (
							<span aria-current="page" className="font-medium text-institution-900">
								{item.label}
							</span>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
}
