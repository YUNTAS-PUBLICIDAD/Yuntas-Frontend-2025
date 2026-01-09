'use client';

import { useState, useRef, useEffect } from "react";
import { IoCloudUpload, IoClose } from "react-icons/io5";
import Image from "next/image";
interface ImageUploadProps {
    label: string;
    description?: string;
    altValue: string;
    onAltChange: (alt: string) => void;
    onFileChange: (file: File | null) => void;
    currentImage?: string | null;
    required?: boolean;
    onRemove?: () => void;
}

export default function ImageUpload({
    label,
    description,
    altValue,
    onAltChange,
    onFileChange,
    currentImage,
    required = false,
    onRemove
}: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(currentImage || null);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (currentImage) {
            setPreview(currentImage);
        } else {
            setPreview(null);
        }
    }, [currentImage]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setError(null);

        if (!file) {
            setPreview(null);
            onFileChange(null);
            return;
        }

        // validamos el tamaño. Tiene qye ser menor a 2MB
        if (file.size > 2 * 1024 * 1024) {
            setError("La imagen debe pesar menos de 2 MB");
            return;
        }

        // validamos el tipo de archivo
        if (!file.type.startsWith("image/")) {
            setError("El archivo debe ser una imagen");
            return;
        }

        // preview 
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        onFileChange(file);
    };

    const handleRemove = () => {
        setPreview(null);
        onFileChange(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }

        if (onRemove) {
            onRemove();
        }
    };

    return (
        <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded-lg">
            <label className="text-[#203565] font-medium">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {description && (
                <p className="text-gray-500 text-sm">{description}</p>
            )}

            <div className="relative">
                {preview ? (
                    <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                            <IoClose size={16} />
                        </button>
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center w-full h-40 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <IoCloudUpload className="text-4xl text-gray-400 mb-2" />
                        <span className="text-gray-500 text-sm">Click para subir imagen</span>
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                )}
            </div>

            {error && (
                <span className="text-red-500 text-sm">{error}</span>
            )}

            <span className="text-gray-500 text-xs">Cada imagen debe pesar menos de 2 MB.</span>

            <input
                type="text"
                value={altValue}
                onChange={(e) => onAltChange(e.target.value)}
                placeholder="Texto ALT para SEO"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23C1DE] focus:border-transparent transition-all"
            />
        </div>
    );
}