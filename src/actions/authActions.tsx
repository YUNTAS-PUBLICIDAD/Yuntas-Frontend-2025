'use server';

import { cookies } from "next/headers";
import { LoginCredentials, LoginResponse, LoginActionResponse } from "@/types/auth";
import { apiConfig, endpoints } from "@/config";

export async function loginAction(credentials: LoginCredentials): Promise<LoginActionResponse> {
    try {
        const url = apiConfig.getUrl(endpoints.auth.login);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });


        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                message: errorData.errors?.get("email")?.[0] || "Credenciales inválidas"
            };
        }

        const data: LoginResponse = await response.json();

        // guardar cookie
        const cookieStore = cookies();
        cookieStore.set({
            name: "auth_token",
            value: data.data.token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        return {
            success: data.success,
            message: data.message,
            user: {
                id: data.data.user.id,
                name: data.data.user.name,
                email: data.data.user.email,
            }
        };
    } catch (error) {
        return { success: false, message: "Error de conexión. Intenta de nuevo." };
    }
}

export async function logoutAction(): Promise<LoginActionResponse> {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (token) {
            const url = apiConfig.getUrl(endpoints.auth.logout);
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
        }

        // Eliminar cookie
        cookieStore.set({
            name: "auth_token",
            value: "",
            httpOnly: true,
            maxAge: 0,
            path: "/",
        });

        return { success: true, message: "Sesión cerrada" };
    } catch (error) {
        const cookieStore = cookies();
        cookieStore.set({
            name: "auth_token",
            value: "",
            httpOnly: true,
            maxAge: 0,
            path: "/",
        });
        return { success: true, message: "Sesión cerrada" };
    }
}

export async function checkAuthAction(): Promise<boolean> {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;
    return !!token;
}