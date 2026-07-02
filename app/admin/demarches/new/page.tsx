import DemarcheForm from "../DemarcheForm";
import { createDemarcheAction } from "../../actions";

export default function NewDemarchePage() {
	return (
		<div>
			<h1 className="text-2xl font-bold text-institution-900 mb-6">Nouvelle demarche</h1>
			<DemarcheForm action={createDemarcheAction} />
		</div>
	);
}
