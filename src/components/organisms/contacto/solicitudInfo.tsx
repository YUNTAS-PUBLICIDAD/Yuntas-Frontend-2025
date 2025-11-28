import React from "react";
import TextTitulo from "@/components/atoms/TextTitulo";
import InputText from "@/components/atoms/InputText";
import TextArea from "@/components/atoms/TextArea";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import FormRow from "@/components/molecules/contacto/FormRow";
import FormContainer from "@/components/molecules/contacto/FormContainer";

const SolicitudInfo: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 text-center">
        <FormContainer>
          <TextTitulo
            variant="caption"
            className="text-[#203565] font-bold text-2xl md:text-4xl text-center"
          >
            <span className="font-semibold">SOLICITA INFORMACIÓN</span>
          </TextTitulo>

          <form className="space-y-6 px-4 md:px-16 py-8 max-w-3xl mx-auto">
            {/* Nombre / Apellido */}
            <FormRow columns={2}>
              <InputText placeholder="Nombre" />
              <InputText placeholder="Apellido" />
            </FormRow>

            {/* Teléfono / Distrito */}
            <FormRow columns={2}>
              <InputText placeholder="Teléfono" />
              <InputText placeholder="Distrito" />
            </FormRow>

            <InputText placeholder="Detalle de solicitud"/>

            <TextArea placeholder="Mensaje" className="h-40" />

            <div className="text-center">
              <PrimaryButton>ENVIAR</PrimaryButton>
            </div>
          </form>
        </FormContainer>
      </div>
    </section>
  );
};

export default SolicitudInfo;
