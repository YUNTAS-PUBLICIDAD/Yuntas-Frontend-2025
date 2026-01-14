export interface WhatsappPlantilla {
    id: number;
    producto_id: number;
    parrafo: string;
    imagen_principal: string | null;
}

export interface WhatsappPlantillaInput {
    producto_id: string;
    imagen_principal?: File | string | null;
    parrafo: string;
}

export interface WhatsappPlantillaServiceResponse<T = null> {
    success: boolean;
    message?: string;
    data?: T;
}

/* export interface sendWhatsappCampanaResponse {
    success: boolean;
    message?: string;
    total_leads?: number;
} */