import React from "react";
import InputField from "@/components/atoms/InputField";
import ButtonPrimary from "@/components/atoms/PrimaryButton";

interface PopupFormProps {
  formData: {
    name: string;
    phone: string;
    email: string;
  };
  errors: {
    name?: string;
    phone?: string;
    email?: string;
  };
  handleChange: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
  isSubmitting: boolean;
}

const PopupForm: React.FC<PopupFormProps> = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  buttonText,
  isSubmitting,
}) => (
  <form
    onSubmit={handleSubmit}
    className="space-y-3 flex flex-col items-center"
  >
    <InputField
      placeholder="Nombre"
      value={formData.name}
      error={errors.name}
      onChange={(e) => handleChange("name", e.target.value)}
    />

    <InputField
      placeholder="Teléfono"
      maxLength={9}
      value={formData.phone}
      error={errors.phone}
      onChange={(e) => handleChange("phone", e.target.value)}
    />

    <InputField
      placeholder="Correo"
      type="email"
      value={formData.email}
      error={errors.email}
      onChange={(e) => handleChange("email", e.target.value)}
    />
    <div>
      <ButtonPrimary
        disabled={isSubmitting}
        className="font-montserrat font-semibold text-md pt-[5px] pr-[10px] pb-[5px] pl-[10px] rounded-lg transition-all disabled:opacity-50 mt-2 sm:mt-3"
      >
        {isSubmitting ? "Enviando..." : buttonText}
      </ButtonPrimary>
    </div>
  </form>
);

export default PopupForm;
