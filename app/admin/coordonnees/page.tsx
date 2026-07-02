import { getMairie } from "@/lib/data/coordonnees";
import CoordonneesForm from "./CoordonneesForm";

export default async function AdminCoordonneesPage() {
	const mairie = await getMairie();

	return (
		<div>
			<h1 className="text-2xl font-bold text-institution-900 mb-6">Coordonnees de la mairie</h1>
			<CoordonneesForm initial={mairie} />
		</div>
	);
}
