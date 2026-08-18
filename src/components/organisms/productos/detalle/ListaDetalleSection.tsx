import InfoCard from "@/components/molecules/InfoCard";
import Text from "@/components/atoms/Text";
import SectionImage from "@/components/atoms/SectionImage";
import { MdSettings, MdStar } from "react-icons/md";

type ListaDetalleSectionProps = {
	text: string;
	listItems: string[];
	imageSrc: string;
	imageTitle: string;
	imageAlt: string;
	reverse?: boolean;
};

export default function ListaDetalleSection({ text, listItems, imageSrc, imageTitle, imageAlt, reverse = false }: ListaDetalleSectionProps) {
	const isBenefit = reverse;

	return (
		<section className="w-full py-20 md:py-32 bg-gradient-to-b from-[#F8FBFC] to-white relative overflow-hidden">
			<div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#23C1DE]/8 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute bottom-40 left-0 w-[400px] h-[400px] bg-brand-blue/6 rounded-full blur-3xl pointer-events-none" />

			<div className="container mx-auto px-4 md:px-8 relative z-10">
				<div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-start gap-12 lg:gap-20`}>
					<div className="flex-1 w-full">
						<div className="flex items-center gap-4 mb-8">
							<div className="w-16 h-16 rounded-2xl bg-[#23C1DE]/20 flex items-center justify-center shadow-md">
								{isBenefit ? (
									<MdStar className="text-3xl text-[#23C1DE]" />
								) : (
									<MdSettings className="text-3xl text-[#23C1DE]" />
								)}
							</div>
							<div>
								{isBenefit ? (
								<span className="text-sm uppercase tracking-[0.25em] text-[#23C1DE] font-bold">Ventajas</span>
							) : (
								<span className="text-sm uppercase tracking-[0.25em] text-[#23C1DE] font-bold">Características</span>
							)}
								<Text variant="h2" color="text-brand-blue" className="font-bold">{text}</Text>
							</div>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{listItems.map((item, index) => (
								<InfoCard
									key={isBenefit ? `benefit-${index}` : `spec-${index}`}
									text={item}
									index={index}
									variant="default"
									className="w-full"
								/>
							))}
						</div>
					</div>

					<div className="flex-shrink-0 w-full lg:w-[45%]">
						<SectionImage
							src={imageSrc}
							alt={imageAlt}
							title={imageTitle}
							className="w-full max-h-[500px] rounded-2xl shadow-xl"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}