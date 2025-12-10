'use client';

import { useState, useEffect } from "react";
import { api, API_ENDPOINTS } from "@/config"; 

export interface ClientData {
    id: number | string;
    nombre: string;
    gmail: string;
    telefono: string;
    producto: string; 
    fecha: string;
}

export interface Product {
    id: number;
    name: string;
}

export const useClientEdit = (initialData: ClientData | null, onClose: () => void) => {
    const [formData, setFormData] = useState<ClientData>({
        id: "",
        nombre: "",
        gmail: "",
        telefono: "",
        producto: "",
        fecha: ""
    });

    const [products, setProducts] = useState<Product[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                fecha: initialData.fecha || "" 
            });
        }
    }, [initialData]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/api/productos'); 
                const lista = Array.isArray(response.data) ? response.data : response.data.data;
                setProducts(lista || []);
            } catch (error) {
                console.error("Error cargando productos en el hook:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const formatDateForApi = (dateString: string) => {
        if (!dateString) return null;
        if (dateString.includes('-')) return dateString; 
        
        const parts = dateString.split('/');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        return dateString;
    };

    const handleSave = async () => {
        if (!formData.id) return;

        setIsSaving(true);
        try {
            const url = `${API_ENDPOINTS.ADMIN.INBOX.LEADS}/${formData.id}`;
            const payload = {
                name: formData.nombre,
                email: formData.gmail,
                telefono: formData.telefono, 
                product_id: Number(formData.producto), 
                created_at: formatDateForApi(formData.fecha)
            };

            await api.put(url, payload);
            
            console.log("✅ Cliente actualizado correctamente");
            onClose(); 
            window.location.reload(); 
            
        } catch (error: any) {
            console.error("❌ Error al guardar:", error);
            if (error.response?.status === 422) {
                const msg = error.response.data.message || "Error de validación";
                alert(`Error: ${msg}`);
            } else {
                alert("Ocurrió un error al guardar (500).");
            }
        } finally {
            setIsSaving(false);
        }
    };

    return {
        formData,
        products, 
        handleChange,
        handleSave,
        isSaving
    };
};