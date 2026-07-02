import Link from "next/link";
import { getEvenements } from "@/lib/data/evenements";
import { deleteEvenementAction } from "../actions";
import DeleteButton from "../DeleteButton";

export default async function AdminAgendaPage() {
	const items = await getEvenements();

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold text-institution-900">Agenda</h1>
				<Link href="/admin/agenda/new" className="btn-primary">
					+ Nouvel evenement
				</Link>
			</div>

			<div className="card divide-y divide-institution-100">
				{items.map((e) => (
					<div key={e.id} className="flex items-center justify-between gap-4 p-4">
						<div>
							<p className="font-medium text-institution-900">{e.title}</p>
							<p className="text-xs text-institution-500">
								{e.category} - {new Date(e.dateDebut).toLocaleString("fr-FR")}
							</p>
						</div>
						<div className="flex items-center gap-4 shrink-0">
							<Link href={`/admin/agenda/${e.id}`} className="text-sm text-institution-700 hover:underline">
								Modifier
							</Link>
							<DeleteButton action={deleteEvenementAction.bind(null, e.id)} />
						</div>
					</div>
				))}
				{items.length === 0 && <p className="p-4 text-sm text-institution-500">Aucun evenement.</p>}
			</div>
		</div>
	);
}
