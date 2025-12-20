'use client';

import { useState } from "react";
import InputForm from "@/components/atoms/InputForm";
import Button from "@/components/atoms/Button";

interface UserFormData {
    nombre: string;
    email: string;
    celular: string;
    roles: string;
    password: string;
    confirmPassword: string;
}

interface AddUserFormProps {
    onSubmit: (data: UserFormData) => void;
    onCancel: () => void;
}

export default function AddUserForm({ onSubmit, onCancel }: AddUserFormProps) {
    const [formData, setFormData] = useState<UserFormData>({
        nombre: "",
        email: "",
        celular: "",
        roles: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputForm
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre"
                required
            />

            <InputForm
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="usuario@email.com"
                required
            />

            <InputForm
                label="Celular"
                name="celular"
                type="tel"
                value={formData.celular}
                onChange={handleChange}
                placeholder="+51 999 999 999"
            />

            <InputForm
                label="Roles (separados por coma)"
                name="roles"
                value={formData.roles}
                onChange={handleChange}
                placeholder="admin, vendedor"
            />

            <InputForm
                label="Contraseña"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                required
            />

            <InputForm
                label="Confirmar contraseña"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="********"
                required
            />

            {/* Botones */}
            <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-4">
                <Button
                    type="button"
                    variant="tertiary"
                    size="md"
                    onClick={onCancel}
                >
                    Cancelar
                </Button>

                <Button
                    type="submit"
                    variant="primary"
                    size="md"
                >
                    Agregar usuario
                </Button>
            </div>
        </form>
    );
}
