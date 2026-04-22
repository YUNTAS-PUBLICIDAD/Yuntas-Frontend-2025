import { valores } from "@/data/nosotros/valoresData";
import React from "react";
import Text from "@/components/atoms/Text";
const ValoresCorportativos: React.FC = () => {
  return (
    <section>
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-[#0a1a3a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a3a] via-[#0f2c5c] to-[#20838f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#6DE1E3]/10 via-transparent to-[#22c55e]/10" />

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
      <div className="bg-white-50 py-24">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:flex md:flex-row justify-between items-center text-white gap-8 text-center">
          {
            valores.map((valor, index) => {
              return (
                //  Tarjeta de valor con icono azul
                <div key={`valores-${index}`} className="flex flex-col items-center gap-2 text-center text-lg font-bold text-[#203565]">
                  {/* Icono en color azul */}
                  <valor.icon className="size-24 md:size-30 text-[#203565]" />
                  {/* Texto con descripción del valor en color azul  */}
                  <p className="flex flex-col text-[#203565]">
                    {valor.light}
                    <span className="font-extrabold">{valor.bold}</span>
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
