export interface ChatbotProduct {
  id: number;
  slug: string;
  name: string;
  image?: string | null;
  price: number;
}

export interface ChatbotBlog {
  id: number;
  slug: string;
  title: string;
}

export interface ChatbotOption {
  id: string;
  label: string;
  type?: string;
  value?: string;
}

interface BaseChatMessage {
  id?: string | number;

  role: "user" | "bot";

  text?: string;

  created_at?: string;
}

export interface TextMessage extends BaseChatMessage {
  type?: "text";
}

export interface ProductsMessage extends BaseChatMessage {
  type: "products";

  products: ChatbotProduct[];

  whatsapp_url?: string;
}

export interface BlogsMessage extends BaseChatMessage {
  type: "blogs";

  blogs: ChatbotBlog[];
}

export interface OptionsMessage extends BaseChatMessage {
  type: "options";

  options: ChatbotOption[];
}

export interface UrlMessage extends BaseChatMessage {
  type: "url";

  url: string;
}

export interface WhatsappMessage extends BaseChatMessage {
  type: "whatsapp";

  whatsapp_url: string;
}

export interface ProductContactMessage extends BaseChatMessage {
  type: "product_contact";

  products?: ChatbotProduct[];

  whatsapp_url?: string;
}

export interface ContactPageMessage extends BaseChatMessage {
  type: "contact_page";

  url: string;
}

export interface ErrorMessage extends BaseChatMessage {
  type: "error";

  code?: string;
}

export type ChatMessage =
  | TextMessage
  | ProductsMessage
  | BlogsMessage
  | OptionsMessage
  | UrlMessage
  | WhatsappMessage
  | ProductContactMessage
  | ContactPageMessage
  | ErrorMessage;

export interface ChatbotBackendResponse {
  conversation_id: string;

  messages: ChatMessage[];
}
