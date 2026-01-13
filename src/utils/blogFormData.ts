// utils/blogFormData.ts
import { BlogInput } from "@/types/admin/blog";

export function buildBlogFormData(data: BlogInput): FormData {
  const formData = new FormData();
  
  formData.append("titulo", data.titulo);
  
  if (data.subtitulo) {
    formData.append("subtitulo", data.subtitulo);
  }
  
  if (data.contenido) {
    formData.append("contenido", data.contenido);
  }
  
  if (data.url_video) {
    formData.append("url_video", data.url_video);
  }
  
  if (data.categorias && data.categorias.length > 0) {
    data.categorias.forEach((categoria, index) => {
      // Laravel espera categorias[0], categorias[1], etc con valores string (IDs)
      formData.append(`categorias[${index}]`, String(categoria.id));
    });
  }
  
  // Etiquetas SEO
  if (data.etiqueta?.meta_titulo || data.etiqueta?.meta_descripcion) {
    formData.append(
      "etiqueta",
      JSON.stringify({
        meta_titulo: data.etiqueta.meta_titulo ?? "",
        meta_descripcion: data.etiqueta.meta_descripcion ?? "",
      })
    );
  }
  if (data.product) {
    formData.append("product_id", String(data.product));
  }
  // Imagen principal (REQUERIDA según validación)
  if (data.imagen_principal) {
    formData.append("imagen_principal", data.imagen_principal);
    formData.append("imagen_principal_alt", data.imagen_principal_alt || "");
  }
  
  // Galería de imágenes
  [0, 1, 2].forEach(index => {
      // 1. Manejo del ARCHIVO
      const file = data.imagenes?.[index];
      if (file instanceof File) {
          formData.append(`imagenes[${index}]`, file);
      }
      const alt = data.imagenes_alts?.[index];
      formData.append(`imagenes_alts[${index}]`, alt ?? "");
  });
  // Párrafos
  if (data.parrafos && data.parrafos.length > 0) {
    data.parrafos
      .filter(p => p.trim() !== "")
      .forEach((p, i) => {
        formData.append(`parrafos[${i}]`, p);
      });
  }
  
  // Beneficios
  if (data.beneficios && data.beneficios.length > 0) {
    data.beneficios
      
      .filter(b => b?.trim?.() !== "")
      .forEach((b, i) => {
        formData.append(`beneficios[${i}]`, b);
      });
  }
  
  // Bloques
  if (data.bloques && data.bloques.length > 0) {
    data.bloques.forEach((bloque, i) => {
      formData.append(`bloques[${i}][title]`, bloque.title);
      formData.append(`bloques[${i}][content]`, bloque.content);
    });
  }
  
  return formData;
}