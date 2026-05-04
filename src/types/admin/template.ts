export type Template = {
  id: number;
  name: string;
  active: boolean;
  variants: TemplateVariant[];
};

export type Channel = "whatsapp" | "email";

type ProductAsset = {
  product_id: number;
  template_variant_id?: number;
  key: string;
  path: string;
}

export type TemplateVariant = {
  id?: number; // opcional porque en create no existe aún
  channel: Channel;
  // context: string; // INICIO | PRODUCTO | DETALLE (puedes tiparlo luego)
  context: TemplateContext,
  subject?: string | null; // solo email
  content: string;
  variables: any[]; // luego puedes tipar mejor
  assets: TemplateAsset[];
  active: boolean;
  productAssets?: ProductAsset[]
};

export type TemplateAsset = {
  id?: number;
  key: string;
  path: string;
  meta?: any;
};

export type TemplateContext = "INICIO" | "PRODUCTO";
