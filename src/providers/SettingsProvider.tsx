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

const SETTINGS_CACHE_KEY = 'app_settings_cache_v1';

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carga instantánea desde caché de sesión si existe (0 ms)
  useEffect(() => {
    try {
      const cached = sessionStorage.getItem(SETTINGS_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        setSettings(parsed);
        setIsLoading(false);
      }
    } catch { }
  }, []);

  const fetchSettings = async () => {
    try {
      // Solo mostramos loading visual si no tenemos nada previamente cargado
      const hasCached = typeof window !== 'undefined' && Boolean(sessionStorage.getItem(SETTINGS_CACHE_KEY));
      if (!hasCached) {
        setIsLoading(true);
      }
      setError(null);
      const result = await getSettingsService();

      if (result.success && result.data) {
        setSettings(result.data);
        try {
          sessionStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(result.data));
        } catch { }
      } else {
        setError(result.message || 'Error al cargar configuración');
      }
    } catch (err: any) {
      setError(err?.message || 'Error al cargar configuración');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();

    const handleSettingsUpdated = () => {
      try {
        sessionStorage.removeItem(SETTINGS_CACHE_KEY);
      } catch { }
      fetchSettings();
    };

    window.addEventListener('settings-updated', handleSettingsUpdated);
    return () => {
      window.removeEventListener('settings-updated', handleSettingsUpdated);
    };
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
