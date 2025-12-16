import {  BlogInput } from "@/types/admin/blog";
import { Blog } from "@/types/blog";
export const mapBlogToInput = (blog: Blog): BlogInput => ({
  titulo: blog.slug,
  subtitulo: blog.cover_subtitle ?? "",
  contenido: blog.content,
  url_video: blog.video_url ?? "",

  etiqueta: {
    meta_titulo: blog.meta_title ?? "",
    meta_descripcion: blog.meta_description ?? "",
  },

  imagen_principal: null, // no se puede convertir imagen remota a File
  imagen_principal_alt: "",

  imagenes: [],
  imagenes_alts: [],

  parrafos: blog.paragraphs ?? [],
  beneficios: blog.benefits ?? [],
  bloques: blog.content_blocks ?? [],
});
