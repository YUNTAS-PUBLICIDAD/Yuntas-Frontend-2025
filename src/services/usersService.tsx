import { api, API_ENDPOINTS } from "@/config";
import {
    User,
    UserInput,
    UserServiceResponse,
} from "@/types/admin/user";
import { getToken } from "@/utils/token";
import { formatDate } from "@/utils/formatDate";

function formatUser(apiUser: any): User {
    return {
        ...apiUser,
        created_at: formatDate(apiUser.created_at || ""),
        role_name: apiUser.role?.name || "-",
    };
}

export async function getUsersService(perPage: number = 20): Promise<UserServiceResponse<User[]>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.get(API_ENDPOINTS.ADMIN.USERS.GET_ALL + `?perPage=${perPage}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const transformedUsers = response.data.data.data.map(formatUser);

        return {
            success: true,
            data:  transformedUsers,
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function createUserService(userData: UserInput): Promise<UserServiceResponse<User>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.post(API_ENDPOINTS.ADMIN.USERS.CREATE, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return {
            success: true,
            message: response.data.message || "Usuario creado exitosamente",
            data: response.data.data
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function updateUserService(id: number, userData: UserInput): Promise<UserServiceResponse<User>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.put(API_ENDPOINTS.ADMIN.USERS.UPDATE(id), userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return {
            success: true,
            message: response.data.message || "Usuario actualizado exitosamente",
            data: response.data.data
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function deleteUserService(id: number): Promise<UserServiceResponse<null>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const response = await api.delete(API_ENDPOINTS.ADMIN.USERS.DELETE(id), {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return { success: true, message: "Usuario eliminado exitosamente" };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}