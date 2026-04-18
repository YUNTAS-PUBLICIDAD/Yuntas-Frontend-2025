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
  button_color?: string;
  page_target: string;
  delay_seconds: number;
  priority: number;
  //start_date?: string | null;
  //end_date?: string | null;
  product_id: any;
  active: boolean;
  images?: PopupImage[]; //arreglo de imágenes
}

export interface PopupServiceResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}
