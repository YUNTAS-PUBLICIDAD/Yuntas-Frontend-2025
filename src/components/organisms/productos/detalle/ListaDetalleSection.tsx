import InfoCard from "@/components/molecules/InfoCard";
import Text from "@/components/atoms/Text";
import SectionImage from "@/components/atoms/SectionImage";
import { BASE_URL } from "@/config";
type ListaDetalleSectionProps = {
	text: string;
	listItems: string[];
	imageSrc: string;
	reverse?: boolean;
};

export default function ListaDetalleSection({ text, listItems, imageSrc, reverse = false }: ListaDetalleSectionProps) {
    return (
        <section className="w-full py-12 px-0 md:px-24 bg-white">
            <div className={`flex flex-row items-stretch md:items-center justify-between gap-2 md:gap-24 ${reverse ? 'flex-row-reverse' : ''}`}>
                <div className="flex flex-col gap-4 md:gap-8 w-[55%] md:w-[40%] justify-center px-4 md:px-0">
                    <Text variant="h2" color="text-[#203565]" className="font-bold mb-4 md:mb-12">{text}</Text>
                    {listItems.map((item, index) => (
                        <InfoCard
                            key={index}
                            text={item}
                            className="w-full md:py-4 md:px-6 py-2 px-2"
                        />
                    ))}
                </div>
                <div className={`w-[45%] md:w-[60%] flex ${reverse ? 'justify-start' : 'justify-end'} md:justify-center items-center`}>
                    <SectionImage
                        src={`${BASE_URL.replace('/api', '')}${imageSrc}`}
                        alt="Pantalla LED de gran formato"
                        className={`w-full h-full max-h-[18rem] md:min-h-0 md:max-w-[46rem] md:max-h-[38rem] object-cover md:aspect-square ${reverse ? 'rounded-r-3xl md:rounded-3xl' : 'rounded-l-3xl md:rounded-3xl'}`}
                    />
                </div>
            </div>
        </section>
    )
}
