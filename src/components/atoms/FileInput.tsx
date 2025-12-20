import React from "react";

interface FileInputProps {
    label?: string;
    name?: string;
    onChange: (file: File | null) => void;
    accept?: string;
    required?: boolean;
    disabled?: boolean;
    helperText?: string;
    buttonText?: string;
    fileName?: string;
    className?: string;
}

export default function FileInput({
    label,
    name,
    onChange,
    accept = "image/*",
    required = false,
    disabled = false,
    helperText,
    buttonText = "Seleccionar archivo",
    fileName = "Ninguno asignado",
    className = "",
}: FileInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onChange(file);
    };

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block mb-2 font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors">
                    {buttonText}
                </span>
                <span className="text-gray-600 text-sm truncate max-w-[200px]">
                    {fileName}
                </span>
                <input
                    type="file"
                    name={name}
                    accept={accept}
                    onChange={handleChange}
                    required={required}
                    disabled={disabled}
                    className="hidden"
                />
            </label>

            {helperText && (
                <small className="text-gray-500 block mt-1">
                    {helperText}
                </small>
            )}
        </div>
    );
}
