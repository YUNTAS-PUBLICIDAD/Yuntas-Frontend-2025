import { api, API_ENDPOINTS } from "@/config";
import {
    WhatsappPlantilla,
    WhatsappPlantillaInput,
    WhatsappPlantillaServiceResponse,
} from "@/types/admin/whatsappPlantilla";
import { getImg } from "@/utils/getImg";
import { getToken } from "@/utils/token";

// Helper para formatear la respuesta del backend
function formatPlantilla(apiPlantilla: any): WhatsappPlantilla | null {
    if (!apiPlantilla) {
        return null;
    }
    
    
    return {
        ...apiPlantilla,
        
        imagen_principal: apiPlantilla.imagen_principal ? getImg("/storage/" + apiPlantilla.imagen_principal) : null,
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
            message: response.data.message || "Plantilla obtenida",
            data: formatPlantilla(response.data.data),
        };
    } catch (error: any) {
        
        return { success: false, message: error.message, data: null };
    }
}


export async function saveWhatsappPlantillaService(whatsappData: WhatsappPlantillaInput): Promise<WhatsappPlantillaServiceResponse<WhatsappPlantilla>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

       
        const formData = new FormData();
        formData.append('producto_id', whatsappData.producto_id);
        formData.append('parrafo', whatsappData.parrafo);

        
        if (whatsappData.imagen_principal instanceof File) {
            formData.append('imagen_principal', whatsappData.imagen_principal);
        }

        
        const response = await api.post(API_ENDPOINTS.ADMIN.CAMPANA.WHATSAPP.SAVE, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return {
            success: true,
            message: "Plantilla guardada exitosamente",
            data: response.data.data
        };
    } catch (error: any) {
        console.error("Error guardando plantilla:", error);
        return { success: false, message: error.response?.data?.message || error.message };
    }
}