export interface BlogInput {
    titulo: string;
    subtitulo?: string;

    contenido?: string;
    url_video?: string;

    meta_titulo?: string;
    meta_descripcion?: string;

    imagen_principal: File | null;
    imagenes?: File[];

    parrafos?: string[];
    beneficios?: string[];

    bloques?: BlogBloque[];
}
export interface Blog {
    id: number;
    titulo: string;
    slug: string;
    subtitulo: string | null;
    contenido_principal: string | null;

    fecha: string;
    video_url: string | null;
    //categorias?: string[];

    // Imagen principal
    imagen: string | null;
    imagen_alt: string | null;
    // Contenido dinámico
    parrafos: string[];
    beneficios: string[];
    galeria: BlogImagen[];

    // SEO
    meta_titulo: string | null;
    meta_descripcion?: string | null; // si lo agregas al backend luego
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
