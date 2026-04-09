import React from "react";
import TextTitulo from "@/components/atoms/TextTitulo";
import { contactoData } from "@/data/contacto/contactoData";

const ContactoMedios: React.FC = () => {
  return (
    <section className="w-full">
      {/* ENCABEZADO CELESTE */}
      <div className="w-full bg-white py-6 px-6 md:px-16 text-center">
        <TextTitulo
          variant="caption"
          className="text-[#203565] font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl"
        >
          <span className="font-semibold">CONOCE NUESTROS MEDIOS DE</span>
          <br />
          CONTACTO
        </TextTitulo>
      </div>

      {/* Separador sutil */}
      <div className="w-16 h-1 bg-[#203565] mx-auto my-12 rounded-full opacity-60"></div>

      <div className="container mx-auto px-4 pb-16">
        {/* Los 3 divs en fila para escritorio con mismo tamaño */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {contactoData.map((valor, index) => {
            return (
              <div
                key={`contactos-medios-${index}`}
                className="group text-center bg-[#E2F6F6] rounded-[2.5rem] p-10 flex flex-col items-center justify-center min-h-[220px] transition-all duration-300 hover:bg-[#D5EFEF] hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Círculo azul con icono centrado */}
                <div className="bg-[#203565] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <valor.icon className="text-white size-10 md:size-12" />
                </div>

                <p className="flex flex-col text-[#203565] text-center text-lg w-full px-2">
                  <span className="font-extrabold text-lg md:text-xl mb-1 break-all">{valor.bold}</span>
                  <span className="opacity-90 break-words">{valor.light}</span>
                </p>

              </div>
            );
          })}
        </div>
      </div>

      {/* Separador sutil final */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#203565] to-transparent opacity-20 my-4"></div>
    </section>
  );
};

export default ContactoMedios;