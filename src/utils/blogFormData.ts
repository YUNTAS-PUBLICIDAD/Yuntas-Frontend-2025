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
  if (data.etiqueta?.meta_titulo || data.etiqueta?.meta_descripcion) {
    formData.append(
      "etiqueta",
      JSON.stringify({
        meta_titulo: data.etiqueta.meta_titulo ?? "",
        meta_descripcion: data.etiqueta.meta_descripcion ?? "",
      })
    );
  }
  if (data.imagen_principal) {
    formData.append("imagen_principal", data.imagen_principal);
    formData.append("imagen_principal_alt", data.imagen_principal_alt);
  }
  data.imagenes?.forEach((file, index) => {
    formData.append(`imagenes[${index}]`, file);
    formData.append(
      `imagenes_alts[${index}]`,
      data.imagenes_alts[index] ?? ""
    );
  });
  data.parrafos
    ?.filter(p => p.trim() !== "")
    .forEach((p, i) => {
      formData.append(`parrafos[${i}]`, p);
    });
  data.beneficios
    ?.filter(b => b.trim() !== "")
    .forEach((b, i) => {
      formData.append(`beneficios[${i}]`, b);
    });
  data.bloques?.forEach((bloque, i) => {
    formData.append(`bloques[${i}][title]`, bloque.title);
    formData.append(`bloques[${i}][content]`, bloque.content);
  });
  return formData;
}