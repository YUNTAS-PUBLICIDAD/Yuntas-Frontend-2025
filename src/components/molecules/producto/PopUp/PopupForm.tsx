import React from "react";
import InputField from "@/components/atoms/InputField";
import ButtonPrimary from "@/components/atoms/PrimaryButton";
import { LeadInput } from "@/types/admin/lead";

interface PopupFormProps {
  formData: LeadInput
  errors: {
    name?: string;
    phone?: string;
    email?: string;
    general?: string;
  };
  handleChange: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
  isSubmitting: boolean;
  buttonColor?: string;
}

const PopupForm: React.FC<PopupFormProps> = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  buttonText,
  isSubmitting,
  buttonColor = "#310eb3",
}) => (
  <form
    onSubmit={handleSubmit}
    className="space-y-2 flex flex-col items-center"
  >
    <InputField
      placeholder="Nombre"
      value={formData.name}
      className="text-xs"
      error={errors.name}
      onChange={(e) => handleChange("name", e.target.value)}
    />

    <InputField
      placeholder="Teléfono"
      maxLength={9}
      value={formData.phone}
      className="text-xs"
      error={errors.phone}
      onChange={(e) => handleChange("phone", e.target.value)}
    />

    <InputField
      placeholder="Correo"
      type="email"
      value={formData.email}
      className="text-xs"
      error={errors.email}
      onChange={(e) => handleChange("email", e.target.value)}
    />
    {errors.general && (<div className="text-red-500 text-sm">{errors.general}</div>)}
    <div>
      <ButtonPrimary
        disabled={isSubmitting}
        style={{ backgroundColor: buttonColor }}
        className="font-montserrat font-semibold text-sm pt-[5px] pr-[10px] pb-[5px] pl-[10px] rounded-lg transition-all disabled:opacity-50 mt-2 sm:mt-3"
      >
        {isSubmitting ? "Enviando..." : buttonText}
      </ButtonPrimary>
    </div>
  </form>
);

export default PopupForm;
