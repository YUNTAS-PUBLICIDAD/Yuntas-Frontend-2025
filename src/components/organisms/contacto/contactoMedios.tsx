import React from "react";
import TextTitulo from "@/components/atoms/TextTitulo";
import { contactoData } from "@/data/contacto/contactoData";

const ContactoMedios: React.FC = () => {
  return (
    <section className="w-full">
      {/* ENCABEZADO CELESTE */}
      <div className="w-full bg-gradient-to-r from-[#0a1a3a] via-[#0f2c5c] to-[#20838f] py-4 md:py-5 px-6 md:px-12 text-center shadow-2xl">
        <TextTitulo
          variant="caption"
          className="text-white font-black text-2xl sm:text-3xl md:text-4xl tracking-tight uppercase"
        >
          <span className="font-black">CONOCE NUESTROS MEDIOS DE</span>
          <br />
          CONTACTO
        </TextTitulo>
      </div>

      {/* Separador sutil */}
      <div className="w-16 h-1 bg-brand-blue mx-auto my-12 rounded-full opacity-60"></div>

      <div className="container mx-auto px-4 pb-16">
        {/* Los 3 divs en fila para escritorio con mismo tamaño */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {contactoData.map((valor, index) => {
            return (
              <div
                key={`contactos-medios-${index}`}
                className="group text-center bg-[#E2F6F6] rounded-[2.5rem] p-10 flex flex-col items-center justify-center min-h-[220px] transition-all duration-300 hover:bg-[#D5EFEF] hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Círculo azul con icono centrado */}
                <div className="bg-brand-blue w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <valor.icon className="text-white size-10 md:size-12" />
                </div>

                {/* Texto */}
                <p className="flex flex-col text-brand-blue text-center text-lg">
                  <span className="font-extrabold text-xl mb-1">{valor.bold}</span>
                  <span className="opacity-90">{valor.light}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Separador sutil final */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-20 my-4"></div>
    </section>
  );
};

export default ContactoMedios;
