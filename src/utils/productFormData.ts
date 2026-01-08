import { ProductoInput } from "@/types/admin/producto";

export function logFormData(formData: FormData): void {
    formData.forEach((value, key) => {
        if (value instanceof File) {
            console.log(`${key}: [File] ${value.name} (${value.size} bytes)`);
        } else {
            console.log(`${key}: ${value}`);
        }
    });
}

export function buildProductoFormData(data: ProductoInput): FormData {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("slug", data.slug || "");
    formData.append("price", String(data.price));
    formData.append("hero_title", data.hero_title);
    formData.append("description", data.description);
    formData.append("status", data.status || "active");

    // SEO opcionales
    if (data.meta_title) formData.append("meta_title", data.meta_title);
    if (data.meta_description) formData.append("meta_description", data.meta_description);

    // keywords
    const cleanKeywords = data.keywords.filter(k => k.trim() !== "").join(", ");
    if (cleanKeywords) formData.append("keywords", cleanKeywords);

    // Imagen principal
    if (data.main_image instanceof File) {
        formData.append("main_image", data.main_image);
        formData.append("main_image_alt", data.main_image_alt || "");
    } else if (typeof data.main_image === "string") {
        formData.append("main_image_alt", data.main_image_alt || "");
    }

    // galeria
    let galleryIndex = 0;
    data.gallery.forEach((item) => {
        if (item.image instanceof File) {
            formData.append(`gallery[${galleryIndex}][slot]`, item.slot);
            formData.append(`gallery[${galleryIndex}][image]`, item.image);
            formData.append(`gallery[${galleryIndex}][alt]`, item.alt || "");
            galleryIndex++;
        } else if (typeof item.image === "string") {
            formData.append(`gallery_alt[${item.slot}]`, item.alt || "");
        }
    });

    // categoria
    data.categories.forEach((category, index) => {
        if (category.trim() !== "") {
            formData.append(`categories[${index}]`, category);
        }
    });

    // especificaciones
    data.specifications
        .filter(spec => spec.trim() !== "")
        .forEach((spec, index) => {
            formData.append(`specifications[${index}]`, spec);
        });

    // beneficios
    data.benefits
        .filter(benefit => benefit.trim() !== "")
        .forEach((benefit, index) => {
            formData.append(`benefits[${index}]`, benefit);
        });

    return formData;
}