'use client';

import { useEffect, useRef, useState } from 'react';
import { showToast } from '@/utils/showToast';
import {
  FaArrowLeft,
  FaUser,
  FaStore,
  FaPhone,
  FaEllipsisVertical,
  FaLock,
  FaRegFaceSmile,
  FaPaperclip,
  FaCamera,
  FaMicrophone,
} from 'react-icons/fa6';

interface WhatsappConfigData {
  imageUrl: string;
  message: string;
}

interface MessageVariables {
  [key: string]: string;
}

// La funcionalidad de localStorage es temporal, solo es para pruebas locales. En el futuro debe implementarse un endpoint en Laravel para guardar esta configuración en la base de datos y que se refleje en el sitio público. Por eso se deja la estructura preparada para que el cambio sea lo más sencillo posible.
const STORAGE_KEY = 'admin_popups_whatsapp_config';

const defaultConfig: WhatsappConfigData = {
  imageUrl: '/storage/plantillas/whatsapp-header.webp',
  message: '👋 ¡Bienvenido(a) a *Yuntas Publicidad*!\n\nHola *{nombre}*, gracias por escribirnos.\n\n',
};

const previewVariables: MessageVariables = {
  nombre: 'Cliente',
};

const replaceDynamicTags = (text: string, variables: MessageVariables): string => {
  return text.replace(/\{([^{}]+)\}/g, (_, rawKey: string) => {
    const key = rawKey.trim();
    return variables[key] ?? `{${key}}`;
  });
};

const renderBoldSegments = (line: string) => {
  const parts = line.split(/(\*[^*]+\*)/g).filter((part) => part.length > 0);

  return parts.map((part, index) => {
    const isBold = part.startsWith('*') && part.endsWith('*') && part.length >= 2;
    if (!isBold) {
      return <span key={`normal-${index}`}>{part}</span>;
    }

    return <strong key={`bold-${index}`}>{part.slice(1, -1)}</strong>;
  });
};

const renderWhatsappMessage = (message: string, variables: MessageVariables) => {
  const messageWithVariables = replaceDynamicTags(message, variables);
  const lines = messageWithVariables.split('\n');

  return lines.map((line, index) => {
    if (!line.trim()) {
      return <span key={`line-${index}`} className="block">&nbsp;</span>;
    }

    return <span key={`line-${index}`} className="block">{renderBoldSegments(line)}</span>;
  });
};

