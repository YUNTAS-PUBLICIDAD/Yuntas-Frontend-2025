import Banner from "@/components/atoms/Banner";
import Text from "@/components/atoms/Text";
import Img from "@/components/atoms/Img";
import { Quote, Star } from "lucide-react";

type OpinionSectionProps = {
  testimonial: string;
  imageSrc: string;
  imageTitle: string;
  imageAlt: string;
};

const OpinionSection = ({
  testimonial,
  imageSrc,
  imageTitle,
  imageAlt,
}: OpinionSectionProps) => {
  return (
    <section className="w-full relative overflow-hidden bg-gradient-to-b from-[#0a1a3a] via-[#0d2240] to-[#10284d]">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#23C1DE]/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#23C1DE]/6 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

      {/* HEADER ESTILO BLOG */}
      <Banner
        size="small"
        color="bg-gradient-to-r from-[#0a1a3a] via-[#0f2c5c] to-[#20838f]"
        className="!h-auto flex flex-col gap-4 md:gap-6 px-6 md:px-12 lg:px-20 py-3 md:py-4"
      >
        <Text
          variant="h2"
          className="text-white text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase text-center mx-auto md:max-w-2xl"
        >
          Opinión de nuestro cliente
        </Text>
      </Banner>

      {/* BLOQUE DE TESTIMONIOS */}
      <div className="relative overflow-hidden min-h-[520px] md:min-h-[620px]">
        {imageSrc && (
          <div className="absolute inset-0">
            <Img
              src={imageSrc}
              alt={imageAlt}
              title={imageTitle}
              classname="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-[#08111f]/88 via-[#0a1a3a]/70 to-[#0a1a3a]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08111f]/70 via-transparent to-transparent" />

        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-20">
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-10">
            <div className="w-full lg:w-[44%] max-w-2xl">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#23C1DE] to-[#18879B] rounded-3xl blur-xl opacity-0 group-hover:opacity-18 transition-opacity duration-500" />
                <div className="relative bg-white rounded-3xl p-8 md:p-10 border border-[#E2F6F6] hover:border-[#23C1DE]/30 transition-all duration-300 shadow-2xl">
                  <Quote className="w-12 h-12 text-[#23C1DE] mb-6 opacity-80" />

                  <div className="text-[#00031E]/85 text-lg md:text-xl lg:text-2xl leading-relaxed font-medium mb-4">
                    <div className="prose prose-invert max-w-none">
                      {testimonial}
                    </div>
                  </div>

                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-6 h-6 ${
                          index < 5
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="h-1 w-12 bg-gradient-to-r from-[#23C1DE] to-transparent rounded-full" />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[56%] flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[640px] h-[320px] sm:h-[380px] md:h-[460px] lg:h-[560px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-[#08111f]/40 via-transparent to-transparent z-10" />
                <Img
                  src={imageSrc}
                  alt={imageAlt}
                  title={imageTitle}
                  classname="w-full h-full object-cover object-right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpinionSection;
