'use client';

import { useState } from "react";
import InputForm from "@/components/atoms/InputForm";
import Button from "@/components/atoms/Button";
import { AddUserFormProps } from "@/types/admin";

export default function AddUserForm({ onSubmit, onCancel }: AddUserFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role_id: 2, // Usuario normal por defecto
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "role_id" ? Number(value) : value
        }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <form className="flex flex-col gap-4">
            <InputForm
                label="Nombre"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <InputForm
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <InputForm
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <label>
                Rol:
                <select name="role_id" value={formData.role_id} onChange={handleChange}>
                    <option value={1}>Administrador</option>
                    <option value={2}>Usuario</option>
                </select>
            </label>

            <div className="flex gap-4 mt-4">
                <Button type="button" variant="primary" onClick={handleSubmit} className="flex-1">
                    Guardar
                </Button>
                <Button type="button" variant="tertiary" onClick={onCancel} className="flex-1">
                    Cancelar
                </Button>
            </div>
        </form>
    );
}
