export type Template = {
  id: number;
  name: string;
  context: TemplateContext;
  active: boolean;

  steps: TemplateStep[];
};

export type TemplateContext =
  | "INICIO"
  | "PRODUCTO";

export type Channel =
  | "whatsapp"
  | "email";

export type TemplateStep = {
  id?: number;

  step: number;

  delayValue: number;

  delayUnit: DelayUnit;

  active: boolean;

  variants: TemplateVariant[];
};

export type DelayUnit =
  | "minutes"
  | "hours"
  | "days";

export type TemplateVariant = {
  id?: number;

  channel: Channel;

  subject?: string | null;

  content: string;

  variables: string[];

  assets: TemplateAsset[];

  active: boolean;

  ctaText?: string;

  ctaUrl?: string;

  productOverrides?: ProductOverride[];
};

export type ProductOverride = {
  id?: number;

  product_id: number;

  subject?: string;

  content?: string;

  ctaText?: string;

  ctaUrl?: string;

  variables?: string[];

  assets?: TemplateAsset[];

  active?: boolean;
};

export type TemplateAsset = {
  id?: number;

  key: string;

  path: string;

  meta?: any;
};
