import Text from "@/components/atoms/Text";
import InfoCard from "@/components/molecules/InfoCard";
import SectionImage from "@/components/atoms/SectionImage";
import Link from "next/link";
import { MdStar, MdArrowForward } from "react-icons/md";

type BeneficiosSectionProps = {
	subtitle: string;
	imageSrc: string;
	imageTitle: string;
	imageAlt: string;
	benefits: string[];
	productSlug?: string;
};

const BeneficiosSection = ({ subtitle, imageSrc, imageTitle, imageAlt, benefits, productSlug }: BeneficiosSectionProps) => {
	return (
		<section className="w-full py-12 md:py-14 relative overflow-hidden">
			<div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#23C1DE]/8 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute bottom-40 left-0 w-[400px] h-[400px] bg-[#203565]/6 rounded-full blur-3xl pointer-events-none" />

			<div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
				<div className="flex items-center gap-4 mb-10 md:mb-14">
					<div className="w-14 h-14 rounded-2xl bg-[#23C1DE]/20 flex items-center justify-center shadow-md">
						<MdStar className="text-3xl text-[#23C1DE]" />
					</div>
					<div>
						<span className="text-sm uppercase tracking-[0.25em] text-[#23C1DE] font-bold">Ventajas</span>
						<Text variant="h2" color="text-[#203565]" className="font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
							BENEFICIOS
						</Text>
					</div>
				</div>

				<div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
					<div className="flex-shrink-0 w-full lg:w-[45%] order-1 lg:order-1">
						<SectionImage
							src={imageSrc}
							alt={imageAlt}
							title={imageTitle}
							className="w-full max-h-[500px] rounded-2xl shadow-xl"
						/>
					</div>

					<div className="flex-1 w-full order-2 lg:order-2">
						<div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg">
							<div className="mb-6 pb-4 border-b border-[#E2F6F6]">
								<span className="text-sm md:text-base uppercase tracking-[0.25em] text-[#203565] font-bold leading-snug block">
									{subtitle || "Puntos clave"}
								</span>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{benefits && benefits.map((benefit, index) => (
									<InfoCard
										key={`benefit-${index}`}
										text={benefit}
										index={index}
										variant="default"
										className="w-full"
									/>
								))}
							</div>

							{productSlug && (
								<div className="pt-6 flex justify-start">
									<Link
										href={`/productos/${productSlug}`}
										className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#00031E] to-[#203565] text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl hover:shadow-xl transition-all duration-300 font-bold group text-sm md:text-base"
									>
										<span>Ver Producto Relacionado</span>
										<MdArrowForward className="text-lg md:text-xl group-hover:translate-x-1 transition-transform" />
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BeneficiosSection;