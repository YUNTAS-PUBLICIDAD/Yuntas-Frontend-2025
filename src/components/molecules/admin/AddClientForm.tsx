'use client';

import { useState } from "react";
import InputForm from "@/components/atoms/InputForm";
import Button from "@/components/atoms/Button";
import { LeadInput } from "@/types/admin/lead";

const defaultClientFormData: LeadInput = {
    name: "",
    phone: "",
    email: "",
    product_id: 0,
    source_id: 1,
};

interface AddClientFormProps {
    onSubmit: (data: LeadInput) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export default function AddClientForm({ onSubmit, onCancel, isLoading = false }: AddClientFormProps) {
    const [formData, setFormData] = useState<LeadInput>(defaultClientFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "phone" && (value.length > 9 || Number(value) < 0)) return;

        setFormData(prev => ({
            ...prev,
            [name]: name === "product_id" ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
            <InputForm
                label="Producto ID"
                name="product_id"
                type="number"
                value={formData.product_id || ""}
                onChange={handleChange}
                placeholder="0"
                min={1}
            />
            <InputForm
                label="Fecha"
                name="fecha"
                type="date"
                value={""}
                onChange={() => { }}
            />

            <div className="flex gap-4 mt-4">
                <Button type="submit" variant="primary" size="md" className="flex-1" disabled={isLoading}>
                    { isLoading ? "Añadiendo" : "Añadir Cliente"}
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