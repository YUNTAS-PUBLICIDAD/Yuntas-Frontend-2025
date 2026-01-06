'use server';

import { api, API_ENDPOINTS } from "@/config"; 
import { LoginCredentials, LoginActionResponse } from "@/types/auth";
import { AxiosError } from "axios";

export async function loginAction(
  credentials: LoginCredentials
): Promise<LoginActionResponse> {
  try {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);

    const data = response.data;
    const token = data.data?.token || data.token;
    const user = data.data?.user || data.user;

    if (!token) {
      return { success: false, message: "No se recibió token" };
    }

    return {
      success: true,
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.response?.data?.message || "Credenciales incorrectas",
      };
    }
    return { success: false, message: "Error de conexión" };
  }
}
