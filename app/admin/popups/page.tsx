'use client';

import React, { useEffect, useState } from 'react'; 
import { usePopups } from '@/hooks/usePopups';
import { Popup } from '@/types/admin/popup';
import { showToast } from '@/utils/showToast';
import PopupForm from '@/components/molecules/admin/popups/PopupConfigForm'; 
import EmailConfigForm from './EmailConfigForm'; 

export default function PopupsConfigPage() {
  const { popups, getPopups, savePopup, isLoading, isSaving } = usePopups();
  
  const [activeTab, setActiveTab] = useState('popup');

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

  // Por ahora, se asume estamos editando el primer popup de la base de datos
  const currentPopup = popups.length > 0 ? popups[0] : null;

  return (
    <div className="p-2 md:p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#203565] dark:text-white">Configuración de Pop-ups</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Administra el diseño y las reglas de visualización.</p>
      </div>

      {/* pestañas */}
      <div className="flex space-x-8 border-b border-gray-200 dark:border-gray-700 mb-8">
        <button
          onClick={() => setActiveTab('popup')}
          className={`py-3 flex items-center gap-2 border-b-2 font-bold text-sm transition-colors ${
            activeTab === 'popup'
              ? 'border-[#203565] text-[#203565] dark:border-white dark:text-white'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <span className="text-lg">✱</span> POP-UP
        </button>
        
        <button
          onClick={() => setActiveTab('email')}
          className={`py-3 flex items-center gap-2 border-b-2 font-bold text-sm transition-colors ${
            activeTab === 'email'
              ? 'border-[#203565] text-[#203565] dark:border-white dark:text-white'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <span className="text-lg">✉</span> EMAIL
        </button>

        <button
          onClick={() => setActiveTab('whatsapp')}
          className={`py-3 flex items-center gap-2 border-b-2 font-bold text-sm transition-colors ${
            activeTab === 'whatsapp'
              ? 'border-[#203565] text-[#203565] dark:border-white dark:text-white'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <span className="text-lg">💬</span> WHATSAPP
        </button>
      </div>

      {activeTab === 'popup' && (
        <PopupForm 
          initialData={currentPopup} 
          onSubmit={handleSave} 
          onCancel={() => {
            getPopups();
            showToast.info("Se restauraron los datos originales");
          }}
          isSaving={isSaving}
        />
      )}

      {/* 2. Contenido de la pestaña EMAIL */}
      {activeTab === 'email' && (
        <EmailConfigForm />
      )}

      {/* 3. Contenido de la pestaña WHATSAPP (Dejado preparado para después) */}
      {activeTab === 'whatsapp' && (
        <div className="py-10 text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-lg mb-2">Configuración de WhatsApp</p>
          <p className="text-sm">Próximamente implementado.</p>
        </div>
      )}

    </div>
  );
}