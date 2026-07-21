export interface PopupImage {
  id?: number;
  image?: string; // URL o path desde el backend
  file?: File; // Archivo físico cuando lo subimos desde React
  device: 'desktop' | 'mobile';
  slot: 'left' | 'right' | 'center';
  alt?: string;
  title?: string;
}

export interface Popup {
  id?: number;
  lead_source_id?: number;
  slug?: string;
  title: string;
  button_text: string;
  button_text_color?: string;
  button_color?: string;
  page_target: string;
  delay_seconds: number;
  priority: number;
  product_id?: number | null;
  active: boolean;
  images?: PopupImage[]; //arreglo de imágenes
}

export interface PopupServiceResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface PopupImageData {
  url: string;
  alt?: string | null;
  title?: string | null;
}
