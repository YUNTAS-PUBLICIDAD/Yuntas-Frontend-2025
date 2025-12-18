'use client'

import React, { useState } from "react";
import TextTitulo from "@/components/atoms/TextTitulo";
import InputText from "@/components/atoms/InputText";
import TextArea from "@/components/atoms/TextArea";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import FormRow from "@/components/molecules/contacto/FormRow";
import FormContainer from "@/components/molecules/contacto/FormContainer";
import { ContactoInput } from "@/types/admin/contacto";
import { useContactos } from "@/hooks/useContactos";

const defaultFormaData: ContactoInput = {
  first_name: "",
  last_name: "",
  phone: "",
  district: "",
  request_detail: "",
  message: ""
}

const SolicitudInfo: React.FC = () => {
  const [formData, setFormData] = useState<ContactoInput>(defaultFormaData);
  const { createContacto, isLoading, error } = useContactos();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    if (formData.first_name.trim() === "" || formData.last_name.trim() === "" || formData.phone.trim() === "" || formData.message.trim() === "") {
      alert("Por favor complete los campos obligatorios.");
      return;
    } else if (formData.message.trim().length < 10) {
      alert("El mensaje debe tener al menos 10 caracteres.");
      return;
    } else if (formData.phone.trim().length !== 9) {
      alert("El teléfono debe tener 9 números.");
      return;
    }

    const success = await createContacto(formData)
    if (success) {
      alert("Mensaje enviado")
      setFormData(defaultFormaData)
    } else {
      alert(error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phone" && value.length > 9 || Number(value) < 0) {
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 text-center">
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
              <InputText placeholder="Nombre" name="first_name" required value={formData.first_name} onChange={handleInputChange} />
              <InputText placeholder="Apellido" name="last_name" required value={formData.last_name} onChange={handleInputChange} />
            </FormRow>

            {/* Teléfono / Distrito */}
            <FormRow columns={2}>
              <InputText type="number" placeholder="Teléfono" name="phone" required value={formData.phone} onChange={handleInputChange}/>
              <InputText placeholder="Distrito" name="district" value={formData.district} onChange={handleInputChange}/>
            </FormRow>

            <InputText placeholder="Detalle de solicitud" name="request_detail" value={formData.request_detail} onChange={handleInputChange}/>

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
