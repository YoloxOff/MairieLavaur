import Reveal from "./Reveal";

export type SectionData = {
	id: string;
	title: string;
	body: React.ReactNode;
};

export default function SectionBlock({ section, index }: { section: SectionData; index: number }) {
	const altBg = index % 2 === 1;
	return (
		<section id={section.id} className={`scroll-mt-24 ${altBg ? "bg-surface-light" : ""}`}>
			<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
				<Reveal>
					<h2 className="section-title mb-4">{section.title}</h2>
					<div className="prose prose-institution max-w-none prose-headings:text-institution-900 prose-a:text-institution-700">
						{section.body}
					</div>
				</Reveal>
			</div>
		</section>
	);
}

export function PageHero({ title, description }: { title: string; description: string }) {
	return (
		<section className="bg-institution-900 text-white">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
				<h1 className="text-4xl font-bold">{title}</h1>
				<p className="mt-3 max-w-2xl text-institution-100">{description}</p>
			</div>
		</section>
	);
}
