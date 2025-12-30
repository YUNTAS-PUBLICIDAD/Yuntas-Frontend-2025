"use client";

import { useState } from "react";
import InputForm from "@/components/atoms/InputForm";
import Button from "@/components/atoms/Button";

interface AddUserFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function AddUserForm({ onSubmit, onCancel }: AddUserFormProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    celular: "",
    roles: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ ENVIAMOS TODO, SIN TRANSFORMAR
    onSubmit(formData);

    // ❌ NO limpiamos aquí
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputForm label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
      <InputForm label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      <InputForm label="Celular" name="celular" value={formData.celular} onChange={handleChange} />
      <InputForm label="Rol" name="roles" value={formData.roles} onChange={handleChange} required />
      <InputForm label="Contraseña" name="password" type="password" value={formData.password} onChange={handleChange} required />
      <InputForm label="Confirmar contraseña" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />

      <div className="col-span-2 flex justify-end gap-4 mt-4">
        <Button type="button" variant="tertiary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Agregar usuario
        </Button>
      </div>
    </form>
  );
}
