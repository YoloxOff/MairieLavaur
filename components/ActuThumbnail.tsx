import Image from "next/image";

export default function ActuThumbnail({ image, alt, className = "w-full h-44" }: { image?: string; alt: string; className?: string }) {
	if (image) {
		return <Image src={image} alt={alt} width={640} height={420} className={`${className} object-cover`} />;
	}
	return <div className={`${className} bg-institution-100`} aria-hidden="true" />;
}
