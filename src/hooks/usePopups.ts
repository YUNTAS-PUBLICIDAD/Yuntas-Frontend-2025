import { useState, useCallback } from 'react';
import { Popup } from '@/types/admin/popup';
import { getPopupsService, savePopupService } from '@/services/popupService';

export const usePopups = () => {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPopups = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const result = await getPopupsService();
    if (result.success && result.data) {
      setPopups(result.data);
    } else {
      setError(result.message || 'Error al cargar popups');
    }
    setIsLoading(false);
  }, []);

  const savePopup = async (popupData: Popup, isUpdating: boolean = false) => {
    setIsSaving(true);
    const result = await savePopupService(popupData, isUpdating);
    setIsSaving(false);
    return result;
  };

  return {
    popups,
    isLoading,
    isSaving,
    error,
    getPopups,
    savePopup
  };
};