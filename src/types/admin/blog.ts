export interface BlogInput {
  titulo: string;
  subtitulo?: string;
  contenido?: string;
  url_video?: string;

  etiqueta: {
    meta_titulo?: string;
    meta_descripcion?: string;
  };

  imagen_principal: File | null;
  imagen_principal_alt: string;

  imagenes?: File[];
  imagenes_alts: string[];
  categorias?:categoria[]
  imagen_principal_url?: string | null;
  imagenes_urls?: string[];
  product: number | null; // Puede ser null si no tiene producto
  parrafos?: string[];
  beneficios?: string[];
  bloques?: BlogBloque[];
}
export interface ProductoBlog { // Agregado porque ahora sí lo devuelves
  id: number;
  name: string;
  slug: string | null;
}
interface categoria{
  id:number;
  name:string;
  slug:string;
}

export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  per_page: number;
  to: number | null;
  total: number;
  path: string;
}


export interface BlogActionResponse<T = null> {
  success: boolean;
  message?: string;
  data?: {
    data?:T
  };
  meta?: PaginationMeta;
  links?: PaginationLinks;
}
export interface BlogListResponseBySlug<T=null> {
  success: boolean;
  message?: string;
  data?: Blog
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  categories:categoria[]
  cover_subtitle: string | null;
  content: string | null;
  created_at: string;
  video_url: string | null;
  content_blocks:unknown[]
  meta_title: string | null;
  meta_description?: string | null;

  main_image: BlogImagen | null;
  product: ProductoBlog | null;
  paragraphs: string[];
  benefits: string[];
  gallery: BlogImagen[];
}

export interface BlogImagen {
  url: string;
  alt: string | null;
}

export interface BlogBloque {
  title: string;
  content: string;
}
export interface BlogExport {
  ID: string | number;
  Título: string;
  Subtítulo: string;
  "Meta Título": string;
  Fecha: string;
  "Cant. Párrafos": number;
  "Cant. Imágenes": number;
}

export type BlogView = Blog | BlogStatic;
export type BlogStatic = {
  id: number;
  slug: string;
  title: string;
  cover_subtitle?: string;
  content: string;
  categories: string[];
  benefits?: string[];
  opinion?: string;
  video_url?: string;
  main_image: {
    url: string;
  };
};