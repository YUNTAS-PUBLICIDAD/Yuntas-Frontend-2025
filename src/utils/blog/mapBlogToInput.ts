// utils/blog/mapBlogToInput.ts
import { BlogInput, Blog } from "@/types/admin/blog";

export const mapBlogToInput = (blog: Blog): BlogInput => ({
  titulo: blog.slug ?? "",
  subtitulo: blog.cover_subtitle ?? "",
  contenido: blog.content ?? "",
  url_video: blog.video_url ?? "",

  categorias: blog.categories?.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug
  })) ?? [],

  etiqueta: {
    meta_titulo: blog.meta_title ?? "",
    meta_descripcion: blog.meta_description ?? "",
  },

  imagen_principal: null, // no se puede convertir imagen remota a File
  imagen_principal_alt: blog.main_image?.alt ?? "",
  imagen_principal_url: blog.main_image?.url ?? null, // ✅ Cambiado a null en vez de ""

  imagenes: [],
  imagenes_urls: blog.gallery?.map(img => img.url) ?? [],
  imagenes_alts: blog.gallery?.map(img => img.alt ?? "") ?? [],

  parrafos: blog.paragraphs ?? [],
  beneficios: blog.benefits ?? [],
  

});