'use client';

import { useState, useRef, useEffect } from 'react';
import { ReactNode } from 'react';
import { ChevronDown, Download } from 'lucide-react';

interface ExportOption {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
}

interface ExportDropdownProps {
  options: ExportOption[];
  label?: string;
  className?: string;
  buttonClassName?: string;
  icon?: ReactNode;
  align?: 'left' | 'right';
  direction?: 'down' | 'up';
}


export default function ExportDropdown({
    options,
    label = "EXPORTAR",
    className,
    buttonClassName, 
    icon = <Download className="h-4 w-4" />,
    align = 'right',
    direction = 'down',
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

    const positionClasses = [
        direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2',
        align === 'right' ? 'right-0' : 'left-0',
    ].join(' ');

    return (
        <div className={`relative ${isOpen ? 'z-50' : 'z-10'}`} ref={dropdownRef}>
            {/* Botón principal */}
            <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
                inline-flex items-center justify-center gap-2
                bg-brand-blue
                dark:bg-[#293296]
                text-white
                font-semibold
                text-xs
                md:text-sm
                lg:text-base
                rounded-[10px]
                hover:opacity-90
                transition-all
                ${buttonClassName ?? "px-4 h-[40px]"}
                ${className ?? "w-auto"}
            `}
          >


                <span className="inline-flex items-center justify-center shrink-0">{icon}</span>
                {label}
                <ChevronDown
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    size={12}
                />
            </button>

            {/* Menú desplegable */}
            {isOpen && (
                <div className={`absolute ${positionClasses} min-w-[170px] bg-white dark:bg-[#1C2347] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-50 overflow-hidden`}>
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionClick(option.onClick)}
                            className="w-full px-4 py-3 text-left text-sm text-[#0D1030] dark:text-white hover:bg-[#23C1DE] hover:text-white dark:hover:bg-[#23C1DE] dark:hover:text-white transition-colors border-b border-gray-100 dark:border-white/10 last:border-b-0 flex items-center gap-2"
                        >
                            {option.icon && <span className="shrink-0">{option.icon}</span>}
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
