'use client';

import React, { useState, useEffect } from 'react';
import Button from "@/components/atoms/Button";
import { usePopups } from '@/hooks/usePopups';
import { Popup } from '@/types/admin/popup';
import { showToast } from '@/utils/showToast';

export default function PopupsConfigPage() {
  const { popups, getPopups, savePopup, isLoading, isSaving } = usePopups();

  // Se guarda el ID por si estamos editando un popup existente
  const [popupId, setPopupId] = useState<number | null>(null);

  // --- ESTADOS MAPEADOS AL MODELO DE LARAVEL ---
  const [active, setActive] = useState(true);
  const [title, setTitle] = useState('');
  const [buttonText, setButtonText] = useState('');
  
  const [pageTarget, setPageTarget] = useState('all');
  const [delaySeconds, setDelaySeconds] = useState('5');
  const [priority, setPriority] = useState('1');
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Imagen: un estado para la previsualización y otro para el archivo real
  const [imgSrc, setImgSrc] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageAlt, setImageAlt] = useState('');
  const [imageTitle, setImageTitle] = useState('');

  //Cargar los popups al entrar a la página
  useEffect(() => {
    getPopups();
  }, [getPopups]);

  // Si ya hay un popup guardado en BD, rellenar el formulario
  useEffect(() => {
    if (popups && popups.length > 0) {
      const current = popups[0]; // Usamos el primero como global
      setPopupId(current.id || null);
      setActive(current.active);
      setTitle(current.title || '');
      setButtonText(current.button_text || '');
      setPageTarget(current.page_target || 'all');
      setDelaySeconds(current.delay_seconds?.toString() || '5');
      setPriority(current.priority?.toString() || '1');
      setImageAlt(current.image_alt || '');
      setImageTitle(current.image_title || '');
      
      // La URL que Laravel nos devuelve (asset)
      if (current.image_url) setImgSrc(current.image_url);

      // Formatear fechas para los inputs datetime-local (cortamos en el caracter 16: "YYYY-MM-DDTHH:mm")
      if (current.start_date) setStartDate(current.start_date.substring(0, 16));
      if (current.end_date) setEndDate(current.end_date.substring(0, 16));
    }
  }, [popups]);

  // Manejador para previsualizar y guardar el archivo
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // Guardamos el archivo para el backend
      const objectUrl = URL.createObjectURL(file);
      setImgSrc(objectUrl); // Previsualización local
    } else {
      setImageFile(null);
      // Si quita la imagen, no borramos el imgSrc por si ya tenía una de BD
    }
  };

  // 3. Guardar en Backend
  const handleSave = async () => {
    // Validaciones básicas
    if (!title || !buttonText || !imageAlt) {
      showToast.warning("Por favor completa los campos: Título, Botón y Alt de Imagen");
      return;
    }
    if (!imgSrc && !imageFile) {
      showToast.warning("Por favor sube una imagen");
      return;
    }

    const popupData: Popup = {
      id: popupId || undefined,
      title,
      button_text: buttonText,
      page_target: pageTarget,
      delay_seconds: parseInt(delaySeconds) || 0,
      priority: parseInt(priority) || 1,
      start_date: startDate || null,
      end_date: endDate || null,
      active,
      image_alt: imageAlt,
      image_title: imageTitle,
      // Pasamos el archivo solo si subieron uno nuevo
      image: imageFile || undefined 
    };

    // Si tenemos un popupId, actualizamos. Si no, creamos uno nuevo.
    const isUpdating = !!popupId;
    const result = await savePopup(popupData, isUpdating);

    if (result.success) {
      showToast.success(isUpdating ? "Popup actualizado" : "Popup creado");
      getPopups(); // Recargamos para obtener la URL final de la imagen desde Laravel
    } else {
      showToast.error(result.message || "Error al guardar");
    }
  };

  if (isLoading && !popups.length) {
    return <div className="p-10 text-center animate-pulse text-[#203565]">Cargando configuración...</div>;
  }

  return (
    <div className="p-2 md:p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ==========================================
            COLUMNA IZQUIERDA: EL FORMULARIO (7 cols)
            ========================================== */}
        <div className="lg:col-span-7 bg-white dark:bg-[#141A3F] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 max-h-[85vh] overflow-y-auto">
          <h2 className="text-xl font-bold text-[#203565] dark:text-white mb-6 border-b dark:border-gray-700 pb-3">
            Crear / Editar Pop-up
          </h2>
          
          <div className="flex flex-col gap-6">

            {/* ESTADO (active) */}
            <div className="flex items-center justify-between bg-gray-50 dark:bg-[#0D1030] p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800 dark:text-white">Estado (active)</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Activar o desactivar este popup</span>
              </div>
              <button
                type="button"
                onClick={() => setActive(!active)}
                className={`${
                  active ? 'bg-[#6DE1E3]' : 'bg-gray-300 dark:bg-gray-600'
                } relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
              >
                <span
                  className={`${
                    active ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>

            {/* SECCIÓN DE VISUALIZACIÓN */}
            <div className={`flex flex-col gap-4 ${!active ? 'opacity-50' : ''}`}>
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 border-b dark:border-gray-700 pb-1">Reglas de Visualización</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* page_target */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Página destino</label>
                  <select 
                    value={pageTarget} 
                    onChange={(e) => setPageTarget(e.target.value)}
                    disabled={!active}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed"
                  >
                    <option value="all">Todas las páginas</option>
                    <option value="inicio">Inicio</option>
                    <option value="productos">Productos</option>
                    <option value="contacto">Contacto</option>
                  </select>
                </div>

                {/* delay_seconds */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Retardo (seg)</label>
                  <input 
                    type="number" min="0" max="60"
                    value={delaySeconds}
                    onChange={(e) => setDelaySeconds(e.target.value)}
                    disabled={!active}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed" 
                  />
                </div>

                {/* priority */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Prioridad</label>
                  <input 
                    type="number" min="1" max="10"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    disabled={!active}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed" 
                  />
                </div>
              </div>

              {/* Fechas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Fecha Inicio</label>
                  <input 
                    type="datetime-local" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    disabled={!active}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Fecha Fin</label>
                  <input 
                    type="datetime-local" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    disabled={!active}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed" 
                  />
                </div>
              </div>
            </div>

            {/* SECCIÓN DE TEXTOS */}
            <div className={`flex flex-col gap-4 ${!active ? 'opacity-50' : ''}`}>
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 border-b dark:border-gray-700 pb-1">Textos del Pop-up</h3>
              
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Título</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={!active}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed" 
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Texto del Botón</label>
                <input 
                  type="text" 
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  disabled={!active}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed" 
                />
              </div>
            </div>

            {/* SECCIÓN DE IMAGEN */}
            <div className={`bg-gray-50 dark:bg-[#0D1030] p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col gap-4 ${!active ? 'opacity-50' : ''}`}>
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">Imagen</h3>
              
              <input 
                type="file" accept="image/*" onChange={handleImageChange} disabled={!active}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-transparent dark:text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:cursor-not-allowed" 
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Alt de imagen</label>
                  <input 
                    type="text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} disabled={!active}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Título hover</label>
                  <input 
                    type="text" value={imageTitle} onChange={(e) => setImageTitle(e.target.value)} disabled={!active}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-transparent dark:text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed" 
                  />
                </div>
              </div>
            </div>

            {/* Botón Guardar */}
            <div className="pt-2">
              <Button size="md" variant="primary" className="w-full" onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Guardando...' : 'Guardar Pop-up'}
              </Button>
            </div>
          </div>
        </div>

        {/* ==========================================
            COLUMNA DERECHA: LA VISTA PREVIA (5 cols)
            ========================================== */}
        <div className="lg:col-span-5 bg-gray-50 dark:bg-[#0D1030] p-6 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
          
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <span className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Destino: {pageTarget} ({delaySeconds}s)
            </span>
            {active ? (
               <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                 ACTIVO
               </span>
            ) : (
               <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                 INACTIVO
               </span>
            )}
          </div>

          <div className={`bg-white w-full max-w-sm rounded-xl shadow-2xl overflow-hidden relative z-10 mt-8 transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-40 grayscale-[50%]'}`}>
            <button className="absolute top-3 right-3 text-gray-400 hover:text-black font-bold text-lg px-2 z-20 bg-white/80 rounded-full h-8 w-8 flex items-center justify-center">✕</button>
            
            <div className="h-44 bg-gray-200 flex items-center justify-center relative overflow-hidden">
              {imgSrc ? (
                <img 
                  src={imgSrc} 
                  alt={imageAlt || "Vista previa"} 
                  title={imageTitle} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 font-medium text-sm text-center px-4">
                  [image]
                </span>
              )}
            </div>
            
            <div className="p-6 text-center flex flex-col gap-3">
              <h4 className="text-xl font-bold text-[#04041C]">
                {title || 'Escribe un título...'}
              </h4>
              <p className="text-sm text-gray-600">Déjanos tus datos y te enviaremos la información.</p>
              
              <div className="h-10 bg-gray-50 rounded border border-gray-200 w-full mt-2"></div>
              <div className="h-10 bg-gray-50 rounded border border-gray-200 w-full"></div>
              
              <button 
                className="w-full py-3 rounded font-bold mt-2 transition-all uppercase bg-[#6DE1E3] text-[#04041C]"
              >
                {buttonText || 'BOTÓN'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}