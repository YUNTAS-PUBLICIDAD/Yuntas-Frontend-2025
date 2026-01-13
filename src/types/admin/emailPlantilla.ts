export interface emailPlantilla {
    id: number;
    producto_id: number;
    paso: number;
    titulo: string;
    parrafo1: string;
    imagen_principal: string | null;
    imagenes_secundarias: string[] | null;
}

export interface EmailSectionData {
    mainImage: File | string | null;
    secondaryImage1: File | string | null;
    secondaryImage2: File | string | null;
    mainImagePreview: string;
    secondaryImage1Preview: string;
    secondaryImage2Preview: string;
    title: string;
    paragraph: string;
}

export interface EmailFormData {
    producto_id: string;
    sections: EmailSectionData[];
}

export interface emailPlantillaServiceResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface sendEmailCampanaResponse {
    success: boolean;
    message?: string;
    total_leads?: number;
    total_correos?: number;
}