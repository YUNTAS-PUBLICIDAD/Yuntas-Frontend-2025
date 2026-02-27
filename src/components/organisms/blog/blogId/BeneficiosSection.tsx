import Text from "@/components/atoms/Text";
import Img from "@/components/atoms/Img";
import InfoCard from "@/components/molecules/InfoCard";
import Link from "next/link"; // Importamos Link

type BeneficiosSectionProps = {
	subtitle: string;
	imageSrc: string;
	imageTitle: string;
	imageAlt: string;
	benefits: string[];
	productSlug?: string; // Cambiamos a productSlug
};

const BeneficiosSection = ({ subtitle, imageSrc, imageTitle, imageAlt, benefits, productSlug }: BeneficiosSectionProps) => {
	return (
		<section className="flex flex-col gap-20 px-5 pb-10">
			<Text variant="subtitle" className="text-center font-medium">
				{subtitle}
			</Text>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				<Img
					src={imageSrc}
					alt={imageAlt}
					title={imageTitle}
					classname="w-full h-full object-cover rounded-lg"
				/>

				<div className="flex flex-col gap-10 justify-center">
					<div className="flex flex-col gap-6">
						<Text variant="caption" className="uppercase font-medium">
							Consejos Clave
						</Text>
						{benefits && benefits.map((e, i) => (
							<InfoCard key={i} text={e} />
						))}
					</div>

					{/* SOLO renderizar el botón si existe el slug */}
					{productSlug && (
						<div className="flex justify-center mt-4"> {/* CAMBIO: justify-center para centrarlo */}
							<Link
								href={`/productos/${productSlug}`}
								className="bg-[#00031E] text-white px-8 py-3 rounded-lg hover:bg-[#00031E]/80 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center font-semibold inline-block"
							>
								Ver Producto
							</Link>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default BeneficiosSection;