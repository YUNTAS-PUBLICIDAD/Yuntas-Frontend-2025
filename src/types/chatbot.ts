export interface ChatbotProduct {
  id: number;
  slug: string;
  name: string;
  images?: { url: string }[];
}

export interface ChatbotBlog {
  id: number;
  slug: string;
  title: string;
}

export interface ChatMessage {
  role: "user" | "bot";
  text?: string;
  type?: string;
  products?: ChatbotProduct[];
  blogs?: ChatbotBlog[];
  url?: string;
  whatsapp_url?: string;
}

export interface ChatbotBackendResponse {
  conversation_id: string;
  messages: any[];
}