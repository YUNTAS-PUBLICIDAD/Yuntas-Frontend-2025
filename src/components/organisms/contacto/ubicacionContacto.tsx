import React from "react";
import MapaEmbed from "@/components/atoms/MapaEmbed";
import TextTitulo from '@/components/atoms/TextTitulo';


const UbicacionContacto: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="w-full bg-gradient-to-r from-[#0a1a3a] via-[#0f2c5c] to-[#20838f] py-4 md:py-5 px-6 md:px-12 text-center shadow-2xl">
        <TextTitulo
          variant="caption"
          className="text-white font-black text-2xl sm:text-3xl md:text-4xl tracking-tight uppercase">
          CADA VEZ MÁS CERCA DE TI
        </TextTitulo>
        <p className="mt-1 text-white text-xs md:text-sm lg:text-base font-bold italic uppercasetracking-wider text-center">
          Visítanos o ubícanos fácilmente para recibir atención cercana y personalizada.
        </p>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="max-w-7xl mx-auto overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-[#E2F6F6]">
          <MapaEmbed
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.255255812076!2d-76.94464365943126!3d-12.025940110892334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c97c8934a213%3A0x7f6ccb249e86b5e6!2sYuntas%20Producciones!5e0!3m2!1ses-419!2spe!4v1739596969950!5m2!1ses-419!2spe"
            height="500"
          />
        </div>
      </div>
    </section>
  );
};

export default UbicacionContacto;