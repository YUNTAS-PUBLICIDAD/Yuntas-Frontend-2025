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

    const bgClass = className.includes("bg-") ? "" : "bg-white text-[#203565]";
    const textTitleClass = className.includes("text-white") ? "text-white" : "text-[#203565]";
    const closeBtnClass = className.includes("text-white")
        ? "text-white hover:text-gray-200"
        : "text-gray-400 hover:text-gray-600";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onMouseDown={onClose}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                tabIndex={-1}            
                className={`${sizeClasses[size]} w-full mx-4 rounded-2xl shadow-xl overflow-hidden ${bgClass} ${className}`}
                onMouseDown={(e) => e.stopPropagation()}
            >
                {title && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/20 dark:bg-[#141A3F]">
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

                <div className="p-6 pt-0 overflow-y-auto dark:bg-[#141A3F]">
                    {children}
                </div>
            </div>
        </div>
    );
}