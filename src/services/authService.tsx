import { api, API_ENDPOINTS } from "@/config";
import { LoginCredentials, LoginActionResponse } from "@/types/auth";
import { getToken, removeToken, setToken } from "@/utils/token";
import { AxiosError } from "axios";

export async function loginService(credentials: LoginCredentials): Promise<LoginActionResponse> {
    try {
        const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);

        const data = response.data;
        
       
        const token = data.data?.token || data.token || data.access_token;
        const user = data.data?.user || data.user;

        if (!token) {
            return { success: false, message: "Error: No se recibió token del servidor." };
        }

        setToken(token);

        localStorage.setItem("token", token);

        return {
            success: true,
            message: "Bienvenido",
            token: token,
            user: {
                id: user?.id,
                name: user?.name,
                email: user?.email,
            },
        };

    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function logoutService(): Promise<LoginActionResponse> {
    try {
        
        const token = localStorage.getItem("token") || getToken();

        if (token) {
            await api.post(API_ENDPOINTS.AUTH.LOGOUT, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
    } catch (error: any) {
        return { success: false, message: error.message };
    } finally {
       
        removeToken();
        localStorage.removeItem("token"); 

        return { success: true, message: "Sesión cerrada" };
    }
}