'use client';

import React, { useEffect } from 'react';
import { usePopups } from '@/hooks/usePopups';
import { Popup } from '@/types/admin/popup';
import { showToast } from '@/utils/showToast';
import PopupForm from '@/components/molecules/admin/popups/PopupConfigForm'; // <-- Asegúrate de que esta ruta sea correcta

export default function PopupsConfigPage() {
  const { popups, getPopups, savePopup, isLoading, isSaving } = usePopups();

  // Cargar los datos al entrar a la página
  useEffect(() => {
    getPopups();
  }, [getPopups]);

  // La función que le pasara al formulario para que sepa qué hacer al dar clic en "Guardar"
  const handleSave = async (popupData: Popup) => {
    const isUpdating = !!popupData.id;
    const result = await savePopup(popupData, isUpdating);

    if (result.success) {
      showToast.success(isUpdating ? "Popup actualizado correctamente" : "Popup guardado exitosamente");
      getPopups(); // Recarga la data para que traiga la imagen guardada de Laravel
    } else {
      showToast.error(result.message || "Error al guardar");
    }
  };

  //Pantalla de carga
  if (isLoading && !popups.length) {
    return <div className="p-10 text-center animate-pulse text-[#203565]">Cargando configuración...</div>;
  }

  // Por ahora, se asume estamos editando el primer popup de la base de datos (si existe)
  const currentPopup = popups.length > 0 ? popups[0] : null;

  return (
    <div className="p-2 md:p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#203565] dark:text-white">Configuración de Pop-ups</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Administra el diseño y las reglas de visualización.</p>
      </div>

      <PopupForm 
        initialData={currentPopup} 
        onSubmit={handleSave} 
        onCancel={() => {
          // Al cancelar, simplemente recargamos los datos originales
          getPopups();
          showToast.info("Se restauraron los datos originales");
        }}
        isSaving={isSaving}
      />
    </div>
  );
}