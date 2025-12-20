"use client";

import React from "react";
import Image from "next/image";
import FileInput from "@/components/atoms/FileInput";
import InputAdmin from "@/components/atoms/InputAdmin";

interface SecondaryImagesUploadProps {
    previewImages: string[];
    files: File[];
    onImageChange: (index: number, file: File) => void;
    maxImages?: number;
}

export default function SecondaryImagesUpload({
    previewImages,
    files,
    onImageChange,
    maxImages = 3,
}: SecondaryImagesUploadProps) {
    return (
        <div className="border-2 border-teal-300 bg-teal-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: maxImages }).map((_, index) => {
                    const hasImage = previewImages[index];
                    const fileName = files[index]?.name || "Ninguno asignado";

                    return (
                        <div
                            key={index}
                            className="border border-gray-300 rounded-lg p-4 bg-white"
                        >
                            {/* Preview si existe imagen */}
                            {hasImage && (
                                <div className="mb-3 relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                                    <Image
                                        src={hasImage}
                                        alt={`Imagen secundaria ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            {/* File Input usando el nuevo átomo */}
                            <FileInput
                                buttonText="Seleccionar archivo"
                                fileName={fileName.slice(0, 20) + (fileName.length > 20 ? "..." : "")}
                                accept="image/*"
                                onChange={(file) => {
                                    if (file) {
                                        onImageChange(index, file);
                                    }
                                }}
                            />

                            {/* Descripción */}
                            <p className="text-gray-600 text-xs mb-3 mt-2">
                                Archivo de imagen secundaria #{index + 1}.<br />
                                Tamaño máximo: 2 MB.
                            </p>

                            {/* Input ALT */}
                            <InputAdmin
                                label=""
                                name={`alt_secundaria_${index}`}
                                value=""
                                onChange={() => {}}
                                placeholder={`Texto ALT imagen secundaria ${index + 1}`}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
