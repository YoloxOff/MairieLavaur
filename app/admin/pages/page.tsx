import Link from "next/link";
import { editablePages } from "@/lib/data/pageSections";

export default function AdminPagesPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold text-institution-900 mb-6">Contenu des pages</h1>
			<div className="card divide-y divide-institution-100">
				{editablePages.map((p) => (
					<Link key={p.slug} href={`/admin/pages/${p.slug}`} className="flex items-center justify-between gap-4 p-4 hover:bg-institution-50">
						<p className="font-medium text-institution-900">{p.label}</p>
						<span className="text-sm text-institution-500">Editer →</span>
					</Link>
				))}
			</div>
		</div>
	);
}
