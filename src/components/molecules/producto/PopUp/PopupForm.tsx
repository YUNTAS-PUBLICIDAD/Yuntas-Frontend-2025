import React from "react";
import InputField from "@/components/atoms/InputField";
import ButtonPrimary from "@/components/atoms/PrimaryButton";
import { LeadInput } from "@/types/admin/lead";
import { Mail, Phone, User } from "lucide-react";

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
  buttonTextColor?: string;
}

const PopupForm: React.FC<PopupFormProps> = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  buttonText,
  isSubmitting,
  buttonColor = "#310eb3",
  buttonTextColor
}) => (
  <form
    onSubmit={handleSubmit}
    className="w-full space-y-3"
  >
    <div className="relative">
      <User className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <InputField
        placeholder="Nombre"
        value={formData.name}
        className="text-xs w-full pl-11 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6DE1E3] focus:ring-2 focus:ring-[#6DE1E3]/30 transition"
        error={errors.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
    </div>

    <div className="relative">
      <Phone className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <InputField
        placeholder="Teléfono"
        maxLength={9}
        value={formData.phone}
        className="text-xs w-full pl-11 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6DE1E3] focus:ring-2 focus:ring-[#6DE1E3]/30 transition"
        error={errors.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
      />
    </div>

    <div className="relative">
      <Mail className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <InputField
        placeholder="Correo"
        type="email"
        value={formData.email}
        className="text-xs w-full pl-11 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6DE1E3] focus:ring-2 focus:ring-[#6DE1E3]/30 transition"
        error={errors.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
    </div>
    {errors.general && (<div className="text-red-500 text-sm">{errors.general}</div>)}
    <div className="flex justify-center ">
      {/*bg-gradient-to-r from-[#6DE1E3] via-[#3ECAD0] to-[#0ea5b7]*/}
      <ButtonPrimary

        disabled={isSubmitting}
        // style={{ backgroundColor: buttonColor }}
        style={{
            backgroundColor: buttonColor,
            boxShadow: `0 10px 25px ${buttonColor}66`,
            color: buttonTextColor
          }}
        className="py-3 px-4 rounded-xl shadow-[0_10px_25px_rgba(109,225,227,0.4)] hover:scale-[1.02] active:scale-[1.02] font-bold text-sm tracking-wide transition-all disabled:opacity-50 mt-2 sm:mt-3"
      >
        {isSubmitting ? "Enviando..." : buttonText}
      </ButtonPrimary>
    </div>
  </form>
);

export default PopupForm;
