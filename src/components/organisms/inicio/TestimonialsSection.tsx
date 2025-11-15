import React from "react";
import TestimonialCard from "@/components/molecules/inicio/TestimonialCard";
import Text from "@/components/atoms/Text";
import Button from "@/components/atoms/Button";
import { testimonialsData } from "@/data/inicio/testimonialsData";
import testimonialsBg from "@/assets/inicio/testimonialbackground.webp";

const TestimonialsSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-0 px-0">
      <div className="w-full bg-[#18BFE3] py-6 px-6 md:px-16">
        <Text variant="caption" className="text-white font-bold text-2xl md:text-4xl">
          <span className="italic font-semibold">TU OPINIÓN ES</span> IMPORTANTE<br />PARA NOSOTROS
        </Text>
      </div>
      <div className="relative w-full flex flex-col items-center justify-center px-2 md:px-8 py-8 mb-8">
        <div className="w-full rounded-3xl overflow-visible relative flex items-center justify-center mt-20 pb-24" style={{ backgroundImage: `url(${testimonialsBg.src})`, backgroundSize: 'cover', backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat', minHeight: '820px' }}>
          <div className="absolute inset-0 bg-black/10 rounded-3xl" />
          <div className="relative w-full flex flex-row gap-24 justify-center items-center py-10 z-10">
            {testimonialsData.map((t, idx) => (
              <TestimonialCard key={idx} {...t} />
            ))}
          </div>
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 flex justify-center z-20">
            <Button variant="primary" size="lg" className="px-16 py-4 text-xl rounded-full shadow-xl font-bold tracking-wide">
              ¡COTIZA AHORA!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
