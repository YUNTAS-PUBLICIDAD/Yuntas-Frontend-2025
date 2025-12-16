export interface BlogInput {
  titulo: string;
  subtitulo?: string;
  contenido?: string;
  url_video?: string;

  etiqueta: {
    meta_titulo?: string;
    meta_descripcion?: string;
  };

  // archivos nuevos
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

export interface Blog {
    id: number;
    titulo: string;
    slug: string;
    subtitulo: string | null;
    contenido: string | null;
    fecha: string;
    video_url: string | null;
    //categorias?: string[];
    // SEO
    meta_titulo: string | null;
    meta_descripcion?: string | null; 
    // Imagen principal
    main_image: BlogImagen | null;
    // Contenido dinámico
    parrafos: string[];
    beneficios: string[];
    galeria: BlogImagen[];
    //bloque: BlogBloque[];   aun no se sabe su funcion xd
}
export interface BlogSEO {
    meta_titulo: string | null;
    meta_descripcion: string | null;
}
export interface BlogActionResponse<T = null> {
    success: boolean;
    message?: string;
    data?: T;
    meta?: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}

export interface BlogListResponse {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: Blog[];
}
export interface BlogBloque {
    title: string;
    content: string;
}

export interface BlogResponse {
    success: boolean;
    message: string;
    data: Blog;
}
export interface BlogImagen {
    url: string;
    alt: string | null;
}
