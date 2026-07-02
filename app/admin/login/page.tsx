import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<div className="w-full max-w-sm card p-8">
				<h1 className="text-xl font-bold text-institution-900 mb-1">Administration</h1>
				<p className="text-sm text-institution-600 mb-6">Ville de Lavaur</p>
				<LoginForm />
			</div>
		</div>
	);
}
