import { notFound } from "next/navigation";
import ActualiteForm from "../ActualiteForm";
import { updateActualiteAction } from "../../actions";
import { getActualiteById } from "@/lib/data/actualites";

export default async function EditActualitePage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const actu = await getActualiteById(Number(id));
	if (!actu) notFound();

	return (
		<div>
			<h1 className="text-2xl font-bold text-institution-900 mb-6">Modifier : {actu.title}</h1>
			<ActualiteForm action={updateActualiteAction.bind(null, actu.id)} initial={actu} />
		</div>
	);
}
