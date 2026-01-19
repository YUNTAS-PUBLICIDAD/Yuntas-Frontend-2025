'use client'

import React from "react";
import TextTitulo from "@/components/atoms/TextTitulo";
import InputText from "@/components/atoms/InputText";
import TextArea from "@/components/atoms/TextArea";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import FormRow from "@/components/molecules/contacto/FormRow";
import FormContainer from "@/components/molecules/contacto/FormContainer";
import { useSolicitudInfo } from "@/hooks/useSolicitudInfo";

const SolicitudInfo: React.FC = () => {
  const { formData, handleInputChange, handleSubmit, isLoading } = useSolicitudInfo();

  return (
    <section className="bg-white ">
      <div className="container mx-auto px-4 text-center ">
        <FormContainer>
          {/* Ajuste responsive del título - agregado sm:text-2xl lg:text-4xl para mejor legibilidad en todos los dispositivos */}
          <TextTitulo
            variant="caption"
            className="text-[#203565] font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center"
          >
            <span className="font-semibold">SOLICITA INFORMACIÓN</span>
          </TextTitulo>

          <form className="space-y-6 px-4 md:px-16 py-8 max-w-3xl mx-auto" onSubmit={handleSubmit}>
            {/* Nombre / Apellido */}
            <FormRow columns={2}>
              <InputText placeholder="Nombre" className="rounded-xl" name="first_name" required value={formData.first_name} onChange={handleInputChange} />
              <InputText placeholder="Apellido" className="rounded-xl" name="last_name" required value={formData.last_name} onChange={handleInputChange} />
            </FormRow>

            {/* Teléfono / Distrito */}
            <FormRow columns={2}>
              <InputText type="number" placeholder="Teléfono" className="rounded-xl" name="phone" required value={formData.phone} onChange={handleInputChange}/>
              <InputText placeholder="Distrito" className="rounded-xl" name="district" value={formData.district} onChange={handleInputChange}/>
            </FormRow>

            <InputText placeholder="Detalle de solicitud" className="rounded-xl" name="request_detail" value={formData.request_detail} onChange={handleInputChange}/>

            <TextArea placeholder="Mensaje" className="h-40" required name="message" value={formData.message} onChange={handleInputChange}/>

            <div className="text-center">
              <PrimaryButton type="submit" disabled={isLoading}>{isLoading ? "ENVIANDO..." : "ENVIAR"}</PrimaryButton>
            </div>
          </form>
        </FormContainer>
      </div>
    </section>
  );
};

export default SolicitudInfo;
