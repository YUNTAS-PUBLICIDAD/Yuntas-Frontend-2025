import { valores } from "@/data/nosotros/valoresData";
import React from "react";
import Text from "@/components/atoms/Text";
const ValoresCorportativos: React.FC = () => {
  return (
    <section>
      <div className="bg-[#18879B] flexw-full py-4 h-auto">
        <Text
          variant="h2"
          className="text-white font-bold text-center"
        >
          NUESTROS VALORES
        </Text>
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
