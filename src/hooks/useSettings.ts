import { useCallback, useState } from "react";
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
import {
  getSettingsService,
  updateChatbotSettingsService,
  updateGeneralSettingsService,
  updateContactSettingsService,
} from "@/services/settingsService";

interface UseSettingsReturn {
  settings: SettingsPayload | null;
  general: GeneralSettings | null;
  contact: ContactSettings | null;
  chatbot: ChatbotSettings | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  getSettings: () => Promise<void>;
  saveGeneralSettings: (
    payload: UpdateGeneralSettingsInput
  ) => Promise<SettingsServiceResponse<GeneralSettings>>;
  saveContactSettings: (
    payload: UpdateContactSettingsInput
  ) => Promise<SettingsServiceResponse<ContactSettings>>;
  saveChatbotSettings: (
    payload: UpdateChatbotSettingsInput
  ) => Promise<SettingsServiceResponse<ChatbotSettings>>;
  clearError: () => void;
}

export const useSettings = (): UseSettingsReturn => {
  const [settings, setSettings] = useState<SettingsPayload | null>(null);
  const [general, setGeneral] = useState<GeneralSettings | null>(null);
  const [contact, setContact] = useState<ContactSettings | null>(null);
  const [chatbot, setChatbot] = useState<ChatbotSettings | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const getSettings = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getSettingsService();

      if (result.success && result.data) {
        setSettings(result.data);
        setGeneral(result.data.general || null);
        setContact(result.data.contact || null);
        setChatbot(result.data.chatbot || null);
      } else {
        setError(result.message || "Error al cargar configuracion");
      }
    } catch (err: any) {
      setError(err?.message || "Error al cargar configuracion");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveGeneralSettings = useCallback(
    async (
      payload: UpdateGeneralSettingsInput
    ): Promise<SettingsServiceResponse<GeneralSettings>> => {
      setIsSaving(true);
      setError(null);

      try {
        const result = await updateGeneralSettingsService(payload);

        if (result.success && result.data) {
          const updatedGeneral = result.data;

          setGeneral(updatedGeneral);
          setSettings((current) =>
            current ? { ...current, general: updatedGeneral } : current
          );
        } else {
          setError(result.message || "Error al guardar configuracion");
        }

        return result;
      } catch (err: any) {
        const result: SettingsServiceResponse<GeneralSettings> = {
          success: false,
          message: err?.message || "Error al guardar configuracion",
        };

        setError(result.message || null);
        return result;
      } finally {
        setIsSaving(false);
      }
    },
    []
  );

  const saveContactSettings = useCallback(
    async (
      payload: UpdateContactSettingsInput
    ): Promise<SettingsServiceResponse<ContactSettings>> => {
      setIsSaving(true);
      setError(null);

      try {
        const result = await updateContactSettingsService(payload);

        if (result.success && result.data) {
          const updatedContact = result.data;

          setContact(updatedContact);
          setSettings((current) =>
            current ? { ...current, contact: updatedContact } : current
          );
        } else {
          setError(result.message || "Error al guardar configuracion");
        }

        return result;
      } catch (err: any) {
        const result: SettingsServiceResponse<ContactSettings> = {
          success: false,
          message: err?.message || "Error al guardar configuracion",
        };

        setError(result.message || null);
        return result;
      } finally {
        setIsSaving(false);
      }
    },
    []
  );

  const saveChatbotSettings = useCallback(
    async (
      payload: UpdateChatbotSettingsInput
    ): Promise<SettingsServiceResponse<ChatbotSettings>> => {
      setIsSaving(true);
      setError(null);

      try {
        const result = await updateChatbotSettingsService(payload);

        if (result.success && result.data) {
          const updatedChatbot = result.data;

          setChatbot(updatedChatbot);
          setSettings((current) =>
            current ? { ...current, chatbot: updatedChatbot } : current
          );
        } else {
          setError(result.message || "Error al guardar configuracion");
        }

        return result;
      } catch (err: any) {
        const result: SettingsServiceResponse<ChatbotSettings> = {
          success: false,
          message: err?.message || "Error al guardar configuracion",
        };

        setError(result.message || null);
        return result;
      } finally {
        setIsSaving(false);
      }
    },
    []
  );

  return {
    settings,
    general,
    contact,
    chatbot,
    isLoading,
    isSaving,
    error,
    getSettings,
    saveGeneralSettings,
    saveContactSettings,
    saveChatbotSettings,
    clearError,
  };
};
