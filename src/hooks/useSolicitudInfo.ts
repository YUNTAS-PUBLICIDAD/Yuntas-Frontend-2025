'use client'

import { useState } from "react";
import { showToast } from "@/utils/showToast";
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

export function useSolicitudInfo() {
    const [formData, setFormData] = useState<ContactoInput>(defaultFormaData);
    const { createContacto, isLoading, error } = useContactos();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "phone" && (value.length > 9 || Number(value) < 0)) {
            return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isLoading) return false;

        if (formData.first_name.trim() === "" || formData.last_name.trim() === "" || formData.phone.trim() === "" || formData.message.trim() === "") {
            showToast.warning("Por favor complete los campos obligatorios");
            return false;
        } else if (formData.message.trim().length < 10) {
            showToast.warning("El mensaje debe tener al menos 10 caracteres");
            return false;
        } else if (formData.phone.trim().length !== 9) {
            showToast.warning("El teléfono debe tener 9 números");
            return false;
        }

        const response = await createContacto(formData);

        if (response.success) {
            showToast.success("Mensaje enviado");
            setFormData(defaultFormaData);
            return true;
        } else {
            showToast.error(response.message || "Error al enviar el mensaje");
            return false;
        }
    };

    return {
        formData,
        setFormData,
        handleInputChange,
        handleSubmit,
        isLoading,
        error
    };
}