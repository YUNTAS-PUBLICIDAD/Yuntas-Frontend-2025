'use server';

import axios from 'axios';
import { cookies } from "next/headers";
import { API_ENDPOINTS } from "@/config";
import { BlogActionResponse } from "@/types/admin/blog";
import { Blog } from "@/types/admin/blog";

function getToken(): string | null {
  return cookies().get("auth_token")?.value || null;
}
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export async function deleteBlogAction(id: number): Promise<BlogActionResponse<null>> {
  const token = getToken();
  if (!token) return { success: false, message: "No autenticado" };

  try {
    await axios.delete(
      `${BASE_URL}/api${API_ENDPOINTS.BLOG.DELETE(id)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
export async function getBlogsAction(
  perPage = 10,
  url?: string
): Promise<BlogActionResponse<Blog[]>> {
  const token = getToken();
  if (!token) return { success: false, message: "No autenticado" };

  try {
    const endpoint = url
      ? url
      : `${BASE_URL}/api${API_ENDPOINTS.BLOG.GET_ALL}?per_page=${perPage}`;

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return {
      success: true,
      data: response.data.data,   
      meta: response.data.meta,   
      links: response.data.links, 
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function updateBlogAction(id:number,formData: FormData): Promise<BlogActionResponse<Blog>> {
  const token = getToken();
  if (!token) {
    return { success: false, message: "No autenticado. Inicia sesión." };
  }
  
  try {
    const response = await axios.put(
      `${BASE_URL}/api${API_ENDPOINTS.BLOG.UPDATE(id)}`,formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
  
    return {
      success: true,
      message: response.data.message || "Blog creado correctamente",
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "No se pudo conectar con el servidor",
    };
  }
}

export async function createBlogAction(formData: FormData): Promise<BlogActionResponse<Blog>> {
  const token = getToken();
  if (!token) {
    return { success: false, message: "No autenticado. Inicia sesión." };
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/api${API_ENDPOINTS.BLOG.CREATE}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return {
      success: true,
      message: response.data.message || "Blog creado correctamente",
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "No se pudo conectar con el servidor",
    };
  }

}
