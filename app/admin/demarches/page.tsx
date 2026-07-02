import Link from "next/link";
import { getDemarches } from "@/lib/data/demarches";
import { deleteDemarcheAction } from "../actions";
import DeleteButton from "../DeleteButton";

export default async function AdminDemarchesPage() {
	const items = await getDemarches();

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold text-institution-900">Demarches</h1>
				<Link href="/admin/demarches/new" className="btn-primary">
					+ Nouvelle demarche
				</Link>
			</div>

			<div className="card divide-y divide-institution-100">
				{items.map((d) => (
					<div key={d.id} className="flex items-center justify-between gap-4 p-4">
						<div>
							<p className="font-medium text-institution-900">{d.title}</p>
							<p className="text-xs text-institution-500">{d.category}</p>
						</div>
						<div className="flex items-center gap-4 shrink-0">
							<Link href={`/admin/demarches/${d.id}`} className="text-sm text-institution-700 hover:underline">
								Modifier
							</Link>
							<DeleteButton action={deleteDemarcheAction.bind(null, d.id)} />
						</div>
					</div>
				))}
				{items.length === 0 && <p className="p-4 text-sm text-institution-500">Aucune demarche.</p>}
			</div>
		</div>
	);
}
