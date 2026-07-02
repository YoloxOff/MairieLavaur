import ActualiteForm from "../ActualiteForm";
import { createActualiteAction } from "../../actions";

export default function NewActualitePage() {
	return (
		<div>
			<h1 className="text-2xl font-bold text-institution-900 mb-6">Nouvelle actualite</h1>
			<ActualiteForm action={createActualiteAction} />
		</div>
	);
}
