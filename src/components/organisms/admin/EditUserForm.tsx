'use client';

import { useState, useEffect } from "react";
import Modal from "@/components/atoms/Modal";
import InputForm from "@/components/atoms/InputForm";
import Button from "@/components/atoms/Button";

/* ===== Tipado ===== */
export interface UserData {
    id: number;
    name: string;
    email: string;
}

interface EditUserFormProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserData | null;
    onSave: (updatedUser: UserData) => void; // 🔹 Callback
}

export default function EditUserForm({
    isOpen,
    onClose,
    user,
    onSave
}: EditUserFormProps) {

    const [formData, setFormData] = useState<UserData>({
        id: 0,
        name: "",
        email: "",
    });

    /* Cargar usuario seleccionado */
    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    if (!user) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        onSave(formData); // 🔹 Llamamos al padre
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="EDITAR USUARIO"
        >
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

                <div className="flex gap-4 mt-4">
                    <Button
                        type="button"
                        variant="primary"
                        size="md"
                        className="flex-1"
                        onClick={handleSave}
                    >
                        Guardar cambios
                    </Button>

                    <Button
                        type="button"
                        variant="tertiary"
                        size="md"
                        className="flex-1"
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
