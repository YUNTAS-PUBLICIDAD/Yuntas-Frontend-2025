'use client';

import { useState } from "react";
import InputForm from "@/components/atoms/InputForm";
import Button from "@/components/atoms/Button";

interface ClientFormData {
    nombre: string;
    telefono: string;
    gmail: string;
    productoId: number;
    fecha: string;
}

interface AddClientFormProps {
    onSubmit: (data: ClientFormData) => void;
    onCancel: () => void;
}

export default function AddClientForm({ onSubmit, onCancel }: AddClientFormProps) {
    const [formData, setFormData] = useState<ClientFormData>({
        nombre: "",
        telefono: "",
        gmail: "",
        productoId: 0,
        fecha: new Date().toISOString().split('T')[0]
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "productoId" ? Number(value) : value
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
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre completo"
                required
            />
            <InputForm
                label="Teléfono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+51 999 999 999"
                required
            />
            <InputForm
                label="Gmail"
                name="gmail"
                type="email"
                value={formData.gmail}
                onChange={handleChange}
                placeholder="ejemplo@gmail.com"
                required
            />
            <InputForm
                label="Producto ID"
                name="productoId"
                type="number"
                value={formData.productoId}
                onChange={handleChange}
                placeholder="0"
            />
            <InputForm
                label="Fecha"
                name="fecha"
                type="date"
                value={formData.fecha}
                onChange={handleChange}
                required
            />
            
            <div className="flex gap-4 mt-4">
                <Button type="submit" variant="primary" size="md" className="flex-1">
                    Añadir Cliente
                </Button>
                <Button 
                    type="button" 
                    variant="tertiary" 
                    size="md" 
                    className="flex-1"
                    onClick={onCancel}
                >
                    Cancelar
                </Button>
            </div>
        </form>
    );
}