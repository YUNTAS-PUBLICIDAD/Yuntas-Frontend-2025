// utils/blog/mapBlogToInput.ts
import { BlogInput, Blog } from "@/types/admin/blog";

export const mapBlogToInput = (blog: Blog): BlogInput => ({
  // 1. TÍTULO: Usamos el title, no el slug (el slug se genera en backend o se edita aparte)
  titulo: blog.title ?? "",
  
  subtitulo: blog.cover_subtitle ?? "",
  contenido: blog.content ?? "",
  url_video: blog.video_url ?? "",

  // 2. CORRECCIÓN CRÍTICA: Categorías debe ser un array de NÚMEROS (IDs)
  // Antes tenías: .map(cat => ({ id: ... })) -> ESTO ESTABA MAL
  
  // 3. PRODUCTO: Extraemos solo el ID (número)
  product: blog.product?.id ?? null,

  etiqueta: {
    meta_titulo: blog.meta_title ?? "",
    meta_descripcion: blog.meta_description ?? "",
  },

  // Imágenes
  imagen_principal: null, // El archivo empieza vacío en edición
  imagen_principal_alt: blog.main_image?.alt ?? "",
  
  // Agregamos la URL para que el usuario vea la imagen actual (si tu componente lo soporta)
  imagen_principal_url: blog.main_image?.url ?? null,

  imagenes: [],
  imagenes_urls: blog.gallery?.map(img => img.url) ?? [],
  imagenes_alts: blog.gallery?.map(img => img.alt ?? "") ?? [],

  // Contenido dinámico
  parrafos: blog.paragraphs ?? [],
  beneficios: blog.benefits ?? [],
  
  // 4. BLOQUES (Completo)
  bloques: blog.content_blocks?.map((block: any) => ({
    title: block.title ?? "",
    content: block.content ?? ""
  })) ?? [],
});