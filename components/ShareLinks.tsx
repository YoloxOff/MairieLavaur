export default function ShareLinks({ url, title }: { url: string; title: string }) {
	const networks: Record<string, string> = {
		Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
		LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
		Email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
	};

	return (
		<ul className="flex items-center gap-3">
			{Object.entries(networks).map(([label, href]) => (
				<li key={label}>
					<a className="btn-secondary !px-3 !py-2" rel="noopener noreferrer" target="_blank" href={href} aria-label={`Partager sur ${label}`}>
						{label}
					</a>
				</li>
			))}
		</ul>
	);
}
