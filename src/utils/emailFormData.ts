import { EmailSectionData, emailPlantilla } from "@/types/admin/emailPlantilla";

export const buildEmailFormData = (productId: string, section: EmailSectionData, paso: number): FormData => {
    const formData = new FormData();

    formData.append("producto_id", productId);
    formData.append("paso", String(paso));
    formData.append("titulo", section.title);
    formData.append("parrafo1", section.paragraph);

    // Solo agregar iamgens si son archivos nuevos (File)
    if (section.mainImage instanceof File) {
        formData.append("imagen_principal", section.mainImage);
    }

    if (section.secondaryImage1 instanceof File) {
        formData.append("imagenes_secundarias[]", section.secondaryImage1);
    }

    if (section.secondaryImage2 instanceof File) {
        formData.append("imagenes_secundarias[]", section.secondaryImage2);
    }

    return formData;
};

export const createEmptySection = (): EmailSectionData => ({
    mainImage: null,
    secondaryImage1: null,
    secondaryImage2: null,
    mainImagePreview: "",
    secondaryImage1Preview: "",
    secondaryImage2Preview: "",
    title: "",
    paragraph: "",
});

export const parseEmailPlantillaData = (emailPlantillas: emailPlantilla[]): EmailSectionData[] => {

    // siempre se crean 3 secciones
    const sections: EmailSectionData[] = [
        createEmptySection(),
        createEmptySection(),
        createEmptySection(),
    ];

    emailPlantillas
        .sort((a, b) => a.paso - b.paso)
        .forEach((item) => {
            if (item.paso >= 0 && item.paso <= 2) {
                const secundarias = item.imagenes_secundarias
                    ? (Array.isArray(item.imagenes_secundarias) 
                        ? item.imagenes_secundarias 
                        : JSON.parse(item.imagenes_secundarias as unknown as string))
                    : [];

                sections[item.paso] = {
                    mainImage: item.imagen_principal || null,
                    secondaryImage1: secundarias[0] || null,
                    secondaryImage2: secundarias[1] || null,
                    mainImagePreview: item.imagen_principal || "",
                    secondaryImage1Preview: secundarias[0] || "",
                    secondaryImage2Preview: secundarias[1] || "",
                    title: item.titulo || "",
                    paragraph: item.parrafo1 || "",
                };
            }
        });

    return sections;
};

// validar si ina seccion esta vacia
export const isSectionEmpty = (section: EmailSectionData): boolean => {
    return !section.title.trim() && 
           !section.paragraph.trim() && 
           !section.mainImage &&
           !section.mainImagePreview;
};

// validar si una seccion esta completa
export const isSectionComplete = (section: EmailSectionData): boolean => {
    const hasTitle = section.title.trim().length > 0;
    const hasParagraph = section.paragraph.trim().length > 0;
    const hasMainImage = section.mainImage instanceof File || 
                        (typeof section.mainImage === 'string' && section.mainImage.length > 0) ||
                        section.mainImagePreview.length > 0;

    return hasTitle && hasParagraph && hasMainImage;
};