'use client';

import { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface ExportOption {
    label: string;
    onClick: () => void;
}

interface ExportDropdownProps {
    options: ExportOption[];
    label?: string;
}

export default function ExportDropdown({
    options,
    label = "EXPORTAR"
}: ExportDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleOptionClick = (onClick: () => void) => {
        onClick();
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Botón principal */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-[#23C1DE] text-white font-semibold text-sm md:text-base rounded-full hover:opacity-90 transition-all"
            >
                {label}
                <FaChevronDown
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    size={12}
                />
            </button>

            {/* Menú desplegable */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 min-w-[160px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionClick(option.onClick)}
                            className="w-full px-4 py-3 text-left text-sm text-[#0D1030] hover:bg-[#23C1DE] hover:text-white transition-colors border-b border-gray-100 last:border-b-0"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
