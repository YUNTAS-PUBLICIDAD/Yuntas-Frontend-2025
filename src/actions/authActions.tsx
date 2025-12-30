'use server';

import { cookies } from "next/headers";
import { api, API_ENDPOINTS } from "@/config"; 
import { LoginCredentials, LoginActionResponse } from "@/types/auth";
import { AxiosError } from "axios";

export async function loginAction(credentials: LoginCredentials): Promise<LoginActionResponse> {
    try {
        const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);

        const responseData = response.data; 
        
        const token = responseData.data?.token || responseData.token;
        const user = responseData.data?.user || responseData.user;

        if (!token) {
            return { success: false, message: "Error: No se recibió token del servidor." };
        }

        // 2. Guardar la Cookie en el Servidor de Next.js
        const cookieStore = cookies();
        cookieStore.set({
            name: "auth_token",
            value: token,
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, 
            path: "/",
        });

        

        return {
            success: true,
            message: "Bienvenido",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        };

    } catch (error: any) {
        console.error("Error en LoginAction:", error);

        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Credenciales incorrectas";
            return { success: false, message: errorMessage };
        }

        return { success: false, message: "Error de conexión con el servidor." };
    }
}

export async function logoutAction(): Promise<LoginActionResponse> {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (token) {
            await api.post(API_ENDPOINTS.AUTH.LOGOUT, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
    } catch (error) {
        console.error("Error al cerrar sesión en backend (ignorando para limpiar cookie local)", error);
    } finally {
        const cookieStore = cookies();
        cookieStore.delete("auth_token");
        
        return { success: true, message: "Sesión cerrada" };
    }
}

export async function checkAuthAction(): Promise<boolean> {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;
    return !!token;
}