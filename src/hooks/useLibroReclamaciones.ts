'use client'

import { useState } from "react";
import toast from 'react-hot-toast';
import { ReclamoInput } from "@/types/admin/reclamo";
import { useReclamos } from "@/hooks/useReclamos";

const defaultFormData: ReclamoInput = {
    first_name: "",
    last_name: "",
    document_type_id: 1, 
    document_number: "",
    email: "",
    phone: "",
    claim_type_id: 1,    
    detail: "",
    product_id: 0,
    purchase_date: "",
    claimed_amount: 0
}

export function useLibroReclamaciones() {
    const [formData, setFormData] = useState<ReclamoInput>(defaultFormData);
    const { createReclamo, isLoading, error } = useReclamos();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let newValue: string | number = value;

        
        if (name === "document_type_id") {
            if (value === "Pasaporte" || value === "2") {
                newValue = 2;
            } else {
                newValue = 1;
            }
        }

        if (name === "document_number" && formData.document_type_id === 1 && (value.length > 8 || Number(value) < 0)) return;
        if (name === "document_number" && formData.document_type_id === 2 && value.length > 9) return;
        
        if (name === "phone" && (value.length > 9 || Number(value) < 0)) return;
    
       
        if (name === "claimed_amount" && (value.length > 10 || Number(value) < 0)) return;

        if (name === "product_id") newValue = Number(value);
        
        if (name === "claimed_amount") {
           
            newValue = value === "" ? 0 : parseFloat(value);
        }

        setFormData(prev => ({ ...prev, [name]: newValue }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isLoading) return false;

        // Validaciones del formulario
        if (formData.first_name.trim() === "" || formData.last_name.trim() === "" || formData.phone?.trim() === "" || formData.detail.trim() === "" || formData.email.trim() === "" || formData.document_number.trim() === "") {
            toast.error("Por favor complete los campos obligatorios");
            return false;
        } else if (formData.detail.trim().length < 10) {
            toast.error("El detalle debe tener al menos 10 caracteres");
            return false;
        } else if (formData.phone?.trim().length !== 9) {
            toast.error("El teléfono debe tener 9 números");
            return false;
        } else if (formData.document_type_id === 1 && formData.document_number?.trim().length !== 8) {
            toast.error("El DNI debe tener 8 números");
            return false;
        } else if (formData.document_type_id === 2 && formData.document_number?.trim().length < 6) { 
            toast.error("El número de documento es muy corto");
            return false;
        }


        const payload = { ...formData };
        payload.claim_type_id = 1; 

      
        if (payload.product_id === 0) delete payload.product_id;
        if (!payload.purchase_date) delete payload.purchase_date;
        if (!payload.claimed_amount) delete payload.claimed_amount;

        const response = await createReclamo(payload);

        if (response.success) {
            toast.success("Reclamo enviado correctamente");
            setFormData(defaultFormData);
            return true;
        } else {
            toast.error(response.message || "Error al enviar el reclamo");
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