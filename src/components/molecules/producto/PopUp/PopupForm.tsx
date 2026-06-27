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
    className="w-full h-[161px] md:h-[204px] bg-[#F3F3F3] px-[15px] md:px-[13px] flex flex-col gap-[9px] md:gap-[13px] pt-4 md:pt-5 rounded-2xl [box-shadow:8px_4px_4px_-2px_rgba(0,_0,_0,_0.06)]"
  >
    <div className="relative">
      <User className="pointer-events-none absolute left-4 top-1/2 h-[13px] w-[13px] md:h-4 md:w-4 -translate-y-1/2 text-gray-400 z-10" />
      <InputField
        placeholder="Nombre"
        value={formData.name}
        className="h-[27px] md:h-8 bg-white !text-[7.5px] md:!text-[11px] w-full pl-9 md:pl-10 py-2 rounded-lg md:rounded-[10px] border border-gray-200 focus:border-[#6DE1E3] focus:ring-2 focus:ring-[#6DE1E3]/30 transition"
        error={errors.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
    </div>

    <div className="relative">
      <Phone className="pointer-events-none absolute left-4 top-1/2 h-[13px] w-[13px] md:h-4 md:w-4 -translate-y-1/2 text-gray-400 z-10" />
      <InputField
        placeholder="Teléfono"
        maxLength={9}
        value={formData.phone}
        className="h-[27px] md:h-8 bg-white !text-[7.5px] md:!text-[11px] w-full pl-9 md:pl-10 py-2 rounded-lg md:rounded-[10px] border border-gray-200 focus:border-[#6DE1E3] focus:ring-2 focus:ring-[#6DE1E3]/30 transition"
        error={errors.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
      />
    </div>

    <div className="relative">
      <Mail className="pointer-events-none absolute left-4 top-1/2 h-[13px] w-[13px] md:h-4 md:w-4 -translate-y-1/2 text-gray-400 z-10" />
      <InputField
        placeholder="Correo"
        type="email"
        value={formData.email}
        className="h-[27px] md:h-8 bg-white !text-[7.5px] md:!text-[11px] w-full pl-9 md:pl-10 py-2 rounded-lg md:rounded-[10px] border border-gray-200 focus:border-[#6DE1E3] focus:ring-2 focus:ring-[#6DE1E3]/30 transition"
        error={errors.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
    </div>
    {errors.general && (<div className="text-red-500 text-sm">{errors.general}</div>)}
      {/*bg-gradient-to-r from-[#6DE1E3] via-[#3ECAD0] to-[#0ea5b7]*/}
      <ButtonPrimary

        disabled={isSubmitting}
        // style={{ backgroundColor: buttonColor }}
        style={{
            backgroundColor: buttonColor,
            boxShadow: `2px 8px 12px ${buttonColor}66`,
            color: buttonTextColor
          }}
        className="flex m-auto items-center justify-center !p-0 w-[120px] md:w-[144px] h-[26px] md:h-[34px] rounded-lg md:rounded-[10px] hover:scale-[1.02] active:scale-[1.02] !text-[8px] md:!text-[11px] font-bold pl-9 tracking-wide transition-all disabled:opacity-50 mt-[1px] mb-[10px] md:mb-[14px]"
      >
        {isSubmitting ? "Enviando..." : buttonText}
      </ButtonPrimary>
  </form>
);

export default PopupForm;
