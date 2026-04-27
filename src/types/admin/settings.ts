export type ChatbotPosition = 'bottom-right' | 'bottom-left';

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
  general: Record<string, any>;
  contact: Record<string, any>;
  chatbot: ChatbotSettings;
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
