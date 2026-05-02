'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getSettingsService } from '@/services/settingsService';
import { SettingsPayload, ChatbotSettings, ContactSettings, GeneralSettings } from '@/types/admin/settings';

interface SettingsContextType {
  settings: SettingsPayload | null;
  chatbot: ChatbotSettings | null;
  contact: ContactSettings | null;
  general: GeneralSettings | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getSettingsService();

      if (result.success && result.data) {
        setSettings(result.data);
      } else {
        setError(result.message || 'Error al cargar configuración');
      }
    } catch (err: any) {
      setError(err?.message || 'Error al cargar configuración');
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar settings al montar
  useEffect(() => {
    fetchSettings();
  }, []);

  const value: SettingsContextType = {
    settings,
    chatbot: settings?.chatbot ?? null,
    contact: settings?.contact ?? null,
    general: settings?.general ?? null,
    isLoading,
    error,
    refetch: fetchSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsContext debe estar dentro de SettingsProvider');
  }
  return context;
};
