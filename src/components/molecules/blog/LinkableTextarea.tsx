'use client';

import { useRef, useState } from "react";
import Button from "@/components/atoms/Button";
import InputAdmin from "@/components/atoms/InputAdmin";
import SelectForm from "@/components/atoms/SelectForm";
import TextareaAdmin from "@/components/atoms/TextAreaAdmin";
import Modal from "@/components/atoms/Modal";
import { showToast } from "@/utils/showToast";
import { FiLink, FiShoppingBag } from "react-icons/fi";
import { Producto } from "@/types/admin/producto";

interface LinkableTextareaProps {
    label: string;
    name: string;
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    helperText?: string;
    rows?: number;
    required?: boolean;
    productos?: Producto[];
    error?: string;
    hideProductLink?: boolean;
}

type LinkModalType = "custom" | "product";

type LinkSelection = {
    start: number;
    end: number;
    text: string;
};

function isSafeHttpUrl(value: string): boolean {
    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
}

function sanitizeMarkerLabel(value: string): string {
    return value.replace(/[\]|]/g, " ").trim();
}

function LinkToolbar({ onCustomLink, onProductLink, hideProductLink }: { onCustomLink: () => void; onProductLink: () => void; hideProductLink?: boolean }) {
    return (
        <div className="flex flex-wrap gap-2 items-center">
            <Button
                type="button"
                onClick={onCustomLink}
                size="sm"
                variant="tertiary"
            >
                <span className="inline-flex items-center gap-2">
                    <FiLink />
                    Enlace
                </span>
            </Button>
            {!hideProductLink && (
                <Button
                    type="button"
                    onClick={onProductLink}
                    size="sm"
                    variant="tertiary"
                >
                    <span className="inline-flex items-center gap-2">
                        <FiShoppingBag />
                        Producto
                    </span>
                </Button>
            )}
        </div>
    );
}

export default function LinkableTextarea({
    label,
    name,
    value,
    onValueChange,
    placeholder,
    helperText,
    rows = 6,
    required = false,
    productos = [],
    error,
    hideProductLink = false
}: LinkableTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [linkModalType, setLinkModalType] = useState<LinkModalType>("custom");
    const [linkSelection, setLinkSelection] = useState<LinkSelection | null>(null);
    const [customLinkUrl, setCustomLinkUrl] = useState("");
    const [selectedProductId, setSelectedProductId] = useState("");

    const getSelection = () => {
        const textarea = textareaRef.current;
        if (!textarea) return null;
        const start = textarea.selectionStart ?? 0;
        const end = textarea.selectionEnd ?? 0;
        if (start === end) return null;
        const text = textarea.value.slice(start, end);
        return { start, end, text } as LinkSelection;
    };

    const openLinkModal = (type: LinkModalType) => {
        const selection = getSelection();
        if (!selection) {
            showToast.warning("Selecciona texto para insertar el enlace");
            return;
        }
        setLinkSelection(selection);
        setLinkModalType(type);
        setCustomLinkUrl("");
        setSelectedProductId("");
        setIsLinkModalOpen(true);
    };

    const closeLinkModal = () => {
        setIsLinkModalOpen(false);
        setLinkSelection(null);
    };

    const insertMarkerAtSelection = (type: LinkModalType, target: string) => {
        if (!linkSelection) return;
        const safeLabel = sanitizeMarkerLabel(linkSelection.text);
        const marker = `[${type}:${target}|${safeLabel}]`;
        const updated = value.slice(0, linkSelection.start) + marker + value.slice(linkSelection.end);
        onValueChange(updated);
        closeLinkModal();
    };

    const handleInsertCustomLink = () => {
        const trimmedUrl = customLinkUrl.trim();
        if (!trimmedUrl) {
            showToast.warning("Ingresa un enlace valido");
            return;
        }
        if (!isSafeHttpUrl(trimmedUrl)) {
            showToast.warning("Solo se permiten enlaces http o https");
            return;
        }
        insertMarkerAtSelection("custom", trimmedUrl);
    };

    const handleInsertProductLink = () => {
        if (!selectedProductId) {
            showToast.warning("Selecciona un producto");
            return;
        }
        const selectedProduct = productos.find(
            (product) => String(product.id) === String(selectedProductId)
        );
        if (!selectedProduct?.slug) {
            showToast.warning("Producto no valido");
            return;
        }
        insertMarkerAtSelection("product", selectedProduct.slug);
    };

    

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-200 pb-2">
                <label htmlFor={name} className="text-[#203565] font-medium dark:text-[#ECECEC]/80">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                <LinkToolbar
                    onCustomLink={() => openLinkModal("custom")}
                    onProductLink={() => openLinkModal("product")}
                    hideProductLink={hideProductLink}
                />
            </div>
            <TextareaAdmin
                label={label}
                name={name}
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                placeholder={placeholder}
                helperText={helperText}
                rows={rows}
                required={required}
                textareaRef={textareaRef}
                showLabel={false}
                error={error}
                
            />

            <Modal
                isOpen={isLinkModalOpen}
                onClose={closeLinkModal}
                title={linkModalType === "custom" ? "Insertar enlace" : "Insertar enlace a producto"}
                size="sm"
            >
                <div className="flex flex-col gap-4">
                    {linkSelection?.text && (
                        <p className="text-xs text-gray-500">
                            Texto seleccionado: "{linkSelection.text}"
                        </p>
                    )}

                    {linkModalType === "custom" ? (
                        <InputAdmin
                            label="Enlace"
                            name="custom_link"
                            value={customLinkUrl}
                            onChange={(e) => setCustomLinkUrl(e.target.value)}
                            placeholder="https://..."
                            required
                        />
                    ) : (
                        <SelectForm
                            label="Producto"
                            name="product_link"
                            value={selectedProductId}
                            onChange={(e) => setSelectedProductId(String(e.target.value))}
                            options={productos}
                            required
                        />
                    )}

                    <div className="flex items-center justify-end gap-2">
                        <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            onClick={
                                linkModalType === "custom"
                                    ? handleInsertCustomLink
                                    : handleInsertProductLink
                            }
                        >
                            Insertar
                        </Button>
                        <Button
                            type="button"
                            variant="tertiary"
                            size="sm"
                            onClick={closeLinkModal}
                        >
                            Cancelar
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
