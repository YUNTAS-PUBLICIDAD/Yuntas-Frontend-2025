import { api, API_ENDPOINTS } from "@/config";
import {
    WhatsappPlantilla,
    WhatsappPlantillaInput,
    WhatsappPlantillaServiceResponse,
} from "@/types/admin/whatsappPlantilla";
import { getImg } from "@/utils/getImg";
import { getToken } from "@/utils/token";

function formatPlantilla(apiPlantilla: any): WhatsappPlantilla | null {
    if (!apiPlantilla) {
        return null;
    }
    
    return {
        ...apiPlantilla,
        imagen_principal: apiPlantilla.imagen_principal ? getImg("/" + apiPlantilla.imagen_principal) : null,
    };
};

export async function getWhatsappPlantillaByProductService(product_id: number): Promise<WhatsappPlantillaServiceResponse<WhatsappPlantilla | null>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.get(API_ENDPOINTS.ADMIN.CAMPANA.WHATSAPP.GET_ONE_BY_PRODUCT(product_id), {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return {
            success: true,
            message: response.data.message || "Plantilla whatsapp obtenida exitosamente",
            data: formatPlantilla(response.data.data),
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

// para crear y actualizar una plantilla
export async function saveWhatsappPlantillaService(whatsappData: WhatsappPlantillaInput): Promise<WhatsappPlantillaServiceResponse<WhatsappPlantilla>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        await api.post(API_ENDPOINTS.ADMIN.CAMPANA.WHATSAPP.SAVE, whatsappData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return {
            success: true,
            message: "Plantilla whatsapp creada exitosamente",
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function requestQRService(): Promise<WhatsappPlantillaServiceResponse<null>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        await api.post(API_ENDPOINTS.ADMIN.CAMPANA.WHATSAPP.REQUEST_QR, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            success: true,
            message: "Generando nuevo QR...",
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function resetSessionService(): Promise<WhatsappPlantillaServiceResponse<null>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        await api.post(API_ENDPOINTS.ADMIN.CAMPANA.WHATSAPP.RESET_SESSION, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            success: true,
            message: "Sesión reseteada correctamente",
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}