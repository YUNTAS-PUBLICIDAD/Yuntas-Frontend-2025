import { useState, useEffect } from "react";
import { api } from "@/config";

export interface EmailSectionData {
    mainImage: File | null;
    secondaryImage1: File | null;
    secondaryImage2: File | null;

    mainImagePreview: string;
    secondaryImage1Preview: string;
    secondaryImage2Preview: string;

    title: string;
    paragraph: string;
}

type ImageField = "mainImage" | "secondaryImage1" | "secondaryImage2";
type PreviewField =
    | "mainImagePreview"
    | "secondaryImage1Preview"
    | "secondaryImage2Preview";

export const useSendEmail = (
    onClose: () => void,
    email_productos: any[] // viene del backend
) => {
    const [isSending, setIsSending] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState("");

    const BACKEND_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

    const createEmptySection = (): EmailSectionData => ({
        mainImage: null,
        secondaryImage1: null,
        secondaryImage2: null,
        mainImagePreview: "",
        secondaryImage1Preview: "",
        secondaryImage2Preview: "",
        title: "",
        paragraph: "",
    });

    const [sections, setSections] = useState<EmailSectionData[]>([
        createEmptySection(),
        createEmptySection(),
        createEmptySection(),
    ]);

    const fixUrl = (url: string) => {
        if (!url) return "";
        if (url.startsWith("http") || url.startsWith("blob")) return url;
        return `${BACKEND_URL}${url}`;
    };

    // --------------------------------------------------
    // CARGAR PLANTILLA DESDE BACKEND
    // --------------------------------------------------
    useEffect(() => {
        if (!selectedProductId) return;

        const loadTemplate = async () => {
            try {
                const res = await api.get(
                    `/email-productos?producto_id=${selectedProductId}`
                );

                if (!res.data || res.data.length === 0) {
                    setSections([
                        createEmptySection(),
                        createEmptySection(),
                        createEmptySection(),
                    ]);
                    return;
                }

                const ordered = res.data
                    .sort((a: any, b: any) => a.paso - b.paso)
                    .map((item: any) => {
                        const secundarias = item.imagenes_secundarias
                            ? JSON.parse(item.imagenes_secundarias)
                            : [];

                        return {
                            mainImage: null,
                            secondaryImage1: null,
                            secondaryImage2: null,

                            mainImagePreview: fixUrl(item.imagen_principal),
                            secondaryImage1Preview: fixUrl(secundarias[0]),
                            secondaryImage2Preview: fixUrl(secundarias[1]),

                            title: item.titulo || "",
                            paragraph: item.parrafo1 || "",
                        };
                    });

                setSections(ordered);
            } catch (error) {
                console.error("Error cargando plantilla", error);
            }
        };

        loadTemplate();
    }, [selectedProductId]);

    // --------------------------------------------------
    // TEXTO
    // --------------------------------------------------
    const handleTextChange = (
        index: number,
        field: "title" | "paragraph",
        value: string
    ) => {
        const copy = [...sections];
        copy[index][field] = value;
        setSections(copy);
    };

    // --------------------------------------------------
    // IMÁGENES
    // --------------------------------------------------
    const handleFileChange = (
        index: number,
        field: ImageField,
        file: File | null
    ) => {
        const copy = [...sections];
        copy[index][field] = file;

        const previewMap: Record<ImageField, PreviewField> = {
            mainImage: "mainImagePreview",
            secondaryImage1: "secondaryImage1Preview",
            secondaryImage2: "secondaryImage2Preview",
        };

        const previewField = previewMap[field];
        copy[index][previewField] = file ? URL.createObjectURL(file) : "";

        setSections(copy);
    };

    // --------------------------------------------------
    // GUARDAR PLANTILLA
    // --------------------------------------------------
    const handleSaveTemplate = async () => {
        if (!selectedProductId) {
            alert("Selecciona un producto");
            return;
        }

        setIsSending(true);

        try {
            for (let paso = 0; paso < sections.length; paso++) {
                const section = sections[paso];
                const formData = new FormData();

                formData.append("producto_id", selectedProductId);
                formData.append("paso", String(paso));
                formData.append("titulo", section.title);
                formData.append("parrafo1", section.paragraph);

                if (section.mainImage) {
                    formData.append("imagen_principal", section.mainImage);
                }

                if (section.secondaryImage1) {
                    formData.append(
                        "imagenes_secundarias[]",
                        section.secondaryImage1
                    );
                }

                if (section.secondaryImage2) {
                    formData.append(
                        "imagenes_secundarias[]",
                        section.secondaryImage2
                    );
                }

                await api.post("/email-productos", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            alert("Plantilla guardada correctamente");
            onClose();
        } catch (error) {
            console.error(error);
            alert("Error guardando plantilla");
        } finally {
            setIsSending(false);
        }
    };

    // --------------------------------------------------
    // ACTIVAR CAMPAÑA
    // --------------------------------------------------
    const handleActivateCampaign = async () => {
        if (!selectedProductId) {
            alert("Selecciona un producto");
            return;
        }

        setIsSending(true);

        try {
            const res = await api.post("/email-campanas/enviar", {
                producto_id: selectedProductId,
            });

            console.log("Campaña enviada:", res.data);

            alert(
                `Campaña enviada correctamente\n\nLeads: ${res.data.total_leads}\nCorreos: ${res.data.total_correos}`
            );

            onClose();
        } catch (error) {
            console.error(error);
            alert("Error enviando campaña");
        } finally {
            setIsSending(false);
        }
    };

    return {
        selectedProductId,
        setSelectedProductId,
        sections,
        handleTextChange,
        handleFileChange,
        handleSaveTemplate,
        handleActivateCampaign,
        isSending,
    };
};
