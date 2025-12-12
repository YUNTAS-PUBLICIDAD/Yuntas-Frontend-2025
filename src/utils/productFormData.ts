import { ProductoInput } from "@/types/admin/producto";
import { toFormData, FormDataObject } from "./toFormData";
import { logFormData } from "@/utils/toFormData";

export function buildProductoFormData(data: ProductoInput): FormData {
    const formattedData: FormDataObject = {
        nombre: data.nombre,
        link: data.link,
        titulo: data.titulo,
        descripcion: data.descripcion,
        precio: data.precio,
        
        // SEO
        etiqueta: {
            meta_titulo: data.meta_titulo,
            meta_descripcion: data.meta_descripcion,
            keywords: data.keywords.filter(k => k.trim() !== ""),
        },
        
        // Listas
        especificaciones: data.especificaciones.filter(e => e.trim() !== ""),
        beneficios: data.beneficios.filter(b => b.trim() !== ""),
        imagenes: data.galeria.filter(file => file instanceof File),
    };

    const formData = toFormData(formattedData);

    // Imagen principal
    if (data.imagen_principal.file instanceof File) {
        formData.append("imagen_principal", data.imagen_principal.file);
    }

    logFormData(formData);

    return formData;
}