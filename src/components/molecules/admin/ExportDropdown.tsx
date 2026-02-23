'use client';

import { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface ExportOption {
    label: string;
    onClick: () => void;
}

interface ExportDropdownProps {
  options: {
    label: string;
    onClick: () => void;
  }[];
  label?: string;
  className?: string;
  buttonClassName?: string; // 👈 NUEVO
}


export default function ExportDropdown({
    options,
    label = "EXPORTAR",
    className,
    buttonClassName, 
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
            className={`
              flex items-center justify-center gap-2
              bg-[#203565]
              dark:bg-[#293296]
              text-white
              font-semibold
              text-sm
              rounded-[10px]
              hover:opacity-90
              transition-all
              ${buttonClassName ?? "px-4 h-[40px]"}
              ${className ?? "w-auto"}
            `}
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
