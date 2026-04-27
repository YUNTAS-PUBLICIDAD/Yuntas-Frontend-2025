import { api, API_ENDPOINTS } from "@/config";
import {
  ChatbotSettings,
  SettingsPayload,
  SettingsServiceResponse,
  UpdateChatbotSettingsInput,
} from "@/types/admin/settings";

export const getSettingsService = async (): Promise<SettingsServiceResponse<SettingsPayload>> => {
  try {
    const response = await api.get(API_ENDPOINTS.SETTINGS.GET);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const updateChatbotSettingsService = async (
  chatbotData: UpdateChatbotSettingsInput
): Promise<SettingsServiceResponse<ChatbotSettings>> => {
  try {
    const formData = new FormData();

    formData.append("enabled", chatbotData.enabled ? "1" : "0");
    formData.append("primary_color", chatbotData.primary_color);
    formData.append("secondary_color", chatbotData.secondary_color || "");
    formData.append("position", chatbotData.position);
    formData.append("welcome_message", chatbotData.welcome_message || "");
    formData.append("show_delay_seconds", String(chatbotData.show_delay_seconds));

    if (
      chatbotData.auto_close_seconds !== null &&
      chatbotData.auto_close_seconds !== undefined
    ) {
      formData.append("auto_close_seconds", String(chatbotData.auto_close_seconds));
    }

    if (chatbotData.icon instanceof File) {
      formData.append("icon", chatbotData.icon);
    }

    const response = await api.patch(
      API_ENDPOINTS.ADMIN.SETTINGS.CHATBOT_UPDATE,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return {
      success: true,
      data: response.data,
      message: "Configuracion de chatbot actualizada exitosamente",
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
