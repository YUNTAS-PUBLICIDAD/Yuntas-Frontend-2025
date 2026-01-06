'use client';

import { useEffect, useState } from "react";
import InputForm from "@/components/atoms/InputForm";
import Button from "@/components/atoms/Button";
import { LeadInput } from "@/types/admin/lead";
import { useProductos } from "@/hooks/useProductos";
import SelectForm from "@/components/atoms/SelectForm";

const defaultClientFormData: LeadInput = {
    name: "",
    phone: "",
    email: "",
    product_id: 0,
    source_id: 1,
};

interface LeadFormProps {
    onSubmit: (data: LeadInput) => void;
    onCancel: () => void;
    isLoading?: boolean;
    initialData?: LeadInput | null;
}

export default function LeadForm({ onSubmit, onCancel, isLoading = false, initialData = null }: LeadFormProps) {
    const [formData, setFormData] = useState<LeadInput>(defaultClientFormData);
    const { getProductos, productos } = useProductos();

    useEffect(() => {
        getProductos();
    }, [])

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "phone" && (value.length > 9 || Number(value) < 0)) return;

        setFormData(prev => ({
            ...prev,
            [name]: name === "product_id" ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.product_id === 0) {
            delete formData.product_id;
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputForm
                label="Nombres"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Ingrese el nombre completo"
                required
            />
            <InputForm
                label="Teléfono"
                name="phone"
                type="number"
                value={formData.phone || ""}
                onChange={handleChange}
                placeholder="987654321"
                required
            />
            <InputForm
                label="Gmail"
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="ejemplo@gmail.com"
                required
            />
            <SelectForm
                label="Productos"
                name="product_id"
                value={formData.product_id || ""}
                options={productos}
                onChange={handleChange}
            />
            {/* <InputForm
                label="Fecha"
                name="fecha"
                type="date"
                value={""}
                onChange={() => { }}
            /> */}

            <div className="flex gap-4 mt-4">
                <Button type="submit" variant="primary" size="md" className="flex-1" disabled={isLoading}>
                    {isLoading ? (initialData !== null ? "Guardando..." : "Añadiendo...") : (initialData !== null ? "Guardar" : "Añadir Cliente")}
                </Button>
                <Button
                    type="button"
                    variant="tertiary"
                    size="md"
                    className="flex-1"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Cancelar
                </Button>
            </div>
        </form>
    );
}