import { api, API_ENDPOINTS } from "@/config";
import {
    DeployServiceResponse,
} from "@/types/admin/deploy";
import { getToken } from "@/utils/token";

export async function triggerDeployService(): Promise<DeployServiceResponse> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.post(API_ENDPOINTS.ADMIN.DEPLOY.TRIGGER, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }       
        });

        return {
            success: true,
            message: response.data.message || "Despliegue iniciado exitosamente",
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}