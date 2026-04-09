'use client'

import React from "react";
import TextTitulo from "@/components/atoms/TextTitulo";
import InputText from "@/components/atoms/InputText";
import TextArea from "@/components/atoms/TextArea";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import FormContainer from "@/components/molecules/contacto/FormContainer";
import { useSolicitudInfo } from "@/hooks/useSolicitudInfo";

const SolicitudInfo: React.FC = () => {
  const { formData, handleInputChange, handleSubmit, isLoading } = useSolicitudInfo();

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 text-center">
        <FormContainer>
          <TextTitulo
            variant="caption"
            className="text-[#203565] font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center"
          >
            <span className="font-semibold">SOLICITA INFORMACIÓN</span>
          </TextTitulo>

          <form className="space-y-6 px-0 md:px-12 py-10 max-w-4xl mx-auto" onSubmit={handleSubmit}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <InputText 
                placeholder="Nombre" 
                className="w-full rounded-2xl shadow-sm border-none focus:ring-offset-2" 
                name="first_name" 
                required 
                value={formData.first_name} 
                onChange={handleInputChange} 
              />
              <InputText 
                placeholder="Apellido" 
                className="w-full rounded-2xl shadow-sm border-none focus:ring-offset-2" 
                name="last_name" 
                required 
                value={formData.last_name} 
                onChange={handleInputChange} 
              />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <InputText 
                type="tel" 
                inputMode="numeric" 
                pattern="[0-9]*" 
                placeholder="Teléfono" 
                className="w-full rounded-2xl shadow-sm border-none focus:ring-offset-2" 
                name="phone" 
                required 
                value={formData.phone} 
                onChange={handleInputChange} 
              />
              <InputText 
                placeholder="Distrito" 
                className="w-full rounded-2xl shadow-sm border-none focus:ring-offset-2" 
                name="district" 
                value={formData.district} 
                onChange={handleInputChange} 
              />
            </div>

            <div className="w-full">
                <InputText 
                    placeholder="Detalle de solicitud" 
                    className="w-full rounded-2xl shadow-sm border-none focus:ring-offset-2" 
                    name="request_detail" 
                    value={formData.request_detail} 
                    onChange={handleInputChange} 
                />
            </div>

            <div className="w-full">
              <TextArea 
                placeholder="¿Cómo podemos ayudarte?" 
                className="w-full h-44 rounded-2xl shadow-sm border-none focus:ring-2 focus:ring-[#23C1DE] p-6" 
                required 
                name="message" 
                value={formData.message} 
                onChange={handleInputChange}
                minLength={10}
                maxLength={500}
                showCounter
              />
            </div>

            <div className="text-center pt-4">
              <PrimaryButton
                type="submit"
                disabled={isLoading}
                className="shadow-lg hover:bg-[#5bbbd8] active:scale-95"
              >
                {isLoading ? "ENVIANDO..." : "ENVIAR MENSAJE"}
              </PrimaryButton>
            </div>
          </form>
        </FormContainer>
      </div>
    </section>
  );
};

export default SolicitudInfo;