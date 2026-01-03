import { forwardRef } from "react";

interface InputTextProps {
    placeholder?: string;
    type?: string;
    className?: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(({
    placeholder,
    type = "text",
    className = "",
    name,
    value,
    onChange,
    required = false,
    disabled = false
}, ref) => {
    return (
        <input
            ref={ref}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={`w-full px-6 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#23C1DE] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        />
    );
});

InputText.displayName = "InputText";

export default InputText;