import { useState, useEffect } from "react";
import { Blog } from "@/types/blog";

export interface BlogFormData {
    nombre: string;
    productoId: string;
    subtitulo: string;
    meta_titulo?: string;
    meta_descripcion?: string;
    link_amigable?: string;
    imagen_principal: {
        file: File | string;
        alt: string;
    };
    imagenes_secundarias: File[];
    video_url?: string;
    parrafo1: string;
    beneficios: string[];
    parrafo2: string;
}

const defaultFormData: BlogFormData = {
    nombre: "",
    productoId: "",
    subtitulo: "",
    meta_titulo: "",
    meta_descripcion: "",
    link_amigable: "",
    imagen_principal: {
        file: "",
        alt: "",
    },
    imagenes_secundarias: [],
    video_url: "",
    parrafo1: "",
    beneficios: ["", "", ""],
    parrafo2: "",
};

export function useBlogForm(initialData?: Blog | null, mode: "create" | "edit" = "create") {
    const [formData, setFormData] = useState<BlogFormData>(defaultFormData);
    const [previewSecundarias, setPreviewSecundarias] = useState<string[]>([]);

    // Cargar datos iniciales cuando se edita
    useEffect(() => {
        if (initialData && mode === "edit") {
            // Convertir imagen principal si es StaticImageData
            let imagenPrincipalUrl = "";
            if (initialData.img) {
                if (typeof initialData.img === "string") {
                    imagenPrincipalUrl = initialData.img;
                } else {
                    imagenPrincipalUrl = (initialData.img as any).src || "";
                }
            }

            setFormData({
                nombre: initialData.nombre || "",
                productoId: initialData.id || "",
                subtitulo: initialData.descripcion || "",
                meta_titulo: "",
                meta_descripcion: "",
                link_amigable: "",
                imagen_principal: {
                    file: imagenPrincipalUrl || "",
                    alt: initialData.nombre || "",
                },
                imagenes_secundarias: [],
                video_url: initialData.videoUrl || "",
                parrafo1: initialData.detalles || "",
                beneficios:
                    initialData.beneficios && initialData.beneficios.length > 0
                        ? initialData.beneficios
                        : ["", "", ""],
                parrafo2: initialData.testimonio?.comentario || "",
            });

            // Cargar imágenes de la galería
            if (initialData.galeria && initialData.galeria.length > 0) {
                const galeriaPreviews = initialData.galeria.map((img) => {
                    if (typeof img === "string") {
                        return img;
                    }
                    return (img as any).src || "";
                });
                setPreviewSecundarias(galeriaPreviews);
            }
        }
    }, [initialData, mode]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBeneficioChange = (index: number, value: string) => {
        const newBeneficios = [...formData.beneficios];
        newBeneficios[index] = value;
        setFormData((prev) => ({
            ...prev,
            beneficios: newBeneficios,
        }));
    };

    const handleImageChange = (file: File | null) => {
        setFormData((prev) => ({
            ...prev,
            imagen_principal: {
                ...prev.imagen_principal,
                file: file || "",
            },
        }));
    };

    const handleImageAltChange = (alt: string) => {
        setFormData((prev) => ({
            ...prev,
            imagen_principal: {
                ...prev.imagen_principal,
                alt,
            },
        }));
    };

    const handleSecondaryImageChange = (index: number, file: File) => {
        if (file.size > 2 * 1024 * 1024) {
            alert("La imagen debe pesar menos de 2MB");
            return;
        }

        const newFiles = [...formData.imagenes_secundarias];
        newFiles[index] = file;
        setFormData((prev) => ({
            ...prev,
            imagenes_secundarias: newFiles,
        }));

        const reader = new FileReader();
        reader.onloadend = () => {
            const newPreviews = [...previewSecundarias];
            newPreviews[index] = reader.result as string;
            setPreviewSecundarias(newPreviews);
        };
        reader.readAsDataURL(file);
    };

    const handleBeneficiosChange = (beneficios: string[]) => {
        setFormData((prev) => ({
            ...prev,
            beneficios: beneficios.length > 0 ? beneficios : ["", "", ""],
        }));
    };

    const resetForm = () => {
        setFormData(defaultFormData);
        setPreviewSecundarias([]);
    };

    return {
        formData,
        previewSecundarias,
        handleInputChange,
        handleBeneficioChange,
        handleImageChange,
        handleImageAltChange,
        handleSecondaryImageChange,
        handleBeneficiosChange,
        resetForm,
        setFormData,
    };
}
