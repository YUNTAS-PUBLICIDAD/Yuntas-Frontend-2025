'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { api, API_ENDPOINTS } from "@/config";
import { Blog, BlogActionResponse ,BlogListResponseBySlug} from "@/types/admin/blog";

function getToken(): string | null {
  const cookieStore = cookies();
  return cookieStore.get("auth_token")?.value || null;
}

export async function getBlogsAction(perPage: number = 10, url?: string): Promise<BlogActionResponse<Blog[]>> {
  try {
    const token = getToken();
    if (!token) return { success: false, message: "No autenticado" };

    const endpoint = url ?? API_ENDPOINTS.BLOG.GET_ALL + `?per_page=${perPage}`;
    const response = await api.get(endpoint);

    return {
      success: true,
      data: response.data.data,
      meta: response.data.meta,
      links: response.data.links,
    };
  } catch (error) {
    return { success: false, message: "Error de conexión" };
  }
}

export async function getBlogBySlugAction(slug: string): Promise<BlogListResponseBySlug<Blog>> {
  try {
    const token = getToken();
    if (!token) return { success: false, message: "No autenticado" };

    const response = await api.get(API_ENDPOINTS.BLOG.GET_ONE(slug));

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    return { success: false, message: "Error de conexión" };
  }
}

export async function createBlogAction(formData: FormData): Promise<BlogActionResponse<Blog>> {
  try {
    const token = getToken();
    if (!token) return { success: false, message: "No autenticado" };

    const response = await api.post(API_ENDPOINTS.BLOG.CREATE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    revalidatePath("/admin/blogs");

    return {
      success: true,
      message: response.data.data.message || "Blog creado exitosamente",
      data: response.data.data.data,
    };
  } catch (error) {
    return { success: false, message: "Error de conexión" };
  }
}

export async function updateBlogAction(id: number | string, formData: FormData): Promise<BlogActionResponse<Blog>> {
  try {
    const token = getToken();
    if (!token) return { success: false, message: "No autenticado" };
    formData.append("_method", "PUT");
    const response = await api.post(API_ENDPOINTS.BLOG.UPDATE(Number(id)), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    revalidatePath("/admin/blogs");
    return {
      success: true,
      message: response.data.data.message || "Blog actualizado exitosamente",
      data: response.data.data.data,
    };
  } catch (error: any) { 
    console.error("Error al actualizar:", error.response?.data || error.message);

    return { success: false, message: error.response?.data?.message || "Error de conexión" };
  }
}

export async function deleteBlogAction(id: number | string): Promise<BlogActionResponse<null>> {
  try {
    const token = getToken();
    if (!token) return { success: false, message: "No autenticado" };

    await api.delete(API_ENDPOINTS.BLOG.DELETE(Number(id)));

    revalidatePath("/admin/blogs");

    return { success: true, message: "Blog eliminado exitosamente" };
  } catch (error) {
    return { success: false, message: "Error de conexión" };
  }
}
