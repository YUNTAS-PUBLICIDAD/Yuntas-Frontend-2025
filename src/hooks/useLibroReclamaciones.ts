'use client'

import { useState } from "react";
import { ReclamoInput } from "@/types/admin/reclamo";
import { useReclamos } from "@/hooks/useReclamos";
import { showToast } from "@/utils/showToast";
const defaultFormData: ReclamoInput = {
    first_name: "",
    last_name: "",
    document_type_id: 0,
    document_number: "",
    email: "",
    phone: "",
    claim_type_id: 0,
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

        if (name === "document_number" && formData.document_type_id === 1) {
            if (value.length > 8 || Number(value) < 0) return;
        }

        if (name === "document_number" && formData.document_type_id === 2) {
            if (value.length > 12) return;
        }

        // Teléfono: Máximo 9 números.
        if (name === "phone" && (value.length > 9 || Number(value) < 0)) return;

        // Monto Reclamado: Evitar números excesivos o negativos.
        if (name === "claimed_amount" && (value.length > 10 || Number(value) < 0)) return;

        let newValue: string | number = value;

        if (name === "document_type_id") {
            newValue = Number(value);
        }

        // Si es el Select de Producto, convertir a número
        if (name === "product_id") {
            newValue = Number(value);
        }

        if (name === "claimed_amount") {
            newValue = value === "" ? 0 : parseFloat(value);
        }

        setFormData(prev => ({ ...prev, [name]: newValue }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isLoading) return false;

        // Campos obligatorios básicos
        if (formData.first_name.trim() === "" || formData.last_name.trim() === "" || formData.phone?.trim() === "" || formData.detail.trim() === "" || formData.email.trim() === "" || formData.document_number.trim() === "") {
            showToast.warning("Por favor complete los campos obligatorios");
            return false;
        }

        // Validación detalle
        else if (formData.detail.trim().length < 10) {
            showToast.warning("El detalle debe tener al menos 10 caracteres");
            return false;
        }

        // Validación teléfono
        else if (formData.phone?.trim().length !== 9) {
            showToast.warning("El teléfono debe tener 9 números");
            return false;
        }

        // Validación específica DNI 
        else if (formData.document_type_id === 1 && formData.document_number?.trim().length !== 8) {
            showToast.warning("El DNI debe tener 8 números");
            return false;
        }

        // Validación específica Pasaporte
        else if (formData.document_type_id === 2 && formData.document_number?.trim().length < 6) {
            showToast.warning("El número de pasaporte es muy corto");
            return false;
        }

        // Preparar payload para backend
        const payload = { ...formData };
        payload.claim_type_id = 1;

        if (payload.product_id === 0) delete payload.product_id;
        if (!payload.purchase_date) delete payload.purchase_date;
        if (!payload.claimed_amount) delete payload.claimed_amount;

        const response = await createReclamo(payload);

        if (response.success) {
            showToast.success("Reclamo enviado correctamente");
            setFormData(defaultFormData);
            return true;
        } else {
            showToast.error(response.message || "Error al enviar el reclamo");
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