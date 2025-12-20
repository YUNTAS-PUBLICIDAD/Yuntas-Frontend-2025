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

  imagen_principal_url?: string | null;
  imagenes_urls?: string[];

  parrafos?: string[];
  beneficios?: string[];
  bloques?: BlogBloque[];
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

export interface Blog {
  id: number;
  title: string;
  slug: string;
  cover_subtitle: string | null;
  content: string | null;
  created_at: string;
  video_url: string | null;
  content_blocks:unknown[]
  meta_title: string | null;
  meta_description?: string | null;

  main_image: BlogImagen | null;

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
