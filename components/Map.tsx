// Google Maps embed via the key-less `output=embed` iframe, so it works
// before a Maps API key is configured. Swap for the JS API (Places/Markers)
// once services/parkings/monuments data is available.
export default function Map({
	height = "420",
	query = "Mairie de Lavaur, Place du Plô, 81500 Lavaur",
}: {
	height?: string;
	query?: string;
}) {
	return (
		<div className="rounded-xl overflow-hidden shadow-sm ring-1 ring-institution-100">
			<iframe
				src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
				width="100%"
				height={height}
				style={{ border: 0 }}
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
				title="Carte interactive - Ville de Lavaur"
			/>
		</div>
	);
}
