'use client';

import { IoClose } from "react-icons/io5";
import { useEffect } from "react";

interface InputListDinamicaProps {
    label: string;
    items: string[];
    onChange: (items: string[]) => void;
    placeholder?: string;
    helperText?: string;
    addButtonText?: string;
    required?: boolean;
}

export default function InputListDinamica({
    label,
    items,
    onChange,
    placeholder = "",
    helperText,
    addButtonText = "+ Agregar",
    required = false
}: InputListDinamicaProps) {

    useEffect(() => {
        if (items.length === 0) {
            onChange([""]);
        }
    }, []);

    const handleItemChange = (index: number, value: string) => {
        const newItems = [...items];
        newItems[index] = value;
        onChange(newItems);
    };

    const handleAddItem = () => {
        onChange([...items, ""]);
    };

    const handleRemoveItem = (index: number) => {
        if (required && items.length <= 1) {
            return;
        }

        const newItems = items.filter((_, i) => i !== index);
        onChange(newItems.length === 0 ? [""] : newItems);
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-[#203565] font-medium">{label} {required && <span className="text-red-500">*</span>} </label>

            {items.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                    <input
                        type="text"
                        value={item}
                        onChange={(e) => handleItemChange(index, e.target.value)}
                        placeholder={placeholder}
                        required={required && index === 0}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23C1DE] focus:border-transparent transition-all"
                    />
                    {(items.length > 1 || !required) && (
                        <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title={required && items.length === 1 ? "Campo requerido" : "Eliminar"}
                            disabled={required && items.length === 1}
                        >
                            <IoClose size={20} className={required && items.length === 1 ? "opacity-30" : ""} />
                        </button>
                    )}
                </div>
            ))}

            <button
                type="button"
                onClick={handleAddItem}
                className="text-[#23C1DE] hover:text-[#1ba8c2] font-medium text-sm self-start transition-colors"
            >
                {addButtonText}
            </button>

            {helperText && (
                <span className="text-gray-500 text-sm">{helperText}</span>
            )}
        </div>
    );
}