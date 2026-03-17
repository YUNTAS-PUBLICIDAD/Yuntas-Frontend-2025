export interface Popup {
  id?: number;
  slug?: string;
  title: string;
  button_text: string;
  button_color?: string;
  image?: File | string | null; // File cuando se sube, string cuando llega del backend
  image_alt: string;
  image_title?: string;
  page_target: string;
  delay_seconds: number;
  priority: number;
  start_date?: string | null;
  end_date?: string | null;
  active: boolean;
  image_url?: string; // Atributo virtual de Laravel (asset)
}

export interface PopupServiceResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}