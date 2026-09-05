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
    const dialogRef = useRef<HTMLDivElement>(null);    

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
            dialogRef.current?.focus();
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
            onMouseDown={onClose}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                tabIndex={-1}            
                className={`
        ${sizeClasses[size]}
        w-full
        mx-4
        max-h-[95vh]
        sm:max-h-[90vh]
        flex flex-col
        rounded-xl sm:rounded-2xl
        shadow-xl
        overflow-hidden
        ${bgClass}
        ${className}
    `}
                onMouseDown={(e) => e.stopPropagation()}
            >
                {title && (
                    <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 shrink-0 border-b border-gray-100 dark:border-white/5 min-w-0">
                        <h2 id={titleId} className={`text-lg sm:text-xl font-bold truncate dark:text-[#ECECEC]/80 ${textTitleClass}`}>
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

                <div className="
        p-4 pt-3
        sm:p-6 sm:pt-4
        overflow-y-auto
        overflow-x-hidden
        flex-1
        min-w-0
        dark:bg-[#1C2347]
        [&::-webkit-scrollbar]:w-1.5
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-thumb]:bg-white/20
        [&::-webkit-scrollbar-thumb]:rounded-full
    ">
                    {children}
                </div>
            </div>
        </div>
    );
}