import { api, API_ENDPOINTS } from "@/config";
import {
    Rol,
    RolServiceResponse,
} from "@/types/admin/rol";
import { getToken } from "@/utils/token";

export async function getRolesService(perPage: number = 20): Promise<RolServiceResponse<Rol[]>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.get(API_ENDPOINTS.ADMIN.ROLES.GET_ALL+`?perPage=${perPage}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }       
        });

        return {
            success: true,
            data: response.data.data.data,
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}