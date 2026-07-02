import { notFound } from "next/navigation";
import EvenementForm from "../EvenementForm";
import { updateEvenementAction } from "../../actions";
import { getEvenementById } from "@/lib/data/evenements";

export default async function EditEvenementPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const ev = await getEvenementById(Number(id));
	if (!ev) notFound();

	return (
		<div>
			<h1 className="text-2xl font-bold text-institution-900 mb-6">Modifier : {ev.title}</h1>
			<EvenementForm action={updateEvenementAction.bind(null, ev.id)} initial={ev} />
		</div>
	);
}
