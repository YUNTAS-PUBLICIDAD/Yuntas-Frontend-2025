import React from "react";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    label?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    helperText?: string;
    selectedText?: string;
}

export default function Select({
    label,
    name,
    value,
    onChange,
    options,
    placeholder = "-- Selecciona una opción --",
    required = false,
    disabled = false,
    className = "",
    helperText,
    selectedText,
}: SelectProps) {
    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className="w-full">
            {label && (
                <label className="block mb-2 font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`w-full bg-white text-black p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {helperText && (
                <small className="text-gray-500 block mt-1">
                    {helperText}
                </small>
            )}

            {selectedText && value && selectedOption && (
                <p className="text-xs text-gray-500 mt-1">
                    {selectedText}: <strong>{selectedOption.label}</strong>
                </p>
            )}
        </div>
    );
}