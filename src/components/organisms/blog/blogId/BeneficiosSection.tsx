import Text from "@/components/atoms/Text";
import Img from "@/components/atoms/Img";
import InfoCard from "@/components/molecules/InfoCard";

type BeneficiosSectionProps = {
	subtitle: string;
	imageSrc: string;
    imageTitle: string;
    imageAlt: string;
	benefits: string[];
};

const BeneficiosSection = ({ subtitle, imageSrc, imageTitle, imageAlt, benefits }: BeneficiosSectionProps) => {
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
					<Text variant="caption" className="uppercase font-medium">
						Beneficios Clave
					</Text>

					{benefits && benefits.map((e, i) => (
						<InfoCard key={i} text={e} />
					))}
				</div>
			</div>
		</section>
	);
};

export default BeneficiosSection;
