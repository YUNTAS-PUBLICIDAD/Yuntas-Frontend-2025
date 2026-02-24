import { api, API_ENDPOINTS } from "@/config";
import { Blog, BlogServiceResponse, BlogInput } from "@/types/admin/blog";
import { getToken } from "@/utils/token";
import { getImg } from "@/utils/getImg";
import { buildBlogFormData } from "@/utils/blogFormData";
import { formatDate } from "@/utils/formatDate";

function formatBlog(apiBlog: any): Blog {
    return {
        ...apiBlog,
        main_image: {
            url: apiBlog.main_image?.url
                ? (typeof apiBlog.main_image.url === "string" ? `${getImg(apiBlog.main_image.url)}` : apiBlog.main_image.url)
                : "",
            alt: apiBlog.main_image?.alt || "",
            title: apiBlog.main_image?.title || "",
        },
        gallery: (apiBlog.gallery || []).map((img: any) => ({
            slot: img.slot,
            url: img.url ? (typeof img.url === "string" ? `${getImg(img.url)}` : img.url) : "",
            title: img.title || "",
            alt: img.alt || "",
        })),
        product_name: apiBlog.product?.name || "-",
        created_at: formatDate(apiBlog.created_at || ""),
    };
};

export async function getBlogsService(perPage: number = 10, url?: string): Promise<BlogServiceResponse<Blog[]>> {
    try {
        const response = await api.get(API_ENDPOINTS.BLOG.GET_ALL, {
            params: {
                per_page: perPage,
                url: url || undefined,
            },
        });

        const formattedBlogs = response.data.data.data.map(formatBlog);

        return {
            success: true,
            data: formattedBlogs,
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function getBlogBySlugService(slug: string): Promise<BlogServiceResponse<Blog>> {
    try {

        const response = await api.get(API_ENDPOINTS.BLOG.GET_ONE(slug));

        return {
            success: true,
            message: response.data.message,
            data: formatBlog(response.data.data),
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function createBlogService(formData: BlogInput): Promise<BlogServiceResponse<Blog>> {
    try {
        const token = getToken();
        if (!token) return { success: false, message: "No autenticado" };

        const formattedFormData = buildBlogFormData(formData);

        const response = await api.post(API_ENDPOINTS.ADMIN.BLOG.CREATE, formattedFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            success: true,
            message: response.data.message || "Blog creado exitosamente",
            data: formatBlog(response.data.data),
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function updateBlogService(id: number | string, formData: BlogInput): Promise<BlogServiceResponse<Blog>> {
    try {
        const token = getToken();
        if (!token) return { success: false, message: "No autenticado" };

        const formattedFormData = buildBlogFormData(formData);

        const response = await api.post(API_ENDPOINTS.ADMIN.BLOG.UPDATE(Number(id)), formattedFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });
        return {
            success: true,
            message: response.data.message || "Blog actualizado exitosamente",
            data: formatBlog(response.data.data),
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function deleteBlogService(id: number | string): Promise<BlogServiceResponse<null>> {
    try {
        const token = getToken();

        if (!token) return { success: false, message: "No autenticado" };

        await api.delete(API_ENDPOINTS.ADMIN.BLOG.DELETE(Number(id)), {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return { success: true, message: "Blog eliminado exitosamente" };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}
