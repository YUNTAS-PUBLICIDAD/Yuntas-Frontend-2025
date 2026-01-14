'use client';

import { useEffect, useState } from "react";
import InputForm from "@/components/atoms/InputForm";
import Button from "@/components/atoms/Button";
import { User, UserInput } from "@/types/admin/user";
import SelectForm from "@/components/atoms/SelectForm";

const defaultUserFormData: UserInput = {
    name: "",
    email: "",
    password: "",
    role_id: 0,
};

interface UserFormProps {
    onSubmit: (data: UserInput) => void;
    onCancel: () => void;
    isLoading?: boolean;
    initialData?: User | null;
}

export default function UserForm({ onSubmit, onCancel, isLoading = false, initialData = null }: UserFormProps) {
    const [formData, setFormData] = useState<UserInput>(defaultUserFormData);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                email: initialData.email,
                role_id: initialData.role_id || 0,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: name === "role_id" ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.role_id === 0) {
            delete formData.role_id;
        }
        if (initialData !== null && formData.password?.length === 0) {
            delete formData.password;
        }
        if (formData.password && formData.password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return;
        }
        
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputForm
                label="Nombre"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Ingrese el nombre"
                required
            />
            <InputForm
                label="Email"
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="ejemplo@gmail.com"
                required
            />
            <InputForm
                label={initialData !== null ? "Nueva Contraseña" : "Contraseña"}
                name="password"
                type="password"
                value={formData.password || ""}
                onChange={handleChange}
                placeholder={initialData !== null ? "Ingrese una nueva contraseña" : "Ingrese una contraseña"}
                required={initialData === null}
            />
            <SelectForm
                label="Seleccione un rol"
                name="role_id"
                value={formData.role_id || ""}
                options={[
                    { id: 1, name: "Administrador" },
                    { id: 2, name: "Usuario" },
                ]}
                onChange={handleChange}
                required
            />

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