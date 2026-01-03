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
  
  // Imagen principal (REQUERIDA según validación)
  if (data.imagen_principal) {
    formData.append("imagen_principal", data.imagen_principal);
    formData.append("imagen_principal_alt", data.imagen_principal_alt || "");
  }
  
  // Galería de imágenes
  if (data.imagenes && data.imagenes.length > 0) {
    data.imagenes.forEach((file, index) => {
      formData.append(`imagenes[${index}]`, file);
      formData.append(
        `imagenes_alts[${index}]`,
        data.imagenes_alts[index] ?? ""
      );
    });
  }
  
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
      .filter(b => b.trim() !== "")
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