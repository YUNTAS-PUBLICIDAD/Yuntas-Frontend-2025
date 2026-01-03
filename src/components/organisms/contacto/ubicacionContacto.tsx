import React from "react";
import MapaEmbed from "@/components/atoms/MapaEmbed";
import TextTitulo from '@/components/atoms/TextTitulo';


const UbicacionContacto: React.FC = () => {
  return (
    <section className="bg-white py-14">
      <div className="container mx-auto px-4">
        {/* Ajuste responsive del título - agregado sm:text-2xl lg:text-4xl para escalado proporcional */}
        <TextTitulo
          variant="caption"
          className="text-[#203565] font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center py-8"
        >
          CADA VEZ MAS CERCA DE TI
        </TextTitulo>

        <div className="max-w-7xl mx-auto">
          <MapaEmbed
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.255255812076!2d-76.94464365943126!3d-12.025940110892334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c97c8934a213%3A0x7f6ccb249e86b5e6!2sYuntas%20Producciones!5e0!3m2!1ses-419!2spe!4v1739596969950!5m2!1ses-419!2spe"
            height="450"
          />
        </div>
      </div>
    </section>
  );
};

export default UbicacionContacto;