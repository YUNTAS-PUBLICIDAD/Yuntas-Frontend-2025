export type ChatbotPosition = 'bottom-right' | 'bottom-left';

export interface SocialLink {
  platform: string;
  url: string;
}

export interface BusinessHours {
  day: string;
  start_time: string;
  end_time: string;
}

export interface GeneralSettings {
  company_name: string;
  logo_light: string | null;
  logo_dark: string | null;
  theme: 'light' | 'dark';
}

export interface ContactSettings {
  phone: string | null;
  email: string | null;
  address: string | null;
  business_hours: BusinessHours[] | null;
  social_links: SocialLink[] | null;
  whatsapp_message: string | null;
  show_in_footer: boolean;
  show_contact_page: boolean;
  map_url: string | null;
}

export interface ChatbotSettings {
  enabled: boolean;
  primary_color: string;
  secondary_color?: string | null;
  icon?: string | null;
  position: ChatbotPosition;
  welcome_message?: string | null;
  show_delay_seconds: number;
  auto_close_seconds?: number | null;
}

export interface SettingsPayload {
  general: GeneralSettings;
  contact: ContactSettings;
  chatbot: ChatbotSettings;
}

export interface UpdateGeneralSettingsInput {
  company_name?: string;
  logo_light?: File | null;
  logo_dark?: File | null;
  theme?: 'light' | 'dark';
}

export interface UpdateContactSettingsInput {
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  business_hours?: BusinessHours[] | null;
  social_links?: SocialLink[] | null;
  whatsapp_message?: string | null;
  show_in_footer?: boolean;
  show_contact_page?: boolean;
  map_url?: string | null;
}

export interface UpdateChatbotSettingsInput {
  enabled: boolean;
  primary_color: string;
  secondary_color?: string;
  icon?: File | null;
  position: ChatbotPosition;
  welcome_message?: string;
  show_delay_seconds: number;
  auto_close_seconds?: number | null;
}

export interface SettingsServiceResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}
