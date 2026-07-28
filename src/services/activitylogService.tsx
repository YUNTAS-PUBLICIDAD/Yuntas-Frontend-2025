import { api, API_ENDPOINTS } from "@/config";
import { getToken } from "@/utils/token";

export async function getActivityLogsService() {
    try {
        const token = getToken();

        if (!token) {
            return {
                success: false,
                message: "No autenticado",
            };
        }

        const response = await api.get(API_ENDPOINTS.ADMIN.HISTORIAL.GET_ALL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            success: true,
            data: response.data.data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
}