export default function WhatsappConfigForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<WhatsappConfigData>(defaultConfig);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    try {
      const savedRaw = localStorage.getItem(STORAGE_KEY);
      if (!savedRaw) return;

      const savedData = JSON.parse(savedRaw) as Partial<WhatsappConfigData> & { imagenUrl?: string };
      const normalizedData: Partial<WhatsappConfigData> = {
        ...savedData,
        imageUrl: savedData.imageUrl ?? savedData.imagenUrl ?? defaultConfig.imageUrl,
      };

      setFormData((prev) => ({ ...prev, ...normalizedData }));
    } catch {
      showToast.warning('No se pudo cargar la configuracion local de WhatsApp');
    }
  }, []);
  
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const localImageUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, imageUrl: localImageUrl }));
  };

  const clearUploadedImage = () => {
    setImageFile(null);
    setFormData((prev) => ({ ...prev, imageUrl: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = () => {
    if (!formData.message.trim()) {
      showToast.warning('El mensaje no puede estar vacio');
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    showToast.success('Configuración de WhatsApp guardada localmente');
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(defaultConfig);
    showToast.info('Se restauro la configuración por defecto');
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 mt-6">
      <div className="w-full md:w-1/2 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[#203565] dark:text-white mb-1">
            Configuración de WhatsApp
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Personaliza el mensaje de bienvenida enviada a los usuarios por WhatsApp.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Imagen Adjunta
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="imageUrl"
              value={imageFile ? imageFile.name : formData.imageUrl}
              onChange={handleTextChange}
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
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap"
            >
              Subir Imagen
            </button>

            {imageFile && (
              <button
                type="button"
                onClick={clearUploadedImage}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm font-medium whitespace-nowrap"
              >
                Quitar
              </button>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">Formatos recomendados: JPG, PNG, WEBP.</p>
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Mensaje
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleTextChange}
            rows={5}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#203565] focus:border-[#203565] dark:bg-gray-800 dark:border-gray-600 dark:text-white outline-none transition-colors resize-none"
          />
          <p className="text-xs text-gray-400 mt-1">
            Usa <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-[#203565] dark:text-white font-bold">{'{nombre}'}</code> para insertar el nombre del cliente.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 bg-[#203565] text-white font-medium rounded-md hover:bg-[#1a2b52] transition-colors"
          >
            Guardar configuracion
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Restaurar
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <div className="sticky top-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-green-800 bg-green-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Vista Previa del mensaje (WhatsApp)
            </span>
          </div>

          <div className="mx-auto w-full max-w-[400px] h-[800px] rounded-[20px] overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.2)] bg-[#efeae2] flex flex-col border border-gray-200">
            <div className="bg-white flex items-center px-4 py-2 gap-3 shadow-sm z-10">
              <FaArrowLeft className="text-[#54656f] text-base" />

              <div className="w-10 h-10 rounded-full bg-[#dfe5e7] flex items-center justify-center text-white text-lg overflow-hidden">
                <FaUser />
              </div>

              <div className="flex-1 flex flex-col">
                <span className="text-[1.05rem] font-medium text-[#111b21]">Yuntas Publicidad</span>
                <span className="text-xs text-[#667781]">en línea</span>
              </div>

              <div className="flex items-center gap-4 text-[#54656f]">
                <FaStore className="text-sm" />
                <FaPhone className="text-sm" />
                <FaEllipsisVertical className="text-sm" />
              </div>
            </div>

            <div
              className="flex-1 p-4 overflow-y-auto flex flex-col gap-2"
              style={{
                backgroundImage:
                  "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
                backgroundSize: 'cover',
              }}
            >
              <div className="self-center bg-white text-[#667781] text-[0.7rem] px-3 py-1 rounded-[10px] shadow-sm">
                Hoy
              </div>

              <div className="self-center bg-[#faeab5] text-[#54656f] text-[0.72rem] px-3 py-2 rounded-lg text-center w-[90%] leading-relaxed shadow-sm">
                <FaLock className="inline-block text-[0.62rem] mr-1" />
                Los mensajes y las llamadas estan cifrados de extremo a extremo.
              </div>

              <div className="self-start max-w-[85%] mt-2 relative">
                <div className="bg-white rounded-lg rounded-tl-none p-1 shadow-sm relative before:content-[''] before:absolute before:top-0 before:-left-2 before:border-t-[10px] before:border-t-white before:border-l-[10px] before:border-l-transparent">
                  {formData.imageUrl ? (
                    <div className="w-full rounded-md mb-2 overflow-hidden bg-[#edeae4] relative">
                      <img
                        src={formData.imageUrl}
                        alt="Vista previa de WhatsApp"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-[220px] rounded-md mb-2 bg-[#edeae4] relative flex items-center justify-center text-xs text-[#667781]">
                      Sin imagen de cabecera
                    </div>
                  )}

                  <div className="px-2 pb-1 text-[0.92rem] text-[#111b21] leading-relaxed">
                    {renderWhatsappMessage(formData.message, previewVariables)}
                    {!formData.message.trim() && <p>Sin mensaje configurado.</p>}
                  </div>

                  <div className="text-[0.62rem] text-[#667781] text-right mt-1 mr-2 mb-1">1:03 p.m.</div>
                </div>
                
              </div>
            </div>

            <div className="p-2 flex items-end gap-2 bg-transparent border-t border-black/5">
              <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2 min-h-12 shadow-sm">
                <FaRegFaceSmile className="text-[#8696a0] text-xl" />
                <div className="w-[2px] h-5 bg-[#00a884] ml-2 animate-pulse" />
                <input
                  type="text"
                  className="flex-1 bg-transparent border-none outline-none text-sm px-2 text-[#111b21]"
                  placeholder="Mensaje"
                  disabled
                />
                <div className="flex items-center gap-3 text-[#8696a0] text-lg">
                  <FaPaperclip />
                  <FaCamera />
                </div>
              </div>

              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow bg-[#00a884] hover:bg-[#019272] transition-colors">
                <FaMicrophone className="text-lg" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
