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
  titulo: string;
  slug: string;
  subtitulo: string | null;
  contenido: string | null;
  fecha: string;
  video_url: string | null;

  meta_titulo: string | null;
  meta_descripcion?: string | null;

  main_image: BlogImagen | null;

  parrafos: string[];
  beneficios: string[];
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
