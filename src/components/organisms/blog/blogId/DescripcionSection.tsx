import Text from "@/components/atoms/Text";
import Banner from "@/components/atoms/Banner";
import Img from "@/components/atoms/Img";
import { renderLinkMarkers } from "@/utils/renderLinkMarkers";

type DescripcionSectionProps = {
	title: string;
	imageSrc: string;
    imageTitle: string;
    imageAlt: string;
	description: string;
};

const DescripcionSection = ({ title, imageSrc, imageTitle, imageAlt, description }: DescripcionSectionProps) => {
    return (
        <section className="flex flex-col gap-20 py-20">
            <Text
                variant="banner"
                className="font-bold text-center text-3xl uppercase"
            >
                {title}
            </Text>

            <div className="grid grid-cols-1 md:grid-cols-2">
                <Banner
                    color="bg-[#E2F6F6]"
                    className="h-auto p-4 font-normal md:text-2xl md:px-20 word-spacing-[4px] leading-relaxed"
                >
                    <div>
                        {renderLinkMarkers(description || "")}
                    </div>
                </Banner>

                {/* Contenedor para centrar la imagen */}
                <div className="flex items-center justify-center p-4">
                    <Img
                        src={imageSrc}
                        alt={imageAlt}
                        title={imageTitle}
                        // Si tu componente Img no tiene mx-auto, 
                        // puedes pasarlo aquí por classname
                        classname="max-w-full h-auto" 
                    />
                </div>
            </div>
        </section>
    );
};
export default DescripcionSection;
