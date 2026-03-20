export interface TemplateContent {
  id?: number;
  template_id?: number;
  channel: 'whatsapp' | 'email';
  subject?: string;
  content: string;
  image_url?: string;
  image?: File | null; // Propiedad frontend para enviar archivos nuevos
  variables: string[];
  active: boolean;
}

export interface Template {
  id?: number;
  lead_source_id: number;
  product_id?: number;
  name: string;
  active: boolean;
  contents: TemplateContent[];
}

export interface TemplateServiceResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}