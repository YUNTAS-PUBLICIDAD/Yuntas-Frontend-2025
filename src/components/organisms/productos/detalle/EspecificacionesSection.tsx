import InfoCard from "@/components/molecules/InfoCard";
import Text from "@/components/atoms/Text";
import SectionImage from "@/components/atoms/SectionImage";

export default function EspecificacionesSection({ specs, imageSrc }: { specs: string[], imageSrc: string }) {
  return (
    <section className="w-full py-12 px-4 md:px-24 bg-white">
      <div className="flex flex-col md:flex-row items-center justify-center gap-18">
        <div className="flex flex-col gap-8 flex-1 md:px-4">
          <Text variant="banner" className="text-[#203565] font-bold text-[40px] mb-12">ESPECIFICACIONES</Text>
          {specs.map((spec, index) => (
            <InfoCard 
              key={index} 
              text={spec} 
              className="max-w-lg w-full py-4 px-6 text-xl" 
            />
          ))}
        </div>
        <SectionImage src={imageSrc} alt="Pantalla LED de gran formato" className="w-max max-w-[45rem] max-h-[38rem] rounded-3xl flex-1 aspect-square object-cover" />
      </div>
    </section>
  )
}
