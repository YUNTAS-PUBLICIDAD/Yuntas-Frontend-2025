import { api, API_ENDPOINTS } from "@/config";
import { ChatbotBackendResponse, ChatMessage } from "@/types/chatbot";

export const sendChatMessageService = async (message: string, conversationId: string) => {
  try {
    const payload = {
      message,
      conversation_id: conversationId || null,
    };
    const response = await api.post<ChatbotBackendResponse>(API_ENDPOINTS.CHATBOT.SEND, payload);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getChatHistoryService = async (conversationId: string) => {
  try {
    const response = await api.get(API_ENDPOINTS.CHATBOT.HISTORY(conversationId));
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};