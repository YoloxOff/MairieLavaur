"use client";

export default function DeleteButton({ action, label = "Supprimer" }: { action: () => Promise<void>; label?: string }) {
	return (
		<form
			action={action}
			onSubmit={(e) => {
				if (!confirm("Confirmer la suppression ? Cette action est irreversible.")) {
					e.preventDefault();
				}
			}}
		>
			<button type="submit" className="text-sm text-occitan-terracotta hover:underline">
				{label}
			</button>
		</form>
	);
}
