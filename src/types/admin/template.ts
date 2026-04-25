// export interface TemplateButton {
//   id?: number;
//   text: string;
//   type: 'url' | 'quick_reply';
//   payload: Record<string,any>;
//   order?: number;
//   active?: boolean;
// }

export type TemplateButton =
  | {
      id?: number;
      text: string;
      type: 'url';
      payload: { url: string };
      order?: number;
      active?: boolean;
    }
  | {
      id?: number;
      text: string;
      type: 'quick_reply';
      payload: Record<string, any>;
      order?: number;
      active?: boolean;
    };

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
  buttons?: TemplateButton[];
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
