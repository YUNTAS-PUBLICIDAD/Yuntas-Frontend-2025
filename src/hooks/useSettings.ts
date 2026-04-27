import { useCallback, useState } from "react";
import {
  ChatbotSettings,
  SettingsPayload,
  SettingsServiceResponse,
  UpdateChatbotSettingsInput,
} from "@/types/admin/settings";
import {
  getSettingsService,
  updateChatbotSettingsService,
} from "@/services/settingsService";

interface UseSettingsReturn {
  settings: SettingsPayload | null;
  chatbot: ChatbotSettings | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  getSettings: () => Promise<void>;
  saveChatbotSettings: (
    payload: UpdateChatbotSettingsInput
  ) => Promise<SettingsServiceResponse<ChatbotSettings>>;
  clearError: () => void;
}

export const useSettings = (): UseSettingsReturn => {
  const [settings, setSettings] = useState<SettingsPayload | null>(null);
  const [chatbot, setChatbot] = useState<ChatbotSettings | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const getSettings = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const result = await getSettingsService();

    if (result.success && result.data) {
      setSettings(result.data);
      setChatbot(result.data.chatbot || null);
    } else {
      setError(result.message || "Error al cargar configuracion");
    }

    setIsLoading(false);
  }, []);

  const saveChatbotSettings = useCallback(
    async (
      payload: UpdateChatbotSettingsInput
    ): Promise<SettingsServiceResponse<ChatbotSettings>> => {
      setIsSaving(true);
      setError(null);

      const result = await updateChatbotSettingsService(payload);

      if (result.success && result.data) {
        setChatbot(result.data);
      } else {
        setError(result.message || "Error al guardar configuracion");
      }

      setIsSaving(false);
      return result;
    },
    []
  );

  return {
    settings,
    chatbot,
    isLoading,
    isSaving,
    error,
    getSettings,
    saveChatbotSettings,
    clearError,
  };
};
