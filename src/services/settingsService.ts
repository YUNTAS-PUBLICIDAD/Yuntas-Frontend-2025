import { api, API_ENDPOINTS } from "@/config";
import {
  ChatbotSettings,
  GeneralSettings,
  ContactSettings,
  SettingsPayload,
  SettingsServiceResponse,
  UpdateChatbotSettingsInput,
  UpdateGeneralSettingsInput,
  UpdateContactSettingsInput,
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

    formData.append("_method", "PATCH");

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

    const response = await api.post(
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

export const updateGeneralSettingsService = async (
  generalData: UpdateGeneralSettingsInput
): Promise<SettingsServiceResponse<GeneralSettings> > => {
  try {
    const formData = new FormData();

    formData.append("_method", "PATCH");

    formData.append("company_name", generalData.company_name || "");
    formData.append("theme", generalData.theme || "light");

    if (generalData.logo_light instanceof File) {
      formData.append("logo_light", generalData.logo_light);
    }

    if (generalData.logo_dark instanceof File) {
      formData.append("logo_dark", generalData.logo_dark);
    }

    const response = await api.post(
      API_ENDPOINTS.ADMIN.SETTINGS.GENERAL_UPDATE,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return {
      success: true,
      data: response.data,
      message: "Configuracion general actualizada exitosamente",
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const updateContactSettingsService = async (
  contactData: UpdateContactSettingsInput
): Promise<SettingsServiceResponse<ContactSettings> > => {
  try {
    const formData = new FormData();

    formData.append("_method", "PATCH");

    formData.append("phone", contactData.phone || "");
    formData.append("email", contactData.email || "");
    formData.append("address", contactData.address || "");
    formData.append("whatsapp_message", contactData.whatsapp_message || "");
    formData.append("show_in_footer", contactData.show_in_footer ? "1" : "0");
    formData.append("show_contact_page", contactData.show_contact_page ? "1" : "0");
    formData.append("map_url", contactData.map_url || "");

    // Para business_hours y social_links, backend espera array
    if (contactData.business_hours) {
      formData.append("business_hours", JSON.stringify(contactData.business_hours));
    }
    if (contactData.social_links) {
      formData.append("social_links", JSON.stringify(contactData.social_links));
    }
    
    const response = await api.patch(
      API_ENDPOINTS.ADMIN.SETTINGS.CONTACT_UPDATE,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return {
      success: true,
      data: response.data,
      message: "Configuracion de contacto actualizada exitosamente",
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
