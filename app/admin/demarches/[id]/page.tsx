import { notFound } from "next/navigation";
import DemarcheForm from "../DemarcheForm";
import { updateDemarcheAction } from "../../actions";
import { getDemarcheById } from "@/lib/data/demarches";

export default async function EditDemarchePage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const d = await getDemarcheById(Number(id));
	if (!d) notFound();

	return (
		<div>
			<h1 className="text-2xl font-bold text-institution-900 mb-6">Modifier : {d.title}</h1>
			<DemarcheForm action={updateDemarcheAction.bind(null, d.id)} initial={d} />
		</div>
	);
}
