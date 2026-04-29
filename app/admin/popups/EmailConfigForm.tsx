'use client';

import React, { useState, useRef } from 'react';
import { Save, Upload } from 'lucide-react';

export default function EmailConfigForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    asunto: 'Bienvenido(a) a Yuntas Publicidad ✨',
    imagenUrl: '/storage/plantillas/yuntas-bienvenida.webp',
    saludo: 'Estimado(a) {nombre}:',
    cuerpo: 'Gracias por contactarnos.\n\nEn Yuntas Publicidad te ayudamos a destacar con productos publicitarios personalizados y cotizaciones rápidas sin compromiso.\n\nCuéntanos qué necesitas y con gusto te asesoramos.',
    firma: 'Saludos cordiales,\nYuntas Publicidad ✨\n912 849 782'
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  

  const [imageError, setImageError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    

    if (name === 'imagenUrl') {
      setImageError(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); 
      const temporalUrl = URL.createObjectURL(file);
      
      setFormData((prev) => ({
        ...prev,
        imagenUrl: temporalUrl 
      }));
      

      setImageError(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 mt-6">
      {/* Formulario */}
      <div className="w-full md:w-1/2 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[#203565] dark:text-white mb-1">Configuración del Correo</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Personaliza el mensaje que se enviará automáticamente a los usuarios.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Asunto del correo
          </label>
          <input
            type="text"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#203565] focus:border-[#203565] dark:bg-gray-800 dark:border-gray-600 dark:text-white outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Imagen de Cabecera
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="imagenUrl"
              value={imageFile ? imageFile.name : formData.imagenUrl}
              onChange={handleChange}
              disabled={!!imageFile}
              className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#203565] focus:border-[#203565] dark:bg-gray-800 dark:border-gray-600 dark:text-white outline-none transition-colors ${imageFile ? 'bg-gray-100 text-gray-500' : ''}`}
              placeholder="Pega una URL o sube una imagen..."
            />
            
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            <button 
              type="button" 
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap"
            >
              <Upload className="h-4 w-4" />
              Subir Imagen
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">Formatos recomendados: JPG, PNG, WEBP.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Saludo Inicial
          </label>
          <input
            type="text"
            name="saludo"
            value={formData.saludo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#203565] focus:border-[#203565] dark:bg-gray-800 dark:border-gray-600 dark:text-white outline-none transition-colors"
          />
          <p className="text-xs text-gray-400 mt-1">Usa <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-[#203565] font-bold">{'{nombre}'}</code> para insertar el nombre del cliente.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cuerpo del mensaje
          </label>
          <textarea
            name="cuerpo"
            value={formData.cuerpo}
            onChange={handleChange}
            rows={5}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#203565] focus:border-[#203565] dark:bg-gray-800 dark:border-gray-600 dark:text-white outline-none transition-colors resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Firma / Pie de página
          </label>
          <textarea
            name="firma"
            value={formData.firma}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#203565] focus:border-[#203565] dark:bg-gray-800 dark:border-gray-600 dark:text-white outline-none transition-colors resize-none"
          ></textarea>
        </div>

        <button className="inline-flex items-center gap-2 w-full md:w-auto px-6 py-2 bg-[#203565] text-white font-medium rounded-md hover:bg-[#1a2b52] transition-colors">
          <Save className="h-4 w-4" />
          Guardar Configuración
        </button>
      </div>

      {/* Vista previa */}
      <div className="w-full md:w-1/2">
        <div className="sticky top-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#203565] bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Vista Previa (Gmail)
            </span>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white shadow-lg flex flex-col h-full">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white truncate">
                {formData.asunto || 'Sin asunto'}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-8 h-8 rounded-full bg-[#203565] flex items-center justify-center text-white font-bold text-sm">
                  Y
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-tight">Yuntas Publicidad</p>
                  <p className="text-xs text-gray-500">para Juan Pérez (Cliente)</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white flex-grow font-sans text-gray-800 text-sm leading-relaxed overflow-y-auto">
              
          
              {formData.imagenUrl && !imageError ? (
                <div className="mb-6 w-full flex justify-center bg-gray-50 rounded border border-gray-100 overflow-hidden relative group">
                  
                  <img 
                    src={formData.imagenUrl} 
                    alt="Banner Email" 
                    className="max-w-full h-auto max-h-48 object-cover"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <div className="mb-6 w-full h-32 bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs rounded">
                  {formData.imagenUrl && imageError ? '[Imagen no encontrada - Sube una nueva]' : '[Espacio para imagen de cabecera]'}
                </div>
              )}

              <div className="space-y-4 text-[15px]">
                <p className="font-semibold">
                  {formData.saludo.replace('{nombre}', 'Juan Pérez')}
                </p>
                
                {formData.cuerpo.split('\n').map((paragraph, index) => (
                  <p key={index} className="min-h-[1rem]">{paragraph}</p>
                ))}

                <div className="pt-4 font-semibold text-gray-700">
                  {formData.firma.split('\n').map((line, index) => (
                    <p key={index} className="m-0">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}