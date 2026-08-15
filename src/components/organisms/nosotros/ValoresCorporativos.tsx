import { valores } from "@/data/nosotros/valoresData";
import React from "react";
import Text from "@/components/atoms/Text";
const ValoresCorportativos: React.FC = () => {
  return (
    <section>
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-[#0a1a3a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a3a] via-[#0f2c5c] to-[#20838f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/10 via-transparent to-[#22c55e]/10" />

        <div className="relative flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 py-3 md:py-4 border-b border-white/10">
          <Text
            variant="h2"
            className="text-white text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase text-center"
          >
            NUESTROS VALORES
          </Text>
          <p className="mt-1 text-white text-xs md:text-sm lg:text-base font-bold italic uppercase tracking-wider text-center">
            Principios que guian cada proyecto
          </p>
        </div>
      </div>
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 px-6">
          {
            valores.map((valor, index) => {
              return (
                //  Tarjeta de valor con icono azul
                <div key={`valores-${index}`} className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2">
                  {/* Icono en color azul */}
                  <div className="w-24 h-24 rounded-full bg-brand-blue flex items-center justify-center shadow-lg mb-5">
          <valor.icon className="text-white text-5xl transition-transform duration-300 group-hover:scale-110" />
        </div>
                  {/* Texto con descripción del valor en color azul  */}
                   <p className="text-brand-blue">
          <span className="block font-extrabold text-xl">
            {valor.light}
          </span>

          <span className="block font-extrabold text-xl">
            {valor.bold}
          </span>
        </p>
                </div>
              );
            })
          }
        </div>
      </div>
    </section>
  );
};

export default ValoresCorportativos;
