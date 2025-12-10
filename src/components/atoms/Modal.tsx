'use client';

import { useEffect } from "react";
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
        lg: "max-w-3xl"
    };
    const bgClass = className.includes("bg-") ? "" : "bg-white";
    const textTitleClass = className.includes("text-white") ? "text-white" : "text-[#203565]";
    const closeBtnClass = className.includes("text-white") ? "text-white hover:text-gray-200" : "text-gray-400 hover:text-gray-600";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className={`${sizeClasses[size]} w-full mx-4 rounded-2xl shadow-xl overflow-hidden ${bgClass} ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                        <h2 className={`text-xl font-bold ${textTitleClass}`}>{title}</h2>
                        <button
                            onClick={onClose}
                            className={`${closeBtnClass} transition-colors`}
                        >
                            <IoClose size={24} />
                        </button>
                    </div>
                )}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}