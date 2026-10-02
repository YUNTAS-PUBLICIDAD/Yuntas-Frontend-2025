import { api, API_ENDPOINTS } from "@/config";
import {
    Producto,
    ProductoServiceResponse,
    ProductoInput,
} from "@/types/admin/producto";
import { buildProductoFormData } from "@/utils/productFormData";
import { getToken } from "@/utils/token";
import { getImg } from "@/utils/getImg";

function formatProduct(apiProduct: any): Producto {
    return {
        ...apiProduct,
        category_name: (apiProduct.categories && apiProduct.categories.length > 0) ? apiProduct.categories[0].name : "-",
        main_image: {
            url: apiProduct.main_image?.url
                ? (typeof apiProduct.main_image.url === "string" ? `${getImg(apiProduct.main_image.url)}` : apiProduct.main_image.url)
                : "",
            alt: apiProduct.main_image?.alt || "",
            title: apiProduct.main_image?.title || "",
        },
        gallery: (apiProduct.gallery || []).map((img: any) => ({
            slot: img.slot,
            url: img.url ? (typeof img.url === "string" ? `${getImg(img.url)}` : img.url) : "",
            title: img.title || "",
            alt: img.alt || "",
        })),
    };
};

export async function getProductosService(perPage: number = 10, url?: string): Promise<ProductoServiceResponse<Producto[]>> {
    try {
        const response = await api.get(API_ENDPOINTS.PRODUCTS.GET_ALL, {
            params: {
                per_page: perPage,
                url: url || undefined,
            },
        });

        const formattedProducts = response.data.data.data.map(formatProduct);

        return {
            success: true,
            data: formattedProducts,
        };
    } catch (error: any) {
        const is403 = error.response?.status === 403;

        let errorMessage = error.message;

        if (is403 && error.response?.data?.includes?.('jschallenge')) {
            errorMessage = "Bloqueado por firewall/CDN. Esto es un problema temporal del servidor.";
        }

        console.error('Error fetching products', errorMessage);

        return { success: false, message: error.message };
    }
}

export async function getProductoBySlugService(slug: string): Promise<ProductoServiceResponse<Producto>> {
    try {

        let currentPage = 1;
        let foundProduct: Producto | null = null;
        let hasMorePages = true;

        // Función para limpiar y normalizar cualquier texto 
        const normalizeText = (text: string) => {
            if (!text) return "";
            let clean = text
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "") // Quita tildes
                .replace(/[^a-z0-9]/g, ""); // Quita guiones, espacios y caracteres especiales
            
            // Quita la 's' final para unificar plurales y singulares
            if (clean.endsWith('s')) {
                clean = clean.slice(0, -1);
            }
            return clean;
        };

        const targetNormalized = normalizeText(slug);

        while (hasMorePages && currentPage <= 10) {
            const response = await api.get(API_ENDPOINTS.PRODUCTS.GET_ALL, {
                params: {
                    per_page: 50,
                    page: currentPage,
                },
            });

            const rawData = response.data.data;
            const items = Array.isArray(rawData) ? rawData : (rawData?.data || []);
            const formattedItems = items.map(formatProduct);

            // Búsqueda inteligente en cada página
            foundProduct = formattedItems.find((product: Producto) => {
                const productSlugNorm = normalizeText(product.slug || "");
                const productNameNorm = normalizeText(product.name || "");

                // Compara si coincide el slug normalizado o el nombre normalizado
                return (
                    productSlugNorm === targetNormalized ||
                    productNameNorm === targetNormalized ||
                    productSlugNorm.includes(targetNormalized) ||
                    targetNormalized.includes(productSlugNorm)
                );
            }) || null;

            if (foundProduct) {
                break; // ¡Encontrado!
            }

            const lastPage = rawData?.last_page || 1;
            if (currentPage >= lastPage || items.length === 0) {
                hasMorePages = false;
            } else {
                currentPage++;
            }
        }

        if (!foundProduct) {
            return {
                success: false,
                message: `Producto con slug "${slug}" no encontrado`,
            };
        }

        return {
            success: true,
            message: "Producto encontrado",
            data: foundProduct,
        };

    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Error obteniendo producto",
        };
    }
}
export async function createProductoService(formData: ProductoInput): Promise<ProductoServiceResponse<Producto>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const formattedFormData = buildProductoFormData(formData);

        const response = await api.post(API_ENDPOINTS.ADMIN.PRODUCTS.CREATE, formattedFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            success: true,
            message: response.data.message || "Producto creado exitosamente",
            data: formatProduct(response.data.data)
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function updateProductoService(id: number | string, formData: ProductoInput): Promise<ProductoServiceResponse<Producto>> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        const formattedFormData = buildProductoFormData(formData);

        const response = await api.post(API_ENDPOINTS.ADMIN.PRODUCTS.UPDATE(Number(id)), formattedFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            success: true,
            message: response.data.message || "Producto actualizado exitosamente",
            data: formatProduct(response.data.data)
        };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function deleteProductoService(id: number | string): Promise<ProductoServiceResponse> {
    try {
        const token = getToken();

        if (!token) {
            return { success: false, message: "No autenticado" };
        }

        await api.delete(API_ENDPOINTS.ADMIN.PRODUCTS.DELETE(Number(id)), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return { success: true, message: "Producto eliminado exitosamente" };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}
