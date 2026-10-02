'use client';

import { useEffect, useId, useRef } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = "md",
    className = ""
}: ModalProps) {
    const titleId = useId();

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-4xl"
    };

    const bgClass = className.includes("bg-") ? "" : "bg-white text-brand-blue dark:bg-[#1C2347] dark:text-white";
    const textTitleClass = className.includes("text-white") ? "text-white" : "text-[#0D1030] dark:text-white";
    const closeBtnClass = className.includes("text-white")
        ? "text-white hover:text-gray-200"
        : "text-gray-400 hover:text-gray-600 dark:text-white/60 dark:hover:text-white";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                className={`${sizeClasses[size]} w-[calc(100vw-16px)] max-h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col ${bgClass} ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <div className="flex items-center justify-between px-6 py-4 flex-shrink-0">
                        <h2 id={titleId} className={`text-xl font-bold dark:text-[#ECECEC]/80 ${textTitleClass}`}>
                            {title}
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Cerrar"
                            className={closeBtnClass}
                        >
                            <IoClose size={24} />
                        </button>
                    </div>
                )}

                {/* Barra de desplazamiento corta, limpia y visible al instante */}
                <div 
                    className="px-6 py-2 overflow-y-auto overflow-x-hidden flex-1 dark:bg-[#1C2347]"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#94a3b8 transparent'
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}