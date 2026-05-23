'use client';

import { useEffect, useRef, useState } from 'react';
import { showToast } from '@/utils/showToast';
import { RotateCcw, Save, Trash2, Upload, MessageSquare, Image as ImageIcon, X, ChevronDown } from 'lucide-react';
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

// ─── Componentes de UI Locales (Estilo Configuración) ────────────────────────
function BlockTitle({
  icon,
  title,
  subtitle,
  className = "mb-5",
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#203565]/10 dark:bg-white/5 shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="min-w-0">
        <h3 className="text-base font-bold text-[#0D1030] dark:text-white truncate">{title}</h3>
        <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5 truncate">{subtitle}</p>
      </div>
    </div>
  );
}

function Input({
  value,
  onChange,
  label,
  name,
  placeholder,
  hint,
  disabled
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name?: string;
  placeholder: string;
  hint?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${disabled ? 'opacity-50' : ''}`}>
      <label className="text-sm font-semibold text-[#0D1030] dark:text-white">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-[#0D1030] placeholder-gray-300 transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/20 disabled:cursor-not-allowed"
      />
      {hint && <p className="text-xs text-gray-400 dark:text-white/40">{hint}</p>}
    </div>
  );
}

function TextArea({
  value,
  onChange,
  label,
  name,
  placeholder,
  rows = 5,
  disabled,
  hint
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  name?: string;
  placeholder: string;
  rows?: number;
  disabled?: boolean;
  hint?: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${disabled ? 'opacity-50' : ''}`}>
      <label className="text-sm font-semibold text-[#0D1030] dark:text-white">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#0D1030] placeholder-gray-300 transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/20 disabled:cursor-not-allowed resize-none"
      />
      {hint && <p className="text-xs text-gray-400 dark:text-white/40">{hint}</p>}
    </div>
  );
}

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
      {/* Formulario Rediseñado */}
      <div className="w-full md:w-1/2 bg-white dark:bg-[#1C2347] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
        
        <div className="divide-y divide-gray-100 dark:divide-white/5">
          
          {/* SECCIÓN: IMAGEN */}
          <div className="px-4 sm:px-6 py-6">
            <BlockTitle
              icon={<ImageIcon className="w-4 h-4 text-[#203565] dark:text-white/60" />}
              title="Imagen Adjunta"
              subtitle="Personaliza la imagen que acompaña al mensaje de WhatsApp"
            />
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="w-full flex-1">
                  <input
                    type="text"
                    name="imageUrl"
                    value={imageFile ? imageFile.name : formData.imageUrl}
                    onChange={handleTextChange}
                    disabled={!!imageFile}
                    placeholder="Pega una URL o sube una imagen..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-[#0D1030] placeholder-gray-300 transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/20 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                  />
                </div>
                
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />

                <div className="flex w-full sm:w-auto gap-2">
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#203565]/10 dark:bg-white/10 rounded-xl hover:bg-[#203565]/20 dark:hover:bg-white/20 transition-all text-sm font-semibold text-[#203565] dark:text-white whitespace-nowrap"
                  >
                    <Upload className="h-4 w-4" />
                    Subir
                  </button>

                  {imageFile && (
                    <button
                      type="button"
                      onClick={clearUploadedImage}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition-all text-sm font-semibold whitespace-nowrap"
                    >
                      <Trash2 className="h-4 w-4" />
                      Quitar
                    </button>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-400">Formatos recomendados: JPG, PNG, WEBP</p>
            </div>
          </div>

          {/* SECCIÓN: MENSAJE */}
          <div className="px-4 sm:px-6 py-6">
            <BlockTitle
              icon={<MessageSquare className="w-4 h-4 text-[#203565] dark:text-white/60" />}
              title="Mensaje de Bienvenida"
              subtitle="Define el texto que se enviará automáticamente"
            />
            
            <TextArea
              name="message"
              value={formData.message}
              onChange={handleTextChange}
              placeholder="Escribe el mensaje de WhatsApp aquí..."
              hint={
                <>Usa <code className="bg-[#203565]/10 dark:bg-white/10 px-1 rounded text-[#203565] dark:text-white font-bold">{'{nombre}'}</code> para insertar el nombre del cliente. Puedes usar *texto* para negrita.</>
              }
            />
          </div>

          {/* BOTONES ACCIÓN */}
          <div className="px-4 sm:px-6 py-4 bg-gray-50 dark:bg-white/5 flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-[#0D1030] dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-sm font-semibold"
            >
              <RotateCcw className="h-4 w-4" />
              Restaurar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#203565] hover:bg-[#162548] text-white dark:bg-white dark:text-[#203565] dark:hover:bg-white/90 rounded-xl font-semibold transition-all shadow-sm text-sm"
            >
              <Save className="h-4 w-4" />
              Guardar Configuración
            </button>
          </div>
        </div>
      </div>

      {/* Vista previa (Intacta) */}
      <div className="w-full md:w-1/2">
        <div className="sticky top-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-green-800 bg-green-100 px-3 py-1 rounded-full uppercase tracking-wider border border-green-200">
              Vista Previa (WhatsApp)
            </span>
          </div>

          <div className="mx-auto w-full max-w-[400px] h-[800px] rounded-[20px] overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.2)] bg-[#efeae2] flex flex-col border border-gray-200">
            <div className="bg-white flex items-center px-4 py-2 gap-3 shadow-sm z-10">
              <FaArrowLeft className="text-[#54656f] text-base shrink-0" />

              <div className="w-10 h-10 rounded-full bg-[#dfe5e7] flex items-center justify-center text-white text-lg overflow-hidden shrink-0">
                <FaUser />
              </div>

              <div className="flex-1 flex flex-col min-w-0">
                <span className="text-[1.05rem] font-medium text-[#111b21] truncate">Yuntas Publicidad</span>
                <span className="text-xs text-[#667781] truncate">en línea</span>
              </div>

              <div className="flex items-center gap-4 text-[#54656f] shrink-0">
                <FaStore className="text-sm hidden sm:block" />
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

                  <div className="px-2 pb-1 text-[0.92rem] text-[#111b21] leading-relaxed break-words">
                    {renderWhatsappMessage(formData.message, previewVariables)}
                    {!formData.message.trim() && <p>Sin mensaje configurado.</p>}
                  </div>

                  <div className="text-[0.62rem] text-[#667781] text-right mt-1 mr-2 mb-1">1:03 p.m.</div>
                </div>
                
              </div>
            </div>

            <div className="p-2 flex items-end gap-2 bg-transparent border-t border-black/5">
              <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2 min-h-12 shadow-sm min-w-0">
                <FaRegFaceSmile className="text-[#8696a0] text-xl shrink-0" />
                <div className="w-[2px] h-5 bg-[#00a884] ml-2 animate-pulse shrink-0" />
                <input
                  type="text"
                  className="flex-1 bg-transparent border-none outline-none text-sm px-2 text-[#111b21] min-w-0"
                  placeholder="Mensaje"
                  disabled
                />
                <div className="flex items-center gap-3 text-[#8696a0] text-lg shrink-0">
                  <FaPaperclip className="hidden sm:block" />
                  <FaCamera />
                </div>
              </div>

              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow bg-[#00a884] hover:bg-[#019272] transition-colors shrink-0">
                <FaMicrophone className="text-lg" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
