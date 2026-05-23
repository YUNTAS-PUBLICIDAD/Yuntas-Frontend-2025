'use client';

import React, { useState, useRef } from 'react';
import { Save, Upload, Mail, Image as ImageIcon, MessageSquare, Signature, X, ChevronDown } from 'lucide-react';

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
  disabled
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  name?: string;
  placeholder: string;
  rows?: number;
  disabled?: boolean;
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
    </div>
  );
}

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
      {/* Formulario Rediseñado */}
      <div className="w-full md:w-1/2 bg-white dark:bg-[#1C2347] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
        
        <div className="divide-y divide-gray-100 dark:divide-white/5">
          
          {/* SECCIÓN: CABECERA */}
          <div className="px-4 sm:px-6 py-6">
            <BlockTitle
              icon={<Mail className="w-4 h-4 text-[#203565] dark:text-white/60" />}
              title="Configuración del Correo"
              subtitle="Personaliza el mensaje que se enviará automáticamente a los usuarios"
            />
            
            <Input
              label="Asunto del correo"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              placeholder="Ej: Bienvenido a nuestra plataforma"
            />
          </div>

          {/* SECCIÓN: RECURSOS VISUALES */}
          <div className="px-4 sm:px-6 py-6">
            <BlockTitle
              icon={<ImageIcon className="w-4 h-4 text-[#203565] dark:text-white/60" />}
              title="Imagen de Cabecera"
              subtitle="Sube una imagen para personalizar el banner del correo"
            />
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="w-full flex-1">
                  <input
                    type="text"
                    name="imagenUrl"
                    value={imageFile ? imageFile.name : formData.imagenUrl}
                    onChange={handleChange}
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

                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#203565]/10 dark:bg-white/10 rounded-xl hover:bg-[#203565]/20 dark:hover:bg-white/20 transition-all text-sm font-semibold text-[#203565] dark:text-white whitespace-nowrap"
                >
                  <Upload className="h-4 w-4" />
                  Subir
                </button>
              </div>
              <p className="text-xs text-gray-400">Formatos recomendados: JPG, PNG, WEBP</p>
            </div>
          </div>

          {/* SECCIÓN: CONTENIDO */}
          <div className="px-4 sm:px-6 py-6">
            <BlockTitle
              icon={<MessageSquare className="w-4 h-4 text-[#203565] dark:text-white/60" />}
              title="Contenido del Mensaje"
              subtitle="Define el saludo y el cuerpo del correo"
            />
            
            <div className="space-y-6">
              <Input
                label="Saludo Inicial"
                name="saludo"
                value={formData.saludo}
                onChange={handleChange}
                placeholder="Ej: Hola {nombre},"
                hint={
                  <>Usa <code className="bg-[#203565]/10 dark:bg-white/10 px-1 rounded text-[#203565] dark:text-white font-bold">{'{nombre}'}</code> para insertar el nombre del cliente.</>
                }
              />

              <TextArea
                label="Cuerpo del mensaje"
                name="cuerpo"
                value={formData.cuerpo}
                onChange={handleChange}
                placeholder="Escribe el contenido del correo aquí..."
              />
            </div>
          </div>

          {/* SECCIÓN: FIRMA */}
          <div className="px-4 sm:px-6 py-6">
            <BlockTitle
              icon={<Signature className="w-4 h-4 text-[#203565] dark:text-white/60" />}
              title="Firma / Pie de página"
              subtitle="Datos de contacto y despedida"
            />
            
            <TextArea
              label="Firma"
              name="firma"
              value={formData.firma}
              onChange={handleChange}
              placeholder="Ej: Saludos cordiales, Equipo Yuntas"
              rows={3}
            />
          </div>

          {/* BOTONES ACCIÓN */}
          <div className="px-4 sm:px-6 py-4 bg-gray-50 dark:bg-white/5 flex flex-col sm:flex-row justify-end">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#203565] hover:bg-[#162548] text-white dark:bg-white dark:text-[#203565] dark:hover:bg-white/90 rounded-xl font-semibold transition-all shadow-sm text-sm">
              <Save className="h-4 w-4" />
              Guardar Configuración
            </button>
          </div>
        </div>
      </div>

      {/* Vista previa (Intacta, solo contenedor externo ajustado) */}
      <div className="w-full md:w-1/2">
        <div className="sticky top-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#203565] dark:text-white bg-[#203565]/10 dark:bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider border dark:border-white/10">
              Vista Previa (Gmail)
            </span>
          </div>

          <div className="border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden bg-white dark:bg-[#1C2347] shadow-lg flex flex-col h-full">
            <div className="p-4 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white truncate">
                {formData.asunto || 'Sin asunto'}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-8 h-8 rounded-full bg-[#203565] flex items-center justify-center text-white font-bold text-sm">
                  Y
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-tight truncate">Yuntas Publicidad</p>
                  <p className="text-xs text-gray-500 truncate">para Juan Pérez (Cliente)</p>
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