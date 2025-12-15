'use server';
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { apiConfig, endpoints } from "@/config";
import { BlogActionResponse } from "@/types/admin/blog";
import { Blog } from "@/types/blog";
function getToken(): string | null {
  return cookies().get("auth_token")?.value || null;
}
export async function getBlogsAction(): Promise<BlogActionResponse<Blog[]>> {
  const token = getToken();
  if (!token){
    return { success: false, message: "No autenticado. Inicia sesión." }
  }
  try {
    const url = apiConfig.getUrl(endpoints.blogs.list);
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Error al obtener los blogs"
      }
    }
    return {
      success: true,
      data: result.data
    }
  } 
  catch (error) {
    return {
      success: false,
      message: error instanceof Error
        ? error.message
        : "No se pudo conectar con el servidor"
    };

  }
}
export async function createBlogAction(formData: FormData): Promise<BlogActionResponse<Blog>> {

  const token = getToken();
  if (!token) {
    return { success: false, message: "No autenticado. Inicia sesión." };
  }

  try {
    const url = apiConfig.getUrl(endpoints.blogs.create);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData,
    });
    const result = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Error al crear el blog"
      };
    }
    revalidatePath("/admin/blogs");
    revalidatePath("/blogs");
    return {
      success: true,
      message: result.message || "Blog creado correctamente",
      data: result.data
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error
        ? error.message
        : "No se pudo conectar con el servidor"
    };
  }
}
