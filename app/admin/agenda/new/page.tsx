import EvenementForm from "../EvenementForm";
import { createEvenementAction } from "../../actions";

export default function NewEvenementPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold text-institution-900 mb-6">Nouvel evenement</h1>
			<EvenementForm action={createEvenementAction} />
		</div>
	);
}
