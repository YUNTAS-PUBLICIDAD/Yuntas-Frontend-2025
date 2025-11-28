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
          className="text-[#203565] font-bold text-2xl md:text-4xl"
        >
          <span className="font-semibold">CONOCER NUESTROS MEDIOS DE</span>
          <br />
          CONTACTO
        </TextTitulo>
      </div>

      {/* Separador */}
      <div className="border-t border-[#203565] mx-auto max-w-5xl my-10"></div>

      <div className="container mx-auto px-4">
        {/* Los 3 divs en fila para escritorio con mismo tamaño */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {contactoData.map((valor) => {
            return (
              <div className="text-center bg-[#E2F6F6] rounded-2xl p-8 flex flex-col items-center justify-center min-h-[200px]">
                {/* Círculo azul con icono centrado */}
                <div className="bg-[#203565] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <valor.icon className="text-white size-10 md:size-14" />
                </div>

                {/* Texto */}
                <p className="flex flex-col text-[#203565] text-center">
                  <span className="font-extrabold">{valor.bold}</span>
                  {valor.light}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* Separador */}
      <div className="border-t border-[#203565] mx-auto max-w-5xl my-10"></div>
    </section>
  );
};

export default ContactoMedios;
